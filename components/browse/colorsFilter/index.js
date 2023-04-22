import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";
import styles from "../browse.module.scss";

export default function ColorsFilter({
  colors, 
  colorHandler,
  replaceQuery, 
}) {
  const [show, setShow] = useState(true);

  const router = useRouter()

  return (
    <div className={styles.filter}>
      <h3>
        Colors <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__colors}>
          {colors.map((color, i) => {
            const check = replaceQuery("color", color)
            return (
              <button
                key={i}
                style={{ background: `${color}` }}
                className={check.active ? styles.activeFilterColor : ""}
                onClick={() => colorHandler(check.result)}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}
