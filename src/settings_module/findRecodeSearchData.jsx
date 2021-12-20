import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class SearchData extends React.Component{
    constructor(props){
        super(props)
        this.state={
        type:"Type",
          textField1:"is",
          textField2:"",
          toggle:false,
        }
    };


    componentWillMount (){
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

    search=()=>{
      console.log("search")
      this.setState({toggle:true})
    }

    dropDown1(val){
      this.setState({type:val})
    }
    dropDown2(data){
      this.setState({textField:data})
    }
    change=(e)=>{
      this.setState({textField2:e.target.value})
    }
    render(){
        return(
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
            <Sidebar />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Find &amp; Recode</h3>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <form className="custom-form invoice-form col-md-12 col-xs-12 h-small legend-form rule-form">
                    <div className="row">
                      <div className="form-group">
                        <label>Find transaction lines that match of the following conditions:</label>
                        <div className="set-w">
                          <div className="custom-select-drop dropdown">
                            <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                              <span id="selected">Any</span><span className="caret" />
                            </a>
                            <ul className="dropdown-menu">
                              <li className="active"><a href="javascript:;">Any</a></li>
                              <li><a href="javascript:;">All</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row bg-add-sec">
                      <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className="custom-select-drop dropdown">
                          <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                             <span id="selected">{this.state.type}</span><span className="caret" />
                          </a>
                          <ul className="dropdown-menu">
                            <li className="active"><a href="javascript:;" onClick={()=>this.dropDown1('Type')}>Type</a></li>
                            <li><a href="javascript:;" onClick={()=>this.dropDown1('Lorem ipsum')}>Lorem ipsum</a></li>
                            <li><a href="javascript:;" onClick={()=>this.dropDown1("Dolor Seit")}>Dolor Seit</a></li>
                            <li><a href="javascript:;" onClick={()=>this.dropDown1("Amet")}>Amet</a></li>
                            <li><a href="javascript:;" onClick={()=>this.dropDown1("Seti")}>Seti</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className="custom-select-drop dropdown">
                          <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                             <span id="selected">{this.state.textField1}</span><span className="caret" />
                          </a>
                          <ul className="dropdown-menu">
                            <li className="active"><a href="javascript:;"  onClick={()=>this.dropDown2("is")}>is</a></li>
                            <li><a href="javascript:;" onClick={()=>this.dropDown2("is not")}>is not</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <input className="form-control" type="text" defaultValue="Invoice, Credit Memo" data-role="tagsinput" value={this.state.textField2} name="textField2" onChange={this.change} />
                      </div>
                      <a href="javascript:;" className="del-row">
                        <img className="img-responsive" src="images/delete-icon.svg" alt="icon" />
                      </a>
                    </div>
                    <div className="row">
                      <a href="javascript:;" className="add-input">Add Condition</a>
                    </div>
                    <div className="row text-right mar-b-no">
                      <div className="form-group mar-top mar-b-no">
                        <button className="btn btn-lightgray">Cancel</button>
                        <div className="btn btn-blue" onClick={()=>{this.search()}} >Search</div>
                      </div>
                    </div>
                  </form>
                </div>
                {this.state.toggle==true?(
                <div className="row">
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
                              Date
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Name
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              No#
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Reference
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Bank Account
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th className="text-right">
                              Transaction Total
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Account
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
                            <td>06-06-2020</td>
                            <td>City Limousines</td>
                            <td>INV-006</td>
                            <td>Monthly Support</td>
                            <td>--</td>
                            <td className="text-right">250.00</td>
                            <td>Liability Insurance</td>
                          </tr>
                          <tr>
                            <td className="extra-pad-no">
                              <label className="custom-checkbox small">
                                <input type="checkbox" name="all" defaultChecked="checked" />&nbsp;
                                <span className="checkmark" />
                              </label>
                            </td>
                            <td>08-06-2020</td>
                            <td>Hamliton Smith Ltd</td>
                            <td>INV-019</td>
                            <td>Monthly Support</td>
                            <td>--</td>
                            <td className="text-right">541.00</td>
                            <td>Sales Discount</td>
                          </tr>
                          <tr>
                            <td className="extra-pad-no">
                              <label className="custom-checkbox small">
                                <input type="checkbox" name="all" defaultChecked="checked" />&nbsp;
                                <span className="checkmark" />
                              </label>
                            </td>
                            <td>11-06-2020</td>
                            <td>Port &amp; Philips</td>
                            <td>INV-091</td>
                            <td>Monthly Support</td>
                            <td>--</td>
                            <td className="text-right">280.00</td>
                            <td>Office Expense</td>
                          </tr>
                          <tr>
                            <td className="extra-pad-no">
                              <label className="custom-checkbox small">
                                <input type="checkbox" name="all" />&nbsp;
                                <span className="checkmark" />
                              </label>
                            </td>
                            <td>20-07-2020</td>
                            <td>Young Bros Transport</td>
                            <td>INV-021</td>
                            <td>Monthly Support</td>
                            <td>--</td>
                            <td className="text-right">280.00</td>
                            <td>Office Expense</td>
                          </tr>
                          <tr>
                            <td className="extra-pad-no">
                              <label className="custom-checkbox small">
                                <input type="checkbox" name="all" />&nbsp;
                                <span className="checkmark" />
                              </label>
                            </td>
                            <td>06-06-2020</td>
                            <td>City Limousines</td>
                            <td>INV-006</td>
                            <td>Monthly Support</td>
                            <td>--</td>
                            <td className="text-right">250.00</td>
                            <td>Liability Insurance</td>
                          </tr>
                          <tr>
                            <td className="extra-pad-no">
                              <label className="custom-checkbox small">
                                <input type="checkbox" name="all" defaultChecked="checked" />&nbsp;
                                <span className="checkmark" />
                              </label>
                            </td>
                            <td>08-06-2020</td>
                            <td>Hamliton Smith Ltd</td>
                            <td>INV-019</td>
                            <td>Monthly Support</td>
                            <td>--</td>
                            <td className="text-right">541.00</td>
                            <td>Sales Discount</td>
                          </tr>
                          <tr>
                            <td className="extra-pad-no">
                              <label className="custom-checkbox small">
                                <input type="checkbox" name="all" defaultChecked="checked" />&nbsp;
                                <span className="checkmark" />
                              </label>
                            </td>
                            <td>11-06-2020</td>
                            <td>Port &amp; Philips</td>
                            <td>INV-091</td>
                            <td>Monthly Support</td>
                            <td>--</td>
                            <td className="text-right">280.00</td>
                            <td>Office Expense</td>
                          </tr>
                          <tr>
                            <td className="extra-pad-no">
                              <label className="custom-checkbox small">
                                <input type="checkbox" name="all" />&nbsp;
                                <span className="checkmark" />
                              </label>
                            </td>
                            <td>20-07-2020</td>
                            <td>Young Bros Transport</td>
                            <td>INV-021</td>
                            <td>Monthly Support</td>
                            <td>--</td>
                            <td className="text-right">280.00</td>
                            <td>Office Expense</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                ):""}
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          <div className="pf-btm-wrap bg-sticky">
            <div className="col-md-12 text-right pad-no">
              <p className="selected-no">4 transactions selected</p>
              <button className="btn btn-lightgray">Cancel</button>
              <div className="dib">
                <div className="dropdown menu-item">
                  <button className="btn btn-green dropdown-toggle btn-arrow" data-toggle="dropdown" aria-expanded="false">Recode<span className="caret" /></button>
                  <ul className="dropdown-menu align-right">
                    <li><a href="javascript:;" data-toggle="modal" data-target="#recode-source">Recode source transactions</a></li>
                    <li><a href="javascript:;" data-toggle="modal" data-target="#recode-manual-journal">Recode with a manual journal</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* pf-btm-wrap Ends here */}
        </div>
        {/* Main Wrapper Ends here */}
        {/* Modal Wrapper Starts here */}
        <div className="modal fade pop-modal" id="recode-source" role="dialog">
          <div className="modal-dialog modal-xs custom-modal">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs" data-dismiss="modal">
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Recode Source Transactions</h3>
                <form className="custom-form row column">
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Name</label>
                    <input type="text" placeholder="Don't Change" className="form-control" name />
                  </div>
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Account</label>
                    <div className="custom-select-drop dropdown">
                      <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                        <span id="selected">Don't Change </span><span className="caret" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="active"><a href="javascript:;">Don't Change</a></li>
                        <li><a href="javascript:;">Account 1</a></li>
                        <li><a href="javascript:;">Account 2</a></li>
                        <li><a href="javascript:;">Account 3</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Sales Tax</label>
                    <div className="custom-select-drop dropdown">
                      <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                        <span id="selected">Don't Change </span><span className="caret" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="active"><a href="javascript:;">Don't Change</a></li>
                        <li><a href="javascript:;">Sales Tax 1</a></li>
                        <li><a href="javascript:;">Sales Tax 2</a></li>
                        <li><a href="javascript:;">Sales Tax 3</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                    <button className="btn btn-lightgray">Cancel</button>
                    <button className="btn btn-green">Review</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade pop-modal" id="recode-manual-journal" role="dialog">
          <div className="modal-dialog modal-xs custom-modal">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs" data-dismiss="modal">
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Recode with a manual journal</h3>
                <form className="custom-form row column">
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Account</label>
                    <div className="custom-select-drop dropdown">
                      <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                        <span id="selected">Don't Change </span><span className="caret" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="active"><a href="javascript:;">Don't Change</a></li>
                        <li><a href="javascript:;">Account 1</a></li>
                        <li><a href="javascript:;">Account 2</a></li>
                        <li><a href="javascript:;">Account 3</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Sales Tax</label>
                    <div className="custom-select-drop dropdown">
                      <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                        <span id="selected">Don't Change </span><span className="caret" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="active"><a href="javascript:;">Don't Change</a></li>
                        <li><a href="javascript:;">Sales Tax 1</a></li>
                        <li><a href="javascript:;">Sales Tax 2</a></li>
                        <li><a href="javascript:;">Sales Tax 3</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                    <button className="btn btn-lightgray">Cancel</button>
                    <button className="btn btn-green">Review</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Wrapper Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* Bootstrap TagsInput JS */}
        {/* jQueryUI JS */}

            </React.Fragment>
        )
    }
}