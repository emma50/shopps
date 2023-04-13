import { getSession } from "next-auth/react";
import { useState } from "react";
import Layout from "../../components/profile/layout";
import User from "../../models/user";
import Shipping from "../../components/checkout/shipping";
import db from '../../utils/db'
import styles from "../../styles/profile.module.scss";

export default function Addresses({ user, tab }) {
  const [addresses, setAddresses] = useState(user.address.address);
  console.log('USER-->', user)

  return (
    <Layout session={user.user} tab={tab}>
      <div className={styles.header}>
        <h2>MY ADDRESSES</h2>
      </div>
      <Shipping
        user={user}
        addresses={addresses}
        setAddresses={setAddresses}
        profile
      />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });

  const tab = query.tab || 0;

  await db.connectDB()
  
  const address = await User.findById(session.user.id)
    .select("address")
    .lean();

  return {
    props: {
      user: {
        user: session.user,
        address: JSON.parse(JSON.stringify(address)),
      },
      tab,
    },
  };
}
