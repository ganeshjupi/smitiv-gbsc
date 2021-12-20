import React from "react";
import LeftSidebar from "../left_sidebar";
import Footer from "../footer";
import Topbar from "../topbar";
import FetchAllApi from "../../api_links/fetch_all_api";
import jQuery from "jquery";

class AddBankLogin extends React.Component {
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

      selectedLimit: 10,
      role_permissions:
        JSON.parse(localStorage.getItem("role_permissions")) || [],
    };
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
    this.getSpecificPage(1, 10);

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

  getSpecificPage = (pageNumber, limitvalue, searchkey) => {
    let client_id = this.state.logged_client_id;
    let page = pageNumber;
    let limit = this.state.selectedLimit;

    let search = searchkey;

    // alert(this.state.logged_client_id)
    FetchAllApi.customer_list(
      client_id,
      page,
      limit,
      search,
      parseInt(this.state.selected_filter_id),
      (err, response) => {
        console.log("Customer_list", response);
        if (response.status === 1) {
          let customerListArray = response.list;
          //  let totalPagesCount = new Array(parseInt( response.TotalPages))
          var totalPagesCount = [];
          for (var i = 1; i <= response.TotalPages; i++) {
            totalPagesCount.push(i);
          }
          this.setState({
            customerListArray: customerListArray,
            TotalPages: totalPagesCount,
            selectedLimit: this.state.selectedLimit,
            totalPagesCount: response.TotalPages,
          });
        } else {
          this.setState({
            customerListArray: [],
            TotalPages: "",
            pgNo: "",
            totalPagesCount: "",
          });
        }
      }
    );
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
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li>
                    <a href="javascript:;">Banking</a>
                  </li>
                  <li>Add Bank Account</li>
                </ul>
                <div className="pull-right">
                  <div className="search-wrap">
                    <a className="search-btn" href="javascript:;">
                      <img
                        className="search"
                        src="images/search-icon.svg"
                        alt="Search"
                      />
                    </a>
                  </div>
                  <div className="notify-wrap">
                    <a href="javascript:;">
                      <img
                        src="images/notification-icon.svg"
                        alt="Notification"
                      />
                    </a>
                  </div>
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
                      <span className="hidden-xs">Harvey Dean</span>
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
              {/* Top bar Ends here */}
              {/* Main Content Starts here */}
              <div className="main-content col-md-12 col-xs-12">
                <span className="page-title visible-xs">Add Bank Account</span>
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                  <div className="landing-wrap">
                    <div className="search-bank">
                      <img
                        className="icon"
                        src="images/bank-icon.svg"
                        alt="icon"
                      />
                      <p className="lead text-center">
                        Automatically import your DBS bank transaction
                      </p>
                      <p className="text-center fs-13 fw-sbold">
                        Connect your accounts in internet banking. <br />
                        Transaction will be automatically sent into Genie every
                        morning
                      </p>
                      <button className="btn btn-blue login-connect">
                        Login &amp; Connect Account
                      </button>
                      <a href="javascript:;" className="skip">
                        Skip
                      </a>
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
      </div>
    );
  }
}
export default AddBankLogin;
