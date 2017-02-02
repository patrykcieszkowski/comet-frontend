import React from 'react'

export default class RadioToggler extends React.Component
{
  render()
  {
    let { onChangeCallback, item } = this.props

    return (
      <label className="side">
        <input
          type="radio"
          ref={item.ref}
          name={item.name}
          value={item.value}
          defaultChecked={item.checked}
          onChange={onChangeCallback}
        />
        <span className="title">{item.title}</span>
      </label>
    )

  }
}
