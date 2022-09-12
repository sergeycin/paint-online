import Canvas from "./components/canvas";
import Settingbar from "./components/settingbar";
import Toolbar from "./components/toolbar";
import './styles/ap.scss'
import {BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
import Components from "./Components";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes > 
      <Route path="/:id" element={ <Components/>}/>  
       
      <Route
        path="/"
        element={<Navigate to={`f${(+new Date).toString(16)}`} replace />}
    />
       </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
