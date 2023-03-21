import { toast } from 'react-toastify';
import Layout from '../../../components/admin/layout'
import styles from '../../../styles/dashboard.module.scss'

export default function Lndex() {
  return (
    <div>
      <Layout>
        <button onClick={() => toast.success("Wow so easy!")}>
          Click to show toastify
        </button>
      </Layout>
    </div>
  )
}
