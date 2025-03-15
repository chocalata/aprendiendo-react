import { React, useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)

  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('effect', { enabled })
    if (!enabled) return

    const handleMove = (event) => {
      const { clientX, clientY } = event

      setPosition({ x: clientX, y: clientY })
    }

    window.addEventListener('mousemove', handleMove)

    // cleanup:
    // --> cuando el componente se desmonta
    // --> cuando cambian las dependencias antes de ejecutar el efecto
    return () => {
      // cleanup method
      console.log('cleanup mousemove')
      window.removeEventListener('mousemove', handleMove)
    }
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      console.log('cleanup no-cursor')
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} Seguir puntero
      </button>
    </>
  )
}

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
