import { Inter } from '@next/font/google'
import Header from '../components/header'
import Footer from '../components/footer'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ country }) {
  console.log(country)
  // const parsedCountry = JSON.parse(country)
  return (
    <>
      <Header country={country}/>
      <Footer country={country} />
    </>
  )
}

export async function getServerSideProps() {
  let data;
  let error;
  try {
    const res = await axios.get(`https://api.ipregistry.co/?key=${process.env.IPREGISTRY_API_KEY}`)
    console.log(res.data)
    data = res.data.location.country
  } catch(err) { 
    error = err
    console.log(err)
  } 
  
  if (error) {
    return {
      props: {
        country: {
          name: JSON.stringify('An error occurred - Cannot fetch country name'),
          flag: JSON.stringify('An error occurred - Cannot fetch country flag'),
          code: JSON.stringify('An error occurred - Cannot fetch country CODE'),
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