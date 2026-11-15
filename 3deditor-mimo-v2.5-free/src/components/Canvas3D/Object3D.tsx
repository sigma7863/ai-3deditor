import { useRef } from 'react'
import { Mesh } from 'three'
import { useEditorStore } from '../../store/useEditorStore'
import { EditorObject as EditorObjectType } from '../../types'

interface Object3DProps {
  object: EditorObjectType
}

export function Object3D({ object }: Object3DProps) {
  const meshRef = useRef<Mesh>(null)
  const selectedId = useEditorStore((state) => state.selectedId)
  const selectObject = useEditorStore((state) => state.selectObject)
  
  const isSelected = selectedId === object.id
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectObject(object.id)
  }
  
  return (
    <mesh
      ref={meshRef}
      position={object.position}
      rotation={object.rotation.map((r) => (r * Math.PI) / 180) as [number, number, number]}
      scale={object.scale}
      onClick={handleClick}
    >
      {object.type === 'cube' ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        <sphereGeometry args={[0.5, 32, 32]} />
      )}
      <meshStandardMaterial
        color={object.color}
        emissive={isSelected ? '#ffffff' : '#000000'}
        emissiveIntensity={isSelected ? 0.3 : 0}
      />
    </mesh>
  )
}
