import { Canvas3D } from '../Canvas3D'
import { Toolbar } from '../Toolbar'
import { Inspector } from '../Inspector'

export function Viewport() {
  return (
    <div className="viewport">
      <Toolbar />
      <Canvas3D />
      <Inspector />
    </div>
  )
}
