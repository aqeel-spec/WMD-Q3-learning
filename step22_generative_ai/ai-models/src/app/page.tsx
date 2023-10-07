import ProductList from '@/components/ProductList'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='container mx-auto p-4'>
      <ProductList />
    </div>
  )
}
