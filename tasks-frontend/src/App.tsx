import {FC, useEffect, useState} from 'react'
import {Home} from './components/Home'
import {login as loginInterface, registro as registroInterface} from './models/models'
import {register,login,isLogged} from './services/authService'
import {IoArrowBack} from 'react-icons/io5'
import './App.css'

export const App:FC = () => {

  const[logged,setLogged] = useState<boolean>(false)

  const [errors,setErrors] = useState<String>('')

  useEffect(() => {
    const checkAuth = async () => {
      const response = await isLogged()
      setLogged(response.data.data)
    }
    checkAuth()
  },[logged])

  const [registro, setRegistro] = useState<boolean>(false)

  const [log, setLog] = useState<loginInterface>({
    username: '',
    password: ''
  })

  const [reg, setReg] = useState<registroInterface>({
    username: '',
    password: '',
    rol: 'ADMIN'
  })

  const registerUser = async () => {
    if(reg.username === '' || reg.password === '' || reg.rol === '') {
      setErrors('Rellena los campos obligatorios')
    } else {
      const response = await register(reg)
        if(response.data.code === 200) {
          setReg({
            username:'',
            password:'',
            rol:'ADMIN'
          })
          localStorage.setItem('rol', response.data.data.user.rol)
          localStorage.setItem('username', response.data.data.user.username)
          setRegistro(false)
          setLogged(true)
      } else {
        setErrors(response.data.data)
      }
    }
  }

  const loginUser = async () => {
    const response = await login(log)
    if(response.data.code === 200) {
      setLog({
        username: '',
        password:''
      })
      localStorage.setItem('rol', response.data.data.user.rol)
      localStorage.setItem('username', response.data.data.user.username)
      setLogged(true)
    } else {
      setErrors(response.data.data)
    }
  }

  return(
    <div className="app__container">
      {!logged?
        <div className="app__container--login">
          {!registro?
            <>
              <h1 className="app__container--login_title">LOGIN</h1>
              <span onClick={() => setErrors("")} className="errors">{errors}{errors !== ''? ' X' : false}</span>
              <div className="app__container--login_username">
                <label>Username</label>
                <input type="text" value={log.username} onChange={(e) => setLog({...log,username:e.target.value})}/>
              </div>
              <div className="app__container--login_username">
                <label>Password</label>
                <input type="password" value={log.password} onChange={(e) => setLog({...log,password:e.target.value})} />
              </div>
              <button className="form__button" onClick={loginUser}>Login</button>
              <p className="app__container--login_title">¿No tienes cuenta? Registrate <span className="register__span" onClick={() => setRegistro(true)}>AQUI</span></p>
            </>
          :
          <>
            <IoArrowBack onClick={() => setRegistro(false)} className="back__icon" size="30"/>
            <h1 className="app__container--login_title">REGISTRO</h1>
            <span onClick={() => setErrors("")} className="errors">{errors}{errors !== ''? ' X' : false}</span>
              <div className="app__container--login_username">
                <label>Username</label>
                <input type="text" value={reg.username} onChange={(e) => setReg({...reg,username:e.target.value})} />
              </div>
              <div className="app__container--login_username">
                <label>Password</label>
                <input type="password" value={reg.password} onChange={(e) => setReg({...reg,password:e.target.value})} />
              </div>
              <div className="app__container--login_username">
                <label>Rol</label>
                <select value={reg.rol} onChange={(e) => setReg({...reg,rol:e.target.value})}>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
              </div>
              <button className="form__button" onClick={registerUser}>Register</button>
          </>
          }
        </div>
      :
      <Home setLogged={setLogged}/>
      }
    </div>
  )
}
