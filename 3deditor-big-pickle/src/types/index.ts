export type ObjectType = "cube" | "sphere";

export interface EditorObject {
  id: string;
  type: ObjectType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}

export type TransformMode = "translate" | "rotate" | "scale";
