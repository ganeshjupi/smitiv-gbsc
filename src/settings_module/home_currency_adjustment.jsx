import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import { Link } from "react-router-dom";
import jQuery from 'jquery'
import "./preference.css"
import Comma from './../components/comma'
import moment from "moment";
import config from './../api_links/api_links'


export default class HomeCurrencyAdjustment extends React.Component {
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
            adjsutment_id: localStorage.getItem("adjustment_id") && localStorage.getItem("adjustment_id"),
            date: '',
            clientHomeCurrency: '',
            currency_list: [],
            incorpdate: "",
            exchange_rate: '',
            selectedCurrency: '',
            response: '',
            memo: '',
            all_checked: false,
            exchange_rate_fixed: '',
            showRemainingTable: false,
        }
    };


    rename = (obj, curr) => {
        console.log('mamamam11111obj', obj, 'mamamam11111curr', curr)
        let a = {}
        Object.keys(obj).map((key) => {
            let newKey = key.replace(curr, '')
            Object.assign(a, { [newKey]: obj[key] })
        })
        console.log('mamamam11111a', a)
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
        if (
            this.state.adjsutment_id != '' &&
            this.state.adjsutment_id != null &&
            this.state.adjsutment_id != undefined
          ) {
            this.get_adjustment_details()
          }
    };
    get_adjustment_details =()=>{
        let client_id= this.state.logged_client_id
        let adjustment_id = this.state.adjsutment_id      
        
          FetchAllApi.get_home_currency_adjusted_details_by_id(client_id,adjustment_id, (err, response) => {
            if (response.status === 1) {
              let data = response.details
              let detail = response.details.list
              let date= data.adjustment_date.split("-");
              var date_formated = date[2] + "/" + date[1] + "/" + date[0];
              jQuery("#date").val(date_formated)
             // jQuery("#payor_name").val(data.customer_id)
              var items=[]
            //   for (let i = 0; i < data.item_list.length; i++) {         
            //     var item_list = {
            //       catagory_id: data.item_list[i].category_id,
            //       third_party_acc_id:data.item_list[i].selected_user_id,
            //       unit_price: data.item_list[i].unit_price,
            //       memo: data.item_list[i].descr,
            //       amount: data.item_list[i].item_total,           
            //     }        
            //     items.push(item_list); 
            //   }
              this.setState({
                isEdit: true,
                selectedCurrency: data.currency,
                exchange_rate_fixed:data.exchange_rate,              
                memo:data.memo,
                date:date_formated,
                response:data
              }, () => {
                setTimeout(() => {
                 console.log(this.state.item_array, this.state.payor_name,this.state.transaction_date)
                }, 1000);
              })
              
            }
              else {
                alert(response.message)
              }
            });
    }
    get_list_to_adjust_currency = () => {
        let { logged_client_id, date, selectedCurrency, exchange_rate } = this.state
        // console.log('mnmnb', logged_client_id, date, selectedCurrency, exchange_rate)
        if (date != '' && selectedCurrency != '' && exchange_rate != '') {
            let array = date.split('/')
            let date_formated = array[2] + '-' + array[1] + '-' + array[0]
            let Input = {
                client_id: logged_client_id,
                adjustment_date: date_formated,
                currency: selectedCurrency,
                exchange_rate: this.state.exchange_rate_fixed != '' ? this.state.exchange_rate_fixed : this.state.exchange_rate
            }
            FetchAllApi.get_list_to_adjust_currency(Input, (err, response) => {
                if (response.status === 1) {
                    this.setState({
                        response: response,
                    })
                } else {
                    alert(response.message)
                    this.setState({
                        response: '',
                    })
                }
            });
        }
    };


    save_adjusted_currency = () => {
        let { logged_client_id, date, selectedCurrency, exchange_rate } = this.state
        // console.log('mnmnb', logged_client_id, date, selectedCurrency, exchange_rate)
        if (date != '' && selectedCurrency != '' && exchange_rate != '') {
            let array = date.split('/')
            let date_formated = array[2] + '-' + array[1] + '-' + array[0]
            let Input = {
                client_id: logged_client_id,
                adjustment_date: date_formated,
                currency: selectedCurrency,
                exchange_rate: this.state.exchange_rate_fixed != '' ? this.state.exchange_rate_fixed : this.state.exchange_rate,
                list: this.state.response.list,
                memo: this.state.memo,
                tagged_user_id: this.state.logged_user_id
            }
            FetchAllApi.save_adjusted_currency(Input, (err, response) => {
                if (response.status === 1) {
                    alert(response.message)
                    this.setState({
                        selectedCurrency: '',
                        exchange_rate: '',
                        response: ''
                    })
                    // this.get_list_to_adjust_currency()
                } else {
                    alert(response.message)
                }
            });
        }
    };

    clear = () => {
        this.setState({
            selectedCurrency: '',
            exchange_rate: '',
            response: '',
            exchange_rate_fixed: '',
            adjustment_date: '',
            showRemainingTable: false,
            response: '',
            date: '',
            memo: ''
        })
    }

    get_client_home_currency = () => {
        let client_id = this.state.logged_client_id;

        FetchAllApi.get_client_home_currency(client_id, (err, response) => {
            if (response.status === 1) {
                // console.log("Basio state", response);
                this.setState({
                    clientHomeCurrency: response.currency
                })
                setTimeout(() => {
                    this.getCurrencyList()
                }, 500);
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


    getCurrencyList = () => {


        fetch(
            // `https://api.exchangeratesapi.io/latest?base=${this.state.clientHomeCurrency}`
            `https://api.currencylayer.com/live?access_key=${config.api_key}&source=${this.state.clientHomeCurrency}`

        )
            .then((response) => response.json())
            .then((data) => {
                let newObj = this.rename(data.quotes, this.state.clientHomeCurrency)

                if (newObj) {
                    console.log('mamamamama', newObj)
                    this.setState({ currency_list: Object.keys(newObj) })

                }
            })
    };

    componentDidUpdate() {

        window.jQuery(".selectpicker").selectpicker("refresh");
        window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

    };

    dateChange = () => {
        let e = jQuery('#date').val()
        console.log("val", e)
        this.setState({ date: e, showRemainingTable: false }, this.dateCondition)
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


    get_currency_datails = () => {
        // selectedCurrency  clientHomeCurrency
        console.log(1)
        if (this.state.selectedCurrency !== "" && this.state.selectedCurrency !== undefined) {
            console.log(2)
            if (this.state.date == "") {

                console.log(3)
                fetch(
                    // `https://api.exchangeratesapi.io/latest?base=${this.state.selectedCurrency}`
                    `https://api.currencylayer.com/live?access_key=${config.api_key}&source=${this.state.selectedCurrency}`

                )
                    .then((response) => response.json())
                    .then((data) => {
                        let newObj = this.rename(data.quotes, this.state.selectedCurrency)

                        if (this.state.clientHomeCurrency != '' && this.state.clientHomeCurrency != undefined) {
                            this.setState({ exchange_rate: (newObj[this.state.clientHomeCurrency]).toFixed(4) })
                            setTimeout(() => this.get_list_to_adjust_currency(), 500)
                        }
                    })
            } else {
                console.log(4)
                let date1 = this.state.date
                if (date1 !== undefined && date1 !== "") {
                    var array = date1.split('/')
                    var date_formated = array[2] + '-' + array[1] + '-' + array[0]
                }

                fetch(
                    // "https://api.exchangeratesapi.io/" + date_formated + "?base=" + this.state.selectedCurrency
                    `https://api.currencylayer.com/historical?access_key=${config.api_key}&date=${date_formated}&source=${this.state.selectedCurrency}`

                )
                    .then((response) => response.json())
                    .then((data) => {
                        let newObj = this.rename(data.quotes, this.state.selectedCurrency)

                        if (this.state.clientHomeCurrency != '' && this.state.clientHomeCurrency != undefined) {
                            this.setState({ exchange_rate: (newObj[this.state.clientHomeCurrency]).toFixed(4) })
                            setTimeout(() => this.get_list_to_adjust_currency(), 500)
                        }
                    })
            }
        }
    };





    pageLink(page_slug) {
        this.props.history.push('/' + page_slug)
    }

    check = () => {

    }


    render() {

        let total = 0
        console.log("check", this.state)
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
                        <div className="user-cont-right main-wrap">
                            {/* MainContent Wrapper Starts here */}
                            <div className="col-md-12 col-xs-12 pad-no">

                                <div className="col-md-12 col-xs-12 mar-top visible-xs">
                                    <a href="javascript:;" className="back">
                                        <img src="images/back-arrow-blue.svg" />
                                    </a>
                                    <span className="page-title">Home Currency Adjustment</span>
                                </div>
                                {/* content-top Starts here */}
                                <div className="content-top col-md-12 col-xs-12">
                                    <h4 className="fw-sbold mar-t-no">Home Currency Adjustment</h4>
                                    <div className="row">
                                        <div className="report-setting hc-adjust all-report col-md-12 col-xs-12">
                                            <form className="custom-form form-inline col-md-12 col-xs-12 pad-no">
                                                <div className="row">
                                                    <div className="form-group col-md-3 col-xs-12">
                                                        <label>Date</label>
                                                        <div className="input-group date mar-t-no"  >
                                                            <input type="text" className="form-control" autoComplete='off' id="date" value={this.state.date} onBlur={(event) => {
                                                                let value = event.target.value
                                                                setTimeout(() => { this.dateChange(value) }, 500)
                                                            }} />
                                                            <div className="input-group-addon">
                                                                <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#date').focus()} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-md-3 col-xs-12">
                                                        <label>Currency</label>
                                                        <select
                                                            className="selectpicker form-control"
                                                            data-live-search="true"
                                                            title={`Choose`}
                                                            data-width="100%"
                                                            value={this.state.selectedCurrency}
                                                            onChange={(e) => {
                                                                this.setState({ selectedCurrency: e.target.value, showRemainingTable: false }, this.get_currency_datails)
                                                            }}
                                                        >

                                                            {this.state.currency_list &&
                                                                this.state.currency_list.map((item) => {

                                                                    if (item.code !== "ALL") {
                                                                        return <option value={item}> {item}</option>;
                                                                    }
                                                                })}
                                                        </select>

                                                    </div>
                                                    <div className="form-group exchange-col col-md-3 col-xs-12">
                                                        <label>Exchange Rate</label>
                                                        <div className="w-100">
                                                            <input type="text" name="exchangeRate" className="form-control" onChange={(e) => this.setState({ exchange_rate_fixed: e.target.value })} placeholder={this.state.exchange_rate} value={this.state.exchange_rate_fixed} />
                                                            <span className="label">{this.state.clientHomeCurrency}</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-md-3 col-xs-12">
                                                        <button type='button' className="btn btn-blue w-100" onClick={() => {
                                                            this.setState({ showRemainingTable: true }, this.get_list_to_adjust_currency())
                                                        }
                                                        }
                                                        >Calculate</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* content-top Starts here */}
                                {/* Main Content Starts here */}
                                <div className="main-content col-md-12 col-xs-12">
                                    <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                                        <div className="report-table reconcile-table ctd-review col-md-12 col-xs-12 pad-no mar-t-no mar-btm">
                                            <div className="table-responsive">

                                                <table className="table detail-report minw-unset td-vm">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <label className="custom-checkbox small">
                                                                    <input type="checkbox" name="all"
                                                                        onChange={(e) => {
                                                                            this.state.response.list.map((itm, j) => {
                                                                                let response = this.state.response
                                                                                response.list[j].is_checked = e.target.checked
                                                                                this.setState({ response })
                                                                            })
                                                                        }
                                                                        }
                                                                    />&nbsp;
                    <span className="checkmark" />
                                                                </label>
                                                            </th>
                                                            <th>No</th>
                                                            <th>Type</th>
                                                            <th>Name</th>
                                                            <th className="text-right">Foreign currency balance ({this.state.selectedCurrency})</th>
                                                            <th className="text-right">Home currency balance ({this.state.clientHomeCurrency})</th>
                                                            <th className="text-right">Adjustment Balance ({this.state.clientHomeCurrency})</th>
                                                            {this.state.showRemainingTable ? (
                                                                <>
                                                                    <th className="text-right">Exchange Gain/Loss ({this.state.clientHomeCurrency})</th>
                                                                    <th>Debit</th>
                                                                    <th>Credit</th>
                                                                </>) : null}



                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.response && this.state.response.list &&
                                                            this.state.response.list.map((item, i) => {
                                                                if (item.is_checked) {
                                                                    total = total + item.exchange_gain_or_loss
                                                                }
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <label className="custom-checkbox small mar-t-no">
                                                                                <input type="checkbox" name="all" checked={item.is_checked}
                                                                                    onChange={

                                                                                        (e) => {
                                                                                            let response = this.state.response
                                                                                            response.list[i].is_checked = e.target.checked
                                                                                            this.setState({ response })
                                                                                        }
                                                                                    }
                                                                                />&nbsp;
                    <span className="checkmark" />
                                                                            </label>
                                                                        </td>
                                                                        <td>{item.number} </td>
                                                                        <td>{item.type} </td>
                                                                        <td>{item.name} </td>
                                                                        <td className="text-right"><Comma value={item.foreign_balance} /> </td>
                                                                        <td className="text-right"><Comma value={item.balance} /></td>
                                                                        <td className="text-right"><Comma value={item.adjustment_balance} /></td>
                                                                        {this.state.showRemainingTable ? (<>
                                                                            <td className="text-right"><Comma value={item.exchange_gain_or_loss} /></td>
                                                                            <td>{item.debit} </td>
                                                                            <td>{item.credit} </td>
                                                                        </>) : null}
                                                                    </tr>
                                                                )
                                                            })}
                                                    </tbody>

                                                </table>

                                            </div>
                                        </div>
                                        <div className="batch-btm hc-btm">
                                            <form className="custom-form invoice-form col-md-5">
                                                <div className="form-group">
                                                    <label>Memo</label>
                                                    <textarea className="form-control" defaultValue={""} value={this.state.memo} onChange={(e) => this.setState({ memo: e.target.value })} />
                                                </div>
                                            </form>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Total Sales Gross Amount</td>
                                                        <td><strong className="mar-rgt">{this.state.clientHomeCurrency}</strong><Comma value={total} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="pf-btm-wrap">
                                            <div className="col-md-12 col-xs-12 text-right">
                                                <button className="btn btn-lightgray mar-rgt-5" type='button' data-toggle="modal" data-target="#errorModal" onClick={() => this.clear()}>Clear</button>
                                                {/* <button className="btn btn-blue mar-rgt-5">Save &amp; New</button> */}
                                                <button type='button' className="btn btn-green" onClick={() => this.save_adjusted_currency()}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Main Content Ends here */}
                            </div>
                            {/* MainContent Wrapper Ends here */}

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