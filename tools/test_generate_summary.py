"""Focused tests for the GitBook navigation additions."""
import subprocess
import tempfile
import unittest
from pathlib import Path

from tools import generate_summary as summary


class RecentChangesTests(unittest.TestCase):
    def setUp(self):
        scratch = Path(summary.VAULT) / "build"
        scratch.mkdir(exist_ok=True)
        self.tmp = tempfile.TemporaryDirectory(dir=scratch)
        self.addCleanup(self.tmp.cleanup)
        self.repo = Path(self.tmp.name)
        if not self.repo.resolve().is_relative_to(scratch.resolve()):
            self.fail("Test repository escaped the workspace build directory")
        self.git("init", "--quiet")
        self.git("config", "user.name", "Test")
        self.git("config", "user.email", "test@example.com")

    def git(self, *args):
        result = subprocess.run(["git", "-C", str(self.repo),
                                 "-c", "safe.directory=" + str(self.repo), *args],
                                capture_output=True, text=True)
        if result.returncode:
            self.fail("git %s failed: %s" % (" ".join(args), result.stderr))

    def note(self, name, body, frontmatter="type: Note"):
        (self.repo / name).write_text("---\n%s\n---\n\n# %s\n\n%s\n" %
                                      (frontmatter, name[:-3], body), encoding="utf-8")

    def commit(self):
        self.git("add", "-A")
        self.git("commit", "--quiet", "-m", "Update notes")

    def test_feed_deduplicates_and_ignores_metadata_and_generated_blocks(self):
        self.note("a.md", "Initial text")
        self.note("private.md", "Private text", "type: Note\npublish: false")
        self.note(summary.UPDATES_PAGE, "Generated feed")
        self.commit()

        self.note("a.md", "Initial text", "type: Note\nstatus: Active")
        self.note("b.md", "Another note")
        self.commit()

        self.note("a.md", "Changed text", "type: Note\nstatus: Active")
        self.note("private.md", "Private text", "type: Note\npublish: true")
        self.commit()

        self.note("a.md", "Changed again", "type: Note\nstatus: Active")
        self.note("b.md", "Another note", "type: Note\nstatus: Active")
        self.commit()

        live = {"a.md", "b.md", "private.md", summary.UPDATES_PAGE}
        notes = {rel: summary.Note(rel, (self.repo / rel).read_text(encoding="utf-8"))
                 for rel in live}
        changes = summary.recent_changes(notes, live, str(self.repo))
        self.assertEqual([(kind, rel) for _, kind, rel in changes],
                         [("Updated", "a.md"), ("Added", "private.md"),
                          ("Added", "b.md")])
        self.assertEqual(len(summary.recent_changes(notes, live, str(self.repo), limit=2)), 2)

        old = summary.Note("a.md", "---\nstatus: Draft\n---\n# A\n\nText\n"
                           "<!-- tolaria:children:start -->\nOld\n<!-- tolaria:children:end -->\n")
        new = summary.Note("a.md", "---\nstatus: Active\n---\n# A\n\nText\n"
                           "<!-- tolaria:children:start -->\nNew\n<!-- tolaria:children:end -->\n")
        self.assertEqual(summary._meaningful_body(old), summary._meaningful_body(new))

    def test_history_unavailable(self):
        self.assertIsNone(summary.recent_changes({}, set(), str(self.repo / "missing")))


class PublishedPageTests(unittest.TestCase):
    def test_hidden_frontmatter_is_only_added_to_output(self):
        source = "---\ntype: Clipping\nhidden: false\n---\n\n# Example\n"
        output = summary.gitbook_hidden(source)
        self.assertIn("hidden: true", output)
        self.assertNotIn("hidden: false", output)
        self.assertEqual(source.count("hidden: false"), 1)

    def test_index_only_hub_keeps_featured_links_without_full_child_list(self):
        hub = summary.Note("Clippings/README.md", "# Clippings\n\n## Featured\n\n"
                           "- [[example|Example]]\n\n"
                           "<!-- tolaria:children:start -->\nOld list\n"
                           "<!-- tolaria:children:end -->\n")
        child = summary.Note("Clippings/example.md", "# Example\n")
        notes = {hub.rel: hub, child.rel: child}
        output = summary.render_for_gitbook(hub.rel, hub, notes, summary.title_index(notes),
                                            set(notes), {hub.rel: [child.rel]}, summary.Stats(),
                                            {hub.rel})
        self.assertIn("## Featured", output)
        self.assertIn("[Example](example.md)", output)
        self.assertNotIn("Old list", output)
        self.assertNotIn(summary.CHILD_START, output)


if __name__ == "__main__":
    unittest.main()
