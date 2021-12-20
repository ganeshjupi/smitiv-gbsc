import React from 'react';

import FetchAllApi from '../../api_links/fetch_all_api';

import jQuery from 'jquery';

class forgot_password extends React.Component {

    constructor(props) {
        super(props);
        //const { history } = this.props;
        this.state = { logged_user_id: localStorage.getItem("logged_user_id"), logged_user_email: localStorage.getItem("logged_user_email"), logged_user_name: localStorage.getItem("logged_user_name"), logged_user_photo: localStorage.getItem("logged_user_photo"), logged_user_firstname: localStorage.getItem("logged_user_firstname"), logged_user_lastname: localStorage.getItem("logged_user_lastname")};
    }

    UNSAFE_componentWillMount() {
        //console.log("logged_user_id", this.state.logged_user_id);
        jQuery('title').html('Forgot Password | GBSC');
    }


    forgotPwdSubmit(e){
        e.preventDefault();
    
        var user_email = jQuery("#login_user_email").val();
    
        if(user_email !== ""){
          //console.log("Success!");
          FetchAllApi.forgotPwd(user_email, (err, response) => {
              //console.log('Login Status', response.status);
              if(response.status === 1){
                jQuery(".alert-wrap").removeClass('hide').html('<p>'+response.message+'</p>');
                jQuery("#login_user_email").val('');    
              } else{
                jQuery(".alert-wrap").removeClass('hide').html('<p>'+response.message+'</p>');
              }
          });
          
        } else{
            jQuery(".alert-wrap").removeClass('hide').html('<p>Enter valid email-id!</p>');
        }
    
    }

    loginLink(e){
        e.preventDefault();    
        this.props.history.push('/');
    }



    render() {
       return (

        <div className="container-fluid">
            <div className="row">

                <div className="col-md-5 col-sm-5 login-left hidden-sm hidden-xs">
                    <h1>Welcome to <strong>GENIE</strong></h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="img-wrap"><img className="img-responsive" src="../images/login-img.png" alt="" /></div>
                </div>

                <div className="col-md-7 col-sm-12 login-right">
                    <div className="login-wrap">
                    <div className="nav-brand"><img src="../images/logo-genie.png" alt="Genie"/></div>
                        <p className="lead">Forgot Password</p>
                        <div className="alert-wrap hide"><p>Email-id does not exist!</p></div>
                        
                        <form className="login-form" onSubmit={this.forgotPwdSubmit.bind(this)}>
                            <div className="form-group">
                                <input type="text" name="username" id="login_user_email" className="form-control" placeholder="Username" required="required"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn login-btn" >Submit</button>
                                <a href="/" onClick={this.loginLink.bind(this)} className="forgot-pass">Login</a>
                            </div>
                        </form>
                        
                    </div>
                </div>
                
        
            </div>
        </div>
        
       );
    }
 }
 export default forgot_password;
