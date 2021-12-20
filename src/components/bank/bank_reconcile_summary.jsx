import React from "react";
import LeftSidebar from "../left_sidebar";
import Footer from "../footer";
import Topbar from "../topbar";
import jQuery from "jquery";
import FetchAllApi from "../../api_links/fetch_all_api";
import moment from "moment";
import "datatables.net-dt/css/jquery.dataTables.css";
import config from "./../../api_links/api_links.jsx";
var _ = require("lodash");
var authorization_key = "O5mGIP3VNia0JvPH2IBiwA==";
const $ = require("jquery");
$.DataTable = require("datatables.net");

class BankReconcileSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBank: "",
      banks: [],
      selectedBankId: "",
      selectedBank1: "",
      banks: [],
      selectedBankId1: "",
      to_date: moment().format("YYYY") + "-12-31",
      bank_to_date: moment().format("YYYY") + "-12-31",
      bank_from_date: "2020-05-03",
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      genie_payments: [],
      genie_receipts: [],
      genie_bank_statements: [],
      total_genie_payments: 0,
      total_genie_receipts: 0,
      total_genie_bank_bal: 0,
      bank_statement_list: [],
      Opening_balance: 0,
      closing_balance: 0,
      reconcile_statements: [],
      reconcile_statement_bal: 0,
      balance_in_genie: 0,
      statement_balance: 0,
    };
  };

  changeFromDate = () => {
    let date = jQuery("#bank_from_date").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ bank_from_date: date_formated });
    }
  };

  changeToDate = async () => {
    let date = jQuery("#bank_to_date").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
     await this.setState({ bank_to_date: date_formated },()=>{console.log(this.state.bank_to_date)});
    }
  };


  changeDate = () => {
    let date = jQuery("#to_date").val();
    if (date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ to_date: date_formated });
    }
  };

  componentDidUpdate() {

    window.jQuery(".selectpicker").selectpicker("refresh");


  };
  componentWillMount() {
    if (
      this.state.logged_user_id === '' ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push('/')
    }
  };

  componentDidMount() {
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });
    fetch(config.getAllbanks, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
      body: JSON.stringify({
        client_id: this.state.logged_client_id,

      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          this.setState({ banks: data.data });
        }
      });

    // jQuery(window).on('load', function () {
    //   jQuery('.mscroll-y').mCustomScrollbar({
    //     axis: 'y',
    //     scrollEasing: 'linear',
    //     scrollInertia: 600,
    //     autoHideScrollbar: 'true',
    //     autoExpandScrollbar: 'true'
    //   })
    //   jQuery('.mscroll-x').mCustomScrollbar({
    //     axis: 'x',
    //     scrollEasing: 'linear',
    //     scrollInertia: 600,
    //     autoHideScrollbar: 'true',
    //     autoExpandScrollbar: 'true'
    //   })

    //   jQuery('.ib-scroll').mCustomScrollbar({
    //     scrollEasing: 'linear',
    //     scrollInertia: 600,
    //     scrollbarPosition: 'outside'
    //   })
    // })

    jQuery(".left-navmenu .has-sub").click(function () {
      jQuery(".left-navmenu li a").removeClass("active");
      jQuery(this).addClass("active");
      jQuery(".left-navmenu li a:not(.active)").siblings(".sub-menu").slideUp();
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
    jQuery('[data-toggle="tooltip"]').tooltip();

    jQuery(".collapse.in").each(function () {
      jQuery(this)
        .siblings(".panel-heading")
        .find(".accordion-arrow")
        .addClass("rotate");
    });

    // Toggle plus minus icon on show hide of collapse element
    jQuery(".collapse")
      .on("show.bs.collapse", function () {
        jQuery(this).parent().find(".accordion-arrow").addClass("rotate");
      })
      .on("hide.bs.collapse", function () {
        jQuery(this).parent().find(".accordion-arrow").removeClass("rotate");
      });

    jQuery(".create-trans").click(function () {
      jQuery(this).parents(".transact-item").addClass("blue");
    });
    jQuery(".match-trans").click(function () {
      jQuery(this).parents(".transact-item").removeClass("blue");
    });

    jQuery(".adjustment").click(function () {
      jQuery(".adjust-form").slideToggle(200);
    });

    jQuery(".adjust-form .remove-item").click(function () {
      jQuery(".adjust-form").slideUp(200);
    });

    jQuery(".find-match").click(function () {
      jQuery(".dark-overlay, .find-match-sec").addClass("active");
      jQuery("body").css("overflow-y", "hidden");
    });

    jQuery(".find-match-sec .close-btn, .dark-overlay").click(function () {
      jQuery(".dark-overlay, .find-match-sec").removeClass("active");
      jQuery("body").css("overflow-y", "auto");
    });

    jQuery(".reconcile-table")
      .on("change keyup keydown paste cut", "textarea", function () {
        jQuery(this).height(0).height(this.scrollHeight);
      })
      .find("textarea")
      .change();

    jQuery(".filter-btn").click(function () {
      jQuery(this).css("visibility", "hidden");
      jQuery(".report-filter").slideDown();
    });

    jQuery(".report-filter .close-btn").click(function () {
      jQuery(".filter-btn").css("visibility", "visible");
      jQuery(".report-filter").slideUp();
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
  }
  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  handleBankAccountChange = (e) => {
   
    this.state.banks.map((itm) => {
      if (e.target.value == itm.name) {
        this.setState({ selectedBank: itm.name, selectedBankId: itm.id });
      }
    })

    // this.handlereportData(e.id);
  };

  handlereportData = (i) => {
    fetch(config.get_reconcile_summary, {
      method: "POST",
      body: JSON.stringify({
        client_id: this.state.logged_client_id,
        selectedbank: i,
        to_date: this.state.to_date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("datass", data);
        if (data.status == 1) {
          this.setState({
            genie_payments: data.genie_payments,
            genie_receipts: data.genie_receipts,
            genie_bank_statements: data.bank_statements,
            total_genie_payments: data.genie_bal,
            total_genie_receipts: data.genie_recipt_bal,
            total_genie_bank_bal: data.bankl_bal,
            reconcile_statements: data.reconcile_statements,
            reconcile_statement_bal: data.reconcile_statement_bal,
            balance_in_genie: data.balance_in_genie,
            statement_balance: data.statement_balance,
          });
        }else{
          alert(data.message)
        }
      });
  };

  handleBankAccountChange1 = (e) => {
    this.state.banks.map((itm) => {
      if (e.target.value == itm.name) {
        this.setState({ selectedBank1: itm.name, selectedBankId1: itm.id });
      }
    })
    // this.setState({ selectedBank1: e.name, selectedBankId1: e.id });
    // this.handlereportData(e.id);
  };

  getBankStatements = (i) => {
    this.setState({ bank_statements: [] });
    fetch(config.get_bank_statement_summary, {
      method: "POST",
      body: JSON.stringify({
        client_id: this.state.logged_client_id,
        selectedbank: this.state.selectedBankId1,
        to_date: this.state.bank_to_date,
        from_date: this.state.bank_from_date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("datass", data);
        if (data.status == 1) {
          this.setState({
            Opening_balance: data.opening_bal,
            closing_balance: data.closing_bal,
            bank_statement_list: data.transation_list,
          });
        }else{
          alert(data.message)
        }
      });
  };

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {/* left-navbar Starts here */}
          <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />
          <div className="menu-close visible-xs">&nbsp;</div>
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
              <a href="javascript:;" className="back hidden-xs" onClick={() => this.props.history.goBack()}>
                <img src="images/back-arrow-blue.svg" />
              </a>
              {/* <span class="page-title hidden-xs">Preference</span> */}
              <ul className="list-unstyled breadcrumb page-title hidden-xs">
                <li>
                  <a href="javascript:;">Banking</a>
                </li>
                <li>Reconciliation Report</li>
              </ul>
              <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
            </div>
            {/* Top bar Ends here */}
            <div className="col-md-12 col-xs-12 mar-top visible-xs">
              <a href="javascript:;" className="back">
                <img src="images/back-arrow-blue.svg" />
              </a>
              <span className="page-title">Reconciliation Report</span>
            </div>
            {/* content-top Starts here */}
            <div className="content-top col-md-12 col-xs-12">
              <ul className="nav nav-pills transparent nowrap">
                <li className="active">
                  <a data-toggle="pill" href="#reconciliation-summary">
                    Reconciliation Summary
                  </a>
                </li>
                <li>
                  <a data-toggle="pill" href="#bank-statement">
                    Bank Statement
                  </a>
                </li>
                {/* <li><a data-toggle="pill" href="#statement-exception">Statement Exceptions</a></li> */}
              </ul>
            </div>
            {/* content-top Starts here */}
            {/* Main Content Starts here */}
            <div className="main-content col-md-12 col-xs-12">
              <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                <div className="tab-content">
                  <div
                    id="reconciliation-summary"
                    className="tab-pane fade in active"
                  >
                    <form className="custom-form mh row">
                      <div className="form-group col-md-3 col-xs-12">
                        <label>Bank Accounts</label>




                        <select className="selectpicker form-control hh " onChange={(e) =>
                          this.handleBankAccountChange(e)
                        }>

                          <option value="">choose...</option>
                          {this.state.banks.map((e) => {
                            return (
                              <option
                                className={
                                  e.name === this.state.selectedBank
                                    ? "active"
                                    : ""
                                }
                                value={e.name}
                              >

                                {e.name}

                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* <div className="form-group col-md-3 col-xs-12">
                        <label>To Date</label>
                        <div className="input-group  mar-t-no">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.to_date}
                            onBlur={(e) => {
                              this.setState({ to_date: e.target.value });
                            }}
                          />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      */}

                      <div className="form-group col-md-3">
                        <label>To Date<span className="astrick">*</span></label>
                        <div className="input-group date mar-t-no">
                        <input
                            type="text"
                            autoComplete="off"
                            name="bank_to_date"
                            id="bank_to_date"
                            onBlur={(e) => {
                              let value = e.target.value
                              setTimeout(() => {
                                this.changeToDate(value)
                              }, 500);
                            }
                            }
                            className="form-control"
                            required
                          />

                          <div className="input-group-addon"
                            onClick={() => jQuery('#to_date').focus()}>
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                        <small className="text-red"></small>
                      </div>

                      <div className="form-group col-md-3 col-xs-12">
                        <button
                          type="button"
                          className="btn btn-green label-eq"
                          onClick={() =>
                            this.handlereportData(this.state.selectedBankId)
                          }
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                    <div className="report-table reconcile-table reconcile-report col-md-12 col-xs-12 pad-no">
                      <div className="table-responsive">
                        <table className="table detail-report">
                          <thead>
                            <tr>
                              <th>
                                Date
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                              <th>
                                No#
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                              <th>
                                Name
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                              <th className="memo">
                                Reference
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                              <th className="text-right">
                                Balance
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-head">
                              <td>01-01-2021</td>
                              <td />
                              <td />
                              <td>Balance in Genie</td>
                              <td className="text-right">
                              {this.state.balance_in_genie}
                              </td>
                            </tr>
                            <tr className="title">
                              <td colSpan={5}>Outstanding Genie Payments</td>
                            </tr>
                            {this.state.genie_payments.map((item, i) => {
                              return (
                                <tr className="item-step1">
                                  <td>{item.payment_date}</td>
                                  <td>{item.id}</td>
                                  <td>{item.name}</td>
                                  <td>{item.reference_number}</td>
                                  <td className="text-right">
                                    {item.total_payment_home_currency}
                                  </td>
                                </tr>
                              );
                            })}

                            <tr className="item-step1 title">
                              <td colSpan={4}>
                                Total Outstanding Genie Payments
                              </td>
                              <td className="text-right">
                                {this.state.total_genie_payments.toFixed(2)}
                              </td>
                            </tr>
                            <tr className="title">
                              <td colSpan={5}>Outstanding Genie Receipts</td>
                            </tr>
                            {this.state.genie_receipts.map((item, i) => {
                              return (
                                <tr className="item-step1">
                                  <td>{item.payment_date}</td>
                                  <td>{item.id}</td>
                                  <td>{item.vendor_name}</td>
                                  <td>{item.reference_number}</td>
                                  <td className="text-right">
                                    {item.total_payment_home_currency}
                                  </td>
                                </tr>
                              );
                            })}

                            <tr className="item-step1 title">
                              <td colSpan={4}>
                                Total Outstanding Genie Receipts
                              </td>
                              <td className="text-right">
                                {this.state.total_genie_receipts}
                              </td>
                            </tr>
                            <tr className="title">
                              <td colSpan={5}>
                                Un-Reconciled Bank Statement Lines Payments
                              </td>
                            </tr>
                            {this.state.genie_bank_statements.map((item, i) => {
                              return (
                                <tr className="item-step1">
                                  <td>{item.date}</td>
                                  <td>{item.id}</td>
                                  <td>{item.payee}</td>
                                  <td>{item.reference}</td>
                                  <td className="text-right">
                                    {item.debit != 0
                                      ? "-" + item.debit
                                      : item.credit}
                                  </td>
                                </tr>
                              );
                            })}
                            <tr className="item-step1 title">
                              <td colSpan={4}>
                                Total Un-Reconciled Statement Lines Payments
                              </td>
                              <td className="text-right">
                                {this.state.total_genie_bank_bal}
                              </td>
                            </tr>

                            <tr className="title">
                              <td colSpan={5}>
                                Un-Reconciled Bank Statement Lines Receipts
                              </td>
                            </tr>
                            {this.state.reconcile_statements.map((item, i) => {
                              return (
                                <tr className="item-step1">
                                  <td>{item.date}</td>
                                  <td>{item.id}</td>
                                  <td>{item.payee}</td>
                                  <td>{item.reference}</td>
                                  <td className="text-right">
                                    {item.debit != 0
                                      ? "-" + item.debit
                                      : item.credit}
                                  </td>
                                </tr>
                              );
                            })}
                            <tr className="item-step1 title">
                              <td colSpan={4}>Un-Reconciled Statement Lines Receipts</td>
                              <td className="text-right">
                                {this.state.reconcile_statement_bal}
                              </td>
                            </tr>

                            <tr className="bg-head">
                              <td>{moment(this.state.bank_to_date).format("DD-MM-YYYY")}</td>
                              <td />
                              <td />
                              <td>Statement Balance</td>
                              <td className="text-right">{this.state.statement_balance}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="pf-btm-wrap">
                      <div className="col-md-12 col-xs-12 text-right pad-no">
                        <button className="btn btn-empty ico">
                          <img src="images/print-icon.svg" alt="icon" />
                          Print
                        </button>
                        <div className="dropdown menu-item more">
                          <button
                            className="btn btn-green dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                          >
                            Export
                            <span className="caret" />
                          </button>
                          <ul className="dropdown-menu align-right">
                            <li>
                              <a href="javascript:;">Export as CSV</a>
                            </li>
                            <li>
                              <a href="javascript:;">Export as PDF</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="bank-statement" className="tab-pane fade in">
                    <form className="custom-form mh row">
                      <div className="form-group col-md-3 col-xs-12">
                        <label>Bank Accounts</label>
                        <select className="selectpicker form-control hh " onChange={(e) =>
                          this.handleBankAccountChange1(e)
                        }>

                          <option value="">choose...</option>
                          {this.state.banks.map((e) => {
                            return (
                              <option
                                className={
                                  e.name === this.state.selectedBank
                                    ? "active"
                                    : ""
                                }
                                value={e.name}
                              >

                                {e.name}

                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {/* <div className="form-group col-md-3 col-xs-12">
                        <label>From Date</label>
                        <div className="input-group  mar-t-no">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.bank_from_date}
                            onChange={(e) => {
                              this.setState({ bank_from_date: e.target.value });
                            }}
                          />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-3 col-xs-12">
                        <label>To Date</label>
                        <div className="input-group mar-t-no">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.bank_to_date}
                            onChange={(e) => {
                              this.setState({ bank_to_date: e.target.value });
                            }}
                          />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                      </div> */}

                      <div className="form-group col-md-3 col-xs-12">
                        <label>From Date<span className="astrick">*</span></label>
                        <div className="input-group date mar-t-no">
                          <input
                            type="text"
                            autoComplete="off"
                            name="bank_from_date"
                            id="bank_from_date"
                            onBlur={(e) => {
                              let value = e.target.value
                              setTimeout(() => {
                                this.changeFromDate(value)
                              }, 500);
                            }
                            }
                            className="form-control"
                            required
                          />

                          <div className="input-group-addon"
                            onClick={() => jQuery('#bank_from_date').focus()}>
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                        <small className="text-red"></small>
                      </div>

                      <div className="form-group col-md-3 col-xs-12">
                        <label>To Date<span className="astrick">*</span></label>
                        <div className="input-group date mar-t-no">
                          <input
                            type="text"
                            autoComplete="off"
                            name="bank_to_date"
                            id="bank_to_date"
                            onBlur={(e) => {
                              let value = e.target.value
                              setTimeout(() => {
                                this.changeToDate(value)
                              }, 500);
                            }
                            }
                            className="form-control"
                            required
                          />

                          <div className="input-group-addon"
                            onClick={() => jQuery('#bank_to_date').focus()}>
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                        <small className="text-red"></small>
                      </div>
                      <div className="form-group col-md-3 col-xs-12">
                        <button
                          type="button"
                          onClick={() => this.getBankStatements()}
                          className="btn btn-green label-eq"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                    <div className="report-table reconcile-table reconcile-report col-md-12 col-xs-12 pad-no">
                      {/* <label className="custom-checkbox small">
                        <input type="checkbox" />
                        Reconciled Only
                        <span className="checkmark" />
                      </label> */}
                      <div className="table-responsive mar-top">
                        <table className="table detail-report">
                          <thead>
                            <tr>
                              <th>
                                Date
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                              <th>
                                No#
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                              <th>
                                Name
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                              <th className="memo">
                                Memo
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                              <th className="text-center">
                                Reconciled
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                              <th className="text-right">
                                Amount
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                              <th className="text-right">
                                Balance
                                <i className="th-sort">
                                  <img
                                    src="images/sort-icon.svg"
                                    alt="SortIcon"
                                  />
                                </i>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-head">
                              <td>01-06-2020</td>
                              <td />
                              <td />
                              <td>Opening Balance</td>
                              <td />
                              <td />
                              <td className="text-right">
                                {this.state.Opening_balance}
                              </td>
                            </tr>
                            {this.state.bank_statement_list.map((item, i) => {
                              return (
                                <tr>
                                  <td>{item.date}</td>
                                  <td>{item.no}</td>
                                  <td>{item.name}</td>
                                  <td>{item.ref}</td>
                                  <td className="text-center">
                                    {item.reconciled}
                                  </td>
                                  <td className="text-right">{item.amount}</td>
                                  <td className="text-right">{item.balance}</td>
                                </tr>
                              );
                            })}

                            <tr className="bg-head">
                              <td>05-06-2020</td>
                              <td />
                              <td />
                              <td>Closing Balance</td>
                              <td />
                              <td />
                              <td className="text-right">
                                {this.state.closing_balance}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="pf-btm-wrap">
                      <div className="col-md-12 col-xs-12 text-right pad-no">
                        <button className="btn btn-empty ico">
                          <img src="images/print-icon.svg" alt="icon" />
                          Print
                        </button>
                        <div className="dropdown menu-item more">
                          <button
                            className="btn btn-green dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                          >
                            Export
                            <span className="caret" />
                          </button>
                          <ul className="dropdown-menu align-right">
                            <li>
                              <a href="javascript:;">Export as CSV</a>
                            </li>
                            <li>
                              <a href="javascript:;">Export as PDF</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="statement-exception" className="tab-pane fade in">
                    <form className="custom-form mh row">
                      <div className="form-group col-md-3 col-xs-12">
                        <label>Bank Accounts</label>
                        <div className="custom-select-drop dropdown">
                          <a
                            aria-expanded="false"
                            aria-haspopup="true"
                            role="button"
                            data-toggle="dropdown"
                            className="dropdown-toggle btn form-control w-auto"
                            href="javascript:;"
                          >
                            <span id="selected">DBS Bank</span>
                            <span className="caret" />
                          </a>
                          <ul className="dropdown-menu align-right">
                            <li className="active">
                              <a href="javascript:;">DBS Bank</a>
                            </li>
                            <li>
                              <a href="javascript:;">Yes Bank</a>
                            </li>
                            <li>
                              <a href="javascript:;">Bank One</a>
                            </li>
                            <li>
                              <a href="javascript:;">Bank Two</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="form-group col-md-3 col-xs-12">
                        <label>To Date</label>
                        <div
                          className="input-group date mar-t-no"
                          data-date-format="dd/mm/yyyy"
                        >
                         <input
                            type="text"
                            autoComplete="off"
                            name="bank_to_date"
                            id="bank_to_date"
                            onBlur={(e) => {
                              let value = e.target.value
                              setTimeout(() => {
                                this.changeToDate(value)
                              }, 500);
                            }
                            }
                            className="form-control"
                            required
                          />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-3 col-xs-12">
                        <button
                          type="submit"
                          className="btn btn-green label-eq"
                        >
                          Submit
                        </button>
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
    );
  }
}

export default BankReconcileSummary;
