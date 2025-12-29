import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <h1 className='bg-red-600 text-center text-white'>Hello World</h1>
    </div>
    </>
  )
}

export default App
