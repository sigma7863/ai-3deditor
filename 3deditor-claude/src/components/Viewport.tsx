import { Canvas } from '@react-three/fiber';
import EditorScene from './EditorScene';
import { useEditorStore } from '../store/useEditorStore';

export default function Viewport() {
  const selectObject = useEditorStore(s => s.selectObject);

  return (
    <div className="viewport">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        onPointerMissed={() => selectObject(null)}
      >
        <EditorScene />
      </Canvas>
    </div>
  );
}
