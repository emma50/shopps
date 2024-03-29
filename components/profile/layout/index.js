import Head from "next/head"
import styles from "./layout.module.scss"
import Header from "../../header"
import Sidebar from "../sidebar"

export default function Layout({ session, tab, children }) {
 
  return (
    <div className={styles.layout}>
      <Head>
        <title>{session?.user?.name}</title>
      </Head>
      <Header country/>
      <div className={styles.layout__container}>
        <Sidebar
          data={{
            ...session,
            tab,
          }}
        />
        <div className={styles.layout__content}>{children}</div>
      </div>
    </div>
  );
}
