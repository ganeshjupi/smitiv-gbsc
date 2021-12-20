import React from "react";
import { Link } from "react-router-dom";

import FetchAllApi from "../../api_links/fetch_all_api";

import jQuery from "jquery";

class UserSetPassword extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    // this.state = { logged_user_id: localStorage.getItem("logged_user_id"), logged_user_email: localStorage.getItem("logged_user_email"), logged_user_name: localStorage.getItem("logged_user_name"), logged_user_photo: localStorage.getItem("logged_user_photo"), logged_user_firstname: localStorage.getItem("logged_user_firstname"), logged_user_lastname: localStorage.getItem("logged_user_lastname"), logged_role_id: localStorage.getItem("logged_role_id"), logged_subscription_start_date: localStorage.getItem("logged_subscription_start_date"), logged_subscription_end_date: localStorage.getItem("logged_subscription_end_date"), logged_plan_id: localStorage.getItem("logged_plan_id")
    this.state = {
      user_id: "",
      client_id: "",
      email_id: "",
      password: "",
      conformPassword: "",
      subscriber_id: "",
      show1: false,
      show2: false,
    };
  };

  // componentWillMount=()=>{
  //   if (
  //     this.state.logged_user_id === "" ||
  //     this.state.logged_user_id === null ||
  //     this.state.logged_user_id === undefined
  //   ) {
  //     this.props.history.push("/");
  //   }
  // }

  componentWillMount() {
    localStorage.clear()

    const params = new URLSearchParams(this.props.location.search);
    FetchAllApi.checkPage(params.get("user_id"), params.get("subscriber_id"), (err, response) => {
      console.log("newapi")
      if (response.status === 1) {
        if (response.is_old_user == 1) {
          this.props.history.push("/")
        }
      }
    })
  }

  componentDidMount() {
    // let location = window.location.pathname.toString()
    // alert(window.location.pathname)

    const params = new URLSearchParams(this.props.location.search);
    this.setState({
      user_id: params.get("user_id"),
      client_id: params.get("client_id"),
      email_id: params.get("email_id"),
      subscriber_id: params.get("subscriber_id")
    });


  };

  // checkFunc=()=>{
  //   FetchAllApi.checkPage(this.state.user_id,this.state.subscriber_id, (err, response) => {
  //     if (response.status === 1) {
  //       if(response.is_old_user == 1){
  //         this.props.history.push("/")
  //       }
  //     }

  // })};

  UNSAFE_componentWillMount() {
    // console.log("logged_user_id", this.state.logged_user_id);
    // console.log("role_id", this.state.logged_role_id);
    // if(this.state.logged_user_id !== "" && this.state.logged_user_id !== "null"  && this.state.logged_user_id !== null && this.state.logged_user_id !== "undefined"){
    //     //this.props.history.push('/user_inbox');

    //     if(parseInt(this.state.logged_role_id)  === 1){
    //         this.props.history.push('/user_inbox');
    //     } else{
    //         this.props.history.push('/inbox');
    //     }
    // }

    jQuery("title").html("Set password | GBSC");
  }

  loginFormSubmit(e) {
    e.preventDefault();

    var user_email = jQuery("#login_user_email").val();
    var user_password = jQuery("#login_user_pwd").val();

    if (user_email !== "" && user_password !== "") {
      if (user_email !== user_password) {
        jQuery(".alert-wrap")
          .removeClass("hide")
          .html("<p>Password & conform Password does not match!</p>");
      } else {
        //console.log("Success!");
        FetchAllApi.updatePassword(
          this.state.user_id,
          user_password,
          this.state.email_id,
          (err, response) => {
            //console.log('Login Status', response.status);
            if (response.status === 1) {
              this.hhwt_success_login_action(
                response.details.user_id,
                response.details.client_id,
                response.details.role_id,
                response.details.user_name,
                response.details.email,
                response.details.phone,
                response.details.user_image,
                response.details.company_name,
                response.details.subscription_start_date,
                response.details.subscription_end_date,
                response.details.plan_id
              );
              // this.role_permissions(response.role_permissions)
              localStorage.setItem(
                "role_permissions",
                JSON.stringify(response.details.role_permissions)
              );
              // localStorage.setItem("logged_user_email", response.userdetails.email);
              // localStorage.setItem("logged_user_name", response.userdetails.name);

              localStorage.setItem(
                "role_permissions",
                JSON.stringify(response.details.role_permissionsle)
              );
              localStorage.setItem(
                "user_layer_role",
                JSON.stringify(response.details.user_layer_role)
              );
              localStorage.setItem(
                "layer",
                JSON.stringify(response.details.layer)
              );


              localStorage.setItem("country_sortname", (response.country_sortname));
              localStorage.setItem("language_code", (response.language_code));
              localStorage.setItem("home_currency", (response.home_currency));

              if (response.incorporation_date != '' && response.incorporation_date != null && response.incorporation_date != undefined && response.incorporation_date != "0000-00-00") {
                localStorage.setItem("incorporation_date", (response.incorporation_date));
                localStorage.setItem("first_incorporation_date", (response.incorporation_date));
              } else {
                localStorage.setItem("incorporation_date", "1970-01-01");
                localStorage.setItem("first_incorporation_date", "1970-01-01");
              }
              localStorage.setItem("lock_date", response.lock_date);
              localStorage.setItem("home_currency_symbol", response.home_currency_symbol);

              this.props.history.push("/");

              // localStorage.setItem("logged_user_email", response.userdetails.email);
              // localStorage.setItem("logged_user_name", response.userdetails.name);

              // if (response.user_layer_role == 0) {
              //   if (response.layer == 1) {
              //     this.props.history.push("/");
              //   }
              //   if (response.layer == 2) {
              //     this.props.history.push("/");
              //   }
              // }
              // if (response.user_layer_role == 2) {
              //   this.props.history.push("/");
              // }

              // if (response.user_layer_role == 1 && response.role_id == 1) {
              //   this.props.history.push("/");
              // }

              // if (response.user_layer_role == 1 && response.role_id == 2) {
              //   if (response.layer == 1) {
              //     this.props.history.push("/");
              //   }
              //   if (response.layer == 2) {
              //     this.props.history.push("/");
              //   }
              // }
            } else {
              jQuery(".alert-wrap")
                .removeClass("hide")
                .html("<p>Username & Password does not match!</p>");
            }
          }
        );
      }
    } else {
      jQuery(".alert-wrap")
        .removeClass("hide")
        .html("<p>Enter Username & Password!</p>");
    }
  }

  hhwt_success_login_action(
    user_id,
    client_id,
    role_id,
    user_name,
    user_email,
    phone,
    user_image,
    company_name,
    subscription_start_date,
    subscription_end_date,
    plan_id
  ) {
    if (user_id !== "") {
      localStorage.setItem("logged_user_id", user_id);
      localStorage.setItem("logged_client_id", client_id);
      localStorage.setItem("logged_role_id", role_id);
      localStorage.setItem("logged_user_name", user_name);
      localStorage.setItem("logged_user_email", user_email);
      localStorage.setItem("logged_user_phone", phone);
      localStorage.setItem("logged_user_image", user_image);
      localStorage.setItem("logged_company_name", company_name);
      localStorage.setItem(
        "logged_subscription_start_date",
        subscription_start_date
      );
      localStorage.setItem(
        "logged_subscription_end_date",
        subscription_end_date
      );
      localStorage.setItem("logged_plan_id", plan_id);
    }
  }

  forgotPwd(e) {
    e.preventDefault();
    this.props.history.push("/forgot_password");
  }

  createAcc(e) {
    e.preventDefault();
    this.props.history.push("/register");
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 col-sm-5 login-left hidden-sm hidden-xs">
            <h1>
              Welcome to <strong>GENIE</strong>
            </h1>
            <p>
              Cloud based accounting software with OCR, AI automation, Instant payment notification of Accounts receivable for all business contacts within genie platform.
            </p>

            <p>
              meaning ~NO~ hassle when it comes to Accounting anymore
            </p>
            <div className="img-wrap">
              <img
                className="img-responsive"
                src="../images/login-img.png"
                alt=""
              />
            </div>
          </div>

          <div className="col-md-7 col-sm-12 offset-md-4 login-right">
            <div className="login-wrap">
              <div className="nav-brand">
                <img src="../images/logo-genie.png" alt="Genie" />
              </div>
              <p className="lead">SET PASSWORD</p>
              <div className="alert-wrap hide">
                <p>Password & Conform Password does not match</p>
              </div>

              <form
                className="login-form"
                onSubmit={this.loginFormSubmit.bind(this)}
              >
                {/* <div className="form-group">
                  <input
                    type="password"
                    name="username"
                    id="login_user_email"
                    className="form-control"
                    placeholder="Password"
                    required="required"
                  />
                </div> */}
                <div className="form-group login-eye">
                  <i className="pass-visible" toggle="#password-fieldc" onClick={() => this.setState({ show1: !this.state.show1 })}>

                    <img className="off" src="images/visibility-off.svg" alt="hide" />
                    <img className="on" src="images/visibility.svg" alt="show" />
                  </i>
                  <input
                    type={this.state.show1 ? "text" : "password"}
                    name="password"
                    id="login_user_email"
                    className="form-control"
                    placeholder="Password"
                    required="required"
                  />
                </div>
                <div className="form-group login-eye">
                  <i className="pass-visible" toggle="#password-fieldc" onClick={() => this.setState({ show2: !this.state.show2 })}>

                    <img className="off" src="images/visibility-off.svg" alt="hide" />
                    <img className="on" src="images/visibility.svg" alt="show" />
                  </i>
                  <input
                    type={this.state.show2 ? "text" : "password"}
                    name="password"
                    id="login_user_pwd"
                    className="form-control"
                    placeholder="Confirm Password"
                    required="required"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn login-btn">
                    Set Password
                  </button>
                  <a href="/" className="forgot-pass">
                    cancel
                  </a>

                  {/* <Link to="/forgot_password" className="forgot-pass">Forgot Password?</Link> */}
                </div>
              </form>

              {/* <div className="col-md-12 create-acc text-center">Don't have an account? <a href="/register">Create an account</a></div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserSetPassword;
