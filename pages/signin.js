import Link from 'next/link'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Formik, Form } from "formik";
import { useState } from 'react';
import * as Yup from 'yup'
import Header from '../components/header'
import Footer from '../components/footer'
import Login from '../components/inputs/login'
import styles from '../styles/signin.module.scss'
import CircledIconBtn from '../components/buttons/circledIconBtn';

const country = {
  flag: '/images/country__flag.jpg',
  name: 'Nigeria',
  code: 'NGN'
}

const initialValues = {
  login_email: '',
  login_password: ''
}

export default function Signin() {
  const [user, setUser] = useState(initialValues)
  const { login_email, login_password } = user

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({...user, [name]: value})
  }
  console.log(user)

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email Address is required'),
    login_password: Yup.string().required('Please enter a password')
  })
  return (
    <>
      <Header country={country}/>
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt/>
            </div>
            <span>
              You &#39; d be happy you joined us. <Link href={'/'}>Visit store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Get access to one of the best E-Shopping in the world</p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password
              }}
              validationSchema={loginValidation}
            >
              {(form) => {
                /* console.log(form, 'FORMMMMMM')
                console.log('...............................') */
                return <>
                  <Form>
                    <Login
                      type='text' 
                      icon='email'
                      name='login_email' 
                      placeholder={'Email Address'} 
                      onChange={handleChange}
                    />
                    <Login
                      type='password' 
                      icon='password'
                      name='login_password' 
                      placeholder={'Password'} 
                      onChange={handleChange}
                    />
                    <CircledIconBtn type='submit' text='Sign in'/>
                    <div className={styles.forgot}>
                      <Link href={'/forget'}>Forgot password ?</Link>
                    </div>
                  </Form>
                </>
              }}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country={country}/>
    </>
  )
}
