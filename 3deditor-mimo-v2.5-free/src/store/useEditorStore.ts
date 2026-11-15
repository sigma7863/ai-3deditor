import { create } from 'zustand'
import { EditorState, EditorObject, ObjectType } from '../types'

let nextId = 1

const createObject = (type: ObjectType): EditorObject => {
  const id = `${type}-${nextId++}`
  const baseName = type === 'cube' ? 'Cube' : 'Sphere'
  
  return {
    id,
    type,
    name: `${baseName} ${nextId - 1}`,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    color: type === 'cube' ? '#4a90d9' : '#d94a4a',
  }
}

export const useEditorStore = create<EditorState>((set) => ({
  objects: [],
  selectedId: null,
  transformMode: 'translate',
  
  addObject: (type: ObjectType) => {
    const newObject = createObject(type)
    set((state) => ({
      objects: [...state.objects, newObject],
      selectedId: newObject.id,
    }))
  },
  
  removeObject: (id: string) => {
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }))
  },
  
  selectObject: (id: string | null) => {
    set({ selectedId: id })
  },
  
  setTransformMode: (mode) => {
    set({ transformMode: mode })
  },
  
  updateObject: (id: string, updates) => {
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    }))
  },
}))
