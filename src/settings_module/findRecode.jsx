import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import { Link } from "react-router-dom";
import jQuery from 'jquery'
import "./preference.css"



export default class Sales extends React.Component{
    constructor(props){
        super(props)
        this.state={
          logged_user_id: localStorage.getItem("logged_user_id"),
          logged_client_id: localStorage.getItem("logged_client_id"),
          logged_role_id: localStorage.getItem("logged_role_id"),
          logged_user_name: localStorage.getItem("logged_user_name"),
          logged_user_email: localStorage.getItem("logged_user_email"),
          logged_user_phone: localStorage.getItem("logged_user_phone"),
          logged_user_image: localStorage.getItem("logged_user_image"),
          logged_company_name: localStorage.getItem("logged_company_name"),
          condition: sessionStorage.getItem("conditions"),
          
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
      });
    };

    logoutLink() {
      localStorage.clear();
    
      this.props.history.push("/");
    };


    pageLink (page_slug) {
      this.props.history.push('/' + page_slug)
    }

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
           <Sidebar pageSubmit={e => this.pageLink(e)}/>
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Find &amp; Recode</h3>
                <div>
                <Link to="/find_recode_history" >
                                </Link>
                </div>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="landing-wrap">
                  <a href="/find_recode_search" className="btn btn-wide btn-small">
                    <img src="images/search-icon.svg" alt="icon" />
                    Find &amp; Recode
                  </a>
                  <div className="img-concept text-center">
                    <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                    <p>Looks like there's no recoded history</p>
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