import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share'
import styles from './share.module.scss'

export default function Share() {
  return (
    <div className={styles.share}>
      <FacebookShareButton url={window?.location.href}>
        <FacebookIcon size={38}/>
      </FacebookShareButton>
      <FacebookMessengerShareButton url={window?.location.href}>
        <FacebookMessengerIcon size={38} />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={window?.location.href}>
        <TwitterIcon size={38} />
      </TwitterShareButton>
      <LinkedinShareButton url={window?.location.href}>
        <LinkedinIcon size={38} />
      </LinkedinShareButton>
      <RedditShareButton url={window?.location.href}>
        <RedditIcon size={38} />
      </RedditShareButton>
      <TelegramShareButton url={window?.location.href}>
        <TelegramIcon size={38} />
      </TelegramShareButton>
      <WhatsappShareButton url={window?.location.href}>
        <WhatsappIcon size={38} />
      </WhatsappShareButton>
      <PinterestShareButton url={window?.location.href}>
        <PinterestIcon size={38} />
      </PinterestShareButton>
      <EmailShareButton url={window?.location.href}>
        <EmailIcon size={38} />
      </EmailShareButton>
    </div>
  )
}
