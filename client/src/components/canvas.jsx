
import { useEffect, useRef } from 'react';

import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/canvas.scss'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import toolState from '../store/toolState';
import { set } from 'mobx';
import axios from 'axios'

const Canvas = observer(() => {
  const params = useParams()
  const canvasRef= useRef()
  const userNameRef = useRef()
  const [modal,setModal] = useState(true)
  const [users,setUsers] = useState('')


  useEffect(()=>{
    
    canvasState.setCanvas(canvasRef.current)
    let ctx = canvasRef.current.getContext('2d')
    axios.get(`http://localhost:8000/image?id=${params.id}`).then(response =>{
      const img = new Image()
        img.src = response.data
        img.onload = () =>{
            ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height)
          ctx.drawImage(img,0,0,canvasRef.current.width,canvasRef.current.height)
        
        }
    } )

  },[])



  useEffect(()=>{
    if(canvasState.username){
      const socket = new WebSocket(`ws://localhost:8000/`)
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id)
      toolState.setTool(new Brush(canvasRef.current,socket,params.id))
      socket.onopen = () =>{

        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: "connection",

        }))
      }

      socket.onmessage = (event) =>{
        let msg = JSON.parse(event.data)
          switch(msg.method){
              case "connection":
                let textusers = `Пользователь ${msg.username} подключился`
                setUsers(prev => [...prev, <p>{textusers}</p>])
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
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')

    switch (figure.type){
      case 'brush':
        Brush.draw(ctx,figure.x,figure.y)
        break
       case 'rect':
        Rect.staticdraw(ctx,figure.x,figure.y,figure.width,figure.height,figure.color)
        break 
        case "finish":
          ctx.beginPath()
          break
    }
  }


  const mouseeDownHandler = () =>{
    canvasState.pushToUndo(canvasRef.current.toDataURL())
    axios.post(`http://localhost:8000/image?id=${params.id}`,{img: canvasRef.current.toDataURL()})
    .then(res => console.log(res))
  }
  
  const connectHandler = () =>{
    canvasState.setUserName(userNameRef.current.value)
    setModal(false)
  }

  return (
    
    <div className="canvas">
      <div className="canvas__users">
      {users}
      </div>
    
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
