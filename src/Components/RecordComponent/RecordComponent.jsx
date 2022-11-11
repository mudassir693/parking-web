import React, { useState } from 'react'
import {AiOutlineCheck} from 'react-icons/ai'
import { toast } from 'react-toastify';
import {ImCross} from 'react-icons/im'
import axios from 'axios'
function RecordComponent() {
    let [type,setType] = useState('NoPlate')
    let [cred,setCred] = useState('')
    let [availableCars, setAvailablecars] = useState([])
    let [selectedCar, setSelectedCar] = useState({NoPlate:""})

    let handleChange = async(e)=>{
        setCred(e.target.value)

        try {
            if(e.target.value.length>0){
                let resp = await axios.get(`http://localhost:5000/api/cars/getCarByCred/?type=${type}&cred=${e.target.value}`)
                setAvailablecars(resp.data.data)
            }else{
                setAvailablecars([])
            }
        } catch (error) {
            console.log(error.response.data.data)
            toast.error(error.response.data.data)
        }
    }
    let entry = async(arg)=>{
        let body = {
            CarNo:selectedCar.NoPlate,
            Status:arg
        }

        try {
            const resp = await axios.post('http://localhost:5000/api/records/trackCar',body)
            toast.success("Record sucessfully maintain")
            setSelectedCar({NoPlate:""})
            setCred("")
        } catch (error) {
            console.log(error.response.data.data)
            toast.error(error.response.data.data)
        }
    }
  return (
    <div style={{minHeight:'calc(100vh - 53px)'}} className="car-registration w-full h-[full]  bg-[#f6f6f6] flex items-center justify-center" >
        <div className="min-w-4xl w-[100%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] shadow-xl mx-auto bg-white  p-10 rounded-xl">
            <div className="text-2xl font-bold mb-3">Search By</div>
            <div className="flex items-center justify-start gap-5">
                <div onClick={()=>setType('NoPlate')} className=" flex cursor-pointer items-center justify-start flex-col">
                    <div className="w-[20px] h-[20px] border-[1px] flex items-center justify-center rounded border-black">
                        {type=='NoPlate' && <AiOutlineCheck />}
                    </div>
                    <div className="font-semibold text-[12px]">No Plate</div>
                </div>
                <div onClick={()=>setType('Owner')} className=" flex cursor-pointer items-center justify-start flex-col">
                    <div className="w-[20px] h-[20px] border-[1px] flex items-center justify-center rounded border-black">
                        {type=='Owner' && <AiOutlineCheck />}
                    </div>
                    <div className="font-semibold text-[12px]">Owner</div>
                </div>
                <div onClick={()=>setType('PhoneNumber')} className=" flex cursor-pointer items-center justify-start flex-col">
                    <div className="w-[20px] h-[20px] border-[1px] flex items-center justify-center rounded border-black">
                        {type=='PhoneNumber' && <AiOutlineCheck />}
                    </div>
                    <div className="font-semibold text-[12px]">Phone Number</div>
                </div>
            </div>
            <div className="flex relative flex-col justify-start items-start gap-2 w-full max-w-[350px] mx-auto mt-5">
                {type=='NoPlate'&&<div className="font-semibold text-[15px]"> No Plate</div>}
                {type=='Owner'&&<div className="font-semibold text-[15px]"> Owner Name</div>}
                {type=='PhoneNumber'&&<div className="font-semibold text-[15px]"> No Plate</div>}

                {selectedCar.NoPlate=='' && <input value={cred} onChange={handleChange} type="text" name="Search" className="text-[13px] border-black font-normal w-full outline-none border-[1px] rounded-lg p-3" />}

                {availableCars.length>0 && <div className="absolute top-[100%] left-0 w-full bg-white  max-h-[100px] overflow-y-scroll">
                    {availableCars.map(each=>(
                        <div>
                        {true && <div onClick={()=>{setSelectedCar(each);setAvailablecars([])}} className="text-[13px] font-light p-2 hover:bg-gray-100 cursor-pointer">{each.NoPlate}</div>}
                        {/* {type=='Owner' && <div className="text-[13px] font-light p-2">{each.Owner}</div>}
                        {type=='PhoneNumber' && <div className="text-[13px] font-light p-2">{each.PhoneNumber}</div>} */}

                        </div>
                    ))}

                </div>}
                {selectedCar.NoPlate!=='' && <div className="shadow-lg rounded-lg p-5 w-full">
                    <div className="flex justify-end">
                        <div onClick={()=>setSelectedCar({NoPlate:"",Owner:"",PhoneNumber:""})} className="w-[20px] flex justify-center items-center cursor-pointer h-[20px] rounded-full border-[1px] border-gray-200">
                            <ImCross className='text-[12px]' />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-semibold">{selectedCar.Owner}</div>
                        <div className="">
                            <div className="text-xl font-normal">{selectedCar.NoPlate}</div>
                            <div className=" font-light">{selectedCar.PhoneNumber}</div>
                        </div>
                    </div>
                        <div className=" mt-5">
                            <div className="text-sm font-semibold">Register: {new Date(selectedCar.RegistrationDate).toDateString()} </div>
                            <div className="text-sm font-semibold">Expiration: {new Date(selectedCar.ExpirationDate).toDateString()}</div>
                        </div>
                    
                </div>}
            </div>
            {selectedCar.NoPlate!=='' && <div className="my-4">
                <div className="flex items-center justify-end gap-5">
                    <div onClick={()=>entry('in')} className="py-2 px-5 rounded-lg bg-black text-white font-semibold shadow-lg cursor-pointer min-w-[100px] text-center">In</div>
                    <div onClick={()=>entry('out')} className="py-2 px-5 rounded-lg bg-black text-white font-semibold shadow-lg cursor-pointer min-w-[100px] text-center">Out</div>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default RecordComponent