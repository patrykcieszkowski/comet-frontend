import React from 'react'

export default class CheckboxToggler extends React.Component
{
  render()
  {
    let { checked, onChangeCallback, name, title, wrapperClass } = this.props
    let _class = (wrapperClass) ? 'block ' + wrapperClass : 'block input'
    return (
      <div className={_class}>
        <span className="title">{title}</span>
        <label className="switch">
          <input
            type="checkbox"
            name={name}
            defaultChecked={checked}
            onChange={onChangeCallback}
          />
          <div className="slider"></div>
        </label>
      </div>
    )
  }
}
