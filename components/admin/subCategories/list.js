import ListItem from "./listItem";
import styles from './categories.module.scss'

export default function List({ subCategories, setSubCategories, categories }) {
  return (
    <ul className={styles.list}>
      {subCategories.map((subCategory) => (
        <ListItem
          subCategory={subCategory}
          key={subCategory._id}
          setSubCategories={setSubCategories}
          categories={categories}
        />
      ))}
    </ul>
  );
}
