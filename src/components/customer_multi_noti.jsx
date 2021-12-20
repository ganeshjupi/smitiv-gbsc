import React from "react";
import LeftSidebar from "./left_sidebar";
import Footer from "./footer";

import Topbar from "./topbar";

import FetchAllApi from "../api_links/fetch_all_api";
import config from "../api_links/api_links";


import { PDFtoIMG } from "react-pdf-to-image";
import moment from "moment";

import jQuery from "jquery";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";
var _ = require("lodash");

// import 'bootstrap';
// import 'bootstrap-select';

class Customer_receive_payment_noti extends React.Component {
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
            edit_customer_receive_payment: localStorage.getItem("edit_customer_receive_payment") && JSON.parse(localStorage.getItem("edit_customer_receive_payment")),
            customer_receive_payment_notification: localStorage.getItem("customer_receive_payment_notification") && JSON.parse(localStorage.getItem("customer_receive_payment_notification")),
            dropdown: "",
            rec_acc: '',
            inbox_list: [],
            response_stus: 0,
            response_msg: "No data found",
            item_details: "",
            item_file_path: "",
            waiting_re: [],
            re_assigned: [],
            customerListArray: [],
            TotalPages: [],
            pgNo: "10",
            selected_filter_id: 1,
            selectedLimit: 10,
            overallcustomerBal: 0,
            customer_account_type: [],
            vendor_names: [],
            vendor_invoicelist: [],
            selectValue: "",
            vendor_payment_method: [],
            vendor_credit_list: [],
            vendor_category: [],
            vendor_payment_account_type: [],
            vendor_discount_terms: [],
            applied_credit_history: [],
            customer_and_job_list: [],
            customer_and_job_lists: [],
            customer_and_job_listss: [],
            customer_id: "",
            job_id: "",
            currency_selected: "",
            isSuccessful: false,
            isFailed: false,
            vendor_payment_method_bank: [],
            received_account: false,
            third_party_name: [],
            received_accounts: false,
            discount_terms: "",
            job_id_details: [],
            //added
            overPayment: "",
            under: false,
            under_amt: "",
            over: false,
            overPay: "",
            invoiceListArray: [],
            totalDueFromApi: "",
            totalDuePaid: "",
            vendorBankAccountList: [],
            toBeSelected: "",
            creditList: [],
            AMNT_DUE: "",
            ID_USE: "",
            selectedCreditList: [],

            VendorAccSelcted: "",
            vendorBal: "",
            currencySelected: "",
            isThirdpartyEssenstial: false,
            VendorAccSelcted: "",
            writeOff: "",
            vendorName: "",
            modeOfPay: "",
            recievedAccount: "",
            refundStatus: {},

            recievedAccountName: '',
            CurrVendorId: '',
            rowsNeededCredits: [],
            credittotal: 0,
            selected_payment_account: '',
            selected_account_id: '',
            amount_of_payment: '',
            total_received_amount: 0,
            discount_account_type: '',
            discount_amount: [0, 0],
            added_discount_amount: 0,
            invoiceSeletedId: 0,
            TotalDiscountAmount: 0,
            TotalCreditAmount: 0,
            amount_of_payment_used: 0,
            total_amount: 0,
            credit_list: [],
            // third_party_type: 0,
            discount_array: [],
            credit_id_used: '',
            option: '1',
            third_party_type: 0,

            clientHomeCurrency: "",
            exchangeRate: 0,
            unused_amt: 0,
            auto_apply: true,
            credit_available: 0,
            reference: '',
            final_invoice_credit_array: [],
            isEdit: false,
            multi_payment_applied_invoices: '',
            notification_id:''

        };
        this.myDivToFocus = React.createRef();
    }


    rename = (obj, curr) => {
        let a = {}
        Object.keys(obj).map((key) => {
            let newKey = key.replace(curr, '')
            Object.assign(a, { [newKey]: obj[key] })
        })
        return a
    }




    dateChange = (e) => {
        // //console.log(e)
        this.setState({ date: e })
        setTimeout(() => this.get_currency_datails(), 500)
    };




    get_currency_datails = () => {
        let payment_date = this.state.date
        // selectedCurrency  clientHomeCurrency
        //console.log(1)
        if (this.state.selectedCurrency !== "" && this.state.selectedCurrency !== undefined) {
            //console.log(2)
            if (payment_date == "" || payment_date == undefined) {
                //console.log(3)
                fetch(
                    // `https://api.exchangeratesapi.io/latest?base=${this.state.selectedCurrency}`
                    `https://api.currencylayer.com/live?access_key=${config.api_key}&source=${this.state.selectedCurrency}`

                )
                    .then((response) => response.json())
                    .then((data) => {
                        let newObj = this.rename(data.quotes, this.state.selectedCurrency)

                        if (this.state.clientHomeCurrency != '' && this.state.clientHomeCurrency != undefined) {
                            this.setState({
                                exchange_rate: (newObj[this.state.clientHomeCurrency]).toFixed(4),
                                exchangeRate: (newObj[this.state.clientHomeCurrency]).toFixed(4),
                                exchange_rate_temp: (newObj[this.state.clientHomeCurrency]).toFixed(4)
                            })
                        }
                    })
            } else {
                //console.log(4)
                let date1 = payment_date
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
                            this.setState({
                                exchange_rate: (newObj[this.state.clientHomeCurrency]).toFixed(4),
                                exchangeRate: (newObj[this.state.clientHomeCurrency]).toFixed(4),
                                exchange_rate_temp: (newObj[this.state.clientHomeCurrency]).toFixed(4)

                            })
                        }
                    })
            }
        }
    };


    applyCredit = () => {
        let final_invoice_credit_array = []
        let credit_amount_total = 0
        this.state.vendor_invoicelist.map((invoice, selectedRow) => {
            let invoice_credit_array = []
            let credit_amount = 0
            this.state.vendor_credit_list.map((credit, i) => {
                let credit_to_be_use = (this.state[`credit_to_be_use${i}${selectedRow}`] ? Number(this.state[`credit_to_be_use${i}${selectedRow}`]) : 0)
                let credit_applied_history_id = (this.state[`credit_applied_history_id${i}${selectedRow}`] ? Number(this.state[`credit_applied_history_id${i}${selectedRow}`]) : 0)
                let old_credit_amount = (this.state[`old_credit_amount${i}${selectedRow}`] ? Number(this.state[`old_credit_amount${i}${selectedRow}`]) : 0)
                //  [`credit_applied_history_id${i3}${i}`]  old_credit_amount
                credit_amount = credit_amount + credit_to_be_use
                invoice_credit_array.push({ credit_id: credit.credit_id, credit_amount: credit_to_be_use, credit_applied_history_id, old_credit_amount })

            })
            this.setState({ [`credit_amount${selectedRow}`]: credit_amount })
            credit_amount_total = credit_amount_total + credit_amount
            let invoice_id = invoice.id
            final_invoice_credit_array.push({ [invoice_id]: invoice_credit_array })
        })
        this.setState({ credit_amount_total, final_invoice_credit_array })
        console.log('final_invoice_credit_array', final_invoice_credit_array)
    }

    credit_onchange = (i, selectedRow, available_credits) => {
        let total = 0
        this.state.vendor_invoicelist.map((item, selectedRow) => {
            total = total + (this.state[`credit_to_be_use${i}${selectedRow}`] ? Number(this.state[`credit_to_be_use${i}${selectedRow}`]) : 0)
            //console.log("Basio state123", total);
        })
        //console.log("Basio state1234", total);
        this.setState({ [`usedCreditsRowTotal${i}`]: available_credits - total })
        // //console.log("Basio state", response);
    }

    get_client_home_currency = () => {
        let client_id = this.state.logged_client_id;

        FetchAllApi.get_client_home_currency(client_id, (err, response) => {
            if (response.status === 1) {
                //console.log("Basio state", response);
                this.setState({
                    clientHomeCurrency: response.currency,
                }, this.getCurrencyList());
            } else {
            }
        });
    };

    // getCurrencyList = () => {
    //     fetch(
    //         // `https://api.exchangeratesapi.io/latest?base=${'SGD'}`
    //         `https://api.currencylayer.com/live?access_key=${config.api_key}&source=SGD`

    //     )
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.rates)
    //                 this.setState({ currency_list: Object.keys(data.rates) })
    //         })
    // };
    getCurrencyList = () => {
        fetch(
          // `https://api.exchangeratesapi.io/latest?base=SGD`
          `https://api.currencylayer.com/live?access_key=${config.api_key}&source=SGD`    
        )
          .then((response) => response.json())
          .then((data) => {
            let newObj = this.rename(data.quotes, 'SGD')
    
            if (newObj)
              this.setState({ currency_list: Object.keys(newObj) })
          })
      };

    findInSubAccountList = (curr) => {

        if (
            this.state.customer_receive_payment_notification != '' &&
            this.state.customer_receive_payment_notification != null &&
            this.state.customer_receive_payment_notification != undefined
        ) {
            // 
        } else {
            setTimeout(() => this.get_currency_datails(), 500)
            // this.get_currency_datails()
        }


        var currency = curr;
        var result = [];
        this.state.SubAccountList && this.state.SubAccountList.forEach((item, i) => {
            var fullString = item.name.split("-");
            var list_curr = fullString[1];

            //console.log("matched", item.name + "=" + list_curr + "=" + currency);
            var kk = "Accounts Receivable" + "-" + currency;

            //console.log("one", item.name);
            //console.log("one1", kk);
            if (item.name == kk) {
                result.push(item);
            }
        });

        console.log("checkssss", result);
        if (result.length === 0) {
            // alert('not matched')
            var coreData = {
                account_name: "Accounts Receivable-" + currency,
                account_type_id: 2,
                currency: currency,
                client_id: this.state.logged_client_id,
            };

            FetchAllApi.addNewAccountName(coreData, (err, response) => {
               console.log("vendor_nljfskdkdssdkfames", response);

                if (response.status === 1) {
                    this.getSubAccountList();

                    // id="ar_account"

                    jQuery("#account_id").val(response.account_type_id);
                    this.setState({
                        account_id: response.account_id,
                        account_id_name: response.name,

                        selected_account_id: response.account_id,
                        selected_currency: response.account_id,
                        currency_selected: currency,
                    });

                    setTimeout(() => {
                        if (
                            this.state.customer_receive_payment_notification != '' &&
                            this.state.customer_receive_payment_notification != null &&
                            this.state.customer_receive_payment_notification != undefined
                        ) {
                            // 
                        } else {
                            this.handleChanges()
                        }

                    }, 1000)
                    // alert('new added & refreshed')
                    // this.setState({SubAccountList:response.list});

                    // alert('success')
                    // this.getItems()
                    // window.jQuery('#add_items').modal('hide')
                } else {
                }
            });
        } else {
            // alert(result.length)
            //console.log("hfhfh", result);
            jQuery("#account_id").val(result[0].id);
            this.setState({
                account_id: result[0].id,
                account_id_name: result[0].name,

                selected_account_id: result[0].id,
                selected_currency: result[0].id,
                currency_selected: currency,
            });

            setTimeout(() => {
                if (
                    this.state.customer_receive_payment_notification != '' &&
                    this.state.customer_receive_payment_notification != null &&
                    this.state.customer_receive_payment_notification != undefined
                ) {
                    // 
                } else {
                    this.handleChanges()
                }
            }, 1000)
            if (
                jQuery("#invoice_curr_id option:selected").val() != "" &&
                jQuery("#invoice_curr_id option:selected").val() != undefined
            ) {
            }
            // alert('no worries match found')
        }
    };

    get_currencies = () => {
        // fetch(`https://api.exchangerate-api.com/v4/latest/${this.state.currency_selected}`)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     let first = this.state.currency_selected
        //     // //console.log("Basio state1", data);
        //     // //console.log("Basio state1", first);
        //     // //console.log("Basio state2", data.rates);
        //     // //console.log("Basio state3", data.rates[this.state.currency_selected]);currency_selected  clientHomeCurrency
        //     // //console.log("Basio state4", data.rates.first);

        //     this.setState({ exchangeRate: Number(data.rates[this.state.clientHomeCurrency].toFixed(4)), exchange_rate_temp: Number(data.rates[this.state.clientHomeCurrency].toFixed(4)) });
        //   });
    };

    total_paid = (entered_amt, row) => {
        //console.log('mnj', entered_amt, '', row)
        var total_paid = 0

        this.state.vendor_invoicelist.map((item, i) => {
            if (row != i) {
                //console.log('yesin', Number(this.state[`invoice_due${i}`]))


                total_paid = Number(total_paid) + (this.state[`invoice_due${i}`] ? Number(this.state[`invoice_due${i}`]) : 0)
            }
        })
        // //console.log('mnj1',total_paid,'')
        // //console.log('mnj2',Number((Number(total_paid) + Number(entered_amt))) ,'', row)
        // //console.log('mnj3',Number((Number(total_paid) + Number(entered_amt))) > Number(this.state.amount_of_payment) ? true : false)

        if (Number((Number(total_paid) + Number(entered_amt))) > Number(this.state.amount_of_payment)) {
            return (true)

        } else if (Number((Number(total_paid) + Number(entered_amt))) < Number(this.state.amount_of_payment)) {
            this.setState({ isUnused: true, unused_amt: Number(this.state.amount_of_payment) - Number((Number(total_paid) + Number(entered_amt))) })
            return (false)

        } else {
            this.setState({ isUnused: false, unused_amt: 0 })
        }

    }

    componentDidUpdate() {
        window.jQuery(".selectpicker").selectpicker("refresh");
        // this.sumTotal();
    }

    // 4 selected vendor id
    handleChange = () => {
        // alert(e)
        let variable_pay_type = jQuery("#variable_pay_type option:selected").data(
            "status"
        );
        // console.log('variable_pay_type', jQuery("#variable_pay_type option:selected").data(
        //   "name"
        // ))
        this.setState({
            payor_name: variable_pay_type,
            selectValue: variable_pay_type,
            vendorName: jQuery("#variable_pay_type option:selected").data(
                "name"
            ),
            customer_and_job_lists: []
        });
        // this.setState({ selectValue: variable_pay_type });
        //this.vendor_invoicelist(variable_pay_type);
        // this.vendor_credit_list(variable_pay_type);

        // this.vendor_discount_terms(variable_pay_type);
        // this.applied_credit_history(variable_pay_type);
        this.customer_and_job_lists(variable_pay_type);
    };
    handleChanges = () => {
        let variable_pay_type_job = jQuery(
            "#variable_pay_type_job option:selected"
        ).data("status");
        this.customer_and_job_listss(variable_pay_type_job);
        this.customer_invoicelist();
        this.vendor_credit_list();
        this.applied_credit_history();
        this.vendor_discount_terms();
        this.get_currencies()
        this.setState({ job: variable_pay_type_job })
    };

    handleChangess = () => {
        let job_id = jQuery("#variable_pay_type_jobs option:selected").data(
            "status"
        );
        // this.setState({ job_id: job_id });

        this.customer_invoicelist();
        this.vendor_credit_list();
        this.applied_credit_history();
        this.vendor_discount_terms();
    };

    third_party = () => {
        let third_party = jQuery("#received_account option:selected").data(
            "status"
        );

        if (third_party == 2) {
            this.setState({ received_accounts: false });

            this.setState({ received_account: true });
            FetchAllApi.vendor_payment_account_types((err, response) => {
                if (response.status === 1) {
                    //console.log("consoleme", response);
                    this.setState({ third_party_name: response.customerData, third_party_type: 1 });
                }
            });
        } else if (third_party == 5) {
            // var client_id = localStorage.getItem("logged_client_id")
            var client_id = this.state.logged_client_id;

            this.setState({ received_account: false });
            this.setState({ received_accounts: true });
            FetchAllApi.getVendorNames(client_id, (err, response) => {
                if (response.status === 1) {
                    //console.log("consoleme", response);
                    this.setState({ third_party_name: response.list, third_party_type: 2 });
                }
            });
        } else {
            this.setState({ received_account: false });
            this.setState({ received_accounts: false });
        }
    };

    //  1 vendor_account_type

    customer_account_type = () => {
        let client_id = this.state.logged_client_id
        FetchAllApi.customer_account_type(client_id, (err, response) => {
            if (response.status === 1) {

                //console.log('kjijkj', this.props.location.state)
                if (this.props.location.state !== '' && this.props.location.state !== null && this.props.location.state !== undefined) {
                    response.list.forEach((item, i) => {
                        if (item.name == "Accounts Receivable" + "-" + this.props.location.state[1]) {
                          //  alert('ji')
                            this.setState({
                                selected_account_id: item.id,
                                selected_currency: item.id,
                                currency_selected: item.currency,
                            }, this.handleChange)
                        }
                    });
                }

                //console.log("consoleme", response);
                this.setState({ customer_account_type: response.list });
            } else {
                // this.setState({ vendor_account_type: [] });
            }
        });
    };

    // 2 customer_and_job_list

    customer_and_job_list = () => {
        // var client_id = localStorage.getItem("logged_client_id") ;
        var client_id = this.state.logged_client_id;
        var from_customer_receive_payment = 1;
        FetchAllApi.customer_and_job_list(
            client_id,
            from_customer_receive_payment,
            (err, response) => {
                //console.log("vendor_names", response);

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
                //console.log("vendor_names", response);

                if (response.status === 1) {
                    this.setState({ customer_and_job_lists: response.list });
                    this.setState({ customer_id: customer_id },
                        () => {
                            if (
                                this.state.customer_receive_payment_notification != '' &&
                                this.state.customer_receive_payment_notification != null &&
                                this.state.customer_receive_payment_notification != undefined
                            ) {
                                // 
                            } else {
                                this.handleChanges()
                            }
                        }

                    );
                } else {
                    this.setState({ customer_and_job_lists: [] },
                        () => {
                            if (
                                this.state.customer_receive_payment_notification != '' &&
                                this.state.customer_receive_payment_notification != null &&
                                this.state.customer_receive_payment_notification != undefined
                            ) {
                                // 
                            } else {
                                this.handleChanges()
                            }
                        }
                    );
                }
            }
        );
    };

    customer_and_job_listss = (job_id) => {
        // var client_id = localStorage.getItem("logged_client_id") ;
        var client_id = this.state.logged_client_id;
        var customer_id = this.state.customer_id;
        var job_id = job_id;
        var from_customer_receive_payment = 1;

        FetchAllApi.customer_and_job_listss(
            client_id,
            customer_id,
            job_id,
            from_customer_receive_payment,
            (err, response) => {
                //console.log("vendor_names", response);

                if (response.status === 1) {
                    this.setState({ customer_and_job_listss: response.list });
                } else {
                    this.setState({ customer_and_job_listss: [] });
                }
            }
        );
    };

    // 3 customer_invoicelist

    customer_invoicelist = () => {
        // var client_id = localStorage.getItem("logged_client_id");
        var client_id = this.state.logged_client_id;
        var customer_id = this.state.customer_id;
        var job_id = jQuery("#variable_pay_type_job option:selected").data(
            "status"
        );
        // var invoice_account = jQuery("#ar_account").val()
        var invoice_account = this.state.account_id

        FetchAllApi.customer_invoicelist(
            client_id,
            customer_id,
            job_id,
            invoice_account,
            (err, response) => {
                //console.log("vendor_names", response);

                if (response.status === 1) {
                    this.setState({ vendor_invoicelist: response.list });
                    this.payDue();
                } else {
                    this.setState({ vendor_invoicelist: [] });
                    this.total_paid(0, 0)
                    this.payDue();
                }
            }
        );
    };

    // 6 customer_creditlists

    vendor_credit_list = () => {
        // var client_id = localStorage.getItem("logged_client_id");
        var client_id = this.state.logged_client_id;
        var customer_id = this.state.customer_id;
        var job_id = jQuery("#variable_pay_type_job option:selected").data(
            "status"
        );
        var credit_account = this.state.account_id
        FetchAllApi.customer_creditlists(
            client_id,
            customer_id,
            job_id,
            credit_account,
            (err, response) => {
                //console.log("vendor_names", response);

                if (response.status === 1) {
                    this.setState({ vendor_credit_list: response.response, credit_available: response.available_credit_foreign_currency });
                } else {
                }
            }
        );
    };

    // 5 vendor payment method

    vendor_payment_method = () => {
        FetchAllApi.getPaymethod((err, response) => {
            //console.log("vendor_namews", response);

            if (response.status === 1) {
                this.setState({ vendor_payment_method: response.lists });
            } else {
            }
        });
    };

    // 7 vendor_category
    vendor_category = () => {
        var client_id = this.state.logged_client_id;
        FetchAllApi.vendor_category(client_id, (err, response) => {
            //console.log("vendor_names", response);

            if (response.status === 1) {
                this.setState({ vendor_category: response.response });
            } else {
            }
        });
    };

    // 8 vendor_payment_account_type ( )

    vendor_payment_account_type = () => {
        FetchAllApi.vendor_payment_account_types((err, response) => {
            //console.log("vendor_names", response);

            if (response.status === 1) {
                this.setState({
                    // vendor_payment_account_type: response.accountData,
                    vendor_payment_method_bank: response.list,
                });
            } else {
            }
        });
    };

    onChange_filter_balancesheet = () => {
        let search_key = "";
        var client_id = this.state.logged_client_id;

        //alert(search_key)
        FetchAllApi.balancesheetlist_onchange(
            search_key,
            client_id,
            (err, response) => {
                //console.log("defaultcategorylist", response);
                if (response.status === 1) {
                    // alert('k')
                    this.setState({
                        vendor_payment_account_type: response.list,
                    });
                } else {
                    this.setState({
                        vendor_payment_account_type: [],
                    });
                }
            }
        );
    };
    // 10 applied_credit_history

    applied_credit_history = () => {
        // var client_id = localStorage.getItem("logged_client_id");
        var client_id = this.state.logged_client_id;
        var customer_id = this.state.customer_id;
        var job_id = jQuery("#variable_pay_type_job option:selected").data(
            "status"
        );

        FetchAllApi.customer_appliedcreditlists(
            client_id,
            customer_id,
            job_id,
            (err, response) => {
                //console.log("vendor_names", response);

                if (response.status === 1) {
                    this.setState({ applied_credit_history: response.response });
                } else {
                }
            }
        );
    };

    // customer_discount_terms

    vendor_discount_terms = () => {
        // var client_id = localStorage.getItem("logged_client_id");
        var client_id = this.state.logged_client_id;
        var customer_id = this.state.customer_id;
        var job_id = jQuery("#variable_pay_type_job option:selected").data(
            "status"
        );

        FetchAllApi.customer_discount_terms(
            client_id,
            customer_id,
            job_id,
            (err, response) => {
                //console.log("vendor_nkkkkkkk0000kames", response);

                if (response.status === 1) {
                    this.setState({
                        discount_terms: response.data[0].payment_terms,

                        job_id_details: response.data,
                    });
                } else {
                }
                // response.data[0].payment_terms  open_balance_foreign_currency
            }
        );
    };

    //default_discount_term
    default_discount_term = () => {
        FetchAllApi.default_discount_term((err, response) => {
            //console.log("vendor_names", response);

            if (response.status === 1) {
                this.setState({ vendor_discount_terms: response.lists });
            } else {
            }
        });
    };

    // customer_recived_payment
    custConverter = (x) => {
        let date = x;
        if (date != undefined) {
          var array = date.split("-");
          
          var date_formated = array[2] + "-" + array[1] + "-" + array[0];
          // alert(date_formated)
          return date_formated;
        }
      };
    customer_recived_payment = (x) => {
        console.log(this.state.account_id, jQuery('#date').val(),moment(jQuery('#date').val()).format("YYYY-MM-DD"))
        let ar_account = this.state.account_id
        let customer_id = jQuery("#variable_pay_type option:selected").data(
            "status"
        );
        let payor_name = jQuery("#variable_pay_type option:selected").data(
            "name"
        );
        let job_id = jQuery("#variable_pay_type_job").val();

        let payment_date=jQuery('#date').val();
        console.log(ar_account,payment_date,this.custConverter(payment_date))
        if (this.state.isEdit) {
            payment_date =this.custConverter(payment_date)// moment(new Date(payment_date)).format("YYYY-MM-DD")
        } else {
            payment_date = this.custConverter(payment_date)//moment(new Date(payment_date)).format("YYYY-MM-DD")
        }
        let invoicearray = [];
        this.state.vendor_invoicelist && this.state.vendor_invoicelist.map((item, i) => {
            let exampleObj = {
                invoice_id: item.id,
                payment_id: item.payment_id ? item.payment_id : 0,
                oringinal_amount: jQuery('#original' + i).html(),
                amount_due: jQuery('#due_of_invoice' + i).html(),
                payment_amount: this.state[`invoice_due${i}`],
                discount_amount: this.state[`discount_amount${i}`] ? this.state[`discount_amount${i}`] : 0,
                invoice_account: item.invoice_account,
                invoice_exchange_rate: jQuery("#invoice_exchange_rate" + i).val(),
                credit_id: jQuery("#invoice_credit" + i).val() ? jQuery("#invoice_credit" + i).val() : 0,
                credit_amount_to_use: this.state[`credit_amount${i}`] ? this.state[`credit_amount${i}`] : 0
               }
                invoicearray.push(exampleObj)
        })
        let amount = Number(jQuery("#getEntredAmnt").val());
        let type = jQuery("#modeofpayment_type option:selected").data("status");
        let reference_number = jQuery("#paymentreference").val(); //
        let received_account = jQuery("#received_account").val(); //
        let third_party_type = this.state.third_party_type
        let third_party_account_id = this.state.received_account ?
            jQuery("#third_party_id").val() : jQuery("#third_party_vendor").val()
        let third_party_account_name = this.state.received_account ?
            jQuery(
                "#third_party_id option:selected"
            ).data("name") :
            jQuery(
                "#third_party_vendor option:selected"
            ).data("name")
        let descripation = jQuery("#descripation").val();
        let exchange_rate = (this.state.exchangeRate == '' || this.state.exchangeRate == 0) ? this.state.exchange_rate_temp : this.state.exchangeRate
        let option = this.state.option
        let writeOff = this.state.writeOff
        let client_id = this.state.logged_client_id;
        let Vendor_bank_account = 7767;
        let discount = this.state.discount_array
        let invoice_list = this.state.invoiceListArray && this.state.invoiceListArray.length!=0?this.state.invoiceListArray:invoicearray;
        let credit_list = this.state.credit_list;
        let refundStatus = this.state.refundStatus
        let total_amount = this.state.totalDueFromApi;
        let total_amount_due = jQuery("#total2").html();
        let total_original_amount = jQuery("#total1").html();
        let applied_amount = jQuery("#total3").html();
        let total_discount_credits_amount = 0.0;
        let total_payment_balance = 100;
        let payment_balance = 100;
        let isEdit = this.state.isEdit
        let multi_payment_applied_invoices = this.state.multi_payment_applied_invoices

        FetchAllApi.customer_recived_payment(  
            customer_id,
            payor_name,
            client_id,
            descripation,
            exchange_rate,
            amount,
            type,
            third_party_account_name,
            reference_number,
            payment_date,
            Vendor_bank_account,
            job_id,
            ar_account,

            writeOff,

            discount,

            invoice_list,
            credit_list,

            refundStatus,

            total_amount,
            total_amount_due,
            total_original_amount,
            applied_amount,
            total_discount_credits_amount,
            total_payment_balance,
            payment_balance,
            option,
            1,
            third_party_type,
            third_party_account_id,
            received_account,
            this.state.unused_amt,
            this.state.currency_selected,
            this.state.selected_account_id,
            this.state.logged_user_id,
            this.state.final_invoice_credit_array,
            isEdit,
            multi_payment_applied_invoices,
            this.state.notification_id,
            (err, response) => {
                //console.log("vendor_names", response);
                if (response.status === 1) {
                    this.setState({ under: false, over: false });

                    jQuery("#getEntredAmnt").val("");
                    if (this.myDivToFocus.current) {
                        this.myDivToFocus.current.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }

                    if (x === "save") {
                        alert("Success ! succesfully saved");

                        this.setState({ isSuccessful: true });
                        setTimeout(() => {
                            this.setState({ isSuccessful: false });
                        }, 1000);
                       // this.props.history.push("/loading", ["/Customer_receive_payment"]);
                       this.props.history.push("/loading", ["/all_lists"]);
                    } else {
                        alert("Success ! succesfully saved");

                        this.setState({ isSuccessful: true });
                        setTimeout(() => {
                            this.setState({ isSuccessful: false });
                        }, 1000);
                       // this.props.history.push("/loading", ["/Customer_receive_payment"]);
                       this.props.history.push("/loading", ["/all_lists"]);
                    }
                } else {
                    alert(response.message);
                    this.setState({ isFailed: true });
                    setTimeout(() => {
                        this.setState({ isFailed: false });
                    }, 2000);
                }
            }
        );
    };

    routedChange(parameter) {
        this.props.history.push("/" + parameter);
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        localStorage.setItem("customer_receive_payment_notification", '')
    }

    logoutLink() {
        localStorage.clear();
        this.props.history.push("/");
    }

    dataTaggingFunc(list_id, file_id) {
        this.props.history.push("/data_tagging/" + list_id + "/" + file_id);
        window.scrollTo(0, 0);
    }

    pageLink(page_slug) {
        this.props.history.push("/" + page_slug);
    }
    UNSAFE_componentWillMount() {
        jQuery(document.body).removeClass("minimize_leftbar");
        ////console.log("logged_user_id", this.state.logged_user_id);

        // jQuery('title').html('User Inbox | GBSC')

        if (
            this.state.logged_user_id === "" ||
            this.state.logged_user_id === null ||
            this.state.logged_user_id === undefined
        ) {
            this.props.history.push("/");
        }

        // this.get_inbox_list();
    }

    get_customer_multipayment_details = () => {

        // let input = {
        //     client_id: this.state.logged_client_id,
        //     customer_id: this.state.edit_customer_receive_payment[0],
        //     multi_payment_applied_invoices: this.state.edit_customer_receive_payment[1],
        // }

        // let data1 = from
        // alert('noti2')
        // let input

        // if (data1 == 'edit') {
        //   input = {
        //     client_id: this.state.logged_client_id,
        //     customer_id: this.state.edit_customer_receive_payment[0],
        //     multi_payment_applied_invoices: this.state.edit_customer_receive_payment[1]
        //   }
        // } else {
        let input = {
            notification_id: this.state.customer_receive_payment_notification
        }
        this.setState({notification_id:this.state.customer_receive_payment_notification})
        // }

        FetchAllApi.customer_receive_payment_notification(input, (err, response) => {
            if (response.status === 1) {
                let data = response.details
                let detail = response.details.paydetails


                this.setState({

                    isEdit: false,
                    multi_payment_applied_invoices: 0,

                    vendor_invoicelist: data.invoice_list,
                    vendor_credit_list: data.credit_list,
                    credit_available: data.credits_available,
                    applied_credit_history: data.credit_applied_history,

                    selectedCurrency: data.payment_currency,

                    payor_name: detail.customer_id,
                    selectValue: detail.customer_id,
                    vendorName: detail.customer_name, // customer name should come

                    job: detail.job_id,

                    amount_of_payment: detail.amount, // amount of payment should come

                    pay_method: detail.payment_method,   // payment method should come

                    reference: detail.reference_number,  //detail.reference_number     comes empty,

                    rec_acc: detail.ar_account,

                    descripation: detail.descripation,

                    exchangeRate: detail.exchange_rate,

                    received_account: detail.third_party_type == 1 ? true : false, // one param should be added for received acc is customer or vendor to show third party

                    received_accounts: detail.third_party_type == 2 ? true : false  // one param should be added for received acc is customer or vendor to show third party





                }, () => {
                    this.findInSubAccountList(data.payment_currency)
                    this.customer_and_job_lists(detail.customer_id);
                    jQuery('#date').val(moment(detail.payment_date).format("DD-MM-YYYY"))
                    jQuery('#total2').html(data.customer_balance)


                    this.state.vendor_invoicelist &&
                        this.state.vendor_invoicelist.map((item, i) => {
                            this.setState({
                                [`invoice_due${i}`]: item.payment_amount_foreign_currency,
                                [`credit_amount${i}`]: item.credit_amount_foreign_currency,
                                [`discount_amount${i}`]: item.discount_amount_foreign_currency,
                                [`inv_check${i}`]: item.invoice_selected == 1 ? true : false,

                                // invoice_selected    this.state[`inv_check${i}`]
                                [`discount_amount${i}`]: item.discount_amount_foreign_currency,
                                [`discount_amount_temp${i}`]: item.discount_amount_foreign_currency,
                                [`discount_account_type${i}`]: item.discount_account_id,
                                [`discount_account_type_temp${i}`]: item.discount_account_id,

                                isUnused: data.unapplied_payment_amount > 0 ? true : false,
                                unused_amt: data.unapplied_payment_amount
                            })


                            // value={this.state[`credit_to_be_use${i}${selectedRow}`]

                            data.final_invoice_credit_array &&
                                data.final_invoice_credit_array.map(
                                    (item1, i1) => {

                                        if (item.id == Object.keys(item1)[0]) {

                                            Object.values(item1)[0].map((item2, i2) => {

                                                this.state.vendor_credit_list &&
                                                    this.state.vendor_credit_list.map(
                                                        (item3, i3) => {
                                                            if (item2.credit_id == item3.credit_id) {
                                                                this.setState({ [`credit_to_be_use${i3}${i}`]: item2.credit_amount, [`credit_applied_history_id${i3}${i}`]: item2.credit_applied_history_id, [`old_credit_amount${i3}${i}`]: item2.old_credit_amount })
                                                            }
                                                        })

                                            })

                                        }

                                    })

                        })



                    setTimeout(() => {
                        this.addDiscount()
                        this.applyCredit()
                    }, 2000);




                })




            } else {
                alert(response.message)
            }
        });
    };


    getSubAccountList = () => {
        var coreData = {
            account_type_id: 2,
            client_id: this.state.logged_client_id,
        };

        FetchAllApi.getSubAccountList(coreData, (err, response) => {
            //console.log("vendor_nljfskdkdssdkfames", response);

            if (response.status === 1) {
                this.setState({ SubAccountList: response.list });

                // alert('success')
                // this.getItems()
                // window.jQuery('#add_items').modal('hide')
            } else {
            }
        });
    };

    watchMe = () => {

        setInterval(() => {


            // for add new customer
            var customer = localStorage.getItem("customer_multipayment_add_new_customer");
           // console.log("customer_multipayment_add_new_customer_id", customer);

            if (
                customer !== undefined &&
                customer !== "" &&
                customer !== null &&
                customer === "yes"
            ) {

                var client_id = this.state.logged_client_id;
                var from_customer_receive_payment = 1;
                FetchAllApi.customer_and_job_list(
                    client_id,
                    from_customer_receive_payment,
                    (err, response) => {

                        if (response.status === 1) {
                            this.setState({ customer_and_job_list: response.list, payor_name: localStorage.getItem('customer_multipayment_add_new_customer_id') },
                                () => {
                                    localStorage.setItem("customer_multipayment_add_new_customer", "")
                                    localStorage.setItem("customer_multipayment_add_new_customer_id", "")

                                    localStorage.setItem('customer_added', 'yes')
                                    localStorage.setItem('customer_added_id', response.customer_id)

                                    localStorage.setItem("third_party_customer_id", response.customer_id)
                                    localStorage.setItem("third_party_customer", 'yes1');
                                    this.handleChange()
                                })
                        } else {
                        }
                    }
                );

            }

            // for add new customer

            

            // for add new job

            var job = localStorage.getItem("job_added");
         //console.log("job_added_id", customer);

            if (
                job !== undefined &&
                job !== "" &&
                job !== null &&
                job === "yes"
            ) {

                var client_id = this.state.logged_client_id;
                var customer_id = this.state.payor_name;
                var from_customer_receive_payment = 1;

                FetchAllApi.customer_and_job_lists(
                    client_id,
                    customer_id,
                    from_customer_receive_payment,
                    (err, response) => {
                        //console.log("vendor_names", response);

                        if (response.status === 1) {
                            this.setState({ customer_and_job_lists: response.list, job: localStorage.getItem('job_added_id') },
                                () => {
                                    localStorage.setItem('job_id', '')
                                    localStorage.setItem('job_added', '')
                                    localStorage.setItem('job_added_id', '')
                                    this.handleChanges()

                                }

                            );
                        } else {
                            this.setState({ customer_and_job_lists: [] },
                                () => {
                                    localStorage.setItem('job_id', '')
                                    localStorage.setItem('job_added', '')
                                    localStorage.setItem('job_added_id', '')
                                    this.handleChanges()

                                }
                            );
                        }
                    }
                );

            }

            // for add new job




        }, 2000);
    };


    componentDidMount() {
        this.watchMe();

        this.getSubAccountList();

        this.get_client_home_currency()
        this.onChange_filter_balancesheet();
        this.customer_account_type();
        // this.getVendorNames();
        this.vendor_payment_method();
        this.vendor_category();
        this.customer_and_job_list();

        this.vendor_payment_account_type();
        this.default_discount_term();

        if (
            this.state.customer_receive_payment_notification != '' &&
            this.state.customer_receive_payment_notification != null &&
            this.state.customer_receive_payment_notification != undefined
        ) {
            this.get_customer_multipayment_details()
        }


        // if (
        //   this.state.customer_receive_payment_notification != '' &&
        //   this.state.customer_receive_payment_notification != null &&
        //   this.state.customer_receive_payment_notification != undefined
        // ) {
        //   alert('notification1')
        //   this.get_customer_multipayment_details('notification')
        // }
        // else if (
        //   (this.state.edit_customer_receive_payment != '' &&
        //     this.state.edit_customer_receive_payment != null &&
        //     this.state.edit_customer_receive_payment != undefined) &&
        //   (
        //     this.state.customer_receive_payment_notification == '' ||
        //     this.state.customer_receive_payment_notification == null ||
        //     this.state.customer_receive_payment_notification == undefined
        //   )

        // ) {
        //   alert('edit1')
        //   this.get_customer_multipayment_details('edit')
        // } else {
        // }



        // if(f    customer_receive_payment_notification
        //   this.props.location.state != '' &&
        //   this.props.location.state != null &&
        //   this.props.location.state != undefined 
        // ){
        //   this.get_customer_multipayment_details()
        // }




        //script starts
        jQuery(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
            if (!jQuery(this).next().hasClass("show")) {
                jQuery(this)
                    .parents(".dropdown-menu")
                    .first()
                    .find(".show")
                    .removeClass("show");
            }
            var jQuerysubMenu = jQuery(this).next(".dropdown-menu");
            jQuerysubMenu.toggleClass("show");

            jQuery(this)
                .parents("li.nav-item.dropdown.show")
                .on("hidden.bs.dropdown", function (e) {
                    jQuery(".dropdown-submenu .show").removeClass("show");
                });

            return false;
        });

        jQuery(window).on("load", function () {
            jQuery(".mscroll-y").mCustomScrollbar({
                axis: "y",
                scrollEasing: "linear",
                scrollInertia: 600,
                autoHideScrollbar: "true",
                autoExpandScrollbar: "true",
            });
            jQuery(".mscroll-x").mCustomScrollbar({
                axis: "x",
                scrollEasing: "linear",
                scrollInertia: 600,
                autoHideScrollbar: "true",
                autoExpandScrollbar: "true",
            });

            jQuery(".ib-scroll").mCustomScrollbar({
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

            window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

            jQuery(".dis-link").click(function () {
                jQuery(this).toggleClass("active");
                jQuery(".discount-wrap").slideToggle();
            });
        });



        require("jquery-mousewheel");
        require("malihu-custom-scrollbar-plugin");

        jQuery(".item-listwrap").mCustomScrollbar({
            scrollEasing: "linear",
            scrollInertia: 600,
            scrollbarPosition: "outside",
        });

        jQuery(".label-enclose .label span").click(function () {
            //jQuery('.label-enclose .label').removeClass('active')
            jQuery(this).parent(".label-enclose .label").addClass("active");
        });
        jQuery(".label-enclose .label a").click(function () {
            jQuery(this).parent(".label-enclose .label").removeClass("active");
        });
    }



    // calculation starts

    payDue = amnt => {
        this.state.amount_of_payment_used = 0;
        if (this.state.creditList) {
        }
        let ttl = this.state.amount_of_payment;
        let noOfInvoices = this.state.vendor_invoicelist.length

        jQuery('#due_of_invoice0').html()
        this.setState({ isUnused: false, unused_amt: 0 })
        if (noOfInvoices != '' && noOfInvoices != undefined) {

            this.state.vendor_invoicelist.map((item, i) => {

                let amt = Number(item.open_balance_foreign_currency) - ((this.state[`discount_amount${i}`]) ? Number(this.state[`discount_amount${i}`]) : 0) - ((this.state[`credit_amount${i}`]) ? Number(this.state[`credit_amount${i}`]) : 0);
                //console.log("amt", amt);


                // this.setState({ [`inv_check${i}`]: true});
                if ((amt != 0) && (amt <= ttl)) {
                    this.setState({ [`invoice_due${i}`]: amt, [`inv_check${i}`]: ttl > 0 ? true : false });
                    this.state.amount_of_payment_used = this.state.amount_of_payment_used + Number(amt);
                    ttl = Number(ttl) - Number(amt);
                    // jQuery('#invoice_chekbox'+ i).prop('checked', true);
                } else {
                    if (amt === 0) {
                        this.setState({ [`invoice_due${i}`]: amt, [`inv_check${i}`]: true });
                        this.state.amount_of_payment_used = this.state.amount_of_payment_used + Number(amt);
                    } else {
                        this.setState({ [`invoice_due${i}`]: ttl, [`inv_check${i}`]: ttl > 0 ? true : false });
                        this.state.amount_of_payment_used = this.state.amount_of_payment_used + Number(ttl);
                    }
                    ttl = 0;
                }
            })
        }
        setTimeout(
            function () {
                this.sumTotal()
                // this.clearDue()
            }
                .bind(this),
            3000
        );
    }

    clearDue = y => {

        let fisrtEle = jQuery('#invoice_due0').html()
        if (fisrtEle === undefined || fisrtEle === '' || fisrtEle === '0.00') {
            this.state.vendor_invoicelist.forEach((itm, i) => {
                jQuery('#invoice_chekbox' + i).prop('checked', false)
                jQuery('#invoice_due' + i).html('')
            })
            // this.sumTotal()
        }
        // let Due_Total = Number(this.state.totalDueFromApi)
        let Due_Total = Number(jQuery('#total2').html())
        let Payment_total = Number(jQuery('#total3').html())
        let amountEntered = Number(jQuery('#getEntredAmnt').val())
        if (jQuery('#appliedcredits').html() != '') {
            var credittotal = Number(isNaN(jQuery('#appliedcredits').html() != true) && jQuery('#appliedcredits').html() != undefined && jQuery('#appliedcredits').html() != '' ? jQuery('#appliedcredits').html() : 0)
        } else {
            var credittotal = 0
        }

        if (y === 'x') {
        }
        // //console.log('111paymenttotal',this.state.amount_of_payment)
        // //console.log('111paymenttotal1',Due_Total)
        // //console.log('111paymenttotal1', this.state.TotalDiscountAmount);
        // //console.log('111paymenttotal1', this.state.TotalCreditAmount);
        // //console.log('111paymenttotal2',(Number(this.state.amount_of_payment) + this.state.TotalCreditAmount + this.state.TotalDiscountAmount) < Due_Total)

        if ((Number(this.state.amount_of_payment) + this.state.TotalCreditAmount + this.state.TotalDiscountAmount) < Due_Total && Due_Total) {
            let under_amt = Due_Total - (Number(this.state.amount_of_payment) + Number(this.state.TotalCreditAmount) + Number(this.state.TotalDiscountAmount))
            // alert(under_amt)
            this.setState({
                over: false,
                under: true,
                option: '1',

                under_amt: under_amt.toFixed(2),
                overPay: ''
            })
        }
        if ((Number(this.state.amount_of_payment) + + this.state.TotalCreditAmount + this.state.TotalDiscountAmount) > Due_Total && Due_Total) {
            let overPay = Number(this.state.amount_of_payment) - (Due_Total + Number(this.state.TotalCreditAmount) + Number(this.state.TotalDiscountAmount))
            // alert(overPay)
            this.setState({
                over: true,
                under: false,
                option: '3',
                under_amt: '',
                overPay: overPay.toFixed(2)
            })
        }
        if (Number(this.state.amount_of_payment) - Due_Total == 0 || this.state.amount_of_payment == 0) {
            this.setState({
                over: false,
                under: false,
                under_amt: '',
                overPay: ''
            })
        }


    };


    defaultcategorylist_onchang = (dum, val, id) => {
        this.onChange_filter_balancesheet();
        this.setState({ rec_acc: id })
        jQuery("#received_account").val(id);
    }

    sumTotal = () => {
        var sum_of_original = []
        var sum_of_due = []
        var sum_of_payment = []
        var invoiceListArray = []
        var creditTotal = []
        var discountTotal = []
        var selectedCreditList = []
        var Creditamount = []
        var discount_array = []
        var credit_list = []


        this.state.vendor_credit_list.map((item, i) => {

            credit_list.push({
                credit_id: item.credit_id ? item.credit_id : 0,
                credit_amount_use: this.state[`credit_to_be_use${i}`] ? this.state[`credit_to_be_use${i}`] : 0,
                credit_memo_type: item.credit_memo_type ? item.credit_memo_type : 0
            })
        })



        this.state.vendor_invoicelist.map((item, i) => {
            let discount = {
                discount_amount: this.state[`discount_amount_temp${i}`] ? this.state[`discount_amount_temp${i}`] : 0,
                discount_account: this.state[`discount_account_type_temp${i}`] ? this.state[`discount_account_type_temp${i}`] : 0,
                discount_id: item.discount_id ? item.discount_id : 0,
                old_discount_foreign_currency: item.old_discount_foreign_currency ? item.old_discount_foreign_currency : 0,
                invoice_id: item.id,
                invoice_account: item.invoice_account,
                invoice_exchange_rate: item.invoice_exchange_rate
            }
            discount_array.push(discount)
        })

        this.state.vendor_invoicelist &&
            this.state.vendor_invoicelist.forEach((itm, i) => {

                sum_of_original.push(
                    Number(
                        jQuery('#original' + i).html() != '' &&
                            jQuery('#original' + i).html() != undefined
                            ? jQuery('#original' + i).html()
                            : 0
                    )
                )



                sum_of_due.push(
                    Number(
                        jQuery('#due_of_invoice' + i).html() != undefined &&
                            jQuery('#due_of_invoice' + i).html() != ''
                            ? jQuery('#due_of_invoice' + i).html()
                            : 0
                    )
                )
                sum_of_payment.push(
                    Number(
                        jQuery('#invoice_due' + i).html() != undefined &&
                            jQuery('#invoice_due' + i).html() != ''
                            ? jQuery('#invoice_due' + i).html()
                            : 0
                    )
                )


                discountTotal.push(
                    Number(
                        jQuery('#total_discount_amount' + i).html() != undefined &&
                            jQuery('#total_discount_amount' + i).html() != ''
                            ? jQuery('#total_discount_amount' + i).html()
                            : 0
                    )
                )

                creditTotal.push(
                    Number(
                        jQuery('#total_credit_amount' + i).html() != undefined &&
                            jQuery('#total_credit_amount' + i).html() != ''
                            ? jQuery('#total_credit_amount' + i).html()
                            : 0
                    )
                )
                //  this.makeInvoiceArray()

                if (jQuery('#creditAmntIDhidden' + i).val() != '') {

                }
                // if (jQuery('#creditAmntIDhidden' + i).val() != '') {
                //   selectedCreditList.push({
                //     credit_id: jQuery('#creditAmntIDhidden' + i).val(),
                //     credit_amount_use:Number( jQuery('#creditAmnt' + i).html()!=undefined &&  jQuery('#creditAmnt' + i).html()!=''? jQuery('#creditAmnt' + i).html():0)
                //   })


                // }
                //  Creditamount =
                // _(selectedCreditList)
                //     .groupBy('credit_id')
                //     .map((objs, key) => ({
                //         'credit_id': key,
                //         'credit_amount_use': _.sumBy(objs, 'credit_amount_use')
                //     }))
                //     .value();

                this.state.invoiceListArray = [];
                this.state.vendor_invoicelist.map((item, i) => {
                    let exampleObj = {
                        invoice_id: item.id,
                        old_credit_amount_foreign_currency: item.old_credit_amount_foreign_currency,
                        old_discount_amount_foreign_currency: item.old_discount_amount_foreign_currency,
                        payment_id: item.payment_id ? item.payment_id : 0,
                        oringinal_amount: jQuery('#original' + i).html(),
                        amount_due: jQuery('#due_of_invoice' + i).html(),
                        payment_amount: this.state[`invoice_due${i}`],
                        discount_amount: this.state[`discount_amount${i}`] ? this.state[`discount_amount${i}`] : 0,

                        // invoice_account:jQuery("#invoice_account" + i).val() , selected_account_id
                        invoice_account: item.invoice_account,
                        invoice_exchange_rate: jQuery("#invoice_exchange_rate" + i).val(),

                        // credit_id:  jQuery("#credit_id" + i).html() ? jQuery("#credit_id" + i).html() : 0 ,
                        credit_id: jQuery("#invoice_credit" + i).val() ? jQuery("#invoice_credit" + i).val() : 0,
                        credit_amount_to_use: this.state[`credit_amount${i}`] ? this.state[`credit_amount${i}`] : 0
                        // credit_id:
                        //   jQuery('#creditAmntIDhidden' + i).val() != ''
                        //     ? Number(jQuery('#creditAmntIDhidden' + i).val())
                        //     : 0,
                        // credit_amount_to_use:
                        //   jQuery('#creditAmnt' + i).html() != undefined &&
                        //   jQuery('#creditAmnt' + i).html() != ''
                        //     ? jQuery('#creditAmnt' + i).html() 
                        //     : 0
                    }
                    // if( jQuery('#invoice_chekbox' + i).prop('checked')){

                    this.state.invoiceListArray.push(exampleObj)
                    // }
                })
            });


        //console.log('testme', this.state.invoiceListArray)

        let total1 = sum_of_original.reduce(function (a, b) {
            return a + b
        }, 0)
        let total2 = sum_of_due.reduce(function (a, b) {
            return a + b
        }, 0)
        let total3 = sum_of_payment.reduce(function (a, b) {
            return a + b
        }, 0)
        let CreditTotal = creditTotal.reduce(function (a, b) {
            return a + b
        }, 0)
        let DiscountTotal = discountTotal.reduce(function (a, b) {
            return a + b
        }, 0)

        jQuery('#total1').html(total1.toFixed(2))
        jQuery('#total2').html(total2.toFixed(2))
        // jQuery('#total3').html(total3.toFixed(2))
        //  jQuery('.appliedcredits').html(CreditTotal)

        this.setState({
            credit_list: credit_list,
            discount_array: discount_array,
            selectedCreditList: Creditamount,
            // invoiceListArray: invoiceListArray,
            totalDueFromApi: Number(total2),
            totalDuePaid: Number(total3),
            TotalDiscountAmount: Number(DiscountTotal),
            TotalCreditAmount: Number(CreditTotal)
            // total_received_amount : Number(total2 - this.state.amount_of_payment)
        })
        this.findCreditRequiredPlace()
        console.log('gjsdghjgsdjghsdjgjshgdjghs', discount_array)
        setTimeout(
            function () {
                this.clearDue()
            }
                .bind(this),
            2000
        );

    }

    addDiscount = (e) => {

        if (this.state[`discount_amount_temp${this.state.invoiceSeletedId}`] != "" && this.state[`discount_account_type_temp${this.state.invoiceSeletedId}`] != "") {
            this.setState({ [`discount_amount${this.state.invoiceSeletedId}`]: this.state[`discount_amount_temp${this.state.invoiceSeletedId}`], [`discount_account_type${this.state.invoiceSeletedId}`]: this.state[`discount_account_type_temp${this.state.invoiceSeletedId}`] })
            jQuery('.discount-wrap').slideToggle();
            setTimeout(
                function () {
                    this.sumTotal()
                    // this.clearDue()
                }
                    .bind(this),
                2000
            );
        } else {
            this.setState({ [`discount_amount_error${this.state.invoiceSeletedId}`]: true, [`discount_account_error${this.state.invoiceSeletedId}`]: true })
        }
        // //console.log("adddiscount" , this.state.discount_amount2);

    }

    // handleCreditChange = (checked, row, credit_value) => {
    //   let total_amount = 0;
    //   var credit_id_used = ''


    //   this.state.vendor_credit_list.map((item, i) => {


    //     if ((checked === true) && (Number(row) === i)) {
    //       //console.log('yes', credit_value)
    //       this.setState({ [`credit_to_be_use${i}`]: credit_value });
    //       total_amount = total_amount + Number(credit_value)
    //       credit_id_used = item.credit_id
    //       // this.state.selectedCreditList.push({
    //       //           credit_id: item.id,
    //       //           credit_amount_use:credit_value
    //       //         })
    //     }
    //     if ((checked === false) && (Number(row) === i)) {
    //       this.setState({ [`credit_to_be_use${i}`]: 0 })
    //       total_amount = total_amount - Number(credit_value)
    //       credit_id_used = ''
    //     }
    //   })
    //   this.setState({ total_amount: total_amount, credit_id_used: credit_id_used },

    //     () => {
    //       setTimeout(
    //         () => this.handleCreditCal(total_amount, credit_id_used)
    //         ,
    //         2000
    //       )
    //     }

    //   )

    // }

    selectRow = (id) => {
        // //console.log(id);
        // this.state.invoiceSeletedId = id;

        this.setState({ invoiceSeletedId: id, [`selectedRow${id}`]: this.state[`selectedRow${id}`] == true ? false : true })
    }

    handleAmountChange = () => {
        let totalAmount = 0;
        let noOfInvoices = this.state.vendor_invoicelist.length
        if (noOfInvoices != '' && noOfInvoices != undefined) {

            // let remaining_to_paid = Number(item.open_balance_foreign_currency) - ((this.state[`discount_amount${i}`]) ? Number(this.state[`discount_amount${i}`]) : 0) - ((this.state[`credit_amount${i}`]) ? Number(this.state[`credit_amount${i}`]) : 0);

            for (let i = 0; i < noOfInvoices; i++) {
                //console.log("check", this.state[`invoice_due${i}`]);
                totalAmount = totalAmount + Number((this.state[`invoice_due${i}`]) ? this.state[`invoice_due${i}`] : 0);
            }
            //console.log("check1", totalAmount);
            this.setState({ amount_of_payment_used: totalAmount });

            // this.state.amount_of_payment = totalAmount;
            // this.payDue();
            setTimeout(
                function () {
                    this.sumTotal()
                    // this.clearDue()
                }
                    .bind(this),
                2000
            );
        }
    }

    handleCreditCal = (total_amount, credit_id_used) => {

        var credit_list = []

        let ttl = total_amount;
        //console.log("total_amount", total_amount)


        this.state.vendor_invoicelist.map((item, i) => {

            if (i == this.state.invoiceSeletedId) {

                let amt = Number(item.open_balance_foreign_currency) - ((this.state[`discount_amount${i}`]) ? Number(this.state[`discount_amount${i}`]) : 0);

                if (amt <= ttl) {
                    this.setState({ [`credit_amount${i}`]: amt })
                    ttl = Number(ttl) - Number(amt);
                    jQuery("#invoice_credit" + i).val(credit_id_used)
                } else {
                    this.setState({ [`credit_amount${i}`]: ttl })
                    ttl = 0;
                    jQuery("#invoice_credit" + i).val(credit_id_used)
                }
            }
        })

        setTimeout(
            function () {
                this.sumTotal()
                // this.clearDue()
            }
                .bind(this),
            2000
        );
        //   setTimeout(
        //     function() {
        //       this.payDue();
        //     }
        //     .bind(this),
        //     1000
        // );

    }







    findCreditRequiredPlace = () => {
        var rowFind = [];
        this.setState({ rowsNeededCredits: rowFind });
        var credittotal = 0;
        var originalTot = 0;
        var totalduesum = 0;
        this.state.vendor_invoicelist.forEach((item, i) => {
            let due_on_invoice = Number(jQuery("#due_of_invoice" + i).html());
            let paidduetoinvoice = Number(jQuery("#invoice_due" + i).html());
            credittotal =
                credittotal + jQuery("#creditAmnt" + i).html() != undefined &&
                    jQuery("#creditAmnt" + i).html() != ""
                    ? jQuery("#creditAmnt" + i).html()
                    : 0;

            var creditAppiled = Number(
                jQuery("#creditAmnt" + i).html() != "" &&
                    jQuery("#creditAmnt" + i).html() != undefined
                    ? jQuery("#creditAmnt" + i).html()
                    : 0
            );
            if (paidduetoinvoice + creditAppiled < due_on_invoice) {
                rowFind.push(i);
            }

            // if (paidduetoinvoice + creditAppiled > 0) {
            //   jQuery("#invoice_chekbox" + i).prop("checked", true);
            // }
            if (jQuery("#invoice_chekbox" + i).prop("checked")) {
                // alert(jQuery('#creditAmnt' + i).html())

                originalTot =
                    originalTot +
                    Number(
                        jQuery("#original" + i).html() != undefined &&
                            jQuery("#original" + i).html() != ""
                            ? jQuery("#original" + i).html()
                            : 0
                    );
                totalduesum =
                    totalduesum +
                    Number(
                        jQuery("#due_of_invoice" + i).html() != undefined &&
                            jQuery("#due_of_invoice" + i).html() != ""
                            ? jQuery("#due_of_invoice" + i).html()
                            : 0
                    );
            }
        });
        this.setState({ credittotal: credittotal, totalDueFromApi: totalduesum });

        jQuery("#setcredit").html(Number(credittotal));
        //console.log("Number(credittotal)", Number(credittotal));
        // jQuery('#total1').html(originalTot.toFixed(2))
        // jQuery('#total2').html(totalduesum.toFixed(2))
    };


    convert_date = (date) => {
        if (date != undefined) {
            var array = date.split("/");
            var date_formated = array[2] + "-" + array[1] + "-" + array[0];
        }
        return date_formated;
    };

    accountTypeSelection = (e) => {
        this.state.customer_account_type.forEach((item, i) => {
            if (item.id == e.target.value) {
                this.setState({
                    selected_account_id: item.id,
                    selected_currency: item.id,
                    currency_selected: item.currency,
                });
            }
        }, setTimeout(() => {
            this.handleChanges()
        }, 500)

        );
    };

    // calculation ends



    render() {
        console.log(this.state.currency_list)
        // let vender_id =this.state.discount_terms
        // this.vendor_invoicelist(vender_id)
        console.log("vendor_account_typeqb", this.state.account_id);

        let get_file_path,
            dis_file_path = [],
            item_file_path = [],
            attach_file_path,
            options = [],
            page_no = 1,
            items_limit = 10,
            no_items;

        ////console.log('response_stus',this.state.response_stus);

        // if(this.state.response_stus === 0){
        //     no_items = "<span className='no_rec'>No items found!</span>"
        // } else{
        //     no_items = ''
        // }

        if (
            this.state.item_details.user_image !== "" &&
            this.state.item_details.user_image !== "null"
        ) {
            var item_user_image = this.state.item_details.user_image;
        } else {
            var item_user_image = "images/user-img-1.png";
        }

        ////console.log('item_files', this.state.item_file_path);
        if (
            this.state.item_file_path !== "" &&
            this.state.item_file_path !== "null"
        ) {
            item_file_path = [];
            var split_file_path = this.state.item_file_path.toString().split(",");
            var split_file_id = this.state.item_file_id.toString().split(",");
            if (split_file_path.length >= 1) {
                for (var i = 0; i < split_file_path.length; i++) {
                    var get_file_url = split_file_path[i];
                    var split_file_name = split_file_path[i].toString().split("/");
                    var arr_reverse = split_file_name.reverse();

                    var get_file_name = arr_reverse[0].substring(
                        arr_reverse[0].length - 15,
                        arr_reverse[0].length
                    );

                    var get_file_ext = arr_reverse[0].substring(
                        arr_reverse[0].lastIndexOf(".") + 1,
                        arr_reverse[0].length
                    );
                    if (get_file_ext === "pdf") {
                        var file_icon = "images/pdf-icon.png";
                    } else {
                        var file_icon = "images/img-icon.png";
                    }

                    ////console.log('pdf_file_link',get_file_url);

                    if (get_file_ext === "pdf") {
                        item_file_path.push(
                            <div className="attach-item">
                                <a
                                    onClick={this.dataTaggingFunc.bind(
                                        this,
                                        this.state.list_id,
                                        split_file_id[i]
                                    )}
                                    className="img-wrap"
                                    data-id={split_file_id[i]}
                                >
                                    <iframe
                                        src={get_file_url}
                                        id="pdf_thumb_viewer"
                                        frameborder="0"
                                        scrolling="no"
                                        width="190"
                                        height="190"
                                    ></iframe>
                                    <span className="go">
                                        <img
                                            src="../images/next-arrow-white.svg"
                                            className="mCS_img_loaded"
                                        />
                                    </span>
                                </a>
                                <a
                                    onClick={this.dataTaggingFunc.bind(
                                        this,
                                        this.state.list_id,
                                        split_file_id[i]
                                    )}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={get_file_url}
                                    data-id={split_file_id[i]}
                                >
                                    <span>{get_file_name}</span>
                                    <img
                                        src="../images/download-icon.svg"
                                        alt="Icon"
                                        className="mCS_img_loaded"
                                    />
                                </a>
                            </div>
                        );
                    } else {
                        item_file_path.push(
                            <div className="attach-item">
                                <a
                                    onClick={this.dataTaggingFunc.bind(
                                        this,
                                        this.state.list_id,
                                        split_file_id[i]
                                    )}
                                    className="img-wrap"
                                    data-id={split_file_id[i]}
                                >
                                    <img
                                        className="img-responsive mCS_img_loaded"
                                        src={get_file_url}
                                        alt={get_file_ext}
                                    />
                                    <span className="go">
                                        <img
                                            src="../images/next-arrow-white.svg"
                                            className="mCS_img_loaded"
                                        />
                                    </span>
                                </a>
                                <a
                                    onClick={this.dataTaggingFunc.bind(
                                        this,
                                        this.state.list_id,
                                        split_file_id[i]
                                    )}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={get_file_url}
                                    data-id={split_file_id[i]}
                                >
                                    <span>{get_file_name}</span>
                                    <a href={get_file_url} download={get_file_name}>
                                        {get_file_name}
                                        <img
                                            src="../images/download-icon.svg"
                                            alt="Icon"
                                            className="mCS_img_loaded"
                                        />
                                    </a>
                                </a>
                            </div>
                        );
                    }
                }
            }
        }

        options.push(<option>ORG-250</option>);

        return (
            <div ref={this.myDivToFocus}>
                <div className="container-fluid">
                    <div className="row">
                        <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />

                        <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
                            <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                                <div className="nav-brand-res visible-xs">
                                    <img
                                        className="img-responsive"
                                        src="../images/logo-icon.png"
                                        alt="LogoIcon"
                                    />
                                </div>
                                <a
                                    href="javascript:;"
                                    class="back hidden-xs"
                                    onClick={() => this.props.history.goBack()}
                                >
                                    <img src="../images/back-arrow-blue.svg" />
                                </a>
                                {/* <span className='page-title hidden-xs'>Inbox</span> */}
                                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                                    <li>
                                        <a
                                            href="javascript: ;"
                                            onClick={this.routedChange.bind(this, "customers-list")}
                                        >
                                            Customer
                    </a>
                                    </li>
                                    <li>Receive Payment</li>
                                </ul>
                                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
                            </div>

                            <div className="content-top col-md-12 col-xs-12">
                                <form className="custom-form mh row">
                                    <div className="form-group col-md-3 col-xs-12">
                                        <label>Currency</label>
                                        <select
                                            className="selectpicker form-control"
                                            data-live-search="true"
                                            title={`Choose`}
                                            data-width="100%"
                                            value={this.state.selectedCurrency}
                                            onChange={(e) => { this.setState({ selectedCurrency: e.target.value }, this.findInSubAccountList(e.target.value)) }
                                            }
                                        >

                                            {this.state.currency_list &&
                                                this.state.currency_list.map((item) => {
                                                    if (item.code !== "ALL") {
                                                        return <option value={item}> {item}</option>;
                                                    }
                                                })}
                                        </select>
                                    </div>

                                    <div className="form-group col-md-3 col-sm-4 no-edit">
                                        <label>Accounts</label>
                                        <div>

                                            <span
                                                className="form-control w-calc"
                                            >
                                                {this.state.account_id_name}
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div
                    className="form-group col-md-3 col-sm-4 no-edit"

                  >
                    <label>Accounts{"  "}</label>
                    <div>
                      <select
                        className="selectpicker form-control "
                        id="account_id"
                        data-live-search="true"
                        title={`Choose`}
                        data-width="100%"
                        onChange={(e) => { }}
                      // disabled={true}
                      >
                        {this.state.SubAccountList != undefined &&
                          this.state.SubAccountList.map((item, index) => {
                            //console.log("ggggg", this.state.response);
                            return (

                              <option value={item.id}>{item.name}</option>
                            );
                          })}
                      </select>
                    </div>

                  </div> */}



                                    <div className="col-md-3" style={{ display: 'none' }}>
                                        <div className="form-group">
                                            <label>A/R Account</label>
                                            <select
                                                className="selectpicker form-control add-new"
                                                // id="ar_account"
                                                data-live-search="true"
                                                title="Choose account"
                                                value={this.state.selected_account_id}
                                                // onChange={e => {
                                                //   this.setState({
                                                //     preferred_deliveryMethod: e.target.value
                                                //   })
                                                // }}
                                                onChange={(e) => {
                                                    this.accountTypeSelection(e);
                                                }}
                                            >
                                                <option selected={true}>Choose</option>
                                                {this.state.customer_account_type &&
                                                    this.state.customer_account_type.map((item) => {
                                                        // var selected = "selected";

                                                        return (
                                                            <React.Fragment>
                                                                <option
                                                                    // selected={selected}
                                                                    data-status={item.id}
                                                                    value={item.id}
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-md-3 bal-txt-wrap">
                                        <label className="bal-txt">
                                            Customer Balance:{" "}
                                            <strong>
                                                {this.state.currency_selected}{" "}
                                                {jQuery('#total2').html()}
                                                {/* {this.state.overallcustomerBal} */}
                                            </strong>
                                        </label>
                                    </div>
                                </form>
                            </div>

                            <div className="main-content col-md-12 col-xs-12">
                                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                                    <div className="col-md-12 col-xs-12 block-shadow pad-b-no mar-ver">
                                        <form className="custom-form invoice-form">
                                            <div className="row">
                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label>Payer Name</label>

                                                    <select
                                                        className="selectpicker form-control add-new"
                                                        data-live-search="true"
                                                        title="Choose customer"
                                                        id="variable_pay_type"
                                                        value={this.state.payor_name}
                                                        // onChange={e => {
                                                        //   if (e.target.event != '') {
                                                        //     this.setSt
                                                        //   } else {
                                                        //     this.setState({ iscustomer_name: true })
                                                        //   }
                                                        // }}

                                                        onChange={(e) => {
                                                            if (e.target.value == 'add_new') {
                                                                window.open("/add-new-customer", "_blank")
                                                            } else {
                                                                this.handleChange();
                                                            }

                                                        }}

                                                    // onChange={event => {
                                                    //   this.vendor_invoicelist(event.target.value)
                                                    // }}
                                                    >
                                                        <option value={'add_new'}>Add New Customer</option>
                                                        {this.state.customer_and_job_list &&
                                                            this.state.customer_and_job_list.map((item) => {
                                                                return (
                                                                    <option
                                                                        value={item.id}
                                                                        data-status={item.id}
                                                                        data-name={item.name}
                                                                    >
                                                                        {item.name}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label>Job List</label>
                                                    {this.state.customer_and_job_lists ? (
                                                        <select
                                                            className="selectpicker form-control add-new"
                                                            data-live-search="true"
                                                            title="Choose a job"
                                                            id="variable_pay_type_job"
                                                            value={this.state.job}
                                                            // onChange={() => {
                                                            //   this.handleChanges();
                                                            // }}

                                                            onChange={(e) => {
                                                                if (e.target.value == 'add_new') {
                                                                    if (this.state.payor_name) {
                                                                        localStorage.setItem("selected_customer_id", this.state.payor_name);
                                                                        window.open("/add-job", "_blank")
                                                                    } else {
                                                                        alert('Please choose a customer first')
                                                                    }


                                                                } else {
                                                                    this.handleChanges();
                                                                }

                                                            }}
                                                        >
                                                            <option value={'add_new'}>Add New Job</option>
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
                                                    ) : (
                                                        " "
                                                    )}
                                                </div>
                                                {/* <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                          <label>Children</label>
                          {this.state.customer_and_job_listss ? (
                            <select
                              className="selectpicker form-control add-new"
                              data-live-search="true"
                              title="Choose child job"
                              id="variable_pay_type_jobs"
                              onChange={() => {
                                this.handleChangess();
                              }}
                            >
                              <option>Create New </option>
                              {this.state.customer_and_job_listss &&
                                this.state.customer_and_job_listss.map(
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
                          ) : (
                            " "
                          )}
                        </div> */}
                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label>Date of Payment</label>
                                                    <div
                                                        className="input-group date mar-t-no"
                                                        data-date-format="dd/mm/yyyy"
                                                    >
                                                        <input type="text" className="form-control" autoComplete='off' id="date"
                                                            //  value={this.state.date} 
                                                            onBlur={(event) => { this.dateChange(event.target.value) }} />
                                                        {/* <input
                              type="text"
                              className="form-control"
                              id="date"
                            /> */}
                                                        <div className="input-group-addon">
                                                            <img src="images/calendar-icon.svg" alt="icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group exchange-col col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label className="mar-btm">Amount of Payment</label>
                                                    <div className="w-100 res-sm-mt-0">
                                                        <input
                                                            type="text"
                                                            name="exchangeRate"
                                                            className="form-control"
                                                            id="getEntredAmnt"
                                                            value={this.state.amount_of_payment}
                                                            placeholder='0'
                                                            onChange={(e) => {
                                                                this.state.amount_of_payment = e.target.value
                                                                this.setState({ amount_of_payment: e.target.value }, () => {
                                                                    if (this.state.auto_apply) {
                                                                        this.payDue(this.state.amount_of_payment)

                                                                        if (this.state.vendor_invoicelist.length == 0) {

                                                                            this.setState({ isUnused: true, unused_amt: this.state.amount_of_payment })
                                                                        }

                                                                    } else {
                                                                        if (this.state.vendor_invoicelist.length == 0) {
                                                                            this.setState({ isUnused: true, unused_amt: this.state.amount_of_payment })
                                                                        }
                                                                        this.sumTotal()

                                                                        // this.clearDue()
                                                                    }
                                                                })
                                                                // //console.log('kiu1',e.target.value)
                                                                // this.setState({ amount_of_payment : e.target.value},
                                                                //   setTimeout(
                                                                //     ()=> {
                                                                // //console.log('kiu2',this.state.amount_of_payment)

                                                                //       this.payDue(this.state.amount_of_payment)
                                                                //     }
                                                                //    ,
                                                                //     1000
                                                                // )


                                                                //  )

                                                            }}
                                                        />
                                                        <span className="label">
                                                            {this.state.currency_selected}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label>Mode of Payment</label>
                                                    {/* <select className="selectpicker form-control">
                            {this.state.vendor_payment_method &&
                              this.state.vendor_payment_method.map(item => {
                                return (
                                  <option value={item.id} data-status={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                          </select> */}
                                                    <select
                                                        className="selectpicker form-control add-new"
                                                        data-live-search="true"
                                                        title="Choose..."
                                                        id="modeofpayment_type"
                                                        value={this.state.pay_method}
                                                        onChange={(e) => {
                                                            if (e.target.value == "1qw") {
                                                                window
                                                                    .jQuery("#add_new_payment")
                                                                    .modal("show");
                                                                jQuery("#payment_method option")
                                                                    .prop("selected", false)
                                                                    .trigger("change");
                                                            }
                                                        }}
                                                    >
                                                        <option value="1qw">Add new</option>
                                                        {this.state.vendor_payment_method &&
                                                            this.state.vendor_payment_method.map((item) => {
                                                                return (
                                                                    <option value={item.id} data-status={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label>Payment Reference</label>
                                                    <input
                                                        type="text"
                                                        name="pay-ref"
                                                        id="paymentreference"
                                                        className="form-control"
                                                        value={this.state.reference}
                                                        onChange={(e) => this.setState({ reference: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label>Received Account</label>
                                                    <select
                                                        className="selectpicker form-control add-new"
                                                        data-live-search="true"
                                                        id="received_account"
                                                        value={this.state.rec_acc}
                                                        title="Choose..."
                                                        onChange={(e) => {
                                                            if (e.target.value == "1e") {
                                                                jQuery(
                                                                    `#categry_id option`
                                                                )
                                                                    .prop("selected", false)
                                                                    .trigger("change");

                                                                window
                                                                    .jQuery("#pop-modal")
                                                                    .modal("show");

                                                            } else {
                                                                this.setState({ rec_acc: e.target.value })
                                                                this.third_party();
                                                            }
                                                        }}
                                                    >
                                                        {/* <option>Choose</option> */}
                                                        <option value="1e">Add new</option>
                                                        {this.state.vendor_payment_account_type &&
                                                            this.state.vendor_payment_account_type.map(
                                                                (item) => {
                                                                    return (
                                                                        <option
                                                                            value={item.id}
                                                                            data-status={item.account_type_id}
                                                                            data-name={item.name}
                                                                        >
                                                                            {item.name}
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                    </select>
                                                </div>
                                                {this.state.received_account ? (
                                                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                        <label>Third Party Account Name</label>
                                                        <select
                                                            className="selectpicker form-control add-new"
                                                            data-live-search="true"
                                                            title="Choose..."
                                                            id="third_party_id"
                                                            onChange={(e) => this.setState({ third_party_id: e.target.value })}
                                                            value={this.state.third_party_id}
                                                        >
                                                            {/* <option>
                                <img src="images/plus-icon.svg" alt="img" />
                                Add new
                              </option> */}
                                                            <option>choose...</option>
                                                            {this.state.third_party_name &&
                                                                this.state.third_party_name.map((item) => {
                                                                    return (
                                                                        <option
                                                                            value={item.id}
                                                                            data-status={item.id}
                                                                            data-name={item.customer_name}
                                                                        >
                                                                            {item.customer_name}
                                                                        </option>
                                                                    );
                                                                })}
                              third_party_name
                            </select>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}

                                                {this.state.received_accounts ? (
                                                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                        <label>Third Party Account Name</label>
                                                        <select
                                                            className="selectpicker form-control add-new"
                                                            data-live-search="true"
                                                            title="Choose..."
                                                            id='third_party_vendor'
                                                            onChange={(e) => this.setState({ third_party_id: e.target.value })}
                                                            value={this.state.third_party_id}
                                                        >
                                                            <option>
                                                                {/* <img src="images/plus-icon.svg" alt="img" /> */}
                                Add new
                              </option>
                                                            {this.state.third_party_name &&
                                                                this.state.third_party_name.map((item) => {
                                                                    return (
                                                                        <option
                                                                            value={item.id}
                                                                            data-status={item.id}
                                                                            data-name={item.customer_name}
                                                                        >
                                                                            {item.vendor_name}
                                                                        </option>
                                                                    );
                                                                })}
                              third_party_name
                            </select>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label>Description</label>
                                                    <input
                                                        type="text"
                                                        name="desc"
                                                        id="descripation"
                                                        className="form-control"
                                                        value={this.state.descripation}
                                                        onChange={(e) => this.setState({ descripation: e.target.value })}

                                                    />
                                                </div>

                                                <div className="form-group exchange-col col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label className="mar-btm">Exchange Rate 1 {''} {this.state.currency_selected}</label>
                                                    <div className="w-100">
                                                        <input
                                                            type="text"
                                                            name="exchangeRate"
                                                            className="form-control"
                                                            id="exchange_rate"
                                                            placeholder={this.state.exchange_rate_temp}
                                                            value={this.state.exchangeRate}
                                                            onChange={(e) => this.setState({ exchangeRate: e.target.value })}
                                                        />
                                                        <span className="label">
                                                            {this.state.currency_selected}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <form className="custom-form form-inline mh col-md-12 col-xs-12 mar-top pad-top">
                                        <div className="row pad-top">
                                            <div className="form-group res-auto-apply">
                                                <label className="custom-checkbox mar-b-no">
                                                    <input type="checkbox" name="" checked={this.state.auto_apply}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                this.setState({ auto_apply: true })
                                                                this.payDue(this.state.amount_of_payment)
                                                            } else {
                                                                this.setState({ auto_apply: false })
                                                            }
                                                        }}
                                                    />{" "}
                          Auto Apply Payment
                          <span className="checkmark"></span>
                                                </label>
                                                <a href="javascript:;" className="dis-link">
                                                    Discounts & Credits
                          <img src="images/down-arrow-blue.svg" alt="icon" />
                                                </a>{"  "}
                                                <label>Available Credits : {this.state.credit_available} </label>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="tab-enclose col-md-12 col-xs-12 discount-wrap">
                                        <div className="row">
                                            <ul className="nav nav-tabs nowrap">
                                                <li role="presentation" className="active">
                                                    <a data-toggle="tab" href="#discount">
                                                        Discount
                          </a>
                                                </li>
                                                <li role="presentation">
                                                    <a data-toggle="tab" href="#credits">
                                                        Credits
                          </a>
                                                </li>
                                            </ul>
                                            <div className="tab-content col-md-12 col-xs-12">
                                                <div id="discount" className="tab-pane fade in active">
                                                    <form className="custom-form mh row">
                                                        {this.state.vendor_invoicelist && this.state.vendor_invoicelist.map((item, i) => {
                                                            if (this.state.invoiceSeletedId === i) {
                                                                // console.log('manojkumar', this.state[`discount_account_type_temp${i}`])
                                                                return (
                                                                    <div>
                                                                        <div className='form-group exchange-col col-lg-3 col-md-6 col-xs-12'>
                                                                            <label className='mar-btm'>
                                                                                Amount of Discount
                                </label>
                                                                            <div className='w-100'>
                                                                                <input
                                                                                    type={this.state.invoiceSeletedId === i ? "number" : "hidden"}
                                                                                    className='form-control'
                                                                                    id={`discount_amount_temp${i}`}
                                                                                    name={`discount_amount_temp${i}`}
                                                                                    defaultValue="0"
                                                                                    value={this.state[`discount_amount_temp${i}`]}
                                                                                    // value={item[this.state.invoiceSeletedId]}
                                                                                    onChange={(e) => {
                                                                                        let entered_amount = e.target.value != '' ? e.target.value : 0

                                                                                        if (Number(entered_amount) > (Number(item.open_balance_foreign_currency) - Number((this.state[`credit_amount${i}`]) ? Number(this.state[`credit_amount${i}`]) : 0))) {
                                                                                            alert("you may not able to enter more amount than amount due")

                                                                                        } else {
                                                                                            let currentTotal = Number(Number(entered_amount) + Number((this.state[`invoice_due${i}`]) ? Number(this.state[`invoice_due${i}`]) : 0) + Number((this.state[`credit_amount${i}`]) ? Number(this.state[`credit_amount${i}`]) : 0))
                                                                                            //console.log('currentTotal', currentTotal, 'entered_amount', entered_amount, 'entered_amount', this.state[`invoice_due${i}`], 'item.open_balance_foreign_currency', item.open_balance_foreign_currency)
                                                                                            if (currentTotal <= Number(item.open_balance_foreign_currency)) {
                                                                                                //console.log('currentTotal1', currentTotal)
                                                                                                this.setState({ [`discount_amount_temp${i}`]: entered_amount, [`inv_check${i}`]: true })
                                                                                            } else {
                                                                                                // this.setState({ [`discount_amount_temp${i}`]: entered_amount, [`invoice_due${i}`]: Number(item.open_balance_foreign_currency) - entered_amount - ((this.state[`credit_amount${i}`]) ? Number(this.state[`credit_amount${i}`]) : 0) })
                                                                                                var inv_amt = Number(item.open_balance_foreign_currency) - ((Number(entered_amount) + Number((this.state[`credit_amount${i}`]) ? Number(this.state[`credit_amount${i}`]) : 0)))
                                                                                                //console.log('currentTotal11', inv_amt)
                                                                                                this.setState({
                                                                                                    [`discount_amount_temp${i}`]: entered_amount, [`invoice_due${i}`]: inv_amt, [`inv_check${i}`]: true
                                                                                                })

                                                                                                setTimeout(
                                                                                                    () => {
                                                                                                        // this.handleAmountChange()
                                                                                                        this.total_paid(inv_amt, i)
                                                                                                    }
                                                                                                    ,
                                                                                                    1000
                                                                                                )

                                                                                                // if (inv_amt > (Number(item.open_balance_foreign_currency) - e.target.value - ((this.state[`credit_amount${i}`]) ? Number(this.state[`credit_amount${i}`]) : 0))) {
                                                                                                //   alert("You may not pay more than Amount Due")
                                                                                                // } else if (this.total_paid(inv_amt, i)) {

                                                                                                //   // alert("You may not pay more than  amount of payment")
                                                                                                // } else {
                                                                                                //   // jQuery('#invoice_due'+ i).html(e.target.value)

                                                                                                //   //console.log('check3', e.target.value)
                                                                                                //   this.setState({ [`invoice_due${i}`]: inv_amt, [`inv_check${i}`]: inv_amt > 0 ? true : false },
                                                                                                //     () => {
                                                                                                //       setTimeout(
                                                                                                //         () => this.handleAmountChange()
                                                                                                //         ,
                                                                                                //         2000
                                                                                                //       )


                                                                                                //     })



                                                                                                // }


                                                                                            }
                                                                                            // this.state[`discount_amount_temp${i}`] = e.target.value;

                                                                                        }
                                                                                    }}
                                                                                />
                                                                                <span className='label'>{this.state.currency_selected}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className='form-group col-lg-3 col-md-6 col-xs-12'>
                                                                            <label>Discount Account</label>
                                                                            <select
                                                                                className='selectpicker form-control'
                                                                                data-live-search='true'
                                                                                // title='Choose...'
                                                                                id={`discount_account_type_temp${i}`}
                                                                                // name={`discount_account_type_temp${i}`}
                                                                                value={this.state[`discount_account_type_temp${i}`]}
                                                                                onChange={(e) => this.setState({ [`discount_account_type_temp${i}`]: e.target.value })}
                                                                            >
                                                                                <option value={''} > {'choose...'}  </option>
                                                                                {this.state.vendor_category &&
                                                                                    this.state.vendor_category.map((item, i) => {
                                                                                        // //console.log('lololol', item)
                                                                                        return (

                                                                                            <option
                                                                                                value={item.id}
                                                                                                data-status={item.id}
                                                                                            // selected={(i = 0) ? selected : null}

                                                                                            >
                                                                                                {item.name}
                                                                                            </option>
                                                                                        )
                                                                                    })}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })}


                                                        <div className="col-md-12 col-xs-12 text-right">
                                                            <button
                                                                type="button"
                                                                className="btn btn-lightgray"
                                                                data-dismiss="modal"
                                                            >
                                                                Cancel
                              </button>
                                                            <button className='btn btn-green' type="button" onClick={() => { this.addDiscount() }} >Ok</button>

                                                        </div>

                                                    </form>
                                                </div>
                                                <div id="credits" className="tab-pane fade in">
                                                    <div className="clearfix">
                                                        <p className="fw-med">Available Credits</p>
                                                        <div
                                                            className="table-responsive"
                                                            style={{ paddingright: "1px" }}
                                                        >
                                                            {this.state.vendor_invoicelist &&
                                                                this.state.vendor_invoicelist.map((item1, selectedRow) => {
                                                                    if (this.state.invoiceSeletedId == selectedRow) {
                                                                        return (
                                                                            <table className="dis-table">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th className="text-center">
                                                                                            <img
                                                                                                className="tick-white"
                                                                                                src="images/tick-big.svg"
                                                                                                alt="icon"
                                                                                            />
                                                                                        </th>
                                                                                        <th>Date</th>
                                                                                        <th>Credit No.</th>
                                                                                        <th className="text-right">
                                                                                            Org Credit Amount
                                  </th>
                                                                                        <th className="text-right">
                                                                                            Credit amount to Use
                                  </th>
                                                                                        <th className="text-right">
                                                                                            Amount to Use
                                  </th>
                                                                                        <th className="text-right">
                                                                                            Credit Balance
                                  </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {this.state.vendor_credit_list &&
                                                                                        this.state.vendor_credit_list.map(
                                                                                            (item, i) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td className='text-center'>
                                                                                                            <label className='custom-checkbox mar-b-no'>
                                                                                                                <input
                                                                                                                    type='checkbox'
                                                                                                                    name=''
                                                                                                                    value={i}
                                                                                                                // checked="checked"
                                                                                                                // onChange={e => this.handleCreditChange(e.target.checked, i, item.available_credits)}


                                                                                                                />
                                                                                                                <span className='checkmark'></span>
                                                                                                            </label>
                                                                                                        </td>
                                                                                                        <td >{item.credit_date}</td>
                                                                                                        <td style={{ display: 'none' }} id={`credit_id${i}`}>{item.credit_id}</td>

                                                                                                        <td >{item.credit_number}</td>
                                                                                                        <td className='text-right'>
                                                                                                            {item.amount}
                                                                                                        </td>
                                                                                                        <td className='text-right'>
                                                                                                            {item.available_credits}
                                                                                                        </td>
                                                                                                        <td className='text-right'>
                                                                                                            <input type={Number} id={`credit_to_be_use${i}${selectedRow}`} name={`credit_to_be_use${i}${selectedRow}`} value={this.state[`credit_to_be_use${i}${selectedRow}`]}
                                                                                                                onChange={
                                                                                                                    e => {
                                                                                                                        let entered_amount = e.target.value == '' ? 0 : Number(e.target.value)
                                                                                                                        // //console.log(e.target.value)
                                                                                                                        if (Number(entered_amount) > (this.state[`usedCreditsRowTotal${i}`] ? Number(this.state[`usedCreditsRowTotal${i}`]) : Number(item.available_credits))) {
                                                                                                                            alert("You may not pay more than Credit Amount")
                                                                                                                        } else if ((Number(this.state[`discount_amount${i}`] ? Number(this.state[`discount_amount${i}`]) : 0) + Number(entered_amount) >
                                                                                                                            item1.open_balance_foreign_currency)) {
                                                                                                                            alert("You may not pay more than Invoice due")
                                                                                                                        } else {
                                                                                                                            this.setState({ [`credit_to_be_use${i}${selectedRow}`]: entered_amount })
                                                                                                                            setTimeout(() => this.credit_onchange(i, selectedRow, item.available_credits), 500)
                                                                                                                            // this.handleCreditChange(true, i, e.target.value)

                                                                                                                            // this.setState({[`credit_to_be_use${i}`] : e.target.value})
                                                                                                                            // let total_amount = 0;
                                                                                                                            // this.state.vendor_credit_list.map((item,i) => {
                                                                                                                            //   total_amount = total_amount + Number(this.state[`credit_to_be_use${i}`])
                                                                                                                            // });
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            />

                                                                                                        </td>
                                                                                                        <td className='text-right'>
                                                                                                            <span id={`creditBal${i}`}>{this.state[`usedCreditsRowTotal${i}`]}</span>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                )
                                                                                            }
                                                                                        )}
                                                                                    <tr>
                                                                                        <td colspan='3' className='text-right'>
                                                                                            Total
                                  </td>
                                                                                        <td className='text-right'>--</td>
                                                                                        <td className='text-right'>--</td>
                                                                                        <td className='text-right'>--</td>
                                                                                    </tr>

                                                                                </tbody>
                                                                            </table>

                                                                        )
                                                                    }
                                                                })}

                                                        </div>
                                                        <div className="col-md-6 pad-no">
                                                            <em className="info-em">
                                                                Of all the credits issued to this vendor, only
                                                                unused credits applicable to this specific
                                                                invoice are displayed above
                              </em>
                                                        </div>
                                                        <div className="col-md-6 text-right pad-no">
                                                            <button className="btn btn-lightgray">
                                                                Clear
                              </button>
                                                        </div>
                                                    </div>

                                                    <div className="clearfix">
                                                        <p className="fw-med">Applied Credits History</p>
                                                        <div
                                                            className="table-responsive"
                                                            style={{ paddingright: "1px" }}
                                                        >
                                                            <table className="dis-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="text-center">
                                                                            <img
                                                                                className="tick-white"
                                                                                src="images/tick-big.svg"
                                                                                alt="icon"
                                                                            />
                                                                        </th>
                                                                        <th>Date</th>
                                                                        <th>Credit No.</th>
                                                                        <th className="text-right">
                                                                            Credit Amount
                                    </th>
                                                                        <th className="text-right">
                                                                            Amount to Use
                                    </th>
                                                                        <th className="text-right">
                                                                            Credit Balance
                                    </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.applied_credit_history &&
                                                                        this.state.applied_credit_history.map(
                                                                            item => {
                                                                                return (
                                                                                    <tr>
                                                                                        <td className='text-center'>
                                                                                            <label className='custom-checkbox mar-b-no'>
                                                                                                <input
                                                                                                    type='checkbox'
                                                                                                    name=''
                                                                                                    checked='checked'
                                                                                                />
                                                                                                <span className='checkmark'></span>
                                                                                            </label>
                                                                                        </td>
                                                                                        <td>{item.credit_date}</td>
                                                                                        <td>{item.credit_id}</td>
                                                                                        <td className='text-right'>
                                                                                            {item.amount}
                                                                                        </td>
                                                                                        <td className='text-right'>
                                                                                            {item.amount_to_us}
                                                                                        </td>
                                                                                        <td className='text-right'>
                                                                                            {item.credit_balance}
                                                                                        </td>
                                                                                        {/* <td className='text-right'>--</td> */}
                                                                                    </tr>
                                                                                )
                                                                            }
                                                                        )}
                                                                    <tr>
                                                                        <td colspan='3' className='text-right'>
                                                                            Total
                                    </td>
                                                                        <td className='text-right'>--</td>
                                                                        <td className='text-right'>--</td>
                                                                        <td className='text-right'>--</td>
                                                                    </tr>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="col-md-12 text-right pad-no">
                                                            <button className="btn btn-lightgray" onClick={() => jQuery('.discount-wrap').slideToggle()}>
                                                                Cancel
                              </button>
                                                            <button className="btn btn-green" onClick={() => {
                                                                this.applyCredit()
                                                                jQuery('.discount-wrap').slideToggle()
                                                            }
                                                            }>Ok</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive col-md-12 col-xs-12 pad-no">
                                        <table className="payment-table">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">
                                                        <img src="images/tick-big.svg" alt="icon" />
                                                    </th>
                                                    <th>Date</th>
                                                    <th>Number</th>
                                                    <th className="text-right">Org Amount</th>
                                                    <th className="text-right">Amount Due</th>
                                                    <th className='text-right'>Discount</th>
                                                    <th className="text-right">Credit Used</th>

                                                    <th className="text-right">Payment</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.vendor_invoicelist &&
                                                    this.state.vendor_invoicelist.map((item, i) => {
                                                        return (
                                                            <tr onClick={() => this.selectRow(i)}>
                                                                <td className='text-center' >
                                                                    <label className='custom-checkbox mar-b-no'>
                                                                        <input
                                                                            type='checkbox'
                                                                            id={`invoice_chekbox${i}`}
                                                                            checked={this.state[`inv_check${i}`]}
                                                                            onChange={e => {
                                                                                if (e.target.checked) {
                                                                                    var amt = Number(item.open_balance_foreign_currency) - ((this.state[`discount_amount${i}`]) ? Number(this.state[`discount_amount${i}`]) : 0) - ((this.state[`credit_amount${i}`]) ? Number(this.state[`credit_amount${i}`]) : 0)

                                                                                    if (!this.total_paid(
                                                                                        amt, i)) {
                                                                                        this.setState({ [`inv_check${i}`]: true, [`invoice_due${i}`]: amt }
                                                                                        )
                                                                                        setTimeout(
                                                                                            () => {
                                                                                                this.sumTotal()
                                                                                                this.handleAmountChange()
                                                                                                // this.clearDue()
                                                                                            }
                                                                                            ,
                                                                                            2000
                                                                                        )
                                                                                        jQuery('#invoice_due' + i).html(amt)

                                                                                    } else if (!this.total_paid(
                                                                                        this.state.unused_amt, i)) {

                                                                                        //  alert('Remaining amount of payment is not enough to pay full due')
                                                                                        this.setState({ [`inv_check${i}`]: true, [`invoice_due${i}`]: this.state.unused_amt }
                                                                                        )
                                                                                        setTimeout(
                                                                                            () => {
                                                                                                this.sumTotal()
                                                                                                this.handleAmountChange()
                                                                                                // this.clearDue()
                                                                                            }
                                                                                            ,
                                                                                            2000
                                                                                        )
                                                                                    }


                                                                                    // jQuery('#getEntredAmnt').val(Number(item.open_balance_foreign_currency)+Number(jQuery('#getEntredAmnt').val()))


                                                                                } else {
                                                                                    this.setState({ [`inv_check${i}`]: false, [`invoice_due${i}`]: 0, [`discount_amount${i}`]: 0, [`credit_amount${i}`]: 0, [`discount_amount_temp${this.state.i}`]: '' }
                                                                                    )
                                                                                    setTimeout(
                                                                                        () => {
                                                                                            this.sumTotal()
                                                                                            this.handleAmountChange()
                                                                                            // this.clearDue()
                                                                                        }
                                                                                        ,
                                                                                        2000
                                                                                    )

                                                                                    this.total_paid(0, i)
                                                                                    jQuery('#invoice_due' + i).html('')
                                                                                    jQuery('#creditAmnt' + i).html('')
                                                                                    // jQuery('#getEntredAmnt').val(Number(jQuery('#getEntredAmnt').val())-Number(item.amount_due))



                                                                                }
                                                                            }}
                                                                        />
                                                                        <span className='checkmark'></span>
                                                                    </label>
                                                                </td>
                                                                <td style={{ background: this.state.invoiceSeletedId === i ? "#e3fbed" : 'white', position: this.state.invoiceSeletedId === i ? "relative" : '' }}>
                                                                    <span>{item.invoice_date}</span>
                                                                </td>
                                                                {/* for save */}
                                                                <input type="hidden" id={`invoice_credit${i}`} />
                                                                <input type="hidden" id={`invoice_account${i}`} value={item.invoice_account} />
                                                                <input type="hidden" id={`invoice_exchange_rate${i}`} value={item.invoice_exchange_rate} />
                                                                {/* for save  */}
                                                                <td style={{ background: this.state.invoiceSeletedId === i ? "#e3fbed" : 'white', position: this.state.invoiceSeletedId === i ? "relative" : '' }}>
                                                                    <span id={`invoice_id${i}`}>
                                                                        {item.invoice_number}

                                                                    </span>
                                                                </td>
                                                                <td className='text-right' style={{ background: this.state.invoiceSeletedId === i ? "#e3fbed" : 'white', position: this.state.invoiceSeletedId === i ? "relative" : '' }}>
                                                                    <span id={`original${i}`}>
                                                                        {item.grand_total_foreign_currency}
                                                                    </span>
                                                                </td>
                                                                <td className='text-right' style={{ background: this.state.invoiceSeletedId === i ? "#e3fbed" : 'white', position: this.state.invoiceSeletedId === i ? "relative" : '' }}>
                                                                    <span id={`due_of_invoice${i}`}>
                                                                        {item.open_balance_foreign_currency}
                                                                    </span>
                                                                </td>
                                                                <td className='text-right' style={{ background: this.state.invoiceSeletedId === i ? "#e3fbed" : 'white', position: this.state.invoiceSeletedId === i ? "relative" : '' }}>
                                                                    <span id={`total_discount_amount${i}`} >{this.state[`discount_amount${i}`]}</span>

                                                                </td>
                                                                <td className='text-right' style={{ background: this.state.invoiceSeletedId === i ? "#e3fbed" : 'white', position: this.state.invoiceSeletedId === i ? "relative" : '' }}>
                                                                    <span id={`total_credit_amount${i}`} >{this.state[`credit_amount${i}`]}</span>

                                                                </td>
                                                                <td className='text-right' style={{ background: this.state.invoiceSeletedId === i ? "#e3fbed" : 'white', position: this.state.invoiceSeletedId === i ? "relative" : '' }} >
                                                                    <input type={Number} id={`invoice_due${i}`} name={`invoice_due${i}`} value={this.state[`invoice_due${i}`]}
                                                                        onChange={
                                                                            e => {
                                                                                //console.log('iuy', this.total_paid(e.target.value, i))

                                                                                // //console.log(e.target.value)
                                                                                // //console.log(Number(item.open_balance_foreign_currency) - Number(this.state[`discount_amount${i}`]) - Number(this.state[`credit_amount${i}`]));
                                                                                // //console.log(e.target.value > (Number(item.open_balance_foreign_currency) - Number(this.state[`discount_amount${i}`]) - Number(this.state[`credit_amount${i}`])));
                                                                                if (e.target.value > (Number(item.open_balance_foreign_currency) - ((this.state[`discount_amount${i}`]) ? Number(this.state[`discount_amount${i}`]) : 0) - ((this.state[`credit_amount${i}`]) ? Number(this.state[`credit_amount${i}`]) : 0))) {
                                                                                    alert("You may not pay more than Amount Due")
                                                                                } else if (this.total_paid(e.target.value, i)) {

                                                                                    alert("You may not pay more than  amount of payment")
                                                                                } else {
                                                                                    // jQuery('#invoice_due'+ i).html(e.target.value)

                                                                                    //console.log('check3', e.target.value)
                                                                                    this.setState({ [`invoice_due${i}`]: e.target.value, [`inv_check${i}`]: e.target.value > 0 ? true : false },
                                                                                        () => {
                                                                                            setTimeout(
                                                                                                () => this.handleAmountChange()
                                                                                                ,
                                                                                                2000
                                                                                            )


                                                                                        })



                                                                                }

                                                                            }
                                                                        }
                                                                    />
                                                                    <span
                                                                        contentEditable
                                                                        id={`invoice_due${i}`}

                                                                    ></span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                <tr>
                                                    <td colspan='3' className='text-right'>
                                                        <span className='fw-sbold'>Total</span>
                                                    </td>
                                                    <td className='text-right'>
                                                        <span class='fw-sbold' id='total1'></span>
                                                    </td>
                                                    <td className='text-right'>
                                                        <span className='fw-sbold' id='total2'></span>
                                                    </td>
                                                    <td className='text-right'>
                                                        <span className='fw-sbold'  >{this.state.TotalDiscountAmount}</span>
                                                    </td>
                                                    <td className='text-right'>
                                                        {/* <span className='fw-sbold'>{this.state.TotalCreditAmount}</span> */}
                                                        <span className='fw-sbold'>{this.state.credit_amount_total}</span>

                                                    </td>
                                                    <td className='text-right'>
                                                        <span className='fw-sbold' id='total3'>{this.state.amount_of_payment_used}</span>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>

                                    {this.state.under && (
                                        <>
                                            <div
                                                className='col-lg-4 col-md-5 under-pay '
                                                style={{ background: 'red' }}
                                            >
                                                <span className='lead col-md-12 col-xs-12'>
                                                    <span>Under Payment</span>
                                                    <span className='pull-right'>
                                                        {this.state.currency_selected + ''} {this.state.under_amt}
                                                    </span>
                                                </span>
                                                <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                                                    <label className='custom-checkbox radio'>
                                                        <input type='radio' name='over' defaultChecked={true}
                                                            onClick={() => {
                                                                this.setState({ option: '1' })


                                                            }} /> Leave this as an
                          underpayment
                          <span className='checkmark'></span>
                                                    </label>
                                                    <label className='custom-checkbox radio mar-b-no'>
                                                        <input
                                                            type='radio'
                                                            name='over'
                                                            onClick={() => {
                                                                this.setState({ option: '2' })
                                                                window.jQuery('#writeoff-modal').modal('show')

                                                            }}
                                                        />
                          Write off the extra amount
                          <span className='checkmark'></span>
                                                    </label>
                                                </div>
                                            </div>



                                        </>
                                    )}

                                    {this.state.over && (
                                        <>
                                            <div
                                                className='col-lg-4 col-md-5 under-pay over-pay '
                                                style={{ background: 'springgreen' }}
                                            >
                                                <span className='lead col-md-12 col-xs-12'>
                                                    <span>OverPayment</span>
                                                    <span className='pull-right'>
                                                        {this.state.currency_selected + ''} {this.state.overPay}
                                                    </span>
                                                </span>
                                                <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                                                    <label className='custom-checkbox radio'>
                                                        <input type='radio' name='over' defaultChecked={true}
                                                            onClick={() => {
                                                                this.setState({ option: '3' })


                                                            }}
                                                        /> Leave the cerdit to
                          be used later
                          <span className='checkmark'></span>
                                                    </label>
                                                    <label className='custom-checkbox radio mar-b-no'>
                                                        <input
                                                            type='radio'
                                                            name='over'
                                                            onClick={() => {
                                                                this.setState({ option: '4' })
                                                                jQuery('#refundamnt').val(this.state.overPay)
                                                                jQuery('#vendor_name').val(this.state.vendorName)

                                                                window.jQuery('#refund-modal').modal('show')

                                                            }}
                                                        />
                          Refund the amount to the vendor
                          <span className='checkmark'></span>
                                                    </label>
                                                </div>
                                            </div>

                                        </>
                                    )}


                                    {this.state.isUnused &&
                                        <div
                                            className='col-lg-4 col-md-5 under-pay '
                                            style={{ background: 'yellow' }}
                                        >
                                            <span className='lead col-md-12 col-xs-12'>
                                                <span>Unapplied Amount</span>
                                                <span className='pull-right'>
                                                    {this.state.currency_selected + ''} {this.state.unused_amt}
                                                </span>
                                            </span>
                                            <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                                                <label className='custom-checkbox radio'>
                                                    A credit for over payment will remain on the customer's account
                      {/* <span className='checkmark'></span> */}
                                                </label>

                                            </div>
                                        </div>
                                    }



                                    <div className='col-lg-4 col-md-5 inv-total'>
                                        <span className='lead col-md-12 col-xs-12'>
                                            Amounts for selected invoices
                    </span>
                                        <span className='row-block'>
                                            <span>Amount Due ({this.state.currency_selected})</span>
                                            <span>{Number(this.state.totalDueFromApi).toFixed(2)}</span>
                                        </span>
                                        <span className='row-block'>
                                            <span>Applied ({this.state.currency_selected})</span>
                                            <span>{(this.state.amount_of_payment_used) ? Number(this.state.amount_of_payment_used).toFixed(2) : 0.00}</span>
                                        </span>
                                        <span className='row-block'>
                                            <span>Discount and Credits Applied ({this.state.currency_selected})</span>
                                            <span className='appliedcredits'>{Number(this.state.TotalDiscountAmount) + Number(this.state.TotalCreditAmount)}</span>
                                        </span>
                                        {/* <span className='row-white'>
                      <span>Amount Received (USD)</span>
                      <span>{Number(this.state.totalDueFromApi - (this.state.amount_of_payment) ? Number(this.state.amount_of_payment).toFixed(2) : 0.00).toFixed(2)}</span>
                    </span> */}
                                    </div>



                                    <div className="pf-btm-wrap bg-sticky">
                                        <div className="col-md-6 col-sm-6 col-xs-12 pad-no">
                                            <button className="btn btn-empty ico">
                                                <img src="images/print-icon.svg" alt="icon" />
                        Print
                      </button>
                                            <button className="btn btn-empty ico">
                                                <img src="images/pdf-icon.svg" alt="icon" />
                        Save as PDF
                      </button>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12 text-right pad-no">
                                            <button
                                                className="btn btn-lightgray"
                                                data-toggle="modal"
                                                // data-target="#refund-modal"
                                                type="button"
                                                onClick={() => {
                                                    this.props.history.push("/customers-list");
                                                }}
                                            >
                                                Close
                      </button>

                                            {"  "}
                                            <button
                                                className="btn btn-yellow"
                                                data-toggle="modal"
                                                // data-target="#writeoff-modal"
                                                // onClick={() => {
                                                //   window.jQuery("#pop-modal-for-notes").modal("show");
                                                // }}
                                                type="button"
                                                onClick={() =>
                                                    this.customer_recived_payment("save&new")
                                                }
                                            >
                                                Save &amp; New
                      </button>
                                            {"   "}
                                            <button
                                                className="btn btn-green"
                                                onClick={() => this.customer_recived_payment("save")}
                                            >
                                                Save
                      </button>
                                            {"   "}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {this.state.isSuccessful ? (
                                <div
                                    className="alert alert-card success alert-dismissible fade in"
                                    id="closeme1"
                                >
                                    <a
                                        href="#"
                                        className="close"
                                        data-dismiss="alert"
                                        aria-label="close"
                                    >
                                        &times;
                  </a>
                                    <div className="img-wrap">
                                        <img
                                            className="img-responsive"
                                            src="../../images/alert-success.svg"
                                            alt="icon"
                                        />
                                    </div>
                                    <div className="alert-cont">
                                        <strong className="title">Success!</strong>" Inserted
                    successfully"
                  </div>
                                </div>
                            ) : (
                                ""
                            )}

                            {this.state.isFailed && (
                                <div className="alert alert-card danger alert-dismissible fade in">
                                    <a
                                        href="#"
                                        className="close"
                                        onClick={() => {
                                            this.setState({ isFailed: false });
                                        }}
                                        data-dismiss="alert"
                                        aria-label="close"
                                    >
                                        ×
                  </a>
                                    <div className="img-wrap">
                                        <img
                                            className="img-responsive"
                                            src="images/alert-cross.svg"
                                            alt="icon"
                                        />
                                    </div>
                                    <div className="alert-cont">
                                        <strong className="title">Failed!</strong>Try again later or
                    Pay least to proceed
                  </div>
                                </div>
                            )}

                            <div class="modal fade pop-modal" id="refund-modal" role="dialog">
                                <div class="modal-dialog modal-md custom-modal">
                                    <button
                                        type="button"
                                        class="close hidden-xs"
                                        data-dismiss="modal"
                                    >
                                        <img
                                            class="img-responsive"
                                            src="images/close-red.svg"
                                            alt="icon"
                                        />
                                    </button>
                                    <div class="modal-content">
                                        <div class="modal-body text-center">
                                            <h3>Refund the Amount</h3>
                                            <form class="custom-form row column">
                                                <div class="form-group col-md-6 col-xs-12">
                                                    <label>Customer Name</label>
                                                    <input
                                                        type="text"
                                                        name="ac-name"
                                                        class="form-control"
                                                        id="vendor_name"
                                                    />
                                                </div>
                                                <div class="form-group col-md-6 col-xs-12">
                                                    <label>Mode of Payment</label>
                                                    <select
                                                        className="selectpicker form-control add-new"
                                                        data-live-search="true"
                                                        title="Choose..."
                                                        onChange={(e) => {
                                                            this.setState({
                                                                modeOfPay: e.target.value,
                                                            });
                                                        }}
                                                    >
                                                        <option>Create New </option>
                                                        {this.state.vendor_payment_method &&
                                                            this.state.vendor_payment_method.map((item) => {
                                                                return (
                                                                    <option value={item.id} data-status={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                                <div class="form-group exchange-col col-md-6 col-xs-12">
                                                    <label>Refund Amount</label>
                                                    <div class="w-100">
                                                        <input
                                                            type="text"
                                                            name="exchangeRate"
                                                            class="form-control"
                                                            id="refundamnt"
                                                        />
                                                        <span class="label">
                                                            {this.state.currency_selected}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="form-group exchange-col col-md-6 col-xs-12">
                                                    <label>Exchange Rate 1 USD</label>
                                                    <div class="w-100">
                                                        <input
                                                            type="text"
                                                            name="exchangeRate"
                                                            class="form-control text-right"
                                                            id='refund_exchange'
                                                        // value="1.38"
                                                        />
                                                        <span class="label">
                                                            {this.state.currency_selected}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="form-group col-md-6 col-xs-12">
                                                    <label>Date of Refund</label>
                                                    <div
                                                        class="input-group date mar-t-no"
                                                        data-date-format="dd/mm/yyyy"
                                                    >
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            id="refund_date"
                                                        />
                                                        <div class="input-group-addon">
                                                            <img src="images/calendar-icon.svg" alt="icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group col-md-6 col-xs-12">
                                                    <label>Received Account</label>
                                                    <select
                                                        class="selectpicker form-control"
                                                        data-live-search="true"
                                                        title="Choose..."
                                                        onChange={(e) => {
                                                            this.setState({
                                                                recievedAccount: e.target.value,
                                                                recievedAccountName: e.target.name,
                                                            });
                                                        }}
                                                    >
                                                        {this.state.vendor_payment_method_bank &&
                                                            this.state.vendor_payment_method_bank.map(
                                                                (item) => {
                                                                    return (
                                                                        <option value={item.id} name={item.name}>
                                                                            {item.name}
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                    </select>
                                                </div>
                                                <div class="form-group col-md-12 col-xs-12 mh btn-sec text-right mar-b-no">
                                                    <button class="btn btn-lightgray" type="button">
                                                        Cancel
                          </button>
                                                    {"   "}
                                                    <button
                                                        class="btn btn-green"
                                                        type="button"
                                                        onClick={() => {
                                                            let refundamnt = jQuery("#refundamnt").val();
                                                            var date = this.convert_date(
                                                                jQuery("#refund_date").val()
                                                            );

                                                            if (
                                                                this.state.vendorName != "" &&
                                                                this.state.modeOfPay &&
                                                                this.state.recievedAccount &&
                                                                date != undefined &&
                                                                refundamnt != undefined
                                                            ) {
                                                                this.setState({
                                                                    refundStatus: {
                                                                        customer_id: jQuery("#variable_pay_type option:selected").data(
                                                                            "status"
                                                                        ),
                                                                        customer_name: jQuery("#variable_pay_type option:selected").data(
                                                                            "name"
                                                                        ),
                                                                        exchange_rate: jQuery("#refund_exchange").val(),
                                                                        account: this.state.recievedAccount,
                                                                        type: 1,
                                                                        amount: refundamnt,
                                                                        refund_date: date,
                                                                        client_id: this.state.logged_client_id,
                                                                        foreign_currency: this.state.currency_selected,
                                                                        job_id: jQuery("#variable_pay_type_job").val(),
                                                                    },
                                                                });
                                                                window.jQuery("#refund-modal").modal("hide");
                                                            }
                                                        }}
                                                    >
                                                        Refund
                          </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="modal fade pop-modal"
                                id="writeoff-modal"
                                role="dialog"
                            >
                                <div class="modal-dialog custom-modal">
                                    <button
                                        type="button"
                                        class="close hidden-xs"
                                        data-dismiss="modal"
                                    >
                                        <img
                                            class="img-responsive"
                                            src="images/close-red.svg"
                                            alt="icon"
                                        />
                                    </button>
                                    <div class="modal-content">
                                        <div class="modal-body text-center">
                                            <h3>Write Off Amount</h3>
                                            <p class="sub">
                                                Write off Amount{" "}
                                                <span class="blue-txt">
                                                    {this.state.currency_selected} {this.state.under_amt}
                                                </span>
                                            </p>
                                            <form class="custom-form row column">
                                                <div class="form-group col-md-12 col-xs-12">
                                                    <label>Account</label>
                                                    <select
                                                        class="selectpicker form-control add-new"
                                                        data-live-search="true"
                                                        title="Choose..."
                                                        onChange={(e) => {
                                                            this.setState({
                                                                VendorAccSelcted: e.target.value,
                                                            });
                                                        }}
                                                    >
                                                        <option>Add new</option>

                                                        {this.state.vendor_category &&
                                                            this.state.vendor_category.map((item) => {
                                                                return (
                                                                    <option value={item.id} data-status={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                                <div class="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                                                    <button
                                                        class="btn btn-lightgray"
                                                        type="button"
                                                        data-dismiss="modal"
                                                    >
                                                        Cancel
                          </button>
                                                    {"   "}
                                                    <button
                                                        class="btn btn-green"
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                this.state.VendorAccSelcted != "" &&
                                                                this.state.VendorAccSelcted != undefined
                                                            ) {
                                                                var writeOff = []
                                                                this.state.vendor_invoicelist.map((item, i) => {
                                                                    if (i == this.state.invoiceSeletedId) {
                                                                        let writeOff_obj = {
                                                                            account: this.state.VendorAccSelcted,
                                                                            amount: this.state.under_amt,
                                                                            invoice_id: item.id,
                                                                            invoice_account: item.invoice_account,
                                                                            invoice_exchange_rate: item.invoice_exchange_rate
                                                                        }
                                                                        writeOff.push(writeOff_obj)
                                                                    }
                                                                })
                                                                this.setState({
                                                                    writeOff: writeOff
                                                                });
                                                                window.jQuery("#writeoff-modal").modal("hide");
                                                            }
                                                        }}
                                                    >
                                                        Write Off
                          </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="modal fade pop-modal"
                                id="add_new_payment"
                                role="dialog"
                            >
                                <div className="modal-dialog modal-md custom-modal">
                                    <button
                                        type="button"
                                        className="close hidden-xs"
                                        data-dismiss="modal"
                                        onClick={() => {
                                            this.setState({ roleStringLen: false });
                                        }}
                                    >
                                        <img
                                            className="img-responsive"
                                            src="../../images/close-red.svg"
                                            alt="icon"
                                        />
                                    </button>
                                    <div className="modal-content">
                                        <div className="modal-body text-center">
                                            <h3>Add Options</h3>
                                            <form className="custom-form row">
                                                <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                                    <div className="col-md-4 col-sm-4 col-xs-12">
                                                        <label>Options</label>
                                                    </div>
                                                    <div className="col-md-8 col-sm-8 col-xs-12">
                                                        <input
                                                            autoComplete="off"
                                                            type="text"
                                                            className="form-control"
                                                            id="pay"
                                                        />
                                                        <div>
                                                            {this.state.roleStringLen && (
                                                                <small style={{ color: "red" }}>*Required.</small>
                                                            )}
                                                        </div>{" "}
                                                    </div>
                                                </div>

                                                <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                                                    <button
                                                        className="btn btn-lightgray"
                                                        data-dismiss="modal"
                                                        onClick={() => {
                                                            this.setState({ roleStringLen: false });
                                                        }}
                                                    >
                                                        Cancel
                      </button>
                                                    <span>{"   "}</span>
                                                    <input type="hidden" id="colid" />

                                                    <button
                                                        className="btn btn-green"
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                jQuery("#pay").val() != "" &&
                                                                jQuery("#pay").val() != undefined
                                                            ) {
                                                                var coreData = {
                                                                    name: jQuery("#pay").val(),
                                                                };

                                                                FetchAllApi.create_paymenttype(
                                                                    coreData,
                                                                    (err, response) => {
                                                                        //console.log("new document", response.message);
                                                                        // alert(response.message)
                                                                        if (response.status === 1) {
                                                                            this.setState({ pay_method: response.insertId })
                                                                            this.vendor_payment_method();
                                                                            jQuery("#pay").val("");
                                                                            window
                                                                                .jQuery("#add_new_payment")
                                                                                .modal("hide");
                                                                            //   this.setState({ items: response.list[0].columns })
                                                                        } else {
                                                                        }
                                                                    }
                                                                );
                                                            } else {
                                                                alert("Please fill out....");
                                                            }

                                                            // FetchAllApi.invoiceadd_dropdown_options(
                                                            //   userId,
                                                            //   coulmnId,
                                                            //   optionsArray,
                                                            //   (err, response) => {
                                                            //     //console.log('vendor_names', response)

                                                            //     if (response.status === 1) {
                                                            //       alert('success')
                                                            //       this.getColList()
                                                            //       window.jQuery('#add_new_role').modal('hide')
                                                            //     } else {
                                                            //     }
                                                            //   }
                                                            // )
                                                        }}
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
                        <input type="hidden" id="option" />
                    </div>

                    <Footer defaultcategorylist_onchange={this.defaultcategorylist_onchang} logoutSubmit={(e) => this.logoutLink()} />
                </div>
            </div>
        );
    }
}
export default Customer_receive_payment_noti;
