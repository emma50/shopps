import { ErrorMessage, useField } from "formik";
import { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import { TbArrowUpRightCircle } from "react-icons/tb";
import Image from 'next/image';
import styles from "./colors.module.scss";

export default function Colors({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}) {
  const [toggle, setToggle] = useState(false);
  const [colors, setColors] = useState([]);

  const [field, meta] = useField(props);

  const renderSwatches = () => {
    return colors.map((color, id) => (
      <div
        className={styles.square__color}
        key={id}
        style={{ backgroundColor: color }}
        onClick={() => {
          setProduct({
            ...product,
            color: { 
              color, 
              image: product.color.image
            },
          });
        }}
      >
        {color}
      </div>
    ));
  };

  return (
    <div className={styles.colors}>
      <div
        className={`${styles.header} ${
          meta.error[name] ? styles.header__error : ""
        }`}
      >
        <div className={styles.flex}>
          {
            meta.error[name] && 
            // <img src="../../../images/warning.png" alt="" />
            <Image src={'/images/warning.png'} alt=""/>
          }
          Pick a product color
        </div>
        <span>
          {meta.touched && meta.error && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="text"
        value={product.color.color}
        name={name}
        hidden
        {...field}
        {...props}
      />
      <div className={styles.colors__infos}></div>
      <div className={toggle ? styles.toggle : ""}>
        <ColorExtractor getColors={(colors) => setColors(colors)}>
          {/* <img src={colorImage} style={{ display: "none" }} /> */}
          <Image src={colorImage} alt="" style={{ display: "none" }}/>
        </ColorExtractor>
        <div className={styles.wheel}>{renderSwatches()}</div>
      </div>
      {
        colors.length > 0 && 
          <TbArrowUpRightCircle
            className={styles.toggle__btn}
            onClick={() => setToggle((prev) => !prev)}
            style={{ transform: `${toggle ? "rotate(180deg)" : ""}` }}
          />
      }
    </div>
  );
}
