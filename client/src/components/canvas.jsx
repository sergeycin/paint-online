
import { useEffect, useRef } from 'react';

import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import '../styles/canvas.scss'
const Canvas = observer(() => {
  const canvasRef= useRef()

  useEffect(()=>{
    
    canvasState.setCanvas(canvasRef.current)
    // toolState.setTool(new Brush(canvasRef.current))
  },[])

  const mouseeDownHandler = () =>{
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  return (
    <div className="canvas">
        <canvas onMouseDown={() => mouseeDownHandler()} ref={canvasRef}  width={600} height={400}>

        </canvas>
    </div>
  );
})

export default Canvas;
