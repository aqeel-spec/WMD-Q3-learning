import { notFound } from 'next/navigation';
import React from 'react'

export const dynamicParams = false // true | false,


export async function generateStaticParams () {
  const names : string[] = ["zia","zeeshan","hira"];

  return names.map((name) => ({
    name : name
  }))
}

export default function GiveName({ params, searchParams }: {
  params: { name: string },
  searchParams: { id: string },

  

}) {
   
    if (!params.name) return notFound()
    return (
      <div>
            My name is {params.name}.
            
      </div>
    )
  }