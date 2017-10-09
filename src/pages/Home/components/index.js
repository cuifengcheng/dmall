import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from '../../../core/isemptyobj.js'
import SearchBar from "../../../components/SearchBar"
import Lunbo from '../../../components/Lunbo/lunbo.js'
import Footer from '../../../components/Footer'
import Advpos from './advpos.js'
import Navigation from './navigation.js'
import LunboAdv from './lunboadv.js'
import Listitem from './listitem.js'
import Slideitem from './slideitem.js'
import Recomditem from './recomditem.js'
import Advbottm from './advbottm.js'
import { getFullCut } from '../../../store/fullcut'

import './index.scss'

export class HomeView extends Component {
    componentWillMount(){
       const { homeInfo , getHomeData , fullCutList, getFullCut} = this.props;
       getHomeData()
       if(fullCutList == ""){
          getFullCut()
       }
    }

    render() {
        const { lunbo , advpos , navigation , headerpic , listitem , slideitem , recomditem , bottompic } = this.props.homeInfo;
        return (
          <div className="home-container">
            <SearchBar />
            <Lunbo list={lunbo} />
            <Advpos list={advpos} />
            <Navigation list={navigation.list || []} count={navigation.lineCount || 4}/>
            <LunboAdv list={headerpic} />
            <Listitem list={listitem} />
            <Slideitem list={slideitem} />
            <Recomditem list={recomditem} />
            <Advbottm list={bottompic} />
            <div style={{height: "55px"}}></div>
            <Footer />
          </div>
        )
    }
}

HomeView.propTypes = {
    homeInfo: PropTypes.shape({
        lunbo: PropTypes.array.isRequired,
        advpos: PropTypes.array.isRequired,
        navigation: PropTypes.object.isRequired,
        headerpic: PropTypes.array.isRequired,
        listitem: PropTypes.array.isRequired,
        bottompic: PropTypes.array.isRequired,
    }).isRequired
}

const mapState = (state) => ({
    fullCutList: state.fullCutList.info
})

const mapDispatch = {
    getFullCut
}

export default connect(mapState,mapDispatch)(HomeView)
