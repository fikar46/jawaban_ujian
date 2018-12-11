import React, {Component} from 'react';

class InputLogin extends Component{
    render(){
        return(
            <input type={this.props.type} ref={this.props.innerRef} className={this.props.className} placeholder={this.props.placeholder} />
        )
    }
}
export default InputLogin;