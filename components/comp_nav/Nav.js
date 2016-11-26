import React, { Component } from 'react';

class Nav extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='menu-wrapper clear'>
                <ul className='menu clear'>
                    <li className='menu-item'>
                        <a href='./signup' className='menu-link btn btn-signup'>Sign up</a>
                    </li>
                    <li className='menu-item'>
                        <a href='./autho' className='menu-link btn btn-login'>Login</a>
                    </li>
                </ul>
            </div>
        )
    }// END RENDER 
}

export default Nav;