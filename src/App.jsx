import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [parts, setParts] = useState([]);

  const [mousePos, setMousePos] = useState({
    x: '',
    y: ''
  });

  const canvasRef = useRef(null)

  useEffect(() => {
    handleRenderCanvas()
  }, [])

  useEffect(() => {
    parts.forEach(() => handleDrawPart())
  }, [parts])

  const handleDrawPart = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, 40, 0, 2 * Math.PI);
    ctx.stroke();
  }

  const handleRenderCanvas = () => {
    if(canvasRef.current){
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const img = new Image();

      img.src = '/camisa_manga_gola.jpg';

      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
  } 

  function getMousePos(evt) {
    if(canvasRef.current){
      const rect = canvasRef.current.getBoundingClientRect();
      
      setMousePos({
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      })
    }
  }

  function fixPosition(){
    const currentPos = {
      x: mousePos.x, 
      y: mousePos.y
    }
    setParts([...parts, currentPos])
  }
  
  return (
    <div>
      <canvas
        style={{border: '1px solid black'}}
        width={500} 
        height={300} 
        ref={canvasRef}
        onMouseMove={getMousePos}
        onClick={fixPosition}
      ></canvas>
      <div>
        {mousePos.x} / {mousePos.y}
      </div>

      <form>
        {parts.map(part => (
          <div className='part-input-container'>
            <div className='input-group'>
              <label>x</label>
              <input value={part.x} />
            </div>
            <div className='input-group'>
              <label>y</label>
              <input value={part.y}/>
            </div>
            <div className='input-group'>
              <label>Nome</label>
              <input/>
            </div>
            <div>
              <button>Lixo</button>
            </div>
          </div>
        ))}
      </form>
    </div>
  )
}

export default App
