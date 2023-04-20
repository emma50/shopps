import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/dist/client/router";
import styles from "../browse.module.scss";

export default function BrandsFilter({ brands, brandHandler }) {
  const [show, setShow] = useState(true);

  const router = useRouter()
  const existedBrand = router.query.brand || "";

  return (
    <div className={styles.filter}>
      <h3>
        Brands <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {brands.map((brand, i) => {
            return (
              <button
                key={i}
                className={`${styles.filter__brand}`}
                onClick={() => 
                  brandHandler(
                    existedBrand ? 
                      `${existedBrand}_${brand}` 
                      : brand
                  )
                }
              >
                <img src={`../../../images/brands/${brand}.png`} alt="" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

