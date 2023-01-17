import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import { getProviders, signIn } from 'next-auth/react'
import axios from 'axios';
import { useRouter } from 'next/router'
import Header from '../components/header'
import Footer from '../components/footer'
import Login from '../components/inputs/login'
import styles from '../styles/signin.module.scss'
import CircledIconBtn from '../components/buttons/circledIconBtn';
import DotLoaderSpinner from '../components/loaders/dotLoaders';

const country = {
  flag: '/images/country__flag.jpg',
  name: 'Nigeria',
  code: 'NGN'
}

const initialValues = {
  login_email: '',
  login_password: '',
  name: '',
  email: '',
  password: '',
  conf_password: '',
  message: ''
}

export default function Signin({ providers }) {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(initialValues)
  const { 
    login_email, 
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error 
  } = user
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({...user, [name]: value})
  }

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email Address is required'),
    login_password: Yup.string().required('Please enter a password')
  })

  const registerValidation = Yup.object({
    name: Yup.string()
      .required('What\'s\ your name ?.')
      .min(2, 'Name must be between 2 and 36 characters.')
      .max(36, 'Name must be between 2 and 36 characters.')
      .matches(/[aA-zZ]/, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email address is required.'),
    password: Yup.string()
      .required('Enter a combination of at least six numbers.')
      .min(6, 'Password must be at least 6 characters.')
      .max(36, 'Password can\'t be more than 36 characters.'),
    conf_password: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  })

  const signUpHandler = async () => {
    try {
      setLoading(true)

      const {data} = await axios.post('/api/auth/signup', {
        name,
        email,
        password
      })
      
      setUser({...user, error: '', success: data.message})
      setLoading(false)
      setTimeout(() => router.push('/'), 3000)
    } catch(e) {
      console.log(e)
      setLoading(false)
      setUser({...user, success: '', error: e.response.data.message})
    }
  }
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading}/>}
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
          <div className={styles.login__wrapper}>
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
              <div className={styles.login__socials}>
                <span className={styles.or}>Or continue with</span>
                <div className={styles.login__socials_wrap}>
                  {
                    providers.map((provider) => {
                      return <div key={provider.id}>
                        <button 
                          className={styles.social__btn}
                          onClick={() => signIn(provider.id)}
                        >
                          <Image 
                            src={`/icons/${provider.id}.png`} 
                            alt={'social login images'} 
                            width={36} 
                            height={36} 
                          />
                          Signin with {provider.name}
                        </button>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
            <div className={styles.login__form}>
              <h1>Sign up</h1>
              <p>Shop Now!! Exciting stuffs await you at affordable prices.</p>
              <Formik
                enableReinitialize
                initialValues={{
                  name,
                  email,
                  password,
                  conf_password
                }}
                validationSchema={registerValidation}
                onSubmit={() => signUpHandler()}
              >
                {(form) => {
                  return <>
                    <Form>
                      <Login
                        type='text' 
                        icon='user'
                        name='name' 
                        placeholder={'Name'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='text' 
                        icon='email'
                        name='email' 
                        placeholder={'Email Address'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='password' 
                        icon='password'
                        name='password' 
                        placeholder={'Password'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='password' 
                        icon='password'
                        name='conf_password' 
                        placeholder={'Confirm Password'} 
                        onChange={handleChange}
                      />
                      <CircledIconBtn type='submit' text='Sign up'/>
                    </Form>
                  </>
                }}
              </Formik>
              <div>{success && <span className={styles.success}>{success}</span>}</div>
              <div>{error && <span className={styles.error}>{error}</span>}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer country={country}/>
    </>
  )
}


export async function getServerSideProps (context) {
  const providers = Object.values(await getProviders())

  return {
    props: {
      providers
    }
  }
}