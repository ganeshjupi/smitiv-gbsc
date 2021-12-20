// NPM used for scroll is imported from 'npm i react-horizontal-scroll-container'
import React, { Component } from 'react'
import jQuery from 'jquery'
// import HorizontalScroller from 'react-horizontal-scroll-container'
import LeftSidebar from './preferenceSide'
import Footer from '../components/footer'

import Topbar from "../components/first_user_module/header";

import FetchAllApi from '../api_links/fetch_all_api'
import DatePicker from 'react-datepicker'

export default class rolesAndPermissions extends React.Component {
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
      responseTableData: [],
      responseData: [],
      shown: true,
      isChecked: true,
      newrole: '',
      item_name: '',
      isUpdated: '',
      isAdded: false,
      isFailed: false,
      roleStringLen: false,
      role: '',
      comingData: []
    }
    this.myDivToFocus = React.createRef()
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

  componentDidMount() {
    // this.runjquery();

    // jQuery(document).ready(function () {
    //   window.jQuery('.permission-row.head,.role-left-head').sticky({ topSpacing: 0, bottomSpacing: jQuery("footer").outerHeight(true) });

    //   jQuery(".has-sub").click(function () {
    //     jQuery(this).parent().addClass("active").next(".sub-menu").slideToggle();
    //   });
    //   jQuery(".search-btn").click(function () {
    //     jQuery(".hdr-search").addClass("active");
    //   });
    //   jQuery(".hdr-search .close-icon").click(function () {
    //     jQuery(".hdr-search").removeClass("active");
    //   });
    //   window.jQuery(".select-picker").selectpicker();
    //   jQuery(".label-enclose .label").click(function () {
    //     jQuery(this).toggleClass("active");
    //   });
    //   jQuery(".nav-brand-res").click(function () {
    //     jQuery(".left-navbar").addClass("active");
    //   });
    //   jQuery(".menu-close").click(function () {
    //     jQuery(".left-navbar").removeClass("active");
    //   });

    // });

    // alert('gyt')
    this.callMe()
    // jQuery(document).ready(function () {
    //   jQuery('.container').css('background', '#F8F8F8')
    //   jQuery('.container').css('height', '-webkit-fill-available')
    // })

  }
  doAlert = () => {
    alert('hi')
  }
  componentDidUpdate() {
    // window.jQuery(".mscroll-y").mCustomScrollbar({
    //   axis: "y",
    //   scrollEasing: "linear",
    //   scrollInertia: 600,
    //   autoHideScrollbar: "true",
    //   autoExpandScrollbar: "true"
    // });
    // window.jQuery(".mscroll-x").mCustomScrollbar({
    //   axis: "x",
    //   scrollEasing: "linear",
    //   scrollInertia: 600,
    //   autoHideScrollbar: "true",
    //   autoExpandScrollbar: "true"
    // });
    // jQuery(".mscroll-y").mCustomScrollbar({
    //   axis: "y",
    //   scrollEasing: "linear",
    //   scrollInertia: 600,
    //   autoHideScrollbar: "true",
    //   autoExpandScrollbar: "true"
    // });
    // jQuery(".mscroll-x").mCustomScrollbar({
    //   axis: "x",
    //   scrollEasing: "linear",
    //   scrollInertia: 600,
    //   autoHideScrollbar: "true",
    //   autoExpandScrollbar: "true"
    // });

    // jQuery(".ib-scroll").mCustomScrollbar({
    //   scrollEasing: "linear",
    //   scrollInertia: 600,
    //   scrollbarPosition: "outside"
    // });

    // window.jQuery('.permission-row.head,.role-left-head').sticky({ topSpacing: 0, bottomSpacing: jQuery("footer").outerHeight(true) });
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
          this.props.history.push('/loading', ['/preference_permission'])
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

  runjquery = () => {

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

    window.jQuery(".ib-scroll").mCustomScrollbar({
      scrollEasing: "linear",
      scrollInertia: 600,
      scrollbarPosition: "outside"
    });

  }

  callMe = () => {
    FetchAllApi.getUserRoles((err, response) => {
      console.log('add comment', response)

      if (response.status === 1) {
        this.setState({ responseData: response.list }
        )

        setTimeout(() => {
          this.runjquery()
        }, 5000);


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
        // this.callMe()
        this.props.history.push('/loading', ['/preference_permission'])

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
          alert(response.message)
          this.jQueryStatusAlert()
        } else {
          this.setState({
            isUpdated: response.message
          })
           alert(response.message)
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
    console.log('qwerty', this.state.role)
    return (
      <React.Fragment>
        <div className="container-fluid">
          {/* header Starts here */}
          <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
        <h3>Subscribers</h3>
    </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
            <div className="user-cont-left">
              <LeftSidebar history={this.props.history} pageSubmit={e => this.pageLink(e)} />
            </div>
            <div className="user-cont-right">
              <div class="title-sec col-md-12 col-xs-12">
                <h3>Roles & Permissions</h3>

              </div>

              {/* <HorizontalScroller sensibility={300}> */}

              {this.state.responseTableData && <div className='content-sec col-md-12 col-xs-12 pad-no permission-enclose' >
                <div className='role-left' >
                  <div className="sticky-holder" style={{ visibility: 'hidden', height: 0, display: 'block' }} />

                  {/* <button
                      className='btn btn-blue btn-rounded add-new'
                      onClick={() => {
                        this.setState({ shown: !this.state.shown })

                        window.jQuery('#add_new_role').modal('show')
                      }}
                      // onClick={this.addNewRoleAPI}
                    >
                      <img src='images/add-circular-icon.svg' alt='icon' />
                      Add New Role
                    </button>
                   
                    */}
                  <div class="role-left-head">
                    <button class="btn btn-blue btn-rounded add-new" onClick={() => {
                      this.setState({ shown: !this.state.shown })

                      window.jQuery('#add_new_role').modal('show')
                    }}>
                      <img src="images/add-circular-icon.svg" alt="icon" />
                                Add New Role
                            </button>
                  </div>

                  {/* {!this.state.shown ? (
                      <ul className='list-unstyled role-label '>
                        <li>
                          <span
                            contenteditable='true'
                            onInput={e => {
                              let input = e.currentTarget.textContent
                              this.addNewRole(input)
                            }}
                          >
                            New role
                          </span>
                          <div>
                            <span
                              className='pull-right'
                              style={{
                                height: 25,
                                paddingBottom: 4,
                                background: 'white'
                              }}
                            >
                              <button
                                style={{
                                  height: 23,
                                  width: 20,
                                  borderWidth: 1,
                                  paddingBottom: 20
                                }}
                                id='tick'
                                type='btn'
                                className='btn'
                                onClick={this.addNewRoleAPI}
                              >
                                <img
                                  style={{}}
                                  src='images/tick-green.svg'
                                  alt='icon'
                                />
                              </button>
                              <button
                                className='btn'
                                style={{
                                  height: 23,
                                  width: 20,
                                  borderWidth: 1,
                                  paddingBottom: 20
                                }}
                                // onClick={this.testFun.bind(this)}
                              >
                                <img src='images/cross-red.svg' alt='icon' />
                              </button>
                            </span>
                          </div>
                        </li>
                      </ul>
                    ) : (
                      ''
                    )} */}

                  <ul className='list-unstyled role-label'>
                    {this.state.responseData.map((item, index) => {
                      let name = item.name
                      let roleid = item.id
                      this.state[item.name] = item.id
                      // this.setState({ [item.name] : item.id});
                      let permissionarray = item.permissions
                      return (
                        <div key={index}>
                          <li>

                            <span
                              contenteditable='true'
                              onInput={e => {
                                let input = e.currentTarget.textContent
                                this.addNewRole(input)
                              }}
                            >
                              {/* <input type="hidden" name={thi} */}
                              <input className='mar-rgt-5' type='radio' name="optradio" value={item.name}
                                onChange={(e) =>
                                  this.setState({ role: e.target.value })
                                  // console.log('iu',e.target.value)
                                } />
                              {item.name}{' '}
                            </span>
                            <div>
                              <span
                                className='pull-right'
                                style={{
                                  height: 25,
                                  paddingBottom: 4,
                                  background: 'white'
                                }}
                              >
                                <button
                                  style={{
                                    height: 23,
                                    width: 20,
                                    borderWidth: 1,
                                    paddingBottom: 20
                                  }}
                                  id='tick'
                                  type='btn'
                                  className='btn'
                                  // onClick={this.addNewRoleAPI}
                                  onClick={e =>
                                    this.editUserFetchCall(
                                      roleid,
                                      this.state.newrole,
                                      permissionarray
                                    )
                                  }
                                >
                                  <img
                                    style={{}}
                                    src='images/tick-green.svg'
                                    alt='icon'
                                  />
                                </button>
                                <button
                                  className='btn'
                                  style={{
                                    height: 23,
                                    width: 20,
                                    borderWidth: 1,
                                    paddingBottom: 20
                                  }}
                                  onClick={() => {
                                    this.deleteRloe(roleid)
                                  }}
                                >
                                  <img
                                    src='images/cross-red.svg'
                                    alt='icon'

                                  />
                                </button>
                              </span>
                            </div>
                          </li>
                        </div>
                      )
                    })}

                  </ul>
                </div>



                {/* <HorizontalScroller sensibility={300}> */}
                <div className='permission-table' >
                  <div className='mscroll-x'>
                    <div className='permission-row head'>
                      {this.state.responseTableData && this.state.responseTableData.map((item) => {
                        return (
                          <div className='permission-card'>
                            <p className='text-center col-md-12 col-xs-12' data-toggle="tooltip" title={item.module_name}>
                              {item.module_name}
                            </p>
                            <span className='col-md-4 col-xs-4 text-center'>
                              View
    </span>
                            <span className='col-md-4 col-xs-4 text-center'>
                              Edit
    </span>
                            <span className='col-md-4 col-xs-4 text-center'>
                              Delete
    </span>
                          </div>

                        );
                      })}

                      {/* <div className='permission-card'>
                            <p className='text-center col-md-12 col-xs-12'>
                              Client
                            </p>
                            <span className='col-md-4 col-xs-4 text-center'>
                              View
                            </span>
                            <span className='col-md-4 col-xs-4 text-center'>
                              Edit
                            </span>
                            <span className='col-md-4 col-xs-4 text-center'>
                              Delete
                            </span>
                          </div>
                          <div className='permission-card'>
                            <p className='text-center col-md-12 col-xs-12'>
                              Inbox
                            </p>
                            <span className='col-md-4 col-xs-4 text-center'>
                              View
                            </span>
                            <span className='col-md-4 col-xs-4 text-center'>
                              Edit
                            </span>
                            <span className='col-md-4 col-xs-4 text-center'>
                              Delete
                            </span>
                          </div>
                          <div className='permission-card'>
                            <p className='text-center col-md-12 col-xs-12'>
                              Report
                            </p>
                            <span className='col-md-4 col-xs-4 text-center'>
                              View
                            </span>
                            <span className='col-md-4 col-xs-4 text-center'>
                              Edit
                            </span>
                            <span className='col-md-4 col-xs-4 text-center'>
                              Delete
                            </span>
                          </div>
                          <div className='permission-card'>
                            <p className='text-center col-md-12 col-xs-12'>
                              Invoice
                            </p>
                            <span className='col-md-4 col-xs-4 text-center'>
                              View
                            </span>
                            <span className='col-md-4 col-xs-4 text-center'>
                              Edit
                            </span>
                            <span className='col-md-4 col-xs-4 text-center'>
                              Delete
                            </span>
                          </div>
                      
                       */}
                    </div>

                    {this.state.responseData.map((item, index) => {
                      let name = item.name
                      let roleid = item.id
                      let permissionarray = item.permissions
                      // console.log('item', item)
                      return (
                        <div className='permission-row' key={index}>

                          {this.state.responseTableData && this.state.responseTableData.map((itemse) => {
                            return (
                              <div className='permission-card'>
                                {itemse.list.map((x, y) => {
                                  return (
                                    <div className='col-md-4 col-xs-4'>
                                      <div className='check-wrap'>
                                        <label className='custom-checkbox'>
                                          <input
                                            type='checkbox'
                                            id={x.id}
                                            value={x.id}
                                            data-value={x.id}
                                            checked={
                                              permissionarray.includes(x.id)
                                                ? 'checked'
                                                : ''
                                            }
                                            onChange={e =>
                                              this.getCheckboxVal(
                                                e,
                                                name,
                                                roleid,
                                                permissionarray
                                              )
                                            }
                                          />
                                          <span className='checkmark' />
                                        </label>
                                      </div>
                                    </div>


                                  )
                                })}


                                {/* 
                                  <div className='col-md-4 col-xs-4'>
                                    <div className='check-wrap'>
                                      <label className='custom-checkbox'>
                                        <input
                                          type='checkbox'
                                          id='2'
                                          value='2'
                                          data-value='2'
                                          checked={
                                            permissionarray.includes(2)
                                              ? 'checked'
                                              : ''
                                          }
                                          onChange={e =>
                                            this.getCheckboxVal(
                                              e,
                                              name,
                                              roleid,
                                              permissionarray
                                            )
                                          }
                                        />
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                  </div>
                                  <div className='col-md-4 col-xs-4'>
                                    <div className='check-wrap'>
                                      <label className='custom-checkbox'>
                                        <input
                                          type='checkbox'
                                          id='3'
                                          value='3'
                                          data-value='3'
                                          checked={
                                            permissionarray.includes(3)
                                              ? 'checked'
                                              : ''
                                          }
                                          onChange={e =>
                                            this.getCheckboxVal(
                                              e,
                                              name,
                                              roleid,
                                              permissionarray
                                            )
                                          }
                                        />
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                  </div>
                                */}

                              </div>

                            )

                          })}
                          {/* <div className='permission-card'>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='4'
                                        value='4'
                                        data-value='4'
                                        checked={
                                          permissionarray.includes(4)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='5'
                                        value='5'
                                        data-value='5'
                                        checked={
                                          permissionarray.includes(5)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='6'
                                        value='6'
                                        data-value='6'
                                        checked={
                                          permissionarray.includes(6)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className='permission-card'>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='7'
                                        value='7'
                                        data-value='7'
                                        checked={
                                          permissionarray.includes(7)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='8'
                                        value='8'
                                        data-value='8'
                                        checked={
                                          permissionarray.includes(8)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='9'
                                        value='9'
                                        data-value='9'
                                        checked={
                                          permissionarray.includes(9)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className='permission-card'>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='10'
                                        value='10'
                                        data-value='10'
                                        checked={
                                          permissionarray.includes(10)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='11'
                                        value='11'
                                        data-value='11'
                                        checked={
                                          permissionarray.includes(11)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='12'
                                        value='12'
                                        data-value='12'
                                        checked={
                                          permissionarray.includes(12)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className='permission-card'>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='13'
                                        value='13'
                                        data-value='13'
                                        checked={
                                          permissionarray.includes(13)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='14'
                                        value='14'
                                        data-value='14'
                                        checked={
                                          permissionarray.includes(14)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                                <div className='col-md-4 col-xs-4'>
                                  <div className='check-wrap'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='15'
                                        value='15'
                                        data-value='15'
                                        checked={
                                          permissionarray.includes(15)
                                            ? 'checked'
                                            : ''
                                        }
                                        onChange={e =>
                                          this.getCheckboxVal(
                                            e,
                                            name,
                                            roleid,
                                            permissionarray
                                          )
                                        }
                                      />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                </div>
                              </div>
                           */}


                        </div>
                      )
                    })}

                  </div>
                </div>
                {/* </HorizontalScroller> */}
              </div>
              }


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


          </section>
        </div>






        {/*                                                                 this to be uncommented
          <div className="pf-btm-wrap">
            <div classNames="container text-right">
              <button className="btn btn-lightgray">Cancel</button>
              <button className="btn btn-green"
                onClick={() => {
                  if (this.state.role != '') {
                    if (this.props.location.state != '' && this.props.location.state != undefined) {
                      console.log("1", this.props.location.state)
                      let comingData = this.props.location.state
                      comingData.push(this.state.role);
                      comingData.push(this.state[this.state.role]);
                      this.props.history.push('/invite_member', comingData)
                    }

                  }
                }}
              >Save</button>
            </div>
          </div> */}




        <div ref={this.myDivToFocus}></div>


        {/* Main Wrapper Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}
      </React.Fragment >)
  }
}
