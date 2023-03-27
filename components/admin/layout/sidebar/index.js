import { useSelector, useDispatch } from 'react-redux'
import { 
  MdArrowForwardIos, 
  MdSpaceDashboard, 
  MdOutlineCategory 
} from 'react-icons/md'
import { FcSalesPerformance } from 'react-icons/fc'
import { IoListCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import { BsPatchPlus } from "react-icons/bs";
import {
  RiCoupon3Fill,
  RiLogoutCircleFill,
  RiSettingsLine,
} from "react-icons/ri";
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toggleSidebar } from '../../../../store/expandSlice'
import styles from './sidebar.module.scss'

export default function Sidebar() {
  const { data: session } = useSession()
  
  const router = useRouter()
  const route = router.pathname.split('/admin/dashboard')[1]
  const dispatch = useDispatch()

  const expandSidebar = useSelector((state) => state.expandSidebar)
  const expand = !expandSidebar.expandSidebar
  
  const handleExpand = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div
      className={`${styles.sidebar} ${expand ? styles.opened : ''}`}
    >
      <div 
        className={styles.sidebar__toggle}
        onClick={() => handleExpand()}
      >
        <div
          style={{
            transform: `${expand ? 'rotate(180deg)' : ''}`,
            transition: 'all .2s'
          }}
        >
          <MdArrowForwardIos/>
        </div>
      </div>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__header}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.sidebar__user}>
          <img src={session?.user?.image} alt="" />
          <div className={styles.show}>
            <span>Welcome back 👋</span>
            <span>
              {session?.user?.name.charAt(0).toUpperCase()}
              {session?.user?.name.slice(1)}
              </span>
          </div>
        </div>
        <ul className={styles.sidebar__list}>
          <li className={`${!route ? styles.active : ''}`}>
            <Link href={'/admin/dasboard'} legacyBehavior>
              <a>
                <MdSpaceDashboard/>
                <span className={styles.show}>Dashboard</span>
              </a>
            </Link>
          </li>
          <li 
            className={
              `${router.pathname === '/admin/dashboard/sales' ? styles.active : ''}`
            }
          >
            <Link href={'/admin/dashboard/sales'} legacyBehavior>
              <a>
                <FcSalesPerformance/>
                <span className={styles.show}>Sales</span>
              </a>
            </Link>
          </li>
          <li 
            className={
              `${router.pathname === '/admin/dashboard/orders' ? styles.active : ''}`
            }
          >
            <Link href={'/admin/dashboard/orders'} legacyBehavior>
              <a>
                <IoListCircleSharp />
                <span className={styles.show}>Orders</span>
              </a>
            </Link>
          </li>
          <li 
            className={
              `${router.pathname === '/admin/dashboard/users' ? styles.active : ''}`
            }
          >
            <Link href={'/admin/dashboard/users'} legacyBehavior>
              <a>
                <ImUsers />
                <span className={styles.show}>Users</span>
              </a>
            </Link>
          </li>
          <li 
            className={
              `${router.pathname === '/admin/dashboard/messages' ? styles.active : ''}`
              }
            >
            <Link href={'/admin/dashboard/messages'} legacyBehavior>
              <a>
                <AiFillMessage />
                <span className={styles.show}>Messages</span>
              </a>
            </Link>
          </li>
        </ul>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Product</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li 
              className={
                router.pathname === "/admin/dashboard/product/all" ? styles.active : ""
              }
            >
              <Link href={'/admin/dashboard/product/all'} legacyBehavior>
                <a>
                  <FaThList />
                  <span className={styles.show}>All Products</span>
                </a>
              </Link>
            </li>
            <li 
              className={
                router.pathname === "/admin/dashboard/product/create" ? styles.active : ""
              }
            >
              <Link href={'/admin/dashboard/product/create'} legacyBehavior>
                <a>
                  <BsPatchPlus />
                  <span className={styles.show}>Create Product</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Categories / Subs</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li 
              className={
                router.pathname === "/admin/dashboard/categories" ? styles.active : ""
              }
            >
              <Link href={'/admin/dashboard/categories'} legacyBehavior>
                <a>
                  <MdOutlineCategory />
                  <span className={styles.show}>Categories</span>
                </a>
              </Link>
            </li>
            <li 
              className={
                router.pathname === "/admin/dashboard/subCategories" ? styles.active : ""
              }
            >
              <Link href={'/admin/dashboard/subCategories'} legacyBehavior>
                <a>
                  <div style={{ transform: "rotate(180deg)" }}>
                    <MdOutlineCategory />
                  </div>
                  <span className={styles.show}>Sub-Categories</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Coupons</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li 
              className={
                router.pathname === "/admin/dashboard/coupons" ? styles.active : ""
              }
            >
              <Link href={'/admin/dashboard/coupons'} legacyBehavior>
                <a>
                  <RiCoupon3Fill />
                  <span className={styles.show}>Coupons</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <ul
            className={
              `${styles.sidebar__list} ${ expand ? styles.nav_flex : ""}`
            }
          >
            <li>
              <Link href={''} legacyBehavior>
                <a>
                  <RiSettingsLine />
                </a>
              </Link>
            </li>
            <li>
              <Link href={''} legacyBehavior>
                <a>
                  <IoNotificationsSharp />
                </a>
              </Link>
            </li>
            <li>
              <Link href={''} legacyBehavior>
                <a>
                  <AiFillMessage />
                </a>
              </Link>
            </li>
            <li>
              <Link href={''} legacyBehavior>
                <a>
                  <RiLogoutCircleFill />
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
