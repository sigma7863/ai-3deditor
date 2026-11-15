import { useEffect, useRef } from 'react';
import type * as THREE from 'three';
import type { EditorObject as EditorObjectData } from '../types';

interface Props {
  obj: EditorObjectData;
  selected: boolean;
  onSelect: (id: string) => void;
  registerRef: (id: string, object: THREE.Object3D | null) => void;
}

export default function EditorObject({ obj, selected, onSelect, registerRef }: Props) {
  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    registerRef(obj.id, ref.current);
    return () => registerRef(obj.id, null);
  }, [obj.id, registerRef]);

  return (
    <mesh
      ref={ref}
      position={obj.position}
      rotation={obj.rotation}
      scale={obj.scale}
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        onSelect(obj.id);
      }}
    >
      {obj.type === 'cube' ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        <sphereGeometry args={[0.6, 32, 32]} />
      )}
      <meshStandardMaterial
        color={obj.color}
        emissive={obj.color}
        emissiveIntensity={selected ? 0.4 : 0}
      />
    </mesh>
  );
}
