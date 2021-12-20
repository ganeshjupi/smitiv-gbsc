import React from "react";
import { Link } from "react-router-dom";
import UserTopbar from "./header";
import FetchAllApi from "./../../api_links/fetch_all_api";
import LeftSidebar from "./../left_sidebar";

export default class Members extends React.Component {
  constructor(props) {
    super(props);
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
      // rowPerPage: 10,
      currentPage: 1,
      pageList: [1],
      // view: "All",
      country: "",
      selectedCountry: '',
      showPerPage: 10,
      show:'All',
      page:1
    };
  }

  change = (e) => {
    const arr = this.state.members;
    this.setState({ search: e.target.value });
    if (!e.target.value.trim()) {
      return this.setState({ filteredval: [...arr] });
    }
    const fill = arr.filter((obj) => {
      console.log(obj.designation);
      if (
        obj.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ||
        obj.role_name.toLowerCase().indexOf(e.target.value.toLowerCase()) >
        -1 ||
        obj.status_text.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      ) {
        return true;
      } else {
        return false;
      }
    });
    return this.setState(
      { filteredval: fill.slice(0, this.state.rowPerPage) },
      () => {
        this.setState({
          rowPerPage: 10,
          currentPage: 1,
          pageList: [1],
        });
      }
    );
  };

  work = (data) => {
    let value;
    this.state.designation.forEach((d) => {
      if (data == d.id) {
        value = d.designation;
      }
    });
    console.log(value);
    return value;
  };

  nextPage = (input) => {
    console.log("inut", input)
    this.props.history.push("/details", input);
    // FetchAllApi.get_countries((err, response) => {
    //   //alert(response)
    //   console.log("get_countries_list", response.list.length);
    //   if (response.status === 1) {
    //     response.list.map((coun,idx)=>{
    //       if(input.country == coun.country_id){
    //      this.setState({ selectedCountry: coun.name,},this.conditionNext(input))

    //   }
    //   })
    // }});
  };

  get_list=()=>{
    let listmember = {
      client_id: this.state.logged_client_id,
      user_id: this.state.logged_user_id,
      limit: this.state.showPerPage, //
      search: this.state.search,  //
      page: this.state.page,  
      status: this.state.show == 'All' ? '' : this.state.show == 'Active' ? 1 : this.state.show == 'In-active' ? 3 : this.state.show == 'Invitations Not accepted' ? 2 :   this.state.show == 'Deleted' ? 0 : ''
    };

    FetchAllApi.list_user(listmember, (err, response) => {
      if (response.status === 1) {
        let showing 
        if(this.state.page == 1){
          showing = response.list.length
        }else if(this.state.page > 1){
          showing = ((this.state.page - 1)*this.state.showPerPage) + response.list.length
        }
      this.setState({
        members: response.list,
        filteredval: response.list,
        showing, pages: response.total_pages, total_count: response.total_count
      });
    }else{
      this.setState({
        members: [],
        filteredval: [],
        showing : 0, pages: response.total_pages, total_count: response.total_count
      });
    }
    });
    
  }


  componentDidMount(e) {
    this.get_list()
    // alert(this.state.logged_user_id);
    let client_id = this.state.logged_client_id;
    FetchAllApi.user_designation_list(client_id, (err, response) => {

      this.setState({ designation: response.list });
      console.log(response);
    });
  
  };

  selectCountry = () => {
    console.log("new", this.state.country)
    FetchAllApi.get_countries((err, response) => {
      //alert(response)
      console.log("get_countries_list", response.list.length);
      if (response.status === 1) {
        response.list.map((coun, idx) => {
          if (this.state.country == coun.id) {
            this.setState({ selectedCountry: coun.name, })

          }
        })
      }
    });
  }

  makeInActive = (input) => {
    let status = input;
    let user_id = this.state.logged_user_id;
    FetchAllApi.change_user_active_or_inactive(
      user_id,
      status,
      (err, response) => {
        if (response.status === 1) {
          alert("User status changed successfully");
        }else{
          alert(response.message);
        }
      }
    );
  };

  reSendInvite = () => {
    let user_id = this.state.logged_user_id;
    FetchAllApi.resend_invite(user_id, (err, response) => {
      if (response.status === 1) {
        alert("Invitation resent successfully");
      }
    });
  };

  setRowPerPage = (val) => {
    const arr = this.state.members;
    let fill = arr.filter((obj) => {
      if (
        obj.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 ||
        obj.role_name.toLowerCase().indexOf(this.state.search.toLowerCase()) >
        -1 ||
        obj.status_text.toLowerCase().indexOf(this.state.search.toLowerCase()) >
        -1
      ) {
        return true;
      } else {
        return false;
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
        pageList: [1],
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
  };
  setPagination = (page, pageList = this.state.pageList) => {
    const arr = this.state.members;
    console.log(arr);
    let fill = arr.filter((obj) => {
      if (
        obj.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 ||
        obj.role_name.toLowerCase().indexOf(this.state.search.toLowerCase()) >
        -1 ||
        obj.status_text.toLowerCase().indexOf(this.state.search.toLowerCase()) >
        -1
      ) {
        return true;
      } else {
        return false;
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
  };
  onNextPagination = () => {
    if (this.state.currentPage % 2 === 0) {
      this.setPagination(this.state.currentPage + 1, [
        this.state.currentPage + 1,
        this.state.currentPage + 2,
      ]);
    } else {
      this.setPagination(this.state.currentPage + 2, [
        this.state.currentPage + 2,
        this.state.currentPage + 3,
      ]);
    }
  };
  onPrevPagination = () => {
    if (this.state.currentPage % 2 === 0) {
      const arr = !(this.state.currentPage - 2)
        ? [1, 2]
        : [this.state.currentPage - 3, this.state.currentPage - 2];
      this.setPagination(this.state.currentPage - 2 || 1, arr);
    } else {
      this.setPagination(this.state.currentPage - 1, [
        this.state.currentPage - 2,
        this.state.currentPage - 1,
      ]);
    }
  };
  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  show = (sts) => {
    let val = sts;
    if(val =="Waiting for Response"){
      val="Not yet accept invitaion"
    }
    let sub = this.state.members;
    if (val == "All") {
      return this.setState({ filteredval: [...sub], view: sts });
    }
    let fill = sub.filter((obj) => {
      if (obj.status_text == val) {

        return true;
      } else {
        return false;
      }
    });
    return this.setState({ filteredval: fill, view: sts });
  };

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  render() {
    console.log("page", this.state.selectedCountry)
    let totalPages = Math.ceil(
      this.state.filteredval.length / this.state.rowPerPage
    );
    let arr = [];
    if (this.state.search) {
      totalPages = Math.ceil(
        this.state.filteredval.length / this.state.rowPerPage
      );
      arr = this.state.filteredval;
    } else {
      totalPages = Math.ceil(this.state.members.length / this.state.rowPerPage);
      arr = this.state.filteredval.slice(0, 10);
    }
    return (
      <div>
        <div className="container-fluid">
          {/* header Starts here */}
          {/* <LeftSidebar history={this.props.history}  pageSubmit={(e) => this.pageLink(e)} /> */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* user-content Starts here */}
          <section className="user-content row">
            <div className="container">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Members</h3>
                <Link to={{ pathname: "/member_invite", state: {} }}>
                  <button className="pos-btn btn btn-blue add-mem">
                    <img
                      className="filter-white"
                      src="images/add-people-icon.svg"
                      alt="icon"
                    />
                    Invite Members
                  </button>
                </Link>
              </div>
              {/* Member List Starts here */}
              <div className="col-md-12 col-xs-12 cus-list">
                <form className="custom-form form-inline h-small row">
                  <div className="form-group search-box mar-rgt">
                    <input
                      type="text"
                      name="search"
                      onChange={(e) => this.setState({ search: e.target.value, page:1 }, () => this.get_list())}
                      className="form-control"
                      placeholder="Search..."
                    />
                  </div>
                  <div className="form-group pull-right">
                    <label>Show per page</label>
                    <div className="custom-select-drop dropdown">
                      <a
                        aria-expanded="false"
                        aria-haspopup="true"
                        role="button"
                        data-toggle="dropdown"
                        className="dropdown-toggle btn form-control"
                        href="javascript:;"
                      >
                        <span id="selected">{this.state.showPerPage}</span>
                        <span className="caret" />
                      </a>
                      <ul className="dropdown-menu align-right minw-unset">
                        <li className={this.state.showPerPage ==10?"active":null}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 10 , page:1}, () => this.get_list()) }}
                          >
                            10
                          </a>
                        </li>
                        <li className={this.state.showPerPage ==15?"active":null}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 15 , page:1}, () => this.get_list()) }}
                          >
                            15
                          </a>
                        </li>
                        <li className={this.state.showPerPage ==20?"active":null}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 20 , page:1}, () => this.get_list()) }}
                          >
                            20
                          </a>
                        </li>
                        <li className={this.state.showPerPage ==25?"active":null}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 25 , page:1}, () => this.get_list()) }}
                          >
                            25
                          </a>
                        </li>
                        <li className={this.state.showPerPage ==30?"active":null}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 30 , page:1}, () => this.get_list()) }}
                          >
                            30
                          </a>
                        </li>
                        <li className={this.state.showPerPage ==35?"active":null}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 35 , page:1}, () => this.get_list()) }}
                          >
                            35
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
                <form className="custom-form h-small row mar-btm">
                  <div className="col-md-2 col-sm-3 col-xs-6">
                    <div className="form-group row">
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
                          <span id="selected">{this.state.show}</span>
                          <span className="caret" />
                        </a>
                        <ul className="dropdown-menu align-right minw-unset">
                          <li className={this.state.show == 'All' ? "active":null}>
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => this.setState({ show: 'All',page:1 }, () => this.get_list())}
                            >
                              All
                            </a>
                          </li>
                          <li className={this.state.show =='Active' ?"active":null}>
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => this.setState({ show: 'Active',page:1 }, () => this.get_list())}
                            >
                              Active
                            </a>
                          </li>
                          <li className={this.state.show =='In-active'?"active":null}>
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => this.setState({ show: 'In-active',page:1 }, () => this.get_list())}
                            >
                              In-active
                            </a>
                          </li>
                          <li className={this.state.show =='Invitations Not accepted' ?"active":null}>
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => this.setState({ show: 'Invitations Not accepted' ,page:1}, () => this.get_list())}
                            >
                              Invitations Not accepted 
                            </a>
                          </li>
                          <li className={this.state.show =='Deleted'?"active":null}>
                            <a
                              href="javascript:void(0);"
                              onClick={(e) => this.setState({ show: 'Deleted',page:1 }, () => this.get_list())}
                            >
                              Deleted
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-6">
                    {/* <label className="invisible">Bulk Action</label> */}
                    {/* <div className="dropdown menu-item more">
                      <button
                        className="btn btn-blue dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                      >
                        Bulk Action
                        <span className="caret" />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a href="javascript:;">Re-Send Invitation</a>
                        </li>
                        <li>
                          <a href="javascript:;">Make In-active</a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </form>
                <div className="list-table row mar-t-no member-table">
                  <div className="cus-table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="checkbox-td">
                            <label className="custom-checkbox">
                              <input type="checkbox" name="all" />
                              &nbsp;
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
                            <tr key={m} onClick={() => {
                              this.nextPage(m);
                            }}>
                              <td className="checkbox-td">
                                <label className="custom-checkbox">
                                  <input type="checkbox" name="all" />
                                  &nbsp;
                                  <span className="checkmark" />
                                </label>
                              </td>
                              <td
                                className="cont-detail"

                              >
                                <span className="fw-med">{m.name}</span>
                                <span>
                                  <a href="mailto:jeffery.stanley@example.com">
                                    {m.email_id}
                                  </a>
                                </span>
                              </td>
                              <td>
                                <span className="fs-13">
                                  {m.designation_name}
                                </span>
                              </td>
                              <td>
                                <span className="badge blue">
                                  {m.role_name}
                                </span>
                              </td>
                              <td>
                                {m.status_text == "Active" ? (
                                  <span className="badge green">Active</span>
                                ) : (
                                    <span className="badge red">{m.status_text}</span>
                                  )}
                              </td>
                              <td className="action-td">
                                <div className="dropdown menu-item action-item">
                                  <button
                                    className="btn btn-green dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                    <span className="caret" />
                                  </button>
                                  <ul className="dropdown-menu align-right">
                                    <li>
                                      <a href="javascript:;">Edit</a>
                                    </li>
                                    <li>
                                      <a
                                        href="javascript:;"
                                        onClick={() => {
                                          this.makeInActive(m.status_text);
                                        }}
                                      >
                                        Make In-active
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <p className="fw-med pull-left">
                    Showing - {this.state.showing} of{" "}
                    {this.state.total_count}items
                  </p>
                  <div className="pull-right pagination-wrap">
                    <ul className="pagination">
                      {/* {this.state.pageList.toString().indexOf("1") === -1 && (
                        <li>
                          <a
                            href="javascript:;"
                            className="btn"
                            onClick={() => this.onPrevPagination()}
                          >
                            Prev
                          </a>
                        </li>
                      )} */}
                      {[...Array(this.state.pages)].map((item, idx) => {
                        let i = idx + 1
                        return (
                          <li>
                            <a
                              href="javascript:;"
                              style={
                                this.state.page === i
                                  ? {
                                    background: "#2491D9",
                                    marginLeft: "5px",
                                    color: "#fff",
                                  }
                                  : {}
                              }
                              onClick={() => this.setState({ page: i }, () => this.get_list())}
                            >
                              {i}
                            </a>
                          </li>
                        );
                      })}
                      {/* {!!(
                        // this.state.pageList.indexOf(totalPages) === -1 &&
                        this.state.client_list.length
                      ) && (
                          <li>
                            <a
                              href="javascript:;"
                              className="btn"
                              onClick={() => this.onNextPagination()}
                            >
                              Next
                          </a>
                          </li>
                        )} */}
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
    );
  }
}
