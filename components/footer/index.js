import styles from './footer.module.scss'
import Links from './Links'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links/>
      </div>
    </footer>
  )
}
