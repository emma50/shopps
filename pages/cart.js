import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '../styles/cart.module.scss'
import Header from '../components/cart/header'
import Empty from '../components/cart/empty'
import Product from '../components/cart/product'
import CartHeader from '../components/cart/cartHeader'
import Checkout from '../components/cart/checkout'
import PaymentMethods from '../components/cart/paymentMethods'
import ProductsSwiper from '../components/productsSwiper'
import { women_swiper } from '../data/home'
import { saveCart } from '../requests/user'
import { updateCart, emptyCart } from '../store/cartSlice'

export default function Cart() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selected, setSelected] = useState([])
  const dispatch = useDispatch()
  let cart = useSelector((state) => state.cart)
  const [shippingFee, setShippingFee] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
 
  useEffect(() => {
    setShippingFee(selected.reduce((acc, value) => acc + value.shipping, 0))
    setSubTotal(selected.reduce((acc, value) => acc + (value.price * value.qty), 0))
    setTotal(selected.reduce((acc, value) => acc + (value.price * value.qty), 0) + shippingFee)
  }, [selected])

  useEffect(() => {
    dispatch(emptyCart())
    const updateCartDB = async () => {
      const { data } = await axios.post('/api/updateCart', {
        products: cart.cartItems
      })
      dispatch(updateCart(data))
    }
    if (cart.cartItems.length > 0) {
      updateCartDB()
    }
  }, [])

  const saveCartToDBHandler = async () => {
    if (session) {
      await saveCart(selected, session.user.id)
      router.push('/checkout')
    }
    else {
      signIn()
    }
  }

  return (
    <>
      <Header/>
      <div className={styles.cart}>
        {
          session && cart.cartItems.length > 0 
          ? <div className={styles.cart__container}>
              <CartHeader 
                cartItems={cart.cartItems}
                selected={selected}
                setSelected={setSelected}
              />
              <div className={styles.cart__products}>
                {
                  cart.cartItems.map((product) => {
                    return (
                      <Product 
                        product={product} 
                        key={product._uid}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    )
                  })
                }
              </div>
              <Checkout 
                subTotal={subTotal}
                shippingFee={shippingFee}
                total={total}
                selected={selected}
                saveCartToDBHandler={saveCartToDBHandler}
              />
              <PaymentMethods/>
            </div>
          : <Empty/>
        }
        <div style={{padding: '0 1rem', transform: 'translateY(-30px)'}}>
         <ProductsSwiper products={women_swiper}/>
        </div>
      </div>
    </>
  )
}
