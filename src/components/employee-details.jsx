import React from "react";
import LeftSidebar from "./left_sidebar";
import Footer from "./footer";

import Topbar from "./topbar";

import FetchAllApi from "../api_links/fetch_all_api";
import moment from "moment";
import jQuery from "jquery";
// import 'bootstrap';
// import 'bootstrap-select';

class EmployeeDetails extends React.Component {
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
      role_permissions: JSON.parse(localStorage.getItem('role_permissions')) || [],
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
      Basic_info: [],
      customerDetails: [],
      table_Rows: "",
      statement: "",
      totalBal: "",
      fromDate: "2020-01-01",
      toDate: new Date(),
      isSuccessful: false,
      res_msg: "",
      isWarning: false,
      customer_name: "",
      response_to_inactive: "",
      officeLocationList:[],
      status:'',
    };
  }

  getFilteredOnDate_transcation = () => { };

  deleteCustomer = statuscode => {
    let client_id = this.state.logged_client_id;
    let employee_id = this.props.location.state;
    // 0 for delete customer
    let status_to_set = statuscode;

    FetchAllApi.delete_or_inactive_employee(
      client_id,
      employee_id,
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
                this.props.history.push("/employee-list");
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
          // alert('you cant delete')
          this.setState(
            { isSuccessful: true, isWarning: true, res_msg: response.message },
            () => {
              setTimeout(() => {
                this.setState({ isWarning: false });
              }, 1500);
            }
          );
        }
      }
    );
  };
  makeActive = () => {
    let client_id = this.props.location.state;
    // let customer_id = this.props.location.state
    let employee_id = 1;
    FetchAllApi.make_employee_active(
      client_id,
      employee_id,

      (err, response) => {
        if (response.status === 1) {
          alert(response.message);
          this.props.history.push("/employee-list");
        } else {
        }
      }
    );
  };
  createNotes = () => {
    let employee_id = this.props.location.state;
    let client_id = this.state.logged_client_id;
    let contacts = jQuery('#contact_notes').val()
    let notes = jQuery("#note_notes").val();
    let note_name = jQuery("#tittle_notes").val();
    // let user_id = localStorage.getItem('logged_user_id')
    let user_id = this.state.logged_user_id;
    FetchAllApi.employee_create_notes(
      employee_id,
      client_id,
      contacts,
      user_id,
      notes,
      note_name,

      (err, response) => {
        if (response.status === 1) {
          window.jQuery("#pop-modal-for-notes").modal("hide");
          jQuery("#contact_notes").val("");
          jQuery("#note_notes").val("");
          jQuery("#tittle_notes").val("");
          this.getNotes();
        } else {
          alert(response.message);
        }
      }
    );
  };
  deleteNote = id => {
    let note_id = id;
    let employee_id = this.props.location.state;

    FetchAllApi.employee_delete_notes(note_id, employee_id, (err, response) => {
      if (response.status === 1) {
        this.getNotes();
      } else {
        alert(response.message);
      }
    });
  };
  updateNotes = () => {
    // let customer_id = this.props.location.state
    let client_id = this.state.logged_client_id;
    let employee_id = this.props.location.state;
    // let job_id = Number('0')
    // alert(typeof job_id)
     let contact = jQuery('#contact_notes1').val()
    let notes = jQuery("#note_notes1").val();
    let note_title = jQuery("#tittle_notes1").val();
    // let user_id = localStorage.getItem('logged_user_id')
    let user_id = this.state.logged_user_id
    let notes_id = jQuery("#hiddenJobId").val();
    FetchAllApi.employee_edit_notes(
      client_id,
      employee_id,
      // contacts,
      notes,
      //job_id,
      note_title,
      user_id,
      notes_id,
      contact,
      (err, response) => {
        if (response.status === 1) {
          window.jQuery("#pop-modal-for-notes").modal("hide");
          jQuery("#contact_notes1").val("");
          jQuery("#note_notes1").val("");
          jQuery("#tittle_notes1").val("");
          window.jQuery("#pop-modal-for-notesUpdate").modal("hide");

          this.getNotes();
        } else {
          alert(response.message);
        }
      }
    );
  };
  // changedatevalue(seleteddateformat) {
  //   var dateresult = moment();
  //   let from_date, to_date;

  //   if (seleteddateformat === "This Month-to-date") {
  //     from_date = dateresult.startOf("month");
  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     // alert(from_date.format('YYYY-MM-DD'))
  //     this.setState(
  //       {
  //         fromDate: from_date.format("YYYY-MM-DD"),
  //         toDate: moment(new Date()).format("YYYY-MM-DD")
  //       },
  //       () => {
  //         this.emp_transaction();
  //       }
  //     );
  //   } else if (seleteddateformat === "This Week") {
  //     from_date = dateresult.startOf("week");

  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     console.log("startdate", this.state.start_date);
  //     to_date = dateresult.endOf("week");

  //     // from_date = dateresult.startOf('week')
  //     this.setState(
  //       {
  //         fromDate: from_date.format("YYYY-MM-DD"),
  //         toDate: dateresult.endOf("week")
  //       },
  //       () => {
  //         this.emp_transaction();
  //       }
  //     );

  //     // this.state.start_date = from_date.format('YYYY-MM-DD')
  //     // console.log('startdate', this.state.start_date)
  //     // to_date = dateresult.endOf('week')
  //   } else if (seleteddateformat === "This Month") {
  //     from_date = dateresult.startOf("month");
  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     to_date = dateresult.endOf("month");
  //     this.state.end_date = to_date.format("YYYY-MM-DD");
  //     this.setState(
  //       {
  //         fromDate: from_date.format("YYYY-MM-DD"),
  //         toDate: to_date.format("YYYY-MM-DD")
  //       },
  //       () => {
  //         this.emp_transaction();
  //       }
  //     );
  //   } else if (seleteddateformat === "This Week-to-date") {
  //     from_date = dateresult.startOf("week");
  //     this.state.start_date = from_date.format("YYYY-MM-DD");

  //     this.state.end_date = moment(new Date()).format("YYYY-MM-DD");
  //     this.setState(
  //       {
  //         fromDate: from_date.format("YYYY-MM-DD"),
  //         toDate: moment(new Date()).format("YYYY-MM-DD")
  //       },
  //       () => {
  //         this.emp_transaction();
  //       }
  //     );
  //   } else if (seleteddateformat === "This Year") {
  //     from_date = dateresult.startOf("year");
  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     to_date = dateresult.endOf("year");
  //     this.state.end_date = to_date.format("YYYY-MM-DD");
  //     this.setState(
  //       {
  //         fromDate: from_date.format("YYYY-MM-DD"),
  //         toDate: to_date.format("YYYY-MM-DD")
  //       },
  //       () => {
  //         this.emp_transaction();
  //       }
  //     );
  //   } else if (seleteddateformat === "This Year-to-date") {
  //     from_date = dateresult.startOf("year");
  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     to_date = moment(new Date()).format("YYYY-MM-DD");
  //     this.state.end_date = to_date;
  //     this.setState(
  //       {
  //         fromDate: from_date.format("YYYY-MM-DD"),
  //         toDate: to_date
  //       },
  //       () => {
  //         this.emp_transaction();
  //       }
  //     );
  //   }
  //   // let startDate = jQuery('#fromdate').val()
  //   // let end_date = jQuery('#todate').val()
  //   // this.setState({ start_date: startDate, end_date: end_date }, () => {
  //   // })
  // };


  changedatevalue(seleteddateformat) {
    var dateresult = moment();
    let from_date, to_date;

    if (seleteddateformat === "This Month-to-date") {
      from_date = dateresult.startOf("month");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      // document.getElementById("todate").value = moment(new Date()).format(
      //   "DD-MM-YYYY"
      // );
      this.state.toDate = moment(new Date()).format("YYYY-MM-DD");
      this.emp_transaction();
      // this.statement(this.state.show_id)
    } else if (seleteddateformat === "This Week") {
      from_date = dateresult.startOf("week");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      // console.log("startdate", this.state.fromDate);
      to_date = dateresult.endOf("week");
      // document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.toDate = to_date.format("YYYY-MM-DD");
      this.emp_transaction();
      // this.statement(this.state.show_id)
    } else if (seleteddateformat === "This Month") {
      from_date = dateresult.startOf("month");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("month");
      // document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.toDate = to_date.format("YYYY-MM-DD");
      this.emp_transaction();
      // this.statement(this.state.show_id)
    } else if (seleteddateformat === "This Week-to-date") {
      from_date = dateresult.startOf("week");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      // document.getElementById("todate").value = moment(new Date()).format(
      //   "DD-MM-YYYY"
      // );
      this.state.toDate = moment(new Date()).format("YYYY-MM-DD");
      this.emp_transaction();
      // this.statement(this.state.show_id)
    } else if (seleteddateformat === "This Year") {
      from_date = dateresult.startOf("year");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("year");
      // document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.toDate = to_date.format("YYYY-MM-DD");
      this.emp_transaction();
      // this.statement(this.state.show_id)
    } else if (seleteddateformat === "This Year-to-date") {
      from_date = dateresult.startOf("year");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      to_date = moment(new Date()).format("YYYY-MM-DD");
      // document.getElementById("todate").value = moment(to_date).format(
      //   "DD-MM-YYYY"
      // );
      this.state.toDate = to_date;
      this.emp_transaction();
      // this.statement(this.state.show_id)
    }

    if (seleteddateformat == "ALL") {
      this.setState(
        {
          fromDate: this.state.incorporation_date,
          toDate: moment().add(1, 'day').format("YYYY-MM-DD"),
        },
        () => {
          this.emp_transaction();
          // this.statement(this.state.show_id)
        }
      );
      // document.getElementById("fromdate").value = "";
      // document.getElementById("todate").value = "";
    }
  };

  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass("minimize_leftbar");
    //console.log("logged_user_id", this.state.logged_user_id);

    jQuery("title").html("Employee | GBSC");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }

    // this.get_inbox_list();
  };

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  };

  routedChange(parameter) {
    this.props.history.push("/" + parameter);
    window.scrollTo(0, 0);
  }

  componentDidMount() {

    this.Basic_info();
    this.getNotes();
    this.emp_transaction();
    

    console.log("properties_result", this.state.properties_result);

    //jQuery(".select-picker").selectpicker();

    require("jquery-mousewheel");
    require("malihu-custom-scrollbar-plugin");

    jQuery(".item-listwrap").mCustomScrollbar({
      scrollEasing: "linear",
      scrollInertia: 600,
      scrollbarPosition: "outside"
    });

    jQuery(".label-enclose .label span").click(function () {
      //jQuery('.label-enclose .label').removeClass('active')
      jQuery(this)
        .parent(".label-enclose .label")
        .addClass("active");
    });
    jQuery(".label-enclose .label a").click(function () {
      jQuery(this)
        .parent(".label-enclose .label")
        .removeClass("active");
    });
  }


  getOfficeLocationList = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.getOfficeLocationList(client_id,(err, response) => {
      console.log('Customer list', response)

      if (response.status === 1) {
        this.setState({ officeLocationList: response.lists })
      } else {
        this.setState({ officeLocationList: [] })
      }
    })
  }

  // emp transacction

  emp_transaction = () => {
    let client_id = this.state.logged_client_id;

    let fromDate = this.state.fromDate;
    let toDate = this.state.toDate;
    // let fromDate = "2020-01-01";
    // let toDate = "2020-01-29";
    let emplyee_id = this.props.location.state;

    // let emplyee_id = this.props.location.state;

    FetchAllApi.emp_transaction(
      client_id,
      emplyee_id,
      fromDate,
      toDate,
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
    let empolyee_id = this.props.location.state;
    // let customer_id = this.props.location.state

    FetchAllApi.employee_basic_info(client_id, empolyee_id, (err, response) => {
      if (response.status === 1) {

        console.log("bakjzkzhzlseemp", response);
        {
          response.response.length > 0 &&
            this.setState({
              Basic_info: response.response,
              status:response.response.status,
            },this.getOfficeLocationList);
        }
        this.setState({
          customerDetails: response,
          customer_name: response.response[0].customer_name
        });
      } else {
      }
    })
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  dataTaggingFunc(list_id, file_id) {
    this.props.history.push("/data_tagging/" + list_id + "/" + file_id);
    window.scrollTo(0, 0);
  }


  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  getNotes = search => {
    let employee_id = this.props.location.state;
    let client_id = this.state.logged_client_id;
    let Search_value = search;

    FetchAllApi.employee_notes_list(
      client_id,
      employee_id,
      Search_value,

      (err, response) => {
        console.log("notesww", response.status);
        if (response.status == 1) {
          console.log("notesww", response);
          this.setState({
            notesArray: response.list
          });
        } else {
          this.setState({ notesArray: [] })
        }
      }
    );
  };

  render() {
    let basicinfo = this.state.Basic_info;

    console.log("emplyee_id1", this.state.Basic_info);
    console.log("emplyee_id2", this.state.customerDetails);
    console.log("emplyee_id3", this.state.customer_name);
    // Basic_info: response.response,
    // customerDetails: response.updatelist,
    // customer_name: response.response[0].customer_name
    console.log("emplyee_id", this.props.location.state);
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar history={this.props.history} pageSubmit={e => this.pageLink(e)} />

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
                      this.props.history.push("/employee-list");
                    }}
                  />
                </a>
                {/* <span className='page-title hidden-xs'>Inbox</span> */}
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li
                    onClick={() => {
                      this.props.history.push("/employee-list");
                    }}
                  >
                    <a href="javascript: ;">Employee</a>
                  </li>
                  <li>List Employee</li>
                  <li>
                    {" "}
                    {this.state.Basic_info &&
                      this.state.Basic_info.map((item, i) => {
                        return (
                          <span>
                            {item.first_name != "" &&
                              item.first_name != undefined
                              ? item.first_name
                              : "--"}
                          </span>
                        );
                      })}
                  </li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className="content-top col-md-12 col-xs-12 pad-b-no">
                <div className="col-md-12 col-xs-12">
                  <div className="row">
                    <h4 className="fw-sbold mar-t-no pull-left hidden-xs">
                      {this.state.Basic_info &&
                        this.state.Basic_info.map((item, i) => {
                          return (
                            <span>
                              {item.first_name != "" &&
                                item.first_name != undefined
                                ? item.first_name
                                : "--"}
                            </span>
                          );
                        })}
                    </h4>
                    <div className="pull-right mob-xs-flft">
                      <button
                        className="btn btn-white pull-left mar-rgt-5"
                        onClick={() => {
                          this.state.role_permissions.includes(24) ? (
                            this.props.history.push("/edit-employee", { ...this.state.customerDetails }))
                            : alert("Required permission")
                        }}
                      >
                        Edit
                      </button>
                      <div className="dropdown menu-item new-cus pull-left mar-rgt-5">
                        <button
                          className='btn btn-white '
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          More
                          <span className="caret" />
                        </button>
                        <ul className="dropdown-menu align-right ">
                          <li
                            onClick={() => {
                              this.state.role_permissions.includes(25) ? (
                                this.deleteCustomer(0)) : alert('Required permission')
                            }}
                          >
                            <a href="javascript:;">Delete</a>
                          </li>
                          {/* <li
                            onClick={() => {
                              this.props.history.push("/add-job", [
                                this.props.location.state,
                                0
                              ]);
                            }}
                          >
                            <a href="javascript:;">Add Employee Job</a>
                          </li> */}
                          <li
                            onClick={() => {
                              if (this.state.status == 1) {
                                this.deleteCustomer(2)
                              } else {
                                this.deleteCustomer(1)
                              }

                            }}
                          >
                            <a href="javascript:;">Make Employee {this.state.status == 1 ? 'Inactive' : 'active'} </a>
                          </li>
                        </ul>
                      </div>
                      {/* <div className="dropdown menu-item new-cus pull-left mar-rgt-5">
                        <button
                          className="btn btn-blue dropdown-toggle btn-arrow"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          New
                          <span className="caret" />
                        </button>
                        <ul className="dropdown-menu align-left">
                          <li>
                            <a href="javascript:;"> Payroll Summary</a>
                          </li>
                          <li>
                            <a href="javascript:;">Payroll Transaction Detail</a>
                          </li>
                          <li>
                            <a href="javascript:;"> Variable Pay Summary</a>
                          </li>

                        </ul>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-xs-12">
                  <div className="row">
                    <ul className="nav nav-tabs nowrap">
                      <li role="presentation" className="active">
                        <a data-toggle="tab" href="#basic-info">
                          Basic Information
                        </a>
                      </li>

                      {/* <li role="presentation">
                        <a data-toggle="tab" href="#transaction">
                          Transactions
                        </a>
                      </li> */}
                      <li role="presentation">
                        <a data-toggle="tab" href="#notes">
                          Notes
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
                          return (
                            <React.Fragment>
                              <div className="row dflex mar-btm">
                                <div className="col-md-6 col-xs-12">
                                  <h4 className="info-title">
                                    Personal Information
                                  </h4>
                                  <div className="col-md-12 info-block">
                                    <div className="row text-right">
                                      <a onClick={() => {
                                        this.state.role_permissions.includes(24) ? (
                                          this.props.history.push("/edit-employee", { ...this.state.customerDetails }))
                                          : alert("Required permission")
                                      }} href="javascript:;" className="edit">
                                        Edit
                                      </a>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Name
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.first_name != "" &&
                                          item.first_name != undefined
                                          ? item.first_name
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4 col-sm-12 col-xs-12  sub">
                                        Gender
                                      </span>
                                      <span className="col-md-8 col-sm-12 col-xs-12  main">
                                        {item.gender == "0" 
                                          ? "Male"
                                          : "Female"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Date of Birth
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.date_of_birth != "" &&
                                          item.date_of_birth != undefined
                                         ?item.date_of_birth
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        identification No.
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.identification_no != "" &&
                                          item.identification_no != undefined
                                          ? item.identification_no
                                          : "--"}
                                      </span>
                                    </div>
                                    <hr />
                                    <div className="row mar-btm">
                                      <span className="col-md-12 col-xs-12 sub-title">
                                        Contact - Personal
                                      </span>
                                    </div>
                                    {item.personal_contact &&
                                      item.personal_contact.map((a, b) => {
                                        return (
                                          <React.Fragment key={a}>
                                            <div className="row mar-btm">
                                              <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                                Contact No.
                                              </span>
                                              <span className="col-md-8 col-sm-12 col-xs-12  main">
                                                <a href="javascript:;">
                                                  {a.phone != "" &&
                                                    a.phone != undefined
                                                    ? a.phone
                                                    : "--"}
                                                </a>
                                              </span>
                                            </div>
                                            <div className="row mar-btm">
                                              <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                                Email
                                              </span>
                                              <span className="col-md-8 col-sm-12 col-xs-12  main">
                                                <a href="javascript:;">
                                                  {a.email != "" &&
                                                    a.email != undefined
                                                    ? a.email
                                                    : "--"}
                                                </a>
                                              </span>
                                            </div>
                                          </React.Fragment>
                                        );
                                      })}
                                    <hr />
                                    <div className="row mar-btm">
                                      <span className="col-md-12 col-xs-12 sub-title">
                                        Contact - Work
                                      </span>
                                    </div>
                                    {item.work_contact &&
                                      item.work_contact.map((c, d) => {
                                        return (
                                          <React.Fragment key={c}>
                                            <div className="row mar-btm">
                                              <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                                Contact No.
                                              </span>
                                              <span className="col-md-8 col-sm-12 col-xs-12  main">
                                                <a href="javascript:;">
                                                  {c.phone != "" &&
                                                    c.phone != undefined
                                                    ? c.phone
                                                    : "--"}
                                                </a>
                                              </span>
                                            </div>
                                            <div className="row mar-btm">
                                              <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                                Email
                                              </span>
                                              <span className="col-md-8 col-sm-12 col-xs-12  main">
                                                <a href="javascript:;">
                                                  {c.email != "" &&
                                                    c.email != undefined
                                                    ? c.email
                                                    : "--"}
                                                </a>
                                              </span>
                                            </div>
                                            <br />
                                          </React.Fragment>
                                        );
                                      })}
                                    <hr />
                                    <div className="row mar-btm">
                                      <span className="col-md-12 col-xs-12 sub-title">
                                        Address
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {/* {item.opening_balance != '' &&
                                        item.opening_balance != undefined
                                          ? item.opening_balance
                                          : '--'} */}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Permanent
                                      </span>
                                      <span className="col-md-8 col-sm-12 col-xs-12  main">
                                        <a href="javascript:;">
                                          {item.permanent_address != "" &&
                                            item.permanent_address != undefined
                                            ? item.permanent_address
                                            : "--"}
                                        </a>
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Residential
                                      </span>
                                      <span className="col-md-8 col-sm-12 col-xs-12  main">
                                        <a href="javascript:;">
                                          {item.residential_address != "" &&
                                            item.residential_address != undefined
                                            ? item.residential_address
                                            : "--"}
                                        </a>
                                      </span>
                                    </div>

                                    {/* {item.contact_details.length > 0 && (
                                      <React.Fragment>
                                        <div className='row mar-btm'>
                                          {item.contact_details && (
                                            <React.Fragment>
                                              <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                                Contact Persons
                                              </span>
                                              <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                                {item.contact_details.map(
                                                  (a, b) => {
                                                    // alert(b)
                                                    return (
                                                      <React.Fragment>
                                                        {
                                                          (a.is_primary = 1 && (
                                                            <label className='label label-danger'>
                                                              Primary
                                                            </label>
                                                          ))
                                                        }
                                                        <br />
                                                        {a.name}
                                                        <span>
                                                          <a href='tel:(713)-090-0558'>
                                                            {a.phone_work}
                                                          </a>
                                                        </span>
                                                        <span>
                                                          <a href='tel:(842)-294-8453'>
                                                            {a.phone_personal}
                                                          </a>
                                                        </span>
                                                        <span>
                                                          <a href='mailto:johndoe.fifthrouge@gmail.com'>
                                                            {a.email !=undefined ? a.email:''}
                                                          </a>
                                                        </span>
                                                        <br />
                                                      </React.Fragment>
                                                    )
                                                  }
                                                )}
                                              </span>
                                              <br />
                                            </React.Fragment>
                                          )}
                                        </div>
                                      </React.Fragment>
                                    )} */}
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
                                          Success!
                                        </strong>
                                        {this.state.res_msg}
                                      </div>
                                    </div>
                                  ) : (
                                      ""
                                    )}
                                </div>
                                <div className="col-md-6 col-xs-12">
                                  <h4 className="info-title">Job Details</h4>
                                  <div className="col-md-12 info-block">
                                    <div className="row text-right">
                                      <a onClick={() => {
                                        this.state.role_permissions.includes(24) ? (
                                          this.props.history.push("/edit-employee", { ...this.state.customerDetails }))
                                          : alert("Required permission")
                                      }} href="javascript:;" className="edit">
                                        Edit
                                      </a>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Empolyee Code
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.employee_code != "" &&
                                          item.employee_code != undefined
                                          ? item.employee_code
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Date of Joining
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.date_of_joining != "" &&
                                          item.date_of_joining != undefined
                                          ? item.date_of_joining
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Date of Releave
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.date_of_releave != "" &&
                                          item.date_of_releave != undefined
                                          ? item.date_of_releave
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Department
                                      </span>
                                      <span className="col-md-8 col-sm-12 col-xs-12  main">
                                        {item.department != "" &&
                                          item.department != undefined
                                          ? item.department
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Designation
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.designation != "" &&
                                          item.designation != undefined
                                          ? item.designation
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Empolyee Type
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.employee_typename != "" &&
                                          item.employee_typename != undefined
                                          ? item.employee_typename
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Shift
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.shift_type_name != "" &&
                                          item.shift_type_name != undefined
                                          ? item.shift_type_name
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Office Location
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {this.state.officeLocationList.map((val)=>{
                                        if(item.office_location == val.id){
                                          return val.name
                                        } else{
                                         return null
                                        }})}
                                      </span>
                                    </div>
                                    <hr />
                                    <div className="row mar-btm">
                                      <span className="col-md-12 col-xs-12 sub-title">
                                        Bank Information
                                      </span>
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Account No.
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.account_no != "" &&
                                          item.account_no != undefined
                                          ? item.account_no
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        IFSC
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.ifsc_code != "" &&
                                          item.ifsc_code != undefined
                                          ? item.ifsc_code
                                          : "--"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row dflex">
                                <div className="col-md-6 col-xs-12">
                                  <h4 className="info-title">Salary Details</h4>
                                  <div className="col-md-12 info-block">
                                    <div className="row text-right">
                                      <a onClick={() => {
                                        this.state.role_permissions.includes(24) ? (
                                          this.props.history.push("/edit-employee", { ...this.state.customerDetails }))
                                          : alert("Required permission")
                                      }} href="javascript:;" className="edit">
                                        Edit
                                      </a>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Effective Date
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.effective_date != "" &&
                                          item.effective_date != undefined
                                          ? item.effective_date
                                          : "--"}
                                      </span>
                                    </div>

                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Salary
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.salary != "" &&
                                          item.salary != undefined
                                          ? item.salary
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Pay Frequency
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.payroll_frequency_name != "" &&
                                          item.payroll_frequency_name != undefined
                                          ? item.payroll_frequency_name
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Payment Method
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.payment_method_name != "" &&
                                          item.payment_method_name != undefined
                                          ? item.payment_method_name
                                          : "--"}
                                      </span>
                                    </div>

                                    <hr />
                                    <div className="row mar-btm">
                                      <span className="col-md-12 col-xs-12 sub-title">
                                        Variable Pay
                                      </span>
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Pay Amount
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.variable_pay != "" &&
                                          item.variable_pay != undefined
                                          ? item.variable_pay
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Pay Frequency
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.variable_pay_frequncyname != "" &&
                                          item.variable_pay_frequncyname !=
                                          undefined
                                          ? item.variable_pay_frequncyname
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="row mar-btm">
                                      <span className="col-md-4  col-sm-12 col-xs-12 sub">
                                        Pay notes
                                      </span>
                                      <span className="col-md-8  col-sm-12 col-xs-12 main">
                                        {item.variable_pay_notes != "" &&
                                          item.variable_pay_notes != undefined
                                          ? item.variable_pay_notes
                                          : "--"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                    </div>

                    <div id="transaction" className="tab-pane fade in">
                      <div className="report-setting">
                        <form className="custom-form form-inline">
                          <div className="form-group mar-rgt">
                            <label>Show</label>
                            <div className="custom-select-drop dropdown">
                              <a
                                aria-expanded="false"
                                aria-haspopup="true"
                                role="button"
                                data-toggle="dropdown"
                                className="dropdown-toggle btn form-control"
                                href="javascript:;"
                              >
                                <span id="selected">All Transactions</span>
                                <span className="caret" />
                              </a>
                              <ul className="dropdown-menu">
                                <li className="active">
                                  <a href="javascript:;">All Transactions</a>
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
                          </div>
                          <div className="form-group mar-rgt">
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
                          </div>
                          <div className="form-group mar-rgt">
                            <label>Date</label>
                            <div className="form-cont" >
                              <select
                                className="selectpicker form-control hh "
                                onChange={e =>
                                  this.changedatevalue(e.target.value, "transaction")
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
                                            {item.pay_date != "" &&
                                              item.pay_date != undefined
                                              ? item.pay_date
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
                          <form className="custom-form form-inline h-small col-md-6 col-sm-6 col-xs-12 mar-top pad-no">
                            <div className="form-group search-box mar-rgt">
                              <input
                                type="text"
                                name="search"
                                className="form-control"
                                placeholder="Enter notes name..."
                                autocomplete="off"
                                onInput={event =>
                                  this.getNotes(event.target.value)
                                }
                              />
                            </div>
                          </form>
                          <div className="pull-right mar-top mob-xs-flft">
                            <button
                              className="btn btn-blue add-new pull-right"
                              onClick={() => {
                                window
                                  .jQuery("#pop-modal-for-notes")
                                  .modal("show");
                              }}
                            >
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
                            this.state.notesArray.map(item => {
                              return (
                                <div
                                  className="col-md-12 col-xs-12 note-item"
                                  onClick={() => {
                                    // jQuery('#contact_notes').val(item.contact)
                                    // jQuery('#note_notes').val(item.notes)
                                    // jQuery('#tittle_notes').val(item.note_name)
                                    // window.jQuery('#pop-modal-for-notes').modal('show')
                                  }}
                                >
                                  {/* <div className="col-md-1">
                                    <label className="custom-checkbox">
                                      <input type="checkbox" name="all" />
                                      <span className="checkmark" />
                                    </label>
                                  </div> */}
                                  <div className="col-md-2">
                                    <p className="mar-b-no date">
                                      {item.created_date}
                                    </p>
                                  </div>
                                  <div className="col-md-7">
                                    <p>{item.note_title}</p>
                                    <span>{item.notes}</span>
                                    <br />
                                    {/* <span>Contact :{" "+item.contacts}</span> */}
                                  </div>
                                  <div className="col-md-2">
                                    <span className="by pull-right">
                                      Created by <br /> {item.created_by}
                                    </span>
                                  </div>
                                  <div
                                    className="dropdown menu-item new-cus"
                                    onClick={() => { }}
                                  >
                                    <input type="hidden" id="hiddenJobId" />
                                    <button
                                      className="btn btn-green dropdown-toggle"
                                      type="button"
                                      data-toggle="dropdown"
                                    >
                                      Action
                                      <span className="caret" />
                                    </button>
                                    <ul className="dropdown-menu align-right">
                                      <li
                                        onClick={() => {
                                          jQuery("#contact_notes1").val(
                                            item.contact
                                          );
                                          jQuery("#note_notes1").val(
                                            item.notes
                                          );
                                          jQuery("#tittle_notes1").val(
                                            item.note_title
                                          );
                                          jQuery("#hiddenJobId").val(
                                            item.notes_id
                                          );

                                          window
                                            .jQuery(
                                              "#pop-modal-for-notesUpdate"
                                            )
                                            .modal("show");
                                        }}
                                      >
                                        <a href="javascript:;">Edit</a>
                                      </li>
                                      <li
                                        onClick={() => {
                                          this.deleteNote(item.notes_id);
                                        }}
                                      >
                                        <a href="javascript:;">Delete</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade pop-modal"
              id="pop-modal-for-notesUpdate"
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
                    <h3>Edit Notes</h3>
                    <form className="custom-form row">
                      <div className="form-group col-md-12 col-xs-12 pad-no">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <label>Title</label>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <input
                            type="text"
                            id="tittle_notes1"
                            name="account_name"
                            className="form-control"
                            autoComplete="off"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group col-md-12 col-xs-12 pad-no">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <label>Contact</label>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <input
                            type="text"
                            id="contact_notes1"
                            name="account_name"
                            className="form-control"
                            autoComplete="off"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group col-md-12 col-xs-12 pad-no">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <label>
                            Note<span className="astrick">*</span>
                          </label>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <input
                            type="text"
                            id="note_notes1"
                            style={{ height: 100 }}
                            name="account_name"
                            className="form-control"
                            autoComplete="off"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group col-md-12 col-xs-12 btn-sec pad-no">
                        <button
                          className="btn btn-lightgray"
                          type="button"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <span> </span>
                        <button
                          className="btn btn-green"
                          type="button"
                          onClick={() => {
                            this.updateNotes();
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade pop-modal"
              id="pop-modal-for-notes"
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
                    <h3>Create Notes</h3>
                    <form className="custom-form row">
                      <div className="form-group col-md-12 col-xs-12 pad-no">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <label>Title</label>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <input
                            type="text"
                            id="tittle_notes"
                            name="account_name"
                            className="form-control"
                            autoComplete="off"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group col-md-12 col-xs-12 pad-no">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <label>Contact</label>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <input
                            type="text"
                            id="contact_notes"
                            name="account_name"
                            className="form-control"
                            autoComplete="off"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group col-md-12 col-xs-12 pad-no">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <label>
                            Note<span className="astrick">*</span>
                          </label>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <input
                            type="text"
                            id="note_notes"
                            style={{ height: 100 }}
                            name="account_name"
                            className="form-control"
                            autoComplete="off"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group col-md-12 col-xs-12 btn-sec pad-no">
                        <button
                          className="btn btn-lightgray"
                          type="button"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <span> </span>
                        <button
                          className="btn btn-green"
                          type="button"
                          onClick={() => {
                            this.createNotes();
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </form>
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
                            this.deleteCustomer(3);
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

          <Footer logoutSubmit={e => this.logoutLink()} />
        </div>
      </div>
    );
  }
}
export default EmployeeDetails;
