import React from "react";
import LeftSidebar from "./../left_sidebar";
import Footer from "./../footer";
import Topbar from "./../topbar";
import FetchAllApi from "../../api_links/fetch_all_api";
import jQuery from "jquery";
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class ViewPriorSalesTaxReturns extends React.Component {
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

            tax_return_options_list:[],
            role_permissions:
                JSON.parse(localStorage.getItem("role_permissions")) || [],


        };
    }

    componentDidUpdate() {
        window.jQuery(".selectpicker").selectpicker("refresh");
        // jQuery("#currency_selected").val(4);
    }

    UNSAFE_componentWillMount() {
        jQuery(document.body).removeClass("minimize_leftbar");
        //console.log("logged_user_id", this.state.logged_user_id);

        jQuery("title").html("Customer | GBSC");

        if (
            this.state.logged_user_id === "" ||
            this.state.logged_user_id === "null" ||
            this.state.logged_user_id === "undefined"
        ) {
            this.props.history.push("/");
        }
    }

    routedChange(parameter) {
        this.props.history.push("/" + parameter);
        window.scrollTo(0, 0);
    }

    componentDidMount() {

        this.taxreturn_options();

        // document.getElementById("sticky-tb-hdr").addEventListener("scroll", function () {
        //   var translate = "translate(0," + this.scrollTop + "px)";
        //   if (this.querySelector("thead") != null && this.querySelector("thead") != undefined && this.querySelector("thead").style != null) {
        //     this.querySelector("thead").style.transform = translate;
        //   }
        // });

        jQuery(window).on("load", function () {
            window.jQuery(".mscroll-y").mCustomScrollbar({
                axis: "y",
                scrollEasing: "linear",
                scrollInertia: 600,
                autoHideScrollbar: "true",
                autoExpandScrollbar: "true",
            });

            window.jQuery(".ib-scroll").mCustomScrollbar({
                scrollEasing: "linear",
                scrollInertia: 600,
                scrollbarPosition: "outside",
            });
        });

        jQuery(document).ready(function () {
            jQuery(".left-navmenu .has-sub").click(function () {
                jQuery(".left-navmenu li a").removeClass("active");
                jQuery(this).addClass("active");
                jQuery(".left-navmenu li a:not(.active)")
                    .siblings(".sub-menu")
                    .slideUp();
                jQuery(this).siblings(".sub-menu").slideToggle();
            });
            jQuery(".left-navmenu .sub-menu li a").click(function () {
                jQuery(".left-navmenu .sub-menu li a").removeClass("active");
                jQuery(this).addClass("active");
            });
            jQuery(".search-btn").click(function () {
                jQuery(".hdr-search").addClass("active");
            });
            jQuery(".hdr-search .close-icon").click(function () {
                jQuery(".hdr-search").removeClass("active");
            });
            window.jQuery(".select-picker").selectpicker();
            jQuery(".label-enclose .label").click(function () {
                jQuery(this).toggleClass("active");
            });
            jQuery(".nav-brand-res").click(function () {
                jQuery(".left-navbar").addClass("active");
            });
            jQuery(".menu-close").click(function () {
                jQuery(".left-navbar").removeClass("active");
            });
        });
        
    }
    taxreturn_options = () => {
        FetchAllApi.view_prior_filed_tax_return_options_list(this.state.logged_client_id,(err, response) => {           
            if (response.status === 1) {   
                   
            this.setState({ tax_return_options_list: response.list })
          } else {
            this.setState({ tax_return_options_list: [] })
          }
        })
      }
    logoutLink() {
        localStorage.clear();

        this.props.history.push("/");
    }

    pageLink(page_slug) {
        this.props.history.push("/" + page_slug);
    }

    render() {
        console.log(this.state.tax_return_options_list)
        return (
            <div>
                {/* Main Wrapper Starts here */}
                <div className="container-fluid">
                    <div className="row">
                        {/* left-navbar Starts here */}
                        <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />

                        {/* left-navbar Ends here */}
                        {/* MainContent Wrapper Starts here */}
                        <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
                            {/* Top bar Starts here */}
                            <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <form className="hdr-search">
                  <input
                    type="text"
                    className="form-control"
                    name="search"
                    placeholder="Search..."
                  />
                  {/* <button type="submit" class="btn btn-green">Search</button> */}
                  <a href="javascript:;" className="close-icon">
                    <img src="images/close-icon-red.svg" alt="Close" />
                  </a>
                </form>
                <div className="nav-brand-res visible-xs">
                  <img
                    className="img-responsive"
                    src="images/logo-icon.png"
                    alt="LogoIcon"
                  />
                </div>
                <a href="javascript:;" className="back hidden-xs">
                  <img src="images/back-arrow-blue.svg" onClick={() => this.props.history.goBack()} />
                </a>
                {/* <span class="page-title hidden-xs">Preference</span> */}
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li>
                    <a href="javascript:;">Tax</a>
                  </li>
                  <li>Prior Sales Tax Return</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>
                            {/* <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                                <form className="hdr-search">
                                    <input type="text" className="form-control" name="search" placeholder="Search..." />
                                    {/* <button type="submit" class="btn btn-green">Search</button> */}
                                    {/* <a href="javascript:;" className="close-icon"><img src="images/close-icon-red.svg" alt="Close" /></a>
                                </form>
                                <div className="nav-brand-res visible-xs"><img className="img-responsive" src="images/logo-icon.png" alt="LogoIcon" /></div>
                                <a href="javascript:;" className="back hidden-xs">
                                    <img src="images/back-arrow-blue.svg" />
                                </a>
                                {/* <span class="page-title hidden-xs">Preference</span> */}
                                 {/*<ul className="list-unstyled breadcrumb page-title hidden-xs">
                                    <li><a href="javascript:;">Sales Tax</a></li>
                                    <li>View Prior Sales Tax Returns</li>
                                </ul>
                                <div className="pull-right">
                                    <div className="search-wrap">
                                        <a className="search-btn" href="javascript:;">
                                            <img className="search" src="images/search-icon.svg" alt="Search" />
                                        </a>
                                    </div>
                                    <div className="notify-wrap">
                                        <a href="javascript:;"><img src="images/notification-icon.svg" alt="Notification" /></a>
                                    </div>
                                    <div className="profile-wrap dropdown">
                                        <a href="javascript:;" className="avatar dropdown-toggle" data-toggle="dropdown">
                                            <span className="avatar-img"><img className="img-responsive" src="images/user-img-1.png" alt="Harvey Dean" /></span>
                                            <span className="hidden-xs">Harvey Dean</span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="javascript:;"><img src="images/edit-icon.svg" alt="icon" />Edit Profile</a>
                                            </li>
                                            <li><a href="javascript:;"><img src="images/settings-icon.svg" alt="icon" />Settings</a></li>
                                            <li><a href="javascript:;"><img src="images/turn-off-icon.svg" alt="icon" />Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                            {/* Top bar Ends here */}
                            <div className="col-md-12 col-xs-12 mar-top visible-xs">
                                <a href="javascript:;" className="back">
                                    <img src="images/back-arrow-blue.svg" />
                                </a>
                                <span className="page-title">View Prior Sales Tax Returns</span>
                            </div>
                            {/* Main Content Starts here */}
                            <div className="main-content col-md-12 col-xs-12 pad-t-no">
                                <div className="content-sec col-md-12 col-xs-12 pad-no">
                                    {/* content-top Starts here */}
                                    <div className="content-top col-md-12 col-xs-12 pad-no mar-btm bg-trans">
                                        <form className="custom-form">
                                            <div className="col-md-6 col-xs-12">
                                                <div className="row">
                                                    <p className="fw-sbold mar-btm">Prior Sales Tax Returns</p>
                                                    <div className="transfer-top">
                                                        <div className="row">
                                                            {/* <div className="form-group col-md-12">
                                                                <label>Choose Sales Tax Agency</label>
                                                                <div className="custom-select-drop dropdown">
                                                                    <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn" href="javascript:;">
                                                                        <span id="selected">Choose...</span><span className="caret" />
                                                                    </a>
                                                                    <ul className="dropdown-menu">
                                                                        <li className="active"><a href="javascript:;">Agency 1</a></li>
                                                                        <li><a href="javascript:;">Agency 2</a></li>
                                                                        <li><a href="javascript:;">Agency 3</a></li>
                                                                        <li><a href="javascript:;">Agency 4</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div> */}
                                                            <div className="form-group col-md-12">
                                                                {/* <label>Ending Date</label>  */}
                                                                <label>View prior filed tax return</label>
                                                                {/* <input type="text" className="form-control" defaultValue="31 Nov 2019" name /> */}
                                             
                                    <select
                                      className="form-control"
                                    id="filetaxreturn"                                     
                                      onChange={(e) => {
                                        window.open(e.target.value)
                                      }}
                                    >
                                     
                                     <option selected={true}>Choose</option>
                                      {this.state.tax_return_options_list &&
                                        this.state.tax_return_options_list.map((item,index) => {
                                          return (                                           
                                                <option
                                                  key={index}
                                                  id={item.id}
                                                  data-id={item.id}
                                                  value={item.file_path}
                                                >
                                                  {item.tax_period_text}
                                                </option>
                                            
                                          );
                                        })}
                                    </select>
                                                            </div>
                                                            {/* <div className="form-group col-md-12">
                                                                <label>From Date</label>
                                                                <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy">
                                                                    <input type="text" className="form-control" />
                                                                    <div className="input-group-addon">
                                                                        <img src="images/calendar-icon.svg" alt="icon" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-md-12">
                                                                <label>To Date</label>
                                                                <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy">
                                                                    <input type="text" className="form-control" />
                                                                    <div className="input-group-addon">
                                                                        <img src="images/calendar-icon.svg" alt="icon" />
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    <p className="mar-top mar-btm fs-13">Reports include transaction filed at the time of the return filling process. Transactions changes after the return was filed won't appear on these reports. (Reports are displayed as a PDF)</p>
                                                    <button className="btn btn-blue">View</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/* content-top Starts here */}
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
            </div>

        );
    }
}
export default ViewPriorSalesTaxReturns;
