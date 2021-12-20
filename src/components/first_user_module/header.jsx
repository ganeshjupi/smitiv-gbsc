import React from "react";

import FetchAllApi from "./../../api_links/fetch_all_api";
import jQuery from "jquery";

class UserTopbar extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      loggeed_layer: localStorage.getItem("layer"),
      client_select: localStorage.getItem("selected_client"),
      first_logged_client_id: localStorage.getItem("first_logged_client_id"),

      first_logged_company_name: localStorage.getItem("first_logged_company_name"),
      client_selection: localStorage.getItem("client_selection") ? localStorage.getItem("client_selection") : false,

      isProfilePage: false,
      isMemberPage: false,
      isSubscritionPage: false,

      role_permissions:
        JSON.parse(localStorage.getItem("role_permissions")) || [],
      user_layer_role: localStorage.getItem("user_layer_role"),
      layer: localStorage.getItem("layer"),
    };
  };

  logoutFunc(e) {
    e.preventDefault();
    this.props.logoutSubmit();
  }




  goTo = (e, pagePath) => {
    e.preventDefault();
    //   this.props.history.push(pagePath)
    // hashHistory.push(pagePath)
  };



  componentDidMount() {

  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  render() {
    return (
      <React.Fragment>
        <header className="row">
          <div className="container">
            <div className="row">
              <div className="col-md-2 col-sm-2 col-xs-4 nav-brand" onClick={() => window.location.href = "/landing_page"}>
                <img
                  src="images/genie-icon.png"
                  className="img-responsive"
                  alt="logo"
                />
              </div>
              <div
                className="col-md-8 col-sm-9 col-xs-4 res-nav-sec ipad-p-0"
              // style={{ marginLeft: "112px" }}
              >
                <div className="collapse navbar-collapse ipad-p-0" id="resNavBar">
                  <ul className="list-inline hdr-nav">

                    {this.state.loggeed_layer == 1 ? (
                      <>
                        <li onClick={() => {
                          localStorage.setItem("logged_client_id", this.state.first_logged_client_id)
                          localStorage.setItem("logged_company_name", this.state.first_logged_company_name)
                        }
                        }>
                          <a
                            href="/client_selection"
                            className={
                              window.location.pathname == "/client_selection"
                                ? "active"
                                : null
                            }
                          >
                            Client Selection
                        </a>
                        </li>
                        <li>
                          <a
                            href="/profile"
                            className={
                              window.location.pathname == "/profile"
                                ? "active"
                                : null
                            }
                          >
                            Profile &amp; Settings
                      </a>
                        </li>
                      </>
                    ) : (
                      <li>
                        <a
                          href="/user_profile"
                          className={
                            window.location.pathname == "/user_profile"
                              ? "active"
                              : null
                          }
                        >
                          Profile &amp; Settings
                      </a>
                      </li>

                    )}
                    {this.state.role_permissions.includes(1) ? (

                      <>
                        {this.state.loggeed_layer == 1 ? (
                          <li>
                            <a
                              href="/member"
                              className={
                                window.location.pathname == "/member"
                                  ? "active"
                                  : null
                              }
                            >
                              Members
                          </a>
                          </li>
                        ) : (
                          <li>
                            <a
                              href="/member_lists"
                              className={
                                window.location.pathname == "/member_lists"
                                  ? "active"
                                  : null
                              }
                            >
                              Members
                        </a>
                          </li>
                        )}

                        {this.state.first_logged_client_id == this.state.logged_client_id && this.state.loggeed_layer == 1 ? (
                          <li>
                            <a
                              href="/subscriber"
                              className={
                                window.location.pathname == "/subscriber"
                                  ? "active"
                                  : null
                              }
                            >
                              Subscription & Billing
                          </a>
                          </li>
                        ) : (
                          <li>
                            <a
                              href="/Subscription_details"
                              className={
                                window.location.pathname == "/Subscription_details"
                                  ? "active"
                                  : null
                              }
                            >
                              Subscription & Billing
              </a>
                          </li>
                        )}



                      </>
                    ) : null}

                    {this.state.role_permissions.includes(32) && (this.state.logged_client_id != this.state.first_logged_client_id) ? (
                      <li>
                        <a
                          href="/preferences"
                          className={
                            window.location.pathname == "/preferences"
                              ? "active"
                              : null
                          }
                        >
                          Preferences
                        </a>
                      </li>
                    ) : null}

                  </ul>
                </div>
              </div>
              <div className="col-md-2 col-sm-1 col-xs-8 pull-right">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#resNavBar"
                >
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <div className="profile-wrap dropdown dropdown menu-item new-cus">
                  <a
                    href="javascript:;"
                    className="avatar dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <span className="avatar-img">
                      <img
                        className="img-responsive"
                        src={this.state.logged_user_image ? this.state.logged_user_image : "images/user-img-1.png"}
                        alt="User Name"
                      />
                    </span>
                    <span className="hidden-xs hidden-sm cmpny-name" title={`${this.state.logged_user_name} -- ${this.state.logged_company_name}`}>
                      {this.state.logged_user_name}
                      {""} - {""} {this.state.logged_company_name}
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    {this.state.client_selection &&
                      <li>
                        <a
                          href="/client_selection"
                        >
                          Change client
              </a>
                      </li>
                    }
                    <li>
                      <a href={localStorage.getItem("layer") == 1 ? '/profile' : '/user_profile'}
                      // onClick={(e) => {
                      //   e.preventDefault()
                      //   if (localStorage.getItem("layer") == 1) {
                      //     window.location.href = '/profile'
                      //   } else {
                      //     window.location.href = '/user_profile'
                      //   }
                      // }}
                      >
                        <img src="images/edit-icon.svg" alt="icon" />
                        Edit Profile
                      </a>
                    </li>
                    <li>
                      <a href='/preferences'
                      // onClick={(e) => {
                      //   e.preventDefault()
                      //   window.location.href = '/preferences'
                      // }}
                      >
                        <img src="images/settings-icon.svg" alt="icon" />
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="/"
                      // onClick={this.logoutFunc.bind(this)}
                      >
                        <img src="images/turn-off-icon.svg" alt="icon" />
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}
export default UserTopbar;
