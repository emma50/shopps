import Link from 'next/link'
import Image from 'next/image'
import styles from './footer.module.scss'

const links = [
  {
    heading: 'SHOPPS',
    links: [
      {
        name: 'About us',
        link: ''
      },
      {
        name: 'Contact us',
        link: ''
      },
      {
        name: 'Social Responsibility',
        link: ''
      },
    ]
  },
  {
    heading: 'HELP & SUPPORT',
    links: [
      {
        name: 'Shipping Info',
        link: ''
      },
      {
        name: 'Returns',
        link: ''
      },
      {
        name: 'How to order',
        link: ''
      },
      {
        name: 'How to track',
        link: ''
      },
      {
        name: 'Size Guide',
        link: ''
      }
    ]
  },
  {
    heading: 'CUSTOMER SERVICE',
    links: [
      {
        name: 'Customer Service',
        link: ''
      },
      {
        name: 'Terms & Conditions',
        link: ''
      },
      {
        name: 'Customer (Transactions)',
        link: ''
      },
      {
        name: 'Take our feedback survey',
        link: ''
      }
    ]
  }
]

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, index) => {
        return (
          <ul key={index}>
            {
              index === 0 
              ? <Image src={'/logo.png'} alt='Logo' width={140} height={40}/>
              : <b key={index}>{link.heading}</b>
            }
            {link.links.map((link) => {
              return (
                <li key={link.name}>
                  <Link href={link.link}>{link.name}</Link>
                </li>
              )
            })}
          </ul>
        )
      })}
    </div>
  )
}
