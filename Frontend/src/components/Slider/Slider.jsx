import React from 'react'
import './Slider.css'
import img1 from '../../assets/images/intro_section_bg_1.png'
import img2 from '../../assets/images/intro_section_bg_2.png'
import img3 from '../../assets/images/intro_section_bg_3.png'
import img4 from '../../assets/images/intro_section_bg_4.png'
import img5 from '../../assets/images/intro_section_bg_5.png'
import img6 from '../../assets/images/intro_section_bg_6.png'


const Slider = () => {
  return (
    <div className="slider">
        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
        <img src={img4} alt="" />
        <img src={img5} alt="" />
        <img src={img6} alt="" />
    </div>
  )
}

export default Slider
