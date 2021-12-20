// NPM used for scroll is imported from 'npm i react-horizontal-scroll-container'
import React, { Component } from 'react'
import jQuery from 'jquery'
// import HorizontalScroller from 'react-horizontal-scroll-container'
import LeftSidebar from './left_sidebar'
import Footer from './footer'

import Topbar from './topbar'

import FetchAllApi from '../api_links/fetch_all_api'
import DatePicker from 'react-datepicker'

export default class rolesPermissions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      responseTableData: [],
      responseData: [],
      shown: true,
      isChecked: true,
      newrole: '',
      item_name: '',
      isUpdated: '',
      isAdded: false,
      isFailed: false,
      roleStringLen: false
    }
    this.myDivToFocus = React.createRef()
  }
  componentDidMount() {



    this.callMe()
    // jQuery(document).ready(function () {
    //   jQuery('.container').css('background', '#F8F8F8')
    //   jQuery('.container').css('height', '-webkit-fill-available')
    // })
    jQuery(".mscroll-y").mCustomScrollbar({
      axis: "y",
      scrollEasing: "linear",
      scrollInertia: 600,
      autoHideScrollbar: "true",
      autoExpandScrollbar: "true"
    });
    jQuery(".mscroll-x").mCustomScrollbar({
      axis: "x",
      scrollEasing: "linear",
      scrollInertia: 600,
      autoHideScrollbar: "true",
      autoExpandScrollbar: "true"
    });

    jQuery(".ib-scroll").mCustomScrollbar({
      scrollEasing: "linear",
      scrollInertia: 600,
      scrollbarPosition: "outside"
    });

  }

  addNewRoleAPI = () => {

    let role_name = jQuery('#get_role').val()
    if (role_name) {

      let permissions = []

      FetchAllApi.addUserRole(role_name, permissions, (err, response) => {
        if (response.status === 1) {
          window.jQuery('#add_new_role').modal('hide')
          jQuery('#get_role').val('')
          //alert(response.message)
          this.setState({ isAdded: true, shown: !this.state.shown, isUpdated: response.message })
          setTimeout(() => { this.setState({ isAdded: false }) }, 5000)
          // this.jQueryStatusAlert()
          this.callMe()
          this.handleOnClick()
        } else {
          this.jQueryStatusAlert()
          this.setState({ isUpdated: response.message, isFailed: true })
          setTimeout(() => { this.setState({ isFailed: false }) }, 5000)

        }
      })

    } else {
      this.setState({ roleStringLen: true })
    }

  }

  addNewRole = inputfromuser => {
    let input = inputfromuser
    this.setState({
      newrole: input
    })
  }

  callMe = () => {
    FetchAllApi.getUserRoles((err, response) => {
      console.log('add comment', response)

      if (response.status === 1) {
        this.setState({ responseData: response.list })
      } else {
      }
    })


    FetchAllApi.getTableData((err, response) => {
      console.log('add comment', response)

      if (response.status === 1) {
        this.setState({ responseTableData: response.Invocieamount })
      } else {
      }
    })

  }
  deleteRloe = (id) => {
    // alert(id)
    let role_id = id;

    FetchAllApi.delete_user_role(role_id, (err, response) => {
      // alert(response.message)

      if (response.status === 1) {
        // window.jQuery('#add_new_role').modal('hide')
        // jQuery('#get_role').val('')
        this.setState({ isAdded: true, shown: !this.state.shown, isUpdated: response.message })
        setTimeout(() => { this.setState({ isAdded: false }) }, 5000)
        // this.jQueryStatusAlert()
        this.callMe()
        this.handleOnClick()
      } else {
        // this.jQueryStatusAlert()
        this.setState({ isUpdated: response.message, isFailed: true })
        setTimeout(() => { this.setState({ isFailed: false }) }, 5000)

      }
    })


  }
  showNewField = () => {
    this.setState({ IsShow: true })
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  editUserFetchCall = (role_id, role_name, permissions) => {
    FetchAllApi.editUserRole(
      role_id,
      role_name,
      permissions,
      (err, response) => {
        // alert(response.message)
        if (response.status === 1) {
          this.setState({
            isUpdated: response.message
          })
          this.callMe()
          this.jQueryStatusAlert()
        } else {
          this.setState({
            isUpdated: response.message
          })

          this.jQueryStatusAlert()
        }
      }
    )
  }

  getCheckboxVal(e, name, roleid, permissionarray) {
    // alert(name)
    if (!permissionarray.includes(parseInt(e.target.value))) {
      e.target.dataset.value = e.target.value
      if (permissionarray != undefined) {
        let parsedint = parseInt(e.target.value)
        let IsAvailable = permissionarray.includes(parsedint)
        if (IsAvailable) {
        } else {
          let parsedint = parseInt(e.target.value)
          permissionarray.push(parsedint)
          console.log('afterticking=====', permissionarray)
          let role_id = roleid
          let role_name = name
          let permissions = permissionarray
          this.editUserFetchCall(role_id, role_name, permissions)
          this.callMe()
        }
      }
    } else {
      let permissions = permissionarray
      let parsedint = parseInt(e.target.value)

      function arrayRemove(permissions, parsedint) {
        return permissions.filter(function (ele) {
          return ele != parsedint
        })
      }

      var result = arrayRemove(permissions, parsedint)
      let role_id = roleid
      let role_name = name
      permissions = result
      FetchAllApi.editUserRole(
        role_id,
        role_name,
        permissions,

        (err, response) => {
          if (response.status === 1) {
            this.setState({
              isUpdated: response.message
            })

            this.jQueryStatusAlert()
            this.callMe()
          } else {
            this.setState({
              isUpdated: response.message
            })

            this.jQueryStatusAlert()
          }
        }
      )
    }
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }

  jQueryStatusAlert = () => {
    jQuery('.resp_msg').fadeIn(2000)
    setTimeout(function () {
      jQuery('.resp_msg').fadeOut(2000)
    }, 8000)
  }

  handleOnClick = event => {
    if (this.myDivToFocus.current) {
      this.myDivToFocus.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }

  render() {
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <LeftSidebar history={this.props.history} pageSubmit={e => this.pageLink(e)} />
            pageLink
            <div className='menu-close visible-xs'>&nbsp;</div>
            <div className='main-wrap col-md-12 col-xs-12 pad-r-no'>
              <div className='top-bar col-md-12 col-xs-12 pad-r-no'>
                <div className='nav-brand-res visible-xs'>
                  <img
                    className='img-responsive'
                    src='../images/logo-icon.png'
                    alt='LogoIcon'
                  />
                </div>
                {this.state.isFailed ? (
                  <div
                    id='failed_alrt'
                    class='alert alert-card danger alert-dismissible fade in'
                  >
                    <a
                      href='#'
                      class='close'
                      data-dismiss='alert'
                      aria-label='close'
                    >
                      &times;
                        </a>
                    <div class='img-wrap'>
                      <img
                        class='img-responsive'
                        src='images/alert-cross.svg'
                        alt='icon'
                      />
                    </div>
                    {/* < AlertSucc msg={'hiii'}/> */}
                    <div class='alert-cont'>
                      <strong class='title'>Failed!</strong>
                      {this.state.isUpdated}.
                        </div>
                  </div>
                ) : (
                    ''
                  )}
                {this.state.isAdded ? (
                  <div
                    class='alert alert-card success alert-dismissible fade in'
                    id='closeme'
                  >
                    <a
                      href='#'
                      class='close'
                      data-dismiss='alert'
                      aria-label='close'
                    >
                      &times;
                        </a>
                    <div class='img-wrap'>
                      <img
                        class='img-responsive'
                        src='../../images/alert-success.svg'
                        alt='icon'
                      />
                    </div>
                    <div class='alert-cont'>
                      <strong class='title'>Success!</strong>
                          Updated successfully.
                        </div>
                  </div>
                ) : (
                    ''
                  )}
                <span className='page-title hidden-xs'>Preferences</span>

                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />

              </div>

              {/* main content goes here */}



              <div className="main-content col-md-12 col-xs-12">
                <a href="javascript:;" className="back visible-xs">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <span className="page-title visible-xs">Roles &amp; Permissions</span>
                <div className="content-sec col-md-12 col-xs-12 pad-no permission-enclose">
                  <div className="role-left">
                    <div className="role-left-head">
                      <button className="btn btn-blue btn-rounded add-new">
                        <img src="images/add-circular-icon.svg" alt="icon" />
          Add New Role
        </button>
                    </div>
                    <ul className="list-unstyled role-label">
                      <li>
                        <span contentEditable="true">Super Admin</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Admin</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Shareholders</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Managers</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Seniors</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Associates</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Super Admin</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Admin</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Shareholders</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Managers</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Seniors</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Associates</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Managers</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Seniors</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                      <li>
                        <span contentEditable="true">Associates</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>     <li>
                        <span contentEditable="true">Associates</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>     <li>
                        <span contentEditable="true">Associates</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>     <li>
                        <span contentEditable="true">Associates</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>     <li>
                        <span contentEditable="true">Associates</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>     <li>
                        <span contentEditable="true">Associates</span>
                        <div className="pull-right">
                          <button className="btn">
                            <img src="images/tick-green.svg" alt="icon" />
                          </button>
                          <button className="btn">
                            <img src="images/cross-red.svg" alt="icon" />
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="permission-table">
                    <div className="mscroll-x">
                      <div className="permission-row head">
                        <div className="permission-card">
                          <p className="text-center col-md-12 col-xs-12">User</p>
                          <span className="col-md-4 col-xs-4 text-center">View</span>
                          <span className="col-md-4 col-xs-4 text-center">Edit</span>
                          <span className="col-md-4 col-xs-4 text-center">Delete</span>
                        </div>
                        <div className="permission-card">
                          <p className="text-center col-md-12 col-xs-12">Client</p>
                          <span className="col-md-4 col-xs-4 text-center">View</span>
                          <span className="col-md-4 col-xs-4 text-center">Edit</span>
                          <span className="col-md-4 col-xs-4 text-center">Delete</span>
                        </div>
                        <div className="permission-card">
                          <p className="text-center col-md-12 col-xs-12">Inbox</p>
                          <span className="col-md-4 col-xs-4 text-center">View</span>
                          <span className="col-md-4 col-xs-4 text-center">Edit</span>
                          <span className="col-md-4 col-xs-4 text-center">Delete</span>
                        </div>
                        <div className="permission-card">
                          <p className="text-center col-md-12 col-xs-12">Report</p>
                          <span className="col-md-4 col-xs-4 text-center">View</span>
                          <span className="col-md-4 col-xs-4 text-center">Edit</span>
                          <span className="col-md-4 col-xs-4 text-center">Delete</span>
                        </div>
                        <div className="permission-card">
                          <p className="text-center col-md-12 col-xs-12">Invoice</p>
                          <span className="col-md-4 col-xs-4 text-center">View</span>
                          <span className="col-md-4 col-xs-4 text-center">Edit</span>
                          <span className="col-md-4 col-xs-4 text-center">Delete</span>
                        </div>    <div className="permission-card">
                          <p className="text-center col-md-12 col-xs-12">Invoice</p>
                          <span className="col-md-4 col-xs-4 text-center">View</span>
                          <span className="col-md-4 col-xs-4 text-center">Edit</span>
                          <span className="col-md-4 col-xs-4 text-center">Delete</span>
                        </div>    <div className="permission-card">
                          <p className="text-center col-md-12 col-xs-12">Invoice</p>
                          <span className="col-md-4 col-xs-4 text-center">View</span>
                          <span className="col-md-4 col-xs-4 text-center">Edit</span>
                          <span className="col-md-4 col-xs-4 text-center">Delete</span>
                        </div>    <div className="permission-card">
                          <p className="text-center col-md-12 col-xs-12">Invoice</p>
                          <span className="col-md-4 col-xs-4 text-center">View</span>
                          <span className="col-md-4 col-xs-4 text-center">Edit</span>
                          <span className="col-md-4 col-xs-4 text-center">Delete</span>
                        </div>    <div className="permission-card">
                          <p className="text-center col-md-12 col-xs-12">Invoice</p>
                          <span className="col-md-4 col-xs-4 text-center">View</span>
                          <span className="col-md-4 col-xs-4 text-center">Edit</span>
                          <span className="col-md-4 col-xs-4 text-center">Delete</span>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="permission-row">
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="permission-card">
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 col-xs-4">
                            <div className="check-wrap">
                              <label className="custom-checkbox">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>





            </div>




            <div
              className='modal fade pop-modal'
              id='add_new_role'
              role='dialog'
            >
              <div className='modal-dialog modal-md custom-modal'>
                <button
                  type='button'
                  className='close hidden-xs'
                  data-dismiss='modal'
                  onClick={() => { this.setState({ roleStringLen: false }) }}
                >
                  <img
                    className='img-responsive'
                    src='../../images/close-red.svg'
                    alt='icon'
                  />
                </button>
                <div className='modal-content'>
                  <div className='modal-body text-center'>
                    <h3>Add New Role</h3>
                    <form className='custom-form row'>
                      <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                        <div className='col-md-4 col-sm-4 col-xs-12'>
                          <label>Role Name</label>
                        </div>
                        <div className='col-md-8 col-sm-8 col-xs-12'>
                          <input autoComplete='off' type='text' className='form-control' id='get_role' />
                          <div style={{ float: 'left' }}>
                            {this.state.roleStringLen && <small style={{ color: 'red' }}>
                              *Please fill out role name.
                              </small>}
                          </div>                        </div>

                      </div>

                      <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>

                        <button
                          className='btn btn-lightgray'
                          data-dismiss='modal'
                          onClick={() => { this.setState({ roleStringLen: false }) }}
                        >
                          Cancel
                        </button>
                        <span>{'   '}</span>
                        <button className='btn btn-green' type='button' onClick=
                          {e => {
                            this.addNewRoleAPI()
                          }}>

                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Footer logoutSubmit={e => this.logoutLink(e)} />
        <div ref={this.myDivToFocus}></div>
      </div>
    )
  }
}
