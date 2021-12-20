import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"
import data from "../components/reports/CountryCodes";



export default class Sales extends React.Component {
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
      taxName: "",
      taxType: '',
      taxRate: '',
      taxCode: '',
      deleteArr: [],
      show_succes: false,
      country_code: '',
      modal_info_msg: "",
      selected_rate_type: "%",
      maximum_chr_lngth: 4,
      selectedOption: "option2",
      rate_entered: "",
      search_key_gst: "",
      gst_list: [],
      filterid: '',
      editId: '',

    }
    console.log(jQuery)



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
    this.get_gst_list();
    this.getCountry();

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

  handleChangeTax(event) {

    this.setState(
      {
        [event.target.name]: event.target.value,
      },

    );
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  };



  handleChange_gst_type = (event) => {
    if (this.state.selected_rate_type != "Fixed price") {

      let entered_value = event.target.value;
      console.log(isNaN(entered_value))
      // alert(entered_value)
      if (isNaN(entered_value)) {
        jQuery("#tax").val("");
      } else {
        if (entered_value > 100) {
          jQuery("#tax").val("");
        } else {
          this.setState({ taxRate: entered_value });
        }
      }
    } else {
      let entered_value = event.target.value;
      if (isNaN(entered_value)) {
        jQuery("#tax").val("");
      } else {
        this.setState({ taxRate: entered_value });
      }
    }
  };

  checkBox = (e, idx) => {
    const newrecode = [...this.state.gst_list]
    newrecode[idx].check = e.target.checked
    this.setState({ gst_list: newrecode })

  };

  overallClick = (e) => {
    let tableDataArr = this.state.gst_list;
    tableDataArr.map((item, i) => {
      item.check = e.target.checked;
    });
    this.setState({ gst_list: tableDataArr })
  };

  deleteTax() {
    let gst = this.state.gst_list
    let filter = gst.filter(val => {
      if (val.check == true) {
        return val.id
      }
    })
    let id = filter.map((data) => {
      return data.id
    })

    FetchAllApi.delete_tax(id, (err, response) => {
      if (response.status === 1) {
        alert("Tax deleted successfully")
        window.location.reload();
      }
    })
    this.get_gst_list()
  }


  editTax = (val) => {
    let Edit = {
      sales_tax_name: this.state.taxName,
      tax_type: this.state.taxType,
      rate: this.state.taxRate,
      sales_tax_code: this.state.taxCode,
      client_id: this.state.logged_client_id,
      id: this.state.editId
    }
    FetchAllApi.edit_tax(Edit, (err, response) => {
      if (response.status === 1) {
        alert("Tax Edited successfully")
      }
    })
    this.get_gst_list();
  }

  changeStatus = (id) => {
    FetchAllApi.tax_status_change(id, (err, response) => {
      if (response.status === 1) {
        alert("Status Changed successfully")
      }
    })
    this.get_gst_list();

  }

  add_gst_details = (e) => {
    e.preventDefault();
    let sales_tax_code = this.state.taxCode;
    let sales_tax_name = this.state.taxName;
    let show_on_list = 1;
    let tax_type = this.state.selectedOption === "option1" ? 1 : 2;
    let rate = this.state.taxRate;

    if (
      this.state.selected_rate_type != "Fixed price" &&
      this.state.selected_rate_type === "%"
    ) {
      var rate_type = 1;
    } else {
      var rate_type = 2;
    }

    let country = this.state.country_code;
    let items = {
      sales_tax_code: sales_tax_code,
      sales_tax_name: sales_tax_name,
      show_on_list: show_on_list,
      tax_type: tax_type,
      rate: rate,
      rate_type: rate_type,
      country: country,
      client_id: this.state.logged_client_id
    };
    console.log("hjagsjkhlkasjh", items);
    FetchAllApi.add_gst_details(items, (err, response) => {
      console.log("add comment", response.status);

      if (response.status === 1) {
        jQuery("#sales_tax_code").val("");
        jQuery("#sales_tax_name").val("");
        jQuery("#sales_tax_name").val("");
        jQuery("#tax").val("");
        this.setState({ show_succes: true });
        this.get_gst_list();
        var THIS = this;
        setTimeout(function () {
          THIS.setState({ show_succes: false });
        }, 4000);
        window.jQuery("#pop-modal-1").modal("hide");
      } else {
        this.setState({ modal_info_msg: response.message });
        jQuery(".mymsg").fadeIn(2000);
        setTimeout(function () {
          jQuery(".mymsg").fadeOut(2000);
        }, 8000);
      }
    });
  };

  get_gst_list = () => {
    let country_code = this.state.country_code;
    //alert(country_code)
    let keyword = this.state.search_key_gst;
    FetchAllApi.get_gst_list(country_code, keyword, this.state.logged_client_id, (err, response) => {
      console.log("defaultcategorylist", response);
      //alert(response.message)
      if (response.status === 1) {
        response.list.map((item) => {
          item.check = false
        })
        this.setState({
          gst_list: response.list,
        });
      } else {
        this.setState({
          gst_list: [],
        });
      }
    });
  };

  update_rate_fixed = () => {
    jQuery("#tax").val("");
    this.setState({
      selected_rate_type: "Fixed price",
      maximum_chr_lngth: 100,
    });
  };
  update_rate_type = () => {
    jQuery("#tax").val("");
    this.setState({
      selected_rate_type: "%",
      maximum_chr_lngth: 4,
    });
  };
  getCountry = () => {
    let client_Id = this.state.logged_client_id;
    FetchAllApi.get_country_id(client_Id, (err, response) => {
      // alert(response.country_id)
      if (response.status === 1) {
        this.setState(
          {
            country_code: response.country_id,
          },
          () => this.get_gst_list()
        );
      }
    });
  }

  modal_cancel = () => {
    jQuery("#sales_tax_code").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#tax").val("");
    this.setState({ modal_info_msg: "" });
    window.jQuery("#pop-modal-1").modal("hide");
  };


  editFunc = (val) => {

    this.setState({
      taxName: val.sales_tax_name,
      taxType: val.tax_type,
      taxRate: val.rate,
      taxCode: val.sales_tax_code,
      editId: val.id
    })

  }





  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }




  render() {
    console.log(this.state.gst_list)
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
                <h3>Taxes</h3>
                <div>
                  <a data-toggle="modal" data-target="#pop-modal-1">
                    <button className="btn btn-blue with-icon" onClick={this.addTax}>
                      <img src="images/plus-add.svg" className="filter-white" />
                    Add New Tax
                  </button>
                  </a>
                </div>
              </div>
              {this.state.gst_list.length == 0 ? (
                <div id="cash-coding" className="col-md-12 tab-pane fade in pad-no">
                  <div className="landing-wrap">
                    <div className="img-concept text-center">
                      <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                      <p>Looks like there's no data</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12 col-xs-12">
                  <div className="list-table row mar-t-no member-table">
                    <div className="cus-table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="checkbox-td">
                              <label className="custom-checkbox">
                                <input type="checkbox" name="all" onClick={(e) => { this.overallClick(e) }} />&nbsp;
                              <span className="checkmark" />
                              </label>
                            </th>
                            <th>Sales Tax Name</th>
                            <th>Sales Tax Type</th>
                            <th>Tax Rate</th>
                            <th className="text-center">Sales Tax Code</th>
                            <th className="action-td" />
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.gst_list.map((val, idx) => {
                            return (
                              <tr>
                                <td className="checkbox-td">
                                  <label className="custom-checkbox">
                                    <input type="checkbox" name="all" id="demo" checked={val.check} onClick={(e) => { this.checkBox(e, idx, val.check) }} />&nbsp;
                              <span className="checkmark" />
                                  </label>
                                </td>
                                <td>
                                  <span className="fw-med fs-13" id="">{val.sales_tax_name}</span>
                                </td>
                                <td>
                                  <span className="fs-13">{val.tax_type}</span>
                                </td>
                                <td>
                                  <span className="fs-13" >{val.rate}%</span>
                                </td>
                                <td className="text-center">
                                  <span className="fs-13" >{val.sales_tax_code}</span>
                                </td>
                                <td>
                                  <div className="dropdown menu-item new-cus">
                                    <button className="btn btn-green dropdown-toggle" type="button" data-toggle="dropdown">Action
                                <span className="caret" /></button>
                                    <ul className="dropdown-menu align-right">
                                      <li><a data-toggle="modal" data-target="#pop-modal-2" onClick={() => { this.editFunc(val) }} >Edit</a></li>
                                      {/* <li><a href="javascript:;" onClick={() => { this.changeStatus(val.id) }} >Make In-active</a></li> */}
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
                </div>
              )}
            </div>
          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          <div className="pf-btm-wrap bg-sticky">
            <div className="col-md-12 text-right pad-no">
              <button className="btn btn-red" onClick={() => { this.deleteTax() }}>Delete</button>
            </div>
          </div>
          <div>

          </div>

          {/* pf-btm-wrap Ends here */}
          <div
            className="modal fade pop-modal"
            id="pop-modal-1"
            role="dialog"
          >
            <div className="modal-dialog modal-md custom-modal">
              <button
                type="button"
                className="close hidden-xs"
                data-dismiss="modal"
                onClick={this.cancel_gst_modal}
              >
                <img
                  className="img-responsive"
                  src="../../images/close-red.svg"
                  alt="icon"
                />
              </button>
              <div className="modal-content">
                <div className="modal-body text-center">
                  <h3>Add New GST</h3>
                  <form className="custom-form row">
                    <div className="form-group col-md-12 col-xs-12 pad-no">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>
                          Sales Tax Code
                                      <span className="astrick">*</span>
                        </label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <input

                          type="text"
                          name="taxCode"
                          id="sales_tax_code"
                          autoComplete="off"
                          maxLength="4"
                          className="form-control"
                          onChange={(event) =>
                            this.handleChangeTax(event)
                          }
                          required
                        />

                        <p className="input-info">
                          (Maximum 4 characters)
                                    </p>
                      </div>
                    </div>
                    <div className="form-group col-md-12 col-xs-12 pad-no">
                      <div className="col-md-4 col-sm-4 col-md-12">
                        <label>
                          Sales Tax Name
                                      <span className="astrick">*</span>
                        </label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <input

                          type="text"
                          name="taxName"
                          autoComplete="off"
                          id="sales_tax_name"
                          className="form-control"
                          onChange={(event) =>
                            this.handleChangeTax(event)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Tax Type</label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <label className="custom-checkbox radio mar-rgt taxable">
                          <input

                            type="radio"
                            name="tax-item"
                            value="option1"
                            checked={
                              this.state.selectedOption ===
                              "option1"
                            }
                            onChange={this.handleOptionChange}
                          />
                                      Taxable
                                      <span className="checkmark"></span>
                        </label>
                        <label className="custom-checkbox radio non-taxable">
                          <input
                            type="radio"
                            name="tax-item"
                            value="option2"
                            checked={
                              this.state.selectedOption ===
                              "option2"
                            }
                            onChange={this.handleOptionChange}
                          />{" "}
                                      Non-Taxable/Exempt
                                      <span className="checkmark"></span>
                        </label>
                        {this.state.selectedOption === "option1" ? (
                          <div className="hidden-field col-md-12 col-xs-12">
                            <div className="form-group">
                              <label className="mar-t-no mar-btm">
                                Tax item for purchases & sales
                                          </label>
                              <div className="col-md-12">
                                <div className="row">
                                  <label
                                    className="mar-rgt"
                                    style={{ marginTop: 8 }}
                                  >
                                    Rate
                                              </label>
                                  { }
                                  <div className="input-group rate-input">
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="taxRate"
                                      id="tax"
                                      autoComplete="off"
                                      required
                                      onInput={(event) =>
                                        this.handleChange_gst_type(
                                          event
                                        )
                                      }
                                    />
                                    <div className="input-group-btn">
                                      <div className="custom-select-drop dropdown">
                                        <a
                                          aria-expanded="false"
                                          aria-haspopup="true"
                                          role="button"
                                          data-toggle="dropdown"
                                          className="dropdown-toggle btn"
                                          href="javascript:;"
                                        >
                                          <span id="selected">
                                            {
                                              this.state
                                                .selected_rate_type
                                            }
                                          </span>
                                          <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu">
                                          <li className="active">
                                            <a
                                              href="javascript:;"
                                              onClick={
                                                this
                                                  .update_rate_type
                                              }
                                            >
                                              %
                                                        </a>
                                          </li>
                                          <li>
                                            <a
                                              href="javascript:;"
                                              onClick={
                                                this
                                                  .update_rate_fixed
                                              }
                                            >
                                              Fixed price
                                                        </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {/* <div className='mymsg'>{this.state.modal_info_msg}</div> */}
                    <small
                      style={{ color: "red" }}
                      className="mymsg"
                    >
                      {this.state.modal_info_msg}{" "}
                    </small>

                    <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                      {this.state.show_succes ? (
                        <div className="alert alert-success">
                          <strong>Success!</strong> Your new GST is
                                      added.
                        </div>
                      ) : (
                        ""
                      )}
                      <button
                        className="btn btn-lightgray"
                        data-dismiss="modal"
                        onClick={this.modal_cancel}
                      >
                        Cancel
                                  </button>
                      <span>{"   "}</span>
                      <button
                        className="btn btn-green"
                        type="submit"
                        onClick={this.add_gst_details}
                      >
                        Save
                                  </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            className="modal fade pop-modal"
            id="pop-modal-2"
            role="dialog"
          >
            <div className="modal-dialog modal-md custom-modal">
              <button
                type="button"
                className="close hidden-xs"
                data-dismiss="modal"
                onClick={this.cancel_gst_modal}
              >
                <img
                  className="img-responsive"
                  src="../../images/close-red.svg"
                  alt="icon"
                />
              </button>
              <div className="modal-content">
                <div className="modal-body text-center">
                  <h3>Add New GST</h3>
                  <form className="custom-form row">
                    <div className="form-group col-md-12 col-xs-12 pad-no">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>
                          Sales Tax Code
                                      <span className="astrick">*</span>
                        </label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <input
                          value={this.state.taxCode}
                          type="text"
                          name="taxCode"
                          id="sales_tax_code"
                          autoComplete="off"
                          maxLength="4"
                          className="form-control"
                          onChange={(event) =>
                            this.handleChangeTax(event)
                          }
                          required
                        />

                        <p className="input-info">
                          (Maximum 4 characters)
                                    </p>
                      </div>
                    </div>
                    <div className="form-group col-md-12 col-xs-12 pad-no">
                      <div className="col-md-4 col-sm-4 col-md-12">
                        <label>
                          Sales Tax Name
                                      <span className="astrick">*</span>
                        </label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <input
                          value={this.state.taxName}
                          type="text"
                          name="taxName"
                          autoComplete="off"
                          id="sales_tax_name"
                          className="form-control"
                          onChange={(event) =>
                            this.handleChangeTax(event)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Tax Type</label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <label className="custom-checkbox radio mar-rgt taxable">
                          <input

                            type="radio"
                            name="tax-item"
                            value="option1"
                            checked={
                              this.state.selectedOption ===
                              "option1"
                            }
                            onChange={this.handleOptionChange}
                          />
                                      Taxable
                                      <span className="checkmark"></span>
                        </label>
                        <label className="custom-checkbox radio non-taxable">
                          <input
                            type="radio"
                            name="tax-item"
                            value="option2"
                            checked={
                              this.state.selectedOption ===
                              "option2"
                            }
                            onChange={this.handleOptionChange}
                          />{" "}
                                      Non-Taxable/Exempt
                                      <span className="checkmark"></span>
                        </label>
                        {this.state.selectedOption === "option1" ? (
                          <div className="hidden-field col-md-12 col-xs-12">
                            <div className="form-group">
                              <label className="mar-t-no mar-btm">
                                Tax item for purchases & sales
                                          </label>
                              <div className="col-md-12">
                                <div className="row">
                                  <label
                                    className="mar-rgt"
                                    style={{ marginTop: 8 }}
                                  >
                                    Rate
                                              </label>
                                  { }
                                  <div className="input-group rate-input">
                                    <input
                                      value={this.state.taxRate}
                                      className="form-control"
                                      type="text"
                                      name="tax"
                                      id="tax"
                                      autoComplete="off"
                                      required
                                      onInput={(event) =>
                                        this.handleChange_gst_type(
                                          event
                                        )
                                      }
                                    />
                                    <div className="input-group-btn">
                                      <div className="custom-select-drop dropdown">
                                        <a
                                          aria-expanded="false"
                                          aria-haspopup="true"
                                          role="button"
                                          data-toggle="dropdown"
                                          className="dropdown-toggle btn"
                                          href="javascript:;"
                                        >
                                          <span id="selected">
                                            {
                                              this.state
                                                .selected_rate_type
                                            }
                                          </span>
                                          <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu">
                                          <li className="active">
                                            <a
                                              href="javascript:;"
                                              onClick={
                                                this
                                                  .update_rate_type
                                              }
                                            >
                                              %
                                                        </a>
                                          </li>
                                          <li>
                                            <a
                                              href="javascript:;"
                                              onClick={
                                                this
                                                  .update_rate_fixed
                                              }
                                            >
                                              Fixed price
                                                        </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {/* <div className='mymsg'>{this.state.modal_info_msg}</div> */}
                    <small
                      style={{ color: "red" }}
                      className="mymsg"
                    >
                      {this.state.modal_info_msg}{" "}
                    </small>

                    <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                      {this.state.show_succes ? (
                        <div className="alert alert-success">
                          <strong>Success!</strong> Your new GST is
                                      added.
                        </div>
                      ) : (
                        ""
                      )}
                      <button
                        className="btn btn-lightgray"
                        data-dismiss="modal"
                        onClick={this.modal_cancel}
                      >
                        Cancel
                                  </button>
                      <span>{"   "}</span>
                      <input type="button" data-dismiss="modal"
                        className="btn btn-green"
                        value="save"
                        onClick={this.editTax}
                      />

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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