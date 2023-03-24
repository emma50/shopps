import { useState } from "react"
import Layout from "../../../components/admin/layout"
import db from '../../../utils/db'
import Category from '../../../models/category'
import Create from "../../../components/admin/categories/create"
import List from "../../../components/admin/categories/list"

export default function Categories({ categories }) {
  const [data, setData] = useState(categories)
  
  return (
    <div>
      <Layout>
        <Create setCategories={setData}/>
        <List categories={data} setCategories={setData}/>
      </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {
  await db.connectDB()

  const categories = await Category.find({}).sort({updatedAt: -1}).lean()

  await db.disconnectDB()

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories))
    }
  }
}
