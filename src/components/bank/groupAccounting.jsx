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
      search: '',
      radio: '',
      checked_vendor: false,
      checked_customer: false,
      checked_cus_ven: false,
      filter_list: [],
      client_name: "",
      receive_id: '',
    }
  };

  componentDidMount() {

  }


  inputChange = (e) => {
    this.setState({ search: e.target.value }, this.initialCall)
  };

  radioChange = (e) => {
    this.setState({ radio: e })
  };

  sendreq = () => {
    let input = {
      client_name: this.state.client_name,
      sender_id: this.state.logged_client_id,
      receiver_id: this.state.receive_id,
      type: this.state.radio
    }
    FetchAllApi.group_send_req(input, (err, response) => {
      if (response.status === 1) {
        jQuery("#add-b-contact").trigger('click');
        window.jQuery('#successModal').modal('show');
        jQuery("#search").val('');
        
        this.setState({ radio: '' ,checked_vendor: false,
        checked_customer: false,
        checked_cus_ven: false, })
      }
      else if(response.status===0)
      {
        alert(response.message)
        this.setState({ radio: '',search:"" ,checked_vendor: false,
        checked_customer: false,
        checked_cus_ven: false,})      
        jQuery("#search").val('');
        window.jQuery("#add-b-contact").modal("hide");      }
    })

  };

  initialCall = () => {
    let value = this.state.search;
    let client_id = this.state.logged_client_id;
    FetchAllApi.group_filter(client_id, value, (err, response) => {
      if (response.status === 1) {
        this.setState({ filter_list: response.results })
      }
    })
  };

  setVal = (val) => {
    this.setState({ client_name: val.name, receive_id: val.id, country: val.country, uen: val.entity_number })
  };


  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }
 handlecancel=()=>{
  this.setState({ radio: '',checked_vendor: false, checked_customer: false,
  checked_cus_ven: false},()=>console.log("this state....",this.state)); 
 //   this.setState({ search:"",checked_vendor: false, checked_customer: false,checked_cus_ven: false},()=>console.log("this state....",this.state));

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
                  <input type="text" className="form-control" autoComplete="off" name="search" placeholder="Search..." />
                  {/* <button type="submit" class="btn btn-green">Search</button> */}
                  <a href="javascript:;" className="close-icon"><img src="images/close-icon-red.svg" alt="Close" /></a>
                </form>
                <div className="nav-brand-res visible-xs"><img className="img-responsive" src="images/logo-icon.png" alt="LogoIcon" /></div>
                <a href="javascript:;" onClick={() => this.props.history.goBack()} className="back hidden-xs">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li><a href="javascript:;">Group Accounting</a></li>
                  <li>Add Business Contact</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>
              {/* Top bar Ends here */}
              {/* Main Content Starts here */}
              <div className="main-content col-md-12 col-xs-12">
                <span className="page-title visible-xs">Add Business Contact</span>
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                  <div className="landing-wrap">
                    <div className="search-bank">
                      <img className="icon" src="images/contact-book-icon.svg" alt="icon" />
                      <p className="lead">Find Your Business Contact</p>
                      <form className="custom-form">
                        <div className="form-group mar-b-no">
                          <img className="search-icon" src="images/search-icon.svg" alt="Search" />
                          <input type="text" className="find-b-cont form-control" autocomplete="off" placeholder="Search..." id="search" name="search" onChange={this.inputChange} />
                          <div className="input-search-wrap searchscroll">
                            {this.state.filter_list.map((val) => {
                              return (
                                <div className="table-responsive">
                                <a href="javascript:;" data-toggle="modal" onClick={() => { this.setVal(val) }} data-target="#add-b-contact" className="search-item">
                                  <div className="search-lft">
                                    <p>{val.name}</p>
                                    <span className="uen">UEN:{val.entity_number}</span>
                                  </div>
                                  <p className="b-country">{val.country}</p>
                                </a>
                                {/* // <a href="javascript:;" data-toggle="modal" data-target="#successModal" className="search-item">
                                //   <div className="search-lft">
                                //     <p>Brand Crowd</p>
                                //     <span className="uen">UEN: 2006ACR0012</span>
                                //   </div>
                                //   <p className="b-country">Japan</p>
                                // </a>
                                // <a href="javascript:;" className="search-item">
                                //   <div className="search-lft">
                                //     <p>Bran Fetch</p>
                                //     <span className="uen">UEN: 2018ACR0087</span>
                                //   </div>
                                //   <p className="b-country">Canada</p>
                                // </a> */}
                              </div>
                              )
                            })}
                          </div>
                        </div>
                      </form>
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
            <button type="button" className="close hidden-xs" data-dismiss="modal"  >
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body">
                <h3>Adding Business Contact</h3>
                {/* <div className="alert-exist">
                  <img src="images/caution-icon.svg" alt="icon" />
                  This contact already exists as {this.state.radio}
                </div> */}
                <div className="search-item">
                  <div className="search-lft">
                    <p>{this.state.client_name}</p>
                    <span className="uen">UEN:{this.state.uen}</span>
                  </div>
                  <p className="b-country">{this.state.country}</p>
                </div>
                <form className="custom-form row mar-top">
                  <div className="form-group col-md-12 col-xs-12 mar-b-no">
                    <label className="custom-checkbox radio small">
                      <input type="radio" name="radio" defaultChecked={this.state.checked_vendor} onChange={() => { this.radioChange(1) }} />
                      <span className="checkmark" />&nbsp; Vendor
                    </label>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mar-b-no">
                    <label className="custom-checkbox radio small">
                      <input type="radio" name="radio" defaultChecked={this.state.checked_customer} onChange={() => { this.radioChange(2) }} />
                      <span className="checkmark" />&nbsp; Customer
                    </label>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mar-b-no">
                    <label className="custom-checkbox radio small">
                      <input type="radio" name="radio"   defaultChecked={this.state.checked_cus_ven} onChange={() => { this.radioChange(3) }} />
                      <span className="checkmark" />&nbsp; Vendor &amp; Customer
                    </label>
                  </div>
                </form>
                <div className="btn-sec pad-no text-center mar-b-no">
                  <button className="btn btn-lightgray mar-rgt-5" data-dismiss="modal" onClick={this.handlecancel}>Cancel</button>
                  <button className="btn btn-green mar-rgt-5 " onClick={this.sendreq}>Send Request</button>
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
                  <button className="btn btn-green" data-dismiss="modal">Ok</button>
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