import React from 'react'
import Header from '../componets/Header'
import MainHome from '../componets/MainHome'
import Sidebar from '../componets/Sidebar'

const HomeAdmin = (props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar viewType={'admin'} />
                <Header/>
                <MainHome/>
            </div>
        </div>
    )
}
export default HomeAdmin

