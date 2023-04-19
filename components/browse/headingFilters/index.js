import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { AiTwotoneStar } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";
import styles from "./headingFilters.module.scss";

export default function HeadingFilters() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  
  return (
    <div className={styles.filters}>
      <div className={styles.filters__price}>
        <span>Price :</span>
        <input
          type="number"
          placeholder="min"
          min="0"
        />
        <input
          type="number"
          placeholder="max"
          min="0"
        />
      </div>
      <div className={styles.filers__priceBtns}>
        <Tooltip
          title={<h2>Check out products under 10$</h2>}
          placement="top"
          arrow
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "10%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products between 10$ and 50$</h2>}
          placement="top"
          arrow
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "25%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products between 50$ and 100$</h2>}
          placement="top"
          arrow
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "50%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products between 100$ and 500$</h2>}
          placement="top"
          arrow
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "75%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products for more than 500$</h2>}
          placement="top"
          arrow
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "100%" }}></span>
          </button>
        </Tooltip>
      </div>
      <div
        className={styles.filters__shipping}
      >
        <input
          type="checkbox"
          name="shipping"
          id="shipping"
        />
        <label htmlFor="shipping">Free Shipping</label>
      </div>
      <div
        className={styles.filters__rating}
      >
        <input
          type="checkbox"
          name="rating"
          id="rating"
        />
        <label htmlFor="rating">
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar /> & up
        </label>
      </div>
      <div className={styles.filters__sort}>
        <span>Sort by</span>
        <div
          className={styles.filters__sort_list}
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <button>
            Recommend
            <div
              style={{ transform: `${show ? "rotate(180deg)" : "rotate(0"}` }}
            >
              <IoIosArrowDown />
            </div>
          </button>
          <ul
            style={{
              transform: `${show ? "scale3d(1,1,1)" : "scale3d(1,0,1)"}`,
            }}
          >
            {
              sortingOptions.map((s, i) => (
                <li key={i}>
                  <Link href={''} legacyBehavior>
                    {s.name === 'Recommend' 
                      ? <b>{s.name} <BsCheckLg/></b>
                      : s.name
                    }
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

const sortingOptions = [
  {
    name: "Recommend",
    value: "",
  },
  {
    name: "Most Popular",
    value: "popular",
  },
  {
    name: "New Arrivals",
    value: "newest",
  },
  {
    name: "Top Selling",
    value: "topSelling",
  },
  {
    name: "Top Reviewed",
    value: "topReviewed",
  },
  {
    name: "Price (low to high)",
    value: "priceLowToHight",
  },
  {
    name: "Price (high to low)",
    value: "priceHighToLow",
  },
];
