import ListItem from "./listItem";
import styles from './categories.module.scss'

export default function List({ categories, setCategories }) {
  return (
    <>
       <h3 
          style={{
            marginTop: '5rem',
            borderBottom: '1px solid #ccc'
          }}
        >
          Category list
        </h3>
      {
        categories.length > 0 ?
        <ul className={styles.list}>
          {categories.map((category) => (
            <ListItem
              category={category}
              key={category._id}
              setCategories={setCategories}
            />
          ))}
        </ul> :
        <p>Category list is empty!!. Create a category</p>
      }
    </>
  );
}
