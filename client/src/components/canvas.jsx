
import { useEffect, useRef } from 'react';

import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/canvas.scss'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Canvas = observer(() => {
  const params = useParams()
  const canvasRef= useRef()
  const userNameRef = useRef()
  const [modal,setModal] = useState(true)



  useEffect(()=>{
    
    canvasState.setCanvas(canvasRef.current)

  },[])



  useEffect(()=>{
    if(canvasState.username){
      const socket = new WebSocket(`ws://localhost:8000/`)
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id)
      socket.onopen = () =>{

        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: "connection"
        }))
      }

      socket.onmessage = (event) =>{
        let msg = JSON.parse(event.data)
          switch(msg.method){
              case "connection":
                console.log(`Пользователь ${msg.username} подключился`)
                break
                case "draw":
                  drawHandler(msg)
                  break

          }
  
      }
    }
  

  },[canvasState.username])

  const drawHandler = (msg) =>{

  }


  const mouseeDownHandler = () =>{
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }
  
  const connectHandler = () =>{
    canvasState.setUserName(userNameRef.current.value)
    setModal(false)
  }

  return (
    <div className="canvas">
        <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <input type="text" ref={userNameRef}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectHandler()}>
            Войти
          </Button>
   
        </Modal.Footer>
      </Modal>
        <canvas onMouseDown={() => mouseeDownHandler()} ref={canvasRef}  width={600} height={400}>

        </canvas>
    </div>
  );
})

export default Canvas;
