import { Inter } from '@next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'
import db from '../utils/db'
import Product from '../models/product'
import Header from '../components/header'
import Footer from '../components/footer'
import Main from '../components/home/main'
import styles from '../styles/Home.module.scss'
import FlashDeals from '../components/home/flashDeals'
import Category from '../components/home/category'
import ProductsSwiper from '../components/productsSwiper'
import {
  women_dresses,
  women_shoes,
  women_accessories,
  women_swiper,
  gamingSwiper,
  homeImproveSwiper 
} from '../data/home'
import ProductCard from '../components/productCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ country, products }) {
  const { data: session } = useSession()
  const isMedium = useMediaQuery({ query: '(max-width: 850px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 550px)' })
  return <>
    <Header country={country} />
    <div className={styles.home}>
      <div className={styles.container}>
        <Main/>
        <FlashDeals/>
        <div className={styles.home__fashion}>
          <h1>Womens Fashion</h1>
          <div className={styles.home__category}>
            <Category
              header={'Dresses'}
              products={women_dresses}
              background={'#5a31f4'}
            />
            {
              !isMedium && (
                <Category
                  header={'Shoes'} 
                  products={women_shoes}
                  background={'#6cc070'}
                />
              )
            }
            {
             isMobile && (
              <Category
                header={'Shoes'} 
                products={women_shoes}
                background={'#6cc070'}
              />
            ) 
            }
            <Category
              header={'Accessaries'} 
              products={women_accessories}
              background={'#000'}
            />
          </div>
        </div>
        <ProductsSwiper products={women_swiper}/>
        <ProductsSwiper 
          products={gamingSwiper} 
          header={'For Gamers'}
          background={'#2f82ff'}
        />
        <ProductsSwiper 
          products={homeImproveSwiper} 
          header={'Home Improvements'}
          background={'#5a31f4'}
        />
        <div className={styles.products}>
          {
            products.map((product, index) => {
              return (
                <ProductCard key={index} product={product}/>
              )
            })
          }
        </div>
      </div>
    </div>
    <Footer country={country} />
  </>
}

export async function getServerSideProps() {
  await db.connectDB()

  let products = await Product.find().sort({createdAt: -1}).lean()
  let data;
  let error;
  try {
    const res = await axios.get(`https://api.ipregistry.co/?key=${process.env.IPREGISTRY_API_KEY}`)
    data = res.data.location.country
  } catch(err) { 
    error = err
    console.log(err)
  } 
  
  if (error) {
    return {
      props: {
        country: {
          name: JSON.stringify('Nigeria'),
          flag: JSON.stringify('/images/country__flag.jpg'),
          code: JSON.stringify('NGN'),
        }
      }
    }
  }

  return {
    props: {
      country: {
        name: JSON.parse(JSON.stringify(data.name)),
        flag: JSON.parse(JSON.stringify(data.flag.emojitwo)),
        code: JSON.parse(JSON.stringify(data.code))
      },
      products: JSON.parse(JSON.stringify(products, undefined, 4))
    }
  }
}