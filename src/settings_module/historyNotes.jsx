import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css";
import moment from 'moment';



export default class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      period: "This Month",
      start_date: '',
      end_date: '',
      option: "",
      rowPerPage: 100,
      filteredval: [],
      history: [],
      showPage: 1,
      pageList: [1, 2],
      search: '',
      listOfUsers: [],
      listOfItems: [],
      selectUser: "",
      selectItem: '',
      page:1,

    }
  };

  componentWillMount() {
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

  componentDidMount() {
    this.changedatevalue();
    this.searchApiCall();
    this.usersList();
    this.itemsList();

    window.jQuery(".mscroll-y").mCustomScrollbar({
      axis: "y",
      scrollEasing: "linear",
      scrollInertia: 600,
      autoHideScrollbar: "true",
      autoExpandScrollbar: "true"
    });
    window.jQuery(".mscroll-x").mCustomScrollbar({
      axis: "x",
      scrollEasing: "linear",
      scrollInertia: 600,
      autoHideScrollbar: "true",
      autoExpandScrollbar: "true"
    });
  }

  handle = (val) => {
    this.setState({ period: val }, this.changedatevalue)
  };

  setPage = (val) => {
    this.setState({ showPage: val })
  };

  setRowPerPage = val => {
    this.setState({ rowPerPage: val })
  };

  // setRowPerPage = val => {
  //   const arr = this.state.history;
  //   let fill=arr.filter((obj)=> {
  //      if(obj.name.toLowerCase().indexOf(this.state.search.toLowerCase())>-1||obj.role_name.toLowerCase().indexOf(this.state.search.toLowerCase())>-1||obj.status_text.toLowerCase().indexOf(this.state.search.toLowerCase())>-1){
  //            return true
  //      }
  //     else{
  //         return false
  //       }
  //    });
  //   if (!this.state.search) {
  //      fill = arr;
  //    }
  //   if (val > arr.length) {
  //     this.setState({
  //       rowPerPage: val,
  //       filteredval: arr.slice(0, val),
  //       currentPage: 1,
  //       pageList: [1,2]
  //     });
  //     return;
  //   }
  //   let pageList = [...this.state.pageList];
  //   this.setState({
  //     rowPerPage: val,
  //     filteredval: arr.slice(0, val),
  //     currentPage: 1,
  //     pageList,
  //   });
  // }


  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });
  };



  changedatevalue() {
    var dateresult = moment();
    let from_date, to_date;

    if (this.state.period === "This Month-to-date") {
      from_date = dateresult.startOf("month");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      document.getElementById("todate").value = moment(new Date()).format(
        "DD-MM-YYYY"
      );
      this.state.end_date = moment(new Date()).format("YYYY-MM-DD");
      this.state.option = 0;

    } else if (this.state.period === "This Week") {
      from_date = dateresult.startOf("week");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      console.log("startdate", this.state.start_date);
      to_date = dateresult.endOf("week");
      document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.end_date = to_date.format("YYYY-MM-DD");
      this.state.option = 0;
    } else if (this.state.period === "This Month") {
      from_date = dateresult.startOf("month");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("month");
      document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.end_date = to_date.format("YYYY-MM-DD");
      this.state.option = 0;

    } else if (this.state.period === "This Week-to-date") {
      from_date = dateresult.startOf("week");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      document.getElementById("todate").value = moment(new Date()).format(
        "DD-MM-YYYY"
      );
      this.state.end_date = moment(new Date()).format("YYYY-MM-DD");
      this.state.option = 0;

    } else if (this.state.period === "This Year") {
      from_date = dateresult.startOf("year");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("year");
      document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.end_date = to_date.format("YYYY-MM-DD");
      this.state.option = 0;

    } else if (this.state.period === "This Year-to-date") {
      from_date = dateresult.startOf("year");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = moment(new Date()).format("YYYY-MM-DD");
      document.getElementById("todate").value = moment(to_date).format(
        "DD-MM-YYYY"
      );
      this.state.end_date = to_date;
      this.state.option = 0;

    } else if (this.state.period === "Custom") {
      from_date = '';
      to_date = '';
      document.getElementById("fromdate").value = from_date;
      document.getElementById("todate").value = to_date;
      this.state.start_date = from_date;
      this.state.end_date = to_date;

    } else if (this.state.period === "All") {
      from_date = localStorage.getItem("incorporation_date");
      document.getElementById("fromdate").value = moment(from_date).format(
        "DD-MM-YYYY"
      );
      to_date = moment().add(10, 'years').format("YYYY-MM-DD");
      document.getElementById("todate").value = moment(to_date).format(
        "DD-MM-YYYY"
      );
      this.state.start_date = moment(from_date).format("YYYY-MM-DD");
      this.state.end_date = moment(to_date).format("YYYY-MM-DD");
    }

    // let startDate = jQuery("#fromdate").val();
    // let end_date = jQuery("#todate").val();
    // this.setState(
    //   { start_date: from_date, end_date: to_date, option: 0 },
    // () => {

    //   if (this.state.period == "Custom") {
    //     this.state.option = 0;
    //   }
    //   if (this.state.period == "All") {
    //     this.setState({ start_date: "", end_date: "", option: 1 }, () => {

    //     });
    //     document.getElementById("fromdate").value = "";
    //     document.getElementById("todate").value = "";
    //   }
    // }
    // );
  };

  clearFunc = () => {
    this.setState({ selectItem: '', period: "This Month", rowPerPage: 100,showPage: 1 },()=>{this.changedatevalue();this.searchApiCall()})
  };

  itemChange = (e) => {
    this.setState({ selectItem: e.target.value })
  };

  userChange = (e) => {
    this.setState({ selectUser: e.target.value })
  };



  usersList = () => {
    let client_Id = this.state.logged_client_id;
    FetchAllApi.settings_defaultNamelist(client_Id, (err, response) => {
      // alert(response.country_id)
      if (response.status === 1) {
        this.setState({ listOfUsers: response.list });
      }
    });
  };

  itemsList = () => {
    let client_Id = this.state.logged_client_id;
    FetchAllApi.settings_find_drop3("type", client_Id, (err, response) => {
      if (response.status === 1) {
        this.setState({ listOfItems: response.data })
      }
    })
  };

  change = (e) => {
    const arr = this.state.history;
    this.setState({ search: e.target.value });
    if (!e.target.value.trim()) {
      return this.setState({ filteredval: [...arr] })
    }
    const fill = arr.filter((obj) => {
      console.log(obj.designation)
      if (obj.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || obj.role_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || obj.status_text.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
        return true
      }
      else {
        return false
      }
    })
    return this.setState({ filteredval: fill.slice(0, this.state.rowPerPage) }, () => {
      this.setState({
        rowPerPage: 10,
        currentPage: 1,
        pageList: [1, 2]
      })
    })
  }

  setPagination = (page, pageList = this.state.pageList) => {
    const arr = this.state.history;
    console.log(arr);
    let fill = arr.filter((obj) => {
      if (obj.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.role_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.status_text.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
        return true
      }
      else {
        return false
      }
    });
    if (!this.state.search) {
      fill = arr;
    }
    const max = page * this.state.rowPerPage;
    const min = max - this.state.rowPerPage;
    this.setState({
      filteredval: arr.slice(min, max),
      currentPage: page,
      pageList: pageList,
    });
  }


  onNextPagination = () => {
    if (this.state.currentPage % 2 === 0) {
      this.setPagination(this.state.currentPage + 1, [this.state.currentPage + 1, this.state.currentPage + 2]);
    } else {
      this.setPagination(this.state.currentPage + 2, [this.state.currentPage + 2, this.state.currentPage + 3]);
    }
  }
  onPrevPagination = () => {
    if (this.state.currentPage % 2 === 0) {
      const arr = !(this.state.currentPage - 2) ? [1, 2] : [this.state.currentPage - 3, this.state.currentPage - 2];
      this.setPagination(this.state.currentPage - 2 || 1, arr);
    } else {
      this.setPagination(this.state.currentPage - 1, [this.state.currentPage - 2, this.state.currentPage - 1]);
    }
  }





  startDateChange = (e) => {
    this.setState({ period: "Custom" })
    let date = jQuery("#fromdate").val();
    console.log("date", date)
    if (date !== undefined && date !== "") {
      var array = date.split("/");
      if (array[2] != undefined)
        var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ start_date: date_formated })
    }
  };

  endDateChange = (e) => {
    this.setState({ period: "Custom" })
    let date = jQuery("#todate").val();
    console.log("date1", date)
    if (date !== undefined && date !== "") {
      var array = date.split("/");
      if (array[2] != undefined)
        var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ end_date: date_formated })
    }
  };



  searchApiCall = () => {
    this.setState({ history: [], filteredval: [] })
    let client_id = this.state.logged_client_id;
    let user_id = this.state.logged_user_id;
    let page = this.state.showPage;
    let limit = this.state.rowPerPage;
    let item = this.state.selectItem;
    let start_date = this.state.start_date;
    let end_date = this.state.end_date;
    FetchAllApi.history_notes_search(client_id, user_id, page, limit, item, start_date, end_date, (err, response) => {
      if (response.status === 1) {


        // to show pages 
        let showing 
        if(this.state.showPage == 1){
          showing = response.list.length
        }else if(this.state.showPage > 1){
          showing = ((this.state.showPage - 1)*this.state.rowPerPage) + response.list.length
        }
        // to show pages 

        this.setState({ history: response.list, filteredval: response.list ,pages: response.total_pages, total_count: response.total_count,showing })
      }
    })
  };

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }


  render() {
    // console.log("d", this.state.start_date, this.state.end_date)
    let totalPages = Math.ceil(this.state.filteredval.length / this.state.showPage);
    let arr = [];
    if (this.state.search) {
      totalPages = Math.ceil(this.state.filteredval.length / this.state.showPage);
      arr = this.state.filteredval;
    } else {
      totalPages = Math.ceil(this.state.history.length / this.state.showPage);
      arr = this.state.filteredval.slice(0, 100);
    };




    return (
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
            <Sidebar pageSubmit={e => this.pageLink(e)} />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>History &amp; Notes</h3>
                {/* <div>
                  <form className="custom-form h-small mar-no">
                    <div className="form-group search-box mar-no">
                      <input type="text" name="search" onChange={this.change} className="form-control" placeholder="Search..." />
                    </div>
                  </form>
                </div> */}
              </div>

              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <form className="custom-form filter-form h-small col-md-12 col-xs-12">
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label>Period</label>
                        <select
                          id="custom"
                          className="selectpicker form-control hh "
                          value={this.state.period}
                          onChange={(e) => this.handle(e.target.value)}
                        >
                          <option value="All">All</option>
                          <option value="Custom">Custom</option>
                          <option value="This Month-to-date">This Month-to-date</option>
                          <option value="This Week">This Week</option>
                          <option value="This Month">This Month</option>
                          <option value="This Week-to-date">This Week-to-date</option>
                          <option value="This Year">This Year</option>
                          <option value="This Year-to-date">This Year-to-date</option>
                        </select>
                      </div>
                      <div>
                        <div>
                          <div className="form-group col-md-4">
                            <label>From</label>
                            <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" data-provide="datepicker">
                              <input type="text" className="form-control" id="fromdate" placeholder="Start Date"
                                // value={this.state.start_date}
                                name="draftStartDate" onBlur={(event) => {
                                  let value = event.target.value
                                  setTimeout(() => { this.startDateChange(value) }, 500)
                                }} />
                              <div className="input-group-addon">
                                <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#fromdate').focus()} />
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="form-group col-md-4">
                              <label>To</label>
                              <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" data-provide="datepicker">
                                <input type="text" className="form-control" id="todate" placeholder="End Date" value={this.state.to_date} name="draftEndDate" onBlur={(event) => {
                                  let value = event.target.value
                                  setTimeout(() => { this.endDateChange(value) }, 500)
                                }} />
                                <div className="input-group-addon">
                                  <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#todate').focus()} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <label>Items</label>
                        <div className="custom-select-drop dropdown">
                          <select className="selectpicker form-control hh " data-live-search="true" value={this.state.selectItem} onChange={(e) => { this.itemChange(e) }}>
                            <option value=''>All Items</option>
                            {this.state.listOfItems.map((val) => {
                              return (
                                <option value={val.key_name}>{val.value}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      {/* <div className="form-group col-md-4">
                        <label>Users</label>
                        <div className="custom-select-drop dropdown">
                        <select className="selectpicker form-control hh " data-live-search="true" value={this.state.selectUser} onChange={(e) => { this.userChange(e) }}>
                                <option value=''>All Users</option>
                                {this.state.listOfUsers.map((val) => {
                                  return (
                                    <option value={val.id}>{val.name}</option>
                                  )
                                })}
                              </select>
                        </div>
                      </div> */}
                      <div className="form-group col-md-4">
                        <label>Show data</label>
                        <div className="custom-select-drop dropdown">
                          <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                            <span id="selected">{this.state.rowPerPage}</span><span className="caret" />
                          </a>
                          <ul className="dropdown-menu align-right minw-unset">
                            <li className="active"><a href="javascript:void(0);" onClick={() => this.setRowPerPage(50)}>50</a></li>
                            <li><a href="javascript:void(0);" onClick={() => this.setRowPerPage(100)}>100</a></li>
                            <li><a href="javascript:void(0);" onClick={() => this.setRowPerPage(150)}>150</a></li>
                            <li><a href="javascript:void(0);" onClick={() => this.setRowPerPage(200)}>200</a></li>
                            <li><a href="javascript:void(0);" onClick={() => this.setRowPerPage(250)}>250</a></li>
                            <li><a href="javascript:void(0);" onClick={() => this.setRowPerPage(300)}>300</a></li>
                          </ul>
                        </div>
                      </div>
                      {/* <div className="form-group col-md-4">
                    <label>Show page</label>
                    <div className="custom-select-drop dropdown">
                      <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                        <span id="selected">{this.state.showPage}</span><span className="caret" />
                      </a>
                      <ul className="dropdown-menu align-right minw-unset">
                        <li className="active"><a href="javascript:void(0);" onClick={() => this.setPage(1)}>1</a></li>
                        <li><a href="javascript:void(0);" onClick={() => this.setPage(2)}>2</a></li>
                        <li><a href="javascript:void(0);" onClick={() => this.setPage(3)}>3</a></li>
                        <li><a href="javascript:void(0);" onClick={() => this.setPage(4)}>4</a></li>
                        <li><a href="javascript:void(0);" onClick={() => this.setPage(5)}>5</a></li>
                        <li><a href="javascript:void(0);" onClick={() => this.setPage(6)}>6</a></li>
                      </ul>
                    </div>
                  </div> */}

                      <div className="col-md-12 text-right">
                        <div className="btn btn-lightgray mar-rgt-5" onClick={this.clearFunc}>Clear</div>
                        <div className="btn btn-green mar-rgt-5" onClick={this.searchApiCall}>Search</div>
                      </div>
                    </div>
                  </form>
                </div>
                {this.state.history.length == 0 ? (
                  <div className="col-md-12 tab-pane fade in pad-no">
                    <div className="landing-wrap">
                      <div className="img-concept text-center">
                        <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                        <p>Looks like there's no data</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 mar-t-no pad-no">
                      <div className="table-responsive">
                        <table className="table detail-report">
                          <thead>
                            <tr>
                              <th className="text-left">
                                Date &amp; Time
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th>
                                Item
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th>
                                Action
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th>
                                User
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th>
                                Notes
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.history.map((hist, idx) => {
                              return (
                                <tr>
                                  <td className="text-left-imp">{moment(hist.created_on).format("D MMMM,YYYY h:mm a ")}</td>
                                  <td>{hist.item}</td>
                                  <td>{hist.action}</td>
                                  <td>{hist.user_name}</td>
                                  <td>---</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>



                      <div className="row">
                  <p className="fw-med pull-left">
                    Showing - {this.state.showing} of{" "}
                    {this.state.total_count}items
                  </p>
                  <div className="pull-right pagination-wrap">
                    <ul className="pagination">

                      {[...Array(this.state.pages)].map((item, idx) => {
                        let i = idx + 1
                        return (
                          <li>
                            <a
                              href="javascript:;"
                              style={
                                this.state.showPage === i
                                  ? {
                                    background: "#2491D9",
                                    marginLeft: "5px",
                                    color: "#fff",
                                  }
                                  : {}
                              }
                              // onClick={() => this.setState({ page: i }, () => this.get_list())}
                            >
                              {i}
                            </a>
                          </li>
                        );
                      })}

                    </ul>
                  </div>
                </div>


                      {/* <div className="col-md-12 col-xs-12 pad-no mar-top">
                        <p className="fw-med fs-13 pull-left">Showing - {arr.length} of {this.state.history.length}items</p>
                        <div className='pull-right pagination-wrap'>
                          <ul className='pagination'>
                            {this.state.TotalPages &&
                              this.state.TotalPages.map((item, i) => {
                                return (
                                  <>
                               //     li className="active"><a href="javascript:;">01</a></li>
                                    <li
                                      key={i}
                                      onClick={() => this.getSpecificPage(i + 1)}
                                    >
                                      <a href='javascript:;'>{i + 1}</a>
                                    </li>

                                  </>
                                )
                              })}


                          //  <li><a href="javascript:;">03</a></li>
                           // <li><a href="javascript:;">04</a></li>

                            
                        //  {this.state.totalPagesCount != '' &&
                          //          <li onClick={() => this.state.TotalPages.length > this.state.pageNumber  ? this.getSpecificPage(i + 1) : null}>
                            //          <a href='javascript:;' className='btn'>
                              //          Next
                            //</a>
                              //      </li>}
                          </ul>
                        </div>
                      </div> */}
                    </div>
                  </div>
                )}
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