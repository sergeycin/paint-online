
import '../styles/toolbar.scss'
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect'
import canvasState from '../store/canvasState';
function Toolbar() {
    return (
      <div className="toolbar">
        <button className='toolbar_btn brush' onClick={()=> toolState.setTool(new Brush(canvasState.canvas))}></button>
        <button className='toolbar_btn rect' onClick={()=> toolState.setTool(new Rect(canvasState.canvas))}></button>
        <button className='toolbar_btn eraser'></button>
        <button className='toolbar_btn line'></button>
        <input type="color"  style={{marginLeft:10}}/>
        {/* <button className='toolbar_btn politra'></button> */}
        <button className='toolbar_btn undo'></button>
        <button className='toolbar_btn redo'></button>
        <button className='toolbar_btn save'></button>
      </div>
    );
  }
  
  export default Toolbar;
  