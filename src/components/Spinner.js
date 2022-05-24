import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
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
}
