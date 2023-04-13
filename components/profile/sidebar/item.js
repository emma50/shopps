import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import slugify from "slugify";
import { useRouter } from "next/router";
import styles from "./sidebar.module.scss";

export default function Item({ item, visible, index }) {
  const [show, setShow] = useState(visible);
  const router = useRouter();

  return (
    <li>
      {item.heading === "Sign out" ? (
        <b onClick={() => signOut()}>Sign out</b>
      ) : (
        <b onClick={() => {
          setShow((prev) => !prev)
          // router.push(`/profile?tab=${index}`)
        }}>
          {item.heading} {show ? <HiMinusSm /> : <HiPlusSm />}
        </b>
      )}
      {show && (
        <ul>
          {item.links.map((link, i) => (
            <span key={i}>
              {<li
                  className={
                    (router.query.q || "") ===
                    slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    legacyBehavior
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}`}
                  >
                    <a>{link.name}</a>
                  </Link>
                </li>}
            </span>
          ))}
        </ul>
      )}
    </li>
  );
}
