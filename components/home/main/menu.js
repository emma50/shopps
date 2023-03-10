import Link from 'next/link'
import {
  GiLargeDress,
  GiClothes,
  Gi3DHammer,
  GiWatch,
  GiBallerinaShoes,
  GiHeadphones,
  GiHealthCapsule,
  GiSportMedal,
  GiBigDiamondRing,
} from "react-icons/gi";
import { MdOutlineSportsEsports, MdOutlineSmartToy } from "react-icons/md";
import { BiCameraMovie, BiGift, BiCategory } from "react-icons/bi";
import { FaBaby } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { BsPhoneVibrate } from "react-icons/bs";
import styles from './main.module.scss'
import { menuArray } from '../../../data/home'

export default function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <a className={styles.menu__header}>
            <BiCategory/>
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.menu__list}>
          {
            menuArray.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.link} legacyBehavior>
                    <a href={item.link}>
                      {
                        index == 0 ? (
                          <GiLargeDress />
                        ) : index == 1 ? (
                          <GiClothes />
                        ) : index == 2 ? (
                          <GiHeadphones />
                        ) : index == 3 ? (
                          <GiWatch />
                        ) : index == 4 ? (
                          <HiOutlineHome />
                        ) : index == 5 ? (
                          <GiHealthCapsule />
                        ) : index == 6 ? (
                          <GiBallerinaShoes />
                        ) : index == 7 ? (
                          <GiBigDiamondRing />
                        ) : index == 8 ? (
                          <GiSportMedal />
                        ) : index == 9 ? (
                          <FaBaby />
                        ) : index == 10 ? (
                          <BiCameraMovie />
                        ) : index == 11 ? (
                          <MdOutlineSportsEsports />
                        ) : index == 12 ? (
                          <BsPhoneVibrate /> 
                        ) : index == 13 ? (
                          <MdOutlineSmartToy />
                        ) : index == 14 ? (
                          <BiGift />
                        ) : index == 15 ? (
                          <Gi3DHammer />
                        ) : index == 16 ? (
                          <AiOutlineSecurityScan />
                        ) : (
                          ""
                        )
                      }
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </li>
              )
            })
          }
        </div>
      </ul>
    </div>
  )
}
