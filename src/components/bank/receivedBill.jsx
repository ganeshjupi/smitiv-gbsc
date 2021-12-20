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




export default class GroupAccount extends React.Component {
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
      img_file: "",
      log_id: localStorage.getItem("received_bill"),
      file_id: '',
      invoice_id: localStorage.getItem("sales_invoice_id"),
    }
  };

  componentDidMount = () => {
    jQuery(document.body).removeClass("minimize_leftbar");
    this.initCall();
  };


  initCall = () => {
    let client_id = this.state.logged_client_id;
    let status = 0;
    let id = this.state.log_id
    FetchAllApi.getItemDetails(id, status, client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ img_file: response.details.file_path[0], file_id: response.details.attachments[0] })
      }
    })
  };

  dataTaggingFunc = (file_id) => {
    // localStorage.setItem('comingFrom', 'Received Bill')
    // this.props.history.push("/data_tagging/" + this.state.log_id + "/" + this.state.file_id, this.state.invoice_id);
    localStorage.setItem('processed', "Not Processed")
    localStorage.setItem('comingFrom', 'Received Bill')
    this.props.history.push("/data_tagging/" + this.state.log_id + "/" + this.state.file_id, this.state.invoice_id);

    window.scrollTo(0, 0);
  };

  rejectBill = () => {
    let client_id = this.state.logged_client_id;
    let id = this.state.log_id
    FetchAllApi.rejectBill(client_id, id, (err, response) => {
      if (response.status === 1) {
        alert(response.message);
        localStorage.setItem('comingFrom', 'Received Bill');
        this.props.history.push("/requests");
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
    console.log('jai',)
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            {/* left-navbar Starts here */}
            <LeftSidebar history={this.props.history} />
            {/* left-navbar Ends here */}
            {/* MainContent Wrapper Starts here */}
            <div className="main-wrap col-md-12 col-xs-12 pad-r-no create-invoice">
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
                {/* <span class="page-title hidden-xs">Preference</span> */}
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li><a href="javascript:;">Received Bill</a></li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>
              {/* Top bar Ends here */}
              <div className="col-md-12 col-xs-12 mar-top visible-xs">
                <a href="javascript:;" className="back">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <span className="page-title">Received Bill</span>
              </div>
              {/* Main Content Starts here */}
              <div className="main-content col-md-12 col-xs-12">
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                  <div className="custom-form invoice-form">
                    <div className="row">
                      <iframe className="img-responsive mar-auto" src={this.state.img_file + "#toolbar=0"} style={{ height: "500px", width: "100%", border: "none", overflow: "hidden" }} seamless="seamless" scrolling="no"  > </iframe>
                    </div>
                    <div className="row">
                      <div className="pf-btm-wrap">
                        <div className="col-md-12 text-right pad-no">
                          <button className="btn btn-lightgray mar-rgt-5" onClick={this.rejectBill}>Decline</button>
                          <button className="btn btn-green mar-rgt-5" onClick={this.dataTaggingFunc}>Check &amp; Accept</button>
                        </div>
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
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}
      </div>

    )
  }
}