import React from "react";
import { Link } from "react-router-dom";

import FetchAllApi from "../../api_links/fetch_all_api";

import jQuery from "jquery";

class login extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_photo: localStorage.getItem("logged_user_photo"),
      logged_user_firstname: localStorage.getItem("logged_user_firstname"),
      logged_user_lastname: localStorage.getItem("logged_user_lastname"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_subscription_start_date: localStorage.getItem(
        "logged_subscription_start_date"
      ),
      logged_subscription_end_date: localStorage.getItem(
        "logged_subscription_end_date"
      ),
      logged_plan_id: localStorage.getItem("logged_plan_id"),

      list: [],
      selectedUserId: "",
      show: false,
    };
  }

  //   UNSAFE_componentWillMount() {
  //     console.log("logged_user_id", this.state.logged_user_id);
  //     console.log("role_id", this.state.logged_role_id);
  //     if (
  //       this.state.logged_user_id !== "" &&
  //       this.state.logged_user_id !== "null" &&
  //       this.state.logged_user_id !== null &&
  //       this.state.logged_user_id !== "undefined"
  //     ) {
  //       //this.props.history.push('/user_inbox');

  //       if (parseInt(this.state.logged_role_id) === 1) {
  //         this.props.history.push("/user_inbox");
  //       } else {
  //         this.props.history.push("/inbox");
  //       }
  //     }

  //     jQuery("title").html("Login | GBSC");
  //   }

  componentDidMount() {

    localStorage.clear()

    jQuery(document).ready(function () {

      jQuery(".pass-visible").click(function () {
        jQuery(this).toggleClass("off");
        var input = jQuery(jQuery(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });
      // jQuery('.datepicker').datepicker();
    });

  }

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  }

  getClientId = (user_id) => {
    var user_id = user_id;

    FetchAllApi.get_user_subscriber_list(user_id, (err, response) => {
      if (response.status === 1) {
        console.log("Customerlist", response);
        this.setState({ list: response.list });
        window.jQuery("#add_items").modal("show");
      } else {
        // this.setState({ vendor_type: [] });
      }
    });
  };

  loginFormSubmit(e) {
    e.preventDefault();

    var user_email = jQuery("#login_user_email").val();
    var user_password = jQuery("#login_user_pwd").val();

    if (user_email !== "" && user_password !== "") {
      //console.log("Success!");
      FetchAllApi.userLogin(user_email, user_password, (err, response) => {
        //console.log('Login Status', response.status);
        if (response.status === 1) {
          this.hhwt_success_login_action(
            response.user_id,
            response.client_id,
            response.role_id,
            response.user_name,
            response.email,
            response.phone,
            response.user_image,
            response.company_name,
            response.subscription_start_date,
            response.subscription_end_date,
            response.plan_id
          );
          // this.role_permissions(response.role_permissions)
          localStorage.setItem("date_format", response.date_format);
          localStorage.setItem(
            "role_permissions",
            JSON.stringify(response.role_permissions)
          );
          localStorage.setItem("user_layer_role", response.user_layer_role);
          localStorage.setItem("layer", JSON.stringify(response.layer));

          localStorage.setItem("first_logged_client_id", JSON.stringify(response.client_id));
          localStorage.setItem("first_logged_company_name", JSON.stringify(response.company_name));

          localStorage.setItem("country_sortname", (response.country_sortname));
          localStorage.setItem("language_code", (response.language_code));
          localStorage.setItem("home_currency", (response.home_currency));
          localStorage.setItem("fiscal_start_year", (response.fiscal_year_start_date));
          localStorage.setItem("fiscal_end_year", (response.fiscal_year_end_date));


          if (response.incorporation_date != '' && response.incorporation_date != null && response.incorporation_date != undefined && response.incorporation_date != "0000-00-00") {
            localStorage.setItem("incorporation_date", (response.incorporation_date));
            localStorage.setItem("first_incorporation_date", (response.incorporation_date));
          } else {
            localStorage.setItem("incorporation_date", "1970-01-01");
            localStorage.setItem("first_incorporation_date", "1970-01-01");
          }
          localStorage.setItem("lock_date", response.lock_date);
          localStorage.setItem("home_currency_symbol", response.home_currency_symbol);
          // localStorage.setItem("logged_user_email", response.userdetails.email);
          // localStorage.setItem("logged_user_name", response.userdetails.name);

          localStorage.setItem("user_image", response.user_image);



          if (response.user_layer_role == 0) {
            if (response.layer == 1) {
              localStorage.setItem('client_selection', false)
              // this.props.history.push("/landing_page");
              this.props.history.push("/client_selection");
            }
            if (response.layer == 2) {
              localStorage.setItem('client_selection', false)
              // this.props.history.push("/landing_page");
              this.props.history.push("/client_selection");
            }
          }
          if (response.user_layer_role == 2) {
            localStorage.setItem('client_selection', true)
            this.props.history.push("/client_selection");
          }

          if (response.user_layer_role == 1 && response.role_id == 1) {
            localStorage.setItem('client_selection', true)
            this.props.history.push("/client_selection");
          }

          if (response.user_layer_role == 1 && response.role_id == 2) {
            if (response.layer == 1) {
              localStorage.setItem('client_selection', false)
              // this.props.history.push("/landing_page");
              this.props.history.push("/client_selection");
            }
            if (response.layer == 2) {
              localStorage.setItem('client_selection', false)
              // this.props.history.push("/landing_page");
              this.props.history.push("/client_selection");
            }
          }
        } else {
          jQuery(".alert-wrap")
            .removeClass("hide")
            .html("<p>Username & Password does not match!</p>");
        }
      });
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
      localStorage.setItem("logged_subscription_start_date", subscription_start_date);
      localStorage.setItem("logged_subscription_end_date", subscription_end_date);
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

          <div className="col-md-7 col-sm-12 login-right">
            <div className="login-wrap">
              <div className="nav-brand">
                <img src="../images/logo-genie.png" alt="Genie" />
              </div>
              <p className="lead">Login</p>
              <div className="alert-wrap hide">
                <p>Username & Password does not match</p>
              </div>

              <form
                className="login-form"
                onSubmit={this.loginFormSubmit.bind(this)}
              >
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    id="login_user_email"
                    className="form-control"
                    placeholder="Username"
                    required="required"
                    autoComplete='off'
                  />
                </div>
                <div className="form-group login-eye">
                  <i className="pass-visible" toggle="#password-fieldc" onClick={() => this.setState({ show: !this.state.show })}>
                    <img className="off" src="images/visibility-off.svg" alt="hide" />
                    <img className="on" src="images/visibility.svg" alt="show" />
                  </i>
                  <input
                    type={this.state.show ? "text" : "password"}
                    name="password"
                    id="login_user_pwd"
                    className="form-control"
                    placeholder="Password"
                    required="required"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn login-btn">
                    Login
                  </button>
                  <Link to="/forgot_password" className="forgot-pass">
                    Forgot Password?
                  </Link>
                </div>
              </form>

              <div className="col-md-12 create-acc text-center">
                Don't have an account? <a href="/register">Create an account</a>
                <div className="mobile-app">
                  <p className="fw-med">Get the mobile app here</p>
                  <a href="javascript:;" href="genie-android.apk">
                    <img src="images/android-icon.svg" alt="Android" />
                  </a>
                  <a href="javascript:;">
                    <img src="images/ios-icon.svg" alt="iOS" />
                  </a>
                </div>
              </div>
            </div>
            <p className='login-footer'>This is a Proprietary Software  of "Gerard Business Services Consultancy"  "UEN:52899106W". All rights reserved</p>

          </div>
        </div>

        {/* <div className="modal fade pop-modal" id="add_items" role="dialog">
          <div className="modal-dialog modal-md custom-modal">
            <button
              type="button"
              className="close hidden-xs"
              data-dismiss="modal"
              onClick={() => {}}
            >
              <img
                className="img-responsive"
                src="../../images/close-red.svg"
                alt="icon"
              />
            </button> */}
        {/* <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Please Select Subscriber</h3>
                <form className="custom-form row">
                  <div className="form-group col-md-12 col-xs-12 pad-no ">
                    <div className="col-md-4 col-sm-4 col-xs-12">
                      <label>Select One</label>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-12">
                      <select
                        className="selectpicker form-control add-new kk"
                        data-live-search="true"
                        title="Choose categeory"
                        id="item_categeory"
                        onChange={(e) => {
                          this.setState({ selectedUserId: e.target.value });
                        }}
                      >
                        {this.state.list &&
                          this.state.list.map((item, k) => {
                            return (
                              <option value={item.id}> {item.name} </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>

                  <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                    <button className="btn btn-lightgray" data-dismiss="modal">
                      Cancel
                    </button>
                    <span>{"   "}</span>
                    <input type="hidden" id="colid" />

                    <button
                      className="btn btn-green"
                      type="button"
                      onClick={() => {
                        if (this.state.selectedUserId !== "") {
                          window.jQuery("#add_items").modal("hide")
                          localStorage.setItem("logged_client_id", this.state.selectedUserId)
                          this.props.history.push("/user_inbox")
                        }
                      }}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div> */}
        {/* </div>
        </div> */}
      </div>
    );
  }
}
export default login;
