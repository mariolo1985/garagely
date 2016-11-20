import React, { Component } from 'react';

class ModalHead extends Component {
    constructor(props) {
        super(props);

        this.doToggle = this.doToggle.bind(this);
    }
    doToggle() {
        this.props.initToggleModal();
    }
    render() {
        return (
            <div className='modal-head'>
                <span className='head-msg'>Test</span>
                <button className='btn btn-icon btn-modal-close' onClick={this.doToggle}>X</button>
            </div>
        )
    }
}

export default ModalHead;