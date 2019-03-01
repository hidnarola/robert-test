import React, { Component } from 'react';
import history from '../../config/history';

class NotFound extends Component {
    handleClick = () => {
        history.goBack();
    }
    render() {
        return (
            <div>
                <h1>Page Not Found</h1>    
                <button onClick={this.handleClick}>Go Back</button>
            </div>
        );
    }
}

export default NotFound;