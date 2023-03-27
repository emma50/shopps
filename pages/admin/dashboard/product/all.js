import { useState } from 'react'
import styles from '../../../../styles/products.module.scss'
import Layout from '../../../../components/admin/layout'
import db from '../../../../utils/db'
import Product from '../../../../models/product'
import Category from '../../../../models/category'

export default function AllProducts({ products }) {
  console.log('PRODUCTS--->', products)
  const [data, setData] = useState(products)
  
  return (
    <div>
      <Layout>
        <div className={styles.header}>All Products</div>
      </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {
  await db.connectDB()

  const products = await Product.find({}).sort({updatedAt: -1})
    .populate({path: 'category', model: Category})
    .sort({updatedAt: -1}).lean()

  await db.disconnectDB()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}
