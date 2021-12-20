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



export default class RequestSend extends React.Component {
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
      request_list: [],
      search: "",
      rowPerPage: 10,
      currentPage: 1,
      pageList: [],
      TotalPages:[],
      view: "All",
      filterarr: [],
      billarr:[],
      paymentarr:[],
      select: "Send",
      totalPagesCount: '',
      totalrecordcount:0,
      pagecountstart:0,
      pagecountend:0,
      selectedLimit: 10,
      receivedfrom:localStorage.getItem("comingFrom"),
    }
  };

  componentWillMount() {
    this.listFunc(1);
  };

componentDidMount(){
  // this.setState({select:this.state.receivedfrom==="Received Bill"?"Bills":"Send"},()=>{
  //   console.log(this.state.select)
  //   this.toggleFunc(this.state.selec);
  // })
}

  change = (e) => {
    this.listFunc('')
    // const arr = this.state.request_list
    // if (!e.target.value.trim()) {
    //   return this.setState({ filterarr: [...arr] })
    // }
    // const fill = arr.filter((obj) => {
    //   let res = obj.group_accouting_status
    //   let status;
    //   if (res == 1) {
    //     status = "Waiting for Confirmation"
    //   } else if (res == 2) {
    //     status = "Approved"
    //   } else if (res == 3) {
    //     status = "Declined"
    //   }

    //   if (obj.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || obj.email_id.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || status.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
    //     return true
    //   }
    //   else {
    //     return false
    //   }
    // })
    // return this.setState({ filterarr: fill.slice(0, this.state.rowPerPage) }, () => {
    //   this.setState({
    //     rowPerPage: 10,
    //     currentPage: 1,
    //     pageList: [1, 2],
    //     view: "All"
    //   })
    // })
  }

  setRowPerPage = (val) => {
    const arr = this.state.request_list

    let fill = arr.filter((obj) => {
      console.log(obj.designation)
      let res = obj.group_accouting_status
      let status;
      if (res == 1) {
        status = "Waiting for Confirmation"
      } else if (res == 2) {
        status = "Approved"
      } else if (res == 3) {
        status = "Declined"
      }
      if (obj.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.email_id.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.country.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || status.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
        return true
      }
      else {
        return false
      }
    })
    if (!this.state.search) {
      fill = arr;
    }
    if (val > fill.length) {
      this.setState({
        rowPerPage: val,
        filterarr: fill.slice(0, val),
        currentPage: 1,
        pageList: [1, 2]
      });
      return;
    }
    let pageList = [...this.state.pageList];
    this.setState({
      rowPerPage: val,
      filterarr: fill.slice(0, val),
      currentPage: 1,
      pageList,
    });
  }


  setPagination = (page, pageList = this.state.pageList) => {
    const arr = this.state.request_list

    let fill = arr.filter((obj) => {
      console.log(obj.designation)
      let res = obj.group_accouting_status
      let status;
      if (res == 1) {
        status = "Waiting for Confirmation"
      } else if (res == 2) {
        status = "Approved"
      } else if (res == 3) {
        status = "Declined"
      }
      if (obj.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.email_id.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.country.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || status.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
        return true
      }
      else {
        return false
      }
    })
    if (!this.state.search) {
      fill = arr;
    }
    const max = page * this.state.rowPerPage;
    const min = max - this.state.rowPerPage;
    this.setState({
      filterarr: fill.slice(min, max),
      currentPage: page,
      pageList: pageList,
    });
  }
  onNextPagination = () => {
    if (this.state.currentPage % 2 === 0) {
      this.setPagination(this.state.currentPage + 1, [this.state.currentPage + 1, this.state.currentPage + 2]);
    } else {
      this.setPagination(this.state.currentPage + 2, [this.state.currentPage + 2, this.state.currentPage + 3]);
    }
  }
  onPrevPagination = () => {
    if (this.state.currentPage % 2 === 0) {
      const arr = !(this.state.currentPage - 2) ? [1, 2] : [this.state.currentPage - 3, this.state.currentPage - 2];
      this.setPagination(this.state.currentPage - 2 || 1, arr);
    } else {
      this.setPagination(this.state.currentPage - 1, [this.state.currentPage - 2, this.state.currentPage - 1]);
    }
  };

  naviFunc = (lis) => {
    if (this.state.select == "Receive" && lis.group_accouting_status_text == 'Waiting for confirmation') {
      localStorage.setItem('group_request', JSON.stringify(lis))
      this.props.history.push("/accounting_request")
    }
  };

  toggleFunc = (val) => {
    this.setState({ select: val, request_list: [], filterarr: [], }, this.listFunc('',val));
  };


  listFunc = (pageNumber) => {
    let client_id = this.state.logged_client_id;
    let search_key = this.state.search_key;
    let page = pageNumber;  
    let limit = this.state.selectedLimit;
    this.setState({ pageNumber });

    if (this.state.select === "Send") {
      FetchAllApi.group_send_request_list(client_id,search_key,page,limit, (err, response) => {
        if (response.status === 1) {
          var totalPagesCount = []
          for (var i = 1; i <= response.total_pages; i++) {
            totalPagesCount.push(i)
          }
          this.setState({ request_list: response.results, filterarr: response.results,
            totalrecordcount: response.total_count,TotalPages:totalPagesCount,paymentarr:[],billarr:[] })
        }
      })
    } else  if (this.state.select === "Receive"){
      FetchAllApi.group_received_list(client_id,search_key,page,limit, (err, response) => {
        if (response.status === 1) {
          var totalPagesCount = []
          for (var i = 1; i <= response.total_pages; i++) {
            totalPagesCount.push(i)
          }
          this.setState({ request_list: response.results, filterarr: response.results ,
            totalrecordcount: response.total_count,TotalPages:totalPagesCount,paymentarr:[],billarr:[] })
        }
      })
    }
    else  if (this.state.select === "Bills"){
      FetchAllApi.get_group_accounting_sent_bills(client_id,search_key,page,limit,(err, response) => {
        if (response.status === 1) {
          var totalPagesCount = []
          for (var i = 1; i <= response.total_pages; i++) {
            totalPagesCount.push(i)
          }
          this.setState({ request_list: response.results, billarr: response.results ,
            totalrecordcount: response.total_count,TotalPages:totalPagesCount,paymentarr:[],filterarr:[] })
        }
      })
    }
    else  if (this.state.select === "Payments"){
      FetchAllApi.get_group_accounting_reveived_payment(client_id,search_key,page,limit, (err, response) => {
        if (response.status === 1) {
          var totalPagesCount = []
          for (var i = 1; i <= response.total_pages; i++) {
            totalPagesCount.push(i)
          }
          this.setState({ request_list: response.results, paymentarr: response.results ,
            totalrecordcount: response.total_count,TotalPages:totalPagesCount,billarr:[],filterarr:[] })
        }
      })
    }
    let pagenumber=pageNumber===''?1:pageNumber;
    this.setState({pagecountstart: pagenumber===1?1:this.state.pagecountend+1,pagecountend:limit*pagenumber});
  };



  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }


  render() {
    console.log(this.state.filterarr)
    let totalPages = Math.ceil(this.state.filterarr.length / this.state.rowPerPage);
    let arr = [];
    if (this.state.search) {
      totalPages = Math.ceil(this.state.filterarr.length / this.state.rowPerPage);
      arr = this.state.filterarr;
    } else {
      totalPages = Math.ceil(this.state.request_list.length / this.state.rowPerPage);
      arr = this.state.filterarr.slice(0, 10);
    }
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
                {/* <span class="page-title hidden-xs">Preference</span> */}
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li><a href="javascript:;">Group Accounting</a></li>
                  <li>Requests</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>
              {/* Top bar Ends here */}
              <div className="col-md-12 col-xs-12 mar-top visible-xs">
                <a href="javascript:;" className="back">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <span className="page-title">Requests</span>
              </div>
              {/* Main Content Starts here */}
              <div className="main-content col-md-12 col-xs-12">
                <div className="row">
                  <ul className="nav nav-pills transparent nowrap ofx-auto">
                    <li class="active"><a data-toggle="pill" onClick={() => {this.setState({ select: "Send" }, () => { this.toggleFunc("Send") })}} href="#send">Send Request</a></li>
                    <li><a data-toggle="pill" onClick={() => {this.setState({ select: "Receive" }, () => { this.toggleFunc("Receive") })}} href="#receive">Received request</a></li>
                    <li><a data-toggle="pill" onClick={() => {this.setState({ select: "Bills" }, () => { this.toggleFunc("Bills") })}} href="#bills">Group accounting Bills</a></li>
                    <li><a data-toggle="pill" onClick={() => {this.setState({ select: "Payments" }, () => { this.toggleFunc("Payments") })}} href="#payments">Group accounting Payments</a></li>
                  </ul>
                </div>
                <div className="content-sec cus-list col-md-12 col-xs-12 pad-no">
                  <div>
                    <form className="custom-form form-inline h-small">
                      <div className="form-group search-box mar-rgt">
                        <input type="text" name="search" onChange={(e)=>{this.setState({search_key:e.target.value},this.change)}} className="form-control" placeholder="Search..." />
                      </div>
                      <div className="form-group pull-right">
                        <label>Show per page</label>
                        <div className="custom-select-drop dropdown">
                          <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                            <span id="selected">{this.state.rowPerPage}</span><span className="caret" />
                          </a>
                          <ul className="dropdown-menu align-right minw-unset">
                           {/* <li className="active"><a href="javascript:;" onClick={() => this.setRowPerPage(10)}>10</a></li>
                             <li><a href="javascript:;" onClick={() => this.setRowPerPage(15)}>15</a></li>
                            <li><a href="javascript:;" onClick={() => this.setRowPerPage(20)}>20</a></li>
                            <li><a href="javascript:;" onClick={() => this.setRowPerPage(25)}>25</a></li>
                            <li><a href="javascript:;" onClick={() => this.setRowPerPage(30)}>30</a></li>
                            <li><a href="javascript:;" onClick={() => this.setRowPerPage(35)}>35</a></li> */}
                            
                            <li className="active"><a href="javascript:;" onClick={() => {this.setState({ selectedLimit: 10 }, () => { this.listFunc('', 10) })}}>10</a></li>
                            <li><a href="javascript:;" onClick={() => {this.setState({ selectedLimit: 15 }, () => { this.listFunc('', 15) })}}>15</a></li>
                            <li><a href="javascript:;" onClick={() => {this.setState({ selectedLimit: 20 }, () => { this.listFunc('', 20) })}}>20</a></li>
                            <li><a href="javascript:;" onClick={() => {this.setState({ selectedLimit: 25 }, () => { this.listFunc('', 25) })}}>25</a></li>
                            <li><a href="javascript:;" onClick={() => {this.setState({ selectedLimit: 30 }, () => { this.listFunc('', 30) })}}>30</a></li>
                            <li><a href="javascript:;" onClick={() => {this.setState({ selectedLimit: 35 }, () => { this.listFunc('', 35) })}}>35</a></li>
                          </ul>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="list-table col-md-12 col-xs-12 pad-no">
                    <div className="cus-table-responsive sent-rq-table" id="send" style={{ paddingRight: '1px' }}>
                    {this.state.filterarr && this.state.filterarr.length!=0?
                     <table className="table" >
                        <thead>
                          <tr>
                            <th className="pad-lft">Company Name</th>
                            <th>Contact Person</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th className="action-td" />
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.filterarr.map((data) => {
                            return (
                              <tr onClick={() => { this.naviFunc(data) }}>
                                <td className="pad-lft">
                                  <span className="fw-med">{data.name}</span>
                                </td>
                                <td className="cont-detail">
                                  <span className="fw-med">{data.contact_person}</span>
                                  <span><a href="mailto:jeffery.stanley@example.com">{data.email_id[0].email_address}</a></span>
                                </td>
                                <td>
                                  {(() => {
                                    if (this.state.select == "Send") {
                                      if (data.group_accouting_status == 1) {
                                        return (
                                          <span className="badge waiting">Waiting for Confirmation</span>
                                        )
                                      } else if (data.group_accouting_status == 2) {
                                        return (
                                          <span className="badge green">Approved</span>
                                        )
                                      } else if (data.group_accouting_status == 3) {
                                        return (
                                          <span className="badge red">Declined</span>
                                        )
                                      }
                                    } else {
                                      if (data.group_accouting_status == 2) {
                                      return (
                                        <span className="badge green">{data.group_accouting_status_text}</span>
                                      )
                                    } else{
                                      return (
                                        <span className="badge waiting">{data.group_accouting_status_text}</span>
                                      )
                                    }
                                      // return (
                                      //   <span className="badge waiting">{data.group_accouting_status_text}</span>
                                      // )
                                    }
                                  })()}
                                </td>
                                <td> <span className="fw-med">{data.group_accounting_type_text}</span></td>
                                <td className="action-td">
                                  {data.group_accouting_status == 2 ? (
                                    <a href="javascript:;" className="resend" style={{ display: "none" }}>Resend Invitation</a>
                                  ) : (
                                      <a href="javascript:;" className="resend" style={{ display: "none" }}>Resend Invitation</a>
                                    )}
                                </td>
                              </tr>
                            ) 
                          })}
                        </tbody>
                      </table>
                      :''}
                    </div>
                    {/* <div className="cus-table-responsive sent-rq-table" id="receive" style={{ paddingRight: '1px' }}>
                    {this.state.filterarr && this.state.filterarr.length!=0? <table className="table" >
                        <thead>
                          <tr>
                            <th className="pad-lft">Company Name</th>
                            <th>Contact Person</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th className="action-td" />
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.filterarr.map((data) => {
                            return (
                              <tr onClick={() => { this.naviFunc(data) }}>
                                <td className="pad-lft">
                                  <span className="fw-med">{data.name}</span>
                                </td>
                                <td className="cont-detail">
                                  <span className="fw-med">{data.contact_person}</span>
                                  <span><a href="mailto:jeffery.stanley@example.com">{data.email_id[0].email_address}</a></span>
                                </td>
                                <td>
                                  {(() => {
                                    if (this.state.select == "Send") {
                                      if (data.group_accouting_status == 1) {
                                        return (
                                          <span className="badge waiting">Waiting for Confirmation</span>
                                        )
                                      } else if (data.group_accouting_status == 2) {
                                        return (
                                          <span className="badge green">Approved</span>
                                        )
                                      } else if (data.group_accouting_status == 3) {
                                        return (
                                          <span className="badge red">Declined</span>
                                        )
                                      }
                                    } else {
                                      if (data.group_accouting_status == 2) {
                                      return (
                                        <span className="badge green">{data.group_accouting_status_text}</span>
                                      )
                                    } else{
                                      return (
                                        <span className="badge waiting">{data.group_accouting_status_text}</span>
                                      )
                                    }
                                      // return (
                                      //   <span className="badge waiting">{data.group_accouting_status_text}</span>
                                      // )
                                    }
                                  })()}
                                </td>
                                <td> <span className="fw-med">{data.group_accounting_type_text}</span></td>
                                <td className="action-td">
                                  {data.group_accouting_status == 2 ? (
                                    <a href="javascript:;" className="resend" style={{ display: "none" }}>Resend Invitation</a>
                                  ) : (
                                      <a href="javascript:;" className="resend" style={{ display: "none" }}>Resend Invitation</a>
                                    )}
                                </td>
                              </tr>
                            ) 
                          })}
                        </tbody>
                      </table>
                    </div> */}
                    <div id="bills" className="cus-table-responsive sent-rq-table" style={{ paddingRight: '1px' }}>
                    {this.state.billarr && this.state.billarr.length!=0?
                      <table className="table" >
                        <thead>
                          <tr>
                            <th className="pad-lft">Vendor Name</th>
                            <th>Invoice Number</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th >Currency</th>
                            <th >Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.billarr.map((data) => {
                            return (
                              <tr onClick={() => { this.naviFunc(data) }}>
                                <td className="pad-lft">
                                  <span className="fw-med">{data.vendor_name}</span>
                                </td>
                                <td className="cont-detail">
                                  <span className="fw-med">{data.invoice_number}</span>                                 
                                </td>
                                <td>
                                <span className="fw-med">{data.invoice_date}</span>                                   
                                </td>
                                <td> <span className="fw-med">{data.grand_total_home_currency}</span></td>
                                <td className="action-td">
                                <span className="fw-med">{data.foreign_currency}</span>
                                </td>
                                <td className="action-td">
                                <span className="fw-med">{data.status_text}</span>
                                </td>
                              </tr>
                            ) 
                          })}
                        </tbody>
                      </table>
                      :''}
                    </div>
                    <div id="payments" className="cus-table-responsive sent-rq-table" style={{ paddingRight: '1px' }}>
                    {this.state.paymentarr && this.state.paymentarr.length!=0?
                     <table className="table" >
                        <thead>
                          <tr>
                            <th className="pad-lft">Vendor Name</th>
                            <th>Reference Number</th>
                            <th>Payment Date</th>
                            <th>Payment Amount</th>
                            <th >Currency</th>
                            <th >Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.paymentarr.map((data) => {
                            return (
                              <tr onClick={() => { this.naviFunc(data) }}>
                                <td className="pad-lft">
                                  <span className="fw-med">{data.vendor_name}</span>
                                </td>
                                <td className="cont-detail">
                                  <span className="fw-med">{data.payment_reference}</span>                                 
                                </td>
                                <td>
                                <span className="fw-med">{data.payment_date}</span>                                   
                                </td>
                                <td> <span className="fw-med">{data.payment_amount}</span></td>
                                <td className="action-td">
                                <span className="fw-med">{data.currency}</span>
                                </td>
                                <td className="action-td">
                                <span className="fw-med">{data.status}</span>
                                </td>
                              </tr>
                            ) 
                          })}
                        </tbody>
                      </table>
                      :''}
                    </div>
                    <div className="col-md-12 col-xs-12 pad-no">
                      <p className="fw-med pull-left"> Showing {this.state.pagecountstart} - {this.state.pagecountend} of {this.state.totalrecordcount} items</p>
                      <div className="pull-right pagination-wrap">
                        <ul className="pagination">
                          {/* {
                            (this.state.pageList.toString().indexOf("1") === -1) && <li><a href="javascript:;" className="btn" onClick={() => this.onPrevPagination()}>Prev</a></li>
                          }
                          {
                            this.state.pageList.map((item, idx) => {
                              return (<li><a href="javascript:;" style={this.state.currentPage === item ? {
                                background: "#2491D9",
                                marginLeft: "5px",
                                color: "#fff"
                              } : {}} onClick={() => this.setPagination(item)}>{item}</a></li>)
                            })
                          }
                          {
                            !!(this.state.pageList.indexOf(totalPages) === -1 && this.state.filterarr.length) && <li><a href="javascript:;" className="btn" onClick={() => this.onNextPagination()}>Next</a></li>
                          } */}
                            {this.state.TotalPages &&
                            this.state.TotalPages.map((item, i) => {
                              return (
                                <>
                                  {/* li className="active"><a href="javascript:;">01</a></li> */}
                                  <li
                                    key={i}
                                    onClick={() => this.listFunc(i + 1)}
                                  >
                                    <a href='javascript:;'>{i + 1}</a>
                                  </li>

                                </>
                              )
                            })}
                        </ul>
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