import React from "react";
import LeftSidebar from "./../left_sidebar";
import Footer from "./../footer";
import Topbar from "./../topbar";
import FetchAllApi from "../../api_links/fetch_all_api";
import config from "../../api_links/api_links";
import jQuery from "jquery";
// import ReactDataSheet from 'react-datasheet';
// import 'react-datasheet/lib/react-datasheet.css';
import moment from "moment";

class ClientDataReview extends React.Component {
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


            role_permissions:
                JSON.parse(localStorage.getItem("role_permissions")) || [],

            customer_and_job_list: [],
            customer_and_job_lists: [],
            customer_credit_list: [
                {
                    "client_id": 237,
                    "item_total_home_currency": 200,
                    "tax_amount_home_currency": 0,
                    "grand_total_home_currency": 200,
                    "credit_date": "2020-12-09",
                    "company_name": null,
                    "created_on": "2020-12-16 04:54:44",
                    "type": 1,
                    "credit_number": "2",
                    "foreign_currency": "SGD",
                    "company_address": null,
                    "item_total": 0,
                    "list_id": 345,
                    "status": 1,
                    "tagged_user_id": 345,
                    "item_total_foreign_currency": 200,
                    "tax_amount_foreign_currency": 0,
                    "grand_total_foreign_currency": 200,
                    "exchange_rate": 1,
                    "balance_sheet_category": null,
                    "memo": "dk",
                    "thanking_message": "Thank you message and Banking details",
                    "terms_and_conditions": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore",
                    "customer_id": 491,
                    "template_id": 0,
                    "job_id": 4,
                    "open_balance_home_currency": 200,
                    "open_balance_foreign_currency": 200,
                    "payment_status": 0,
                    "job_name": "Others",
                    "ship_date": null,
                    "id": 445,
                    "account": "1819",
                    "updateddate": "2020-12-16 04:54:44",
                    "amount_in_words": "Two Hundred",
                    "shipping_address": "",
                    "debit": 0,
                    "credit": 200,
                    "foreign_debit": 0,
                    "foreign_credit": 200,
                    "due_date": "2020-12-17",
                    "terms": null,
                    "transaction_number": 22,
                    "payment_reference_number": null,
                    "tax_inclusive": 0,
                    "description": null,
                    "batch_transaction_id": "0"
                },
                {
                    "client_id": 237,
                    "item_total_home_currency": 1000,
                    "tax_amount_home_currency": 100,
                    "grand_total_home_currency": 1100,
                    "credit_date": "2020-12-09",
                    "company_name": null,
                    "created_on": "2020-12-16 04:56:58",
                    "type": 1,
                    "credit_number": "3",
                    "foreign_currency": "SGD",
                    "company_address": null,
                    "item_total": 0,
                    "list_id": 345,
                    "status": 1,
                    "tagged_user_id": 345,
                    "item_total_foreign_currency": 1000,
                    "tax_amount_foreign_currency": 100,
                    "grand_total_foreign_currency": 1100,
                    "exchange_rate": 1,
                    "balance_sheet_category": null,
                    "memo": "kk",
                    "thanking_message": "Thank you message and Banking details",
                    "terms_and_conditions": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore",
                    "customer_id": 491,
                    "template_id": 0,
                    "job_id": 4,
                    "open_balance_home_currency": 1100,
                    "open_balance_foreign_currency": 1100,
                    "payment_status": 0,
                    "job_name": "Others",
                    "ship_date": null,
                    "id": 446,
                    "account": "1819",
                    "updateddate": "2020-12-16 04:56:58",
                    "amount_in_words": "One Thousand Hundred",
                    "shipping_address": "",
                    "debit": 0,
                    "credit": 1100,
                    "foreign_debit": 0,
                    "foreign_credit": 1100,
                    "due_date": "2020-12-16",
                    "terms": null,
                    "transaction_number": 23,
                    "payment_reference_number": null,
                    "tax_inclusive": 0,
                    "description": null,
                    "batch_transaction_id": "0"
                },
                {
                    "client_id": 237,
                    "item_total_home_currency": 600,
                    "tax_amount_home_currency": 0,
                    "grand_total_home_currency": 600,
                    "credit_date": "2020-12-09",
                    "company_name": null,
                    "created_on": "2020-12-16 05:09:14",
                    "type": 1,
                    "credit_number": "4",
                    "foreign_currency": "SGD",
                    "company_address": null,
                    "item_total": 0,
                    "list_id": 345,
                    "status": 1,
                    "tagged_user_id": 345,
                    "item_total_foreign_currency": 600,
                    "tax_amount_foreign_currency": 0,
                    "grand_total_foreign_currency": 600,
                    "exchange_rate": 1,
                    "balance_sheet_category": null,
                    "memo": "dds",
                    "thanking_message": "Thank you message and Banking details",
                    "terms_and_conditions": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore",
                    "customer_id": 491,
                    "template_id": 0,
                    "job_id": 4,
                    "open_balance_home_currency": 600,
                    "open_balance_foreign_currency": 600,
                    "payment_status": 0,
                    "job_name": "Others",
                    "ship_date": null,
                    "id": 447,
                    "account": "1819",
                    "updateddate": "2020-12-16 05:09:14",
                    "amount_in_words": "Six Hundred",
                    "shipping_address": "",
                    "debit": 0,
                    "credit": 600,
                    "foreign_debit": 0,
                    "foreign_credit": 600,
                    "due_date": "2020-12-24",
                    "terms": null,
                    "transaction_number": 24,
                    "payment_reference_number": null,
                    "tax_inclusive": 0,
                    "description": null,
                    "batch_transaction_id": "0"
                }
            ],

            customer_invoice_list: [
                {
                    "job_id": 4,
                    "job_name": "Others",
                    "id": 2177,
                    "invoice_date": "2020-12-09",
                    "customer_id": 491,
                    "grand_total_home_currency": 397.27,
                    "open_balance_home_currency": 397.27,
                    "grand_total_foreign_currency": 297.5,
                    "open_balance_foreign_currency": 297.5,
                    "invoice_account": "1819",
                    "invoice_exchange_rate": 1.335356,
                    "invoice_number": "2"
                },
                {
                    "job_id": 4,
                    "job_name": "Others",
                    "id": 2187,
                    "invoice_date": "2020-12-09",
                    "customer_id": 491,
                    "grand_total_home_currency": 550,
                    "open_balance_home_currency": 550,
                    "grand_total_foreign_currency": 550,
                    "open_balance_foreign_currency": 550,
                    "invoice_account": "1819",
                    "invoice_exchange_rate": 1,
                    "invoice_number": "6"
                },
                {
                    "job_id": 4,
                    "job_name": "Others",
                    "id": 2223,
                    "invoice_date": "2020-12-09",
                    "customer_id": 491,
                    "grand_total_home_currency": 550,
                    "open_balance_home_currency": 550,
                    "grand_total_foreign_currency": 550,
                    "open_balance_foreign_currency": 550,
                    "invoice_account": "1819",
                    "invoice_exchange_rate": 1,
                    "invoice_number": "9"
                },
                {
                    "job_id": 4,
                    "job_name": "Others",
                    "id": 2224,
                    "invoice_date": "2020-12-09",
                    "customer_id": 491,
                    "grand_total_home_currency": 315,
                    "open_balance_home_currency": 315,
                    "grand_total_foreign_currency": 315,
                    "open_balance_foreign_currency": 315,
                    "invoice_account": "1819",
                    "invoice_exchange_rate": 1,
                    "invoice_number": "10"
                },
                {
                    "job_id": 4,
                    "job_name": "Others",
                    "id": 2225,
                    "invoice_date": "2020-12-16",
                    "customer_id": 491,
                    "grand_total_home_currency": 600,
                    "open_balance_home_currency": 600,
                    "grand_total_foreign_currency": 600,
                    "open_balance_foreign_currency": 600,
                    "invoice_account": "1819",
                    "invoice_exchange_rate": 1,
                    "invoice_number": "11"
                }
            ]



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




    getSubAccountList = () => {
        var coreData = {
            account_type_id: 2,
            client_id: this.state.logged_client_id,
        };

        FetchAllApi.getSubAccountList(coreData, (err, response) => {
            // console.log("vendor_nljfskdkdssdkfames", response);

            if (response.status === 1) {
                this.setState({ SubAccountList: response.list });
            } else {
            }
        });
    };


    findInSubAccountList = (currency) => {

        var currency = currency;
        var result = [];
        this.state.SubAccountList.forEach((item, i) => {
            var fullString = item.name.split("-");
            var list_curr = fullString[1];

            // console.log("matched", item.name + "=" + list_curr + "=" + currency);
            var kk = "Accounts Receivable" + "-" + currency;
            if (item.name == kk) {

                result.push(item);
            }
        });

        if (result.length === 0) {
            // alert('not matched')
            var coreData = {
                account_name: "Accounts Receivable" + "-" + currency,
                account_type_id: 2,
                currency: currency,
                client_id: this.state.logged_client_id,
            };

            FetchAllApi.addNewAccountName(coreData, (err, response) => {
                console.log("vendor_nljfskdkdssdkfames", response);

                if (response.status === 1) {
                    this.getSubAccountList(response.account_id);

                    jQuery("#account_id").val(response.account_id);
                    this.setState({ account: response.account_id })
                } else {
                }
            });
        } else {

            // console.log("hfhfh", result);

            if (
                jQuery("#invoice_curr_id option:selected").val() != "" &&
                jQuery("#invoice_curr_id option:selected").val() != undefined
            ) {
                jQuery("#account_id").val(result[0].id);
                this.setState({ account: result[0].id })
            }

        }
    };


    get_currencies = () => {
        // alert(this.state.clientHomeCurrency)
        fetch(
            // `https://api.exchangerate-api.com/v4/latest/SGD`
            `https://api.currencylayer.com/live?access_key=${config.api_key}&source=SGD`

        )
            .then((response) => response.json())
            .then((data) => {
                let newObj = this.rename(data.quotes, 'SGD')

                const currencyAr = [];
                let first = newObj;
                for (const key in first) {
                    currencyAr.push(key);
                }
                this.setState({ currencies: currencyAr, currency_clone: currencyAr });
            });
    };

    customer_invoicelist = () => {
        // var client_id = localStorage.getItem("logged_client_id");
        var client_id = this.state.logged_client_id;
        var customer_id = this.state.customer_id;
        var job_id = jQuery("#variable_pay_type_job option:selected").data(
            "status"
        );
        var invoice_account = jQuery("#ar_account").val()

        FetchAllApi.customer_invoicelist(
            client_id,
            customer_id,
            job_id,
            invoice_account,
            (err, response) => {
                // console.log("vendor_names", response);

                if (response.status === 1) {
                    this.setState({ vendor_invoicelist: response.list });
                    // this.payDue();
                } else {
                    this.setState({ vendor_invoicelist: [] });
                    // this.total_paid(0, 0)
                    // this.payDue();
                }
            }
        );
    };


    customer_credit_list = () => {

        var client_id = this.state.logged_client_id;
        var customer_id = this.state.customer_id;
        var job_id = jQuery("#variable_pay_type_job option:selected").data(
            "status"
        );
        var invoice_account = jQuery("#account_id").val()


        let data = {
            client_id: client_id,
            customer_id: customer_id,
            job_id: job_id,
            account: invoice_account
        }

        FetchAllApi.get_customer_review_data(
            data,
            (err, response) => {
                // console.log("vendor_names", response);

                if (response.status === 1) {
                    this.setState({ customer_credit_list: response.creditList, customer_invoice_list: response.invoiceData });
                } else {
                    this.setState({ customer_credit_list: [], customer_invoice_list: [] });
                }
            }
        );
    };

    handleChanges = () => {
        let variable_pay_type_job = jQuery(
            "#variable_pay_type_job option:selected"
        ).data("status");

        // this.customer_invoicelist();
        // this.customer_credit_list();

    };

    handleChange = () => {
        // alert(e)
        let variable_pay_type = jQuery("#variable_pay_type option:selected").data(
            "status"
        );

        this.setState({
            selectValue: variable_pay_type,
            vendorName: jQuery("#variable_pay_type").val(),
            customer_and_job_lists: []
        });
        // this.setState({ selectValue: variable_pay_type });
        //this.vendor_invoicelist(variable_pay_type);
        // this.customer_credit_list(variable_pay_type);

        // this.vendor_discount_terms(variable_pay_type);
        // this.applied_credit_history(variable_pay_type);
        this.customer_and_job_lists(variable_pay_type);
    };

    customer_and_job_list = () => {
        // var client_id = localStorage.getItem("logged_client_id") ;
        var client_id = this.state.logged_client_id;
        var from_customer_receive_payment = 1;
        FetchAllApi.customer_and_job_list(
            client_id,
            from_customer_receive_payment,
            (err, response) => {
                // console.log("vendor_names", response);

                if (response.status === 1) {
                    this.setState({ customer_and_job_list: response.list });
                } else {
                }
            }
        );
    };

    customer_and_job_lists = (customer_id) => {
        // var client_id = localStorage.getItem("logged_client_id") ;
        var client_id = this.state.logged_client_id;
        var customer_id = customer_id;
        var from_customer_receive_payment = 1;

        FetchAllApi.customer_and_job_lists(
            client_id,
            customer_id,
            from_customer_receive_payment,
            (err, response) => {
                // console.log("vendor_names", response);

                if (response.status === 1) {
                    this.setState({ customer_and_job_lists: response.list });
                    this.setState({ customer_id: customer_id }, this.handleChanges());
                } else {
                    this.setState({ customer_and_job_lists: [] }, this.handleChanges());
                }
            }
        );
    };


    componentDidUpdate() {
        window.jQuery(".selectpicker").selectpicker("refresh");
        // jQuery("#currency_selected").val(4);
    }

    UNSAFE_componentWillMount() {
        jQuery(document.body).removeClass("minimize_leftbar");
        //console.log("logged_user_id", this.state.logged_user_id);

        jQuery("title").html("Customer | GBSC");

        if (
            this.state.logged_user_id === "" ||
            this.state.logged_user_id === "null" ||
            this.state.logged_user_id === "undefined"
        ) {
            this.props.history.push("/");
        }
    }

    routedChange(parameter) {
        this.props.history.push("/" + parameter);
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.getSubAccountList();
        this.customer_and_job_list()
        this.get_currencies()
        // document.getElementById("sticky-tb-hdr").addEventListener("scroll", function () {
        //   var translate = "translate(0," + this.scrollTop + "px)";
        //   if (this.querySelector("thead") != null && this.querySelector("thead") != undefined && this.querySelector("thead").style != null) {
        //     this.querySelector("thead").style.transform = translate;
        //   }
        // });

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
                        <LeftSidebar history={this.props.history} />
                        {/* left-navbar Ends here */}
                        {/* MainContent Wrapper Starts here */}
                        <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
                            {/* Top bar Starts here */}
                            <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                                <form className="hdr-search">
                                    <input type="text" className="form-control" name="search" placeholder="Search..." />
                                    {/* <button type="submit" class="btn btn-green">Search</button> */}
                                    <a href="javascript:;" className="close-icon"><img src="images/close-icon-red.svg" alt="Close" /></a>
                                </form>
                                <div className="nav-brand-res visible-xs"><img className="img-responsive" src="images/logo-icon.png" alt="LogoIcon" /></div>
                                <a href="javascript:;" className="back hidden-xs">
                                    <img src="images/back-arrow-blue.svg" />
                                </a>
                                {/* <span class="page-title hidden-xs">Preference</span> */}
                                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                                    <li><a href="javascript:;">Accountant</a></li>
                                    <li>Client Data Review</li>
                                </ul>
                                <div className="pull-right">
                                    <div className="search-wrap">
                                        <a className="search-btn" href="javascript:;">
                                            <img className="search" src="images/search-icon.svg" alt="Search" />
                                        </a>
                                    </div>
                                    <div className="notify-wrap">
                                        <a href="javascript:;"><img src="images/notification-icon.svg" alt="Notification" /></a>
                                    </div>
                                    <div className="profile-wrap dropdown">
                                        <a href="javascript:;" className="avatar dropdown-toggle" data-toggle="dropdown">
                                            <span className="avatar-img"><img className="img-responsive" src="images/user-img-1.png" alt="Harvey Dean" /></span>
                                            <span className="hidden-xs">Harvey Dean</span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="javascript:;"><img src="images/edit-icon.svg" alt="icon" />Edit Profile</a>
                                            </li>
                                            <li><a href="javascript:;"><img src="images/settings-icon.svg" alt="icon" />Settings</a></li>
                                            <li><a href="javascript:;"><img src="images/turn-off-icon.svg" alt="icon" />Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Top bar Ends here */}
                            <div className="col-md-12 col-xs-12 mar-top visible-xs">
                                <a href="javascript:;" className="back">
                                    <img src="images/back-arrow-blue.svg" />
                                </a>
                                <span className="page-title">Accountant</span>
                            </div>
                            {/* content-top Starts here */}
                            <div className="content-top col-md-12 col-xs-12 bg-trans">
                                <h4>Client Data Review</h4>
                                <div className="row">
                                    <div className="col-md-12 col-xs-12">
                                        <ul className="nav nav-pills transparent nowrap mar-top">
                                            <li className="active"><a data-toggle="pill" href="#cus-data-review">Customers</a></li>
                                            <li><a data-toggle="pill" href="#ven-data-review">Vendors</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* content-top Starts here */}
                            {/* Main Content Starts here */}
                            <div className="main-content col-md-12 col-xs-12 pad-t-no">
                                <div className="content-sec tab-content col-md-12 col-xs-12 pad-no mar-t-no">
                                    <div id="cus-data-review" className="col-md-12 col-xs-12 tab-pane fade pad-no active in">
                                        <div className="row">
                                            <div className="content-top col-md-12 col-xs-12">
                                                <form className="custom-form row">
                                                    <div className="form-group col-md-3">
                                                        <label>Currency</label>
                                                        <select
                                                            className="selectpicker form-control hh w-100 "
                                                            id="invoice_curr_id"
                                                            data-live-search="true"
                                                            title={`Choose`}
                                                            // data-width="150%"
                                                            onChange={(e) => {
                                                                this.findInSubAccountList(e.target.value);
                                                            }}
                                                        >
                                                            {this.state.currencies &&
                                                                this.state.currencies.map((item) => {

                                                                    if (item.code !== "ALL") {
                                                                        return <option value={item}> {item}</option>;
                                                                    }
                                                                })}
                                                        </select>

                                                    </div>
                                                    <div className="form-group col-md-3 no-edit">
                                                        <label>Accounts Receivable</label>

                                                        <select
                                                            className="selectpicker form-control add-new "
                                                            id="account_id"
                                                            data-live-search="true"
                                                            title={`Choose`}
                                                            data-width="100%"
                                                            onChange={(e) => { }}
                                                            disabled={true}
                                                            value={this.state.account}
                                                        >
                                                            {this.state.SubAccountList != undefined &&
                                                                this.state.SubAccountList.map((item, index) => {
                                                                    // console.log("ggggg", this.state.response);
                                                                    return (
                                                                        <option value={item.id}>{item.name}</option>
                                                                    );
                                                                })}
                                                        </select>


                                                    </div>

                                                    <div className="form-group col-md-3">
                                                        <label>Customer Name</label>

                                                        <select
                                                            className="selectpicker form-control add-new"
                                                            data-live-search="true"
                                                            title="Choose customer"
                                                            id="variable_pay_type"
                                                            // onChange={e => {
                                                            //   if (e.target.event != '') {
                                                            //     this.setSt
                                                            //   } else {
                                                            //     this.setState({ iscustomer_name: true })
                                                            //   }
                                                            // }}

                                                            onChange={() => {
                                                                this.handleChange();
                                                            }}

                                                        // onChange={event => {
                                                        //   this.vendor_invoicelist(event.target.value)
                                                        // }}
                                                        >
                                                            <option>choose</option>
                                                            {this.state.customer_and_job_list &&
                                                                this.state.customer_and_job_list.map((item) => {
                                                                    return (
                                                                        <option
                                                                            value={item.name}
                                                                            data-status={item.id}
                                                                        >
                                                                            {item.name}
                                                                        </option>
                                                                    );
                                                                })}
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label>Job Id</label>
                                                        {
                                                            <select
                                                                className="selectpicker form-control add-new"
                                                                data-live-search="true"
                                                                title="Choose a job"
                                                                id="variable_pay_type_job"
                                                                onChange={() => {
                                                                    this.handleChanges();
                                                                }}
                                                            >
                                                                <option>Choose</option>
                                                                {this.state.customer_and_job_lists &&
                                                                    this.state.customer_and_job_lists.map(
                                                                        (item) => {
                                                                            return (
                                                                                <option
                                                                                    value={item.id}
                                                                                    data-status={item.id}
                                                                                >
                                                                                    {item.name}
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                            </select>
                                                        }
                                                    </div>

                                                </form>
                                            </div>
                                            <div className="col-md-6 col-xs-12">
                                                <p className="ct-data-title"><span>Step 1:</span> Select Payments / Credits</p>
                                                <div className="report-table reconcile-table ctd-review col-md-12 col-xs-12 pad-no mar-t-no mar-btm">
                                                    <div className="table-responsive">
                                                        <table className="table detail-report minw-unset td-vm">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        <label className="custom-checkbox small">
                                                                            <input type="checkbox" name="all" />&nbsp;
                                      <span className="checkmark" />
                                                                        </label>
                                                                    </th>
                                                                    <th>Type</th>
                                                                    <th>Date</th>
                                                                    <th className="text-right">Total Amount</th>
                                                                    <th className="text-right">Amt Available</th>
                                                                    <th className="text-right">Amt to Apply</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.customer_credit_list &&
                                                                    this.state.customer_credit_list.map((item, i) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>
                                                                                    <label className="custom-checkbox small mar-t-no">
                                                                                        <input type="checkbox" name="all"
                                                                                            checked={this.state.customer_credit_list[i].checked}

                                                                                            onChange={(e) => {
                                                                                                let array = this.state.customer_credit_list
                                                                                                if (e.target.checked) {
                                                                                                    array[i] = { ...array[i], checked: true, used_amount: item.open_balance_foreign_currency }
                                                                                                    this.setState({ customer_credit_list: array })
                                                                                                } else {
                                                                                                    array[i] = { ...array[i], checked: false, used_amount: '' }
                                                                                                    this.setState({ customer_credit_list: array })
                                                                                                }
                                                                                            }}

                                                                                        />&nbsp;
                                        <span className="checkmark" />
                                                                                    </label>
                                                                                </td>
                                                                                <td>Credit</td>
                                                                                <td>{moment(item.credit_date).format("DD-MM-YYYY")}</td>
                                                                                <td className="text-right">{item.grand_total_foreign_currency}</td>
                                                                                <td className="text-right">{item.open_balance_foreign_currency}</td>
                                                                                <td><input type="text" className="form-control  text-right" name
                                                                                    value={this.state.customer_credit_list[i].used_amount}
                                                                                    onChange={(e) => {
                                                                                        if (e.target.value <= item.open_balance_foreign_currency) {
                                                                                            let array = this.state.customer_credit_list
                                                                                            array[i] = { ...array[i], used_amount: e.target.value }
                                                                                            if (e.target.value !== '') {
                                                                                                array[i] = { ...array[i], checked: true }
                                                                                            } else {
                                                                                                array[i] = { ...array[i], checked: false }
                                                                                            }
                                                                                            this.setState({ customer_credit_list: array })
                                                                                        } else {
                                                                                            alert('please use less than or equal avilable available credit')
                                                                                        }

                                                                                    }}
                                                                                /></td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-xs-12 text-center mar-btm pad-btm">
                                                    <button type='button' className="btn btn-blue mar-rgt-5"
                                                        onClick={() => {

                                                            let total_credit = 0;
                                                            let total_invoice = 0;

                                                            this.state.customer_invoice_list && this.state.customer_invoice_list.map((item, i) => {
                                                                total_invoice = total_invoice + Number(item.open_balance_foreign_currency)
                                                            })

                                                            this.state.customer_invoice_list && this.state.customer_invoice_list.map((item, i) => {
                                                                total_credit = total_credit + Number(item.open_balance_foreign_currency)
                                                            })

                                                            // to select all
                                                            let array = this.state.customer_credit_list
                                                            this.state.customer_credit_list && this.state.customer_credit_list.map((item, i) => {
                                                                if (total_invoice > 0) {
                                                                    array[i] = { ...array[i], checked: true, used_amount: item.open_balance_foreign_currency }
                                                                    total_invoice = total_invoice - item.open_balance_foreign_currency
                                                                }
                                                            })
                                                            // to select all


                                                            let array_invoice = this.state.customer_invoice_list
                                                            this.state.customer_invoice_list && this.state.customer_invoice_list.map((item, i) => {
                                                                if (total_credit > 0) {
                                                                    if (total_credit >= item.open_balance_foreign_currency) {
                                                                        array_invoice[i] = { ...array_invoice[i], checked: true, open_balance_foreign_currency: 0 }
                                                                        total_credit = total_credit - item.open_balance_foreign_currency
                                                                    } else if (total_credit < item.open_balance_foreign_currency) {
                                                                        array_invoice[i] = { ...array_invoice[i], checked: true, open_balance_foreign_currency: item.open_balance_foreign_currency - total_credit }
                                                                        total_credit = 0
                                                                    }
                                                                }
                                                            })
                                                            this.setState({ customer_credit_list: array, customer_invoice_list: array_invoice })
                                                            // to apply credits to invoice
                                                        }}

                                                    >Auto Apply All</button>
                                                    <button className="btn btn-blue" onClick={() => {

                                                    }}>Apply</button>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-xs-12">
                                                <p className="ct-data-title"><span>Step 2:</span> Select Invoices</p>
                                                <div className="report-table reconcile-table ctd-review col-md-12 col-xs-12 pad-no mar-t-no mar-btm">
                                                    <div className="table-responsive">
                                                        <table className="table detail-report minw-unset td-vm">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        <label className="custom-checkbox small">
                                                                            <input type="checkbox" name="all" />&nbsp;
                                      <span className="checkmark" />
                                                                        </label>
                                                                    </th>
                                                                    <th>Type</th>
                                                                    <th>Date</th>
                                                                    <th className="text-right">Total Amount</th>
                                                                    <th className="text-right">Balance Due</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.customer_invoice_list &&
                                                                    this.state.customer_invoice_list.map((item, i) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>
                                                                                    <label className="custom-checkbox small mar-t-no">
                                                                                        <input type="checkbox" name="all"
                                                                                            checked={this.state.customer_invoice_list[i].checked}
                                                                                        />&nbsp;
                                                                                            <span className="checkmark" />
                                                                                    </label>
                                                                                </td>
                                                                                <td>Invoice</td>
                                                                                <td>{moment(item.invoice_date).format("DD-MM-YYYY")}</td>
                                                                                <td className="text-right">{item.grand_total_foreign_currency}</td>
                                                                                <td className="text-right">{item.open_balance_foreign_currency}</td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-xs-12 text-center mar-btm pad-btm">
                                                    <button className="btn btn-blue mar-rgt-5"
                                                        type='button'
                                                        onClick={() => {
                                                            // to deselect all
                                                            let array = this.state.customer_credit_list
                                                            this.state.customer_credit_list && this.state.customer_credit_list.map((item, i) => {
                                                                array[i] = { ...array[i], checked: false, used_amount: '' }
                                                            })
                                                            this.setState({ customer_credit_list: array })
                                                            // to deselect all
                                                        }}

                                                    >Unapply All</button>
                                                    <button className="btn btn-blue">Unapply</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="ven-data-review" className="col-md-12 col-xs-12 tab-pane fade pad-no in">
                                        <div className="row">
                                            <div className="content-top col-md-12 col-xs-12">
                                                <form className="custom-form row">
                                                    <div className="form-group col-md-3">
                                                        <label>Currency</label>
                                                        <select
                                                            className="selectpicker form-control hh w-100 "
                                                            id="invoice_curr_id_v"
                                                            data-live-search="true"
                                                            title={`Choose`}
                                                            // data-width="150%"
                                                            onChange={(e) => {
                                                                this.findInSubAccountList_v(e.target.value);
                                                            }}
                                                        >
                                                            {this.state.currencies &&
                                                                this.state.currencies.map((item) => {
                                                                    // console.log(
                                                                    //     "sjhkalshasjaj",
                                                                    //     this.state.currencies
                                                                    // );

                                                                    if (item.code !== "ALL") {
                                                                        return <option value={item}> {item}</option>;
                                                                    }
                                                                })}
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-3 no-edit">
                                                        <label>Accounts Payable</label>
                                                        <select
                                                            className="selectpicker form-control add-new "
                                                            id="account_id_v"
                                                            data-live-search="true"
                                                            title={`Choose`}
                                                            data-width="100%"
                                                            onChange={(e) => { }}
                                                            disabled={true}
                                                            value={this.state.account_v}
                                                        >
                                                            {this.state.SubAccountList != undefined &&
                                                                this.state.SubAccountList.map((item, index) => {
                                                                    // console.log("ggggg", this.state.response);
                                                                    return (
                                                                        <option value={item.id}>{item.name}</option>
                                                                    );
                                                                })}
                                                        </select>


                                                    </div>

                                                    <div className="form-group col-md-3">
                                                        <label>Customer Name</label>

                                                        <select
                                                            className="selectpicker form-control add-new"
                                                            data-live-search="true"
                                                            title="Choose customer"
                                                            id="variable_pay_type_v"
                                                            // onChange={e => {
                                                            //   if (e.target.event != '') {
                                                            //     this.setSt
                                                            //   } else {
                                                            //     this.setState({ iscustomer_name: true })
                                                            //   }
                                                            // }}

                                                            onChange={() => {
                                                                this.handleChange_v();
                                                            }}

                                                        // onChange={event => {
                                                        //   this.vendor_invoicelist(event.target.value)
                                                        // }}
                                                        >
                                                            <option>choose</option>
                                                            {this.state.customer_and_job_list &&
                                                                this.state.customer_and_job_list.map((item) => {
                                                                    return (
                                                                        <option
                                                                            value={item.name}
                                                                            data-status={item.id}
                                                                        >
                                                                            {item.name}
                                                                        </option>
                                                                    );
                                                                })}
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label>Job Id</label>
                                                        {
                                                            <select
                                                                className="selectpicker form-control add-new"
                                                                data-live-search="true"
                                                                title="Choose a job"
                                                                id="variable_pay_type_job_v"
                                                                onChange={() => {
                                                                    this.handleChanges_v();
                                                                }}
                                                            >
                                                                <option>Choose</option>
                                                                {this.state.customer_and_job_lists &&
                                                                    this.state.customer_and_job_lists.map(
                                                                        (item) => {
                                                                            return (
                                                                                <option
                                                                                    value={item.id}
                                                                                    data-status={item.id}
                                                                                >
                                                                                    {item.name}
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                            </select>
                                                        }
                                                    </div>


                                                </form>
                                            </div>
                                            <div className="col-md-6 col-xs-12">
                                                <p className="ct-data-title"><span>Step 1:</span> Select Payments / Credits</p>
                                                <div className="report-table reconcile-table ctd-review col-md-12 col-xs-12 pad-no mar-t-no mar-btm">
                                                    <div className="table-responsive">
                                                        <table className="table detail-report minw-unset td-vm">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        <label className="custom-checkbox small">
                                                                            <input type="checkbox" name="all" />&nbsp;
                                      <span className="checkmark" />
                                                                        </label>
                                                                    </th>
                                                                    <th>Type</th>
                                                                    <th>Date</th>
                                                                    <th className="text-right">Total Amount</th>
                                                                    <th className="text-right">Amt Available</th>
                                                                    <th className="text-right">Amt to Apply</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <label className="custom-checkbox small mar-t-no">
                                                                            <input type="checkbox" name="all" />&nbsp;
                                      <span className="checkmark" />
                                                                        </label>
                                                                    </td>
                                                                    <td>Credit</td>
                                                                    <td>12-08-2020</td>
                                                                    <td className="text-right">1,152.00</td>
                                                                    <td className="text-right">226.00</td>
                                                                    <td><input type="text" className="form-control" name /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label className="custom-checkbox small mar-t-no">
                                                                            <input type="checkbox" name="all" />&nbsp;
                                      <span className="checkmark" />
                                                                        </label>
                                                                    </td>
                                                                    <td>Credit</td>
                                                                    <td>02-09-2020</td>
                                                                    <td className="text-right">78.75</td>
                                                                    <td className="text-right">78.75</td>
                                                                    <td><input type="text" className="form-control" name /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-xs-12 text-center mar-btm pad-btm">
                                                    <button className="btn btn-blue mar-rgt-5">Auto Apply All</button>
                                                    <button className="btn btn-blue">Apply</button>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-xs-12">
                                                <p className="ct-data-title"><span>Step 2:</span> Select Bills</p>
                                                <div className="report-table reconcile-table ctd-review col-md-12 col-xs-12 pad-no mar-t-no mar-btm">
                                                    <div className="table-responsive">
                                                        <table className="table detail-report minw-unset td-vm">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        <label className="custom-checkbox small">
                                                                            <input type="checkbox" name="all" />&nbsp;
                                      <span className="checkmark" />
                                                                        </label>
                                                                    </th>
                                                                    <th>Type</th>
                                                                    <th>Date</th>
                                                                    <th className="text-right">Total Amount</th>
                                                                    <th className="text-right">Balance Due</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <label className="custom-checkbox small mar-t-no">
                                                                            <input type="checkbox" name="all" />&nbsp;
                                      <span className="checkmark" />
                                                                        </label>
                                                                    </td>
                                                                    <td>Bill</td>
                                                                    <td>12-08-2020</td>
                                                                    <td className="text-right">78.75</td>
                                                                    <td className="text-right">15.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label className="custom-checkbox small mar-t-no">
                                                                            <input type="checkbox" name="all" />&nbsp;
                                      <span className="checkmark" />
                                                                        </label>
                                                                    </td>
                                                                    <td>Bill</td>
                                                                    <td>02-09-2020</td>
                                                                    <td className="text-right">288.15</td>
                                                                    <td className="text-right">288.15</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label className="custom-checkbox small mar-t-no">
                                                                            <input type="checkbox" name="all" />&nbsp;
                                      <span className="checkmark" />
                                                                        </label>
                                                                    </td>
                                                                    <td>Bill</td>
                                                                    <td>02-09-2020</td>
                                                                    <td className="text-right">288.15</td>
                                                                    <td className="text-right">288.15</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label className="custom-checkbox small mar-t-no">
                                                                            <input type="checkbox" name="all" />&nbsp;
                                      <span className="checkmark" />
                                                                        </label>
                                                                    </td>
                                                                    <td>Bill</td>
                                                                    <td>02-09-2020</td>
                                                                    <td className="text-right">288.15</td>
                                                                    <td className="text-right">288.15</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                    <td />
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-xs-12 text-center mar-btm pad-btm">
                                                    <button className="btn btn-blue mar-rgt-5">Unapply All</button>
                                                    <button className="btn btn-blue">Unapply</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Main Content Ends here */}
                            <div className="invoice-form">
                                <div className="pf-btm-wrap xs-pad-all">
                                    <div className="col-md-12 col-xs-12 text-right pad-no">
                                        <button className="btn btn-lightgray mar-rgt-5">Clear</button>
                                        <button className="btn btn-green">Save Transactions</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* MainContent Wrapper Ends here */}
                    </div>
                </div>
                {/* Main Wrapper Ends here */}
                {/* footer Starts here */}
                <footer className="container-fluid">
                    <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
                </footer>
                {/* footer Ends here */}
            </div>

        );
    }
}
export default ClientDataReview;
