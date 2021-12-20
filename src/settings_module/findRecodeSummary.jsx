import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class Summary extends React.Component{
    constructor(){
        super()
        this.state={
          logged_user_id: localStorage.getItem("logged_user_id"),
          logged_client_id: localStorage.getItem("logged_client_id"),
          logged_role_id: localStorage.getItem("logged_role_id"),
          logged_user_name: localStorage.getItem("logged_user_name"),
          logged_user_email: localStorage.getItem("logged_user_email"),
          logged_user_phone: localStorage.getItem("logged_user_phone"),
          logged_user_image: localStorage.getItem("logged_user_image"),
          logged_company_name: localStorage.getItem("logged_company_name"),
          entityname:localStorage.getItem("Entityname"),
          table:[],
          date:"",

        }
    
    };


    componentWillMount (){
      if (
        this.state.logged_user_id === "" ||
        this.state.logged_user_id === null ||
        this.state.logged_user_id === undefined
      ) {
        this.props.history.push("/");
      }
    };

    logoutLink() {
      localStorage.clear();
    
      this.props.history.push("/");
    };

  componentDidMount(){
    this.responseFunc();
    window.jQuery(".mscroll-y").mCustomScrollbar({
      axis:"y",
      scrollEasing:"linear",
       scrollInertia: 600,
      autoHideScrollbar: "true",
       autoExpandScrollbar: "true"
    });
   window.jQuery(".mscroll-x").mCustomScrollbar({
       axis:"x",
       scrollEasing:"linear",
        scrollInertia: 600,
     autoHideScrollbar: "true",
      autoExpandScrollbar: "true"
    });
  }
  
  responseFunc=()=>{
    this.setState({table:this.props.location.state.response,date:new Date(this.props.location.state.date.updated_on).getDate()+"-"+new Date(this.props.location.state.date.updated_on).getMonth()+"-"+new Date(this.props.location.state.date.updated_on).getFullYear()})
  }

    nextPageFunc=()=>{
      let send=JSON.stringify(this.props.location.state.search)
      window.open("/find_recode_search?search=")
    };


    pageLink (page_slug) {
      this.props.history.push('/' + page_slug)
    }

    render(){
        return(
            <React.Fragment>
                <div className="container-fluid">
          {/* header Starts here */}
            <UserTopbar  logoutSubmit={(e) => this.logoutLink()}/>
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
        <h3>Subscribers</h3>
    </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
            <Sidebar pageSubmit={e => this.pageLink(e)} />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12 mar-btm">
                <h3>Find &amp; Recode</h3>
                <div>
                  <button className="btn btn-blue">Find &amp; Recode</button>
                </div>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <h5>Recode Summary</h5>
                  <p className="fs-13 fw-med">{new Date(this.props.location.state.date.updated_on).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")} on {this.state.date} by {this.state.entityname} this <a onClick={this.nextPageFunc}>Search</a></p>
                    <p className="fs-13 fw-med">Account was Recoded to <strong>{this.props.location.state.date.summary_text}</strong></p>
                  <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 pad-no mar-top">
                    <div className="table-responsive">
                      <table className="table detail-report">
                        <thead>
                          <tr>
                            <th className="text-left">
                              Date
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Name
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Reference
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Transaction Type
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Total
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Status
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          
                          <tr>
                            <td colSpan={6} className="bg-gray-td">
  <span className="fw-sbold">{this.state.table.length}transactions were recoded affecting {this.state.table.length} line items</span>
  <span className="fw-sbold">{this.state.date}</span>
                            </td>
                          </tr>
                          {this.state.table.map((val,idx)=>{
                           return(
                          <tr>
                            <td>{val.invoice_date}</td>
                            <td>{val.company_name}</td>
                           <td>INV-{val.invoice_number}</td>
                           <td>{val.entry_type}</td>
                            <td></td>
                            <td>Completed</td>
                          </tr>
                                   
                                   )})}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
        </div>
        {/* Main Wrapper Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}

            </React.Fragment>
        )
    }
}