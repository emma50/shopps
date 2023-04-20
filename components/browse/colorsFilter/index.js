import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";
import styles from "../browse.module.scss";

export default function ColorsFilter({ colors, colorHandler }) {
  const [show, setShow] = useState(true);

  const router = useRouter()
  const existedColor = router.query.color || "";

  return (
    <div className={styles.filter}>
      <h3>
        Colors <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__colors}>
          {colors.map((color, i) => {
            return (
              <button
                key={i}
                style={{ background: `${color}` }}
                onClick={() => 
                  colorHandler(
                    existedColor ? 
                      `${existedColor}_${color}` 
                      : color
                  )
                }
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}
