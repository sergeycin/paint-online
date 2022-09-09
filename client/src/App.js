import Canvas from "./components/canvas";
import Settingbar from "./components/settingbar";
import Toolbar from "./components/toolbar";
import './styles/ap.scss'
function App() {
  return (
    <div className="App">
      <Toolbar/>
      <Settingbar/>
      <Canvas/>
    </div>
  );
}

export default App;
