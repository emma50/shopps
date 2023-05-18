import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from "next/router";
import slugify from "slugify";
import { FiExternalLink } from "react-icons/fi";
import Layout from "../../components/profile/layout";
import { ordersLinks } from "../../data/profile";
import Order from "../../models/order";
import styles from "../../styles/profile.module.scss";
import db from "../../utils/db";

export default function Orders({ user, tab, orders }) {
  const router = useRouter();

  return (
    <Layout session={user.user} tab={tab}>
      <Head>
        <title>Orders</title>
      </Head>
      <div className={styles.orders}>
        <div className={styles.header}>
          <h2>MY ORDERS</h2>
        </div>
        <nav>
          <ul>
            {ordersLinks.map((link, i) => (
              <li
                key={i}
                className={
                  slugify(link.name, { lower: true }) ===
                  router.query.q.split("__")[0]
                    ? styles.active
                    : ""
                }
              >
                <Link
                  href={`/profile/orders?tab=${tab}&q=${slugify(link.name, {
                    lower: true,
                  })}__${link.filter}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="table_div">
        <table>
          <thead>
            <tr>
              <td>Order id</td>
              <td>Products</td>
              <td>Payment Method</td>
              <td>Total</td>
              <td>Paid</td>
              <td>Status</td>
              <td>view</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td className={styles.orders__images}>
                  {order.products.map((p) => (
                    // <img src={p.image} key={p._id} alt="" />
                    <Image src={p.image} alt="" key={p._id}/>
                  ))}
                </td>
                <td>
                  {order.paymentMethod === "paypal"
                    ? "Paypal"
                    : order.paymentMethod === "credit_card"
                    ? "Credit Card"
                    : "COD"}
                </td>
                <td>{order.total}$</td>
                <td className={styles.orders__paid}>
                  {order.isPaid ? (
                    // <img src="../../../images/verified.png" alt="" />
                    <Image src={'/images/verified.png'} alt=""/>
                  ) : (
                    // <img src="../../../images/unverified.png" alt="" />
                    <Image src={'/images/unverified.png'} alt=""/>
                  )}
                </td>
                <td>{order.status}</td>
                <td>
                  <Link href={`/order/${order._id}`}>
                    <FiExternalLink />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  //------------
  const filter = query.q.split("__")[1];

  await db.connectDB()

  let orders = [];

  if (!filter) {
    orders = await Order.find({ user: session?.user.id })
      .sort({
        createdAt: -1,
      })
      .lean();
  } 
  else if (filter === "paid") {
    orders = await Order.find({ user: session?.user.id, isPaid: true })
      .sort({
        createdAt: -1,
      })
      .lean();
  } 
  else if (filter === "unpaid") {
    orders = await Order.find({ user: session?.user.id, isPaid: false })
      .sort({
        createdAt: -1,
      })
      .lean();
  } 
  else {
    orders = await Order.find({ user: session?.user.id, status: filter })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  await db.disconnectDB()

  return {
    props: {
      user: session,
      tab,
      orders: JSON.parse(JSON.stringify(orders))
    },
  };
}
