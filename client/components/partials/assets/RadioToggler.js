import React from 'react'
import RadioTogglerItem from './RadioTogglerItem'

export default class RadioToggler extends React.Component
{
  render()
  {
    let { onChangeCallback, itemList } = this.props

    if (!onChangeCallback || !itemList || itemList.length < 2)
    {
      return
    }

    return (
      <div className="block radio-toggler">
        {itemList.map((item, i) => {
          return (
            <RadioTogglerItem
              onChangeCallback={onChangeCallback}
              item={item}
              key={i}
            />
          )
        })}
      </div>
    )
  }
}
