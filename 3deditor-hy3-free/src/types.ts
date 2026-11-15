export interface EditorObject {
  id: string;
  type: 'cube' | 'sphere';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}

export type ToolMode = 'select' | 'translate' | 'rotate' | 'scale';
