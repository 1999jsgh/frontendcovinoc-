import React, { Fragment } from 'react'

const Loading = () => {
    return (
        <Fragment>
            <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        </Fragment>
    )
}

export default Loading
