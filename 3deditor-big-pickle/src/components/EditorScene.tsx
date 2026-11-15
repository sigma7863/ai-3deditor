import { useEffect, useRef } from "react";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Mesh } from "three";
import { TransformControls as TControls } from "three/examples/jsm/controls/TransformControls.js";
import { useEditorStore } from "../store/useEditorStore";

function SceneObject({
  id,
  ...props
}: {
  id: string;
  type: "cube" | "sphere";
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}) {
  const selectObject = useEditorStore((s) => s.selectObject);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectObject(id);
  };

  return (
    <mesh
      name={id}
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
      onClick={handleClick}
    >
      {props.type === "sphere" ? (
        <sphereGeometry args={[0.8, 32, 32]} />
      ) : (
        <boxGeometry args={[1.2, 1.2, 1.2]} />
      )}
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}

function TransformController() {
  const selectedId = useEditorStore((s) => s.selectedId);
  const transformMode = useEditorStore((s) => s.transformMode);
  const updateObject = useEditorStore((s) => s.updateObject);
  const { scene, camera, gl } = useThree();
  const controlsRef = useRef<TControls | null>(null);

  useEffect(() => {
    const controls = new TControls(camera, gl.domElement);
    controls.setSize(0.5);
    controls.addEventListener("dragging-changed", (event) => {
      const orbit = scene.getObjectByProperty("isOrbitControls", true) as any;
      if (orbit) orbit.enabled = !event.value;
    });
    controls.addEventListener("objectChange", () => {
      if (controls.object && selectedId) {
        const p = controls.object.position;
        const r = controls.object.rotation;
        const s = controls.object.scale;
        useEditorStore.getState().updateObject(selectedId, {
          position: [p.x, p.y, p.z],
          rotation: [r.x, r.y, r.z],
          scale: [s.x, s.y, s.z]
        });
      }
    });
    scene.add(controls);
    controlsRef.current = controls;
    return () => {
      controls.dispose();
      scene.remove(controls);
    };
  }, [camera, gl, scene, selectedId, transformMode, updateObject]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.setMode(transformMode);
  }, [transformMode]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    if (selectedId) {
      const target = scene.getObjectByName(selectedId);
      if (target) controls.attach(target);
    } else {
      controls.detach();
    }
  }, [selectedId, scene]);

  return null;
}

function SceneInner() {
  const objects = useEditorStore((s) => s.objects);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />
      <gridHelper args={[20, 20]} />

      <OrbitControls makeDefault enableZoom />

      {objects.map((obj) => (
        <SceneObject
          key={obj.id}
          id={obj.id}
          type={obj.type}
          position={obj.position}
          rotation={obj.rotation}
          scale={obj.scale}
          color={obj.color}
        />
      ))}

      <TransformController />

      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={["#ff3b30", "#34c759", "#007aff"]} labelColor="white" />
      </GizmoHelper>
    </>
  );
}

export default function EditorScene() {
  const selectObject = useEditorStore((s) => s.selectObject);

  return (
    <div className="scene-container">
      <Canvas
        camera={{ position: [6, 4, 6], fov: 50 }}
        onPointerMissed={() => selectObject(null)}
      >
        <SceneInner />
      </Canvas>
    </div>
  );
}
