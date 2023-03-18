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

export default function Order({ orderData }) {
  console.log('orderData-->', orderData)
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
                ID:{' '}{orderData._id}
              </div>
              <div className={styles.order__header_status}>
                Payment status: {
                  orderData.isPaid 
                  ? <img src='/images/verified.png' alt="paid" /> 
                  : <img src='/images/unverified.png' alt="paid" /> 
                }
              </div>
              <div className={styles.order__header_status}>
                Order status:{' '}
                <span
                  className={
                    orderData.status === 'Not Processed' 
                    ? styles.not_processed
                    : orderData.status === 'Processing' 
                    ? styles.processing
                    : orderData.status === 'Dispatched' 
                    ? styles.dispatched
                    : orderData.status === 'Cancelled' 
                    ? styles.cancelled
                    : orderData.status === 'Completed' 
                    ? styles.completed
                    : ''
                  }
                >
                  {orderData.status}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {
                orderData.products.map((product) => (
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
              <div className={styles.order__products_total}>
                {
                  orderData.couponApplied 
                  ? <>
                    <div className={styles.order__products_total_sub}>
                      <span>Subtotal:</span>{' '}
                      <span>{orderData.totalBeforeDiscount}$</span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>
                        Coupon Applied:
                      </span>{' '}
                      <span>
                        <em>({orderData.couponApplied})</em>
                      </span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>Amount Saved:</span>{' '}
                      <span>
                        {orderData.totalBeforeDiscount - orderData.total}$
                      </span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>Tax Price:</span>{' '}
                      <span>+{orderData.taxPrice}$</span>
                    </div>
                    <div 
                      className={
                        `${styles.order__products_total_sub} ${styles.bordertop}`
                      }
                    >
                      <span>TOTAL AMOUNT TO PAY:</span>{' '}
                      <b>{orderData.total}$</b>
                    </div>
                  </>
                  : <>
                    <div className={styles.order__products_total_sub}>
                      <span>Tax Price:</span>{' '}
                      <span>+{orderData.taxPrice}$</span>
                    </div>
                    <div 
                      className={
                        `${styles.order__products_total_sub} ${styles.bordertop}`
                      }
                    >
                      <span>TOTAL AMOUNT TO PAY:</span>{' '}
                      <b>{orderData.total}$</b>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
          <div className={styles.order__actions}>
            <div className={styles.order__address}>
              <h1>Customer&#39;s order</h1>
              <div className={styles.order__address_user}>
                <div className={styles.order__address_user_info}>
                  <img src={orderData.user.image} alt="" />
                  <div>
                    <span>{orderData.user.name}</span>
                    <span>{orderData.user.email}</span>
                  </div>
                </div>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Shipping Address</h2>
                <span>
                  {orderData.shippingAddress.firstName}{' '}
                  {orderData.shippingAddress.lastName}
                </span>
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.city},
                  {orderData.shippingAddress.state}
                </span>
                <span>{orderData.shippingAddress.zipCode}</span>
                <span>{orderData.shippingAddress.country}</span>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Billing Address</h2>
                <span>
                  {orderData.shippingAddress.firstName}{' '}
                  {orderData.shippingAddress.lastName}
                </span>
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.city},
                  {orderData.shippingAddress.state}
                </span>
                <span>{orderData.shippingAddress.zipCode}</span>
                <span>{orderData.shippingAddress.country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const id = query.id

  const order = await OrderModel.findById(id).populate('user').lean()

  return {
    props: {
      orderData: JSON.parse(JSON.stringify(order))
    }
  }
}

