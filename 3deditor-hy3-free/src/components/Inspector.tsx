import { useEditorStore } from '../store/useEditorStore';
import type { EditorObject } from '../types';

interface Vec3Props {
  title: string;
  value: [number, number, number];
  onChange: (value: [number, number, number]) => void;
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="inspector-field">
      <span>{label}</span>
      <input
        type="number"
        step={0.1}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      />
    </label>
  );
}

function Vec3({ title, value, onChange }: Vec3Props) {
  const axes = ['X', 'Y', 'Z'] as const;
  return (
    <div className="inspector-row">
      <div className="inspector-row-title">{title}</div>
      <div className="inspector-row-fields">
        {axes.map((axis, i) => (
          <NumberField
            key={axis}
            label={axis}
            value={value[i]}
            onChange={(v) => {
              const next = [...value] as [number, number, number];
              next[i] = v;
              onChange(next);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Inspector() {
  const selectedId = useEditorStore((s) => s.selectedId);
  const objects = useEditorStore((s) => s.objects);
  const updateTransform = useEditorStore((s) => s.updateTransform);
  const updateColor = useEditorStore((s) => s.updateColor);
  const removeSelected = useEditorStore((s) => s.removeSelected);

  const obj: EditorObject | undefined = objects.find((o) => o.id === selectedId);

  if (!obj) {
    return (
      <aside className="inspector">
        <div className="inspector-empty">オブジェクトを選択してください</div>
      </aside>
    );
  }

  return (
    <aside className="inspector">
      <div className="inspector-header">
        <span className="inspector-type">
          {obj.type === 'cube' ? 'Cube' : 'Sphere'}
        </span>
        <span className="inspector-id">{obj.id}</span>
      </div>

      <Vec3
        title="位置 (Position)"
        value={obj.position}
        onChange={(v) => updateTransform(obj.id, { position: v })}
      />
      <Vec3
        title="回転 (Rotation)"
        value={obj.rotation}
        onChange={(v) => updateTransform(obj.id, { rotation: v })}
      />
      <Vec3
        title="拡大縮小 (Scale)"
        value={obj.scale}
        onChange={(v) => updateTransform(obj.id, { scale: v })}
      />

      <div className="inspector-row">
        <div className="inspector-row-title">色 (Color)</div>
        <input
          type="color"
          value={obj.color}
          onChange={(e) => updateColor(obj.id, e.target.value)}
        />
      </div>

      <button className="inspector-delete" onClick={removeSelected}>
        削除
      </button>
    </aside>
  );
}
