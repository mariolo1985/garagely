import React, {Component, PropTypes} from  'react';

class ModalBody extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='modal-body'>
                {this.props.children}
            </div>
        )
    }// end render
}

export default ModalBody;