import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoodShelf from '../../../components/Goods_Shelf'

const recomditem = ({ list }) => (
    <div className="recomd-container">
        {list.map((item) => (
            <GoodShelf key={item.id} item={item} showTitle={true} />
        ))}
    </div>
)

export default recomditem
