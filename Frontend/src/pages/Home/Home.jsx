import React from 'react'
import Slider from '../../components/Slider/Slider'
import './Home.css'

const Home = () => {
  return (
    <div className="relative h-[90vh] overflow-hidden">
      <Slider />   {/* background slideshow */}

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <h1 className="intro-title-1 text-white ">Discover Amazing</h1>
        <h2 className="intro-title-2 " >Destinations</h2>
      </div>
    </div>

  )
}

export default Home
