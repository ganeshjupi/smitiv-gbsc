import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class History extends React.Component{
    constructor(){
        super()
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
    });}

    render(){
        return(
            <React.Fragment>
                <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
        <h3>Subscribers</h3>
    </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
           
           <Sidebar />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12 mar-btm">
                <h3>Find &amp; Recode</h3>
                <div>
                  <button className="btn btn-blue">Find &amp; Recode</button>
                </div>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <h5>History of Recoded Transactions</h5>
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
                              Transaction Affected
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Transaction Dates
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Recoded by
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Status
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              <span className="sr-only">Summary</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>16-07-2020</td>
                            <td>2 lines across 2 transactions</td>
                            <td>06-04-2020 to 09-04-2020</td>
                            <td>John Doe</td>
                            <td>Completed</td>
                            <td>
                              <a href="/find_recode_summary">Summary</a>
                            </td>
                          </tr>
                          
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