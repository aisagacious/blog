import * as React from 'react'

const Error = (props: any): any => {
  return (
    <div className="error" onClick={() => { props.history.push('/home') }}>
      <img src={require('../assets/img/error.jpg')} alt="" />
    </div>
  )
}

export default Error
