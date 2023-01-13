import { BiUser } from 'react-icons/bi'
import { SiMinutemailer } from 'react-icons/si'
import { IoKeyOutline } from 'react-icons/io5'
import { ErrorMessage, useField } from 'formik'
import styles from './login.module.scss'

export default function Login({ icon, placeholder, ...props }) {
  const [field, meta] = useField(props)
  /* console.log(field, 'FIELDDDDDDDDDDDDDD')
  console.log(props, 'PROPPPPPPPSSSSSSSS')
  console.log(meta, 'METAAAAAAAAAAAAAAA') */
  return (
    <div className={`${styles.input} ${meta.touched && meta.error ? styles.error : '' }`}>
      {
        icon === 'user' ?
        <BiUser/> :
        icon === 'email' ?
        <SiMinutemailer/> :
        icon === 'password' ?
        <IoKeyOutline/> :
        ''
      }
      {
        meta.touched && meta.error && <div className={styles.error__popup}>
          <span></span>
          <ErrorMessage name={field.name}/>
        </div>
      }
      <input 
        type={props.type} 
        name={field.name} 
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </div>
  )
}
