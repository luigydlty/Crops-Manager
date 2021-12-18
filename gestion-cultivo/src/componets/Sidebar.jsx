import React from 'react'
import logo from '../assets/img/logo.svg'
import {useNavigate,Link} from 'react-router-dom'

const Sidebar = ({viewType}) => {
    const navigate = useNavigate()
    const handleClick = (e,route) => {
        e.preventDefault()
        if (viewType === 'admin') {
            navigate('/homeAdmin')
        }else if (viewType === 'config') {
            navigate('/homeConfig')
        }else if (viewType === 'manage') {
            navigate('/homeManage')
        }
    }
    return (
        <nav className="col-lg-2 navBar bg-green vh-100 position-fixed p-lg-3">
                <img src={logo} alt="logo" className="img-fluid mx-auto d-block w-75 mt-lg-2 mb-lg-4"/>
                <hr className="border border-white"/>
                <ul className="nav flex-column">
                    <li className="nav-item " >
                        <a href='/' className="active" onClick={(e)=>handleClick(e)}>
                            <i className="fas fa-home"></i>
                            Inicio
                        </a>
                    </li>
                    {viewType === 'admin' &&
                    
                    ( <> <li className="nav-item">
                    <Link className="navLink" to="/userAdmin">
                        <i className="fas fa-user-circle"></i>
                        Gestionar Usuarios
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="navLink" to="/gestion-predios">
                        <i className="fas fa-chart-area"></i>
                        Gestión Predios
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="navLink" to="/gestion-cultivos">
                        <i className="fas fa-seedling"></i>
                        Gestión Cultivos
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="navLink" to="/parametros-cultivos">
                        <i className="fas fa-tasks"></i>
                        Parametros Cultivos
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="navLink" to="/configurar-cultivos">
                        <i className="fab fa-pagelines"></i>
                        Configurar Cultivos
                    </Link>
                </li>
                </>)
                }

                {viewType === 'config' &&   
                ( <>
                <li class="nav-item">
                        <a class="navLink" href="profileConfig.html">
                            <i class="fas fa-user-circle"></i> 
                            Mi perfil
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="navLink" href=" propertiesConfig.html">
                            <i class="fas fa-chart-area"></i>
                            Gestión Predios
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="navLink" href="cropsConfig.html">
                            <i class="fas fa-seedling"></i>
                            Gestión Cultivos
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="navLink" href="parametersConfig.html">
                            <i class="fas fa-tasks"></i>
                            Parametros Cultivos
                        </a>
                    </li> 

                </>
                )}
                
                {viewType === 'manage' &&
                ( <>
                <li class="nav-item">
                        <a class="navLink" href="profileManage.html">
                            <i class="fas fa-user-circle"></i> 
                            Mi perfil
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="navLink" href="configManage.html">
                            <i class="fab fa-pagelines"></i>
                            Configurar Cultivos
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="navLink" href="sowingManage.html">
                            <i class="fas fa-tasks"></i>
                            Programar Siembra
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="navLink" href="pickManage.html">
                            <i class="fas fa-truck-monster"></i>
                            Programar Cosecha
                        </a>
                    </li>
                </>
                )}
                </ul>
                <hr className="border border-white"/>
            </nav>
    )
}
export default Sidebar