import React from 'react'
import { Button } from './ui/button'
import { CreateModel } from './Models/CreateModel'

const AddProduct = () => {
    return (
        <div className='  py-16 m-10 bg-white/60 shadow-lg drop-shadow-md  items-center '>
            <div className="justify-between relative p-4 md:flex-row flex-col flex">
                <h1> Click on the add product button to generate your ai product</h1>
                {/* <Button>Add Product</Button> */}
                <CreateModel />
            </div>
            <span className='bubble bubble-1 h-[130px] w-[130px] top-6  right-40 mt-[-20px]  opacity-50 z-[-1] rounded-full absolute bg-green-300'></span>
            <span className='bubble bubble-2 h-[100px] w-[100px] top-[86px]  right-80 mt-[-20px]  opacity-50 z-[-1] rounded-full absolute bg-yellow-300'></span>
            <span className='bubble bubble-3 h-[120px] w-[120px] top-[44px]  right-60 mt-[-20px]  opacity-50 z-[-1] rounded-full absolute bg-red-300'></span>

        </div>



    )
}

export default AddProduct