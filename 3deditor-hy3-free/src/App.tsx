import Toolbar from './components/Toolbar';
import Scene from './components/Scene';
import Inspector from './components/Inspector';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Toolbar />
      <div className="workspace">
        <Scene />
        <Inspector />
      </div>
    </div>
  );
}
