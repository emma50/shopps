import Head from "next/head";
import { useSession } from "next-auth/react";
import { TbUsers } from "react-icons/tb";
import { SlHandbag, SlEye } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import Link from "next/link";
import Layout from '../../../components/admin/layout'
import styles from '../../../styles/dashboard.module.scss'
import db from '../../../utils/db'
import User from "../../../models/user";
import Order from "../../../models/order";
import Product from "../../../models/product";
import Dropdown from "../../../components/admin/dashboard/dropdown";
import Notifications from "../../../components/admin/dashboard/notifications";

export default function Dashboard({ users, orders, products }) {
  const { data: session } = useSession();

  return (
    <div>
       <Head>
        <title>Shopps - Admin Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Search here..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.image} />
            <Notifications />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
            <div className={styles.card__infos}>
              <h4>+{users.length}</h4>
              <span>Users</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
            <div className={styles.card__infos}>
              <h4>+{orders.length}</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__infos}>
              <h4>+{products.length}</h4>
              <span>Products</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card__infos}>
              <h4>+{orders.reduce((a, val) => a + val.total, 0).toFixed(2)}$</h4>
              <h5>
                -
                {orders
                  .filter((o) => !o.isPaid)
                  .reduce((a, val) => a + val.total, 0)}
                $ Unpaid yet.
              </h5>
              <span>Total Earnings</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Recent Orders</h2>
              <Link href="/admin/dashboard/orders">View All</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Total</td>
                  <td>Payment</td>
                  <td>Status</td>
                  <td>View</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user.name}</td>
                    <td>{order.total} $</td>
                    <td>
                      {order.isPaid ? (
                        <img src="../../../images/verified.webp" alt="" />
                      ) : (
                        <img src="../../../images/unverified1.png" alt="" />
                      )}
                    </td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          order.status === "Not Processed"
                            ? styles.not_processed
                            : order.status === "Processing"
                            ? styles.processing
                            : order.status === "Dispatched"
                            ? styles.dispatched
                            : order.status === "Cancelled"
                            ? styles.cancelled
                            : order.status === "Completed"
                            ? styles.completed
                            : ""
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <SlEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>Recent Users</h2>
              <Link href="/admin/dashboard/users">View All</Link>
            </div>
            <table>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className={styles.user}>
                      <span className={styles.user__img}>
                        <img src={user.image} alt="" />
                      </span>
                      <span 
                          style={{
                            display: 'table-cell',
                            verticalAlign: 'inherit',
                            color: 'inherit',
                            fontSize: '16px'
                          }}
                        >
                        <h4>{user.name}</h4>
                        <span>{user.email}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  await db.connectDB()

  const users = await User.find().lean();

  const orders = await Order.find()
    .populate({ path: "user", model: User })
    .lean();

  const products = await Product.find().lean();

  await db.disconnectDB()

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

