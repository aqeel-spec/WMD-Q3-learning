
import SkeletonForm from '@/components/Models/Skelton'
import React from 'react'

const page = () => {
    let isLoading = true
    return (
        <>
            <SkeletonForm isLoading={isLoading} />
        </>
    )
}

export default page