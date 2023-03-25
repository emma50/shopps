import { useState } from 'react'
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './categories.module.scss'
import AdminInput from '../../inputs/admin';
import SingularSelect from '../../selects/SingularSelect'

export default function Create({ categories, setSubCategories }) {
  const [name, setName] = useState('')
  const [parent, setParent] = useState('')

  const validate = Yup.object({
    name: Yup.string()
      .required("SubCategory name is required.")
      .min(2, "SubCategory name must be bewteen 2 and 30 characters.")
      .max(30, "SubCategory name must be more than 30 characters.")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Numbers and special characters are not allowed."
      ),
      parent: Yup.string().required('Please choose a parent Category') 
  })

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/subCategory", {
        name,
        parent
      });
      
      setSubCategories(data.subCategories);
      setName("");
      setParent('')
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, parent }}
        validationSchema={validate}
        onSubmit={() => submitHandler()}
      >
        {(formik) => {
          return <>
            <Form>
              <div className={styles.header}>Create a SubCategory</div>
              <AdminInput
                type='text'
                label='Name'
                name='name'
                placeholder='Sub-Category name'
                onChange={(e) => setName(e.target.value)}
              />
              <SingularSelect
                name={'parent'}
                value={parent}
                data={categories}
                placeholder='Select Category'
                handleChange={(e) => setParent(e.target.value)}
              />
              <div className={styles.btnWrap}>
                <button className={`${styles.btn} ${styles.btn__primary}`}>
                  <span>Add SubCategory</span>
                </button>
              </div>
            </Form>
          </>
        }}
      </Formik>
    </>
  )
}
