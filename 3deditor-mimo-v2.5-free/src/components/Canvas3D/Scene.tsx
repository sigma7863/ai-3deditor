import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment } from '@react-three/drei'
import { useEditorStore } from '../../store/useEditorStore'
import { Object3D } from './Object3D'

export function Scene() {
  const objects = useEditorStore((state) => state.objects)
  const selectObject = useEditorStore((state) => state.selectObject)
  
  const handleCanvasClick = () => {
    selectObject(null)
  }
  
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      onClick={handleCanvasClick}
      style={{ background: '#1a1a2e' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <OrbitControls makeDefault />
      <Grid
        args={[20, 20]}
        cellSize={1}
        cellThickness={1}
        cellColor="#444"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#888"
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />
      <Environment preset="city" />
      
      {objects.map((obj) => (
        <Object3D key={obj.id} object={obj} />
      ))}
    </Canvas>
  )
}
