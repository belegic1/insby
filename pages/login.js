import React from 'react'
import { useToken } from '../hooks/useToken'
import styles from '../styles/Login.module.css'
import { useState, useContext } from "react"
import { useRouter } from 'next/router'
import { useRegisterUser, useUser } from '../hooks/useUser'
import { useMutation, useQueryClient } from "react-query";


const Login = () => {

  const router = useRouter()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberme, setRememberme] = useState(true)
  const [errMsg, setErrMsg] = useState(null)

  const token = useToken()
  // const { mutate } = useRegisterUser()

  async function register() {
    if (token) {
      const raw = {
        "login": username,
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword,
        "rememberMe": true,
        "autoRegister": true,
        "admin": false
      }
      const requestOptions = {
        method: 'POST',

        body: JSON.stringify(raw),
        redirect: 'follow',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      };

      try {
        const response = await fetch("https://dev-mrp.insby.tech/api/session/sign-in", requestOptions);
        const result_1 = await response.json();
        return result_1;
      } catch (error) {
        return console.log('error', error);
      }
    }
  }

  const { mutate } = useMutation(register);


  const queryClient = useQueryClient()

  const handleSubmit = e => {
    e.preventDefault()
  

    mutate(register, {
      onSuccess: data => {
        queryClient.setQueryData("user", (oldData) => {
          return data.data
        })
      }
    })
   
    setTimeout(() => {
      router.push("/")
    }, 500);
  }


  const sumbitIt = () => {
   
    mutate(token)
    router.push("/")
  }

  return (
    <div className={styles.login}>
      
      <div>
      </div>
          <form onSubmit={handleSubmit}>
              <div className={styles.form}>
                  <input value={username} onChange={e => setUsername(e.target.value)} className={styles.input} type="text" placeholder='Username' />
                  <input value={email} onChange={e => setEmail(e.target.value)} className={styles.input} type="email" placeholder='Email' />
                  <input value={password} onChange={e => setPassword(e.target.value)} className={styles.input} type="password" placeholder="Password" />
                  <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={styles.input} type="password" placeholder="Confirm password" />
                  <div>
                      <input className={styles.input} type="checkbox" name="Remember me" id="rememberme" />
                      <label value={rememberme} onChange={e => setRememberme(e.target.checked)} className={styles.label} htmlFor="rememberme">Remember me</label>
          </div>
          
          <button  className={styles.input}>{errMsg ? errMsg : 'SignUp/Login'}</button>
          <button disabled className={styles.input} type="button" onClick={sumbitIt}>Test credentials register</button>

             </div>
          </form>
    </div>


  )
}

export default Login