import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../browse.module.scss";

export default function StyleFilter({ data }) {
  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Style <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {data.map((style, i) => {
            return (
              <div
                key={i}
                className={styles.filter__sizes_size}
              >
                <input
                  type="checkbox"
                  name="style"
                  id={style}
                />
                <label htmlFor={style}>{style}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
