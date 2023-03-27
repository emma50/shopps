import ListItem from "./listItem";
import styles from "./coupons.module.scss";

export default function List({ coupons, setCoupons }) {
  return (
    <>
      <h3>Coupon list</h3>
      <ul className={styles.list}>
        {coupons.map((coupon) => (
          <ListItem coupon={coupon} key={coupon._id} setCoupons={setCoupons} />
        ))}
      </ul>
    </>
  );
}
