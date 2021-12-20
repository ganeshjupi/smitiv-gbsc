import React from "react";
import LeftSidebar from "./../left_sidebar";
import Footer from "./../footer";
import Topbar from "./../topbar";
import FetchAllApi from "../../api_links/fetch_all_api";
import jQuery from "jquery";
import config from "./../../api_links/api_links.jsx";
import { ToWords } from "to-words";
import moment from "moment";
var _ = require("lodash");
var authorization_key = "O5mGIP3VNia0JvPH2IBiwA==";
const $ = require("jquery");
$.DataTable = require("datatables.net");



const toWords = new ToWords();

class TransferFund extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),

      selectedLimit: 10,
      role_permissions:
        JSON.parse(localStorage.getItem("role_permissions")) || [],
      transfer_fund_from: '',
      from_currency: '',
      transfer_fund_to: '',
      to_currency: '',
      transaction_date: '',//moment(new Date()).format('DD/MM/YYYY'),
      from_transfer_currency: '',
      to_transfer_currency: '',
      transfer_amount: '',
      amount_words: '',
      memo: '',
      exchange_rate: '',
      clientHomeCurrency: '',
      currency_list: [],
      banklist: [],
      currency: {},
      errorMsg: "",
      default_category_list: [],

    };
  }


  rename = (obj, curr) => {
    let a = {}
    Object.keys(obj).map((key) => {
      let newKey = key.replace(curr, '')
      Object.assign(a, { [newKey]: obj[key] })
    })
    return a
  }

 
  defaultcategorylist_onchange = (x, y, z) => {
    let keyy = "";
    let from_create_invoice = 1;
    var client_id = this.state.logged_client_id;

    FetchAllApi.defaultcategorylist_onchange2(
      keyy,
      from_create_invoice,
      client_id,
      (err, response) => {
        // console.log("defaultcat9999egorylist", response);
        if (response.status === 1) {
          if (x == "added") {
            this.setState({
              selectNeedIndex: response.list.length - 1,
              nameFilter: y,
            });
          }
          this.setState(
            {
              default_category_list: response.list,
            },
            () => {
              window.jQuery("#balanceSheetCategeory").selectpicker("refresh");
            }
          );
        } else {
          this.setState({
            default_category_list: [],
          });
        }
      }
    );
    this.onChange_filter_balancesheet();
    this.setState({ cate_id: z })
  };
  onChange_filter_balancesheet = () => {
    let search_key = "";
    var client_id = this.state.logged_client_id;

    //alert(search_key)
    FetchAllApi.balancesheetlist_onchange(
      search_key,
      client_id,
      (err, response) => {
        // console.log("defaultcategorylist", response);
        if (response.status === 1) {
          // alert('k')
          this.setState({
            balancesheetlist: response.list,
          });
        } else {
          this.setState({
            balancesheetlist: [],
          });
        }
      }
    );
  };
  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass("minimize_leftbar");
    //console.log("logged_user_id", this.state.logged_user_id);

    jQuery("title").html("Customer | GBSC");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }
  }

  routedChange(parameter) {
    this.props.history.push("/" + parameter);
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.getBanks();
    this.get_client_home_currency();


    this.getSpecificPage(1, 10);
    this.defaultcategorylist_onchange();
    jQuery(window).on("load", function () {
      window.jQuery(".mscroll-y").mCustomScrollbar({
        axis: "y",
        scrollEasing: "linear",
        scrollInertia: 600,
        autoHideScrollbar: "true",
        autoExpandScrollbar: "true",
      });

      window.jQuery(".ib-scroll").mCustomScrollbar({
        scrollEasing: "linear",
        scrollInertia: 600,
        scrollbarPosition: "outside",
      });
    });

    jQuery(document).ready(function () {
      jQuery(".left-navmenu .has-sub").click(function () {
        jQuery(".left-navmenu li a").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".left-navmenu li a:not(.active)")
          .siblings(".sub-menu")
          .slideUp();
        jQuery(this).siblings(".sub-menu").slideToggle();
      });
      jQuery(".left-navmenu .sub-menu li a").click(function () {
        jQuery(".left-navmenu .sub-menu li a").removeClass("active");
        jQuery(this).addClass("active");
      });
      jQuery(".search-btn").click(function () {
        jQuery(".hdr-search").addClass("active");
      });
      jQuery(".hdr-search .close-icon").click(function () {
        jQuery(".hdr-search").removeClass("active");
      });
      window.jQuery(".select-picker").selectpicker();
      jQuery(".label-enclose .label").click(function () {
        jQuery(this).toggleClass("active");
      });
      jQuery(".nav-brand-res").click(function () {
        jQuery(".left-navbar").addClass("active");
      });
      jQuery(".menu-close").click(function () {
        jQuery(".left-navbar").removeClass("active");
      });
    });
  }

  valueChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  fromBankChange = (e) => {
    this.state.banklist.map((from) => {
      if (from.id == e.target.value) {
        this.setState({ transfer_fund_from: e.target.value, from_currency: from.currency,
           from_transfer_currency: from.currency, transfer_currency: from.currency }, () => 
           { this.conditionFunc("from") })
      }
    })

  };

  toBankChange = (e) => {
    this.state.banklist.map((to) => {
      if (to.id == e.target.value) {
        this.setState({ transfer_fund_to: e.target.value, to_currency: to.currency, to_transfer_currency: to.currency, }, () => { 
          this.conditionFunc("to") })
      }
    })
  };

  changeDate = () => { 
    let date = jQuery("#transaction_date").val();
    if (date && date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ transaction_date: date_formated });
      console.log(date_formated, this.state.transaction_date)
      // alert(date_formated);
    }
  };

  dateChange = (e) => {
    let date = e
   
    let date1=jQuery("#transaction_date").val()
    if(date&& date!=undefined){
    var array = date.split('/')
    var date_formated = array[2] + '-' + array[1] + '-' + array[0]
    this.setState({ transaction_date: date_formated },()=>{})
    }
  };

  currencyChange = (e) => {
    let rate = this.state.currency[e.target.value]
    this.setState({ transfer_currency: e.target.value }, this.exchangeRate)

  };

  exchangeRate = () => {
    let rate = this.state.currency[this.state.to_transfer_currency]
    this.setState({ exchange_rate: Number(rate.toFixed(4)) })
  };

  getSpecificPage = (pageNumber, limitvalue, searchkey) => {
    let client_id = this.state.logged_client_id;
    let page = pageNumber;
    let limit = this.state.selectedLimit;

    let search = searchkey;

    // alert(this.state.logged_client_id)
    FetchAllApi.customer_list(
      client_id,
      page,
      limit,
      search,
      parseInt(this.state.selected_filter_id),
      (err, response) => {
        console.log("Customer_list", response);
        if (response.status === 1) {
          let customerListArray = response.list;
          //  let totalPagesCount = new Array(parseInt( response.TotalPages))
          var totalPagesCount = [];
          for (var i = 1; i <= response.TotalPages; i++) {
            totalPagesCount.push(i);
          }
          this.setState({
            customerListArray: customerListArray,
            TotalPages: totalPagesCount,
            selectedLimit: this.state.selectedLimit,
            totalPagesCount: response.TotalPages,
          });
        } else {
          this.setState({
            customerListArray: [],
            TotalPages: "",
            pgNo: "",
            totalPagesCount: "",
          });
        }
      }
    );
  };

  componentDidUpdate() {

    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

  };

  conditionFunc = (input) => {
    if (input == "to") {
      this.exchangeRate();
    }
    let from = this.state.from_currency;
    let to = this.state.to_currency;
    let fromBnk = this.state.transfer_fund_from;
    let toBnk = this.state.transfer_fund_to;
    let homeCurrency = this.state.clientHomeCurrency;
    if (fromBnk !== "" && toBnk !== '') {
      if ((fromBnk !== toBnk) && (from === to)) {
        return null
      } else
        if (from == homeCurrency || to == homeCurrency) {
          return null
        }
        else {
          if (input == "from") {
            alert("The currency of the account selected must either match the Transfer Currency or be your home Currency");
            this.setState({ transfer_fund_from: "", from_transfer_currency: '' })
          } else {
            alert("The currency of the account selected must either match the Transfer Currency or be your home Currency");
            this.setState({ transfer_fund_to: "", to_transfer_currency: '' })
          }
        }
    }
  }
  clear=()=>{
    window.location.reload();
  }
  convert_date = date => {
    if (date && date != undefined) {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
    }
    return date_formated
  }
  saveFunc = (page) => {
    console.log(jQuery("#transaction_date").val())
    let input = {
      client_id: this.state.logged_client_id,
      from_bank_id: this.state.transfer_fund_from,
      to_bank_id: this.state.transfer_fund_to,
      transaction_date: this.convert_date(jQuery("#transaction_date").val()),
      transfer_currency: this.state.transfer_currency,
      amount: Number(this.state.transfer_amount),
      amount_in_words: toWords.convert(
        isNaN(Number(this.state.transfer_amount)) ? 0 : Number(this.state.transfer_amount)
      ),
      memo: this.state.memo,
      exchange_rate: this.state.exchange_rate
    }
    if (this.state.transfer_fund_from !== "" && this.state.transfer_fund_to !== "" && jQuery("#transaction_date").val() !== "" && this.state.transfer_currency !== "" && this.state.transfer_amount !== "" && this.state.memo!=="") {
      if (page == "") {

        FetchAllApi.fund_transfer(input, (err, response) => {
          if (response.status === 1) {
            alert(response.message)
          }
        });
      } else {
        FetchAllApi.fund_transfer(input, (err, response) => {
          if (response.status === 1) {
            alert(response.message)
           // window.open("/transfer_funds")
          }
        });
      }
    } else {
      this.setState({ errorMsg: true })
      setTimeout(() => {
        this.setState({ errorMsg: false })
      }, 4000)
    }
  };

  get_currencies = () => {
    // ${this.state.clientHomeCurrency}
    // alert(this.state.clientHomeCurrency)
    fetch(
      `https://api.currencylayer.com/live?access_key=${config.api_key}&source=${this.state.clientHomeCurrency}`
      // `https://api.exchangerate-api.com/v4/latest/${this.state.clientHomeCurrency}`
    )
      .then((response) => response.json())
      .then((data) => {
        let newObj = this.rename(data.quotes, this.state.clientHomeCurrency)

        const currencyAr = [];
        let first = newObj;
        for (const key in first) {
          currencyAr.push(key);
        }
        this.setState({ currency_list: currencyAr, currency: first });
      });
  };


  get_client_home_currency = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.get_client_home_currency(client_id, (err, response) => {
      if (response.status === 1) {
        console.log("Basio state", response);
        this.setState({
          clientHomeCurrency: response.currency,
        }, this.get_currencies);
      } else {
      }
    });
  };

  getBanks = () => {
    fetch(config.getAllbanks, {
      method: "POST",
      body: JSON.stringify({
        client_id:this.state.logged_client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          this.setState({ banklist: data.data });
        }
      });
  };

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  render() {
    return (
      <div>
        {/* Main Wrapper Starts here */}
        <div className="container-fluid">
          <div className="row">
            {/* left-navbar Starts here */}
            <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />
            <div className="menu-close visible-xs">&nbsp;</div>
            {/* left-navbar Ends here */}
            {/* MainContent Wrapper Starts here */}
            <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
              {/* Top bar Starts here */}
              <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <form className="hdr-search">
                  <input
                    type="text"
                    className="form-control"
                    name="search"
                    placeholder="Search..."
                  />
                  {/* <button type="submit" class="btn btn-green">Search</button> */}
                  <a href="javascript:;" className="close-icon">
                    <img src="images/close-icon-red.svg" alt="Close" />
                  </a>
                </form>
                <div className="nav-brand-res visible-xs">
                  <img
                    className="img-responsive"
                    src="images/logo-icon.png"
                    alt="LogoIcon"
                  />
                </div>
                <a href="javascript:;" className="back hidden-xs">
                  <img src="images/back-arrow-blue.svg" onClick={() => this.props.history.goBack()} />
                </a>
                {/* <span class="page-title hidden-xs">Preference</span> */}
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li>
                    <a href="javascript:;">Banking</a>
                  </li>
                  <li>Transfer Funds</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>
              {/* Top bar Ends here */}
              <div className="col-md-12 col-xs-12 mar-top visible-xs">
                <a href="javascript:;" className="back">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <span className="page-title">Transfer Funds</span>
              </div>
              {/* content-top Starts here */}
              <div className="content-top col-md-12 col-xs-12 bg-trans">
                <form className="custom-form">
                  <div className="col-md-6 col-xs-12 transfer-top">
                    <div className="row">
                      <div className="form-group col-md-12">
                        <label>Transfer Funds From<span className="astrick">*</span></label>
                        <div className="custom-select-drop dropdown">
                          <select className="selectpicker form-control hh " data-live-search="true"
                           name="transfer_fund_from" 
                           id="balanceSheetCategeory"
                          value={this.state.transfer_fund_from} onChange={(e) => {
                            if (e.target.value == "1e") {
                              jQuery("#balanceSheetCategeory option")
                                .prop("selected", false)
                                .trigger("change");
                              jQuery("#balanceSheetCategeory").val("");
                              window.jQuery("#pop-modal").modal("show");
                            } 
                            else {
                            this.fromBankChange(e)
                            }
                            }}>
                            <option value=''>choose...</option>
                            <option value="1e"> Add New </option>
                            {this.state.banklist.map((bank) => {
                              return (
                                <option value={bank.id}>{bank.name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="form-group col-md-12 mar-b-no">
                        <label>Transfer Funds To<span className="astrick">*</span></label>
                        <div className="custom-select-drop dropdown">
                          <select className="selectpicker form-control hh " data-live-search="true" 
                          name="transfer_fund_to" value={this.state.transfer_fund_to} 
                          onChange={(e) => {
                            if (e.target.value == "1e") {
                              jQuery("#balanceSheetCategeory option")
                                .prop("selected", false)
                                .trigger("change");
                              jQuery("#balanceSheetCategeory").val("");
                              window.jQuery("#pop-modal").modal("show");
                            } 
                            else {this.toBankChange(e)}
                          }}>
                            <option value="">choose...</option>
                            <option value="1e"> Add New </option>
                            {this.state.banklist.map((bank) => {
                              return (
                                <option value={bank.id}>{bank.name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
         
              {/* content-top Starts here */}
              {/* Main Content Starts here */}
              <div className="main-content col-md-12 col-xs-12 pad-t-no">
                <div className="content-sec col-md-12 col-xs-12 pad-no">
                  <form className="custom-form invoice-form">
                    <div className="row">
                      {/* <div className="form-group col-md-4">
                        <label>Transaction Date<span className="astrick">*</span></label>
                        <div
                          className="input-group date mar-t-no"
                          //data-date-format="dd/mm/yyyy"
                        >
                          <input type="text" className="form-control"
                           name="transaction_date" id="transaction_date" 
                           value={this.state.transaction_date} 
                           onBlur={(e) => {
                             alert('hi')
                            let value = e.target.value                           
                            this.dateChange(value)
                          }} 
                          />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                      </div> */}
                       <div className="form-group col-md-4">
                        <label>Transaction Date<span className="astrick">*</span></label>
                        <div
                          className="input-group date mar-t-no"
                          data-date-format="dd/mm/yyyy"
                        >
                          <input
                            type="text"
                            className="form-control"
                            id="transaction_date" 
                            onBlur={() => this.changeDate()}
                          />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <label>Transfer Currency<span className="astrick">*</span></label>
                        <div className="custom-select-drop dropdown"  >
                          <select disabled={true} className="selectpicker form-control hh " 
                          name="transfer_currency" value={this.state.from_transfer_currency} 
                          onChange={this.currencyChange}>
                            <option value="">choose...</option>
                            {this.state.currency_list.map((amm, idx) => {
                              return (
                                <option value={amm}>{amm}</option>
                              )
                            })
                            }

                          </select>

                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <label>Transfer Amount<span className="astrick">*</span></label>
                        <input type="text" className="form-control" placeholder="0" name="transfer_amount" value={this.state.transfer_amount} onChange={this.valueChange} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label>Total Amount in Words<span className="astrick">*</span></label>
                        <textarea className="form-control" name="amount_words" value={toWords.convert(
                          isNaN(Number(this.state.transfer_amount))
                            ? ""
                            : Number(this.state.transfer_amount)
                        )} onChange={this.valueChange} />
                      </div>
                      <div className="form-group col-md-4">
                        <label>Memo</label>
                        <textarea className="form-control" name="memo" value={this.state.memo} 
                        onChange={this.valueChange} />
                      </div>
                      <div className="form-group exchange-col col-md-4">
                        <label className="mar-btm">Exchange Rate 1 {this.state.from_transfer_currency}</label>
                        <div className="w-100">
                          <input
                            type="text"
                            name="exchange_rate" value={this.state.exchange_rate} onChange={this.valueChange}
                            className="form-control"
                            defaultValue="1.38"
                          />
                          {this.state.to_transfer_currency &&
                          <span className="label">{this.state.to_transfer_currency}</span>
                          }
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* Main Content Ends here */}
              <div className="invoice-form">
                <div className="pf-btm-wrap xs-pad-all">
                  <div className="col-md-12 col-xs-12 text-right pad-no">
                    <button className="btn btn-lightgray mar-rgt-5"  onClick={() => { this.clear() }} >Clear</button>
                    <button className="btn btn-blue mar-rgt-5" onClick={() => { this.saveFunc("page") }}>Save &amp; New</button>
                    <button className="btn btn-green mar-rgt-5" onClick={() => { this.saveFunc("") }}>Save</button>
                  </div>
                </div>
              </div>
            </div>
            {/* MainContent Wrapper Ends here */}
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
          </div>
        </div>
        {/* Main Wrapper Ends here */}
        {/* footer Starts here */}
        <Footer
            defaultcategorylist_onchange={this.defaultcategorylist_onchange}
            logoutSubmit={(e) => this.logoutLink(e)}
          />
        {/* footer Ends here */}
      </div>
    );
  }
}
export default TransferFund;
