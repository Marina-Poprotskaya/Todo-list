import React from 'react';
import Form from '../form/component';
import './style.css';


class Header extends React.Component {

    render() {
        return (
            <div className='header'>
                <Form onSubmit={this.props.onSubmit}/>
            </div>
        )
    }
}

export default Header;

