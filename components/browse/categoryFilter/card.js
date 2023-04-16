import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";
import styles from "../browse.module.scss";

export default function Card({ category }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <section>
        <li>
          <input
            type="radio"
            name="filter"
            id={category._id}
          />
          <label htmlFor={category._id}>
            <a>{category.name}</a>
          </label>
          <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
        </li>
      </section>
    </>
  );
}
