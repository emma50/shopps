import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import styles from "./clickToAdd.module.scss";

export default function Details({ details, product, setProduct }) {
  const handleDetails = (i, e) => {
    const values = [...details];
    values[i][e.target.name] = e.target.value;

    setProduct({ ...product, details: values });
  };

  const handleRemove = (i) => {
    if (details.length > 0) {
      const values = [...details];
      values.splice(i, 1);

      setProduct({ ...product, details: values });
    }
  };
  
  return (
    <div>
      <div className={styles.header}>Details</div>
      {details.length === 0 && (
        <BsFillPatchPlusFill
          className={styles.svg}
          onClick={() => {
            setProduct({
              ...product,
              details: [
                ...details,
                {
                  name: "",
                  value: "",
                },
              ],
            });
          }}
        />
      )}
      {details
        ? details.map((detail, index) => (
            <div className={styles.clicktoadd} key={index}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={detail.name}
                onChange={(e) => handleDetails(index, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={detail.value}
                onChange={(e) => handleDetails(index, e)}
              />

              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(index)} />
                <BsFillPatchPlusFill
                  onClick={() => {
                    setProduct({
                      ...product,
                      details: [
                        ...details,
                        {
                          name: "",
                          value: "",
                        },
                      ],
                    });
                  }}
                />
              </>
            </div>
          ))
        : ""}
    </div>
  );
}
