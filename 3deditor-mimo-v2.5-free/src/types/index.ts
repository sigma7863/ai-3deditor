import * as THREE from 'three'

export type ObjectType = 'cube' | 'sphere'

export type TransformMode = 'translate' | 'rotate' | 'scale'

export interface EditorObject {
  id: string
  type: ObjectType
  name: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  color: string
}

export interface EditorState {
  objects: EditorObject[]
  selectedId: string | null
  transformMode: TransformMode
  
  addObject: (type: ObjectType) => void
  removeObject: (id: string) => void
  selectObject: (id: string | null) => void
  setTransformMode: (mode: TransformMode) => void
  updateObject: (id: string, updates: Partial<Omit<EditorObject, 'id' | 'type'>>) => void
}
