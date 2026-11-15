import { useRef, useCallback } from "react";
import { Mesh } from "three";
import { useEditorStore } from "../store/useEditorStore";
import type { EditorObject as EditorObjectType } from "../types";

interface Props {
  object: EditorObjectType;
}

export default function EditorObject({ object }: Props) {
  const meshRef = useRef<Mesh>(null);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectObject = useEditorStore((s) => s.selectObject);

  const isSelected = selectedId === object.id;

  const handleClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      selectObject(object.id);
    },
    [object.id, selectObject]
  );

  return (
    <mesh
      ref={meshRef}
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      onClick={handleClick}
    >
      {object.type === "sphere" ? (
        <sphereGeometry args={[0.8, 32, 32]} />
      ) : (
        <boxGeometry args={[1.2, 1.2, 1.2]} />
      )}
      <meshStandardMaterial color={object.color} />
    </mesh>
  );
}
