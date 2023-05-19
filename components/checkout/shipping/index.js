import { useState } from 'react'
// import Image from 'next/image'
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import 'yup-phone'
import { FaIdCard, FaMapMarkerAlt } from 'react-icons/fa'
import { GiPhone } from "react-icons/gi";
import { IoMdArrowDropupCircle } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoIosRemoveCircleOutline } from "react-icons/io"
import styles from './shipping.module.scss'
import ShippingInput from '../../inputs/shipping';
import { countries } from '../../../data/countries';
import SingularSelect from '../../selects/SingularSelect';
import {
  saveAddress, 
  changeActiveAddress, 
  deleteAddress 
} from '../../../requests/user';
// import { compareObjects } from '../../../utils/objectsUtils';

const initialValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address1: '',
  address2: '',
  city: '',
  zipCode: '',
  state: '',
  country: '',
}

export default function Shipping({ 
  user,
  addresses,
  setAddresses,
  profile
}) {
  const [shipping, setShipping] = useState(initialValues)
  const [visible, setVisible] = useState(user?.address.length ? false : true)
  const {
    firstName,
    lastName,
    phoneNumber,
    address1,
    address2,
    city,
    zipCode,
    state,
    country,
  } = shipping
  
  const shippingValidation = Yup.object({
    firstName: Yup.string()
      .required('First name is required')
      .min(3, 'First name should contain 3-20 characters.')
      .max(20, 'First name must not be more than 20 characters long.'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(3, 'Last name should contain 3-20 characters.')
      .max(20, 'Last name must not be more than 20 characters long.'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .phone()
      .min(3, 'Phone number should contain 3-20 characters.')
      .max(20, 'Phone number must not be more than 20 characters long.'),
    address1: Yup.string()
      .required('Address Line 1 is required')
      .min(3, 'Address Line 1 should contain 3-90 characters.')
      .max(90, 'Address Line 1 must not be more than 90 characters long.'),
    address2: Yup.string()
      .min(3, 'Address Line 2 should contain 3-90 characters.')
      .max(90, 'Address Line 2 must not be more than 90 characters long.'),
    city: Yup.string()
      .required('City is required')
      .min(2, 'City should contain 3-30 characters.')
      .max(30, 'City must not be more than 30 characters long.'),
    zipCode: Yup.string()
      .required('Zip/Post code is required')
      .min(2, 'Zip/Post code should contain 3-30 characters.')
      .max(30, 'Zip/Post code must not be more than 30 characters long.'),
    state: Yup.string()
      .required('State is required')
      .min(2, 'State should contain 3-20 characters.')
      .max(20, 'State must not be more than 20 characters long.'),
    country: Yup.string().required('Country is required')
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setShipping({...shipping, [name]: value })
  }

  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping)
    setAddresses(res.addresses)
  }

  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id)
    setAddresses(res.addresses)
  }

  const deleteHandler = async (id) => {
    const res = await deleteAddress(id)
    setAddresses(res.addresses)
  }

  return (
    <div className={styles.shipping}>
      {!profile &&
        <div className={styles.header}>
          <h3>Shipping Information</h3>
        </div>
      }
      <div className={styles.addresses}>
        {
          addresses.length > 0 &&
          addresses.map((address, index) => (
            <div key={index} style={{position: 'relative'}}>
              <div 
                className={styles.address__delete}
                onClick={() => deleteHandler(address._id)}
                style={{zIndex: 2, cursor: 'pointer'}}
              >
                <IoIosRemoveCircleOutline/>
              </div>
              <div 
                className={`${styles.address} ${address.active && styles.active}`} 
                onClick={() => changeActiveHandler(address._id)}
              >
                <div className={styles.address__side}>
                  <img src={profile ? user.user.image : user.image} alt="" />
                  {/* <Image src={profile ? user.user.image : user.image} alt=''/> */}
                </div>
                <div className={styles.address__col}>
                  <span>
                    <FaIdCard/>
                    {address.firstName.toUpperCase()}{' '}
                    {address.lastName.toUpperCase()}
                  </span>
                  <span>
                    <GiPhone/>
                    {address.phoneNumber}
                  </span>
                </div>
                <div className={styles.address__col}>
                  <span>
                    <FaMapMarkerAlt/>
                    {address.address1}
                  </span>
                  <span>{address.address2 && address.address2}</span>{' '}
                  <span>{address.city}, {address.state}, {address.country}</span>{' '}
                  <span>{address.zipCode}</span>
                </div>
                <span 
                  className={styles.active__text}
                  style={{
                    display: `${address.active ? "inline" : 'none'}`     
                  }}
                >
                  Active
                </span>
              </div>
            </div>
          ))
        }
      </div>
      <button 
        className={styles.hide_show}
        onClick={() => setVisible(!visible)}
      >
        {
          visible ? 
          <span>
            <IoMdArrowDropupCircle 
              style={{fontSize: '2rem', fill: '#222'}}
            />
          </span> :
          <span>
            ADD NEW ADDRESS <AiOutlinePlus/>
          </span>
        }
      </button>
      {
        visible &&
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            phoneNumber,
            address1,
            address2,
            city,
            zipCode,
            state,
            country,
          }}
    
          validationSchema={shippingValidation}
          onSubmit={() => saveShippingHandler()}
        >
          {(formik) =>(
            <>
              <Form>
                <SingularSelect
                  name='country'
                  value={country}
                  placeholder='*Country'
                  handleChange={handleChange}
                  data={countries}
                />
                <div className={styles.col}>
                  <ShippingInput
                    name='firstName'
                    placeholder='*First Name'
                    onChange={handleChange}
                  />
                  <ShippingInput
                    name='lastName'
                    placeholder='*Last Name'
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.col}>
                  <ShippingInput
                    name="state"
                    placeholder="*State/Province"
                    onChange={handleChange}
                  />
                  <ShippingInput
                    name="city"
                    placeholder="*City"
                    onChange={handleChange}
                  />
                </div>
                <ShippingInput
                  name="phoneNumber"
                  placeholder="*Phone number"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="zipCode"
                  placeholder="*Post/Zip code"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="address1"
                  placeholder="*Address 1"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="address2"
                  placeholder="Address 2"
                  onChange={handleChange}
                />
                <button type="submit">Save Address</button>
              </Form>
            </>
          )}
        </Formik>
      }
    </div>
  )
}
