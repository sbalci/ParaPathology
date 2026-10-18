import type { Relation, Requirement, RequirementClass, RequirementElement, RequirementModel } from './types.js';
export declare const RequirementType: {
    readonly REQUIREMENT: 'Requirement';
    readonly FUNCTIONAL_REQUIREMENT: 'Functional Requirement';
    readonly INTERFACE_REQUIREMENT: 'Interface Requirement';
    readonly PERFORMANCE_REQUIREMENT: 'Performance Requirement';
    readonly PHYSICAL_REQUIREMENT: 'Physical Requirement';
    readonly DESIGN_CONSTRAINT: 'Design Constraint';
};
export declare const RiskLevel: {
    readonly LOW_RISK: 'Low';
    readonly MED_RISK: 'Medium';
    readonly HIGH_RISK: 'High';
};
export declare const VerifyType: {
    readonly VERIFY_ANALYSIS: 'Analysis';
    readonly VERIFY_DEMONSTRATION: 'Demonstration';
    readonly VERIFY_INSPECTION: 'Inspection';
    readonly VERIFY_TEST: 'Test';
};
export declare const Relationships: {
    readonly CONTAINS: 'contains';
    readonly COPIES: 'copies';
    readonly DERIVES: 'derives';
    readonly SATISFIES: 'satisfies';
    readonly VERIFIES: 'verifies';
    readonly REFINES: 'refines';
    readonly TRACES: 'traces';
};
export declare class RequirementDb implements RequirementModel {
    readonly type: 'requirement';
    direction: string;
    requirements: Map<string, Requirement>;
    elements: Map<string, RequirementElement>;
    relations: Relation[];
    classes: Map<string, RequirementClass>;
    title: string | undefined;
    accTitle: string | undefined;
    accDescr: string | undefined;
    private newId;
    private newText;
    private newRisk;
    private newVerifyMethod;
    private newElementType;
    private newDocRef;
    private styleCopies;
    private copy;
    setDirection(dir: string): void;
    addRequirement(name: string, type: string): Requirement;
    setNewReqId(id: string): void;
    setNewReqText(text: string): void;
    setNewReqRisk(risk: string): void;
    setNewReqVerifyMethod(verifyMethod: string): void;
    addElement(name: string): RequirementElement;
    setNewElementType(type: string): void;
    setNewElementDocRef(docRef: string): void;
    addRelationship(type: string, src: string, dst: string): void;
    private node;
    setCssStyle(ids: string[], styles: string[]): void;
    setClass(ids: string[], classNames: string[]): void;
    defineClass(ids: string[], style: string[]): void;
    setAccTitle(text: string): void;
    setAccDescription(text: string): void;
}
