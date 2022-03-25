import React from 'react'
import Link from "next/link"
import styles from "./Navbar.module.css"
import { useUser } from '../hooks/useUser'



const Navbar = () => {

    const user = useUser()
    console.log({user})
  return (
      <div className={styles.header}>
          <div>
              <span className={styles.username}>
                  {user && user.data && user.data.user ? `(${user.data.user.username})` : ""}
             </span>

              <Link className={styles.l} href='/login'>Sign-up/Login</Link>
          </div>

      </div>
  )
}

export default Navbar

