import React, { Component } from 'react';

class loading extends Component {
    componentDidMount(){
        this.props.history.push(this.props.location.state[0])
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default loading;