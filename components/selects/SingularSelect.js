import { TextField, MenuItem } from '@mui/material'
import { useField, ErrorMessage } from 'formik'
import styles from './selects.module.scss'

export default function SingularSelect({
  data,
  placeholder, 
  handleChange,
  header,
  disabled, 
  ...props
}) {
  const [field, meta] = useField(props)
  return (
    <div >
      {header && (
        <div
          className={`${styles.header} ${
            meta.error ? styles.header__error : ""
          }`}
        >
          <div className={styles.flex} style={{marginBottom: 0}}>
            {meta.error && (
              <img src="../../../images/warning.png" alt="warning" />
            )}
            {header}
          </div>
        </div>
      )}
      <TextField
        // id="outlined-basic" 
        label={placeholder}
        variant="outlined"
        name={field.name}
        value={field.value}
        select
        disabled={disabled}
        onChange={handleChange}
        className={
          `${styles.select} ${meta.touched && meta.error && styles.error__select}`
        }
      >
        <MenuItem key={''} value={''}>
          {'None Selected / Empty'}
        </MenuItem>
        {data.map((option) => (
          <MenuItem key={option.name} value={option._id || option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      {
        meta.touched && meta.error && 
        <p className={styles.error__msg}>
          <ErrorMessage name={field.name}/>
        </p>
      }
    </div>
  )
}
