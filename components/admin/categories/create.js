import { useState } from 'react'
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './categories.module.scss'
import AdminInput from '../../inputs/admin';

export default function Create({ setCategories }) {
  const [name, setName] = useState('')

  const validate = Yup.object({
    name: Yup.string()
      .required("Category name is required.")
      .min(2, "Category name must be bewteen 2 and 30 characters.")
      .max(30, "Category name must be more than 30 characters.")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Numbers and special charcters are not allowed."
      ) 
  })

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/category", {
        name
      });
      
      setCategories(data.categories);
      setName("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{name}}
        validationSchema={validate}
        onSubmit={() => submitHandler()}
      >
        {(formik) => {
          return <>
            <Form>
              <div className={styles.header}>Create a Category</div>
              <AdminInput
                type='text'
                label='Name'
                name='name'
                placeholder='Category name'
                onChange={(e) => setName(e.target.value)}
              />
              <button className={`${styles.btn} ${styles.btn__primary}`}>
                <span>Add Category</span>
              </button>
            </Form>
          </>
        }}
      </Formik>
    </>
  )
}
