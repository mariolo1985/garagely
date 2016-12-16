import React, { Component } from 'react';

class Nav extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (
            <div className='menu-wrapper clear'>
                <div className='search-wrapper'>
                    <div className='search-box'>
                        <input type='text' className='txb-search' />
                        <button className='btn-search-map'>
                            <i className='fa fa-search' />
                        </button>
                    </div>
                </div>

                {
                    this.props.isAutho ?
                        <ul className='menu clear'>
                            <li className='menu-item'>
                                <img className='user-img' src={this.props.user.picUrl} alt='Opps' />
                            </li>
                        </ul>
                        :
                        <ul className='menu clear'>
                            <li className='menu-item'>
                                <a href='./signup' className='menu-link btn btn-signup'>Sign up</a>
                            </li>
                            <li className='menu-item'>
                                <a href='./autho' className='menu-link btn btn-login'>Login</a>
                            </li>
                        </ul>
                }
            </div>
        )
    }// END RENDER 
}

export default Nav;