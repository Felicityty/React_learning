import React from 'react'

function FormItem(props) {
  const { handleChange, value, name, label, children } = props
  const onChange = (value) => {
    handleChange(name, value)
  }
  return (
    <div>
      <span>{label}:</span>
      {
        React.isValidElement(children) && children.type.displayName === 'input' ?
          React.cloneElement(children, { onChange, value }) : null
      }
    </div>
  )
}

FormItem.displayName = 'formItem'

export default FormItem
