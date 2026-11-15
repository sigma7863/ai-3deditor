import { useEditorStore } from '../../store/useEditorStore'
import { TransformMode } from '../../types'

export function Toolbar() {
  const addObject = useEditorStore((state) => state.addObject)
  const removeObject = useEditorStore((state) => state.removeObject)
  const selectedId = useEditorStore((state) => state.selectedId)
  const transformMode = useEditorStore((state) => state.transformMode)
  const setTransformMode = useEditorStore((state) => state.setTransformMode)
  
  const transformModes: { mode: TransformMode; label: string; icon: string }[] = [
    { mode: 'translate', label: 'Move', icon: '↔' },
    { mode: 'rotate', label: 'Rotate', icon: '↻' },
    { mode: 'scale', label: 'Scale', icon: '⇔' },
  ]
  
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h3 className="toolbar-title">Add Object</h3>
        <div className="toolbar-buttons">
          <button
            className="toolbar-btn add-btn"
            onClick={() => addObject('cube')}
          >
            <span className="btn-icon">▢</span>
            <span className="btn-text">Cube</span>
          </button>
          <button
            className="toolbar-btn add-btn"
            onClick={() => addObject('sphere')}
          >
            <span className="btn-icon">○</span>
            <span className="btn-text">Sphere</span>
          </button>
        </div>
      </div>
      
      <div className="toolbar-section">
        <h3 className="toolbar-title">Transform</h3>
        <div className="toolbar-buttons">
          {transformModes.map(({ mode, label, icon }) => (
            <button
              key={mode}
              className={`toolbar-btn transform-btn ${transformMode === mode ? 'active' : ''}`}
              onClick={() => setTransformMode(mode)}
            >
              <span className="btn-icon">{icon}</span>
              <span className="btn-text">{label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="toolbar-section">
        <h3 className="toolbar-title">Actions</h3>
        <div className="toolbar-buttons">
          <button
            className="toolbar-btn delete-btn"
            onClick={() => selectedId && removeObject(selectedId)}
            disabled={!selectedId}
          >
            <span className="btn-icon">✕</span>
            <span className="btn-text">Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
