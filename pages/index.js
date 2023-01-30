import { Inter } from '@next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/header'
import Footer from '../components/footer'
import Main from '../components/home/main'
import styles from '../styles/Home.module.scss'
import FlashDeals from '../components/home/flashDeals'
import Category from '../components/home/category'
import {
  women_dresses,
  women_shoes,
  women_accessories 
} from '../data/home'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ country }) {
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
        {/* <div className={styles.home__category}>
          <Category
            header={'Dresses'}
            products={women_dresses}
            background={'#5a31f4'}
          />
          <Category
            header={'Shoes / High Heels'} 
            products={women_shoes}
            background={'#6cc070'}
          />
          <Category
            header={'Accessaries'} 
            products={women_accessories}
            background={'#000'}
          />
        </div> */}
      </div>
    </div>
    <Footer country={country} />
  </>
}

export async function getServerSideProps() {
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
        name: JSON.stringify(data.name),
        flag: JSON.stringify(data.flag.emojitwo),
        code: JSON.stringify(data.code)
      }
    }
  }

}