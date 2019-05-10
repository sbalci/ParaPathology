# Text Mining Videos

* Text Mining \(part 1\) - Import Text into R \(single document\)

[https://www.youtube.com/watch?v=fga5gLtFQs0&index=2&list=WL](https://www.youtube.com/watch?v=fga5gLtFQs0&index=2&list=WL)

* Text Mining \(part 2\) - Cleaning Text Data in R \(single document\)

[https://www.youtube.com/watch?v=gtQWMxWzs\_M&list=WL&index=2](https://www.youtube.com/watch?v=gtQWMxWzs_M&list=WL&index=2)

* Text Mining \(part 3\) - Sentiment Analysis and Wordcloud in R \(single document\)

[https://www.youtube.com/watch?v=JM\_J7ufS-BU&t=0s](https://www.youtube.com/watch?v=JM_J7ufS-BU&t=0s)

* Text Mining \(part4\) - Postive and Negative Terms for Sentiment Analysis in R

[https://www.youtube.com/watch?v=WfoVINuxIJA&index=11&list=WL](https://www.youtube.com/watch?v=WfoVINuxIJA&index=11&list=WL)

[http://ptrckprry.com/course/ssd/data/positive-words.txt](http://ptrckprry.com/course/ssd/data/positive-words.txt)

[http://ptrckprry.com/course/ssd/data/negative-words.txt](http://ptrckprry.com/course/ssd/data/negative-words.txt)

* Text Mining \(part 5\) - Import a Corpus in R

[https://www.youtube.com/watch?v=pFinlXYLZ-A&list=WL&index=14](https://www.youtube.com/watch?v=pFinlXYLZ-A&list=WL&index=14)

* Text Mining \(part 6\) - Cleaning Corpus text in R

[https://www.youtube.com/watch?v=jCrQYOsAcv4&list=WL&index=24](https://www.youtube.com/watch?v=jCrQYOsAcv4&list=WL&index=24)

--

* * N-gram word clouds in R ! Learn it in 5 minutes !

[https://www.youtube.com/watch?v=HellsQ2JF2k&feature=youtu.be](https://www.youtube.com/watch?v=HellsQ2JF2k&feature=youtu.be)

* Word Cloud in R - Learn it in 4 minutes !

[https://www.youtube.com/watch?v=oVVvG035vQc](https://www.youtube.com/watch?v=oVVvG035vQc)

if you get error try this:

`corpus <- tm_map(corpus,content_transformer(function(x) iconv(x, "latin1", "ASCII", sub="")))`

--

* 
