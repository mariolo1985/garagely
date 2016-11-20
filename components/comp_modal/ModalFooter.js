import React, {Component, PropTypes} from 'react';

class ModalFooter extends Component{
    constructor(props){
        super(props);
    }// end constructor 
    render(){
        return(
            <div className='modal-footer'>
                {this.props.children}
            </div>
        )
    }// end render 
}

export default ModalFooter;