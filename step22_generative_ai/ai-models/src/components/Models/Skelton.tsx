"use client"
import { Label } from '@radix-ui/react-label';
import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


function SkeletonForm({ isLoading }: { isLoading: boolean }) {


    return (
        <form
            onSubmit={(e) => e.preventDefault()} // Prevent form submission while loading
            className="grid grid-cols-1 md:grid-cols-2 gap-2 py-4"
        >
            {/* left grid */}
            <div className="flex flex-col  items-center">
                {/* AI generated image */}
                <div className="p-8">
                    <div
                        className="shadow-2xl w-[300px] h-[300px]  bg-gray-300 animate-pulse ease-in-out
                        rounded-xl p-4 shadow-red-800"
                    ></div>
                </div>
                {/* Description */}
                <div className="grid  pb-4 w-full max-w-sm items-center gap-1.5">
                    <Label className="description  animate-pulse ease-in-out text-gray-300 duration-400 delay-100 w-fit p-2 rounded-full text bg-gray-200 ">Getting description ...</Label>
                    <Textarea
                        className="w-full bg-gray-200 animate-pulse ease-in-out "
                        rows={4}
                        cols={50}
                        maxLength={1000}

                    />
                </div>
            </div>
            {/* Form section */}
            <div className={`flex bg-gray-200 items-center justify-center mx-auto w-full flex-col animate-pulse m-6 ease-linear translate-x-2 `}>
                <div className={`grid pb-2 w-full animate-pulse ease-linear duration-200 delay-150 max-w-sm items-center gap-1.5  `}>
                    <Label htmlFor="title"></Label>
                    <Input type="text" id="title" className='bg-gray-300' />
                </div>
                <div className={`grid pb-2 w-full animate-pulse ease-linear duration-200 delay-150 max-w-sm items-center gap-1.5  `}>
                    <Label htmlFor="title"></Label>
                    <Input type="text" id="title" className='bg-gray-300' />
                </div>
                <div className={`grid pb-2 w-full animate-pulse ease-linear duration-200 delay-150 max-w-sm items-center gap-1.5  `}>
                    <Label htmlFor="title"></Label>
                    <Input type="text" id="title" className='bg-gray-300' />
                </div>
                <div className={`grid pb-2 w-full animate-pulse ease-linear duration-200 delay-150 max-w-sm items-center gap-1.5  `}>
                    <Label htmlFor="title"></Label>
                    <Input type="text" id="title" className='bg-gray-300' />
                </div>
                {/* Update rating skeleton */}
                <div className={`grid pb-2 w-full animate-pulse ease-linear duration-200 delay-150 max-w-sm items-center gap-1.5  `}>
                    <Label htmlFor="title"></Label>
                    <Input type="text" id="title" className='bg-gray-300' />
                </div>
                {/* Buttons skeleton */}
                <div className={`grid pb-2 w-full animate-pulse ease-linear duration-200 delay-150 max-w-sm items-center gap-1.5  `}>
                    <Label htmlFor="title"></Label>
                    <Input type="text" id="title" className='bg-gray-300' />
                </div>
                <button className="mt-4 w-full animate-pulse ease-linear  bg-black/25" ></button>
                <button className="mt-4 w-full animate-pulse ease-linear  bg-black/25 " ></button>
            </div>

        </form>
    );
}

export default SkeletonForm;
