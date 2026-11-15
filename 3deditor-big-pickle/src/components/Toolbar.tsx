import { useEditorStore } from "../store/useEditorStore";
import type { TransformMode } from "../types";

const modeButtons: { mode: TransformMode; label: string; icon: string }[] = [
  { mode: "translate", label: "Move", icon: "\u2192" },
  { mode: "rotate", label: "Rotate", icon: "\u21BB" },
  { mode: "scale", label: "Scale", icon: "\u2195" }
];

export default function Toolbar() {
  const addObject = useEditorStore((s) => s.addObject);
  const transformMode = useEditorStore((s) => s.transformMode);
  const setTransformMode = useEditorStore((s) => s.setTransformMode);
  const selectedId = useEditorStore((s) => s.selectedId);
  const removeObject = useEditorStore((s) => s.removeObject);

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button onClick={() => addObject("cube")} title="Add Cube">
          + Cube
        </button>
        <button onClick={() => addObject("sphere")} title="Add Sphere">
          + Sphere
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        {modeButtons.map(({ mode, label, icon }) => (
          <button
            key={mode}
            className={transformMode === mode ? "active" : ""}
            onClick={() => setTransformMode(mode)}
            title={label}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {selectedId && (
        <>
          <div className="toolbar-divider" />
          <button className="danger" onClick={() => removeObject(selectedId)} title="Delete">
            Delete
          </button>
        </>
      )}
    </div>
  );
}
