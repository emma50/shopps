import { useRouter } from "next/router";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../browse.module.scss";
import Size from "./size";

export default function SizesFilter({ sizes, sizeHandler }) {
  const router = useRouter();
  const existedSize = router.query.size || "";

  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Sizes <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {sizes.map((size, i) => (
            <div 
              key={i}
              onClick={() => 
                sizeHandler(
                  existedSize ? 
                    `${existedSize}_${size}` 
                    : size
                )
              }
            >
              <Size size={size}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
