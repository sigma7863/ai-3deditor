import { useEditorStore } from "../store/useEditorStore";

function Vec3Editor({
  label,
  value,
  onChange
}: {
  label: string;
  value: [number, number, number];
  onChange: (v: [number, number, number]) => void;
}) {
  return (
    <div className="vec3-field">
      <span className="vec3-label">{label}</span>
      {(["X", "Y", "Z"] as const).map((axis, i) => (
        <label key={axis} className="vec3-axis">
          <span>{axis}</span>
          <input
            type="number"
            step={0.1}
            value={Number(value[i].toFixed(2))}
            onChange={(e) => {
              const v: [number, number, number] = [...value];
              v[i] = parseFloat(e.target.value) || 0;
              onChange(v);
            }}
          />
        </label>
      ))}
    </div>
  );
}

export default function Inspector() {
  const objects = useEditorStore((s) => s.objects);
  const selectedId = useEditorStore((s) => s.selectedId);
  const updateObject = useEditorStore((s) => s.updateObject);

  const obj = objects.find((o) => o.id === selectedId);

  if (!obj) {
    return (
      <div className="inspector">
        <p className="inspector-empty">No object selected</p>
      </div>
    );
  }

  return (
    <div className="inspector">
      <h3 className="inspector-title">
        {obj.type === "cube" ? "Cube" : "Sphere"} ({obj.id})
      </h3>

      <div className="inspector-section">
        <h4>Transform</h4>
        <Vec3Editor label="Position" value={obj.position} onChange={(v) => updateObject(obj.id, { position: v })} />
        <Vec3Editor label="Rotation" value={obj.rotation} onChange={(v) => updateObject(obj.id, { rotation: v })} />
        <Vec3Editor label="Scale" value={obj.scale} onChange={(v) => updateObject(obj.id, { scale: v })} />
      </div>

      <div className="inspector-section">
        <h4>Color</h4>
        <label className="color-field">
          <input
            type="color"
            value={obj.color}
            onChange={(e) => updateObject(obj.id, { color: e.target.value })}
          />
          <span>{obj.color}</span>
        </label>
      </div>
    </div>
  );
}
