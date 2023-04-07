import Layout from "../../../components/admin/layout";
import CollapsibleTable from "../../../components/admin/orders/table";
import db from "../../../utils/db";
import Order from "../../../models/order";
import User from "../../../models/user";

export default function orders({ orders }) {
  return (
    <Layout>
      <CollapsibleTable rows={orders} />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDB();

  const orders = await Order.find({})
    .populate({ path: "user", model: User, select: "name email image" })
    .sort({ createdAt: -1 })
    .lean();
    
  await db.disconnectDB()

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
