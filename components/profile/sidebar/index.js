// import Image from 'next/image'
import Item from "./item";
import styles from "./sidebar.module.scss";
import { sidebarData } from '../../../data/profile'

export default function Sidebar({ data }) {
  
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <img src={data.image} alt="" />
        {/* <Image src={data.image} alt=''/> */}
        <span className={styles.sidebar__name}>{data.name}</span>
        <ul>
          {sidebarData.map((item, i) => (
            <Item
              key={i}
              item={item}
              visible={data.tab === Number(i.toString())}
              index={i.toString()}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
