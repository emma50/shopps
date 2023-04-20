import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";
import styles from "../browse.module.scss";

export default function PatternsFilter({ patterns, patternHandler }) {
  const [show, setShow] = useState(true);

  const router = useRouter()
  const existedPattern = router.query.pattern || "";

  return (
    <div className={styles.filter}>
      <h3>
        Pattern <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {patterns.map((pattern, i) => {
            return (
              <label
                key={i}
                htmlFor={pattern}
                className={styles.filter__sizes_size}
                onClick={() => 
                  patternHandler(
                    existedPattern ? 
                      `${existedPattern}_${pattern}` 
                      : pattern
                  )
                }
              >
                <input
                  type="checkbox"
                  name="pattern"
                  id={pattern}
                />
                <label htmlFor={pattern}>
                  {pattern.length > 12
                    ? `${pattern.substring(0, 12)}...`
                    : pattern}
                </label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
