import React from 'react'

function Input(props) {
  return (
    <input value={props.value} onChange={e => props.onChange(e.target.value)}></input>
  )
}

Input.displayName = 'input'

export default Input
