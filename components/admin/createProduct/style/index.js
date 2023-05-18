import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Image from 'next/image'
import styles from "./style.module.scss";
import { showDialog } from "../../../../store/dialogSlice";

export default function Style({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}) {
  const dispatch = useDispatch();

  const fileInput = useRef(null);
  const [meta, field] = useField(props);

  const handleImage = (e) => {
    let img = e.target.files[0];

    if (
      img.type !== "image/jpeg" &&
      img.type !== "image/png" &&
      img.type !== "image/webp"
    ) {
      dispatch(
        showDialog({
          header: "Unsupported Format.",
          msgs: [
            {
              msg: `${img.name} format is unsupported ! only JPEG,PNG,WEBP are allowed.`,
              type: "error",
            },
          ],
        })
      );
      return;
    } 
    
    else if (img.size > 1024 * 1024 * 10) {
      dispatch(
        showDialog({
          header: "File size too large.",
          msgs: [{
            msg: `${img.name} size is too large, maximum of 10mb allowed.`,
            type: "error",
          }]
        })
      );
      return;
    } 
    
    else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        let obj = {
          color: product.color.color,
          image: e.target.result,
        };
        setProduct({
          ...product,
          color: obj,
        });
      };
    }
  };

  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${
          meta.error ? styles.header__error : ""
        }`}
      >
        <div className={styles.flex}>
          {
            meta.error && 
            // <img src="../../../images/warning.png" alt="" />
            <Image src="/images/warning.png" alt="" />
          }
          Pick a Product style image
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
        type="file"
        name="colorImageInput"
        ref={fileInput}
        hidden
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImage}
      />
      <button
        type="reset"
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn__primary}`}
      >
        Pick Style
      </button>
    </div>
  );
}
