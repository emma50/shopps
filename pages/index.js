import { Inter } from '@next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios'
import Header from '../components/header'
import Footer from '../components/footer'
import Main from '../components/home/main'
import styles from '../styles/Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ country }) {
  const { data: session } = useSession()
  return <>
    <Header country={country} />
    <div className={styles.home}>
      <div className={styles.container}>
        <Main/>
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