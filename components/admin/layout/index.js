import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DialogModal from '../../../components/dialogModal'
import { hideDialog } from '../../../store/dialogSlice'
import styles from './layout.module.scss'
import Sidebar from './sidebar'

export default function Layout({ children }) {
  const expandSidebar = useSelector((state) => state.expandSidebar)
  const expand = expandSidebar.expandSidebar

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(hideDialog({
      show: false
    }))
  }, [])

  return (
    <div>
      <DialogModal/>
      <Sidebar/>
      <div 
        className={styles.layout__main}
        style={{
          marginLeft: `${expand ? '80px' : '280px'}`
        }}
      >
        {children}
      </div>
    </div>
  )
}
