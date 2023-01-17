import DotLoader from 'react-spinners/DotLoader'
import styles from './dotLoaders.module.scss'

export default function DotLoaderSpinner({ loading }) {
  return (
    <div className={styles.loader}>
      <DotLoader
        color={'#2f82ff'}
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
