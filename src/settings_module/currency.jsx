import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import { Link } from "react-router-dom";
import jQuery from 'jquery'
import "./preference.css"


import config from './../api_links/api_links'



export default class Currency extends React.Component {
  constructor() {
    super()
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      date: '',
      clientHomeCurrency: '',
      currency_list: [],
      incorpdate: "",
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

  componentDidMount = () => {
    this.get_client_home_currency();
    this.get_incorpDate();

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

    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

  };

  dateChange = () => {
    let e = jQuery('#date').val()
    this.setState({ date: e }, this.dateCondition)
  };

  dateCondition = () => {
    let date1 = this.state.date
    if (date1 !== undefined && date1 !== "") {
      var array = date1.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
    }
    let date2 = this.state.incorpdate;
    if (date1 !== "") {
      if (new Date(date_formated).getTime() < new Date(date2).getTime()) {
        this.setState({ date: "" })
        alert("please enter date same as incorporation date or greater than incorporation date")
      } else {
        this.setState({ date: date1 }, this.get_currency_datails)
      }
    }
  }

  get_client_home_currency = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.get_client_home_currency(client_id, (err, response) => {
      if (response.status === 1) {
        console.log("Basio state", response);
        this.setState({
          clientHomeCurrency: response.currency,
        }, this.get_currency_datails)
      } else {
      }
    });
  };


  getCurrencyList = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.get_settings_currency(client_id, (err, response) => {
      if (response.status === 1) {
        console.log("Basio state", response);
        response.data.map((val) => {

          val.foreign_rates = this.state.currency_rates[val.code]

        })
        this.setState({
          currency_list: response.data,
        })
      } else {
      }
    });

  };

  get_incorpDate = () => {
    let client_id = this.state.logged_client_id;
    FetchAllApi.get_client_incorpdate(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({
          incorpdate: response.incorporation_date,
        })
      }
    });
  };

  get_currency_datails = () => {
    if (this.state.date == "") {



      fetch(
        // `https://api.exchangeratesapi.io/latest?base=${this.state.clientHomeCurrency}`
        `https://api.currencylayer.com/live?access_key=${config.api_key}&source=${this.state.clientHomeCurrency}`

      )
        .then((response) => response.json())
        .then((data) => {
          let newObj = this.rename(data.quotes, this.state.clientHomeCurrency)

          this.setState({ currency_rates: newObj }, this.getCurrencyList)
        })
    } else {
      let date1 = this.state.date
      if (date1 !== undefined && date1 !== "") {
        var array = date1.split('/')
        var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      }


      fetch(
        // "https://api.exchangeratesapi.io/" + date_formated + "?base=" + this.state.clientHomeCurrency
        `https://api.currencylayer.com/historical?access_key=${config.api_key}&date=${date_formated}&source=${this.state.clientHomeCurrency}`

      )
        .then((response) => response.json())
        .then((data) => {
          let newObj = this.rename(data.quotes, this.state.clientHomeCurrency)

          this.setState({ currency_rates: newObj }, this.getCurrencyList)
        })
    }
  };
  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }


  render() {
    console.log(this.state.currency_rates)
    return (
      <React.Fragment>
        <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} className="active" />
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
        <h3>Subscribers</h3>
    </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
            <Sidebar className="active" pageSubmit={e => this.pageLink(e)} />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Currencies</h3>
                <div>
                  <Link to="/add_currency">
                    <button className="btn btn-blue with-icon" >
                      <img src="images/plus-add.svg" className="filter-white" />
                    Add Currency
                  </button>
                  </Link>
                </div>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <form className="custom-form mar-btm">
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label>Exchange rates for</label>
                        <div className="input-group date mar-t-no"  >
                          <input type="text" className="form-control" id="date" value={this.state.date} onBlur={(event) => {
                            let value = event.target.value
                            setTimeout(() => { this.dateChange(value) }, 500)
                          }} />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#date').focus()} />
                          </div>
                        </div>
                      </div>
                      <div className="form-group no-edit col-md-4">
                        <label>Home Currency</label>
                        <input type="text" className="form-control" name defaultValue={this.state.clientHomeCurrency} />
                      </div>
                    </div>
                  </form>
                  {this.state.currency_list.length == 0 ? (
                    <div id="cash-coding" className="col-md-12 tab-pane fade in pad-no">
                      <div className="landing-wrap">
                        <div className="img-concept text-center">
                          <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                          <p>Looks like there's no data</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="list-table mar-t-no currency-list">
                      <div className="cus-table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Currency</th>
                              <th className="text-center">Symbol</th>
                              <th className="text-right">Foreign Currency per {this.state.clientHomeCurrency}</th>
                              <th className="text-right">{this.state.clientHomeCurrency} per Foreign Currency</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.currency_list.map((cur) => {
                              return (
                                <tr onClick={() => { this.props.history.push('/currency_date', cur) }} style={{cursor : 'pointer'}}
                                onMouseOut={(e)=>e.target.style.background = ''} 
                                onMouseOver={(e)=> {e.target.style.background = 'aliceblue'}}>
                                  <td><span className="fw-med">{cur.currency}</span></td>
                                  <td className="text-center"><span className="fs-13">{cur.symbol}</span></td>
                                  <td className="text-right"><span className="fs-13">{isNaN(cur.foreign_rates) ? 0.0000 : cur.foreign_rates.toFixed(4) }</span></td>
                                  <td className="text-right"><span className="fs-13">{isNaN(cur.foreign_rates) ? 0.0000 : (1 / cur.foreign_rates).toFixed(4) }</span></td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
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