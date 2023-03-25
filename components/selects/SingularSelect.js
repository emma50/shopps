import { TextField, MenuItem } from '@mui/material'
import { useField, ErrorMessage } from 'formik'
import styles from './singularSelect.module.scss'

export default function SingularSelect({
  data,
  placeholder, 
  handleChange, 
  ...props
}) {
  const [field, meta] = useField(props)
  return (
    <div style={{marginBottom: '1rem'}}>
      <TextField
        // id="outlined-basic" 
        label={placeholder}
        variant="outlined"
        name={field.name}
        value={field.value}
        select
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
