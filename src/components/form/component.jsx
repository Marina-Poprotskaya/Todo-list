import React from 'react';
import './style.css';

class Form extends React.PureComponent {

    render() {
        return (
            <form id='form' className='form' onSubmit={this.props.onSubmit}>
                <input className='form-input' type='text' placeholder='Type your task...' required/>
                <button className='form-button' type='submit'>Add</button>
            </form>
        )
    }
}

export default Form;