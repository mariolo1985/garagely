import React, { Component } from 'react';


class Modal extends Component {
    constructor(props) {
        super(props);

        if (this.props.isOpen != null) {
            this.state = {
                Open: this.props.isOpen
            }
        }

        this.toggleModal = this.toggleModal.bind(this);

    }// END CONSTRUCTOR
    toggleModal() {
        this.setState({
            Open: !this.state.Open
        })
    }
    render() {
        // BUILD CHILDREN WITH CLASS METHODS
        const childrenWithProps = React.Children.map(
            this.props.children,
            (child) => React.cloneElement(child, {
                initToggleModal: this.toggleModal
            })
        );

        var modalClass = this.props.isOpen ? 'modal open' : 'modal';
        return (
            <section className={modalClass}>
                <div className='modal-container'>
                    {childrenWithProps}
                </div>
            </section>
        );
    }// END RENDER
}

export default Modal;