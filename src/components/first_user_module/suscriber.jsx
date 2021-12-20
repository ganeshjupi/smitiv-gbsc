import React from "react";
import UserTopbar from "./header";
import { Link } from "react-router-dom";
import FetchAllApi from "../../api_links/fetch_all_api";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import LeftSidebar from './../left_sidebar';

export default class Subscriber extends React.Component {
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
      organization: "",
      subscriber: "",
      country: "",
      plan: "",
      status: "",
      subscriberslist: [],
      filterarr: [],
      search: "",
      rowPerPage: 10,
      currentPage: 1,
      pageList: [1],
      view: "All",

      showPerPage:10,
      page:1,
      showing:0,
      status:'Active'
    }

  }

  get_list = () =>{
    let input = {
      user_id: this.state.logged_user_id,
      limit: this.state.showPerPage,
      search: this.state.search,
      page: this.state.page,
      status: this.state.status == 'Active' ? 1 : this.state.status == 'Expired' ? 0 : 1
    }


    FetchAllApi.all_subscription_list(
      input,
      (err, response) => {
        if (response.status === 1) {

          let showing 
          if(this.state.page == 1){
            showing = response.list.length
          }else if(this.state.page > 1){
            showing = ((this.state.page - 1)*this.state.showPerPage) + response.list.length
          }

          this.setState({
            subscriberslist: response.list,
            filterarr: response.list,
            showing,
            pages: response.total_pages, 
            total_count: response.total_count
          })
        } else {
             this.setState({
             subscriberslist: [],
             filterarr: [],
             showing : 0,
             pages: response.total_pages, 
             total_count: response.total_count
             });
            }
      })

  }


  componentDidMount = (e) => {

    this.get_list()

  }
  change = (e) => {
    const arr = this.state.subscriberslist
    if (!e.target.value.trim()) {
      return this.setState({ filterarr: [...arr] })
    }
    const fill = arr.filter((obj) => {

      if (obj.organization_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || obj.subscriber_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || obj.country.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || obj.plan_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || obj.status.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
        return true
      }
      else {
        return false
      }
    })
    return this.setState({ filterarr: fill.slice(0, this.state.rowPerPage) }, () => {
      this.setState({
        rowPerPage: 10,
        currentPage: 1,
        pageList: [1],
        view: "All"
      })
    })
  }
  setRowPerPage = (val) => {
    const arr = this.state.subscriberslist

    let fill = arr.filter((obj) => {
      console.log(obj.designation)
      if (obj.organization_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.subscriber_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.country.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.plan_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.status.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
        return true
      }
      else {
        return false
      }
    })
    if (!this.state.search) {
      fill = arr;
    }
    if (val > fill.length) {
      this.setState({
        rowPerPage: val,
        filterarr: fill.slice(0, val),
        currentPage: 1,
        pageList: [1]
      });
      return;
    }
    let pageList = [...this.state.pageList];
    this.setState({
      rowPerPage: val,
      filterarr: fill.slice(0, val),
      currentPage: 1,
      pageList,
    });
  }


  setPagination = (page, pageList = this.state.pageList) => {
    const arr = this.state.subscriberslist

    let fill = arr.filter((obj) => {
      console.log(obj.designation)
      if (obj.organization_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.subscriber_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.country.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.plan_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.status.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
        return true
      }
      else {
        return false
      }
    })
    if (!this.state.search) {
      fill = arr;
    }
    const max = page * this.state.rowPerPage;
    const min = max - this.state.rowPerPage;
    this.setState({
      filterarr: fill.slice(min, max),
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
    let sub = this.state.subscriberslist
    if (sts == "All") {
      return this.setState({ filterarr: [...sub], view: sts })
    }
    let fill = sub.filter((obj) => {
      if (obj.status == sts || obj.plan_name == sts) {
        return true
      } else {
        return false
      }

    })
    return this.setState({ filterarr: fill, view: sts })

  }
  handle = (val) => {

    this.props.history.push("/information", val)

  }

  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    let totalPages = Math.ceil(this.state.filterarr.length / this.state.rowPerPage);
    let arr = [];
    if (this.state.search) {
      totalPages = Math.ceil(this.state.filterarr.length / this.state.rowPerPage);
      arr = this.state.filterarr;
    } else {
      totalPages = Math.ceil(this.state.subscriberslist.length / this.state.rowPerPage);
      arr = this.state.filterarr.slice(0, 10);
    }

    return (
      <div>
        <div className="container-fluid">
          {/* header Starts here */}
          {/* <LeftSidebar history={this.props.history}  pageSubmit={e => this.pageLink(e)} /> */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* user-content Starts here */}
          <section className="user-content row" >
            <div className="container">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Subscribers</h3>
              </div>
              {/* Member List Starts here */}
              <div className="col-md-12 col-xs-12 cus-list">
                <form className="custom-form form-inline h-small row">
                  <div className="form-group search-box mar-rgt">
                    <input type="text" name="search" onChange={(e) => this.setState({ search: e.target.value,page:1 }, () => this.get_list())} className="form-control" placeholder="Search..." />
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
                        <li className={this.state.showPerPage == 10 ? "active" : ''}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 10 , page:1}, () => this.get_list(10)) }}
                          >
                            10
                          </a>
                        </li>
                        <li className={this.state.showPerPage == 15 ? "active" : ''}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 15 , page:1 }, () => this.get_list(15)) }}
                          >
                            15
                          </a>
                        </li>
                        <li className={this.state.showPerPage == 20 ? "active" : ''}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 20 , page:1}, () => this.get_list(20)) }}
                          >
                            20
                          </a>
                        </li>
                        <li className={this.state.showPerPage == 25 ? "active" : ''}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 25 , page:1}, () => this.get_list(25)) }}
                          >
                            25
                          </a>
                        </li>
                        <li className={this.state.showPerPage == 30 ? "active" : ''}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 30, page:1 }, () => this.get_list(30)) }}
                          >
                            30
                          </a>
                        </li>
                        <li className={this.state.showPerPage == 35 ? "active" : ''}>
                          <a
                            href="javascript:void(0);"
                            onClick={() => { this.setState({ showPerPage: 35, page:1}, () => this.get_list(35)) }}
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
                        <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                          <span id="selected">{this.state.status}</span><span className="caret" />
                        </a>
                        <ul className="dropdown-menu align-right">
                          {/* <li className={this.state.view == "All" ? "active" : ''} ><a href="javascript:void(0);" onClick={() => this.show("All")}>All</a></li>
                          <li className={this.state.view == "standard" ? "active" : ''}   ><a href="javascript:void(0);" onClick={() => this.show("standard")}>Standard</a></li>
                          <li className={this.state.view == "Basic" ? "active" : ''}  ><a href="javascript:void(0);" onClick={() => this.show("Basic")}>Basic</a></li>
                          <li className={this.state.view == "Trial" ? "active" : ''}  ><a href="javascript:void(0);" onClick={() => this.show("Trial")}>Trial</a></li>
                          <hr /> */}
                          <li className={this.state.status == "Active" ? "active" : ''}  ><a href="javascript:void(0);" onClick={(e) => this.setState({ status: 'Active',page:1 }, () => this.get_list())}>Active</a></li>
                          <li className={this.state.status == "Expired" ? "active" : ''}  ><a href="javascript:void(0);" onClick={(e) => this.setState({ status: 'Expired',page:1 }, () => this.get_list())}>Expired</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-3 col-sm-3 col-xs-6">
                    <label className="invisible">Bulk Action</label>
                    <div>
                      <button className="btn btn-blue">   commented
                      <ReactHTMLTableToExcel
                        table="table-to-xls"
                        className="btn btn-blue"
                        filename="subscribers"
                        sheet="tablexls"
                        buttonText="Export"
                      />
                      </button>                           commented
                    </div>
                  </div> */}
                </form>
                <div className="list-table row mar-t-no member-table">
                  <div className="cus-table-responsive">

                    {this.state.filterarr.length > 0 ? (
                      <table className="table" id="table-to-xls">
                        <thead>
                          <tr>
                            <th className="checkbox-td">
                              <label className="custom-checkbox">
                                <input type="checkbox" name="all" />&nbsp;
                              <span className="checkmark" />
                              </label>
                            </th>
                            <th>Organization Name</th>
                            <th>Subscriber</th>
                            <th>Country</th>
                            <th>Plan</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.filterarr.map((s) => {
                            return (
                              <tr >
                                <td className="checkbox-td">
                                  <label className="custom-checkbox">
                                    <input type="checkbox" name="all" />&nbsp;
                              <span className="checkmark" />
                                  </label>
                                </td>

                                <td onClick={() => { this.handle(s) }}>
                                  <span className="fw-med">{s.organization_name}</span>
                                </td>
                                <td>
                                  <span className="fs-13">{s.subscriber_name}</span>
                                </td>
                                <td>
                                  <span className="fs-13">{s.country}</span>
                                </td>
                                <td>
                                  <span className="fw-med">{s.plan_name}</span>
                                </td>
                                <td>
                                  {s.status == "Active" ? (
                                    <span className="badge green">Active</span>
                                  ) : (
                                    <span className="badge red">Expired</span>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>

                    ) :
                      (
                        <div className="row pad-rgt">
                          <span className="no_rec alert alert-danger text-center" style={{ display: 'block' }}>
                            No items found!
                        </span>
                        </div>
                      )
                    }
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
      </div >
    )
  }
}
