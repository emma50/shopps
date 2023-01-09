import Link from 'next/link'
import { IoLocationSharp } from 'react-icons/io5'
import styles from './footer.module.scss'

const data = [
  {
    name: 'Privacy center',
    link: ''
  },
  {
    name: 'Privacy & Cookie Policy ',
    link: ''
  },
  {
    name: 'Manage Cookies',
    link: ''
  },
  {
    name: 'Terms & Conditions',
    link: ''
  },
  {
    name: 'Copyright Notice',
    link: ''
  }
]

export default function Copyright({country}) {
  const name = JSON.parse(country.name)
  return (
    <div className={styles.footer__copyright}>
      <section>©2023 SHOPPS All Rights Reserved</section>
      <section>
        <ul>
          {data.map((link, index) => {
            return (
              <li key={index}>
                <Link href={link.link}>{link.name}</Link>
              </li>
            )
          })}
          <li>
            <a href="">
              <IoLocationSharp/>{name}
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
