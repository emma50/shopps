import { useRef, useState } from 'react'
import { MdOutlineRemoveCircle } from 'react-icons/md'
import styles from './reviews.module.scss'

export default function Images({ images, setImages }) {
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleImages = (e) => {
    let files = Array.from(e.target.files)
    files.forEach((img, index) => {
      if (img.length > 3 || index > 2) {
        setError('A maximum of 3 images are allowed')
        return;
      }
      if (
        img.type !== 'image/png' &&
        img.type !== 'image/jpeg' &&
        img.type !== 'image/webp'
      ) {
        setError(
          `${img.name} format is not supported! Only JPEG, PNG and WEBP are allowed`
        )
        files = files.filter((file) => file.name !== img.name)
        return;
      } 
      else if (img.size > (1024 * 1024 * 5) ) {
        setError(
          `${img.name} size is too large! A maximum of 5MB is allowed`
        )
        files = files.filter((file) => file.name !== img.name)
        return;
      } 
      else {
        setError('')
        const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.addEventListener('load', (e) => {
          setImages((images) => [...images, e.target.result] )
        })
        console.log('READER', reader)
      }
    })
  }

  const removeImage = (img) => {
    setImages((images) => images.filter((image) => image !== img))
  }
  console.log('IMAGESSSS', images)
  return (
    <div>
      <input 
        type="file" 
        ref={inputRef} 
        hidden 
        onChange={handleImages}
        multiple
        accept='image/png, image/jpeg, image/webp'
        />
      <button 
        className={styles.submit_btn}
        style={{width: '150px'}}
        onClick={() => inputRef.current.click()}
      >
        Add Images
      </button>
      {
        error && <div className={styles.error}>{error}</div>
      }
      <div className={styles.imgs_wrap}>
        {
          images.length > 0 &&
          images.map((img, index) => {
            return (
              <span key={{index}}>
                <MdOutlineRemoveCircle onClick={() => removeImage(img)}/>
                <img src={img} alt="" />
              </span>
            )
          })
        }
      </div>
    </div>
  )
}
