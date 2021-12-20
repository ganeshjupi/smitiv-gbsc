import React from 'react';

import './App.css';

class header extends React.Component {
    render() {
       return (
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Login | GBSC</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="icon" href="favicon.ico" type="image/x-icon">
            <!--Bootstrap 3.4 CSS-->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
            <!-- Montserrat Font Style -->
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap" rel="stylesheet">
            <!-- Custom Style -->
            <link rel="stylesheet" type="text/css" href="custom-style.css">
        </head>
        <body>
        <!-- Main Wrapper Starts here -->
        <div className="container-fluid">
            <div className="row">
                <!-- login-left Starts here -->
                <div className="col-md-5 col-sm-5 login-left hidden-sm hidden-xs">
                    <h1>Welcome to <strong>GENIE</strong></h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="img-wrap"><img className="img-responsive" src="images/login-img.png" alt="image"></div>
                </div>
                <!-- login-left Ends here -->
        
                <!-- login-right Starts here -->
                <div className="col-md-7 col-sm-12 login-right">
                    <div className="login-wrap">
                        <div className="nav-brand"><img src="images/logo-genie.png" alt="Genie"/></div>
                        <p className="lead">Login</p>
                        <div className="alert-wrap hide"><p>Username & Password does not match</p></div>
                        <!-- form Starts here -->
                        <form className="login-form" action="#">
                            <div className="form-group">
                                <input type="text" name="username" className="form-control" placeholder="Username" required="required"/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" placeholder="Password" required="required"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn login-btn">Login</button>
                                <a href="javascript:;" className="forgot-pass">Forgot Password?</a>
                            </div>
                        </form>
                        <!-- form Ends here -->
                    </div>
                </div>
                <!-- login-right Ends here -->
        
            </div>
        </div>
        <!-- Main Wrapper Ends here -->
        </body>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        
        </html>
        
       );
    }
 }
 export default header;