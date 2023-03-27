import ListItem from "./listItem";
import styles from "./coupons.module.scss";

export default function List({ coupons, setCoupons }) {
  return (
    <>
      <h3 
        style={{
          marginTop: '2rem',
          borderBottom: '1px solid #ccc'
        }}
      >
        Coupon list
      </h3>
      {
        coupons.length > 0 ?
        <ul className={styles.list}>
          {coupons.map((coupon) => (
            <ListItem coupon={coupon} key={coupon._id} setCoupons={setCoupons} />
          ))}
        </ul> :
         <p>Coupon list is empty!!. Create a coupon.</p>
      }
    </>
  );
}
