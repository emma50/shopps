import { useState } from "react";
import styles from "../browse.module.scss";

export default function Size({ size }) {
  const [show, setShow] = useState(false);

  return (
    <label htmlFor={size} className={styles.filter__sizes_size}>
      <input type="checkbox" name="size" id={size} />
      <label htmlFor={size}>{size}</label>
    </label>
  );
}
