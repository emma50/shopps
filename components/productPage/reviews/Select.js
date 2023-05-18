import { useState } from 'react'
import { IoArrowDown } from 'react-icons/io5'
import Image from 'next/image'
import styles from './reviews.module.scss'

export default function Select({ property, text, data, handleChange }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={styles.select}>
      {text}
      <div 
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          background: `${text === 'Style' && property.color}`
        }}
      >
        <span 
          className={`flex ${styles.select__header_wrap}`} 
          style={{
            padding: '0 5px',
          }}
        >
          {
            text === 'Size' 
            ? property || `Select ${text}`
            : text === 'Style' && property.image 
            // ? <img src={property.image} alt="" />
            ? <Image src={property.image} alt=''/>
            : text === 'How does it fit' && property
            ? property
            : text === 'How does it fit' && !property 
            ? 'Select fit'
            : `Select ${text}`
          }
          <IoArrowDown/>
        </span>
        {
          visible && <ul 
            className={styles.select__header_menu}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {
              data.map((item, index) => {
                if (text === 'Size') {
                  return (
                    <li key={index}
                      onClick={() => item.size && handleChange(item.size)}
                    >
                      {/* <span>{item.size}</span> */}
                      <span>{`${item.size ? item.size : 'No available size'}`}</span>
                    </li>
                  )
                }
                if (text === 'Style') {
                  return (
                    <li key={index}
                      onClick={() => handleChange(item)}
                      style={{background: item.color}}
                    >
                      <span>
                        {/* <img src={item.image} alt={'Style image'} /> */}
                        <Image src={item.image} alt='Style image'/>
                      </span>
                    </li>
                  )
                }
                if (text === 'How does it fit') {
                  return (
                    <li key={index}
                      onClick={() => handleChange(item)}
                    >
                      <span>{item}</span>
                    </li>
                  )
                }
              })
            }
          </ul>
        }
      </div>
    </div>
  )
}
