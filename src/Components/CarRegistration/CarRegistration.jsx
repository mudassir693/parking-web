import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'

function CarRegistration() {
    let [form,setForm] =useState({NoPlate:"",Owner:"",PhoneNumber:""})

    let handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    let submit = async()=>{
        if(!form.NoPlate || !form.Owner || !form.PhoneNumber ){
            toast.error("Fields are required")
            return
        }
        let resp;
        try {
            resp = await axios.post('http://localhost:5000/api/cars/registerCar',form)
            toast.success("Car Sucessfully registered.")
            setForm({NoPlate:"",Owner:"",PhoneNumber:""})
            return
        } catch (error) {
            console.log(error.response.data.data)
            toast.error(error.response.data.data)
        }
        


        console.log(form)
    }
  return (
    <div style={{minHeight:'calc(100vh - 53px)'}} className="car-registration w-full h-[full]  bg-[#f6f6f6] flex items-center justify-center">
        <div className="min-w-4xl w-[100%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto bg-white  p-10 rounded-xl ">
            <div className="text-2xl font-bold mb-3">Car Registration</div>
            <div className="flex flex-col justify-start items-start gap-2 w-full max-w-[300px] mx-auto">
                <div className="font-semibold text-[15px]">No Plate</div>
                <input value={form.NoPlate} type="text" onChange={handleChange} name="NoPlate" className="text-[13px] border-black font-normal w-full outline-none border-[1px] rounded-lg p-3" />
            </div>
            <div className="flex flex-col justify-start items-start gap-2 my-4 max-w-[300px] mx-auto">
                <div className="font-semibold text-[15px]">Owner</div>
                <input value={form.Owner} type="text" onChange={handleChange} name="Owner" className="text-[13px] border-black font-normal w-full outline-none border-[1px] rounded-lg p-3" />
            </div>
            <div className="flex flex-col justify-start items-start gap-2 max-w-[300px] mx-auto">
                <div className="font-semibold text-[15px]">Phone</div>
                <input value={form.PhoneNumber} type="text" onChange={handleChange} name="PhoneNumber" className="text-[13px] border-black font-normal w-full outline-none border-[1px] rounded-lg p-3" />
            </div>
            <div className="flex justify-end mt-5">
                <div onClick={submit} className="bg-black rounded-lg text-white font-semibold shadow-lg px-4 py-2 cursor-pointer">
                    register
                </div>
            </div>
        </div>
    </div>
  )
}

export default CarRegistration