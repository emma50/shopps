import Head from 'next/head'
import { useState } from 'react'
import styles from '../../styles/product.module.scss'
import db from '../../utils/db'
import ProductModel from '../../models/product'
import Category from '../../models/category'
import SubCategory from '../../models/subCategory'
import User from '../../models/user'
import Header from '../../components/header'
import Footer from '../../components/footer'
import MainSwiper from '../../components/productPage/mainSwiper'
import Info from '../../components/productPage/info'
import Reviews from '../../components/productPage/reviews'

export default function Product({ product }) {
  console.log(product.reviews)
  const [activeImg, setActiveImg] = useState('')
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header country=''/>
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {product.category.name} /
            {product.subCategories?.map((item, index) => {
              return (
                <span key={index}>{item.name}</span>
              )
            })}
          </div>
          <div className={styles.product__main}>
            {/* <ProductPage/> */}
            <MainSwiper images={product.images} activeImg={activeImg}/>
            <Info product={product} setActiveImg={setActiveImg}/>
          </div>
          <Reviews product={product}/> 
        </div>
      </div>
      <Footer country=''/>
    </>
  )
}

export async function getServerSideProps(context) { 
  const { query } = context
  console.log(query)
  // const { slug, style } = query
  const slug = query.slug
  const style = query.style
  const size = query.size || 0

  await db.connectDB()

  const product = await ProductModel
    .findOne({ slug: JSON.parse(JSON.stringify(slug)) })
    .populate({ path: 'category', model: Category })
    // .populate({ path: 'subCategories._id', model: SubCategory })
    .populate({ path: 'subCategories', model: SubCategory })
    .populate({ path: 'reviews.reviewBy', model: User })
    .lean()
  
  const subProduct = product.subProducts[style]
  const prices = subProduct.sizes.map((size) => {
    return size.price
  }).sort((a, b) => a - b)

  const priceWithDiscount = (subProduct.sizes[size].price) - ((subProduct.discount * subProduct.sizes[size].price) / 100).toFixed(2)

  const hightestPriceWithDiscount = (prices[prices.length - 1] - ((subProduct.discount * prices[prices.length - 1]) / 100).toFixed(2))

  const sortLowestAndHighestPriceWithoutDiscount = `${prices[0].toFixed(2)} - ${prices[prices.length - 1].toFixed(2)}$`

  function flattenArr(arr) {
    const flattenedArray = [];
    // Loop over array contents
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flattenedArray.push(...flattenArr(arr[i]));
      } else {
        flattenedArray.push(arr[i]);
      }
    }
    return flattenedArray;
  }

  let newProduct = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((subProduct) => subProduct.color),
    /* priceRange: prices.length > 1 ? `From ${prices[0]} to ${prices[prices.length - 1]}$` : '', */
    // ${prices[prices.length - 1] - ((subProduct.discount * prices[prices.length - 1]) / 100).toFixed(2)}$
    priceRange: subProduct.discount 
      ? `From ${priceWithDiscount} to ${hightestPriceWithDiscount}$`
      : `From ${prices[0].toFixed(2)} to ${prices[prices.length - 1].toFixed(2)}$`,
    price: subProduct.discount > 0 ? priceWithDiscount : subProduct.sizes[size].price.toFixed(2),
    priceBefore: subProduct.sizes[size].price.toFixed(2),
    quantity: subProduct.sizes[size].qty,
    sortLowestAndHighestPriceWithoutDiscount,
    ratings: [
      {
        'percentage': '78'
      },
      {
        'percentage': '14'
      },
      {
        'percentage': '6'
      },
      {
        'percentage': '4'
      },
      {
        'percentage': '0'
      },
    ],
    allSizes: flattenArr(product.subProducts.map((subProduct) => subProduct.sizes))
    .sort((a,b) => a.size - b.size)
    .filter((ele, index, arr) => {
      return arr.findIndex((ele2) => ele2.size === ele.size) === index
    })
  }

  console.log(product)
  console.log('................................................................................')
  console.log(newProduct)
  await db.disconnectDB()
  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct))
    }
  }
}
