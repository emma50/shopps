import { useRouter } from "next/router";
// import { Pagination } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
import Link from "next/link";
// import axios from "axios";
import styles from "../styles/browse.module.scss";
import db from "../utils/db";
import Product from "../models/product";
import Category from "../models/category";
import Header from "../components/header";
import SubCategory from "../models/subCategory";
import {
  filterArray,
  randomize,
  removeDuplicates,
} from "../utils/arraysUtils";
import ProductCard from "../components/productCard";
import CategoryFilter from "../components/browse/categoryFilter";
import SizesFilter from "../components/browse/sizesFilter";
import ColorsFilter from "../components/browse/colorsFilter";
import BrandsFilter from "../components/browse/brandsFilter";
import StylesFilter from "../components/browse/stylesFilter";
import PatternsFilter from "../components/browse/patternsFilter";
import MaterialsFilter from "../components/browse/materialsFilter";
import GenderFilter from "../components/browse/genderFilter";
import HeadingFilters from "../components/browse/headingFilters";

export default function Browse({
  categories,
  subCategories,
  products,
  country,
  sizes,
  colors,
  brands,
  stylesData,
  patterns,
  materials
}) {
  const router = useRouter();

  const filter = ({
    search,
    category,
    brand,
    style,
    size,
    color
  }) => {
    const path = router.pathname;
    const { query } = router;

    // Add query to existing filter query(ies)
    if (search) query.search = search;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (style) query.style = style;
    if (size) query.size = size;
    if (color) query.color = color;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const searchHandler = (search) => {
    if (search === "") {
      filter({ search: {} });
    } else {
      filter({ search });
    }
  };

  const categoryHandler = (category) => {
    filter({ category });
  };

  const brandHandler = (brand) => {
    filter({ brand });
  };

  const styleHandler = (style) => {
    filter({ style })
  };

  const sizeHandler = (size) => {
    filter({ size })
  };

  const colorHandler = (color) => {
    filter({ color })
  };
  
  return (
    <div className={styles.browse}>
      <div>
        <Header country={country} searchHandler={searchHandler} />
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
              categoryHandler={categoryHandler}
            />
            <SizesFilter sizes={sizes} sizeHandler={sizeHandler}/>
            <ColorsFilter colors={colors} colorHandler={colorHandler}/>
            <BrandsFilter brands={brands} brandHandler={brandHandler}/>
            <StylesFilter data={stylesData} styleHandler={styleHandler}/>
            <PatternsFilter patterns={patterns}/>
            <MaterialsFilter materials={materials}/>
            <GenderFilter/>
          </div>
          <div className={styles.browse__store_products_wrap}>
            <HeadingFilters/>
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
  const { query } = ctx

  const searchQuery = query.search || "";
  const categoryQuery = query.category || "";
  
  const brandQuery = query.brand?.split("_") || "";
  const brandRegex = `^${brandQuery[0]}`;
  const brandSearchRegex = createRegex(brandQuery, brandRegex);

  const styleQuery = query.style?.split("_") || "";
  const styleRegex = `^${styleQuery[0]}`;
  const styleSearchRegex = createRegex(styleQuery, styleRegex);

  const sizeQuery = query.size?.split("_") || "";
  const sizeRegex = `^${sizeQuery[0]}`;
  const sizeSearchRegex = createRegex(sizeQuery, sizeRegex);

  const colorQuery = query.color?.split("_") || "";
  const colorRegex = `^${colorQuery[0]}`;
  const colorSearchRegex = createRegex(colorQuery, colorRegex);

  const search = searchQuery && searchQuery !== ""
    ? {
        name: {
          $regex: searchQuery,
          $options: "i",
        },
      }
    : {};

  const category = categoryQuery && categoryQuery !== "" 
    ? { 
        category: categoryQuery 
      } 
    : {};
  
  const brand = brandQuery && brandQuery !== "" 
    ? { 
        brand: {
          $regex: brandSearchRegex,
          $options: "i",
        },
      } 
    : {};

  const style = styleQuery && styleQuery !== ""
    ? {
        "details.value": {
          $regex: styleSearchRegex,
          $options: "i",
        },
      }
    : {};

  const size = sizeQuery && sizeQuery !== ""
    ? {
        "subProducts.sizes.size": {
          $regex: sizeSearchRegex,
          $options: "i",
        },
      }
    : {};

  const color = colorQuery && colorQuery !== ""
    ? {
        "subProducts.color.color": {
          $regex: colorSearchRegex,
          $options: "i",
        },
      }
    : {};
  
  function createRegex(data, styleRegex) {
    if (data.length > 1) {
      for (var i = 1; i < data.length; i++) {
        styleRegex += `|^${data[i]}`;
      }
    }
    return styleRegex;
  }

  await db.connectDB();
  
  let productsDb = await Product.find({
    ...search,
    ...category,
    ...brand,
    ...style,
    ...size,
    ...color,
  }).sort({createdAt: -1}).lean();
  
  let products = randomize(productsDb);
  
  let categories = await Category.find().lean();

  let subCategories = await SubCategory.find()
    .populate({
      path: "parent",
      model: Category,
    })
    .lean();

  let colors = await Product.find({...category}).distinct(
    "subProducts.color.color"
  );

  let brandsDb = await Product.find({...category}).distinct("brand");

  let sizes = await Product.find({...category}).distinct(
    "subProducts.sizes.size"
  );

  let details = await Product.find({...category}).distinct("details");

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
