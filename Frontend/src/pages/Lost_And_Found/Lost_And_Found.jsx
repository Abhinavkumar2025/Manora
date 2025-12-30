import React from 'react'
import './Lost_And_Found.css'
import Lost_Found_Report from '../../components/Lost_Found_Report/Lost_Found_Report'
import Lost_Stuff_Container from "../../components/Lost_Stuff_Container/Lost_Stuff_Container";
import { useEffect, useState } from "react";

const Lost_And_Found = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch("http://localhost:5000/manora/report");
      const data = await res.json();
      setReports(data);
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="relative h-screen w-full bg-black overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
        <div className="absolute left-0 right-0  h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]">
          <div className='flex flex-col items-center justify-center text-center pt-50'>
            <h1 className=' text-white heading-1'>Don’t worry<br></br> You’re not alone</h1>
            <p className=' text-white sub-heading-1'>Report your lost item and increase the <br></br> chances
              of finding it with help from others</p>
          </div>
        </div>
        <div className="relative z-20 flex items-center justify-end mt-22 pe-16 ">
          <div className="report_form w-[400px] shadow-white-xl/30 rounded-xl">
            <h2 className="report_form_heading text-center font-bold text-xl p-4 ">
              REPORT ITEM
            </h2>
            <Lost_Found_Report/>
          </div>
        </div>
      </div>
      <div className="found_items relative mx-auto mb-10 z-20 w-[1300px] h-[500px] bg-white flex flex-col rounded-xl">
        <div className='m-6 flex justify-between'>
          <h2 className="ps-10  font-bold text-black">FOUND ITEMS</h2>
          <input type="text" placeholder=' Search here' value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} className='bg-white w-[400px]'/>
        </div>
        <div className='found_items_search mt-auto w-[1300px] h-[400px] rounded-b-xl overflow-y-auto'>
          <div className="grid grid-cols-4 gap-6 p-6">
            {filteredReports.map(item => (
              <Lost_Stuff_Container
                key={item._id}
                itemName={item.itemName}
                location={item.location}
                description={item.description}
                reportType={item.reportType}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
        
      </div>       
    </div>
  )
}

export default Lost_And_Found
