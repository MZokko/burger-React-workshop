import React, { Component } from 'react'
import * as actions from '../../../store/actions/index'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
class Logout extends Component {
    componentDidMount() {
        //reset the token n user id thru redux
        this.props.onLogout()
        
    }

    //redirect declarativly by imp Redirect component
    render() {
        return <Redirect to='/' />
    }
}

const mapDispatchToProps = (dispatch=>{
    return {
        onLogout : ()=>dispatch(actions.logOut())
    }
})
export default connect(null,mapDispatchToProps)(Logout);