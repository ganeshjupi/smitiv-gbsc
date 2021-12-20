import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class Addasset extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          {/* header Starts here */}
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
                <div className="col-md-6 col-sm-7 col-xs-4 res-nav-sec">
                  <div className="collapse navbar-collapse" id="resNavBar">
                    <ul className="list-inline hdr-nav">
                      <li>
                        <a href="javascript:;">Profile &amp; Settings</a>
                      </li>
                      <li>
                        <a href="javascript:;">Members</a>
                      </li>
                      <li>
                        <a href="javascript:;">Subscribers</a>
                      </li>
                      <li>
                        <a href="javascript:;" className="active">
                          Preferences
                  </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4 col-sm-3 col-xs-8 pull-right">
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
                  <div className="profile-wrap dropdown">
                    <a
                      href="javascript:;"
                      className="avatar dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <span className="avatar-img">
                        <img
                          className="img-responsive"
                          src="images/user-img-1.png"
                          alt="Harvey Dean"
                        />
                      </span>
                      <span className="hidden-xs hidden-sm">Harvey Dean</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="javascript:;">
                          <img src="images/edit-icon.svg" alt="icon" />
                    Edit Profile
                  </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          <img src="images/settings-icon.svg" alt="icon" />
                    Settings
                  </a>
                      </li>
                      <li>
                        <a href="javascript:;">
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
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
  <h3>Subscribers</h3>
    </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
            <div className="user-cont-left">
              <div className="mscroll-y">
                <ul className="list-unstyled">
                  <li className="head">General</li>
                  <li>
                    <a href="javascript:;">Organization Profile</a>
                  </li>
                  <li>
                    <a href="javascript:;">Roles &amp; Permissions</a>
                  </li>
                  <li>
                    <a href="javascript:;">Currencies</a>
                  </li>
                  <li>
                    <a href="javascript:;">Email</a>
                  </li>
                  <li>
                    <a href="javascript:;">Templates</a>
                  </li>
                  <li className="head mar-top">Accouting</li>
                  <li>
                    <a href="javascript:;">Sales</a>
                  </li>
                  <li>
                    <a href="javascript:;">Taxes</a>
                  </li>
                  <li>
                    <a href="javascript:;">Find &amp; Recode</a>
                  </li>
                  <li>
                    <a href="javascript:;">Manual Journal</a>
                  </li>
                  <li>
                    <a href="javascript:;" className="active">
                      Fixed Assets &amp; Settings
              </a>
                  </li>
                  <li>
                    <a href="javascript:;">Chart of Accounts</a>
                  </li>
                  <li>
                    <a href="javascript:;">History &amp; Notes</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12 mar-btm">
                <h3>
                  <a href="javascript:;" className="back">
                    <img src="images/back-arrow-blue.svg" />
                  </a>
            Add Asset Type
          </h3>
              </div>
              <div className="col-md-12 col-xs-12">
                <form className="custom-form invoice-form row legend-form pad-no">
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Type &amp; Accounts</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Asset Type</label>
                      <input type="text" name className="form-control" />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Asset Account</label>
                      <div className="custom-select-drop dropdown">
                        <a
                          aria-expanded="false"
                          aria-haspopup="true"
                          role="button"
                          data-toggle="dropdown"
                          className="dropdown-toggle btn form-control"
                          href="javascript:;"
                        >
                          <span id="selected">Choose...</span>
                          <span className="caret" />
                        </a>
                        <ul className="dropdown-menu">
                          <li className="active">
                            <a href="javascript:;">Choose...</a>
                          </li>
                          <li>
                            <a href="javascript:;">Type one</a>
                          </li>
                          <li>
                            <a href="javascript:;">Type two</a>
                          </li>
                          <li>
                            <a href="javascript:;">Type three</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Accumulated Depreciation Account</label>
                      <div className="custom-select-drop dropdown">
                        <a
                          aria-expanded="false"
                          aria-haspopup="true"
                          role="button"
                          data-toggle="dropdown"
                          className="dropdown-toggle btn form-control"
                          href="javascript:;"
                        >
                          <span id="selected">Choose...</span>
                          <span className="caret" />
                        </a>
                        <ul className="dropdown-menu">
                          <li className="active">
                            <a href="javascript:;">Choose...</a>
                          </li>
                          <li>
                            <a href="javascript:;">Type one</a>
                          </li>
                          <li>
                            <a href="javascript:;">Type two</a>
                          </li>
                          <li>
                            <a href="javascript:;">Type three</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Depreciation Expense Account</label>
                      <div className="custom-select-drop dropdown">
                        <a
                          aria-expanded="false"
                          aria-haspopup="true"
                          role="button"
                          data-toggle="dropdown"
                          className="dropdown-toggle btn form-control"
                          href="javascript:;"
                        >
                          <span id="selected">Choose...</span>
                          <span className="caret" />
                        </a>
                        <ul className="dropdown-menu">
                          <li className="active">
                            <a href="javascript:;">Choose...</a>
                          </li>
                          <li>
                            <a href="javascript:;">Type one</a>
                          </li>
                          <li>
                            <a href="javascript:;">Type two</a>
                          </li>
                          <li>
                            <a href="javascript:;">Type three</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Book Depreciation Default</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Depreciation Method</label>
                      <div className="custom-select-drop dropdown">
                        <a
                          aria-expanded="false"
                          aria-haspopup="true"
                          role="button"
                          data-toggle="dropdown"
                          className="dropdown-toggle btn form-control"
                          href="javascript:;"
                        >
                          <span id="selected">Choose...</span>
                          <span className="caret" />
                        </a>
                        <ul className="dropdown-menu">
                          <li className="active">
                            <a href="javascript:;">Choose...</a>
                          </li>
                          <li>
                            <a href="javascript:;">Method one</a>
                          </li>
                          <li>
                            <a href="javascript:;">Method two</a>
                          </li>
                          <li>
                            <a href="javascript:;">Method three</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Averaging Method</label>
                      <div className="custom-select-drop dropdown">
                        <a
                          aria-expanded="false"
                          aria-haspopup="true"
                          role="button"
                          data-toggle="dropdown"
                          className="dropdown-toggle btn form-control"
                          href="javascript:;"
                        >
                          <span id="selected">Choose...</span>
                          <span className="caret" />
                        </a>
                        <ul className="dropdown-menu">
                          <li className="active">
                            <a href="javascript:;">Choose...</a>
                          </li>
                          <li>
                            <a href="javascript:;">Method one</a>
                          </li>
                          <li>
                            <a href="javascript:;">Method two</a>
                          </li>
                          <li>
                            <a href="javascript:;">Method three</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="custom-checkbox radio small">
                        <input type="radio" name="over" defaultChecked="checked" />{" "}
                  Rate
                  <span className="checkmark" />
                      </label>
                      <span className="right-placeholder">%</span>
                      <input type="text" className="form-control" name />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="custom-checkbox radio small">
                        <input type="radio" name="over" defaultChecked="checked" />{" "}
                  Effective Life (Years)
                  <span className="checkmark" />
                      </label>
                      <input type="text" className="form-control" name />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          <div className="pf-btm-wrap bg-sticky">
            <div className="col-md-12 text-right pad-no">
              <button className="btn btn-lightgray">Cancel</button>
              <button className="btn btn-green">Save</button>
            </div>
          </div>
        </div>


      </React.Fragment>
    )
  }
}