import { useEditorStore } from '../store/useEditorStore';
import { useMemo, useCallback } from 'react';

function NumericField({
  label,
  value,
  step,
  onChange,
}: {
  label: string;
  value: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="inspector-field">
      <span className="inspector-field-label">{label}</span>
      <input
        type="number"
        value={Number(value.toFixed(2))}
        step={step ?? 0.1}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        className="inspector-input"
      />
    </label>
  );
}

function Vec3Fields({
  label,
  values,
  step,
  onChange,
}: {
  label: string;
  values: [number, number, number];
  step?: number;
  onChange: (vals: [number, number, number]) => void;
}) {
  const axes = ['X', 'Y', 'Z'] as const;
  return (
    <div className="inspector-section">
      <div className="inspector-section-title">{label}</div>
      <div className="inspector-vec3">
        {axes.map((axis, i) => (
          <NumericField
            key={axis}
            label={axis}
            value={values[i]}
            step={step}
            onChange={v => {
              const next: [number, number, number] = [...values];
              next[i] = v;
              onChange(next);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ColorField({
  value,
  onChange,
}: {
  value: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="inspector-section">
      <div className="inspector-section-title">カラー</div>
      <div className="inspector-color-row">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="inspector-color-input"
        />
        <span className="inspector-color-value">{value}</span>
      </div>
    </div>
  );
}

export default function Inspector() {
  const objects = useEditorStore(s => s.objects);
  const selectedId = useEditorStore(s => s.selectedId);
  const updateTransform = useEditorStore(s => s.updateTransform);
  const updateColor = useEditorStore(s => s.updateColor);

  const selected = useMemo(
    () => objects.find(o => o.id === selectedId) ?? null,
    [objects, selectedId],
  );

  const pos = selected?.position ?? [0, 0, 0];
  const rot = selected?.rotation ?? [0, 0, 0];
  const scale = selected?.scale ?? [1, 1, 1];

  const handleChange = useCallback(
    (field: 'position' | 'rotation' | 'scale', values: [number, number, number]) => {
      if (!selected) return;
      updateTransform(selected.id, { [field]: values });
    },
    [selected, updateTransform],
  );

  return (
    <div className="inspector">
      <div className="inspector-header">インスペクター</div>

      {!selected ? (
        <div className="inspector-empty">オブジェクトを選択してください</div>
      ) : (
        <div className="inspector-body">
          <div className="inspector-section">
            <div className="inspector-section-title">種類</div>
            <div className="inspector-type-badge">
              {selected.type === 'cube' ? 'Cube' : 'Sphere'}
            </div>
          </div>

          <Vec3Fields
            label="位置"
            values={pos}
            onChange={v => handleChange('position', v)}
          />

          <Vec3Fields
            label="回転 (deg)"
            values={[
              (rot[0] * 180) / Math.PI,
              (rot[1] * 180) / Math.PI,
              (rot[2] * 180) / Math.PI,
            ]}
            step={5}
            onChange={v =>
              handleChange('rotation', [
                (v[0] * Math.PI) / 180,
                (v[1] * Math.PI) / 180,
                (v[2] * Math.PI) / 180,
              ])
            }
          />

          <Vec3Fields
            label="拡大/縮小"
            values={scale}
            step={0.1}
            onChange={v => handleChange('scale', v)}
          />

          <ColorField
            value={selected.color}
            onChange={c => updateColor(selected.id, c)}
          />

          <div className="inspector-section">
            <div className="inspector-section-title">ID</div>
            <div className="inspector-id">{selected.id}</div>
          </div>
        </div>
      )}
    </div>
  );
}
