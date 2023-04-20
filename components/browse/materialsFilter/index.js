import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";
import styles from "../browse.module.scss";

export default function MaterialsFilter({ materials, materialHandler }) {
  const [show, setShow] = useState(true)

  const router = useRouter()
  const existedMaterial = router.query.material || "";

  return (
    <div className={styles.filter}>
      <h3>
        Material <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {materials.map((material, i) => {
            return (
              <label
                key={i}
                htmlFor={material}
                className={styles.filter__sizes_size}
                onClick={() => 
                  materialHandler(
                    existedMaterial ? 
                      `${existedMaterial}_${material}` 
                      : material
                  )
                }
              >
                <input
                  type="checkbox"
                  name="material"
                  id={material}
                />
                <label htmlFor={material}>
                  {material.length > 12
                    ? `${material.substring(0, 12)}...`
                    : material}
                </label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
