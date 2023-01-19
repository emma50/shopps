import { BiRightArrowAlt } from 'react-icons/bi'
import styles from './circledIconBtn.module.scss'

export default function CircledIconBtn({type, text, icon}) {
  return (
    <button type={type} className={styles.button}>
      <span className={styles.span}>{text}</span>
      <div className={styles.svg__wrap}>
        <BiRightArrowAlt/>
      </div>
    </button>
  )
}
