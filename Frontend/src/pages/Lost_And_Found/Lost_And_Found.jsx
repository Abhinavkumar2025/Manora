import React from 'react'
import './Lost_And_Found.css'
import Lost_Found_Report from '../../components/Lost_Found_Report/Lost_Found_Report'

const Lost_And_Found = () => {
  return (
    <div>
      <div className="relative h-screen w-full bg-black overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
        <div className="absolute left-0 right-0  h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]">
          <div className='flex flex-col items-center justify-center text-center pt-50'>
            <h1 className='text-white heading-1'>Don’t worry<br></br> You’re not alone</h1>
            <p className=' text-white sub-heading-1'>Report your lost item and increase the <br></br> chances
              of finding it with help from others</p>
          </div>
        </div>
        <div className="relative z-20 flex items-center justify-end mt-22 pe-16 ">
          <div className="report_form w-[400px] shadow-xl rounded-xl">
            <h2 className="report_form_heading text-center font-bold text-xl p-4">
              REPORT ITEM
            </h2>
            <Lost_Found_Report/>
          </div>
        </div>
      </div>
      <div className="relative bottom-0  z-20 w-[400px] h-[300px]  bg-white shadow-xl rounded-l-xl">
        <h2 className="p-4 font-bold text-black">Found Items</h2>
        <p className="px-4 text-black">hey</p>
      </div>       
    </div>
  )
}

export default Lost_And_Found
