import AddProduct from '@/components/AddProduct'
import ProductList from '@/components/ProductList'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='container mx-auto p-4'>
      {/* generate ai product */}
      <AddProduct />
      <ProductList />
      
    </main>
  )
}
