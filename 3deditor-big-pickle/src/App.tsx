import EditorScene from "./components/EditorScene";
import Toolbar from "./components/Toolbar";
import Inspector from "./components/Inspector";

export default function App() {
  return (
    <div className="app">
      <Toolbar />
      <div className="main">
        <EditorScene />
        <Inspector />
      </div>
    </div>
  );
}
