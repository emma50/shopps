import ListItem from "./listItem";
import styles from './categories.module.scss'

export default function List({ subCategories, setSubCategories, categories }) {
  return (
    <>
      <h3 
        style={{
          marginTop: '2rem',
          borderBottom: '1px solid #ccc'
        }}
      >
        SubCategory list
      </h3>
      {
        subCategories.length > 0 ?
        <ul className={styles.list}>
          {subCategories.map((subCategory) => (
            <ListItem
              subCategory={subCategory}
              key={subCategory._id}
              setSubCategories={setSubCategories}
              categories={categories}
            />
          ))}
        </ul> :
        <p>SubCategory list is empty!!. Create a sub-category</p>
      }
    </>
  );
}
