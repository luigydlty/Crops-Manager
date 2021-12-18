import React from "react";
import Header from '../componets/Header'
import MainHome from '../componets/MainHome'
import Sidebar from '../componets/Sidebar'

const HomeConfig = (props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Header/>
                <MainHome/>
                <Sidebar viewType={'config'} />

            </div>
        </div>
    )
}
export default HomeConfig;

