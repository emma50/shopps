import { IoIosArrowForward } from "react-icons/io";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useReducer, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import db from "../../utils/db";
// import StripePayment from "../../components/stripePayment";
import styles from "../../styles/order.module.scss";
import Header from "../../components/header";
import OrderModel from "../../models/order";
// import User from "../../models/user";

export default function Order({ order }) {
  console.log('ORDER-->', order)
  return (
    <>
      <Header country='Country'/>
      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__info}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Home <IoIosArrowForward/> 
                Orders <IoIosArrowForward/> 
                ID:{' '}{order._id}
              </div>
              <div className={styles.order__header_status}>
                Payment status: {
                  order.isPaid 
                  ? <img src='/images/verified.png' alt="paid" /> 
                  : <img src='/images/unverified.png' alt="paid" /> 
                }
              </div>
              <div className={styles.order__header_status}>
                Order status:{' '}
                <span
                  className={
                    order.status === 'Not Processed' 
                    ? styles.not_processed
                    : order.status === 'Processing' 
                    ? styles.processing
                    : order.status === 'Dispatched' 
                    ? styles.dispatched
                    : order.status === 'Cancelled' 
                    ? styles.cancelled
                    : order.status === 'Completed' 
                    ? styles.completed
                    : ''
                  }
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {
                order.products.map((product) => (
                  <div className={styles.product} key={product._id}>
                    <div className={styles.product__img}>
                      <img src={product.image} alt={product.name}></img>
                    </div>
                    <div className={styles.product__info}>
                      <h1 className={styles.product__info_name}>
                        {
                          product.name.length > 28 
                          ? `${product.name.slice(0, 28)}...`
                          : product.name
                        }
                      </h1>
                      <div className={styles.product__info_style}>
                        <img src={product.color.image} alt="" /> / {product.size}
                      </div>
                      <div className={styles.product__info_priceQty}>
                        {product.price}$ * {product.qty}
                      </div>
                      <div className={styles.product__info_total}>
                        {product.price * product.qty}$
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className={styles.order__action}></div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const id = query.id

  const order = await OrderModel.findById(id).populate('user').lean()
  console.log('ORDER-->', order)

  return {
    props: {
      order: JSON.parse(JSON.stringify(order))
    }
  }
}

