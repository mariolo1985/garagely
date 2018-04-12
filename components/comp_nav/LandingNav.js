import React, { Component, PropTypes } from 'react';

class LandingNav extends Component {
    constructor(props) {
        super(props);
        this.startFBLogin = this.startFBLogin.bind(this);
    }// end constructor
    startFBLogin() {
        fbLogin(false, '', false, '');
    }
    render() {
        return (
            <div className='landing-header-container clear'>
                {
                    this.props.isAutho ?
                        <div className='autho'>
                            <div className='user-wrapper'>
                                <img src={this.props.user.picUrl} className='user-img' />
                                <ul className='user-menu'>
                                    <li className='user-item'>
                                        <button className='btn-user-action'>Profile</button>
                                    </li>
                                </ul>
                            </div>
                            <a href='./map' className='header-signup-link'>Map</a>
                        </div>
                        :
                        <div className='not-autho'>
                            <a href='./autho' className='header-signup-link btn-login'>Login</a>
                            <a href='./signup' className='header-signup-link btn-signup'>Sign Up</a>
                            <a href='./map' className='header-signup-link btn-success'>Map</a>
                        </div>
                }

            </div>
        )
    }// end render
}

LandingNav.propTypes = {
    isAutho: PropTypes.bool
}

export default LandingNav;