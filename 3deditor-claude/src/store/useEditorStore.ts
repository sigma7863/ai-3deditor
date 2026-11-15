import { create } from 'zustand';
import type { EditorObject, ToolMode } from '../types';

interface EditorState {
  objects: EditorObject[];
  selectedId: string | null;
  tool: ToolMode;
  addCube: () => void;
  addSphere: () => void;
  removeSelected: () => void;
  selectObject: (id: string | null) => void;
  setTool: (tool: ToolMode) => void;
  updateTransform: (
    id: string,
    transform: Partial<Pick<EditorObject, 'position' | 'rotation' | 'scale'>>,
  ) => void;
  updateColor: (id: string, color: string) => void;
}

const COLORS = [
  '#ff6b6b', '#51cf66', '#339af0', '#fcc419',
  '#cc5de8', '#20c997', '#ff922b', '#748ffc',
  '#f06595', '#38d9a9', '#a9e34b', '#ffd43b',
];

let nextId = 1;
let colorIndex = 0;

function nextColor(): string {
  const c = COLORS[colorIndex % COLORS.length];
  colorIndex++;
  return c;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  objects: [],
  selectedId: null,
  tool: 'select',

  addCube: () => {
    const obj: EditorObject = {
      id: `obj_${nextId++}`,
      type: 'cube',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: nextColor(),
    };
    set(s => ({
      objects: [...s.objects, obj],
      selectedId: obj.id,
      tool: 'translate',
    }));
  },

  addSphere: () => {
    const obj: EditorObject = {
      id: `obj_${nextId++}`,
      type: 'sphere',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: nextColor(),
    };
    set(s => ({
      objects: [...s.objects, obj],
      selectedId: obj.id,
      tool: 'translate',
    }));
  },

  removeSelected: () => {
    const { selectedId, objects } = get();
    if (!selectedId) return;
    set({
      objects: objects.filter(o => o.id !== selectedId),
      selectedId: null,
    });
  },

  selectObject: (id) => set({ selectedId: id }),

  setTool: (tool) => set({ tool }),

  updateTransform: (id, transform) => {
    set(s => ({
      objects: s.objects.map(o =>
        o.id === id ? { ...o, ...transform } : o,
      ),
    }));
  },

  updateColor: (id, color) => {
    set(s => ({
      objects: s.objects.map(o =>
        o.id === id ? { ...o, color } : o,
      ),
    }));
  },
}));
