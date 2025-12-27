import React from 'react'
import { useForm } from "react-hook-form";
import './Lost_Found_Report.css'


const Lost_Found_Report = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Report Data:", data);
    };
  return (
    <form id='report_form' onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-6">

        {/* Report Type */}
        <div className="flex flex-col">
            <label htmlFor="reportType">Report Type</label>
            <select
                id='reportType'
                {...register("reportType", { required: "Please select report type" })}
                className="border p-2 rounded "
            >
                <option value="">Lost / Found</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select>
            {errors.reportType && (
                <span className="text-red-500 text-sm">
                    {errors.reportType.message}
                </span>
            )}
        </div>

        {/* Item Name */}
        <div className="flex flex-col">
            <label htmlFor="itemName">Item Name</label>
            <input
                type="text"
                id='itemName'
                placeholder="Item Name"
                {...register("itemName", { required: "Item name is required" })}
                className="border p-2 rounded"
            />
            {errors.itemName && (
                <span className="text-red-500 text-sm">
                    {errors.itemName.message}
                </span>
            )}
        </div>

        {/* Location */}
        <div className="flex flex-col">
            <label htmlFor="location">Location</label>
            <input type="text" id='location' placeholder="Location" {...register("location", { required: "Location is required" })} className="border p-2 rounded"/>
        </div>
        
        {/* Description */}
        <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea id='description' placeholder="Description" {...register("description")} className="border p-2 rounded"/>

        </div>

        {/* Submit */}
        <button type="submit" className="bg-black text-white py-2 rounded hover:bg-gray-800">
            Submit Report
        </button>
    </form>
    
  )
}

export default Lost_Found_Report
