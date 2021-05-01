import {FC} from 'react'
import './header.css'
import {logout as logoutUser} from '../../services/authService'
import {ImExit} from 'react-icons/im'


export const Header:FC<any> = (props):JSX.Element => {

    const logout = async () => {
        const res = await logoutUser()
        props.setLogged(res.data.data)
    }

    return(
        <div className="header__container">
            <h1>TASKS</h1>

            {localStorage.getItem('rol') === '608343aa56195f1829eded13'? <span onClick={props.openUserModal} className="users__button">USERS</span> : false}

            <span className="logout_button">{props.user}<ImExit size="30" className="logout__button" onClick={logout} /></span>

        </div>
    )
}