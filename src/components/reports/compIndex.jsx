import React from "react";
import LeftSidebar from "../left_sidebar";
import Footer from "../footer";
import FetchAllApi from "../../api_links/fetch_all_api";
import Topbar from "../topbar";
import ProfitLossTable from "./profitLossTable";
import BalanceSheetTable from "./balance_sheetTable";
import OpenInvoiceTable from "./openInvoiceTable";
import ArAgingTable from "./ar_aging_Table";
import ApAgingTable from "./ap_aging_Table";
import CustomerBalDetail from "./customerBalDetailTable";
import CusBalSummary from "./customerBalSummaryTable";
import UnpaidBillTable from "./unpaidBillsTable";
import VendorBalDetail from "./vendorBalDetailTable";
import VendorBalSummary from "./vendorBalSummaryTable";

import moment from "moment";
import { connect } from "react-redux";

import Loader from "react-loader-spinner";

import jQuery from "jquery";
var _ = require("lodash");
// import 'bootstrap';
// import 'bootstrap-select';

class SpecifiedReports extends React.Component {
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
      total_revenue: "",
      cost_of_goods_sold: "",
      gross_profit: "",
      net_income: "",
      reportObject: [],
      numberOfColumns: [],
      show_column_option_list: [],
      dateList: [],
      endDate: "",
      startDate: "",
      dropdown: "",
      show_column: 3,
      inbox_list: [],
      response_stus: 0,
      response_msg: "No data found",
      item_details: "",
      item_file_path: "",
      waiting_re: [],
      re_assigned: [],
      selected: "",
      start_date: "2020-01-01",
      end_date: "2020-01-31",
      loading: true,
      show_coulmns_filter: [],
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
    window.jQuery(".selectpicker").selectpicker("refresh");
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }
  UNSAFE_componentWillMount() {
    console.log("checkmekkkkkkkkkkkkkkkkk", this.props.location.state[1]);
    jQuery(document.body).removeClass("minimize_leftbar");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === "null" ||
      this.state.logged_user_id === "undefined"
    ) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    //script starts
    this.selectedInvoices();
    //profit
    this.fetch_report();
    this.show_columnslistBal();
    jQuery(window).on("lioad", function () {
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

      window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy" });

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
    //     var spaceUp =
    //       ulOffset.top -
    //       jQuerybutton.height() -
    //       jQueryul.height() -
    //       jQuery(window).scrollTop();
    //     // how much space is left at the bottom
    //     var spaceDown =
    //       jQuery(window).scrollTop() +
    //       jQuery(window).height() -
    //       (ulOffset.top + jQueryul.height());
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

  show_columnslistBal = () => {
    let report_name = "balance_sheet";
    FetchAllApi.get_coulmnlist(report_name, (err, response) => {
      if (response.status === 1) {
        this.setState({
          show_coulmns_filter: response.details,
        });
      } else {
        this.setState({
          gst_list: [],
        });
      }
    });
  };

  //1 profit loss
  fetch_report = () => {
    this.setState({ loading: true });
    let { start_date, end_date } = this.state;

    var showColumns = this.state.show_column;

    // var showColumns = showCol ? showCol : '1'

    var user_id = parseFloat(this.state.logged_user_id);
    FetchAllApi.reports_list(
      this.state.logged_client_id,
      this.state.start_date,
      this.state.end_date,
      showColumns,
      this.state.filter_id,
      this.state.filter_options,
      this.state.sort_by_column_key,
      this.state.sort_by,
      [],
      1,
      (err, response) => {
        console.log("LIST RETURNEDjkhkshkkdsh=>", response);
        if (response.status == 1) {
          var arrayOfElements = [];
          var numberOfColumns = [];
          var dateList = [];
          for (let category in response.details) {
            if (response.details.hasOwnProperty(category)) {
              numberOfColumns = response.details[category].date_array.length;
              dateList = response.details[category].date_array;
              arrayOfElements.push(response.details[category]);
            }
          }
          this.setState({
            total_revenue: response.total_revenue,
            cost_of_goods_sold: response.cost_of_goods_sold,
            gross_profit: response.gross_profit,
            net_income: response.net_income,
            reportObject: arrayOfElements,
            numberOfColumns: numberOfColumns,
            dateList: dateList,
            loading: false,
          });
        } else {
          this.setState({
            cost_of_goods_sold: "",
            gross_profit: "",
            net_income: "",
            reportObject: [],
            numberOfColumns: numberOfColumns,
            dateList: [],
            loading: false,
          });
        }
      }
    );
  };

  render() {
    let queryArray = this.props.location.state[0];
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
                  onClick={this.routedChange.bind(this, "all-report")}
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
              {queryArray.includes(1) ? (
                <ProfitLossTable date={this.props.location.state[1]} />
              ) : null}
              {queryArray.includes(2) ? (
                <BalanceSheetTable date={this.props.location.state[1]} />
              ) : null}

              {queryArray.includes(4) ? (
                <OpenInvoiceTable date={this.props.location.state[1]} />
              ) : null}

              {queryArray.includes(5) ? (
                <ArAgingTable date={this.props.location.state[1]} />
              ) : null}

              {queryArray.includes(6) ? (
                <CustomerBalDetail date={this.props.location.state[1]} />
              ) : null}

              {queryArray.includes(7) ? (
                <CusBalSummary date={this.props.location.state[1]} />
              ) : null}

              {queryArray.includes(8) ? (
                <UnpaidBillTable date={this.props.location.state[1]} />
              ) : null}

              {queryArray.includes(9) ? (
                <ApAgingTable date={this.props.location.state[1]} />
              ) : null}
              {queryArray.includes(10) ? (
                <VendorBalDetail date={this.props.location.state[1]} />
              ) : null}
              {queryArray.includes(11) ? (
                <VendorBalSummary date={this.props.location.state[1]} />
              ) : null}
              {/* 
              {queryArray.includes(12)? <VendorBalSummary date={this.props.location.state[1]}/>:null}
              {queryArray.includes(13)? <VendorBalSummary date={this.props.location.state[1]}/>:null}
 */}
            </div>
          </div>

          <Footer logoutSubmit={(e) => this.logoutLink()} />
        </div>
      </div>
    );
  }
}
export default SpecifiedReports;
