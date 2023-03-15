import { useState } from 'react'
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from './summary.module.scss'
import ShippingInput from '../../inputs/shipping';
import { applyCoupon } from '../../../requests/user';

export default function Summary({
  totalAfterDiscount,
  setTotalAfterDiscount,
  user,
  cart,
  paymentMethod,
  selectedAddress
}) {
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState('')
  const [error, setError] = useState('')
  const [order_error, setOrder_Error] = useState('')

  const router = useRouter()

  const validateCoupon = Yup.object({
    coupon: Yup.string().required('Please enter a coupon first!')
  })

  const applyCouponHandler = async () => {
    const res = await applyCoupon(coupon)
    console.log('RESPONSE-->', res)
    if (res.message) {
      setError(res.message)
    }
    else {
      setTotalAfterDiscount(res.totalAfterDiscount)
      setDiscount(res.discount)
      setError('')
    }
  }

  const placeOrderHandler = async () => {
    try {
      if (!paymentMethod) {
        setOrder_Error('Please choose a payment method.')
        return;
      }
      if (!selectedAddress) {
        setOrder_Error('Please choose a shipping address.')
        return;
      }
      const { data } = await axios.post('/api/order/create', {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod,
        total: totalAfterDiscount ? totalAfterDiscount : cart.cartTotal,
        totalAfterDiscount: cart.cartTotal,
        couponApplied: coupon
      })
      console.log(data)
      router.push(`/order/${data.orderId}`)
    } catch(e) {
      setOrder_Error(e.response.data.message)
    }
  }

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        Order Summary
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={() => applyCouponHandler()}
        >
          {(formik) =>(
            <>
              <Form>
                <ShippingInput
                  name='coupon'
                  placeholder='*Coupon'
                  onChange={(e) => setCoupon(e.target.value)}
                />
                {error && <span className={styles.error}>{error}</span>}
                <button type="submit">Apply Coupon</button>
                <div className={styles.info}>
                  <span>
                    Total: <b>{cart.cartTotal}$</b>{' '}
                  </span>
                  {
                    discount > 0 && <span className={styles.coupon_span}>
                      Coupon applied: <b>-{discount}%</b>
                    </span>
                  }
                  {
                    totalAfterDiscount &&
                    totalAfterDiscount < cart.cartTotal && <span>
                      New price: <b>{totalAfterDiscount}$</b>  
                    </span>
                  }
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
      <button 
        className={styles.submit_btn}
        onClick={() => placeOrderHandler()}
      >
        Place Order
      </button>
      {order_error && <span className={styles.error}>{order_error}</span>}
    </div>
  )
}
