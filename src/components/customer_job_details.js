import React from "react";
import LeftSidebar from "./left_sidebar";
import Footer from "./footer";
import moment from "moment";
import Topbar from "./topbar";

import FetchAllApi from "../api_links/fetch_all_api";

import jQuery from "jquery";
// import 'bootstrap';
// import 'bootstrap-select';

class CustomerJobDetails extends React.Component {
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
      dropdown: "",
      inbox_list: [],
      response_stus: 0,
      response_msg: "No data found",
      item_details: "",
      item_file_path: "",
      waiting_re: [],
      re_assigned: [],
      customerListArray: [],
      TotalPages: [],
      pgNo: "10",
      customer_Transaction: [],
      Recent_items: [],
      Recent_items_payment: [],
      Basic_info: [],
      customerDetails: [],
      table_Rows: "",
      jobname: "",
      fromDate: "2020-01-01",
      toDate: "2020-01-31",
      isSuccessful: false,
      isWarning: false,
      res_msg: "",
      response_to_inactive: "",
    };
  }

  deleteCustomer_job = (statuscode) => {
    let client_id = this.state.logged_client_id;
    let customer_id = this.props.location.state[0];
    let status_to_set = statuscode;
    let job_id = this.props.location.state[1];
    FetchAllApi.deleteCustomer_job(
      client_id,
      customer_id,
      job_id,
      status_to_set,
      (err, response) => {
        // alert(response.response.length)
        if (response.status === 1) {
          window.jQuery("#pop_add_notes").modal("hide");

          // this.props.history.push('/customers-list')
          this.setState(
            { isSuccessful: true, res_msg: response.message },
            () => {
              setTimeout(() => {
                this.setState({ isSuccessful: true });
                this.props.history.push("/customers-list");
              }, 1500);
            }
          );
        }
        if (response.status === 2) {
          this.setState({ response_to_inactive: response.message }, () => {
            window.jQuery("#pop_add_notes").modal("show");
          });
        }

        if (response.status === 0) {
          this.setState(
            { isSuccessful: true, isWarning: true, res_msg: response.message },
            () => {
              setTimeout(() => {
                this.setState({ isWarning: true });
              }, 1500);
            }
          );
        }
      }
    );
  };
  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass("minimize_leftbar");
    //console.log("logged_user_id", this.state.logged_user_id);

    jQuery("title").html("Customer | GBSC");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }

    // this.get_inbox_list()
  }

  routedChange(parameter) {
    this.props.history.push("/" + parameter);
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  }

  componentDidMount() {
    this.customer_details();
    this.Recent_Items();
    this.Basic_info();
    // this.getJobList()
    this.getNotes();

    console.log("properties_result", this.state.properties_result);

    window.jQuery(".select-picker").selectpicker();

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

  customer_details = (id) => {
    let client_id = this.state.logged_client_id;
    let customer_id = this.props.location.state[0];
    let job_id = this.props.location.state[1];
    let fromDate = this.state.fromDate;
    let toDate = this.state.toDate;
    let show_id;
    if (id == undefined) {
      show_id = 1;
    } else {
      show_id = id;
    }

    FetchAllApi.job_Transaction(
      client_id,
      customer_id,
      fromDate,
      toDate,
      job_id,
      show_id,
      (err, response) => {
        // alert(response.response.length)
        if (response.status === 1) {
          console.log("consoleme", response);
          this.setState({ customer_Transaction: response.response });
        } else {
          this.setState({ customer_Transaction: [] });
        }
      }
    );
  };

  Basic_info = () => {
    let client_id = this.state.logged_client_id;
    let customer_id = this.props.location.state[0];
    let job_id = this.props.location.state[1];

    FetchAllApi.Basic_info_job(
      client_id,
      customer_id,
      job_id,
      (err, response) => {
        if (response.status === 1) {
          console.log("BasicinfoBasic_info_job", response);
          this.setState({
            Basic_info: response.response,
            customerDetails: response.updatelist,
            jobname: response.response[0].job_name,
          });
        } else {
        }
      }
    );
  };

  Recent_Items = () => {
    let client_id = this.state.logged_client_id;
    let customer_id = this.props.location.state[0];
    let job_id = this.props.location.state[1];

    FetchAllApi.Recent_Items_job(
      client_id,
      customer_id,
      job_id,
      (err, response) => {
        // alert(response.response.length)
        if (response.status === 1) {
          console.log("RecentItems", response);
          this.setState({
            Recent_items: response.response,
            Recent_items_payment: response.payment,
          });
          console.log("Recent1Items", this.state.Recent_items);
        } else {
        }
      }
    );
  };

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  dataTaggingFunc(list_id, file_id) {
    this.props.history.push("/data_tagging/" + list_id + "/" + file_id);
    window.scrollTo(0, 0);
  }
  // get_inbox_list = () => {
  //   var page_no = 1
  //   var items_limit = 10
  //   var filter_status = ''
  //   var client_id = ''

  //   FetchAllApi.inboxList(
  //     page_no,
  //     items_limit,
  //     filter_status,
  //     client_id,
  //     (err, response) => {
  //       console.log('Article Data', response.message)
  //       if (response.status === 1) {
  //         this.setState({
  //           inbox_list: response.list,
  //           response_msg: response.message,
  //           response_stus: response.status
  //         })
  //         jQuery('.item-listwrap').css('display', 'block')
  //         jQuery('.inbox-right').css('display', 'flex')
  //         jQuery('.no_rec').css('display', 'none')
  //       } else {
  //         jQuery('.item-listwrap, .inbox-right').css('display', 'none')
  //         jQuery('.no_rec').css('display', 'block')
  //       }
  //     }
  //   )
  // }
  changedatevalue(seleteddateformat) {
    var dateresult = moment();
    let from_date, to_date;

    if (seleteddateformat === "This Month-to-date") {
      from_date = dateresult.startOf("month");
      this.state.start_date = from_date.format("YYYY-MM-DD");
      // alert(from_date.format('YYYY-MM-DD'))
      this.setState(
        {
          fromDate: from_date.format("YYYY-MM-DD"),
          toDate: moment(new Date()).format("YYYY-MM-DD"),
        },
        () => {
          this.customer_details();
        }
      );
    } else if (seleteddateformat === "This Week") {
      from_date = dateresult.startOf("week");

      this.state.start_date = from_date.format("YYYY-MM-DD");
      console.log("startdate", this.state.start_date);
      to_date = dateresult.endOf("week");

      // from_date = dateresult.startOf('week')
      this.setState(
        {
          fromDate: from_date.format("YYYY-MM-DD"),
          toDate: dateresult.endOf("week"),
        },
        () => {
          this.customer_details();
        }
      );

      // this.state.start_date = from_date.format('YYYY-MM-DD')
      // console.log('startdate', this.state.start_date)
      // to_date = dateresult.endOf('week')
    } else if (seleteddateformat === "This Month") {
      from_date = dateresult.startOf("month");
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("month");
      this.state.end_date = to_date.format("YYYY-MM-DD");
      this.setState(
        {
          fromDate: from_date.format("YYYY-MM-DD"),
          toDate: to_date.format("YYYY-MM-DD"),
        },
        () => {
          this.customer_details();
        }
      );
    } else if (seleteddateformat === "This Week-to-date") {
      from_date = dateresult.startOf("week");
      this.state.start_date = from_date.format("YYYY-MM-DD");

      this.state.end_date = moment(new Date()).format("YYYY-MM-DD");
      this.setState(
        {
          fromDate: from_date.format("YYYY-MM-DD"),
          toDate: moment(new Date()).format("YYYY-MM-DD"),
        },
        () => {
          this.customer_details();
        }
      );
    } else if (seleteddateformat === "This Year") {
      from_date = dateresult.startOf("year");
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("year");
      this.state.end_date = to_date.format("YYYY-MM-DD");
      this.setState(
        {
          fromDate: from_date.format("YYYY-MM-DD"),
          toDate: to_date.format("YYYY-MM-DD"),
        },
        () => {
          this.customer_details();
        }
      );
    } else if (seleteddateformat === "This Year-to-date") {
      from_date = dateresult.startOf("year");
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = moment(new Date()).format("YYYY-MM-DD");
      this.state.end_date = to_date;
      this.setState(
        {
          fromDate: from_date.format("YYYY-MM-DD"),
          toDate: to_date,
        },
        () => {
          this.customer_details();
        }
      );
    }
    // let startDate = jQuery('#fromdate').val()
    // let end_date = jQuery('#todate').val()
    // this.setState({ start_date: startDate, end_date: end_date }, () => {
    // })
  }

  getItemDetails(list_id) {
    var status = 0;
    var client_id = this.state.logged_client_id;

    this.setState({
      list_id: list_id,
    });

    FetchAllApi.getItemDetails(list_id, status, client_id, (err, response) => {
      //console.log('Category Subcat Data', response);
      jQuery(".inbox-item").removeClass("active");
      if (response.status === 1) {
        jQuery("#list-" + list_id).addClass("active");
        jQuery("#inboxRgt").removeClass("inboxRgtDisp");
        jQuery("#inboxLft").removeClass("fluid");

        this.setState({
          item_details: response.details,
          item_file_path: response.details.file_path,
          item_file_id: response.details.attachments,
        });

        if (response.details.previous_record !== "") {
          jQuery("#prev").removeClass("in-active");
        } else {
          jQuery("#prev").addClass("in-active");
        }
        if (response.details.next_record !== "") {
          jQuery("#next").removeClass("in-active");
        } else {
          jQuery("#next").addClass("in-active");
        }
      } else {
        jQuery("#inboxRgt").addClass("inboxRgtDisp");
      }
    });
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }
  getNotes = (searchKey) => {
    let customer_id = this.props.location.state[0];
    let client_id = this.state.logged_client_id;
    let search = searchKey;
    let job_id = this.props.location.state[1];
    FetchAllApi.getNotes(
      client_id,
      customer_id,
      search,
      job_id,
      (err, response) => {
        if (response.status === 1) {
          this.setState({
            notesArray: response.response,
          });
        } else {
        }
      }
    );
  };
  getJobList = () => {
    let customer_id = this.props.location.state[0];
    let client_id = this.state.logged_client_id;
    FetchAllApi.getJobList(client_id, customer_id, (err, response) => {
      if (response.status === 1) {
        console.log("Basicinfostate=>>>>>>>>>>>", response.response);
        let items = response.response;

        const renderJobList = (items) => {
          return items.map((item) => {
            return (
              <React.Fragment>
                <tr className="item-step1">
                  <td className="">
                    <span>{item.job_name}</span>
                  </td>
                  <td className="">
                    <span>{item.currency}</span>
                  </td>
                  <td className="">
                    <span>{item.opening_balance}</span>
                  </td>
                  <td className="">
                    <span>{item.price_level}</span>
                  </td>
                </tr>
                {item.children ? renderJobList(item.children) : null}
              </React.Fragment>
            );
          });
        };

        let table_Rows = renderJobList(items);
        // this.setState({ table_Rows: table_Rows })
      } else {
      }
    });
  };

  render() {
    var jobname;
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar
              history={this.props.history}
              pageSubmit={(e) => this.pageLink(e)}
            />

            <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
              <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <div className="nav-brand-res visible-xs">
                  <img
                    className="img-responsive"
                    src="../images/logo-icon.png"
                    alt="LogoIcon"
                  />
                </div>
                <a href="javascript:;" class="back hidden-xs">
                  <img
                    src="../images/back-arrow-blue.svg"
                    onClick={() => {
                      this.props.history.push("/customers-list");
                    }}
                  />
                </a>
                {/* <span className='page-title hidden-xs'>Inbox</span> */}
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li>
                    <a href="javascript: ;">Customers</a>
                  </li>
                  <li>Job List</li>
                </ul>
                <Topbar
                  history={this.props.history}
                  logoutSubmit={(e) => this.logoutLink()}
                />
              </div>

              <div className="content-top col-md-12 col-xs-12 pad-b-no">
                <div className="col-md-12 col-xs-12">
                  <div className="row">
                    <h4 className="fw-sbold mar-t-no pull-left">
                      {this.state.jobname}{" "}
                    </h4>
                    <div className="pull-right">
                      <button
                        className="btn btn-white pull-left mar-rgt-5"
                        // onClick={() => {
                        //   this.props.history.push('/add-new-customer', {
                        //     ...this.state.customerDetails
                        //   })
                        // }}
                      >
                        Edit
                      </button>
                      <div className="dropdown menu-item new-cus pull-left mar-rgt-5">
                        <button
                          className="btn btn-white dropdown-toggle btn-arrow"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          More
                          <span className="caret" />
                        </button>
                        <ul className="dropdown-menu align-right">
                          <li>
                            <a
                              href="javascript:;"
                              onClick={() => {
                                this.deleteCustomer_job(0);
                              }}
                            >
                              Delete
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:;"
                              onClick={() => {
                                this.props.history.push("/add-job", [
                                  this.props.location.state[0],
                                  this.props.location.state[1],
                                ]);
                              }}
                            >
                              Add Customer Job
                            </a>
                          </li>
                          <li
                            onClick={() => {
                              this.props.history.push("/edit-job", {
                                ...this.state.customerDetails,
                              });
                            }}
                          >
                            <a href="javascript:;">Edit Customer Job</a>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown menu-item new-cus pull-left mar-rgt-5">
                        <button
                          className="btn btn-blue dropdown-toggle btn-arrow"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          New
                          <span className="caret" />
                        </button>
                        <ul className="dropdown-menu align-right">
                          <li>
                            <a href="/create_invoice">Create Invoices</a>
                          </li>
                          <li>
                            <a href="/create_estimate">Create Quotations</a>
                          </li>
                          {/* <li>
                            <a href="javascript:;">Show Quotations</a>
                          </li> */}
                          <li>
                            <a href="/create_salesorder">Create Sales Orders</a>
                          </li>
                          <li>
                            <a href="/Customer_receive_payment">
                              Receive Payments
                            </a>
                          </li>
                          <li>
                            <a href="/Make_depo_test">Make Deposit</a>
                          </li>
                          <li>
                            <a href="javascript:;">Enter Sales Receipts</a>
                          </li>
                          <li>
                            <a href="javascript:;">Enter Statement Charge</a>
                          </li>
                          <li>
                            <a href="/create_creditmemo">
                              Create Credit Memos / Refunds
                            </a>
                          </li>
                          <li>
                            <a href="javascript:;">Create Statements</a>
                          </li>
                          <li>
                            <a href="javascript:;">Assess Finance Charge</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-xs-12">
                  <div className="row">
                    <ul className="nav nav-tabs">
                      <li role="presentation" className="active">
                        <a data-toggle="tab" href="#basic-info">
                          Basic Information
                        </a>
                      </li>

                      <li role="presentation">
                        <a data-toggle="tab" href="#transaction">
                          Transactions
                        </a>
                      </li>
                      <li role="presentation">
                        <a data-toggle="tab" href="#notes">
                          Notes
                        </a>
                      </li>
                      <li role="presentation">
                        <a data-toggle="tab" href="#recent-items">
                          Recent Items
                        </a>
                      </li>
                      <li role="presentation">
                        <a data-toggle="tab" href="#statement">
                          Statement
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="main-content col-md-12 col-xs-12">
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                  <div className="tab-content">
                    <div id="basic-info" className="tab-pane fade in active">
                      {this.state.Basic_info &&
                        this.state.Basic_info.map((item, i) => {
                          jobname = item.job_name;
                          return (
                            <React.Fragment>
                              <div className="row dflex mar-btm">
                                <div className="col-md-6 col-md-12">
                                  <h4 className="info-title">Overview</h4>
                                  <div className="col-md-12 info-block">
                                    <div className="row text-right">
                                      <a href="javascript:;" className="edit">
                                        Edit
                                      </a>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Company Name
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.company_name != "" &&
                                        item.company_name != undefined
                                          ? item.company_name
                                          : "--"}
                                      </span>
                                    </div>
                                    {/* <div className='row mar-btm'>
                                      <span className='col-md-4 sub'>
                                        Customer Type
                                      </span>
                                      <span className='col-md-8 main'>
                                        {item.customer_type != '' &&
                                        item.customer_type != undefined
                                          ? item.customer_type
                                          : '--'}
                                      </span>
                                    </div>
                                     */}
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Business Reg No.
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.bus_reg != "" &&
                                        item.bus_reg != undefined
                                          ? item.bus_reg
                                          : "--"}
                                      </span>
                                    </div>
                                    {/* <div className='row mar-btm'>
                                      <span className='col-md-4 sub'>
                                        Currency
                                      </span>
                                      <span className='col-md-8 main'>
                                        {item.currency != '' &&
                                        item.currency != undefined
                                          ? item.currency
                                          : '--'}
                                      </span>
                                    </div>
                                   */}
                                    {/* <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Opening Balance
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.opening_balance != "" &&
                                        item.opening_balance != undefined
                                          ? item.opening_balance
                                          : "--"}
                                      </span>
                                    </div> */}
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Website
                                      </span>
                                      <span className="col-md-8 main">
                                        <a href="javascript:;">
                                          {item.website != "" &&
                                          item.website != undefined
                                            ? item.website
                                            : "--"}
                                        </a>
                                      </span>
                                    </div>
                                    <hr />

                                    {item.contact_details.length > 0 && (
                                      <React.Fragment>
                                        <div className="row mar-btm">
                                          {item.contact_details && (
                                            <React.Fragment>
                                              <span className="col-md-4 sub">
                                                Contact Persons
                                              </span>
                                              <span className="col-md-8 main">
                                                {item.contact_details.map(
                                                  (a, b) => {
                                                    // alert(b)
                                                    return (
                                                      <React.Fragment>
                                                        {
                                                          (a.is_primary = 1 && (
                                                            <label className="label label-danger">
                                                              Primary
                                                            </label>
                                                          ))
                                                        }
                                                        <br />
                                                        {a.name}
                                                        <span>
                                                          <a href="tel:(713)-090-0558">
                                                            {a.phone_work}
                                                          </a>
                                                        </span>
                                                        <span>
                                                          <a href="tel:(842)-294-8453">
                                                            {a.phone_personal}
                                                          </a>
                                                        </span>
                                                        <span>
                                                          <a href="mailto:johndoe.fifthrouge@gmail.com">
                                                            {a.email}
                                                          </a>
                                                        </span>
                                                        <br />
                                                      </React.Fragment>
                                                    );
                                                  }
                                                )}
                                              </span>
                                              <br />
                                            </React.Fragment>
                                          )}
                                        </div>
                                      </React.Fragment>
                                    )}

                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Billing Address
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.company_name}
                                        <span>
                                          {item.billing_address != "" &&
                                          item.billing_address != undefined
                                            ? item.billing_address
                                            : "--"}
                                        </span>
                                      </span>
                                    </div>
                                    {/* <div className='row'>
                                      <span className='col-md-4 sub'>
                                        Shipping Address
                                      </span>
                                      <span className='col-md-8 main'>
                                        {item.company_name}
                                        <span>{item.shipping_address}</span>
                                      </span>
                                    </div> */}
                                    {item.address_details.length > 0 && (
                                      <div className="row">
                                        <span className="col-md-4 sub">
                                          Shipping Address
                                        </span>

                                        {item.address_details &&
                                          item.address_details.map((x, y) => {
                                            return (
                                              <span className="col-md-8 main">
                                                {item.company_name}
                                                <span>
                                                  {x.shipping_address}
                                                </span>
                                              </span>
                                            );
                                          })}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-6 col-md-12">
                                  <h4 className="info-title">
                                    Finance Details
                                  </h4>
                                  <div className="col-md-12 info-block">
                                    <div className="row text-right">
                                      <a href="javascript:;" className="edit">
                                        Edit
                                      </a>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Bank Acc No.
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.bank_account_no != "" &&
                                        item.bank_account_no != undefined
                                          ? item.bank_account_no
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Credit Limit
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.creditlimit != "" &&
                                        item.creditlimit != undefined
                                          ? item.creditlimit
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Price Level
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.price_level != "" &&
                                        item.price_level != undefined
                                          ? item.price_level
                                          : "--"}
                                      </span>
                                    </div>

                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Payment Terms
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.payment_terms != "" &&
                                        item.payment_terms != undefined
                                          ? item.payment_terms
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Delivery Method
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.delivery_method != "" &&
                                        item.delivery_method != undefined
                                          ? item.delivery_method
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Payment Method
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.payment_method != "" &&
                                        item.payment_method != undefined
                                          ? item.payment_method
                                          : "--"}
                                      </span>
                                    </div>
                                    <hr />
                                    <div className="row mar-btm">
                                      <span className="col-md-12 col-xs-12 sub-title">
                                        Sales Information
                                      </span>
                                      <span className="col-md-4 sub">Tax</span>
                                      <span className="col-md-8 main">
                                        {item.sales_tax != "" &&
                                        item.sales_tax != undefined
                                          ? item.sales_tax
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Default Account
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.sales_default != "" &&
                                        item.sales_default != undefined
                                          ? item.sales_default
                                          : "--"}
                                      </span>
                                    </div>
                                    <hr />
                                    <div className="row mar-btm">
                                      <span className="col-md-12 col-xs-12 sub-title">
                                        Purchase Information
                                      </span>
                                      <span className="col-md-4 sub">Tax</span>
                                      <span className="col-md-8 main">
                                        {item.purchase_tax}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Default Account
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.purchase_default != "" &&
                                        item.purchase_default != undefined
                                          ? item.purchase_default
                                          : "--"}
                                      </span>
                                    </div>
                                    <hr />
                                    <div className="row mar-btm">
                                      <span className="col-md-12 col-xs-12 sub-title">
                                        Tax Information
                                      </span>
                                      <span className="col-md-4 sub">
                                        Tax ID
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.taxID != "" &&
                                        item.taxID != undefined
                                          ? item.taxID
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Default Sales Tax
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.default_sales_tax != "" &&
                                        item.default_sales_tax != undefined
                                          ? item.default_sales_tax
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row">
                                      <span className="col-md-4 sub">
                                        Default Purchase Tax
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.default_purchase_tax != "" &&
                                        item.default_purchase_tax != undefined
                                          ? item.default_purchase_tax
                                          : "--"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row dflex">
                                <div className="col-md-6 col-md-12">
                                  <h4 className="info-title">
                                    Additional Information
                                  </h4>
                                  <div className="col-md-12 info-block">
                                    <div className="row text-right">
                                      <a href="javascript:;" className="edit">
                                        Edit
                                      </a>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Referral From
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.referral_from != "" &&
                                        item.referral_from != undefined
                                          ? item.referral_from
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">Rep</span>
                                      <span className="col-md-8 main">
                                        {item.rep != "" && item.rep != undefined
                                          ? item.rep
                                          : "--"}
                                      </span>
                                    </div>
                                    <hr />
                                    <div className="row mar-btm">
                                      <span className="col-md-12 col-xs-12 sub-title">
                                        Job Information
                                      </span>
                                      <span className="col-md-4 sub">Type</span>
                                      <span className="col-md-8 main">
                                        {item.job_type != "" &&
                                        item.job_type != undefined
                                          ? item.job_type
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Status
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.job_status != "" &&
                                        item.job_status != undefined
                                          ? item.job_status
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Start Date
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.job_start_date != "" &&
                                        item.job_start_date != undefined
                                          ? item.job_start_date
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        End Date
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.job_end_date != "" &&
                                        item.job_end_date != undefined
                                          ? item.job_end_date
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Project End Date
                                      </span>
                                      <span className="col-md-8 main">
                                        {item.job_project_end_date != "" &&
                                        item.job_project_end_date != undefined
                                          ? item.job_project_end_date
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 sub">
                                        Job Description
                                      </span>
                                      <span className="col-md-8 main">
                                        <span>
                                          {item.job_desc != "" &&
                                          item.job_desc != undefined
                                            ? item.job_desc
                                            : "--"}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                    </div>

                    {/* <div id='job-list' className='tab-pane fade in active'>
                      <div className='report-table col-md-12 col-xs-12 pad-no'>
                        <div className='table-responsive'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>
                             
                                  Jobs List
                                </th>
                                <th >
                                 
                                  Currency
                                </th>{' '}
                                <th >
                            
                                  Open balance
                                </th>
                                <th >
                                 
                                  Price Level
                                </th>

                              </tr>
                            </thead>
                            <tbody>
                              {this.state.table_Rows != '' &&
                                this.state.table_Rows != undefined &&
                                this.state.table_Rows}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div> */}

                    <div id="transaction" className="tab-pane fade in">
                      <div className="report-setting">
                        <form className="custom-form form-inline">
                          <div className="form-group mar-rgt">
                            <label>Show</label>
                            <div className="form-cont">
                              <select
                                className="selectpicker form-control hh "
                                onChange={(e) =>
                                  this.customer_details(e.target.value)
                                }
                              >
                                <option value="1">ALL</option>
                                <option value="2">Invoices</option>
                                <option value="3">Sales orders</option>
                                <option value="4">Quotations</option>
                                <option value="5">Credit memo</option>
                              </select>
                            </div>
                          </div>
                          {/* <div className="form-group mar-rgt">
                            <label>Filter</label>
                            <div className="custom-select-drop dropdown">
                              <a
                                aria-expanded="false"
                                aria-haspopup="true"
                                role="button"
                                data-toggle="dropdown"
                                className="dropdown-toggle btn form-control"
                                href="javascript:;"
                              >
                                <span id="selected">All</span>
                                <span className="caret" />
                              </a>
                              <ul className="dropdown-menu">
                                <li className="active">
                                  <a href="javascript:;">All</a>
                                </li>
                                <li>
                                  <a href="javascript:;">Lorem ipsum</a>
                                </li>
                                <li>
                                  <a href="javascript:;">Ipsum dolor</a>
                                </li>
                                <li>
                                  <a href="javascript:;">Dolor seit amet</a>
                                </li>
                              </ul>
                            </div>
                          </div> */}
                          <div className="form-group mar-rgt">
                            <label>Date</label>
                            <div className="form-cont">
                              <select
                                className="selectpicker form-control hh "
                                onChange={(e) =>
                                  this.changedatevalue(e.target.value)
                                }
                              >
                                <option>This Month-to-date</option>
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>This Week-to-date</option>
                                <option>This Year</option>
                                <option>This Year-to-date</option>
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="report-table col-md-12 col-xs-12 pad-no">
                        <div className="table-responsive">
                          <table className="table detail-report">
                            <thead>
                              <tr>
                                <th className="pad-lft">
                                  Type
                                  <i className="th-sort">
                                    <img
                                      src="../images/sort-icon.svg"
                                      alt="SortIcon"
                                    />
                                  </i>
                                </th>
                                <th>
                                  Date
                                  <i className="th-sort">
                                    <img
                                      src="../images/sort-icon.svg"
                                      alt="SortIcon"
                                    />
                                  </i>
                                </th>
                                <th>
                                  No#
                                  <i className="th-sort">
                                    <img
                                      src="../images/sort-icon.svg"
                                      alt="SortIcon"
                                    />
                                  </i>
                                </th>
                                <th>
                                  Account
                                  <i className="th-sort">
                                    <img
                                      src="../images/sort-icon.svg"
                                      alt="SortIcon"
                                    />
                                  </i>
                                </th>
                                <th className="text-right">
                                  Amount
                                  <i className="th-sort">
                                    <img
                                      src="../images/sort-icon.svg"
                                      alt="SortIcon"
                                    />
                                  </i>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.customer_Transaction &&
                                this.state.customer_Transaction.map(
                                  (item, i) => {
                                    return (
                                      <tr className="item-step1">
                                        <td>
                                          <span>
                                            {item.type != "" &&
                                            item.type != undefined
                                              ? item.type
                                              : "--"}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {item.invoice_date != "" &&
                                            item.invoice_date != undefined
                                              ? item.invoice_date
                                              : "--"}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {item.invoice_number != "" &&
                                            item.invoice_number != undefined
                                              ? item.invoice_number
                                              : "--"}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {item.account != "" &&
                                            item.account != undefined
                                              ? item.account
                                              : "--"}
                                          </span>
                                        </td>
                                        <td className="text-right">
                                          <span>
                                            {item.amount != "" &&
                                            item.amount != undefined
                                              ? item.amount
                                              : "--"}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div id="notes" className="tab-pane fade in">
                      <div className="col-md-12 col-xs-12">
                        <div className="row">
                          <em className="info-em col-md-12 col-xs-12 pad-no">
                            * This notes section only for internal purpose
                          </em>
                          <form className="custom-form form-inline h-small col-md-6 mar-top pad-no">
                            <div className="form-group search-box mar-rgt">
                              <input
                                type="text"
                                name="search"
                                className="form-control"
                                placeholder="Search..."
                                onInput={(event) =>
                                  this.getNotes(event.target.value)
                                }
                              />
                            </div>
                          </form>
                          <div className="pull-right mar-top">
                            <button className="btn btn-blue add-new pull-right">
                              <img
                                className="filter-white"
                                src="images/plus-add.svg"
                                alt="icon"
                              />
                              Add New
                            </button>
                            {/* <div className="dropdown menu-item pull-left mar-rgt-5">
                              <button
                                className="btn btn-white dropdown-toggle btn-arrow"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Export
                                <span className="caret" />
                              </button>
                              <ul className="dropdown-menu align-right">
                                <li>
                                  <a href="javascript:;">Export as Excel</a>
                                </li>
                                <li>
                                  <a href="javascript:;">Export as PDF</a>
                                </li>
                              </ul>
                            </div> */}
                          </div>
                        </div>

                        <div className="row mar-top pad-top">
                          {this.state.notesArray != "" &&
                            this.state.notesArray != undefined &&
                            this.state.notesArray.map((item) => {
                              return (
                                <div className="col-md-12 col-xs-12 note-item">
                                  <div className="col-md-1">
                                    <label className="custom-checkbox">
                                      <input type="checkbox" name="all" />
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="col-md-2">
                                    <p className="mar-b-no">{item.note_date}</p>
                                  </div>
                                  <div className="col-md-7">
                                    <p>Note title name</p>
                                    <span>{item.notes}</span>
                                  </div>
                                  <div className="col-md-2">
                                    <span className="by pull-right">
                                      Created by <br /> {item.customer_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <div id="recent-items" className="tab-pane fade in ">
                      <div className="col-md-12 col-xs-12">
                        <div className="row">
                          <div
                            className="custom-accordion panel-group"
                            id="accordion"
                          >
                            <div className="panel">
                              <div className="panel-heading">
                                <h4 className="panel-title">
                                  <a
                                    data-toggle="collapse"
                                    data-parent="#accordion"
                                    href="#collapseOne"
                                  >
                                    Last 10 Sales Invoices
                                    <span className="accordion-arrow">
                                      <img
                                        src="../images/accordion-arrow.svg"
                                        alt="icon"
                                      />
                                    </span>
                                  </a>
                                </h4>
                              </div>
                              <div
                                id="collapseOne"
                                className="panel-collapse collapse in"
                              >
                                <div className="panel-body">
                                  <div className="report-table col-md-12 col-xs-12">
                                    <div className="table-responsive">
                                      <table className="table detail-report">
                                        <thead>
                                          <tr>
                                            <th className="pad-lft">
                                              Date
                                              <i className="th-sort">
                                                <img
                                                  src="../images/sort-icon.svg"
                                                  alt="SortIcon"
                                                />
                                              </i>
                                            </th>
                                            <th>
                                              No#
                                              <i className="th-sort">
                                                <img
                                                  src="../images/sort-icon.svg"
                                                  alt="SortIcon"
                                                />
                                              </i>
                                            </th>
                                            <th className="text-right">
                                              Amount
                                              <i className="th-sort">
                                                <img
                                                  src="../images/sort-icon.svg"
                                                  alt="SortIcon"
                                                />
                                              </i>
                                            </th>
                                            <th className="text-right">
                                              Open Balance
                                              <i className="th-sort">
                                                <img
                                                  src="../images/sort-icon.svg"
                                                  alt="SortIcon"
                                                />
                                              </i>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {this.state.Recent_items &&
                                            this.state.Recent_items.map(
                                              (item, i) => {
                                                return (
                                                  <tr className="item-step1">
                                                    <td>
                                                      <span>
                                                        {item.invoice_date !=
                                                          "" &&
                                                        item.invoice_date !=
                                                          undefined
                                                          ? item.invoice_date
                                                          : "--"}
                                                      </span>
                                                    </td>
                                                    <td>
                                                      <span>
                                                        {item.invoice_number !=
                                                          "" &&
                                                        item.invoice_number !=
                                                          undefined
                                                          ? item.invoice_number
                                                          : "--"}
                                                      </span>
                                                    </td>
                                                    <td className="text-right">
                                                      <span>
                                                        {item.amount != "" &&
                                                        item.amount != undefined
                                                          ? item.amount
                                                          : "--"}
                                                      </span>
                                                    </td>
                                                    <td className="text-right">
                                                      <span>
                                                        {item.opening_balance !=
                                                          "" &&
                                                        item.opening_balance !=
                                                          undefined
                                                          ? item.opening_balance
                                                          : "--"}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="panel">
                              <div className="panel-heading">
                                <h4 className="panel-title">
                                  <a
                                    data-toggle="collapse"
                                    data-parent="#accordion"
                                    href="#collapseTwo"
                                  >
                                    Last 10 Payments
                                    <span className="accordion-arrow">
                                      <img
                                        src="../images/accordion-arrow.svg"
                                        alt="icon"
                                      />
                                    </span>
                                  </a>
                                </h4>
                              </div>
                              <div
                                id="collapseTwo"
                                className="panel-collapse collapse"
                              >
                                <div className="panel-body">
                                  <div className="report-table col-md-12 col-xs-12">
                                    <div className="table-responsive">
                                      <table className="table detail-report">
                                        <thead>
                                          <tr>
                                            <th className="pad-lft">
                                              Date
                                              <i className="th-sort">
                                                <img
                                                  src="images/sort-icon.svg"
                                                  alt="SortIcon"
                                                />
                                              </i>
                                            </th>
                                            <th>
                                              Payment id
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
                                              Account
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
                                          {this.state.Recent_items_payment !=
                                            "" &&
                                            this.state.Recent_items_payment.map(
                                              (item) => {
                                                return (
                                                  <tr className="item-step1">
                                                    <td>
                                                      <span>
                                                        {item.payment_date}
                                                      </span>
                                                    </td>
                                                    <td>
                                                      <span>
                                                        {item.payment_id}
                                                      </span>
                                                    </td>
                                                    <td className="text-right">
                                                      <span>{item.amount}</span>
                                                    </td>
                                                    <td className="text-right">
                                                      <span>
                                                        {item.account}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <a href="javascript:;" className="text-link">
                                    Go to Report
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {this.state.isSuccessful ? (
                      <div
                        className="alert alert-card success alert-dismissible fade in"
                        id="closeme1"
                      >
                        <a
                          href="#"
                          className="close"
                          data-dismiss="alert"
                          aria-label="close"
                        >
                          &times;
                        </a>
                        <div className="img-wrap">
                          <img
                            onClick={() => {
                              this.setState({
                                isSuccessful: false,
                                isWarning: false,
                              });
                            }}
                            className="img-responsive"
                            src={
                              this.state.isWarning
                                ? "../../images/alert-warning.svg"
                                : "../../images/alert-success.svg"
                            }
                            alt="icon"
                          />
                        </div>
                        <div className="alert-cont">
                          <strong className="title">
                            {this.state.isWarning ? "Warning!" : "Success!"}
                          </strong>
                          {this.state.res_msg}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div id="statement" className="tab-pane fade in">
                      Statement
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade pop-modal"
                id="pop_add_notes"
                role="dialog"
              >
                <div className="modal-dialog modal-md custom-modal">
                  <button
                    type="button"
                    className="close hidden-xs"
                    data-dismiss="modal"
                  >
                    <img
                      className="img-responsive"
                      src="../../images/close-red.svg"
                      alt="icon"
                    />
                  </button>
                  <div className="modal-content">
                    <div className="modal-body text-center">
                      <h3>Warning!</h3>

                      <form className="custom-form row">
                        <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                          {this.state.response_to_inactive}{" "}
                        </div>

                        <div
                          className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no"
                          className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no"
                        >
                          <button
                            className="btn btn-lightgray"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <span>{"   "}</span>
                          <button
                            className="btn btn-green"
                            type="button"
                            onClick={() => {
                              this.deleteCustomer_job(3);
                            }}
                          >
                            Make Inactive
                          </button>
                        </div>
                        {/* <div className='mymsg'>{this.state.modal_info_msg}</div> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer logoutSubmit={(e) => this.logoutLink()} />
        </div>
      </div>
    );
  }
}
export default CustomerJobDetails;
