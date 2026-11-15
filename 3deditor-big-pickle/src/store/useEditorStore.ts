import { create } from "zustand";
import type { EditorObject, ObjectType, TransformMode } from "../types";
import { nextColor } from "../utils/color";

let nextId = 1;

interface EditorStore {
  objects: EditorObject[];
  selectedId: string | null;
  transformMode: TransformMode;
  addObject: (type: ObjectType) => void;
  removeObject: (id: string) => void;
  selectObject: (id: string | null) => void;
  updateObject: (id: string, patch: Partial<EditorObject>) => void;
  setTransformMode: (mode: TransformMode) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  objects: [],
  selectedId: null,
  transformMode: "translate",

  addObject: (type) =>
    set((state) => {
      const id = `obj_${nextId++}`;
      const offset = state.objects.length * 2;
      const obj: EditorObject = {
        id,
        type,
        position: [offset, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        color: nextColor()
      };
      return {
        objects: [...state.objects, obj],
        selectedId: id
      };
    }),

  removeObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((o) => o.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId
    })),

  selectObject: (id) => set({ selectedId: id }),

  updateObject: (id, patch) =>
    set((state) => ({
      objects: state.objects.map((o) => (o.id === id ? { ...o, ...patch } : o))
    })),

  setTransformMode: (mode) => set({ transformMode: mode })
}));
