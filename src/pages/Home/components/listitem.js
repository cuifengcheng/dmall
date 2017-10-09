import React , { Component } from 'react'
import PropTypes from 'prop-types'
import GoodShelf from '../../../components/Goods_Shelf'

const listitem = ({list}) => ((
	<div className="list-show">
		{list.map((item,index) =>(
			<div key={item.key || index}>
				<div className="magezin_img">
					<a href={item.link}><img src={item.pic}/></a>
				</div>
        {item.goods.length !== 0 ? (
            <div className="listDetai">
              {!!item.goods && item.goods.map((gd) => (
                <GoodShelf key={gd.id} item={gd} count={item.count} showTitle={false}></GoodShelf>
              ))}
            </div>
          ) : ' '}

				<div className="clear"></div>
			</div>
		))}
	</div>
))

export default listitem
