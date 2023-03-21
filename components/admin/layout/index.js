import { useSelector } from 'react-redux'
import styles from './layout.module.scss'
import Sidebar from './sidebar'

export default function Layout({ children }) {
  const expandSidebar = useSelector((state) => state.expandSidebar)
  const expand = expandSidebar.expandSidebar

  return (
    <div>
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
