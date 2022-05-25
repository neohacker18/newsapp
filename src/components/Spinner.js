import React, { Component } from 'react'

const Spinner=()=>{
    return (
      <div className='container' style={{margin:'30px 0px'}}>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
}

export default Spinner