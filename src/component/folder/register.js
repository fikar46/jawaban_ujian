import React, { Component } from 'react';
import {connect} from 'react-redux';
import {onUserRegister} from '../../actions';
import {Redirect} from 'react-router-dom';
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Register extends Component{
  componentWillReceiveProps(newProps){
    if(newProps.username!==""){
        cookies.set('dataUser',newProps.username,{path: '/'})
    }
  }
  onBtnRegisterClick =()=> {
    var username = this.refs.username.value;
    var email = this.refs.email.value;
    var phone = this.refs.phone.value;
    var password= this.refs.password.value
    this.props.onUserRegister({username,email,phone,password});

  }
  renderError=()=>{
    if(this.props.error.length>0){
        return <p className="alert alert-danger">{this.props.error}</p>
    }
}
    render(){
      if(this.props.username===''){
        return(
            <div>
                <div className="main">
        {/* Sign up form */}
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="register-form">
                  <div className="form-group">
                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                    <input ref="username" type="text" name="name" id="name" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"><i className="zmdi zmdi-email" /></label>
                    <input ref="email" type="email" name="email" id="email" placeholder="Your Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="re-pass"><i className="zmdi zmdi-phone" /></label>
                    <input ref="phone" type="number" name="number" id="number" placeholder="+628xxxx" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass"><i className="zmdi zmdi-lock" /></label>
                    <input ref="password" type="password" name="pass" id="pass" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                    <label htmlFor="agree-term" className="label-agree-term"><span><span /></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                  </div>
                  <div>
                    {this.renderError()}
                  </div>
                  <div className="form-group form-button">
                    <input onClick={this.onBtnRegisterClick} type="button" name="signup" id="signup" className="form-submit" defaultValue="Register" />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure><img src="image/signup-image.jpg" alt="sing-up-images" /></figure>
                <a href="login" className="signup-image-link">I am already member</a>
              </div>
            </div>
          </div>
        </section>
      </div>
            </div>
        );
      }
      return <Redirect to="/homes"/>
    }
}
const mapStateToProps =(state)=>{
  return {
      username: state.auth.username,
      error: state.auth.error,
      loading: state.auth.loading
  
  };
}
export default connect(mapStateToProps, {onUserRegister})(Register);