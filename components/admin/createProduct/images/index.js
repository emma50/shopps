import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import { RiDeleteBin7Fill, RiShape2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { GiExtractionOrb } from "react-icons/gi";
import { showDialog } from "../../../../store/dialogSlice";
import styles from "./images.module.scss";

export default function Images({
  images,
  setImages,
  header,
  text,
  name,
  setColorImage,
  ...props
}) {
  const dispatch = useDispatch();

  const fileInput = useRef(null);

  const [meta, field] = useField(props);
  // const { dialog } = useSelector((state) => ({ ...state }));

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
  
    files.forEach((img, index) => {
      if (index === 6) {
        dispatch(
          showDialog({
            header: "A Maximum of 6 images are allowed.",
            msgs: [{
              msg: `Images cannot be more than 6.`,
              type: "error",
            }],
          })
        );
        return;
      }

      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp"
      ) {
        dispatch(
          showDialog({
            header: "Unsupported Image format.",
            msgs: [{
              msg: `${img.name} format is unsupported ! only JPEG,PNG,WEBP are allowed.`,
              type: "error",
            },]
          })
        );

        files = files.filter((item) => item !== img.name);
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
          setImages((images) => [...images, e.target.result]);
          // setImages((images) => [...images, reader.result]);
        };
      }
    });
  };

  const handleRemove = (image) => {
    setImages(
      (images) => images.filter((item) => item !== image)
    );
  };

  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${meta.error ? styles.header__error : ""}`}
      >
        <div className={styles.flex}>
          {meta.error && <img src="../../../images/warning.png" alt="" />}
          {header}
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
        name={name}
        ref={fileInput}
        hidden
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImages}
      />
      <div className={styles.images__main}>
        <div
          className={`${styles.images__main_grid} ${
            images.length === 2
            ? styles.grid__two
            : images.length === 3
            ? styles.grid__three
            : images.length === 4
            ? styles.grid__four
            : images.length === 5
            ? styles.grid__five
            : images.length === 6
            ? styles.grid__six
            : ""
          }`}
        >
          {
            !images.length ? 
            <img src="../../../images/no_image.png" alt=""/> :
            images.map((img, index) => (
              <div className={`${styles.images__main_grid_wrap}`} key={index}>
                <div className={styles.blur}></div>
                <img src={img} alt="" />
                <div className={styles.images__main_grid_actions}>
                  <button onClick={() => handleRemove(img)}>
                    <RiDeleteBin7Fill />
                  </button>
                  <button onClick={() => setColorImage(img)}>
                    <GiExtractionOrb />
                  </button>
                  <button>
                    <RiShape2Line />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <button
        type="reset"
        disabled={images.length === 6}
        style={{
          opacity: `${images.length === 6 && "0.5"}`,
          cursor: `${images.length === 6 ? 'not-allowed' : ''}`,
        }}
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn__primary}`}
      >
        {text}
      </button>
    </div>
  );
}
