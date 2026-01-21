export type FieldType = "text" | "date" | "signature" | "checkbox";

export interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  position: { x: number; y: number };
}

export interface Blueprint {
  id: string;
  name: string;
  fields: BlueprintField[];
  createdAt: string;
}

export type ContractStatus =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

export interface ContractFieldValue {
  fieldId: string;
  value: string | boolean;
}

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  blueprintName: string;
  status: ContractStatus;
  fieldValues: ContractFieldValue[];
  createdAt: string;
}
