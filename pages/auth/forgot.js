import Link from 'next/link'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Formik, Form } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import styles from '../../styles/forgot.module.scss'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Login from '../../components/inputs/login'
import CircledIconBtn from '../../components/buttons/circledIconBtn'
import DotLoaderSpinner from '../../components/loaders/dotLoaders'

const country = {
  flag: '/images/country__flag.jpg',
  name: 'Nigeria',
  code: 'NGN'
}

export default function Forgot() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const emailValidation = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
  })

  const forgotPasswordHandler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/auth/forgot', {
        email
      })
      
      setLoading(false)
      setError('')
      setSuccess(data.message)
      setEmail('')
    } catch(e) {
      setLoading(false)
      setSuccess('')
      console.log(e)
      setError(e.response.data.message)
    }
  }

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading}/>}
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
          initialValues={{ email }}
          validationSchema={emailValidation}
          onSubmit={() => forgotPasswordHandler()}
        >
          {(form) => {
            return <>
              <Form method='POST' action='/api/auth/forgot'>
                <Login
                  type='text' 
                  icon='email'
                  name='email' 
                  placeholder={'Email Address'} 
                  onChange={handleChange}
                />
                <CircledIconBtn type='submit' text='Submit'/>
              </Form>
              {error && <span className={styles.error}>{error}</span>} 
              {success && <span className={styles.success}>{success}</span>} 
            </>
          }}
        </Formik>
      </div>
      <Footer country={country}/>
    </>
  )
}
