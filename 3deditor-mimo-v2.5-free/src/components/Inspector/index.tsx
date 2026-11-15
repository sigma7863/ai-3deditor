import { useEditorStore } from '../../store/useEditorStore'

export function Inspector() {
  const objects = useEditorStore((state) => state.objects)
  const selectedId = useEditorStore((state) => state.selectedId)
  const updateObject = useEditorStore((state) => state.updateObject)
  
  const selectedObject = objects.find((obj) => obj.id === selectedId)
  
  if (!selectedObject) {
    return (
      <div className="inspector">
        <div className="inspector-header">
          <h2 className="inspector-title">Inspector</h2>
        </div>
        <div className="inspector-empty">
          <p>Select an object to inspect</p>
        </div>
      </div>
    )
  }
  
  const handlePositionChange = (index: number, value: number) => {
    const newPosition = [...selectedObject.position] as [number, number, number]
    newPosition[index] = value
    updateObject(selectedObject.id, { position: newPosition })
  }
  
  const handleRotationChange = (index: number, value: number) => {
    const newRotation = [...selectedObject.rotation] as [number, number, number]
    newRotation[index] = value
    updateObject(selectedObject.id, { rotation: newRotation })
  }
  
  const handleScaleChange = (index: number, value: number) => {
    const newScale = [...selectedObject.scale] as [number, number, number]
    newScale[index] = value
    updateObject(selectedObject.id, { scale: newScale })
  }
  
  const handleColorChange = (color: string) => {
    updateObject(selectedObject.id, { color })
  }
  
  const handleNameChange = (name: string) => {
    updateObject(selectedObject.id, { name })
  }
  
  const axes = ['X', 'Y', 'Z'] as const
  const colors = ['#4a90d9', '#d94a4a', '#4ad97a', '#d9d94a', '#9b59b6', '#e67e22', '#1abc9c', '#e74c3c']
  
  return (
    <div className="inspector">
      <div className="inspector-header">
        <h2 className="inspector-title">Inspector</h2>
      </div>
      
      <div className="inspector-content">
        <div className="inspector-section">
          <label className="inspector-label">Name</label>
          <input
            type="text"
            className="inspector-input"
            value={selectedObject.name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
        
        <div className="inspector-section">
          <label className="inspector-label">Type</label>
          <div className="inspector-value">{selectedObject.type}</div>
        </div>
        
        <div className="inspector-section">
          <label className="inspector-label">Position</label>
          <div className="inspector-vector">
            {axes.map((axis, index) => (
              <div key={axis} className="vector-component">
                <span className={`axis-label axis-${axis.toLowerCase()}`}>{axis}</span>
                <input
                  type="number"
                  className="inspector-number"
                  value={selectedObject.position[index]}
                  onChange={(e) => handlePositionChange(index, parseFloat(e.target.value) || 0)}
                  step={0.1}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="inspector-section">
          <label className="inspector-label">Rotation</label>
          <div className="inspector-vector">
            {axes.map((axis, index) => (
              <div key={axis} className="vector-component">
                <span className={`axis-label axis-${axis.toLowerCase()}`}>{axis}</span>
                <input
                  type="number"
                  className="inspector-number"
                  value={selectedObject.rotation[index]}
                  onChange={(e) => handleRotationChange(index, parseFloat(e.target.value) || 0)}
                  step={1}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="inspector-section">
          <label className="inspector-label">Scale</label>
          <div className="inspector-vector">
            {axes.map((axis, index) => (
              <div key={axis} className="vector-component">
                <span className={`axis-label axis-${axis.toLowerCase()}`}>{axis}</span>
                <input
                  type="number"
                  className="inspector-number"
                  value={selectedObject.scale[index]}
                  onChange={(e) => handleScaleChange(index, parseFloat(e.target.value) || 0)}
                  step={0.1}
                  min={0.1}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="inspector-section">
          <label className="inspector-label">Color</label>
          <div className="color-picker">
            {colors.map((color) => (
              <button
                key={color}
                className={`color-swatch ${selectedObject.color === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
          <input
            type="color"
            className="color-input"
            value={selectedObject.color}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
