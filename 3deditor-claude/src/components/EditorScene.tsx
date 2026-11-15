import { useEffect, useRef, useCallback } from 'react';
import { OrbitControls, TransformControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { Mesh } from 'three';
import { useEditorStore } from '../store/useEditorStore';

function EditorMesh({ id }: { id: string }) {
  const ref = useRef<Mesh>(null!);
  const objects = useEditorStore(s => s.objects);
  const selectedId = useEditorStore(s => s.selectedId);
  const tool = useEditorStore(s => s.tool);
  const selectObject = useEditorStore(s => s.selectObject);
  const updateTransform = useEditorStore(s => s.updateTransform);

  const obj = objects.find(o => o.id === id);
  if (!obj) return null;

  const isSelected = selectedId === id;
  const showControls = isSelected && tool !== 'select';
  const mode = tool === 'translate' ? 'translate' : tool === 'rotate' ? 'rotate' : 'scale';

  const handleObjectChange = useCallback(() => {
    if (!ref.current) return;
    const store = useEditorStore.getState();
    const stored = store.objects.find(o => o.id === id);
    if (!stored) return;
    const p = ref.current.position;
    const r = ref.current.rotation;
    const s = ref.current.scale;
    if (
      p.x === stored.position[0] &&
      p.y === stored.position[1] &&
      p.z === stored.position[2] &&
      r.x === stored.rotation[0] &&
      r.y === stored.rotation[1] &&
      r.z === stored.rotation[2] &&
      s.x === stored.scale[0] &&
      s.y === stored.scale[1] &&
      s.z === stored.scale[2]
    ) return;
    updateTransform(id, {
      position: [p.x, p.y, p.z],
      rotation: [r.x, r.y, r.z],
      scale: [s.x, s.y, s.z],
    });
  }, [id, updateTransform]);

  return (
    <>
      <mesh
        ref={ref}
        position={obj.position}
        rotation={obj.rotation}
        scale={obj.scale}
        onClick={e => {
          e.stopPropagation();
          selectObject(obj.id);
        }}
      >
        {obj.type === 'cube' ? (
          <boxGeometry args={[1, 1, 1]} />
        ) : (
          <sphereGeometry args={[0.5, 32, 32]} />
        )}
        <meshStandardMaterial
          color={obj.color}
          emissive={isSelected ? '#4488ff' : '#000000'}
          emissiveIntensity={isSelected ? 0.25 : 0}
        />
      </mesh>

      {showControls && (
          <TransformControls
            mode={mode}
            object={ref}
            onObjectChange={handleObjectChange}
          />
      )}
    </>
  );
}

export default function EditorScene() {
  const objects = useEditorStore(s => s.objects);
  const selectedId = useEditorStore(s => s.selectedId);
  const tool = useEditorStore(s => s.tool);
  const orbitRef = useRef<OrbitControlsImpl>(null!);

  const isTransforming = selectedId !== null && tool !== 'select';

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      const store = useEditorStore.getState();
      if (e.key === '1') store.setTool('select');
      if (e.key === '2') store.setTool('translate');
      if (e.key === '3') store.setTool('rotate');
      if (e.key === '4') store.setTool('scale');
      if ((e.key === 'Delete' || e.key === 'Backspace') && store.selectedId) {
        store.removeSelected();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <color attach="background" args={['#1a1a2e']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      <gridHelper args={[20, 20, '#444466', '#333355']} />
      <axesHelper args={[5]} />

      <OrbitControls
        ref={orbitRef}
        makeDefault
        enabled={!isTransforming}
        dampingFactor={0.1}
      />

      {objects.map(obj => (
        <EditorMesh key={obj.id} id={obj.id} />
      ))}
    </>
  );
}
