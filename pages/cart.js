import Header from '../components/header'
import Footer from '../components/footer'

const country = {
  flag: '/images/country__flag.jpg',
  name: 'Nigeria',
  code: 'NGN'
}

export default function Cart() {
  return (
    <>
    <Header country={country}/>
    <div>cart</div>
    <div>cart</div>
    <div>cart</div>
    <div>cart</div>
    <div>cart</div>
    <div>cart</div>
    <div>cart</div>
    <div>cart</div>
    <div>cart</div>
    <div>cart</div>
    <div>cart</div>
    <Footer country={country}/>
    </>
  )
}
