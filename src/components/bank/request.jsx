import React from "react";
import LeftSidebar from "./../left_sidebar";
import Footer from "./../footer";
import Topbar from "./../topbar";
import FetchAllApi from "../../api_links/fetch_all_api";
import jQuery from "jquery";
import config from "./../../api_links/api_links.jsx";
import { ToWords } from "to-words";
var _ = require("lodash");
var authorization_key = "O5mGIP3VNia0JvPH2IBiwA==";
const $ = require("jquery");
$.DataTable = require("datatables.net");



export default class RequestGroup extends React.Component {
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
      role_permissions:
        JSON.parse(localStorage.getItem("role_permissions")) || [],
      request: JSON.parse(localStorage.getItem("group_request")),
      data: JSON.parse(localStorage.getItem("group_request")),
    }
  };

  clickFunc = (val) => {


    let input = {
      client_id: this.state.logged_client_id,
      request_id: this.state.data.request_id,
      status: val,

    }
    FetchAllApi.request_accept(input, (err, response) => {
      if (response.status === 1) {
        alert(response.message)
        this.props.history.push("/add_business_contact")
      }
    })
  };


  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            {/* left-navbar Starts here */}
            <LeftSidebar history={this.props.history} />
            {/* left-navbar Ends here */}
            {/* MainContent Wrapper Starts here */}
            <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
              {/* Top bar Starts here */}
              <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <form className="hdr-search">
                  <input type="text" className="form-control" name="search" placeholder="Search..." />
                  {/* <button type="submit" class="btn btn-green">Search</button> */}
                  <a href="javascript:;" className="close-icon"><img src="images/close-icon-red.svg" alt="Close" /></a>
                </form>
                <div className="nav-brand-res visible-xs"><img className="img-responsive" src="images/logo-icon.png" alt="LogoIcon" /></div>
                <a href="javascript:;" onClick={() => this.props.history.goBack()} className="back hidden-xs">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li><a href="javascript:;">Notifications</a></li>
                  <li>Group Accounting Request</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>
              {/* Top bar Ends here */}
              {/* Main Content Starts here */}
              <div className="main-content col-md-12 col-xs-12">
                <span className="page-title visible-xs">Group Accounting Request</span>
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                  <div className="landing-wrap received-request">
                    <div className="search-bank">
                      <div className="logo-wrap">
                        <img className="img-responsive" src={this.state.data.logo_path} alt="CompanyName" />
                      </div>
                      <p className="lead">{this.state.data.sender_name}</p>
                      <span>UEN: {this.state.data.entity_number}  |  {this.state.data.sender_country}</span>
                      <p className="req-p">Sent you Group Accounting Request</p>
                      <div className="btn-wrap">
                        <button className="btn btn-red mar-rgt-5" onClick={() => { this.clickFunc(3) }}>Decline</button>
                        <button className="btn btn-green mar-rgt-5" onClick={() => { this.clickFunc(2) }}>Accept</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main Content Ends here */}
            </div>
            {/* MainContent Wrapper Ends here */}
          </div>
        </div>
        {/* Main Wrapper Ends here */}
        {/* footer Starts here */}
        <footer className="container-fluid">
          <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
        {/* footer Ends here */}
        {/* Modal Wrapper Starts here */}
        <div className="modal fade pop-modal" id="add-b-contact" role="dialog">
          <div className="modal-dialog modal-md custom-modal">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs" data-dismiss="modal">
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body">
                <h3>Adding Business Contact</h3>
                <div className="alert-exist">
                  <img src="images/caution-icon.svg" alt="icon" />
                  This contact already exists as Vendor
                </div>
                <div className="search-item">
                  <div className="search-lft">
                    <p>Brand Bucket</p>
                    <span className="uen">UEN: 1992ACR0087</span>
                  </div>
                  <p className="b-country">Singapore</p>
                </div>
                <form className="custom-form row mar-top">
                  <div className="form-group col-md-12 col-xs-12 mar-b-no">
                    <label className="custom-checkbox radio small">
                      <input type="radio" name="all" defaultChecked="checked" />
                      <span className="checkmark" />&nbsp; Vendor
                    </label>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mar-b-no">
                    <label className="custom-checkbox radio small">
                      <input type="radio" name="all" />
                      <span className="checkmark" />&nbsp; Customer
                    </label>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mar-b-no">
                    <label className="custom-checkbox radio small">
                      <input type="radio" name="all" />
                      <span className="checkmark" />&nbsp; Vendor &amp; Customer
                    </label>
                  </div>
                </form>
                <div className="btn-sec pad-no text-center mar-b-no">
                  <button className="btn btn-lightgray">Cancel</button>
                  <button className="btn btn-green">Send Request</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Wrapper Ends here */}
        {/* Modal Wrapper Starts here */}
        <div className="modal fade modal-small" id="successModal" role="dialog">
          <div className="modal-dialog modal-md">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs" data-dismiss="modal">
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center success-modal">
                <div className="pop-icon">
                  <img src="images/alert-success.svg" alt="icon" />
                </div>
                <h3>Awesome!</h3>
                <p>Your business contact request sent successfully</p>
                <div className="btn-sec pad-no mar-b-no">
                  <button className="btn btn-green">Ok</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Wrapper Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
      </div>
    )
  }
}