import React from "react";
import UserTopbar from "./first_user_module/header";
import { Link } from "react-router-dom";
import FetchAllApi from "./../api_links/fetch_all_api";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default class ClientSelection extends React.Component {
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

      first_logged_client_id: localStorage.getItem("first_logged_client_id"),
      first_logged_company_name: localStorage.getItem("first_logged_company_name"),
      first_incorporation_date: localStorage.getItem("first_incorporation_date"),
      incorporation_date: localStorage.getItem("incorporation_date"),

      organization: "",
      subscriber: "",
      country: "",
      plan: "",
      status: "",
      view: "All",
      layer: localStorage.getItem("layer"),
      isAllClient: 0,

      filterarr: [],
      subscriberslist: [],
      pageList: [],


      client_list: [],
      showPerPage: 10,
      search: '',
      page: 1,
      pages: 0,
      total_count: 0,
      showing: 0,
      pagecountstart:0,
      pagecountend:0,

    };
  }
  UNSAFE_componentWillMount() {
    localStorage.setItem("AllClientMail", '');
    localStorage.setItem("logged_client_id", this.state.first_logged_client_id)
    localStorage.setItem("logged_company_name", this.state.first_logged_company_name)
    localStorage.setItem("incorporation_date", this.state.first_incorporation_date)
    localStorage.setItem("lock_date", "")

  };

  componentWillMount() {
    // localStorage.setItem("layer",1)
  };


  get_list = () => {

    let subscriber_ids = []

    let input = {
      user_id: this.state.logged_user_id,
      limit: this.state.showPerPage,
      search: this.state.search,
      page: this.state.page
    }

    FetchAllApi.get_user_subscriber_list(input, (err, response) => {
      if (response.status === 1) {

        response.list.map((item, i) => { subscriber_ids.push(item.id) })
        localStorage.setItem('subscriber_ids', JSON.stringify(subscriber_ids))

        // to show pages 
        let showing 
        if(this.state.page == 1){
          showing = response.list.length
        }else if(this.state.page > 1){
          showing = ((this.state.page - 1)*this.state.showPerPage) + response.list.length
        }
        // let a = response.list.length / this.state.showPerPage
        // let b = response.list.length % this.state.showPerPage > 0 ? 1 : 0
        // let pages = a + b
        // to show pages 

        this.setState({ client_list: response.list, isAllClient: response.status, pages: response.total_pages, total_count: response.total_count,showing })

      }else{
        this.setState({ client_list: [], isAllClient: 0, pages: response.total_pages, total_count: response.total_count,showing:0 })
      }
    })
    let pagenumber=this.state.page===''?1:this.state.page;
    this.setState({pagecountstart: pagenumber===1?1:this.state.pagecountend+1,pagecountend:this.state.showPerPage*pagenumber});
  }


  componentDidMount = (e) => {
    this.get_list()
    // localStorage.setItem("layer",1)
  };


  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }


  handle = (val, cmy_name, obj) => {
    // alert(val);
    console.log(val);
    localStorage.setItem("logged_client_id", val);
    localStorage.setItem("logged_company_name", cmy_name);
    localStorage.setItem("AllClientMail", '');

    this.props.history.push("/landing_page");

    localStorage.setItem("country_sortname", obj.country_sortname);
    localStorage.setItem("language_code", obj.language_code);
    localStorage.setItem("home_currency", obj.home_currency);
    localStorage.setItem("incorporation_date", obj.incorporation_date);
    localStorage.setItem("lock_date", obj.lock_date)
    localStorage.setItem("home_currency_symbol", obj.home_currency_symbol)
    // alert(obj.lock_date)
  };



  allClientMail = () => {
    localStorage.setItem("AllClientMail", 'yes');

    this.props.history.push("/landing_page");

  };

  render() {

    return (
      <div>
        <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* user-content Starts here */}
          <section className="user-content row">
            <div className="container">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Please select the Client to Continue</h3>
              </div>
              {/* Member List Starts here */}
              <div className="col-md-12 col-xs-12 cus-list">
                <form className="custom-form form-inline h-small row">
                  <div className="form-group search-box mar-rgt">
                    <input
                      type="text"
                      name="search"
                      autoComplete="off"
                      onChange={(e) => this.setState({ search: e.target.value,page:1 }, () => this.get_list())}
                      className="form-control"
                      placeholder="Search..."
                    />
                  </div>

                  <div className="form-group">
                    <button type="button" className="btn btn-rounded btn-blue"
                      onClick={() => this.props.history.push('/register', true)}
                    >Add new company</button>
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
                {/* <form className="custom-form h-small row mar-btm">
                  <div className="col-md-2 col-sm-3 col-xs-6">
                    <div className="form-group row">
                      <label>Show</label>
                      <div className="custom-select-drop dropdown">
                        <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                         <span id="selected">{this.state.view}</span><span className="caret" />
                        </a>
                        <ul className="dropdown-menu align-right">
                          <li className="active"><a  href="javascript:void(0);" onClick={() => this.show("All")}>All</a></li>
                          <li><a href="javascript:void(0);" onClick={() => this.show("standard")}>Standard</a></li>
                          <li><a href="javascript:void(0);" onClick={() => this.show("Basic")}>Basic</a></li>
                          <li><a href="javascript:void(0);" onClick={() => this.show("Trial")}>Trial</a></li>
                          <hr />
                          <li><a href="javascript:void(0);" onClick={() => this.show("Active")}>Active</a></li>
                          <li><a href="javascript:void(0);" onClick={() => this.show("Expired")}>Expired</a></li>
                        </ul>
                      </div>
                    </div>
                  </div> */}
                {/* <div className="col-md-3 col-sm-3 col-xs-6">
                    <label className="invisible">Bulk Action</label>
                    <div>
                      <button  className="btn btn-blue"><ReactHTMLTableToExcel
                                 table="table-to-xls"
                                 className="btn btn-blue"
                                 filename="subscribers"
                                 sheet="tablexls"
                                 buttonText="Export"
                                                            /></button>
                    </div>
                  </div>
                </form> */}
                <div className="list-table row mar-t-no member-table">
                  <div className="cus-table-responsive">
                    <table className="table" id="table-to-xls">
                      <thead>
                        <tr>
                          <th className="checkbox-td">
                            {/* <label className="custom-checkbox">
                              <input type="checkbox" name="all" />&nbsp;
                              <span className="checkmark" />
                            </label> */}
                          </th>
                          <th>Organization Name</th>
                          {/* <th>Subscriber</th> */}
                          <th>Country</th>
                          {/* <th>Plan</th> */}
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.isAllClient == 1 ? (
                          <tr

                            style={{ background: "#e3fbed" }}
                            onClick={() => {
                              this.allClientMail();
                            }}
                          >
                            <td className="checkbox-td">

                            </td>

                            <td>
                              <span className="fw-med">All client mail</span>
                            </td>

                            <td>
                              <span className="fs-13"></span>
                            </td>

                            <td>

                            </td>
                          </tr>

                        ) : ''}
                        {this.state.client_list.map((s) => {
                          console.log(s.country,s);
                          return (
                            <tr
                              onClick={() => {
                                localStorage.setItem('selected_client', true)
                                localStorage.setItem("layer", 2)
                                this.handle(s.id, s.name, s);
                                localStorage.setItem("fiscal_start_year", (s.fiscal_year_start_date));
                                localStorage.setItem("fiscal_end_year", (s.fiscal_year_end_date));

                              }}
                            >
                              <td className="checkbox-td">
                                {/* <label className="custom-checkbox">
                              <input type="checkbox" name="all" />&nbsp;
                              <span className="checkmark" />
                            </label> */}
                              </td>

                              <td>
                                <span className="fw-med">{s.name}</span>
                              </td>
                              {/* <td>
                            <span className="fs-13">{s.subscriber_name}</span>
                          </td> */}
                              <td>
                                <span className="fs-13">{s.country_name}</span>
                              </td>
                              {/* <td>
                            <span className="fw-med">{s.plan_name}</span>
                          </td> */}
                              <td>
                                {s.status_text == "Active" ? (
                                  <span className="badge green">Active</span>
                                ) : (
                                  <span className="badge red">Expired</span>
                                )}
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
                    {/* Showing - {this.state.showing} of{" "}
                    {this.state.total_count} items */}
                     Showing {this.state.pagecountstart} - {this.state.pagecountend} of {this.state.total_count} items
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
      </div>
    );
  }
}
