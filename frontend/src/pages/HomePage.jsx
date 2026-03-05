import { useState } from 'react'
import Navbar from './../Components/Navbar'
import Hero from './../Components/Hero'
import About from './../Components/About'
import Work from './../Components/Work'
import SDLC from './../Components/SDLC'
import Footer from './../Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Hero id="home" />
        <About id="about" />
        <Work id="work" />
        <SDLC id="contact" />
      </div>
    </>
  )
}

export default App
