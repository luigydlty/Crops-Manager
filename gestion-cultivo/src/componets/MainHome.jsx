import React from 'react'
import flower from '../assets/img/flower.webp'
import smile from '../assets/img/smile.webp'
import job from '../assets/img/job.webp'
import homeBanner from '../assets/img/homeBanner.webp'


const MainHome = (props) => {
    return (
        <main className="col-lg-10 mt-lg-5  p-lg-0" style={{marginLeft: "16.7%"}} >
            <div className="m-lg-3 mt-lg-0 ">
                <img style={{width:"100%",height:"270px"}} src={homeBanner} className="img-fluid" alt="home banner"/>
                <div className="row p-lg-5">
                    <div className="col-4">
                        <div className="card-home">
                            <div className="card-body text-center fs-4">
                            <h4 className="card-title fw-bold fs-1 ">50.000</h4>
                            <p className="card-text">Semillas Sembradas</p>
                            <img style={{width:"100%",height:"136px"}} src={flower} className="img-fluid" alt="Semillas Sembradas"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card-home">
                            <div className="card-body text-center fs-4">
                            <h4 className="card-title fw-bold fs-1 ">2.300</h4>
                            <p className="card-text">Clientes Felices</p>
                            <img style={{width:"100%",height:"136px"}} src={smile} className="img-fluid" alt="Clientes Felices"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card-home">
                            <div className="card-body text-center fs-4">
                            <h4 className="card-title fw-bold fs-1">1.250</h4>
                            <p className="card-text">Empleos Generados</p>
                            <img style={{width:"100%",height:"136px"}} src= {job} className="img-fluid" alt="Empleos Generados"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default MainHome

