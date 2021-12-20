import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class AssetType extends React.Component {
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
      asset_name: "",
      asset_no: '',
      asset_account: '',
      asset_type: "",
      effective_life: "",
      rate: '',
      accumulated_account: '',
      accumulated_account_send: "",
      expense_account: "",
      depreciation_method: '',
      averaging_method: '',
      asset_account_list: [],
      accumulated_list: [],
      expense_list: [],
      depreciation_method_list: [],
      averaging_method_list: [],
      errorMsg: false,

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
    window.jQuery(".selectpicker").selectpicker();
    this.getDepreciationMethod();
    this.getAveragingMethod();
    this.getAccumlatedList();
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
    // window.jQuery('.selectpicker'). selectpicker('destroy');
    window.jQuery(".selectpicker").selectpicker('refresh');
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy" });

  };


  inputChange = (e) => {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  accountChange = (e) => {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value }, this.getAccumlatedList)
  }

  goBack = () => {
    this.props.history.push("/fixed_assests")
  };

  assetNameChange = (e) => {
    this.setState({ asset_name: e.target.value }, this.getAssetAccount)
  }


  getAssetAccount = () => {
    let client_id = this.state.logged_client_id;
    let asset_type_name = this.state.asset_name;
    FetchAllApi.settings_asset_account_type(client_id, asset_type_name, (err, response) => {
      if (response.status === 1) {
        this.setState({ accumulated_account: response.accumulated_depreciation_account_name, accumulated_account_send: response.accumulated_depreciation_account, asset_account: response.asset_account })

      }
    })
  };


  getDepreciationMethod = () => {
    let client_id = this.state.logged_client_id;
    FetchAllApi.settings_depreciation_method_list(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ depreciation_method_list: response.list })
      }
    })
  };

  getAveragingMethod = () => {
    let client_id = this.state.logged_client_id;
    FetchAllApi.settings_averaging_method_list(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ averaging_method_list: response.list })
      }
    })
  };


  getAccumlatedList = () => {
    let client_id = this.state.logged_client_id;
    let asset_account = 1;
    // FetchAllApi.settings_accumulated_account(client_id,asset_account,(err, response) => {
    //   if(response.status === 1){
    //     this.setState({accumulated_list:response.list,accumulated_account:response.list[0].id})
    //   }
    //   });

    FetchAllApi.settings_expense_account(client_id, asset_account, (err, response) => {
      if (response.status === 1) {
        this.setState({ expense_list: response.list, expense_account: response.list[0].id })
      }
    });
  };

  addNewAsset = () => {
    let input = {
      client_id: this.state.logged_client_id,
      asset_account: this.state.asset_account,
      accumulated_depreciation_account: this.state.accumulated_account_send,
      depreciation_expense_account: this.state.expense_account,
      depreciation_method: this.state.depreciation_method,
      averaging_method: this.state.averaging_method,
      rate: this.state.rate,
      effective_life_years: this.state.effective_life
    };
    console.log('mmmmm1', this.state.asset_name)
    console.log('mmmmm2', this.state.accumulated_account_send)
    console.log('mmmmm3', this.state.expense_account)
    console.log('mmmmm4', this.state.depreciation_method)
    console.log('mmmmm5', this.state.averaging_method)
    console.log('mmmmm6', this.state.asset_name)
    console.log('mmmmm7', this.state.effective_life_years)

    if (this.state.asset_name !== "" && this.state.accumulated_account_send !== "" && this.state.expense_account !== "" && this.state.depreciation_method !== "" && this.state.averaging_method !== "" && (this.state.rate !== "" || this.state.effective_life_years != '')) {
      FetchAllApi.settings_add_new_asset_type(input, (err, response) => {
        if (response.status === 1) {
          alert("New Asset created successfully")
          this.props.history.push("/fixed_assests")
        }
      });
    } else {
      this.setState({ errorMsg: true })
      setTimeout(() => {
        this.setState({ errorMsg: false })
      }, 4000)
    }
  };
  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }


  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          {/* header Starts here */
            // console.log(this.state.accumulated_account, 'this.state.accumulated_account')
          }
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
                <h3>
                  <a href="/fixed_assests" className="back">
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  Add Asset Type
                </h3>
              </div>
              <div className="col-md-12 col-xs-12">
                <form className="custom-form invoice-form row legend-form pad-no">
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Type &amp; Accounts</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Asset Account/Type<span className="astrick">*</span></label>
                      <input type="text" className="form-control" name="asset_name" onBlur={this.assetNameChange} />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Accumulated Depreciation Account<span className="astrick">*</span></label>

                      <select className="selectpicker form-control hh " name="accumulated_account" value={this.state.accumulated_account} onChange={this.inputChange}>


                        <option value={this.state.accumulated_account_send}>{this.state.accumulated_account}</option>

                      </select>
                    </div>

                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Depreciation Expense Account<span className="astrick">*</span></label>

                      <select className="selectpicker form-control hh" style={{ maxHeight: "none" }} name="expense_account" value={this.state.expense_account} onChange={this.inputChange}>
                        {this.state.expense_list.map((exp, idx) => {
                          return (
                            <option value={exp.id}>{exp.name}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Book Depreciation Default</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Depreciation Method<span className="astrick">*</span></label>

                      <select className="selectpicker form-control hh " name="depreciation_method" value={this.state.depreciation_method} onChange={this.inputChange}>
                        <option value="">choose...</option>
                        {this.state.depreciation_method_list.map((dep, idx) => {
                          return (
                            <option value={dep.id}>{dep.name}</option>
                          )
                        })}
                      </select>

                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Averaging Method<span className="astrick">*</span></label>
                      <div className="custom-select-drop dropdown">
                        <select className="selectpicker form-control hh " name="averaging_method" value={this.state.averaging_method} onChange={this.inputChange}>
                          <option value="">choose...</option>
                          {this.state.averaging_method_list.map((aver, idx) => {
                            return (
                              <option value={aver.id}>{aver.name}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="custom-checkbox radio small">
                        <input type="radio" name="over" defaultChecked="checked" /> Rate<span className="astrick">*</span>
                        <span className="checkmark" />
                      </label>
                      <span className="right-placeholder">%</span>
                      <input type="text" className="form-control" name="rate" onChange={this.inputChange} />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="custom-checkbox radio small">
                        <input type="radio" name="over" defaultChecked="checked" /> Effective Life (Years)
                        <span className="checkmark" />
                      </label>
                      <input type="text" className="form-control" name="effective_life" onChange={this.inputChange} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          <div className="pf-btm-wrap bg-sticky">
            <div className="col-md-12 text-right pad-no">
              <button className="btn btn-lightgray mar-rgt-5" onClick={() => { this.props.history.push('/fixed_assests') }}>Cancel</button>
              <button className="btn btn-green mar-rgt-5" onClick={() => this.addNewAsset()}>Save</button>
            </div>
          </div>
          {this.state.errorMsg == true ? (
            <div className='alert alert-card warning alert-dismissible fade in '>
              <a
                href='#'
                className='close'
                data-dismiss='alert'
                aria-label='close'
                onClick={() => {
                  this.setState({ error: false })
                }}
              >
                ×
          </a>
              <div className='img-wrap'>
                <img
                  className='img-responsive'
                  src='images/alert-warning.svg'
                  alt='icon'
                />
              </div>
              <div className='alert-cont'>
                <strong className='title'>
                  Mandatory fields must be filled!
            </strong>
              </div>
            </div>
          ) : null}
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