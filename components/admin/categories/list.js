import ListItem from "./listItem";
import styles from './categories.module.scss'

export default function List({ categories, setCategories }) {
  return (
    <ul className={styles.list}>
      {categories.map((category) => (
        <ListItem
          category={category}
          key={category._id}
          setCategories={setCategories}
        />
      ))}
    </ul>
  );
}
