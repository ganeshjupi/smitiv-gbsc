import React from "react";
import { Link } from "react-router-dom";
import UserTopbar from "./userTopbar";
import FetchAllApi from "./../../api_links/fetch_all_api";

export default class MembersLayer2 extends React.Component {
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
      name: "",
      designation: "",
      role: "",
      status: "",
      email: "",
      members: [],
      designation: [],
      filteredval: [],
      search: "",
      rowPerPage: 10,
      currentPage: 1,
      pageList: [1],
      view: "All",
      all: [],
    }
  }

  change = (e) => {
    const arr = this.state.members;
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
        pageList: [1]
      })
    })
  }

  work = (data) => {
    let value;
    this.state.designation.forEach((d) => {

      if (data == d.id) {
        value = d.designation
      }
    })
    console.log(value)
    return value
  }

  nextPage = (input) => {
    this.props.history.push('/details', input)
  }

  componentDidMount(e) {


    let client_id = this.state.logged_client_id
    FetchAllApi.user_designation_list(client_id, (err, response) => {
      window.jQuery("#pop-modal-1").modal("hide");

      this.setState({
        designation: response.list,
      })
      console.log(response)
    })
    let listmember = {
      name: this.state.name,
      role: this.state.role,
      status: this.state.status,
      email: this.state.email,
      client_id: this.state.logged_client_id,
    };

    FetchAllApi.list_user(listmember, (err, response) => {
      window.jQuery("#pop-modal-1").modal("hide");
      this.setState({
        members: response.list,
        filteredval: response.list,
      })
      console.log("ser_list", response)
    })

      ;
  }



  makeInActive = (input, id) => {
    let status = input
    let user_id = this.state.all.length == 0 ? [id] : this.state.all
    console.log(this.state.all);
    FetchAllApi.change_user_active_or_inactive(user_id, status, this.state.logged_client_id, (err, response) => {
      if (response.status === 1) {
        alert("User status changed successfully");
        window.location.reload();
      }else{
        alert(response.message);
      }
    });
  }

  reSendInvite = () => {
    let user_id = this.state.all;
    FetchAllApi.resend_invite(user_id, this.state.logged_client_id, this.state.logged_user_id, (err, response) => {
      if (response.status === 1) {
        alert("Invitation resent successfully");
        window.location.reload();
      }
    });
  }

  setRowPerPage = val => {
    const arr = this.state.members;
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
    if (val > fill.length) {
      this.setState({
        rowPerPage: val,
        filteredval: fill.slice(0, val),
        currentPage: 1,
        pageList: [1]
      });
      return;
    }
    let pageList = [...this.state.pageList];
    this.setState({
      rowPerPage: val,
      filteredval: fill.slice(0, val),
      currentPage: 1,
      pageList,
    });
  }
  setPagination = (page, pageList = this.state.pageList) => {
    const arr = this.state.members;
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
      filteredval: fill.slice(min, max),
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

  show = (sts) => {
    console.log(sts)
    let val = sts;
    if (val == "Waiting for Response") {
      val = "Not yet accept invitaion"
    };
    let sub = this.state.members
    if (val == "All") {
      return this.setState({ filteredval: [...sub], view: sts })
    }
    let fill = sub.filter((obj) => {
      if (obj.status_text == val) {
        return true
      } else {
        return false
      }

    })
    return this.setState({ filteredval: fill, view: sts })

  }

  handleInputChange = (event) => {
    const target = event.target;
    var value = target.value;

    if (target.checked) {
      this.state.all[value] = value;
    } else {
      this.state.all.splice(value, 1);
    }
    console.log(this.state.all);
  }

  handleEditPage = (e) => {
    console.log("ee", e)
    let data = [
      e.name,
      e.email_id,
      e.designation,
      e.id,
      e.role_id,
      e.role_name,
      e.role_name
    ];
    this.props.history.push('/edit_member', data)
  }



  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  render() {
    let totalPages = Math.ceil(this.state.filteredval.length / this.state.rowPerPage);
    let arr = [];
    if (this.state.search) {
      totalPages = Math.ceil(this.state.filteredval.length / this.state.rowPerPage);
      arr = this.state.filteredval;
    } else {
      totalPages = Math.ceil(this.state.members.length / this.state.rowPerPage);
      arr = this.state.filteredval.slice(0, 10);
    }
    return (
      <div>
        <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* user-content Starts here */}
          <section className="user-content row" >
            <div className="container">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Members</h3>
                <Link to={{ pathname: '/invite_member', state: {} }}>
                  <button className="pos-btn btn btn-blue add-mem"  >
                    <img className="filter-white" src="images/add-people-icon.svg" alt="icon" />
                    Invite Members
                  </button>
                </Link>
              </div>
              {/* Member List Starts here */}
              <div className="col-md-12 col-xs-12 cus-list">
                <form className="custom-form form-inline h-small row">
                  <div className="form-group search-box mar-rgt">
                    <input type="text" name="search" onChange={this.change} className="form-control" placeholder="Search..." />
                  </div>
                  <div className="form-group pull-right">
                    {/* <label>Show per page</label> */}
                    {/* <div className="custom-select-drop dropdown">
                      <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                        <span id="selected">{this.state.rowPerPage}</span><span className="caret" />
                      </a>
                      <ul className="dropdown-menu align-right minw-unset">
                        <li className="active"><a href="javascript:void(0);" onClick={() => this.setRowPerPage(10)}>10</a></li>
                        <li><a href="javascript:void(0);" onClick={() => this.setRowPerPage(15)}>15</a></li>
                        <li><a href="javascript:void(0);" onClick={() => this.setRowPerPage(20)}>20</a></li>
                        <li><a href="javascript:void(0);" onClick={() => this.setRowPerPage(25)}>25</a></li>
                        <li><a href="javascript:void(0);" onClick={() => this.setRowPerPage(30)}>30</a></li>
                        <li><a href="javascript:void(0);" onClick={() => this.setRowPerPage(35)}>35</a></li>
                      </ul>
                    </div> */}
                  </div>
                </form>
                <form className="custom-form h-small row mar-btm">
                  <div className="col-md-2 col-sm-3 col-xs-6">
                    <div className="form-group row">
                      <label>Show</label>
                      <div className="custom-select-drop dropdown">
                        <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                          <span id="selected">{this.state.view}</span><span className="caret" />
                        </a>
                        <ul className="dropdown-menu align-right minw-unset">
                          <li className={this.state.view == "All" ? "active" : null}><a href="javascript:void(0);" onClick={() => this.show("All")}>All</a></li>
                          <li className={this.state.view == "Active" ? "active" : null}><a href="javascript:void(0);" onClick={() => this.show("Active")}>Active</a></li>
                          <li className={this.state.view == "In-Active" ? "active" : null}><a href="javascript:void(0);" onClick={() => this.show("In-Active")}>In-active</a></li>
                          <li className={this.state.view == "Waiting for Response" ? "active" : null}><a href="javascript:void(0);" onClick={() => this.show("Waiting for Response")}>Waiting for Response</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-3 col-sm-3 col-xs-6">
                    <label className="invisible">Bulk Action</label>
                    <div className="dropdown menu-item more">
                      <button className="btn btn-blue dropdown-toggle" type="button" data-toggle="dropdown">Bulk Action
                        <span className="caret" /></button>
                      <ul className="dropdown-menu">
                        <li><a href="javascript:;" onClick={()=>{this.reSendInvite()}}>Re-Send Invitation</a></li>
                        <li><a href="javascript:;" onClick={()=>{this.makeInActive(1)}}>Make Active</a></li>
                        <li><a href="javascript:;" onClick={()=>{this.makeInActive(3)}}>Make In-active</a></li>
                      </ul>
                    </div>
                  </div> */}
                </form>
                <div className="list-table row mar-t-no member-table">
                  <div className="cus-table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="checkbox-td">
                            <label className="custom-checkbox">
                              <input type="checkbox" name="all" />&nbsp;
                              <span className="checkmark" />
                            </label>
                          </th>
                          <th>Name</th>
                          <th>Designation</th>
                          <th>Roles in Genie</th>
                          <th>Status</th>
                          <th className="action-td" />
                        </tr>
                      </thead>
                      <tbody>
                        {arr.map((m) => {
                          return (
                            <tr key={m} >
                              <td className="checkbox-td">
                                <label className="custom-checkbox">
                                  <input type="checkbox" name="all" value={m.id}
                                    onChange={(e) => {
                                      let newlySelected = m.id;

                                      if (e.target.checked) {
                                        let all = this.state
                                          .all;
                                        let newBox = [
                                          ...all,
                                          newlySelected,
                                        ];
                                        this.setState({
                                          all: newBox,
                                        });
                                      }
                                      if (!e.target.checked) {
                                        let all = this.state
                                          .all;
                                        const removeElement = all.indexOf(
                                          newlySelected
                                        );
                                        if (removeElement > -1) {
                                          all.splice(
                                            removeElement,
                                            1
                                          );
                                        }
                                        this.setState({
                                          all: all,
                                        });
                                      }
                                    }
                                    }
                                  />&nbsp;
                                  <span className="checkmark" />
                                </label>
                              </td>
                              <td className="cont-detail" >
                                <span className="fw-med">{m.name}</span>
                                <span><a href="mailto:jeffery.stanley@example.com">{m.email_id}</a></span>
                              </td>
                              <td>
                                <span className="fs-13">{m.designation_name}</span>
                              </td>
                              <td>
                                <span className="badge blue">{m.role_name}</span>
                              </td>
                              <td>

                                {m.status_text == "Active" ? (
                                  <span className="badge green">Active</span>
                                ) : (
                                  <span className="badge red">{m.status_text}</span>
                                )}

                              </td>
                              <td className='action-td'>
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
                                    <li><a href="javascript:;" onClick={() => this.handleEditPage(m)}>Edit</a></li>
                                    {(m.status_text == "Active") ?
                                      <li><a href="javascript:;" onClick={() => { this.makeInActive(3, m.id) }}>Make In-active</a></li>
                                      :
                                      <li><a href="javascript:;" onClick={() => { this.makeInActive(1, m.id) }}>Make active</a></li>
                                    }
                                    <li><a href="javascript:;" onClick={() => { this.makeInActive(0, m.id) }}>Delete</a></li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          )
                        })}



                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <p className="fw-med pull-left">Showing - {arr.length} of {this.state.members.length} items</p>
                  <div className="pull-right pagination-wrap">
                    <ul className="pagination">
                      {
                        (this.state.pageList.toString().indexOf("1") === -1) && <li><a href="javascript:;" className="btn" onClick={() => this.onPrevPagination()}>Prev</a></li>
                      }
                      {
                        this.state.pageList.map((item, idx) => {
                          return (<li><a href="javascript:;" style={this.state.currentPage === item ? {
                            background: "#2491D9",
                            marginLeft: "5px",
                            color: "#fff"
                          } : {}} onClick={() => this.setPagination(item)}>{item}</a></li>)
                        })
                      }
                      {
                        !!(this.state.pageList.indexOf(totalPages) === -1 && this.state.filteredval.length) && <li><a href="javascript:;" className="btn" onClick={() => this.onNextPagination()}>Next</a></li>
                      }
                    </ul>
                  </div>
                </div>
              </div>
              {/* Member List Ends here */}
            </div>
          </section>
          {/* user-content Ends here */}
        </div>
        {/* Main Wrapper Ends here */}
        {/* footer Starts here */}
        <footer className="container-fluid">
          <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
        {/* footer Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}
      </div>
    )
  }
}