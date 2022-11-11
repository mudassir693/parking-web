import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    let navigate = useNavigate()
  return (
    <div className="h-[53px] w-[100vw] bg-white flex items-center justify-center">
        <div className=" flex items-center justify-start    ">
            <div className="flex items-center justify-start gap-4">
                <div onClick={()=>navigate('/')} className="text-xl cursor-pointer font-semibold">Register</div>
                <div onClick={()=>navigate('/record')} className="text-xl cursor-pointer font-semibold">Record</div>
                {/* <div className="text-xl cursor-pointer font-semibold">Cars</div> */}
            </div>
        </div>
    </div>
  )
}

export default Header