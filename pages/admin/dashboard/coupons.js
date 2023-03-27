import { useState } from "react"
import Layout from "../../../components/admin/layout"
import db from '../../../utils/db'
import Coupon from '../../../models/coupon'
import Create from "../../../components/admin/coupons/create"
import List from "../../../components/admin/coupons/list"

export default function Coupons({ coupons }) {
  const [data, setData] = useState(coupons);

  return (
    <Layout>
      <div>
        <Create setCoupons={setData} />
        <List coupons={data} setCoupons={setData} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDB()

  const coupons = await Coupon.find({}).sort({updatedAt: -1}).lean()

  await db.disconnectDB()

  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons))
    }
  }
}
