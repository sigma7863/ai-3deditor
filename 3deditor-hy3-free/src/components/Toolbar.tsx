import { useEditorStore } from '../store/useEditorStore';
import type { ToolMode } from '../types';

const tools: { mode: ToolMode; label: string; icon: string }[] = [
  { mode: 'select', label: '選択', icon: '↖' },
  { mode: 'translate', label: '移動', icon: '✛' },
  { mode: 'rotate', label: '回転', icon: '↻' },
  { mode: 'scale', label: '拡大/縮小', icon: '⤢' },
];

export default function Toolbar() {
  const tool = useEditorStore((s) => s.tool);
  const setTool = useEditorStore((s) => s.setTool);
  const addCube = useEditorStore((s) => s.addCube);
  const addSphere = useEditorStore((s) => s.addSphere);
  const removeSelected = useEditorStore((s) => s.removeSelected);
  const selectedId = useEditorStore((s) => s.selectedId);

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button className="toolbar-btn" onClick={addCube} title="Cube 追加">
          <span className="toolbar-icon">■</span>
          <span className="toolbar-label">Cube</span>
        </button>
        <button className="toolbar-btn" onClick={addSphere} title="Sphere 追加">
          <span className="toolbar-icon">●</span>
          <span className="toolbar-label">Sphere</span>
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        {tools.map((t) => (
          <button
            key={t.mode}
            className={`toolbar-btn ${tool === t.mode ? 'active' : ''}`}
            onClick={() => setTool(t.mode)}
            title={t.label}
          >
            <span className="toolbar-icon">{t.icon}</span>
            <span className="toolbar-label">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="toolbar-divider" />

      <button
        className="toolbar-btn danger"
        onClick={removeSelected}
        disabled={!selectedId}
        title="削除"
      >
        <span className="toolbar-icon">✕</span>
        <span className="toolbar-label">削除</span>
      </button>
    </div>
  );
}
