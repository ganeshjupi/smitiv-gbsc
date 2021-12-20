import React from 'react';
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"

import config from './../api_links/api_links'



export default class Addcurrency extends React.Component {

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
      currency_list: [],
      currency: "",
      symbol: "",
      exchange_rate: '',
      selected_currency: "",
      clientHomeCurrency: "",
      currency_fill: false,

    }
  };


  rename = (obj, curr) => {
    let a = {}
    Object.keys(obj).map((key) => {
      let newKey = key.replace(curr, '')
      Object.assign(a, { [newKey]: obj[key] })
    })
    return a
  }



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


  componentDidUpdate() {

    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy" });

  };


  componentDidMount() {
    this.get_client_home_currency();

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


  change(e) {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  };

  currencyChange = (e) => {
    this.setState({ selected_currency: e.target.value }, this.exchangeRateChange)
  };

  exchangeRateChange = () => {
    let rate = this.state.currency[this.state.selected_currency]
    this.setState({ exchange_rate: Number(rate.toFixed(4)) })
  };




  get_currencies = () => {
    fetch(
      // `https://api.exchangeratesapi.io/latest?base=${this.state.clientHomeCurrency}`
      `https://api.currencylayer.com/live?access_key=${config.api_key}&source=${this.state.clientHomeCurrency}`

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


  saveClick = () => {
    if (this.state.selected_currency == "") {
      this.setState({ currency_fill: true })
    } else {
      let input = {
        client_id: this.state.logged_client_id,
        currency: this.state.selected_currency,
        symbol: this.state.symbol
      };
      if (this.state.selected_currency == "" && this.state.selected_currency == undefined) {
        alert("Please add the currency")
      } else {
        console.log("call")
        FetchAllApi.add_new_currency(input, (err, response) => {
          if (response.status === 1) {
            alert("currency added successfully")
            this.props.history.push("/currency")
          }
        })
      }
    }
  };

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
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
            <Sidebar className="active" pageSubmit={e => this.pageLink(e)} />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Add Currency</h3>
              </div>
              <div className="col-md-12">
                <form className="row custom-form ff-cl-reverse-sm">
                  <div className="col-lg-4 col-md-5">
                    <div className="row">
                      <div className="form-group">
                        <label>Currency<span className="astrick">*</span></label>
                        <div className="custom-select-drop dropdown">
                          <span id="selected" ></span>

                          <select className="selectpicker form-control hh " data-live-search="true" name="selected_currency" title="Choose..." onChange={(event) => { this.currencyChange(event) }} required>
                            <option value="">Choose...</option>
                            {

                              this.state.currency_list.map((currency, index) => {
                                return (
                                  <option value={currency} >{currency}</option>
                                )
                              })

                            }
                          </select>
                        </div>
                        {this.state.currency_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please select currency.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="form-group">
                        <label>Currency Symbol</label>
                        <input type="text" className="form-control" name="symbol" value={this.state.symbol} placeholder="E.g: SGD / S$" onChange={(e) => { this.change(e) }} />
                      </div>
                      <div className="form-group no-edit">
                        <label>Exchange Rate<span className="astrick">*</span></label>
                        <input type="text" className="form-control" name="exchange_rate" value={this.state.exchange_rate} onChange={(e) => { this.change(e) }} />
                      </div>
                      {/* <p className="fs-12 fw-med">
                        Automatic Foreign Exchange Rates provided by
                        <img className="mar-lft-5" src="images/mas-logo.png" alt="icon" />
                      </p> */}
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
              <button className="btn btn-lightgray mar-rgt-5" data-toggle="modal" data-target="#refund-modal" onClick={() => { this.props.history.goBack() }}>Cancel</button>
              <button className="btn btn-green mar-rgt-5" onClick={this.saveClick}>Save</button>
            </div>
          </div>
          {/* pf-btm-wrap Ends here */}
        </div>


      </React.Fragment>

    )
  }
}