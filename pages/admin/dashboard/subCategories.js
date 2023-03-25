import { useState } from "react"
import Layout from "../../../components/admin/layout"
import db from '../../../utils/db'
import SubCategory from '../../../models/subCategory'
import Category from "../../../models/category"
import Create from "../../../components/admin/subCategories/create"
import List from "../../../components/admin/subCategories/list"

export default function SubCategories({ categories, subCategories }) {
  const [data, setData] = useState(subCategories)
  
  return (
    <div>
      <Layout>
        <Create setSubCategories={setData} categories={categories}/>
        <List subCategories={data} setSubCategories={setData} categories={categories}/>
      </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {
  await db.connectDB()

  const categories = await Category.find({}).sort({updatedAt: -1}).lean()
  const subCategories = await SubCategory.find({})
    .populate({path: 'parent', model: Category})
    .sort({updatedAt: -1}).lean()

  await db.disconnectDB()

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories))
    }
  }
}
