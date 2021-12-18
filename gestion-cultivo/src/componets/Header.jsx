import React from 'react'
/* import { useContext } from 'react'
import { AppContext } from '../context/AppContext' */
import {useNavigate} from 'react-router-dom'


const Header = (props) => {
    const navigate = useNavigate()
    const handleClick = (e,route) => {
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('correo')
        navigate('/')
    }
    const correoUser = localStorage.getItem('correo')
    /* const {correo} = useContext(AppContext) */
    return (
        <header class="col-lg-10 text-white p-0 fixed-top " style={{marginLeft: '16.7%'}}>
        <div class="header-content bg-green ms-lg-3 p-lg-2 text-end">
            <div class="me-lg-1 ">
                <span class="me-lg-2 fs-6">{correoUser}</span>
                <a class="icon-session" onClick={handleClick}  href="/">
                    <i class="fas fa-power-off"></i>
                    Cerrar Sesión
                </a>
            </div>
        </div>
    </header>
        
    )
}
export default Header

