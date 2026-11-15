import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls, Grid } from '@react-three/drei';
import { useReducer, useRef } from 'react';
import type * as THREE from 'three';
import { useEditorStore } from '../store/useEditorStore';
import EditorObject from './EditorObject';

export default function Scene() {
  const objects = useEditorStore((s) => s.objects);
  const selectedId = useEditorStore((s) => s.selectedId);
  const tool = useEditorStore((s) => s.tool);
  const selectObject = useEditorStore((s) => s.selectObject);
  const updateTransform = useEditorStore((s) => s.updateTransform);

  const meshRefs = useRef<Map<string, THREE.Object3D>>(new Map());
  const [, forceRender] = useReducer((x: number) => x + 1, 0);

  const registerRef = (id: string, object: THREE.Object3D | null) => {
    if (object) meshRefs.current.set(id, object);
    else meshRefs.current.delete(id);
    forceRender();
  };

  const target = selectedId ? meshRefs.current.get(selectedId) : undefined;
  const showGizmo = Boolean(target) && tool !== 'select';
  const mode = tool === 'rotate' ? 'rotate' : tool === 'scale' ? 'scale' : 'translate';

  return (
    <Canvas
      className="scene"
      shadows
      camera={{ position: [4, 4, 6], fov: 50 }}
      onPointerMissed={() => selectObject(null)}
    >
      <color attach="background" args={['#1e1e24']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
      <Grid
        args={[20, 20]}
        cellColor="#3a3a44"
        sectionColor="#55556a"
        infiniteGrid
        fadeDistance={30}
      />

      {objects.map((o) => (
        <EditorObject
          key={o.id}
          obj={o}
          selected={o.id === selectedId}
          onSelect={selectObject}
          registerRef={registerRef}
        />
      ))}

      {showGizmo && target && (
        <TransformControls
          object={target}
          mode={mode}
          onObjectChange={() => {
            if (!target) return;
            updateTransform(selectedId!, {
              position: [target.position.x, target.position.y, target.position.z],
              rotation: [target.rotation.x, target.rotation.y, target.rotation.z],
              scale: [target.scale.x, target.scale.y, target.scale.z],
            });
          }}
        />
      )}

      <OrbitControls makeDefault />
    </Canvas>
  );
}
