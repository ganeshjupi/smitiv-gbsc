import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery';
import Footer from "../components/footer.jsx";
import Category from "./categoryadd"
import "./preference.css"
import Comma from './../components/comma'


export default class Charts extends React.Component {
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
      select_id: "All Accounts",
      account_list: [],
      account_list_type: [],
      confirm_status: 0,
    }
  };


  delete_or_inactive_account_name = (statuscode, id) => {

    let input = {
      client_id: this.state.logged_client_id,
      status_to_set: statuscode,
      account_id: id,
      confirm_status: this.state.confirm_status
    }

    this.setState({ deleteInput: input })

    // if (this.state.role_permissions.includes(19)) {

    FetchAllApi.delete_or_inactive_account_name(
      input, (err, response) => {
        // alert(response.response.length)
        if (response.status === 1) {
          alert(response.message)
          this.setState({ confirm_status: '0' }, () => window.jQuery('#deActiveModal').modal('hide'))
          // this.setState(
          //   { isSuccessful: true, res_msg: response.message },
          //   () => {
          //     setTimeout(() => {
          //       this.setState({ isSuccessful: true })
          //     }, 1500)
          //   }
          // )
          this.getAccount(this.state.status ? this.state.status : '1');
        }
        if (response.status === 2) {
          this.setState({ response_to_inactive: response.message }, () => window.jQuery('#deActiveModal').modal('show'))

          // this.setState({ response_to_inactive: response.message }, () => {
          //   window.jQuery('#pop_add_notes').modal('show')
          // })
        }

        if (response.status === 0) {
          // alert('you cant delete')
          alert(response.message)
          // this.setState(
          //   { isSuccessful: true, isWarning: true, res_msg: response.message },
          //   () => {
          //     setTimeout(() => {
          //       this.setState({ isWarning: false })
          //     }, 1500)
          //   }
          // )
        } if (response.status === 3) {
          // this.setState({ response_to_inactive: response.message }, () => {
          alert(response.message)
          // window.jQuery('#pop_add_notes').modal('show')
          // this.deleteCustomer(3, customer_id)
          // })
        }
      }
    )
    // } else {
    //   alert("Required permission")
    // }
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

  componentDidMount = () => {
    this.getAccount(1);

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

  addAccountFunc = () => {
    window.jQuery("#pop-modal").modal("show");
  };

  onFunc = (val) => {
    this.setState({ select_id: val })
  }

  getAccount = (status) => {
    FetchAllApi.get_chart_accounts(this.state.logged_client_id, status, (err, response) => {
      if (response.status === 1) {
        this.setState({ account_list: response.account_lists, account_list_type: response.account_types, status })
      }
    });
  };

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    console.log("list", this.state.account_list)
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
                <h3>Chart of Accounts</h3>
                <div>
                  <button className="btn btn-blue with-icon mar-rgt-5" onClick={this.addAccountFunc}>
                    <img src="images/plus-add.svg" className="filter-white" />
                    Add Account
                  </button>
                  {/* <div className="dib">
                    <div className="dropdown menu-item mar-rgt-5">
                      <button className="btn btn-blue dropdown-toggle btn-arrow" data-toggle="dropdown" aria-expanded="false">More<span className="caret" /></button>
                      <ul className="dropdown-menu align-right">
                        <li><a href="javascript:;">Add Bank Account</a></li>
                        <li><a href="javascript:;">Import</a></li>
                        <li><a href="javascript:;">Export</a></li>
                        <li><a href="javascript:;">Print PDF</a></li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <div className="col-md-12 pad-no nav-com-search">
                    <ul className="nav nav-pills transparent nowrap ofx-auto">
                      <li className="active"><a data-toggle="pill" onClick={() => { this.onFunc("All Accounts") }}>All Accounts</a></li>
                      {this.state.account_list_type.map((type, idx) => {
                        return (
                          <li><a data-toggle="pill" onClick={() => { this.onFunc(type.name) }}>{type.name}</a></li>
                        )
                      })}
                    </ul>
                    {/* <form className="custom-form h-small mar-b-no">
                      <div className="form-group search-box">
                        <input type="text" name="search" className="form-control" placeholder="Search..." />
                      </div>
                    </form> */}
                  </div>
                </div>

                {/* 
                <div className="row col-md-4" style={{ marginTop: '21px' }}>
                  <div className='form-group mar-rgt'>
                    <div className="form-cont" >

                      <select
                        // style={{ width: 95 }}
                        className="selectpicker form-control hh "
                        onChange={(e) => this.getAccount(e.target.value)}
                      >
                        <option value='1'>Active Accounts</option>

                        <option value=''>All Accounts</option>

                        <option value='2'>Inactive Accounts</option>
                      </select>
                    </div>
                  </div>
                </div> */}

                <div className="custom-form mar-b-no mar-top row ">
                  <div className=" col-md-4 col-sm-4 col-xs-12 form-group mar-b-no mar-top pad-hor-no">
                    {/* <label>Mode of Payment</label> */}

                    <select
                      className="selectpicker form-control "  //add-new
                      data-live-search="true"
                      // title='Choose Sub Account Category'
                      value={this.state.sub_Account_id}
                      onChange={(e) => this.getAccount(e.target.value)}
                    >
                      <option value='1'>Active Accounts</option>
                      <option value=''>All Accounts</option>
                      <option value='2'>Inactive Accounts</option>
                    </select>

                  </div>
                </div>

                <div className="row tab-content pad-top">
                  {this.state.account_list.length == 0 ? (
                    <div id={this.state.select_id} className="col-md-12 tab-pane fade in pad-no">
                      <div className="landing-wrap">
                        <div className="img-concept text-center">
                          <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                          <p>Looks like there's no data</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div id={this.state.select_id} className="col-md-12 tab-pane fade active in pad-no">
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
                                <th className="text-left">
                                  Code
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th>
                                  Name
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th>
                                  Type
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                                <th className="text-right">
                                  YTD
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {(() => {
                                if (this.state.select_id == "All Accounts") {
                                  return (
                                    this.state.account_list.map((lis, idx) => {
                                      return (
                                        <tr>
                                          <td className="extra-pad-no">
                                            <label className="custom-checkbox small">
                                              <input type="checkbox" name="all" />&nbsp;
                                  <span className="checkmark" />
                                            </label>
                                          </td>
                                          <td>{lis.code}</td>
                                          <td>{lis.name}</td>
                                          <td>{lis.account_type_name}</td>
                                          <td className="text-right"><Comma value={lis.ytd} /></td>
                                          <td className='action-td text-right'>
                                            <div className="dropdown menu-item new-cus">
                                              <a
                                                href="javascript"
                                                class="dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <button
                                                  className="btn btn-green dropdown-toggle"
                                                  type='button'
                                                >
                                                  Action
                                                   <span className='caret' />
                                                </button>
                                              </a>
                                              <ul className="dropdown-menu align-right">
                                                <li>
                                                  <a
                                                    onClick={() => { this.delete_or_inactive_account_name('0', lis.id) }}
                                                  >Delete</a>
                                                </li>
                                                <li>
                                                  <a
                                                    onClick={() => { this.delete_or_inactive_account_name(lis.status == '1' ? '2' : '1', lis.id) }}
                                                  >{lis.status == '1' ? 'In active' : 'Active'}</a>
                                                </li>
                                              </ul>
                                            </div>
                                          </td>

                                        </tr>
                                      )
                                    }))
                                } else {
                                  return (
                                    this.state.account_list.map((lis, idx) => {

                                      if (this.state.select_id == lis.account_type_name) {
                                        return (

                                          <tr>
                                            <td className="extra-pad-no">
                                              <label className="custom-checkbox small">
                                                <input type="checkbox" name="all" />&nbsp;
                                              <span className="checkmark" />
                                              </label>
                                            </td>
                                            <td>{lis.code}</td>
                                            <td>{lis.name}</td>
                                            <td>{lis.account_type_name}</td>
                                            <td className="text-right"><Comma value={lis.ytd} /></td>
                                            <td className='action-td text-right'>
                                              <div className="dropdown menu-item new-cus">
                                                <a
                                                  href="javascript"
                                                  class="dropdown-toggle"
                                                  data-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  <button
                                                    className="btn btn-green dropdown-toggle"
                                                    type='button'
                                                  >
                                                    Action
                                                   <span className='caret' />
                                                  </button>
                                                </a>
                                                <ul className="dropdown-menu align-right">
                                                  <li>
                                                    <a
                                                      onClick={() => { this.delete_or_inactive_account_name(0, lis.id) }}
                                                    >Delete</a>
                                                  </li>
                                                  <li>
                                                    <a
                                                      onClick={() => { this.delete_or_inactive_account_name(2, lis.id) }}
                                                    >In active</a>
                                                  </li>
                                                </ul>
                                              </div>
                                            </td>
                                          </tr>


                                        )
                                      }
                                    })
                                  )

                                }
                              })()}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                </div>



                <div
                  className='modal fade pop-modal'
                  id='deActiveModal'
                  role='dialog'
                >
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Warning!</h3>

                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            {this.state.response_to_inactive}{' '}
                          </div>

                          <div
                            className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'
                            className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'
                          >
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                            >
                              Cancel
                        </button>
                            <span>{'   '}</span>
                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {
                                this.setState({ confirm_status: 1 })
                                setTimeout(() => {
                                  this.delete_or_inactive_account_name('2', this.state.deleteInput['account_id'])
                                }, 500);
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

          </section>
          {/* user-content Ends here */}
        </div>
        <Category
          defaultcategorylist_onchange={this.defaultcategorylist_onchange}
        />
        {/* Main Wrapper Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}

      </React.Fragment>
    )
  }
}