import { useState, useEffect } from 'react'
import styles from './cartHeader.module.scss'
import { compareArrays } from '../../../utils/arraysUtils'

export default function CartHeader({ cartItems, selected, setSelected }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    /* let check = JSON.stringify(cartItems) === JSON.stringify(selected) */
    let check = compareArrays(cartItems, selected)
    setActive(check)
  }, [selected])

  const handleSelect = () => {
    if (selected.length !== cartItems.length) {
      setSelected(cartItems)
    } else {
      setSelected([])
    }
  }

  return (
    <div className={`${styles.cart__header} ${styles.card}`}>
      <h1>Item Summary ({cartItems.length})</h1>
      <div className={styles.flex}>
        <div 
          className={`${styles.checkbox} ${active && styles.active}`} 
          onClick={() => handleSelect()}
        >
        </div>
        <span>Select all items</span>
      </div>
    </div>
  )
}
