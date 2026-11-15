import { useRef, useEffect } from 'react'
import { TransformControls as DreiTransformControls } from '@react-three/drei'
import { useEditorStore } from '../../store/useEditorStore'
import * as THREE from 'three'

export function TransformControls() {
  const transformRef = useRef<THREE.TransformControls>(null)
  const selectedId = useEditorStore((state) => state.selectedId)
  const transformMode = useEditorStore((state) => state.transformMode)
  const objects = useEditorStore((state) => state.objects)
  const updateObject = useEditorStore((state) => state.updateObject)
  
  const selectedObject = objects.find((obj) => obj.id === selectedId)
  
  useEffect(() => {
    if (transformRef.current) {
      transformRef.current.setMode(transformMode)
    }
  }, [transformMode])
  
  useEffect(() => {
    if (!transformRef.current) return
    
    const controls = transformRef.current
    
    const handleChange = () => {
      if (!selectedObject || !controls.object) return
      
      const obj = controls.object as THREE.Object3D
      
      updateObject(selectedObject.id, {
        position: [
          Math.round(obj.position.x * 100) / 100,
          Math.round(obj.position.y * 100) / 100,
          Math.round(obj.position.z * 100) / 100,
        ],
        rotation: [
          Math.round(THREE.MathUtils.radToDeg(obj.rotation.x) * 10) / 10,
          Math.round(THREE.MathUtils.radToDeg(obj.rotation.y) * 10) / 10,
          Math.round(THREE.MathUtils.radToDeg(obj.rotation.z) * 10) / 10,
        ],
        scale: [
          Math.round(obj.scale.x * 100) / 100,
          Math.round(obj.scale.y * 100) / 100,
          Math.round(obj.scale.z * 100) / 100,
        ],
      })
    }
    
    controls.addEventListener('objectChange', handleChange)
    
    return () => {
      controls.removeEventListener('objectChange', handleChange)
    }
  }, [selectedObject, updateObject])
  
  if (!selectedObject) return null
  
  return (
    <DreiTransformControls
      ref={transformRef}
      object={undefined}
      position={selectedObject.position}
      rotation={selectedObject.rotation.map((r) => (r * Math.PI) / 180) as [number, number, number]}
      scale={selectedObject.scale}
    />
  )
}
