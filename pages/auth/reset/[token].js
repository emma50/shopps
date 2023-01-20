import { Formik, Form } from 'formik'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BiLeftArrowAlt } from 'react-icons/bi'
import * as Yup from 'yup'
import axios from 'axios'
import { signIn, getSession } from 'next-auth/react'
import jwt from 'jsonwebtoken'
import Login from '../../../components/inputs/login' 
import CircledIconBtn from '../../../components/buttons/circledIconBtn'
import styles from '../../../styles/forgot.module.scss'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import DotLoaderSpinner from '../../../components/loaders/dotLoaders'

const country = {
  flag: '/images/country__flag.jpg',
  name: 'Nigeria',
  code: 'NGN'
}

export default function Reset({ userId }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [password, setPassword] = useState('')
  const [conf_password, setConf_password] = useState('')
  
  // const router = useRouter()

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required('Enter your new password.')
      .min(6, 'Password must be at least 6 characters.')
      .max(36, 'Password can\'t be more than 36 characters.'),
    conf_password: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  })

  const resetHandler = async () => {
    try {
      setLoading(true)

      const { data } = await axios.put('/api/auth/reset', {
        userId,
        password
      })
      console.log(data, 'DAAAAAAAAAAAAAAAAA')

      if (data && !data.email) {
        setLoading(false)
        setSuccess('')
        setError(data.message)
      }

      if (data && data.email) {
        let options = {
          redirect: false,
          email: data.email,
          password
        }
  
        await signIn('credentials', options)
        
        setLoading(false)
        setError('')
        setSuccess(data.message)
        setTimeout(() => window.location.reload(true), 3000)
        // setTimeout(() => router.push('/'), 3000)
      }
    } catch(e) {
      setLoading(false)
      setSuccess('')
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
            Reset your password? <Link href={'/signin'}>Login instead</Link>
          </span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            password,
            conf_password
          }}
          validationSchema={passwordValidation}
          onSubmit={() => resetHandler()}
        >
          {(form) => {
            return <>
              <Form method='POST' action='/api/auth/forgot'>
              <Login
                  type='password' 
                  icon='password'
                  name='password' 
                  placeholder={'Password'} 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Login
                  type='password' 
                  icon='password'
                  name='conf_password' 
                  placeholder={'Confirm Password'} 
                  onChange={(e) => setConf_password(e.target.value)}
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

export async function getServerSideProps (context) {
  const { query, req } = context
  const session = await getSession({ req })
  const { token } = query
  const resetToken = token.split(' ');

  if (session) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }

  // Get the user id from the server
  const decodedToken = jwt.verify(resetToken[0], process.env.RESET_TOKEN_SECRET)
  const userId = decodedToken.id

  return {
    props: {
      userId
    }
  }
}
