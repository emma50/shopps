import Link from 'next/link'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Formik, Form } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import styles from '../../styles/forgot.module.scss'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Login from '../../components/inputs/login'
import CircledIconBtn from '../../components/buttons/circledIconBtn'

const country = {
  flag: '/images/country__flag.jpg',
  name: 'Nigeria',
  code: 'NGN'
}

export default function Forgot() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const emailValidation = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email Address is required'),
  })

  const forgotPasswordHandler = async () => {
    //
  }

  return (
    <>
      <Header country={country}/>
      <div className={styles.forgot}>
        <div className={styles.forgot__header}>
          <div className={styles.back__svg}>
            <BiLeftArrowAlt/>
          </div>
          <span>
            Forgot your password? <Link href={'/'}>Login instead</Link>
          </span>
        </div>
        <Formik
          enableReinitialize
          initialValues={ email }
          validationSchema={emailValidation}
          onSubmit={() => forgotPasswordHandler()}
        >
          {(form) => {
            return <>
              <Form>
                <Login
                  type='text' 
                  icon='email'
                  name='email' 
                  placeholder={'Email Address'} 
                  onChange={handleChange}
                />
                <CircledIconBtn type='submit' text='Sign in'/>
                {error && <span className={styles.error}>{error}</span>} 
              </Form>
            </>
          }}
        </Formik>
      </div>
      <Footer country={country}/>
    </>
  )
}
