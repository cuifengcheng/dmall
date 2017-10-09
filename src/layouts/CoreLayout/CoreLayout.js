import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/core.scss'
import './CoreLayout.scss'

const CoreLayout = ({children}) => (
	<div className='main-container' style={{height: document.body.clientHeight + "px"}}>
	      {children}
	</div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
