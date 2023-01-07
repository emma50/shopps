import styles from './footer.module.scss'
import {
  FaFacebookF,
  FaTiktok
} from 'react-icons/fa'
import {
  BsInstagram,
  BsTwitter,
  BsSnapchat,
  BsYoutube,
  BsPinterest 
} from 'react-icons/bs'


export default function Socials() {
  return (
    <div className={styles.footer__socials}>
      <section>
        <h3>STAY CONNECTED</h3>
        <ul>
          <li>
            <a 
              href="https://www.facebook.com" 
              target={'_blank'} 
              rel='noopener noreferrer'
            >
              <FaFacebookF/>
            </a>
          </li>
          <li>
            <a 
              href="https://www.tiktok.com" 
              target={'_blank'} 
              rel='noopener noreferrer'
            >
              <FaTiktok/>
            </a>
          </li>
          <li>
            <a 
              href="https://www.instagram.com" 
              target={'_blank'} 
              rel='noopener noreferrer'
            >
              <BsInstagram/>
            </a>
          </li>
          <li>
            <a 
              href="https://twitter.com" 
              target={'_blank'} 
              rel='noopener noreferrer'
            >
              <BsTwitter/>
            </a>
          </li>
          <li>
            <a 
              href="https://www.youtube.com/" 
              target={'_blank'} 
              rel='noopener noreferrer'
            >
              <BsYoutube/>
            </a>
          </li>
          <li>
            <a 
              href="https://www.pinterest.com/" 
              target={'_blank'} 
              rel='noopener noreferrer'
            >
              <BsPinterest/>
            </a>
          </li>
          <li>
            <a 
              href="https://www.snapchat.com/" 
              target={'_blank'} 
              rel='noopener noreferrer'
            >
              <BsSnapchat/>
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
