import React from 'react'

const MainContentHeader = ({setModal,title,subTitle,buttonTitle}) => {
    return (
        <>
        <div className="row">
            <div className="mb-3 d-flex col-9">
            <h3>{title}</h3>
            </div>
            <div className="d-grid gap-2 d-md-block col-3">
            <button
                type="button"
                className="btn btn-success mx-auto"
/*                 data-bs-toggle="modal"
                data-bs-target="#crear" */
                onClick={() => setModal(true)}
            >
                {buttonTitle}
            </button>
            </div>
        </div>
        <h6>{subTitle}</h6>
        <hr />
        </>
    )
}

export default MainContentHeader
