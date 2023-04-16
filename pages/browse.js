import { useRouter } from "next/router";
// import { Pagination } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
import Link from "next/link";
// import axios from "axios";
import styles from "../styles/browse.module.scss";
import db from "../utils/db";
import Product from "../models/Product";
import Category from "../models/Category";
import Header from "../components/header";
import SubCategory from "../models/SubCategory";
import {
  filterArray,
  randomize,
  removeDuplicates,
} from "../utils/arraysUtils";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/browse/categoryFilter";

export default function Browse({
  categories,
  subCategories,
  products,
  country,
}) {
  const router = useRouter();

  return (
    <div className={styles.browse}>
      <div>
        <Header country={country} />
      </div>
      <div className={styles.browse__container}>
        <div>
          <div className={styles.browse__path}>Home / Browse</div>
          <div className={styles.browse__tags}>
            {categories.map((c) => (
              <Link href="" key={c._id} legacyBehavior>
                <a>{c.name}</a>
              </Link>
            ))}
          </div>
        </div>
        <div
          className={`${styles.browse__store}`}
        >
          <div
            className={`${styles.browse__store_filters} ${styles.scrollbar}`}
          >
            <button
              className={styles.browse__clearBtn}
              onClick={() => router.push("/browse")}
            >
              Clear All ({Object.keys(router.query).length})
            </button>
            <CategoryFilter
              categories={categories}
              // subCategories={subCategories}
            />
          </div>
          <div className={styles.browse__store_products_wrap}>
            <div className={styles.browse__store_products}>
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDB();
  
  let productsDb = await Product.find({}).sort({createdAt: -1}).lean();
  
  let products = randomize(productsDb);
  
  let categories = await Category.find().lean();

  let subCategories = await SubCategory.find()
    .populate({
      path: "parent",
      model: Category,
    })
    .lean();

  let colors = await Product.find({}).distinct(
    "subProducts.color.color"
  );

  let brandsDb = await Product.find({}).distinct("brand");

  let sizes = await Product.find({}).distinct(
    "subProducts.sizes.size"
  );

  let details = await Product.find({}).distinct("details");

  let stylesDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDb = filterArray(details, "Material");
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);
  let brands = removeDuplicates(brandsDb);

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
      sizes,
      colors,
      brands,
      stylesData: styles,
      patterns,
      materials,
      country: {
        name: "Nigeria",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
      },
    },
  };
}
