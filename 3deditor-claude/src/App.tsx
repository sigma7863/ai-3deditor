import Toolbar from './components/Toolbar';
import Viewport from './components/Viewport';
import Inspector from './components/Inspector';

export default function App() {
  return (
    <div className="app">
      <Toolbar />
      <Viewport />
      <Inspector />
    </div>
  );
}
