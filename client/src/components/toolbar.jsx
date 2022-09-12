
import '../styles/toolbar.scss'
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect'
import canvasState from '../store/canvasState';
import Eraser from '../tools/Eraser';
function Toolbar() {

  const changeColor =  e =>{
    console.log(e.target.value)
    toolState.setStrokeColor(e.target.value)
    toolState.setFillColor(e.target.value)
  }
    return (
      <div className="toolbar">
        <button className='toolbar_btn brush' onClick={()=> toolState.setTool(new Brush(canvasState.canvas))}></button>
        <button className='toolbar_btn rect' onClick={()=> toolState.setTool(new Rect(canvasState.canvas))}></button>
        <button className='toolbar_btn eraser'  onClick={()=> toolState.setTool(new Eraser(canvasState.canvas))}></button>
        <button className='toolbar_btn line'></button>
        <input type="color" onChange={e => changeColor(e)} style={{marginLeft:10}}/>
        {/* <button className='toolbar_btn politra'></button> */}
        <button className='toolbar_btn undo' onClick={()=> canvasState.undo()}></button>
        <button className='toolbar_btn redo' onClick={()=> canvasState.redo()}></button>
        <button className='toolbar_btn save'></button>
      </div>
    );
  }
  
  export default Toolbar;
  