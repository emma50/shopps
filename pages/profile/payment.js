import { getSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../../components/profile/layout";
import User from "../../models/user";
import Payment from "../../components/checkout/payment";
import styles from "../../styles/profile.module.scss";
import db from '../../utils/db'

export default function PaymentProfile({ user, tab, defaultPaymentMethod }) {
  const router = useRouter();
  const [dbPM, setDbPM] = useState(defaultPaymentMethod);
  const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);
  const [error, setError] = useState("");

  const handlePM = async () => {
    try {
      const { data } = await axios.put("/api/user/changePM", {
        paymentMethod,
      });

      setError("");
      setDbPM(data.paymentMethod);

      // window.location.reload(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Layout session={user.user} tab={tab}>
      <div className={styles.header}>
        <h2>MY PAYMENT METHODS</h2>
      </div>
      <Payment
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        profile
      />
      <button
        disabled={!paymentMethod || paymentMethod === dbPM}
        className={`${styles.button} ${
          !paymentMethod || paymentMethod === dbPM ? styles.disabled : ""
        }`}
        onClick={() => handlePM()}
      >
        Save
      </button>
      {error && <span className={styles.error}>{error}</span>}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  await db.connectDB()
 
  const user = await User.findById(session.user.id).select(
    "defaultPaymentMethod"
  );

  await db.disconnectDB()
  
  return {
    props: {
      user: session,
      tab,
      defaultPaymentMethod: user.defaultPaymentMethod,
    },
  };
}
