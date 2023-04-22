import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../browse.module.scss";
import Card from "./card";

export default function CategoryFilter({ 
  categories, 
  categoryHandler,
  replaceQuery, 
}) {
  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Category <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show &&
        categories.map((category, i) => (
          <Card
            key={i}
            category={category}
            categoryHandler={categoryHandler}
            replaceQuery={replaceQuery}
          />
        ))}
    </div>
  );
}
