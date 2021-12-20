import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import { Link } from "react-router-dom";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"
import Comma from './../components/comma'
import moment from "moment";



export default class Manual extends React.Component {
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
      startDate: "",
      endDate: "",
      draftStartDate: '',
      draftEndDate: "",
      postedStartDate: "",
      postedEndDate: "",
      archiveStartDate: "",
      archieveEndDate: "",
      pageSelected: "Manual Journal",
      journal_edit: false,
      journal_prefix: "",
      journal_next_no: '',
      allArr: [],
      allText: '',
      draftText: '',
      postText: "",
      repeatingText: "",
      clientHomeCurrency: '',
      postedArr: [],
      repeatArr: [],
      draftArr: [],
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
    this.getValues();
    this.get_client_home_currency();

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
  };

  componentDidUpdate() {

    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy" });

  };

  newChange = (e) => {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  };

  selectedPage(page) {
    console.log(page)
    this.setState({ pageSelected: page }, this.getDatas)

  };

  getValues = () => {
    let client_id = this.state.logged_client_id;
    FetchAllApi.settings_sales_journal(client_id, (err, response) => {

      if (response.status === 1) {
        if (response.data.length == 0) {
          this.setState({ journal_edit: false })

        } else {
          this.setState({ journal_edit: false })
          this.setState({
            journal_prefix: response.data[0].manual_gerenal_prefix,
            journal_next_no: response.data[0].next_no,
            journal_edit: true
          })
        }
      }
    });

  };

  save = () => {
    let client_id = this.state.logged_client_id;

    if (this.state.pageSelected == "Manual Journal") {
      let journal = {
        client_id: client_id,
        manual_gerenal_prefix: this.state.journal_prefix,
        next_no: this.state.journal_next_no,
      }

      if (this.state.journal_edit == false) {
        FetchAllApi.create_sales_journal(journal, (err, response) => {
          if (response.status === 1) {
            alert("Manual journal updated successfully")

          }
        })
      } else {

        FetchAllApi.create_sales_journal_edit(journal, (err, response) => {
          if (response.status === 1) {
            alert("Manual journal edited successfully")
          }
        });
      }
    }
  };


  get_client_home_currency = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.get_client_home_currency(client_id, (err, response) => {
      if (response.status === 1) {
        console.log("Basio state", response);
        this.setState({
          clientHomeCurrency: response.currency,
        });
      } else {
      }
    });
  };

  getDatas = () => {
    let client_id = this.state.logged_client_id
    let val = this.state.pageSelected
    let status;
    let start_date;
    let end_date;
    let search_key;
    let type;
    if (val == "All") {
      status = 0;
      type = 1
      start_date = moment(this.state.startDate,"DD/MM/YYYY").format('YYYY-MM-DD') // this.state.startDate 
      end_date = moment(this.state.endDate,"DD/MM/YYYY").format('YYYY-MM-DD') // this.state.endDate
      search_key = this.state.allText
    } else if (val == "Draft") {
      status = 2
      type = 1
      start_date =  moment(this.state.draftStartDate,"DD/MM/YYYY").format('YYYY-MM-DD') //this.state.draftStartDate
      end_date =  moment(this.state.draftEndDate,"DD/MM/YYYY").format('YYYY-MM-DD') //this.state.draftEndDate
      search_key = this.state.draftText
    } else if (val == "Posted") {
      status = 1
      type = 1
      start_date = moment(this.state.postedStartDate,"DD/MM/YYYY").format('YYYY-MM-DD') // this.state.postedStartDate
      end_date =  moment(this.state.postedEndDate,"DD/MM/YYYY").format('YYYY-MM-DD') //this.state.postedEndDate
      search_key = this.state.postedText
    } else if (val == "Repeating") {
      type = 2
      search_key = this.state.repeatingText
    }
    FetchAllApi.manual_journal_main(client_id, start_date, end_date, type, status, search_key, (err, response) => {
      if (response.status === 1) {
        if (val == "All") {
          this.setState({ allArr: response.list })
        } else if (val == "Posted") {
          this.setState({ postedArr: response.list })
        } else if (val == "Draft") {
          this.setState({ draftArr: response.list })
        } else if (val == "Repeating") {
          this.setState({ repeatArr: response.list })
        }
      }else{
        if (val == "All") {
          this.setState({ allArr: [] })
        } else if (val == "Posted") {
          this.setState({ postedArr: [] })
        } else if (val == "Draft") {
          this.setState({ draftArr: [] })
        } else if (val == "Repeating") {
          this.setState({ repeatArr: [] })
        }
      }
    })
  };

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    console.log("test", this.state.allArr)
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
              <div className="title-sec col-md-12 col-xs-12 mar-btm">
                <h3>Manual Journals</h3>
                <div>
                  <div className="dib">
                    <div className="dropdown menu-item new-cus  mar-rgt-5">
                      <button className="btn btn-blue dropdown-toggle btn-arrow" data-toggle="dropdown" aria-expanded="false">New Journal<span className="caret" /></button>
                      <ul className="dropdown-menu align-right">
                        <li><a href="/new_journal">New Journal</a></li>
                        <li><a href="/new_repeting_journal">New Repeating Journals</a></li>
                      </ul>
                    </div>
                  </div>
                  {/* <Link to="/import_journal">
                  <button className="btn btn-yellow mar-rgt-5">Import</button>
                  </Link> */}
                </div>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <ul className="nav nav-pills transparent nowrap ofx-auto">
                    <li className="active"><a data-toggle="pill" href="#manual-journal" onClick={() => { this.selectedPage("Manual Journal") }}>Manual Journal</a></li>
                    <li ><a data-toggle="pill" href="#all" onClick={() => { this.selectedPage("All") }}>All</a></li>
                    <li><a data-toggle="pill" href="#draft" onClick={() => { this.selectedPage("Draft") }}>Draft</a></li>
                    <li><a data-toggle="pill" href="#posted" onClick={() => { this.selectedPage("Posted") }}>Posted</a></li>
                    <li><a data-toggle="pill" href="#voided" onClick={() => { this.selectedPage("Voided") }}>Voided</a></li>
                    <li><a data-toggle="pill" href="#repeating" onClick={() => { this.selectedPage("Repeating") }}>Repeating</a></li>
                    <li><a data-toggle="pill" href="#archive" onClick={() => { this.selectedPage("Archive") }}>Archive</a></li>
                  </ul>
                </div>
                <div className="row tab-content mar-top pad-top" >
                  <div id="manual-journal" className="col-md-12 tab-pane fade active in pad-no" >
                    <form className="custom-form col-lg-4 col-md-8">
                      <div className="row">
                        <div className="form-group">
                          <label className="label-nowrap">Manual Journal Prefix</label>
                          <input type="text" className="form-control" name="journal_prefix" value={this.state.journal_prefix} onChange={this.newChange} defaultValue="MJ-" />
                        </div>
                        <div className="form-group">
                          <label className="label-nowrap">Manual Journal Next No#</label>
                          <input type="text" className="form-control" name="journal_next_no" value={this.state.journal_next_no} onChange={this.newChange} />
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* {this.state.allArr.length == 0 ? (
                    <div id="all" className="col-md-12 tab-pane fade in pad-no">
                      <div className="landing-wrap">
                        <div className="img-concept text-center">
                          <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                          <p>Looks like there's no data</p>
                        </div>
                      </div>
                    </div>
                  ) : ( */}
                    <div id="all" className="col-md-12 tab-pane fade in pad-no" >
                      <form className="custom-form filter-form col-md-12 col-xs-12">
                        <div className="row">
                          <label className="col-md-12">Search by</label>
                          <div className="form-group col-md-4">
                            <input type="text" placeholder="Narration" className="form-control" value={this.state.allText} name="allText" onChange={this.newChange} />
                          </div>
                          <div className="form-group col-md-4">
                            <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" >
                              <input type="text" className="form-control" placeholder="Start Date" value={this.state.startDate} name="startDate" onBlur={this.newChange} />
                              <div className="input-group-addon">
                                <img src="images/calendar-icon.svg" alt="icon" />
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-md-4">
                            <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" >
                              <input type="text" className="form-control" placeholder="End Date" value={this.state.endDate} name="endDate" onBlur={this.newChange} />
                              <div className="input-group-addon">
                                <img src="images/calendar-icon.svg" alt="icon" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 text-right ">
                            <button className="btn btn-lightgray mar-rgt-5" type='button'
                            onClick={()=>{
                              this.setState({
                                allText : '',
                                startDate : '',
                                endDate : ''
                              },this.getDatas)
                            }}
                            >Clear</button>
                            <div className="btn btn-green mar-rgt-5" type='button' onClick={this.getDatas}>Search</div>
                          </div>
                        </div>
                      </form>
                      <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 mar-t-no pad-no">
                        <div className="table-responsive">
                          <table className="table detail-report">
                            <thead>
                              <tr>
                                <th className="text-left">
                                  Narration
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th>
                                  Date
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th className="text-right">
                                  Debit {this.state.clientHomeCurrency}
                                  <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th className="text-right">
                                  Credit {this.state.clientHomeCurrency}
                                  <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th>
                                  Status
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.allArr.map((data, idx) => {
                                return (
                                  <tr>
                                    <td className="text-left-imp">{data.narration}</td>
                                    <td>{moment(data.journal_date, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                    <td className="text-right"><Comma value={data.grand_total_debit_home_currency} /></td>
                                    <td className="text-right"><Comma value={data.grand_total_credit_home_currency} /></td>
                                    {(() => {
                                      if (data.status_text == "Posted") {
                                        return (
                                          <td><span className="badge green dib">{data.status_text}</span></td>
                                        )
                                      } else if (data.status_text == "Draft") {
                                        return (
                                          <td><span className="badge orange dib">{data.status_text}</span></td>
                                        )
                                      } else if (data.status_text == "Archived") {
                                        return (
                                          <td><span className="badge dark-gray dib">{data.status_text}</span></td>
                                        )
                                      } else if (data.status_text == "Voided") {
                                        return (
                                          <td><span className="badge red dib">{data.status_text}</span></td>
                                        )
                                      }
                                    })()}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  {/* )} */}
                  {/* {this.state.draftArr.length == 0 ? (
                    <div id="draft" className="col-md-12 tab-pane fade in pad-no">
                      <div className="landing-wrap">
                        <div className="img-concept text-center">
                          <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                          <p>Looks like there's no data</p>
                        </div>
                      </div>
                    </div>
                  ) : ( */}
                    <div id="draft" className="col-md-12 tab-pane fade in pad-no">
                      <form className="custom-form filter-form col-md-12 col-xs-12">
                        <div className="row">
                          <label className="col-md-12">Search by</label>
                          <div className="form-group col-md-4">
                            <input type="text" placeholder="Narration" className="form-control" value={this.state.draftText} name="draftText" onChange={this.newChange} />
                          </div>
                          <div className="form-group col-md-4">
                            <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" >
                              <input type="text" className="form-control" placeholder="Start Date" value={this.state.draftStartDate} name="draftStartDate" onBlur={this.newChange} />
                              <div className="input-group-addon">
                                <img src="images/calendar-icon.svg" alt="icon" />
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-md-4">
                            <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" >
                              <input type="text" className="form-control" placeholder="End Date" value={this.state.draftEndDate} name="draftEndDate" onBlur={this.newChange} />
                              <div className="input-group-addon">
                                <img src="images/calendar-icon.svg" alt="icon" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 text-right">
                            <button className="btn btn-lightgray mar-rgt-5"  type='button'
                            onClick={()=>{
                              this.setState({
                                draftText : '',
                                draftStartDate : '',
                                draftEndDate : ''
                              },this.getDatas)
                            }}
                            >Clear</button>
                            <button className="btn btn-green mar-rgt-5" type='button' onClick={this.getDatas}>Search</button>
                          </div>
                        </div>
                      </form>
                      <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 mar-t-no pad-no">
                        <div className="table-responsive">
                          <table className="table detail-report">
                            <thead>
                              <tr>
                                <th className="checkbox-td">
                                  <label className="custom-checkbox small">
                                    <input type="checkbox" name="all" />&nbsp;
                                  <span className="checkmark" />
                                  </label>
                                </th>
                                <th>
                                  Narration
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th>
                                  Date
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th className="text-right">
                                  Debit {this.state.clientHomeCurrency}
                                  <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th className="text-right">
                                  Credit {this.state.clientHomeCurrency}
                                  <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.draftArr.map((data, idx) => {
                                return (
                                  <tr>
                                    <td className="extra-pad-no">
                                      <label className="custom-checkbox small">
                                        <input type="checkbox" name="all" />&nbsp;
                                  <span className="checkmark" />
                                      </label>
                                    </td>
                                    <td className="text-left-imp">{data.narration}</td>
                                    <td>{moment(data.journal_date, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                    <td className="text-right"><Comma value={data.grand_total_debit_home_currency} /></td>
                                    <td className="text-right"><Comma value={data.grand_total_credit_home_currency} /></td>
                                    <td className="text-right"><button
                                      className="btn btn-green dropdown-toggle"
                                      type='button'
                                      onClick={() => this.props.history.push('/new_journal', data.id)}
                                    >
                                      Edit
                                        <span className='caret' />
                                    </button>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  {/* )} */}

                  {/* {this.state.postedArr.length == 0 ? (
                    <div id="posted" className="col-md-12 tab-pane fade in pad-no">
                      <div className="landing-wrap">
                        <div className="img-concept text-center">
                          <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                          <p>Looks like there's no data</p>
                        </div>
                      </div>
                    </div>
                  ) : ( */}
                    <div id="posted" className="col-md-12 tab-pane fade in pad-no">
                      <div className="col-md-12">
                        <div className="alert alert-success post-journal alert-dismissible custom-dismissible">
                          <a href="#" className="close" data-dismiss="alert" aria-label="close">×</a>
                          <div className="dflex">
                            <span className="alert-icon">
                              <img src="images/success-outline-tick.svg" alt="icon" />
                            </span>
                            <div>
                              <span className="cont"><a href="javascript:;">Manual Journal</a> Posted - Ut enim ad minima veniam quis - Total 200.00</span><br />
                              <span className="cont"><a href="javascript:;">Reversed Journal</a> automatically posted</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form className="custom-form filter-form col-md-12 col-xs-12">
                        <div className="row">
                          <label className="col-md-12">Search by</label>
                          <div className="form-group col-md-4">
                            <input type="text" placeholder="Narration" className="form-control" value={this.state.postedText} name="postedText" onChange={this.newChange} />
                          </div>
                          <div className="form-group col-md-4">
                            <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy">
                              <input type="text" className="form-control" placeholder="Start Date" value={this.state.postedStartDate} name="postedStartDate" onBlur={this.newChange} />
                              <div className="input-group-addon">
                                <img src="images/calendar-icon.svg" alt="icon" />
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-md-4">
                            <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" >
                              <input type="text" className="form-control" placeholder="End Date" value={this.state.postedEndDate} name="postedEndDate" onBlur={this.newChange} />
                              <div className="input-group-addon">
                                <img src="images/calendar-icon.svg" alt="icon" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 text-right">
                            <button className="btn btn-lightgray mar-rgt-5"
                             onClick={()=>{
                              this.setState({
                                postedText : '',
                                postedStartDate : '',
                                postedEndDate : ''
                              },this.getDatas)
                            }}
                            type='button'>Clear</button>
                            <button className="btn btn-green mar-rgt-5" type='button' onClick={()=>this.getDatas()}>Search</button>
                          </div>
                        </div>
                      </form>
                      <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 mar-t-no pad-no">
                        <div className="table-responsive">
                          <table className="table detail-report">
                            <thead>
                              <tr>
                                <th className="checkbox-td">
                                  <label className="custom-checkbox small">
                                    <input type="checkbox" name="all" />&nbsp;
                                  <span className="checkmark" />
                                  </label>
                                </th>
                                <th>
                                  Narration
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th>
                                  Date
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th className="text-right">
                                  Debit {this.state.clientHomeCurrency}
                                  <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th className="text-right">
                                  Credit {this.state.clientHomeCurrency}
                                  <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.postedArr.map((data, idx) => {
                                return (
                                  <tr>
                                    <td className="extra-pad-no">
                                      <label className="custom-checkbox small">
                                        <input type="checkbox" name="all" />&nbsp;
                                  <span className="checkmark" />
                                      </label>
                                    </td>
                                    <td className="text-left-imp">{data.narration}</td>
                                    <td>{moment(data.journal_date, "YYYY-MM-DD").format("DD-MM-YYYY")}{ }</td>
                                    <td className="text-right"><Comma value={data.grand_total_debit_home_currency} /></td>
                                    <td className="text-right"><Comma value={data.grand_total_credit_home_currency} /></td>
                                    <td className="text-right"><button
                                      className="btn btn-green dropdown-toggle"
                                      type='button'
                                      onClick={() => this.props.history.push('/new_journal', data.id)}
                                    >
                                      Edit
                                        <span className='caret' />
                                    </button>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  {/* )} */}
                  <div id="voided" className="col-md-12 tab-pane fade in pad-no">
                    <div className="landing-wrap">
                      <div className="img-concept text-center">
                        <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                        <p>Looks like there's no data</p>
                      </div>
                    </div>
                  </div>

                  {/* {this.state.repeatArr.length == 0 ? (
                    <div id="repeating" className="col-md-12 tab-pane fade in pad-no">
                      <div className="landing-wrap">
                        <div className="img-concept text-center">
                          <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                          <p>Looks like there's no data</p>
                        </div>
                      </div>
                    </div>
                  ) : ( */}
                    <div id="repeating" className="col-md-12 tab-pane fade in pad-no">
                      <form className="custom-form h-small filter-form">
                        <div className="row">
                          <label className="col-md-12">Search by</label>
                          <div className="form-group col-md-7">
                            <input type="text" placeholder="Narration" className="form-control" value={this.state.repeatingText} name="repeatingText" onChange={this.newChange} />
                          </div>
                          <div className="form-group col-md-5">
                            <button className="btn btn-lightgray mar-rgt-5"  type='button'
                             onClick={()=>{
                              this.setState({
                                repeatingText : '',
                              },this.getDatas)
                            }}
                            >Clear</button>
                            <button className="btn btn-green mar-rgt-5"  type='button' onClick={()=>this.getDatas}>Search</button>
                          </div>
                        </div>
                      </form>

                      <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 mar-t-no pad-no">
                        <div className="table-responsive">
                          <table className="table detail-report">
                            <thead>
                              <tr>
                                <th className="text-left-imp">
                                  Narration
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th className="text-right">
                                  Debit {this.state.clientHomeCurrency}
                                  <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th className="text-right">
                                  Credit {this.state.clientHomeCurrency}
                                  <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th>
                                  Repeats
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th>
                                  Next Journal Date
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th>
                                  End Date
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th>
                                  Journal Will be
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.repeatArr.map((lis, idx) => {
                                return (
                                  <tr>
                                    <td className="text-left-imp">{lis.narration}</td>
                                    <td className="text-right"><Comma value={lis.grand_total_debit_home_currency} /></td>
                                    <td className="text-right"><Comma value={lis.grand_total_credit_home_currency} /></td>
                                    <td>Every 2 Weeks</td>
                                    <td>12-03-2020</td>
                                    <td>06-08-2020</td>
                                    <td>{lis.status_text}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  {/* )} */}

                  <div id="archive" className="col-md-12 tab-pane fade in pad-no">
                    <div className="landing-wrap">
                      <div className="img-concept text-center">
                        <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                        <p>Looks like there's no data</p>
                      </div>
                    </div>
                  </div>

                  {/* <div id="archive" className="col-md-12 tab-pane fade in pad-no">
                    <form className="custom-form filter-form col-md-12 col-xs-12">
                      <div className="row">
                        <label className="col-md-12">Search by</label>
                        <div className="form-group col-md-4">
                          <input type="text" placeholder="Narration" className="form-control" name />
                        </div>
                        <div className="form-group col-md-4">
                          <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" data-provide="datepicker">
                            <input type="text" className="form-control" placeholder="Start Date"  value={this.state.archiveStartDate} name="archiveStartDate" onBlur={this.newChange}/>
                            <div className="input-group-addon">
                              <img src="images/calendar-icon.svg" alt="icon" />
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-4">
                          <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" data-provide="datepicker" >
                            <input type="text" className="form-control" placeholder="End Date"  value={this.state.archiveEndDate} name="archiveEndDate" onBlur={this.newChange}/>
                            <div className="input-group-addon">
                              <img src="images/calendar-icon.svg" alt="icon" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 text-right">
                          <button className="btn btn-lightgray mar-rgt-5">Clear</button>
                          <button className="btn btn-green mar-rgt-5">Search</button>
                        </div>
                      </div>
                    </form>
                    <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 mar-t-no pad-no">
                      <div className="table-responsive"> */}
                  {/* <table className="table detail-report">
                          <thead>
                            <tr>
                              <th className="checkbox-td">
                                <label className="custom-checkbox small">
                                  <input type="checkbox" name="all" />&nbsp;
                                  <span className="checkmark" />
                                </label>
                              </th>
                              <th>
                                Narration
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th>
                                Date
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th className="text-right">
                                Debit {this.state.clientHomeCurrency}
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th className="text-right">
                                Credit {this.state.clientHomeCurrency}
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="extra-pad-no">
                                <label className="custom-checkbox small">
                                  <input type="checkbox" name="all" />&nbsp;
                                  <span className="checkmark" />
                                </label>
                              </td>
                              <td>Reversal: Test lorem ipsum dolor</td>
                              <td>06-08-2020</td>
                              <td className="text-right">200.00</td>
                              <td className="text-right">200.00</td>
                            </tr>
                        
                          </tbody>
                        </table> */}

                  {/* </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          {this.state.pageSelected == "Manual Journal" ? (
            <div className="pf-btm-wrap bg-sticky">
              <div className="col-md-12 text-right pad-no">
                <button className="btn btn-lightgray mar-rgt-5" onClick={()=>window.location.reload()}>Cancel</button>
                <button className="btn btn-green mar-rgt-5" onClick={this.save}>Save</button>
              </div>
            </div>
          ) : (
            null
          )}
          {/* pf-btm-wrap Ends here */}
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