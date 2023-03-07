import { getSession } from 'next-auth/react'
import { useState } from 'react'
import styles from '../styles/checkout.module.scss' 
import db from '../utils/db'
import User from '../models/user'
import Cart from '../models/cart'
import Header from '../components/cart/header'
import Shipping from '../components/checkout/shipping'

export default function Checkout({ cart, user }) {
  const [selectedAddress, setSelectedAddress] = useState()

  return (
    <>
      <Header/>
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping 
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            user={user}
          />
        </div>
        <div className={styles.checkout__side}>

        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  await db.connectDB()

  const user = await User.findById(session.user.id)
  const cart = await Cart.findOne({ user: user._id })

  await db.disconnectDB()

  if (!cart) {
    return {
      props: {
        redirect: {
          destination: '/cart'
        }
      }
    }
  }

  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user))
    }
  }
}