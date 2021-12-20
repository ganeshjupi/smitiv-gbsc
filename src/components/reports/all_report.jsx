import React from "react";
import LeftSidebar from "../left_sidebar";
import Footer from "../footer";
import FetchAllApi from "../../api_links/fetch_all_api";
import Topbar from "../topbar";

import moment from "moment";
import { connect } from "react-redux";

import Loader from "react-loader-spinner";

import jQuery from "jquery";
var _ = require("lodash");
// import 'bootstrap';
// import 'bootstrap-select';

class AllReport extends React.Component {
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
      arrayPicked: [],
      DateSelected: [],
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  routedChange(parameter) {
    this.props.history.push("/" + parameter);
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });
    //  window.jQuery('.input-group.date').datepicker({format: "dd/mm/yyyy"});
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }
  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass("minimize_leftbar");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === "null" ||
      this.state.logged_user_id === "undefined"
    ) {
      this.props.history.push("/");
    }
  }
  setUpdatedDate = () => {
    let fromDate = this.convert_date(jQuery("#fromDate").val());
    let toDate = this.convert_date(jQuery("#toDate").val());
    if (
      fromDate != undefined &&
      fromDate != "undefined-undefined-" &&
      toDate != undefined &&
      toDate != "undefined-undefined-"
    ) {
      this.setState({
        DateSelected: [fromDate, toDate],
      });
    } else {
      this.setState({
        DateSelected: [],
      });
    }
  };

  componentDidMount() {
    window.jQuery("#useme").datepicker("refresh");

    //script starts
    this.selectedInvoices();
    jQuery(window).on("load", function () {
      jQuery(".mscroll-y").mCustomScrollbar({
        axis: "y",
        scrollEasing: "linear",
        scrollInertia: 600,
        autoHideScrollbar: "true",
        autoExpandScrollbar: "true",
      });
      jQuery(".mscroll-x").mCustomScrollbar({
        axis: "x",
        scrollEasing: "linear",
        scrollInertia: 600,
        autoHideScrollbar: "true",
        autoExpandScrollbar: "true",
      });

      jQuery(".ib-scroll").mCustomScrollbar({
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
      // jQuery(".custom-select-drop .dropdown-menu a").click(function () {
      //   jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass(
      //     "active"
      //   );
      //   jQuery(this).parent("li").addClass("active");
      //   jQuery(".open #selected").text(jQuery(this).text());
      // });

      window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

      jQuery(".dis-link").click(function () {
        jQuery(this).toggleClass("active");
        jQuery(".discount-wrap").slideToggle();
      });
    });

    // jQuery(document)
    //   .on("shown.bs.dropdown", ".dropdown", function () {
    //     // calculate the required sizes, spaces
    //     var jQueryul = jQuery(this).children(".dropdown-menu");
    //     var jQuerybutton = jQuery(this).children(".dropdown-toggle");
    //     var ulOffset = jQueryul.offset();
    //     // how much space would be left on the top if the dropdown opened that direction
    //     if (ulOffset.length) {
    //       var spaceUp =
    //         ulOffset.top -
    //         jQuerybutton.height() -
    //         jQueryul.height() -
    //         jQuery(window).scrollTop();
    //       // how much space is left at the bottom
    //       var spaceDown =
    //         jQuery(window).scrollTop() +
    //         jQuery(window).height() -
    //         (ulOffset.top + jQueryul.height());
    //     }

    //     // switch to dropup only if there is no space at the bottom AND there is space at the top, or there isn't either but it would be still better fit
    //     if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown))
    //       jQuery(this).addClass("dropup");
    //   })
    //   .on("hidden.bs.dropdown", ".dropdown", function () {
    //     // always reset after close
    //     jQuery(this).removeClass("dropup");
    //   });

    //script ends here
    //jQuery(".select-picker").selectpicker();

    require("jquery-mousewheel");
    require("malihu-custom-scrollbar-plugin");

    jQuery(".item-listwrap").mCustomScrollbar({
      scrollEasing: "linear",
      scrollInertia: 600,
      scrollbarPosition: "outside",
    });

    jQuery(".label-enclose .label span").click(function () {
      //jQuery('.label-enclose .label').removeClass('active')
      jQuery(this).parent(".label-enclose .label").addClass("active");
    });
    jQuery(".label-enclose .label a").click(function () {
      jQuery(this).parent(".label-enclose .label").removeClass("active");
    });
  }

  convert_date = (date) => {
    if (date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
    }
    return date_formated;
  };

  selectedInvoices = () => {
    var arrayPicked = [];

    for (let i = 1; i < 14; i++) {
      let checked = jQuery("#q" + i).prop("checked");
      if (checked) {
        arrayPicked.push(i);
      }
    }
    this.setState({ arrayPicked: arrayPicked });
  };

  render() {
    console.log("arrayPicked", this.state.arrayPicked);
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    } else {
      return (
        <div>
          <div className="container-fluid">
            <div className="row">
              <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />
              <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
                <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                  <div className="nav-brand-res visible-xs">
                    <img
                      className="img-responsive"
                      src="../images/logo-icon.png"
                      alt="LogoIcon"
                    />
                  </div>
                  <a
                    href="javascript:;"
                    class="back hidden-xs"
                    onClick={() => this.props.history.goBack()}
                  >
                    <img src="../images/back-arrow-blue.svg" />
                  </a>
                  {/* <span className='page-title hidden-xs'>Inbox</span> */}
                  <ul className="list-unstyled breadcrumb page-title hidden-xs">
                    <li>
                      <a
                        href="javascript: ;"
                        onClick={this.routedChange.bind(this, "Vendors_list")}
                      >
                        Report
                      </a>
                    </li>
                    <li>All Reports</li>
                  </ul>
                  <Topbar history={this.props.history} logoutSubmit={(e) => this.logutLink()} />
                </div>
              </div>
              <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
                {/* Top bar Starts here */}

                {/* Top bar Ends here */}
                <div className="col-md-12 col-xs-12 mar-top visible-xs">
                  <a href="javascript:;" className="back">
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  <span className="page-title">All Reports</span>
                </div>

                {/* content-top Starts here */}

                <div className="content-top col-md-12 col-xs-12">
                  <h4 className="fw-sbold mar-t-no">All Reports</h4>
                  <div className="row">
                    <div className="report-setting all-report col-md-12 col-xs-12">
                      <p className="fw-sbold">Choose Reporting Period</p>
                      <form className="custom-form form-inline col-md-12 col-xs-12 pad-no">
                        <div className="row">
                          <div className="form-group col-md-4 col-xs-12">
                            <label>From</label>
                            <div
                              className="input-group date mar-t-no"
                              data-date-format="dd/mm/yyyy"
                              id="useme"
                            >
                              <input
                                type="text"
                                className="form-control"
                                id="fromDate"
                                onBlur={() => {
                                  this.setUpdatedDate();
                                }}
                              />
                              <div className="input-group-addon">
                                <img
                                  src="images/calendar-icon.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-md-4 col-xs-12">
                            <label>To</label>
                            <div
                              className="input-group date mar-t-no"
                              data-date-format="dd/mm/yyyy"
                            >
                              <input
                                type="text"
                                className="form-control"
                                id="toDate"
                                onBlur={() => {
                                  this.setUpdatedDate();
                                }}
                              />
                              <div className="input-group-addon">
                                <img
                                  src="images/calendar-icon.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className='form-group col-md-4 col-xs-12'>
                            <button className='btn btn-green'>Submit</button>
                          </div> */}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* content-top Starts here */}
                {/* Main Content Starts here */}
                <div className="main-content col-md-12 col-xs-12">
                  <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                    <div className="row">
                      <div className="col-md-4 col-sm-12 col-xs-12">
                        <p className="fw-sbold">Accountant</p>
                        <ul className="list-unstyled report-list">
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q1"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              Profit &amp; Loss
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q2"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              Balance Sheet
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q3"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              General Ledger
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-4 col-sm-12 col-xs-12">
                        <p className="fw-sbold">Customer</p>
                        <ul className="list-unstyled report-list">
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q4"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              Open Invoices
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q5"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              A/R Aging Summary
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q6"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              Customer Balance Detail
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q7"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              Customer Balance Summary
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-4 col-sm-12 col-xs-12">
                        <p className="fw-sbold">Vendor</p>
                        <ul className="list-unstyled report-list">
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q8"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              Unpaid Bill Details
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q9"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              A/P Aging Summary
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q10"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              Vendor Balance Detail
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q11"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              Vendor Balance Summary
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-sm-12 col-xs-12">
                        <p className="fw-sbold">Taxes</p>
                        <ul className="list-unstyled report-list">
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q12"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              GST Report Summary
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                name
                                id="q13"
                                onChange={() => {
                                  this.selectedInvoices();
                                }}
                              />{" "}
                              GST Detail Report
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="row mar-top"
                      style={{ paddingBottom: "50px" }}
                    >
                      <div className="col-md-12 col-xs-12 text-right">
                        <div className="dropdown menu-item pull-right mar-lft">
                          <button
                            className="btn btn-green dropdown-toggle btn-arrow"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Export
                            <span className="caret" />
                          </button>
                          <ul className="dropdown-menu align-right">
                            <li>
                              <a href="javascript:;">Export as PDF</a>
                            </li>
                            <li>
                              <a href="javascript:;">Export as Excel</a>
                            </li>
                          </ul>
                        </div>
                        <button
                          className="btn btn-blue"
                          type="button"
                          onClick={() => {
                            if (this.state.DateSelected.length > 0) {
                              this.props.history.push("/filtered-reports", [
                                this.state.arrayPicked,
                                this.state.DateSelected,
                              ]);
                            } else {
                              alert("Date must be selected in order to view");
                            }
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Main Content Ends here */}
              </div>
            </div>

            <Footer logoutSubmit={(e) => this.logoutLink()} />
          </div>
        </div>
      );
    }
  }
}
export default AllReport;
