import React from "react";
import LeftSidebar from "./left_sidebar";
import Footer from "./footer.jsx";

import Topbar from "./topbar";
import Comma from "./comma";

import FetchAllApi from "../api_links/fetch_all_api";
import DatePicker from "react-date-picker";

// import PDFViewer from 'pdf-viewer-reactjs'

import HTMLReactParser from "html-react-parser";

import parse from "html-react-parser";
import data from "./reports/CountryCodes";
import moment from "moment";

import { ToWords } from "to-words";

import jQuery from "jquery";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CoulmnRearrage from "./coulmn_rearrange";
// import { overflow } from 'html2canvas/dist/types/css/property-descriptors/overflow'

import Select from 'react-select'
import Loader from "react-loader-spinner";
import config from "./../api_links/api_links";


var _ = require("lodash");



const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
// import 'bootstrap';
// import 'bootstrap-select';

class Testing_create_salesorder extends React.Component {
    constructor(props) {
        super(props);
        //const { history } = this.props;
        this.state = {
            isClose: false,
            accounts_selected: "",
            accounts_dropdown: [],
            current_val: 0,
            payment_desc: '',
            subTotal: 0.00,
            name: "Still, Jaime",
            rank: "SGT",
            description: "Demonstrate how to export an HTML section to PDF",
            html_content: "",
            dataUrl: "",
            logged_user_id: localStorage.getItem("logged_user_id"),
            logged_client_id: localStorage.getItem("logged_client_id"),
            logged_role_id: localStorage.getItem("logged_role_id"),
            logged_user_name: localStorage.getItem("logged_user_name"),
            logged_user_email: localStorage.getItem("logged_user_email"),
            logged_user_phone: localStorage.getItem("logged_user_phone"),
            logged_user_image: localStorage.getItem("logged_user_image"),
            logged_company_name: localStorage.getItem("logged_company_name"),
            logged_subscription_start_date: localStorage.getItem(
                "logged_subscription_start_date"
            ),
            logged_subscription_end_date: localStorage.getItem(
                "logged_subscription_end_date"
            ),
            logged_plan_id: localStorage.getItem("logged_plan_id"),
            lock_date: localStorage.getItem("lock_date"),
            customer_id: localStorage.getItem("customer_id"),

            country_sortname: localStorage.getItem("country_sortname"),
            language_code: localStorage.getItem("language_code"),
            home_currency_symbol: localStorage.getItem("home_currency_symbol"),
            home_currency: localStorage.getItem("home_currency"),


            dropdown: "",
            cate_id: '',
            inbox_list: [],
            response_stus: 0,
            response_msg: "No data found",
            item_details: "",
            item_file_path: "",
            list_id: "",
            response: [],
            htmlcont: "",
            selected_templateName: "Choose",
            active: 0,
            properties_values: "",
            date: new Date(),
            customer_list: "",
            selected_customer_name: "",
            active_selected: 0,
            currency_customer: "USD",

            /* =================== */
            isChecked: false,
            selected: "",
            selectedindex: "",
            gst_list: [],
            sales_tax_name: "Zero-rated supplies",
            sales_tax_rate: 0,
            sales_tax_type: 1,
            search_key_gst: "",
            selected_rate_type: "%",
            maximum_chr_lngth: 4,
            sales_tax_code: "",
            rate_entered: "",
            salesTax_name_entered: "",
            rows: ["row 1"],
            coulmns: [],
            myarray: [],
            currencies: [],
            item_total_home_currency: "",
            tax_amount_foreign_currency: "",
            grand_total_foreign_currency: "",
            grand_total_home_currency: 0.00,
            sub_total_home_currency: 0.00,
            tax_home_currency: 0.00,
            item_total_foreign_currency: "",
            ToCurrency: "USD",
            isTable_notEmpty: false,
            category_id: "",
            specific_id_delete: "",
            initial_value: 0,
            isAdd: false,
            isInvoice_to: false,
            isShippingt_to: false,
            isThanking_msg: false,
            isTerms_cond_msg: false,
            isInvoice_no: false,
            isjob_name: false,
            isTablefilled: false,
            isCustomername: false,
            isTemplate_selected: false,
            isMobileno: false,
            isRejected: false,
            reject_msg: "",

            Basic_info: [],
            billing_address: "",
            shipping_address: "",
            customerjoblist: [],
            selectCustomer: "",

            sales_tax_code: "",
            salesTax_name_entered: "",
            // selectedOption: "option2",
            modal_info_msg: "",
            show_succes: false,
            grandTotal: "",
            job_id: "",
            job_name: "",
            cus_rate_rate: "",
            exchange_value_ref: "",
            selectedColumnType: "",
            selectedOption: "option2",
            coulmns: [],
            payment_method_list: [],
            payment_date: "",
            sales_product_item_list: [],
            opt: "",
            default_category_list: [],
            // currencies: [],

            isEditCol: false,
            items: [],
            CurrentSelectedCurr: "USD",
            duplicateVar: "",
            balancesheetlist: [],
            number_of_columns_list: [],
            isInvoiceCurrency: false,
            isTemplate: false,
            isCustomer: false,
            isInvoiceDate: false,
            isDueDate: false,
            isJobName: false,
            isPayable_amount: false,
            isPaymetDate: false,
            isPaymentMethod: false,
            isbalanceSheetcatId: false,
            // currencies: [],
            SubAccountList: [],
            isAccounId: false,
            customerID: localStorage.getItem("customerId"),
            JobId: "",
            isThirdPartyName: false,
            third_party_account_list: [],
            selectNeedIndex: "empty",
            nameFilter: "emp",
            isAlreadyTaken: false,
            ExistMsg: "",
            ItemList: [],
            isInvoiceEditable: false,
            is3partyAccRequired: false,
            currInvoiceId: "",
            currpayment_id: "",
            invoice_id_used: "",
            myCusVarPay: "",
            newlyCreatedID: "",
            paymentGRTR: 0,

            clientHomeCurrency: "",
            paid_status: "",

            third_party_value: "",
            third_party_type: 0,

            loading: true,
            estimate_id: '',
            dummy_myarray: [],
            dummy_exchange_value: '',
            dummy_exchange_value_ref: '',
            dummy_grand_total_home_currency: '',
            dummy_sub_total_home_currency: '',
            dummy_tax_home_currency: '',
            dummysubTotal: [],
            dummytax_total: [],
            dummarray: [],
            sales_order_id: '',


            delete_alert_msg: '',
            html_contents: '',
            invoice_details: '',

            is_credit_limit_accepted : 0,
            is_void: false,
            autoinvoicestartdate:'',
            autoinvoiceenddate:'',
            monthnumberoption:'option2',
            autoinvoicedate:0
        };
    }



    customValuesUpdate = (a, b) => {
        console.log('aaaa', a, 'bbbb', b)
        this.setState({ custom_header_fields: a, custom_footer_fields: b })

        a && a.your_extra_data && a.your_extra_data[0].map((item, i) => {
            console.log('aaaac', item)
            this.setState({ [`customField${i}`]: item })
        })

        a && a.your_extra_data && a.your_extra_data[1].map((item, i) => {
            console.log('aaaad', item)
            this.setState({ [`customFieldB${i}`]: item })
        })
    }


    customValues = () => {
        let custom_header_fields = {}
        let custom_footer_fields = {}
        let customValues = []
        let customValuesB = []

        this.state.customField.map((item, i) => {
            let a = this.state[`customField${i}`]

            custom_header_fields = { ...custom_header_fields, [item.key]: this.state[`customField${i}`] }
            customValues.push(a)
        })

        this.state.customFieldB.map((item, i) => {
            let a = this.state[`customFieldB${i}`]

            custom_footer_fields = { ...custom_footer_fields, [item.key]: this.state[`customFieldB${i}`] }
            customValuesB.push(a)
        })

        let values = [customValues, customValuesB]
        custom_header_fields = { ...custom_header_fields, 'your_extra_data': values }
        this.setState({ custom_header_fields, custom_footer_fields })
    }

    temChanged = (id) => {
        let obj = this.state.response && this.state.response.list && this.state.response.list.find((e) => e.id == id)
        let customField =obj && obj.properties && obj.properties.header && obj.properties.header.customField && obj.properties.header.customField
        let customFieldB =obj && obj.properties && obj.properties.footer && obj.properties.footer.customField &&obj.properties.footer.customField
        this.setState({ customField, customFieldB, html_contents:  obj  && obj.html_content })
        console.log('temchanged',obj.html_content)
    }

    customColumn = () => {
        let customField = this.state.customField
        this.state.customField.map((item, i) => {

            return (
                <div
                    className="form-group col-md-4"
                    id="itemoptioninvoicenostatus"
                >
                    <label>Text</label>
                    <input
                        type="text"
                        name="inv-no"
                        className="form-control"
                        id="invoice_no"
                        required
                        autoComplete="off"
                        onChange={() => {
                            var no = jQuery('#invoice_no').val()
                            this.setState({ invoice_number_for_print: no })
                        }}
                    />{" "}
                </div>
            )
        })


        // console.log('11111')
        // let { customField } = this.state
        // customField.map((item, i) => {
        //   // console.log('22222')
        //   return (
        //     <>
        //       {item.type == 'text' &&
        //         <div
        //           className="form-group col-md-4"
        //           id="itemoptioninvoicenostatus"
        //         >
        //           <label>Text</label>
        //           <input
        //             type="text"
        //             name="inv-no"
        //             className="form-control"
        //             id="invoice_no"
        //             required
        //             autoComplete="off"
        //             onChange={() => {
        //               var no = jQuery('#invoice_no').val()
        //               this.setState({ invoice_number_for_print: no })
        //             }}
        //           />{" "}

        //         </div>
        //       }
        //       {item.type == 'dropdown' &&
        //         <div className="form-group col-md-4">
        //           <label>Date<span className="astrick">*</span></label>
        //           <div className="input-group date mar-t-no">
        //             <input
        //               type="text"
        //               autoComplete="off"
        //               name="incorport_date"
        //               id="due_date"
        //               // onBlur={e => this.changeDate(e.target.value)}
        //               className="form-control"
        //               required
        //             />

        //             <div className="input-group-addon" onClick={() => jQuery('#due_date').focus()}>
        //               <img src="images/calendar-icon.svg" alt="icon" />
        //             </div>
        //           </div>
        //           {this.state.isDueDate ? (
        //             <div >
        //               <small style={{ color: "red" }}>*Required.</small>
        //             </div>
        //           ) : (
        //             ""
        //           )}

        //           <small className="text-red"></small>
        //         </div>
        //       }
        //       {item.type == 'date' &&
        //         <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
        //           <label>Select Box</label>

        //           <select
        //             className="selectpicker form-control add-new"
        //             data-live-search="true"
        //             title="Choose..."
        //             id="jobName"
        //             onChange={(e) => {
        //               this.newJob(e.target.value);
        //             }}
        //           >
        //             <option> Create New </option>
        //             {this.state.customerjoblist &&
        //               this.state.customerjoblist.map((item) => {
        //                 if (
        //                   this.state.JobId != undefined &&
        //                   this.state.JobId == item.id
        //                 ) {
        //                   var selected = true;
        //                 } else {
        //                   var selected = false;
        //                 }
        //                 return (
        //                   <option
        //                     selected={selected}
        //                     value={item.job_name}
        //                     data-status={item.id}
        //                   >
        //                     {item.job_name}
        //                   </option>
        //                 );
        //               })}
        //           </select>

        //         </div>
        //       }
        //     </>
        //   )
        // })
    }

    update_template_properties = () => {
        let input = {
            "client_id": this.state.logged_client_id,
            "template_id": this.state.template_id,
            "header_array": this.state.customField,
            "footer_array": this.state.customFieldB
        }

        FetchAllApi.update_template_properties(input, (err, response) => {
            if (response.status == 1) {
               // alert(response.message)
            } else {
              //  alert(response.message)
            }
        })
    }


    frontPrint = () => {
        console.log(this.state.customField)
        this.state.customField && this.state.customField.map((itm, i) => {
            let customefiled=this.state[`customField${i}`] && this.state[`customField${i}`]!=undefined ?this.state[`customField${i}`]:'-'
            let customFieldB=this.state[`customFieldB${i}`] && this.state[`customFieldB${i}`]!=undefined ?this.state[`customFieldB${i}`]:'-'
            jQuery("#head-" + i).html(customefiled)
            jQuery("#foot-" + i).html(customFieldB)
            // jQuery("#head-" + i).html(this.state[`customField${i}`])
            // jQuery("#foot-" + i).html(this.state[`customFieldB${i}`])
        })


        let cc = this.state.invoice_details.invoice_details.invoice_details
        let dd = [];
        // dd=cc.map((item,index)=>{
        //     return dd.push(index)
        // }) 
        console.log(cc.length);

       dd=[1,2,3,4,5,6,7,8,9,10]
       console.log(dd.length);
        let subDebit = 0
        let subCredit = 0
        let subcreditdisp=0
        let subdebitdisp=0
        dd.map(row => {
            if (cc.length >= row) {
                jQuery("#row-" + row).css("display", "table-row")
                let rowTotal = Number(cc[row - 1].quantity) * Number(cc[row - 1].unit_price)
                // console.log('pppp', row)
                let rowTotaldisplay =(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                { style: 'currency', currency: this.state.home_currency }).format(isNaN(rowTotal) ? "0.00" : rowTotal).replace(this.state.home_currency_symbol, ''))
                jQuery("#row-" + row + "-" + 1).html(row)
                jQuery("#row-" + row + "-" + 2).html(cc[row - 1].descr)
                jQuery("#row-" + row + "-" + 3).html(cc[row - 1].unit_price)
                jQuery("#row-" + row + "-" + 4).html(cc[row - 1].quantity)
                jQuery("#row-" + row + "-" + 5).html(cc[row - 1].tax_name == "Choose " ? "--" : cc[row - 1].tax_name)
                jQuery("#row-" + row + "-" + 6).html(rowTotaldisplay)
                if (rowTotal < 0) {
                    jQuery("#row-" + row + "-" + 7).html(rowTotaldisplay)
                    jQuery("#row-" + row + "-" + 8).html('--')
                    subDebit = subDebit + rowTotal
                    subdebitdisp =(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                    { style: 'currency', currency: this.state.home_currency }).format(isNaN(subDebit) ? "0.00" : subDebit).replace(this.state.home_currency_symbol, ''))
                   
                } else {
                    jQuery("#row-" + row + "-" + 7).html('--')
                    jQuery("#row-" + row + "-" + 8).html(rowTotaldisplay)
                    subCredit = subCredit + rowTotal
                    subcreditdisp = (new Intl.NumberFormat(this.state.language_code + '-' +
                        this.state.country_sortname,
                        { style: 'currency', currency: this.state.home_currency })
                        .format(isNaN(subCredit) ? "0.00" : subCredit)
                        .replace(this.state.home_currency_symbol, ''))
                }
            } else {
                console.log(row,'else');
                jQuery("#row-" + row).css("display", "none")
            }
        })
        jQuery("#row-total-2").html(subdebitdisp)
        jQuery("#row-total-3").html(subcreditdisp)


        let bb = this.state.entity_details.data[0]
        jQuery("#isEntityName").html(bb.name)
        jQuery("#isAddress").html(bb.address)
        jQuery("#isPhoneNumber").html(bb.phone)
        jQuery("#isEmail").html(bb.email_id)
        jQuery("#isUenNumber").html(bb.unique_entity_number)



        let aa = this.state.invoice_details.invoice_details
        jQuery("#p-company_address").html(aa.company_address)
        jQuery("#p-shipping_address").html(aa.shipping_address)
        jQuery("#p-invoice_number").html(aa.sales_number)
        jQuery("#p-invoice_date").html(moment(aa.date).format('DD/MM/YYYY'))
        jQuery("#p-due_date").html('--')

        jQuery("#p-foreign_currency").html(aa.foreign_currency)
        jQuery("#p-job_name").html(aa.job_name)
        let memo=aa.memo.trim()==''?'--':aa.memo;
        jQuery("#p-memo").html(memo)
        if (aa.exchange_rate == 1) {
            jQuery("#p-exchange_div").css('display', 'none')
        } else {
            jQuery("#p-exchange_rate").html(aa.exchange_rate)
        }
        let grandtotal=(new Intl.NumberFormat(this.state.language_code + '-' +     this.state.country_sortname,
        { style: 'currency', currency: this.state.home_currency })    .format(isNaN(aa.grand_total_foreign_currency) ? "0.00" : aa.grand_total_foreign_currency)
        .replace(this.state.home_currency_symbol, ''));
        let itemtotal=(new Intl.NumberFormat(this.state.language_code + '-' +     this.state.country_sortname,
        { style: 'currency', currency: this.state.home_currency })    .format(isNaN(aa.item_total_foreign_currency) ? "0.00" : aa.item_total_foreign_currency)
        .replace(this.state.home_currency_symbol, ''));
        jQuery("#p-amount_in_words").html(aa.amount_in_words)
        jQuery("#p-item_total_foreign_currency").html(itemtotal)
        jQuery("#p-tax_amount_foreign_currency").html(aa.tax_amount_foreign_currency)
        jQuery("#p-grand_total_foreign_currency").html(grandtotal)

        jQuery("#p-thanking_message").html(aa.thanking_message)
        jQuery("#p-terms_and_conditions").html(aa.terms_and_conditions)

        if(this.state.selected_template_type && this.state.selected_template_type == 1 ){
        jQuery("#template_name").html("SALES ORDER")
        }


        //         let ee = aa.custom_header_fields.keys()
        //         let ff = ee.your_extra_data
        //         let gg = ee.custom_footer_fields
        //         let hh = ff[0].length 


        //         dd.map(row => {
        //              if (hh.length >= row){
        //                  jQuery("#row-" + row).css("display", "table-row")

        //                  jQuery("#row-" + row + "-" + 1).html(cc[row-1].item_name)
        //                  jQuery("#row-" + row + "-" + 2).html(cc[row-1].descr)
        //                  jQuery("#row-" + row + "-" + 3).html(cc[row-1].unit_price)
        //                  jQuery("#row-" + row + "-" + 4).html(cc[row-1].quantity)
        //                  jQuery("#row-" + row + "-" + 5).html(cc[row-1].tax_name == "Choose " ? "--" : cc[row-1].tax_name)
        //                  jQuery("#row-" + row + "-" + 6).html(Number(cc[row-1].quantity) * Number(cc[row-1].unit_price) )
        //              }else{
        //                  jQuery("#row-" + row).css("display", "none")
        //              }
        //  })

        setTimeout(() => {
            let client_id = this.state.logged_client_id
            let sales_order_id = this.state.invoice_id_used
            let html_content = jQuery('#whole_template').html()
            console.log(html_content,'frontprint');
            // client_id: this.state.logged_client_id,
            // invoice_id: this.state.invoice_id_used,
            // template_id: this.state.template_id

            fetch("https://api.genie.com.sg/save_sales_order_as_pdf_with_html", {
                method: "POST",
                body: JSON.stringify({
                    client_id,
                    sales_order_id,
                    html_content,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "O5mGIP3VNia0JvPH2IBiwA==",
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log("objehjhjhjct", data);
                    if (data.status === 1) {
                        window.open(data.file_path);
                        // callback(null, data);
                    } else {
                        // callback(null, data);
                    }
                });
        }, 1000);


    }




    rename = (obj, curr) => {
        let a = {}
        Object.keys(obj).map((key) => {
            let newKey = key.replace(curr, '')
            Object.assign(a, { [newKey]: obj[key] })
        })
        return a
    }



    checkPassword = () => {
        let Input = {
            client_id: this.state.logged_client_id,
            password: this.state.old_password
        }

        FetchAllApi.verify_lock_date_password(Input, (err, response) => {
            if (response.status === 1) {
                let temp_date = this.state.temp_date
                jQuery('#invoice_date').val(temp_date)

                window.jQuery("#asking_password_for_delete").modal("hide");

                setTimeout(() => {
                    this.setState(
                        {
                            cus_rate_rate: this.state
                                .exchange_value_ref,
                        })
                }, 500);

                setTimeout(
                    () => {
                        this.handleChangeItems(
                            0,
                            this.state.rows.length - 1
                        )
                    }, 500
                )
            } else {
                alert(response.message)
                this.setState({ deleteMsg: true })

            }
        });
    };


    changeSalestoinvoice = (val) => {
        if(val==='invoice')
        {
            this.item_set_cal();
        }
        if (
            this.state.myarray.length > this.state.rows.length - 1 &&
            this.state.myarray[this.state.myarray.length - 1].price > 0 &&
            this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
            this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
            //&& item_check != ''
        ) {
            this.setState({ isTablefilled: false });
        } else {
            this.setState({ isTablefilled: true });
        }
        var btn_type = btn_type;
        // console.log("jhsvdkjash", this.state.myarray);
        let InvoiceCurrency = jQuery("#invoice_curr_id option:selected").val();
        // alert(InvoiceCurrency)
        if (InvoiceCurrency != "" && InvoiceCurrency != undefined) {
            this.setState({ isInvoiceCurrency: false });
        } else {
            this.setState({ isInvoiceCurrency: true });
        }
        let template_sel = jQuery("#template_sel option:selected").val();

        if (template_sel != "" && template_sel != undefined) {
            this.setState({ isTemplate: false });
        } else {
            this.setState({ isTemplate: true });
        }

        let customer_id = jQuery("#variable_pay_type option:selected").data(
            "status"
        );
        if (customer_id != "" && customer_id != undefined) {
            this.setState({ isCustomer: false });
        } else {
            this.setState({ isCustomer: true });
        }

        let InvoiceDate = jQuery("#invoice_date").val();
        if (InvoiceDate != "" && InvoiceDate != undefined) {
            this.setState({ isInvoiceDate: false });
        } else {
            this.setState({ isInvoiceDate: true });
        }
        let Due_date = jQuery("#due_date").val();
        if (Due_date != "" && Due_date != undefined) {
            this.setState({ isDueDate: false });
        } else {
            this.setState({ isDueDate: true });
        }

        // let Job_name = jQuery('#jobName option:selected').data('status')
        // if (Job_name != '' && Job_name != undefined) {
        //   this.setState({ isJobName: false })
        // } else {
        //   this.setState({ isJobName: true })
        // }

        var payable_amount = jQuery("#payable_amount").val();
        if (payable_amount != "" && payable_amount != undefined) {
            this.setState({ isPayable_amount: false });

            var paymentdate = jQuery("#payment_date").val();
            if (paymentdate != "" && paymentdate != undefined) {
                this.setState({ isPaymetDate: false });
            } else {
                this.setState({ isPaymetDate: true });
            }

            var payment_method = jQuery("#payment_method option:selected").val();
            if (payment_method != "" && payment_method != undefined) {
                this.setState({ isPaymentMethod: false });
            } else {
                this.setState({ isPaymentMethod: true });
            }

            var balanceCategId = jQuery(
                "#balanceSheetCategeory option:selected"
            ).val();

            if (balanceCategId != "" && balanceCategId != undefined) {
                this.setState({ isbalanceSheetcatId: false });
            } else {
                this.setState({ isbalanceSheetcatId: true });
            }
            // if(!is3partyAccRequired){
            // this.setState({ is3partyAccRequired: true })

            if (
                jQuery("#third_account_id option:selected").data("status") !==
                undefined ||
                jQuery("#third_account_id option:selected").data("status") !== ""
            ) {
                this.setState({ is3partyAccRequired: true });
            } else {
                // this.setState({ is3partyAccRequired: true })
            }
        } else {
            // this.setState({ isPayable_amount: true })
        }

        let account_id = jQuery("#account_id").val();
        if (account_id != "" && account_id != undefined) {
            this.setState({ isAccounId: false });
        } else {
            this.setState({ isAccounId: true });
        }

        let payment_date = this.state.payment_date;
        let amount_in_words = jQuery("#amount_in_words").val();

        // alert(this.state.exchange_value)

        var selected_date = this.convert_date_format();
        let client_id = this.state.logged_client_id;
        // let customer_id = this.state.active_selected

        let item_total_home_currency = jQuery("#foreigncurrencytyt").html();
        let tax_amount_home_currency = jQuery("#foreign_tax_total").html();
        let descripation = this.state.payment_desc
        // let grand_total_home_currency = jQuery("#foreign_grand_total").html();
        let grand_total_home_currency =
            Number(item_total_home_currency) + Number(tax_amount_home_currency);

        let item_total_foreign_currency = jQuery("#homecurrencytyt").html();
        let tax_amount_foreign_currency = jQuery("#home_tax_total").html();
        let grand_total_foreign_currency = jQuery("#home_grand_total").html();
        let currency = this.state.CurrentSelectedCurr;
        // let exchange_rate = this.state.exchange_value;cus_rate_rate
        let exchange_rate = this.state.cus_rate_rate;
        let invoice_date = selected_date;
        let company_name = this.state.logged_company_name;
        let type = 1;
        let invoice_number = jQuery("#invoice_no").val();
        let list_id = this.state.logged_user_id;
        let tagged_user_id = this.state.logged_user_id;
        let job_name = jQuery("#job_name").val();
        let shipping_address = jQuery("#shipping_to").val();
        let memo = jQuery("#memo").val();
        let thanking_message = jQuery("#footeroptionthanksmessages").val();
        let terms_and_conditions = jQuery("#termcondmsg").val();
        let item_list=[];
        console.log(val,this.state.dumm)
        if (val != "invoice") {
            item_list = this.state.myarray;
        } else {
            item_list = this.state.dummarray;
        }
        console.log(item_list)

        let shipping_to = jQuery("#shipping_to").val();
        let company_address = jQuery("#shipping_to").val();
        let footer_memo = jQuery("#footer_memo").val();
        let footer_thankyou = jQuery("#footeroptionthanksmessages").val();
        let footer_termscondition = jQuery("#termcondmsg").val();
        let mobile_no = jQuery("#mobile_no").val();

        if (this.state.isChecked) {
            var tax_type_name = "inclusive";
        } else {
            var tax_type_name = "exclusive";
        }

        // console.log("item_list_test", this.state.myarray);

        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        var get_invoice_date = new Date(invoice_date);
        var invoice_month = get_invoice_date.getMonth();
        var invoice_day = get_invoice_date.getDate();
        var invoice_year = get_invoice_date.getFullYear();

        var change_invoice_date =
            invoice_day + " " + monthNames[invoice_month] + " " + invoice_year;

        jQuery("#invoice_no_content").html(
            '<span id="invoice_value" style="font-weight: 600;">Invoice No:</span> ' +
            invoice_number
        );
        jQuery("#billed_to_content").next("p").html(company_address);
        jQuery("#date_content").html(
            '<span id="date_value" style="font-weight: 600;">Date:</span> ' +
            change_invoice_date
        );
        jQuery("#thank_u_msg_tag").html(footer_thankyou);
        jQuery("#terms_cond_msg_tag").html(footer_termscondition);
        jQuery("#footer_address").html(company_address);
        jQuery("#footer_mobile").html("| Mob: " + mobile_no);

        var item_incre = "";
        item_list.map((item_list_data, index) => {
            // console.log("item_list_data", item_list_data);
            // console.log("item_list_data_item_name", item_list_data.item_name);
            var incre = parseInt(index) + 1;

            item_incre +=
                '<tr id="table_row' +
                incre +
                '"><td id="no' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                incre +
                '</td><td id="item' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                item_list_data.item_name +
                '</td><td id="descrip' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                item_list_data.descr +
                '</td><td id="priceeach' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                item_list_data.unit_price +
                '</td><td id="quantity' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                item_list_data.quantity +
                '</td><td id="tax' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                item_list_data.item_tax +
                '</td><td id="total' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                item_list_data.item_total +
                "</td></tr>";
        });
        jQuery("#data_result table tbody").html(item_incre);

        jQuery("#sub_total_container")
            .next("div")
            .html(item_total_foreign_currency);
        jQuery("#tax_total_container").html(
            'Tax<span style="font-size: 14px;font-weight: normal;font-style: italic;">(' +
            tax_type_name +
            ")</span>"
        );
        jQuery("#tax_total_container")
            .next("div")
            .html(tax_amount_foreign_currency);
        jQuery("#grand_total_container")
            .next("div")
            .html(grand_total_foreign_currency);

        // price number to words
        // var numericValue = grand_total_foreign_currency;
        var numericValue = this.state.grandTotal;

        numericValue = parseFloat(numericValue).toFixed(2);
        var amount = numericValue.toString().split(".");
        var split_price = amount[0];
        var split_paisa = amount[1];
        // console.log(
        //     "convert_words",
        //     this.convertNumberToWords(split_price) +
        //     " " +
        //     this.convertNumberToWords(split_paisa)
        // );
        jQuery("#amount_words_tag")
            .next("div")
            .html(
                this.convertNumberToWords(split_price) +
                "Rupees and " +
                this.convertNumberToWords(split_paisa) +
                "Paisa only"
            );

        if (company_address === "") {
            this.setState({ isInvoice_to: true });
        } else {
            this.setState({ isInvoice_to: false });
        }
        if (job_name === "") {
            this.setState({ isjob_name: true });
        } else {
            this.setState({ isjob_name: false });
        }
        if (invoice_number === "") {
            this.setState({ isInvoice_no: true });
        } else {
            this.setState({ isInvoice_no: false });
        }

        if (this.state.selected_customer_name === "") {
            this.setState({ isCustomername: true });
        } else {
            this.setState({ isCustomername: false });
        }
        if (company_address === "") {
            this.setState({ isShippingt_to: true });
        }
        if (mobile_no === "") {
            this.setState({ isMobileno: true });
        } else {
            this.setState({ isMobileno: false });
        }

        if (jQuery("#invoice_to").val() === "") {
            this.setState({ isInvoice_to: true });
        } else {
            this.setState({ isInvoice_to: false });
        }
        if (jQuery("#template_sel").val() === '') {
            this.setState({ isTemplate_selected: true })
        } else {
            this.setState({ isTemplate_selected: false })
        }

        if (jQuery("#shipping_to").val() === "") {
            this.setState({ isShippingt_to: true });
        } else {
            this.setState({ isShippingt_to: false });
        }
        if (
            // this.state.myarray.length > this.state.rows.length - 1 &&
            // this.state.myarray[this.state.myarray.length - 1].price > 0 &&
            // this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
            // this.state.myarray[this.state.myarray.length - 1].category_id.length >
            //   0 &&
            // this.state.selected_templateName != 'Choose'
            client_id
        ) {
            // this.setState({ isTablefilled: false })
            let job_data = this.state.customerjoblist.find(
                (e) => e.job_name === "Others"
            );
            let job_id;
            let job_name;
            if (this.state.job_id === "" && job_data !== undefined) {
                job_id = job_data.id;                
                job_name = job_data.job_name;
            } else {
                job_id = this.state.job_id;
                job_name = this.state.job_name;
            }

            let data = {
                id: this.state.estimate_id,
                client_id: this.state.logged_client_id,
                customer_id: customer_id,
                item_total_home_currency: this.state.dummy_sub_total_home_currency,
                tax_amount_home_currency: this.state.dummy_tax_home_currency,
                grand_total_home_currency: this.state.dummy_grand_total_home_currency,
                item_total_foreign_currency: item_total_foreign_currency,
                tax_amount_foreign_currency: tax_amount_foreign_currency,
                grand_total_foreign_currency: grand_total_foreign_currency,
                currency: currency,
                exchange_rate: exchange_rate,
                invoice_date: this.custConverter(jQuery("#invoice_date").val()),
                company_name: company_name,
                type: type,
                invoice_number: invoice_number,
                company_address: jQuery("#invoice_to").val(),
                list_id: list_id,
                tagged_user_id: this.state.logged_user_id,
                item_list: item_list,
                // job_name: job_name,
                job_name: job_name,
                memo: jQuery("#footer_memo").val(),
                shipping_address: company_address,
                thanking_message: thanking_message,
                terms_and_conditions: terms_and_conditions,
                // job_id: jQuery("#jobName option:selected").data("status"),
                job_id: job_id,
                // payment_date: this.custConverter(jQuery('#payment_date').val()),
                payment_date:
                    this.custConverter(jQuery("#payment_date").val()) ==
                        "undefined-undefined-"
                        ? ""
                        : this.custConverter(jQuery("#payment_date").val()),
                payment_method: payment_method,
                descripation: this.state.payment_desc,
                amount_in_words: jQuery("#amount_in_words").val(),
                due_date: this.custConverter(jQuery("#due_date").val()),
                reference: jQuery("#reference").val(),
                payment_amount: payable_amount,
                account: jQuery("#account_id").val(),
                payment_exchange_rate: jQuery("#payment_exchange_rate").val(),
                balance_sheet_category: balanceCategId,
                tax_inclusive: this.state.isChecked ? "1" : 0,
                thrird_party_account_id: jQuery("#third_account_id").val(),
                third_party_type: this.state.thrird_party_type,
                third_party_account_name: jQuery(
                    "#third_account_id option:selected"
                ).data("status"),
                descripation: this.state.payment_desc,
                template_id: this.state.template_id,
                isInvoiceEditable: this.state.isInvoiceEditable,
                estimate_id: this.state.estimate_id,
                sales_order_id:this.state.sales_order_id
            };

            console.log("datatnow", data);
            if (
                InvoiceCurrency &&
                template_sel &&
                customer_id &&
                InvoiceDate &&
                Due_date &&
                account_id
            ) {
                if (!this.state.isInvoiceEditable || this.state.isInvoiceEditable) {
                    let payable_amount = jQuery("#payable_amount").val();
                    if (payable_amount == "" || payable_amount == undefined) {
                        if (val == "invoice") {
                            localStorage.setItem("change_invoice_sales", JSON.stringify(data))
                            window.open("/create_invoice")
                        } else {
                            localStorage.setItem("copy_salesorder", JSON.stringify(data))
                            window.open("/create_salesorder")
                        }
                    }
                }
            }

        }

    };


    changeSalestoinvoiceAll = () => {
        this.handleChangeItems(0, this.state.rows.length - 1);

        // alert(jQuery('#categry_id'+0).val())
        if (
            this.state.myarray.length > this.state.rows.length - 1 &&
            this.state.myarray[this.state.myarray.length - 1].price > 0 &&
            this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
            this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
            //&& item_check != ''
        ) {
            this.setState({ isTablefilled: false });
        } else {
            this.setState({ isTablefilled: true });
        }
        var btn_type = btn_type;
        // console.log("jhsvdkjash", this.state.myarray);
        let InvoiceCurrency = jQuery("#invoice_curr_id option:selected").val();
        // alert(InvoiceCurrency)
        if (InvoiceCurrency != "" && InvoiceCurrency != undefined) {
            this.setState({ isInvoiceCurrency: false });
        } else {
            this.setState({ isInvoiceCurrency: true });
        }
        let template_sel = jQuery("#template_sel option:selected").val();

        if (template_sel != "" && template_sel != undefined) {
            this.setState({ isTemplate: false });
        } else {
            this.setState({ isTemplate: true });
        }

        let customer_id = jQuery("#variable_pay_type option:selected").data(
            "status"
        );
        if (customer_id != "" && customer_id != undefined) {
            this.setState({ isCustomer: false });
        } else {
            this.setState({ isCustomer: true });
        }

        let InvoiceDate = jQuery("#invoice_date").val();
        if (InvoiceDate != "" && InvoiceDate != undefined) {
            this.setState({ isInvoiceDate: false });
        } else {
            this.setState({ isInvoiceDate: true });
        }
        let Due_date = jQuery("#due_date").val();
        if (Due_date != "" && Due_date != undefined) {
            this.setState({ isDueDate: false });
        } else {
            this.setState({ isDueDate: true });
        }

        // let Job_name = jQuery('#jobName option:selected').data('status')
        // if (Job_name != '' && Job_name != undefined) {
        //   this.setState({ isJobName: false })
        // } else {
        //   this.setState({ isJobName: true })
        // }

        var payable_amount = jQuery("#payable_amount").val();
        if (payable_amount != "" && payable_amount != undefined) {
            this.setState({ isPayable_amount: false });

            var paymentdate = jQuery("#payment_date").val();
            if (paymentdate != "" && paymentdate != undefined) {
                this.setState({ isPaymetDate: false });
            } else {
                this.setState({ isPaymetDate: true });
            }

            var payment_method = jQuery("#payment_method option:selected").val();
            if (payment_method != "" && payment_method != undefined) {
                this.setState({ isPaymentMethod: false });
            } else {
                this.setState({ isPaymentMethod: true });
            }

            var balanceCategId = jQuery(
                "#balanceSheetCategeory option:selected"
            ).val();

            if (balanceCategId != "" && balanceCategId != undefined) {
                this.setState({ isbalanceSheetcatId: false });
            } else {
                this.setState({ isbalanceSheetcatId: true });
            }
            // if(!is3partyAccRequired){
            // this.setState({ is3partyAccRequired: true })

            if (
                jQuery("#third_account_id option:selected").data("status") !==
                undefined ||
                jQuery("#third_account_id option:selected").data("status") !== ""
            ) {
                this.setState({ is3partyAccRequired: true });
            } else {
                // this.setState({ is3partyAccRequired: true })
            }
        } else {
            // this.setState({ isPayable_amount: true })
        }

        let account_id = jQuery("#account_id").val();
        if (account_id != "" && account_id != undefined) {
            this.setState({ isAccounId: false });
        } else {
            this.setState({ isAccounId: true });
        }

        let payment_date = this.state.payment_date;
        let amount_in_words = jQuery("#amount_in_words").val();

        // alert(this.state.exchange_value)

        var selected_date = this.convert_date_format();
        let client_id = this.state.logged_client_id;
        // let customer_id = this.state.active_selected

        let item_total_home_currency = jQuery("#foreigncurrencytyt").html();
        let tax_amount_home_currency = jQuery("#foreign_tax_total").html();
        let descripation = this.state.payment_desc
        // let grand_total_home_currency = jQuery("#foreign_grand_total").html();
        let grand_total_home_currency =
            Number(item_total_home_currency) + Number(tax_amount_home_currency);

        let item_total_foreign_currency = jQuery("#homecurrencytyt").html();
        let tax_amount_foreign_currency = jQuery("#home_tax_total").html();
        let grand_total_foreign_currency = jQuery("#home_grand_total").html();
        let currency = this.state.CurrentSelectedCurr;
        // let exchange_rate = this.state.exchange_value;cus_rate_rate
        let exchange_rate = this.state.cus_rate_rate;
        let invoice_date = selected_date;
        let company_name = this.state.logged_company_name;
        let type = 1;
        let invoice_number = jQuery("#invoice_no").val();
        let list_id = this.state.logged_user_id;
        let tagged_user_id = this.state.logged_user_id;
        let job_name = jQuery("#job_name").val();
        let shipping_address = jQuery("#shipping_to").val();
        let memo = jQuery("#memo").val();
        let thanking_message = jQuery("#footeroptionthanksmessages").val();
        let terms_and_conditions = jQuery("#termcondmsg").val();
        let item_list = this.state.myarray;

        let shipping_to = jQuery("#shipping_to").val();
        let company_address = jQuery("#shipping_to").val();
        let footer_memo = jQuery("#footer_memo").val();
        let footer_thankyou = jQuery("#footeroptionthanksmessages").val();
        let footer_termscondition = jQuery("#termcondmsg").val();
        let mobile_no = jQuery("#mobile_no").val();

        if (this.state.isChecked) {
            var tax_type_name = "inclusive";
        } else {
            var tax_type_name = "exclusive";
        }

        // console.log("item_list_test", this.state.myarray);

        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        var get_invoice_date = new Date(invoice_date);
        var invoice_month = get_invoice_date.getMonth();
        var invoice_day = get_invoice_date.getDate();
        var invoice_year = get_invoice_date.getFullYear();

        var change_invoice_date =
            invoice_day + " " + monthNames[invoice_month] + " " + invoice_year;

        jQuery("#invoice_no_content").html(
            '<span id="invoice_value" style="font-weight: 600;">Invoice No:</span> ' +
            invoice_number
        );
        jQuery("#billed_to_content").next("p").html(company_address);
        jQuery("#date_content").html(
            '<span id="date_value" style="font-weight: 600;">Date:</span> ' +
            change_invoice_date
        );
        jQuery("#thank_u_msg_tag").html(footer_thankyou);
        jQuery("#terms_cond_msg_tag").html(footer_termscondition);
        jQuery("#footer_address").html(company_address);
        jQuery("#footer_mobile").html("| Mob: " + mobile_no);

        var item_incre = "";
        item_list.map((item_list_data, index) => {
            // console.log("item_list_data", item_list_data);
            // console.log("item_list_data_item_name", item_list_data.item_name);
            var incre = parseInt(index) + 1;

            item_incre +=
                '<tr id="table_row' +
                incre +
                '"><td id="no' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                incre +
                '</td><td id="item' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                item_list_data.item_name +
                '</td><td id="descrip' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                item_list_data.descr +
                '</td><td id="priceeach' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                item_list_data.unit_price +
                '</td><td id="quantity' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                item_list_data.quantity +
                '</td><td id="tax' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                item_list_data.item_tax +
                '</td><td id="total' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                item_list_data.item_total +
                "</td></tr>";
        });
        jQuery("#data_result table tbody").html(item_incre);

        jQuery("#sub_total_container")
            .next("div")
            .html(item_total_foreign_currency);
        jQuery("#tax_total_container").html(
            'Tax<span style="font-size: 14px;font-weight: normal;font-style: italic;">(' +
            tax_type_name +
            ")</span>"
        );
        jQuery("#tax_total_container")
            .next("div")
            .html(tax_amount_foreign_currency);
        jQuery("#grand_total_container")
            .next("div")
            .html(grand_total_foreign_currency);

        // price number to words
        // var numericValue = grand_total_foreign_currency;
        var numericValue = this.state.grandTotal;

        numericValue = parseFloat(numericValue).toFixed(2);
        var amount = numericValue.toString().split(".");
        var split_price = amount[0];
        var split_paisa = amount[1];
        // console.log(
        //     "convert_words",
        //     this.convertNumberToWords(split_price) +
        //     " " +
        //     this.convertNumberToWords(split_paisa)
        // );
        jQuery("#amount_words_tag")
            .next("div")
            .html(
                this.convertNumberToWords(split_price) +
                "Rupees and " +
                this.convertNumberToWords(split_paisa) +
                "Paisa only"
            );

        if (company_address === "") {
            this.setState({ isInvoice_to: true });
        } else {
            this.setState({ isInvoice_to: false });
        }
        if (job_name === "") {
            this.setState({ isjob_name: true });
        } else {
            this.setState({ isjob_name: false });
        }
        if (invoice_number === "") {
            this.setState({ isInvoice_no: true });
        } else {
            this.setState({ isInvoice_no: false });
        }

        if (this.state.selected_customer_name === "") {
            this.setState({ isCustomername: true });
        } else {
            this.setState({ isCustomername: false });
        }
        if (company_address === "") {
            this.setState({ isShippingt_to: true });
        }
        if (mobile_no === "") {
            this.setState({ isMobileno: true });
        } else {
            this.setState({ isMobileno: false });
        }

        if (jQuery("#invoice_to").val() === "") {
            this.setState({ isInvoice_to: true });
        } else {
            this.setState({ isInvoice_to: false });
        }
        if (jQuery("#template_sel").val() === '') {
            this.setState({ isTemplate_selected: true })
        } else {
            this.setState({ isTemplate_selected: false })
        }

        if (jQuery("#shipping_to").val() === "") {
            this.setState({ isShippingt_to: true });
        } else {
            this.setState({ isShippingt_to: false });
        }
        if (
            // this.state.myarray.length > this.state.rows.length - 1 &&
            // this.state.myarray[this.state.myarray.length - 1].price > 0 &&
            // this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
            // this.state.myarray[this.state.myarray.length - 1].category_id.length >
            //   0 &&
            // this.state.selected_templateName != 'Choose'
            client_id
        ) {
            // this.setState({ isTablefilled: false })
            let job_data = this.state.customerjoblist.find(
                (e) => e.job_name === "Others"
            );
            let job_id;
            let job_name;
            if (this.state.job_id === "" && job_data !== undefined) {
                job_id = job_data.id;
                job_name = job_data.job_name;
            } else {
                job_id = this.state.job_id;
                job_name = this.state.job_name;
            }

            let data = {
                id: this.state.estimate_id,
                client_id: this.state.logged_client_id,
                customer_id: customer_id,
                item_total_home_currency: item_total_home_currency,
                tax_amount_home_currency: tax_amount_home_currency,
                grand_total_home_currency: grand_total_home_currency,
                item_total_foreign_currency: item_total_foreign_currency,
                tax_amount_foreign_currency: tax_amount_foreign_currency,
                grand_total_foreign_currency: grand_total_foreign_currency,
                currency: currency,
                exchange_rate: exchange_rate,
                invoice_date: this.custConverter(jQuery("#invoice_date").val()),
                company_name: company_name,
                type: type,
                invoice_number: invoice_number,
                company_address: jQuery("#invoice_to").val(),
                list_id: list_id,
                tagged_user_id: this.state.logged_user_id,
                item_list: item_list,
                // job_name: job_name,
                job_name: job_name,
                memo: jQuery("#footer_memo").val(),
                shipping_address: company_address,
                thanking_message: thanking_message,
                terms_and_conditions: terms_and_conditions,
                // job_id: jQuery("#jobName option:selected").data("status"),
                job_id: job_id,
                // payment_date: this.custConverter(jQuery('#payment_date').val()),
                payment_date:
                    this.custConverter(jQuery("#payment_date").val()) ==
                        "undefined-undefined-"
                        ? ""
                        : this.custConverter(jQuery("#payment_date").val()),
                payment_method: payment_method,
                descripation: this.state.payment_desc,
                amount_in_words: jQuery("#amount_in_words").val(),
                due_date: this.custConverter(jQuery("#due_date").val()),
                reference: jQuery("#reference").val(),
                payment_amount: payable_amount,
                account: jQuery("#account_id").val(),
                payment_exchange_rate: jQuery("#payment_exchange_rate").val(),
                balance_sheet_category: balanceCategId,
                tax_inclusive: this.state.isChecked ? "1" : 0,
                thrird_party_account_id: jQuery("#third_account_id").val(),
                third_party_type: this.state.thrird_party_type,
                third_party_account_name: jQuery(
                    "#third_account_id option:selected"
                ).data("status"),
                descripation: this.state.payment_desc,
                template_id: this.state.template_id,
                isInvoiceEditable: this.state.isInvoiceEditable,
                estimate_id: this.state.estimate_id,
                sales_order_id:this.state.sales_order_id

            };

            console.log("datatnow", data);
            if (
                InvoiceCurrency &&
                template_sel &&
                customer_id &&
                InvoiceDate &&
                Due_date &&
                account_id
            ) {
                if (!this.state.isInvoiceEditable || this.state.isInvoiceEditable) {
                    let payable_amount = jQuery("#payable_amount").val();
                    if (payable_amount == "" || payable_amount == undefined) {

                        localStorage.setItem("change_invoice_sales", JSON.stringify(data))
                        window.open("/create_invoice");


                    }
                }
            }

        }
    }



    changefromDate() {
        // let date = jQuery("#invoice_date").val();
        let date = this.state.temp_date

        if (date != undefined) {
            var array = date.split("/");
            var date_formated = array[2] + "-" + array[1] + "-" + array[0];
            var fomrat = moment(date_formated, "YYYY-MM-DD").format("DD-MM-YYYY");

            // console.log('ppppp', date_formated)
            // console.log('ppppp', fomrat)
            return (date_formated)
        }
    }

    // to check lock password


    saveAsPdf = () => {
        let Input = {
            client_id: this.state.logged_client_id,
            sales_order_id: this.state.sales_order_id ? this.state.sales_order_id : this.state.invoice_id_used,
            template_id: this.state.template_id
        }

        let dummy = {
            "status": 1,
            "message": "PDF saved successfully",
            "file_path": "http://13.250.63.251:9002/saved_sales_invoies/invoice-SIC-4.pdf"
        }

        // window.open(dummy.file_path);

        FetchAllApi.print_pdf(Input, 'salesorder', (err, response) => {
            if (response.status === 1) {
                alert(response.message)
                window.open(response.file_path);
            } else {
            }
            alert(response.message)
        });

    };




    print = () => {
        var getHTML = jQuery("#printing_template").html();
        fetch("https://v2018.api2pdf.com/chrome/html", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "27662ed5-3115-47b9-b6df-aec6e053edc8", //Get your API key from https://portal.api2pdf.com      11011305-f6cf-4868-b731-74c53dcf9f89
            },
            body: JSON.stringify({
                html: getHTML,
                inlinePdf: true,
                fileName: "test.pdf",
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success === true) {
                    window.open(res.pdf);
                    //window.location.href = res.pdf;
                } else {
                }
            });

    };


    get_client_home_currency = () => {
        let client_id = this.state.logged_client_id;

        FetchAllApi.get_client_home_currency(client_id, (err, response) => {
            if (response.status === 1) {
                this.setState(
                    {
                        clientHomeCurrency: response.currency,
                    },
                    this.get_currencies()
                );
            } else {
            }
        });
    };

    add_gst_details = (e) => {
        e.preventDefault();
        let sales_tax_code = this.state.sales_tax_code;
        let sales_tax_name = this.state.salesTax_name_entered;
        let show_on_list = 1;
        let tax_type = this.state.selectedOption === "option1" ? 1 : 2;
        let rate = this.state.rate_entered;

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
        FetchAllApi.add_gst_details(items, (err, response) => {

            if (response.status === 1) {
                jQuery("#sales_tax_code").val("");
                jQuery("#sales_tax_name").val("");
                jQuery("#sales_tax_name").val("");
                jQuery("#tax").val("");

                this.setState({
                    show_succes: true,
                    sales_tax_code: "",
                    sales_tax_name: "",
                    tax_type: "",
                    rate: "",
                });
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

    add_autoinvoice = (e) => {
        e.preventDefault();       
        //console.log(this.state.monthnumberoption,jQuery("#monthnumberoption").val())
        let start_date = this.custConverter(jQuery("#autoinvoicestartdate").val());
        let end_date  =  this.custConverter(jQuery("#autoinvoiceenddate").val());
        let month_or_number = this.state.monthnumberoption === "option1" ? "month" : "number";
        let auto_invoice_date  = jQuery("#autoinvoicedate").val() ;      
        let items = {
            start_date,
            end_date,
            month_or_number,
            auto_invoice_date,
            client_id: this.state.logged_client_id,
            sales_order_id :this.state.sales_order_id
        };       
        FetchAllApi.sales_order_to_auto_invoice(items, (err, response) => {
            if (response.status === 1) {
                jQuery("#autoinvoicedate").val("");
                jQuery("#autoinvoiceenddate").val("");
                jQuery("#autoinvoice_date").val("");              
                this.setState({
                    show_succes: true,
                    autoinvoicedate: "",
                    autoinvoiceenddate: "",
                    autoinvoice_date: 0,
                });               
                var THIS = this;
                setTimeout(function () {
                    THIS.setState({ show_succes: false });
                }, 4000);
                alert(response.message);
                window.jQuery("#modal-autoinvoice").modal("hide");

            } else {
                alert(response.message);                
            }
        });
    };
    modal_cancel = () => {
        jQuery("#sales_tax_code").val("");
        jQuery("#sales_tax_name").val("");
        jQuery("#sales_tax_name").val("");
        jQuery("#tax").val("");
        this.setState({ modal_info_msg: "" });
        window.jQuery("#pop-modal-1").modal("hide");
    };
    modal_autoinvoice_cancel = () => {       
        jQuery("#autoinvoicedate").val("");
        jQuery("#autoinvoiceenddate").val("");
        jQuery("#autoinvoice_date").val("");    
        window.jQuery("#modal-autoinvoice").modal("hide");
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
    handleChange_gst_type = (event) => {
        if (this.state.selected_rate_type != "Fixed price") {
            let entered_value = event.target.value;
            // alert(entered_value)
            if (isNaN(entered_value)) {
                jQuery("#tax").val("");
            } else {
                if (entered_value > 100) {
                    jQuery("#tax").val("");
                } else {
                    this.setState({ rate_entered: entered_value });
                }
            }
        } else {
            let entered_value = event.target.value;
            if (isNaN(entered_value)) {
                jQuery("#tax").val("");
            } else {
                this.setState({ rate_entered: entered_value });
            }
        }
    };

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value,
        });
    };
    handleautoinvoiceoption = (changeEvent) => {
        this.setState({
            monthnumberoption: changeEvent.target.value,
        });
    };   
    handleChangeTax(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            },
            () => this.validation_clean()
        );
    }
    validation_clean = () => {
        this.state.company_name != ""
            ? this.setState({ isCompany_name: true })
            : this.setState({});
        this.state.invoice_no != ""
            ? this.setState({ isInvoice_no: true })
            : this.setState({});
        this.state.balance_sheet_category_id != ""
            ? this.setState({ isBalance_sheet_category_name: true })
            : this.setState({});
    };

    newJob = (job_name) => {
        if (job_name == "Create New") {
            jQuery("#jobName option").prop("selected", false).trigger("change");
            if (
                this.state.selectCustomer != "" &&
                this.state.selectCustomer != undefined &&
                this.state.selectCustomer != null
            ) {
                // alert(this.state.selectCustomer)
                localStorage.setItem("selected_customer_id", this.state.selectCustomer);
                // this.props.history.push('/add-job', this.state.selectCustomer)

                let win = window.open("/add-job", "_blank");
                win.focus();
            } else {
                jQuery("#jobName option").prop("selected", false).trigger("change");

                alert("Please Choose Customer first...");
            }
        } else {
           // let job_id = jQuery("#jobName option:selected").data("status");
            let jobObject = this.state.customerjoblist.find(item => 
                item.job_name == job_name
            )
           let job_id = jobObject.id?jobObject.id:1;
           this.setState({ job_id, JobId: job_id, job_name });
            // this.setState({ job_name: job_name });
        }
    };

    customerjoblist = (id, x) => {
        // var client_id = localStorage.getItem("logged_client_id") ;
        var client_id = this.state.logged_client_id;
        var customer_id = id;

        FetchAllApi.customerjoblist(client_id, customer_id, (err, response) => {
            // alert(re)
            var myArray = response.results;
            if (response.status === 1) {
                this.setState({ customerjoblist: response.results }, () => {
                    // setTimeout(() => {
                    if (x !== undefined && x !== null) {
                        myArray.map((item) => {
                            if(this.state.JobId != undefined &&  item.id==  this.state.JobId)
                            {
                             this.setState({ job_name: item.job_name });
                             jQuery("#jobName").val(item.job_name);
                            }                            
                        });
                        localStorage.setItem("job_added_id", "");
                        window.jQuery("#jobName").selectpicker("refresh");
                    }
                    else{
                        myArray.map((item) => {
                            if(this.state.JobId != undefined &&  item.id==  this.state.JobId)
                            {
                             this.setState({ job_name: item.job_name });
                             jQuery("#jobName").val(item.job_name);
                            }
                          
                        });
                        localStorage.setItem("job_added_id", "");
                        window.jQuery("#jobName").selectpicker("refresh");
                    }
                    // }, 3000);
                });
            } else {
                this.setState({ customerjoblist: [] });
            }
        });
    };

    Basic_info = (id) => {
        let client_id = this.state.logged_client_id;
        let customer_id = id;

        FetchAllApi.Basic_info(client_id, customer_id, (err, response) => {
            console.log(response)
            if (response.status === 1) {
                this.setState({
                    Basic_info: response.response,
                    billing_address: response.response[0].billing_address,
                    shipping_address: response.response[0].shipping_address,
                    customer_name: response.response[0].customer_name,
                    currency_customer: response.response[0].currency,
                    ToCurrency: response.response[0].currency,
                });
            } else {
            }
        });
    };

    handleChange = (selected_option) => {
        if (selected_option == "Create New") {
            jQuery("#variable_pay_type option")
                .prop("selected", false)
                .trigger("change");
            // this.props.history.push('/add-new-customer')

            let win = window.open("/add-new-customer", "_blank");
            win.focus();
        } else {
            jQuery("#jobName").val('');
            let job_id = jQuery("#jobName option:selected").data("status");
            let variable_pay_type = jQuery("#variable_pay_type option:selected").data(
                "status"
            );
            localStorage.setItem(
                "customer",
                selected_option + "=" + variable_pay_type
            );
            
            this.setState(
                {
                    selectCustomer: variable_pay_type,
                    vendorName: jQuery("#variable_pay_type").val(),
                },
                () => {
                    // alert(this.state.selectCustomer)
                }
            );

            this.Basic_info(variable_pay_type);
            this.setState({ myCusVarPay: variable_pay_type });
            this.customerjoblist(variable_pay_type);
            this.customer_and_job_list(selected_option);
        }
    };
    customer_and_job_list = (x) => {
        // var client_id = localStorage.getItem("logged_client_id") ;
        var client_id = this.state.logged_client_id;
        var from_customer_receive_payment = 0;
        let country_code = this.state.country_code;
        //alert(country_code)
        let keyword = this.state.search_key_gst;

        FetchAllApi.customer_and_job_list(
            client_id,
            from_customer_receive_payment,
            (err, response) => {
                console.log("vendor_names", response);

                if (response.status === 1) {
                    let myArray = response.list;
                    myArray.map((val) => {
                        if (val.id == x) {
                            FetchAllApi.sales_product_item_list(client_id, (err, response) => {
                                console.log("vxxxendor_names", response);

                                if (response.status === 1) {
                                    this.getItems();
                                    response.list.map((item) => {
                                        if (val.sales_item_default == item.item_id) {
                                            {
                                                setTimeout(() => {
                                                    var makeUse =
                                                        item.rate +
                                                        "=" +
                                                        item.description +
                                                        "=" +
                                                        item.account_name_category +
                                                        "=" +
                                                        item.item_name +
                                                        "=" +
                                                        item.item_id;
                                                    jQuery("#cust_items" + 0).val(makeUse)
                                                    jQuery("#item" + 0).val(item.item_name)
                                                    window.jQuery("#cust_items" + 0).selectpicker("refresh");



                                                    jQuery("#descr" + 0).val(item.description);
                                                    jQuery("#unit_price" + 0).val(item.rate);
                                                    //below

                                                    jQuery("#categry_id" + 0)
                                                        .val(item.account_name_category);
                                                    window.jQuery("#categry_id" + 0).selectpicker("refresh");

                                                }, 1000)
                                            }
                                        }
                                    })



                                }
                            })

                            FetchAllApi.get_gst_list(country_code, keyword, this.state.logged_client_id, (err, response) => {
                                console.log("defaultcategorylist", response);
                                //alert(response.message)
                                if (response.status === 1) {
                                    response.list.map((tx) => {
                                        if (val.sales_tax_default == tx.id) {
                                            jQuery("#selectednow" + 0).html(tx.sales_tax_name);
                                            // alert(rate)
                                            jQuery("#selectedrate_id" + 0).val(tx.rate);
                                            jQuery("#selectedtype_id" + 0).val(tx.rate_type);
                                            jQuery("#selectednow_id" + 0).html(tx.id);
                                        }
                                    })
                                }
                            });


                        }
                    })

                    this.setState(
                        { customer_and_job_list: response.list },

                        () => {
                            setTimeout(() => {
                                if (x !== undefined && x !== null) {
                                    myArray.map((item) => {
                                        if (item.id == x) {
                                            jQuery("#variable_pay_type").val(item.id);
                                        }
                                    });
                                    localStorage.setItem("customer_added_id", "");
                                    window.jQuery("#variable_pay_type").selectpicker("refresh");
                                }
                            }, 2000);
                        }
                    );
                } else {
                }
            }
        );
    };

    onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState((state) => {
            state[name] = value;
            return state;
        });
    };

    convertPDF = () => {
        alert();
    };
    onChange = (date) => this.setState({ date });

    UNSAFE_componentWillMount() {
        // this.get_customerlist()

        this.get_invoice_list();
        if (
            this.state.logged_user_id === "" ||
            this.state.logged_user_id === null ||
            this.state.logged_user_id === undefined
        ) {
            this.props.history.push("/");
        }

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        var today_date = yyyy + "-" + mm + "-" + dd;

        if (this.state.logged_subscription_end_date < today_date) {
            //this.props.history.push('/register_Payment');
        }

        /* =================== */
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
        /* =================== */
    }

    /* =================== */
    Chk_table_validation = () => {
        var item_check = jQuery(
            `#coulmn${this.state.rows.length - 1}${this.state.coulmns.length - 1}`
        ).val();
        if (
            this.state.myarray.length > this.state.rows.length - 1 &&
            this.state.myarray[this.state.myarray.length - 1].price > 0 &&
            this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
            this.state.myarray[this.state.myarray.length - 1].category_id.length >
            0 &&
            item_check != ""
        ) {
            return true;
        } else {
            return false;
        }
    };
    val_me = () => {
        if (this.Chk_table_validation()) {
            this.setState({ isTable_notEmpty: false });
        } else {
        }
    };
    val_me_Check = () => {
        if (this.Chk_table_validation()) {
        } else {
            this.setState({ isTable_notEmpty: true });
        }
    };

    toggleChange = () => {
        this.setState(
            {
                isChecked: !this.state.isChecked,
            },
            () => {
                this.handleChangeItems("", this.state.rows.length - 1);
            }
        );
    };

    update_search_keyword = (event) => {
        this.setState({ search_key_gst: event.target.value }, () => {
            this.get_gst_list();
        });
    };

    get_gst_list = () => {
        let country_code = this.state.country_code;
        //alert(country_code)
        let keyword = this.state.search_key_gst;
        FetchAllApi.get_gst_list(country_code, keyword, this.state.logged_client_id, (err, response) => {
            //alert(response.message)
            if (response.status === 1) {
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

    handleCheck_get_selected_tax(
        selectednow_id,
        itemid,
        id,
        valueres,
        rate,
        type
    ) {

        // this.setState(
        //   {
        //     sales_tax_name: e.currentTarget.dataset.name,
        //     sales_tax_rate: e.currentTarget.dataset.rate,
        //     sales_tax_type: e.currentTarget.dataset.type
        //   }
        // )

        if (selectednow_id > 0) {
            // document.getElementById(id).innerHTML = valueres;
            // document.getElementById('selectedrate_id' + itemid).value = e.currentTarget.dataset.rate
            // document.getElementById('selectedtype_id' + itemid).value = e.currentTarget.dataset.type
            // document.getElementById('selectednow_id' + itemid).innerHTML = selectednow_id

            jQuery("#" + id).html(valueres);
            // alert(rate)
            jQuery("#selectedrate_id" + itemid).val(rate);
            jQuery("#selectedtype_id" + itemid).val(type);
            jQuery("#selectednow_id" + itemid).html(selectednow_id);

            this.handleChangeItems(valueres, this.state.rows.length - 1);

            jQuery(".form-table").removeClass("ovrFlwRmve");
        } else {
            alert("sorry fault is here only");
        }

        jQuery("#gst_search").val("");
        this.get_gst_list();
    };

    tableDropDynamic = (e, id, colId) => {
        const userId =
            this.state
                .logged_user_id;
        const coulmnId = colId;
        const isPopup =
            e.target.value;
        jQuery("#colid").val(
            coulmnId
        );
        if (isPopup == "1e") {
            jQuery(
                "#customer_type option"
            )
                .prop(
                    "selected",
                    false
                )
                .trigger("change");

            window
                .jQuery(
                    "#add_new_role"
                )
                .modal("show");
        } else {
            this.handleChangeItems(
                e, id
            )
        }
    };

    popup_check_cal = (val, itemid) => {
        let data = this.state.myarray[itemid]
        console.log(data);
        this.setState({ dummarray: [...this.state.dummarray, data]},()=>console.log("this state....",this.state) )
        console.log(this.state.dummarray);
    }


    item_set_cal = async (currid = '', itemid = '') => {
        let dummarray = this.state.dummarray;
        this.addSerialNumber();
        // alert(itemid)
        // console.log("itemid", itemid);

        var result = [];
        var itemprice = [];
        var subTotal = 0;
        var tax_total = 0;
        console.log(document.getElementById("selectednow_id" + i))
        for (var i = 0; i < dummarray.length; i++) {
            // alert(i)
            if (document.getElementById("selectednow_id" + i)) {
                //subTotal+=jQuery('#subtotal'+i).val();

                var item_name =
                    dummarray[i].item_name != "" ? dummarray[i].item_name : 0;
                var descr =
                    dummarray[i].descr != "" ? dummarray[i].descr : 0;
                var quantity_check =
                    dummarray[i].quantity != ""
                        ? dummarray[i].quantity
                        : 0;
                var quantity = isNaN(quantity_check)
                    ? jQuery("#quantity" + i).val("")
                    : quantity_check;
                var check = jQuery("#dynamic" + i).val() != ""
                    ? jQuery("#dynamic" + i).val()
                    : 0;
                var checkf = isNaN(check)
                    ? jQuery("#dynamic" + i).val("")
                    : check;
                var unit_price_check =
                    dummarray[i].unit_price != ""
                        ? dummarray[i].unit_price
                        : 0;
                var unit_price = isNaN(unit_price_check)
                    ? jQuery("#unit_price" + i).val("")
                    : unit_price_check;
                var price = quantity * unit_price;
                var selectednow_id = document.getElementById("selectednow_id" + i)
                    .innerText;
                var category_id =
                    selectednow_id != "NO_VALUE"
                        ? selectednow_id
                        : this.state.selectedindex != ""
                            ? this.state.selectedindex
                            : "";

                var myCat = dummarray[i].category_id

                // console.log("category_id", category_id);
                var id = i;
                // if(this.state.isChecked){
                // var Total =  this.state.sales_tax_type != 2 ? (price / (parseFloat(this.state.sales_tax_rate) + 100)) * 100: price - parseFloat(this.state.sales_tax_rate)
                // }else{
                //   var Total=this.state.sales_tax_type != 2 ? price:price
                // }

                var sales_tax_type =
                    jQuery("#selectedtype_id" + i).val() != ""
                        ? jQuery("#selectedtype_id" + i).val()
                        : 0;
                var sales_tax_rate =
                    jQuery("#selectedrate_id" + i).val() != ""
                        ? jQuery("#selectedrate_id" + i).val()
                        : 0;


                // console.log(
                //     "sales_tax_type",
                //     price + " " + sales_tax_rate + " " + sales_tax_type + " " + quantity
                // );

                if (this.state.isChecked) {
                    if (
                        parseFloat(sales_tax_rate) > 0 &&
                        parseInt(sales_tax_type) === 1
                    ) {
                        var tax =
                            (price * parseFloat(sales_tax_rate)) /
                            (100 + parseFloat(sales_tax_rate));
                        // (value / (parseFloat(this.state.sales_tax_rate) + 100)) * 100;

                        // var tax = price / parseFloat(sales_tax_rate)
                        // var Total = parseFloat(price) - tax
                        var Total = parseFloat(price);
                    } else if (parseInt(sales_tax_type) === 2) {
                        var tax = parseFloat(sales_tax_rate);
                        // var Total = parseFloat(price) - tax;
                        var Total = parseFloat(price);
                    } else {
                        var tax = 0;
                        var Total = parseFloat(price);
                    }
                } else {
                    if (
                        parseFloat(sales_tax_rate) > 0 &&
                        parseInt(sales_tax_type) === 1
                    ) {
                        var tax = price * (parseFloat(sales_tax_rate) / 100);
                        var Total = parseFloat(price);
                    } else if (parseInt(sales_tax_type) === 2) {
                        var tax = parseFloat(sales_tax_rate);
                        var Total = parseFloat(price);
                    } else {
                        var tax = 0;
                        var Total = parseFloat(price);
                    }
                }

                // console.log("Total", Total);
                if (isNaN(Total)) {
                    if (currid == id) {
                    } else {
                        jQuery("#subtotal" + id).val(0);
                    }
                } else {
                    if (currid == id) {
                    } else {
                        jQuery("#subtotal" + id).val(parseFloat(Total).toFixed(2));
                    }
                }

                // } else {jQuery("#subtotal" + id).val(this.formatCurrency(this.state.currency_customer)(parseFloat(Total).toFixed(2)))}

                subTotal += Total;
                tax_total += tax;

                // console.log("subTotal", subTotal);
            }
          
            console.log(this.state.isChecked);
            if (!this.state.isChecked) {
                console.log('if');
                let home_item_total =
                    Number(Total) *
                    Number(
                        this.state.cus_rate_rate != undefined ? this.state.cus_rate_rate : 1
                    );
                // Number(Total.toFixed(2)) *        comment1
                // Number(
                //   this.state.cus_rate_rate != undefined ? this.state.cus_rate_rate : 1
                // );

                // alert(this.state.exchange_value_ref)
                // console.log("acacac", this.state.cus_rate_rate);
                const data = this.state.rows && this.state.rows.map((row, ind) => {
                    const obj = this.state.number_of_columns_list.reduce((acc, val, idx) => {
                        // console.log("namenewval", this.state.number_of_columns_list)
                        acc[val.column_name] = jQuery("#addtext" + idx + ind).val()
                        return acc
                    }, {})
                    return obj
                })
                //   let arr =[]

                //   this.state.rows&&  this.state.rows.map((row,idx) =>{
                //     let array = []
                //     this.state.number_of_columns_list &&  this.state.number_of_columns_list.map((val,ind)=>{
                //       let name =val.column_name
                //       array.push({[name] : jQuery("#addtext" + ind +idx).val()})

                //   })
                //   arr.push(array)
                // })



                // console.log('arrarrarr', data)
                // console.log("redFunc", obj)
               var item_list = {
                    item_index:dummarray[i].item_index,
                    item_name: item_name,
                    descr: descr,
                    quantity: quantity,
                    price: price,
                    unit_price: unit_price,
                    category_id: myCat,
                    tax_name: dummarray[i].tax_name,
                    tax_rate: dummarray[i].tax_rate,
                    tax_type: dummarray[i].tax_type,
                    item_tax: tax.toFixed(2),
                    item_total: Total.toFixed(2),
                    home_item_total: Number(home_item_total).toFixed(2),
                    custom_column: [...data]

                };
                console.log('ifitemlist',item_list);

            } else {
                console.log('else');
                if (
                    (jQuery("#selectedtype_id" + i).val() != undefined &&
                        jQuery("#selectedtype_id" + i).val() != null &&
                        jQuery("#selectedtype_id" + i).val() == "1") ||
                    jQuery("#selectedtype_id" + i).val() == "2"
                ) {
                    var item_total = Number(Total - tax);
                } else {
                    var item_total = 0;
                }

                let home_item_total =
                    Number(item_total) *
                    Number(
                        this.state.cus_rate_rate != undefined ? this.state.cus_rate_rate : 1
                    );

                const data = this.state.rows && this.state.rows.map((row, ind) => {
                    const obj = this.state.number_of_columns_list.reduce((acc, val, idx) => {
                        // console.log("namenewval", this.state.number_of_columns_list)
                        acc[val.column_name] = jQuery("#addtext" + idx + ind).val()
                        return acc
                    }, {})
                    return obj
                });

                //   let arr =[]

                //   this.state.rows&&  this.state.rows.map((row,idx) =>{
                //     let array = []
                //     this.state.number_of_columns_list &&  this.state.number_of_columns_list.map((val,ind)=>{
                //       array.push(jQuery("#addtext" + ind +idx).val())

                //   })
                //   arr.push(array)
                // })


                // console.log('arrarrarr',arr)
                var item_list = {
                    item_index:dummarray[i].item_index,
                    item_name: jQuery("#item" + i).val(),
                    descr: descr,
                    quantity: quantity,
                    price: item_total,
                    unit_price: unit_price,
                    category_id: myCat,
                    tax_name: dummarray[i].tax_name,
                    tax_rate: dummarray[i].tax_rate,
                    tax_type: dummarray[i].tax_type,
                    item_tax: tax.toFixed(2),
                    item_total: item_total,
                    home_item_total: Number(home_item_total).toFixed(2),
                    custom_column: [...data]
                };
            }
            result.push(item_list);
             console.log("result", result);

            itemprice.push(parseFloat(price));
            // this.setState({subTotal:subTotal})
        }
        if (isNaN(subTotal)) {
            jQuery("#homecurrencytyt").html("0");
        } else {
            jQuery("#homecurrencytyt").html(Number(parseFloat(subTotal.toFixed(2))));
        }
        // else { jQuery("#homecurrencytyt").html(this.formatCurrency(this.state.currency_customer)(parseFloat(subTotal.toFixed(2)))) }
        if (isNaN(tax_total)) {
            jQuery("#home_tax_total").html("0");
        } else {
            jQuery("#home_tax_total").html(parseFloat(tax_total.toFixed(2)));
        }
        // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }

        if (!this.state.isChecked) {
            var grandTotal = parseFloat(subTotal) + tax_total;
            if (isNaN(grandTotal)) {
                jQuery("#home_grand_total").html("0");
                const toWords = new ToWords();

                jQuery("#amount_in_words").val(toWords.convert(0));
            } else {
                jQuery("#home_grand_total").html(
                    this.formatCurrency("EUR")(Number(parseFloat(grandTotal).toFixed(2)))
                );

                const toWords = new ToWords();

                jQuery("#amount_in_words").val(
                    toWords.convert(Number(parseFloat(grandTotal).toFixed(2)))
                );
                // } else { jQuery("#home_grand_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(grandTotal).toFixed(2)))
                this.setState({
                    grandTotal: this.formatCurrency("EUR")(
                        Number(parseFloat(grandTotal).toFixed(2))
                    ),
                });
            }
        } else {
            // alert('hjj')
            var grandTotal = parseFloat(subTotal).toFixed(2);
            if (isNaN(grandTotal)) {
                jQuery("#home_grand_total").html("0");
                const toWords = new ToWords();

                jQuery("#amount_in_words").val(toWords.convert(0));
            } else {
                jQuery("#home_grand_total").html(parseFloat(grandTotal).toFixed(2));

                const toWords = new ToWords();

                jQuery("#amount_in_words").val(
                    toWords.convert(parseFloat(grandTotal).toFixed(2))
                );

                // jQuery("#home_grand_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(grandTotal).toFixed(2)))
                this.setState({
                    grandTotal: this.formatCurrency("EUR")(
                        Number(parseFloat(grandTotal).toFixed(2))
                    ),
                });
            }
            let fore_grandtotal =
                jQuery("#home_grand_total").html() != undefined
                    ? Number(jQuery("#home_grand_total").html())
                    : 0.0;
            let fore_tax =
                jQuery("#home_tax_total").html() != undefined
                    ? Number(jQuery("#home_tax_total").html())
                    : 0.0;
            let fore_subtotal = (fore_grandtotal - fore_tax).toFixed(2);
            jQuery("#homecurrencytyt").html(Number(fore_subtotal));

            // alert(hme_subtotal)
            // setTimeout(() => {
            let home_grandtotal =
                jQuery("#foreign_grand_total").html() != undefined
                    ? Number(jQuery("#foreign_grand_total").html())
                    : 0.0;
            let home_tax =
                jQuery("#foreign_tax_total").html() != undefined
                    ? Number(jQuery("#foreign_tax_total").html())
                    : 0.0;
            let hme_subtotal = (home_grandtotal - home_tax).toFixed(2);


            // this.setState({ sub_total_home_currency: hme_subtotal }, () => {
            //   jQuery("#foreigncurrencytyt").html(hme_subtotal);
            // });

        }

        const add = (a, b) => a + b;
        const trial = itemprice.length > 0 ? itemprice.reduce(add) : 0;
        if (isNaN(trial)) {
            var sum = 0;
        } else {
            var sum = trial;
        }

        // console.log("itemprice", subTotal);
        // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }

        let foreign_currency = this.state.CurrentSelectedCurr;
        //   console.log('foreign_currency', foreign_currency)

        let subTotalValue = subTotal;
        // var subTotalValue

        // if (this.state.isChecked) {
        //   subTotalValue = subTotal;
        // } else {
        //   subTotalValue = subTotal - tax_total
        // }


        // for new api
        // let nope = "https://api.exchangerate-api.com/v4/latest/";
        // for new api
        let nope
        var date_formated
        let date = jQuery("#invoice_date").val();
        if (date != undefined && date != null && date != '') {
            var array = date.split("/");
            date_formated = array[2] + "-" + array[1] + "-" + array[0];
            nope = `https://api.currencylayer.com/historical?access_key=${config.api_key}&date=${date_formated}&source=`

        } else {
            date_formated = 'latest'
            nope = `https://api.currencylayer.com/live?access_key=${config.api_key}&source=`

        }



        // let nope = "https://api.exchangeratesapi.io/" + date_formated + "?base="
        let res = nope.concat(foreign_currency);
        await fetch(res)
            .then(async (response) => await response.json())
            .then(async (data) => {
                try {
                    {
                       // let newObj = this.rename(data.quotes, foreign_currency)
                       let newObj = {}
                       Object.keys(data.quotes).map((key) => {
                         let newKey = key.replace(foreign_currency, '')
                         Object.assign(newObj, { [newKey]: data.quotes[key] })
                       })

                        this.findInSubAccountList();
                        if (
                            jQuery("#getMe").val() != undefined &&
                            jQuery("#getMe").val() != null &&
                            jQuery("#getMe").val() != ""
                        ) {
                            this.state.cus_rate_rate = isNaN(Number(jQuery("#getMe").val()))
                                ? 0.000001
                                : Number(jQuery("#getMe").val());
                            this.setState(
                                {
                                    cus_rate_rate: isNaN(Number(jQuery("#getMe").val()))
                                        ? 0.000001
                                        : Number(jQuery("#getMe").val()),
                                }
                                // ,
                                // () => {
                                //   setTimeout(() => {
                                //     this.handleChangeItems("", this.state.rows.length - 1);

                                //     // jQuery('#Exchange').val(isNaN( Number(jQuery('#getMe').val()))?0.000001: Number(jQuery('#getMe').val()))

                                //     jQuery("#getMe").val("");
                                //   }, 10000);
                                // }
                            );
                        }

                        if (this.state.cus_rate_rate != undefined && this.state.cus_rate_rate != '') {
                            const val = Number(this.state.cus_rate_rate);
                            var todayValue = newObj;
                            var exchange_value = val;
                            // var grand_total_home_currency = val * grandTotal;
                            // var sub_total_home_currency = val * subTotalValue;
                            // var tax_home_currency = val * tax_total;
                            var grand_total_home_currency = val * grandTotal;
                            var sub_total_home_currency = val * subTotalValue;
                            var tax_home_currency = val * tax_total;
                        } else {
                            var todayValue = newObj;
                            // console.log("qwerty", todayValue);
                            var exchange_value = await todayValue[
                                this.state.clientHomeCurrency
                            ];
                            var grand_total_home_currency =
                                (await todayValue[this.state.clientHomeCurrency]) * grandTotal;
                            var sub_total_home_currency =
                                (await todayValue[this.state.clientHomeCurrency]) *
                                subTotalValue;
                            var tax_home_currency =
                                (await todayValue[this.state.clientHomeCurrency]) * tax_total;
                        }

                        var todayValue = await newObj;
                        // console.log("oiodododo");
                        if (
                            jQuery("#getMe").val() != undefined &&
                            jQuery("#getMe").val() != null &&
                            jQuery("#getMe").val() != ""
                        ) {
                            var exchange_value_ref = isNaN(Number(jQuery("#getMe").val()))
                                ? 0.000001
                                : Number(jQuery("#getMe").val());
                        } else {
                            var exchange_value_ref =
                                todayValue[this.state.clientHomeCurrency];
                        }

                        this.setState(
                            {
                                dummy_myarray: [...this.state.dummy_myarray, item_list],
                                dummy_exchange_value: Number(exchange_value.toFixed(4)),
                                dummy_exchange_value_ref: Number(exchange_value_ref.toFixed(4)),
                                dummy_grand_total_home_currency: grand_total_home_currency.toFixed(2),
                                dummy_sub_total_home_currency: this.state.isChecked ? (sub_total_home_currency - tax_home_currency).toFixed(2) : sub_total_home_currency,
                                dummy_tax_home_currency: tax_home_currency.toFixed(2),
                                myarray: [...this.state.dummy_myarray, item_list],
                                exchange_value: Number(exchange_value.toFixed(4)),
                                exchange_value_ref: Number(exchange_value_ref.toFixed(4)),
                                grand_total_home_currency: grand_total_home_currency.toFixed(2),
                                sub_total_home_currency: this.state.isChecked ? (sub_total_home_currency - tax_home_currency).toFixed(2) : sub_total_home_currency,
                                tax_home_currency: tax_home_currency.toFixed(2),                               
                            }
                            ,
                            () => {
                                this.val_me();
                            }
                        );
                    console.log(this.state.dummy_myarray)
                    }
                } catch (error) {
                    // console.log('jfjfjfjff', error)
                    jQuery("#invoice_curr_id option")
                        .prop("selected", false)
                        .trigger("change");
                    // this.setState(
                    //     { CurrentSelectedCurr: "USD", duplicateVar: "", cus_rate_rate: "" },
                    //     () => {
                    //         this.handleChangeItems("", this.state.rows.length - 1);
                    //     }
                    // );
                    // jQuery('#account_id').val('')
                    // jQuery('#account_id option').prop("selected", false).trigger('change');

                    // alert(
                    //   "Selected currency is not Valid, Please Choose different currency...!!!"
                    // );
                    jQuery("#account_id").val("");
                }
            });

    };


    handleChangeItems = async (currid = '', itemid = '') => {
        this.addSerialNumber();

        // alert(itemid)

        var result = [];
        var itemprice = [];
        var subTotal = 0;
        var tax_total = 0;

        for (var i = itemid; i >= 0; i--) {
            // alert(i)
            if (document.getElementById("selectednow_id" + i) != null) {
                //subTotal+=jQuery('#subtotal'+i).val();

                var item_name =
                    jQuery("#item" + i).val() != "" ? jQuery("#item" + i).val() : 0;
                var descr =
                    jQuery("#descr" + i).val() != "" ? jQuery("#descr" + i).val() : 0;
                var quantity_check =
                    jQuery("#quantity" + i).val() != ""
                        ? jQuery("#quantity" + i).val()
                        : 0;
                var quantity = isNaN(quantity_check)
                    ? jQuery("#quantity" + i).val("")
                    : quantity_check;
                var check = jQuery("#dynamic" + i).val() != ""
                    ? jQuery("#dynamic" + i).val()
                    : 0;
                var checkf = isNaN(check)
                    ? jQuery("#dynamic" + i).val("")
                    : check;
                var unit_price_check =
                    jQuery("#unit_price" + i).val() != ""
                        ? jQuery("#unit_price" + i).val()
                        : 0;
                var unit_price = isNaN(unit_price_check)
                    ? jQuery("#unit_price" + i).val("")
                    : unit_price_check;
                var price = quantity * unit_price;
                var selectednow_id = document.getElementById("selectednow_id" + i)
                    .innerText;
                var category_id =
                    selectednow_id != "NO_VALUE"
                        ? selectednow_id
                        : this.state.selectedindex != ""
                            ? this.state.selectedindex
                            : "";

                var myCat = jQuery("#categry_id" + i).val();

                var id = i;
                // if(this.state.isChecked){
                // var Total =  this.state.sales_tax_type != 2 ? (price / (parseFloat(this.state.sales_tax_rate) + 100)) * 100: price - parseFloat(this.state.sales_tax_rate)
                // }else{
                //   var Total=this.state.sales_tax_type != 2 ? price:price
                // }

                var sales_tax_type =
                    jQuery("#selectedtype_id" + i).val() != ""
                        ? jQuery("#selectedtype_id" + i).val()
                        : 0;
                var sales_tax_rate =
                    jQuery("#selectedrate_id" + i).val() != ""
                        ? jQuery("#selectedrate_id" + i).val()
                        : 0;


                if (this.state.isChecked) {
                    if (
                        parseFloat(sales_tax_rate) > 0 &&
                        parseInt(sales_tax_type) === 1
                    ) {
                        var tax =
                            (price * parseFloat(sales_tax_rate)) /
                            (100 + parseFloat(sales_tax_rate));
                        // (value / (parseFloat(this.state.sales_tax_rate) + 100)) * 100;

                        // var tax = price / parseFloat(sales_tax_rate)
                        // var Total = parseFloat(price) - tax
                        var Total = parseFloat(price);
                    } else if (parseInt(sales_tax_type) === 2) {
                        var tax = parseFloat(sales_tax_rate);
                        // var Total = parseFloat(price) - tax;
                        var Total = parseFloat(price);
                    } else {
                        var tax = 0;
                        var Total = parseFloat(price);
                    }
                } else {
                    if (
                        parseFloat(sales_tax_rate) > 0 &&
                        parseInt(sales_tax_type) === 1
                    ) {
                        var tax = price * (parseFloat(sales_tax_rate) / 100);
                        var Total = parseFloat(price);
                    } else if (parseInt(sales_tax_type) === 2) {
                        var tax = parseFloat(sales_tax_rate);
                        var Total = parseFloat(price);
                    } else {
                        var tax = 0;
                        var Total = parseFloat(price);
                    }
                }

                if (isNaN(Total)) {
                    if (currid == id) {
                    } else {
                        jQuery("#subtotal" + id).val(0);
                    }
                } else {
                    if (currid == id) {
                    } else {
                        jQuery("#subtotal" + id).val(parseFloat(Total).toFixed(2));
                    }
                }

                // } else {jQuery("#subtotal" + id).val(this.formatCurrency(this.state.currency_customer)(parseFloat(Total).toFixed(2)))}

                subTotal += Total;
                tax_total += tax;

            }
            if (!this.state.isChecked) {
                let home_item_total =
                    Number(Total.toFixed(2)) *
                    Number(
                        this.state.cus_rate_rate != undefined ? this.state.cus_rate_rate : 1
                    );
                // Number(Total.toFixed(2)) *        comment1
                // Number(
                //   this.state.cus_rate_rate != undefined ? this.state.cus_rate_rate : 1
                // );

                // alert(this.state.exchange_value_ref)
                const data = this.state.rows && this.state.rows.map((row, ind) => {
                    const obj = this.state.number_of_columns_list.reduce((acc, val, idx) => {
                        acc[val.column_name] = jQuery("#addtext" + idx + ind).val()
                        return acc
                    }, {})
                    return obj
                })
                //   let arr =[]

                //   this.state.rows&&  this.state.rows.map((row,idx) =>{
                //     let array = []
                //     this.state.number_of_columns_list &&  this.state.number_of_columns_list.map((val,ind)=>{
                //       let name =val.column_name
                //       array.push({[name] : jQuery("#addtext" + ind +idx).val()})

                //   })
                //   arr.push(array)
                // })



                var item_list = {
                    item_index:i,
                    item_name: item_name,
                    descr: descr,
                    quantity: quantity,
                    price: price,
                    unit_price: unit_price,
                    category_id: myCat,
                    tax_name: jQuery("#selectednow" + i).text(),
                    tax_rate: jQuery("#selectedrate_id" + i).val(),
                    tax_type: jQuery("#selectedtype_id" + i).val(),
                    item_tax: tax.toFixed(2),
                    item_total: Total.toFixed(2),
                    home_item_total: Number(home_item_total).toFixed(2),
                    custom_column: [...data]

                };
            } else {
                if (
                    (jQuery("#selectedtype_id" + i).val() != undefined &&
                        jQuery("#selectedtype_id" + i).val() != null &&
                        jQuery("#selectedtype_id" + i).val() == "1") ||
                    jQuery("#selectedtype_id" + i).val() == "2"
                ) {
                    var item_total = Number(Total.toFixed(2) - tax.toFixed(2));
                } else {
                    var item_total = 0;
                }

                let home_item_total =
                    Number(item_total) *
                    Number(
                        this.state.cus_rate_rate != undefined ? this.state.cus_rate_rate : 1
                    );

                const data = this.state.rows && this.state.rows.map((row, ind) => {
                    const obj = this.state.number_of_columns_list.reduce((acc, val, idx) => {
                        acc[val.column_name] = jQuery("#addtext" + idx + ind).val()
                        return acc
                    }, {})
                    return obj
                });

                //   let arr =[]

                //   this.state.rows&&  this.state.rows.map((row,idx) =>{
                //     let array = []
                //     this.state.number_of_columns_list &&  this.state.number_of_columns_list.map((val,ind)=>{
                //       array.push(jQuery("#addtext" + ind +idx).val())

                //   })
                //   arr.push(array)
                // })


                var item_list = {
                    item_index:i,
                    item_name: jQuery("#item" + i).val(),
                    descr: descr,
                    quantity: quantity,
                    price: item_total,
                    unit_price: unit_price,
                    category_id: myCat,
                    tax_name: jQuery("#selectednow" + i).text(),
                    tax_rate: jQuery("#selectedrate_id" + i).val(),
                    tax_type: jQuery("#selectedtype_id" + i).val(),
                    item_tax: tax.toFixed(2),
                    item_total: item_total,
                    home_item_total: Number(home_item_total).toFixed(2),
                    custom_column: [...data]
                };
            }
            result.push(item_list);

            itemprice.push(parseFloat(price));
            // this.setState({subTotal:subTotal})
        }
        if (isNaN(subTotal)) {
            jQuery("#homecurrencytyt").html("0");
        } else {
            jQuery("#homecurrencytyt").html(Number(parseFloat(subTotal.toFixed(2))));
        }
        // else { jQuery("#homecurrencytyt").html(this.formatCurrency(this.state.currency_customer)(parseFloat(subTotal.toFixed(2)))) }
        if (isNaN(tax_total)) {
            jQuery("#home_tax_total").html("0");
        } else {
            jQuery("#home_tax_total").html(parseFloat(tax_total.toFixed(2)));
        }
        // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }

        if (!this.state.isChecked) {
            var grandTotal = parseFloat(subTotal) + tax_total;
            if (isNaN(grandTotal)) {
                jQuery("#home_grand_total").html("0");
                const toWords = new ToWords();

                jQuery("#amount_in_words").val(toWords.convert(0));
            } else {
                jQuery("#home_grand_total").html(
                    this.formatCurrency("EUR")(Number(parseFloat(grandTotal).toFixed(2)))
                );

                const toWords = new ToWords();

                jQuery("#amount_in_words").val(
                    toWords.convert(Number(parseFloat(grandTotal).toFixed(2)))
                );
                // } else { jQuery("#home_grand_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(grandTotal).toFixed(2)))
                this.setState({
                    grandTotal: this.formatCurrency("EUR")(
                        Number(parseFloat(grandTotal).toFixed(2))
                    ),
                });
            }
        } else {
            // alert('hjj')
            var grandTotal = parseFloat(subTotal).toFixed(2);
            if (isNaN(grandTotal)) {
                jQuery("#home_grand_total").html("0");
                const toWords = new ToWords();

                jQuery("#amount_in_words").val(toWords.convert(0));
            } else {
                jQuery("#home_grand_total").html(parseFloat(grandTotal).toFixed(2));

                const toWords = new ToWords();

                jQuery("#amount_in_words").val(
                    toWords.convert(parseFloat(grandTotal).toFixed(2))
                );

                // jQuery("#home_grand_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(grandTotal).toFixed(2)))
                this.setState({
                    grandTotal: this.formatCurrency("EUR")(
                        Number(parseFloat(grandTotal).toFixed(2))
                    ),
                });
            }
            let fore_grandtotal =
                jQuery("#home_grand_total").html() != undefined
                    ? Number(jQuery("#home_grand_total").html())
                    : 0.0;
            let fore_tax =
                jQuery("#home_tax_total").html() != undefined
                    ? Number(jQuery("#home_tax_total").html())
                    : 0.0;
            let fore_subtotal = (fore_grandtotal - fore_tax).toFixed(2);
            jQuery("#homecurrencytyt").html(Number(fore_subtotal));

            // alert(hme_subtotal)
            setTimeout(() => {
                let home_grandtotal =
                    jQuery("#foreign_grand_total").html() != undefined
                        ? Number(jQuery("#foreign_grand_total").html())
                        : 0.0;
                let home_tax =
                    jQuery("#foreign_tax_total").html() != undefined
                        ? Number(jQuery("#foreign_tax_total").html())
                        : 0.0;
                let hme_subtotal = (home_grandtotal - home_tax).toFixed(2);

                // this.setState({ sub_total_home_currency: hme_subtotal }, () => {
                //   jQuery("#foreigncurrencytyt").html(hme_subtotal);
                // });
            }, 500);
        }

        const add = (a, b) => a + b;
        const trial = itemprice.length > 0 ? itemprice.reduce(add) : 0;
        if (isNaN(trial)) {
            var sum = 0;
        } else {
            var sum = trial;
        }

        // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }

        let foreign_currency = this.state.CurrentSelectedCurr;

        let subTotalValue = subTotal;
        // var subTotalValue

        // if (this.state.isChecked) {
        //   subTotalValue = subTotal;
        // } else {
        //   subTotalValue = subTotal - tax_total
        // }


        // for new api
        // let nope = "https://api.exchangerate-api.com/v4/latest/";
        // for new api
        let nope

        var date_formated
        let date = jQuery("#invoice_date").val();
        if (date != undefined && date != null && date != '') {
            var array = date.split("/");
            date_formated = array[2] + "-" + array[1] + "-" + array[0];
            nope = `https://api.currencylayer.com/historical?access_key=${config.api_key}&date=${date_formated}&source=`

        } else {
            date_formated = 'latest'
            nope = `https://api.currencylayer.com/live?access_key=${config.api_key}&source=`

        }


        // let nope = "https://api.exchangeratesapi.io/" + date_formated + "?base="
        let res = nope.concat(foreign_currency);
        await fetch(res)
            .then(async (response) => await response.json())
            .then(async (data) => {
                try {
                    {
                        let newObj = this.rename(data.quotes, foreign_currency)

                        this.findInSubAccountList();
                        if (
                            jQuery("#getMe").val() != undefined &&
                            jQuery("#getMe").val() != null &&
                            jQuery("#getMe").val() != ""
                        ) {
                            this.state.cus_rate_rate = isNaN(Number(jQuery("#getMe").val()))
                                ? 0.000001
                                : Number(jQuery("#getMe").val());
                            this.setState(
                                {
                                    cus_rate_rate: isNaN(Number(jQuery("#getMe").val()))
                                        ? 0.000001
                                        : Number(jQuery("#getMe").val()),
                                }
                                // ,
                                // () => {
                                //   setTimeout(() => {
                                //     this.handleChangeItems("", this.state.rows.length - 1);

                                //     // jQuery('#Exchange').val(isNaN( Number(jQuery('#getMe').val()))?0.000001: Number(jQuery('#getMe').val()))

                                //     jQuery("#getMe").val("");
                                //   }, 10000);
                                // }
                            );
                        }

                        if (this.state.cus_rate_rate != undefined && this.state.cus_rate_rate != '') {
                            const val = Number(this.state.cus_rate_rate);
                            var todayValue = newObj;
                            var exchange_value = val;
                            // var grand_total_home_currency = val * grandTotal;
                            // var sub_total_home_currency = val * subTotalValue;
                            // var tax_home_currency = val * tax_total;
                            var grand_total_home_currency = val * grandTotal;
                            var sub_total_home_currency = val * subTotalValue;
                            var tax_home_currency = val * tax_total;

                        } else {
                            var todayValue = newObj;
                            var exchange_value = await todayValue[
                                this.state.clientHomeCurrency
                            ];
                            var grand_total_home_currency =
                                (await todayValue[this.state.clientHomeCurrency]) * grandTotal;
                            var sub_total_home_currency =
                                (await todayValue[this.state.clientHomeCurrency]) *
                                subTotalValue;
                            var tax_home_currency =
                                (await todayValue[this.state.clientHomeCurrency]) * tax_total;
                        }

                        var todayValue = await newObj;
                        if (
                            jQuery("#getMe").val() != undefined &&
                            jQuery("#getMe").val() != null &&
                            jQuery("#getMe").val() != ""
                        ) {
                            var exchange_value_ref = isNaN(Number(jQuery("#getMe").val()))
                                ? 0.000001
                                : Number(jQuery("#getMe").val());
                        } else {
                            var exchange_value_ref =
                                todayValue[this.state.clientHomeCurrency];
                        }

                        this.setState(
                            {
                                myarray: result.reverse(),
                                exchange_value: Number(exchange_value.toFixed(4)),
                                exchange_value_ref: Number(exchange_value_ref.toFixed(4)),
                                grand_total_home_currency: grand_total_home_currency.toFixed(2),
                                sub_total_home_currency: this.state.isChecked ? (sub_total_home_currency - tax_home_currency).toFixed(2) : sub_total_home_currency,
                                tax_home_currency: tax_home_currency.toFixed(2),
                            }
                            ,
                            () => {
                                this.val_me();
                            }
                        );

                    }
                } catch (error) {
                    jQuery("#invoice_curr_id option")
                        .prop("selected", false)
                        .trigger("change");
                    // this.setState(
                    //     { CurrentSelectedCurr: "USD", duplicateVar: "", cus_rate_rate: "" },
                    //     () => {
                    //         this.handleChangeItems("", this.state.rows.length - 1);
                    //     }
                    // );
                    // jQuery('#account_id').val('')
                    // jQuery('#account_id option').prop("selected", false).trigger('change');

                    // alert(
                    //   "Selected currency is not Valid, Please Choose different currency...!!!"
                    // );
                    jQuery("#account_id").val("");
                }
            });
    };

    control_addButton = () => {
        // let item_check = jQuery(
        //   `#coulmn${this.state.rows.length - 1}${this.state.coulmns.length - 1}`
        // ).val()


        if (
            this.state.rows.length > 0
            // this.state.myarray[this.state.myarray.length - 1].price > 0 &&
            // this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
            // this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
        ) {
            return (

                <a href="javascript:;" class="add-input" onClick={this.addRow}>
                    ADD ROW
                </a>

            );
        }
    };

    addRow = () => {
        if (
            this.state.myarray.length >
            this.state.rows.length - 1
            // &&
            // this.state.myarray[this.state.myarray.length - 1].price > 0 &&
            // this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
            // this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
        ) {
            var rows = this.state.rows;
            rows.push("row" + (this.state.initial_value + 1));

            this.setState({
                isAdd: false,
                initial_value: this.state.initial_value + 1,
            });

            this.setState({ rows: rows }, () => {
                this.addSerialNumber();
            });
        } else {
            this.setState({ isAdd: true });
        }
    };

    copyRow = (item_id) => {
        // if (
        //   this.state.myarray.length > this.state.rows.length - 1 &&
        //   this.state.myarray[this.state.myarray.length - 1].price > 0 &&
        //   this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
        //   this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
        // ) {
        //   var rows = this.state.rows
        //   rows.push('row' + (this.state.initial_value + 1))

        //   this.setState({ isAdd: false, initial_value: this.state.initial_value + 1 })

        //   this.setState({ rows: rows })
        // } else {
        //   this.setState({ isAdd: true })
        // }
        var THIS = this;
        if (
            THIS.state.myarray.length > THIS.state.rows.length - 1 &&
            THIS.state.myarray[THIS.state.myarray.length - 1].price > 0 &&
            THIS.state.myarray[THIS.state.myarray.length - 1].item_name.length > 0
            // &&THIS.state.myarray[THIS.state.myarray.length - 1].category_id.length > 0
            //&& item_check != ''
        ) {
            jQuery(".error_tbl_fld").css("display", "none");
            var rows = this.state.rows;
            rows.push("row" + (parseInt(this.state.initial_value) + 1));
            this.setState({
                isAdd: false,
                initial_value: parseInt(this.state.initial_value) + 1,
            });
            this.setState({ rows: rows, isTablefilled: false }, () => {
                this.copyRowVal(item_id);
            });
        } else {
            jQuery(".error_tbl_fld").css("display", "block");
            this.setState({ isTablefilled: true });
        }
    };

    copyRowVal(item_id) {
        var THIS = this;

        setTimeout(function () {
            jQuery("#item" + THIS.state.initial_value).val(
                jQuery("#item" + item_id).val()
            );
            jQuery("#descr" + THIS.state.initial_value).val(
                jQuery("#descr" + item_id).val()
            );
            jQuery("#quantity" + THIS.state.initial_value).val(
                jQuery("#quantity" + item_id).val()
            );
            jQuery("#unit_price" + THIS.state.initial_value).val(
                jQuery("#unit_price" + item_id).val()
            );
            jQuery("#selectednow" + THIS.state.initial_value).html(
                jQuery("#selectednow" + item_id).html()
            );
            jQuery("#selectednow_id" + THIS.state.initial_value).html(
                jQuery("#selectednow_id" + item_id).html()
            );
            jQuery("#selectedrate_id" + THIS.state.initial_value).val(
                jQuery("#selectedrate_id" + item_id).val()
            );
            jQuery("#selectedtype_id" + THIS.state.initial_value).val(
                jQuery("#selectedtype_id" + item_id).val()
            );
            jQuery("#subtotal" + THIS.state.initial_value).val(
                jQuery("#subtotal" + item_id).val()
            );

            jQuery("#categry_id" + THIS.state.initial_value).val(
                jQuery("#categry_id" + item_id).val()
            );

            jQuery("#cust_items" + THIS.state.initial_value).val(
                jQuery("#cust_items" + item_id).val()
            );

            if (THIS.state.number_of_columns_list != undefined) {
                THIS.state.number_of_columns_list.forEach((it, ind) => {
                    jQuery("#dynamic" + ind + THIS.state.initial_value).val(
                        jQuery("#dynamic" + ind + item_id).val()
                    );
                });
            }

            THIS.addSerialNumber();

            THIS.handleChangeItems("", THIS.state.rows.length - 1);
        }, 500);
    }

    delete_Rows = () => {
        var itemid = this.state.specific_id_delete;
        var rows_actual = this.state.rows;
        var myarray = this.state.myarray;
        if (this.state.rows.length > 1) {
            if (itemid > -1) {
                rows_actual.splice(itemid, 1);
            }

            this.setState({ rows: rows_actual }, () => {
                this.handleChangeItems("", this.state.rows.length - 1);
            });

        } else {
            this.state.number_of_columns_list.forEach((x, y) => {
                jQuery("#dynamic" + y + itemid + "" + "" + "option")
                    .prop("selected", false)
                    .trigger("change");
                jQuery("#dynamic" + y + itemid).val("");
            });
            jQuery("#item0").val("");
            jQuery("#descr0").val("");
            jQuery("#quantity0").val("");
            jQuery("#unit_price0").val("");
            jQuery("#selectednow0").html("Choose");
            jQuery("#selectednow_id0").html("NO_VALUE");
            jQuery("#selectedrate_id0").val("0");
            jQuery("#selectedtype_id0").val("0");

            jQuery(".no-bg").val("");
            this.setState({ myarray: [] }, () => {
                this.handleChangeItems("", this.state.rows.length - 1);
            });
        }
        this.addSerialNumber();
        window.jQuery("#modal_delete").modal("hide");
    };
    /* =================== */

    get_invoice_list = () => {
        let input = { client_id: this.state.logged_client_id, user_id: this.state.logged_user_id, selected_template_type: 4 }
        FetchAllApi.get_edit_invoice_html(input, (err, response) => {
            if (response.status === 1) {
                let obj =  response.list.find((e)=> e.id == response.default_template_id ) 
                this.setState({ response: response, template_id: response.default_template_id,selected_template_type : obj.selected_template_type });
                this.temChanged(response.default_template_id)
                // response.list.map((temp) => {
                //     if (temp.id == 5) {
                //         this.setState({
                //             template_id: temp.id
                //         });
                //     }
                // })
            } else {
                this.setState({});
            }
        });
    };

    pdf_generate = () => {
        // alert()
    };
    delete_invoice_list = (id) => {
        let client_id = this.state.logged_client_id;
        let template_id = id;
        FetchAllApi.delete_invoice_template(
            client_id,
            template_id,
            (err, response) => {
                alert(response.message);
                if (response.status === 1) {
                    this.get_invoice_list();
                    this.setState({});
                } else {
                    this.setState({});
                }
            }
        );
    };

    apply_template_format = (id, name, html) => {
        console.log(html,'applyhtml');
        this.setState({ html_content: html });

        jQuery("#" + id).addClass("active");
        this.setState({
            active: id,
            selected_templateName: name,
            // JSON.parse(this.state.response.list[id].properties).footer.footeroptionsthankmessage
        });
        if (id !== this.state.active)
            jQuery("#" + this.state.active).removeClass("active");

        let properties_values = JSON.parse(this.state.response.list[id].properties);
        if (properties_values.items.itemoptioninvoicenostatus === "none") {
            // jQuery('#itemoptioninvoicenostatus').hide()
        } else {
            jQuery("#itemoptioninvoicenostatus").show();
        }
        if (properties_values.items.itemoptionbilltostatus === "none") {
            jQuery("#itemoptionbilltostatus").hide();
        } else {
            jQuery("#itemoptionbilltostatus").show();
        }
        if (properties_values.items.itemoptionDatestatus === "none") {
            jQuery("#itemoptionDatestatus").hide();
        } else {
            jQuery("#itemoptionDatestatus").show();
        }
        if (properties_values.items.itemoptionshippingtostatus === "none") {
            jQuery("#itemoptionshippingtostatus").hide();
        } else {
            jQuery("#itemoptionshippingtostatus").show();
        }

        if (properties_values.footer.footeroptionthanksmessagestatus === "none") {
            jQuery("#footeroptionthanksmessagestatus").hide();
        } else {
            jQuery("#footeroptionthanksmessagestatus").show();
            jQuery("#footeroptionthanksmessages").val(
                properties_values.footer.footeroptionsthankmessage
            );
        }
        if (properties_values.footer.footertermsstatus === "none") {
            // alert('block')
            jQuery("#termsandconditions").hide();
        } else {
            jQuery("#termsandconditions").show();

            jQuery("#termcondmsg").val(properties_values.footer.footertermsText);
        }
    };
    componentDidUpdate() {
        window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });//DidUpdate
        // jQuery("#mytable").on('click', '.bootstrap-select', function () {
        //   jQuery(".table-responsive").css("overflow", "visible");
        // });

        // jQuery(document).click(function (e) {
        //   var container = jQuery("#mytable");

        //   if (!container.is(e.target) && container.has(e.target).length === 0) {
        //     // alert("Outside");
        //     jQuery(".table-responsive").removeAttr("style");
        //   } else {
        //     // alert("Inside");
        //     jQuery(".table-responsive").css("overflow", "visible");
        //   }
        // });
        // jQuery("#mytable").on('click', '.bootstrap-select', function () {
        //   jQuery(".table-responsive").css("overflow", "visible");
        // });
        // window.addEventListener('click', function (e) {
        //   if (document.getElementById('mytable').contains(e.target)) {
        //     // click inside
        //   } else {
        //     jQuery(".table-responsive").removeAttr("style");
        //   }
        // });

        window.jQuery(".selectpicker").selectpicker("refresh");
    }
    getColList = () => {
        FetchAllApi.get_invoice_column_list(
            this.state.logged_user_id,
            (err, response) => {
                if (response.status === 1) {
                    // alert('hi')
                    // this.setState({
                    //   number_of_columns_list: response.list
                    // })
                } else {
                    // this.setState({
                    //   number_of_columns_list: []
                    // })
                }
            }
        );
    };
    changeDate = (fromdate) => {
        let date = jQuery("#invoice_date").val();
        if (date != undefined) {
            var array = date.split("/");
            var date_formated = array[2] + "-" + array[1] + "-" + array[0];
            this.setState({ payment_date: date_formated });
            // alert(date_formated);

        }
    };

    custConverter = (x) => {
        let date = x;
        if (date != undefined) {
            var array = date.split("/");
            var date_formated = array[2] + "-" + array[1] + "-" + array[0];
            // alert(date_formated)
            return date_formated;
        }
    };
    getItems = (text, id) => {
        // var client_id = localStorage.getItem("logged_client_id") ;
        var client_id = this.state.logged_client_id;
        let from_settings = 0
        FetchAllApi.sales_product_item_list(client_id, (err, response) => {

            if (response.status === 1) {
                this.setState({ ItemList: response.list });
                if (response.list) {
                    var opt = response.list.map((item) => {
                        return (
                            <>
                                <option
                                    value={
                                        item.rate +
                                        "=" +
                                        item.description +
                                        "=" +
                                        item.account_name_category +
                                        "=" +
                                        item.item_name +
                                        "=" +
                                        item.item_id
                                    }
                                    data-status={item.id}
                                >
                                    {item.item_name}
                                </option>
                            </>
                        );
                    });
                }

                this.setState(
                    { sales_product_item_list: response.list, opt: opt },
                    () => {
                        if (text !== undefined && id !== undefined) {
                            response.list.map((ite, ii) => {
                                if (ite.item_name == text) {
                                    var makeUse =
                                        ite.rate +
                                        "=" +
                                        ite.description +
                                        "=" +
                                        ite.account_name_category +
                                        "=" +
                                        ite.item_name +
                                        "=" +
                                        ite.item_id;

                                    // alert(makeUse)

                                    jQuery("#cust_items" + id).val(makeUse);
                                    window.jQuery("#cust_items" + id).selectpicker("refresh");

                                    jQuery("#descr" + id).val(ite.description);
                                    jQuery("#unit_price" + id).val(ite.rate);
                                    //below

                                    jQuery("#categry_id" + id)
                                        .val(ite.account_name_category)
                                        .trigger("change");

                                    window.jQuery("#categry_id" + id).selectpicker("refresh");

                                    jQuery("#item" + id).val(ite.item_name);

                                    jQuery("#itemsid" + id).val(ite.item_id);




                                    // for table drop down
                                    jQuery("#mytable").click('.bootstrap-select', function (e) {
                                        jQuery(".table-responsive").css("overflow", "visible");
                                    });

                                    jQuery(document).click(function (e) {
                                        var container = jQuery("#mytable");

                                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                                            // alert("Outside");
                                            jQuery(".table-responsive").removeAttr("style");
                                        } else {
                                            // alert("Inside");
                                            jQuery(".table-responsive").css("overflow", "visible");
                                        }
                                    });


                                    // for table drop down

                                }
                            });
                        }
                    }
                );
            } else {
            }
        });
    };

    getColumns = () => {
        this.setState({ number_of_columns_list: [] });
        var coreData = {
            user_id: this.state.logged_user_id,
            client_id: this.state.logged_client_id
        };
        FetchAllApi.getAllColumns(coreData, (err, response) => {
            if (response.status === 1) {
                this.setState({ number_of_columns_list: response.list[0].columns },);
            } else {
            }
        });
    };

    // setColumn =()=>{
    //   this.state.number_of_columns_list.map((val, idx) => {

    //                                 let value = val.column_name


    //                                 this.state.rows.map((inv,i)=>{

    //                                     jQuery("#addtext" + idx+i).val(val.options[val.options-1])

    //                                   })
    //                               })
    // };

    addSerialNumber = () => {
        var i = 0;
        jQuery("#mytable  tr").each(function (index) {
            jQuery(this)
                .find("td:nth-child(2)")
                .html(index - 1 + 1);
        });
    };
    get_currencies = () => {
        // alert(this.state.clientHomeCurrency)

        // for new api
        // fetch(
        //   `https://api.exchangerate-api.com/v4/latest/${this.state.clientHomeCurrency}`
        // )
        // for new api



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
                this.setState({ currencies: currencyAr, currency_clone: currencyAr });
            });
    };
    // add_third_party_customer

    add_third_party_customer = () => {
        setInterval(() => {
            // alert('hire')

            var party_customer = localStorage.getItem("third_party_customer");
            if (
                party_customer !== undefined &&
                party_customer !== "" &&
                party_customer !== null &&
                party_customer === "yes1"
            ) {
                // alert('hi')
                jQuery("#third_account_id").val(
                    localStorage.getItem("third_party_customer_id")
                );
                this.setState({
                    third_party_value: localStorage.getItem("third_party_customer_id"),
                });
                this.fetchThirdPartyNames(2);
                // this.setState({ selectCustomer: newlyCreatedID });

                // localStorage.setItem("third_party_customer_id", "");
                localStorage.setItem("third_party_customer", "");
            }
        }, 3000);
    };

    add_third_party_vendor = () => {
        setInterval(() => {
            // alert('hire')

            var party_customer = localStorage.getItem("third_party_customer");
            if (
                party_customer !== undefined &&
                party_customer !== "" &&
                party_customer !== null &&
                party_customer === "yes2"
            ) {
                // alert('hi')
                jQuery("#third_account_id").val(
                    localStorage.getItem("third_party_customer_id")
                );
                this.setState({
                    third_party_value: localStorage.getItem("third_party_customer_id"),
                });
                this.fetchThirdPartyNames(5);
                // this.setState({ selectCustomer: newlyCreatedID });

                // localStorage.setItem("third_party_customer_id", "");
                localStorage.setItem("third_party_customer", "");
            }
        }, 3000);
    };

    watchIsCustomerAdded = () => {
        setInterval(() => {
            var checkMe = localStorage.getItem("customer_added");
            if (
                checkMe !== undefined &&
                checkMe !== "" &&
                checkMe !== null &&
                checkMe === "yes"
            ) {
                let newlyCreatedID = localStorage.getItem("customer_added_id");


                this.setState({ selectCustomer: newlyCreatedID });
                this.customerjoblist(newlyCreatedID);
                this.handleChange(newlyCreatedID)



                // for customer list call

                var client_id = this.state.logged_client_id;
                var from_customer_receive_payment = 0;

                FetchAllApi.customer_and_job_list(
                    client_id,
                    from_customer_receive_payment,
                    (err, response) => {


                        if (response.status === 1) {
                            let myArray = response.list;

                            this.setState(
                                { customer_and_job_list: response.list },

                                () => {

                                    myArray.map((item) => {
                                        if (item.id == newlyCreatedID) {
                                            jQuery("#variable_pay_type").val(item.id);
                                        }
                                    });

                                    window.jQuery("#variable_pay_type").selectpicker("refresh");
                                    localStorage.setItem("customer_added_id", null);
                                    localStorage.setItem("customer_added", null);

                                }
                            );

                            // for fill invoice to and shipping to

                            let variable_pay_type = newlyCreatedID
                            localStorage.setItem(
                                "customer",
                                newlyCreatedID + "=" + variable_pay_type
                            );

                            this.setState(
                                {
                                    selectCustomer: variable_pay_type,
                                    vendorName: jQuery("#variable_pay_type").val(),
                                },
                                () => {
                                   // alert(this.state.selectCustomer)
                                }
                            );

                            this.Basic_info(variable_pay_type);
                            this.setState({ myCusVarPay: variable_pay_type });
                            this.customerjoblist(variable_pay_type);

                            // for fill invoice to and shipping to



                        } else {
                            localStorage.setItem("customer_added_id", null);
                            localStorage.setItem("customer_added", null);

                        }
                    }
                );

                //  for customer list call

                // localStorage.setItem("customer_added", null);
                // localStorage.setItem("customer_added", "");
            }
        }, 3000);
    };

    watchJobAdded = () => {
        setInterval(() => {
            var checkMee = localStorage.getItem("job_added");
            if (
                checkMee !== undefined &&
                checkMee !== "" &&
                checkMee !== null &&
                checkMee === "yes"
            ) {
                let newlyCreatedID = localStorage.getItem("job_added_id");
                let myvar = this.state.myCusVarPay || this.state.selectCustomer;
                this.setState({ job_id: newlyCreatedID, JobId: newlyCreatedID });

                alert("new job is added...");
                this.customerjoblist(myvar, newlyCreatedID);

                localStorage.setItem("job_added", "");
            }
        }, 3000);
    };

    watchCoulmnUpdated = () => {
        setInterval(() => {
            var checkMeee = localStorage.getItem("is_coulmn_updated");

            if (
                checkMeee !== undefined &&
                checkMeee !== "" &&
                checkMeee !== null &&
                checkMeee === "yes"
            ) {
                this.changeState();

                localStorage.setItem("is_coulmn_updated", "");
            }
        }, 3000);
    };


    change_estimate_to_sales = () => {
        var primaryData
        if ((localStorage.getItem("change_salesorder") != '' && localStorage.getItem("change_salesorder") != undefined && localStorage.getItem("change_salesorder") != null)) {
            primaryData = JSON.parse(localStorage.getItem("change_salesorder"));
        };
        if ((localStorage.getItem("copy_salesorder") != '' && localStorage.getItem("copy_salesorder") != undefined && localStorage.getItem("copy_salesorder") != null)) {
            primaryData = JSON.parse(localStorage.getItem("copy_salesorder"));

        };
        jQuery("#paid_status").val(primaryData.paid_status + "--invoice");

        jQuery("#invoice_to").val(primaryData.company_address);
        jQuery("#shipping_to").val(primaryData.shipping_address);
        jQuery("#payment_exchange_rate").val(
            primaryData.payment_exchange_rate
        );
        jQuery("#reference").val(primaryData.reference);
        this.setState({ invoice_id_used: primaryData.id, payment_desc: primaryData.descripation, });

        //Append here....
        jQuery("#getMe").val(primaryData.exchange_rate);

        // this.makeDisabled();
        jQuery("#balanceSheetCategeory").val(
            primaryData.balance_sheet_category
        );
        var mySelValue = jQuery(
            "#balanceSheetCategeory option:selected"
        ).data("status");
        if (
            mySelValue != undefined &&
            mySelValue != "" &&
            mySelValue != null
        ) {
            this.state.balancesheetlist.forEach((item, i) => {
                if (item.name == mySelValue) {
                    // alert(item.id)
                    const string = item.name;
                    const Payable = string.includes("ayable");
                    const Receivable = string.includes("eceivable");
                    if (Payable || Receivable) {
                        this.setState({ isThirdPartyName: true });
                        if (Payable) {
                            this.setState({ thrird_party_type: 2 });
                            this.fetchThirdPartyNames(5);
                        }
                        if (Receivable) {
                            this.setState({ thrird_party_type: 1 });

                            this.fetchThirdPartyNames(2);
                        }
                    } else {
                        this.setState({ isThirdPartyName: false });
                    }
                }
            });

            // setTimeout(() => {
            jQuery("#third_account_id").val(
                primaryData.thrird_party_account_id
            );
            // }, 8000);
        }


        this.setState(
            {
                currInvoiceId: primaryData.invoice_number,
                currpayment_id: primaryData.payment_id,
            },
            () => {
                jQuery("#appliedhom").html(
                    (isNaN(
                        Number(
                            primaryData.payments_applied_home_currency !== undefined
                                ? primaryData.payments_applied_home_currency
                                : 0
                        )
                    )
                        ? 0
                        : Number(primaryData.payments_applied_home_currency)
                    ).toFixed(2)
                );

                // jQuery('#forbaldue').html((primaryData.open_balance_foreign_currency).toFixed(2));
                // jQuery('#homebaldue').html((primaryData.open_balance_home_currency).toFixed(2));

                // jQuery('#appliedfor').html((primaryData.payments_applied_foreign_currency).toFixed(2));
                //hey
                jQuery("#appliedfor").html(
                    (isNaN(
                        Number(
                            primaryData.payments_applied_foreign_currency !==
                                undefined
                                ? primaryData.payments_applied_foreign_currency
                                : 0
                        )
                    )
                        ? 0
                        : Number(primaryData.payments_applied_foreign_currency)
                    ).toFixed(2)
                );
                jQuery("#forbaldue").html(
                    (isNaN(
                        Number(
                            primaryData.open_balance_foreign_currency !== undefined
                                ? primaryData.open_balance_foreign_currency
                                : 0
                        )
                    )
                        ? 0
                        : Number(primaryData.open_balance_foreign_currency)
                    ).toFixed(2)
                );
                jQuery("#homebaldue").html(
                    (isNaN(
                        Number(
                            primaryData.open_balance_home_currency !== undefined
                                ? primaryData.open_balance_home_currency
                                : 0
                        )
                    )
                        ? 0
                        : Number(primaryData.open_balance_home_currency)
                    ).toFixed(2)
                );
                jQuery("#footeroptionthanksmessages").val(
                    primaryData.thanking_message
                );
                jQuery("#termcondmsg").val(primaryData.terms_and_conditions);
                //hey

                jQuery("#exchangeGain").html(
                    (isNaN(
                        Number(
                            primaryData.exchange_gain_or_loss !== undefined
                                ? primaryData.exchange_gain_or_loss
                                : 0
                        )
                    )
                        ? 0
                        : Number(primaryData.exchange_gain_or_loss)
                    ).toFixed(2)
                );
            }
        );

        jQuery("#invoice_curr_id").val(primaryData.currency);
        this.setState(
            {
                CurrentSelectedCurr: primaryData.currency,
                cus_rate_rate: Number(primaryData.exchange_rate),
            },
            () => {
                this.findInSubAccountList();
            }
        );
        console.log("noting", primaryData.customer_id)

        jQuery("#variable_pay_type").val(primaryData.customer_id);
        this.setState({ selectCustomer: primaryData.customer_id });
        // alert(primaryData.customer_id);


        // this.customerjoblist(primaryData.customer_id);
        //  to choose job name 

        // this.customerjoblist(primaryData.customer_id);
        var client_id = this.state.logged_client_id;
        var customer_id = primaryData.customer_id;
        FetchAllApi.customerjoblist(client_id, customer_id, (err, response) => {
            var myArray = response.results;
            if (response.status === 1) {
                this.setState({ customerjoblist: response.results }, () => {
                    myArray.map((item) => {
                        if (item.id == primaryData.job_id) {
                            this.setState({ job_name: item.job_name });
                            jQuery("#jobName").val(item.job_name);
                        }
                    });
                    window.jQuery("#jobName").selectpicker("refresh");

                });
            } else {
                this.setState({ customerjoblist: [] });
            }
        });

        //  to choose job name 


        if (primaryData.tax_inclusive == "0") {
            document.getElementById("changeme").value = false;
            this.setState({ isChecked: false });
        } else {
            document.getElementById("changeme").value = true;

            this.setState({ isChecked: true });
        }
        // var list_length=primaryData.invoice_details.length;

        // setTimeout(() => {
        // jQuery('#invoice_to').val(primaryData.company_address)
        // jQuery('#shipping_to').val(primaryData.shipping_address)
        jQuery("#Exchange").val(primaryData.exchange_rate);
        jQuery("#getMe").val(primaryData.exchange_rate);
        var tempid = primaryData.template_id;

        //  alert(tempid.toString())
        // jQuery("#template_sel").val(tempid);
        this.setState({
            billing_address: primaryData.company_address,
            shipping_address: primaryData.shipping_address,
            estimate_id: primaryData.id,
            // loading: false,
        });
        // }, 8000);

        // setTimeout(() => {
        jQuery("#jobName").val(primaryData.job_name);
        this.setState({ job_name: primaryData.job_name,JobId:primaryData.job_id });

        //..............................................................
        var useme = primaryData.item_list.length;

        // alert(useme)
        for (var kk = 1; kk < useme; kk++) {
            var rows = this.state.rows;
            rows.push("row" + (this.state.initial_value + 1));
            this.setState({
                isAdd: false,
                initial_value: this.state.initial_value + 1,
            });
            this.setState({ rows: rows }, () => { });
        }

        for (var kk = 0; kk < useme; kk++) {
            //useme

            this.state.ItemList.length > 0 &&
                this.state.ItemList.map((item, y) => {
                    // var myVal=item.rate +
                    // '=' +
                    // item.description +
                    // '=' +
                    // item.account_name_category+'='+item.item_name

                    var myVal =
                        item.rate +
                        "=" +
                        item.description +
                        "=" +
                        item.account_name_category +
                        "=" +
                        item.item_name +
                        "=" +
                        item.item_id;

                    // var another= item.rate +
                    // '=' +
                    // item.description +
                    // '=' +
                    // item.account_name_category+'='+primaryData.invoice_details[0].item_name;

                    var another =
                        item.rate +
                        "=" +
                        item.description +
                        "=" +
                        item.account_name_category +
                        "=" +
                        primaryData.item_list[kk].item_name +
                        "=" +
                        item.item_id;
                    if (myVal === another) {
                        // jQuery('#cust_items0').val(myVal);
                        window
                            .jQuery("#cust_items" + kk)
                            .selectpicker("val", myVal);

                        // jQuery("#cust_items" + kk).attr("disabled", true);
                        // jQuery("#descr" + kk).attr("disabled", true);
                        // jQuery("#item" + kk).attr("disabled", true);
                        // jQuery("#unit_price" + kk).attr("disabled", true);
                        // jQuery("#quantity" + kk).attr("disabled", true);
                        // jQuery("#categry_id" + kk).attr("disabled", true);
                        // jQuery("#subtotal" + kk).attr("disabled", true);
                        // jQuery("#selectednow" + kk).attr("disabled", true);
                        // jQuery("#taxdisable" + kk).prop("disabled", true);

                        jQuery("#item" + kk).val(
                            primaryData.item_list[kk].item_name
                        );
                    }
                });
            this.state.number_of_columns_list.map((val, idx) => {
                let value = val.column_name

                primaryData.item_list[0].custom_column.map((inv, i) => {

                    jQuery("#addtext" + idx + i).val(inv[value])

                })

            })



            jQuery("#descr" + kk).val(
                primaryData.item_list[kk].descr
            );
            jQuery("#unit_price" + kk).val(
                primaryData.item_list[kk].unit_price
            );

            jQuery("#quantity" + kk).val(
                primaryData.item_list[kk].quantity
            );
            jQuery("#categry_id" + kk).val(
                primaryData.item_list[kk].category_id
            );
            jQuery("#subtotal" + kk).val(
                primaryData.item_list[kk].price
            );

            jQuery("#selectedrate_id" + kk).val(
                primaryData.item_list[kk].tax_rate
            );

            jQuery("#selectedtype_id" + kk).val(
                primaryData.item_list[kk].tax_type
            );
            jQuery("#selectednow" + kk).html(
                primaryData.item_list[kk].tax_name
            );
            // setTimeout(() => {
            this.setState(
                {
                    cus_rate_rate: this.state.exchange_value_ref,
                },
                () => {
                    this.handleChangeItems("", this.state.rows.length - 1);
                }
            );
            // }, 1000);
            //useme
        }
        //..............................................................
        // }, 6000);

        //Find here

        // setTimeout(() => {
        jQuery("#invoice_date").val(
            moment(primaryData.date).format("DD/MM/YYYY")
        );
        jQuery("#due_date").val(
            moment(primaryData.due_date).format("DD/MM/YYYY")
        );

        // jQuery("#invoice_no").val(primaryData.sales_number);
        // }, 6000);

        jQuery("#footer_memo").val(primaryData.memo);
        jQuery("#footeroptionthanksmessages").val(
            primaryData.thanking_message
        );
        jQuery("#termcondmsg").val(primaryData.terms_and_conditions);
        jQuery("#amount_in_words").val(primaryData.amount_in_words);


        jQuery("#payable_amount").val(primaryData.payment_amount);

        jQuery("#payment_method").val(primaryData.payment_method);

        jQuery("#payment_date").val(
            moment(primaryData.payment_date).format("DD/MM/YYYY")
        );
        // }

        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);

        jQuery('#reference').val(primaryData.payment_date);
        if ((localStorage.getItem("change_salesorder") != '' && localStorage.getItem("change_salesorder") != undefined && localStorage.getItem("change_salesorder") != null)) {
            localStorage.setItem("change_salesorder", "")
        };
        if ((localStorage.getItem("copy_salesorder") != '' && localStorage.getItem("copy_salesorder") != undefined && localStorage.getItem("copy_salesorder") != null)) {
            localStorage.setItem("copy_salesorder", "")

        };



    }

    async componentDidMount() {       
       
        window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });//DidUpdate
        jQuery("#due_date").val(moment('2021-02-03').format("DD/MM/YYYY"));



        jQuery("#mytable").click('.bootstrap-select', function (e) {
            jQuery(".table-responsive").css("overflow", "visible");
        });

        jQuery(document).click(function (e) {
            var container = jQuery("#mytable");

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                // alert("Outside");
                jQuery(".table-responsive").removeAttr("style");
            } else {
                // alert("Inside");
                jQuery(".table-responsive").css("overflow", "visible");
            }
        });

        FetchAllApi.get_data(this.state.logged_client_id, (err, response) => {
            if (response.status === 1) {
                this.setState({ entity_details: response })
            }
        })

        // window.addEventListener('click', function (e) {
        //   if (document.getElementById('mytable').contains(e.target)) {
        //     // click inside
        //   } else {
        //     jQuery(".table-responsive").removeAttr("style");
        //   }
        // });


        await this.add_third_party_customer();
        await this.add_third_party_vendor();

        jQuery(document).on("keyup", ".hello .bs-searchbox input", function (e) {
            // alert(jQuery(this).val());
            let jj = jQuery(this).val();
            if (jj.length > 0) {
                jQuery(
                    ".add-new.bootstrap-select .dropdown-menu ul li:first-child a "
                ).hide();
            } else {
                jQuery(
                    ".add-new.bootstrap-select .dropdown-menu ul li:first-child a "
                ).show();
            }
        });

        await this.get_client_home_currency();
        await this.custConverter("12/05/2020");
        await this.watchIsCustomerAdded();
        await this.watchJobAdded();
        await this.watchCoulmnUpdated();
        // setTimeout(() => {
        await this.next_sales_order_number();
        // }, 5000);

        jQuery(function () {
          jQuery(".cus").on("hidden.bs.dropdown", function () {
            jQuery("#changeTableProps").css("height", "auto");
          });
        });

        jQuery(function () {
          jQuery(".cus").on("show.bs.dropdown", function () {
            jQuery("#changeTableProps").css("height", "1000px");
          });
        });
        // alert(localStorage.getItem('customerId'))

        // setTimeout(() => {
        this.setState(
            {
                cus_rate_rate: this.state.exchange_value_ref,
            },
            () => {
                this.handleChangeItems("", this.state.rows.length - 1);
            }
        );
        // }, 1000);

        // setTimeout(()=>{jQuery('#Exchange').val()},3000)

        // if(this.props.loation!=undefined&& this.props.loation.state !=undefined &&this.props.loation.state!='' &&this.props.loation.state!=null){
        //   alert(this.props.loation.state[0])
        // }

        // this.get_currencies();
        await this.getSubAccountList();
        //     if(this.props.location.state !=undefined &&this.props.location.state.length>0&& this.props.location.state[0].newCustomer !=undefined){
        //       alert(this.props.location.state[0].newCustomer)
        //     }

        await this.addSerialNumber();
        // const { location, history } = this.props
        // const previousPath = location.state.from.pathname
        // alert(previousPath)
        // window.jQuery('#cust_items').selectpicker({

        // })
        // jQuery('.selectpicker').hasClass('open')

        // jQuery(".table-overflow").on(".selectpicker + .btn.dropdown-toggle", function (event) {
        //   // jQuery('#changeTableProps').css('overflow','')
        //   // jQuery('#changeTableProps').css('overflow-y','hidden')

        //   alert("Test");
        // });
        // jQuery(".cus").on("show.bs.dropdown", function (event) {
        //   // jQuery('#changeTableProps').css('overflow','initial')
        //   // jQuery('#changeTableProps').css('overflow-x','auto')
        // });





        //   jQuery('select').on('change', function() {
        //     alert('hiiiii')
        // });
        // jQuery(".dropdown-menu").click(function(){
        //   alert("The paragraph was clicked.");
        // });
        // alert(jQuery('.open').hasClass('show'))
        // jQuery('.open').addClass('show')

        await this.getColumns();
        await this.onChange_filter_balancesheet();
        // window
        //   .jQuery('.invoice-item-table tbody, .row-body')
        //   .sortable({
        //     beforeStop: function (event, ui) {
        //       setTimeout(() => {
        //         // alert('hiii')
        //         THIS.addSerialNumber()
        //       }, 500)
        //     },
        //     appendTo: 'parent',
        //     helper: 'clone'
        //   })
        //   .disableSelection()

        jQuery(".invoice-item-table")
            .on("change keyup keydown paste cut", "textarea", function () {
                jQuery(this).height(0).height(this.scrollHeight);
            })
            .find("textarea")
            .change();

        // jQuery('.invoice-item-table').on('click', '.del-row', function () {
        //   jQuery(this)
        //     .closest('tr')
        //     .remove()
        // })

        let isCustomer =
            localStorage.getItem("customerId") != undefined ? true : false;
        if (isCustomer) {
            var allString = localStorage.getItem("customerId");
            var splited = allString.split("=");
            var id = splited[1];
            this.setState({ selectCustomer: localStorage.getItem("customerId") });
            this.customerjoblist(id);
        }

        //Get props if so, append get selected

        await this.get_client_home_currency();
        var THIS = this;

        window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });
        // var el = document.getElementById('mytable');
        // var dragger = tableDragger(el, {
        //   mode: 'row',
        //   dragHandler: '.handle',
        //   onlyBody: true,
        //   animation: 300
        // });
        // dragger.on('drop',function(){
        // THIS.forceUpdate()
        // });

        // tableDragger(document.querySelector("#mytable"), { mode: "row", onlyBody: true });

        // window.jQuery('tbody').sortable()

        // TODO: Make the API

        await this.getColList();
        await this.callAllLocale();
        await this.handleChangeItems("", this.state.rows.length - 1);
        await this.getPaymethod();

        await this.customer_and_job_list();
        await this.getItems();
        await this.defaultcategorylist_onchange();
        //   jQuery(document).on('shown.bs.dropdown', '.table-responsive', function (e) {
        //     // The .dropdown container
        //     var jQuerycontainer = jQuery(e.target);

        //     // Find the actual .dropdown-menu
        //     var jQuerydropdown = jQuerycontainer.find('.dropdown-menu');
        //     if (jQuerydropdown.length) {
        //         // Save a reference to it, so we can find it after we've attached it to the body
        //         jQuerycontainer.data('dropdown-menu', jQuerydropdown);
        //     } else {
        //         jQuerydropdown = jQuerycontainer.data('dropdown-menu');
        //     }

        //     jQuerydropdown.css('top', (jQuerycontainer.offset().top + jQuerycontainer.outerHeight()) + 'px');
        //     jQuerydropdown.css('left', jQuerycontainer.offset().left + 'px');
        //     jQuerydropdown.css('position', 'absolute');
        //     jQuerydropdown.css('display', 'block');
        //     jQuerydropdown.appendTo('body');
        // });

        // jQuery(document).on('hide.bs.dropdown', '.table-responsive', function (e) {
        //     // Hide the dropdown menu bound to this button
        //     jQuery(e.target).data('dropdown-menu').css('display', 'none');
        // });
        // let Total= 10000
        //  alert( this.formatCurrency('USD')(parseFloat(Total).toFixed(2)) )

        // alert(this.state.logged_company_name)
        let account_type_id = 2;
        var client_id = this.state.logged_client_id;

        await FetchAllApi.get_accounts_dropdown(
            account_type_id,
            client_id,
            (err, response) => {
                if (response.status === 1) {
                    this.setState({
                        accounts_dropdown: response.list,
                    });
                }
            }
        );
        //jQuery(".select-picker").selectpicker();

        require("jquery-mousewheel");
        require("malihu-custom-scrollbar-plugin");

        jQuery(".item-listwrap").mCustomScrollbar({
            scrollEasing: "linear",
            scrollInertia: 600,
            scrollbarPosition: "outside",
        });

        jQuery(".label-enclose .label span").click(function () {
            jQuery(".label-enclose .label").removeClass("active");
            jQuery(this).parent(".label-enclose .label").addClass("active");
        });
        jQuery(".label-enclose .label a").click(function () {
            jQuery(this).parent(".label-enclose .label").removeClass("active");
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
            // jQuery(".select-picker").selectpicker();
            jQuery(".label-enclose .label").click(function () {
                jQuery(this).toggleClass("active");
            });
            jQuery(".nav-brand-res").click(function () {
                jQuery(".left-navbar").addClass("active");
            });
            jQuery(".menu-close").click(function () {
                jQuery(".left-navbar").removeClass("active");
            });
            // jQuery(".custom-select-drop .dropdown-menu a").click(function () {
            //   // alert()
            //   jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass(
            //     "active"
            //   );
            //   jQuery(this).parent("li").addClass("active");
            //   jQuery(".open #selected").text(jQuery(this).text());
            // });

            // jQuery('.input-group.date').datepicker({format: "dd/mm/yyyy"});

            // jQuery(".invoice-item-table tbody").sortable({
            // appendTo: "parent",
            // helper: "clone"
            // }).disableSelection();

            // jQuery('.invoice-item-table')
            //   .on('change keyup keydown paste cut', 'textarea', function () {
            //     jQuery(this)
            //       .height(0)
            //       .height(this.scrollHeight)
            //   })
            //   .find('textarea')
            //   .change()

            // jQuery(".tbl_drop_down").on("click", function () {
            //   jQuery(".table-responsive").addClass("ovrFlwRmve");
            // });
        });

        jQuery(".mycustextarea").css("height", "auto");
        jQuery(".mycustextarea").css("width", "auto");
        //  alert(localStorage.getItem('customerId'))
        //  jQuery('#variable_pay_type').val(7);
        // jQuery('select[name=selValue]').val(7);
        // window.jQuery('.selectpicker').selectpicker('refresh')

        //     var customerId=localStorage.getItem('customerId');
        //     if(customerId !=undefined && customerId!='' && customerId!=null){
        //       localStorage.setItem('customerId','')
        //     }

        jQuery("#account_id").val("");
        // if(this.props.location!=undefined &&this.props.location.state!=undefined&&this.props.location.state!=null){
        //   this.setState({customerID:this.props.location.state});

        // }

        var afterJobCustomerId = localStorage.getItem("job_cus_id");
        var JobId = localStorage.getItem("job_id");
        // alert("job id " + JobId);
        this.customerjoblist(afterJobCustomerId);
        this.setState(
            {
                customerID: afterJobCustomerId,
                JobId: JobId,
            },
            () => {
                localStorage.setItem("job_cus_id", "");
                localStorage.setItem("job_id", "");
            }
        );
        if (
            localStorage.getItem("customerId") != undefined &&
            localStorage.getItem("customerId") != null
        ) {
            this.setState(
                {
                    customerID: localStorage.getItem("customerId"),
                },
                () => {
                    localStorage.setItem("customerId", "");
                }
            );
        }

        await this.handleChangeItems("", this.state.rows.length - 1);

        // jQuery('#account_id').val('')

        // // alert()

        // jQuery('#variable_pay_type').val(138)
        if (this.props.location.state != undefined) {
            if (this.props.location.state.detail != undefined) {
                // from estimate details are stored in state detail object
                let data = this.props.location.state.detail;

                //  jQuery('#variable_pay_type').val(
                //     data.vendorName
                //   )

                // setTimeout(() => {
                jQuery("#template_sel").val(data.active);

                //  jQuery('#variable_pay_type').val(data.vendorName)
                this.customerjoblist(data.vendorName);
                jQuery("#invoice_date").val(data.date);
                jQuery("#invoice_no").val(data.salesno);
                jQuery("#shipping_to").val(data.salesorderto);
                jQuery("#footer_memo").val(data.memo);
                jQuery("#footeroptionthanksmessages").val(data.thanking_message);

                jQuery("#termcondmsg").val(data.terms_and_conditions);
                if (data.itemlist.length > 0) {
                    var res = data.itemlist;
                    var useme = res.length - 1;
                    for (var i = 0; i < useme; i++) {
                        var rows = this.state.rows;
                        rows.push("row" + (this.state.initial_value + 1));
                        this.setState({
                            isAdd: false,
                            initial_value: this.state.initial_value + 1,
                        });
                        this.setState({ rows: rows }, () => {
                            // jQuery('#item'+i).val(res[i])
                            this.state.rows.forEach((item, i) => {
                                this.addSerialNumber();
                                jQuery("#item" + i).val(res[i]);
                            });
                        });
                    }

                    for (let i = 0; i < data.itemlist.length; i++) {
                        //   jQuery("#cust_items0 option").filter(function() {
                        //     return this.text == 'Consulting';
                        // }).attr('selected', true);
                        // jQuery('#cust_items '+i+'option:selected' ).data('status')
                        // jQuery('#cust_items' + i).val(
                        //  data.itemlist[i].item_name
                        // )
                        jQuery("#cust_items" + i).val(data.itemlist[i].list);
                        jQuery("#descr" + i).val(data.itemlist[i].descr);
                        jQuery("#unit_price" + i).val(data.itemlist[i].unit_price);
                        jQuery("#quantity" + i).val(data.itemlist[i].quantity);
                        jQuery("#categry_id" + i).val(data.itemlist[i].category_id);
                        jQuery("#subtotal" + i).val(data.itemlist[i].price);
                        jQuery("#selectednow" + i).html(data.itemlist[i].tax_name);

                        jQuery("#selectednow_id" + i).val(data.itemlist[i].tax_id);
                        jQuery("#selectedrate_id" + i).val(data.itemlist[i].tax_rate);
                        jQuery("#selectedtype_id" + i).val(data.itemlist[i].tax_type);
                        jQuery("#subtotal" + i).val(data.itemlist[i].price);
                    }
                    this.handleChangeItems(data.itemlist.length);
                    jQuery("#homecurrencytyt").html(data.foreignsubtotal);
                    jQuery("#foreigncurrencytyt").text(data.homesubtotal);
                    jQuery("#home_tax_total").html(data.fortax);
                    jQuery("#foreign_tax_total").text(data.homecurenncytax);
                    jQuery("#home_grand_total").html(data.forgingrandtotal);
                    jQuery("#foreign_grand_total").text(data.homegrandtotal);
                }
                this.setState(
                    {
                        customerID: data.vendorName,
                        JobId: data.jobid,
                    },
                    () => { }
                );
                // }, 2000);

                // this.setState({

                //   selected_templateName:data.selected_templateName,
                //   vendorName:this.props.location.state.vendorName,
                //   job_id:this.props.location.state.job_id,
                //   billing_address:this.props.location.state.billing_address,
                //   isInvoice_to:true
                // })
            }

            if (this.props.location.state.invoicessalesorder != undefined) {
                // from salesorder details are stored in state invoicesalesorder object
                let data = this.props.location.state.invoicessalesorder;
                //  jQuery('#variable_pay_type').val(
                //     data.vendorName
                //   )

                // setTimeout(() => {
                jQuery("#template_sel").val(data.active);

                //  jQuery('#variable_pay_type').val(data.vendorName)
                this.customerjoblist(data.vendorName);
                jQuery("#invoice_date").val(data.date);
                jQuery("#invoice_no").val(data.salesno);
                jQuery("#shipping_to").val(data.salesorderto);
                jQuery("#footer_memo").val(data.memo);
                jQuery("#footeroptionthanksmessages").val(data.thanking_message);
                jQuery("#termcondmsg").val(data.terms_and_conditions);
                if (data.itemlist.length > 0) {
                    var res = data.itemlist;
                    var useme = res.length - 1;
                    for (var i = 0; i < useme; i++) {
                        var rows = this.state.rows;
                        rows.push("row" + (this.state.initial_value + 1));
                        this.setState({
                            isAdd: false,
                            initial_value: this.state.initial_value + 1,
                        });
                        this.setState({ rows: rows }, () => {
                            // jQuery('#item'+i).val(res[i])
                            this.state.rows.forEach((item, i) => {
                                this.addSerialNumber();
                                jQuery("#item" + i).val(res[i]);
                            });
                        });
                    }
                    for (let i = 0; i < data.itemlist.length; i++) {
                        //   jQuery("#cust_items0 option").filter(function() {
                        //     return this.text == 'Consulting';
                        // }).attr('selected', true);
                        // jQuery('#cust_items '+i+'option:selected' ).data('status')
                        // jQuery('#cust_items' + i).val(
                        //  data.itemlist[i].item_name
                        // )
                        jQuery("#cust_items" + i).val(data.itemlist[i].list);
                        jQuery("#descr" + i).val(data.itemlist[i].descr);
                        jQuery("#unit_price" + i).val(data.itemlist[i].unit_price);
                        jQuery("#quantity" + i).val(data.itemlist[i].quantity);
                        jQuery("#categry_id" + i).val(data.itemlist[i].category_id);
                        jQuery("#subtotal" + i).val(data.itemlist[i].price);
                        jQuery("#selectednow" + i).html(data.itemlist[i].tax_name);

                        jQuery("#selectednow_id" + i).val(data.itemlist[i].tax_id);
                        jQuery("#selectedrate_id" + i).val(data.itemlist[i].tax_rate);
                        jQuery("#selectedtype_id" + i).val(data.itemlist[i].tax_type);
                        jQuery("#subtotal" + i).val(data.itemlist[i].price);
                    }
                    this.handleChangeItems(data.itemlist.length);
                    jQuery("#homecurrencytyt").html(data.foreignsubtotal);
                    jQuery("#foreigncurrencytyt").text(data.homesubtotal);
                    jQuery("#home_tax_total").html(data.fortax);
                    jQuery("#foreign_tax_total").text(data.homecurenncytax);
                    jQuery("#home_grand_total").html(data.forgingrandtotal);
                    jQuery("#foreign_grand_total").text(data.homegrandtotal);
                }
                this.setState(
                    {
                        customerID: data.vendorName,
                        JobId: data.jobid,
                    },
                    () => { }
                );
                // }, 2000);
            }
            if (this.props.location.state.invoicecreditmemo != undefined) {
                // from creditmemo details are stored in state invoicecreditmemo object
                let data = this.props.location.state.invoicecreditmemo;
                //  jQuery('#variable_pay_type').val(
                //     data.vendorName
                //   )

                // setTimeout(() => {
                jQuery("#template_sel").val(data.active);

                //  jQuery('#variable_pay_type').val(data.vendorName)
                this.customerjoblist(data.vendorName);
                jQuery("#invoice_date").val(data.date);
                jQuery("#invoice_no").val(data.salesno);
                jQuery("#shipping_to").val(data.salesorderto);
                jQuery("#footer_memo").val(data.memo);
                jQuery("#footeroptionthanksmessages").val(data.thanking_message);
                jQuery("#termcondmsg").val(data.terms_and_conditions);
                if (data.itemlist.length > 0) {
                    var res = data.itemlist;
                    var useme = res.length - 1;
                    for (var i = 0; i < useme; i++) {
                        var rows = this.state.rows;
                        rows.push("row" + (this.state.initial_value + 1));
                        this.setState({
                            isAdd: false,
                            initial_value: this.state.initial_value + 1,
                        });
                        this.setState({ rows: rows }, () => {
                            // jQuery('#item'+i).val(res[i])
                            this.state.rows.forEach((item, i) => {
                                this.addSerialNumber();
                                jQuery("#item" + i).val(res[i]);
                            });
                        });
                    }

                    for (let i = 0; i < data.itemlist.length; i++) {
                        //   jQuery("#cust_items0 option").filter(function() {
                        //     return this.text == 'Consulting';
                        // }).attr('selected', true);
                        // jQuery('#cust_items '+i+'option:selected' ).data('status')
                        // jQuery('#cust_items' + i).val(
                        //  data.itemlist[i].item_name
                        // )
                        jQuery("#cust_items" + i).val(data.itemlist[i].list);
                        jQuery("#descr" + i).val(data.itemlist[i].descr);
                        jQuery("#unit_price" + i).val(data.itemlist[i].unit_price);
                        jQuery("#quantity" + i).val(data.itemlist[i].quantity);
                        jQuery("#categry_id" + i).val(data.itemlist[i].category_id);
                        jQuery("#subtotal" + i).val(data.itemlist[i].price);
                        jQuery("#selectednow" + i).html(data.itemlist[i].tax_name);
                        jQuery("#selectednow" + i).val(data.itemlist[i].tax_name);
                        jQuery("#selectednow_id" + i).val(data.itemlist[i].tax_id);
                        jQuery("#selectedrate_id" + i).val(data.itemlist[i].tax_rate);
                        jQuery("#selectedtype_id" + i).val(data.itemlist[i].tax_type);
                        jQuery("#subtotal" + i).val(data.itemlist[i].price);
                    }
                    this.handleChangeItems(data.itemlist.length);
                    jQuery("#homecurrencytyt").html(data.foreignsubtotal);
                    jQuery("#foreigncurrencytyt").text(data.homesubtotal);
                    jQuery("#home_tax_total").html(data.fortax);
                    jQuery("#foreign_tax_total").text(data.homecurenncytax);
                    jQuery("#home_grand_total").html(data.forgingrandtotal);
                    jQuery("#foreign_grand_total").text(data.homegrandtotal);
                }

                this.setState(
                    {
                        customerID: data.vendorName,
                        JobId: data.jobid,
                    },
                    () => {
                      //  alert(data.vendorName);
                    }
                );
                // }, 2000);

                // this.setState({

                //   selected_templateName:data.selected_templateName,
                //   vendorName:this.props.location.state.vendorName,
                //   job_id:this.props.location.state.job_id,
                //   billing_address:this.props.location.state.billing_address,
                //   isInvoice_to:true
                // })
            }
        }
        await this.appendInvoiceDetails();
        await this.groupRequestAppendInvoice();

        if ((localStorage.getItem("change_salesorder") != '' && localStorage.getItem("change_salesorder") != undefined && localStorage.getItem("change_salesorder") != null) || (localStorage.getItem("copy_salesorder") != '' && localStorage.getItem("copy_salesorder") != undefined && localStorage.getItem("copy_salesorder") != null)) {
            setTimeout(() => { this.change_estimate_to_sales(); }, 1000)
        }
        setTimeout(() => {
            this.setState({ loading: false })

        }, 1000);
        if(!this.state.isInvoiceEditable && this.state.customer_id!=0){
            const custid=this.state.customer_id
            await this.Basic_info(custid);    
            if(this.state.cusromer_id!=0){
            localStorage.setItem('selected_customer_id',custid)}
            jQuery('#variable_pay_type').val(this.state.customer_id);
            this.customerjoblist(custid);
            this.setState({selectCustomer:custid,myCusVarPay:custid});
            }
    };


    delete_or_void_sales_order = (val) => {

        let input = {
            client_id: this.state.logged_client_id,
            sales_order_id: this.state.sales_order_id,
            status_to_set: val

        }

        FetchAllApi.delete_or_void_sales_order(
            input,
            (err, response) => {
                if (response.status === 1) {
                    alert(response.message)

                    setTimeout(() => {
                        window.location.href = "/all_lists"
                    }, 500);

                    // this.props.history.push('/all_lists')
                    // window.jQuery('#modal_delete_invoice').modal('hide')

                } else if (response.status === 2) {
                    this.setState({ delete_alert_msg: response.message })
                    setTimeout(() => {

                        // window.open('/all_lists')
                        if (val == 10) {
                            window.jQuery('#modal_delete_invoice').modal('hide')
                            window.jQuery('#paid_invoice_delete_modal').show('show')
                        }
                        if (val == 11) {
                            window.jQuery('#modal_void_invoice').modal('hide')
                            window.jQuery('#paid_invoice_void_modal').show('show')
                        }


                    }, 500);

                } else {
                    alert(response.message)
                }
            }
        );

    };

    makeDisabled = () => {
        jQuery("#changeme").attr("disabled", true);

        jQuery("#invoice_curr_id").attr("disabled", true);
        jQuery("#template_sel").attr("disabled", true);
        jQuery("#variable_pay_type").attr("disabled", true);
        jQuery("#invoice_date").attr("disabled", true);
        jQuery("#invoice_no").attr("disabled", true);

        jQuery("#due_date").attr("disabled", true);
        jQuery("#jobName").attr("disabled", true);
        jQuery("#invoice_to").attr("disabled", true);
        jQuery("#shipping_to").attr("disabled", true);
        jQuery("#footer_memo").attr("disabled", true);
        jQuery("#Exchange").attr("disabled", true);
        jQuery("#footeroptionthanksmessages").attr("disabled", true);
        jQuery("#termcondmsg").attr("disabled", true);
    };
    async appendInvoiceDetails() {
        var setID = localStorage.getItem("invoice_id");
        if (setID !== null) {
            var localBee = setID.split("=");
            if (localBee.length > 1) {
                var client_id = localBee[1]
                var sales_order_id = localBee[0]


                var invoice_id = localBee[0];
                var payment_id = 0;
                this.setState({ paymentGRTR: Number(payment_id), edited: true, sales_order_id, client_id });
            } else {
                var invoice_id = setID;
                var payment_id = 0;
            }

            if (invoice_id != undefined && invoice_id != "" && invoice_id != null) {
                // alert(invoice_id)

                var coreData = {
                    client_id: this.state.logged_client_id,
                    sales_order_id: sales_order_id,
                    payment_id: 0,
                };
                this.setState({ loading: true })
                // setTimeout(() => {
                await FetchAllApi.get_sales_order_details(coreData, (err, response) => {
                    // alert('rightu')f 
                    if (response.status === 1) {
                        var primaryData = response.invoice_details;
                        jQuery("#paid_status").val(primaryData.paid_status + "--invoice");

                        jQuery("#invoice_to").val(primaryData.company_address);
                        jQuery("#shipping_to").val(primaryData.shipping_address);
                        jQuery("#payment_exchange_rate").val(
                            primaryData.payment_exchange_rate
                        );
                        jQuery("#reference").val(primaryData.reference);
                        this.setState({ is_void:primaryData.is_voided,invoice_details: response, invoice_details2: response, invoice_id_used: primaryData.id, payment_desc: primaryData.descripation, template_id: primaryData.template_id });


                        this.customValuesUpdate(primaryData.custom_header_fields, primaryData.custom_footer_fields)
                        this.temChanged(primaryData.template_id)


                        //Append here....
                        jQuery("#getMe").val(primaryData.exchange_rate);
                        if (payment_id != 0) {
                            this.makeDisabled();
                            jQuery("#balanceSheetCategeory").val(
                                primaryData.balance_sheet_category
                            );
                            var mySelValue = jQuery(
                                "#balanceSheetCategeory option:selected"
                            ).data("status");
                            if (
                                mySelValue != undefined &&
                                mySelValue != "" &&
                                mySelValue != null
                            ) {
                                this.state.balancesheetlist.forEach((item, i) => {
                                    if (item.name == mySelValue) {
                                        // alert(item.id)
                                        const string = item.name;
                                        const Payable = string.includes("ayable");
                                        const Receivable = string.includes("eceivable");
                                        if (Payable || Receivable) {
                                            this.setState({ isThirdPartyName: true });
                                            if (Payable) {
                                                this.setState({ thrird_party_type: 2 });
                                                this.fetchThirdPartyNames(5);
                                            }
                                            if (Receivable) {
                                                this.setState({ thrird_party_type: 1 });

                                                this.fetchThirdPartyNames(2);
                                            }
                                        } else {
                                            this.setState({ isThirdPartyName: false });
                                        }
                                    }
                                });

                                // setTimeout(() => {
                                jQuery("#third_account_id").val(
                                    primaryData.thrird_party_account_id
                                );
                                // }, 8000);
                            }
                        }

                        this.setState(
                            {
                                isInvoiceEditable: true,
                                currInvoiceId: primaryData.invoice_number,
                                currpayment_id: primaryData.payment_id,
                            },
                            () => {
                                jQuery("#appliedhom").html(
                                    (isNaN(
                                        Number(
                                            primaryData.payments_applied_home_currency !== undefined
                                                ? primaryData.payments_applied_home_currency
                                                : 0
                                        )
                                    )
                                        ? 0
                                        : Number(primaryData.payments_applied_home_currency)
                                    ).toFixed(2)
                                );

                                // jQuery('#forbaldue').html((primaryData.open_balance_foreign_currency).toFixed(2));
                                // jQuery('#homebaldue').html((primaryData.open_balance_home_currency).toFixed(2));

                                // jQuery('#appliedfor').html((primaryData.payments_applied_foreign_currency).toFixed(2));
                                //hey
                                jQuery("#appliedfor").html(
                                    (isNaN(
                                        Number(
                                            primaryData.payments_applied_foreign_currency !==
                                                undefined
                                                ? primaryData.payments_applied_foreign_currency
                                                : 0
                                        )
                                    )
                                        ? 0
                                        : Number(primaryData.payments_applied_foreign_currency)
                                    ).toFixed(2)
                                );
                                jQuery("#forbaldue").html(
                                    (isNaN(
                                        Number(
                                            primaryData.open_balance_foreign_currency !== undefined
                                                ? primaryData.open_balance_foreign_currency
                                                : 0
                                        )
                                    )
                                        ? 0
                                        : Number(primaryData.open_balance_foreign_currency)
                                    ).toFixed(2)
                                );
                                jQuery("#homebaldue").html(
                                    (isNaN(
                                        Number(
                                            primaryData.open_balance_home_currency !== undefined
                                                ? primaryData.open_balance_home_currency
                                                : 0
                                        )
                                    )
                                        ? 0
                                        : Number(primaryData.open_balance_home_currency)
                                    ).toFixed(2)
                                );
                                jQuery("#footeroptionthanksmessages").val(
                                    primaryData.thanking_message
                                );
                                jQuery("#termcondmsg").val(primaryData.terms_and_conditions);
                                //hey

                                jQuery("#exchangeGain").html(
                                    (isNaN(
                                        Number(
                                            primaryData.exchange_gain_or_loss !== undefined
                                                ? primaryData.exchange_gain_or_loss
                                                : 0
                                        )
                                    )
                                        ? 0
                                        : Number(primaryData.exchange_gain_or_loss)
                                    ).toFixed(2)
                                );
                            }
                        );

                        jQuery("#invoice_curr_id").val(primaryData.foreign_currency);
                        this.setState(
                            {
                                CurrentSelectedCurr: primaryData.foreign_currency,
                                cus_rate_rate: Number(primaryData.exchange_rate),
                            },
                            () => {
                                this.findInSubAccountList();
                            }
                        );

                        jQuery("#variable_pay_type").val(primaryData.customer_id);
                        this.setState({ selectCustomer: primaryData.customer_id });
                        // alert(primaryData.customer_id);


                        // this.customerjoblist(primaryData.customer_id);
                        //  to choose job name 

                        // this.customerjoblist(primaryData.customer_id);
                        var client_id = this.state.logged_client_id;
                        var customer_id = primaryData.customer_id;
                        FetchAllApi.customerjoblist(client_id, customer_id, (err, response) => {
                            var myArray = response.results;
                            if (response.status === 1) {
                                this.setState({ customerjoblist: response.results }, () => {
                                    myArray.map((item) => {
                                        if (item.id == primaryData.job_id) {
                                            this.setState({ job_name: item.job_name,JobId:item.id });
                                            jQuery("#jobName").val(item.job_name);
                                        }
                                    });
                                    window.jQuery("#jobName").selectpicker("refresh");

                                });
                            } else {
                                this.setState({ customerjoblist: [] });
                            }
                        });

                        //  to choose job name 


                        if (primaryData.tax_inclusive == "0") {
                            document.getElementById("changeme").value = false;
                            this.setState({ isChecked: false });
                        } else {
                            document.getElementById("changeme").value = true;

                            this.setState({ isChecked: true });
                        }
                        // var list_length=primaryData.invoice_details.length;

                        // setTimeout(() => {
                        // jQuery('#invoice_to').val(primaryData.company_address)
                        // jQuery('#shipping_to').val(primaryData.shipping_address)
                        jQuery("#Exchange").val(primaryData.exchange_rate);
                        jQuery("#getMe").val(primaryData.exchange_rate);
                        var tempid = primaryData.template_id;

                        //  alert(tempid.toString())
                        jQuery("#template_sel").val(tempid);
                        this.setState({
                            billing_address: primaryData.company_address,
                            shipping_address: primaryData.shipping_address,
                            // loading: false,
                        });
                        // }, 8000);

                        // setTimeout(() => {
                        jQuery("#jobName").val(primaryData.job_name);
                        this.setState({ job_name: primaryData.job_name,JobId:primaryData.job_id });

                        //..............................................................
                        var useme = primaryData.invoice_details.length;
                        // alert(useme)
                        for (var kk = 1; kk < useme; kk++) {
                            var rows = this.state.rows;
                            rows.push("row" + (this.state.initial_value + 1));
                            this.setState({
                                isAdd: false,
                                initial_value: this.state.initial_value + 1,
                            });
                            this.setState({ rows: rows }, () => { });
                        }

                        for (var kk = 0; kk < useme; kk++) {
                            //useme
                            this.state.ItemList.length > 0 &&
                                this.state.ItemList.map((item, y) => {
                                    // var myVal=item.rate +
                                    // '=' +
                                    // item.description +
                                    // '=' +
                                    // item.account_name_category+'='+item.item_name

                                    var myVal =
                                        item.rate +
                                        "=" +
                                        item.description +
                                        "=" +
                                        item.account_name_category +
                                        "=" +
                                        item.item_name +
                                        "=" +
                                        item.item_id;

                                    // var another= item.rate +
                                    // '=' +
                                    // item.description +
                                    // '=' +
                                    // item.account_name_category+'='+primaryData.invoice_details[0].item_name;

                                    var another =
                                        item.rate +
                                        "=" +
                                        item.description +
                                        "=" +
                                        item.account_name_category +
                                        "=" +
                                        primaryData.invoice_details[kk].item_name +
                                        "=" +
                                        item.item_id;
                                    if (myVal === another) {
                                        // jQuery('#cust_items0').val(myVal);
                                        window
                                            .jQuery("#cust_items" + kk)
                                            .selectpicker("val", myVal);
                                        if (payment_id > 0) {
                                            jQuery("#cust_items" + kk).attr("disabled", true);
                                            jQuery("#descr" + kk).attr("disabled", true);
                                            jQuery("#item" + kk).attr("disabled", true);
                                            jQuery("#unit_price" + kk).attr("disabled", true);
                                            jQuery("#quantity" + kk).attr("disabled", true);
                                            jQuery("#categry_id" + kk).attr("disabled", true);
                                            jQuery("#subtotal" + kk).attr("disabled", true);
                                            jQuery("#selectednow" + kk).attr("disabled", true);
                                            jQuery("#taxdisable" + kk).prop("disabled", true);
                                        }
                                        jQuery("#item" + kk).val(
                                            primaryData.invoice_details[kk].item_name
                                        );
                                    }
                                });
                            this.state.number_of_columns_list.map((val, idx) => {
                                let value = val.column_name

                                primaryData.invoice_details[0].custom_column.map((inv, i) => {

                                    jQuery("#addtext" + idx + i).val(inv[value])

                                })

                            })



                            jQuery("#descr" + kk).val(
                                primaryData.invoice_details[kk].descr
                            );
                            jQuery("#unit_price" + kk).val(
                                primaryData.invoice_details[kk].unit_price
                            );

                            jQuery("#quantity" + kk).val(
                                primaryData.invoice_details[kk].quantity
                            );
                            jQuery("#categry_id" + kk).val(
                                primaryData.invoice_details[kk].category_id
                            );
                            jQuery("#subtotal" + kk).val(
                                primaryData.invoice_details[kk].price
                            );

                            jQuery("#selectedrate_id" + kk).val(
                                primaryData.invoice_details[kk].tax_rate
                            );

                            jQuery("#selectedtype_id" + kk).val(
                                primaryData.invoice_details[kk].tax_type
                            );
                            jQuery("#selectednow" + kk).html(
                                primaryData.invoice_details[kk].tax_name
                            );
                            // setTimeout(() => {
                            this.setState(
                                {
                                    cus_rate_rate: this.state.exchange_value_ref,
                                },
                                () => {
                                    this.handleChangeItems("", this.state.rows.length - 1);
                                }
                            );
                            // }, 1000);
                            //useme
                        }
                        //..............................................................
                        // }, 6000);

                        //Find here

                        // setTimeout(() => {
                        jQuery("#invoice_date").val(
                            moment(primaryData.date).format("DD/MM/YYYY")
                        );
                        jQuery("#due_date").val(
                            moment(primaryData.due_date).format("DD/MM/YYYY")
                        );

                        jQuery("#invoice_no").val(primaryData.sales_number);
                        // }, 6000);

                        jQuery("#footer_memo").val(primaryData.memo);
                        jQuery("#footeroptionthanksmessages").val(
                            primaryData.thanking_message
                        );
                        jQuery("#termcondmsg").val(primaryData.terms_and_conditions);
                        jQuery("#amount_in_words").val(primaryData.amount_in_words);

                        if (payment_id != 0) {
                            jQuery("#payable_amount").val(primaryData.payment_amount);

                            jQuery("#payment_method").val(primaryData.payment_method);

                            jQuery("#payment_date").val(
                                moment(primaryData.payment_date).format("DD/MM/YYYY")
                            );
                        }

                        // setTimeout(() => {
                        //     this.setState({ loading: false })
                        // }, 1000);

                        // jQuery('#reference').val(primaryData.payment_date);
                    } else {
                        this.setState({ customerjoblist: [] });
                    }
                });
                // }, 5000);
            }
            localStorage.setItem("invoice_id", "");
        } else {
            var payment_id = 0;
        }
    };


    async groupRequestAppendInvoice() {
        var id = localStorage.getItem("group_payment_request");
        var invoice_id = localStorage.getItem("sales_invoice_id");
        var payment_id = 0;

        if (invoice_id != undefined && invoice_id != "" && invoice_id != null && id != undefined && id != "" && id != null) {
            // alert(invoice_id)

            var coreData = {
                notification_id: id,
                sales_invoice_id: invoice_id
            };
            // setTimeout(() => {
            await FetchAllApi.getGroupInvoiceDetails(coreData, (err, response) => {
                // alert('rightu')f
                if (response.status === 1) {
                    var primaryData = response.invoice_details;
                    jQuery("#paid_status").val(primaryData.paid_status + "--invoice");

                    jQuery("#invoice_to").val(primaryData.company_address);
                    jQuery("#shipping_to").val(primaryData.shipping_address);
                    jQuery("#payment_exchange_rate").val(
                        primaryData.payment_exchange_rate
                    );
                    jQuery("#reference").val(primaryData.reference);
                    this.setState({ invoice_id_used: primaryData.id, payment_desc: primaryData.descripation });

                    //Append here....
                    jQuery("#getMe").val(primaryData.exchange_rate);
                    if (payment_id != 0) {
                        this.makeDisabled();
                        jQuery("#balanceSheetCategeory").val(
                            primaryData.balance_sheet_category
                        );
                        var mySelValue = jQuery(
                            "#balanceSheetCategeory option:selected"
                        ).data("status");
                        if (
                            mySelValue != undefined &&
                            mySelValue != "" &&
                            mySelValue != null
                        ) {
                            this.state.balancesheetlist.forEach((item, i) => {
                                if (item.name == mySelValue) {
                                    // alert(item.id)
                                    const string = item.name;
                                    const Payable = string.includes("ayable");
                                    const Receivable = string.includes("eceivable");
                                    if (Payable || Receivable) {
                                        this.setState({ isThirdPartyName: true });
                                        if (Payable) {
                                            this.setState({ thrird_party_type: 2 });
                                            this.fetchThirdPartyNames(5);
                                        }
                                        if (Receivable) {
                                            this.setState({ thrird_party_type: 1 });

                                            this.fetchThirdPartyNames(2);
                                        }
                                    } else {
                                        this.setState({ isThirdPartyName: false });
                                    }
                                }
                            });

                            // setTimeout(() => {
                            jQuery("#third_account_id").val(
                                primaryData.thrird_party_account_id
                            );
                            // }, 8000);
                        }
                    }

                    this.setState(
                        {
                            isInvoiceEditable: true,
                            currInvoiceId: primaryData.invoice_number,
                            currpayment_id: primaryData.payment_id,
                        },
                        () => {
                            jQuery("#appliedhom").html(
                                (isNaN(
                                    Number(
                                        primaryData.payments_applied_home_currency !== undefined
                                            ? primaryData.payments_applied_home_currency
                                            : 0
                                    )
                                )
                                    ? 0
                                    : Number(primaryData.payments_applied_home_currency)
                                ).toFixed(2)
                            );

                            // jQuery('#forbaldue').html((primaryData.open_balance_foreign_currency).toFixed(2));
                            // jQuery('#homebaldue').html((primaryData.open_balance_home_currency).toFixed(2));

                            // jQuery('#appliedfor').html((primaryData.payments_applied_foreign_currency).toFixed(2));
                            //hey
                            jQuery("#appliedfor").html(
                                (isNaN(
                                    Number(
                                        primaryData.payments_applied_foreign_currency !==
                                            undefined
                                            ? primaryData.payments_applied_foreign_currency
                                            : 0
                                    )
                                )
                                    ? 0
                                    : Number(primaryData.payments_applied_foreign_currency)
                                ).toFixed(2)
                            );
                            jQuery("#forbaldue").html(
                                (isNaN(
                                    Number(
                                        primaryData.open_balance_foreign_currency !== undefined
                                            ? primaryData.open_balance_foreign_currency
                                            : 0
                                    )
                                )
                                    ? 0
                                    : Number(primaryData.open_balance_foreign_currency)
                                ).toFixed(2)
                            );
                            jQuery("#homebaldue").html(
                                (isNaN(
                                    Number(
                                        primaryData.open_balance_home_currency !== undefined
                                            ? primaryData.open_balance_home_currency
                                            : 0
                                    )
                                )
                                    ? 0
                                    : Number(primaryData.open_balance_home_currency)
                                ).toFixed(2)
                            );
                            jQuery("#footeroptionthanksmessages").val(
                                primaryData.thanking_message
                            );
                            jQuery("#termcondmsg").val(primaryData.terms_and_conditions);
                            //hey

                            jQuery("#exchangeGain").html(
                                (isNaN(
                                    Number(
                                        primaryData.exchange_gain_or_loss !== undefined
                                            ? primaryData.exchange_gain_or_loss
                                            : 0
                                    )
                                )
                                    ? 0
                                    : Number(primaryData.exchange_gain_or_loss)
                                ).toFixed(2)
                            );
                        }
                    );

                    jQuery("#invoice_curr_id").val(primaryData.foreign_currency);
                    this.setState(
                        {
                            CurrentSelectedCurr: primaryData.foreign_currency,
                            cus_rate_rate: Number(primaryData.exchange_rate),
                        },
                        () => {
                            this.findInSubAccountList();
                        }
                    );

                    jQuery("#variable_pay_type").val(primaryData.customer_id);
                    this.setState({ selectCustomer: primaryData.customer_id });
                    this.customerjoblist(primaryData.customer_id);
                    if (primaryData.tax_inclusive == "0") {
                        document.getElementById("changeme").value = false;
                        this.setState({ isChecked: false });
                    } else {
                        document.getElementById("changeme").value = true;

                        this.setState({ isChecked: true });
                    }
                    // var list_length=primaryData.invoice_details.length;

                    // setTimeout(() => {
                    // jQuery('#invoice_to').val(primaryData.company_address)
                    // jQuery('#shipping_to').val(primaryData.shipping_address)
                    jQuery("#Exchange").val(primaryData.exchange_rate);
                    jQuery("#getMe").val(primaryData.exchange_rate);
                    var tempid = primaryData.template_id;

                    //  alert(tempid.toString())
                    jQuery("#template_sel").val(tempid);
                    this.setState({
                        billing_address: primaryData.company_address,
                        shipping_address: primaryData.shipping_address,
                    });
                    // }, 8000);

                    // setTimeout(() => {
                    jQuery("#jobName").val(primaryData.job_name);
                    this.setState({ job_name: primaryData.job_name ,JobId:primaryData.job_id});

                    //..............................................................
                    var useme = primaryData.invoice_details.length;
                    // alert(useme)
                    for (var kk = 1; kk < useme; kk++) {
                        var rows = this.state.rows;
                        rows.push("row" + (this.state.initial_value + 1));
                        this.setState({
                            isAdd: false,
                            initial_value: this.state.initial_value + 1,
                        });
                        this.setState({ rows: rows }, () => { });
                    }

                    for (var kk = 0; kk < useme; kk++) {
                        //useme
                        this.state.ItemList.length > 0 &&
                            this.state.ItemList.map((item, y) => {
                                // var myVal=item.rate +
                                // '=' +
                                // item.description +
                                // '=' +
                                // item.account_name_category+'='+item.item_name

                                var myVal =
                                    item.rate +
                                    "=" +
                                    item.description +
                                    "=" +
                                    item.account_name_category +
                                    "=" +
                                    item.item_name +
                                    "=" +
                                    item.item_id;

                                // var another= item.rate +
                                // '=' +
                                // item.description +
                                // '=' +
                                // item.account_name_category+'='+primaryData.invoice_details[0].item_name;

                                var another =
                                    item.rate +
                                    "=" +
                                    item.description +
                                    "=" +
                                    item.account_name_category +
                                    "=" +
                                    primaryData.invoice_details[kk].item_name +
                                    "=" +
                                    item.item_id;
                                if (myVal === another) {
                                    // jQuery('#cust_items0').val(myVal);
                                    window
                                        .jQuery("#cust_items" + kk)
                                        .selectpicker("val", myVal);
                                    if (payment_id > 0) {
                                        jQuery("#cust_items" + kk).attr("disabled", true);
                                        jQuery("#descr" + kk).attr("disabled", true);
                                        jQuery("#item" + kk).attr("disabled", true);
                                        jQuery("#unit_price" + kk).attr("disabled", true);
                                        jQuery("#quantity" + kk).attr("disabled", true);
                                        jQuery("#categry_id" + kk).attr("disabled", true);
                                        jQuery("#subtotal" + kk).attr("disabled", true);
                                        jQuery("#selectednow" + kk).attr("disabled", true);
                                        jQuery("#taxdisable" + kk).prop("disabled", true);
                                    }

                                    this.state.number_of_columns_list.map((val, idx) => {
                                        let value = val.column_name

                                        primaryData.invoice_details[0].custom_column.map((inv, i) => {

                                            jQuery("#addtext" + idx + i).val(inv[value])

                                        })

                                    });


                                    jQuery("#item" + kk).val(
                                        primaryData.invoice_details[kk].item_name
                                    );
                                }
                            });




                        jQuery("#descr" + kk).val(
                            primaryData.invoice_details[kk].descr
                        );
                        jQuery("#unit_price" + kk).val(
                            primaryData.invoice_details[kk].unit_price
                        );

                        jQuery("#quantity" + kk).val(
                            primaryData.invoice_details[kk].quantity
                        );
                        jQuery("#categry_id" + kk).val(
                            primaryData.invoice_details[kk].category_id
                        );
                        jQuery("#subtotal" + kk).val(
                            primaryData.invoice_details[kk].price
                        );

                        jQuery("#selectedrate_id" + kk).val(
                            primaryData.invoice_details[kk].tax_rate
                        );

                        jQuery("#selectedtype_id" + kk).val(
                            primaryData.invoice_details[kk].tax_type
                        );
                        jQuery("#selectednow" + kk).html(
                            primaryData.invoice_details[kk].tax_name
                        );
                        // setTimeout(() => {
                        this.setState(
                            {
                                cus_rate_rate: this.state.exchange_value_ref,
                            },
                            () => {
                                this.handleChangeItems("", this.state.rows.length - 1);
                            }
                        );
                        // }, 1000);
                        //useme
                    }
                    //..............................................................
                    // }, 6000);

                    //Find here

                    // setTimeout(() => {
                    jQuery("#invoice_date").val(
                        moment(primaryData.invoice_date).format("DD/MM/YYYY")
                    );
                    jQuery("#due_date").val(
                        moment(primaryData.due_date).format("DD/MM/YYYY")
                    );

                    jQuery("#invoice_no").val(primaryData.invoice_number);
                    // }, 6000);

                    jQuery("#footer_memo").val(primaryData.memo);
                    jQuery("#footeroptionthanksmessages").val(
                        primaryData.thanking_message
                    );
                    jQuery("#termcondmsg").val(primaryData.terms_and_conditions);
                    jQuery("#amount_in_words").val(primaryData.amount_in_words);

                    if (payment_id == 0) {
                        jQuery("#payable_amount").val(primaryData.payment_amount);

                        jQuery("#payment_method").val(primaryData.payment_method);
                        this.setState({ pay_method: primaryData.payment_method })
                        jQuery("#payment_date").val(
                            moment(primaryData.payment_date).format("DD/MM/YYYY")
                        );
                    }

                    // jQuery('#reference').val(primaryData.payment_date);
                } else {
                    this.setState({ customerjoblist: [] });
                }
            });
            // }, 5000);
        }
        localStorage.setItem("group_payment_request", "");
        localStorage.setItem("sales_invoice_id", "");
    };

    componentWillMount() {



    }
    onDocumentLoadSuccess = () => {
    };

    set_accounts_selected = (text_selected) => {
        this.setState({ accounts_selected: text_selected });
    };

    logoutLink() {
        localStorage.clear();

        this.props.history.push("/");
    }

    //   dataTaggingFunc(list_id,file_id) {
    //     this.props.history.push("/data_tagging/" + list_id + "/" + file_id );
    //     window.scrollTo(0, 0);
    //   }

    routedChange(parameter) {
        this.props.history.push("/" + parameter);
        window.scrollTo(0, 0);
    }

    pageLink(page_slug) {
        this.props.history.push("/" + page_slug);
    }

    convertNumberToWords(amount) {
        var words = new Array();
        words[0] = "";
        words[1] = "One";
        words[2] = "Two";
        words[3] = "Three";
        words[4] = "Four";
        words[5] = "Five";
        words[6] = "Six";
        words[7] = "Seven";
        words[8] = "Eight";
        words[9] = "Nine";
        words[10] = "Ten";
        words[11] = "Eleven";
        words[12] = "Twelve";
        words[13] = "Thirteen";
        words[14] = "Fourteen";
        words[15] = "Fifteen";
        words[16] = "Sixteen";
        words[17] = "Seventeen";
        words[18] = "Eighteen";
        words[19] = "Nineteen";
        words[20] = "Twenty";
        words[30] = "Thirty";
        words[40] = "Forty";
        words[50] = "Fifty";
        words[60] = "Sixty";
        words[70] = "Seventy";
        words[80] = "Eighty";
        words[90] = "Ninety";

        // alert(amount)
        // if(amount !== 'Nan' && amount !== undefined){amount = amount.toString()}

        if (amount != undefined) {
            amount = amount.toString();
        }
        // amount=this.state.grandTotal.toString()
        var atemp = amount.split(".");
        var number = atemp[0].split(",").join("");
        var n_length = number.length;
        var words_string = "";
        if (n_length <= 9) {
            var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            var received_n_array = new Array();
            for (var i = 0; i < n_length; i++) {
                received_n_array[i] = number.substr(i, 1);
            }
            for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                n_array[i] = received_n_array[j];
            }
            for (var i = 0, j = 1; i < 9; i++, j++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    if (n_array[i] == 1) {
                        n_array[j] = 10 + parseInt(n_array[j]);
                        n_array[i] = 0;
                    }
                }
            }
            var value = "";
            for (var i = 0; i < 9; i++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    value = n_array[i] * 10;
                } else {
                    value = n_array[i];
                }
                if (value != 0) {
                    words_string += words[value] + " ";
                }
                if (
                    (i == 1 && value != 0) ||
                    (i == 0 && value != 0 && n_array[i + 1] == 0)
                ) {
                    words_string += "Crores ";
                }
                if (
                    (i == 3 && value != 0) ||
                    (i == 2 && value != 0 && n_array[i + 1] == 0)
                ) {
                    words_string += "Lakhs ";
                }
                if (
                    (i == 5 && value != 0) ||
                    (i == 4 && value != 0 && n_array[i + 1] == 0)
                ) {
                    words_string += "Thousand ";
                }
                if (
                    i == 6 &&
                    value != 0 &&
                    n_array[i + 1] != 0 &&
                    n_array[i + 2] != 0
                ) {
                    words_string += "Hundred and ";
                } else if (i == 6 && value != 0) {
                    words_string += "Hundred ";
                }
            }
            words_string = words_string.split("  ").join(" ");
        }
        return words_string;
    }

    convertHtmlToPdf(e) {
        if (this.state.selected_templateName === "Choose") {
            this.setState({ isTemplate_selected: true });
        } else {
            this.setState({ isTemplate_selected: false });
            if (
                this.state.myarray.length > this.state.rows.length - 1 &&
                this.state.myarray[this.state.myarray.length - 1].price > 0 &&
                this.state.myarray[this.state.myarray.length - 1].item_name.length >
                0 &&
                this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
            ) {
                var selected_date = this.convert_date_format();
                let client_id = this.state.logged_client_id;
                let customer_id = this.state.active_selected;
                let item_total_home_currency = jQuery("#foreigncurrencytyt").html();
                let tax_amount_home_currency = jQuery("#foreign_tax_total").html();
                let grand_total_home_currency = jQuery("#foreign_grand_total").html();
                let item_total_foreign_currency = jQuery("#homecurrencytyt").html();
                let tax_amount_foreign_currency = jQuery("#home_tax_total").html();
                let grand_total_foreign_currency = jQuery("#home_grand_total").html();
                let currency = this.state.currency_customer;
                let exchange_rate = this.state.exchange_value;
                let invoice_date = selected_date;
                let company_name = this.state.logged_company_name;
                let type = 1;
                let invoice_number = jQuery("#invoice_no").val();
                let list_id = this.state.logged_user_id;
                let tagged_user_id = this.state.tagged_user_id;
                let job_name = jQuery("#job_name").val();
                let shipping_address = jQuery("#shipping_to").val();
                let memo = jQuery("#memo").val();
                let thanking_message = jQuery("#footeroptionthanksmessages").val();
                let terms_and_conditions = jQuery("#termcondmsg").val();
                let item_list = this.state.myarray;

                let shipping_to = jQuery("#shipping_to").val();
                let company_address = jQuery("#shipping_to").val();
                let footer_memo = jQuery("#footer_memo").val();
                let footer_thankyou = jQuery("#footeroptionthanksmessages").val();
                let footer_termscondition = jQuery("#termcondmsg").val();
                let mobile_no = jQuery("#mobile_no").val();

                if (this.state.isChecked) {
                    var tax_type_name = "inclusive";
                } else {
                    var tax_type_name = "exclusive";
                }


                const monthNames = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ];
                var get_invoice_date = new Date(invoice_date);
                var invoice_month = get_invoice_date.getMonth();
                var invoice_day = get_invoice_date.getDate();
                var invoice_year = get_invoice_date.getFullYear();

                var change_invoice_date =
                    invoice_day + " " + monthNames[invoice_month] + " " + invoice_year;

                jQuery("#invoice_no_content").html(
                    '<span id="invoice_value" style="font-weight: 600;">Invoice No:</span> ' +
                    invoice_number
                );
                jQuery("#billed_to_content").next("p").html(company_address);
                jQuery("#date_content").html(
                    '<span id="date_value" style="font-weight: 600;">Date:</span> ' +
                    change_invoice_date
                );
                jQuery("#thank_u_msg_tag").html(footer_thankyou);
                jQuery("#terms_cond_msg_tag").html(footer_termscondition);
                jQuery("#footer_address").html(company_address);
                jQuery("#footer_mobile").html("| Mob: " + mobile_no);

                var item_incre = "";
                item_list.map((item_list_data, index) => {
                    var incre = parseInt(index) + 1;

                    item_incre +=
                        '<tr id="table_row' +
                        incre +
                        '"><td id="no' +
                        incre +
                        '" style="font-size: 13px; padding: 12px 8px;">' +
                        incre +
                        '</td><td id="item' +
                        incre +
                        '" style="font-size: 13px; padding: 12px 8px;">' +
                        item_list_data.item_name +
                        '</td><td id="descrip' +
                        incre +
                        '" style="font-size: 13px; padding: 12px 8px;">' +
                        item_list_data.descr +
                        '</td><td id="priceeach' +
                        incre +
                        '" style="font-size: 13px; padding: 12px 8px;">' +
                        item_list_data.unit_price +
                        '</td><td id="quantity' +
                        incre +
                        '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                        item_list_data.quantity +
                        '</td><td id="tax' +
                        incre +
                        '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                        item_list_data.item_tax +
                        '</td><td id="total' +
                        incre +
                        '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                        item_list_data.item_total +
                        "</td></tr>";
                });
                jQuery("#data_result table tbody").html(item_incre);

                jQuery("#sub_total_container")
                    .next("div")
                    .html(item_total_foreign_currency);
                jQuery("#tax_total_container").html(
                    'Tax<span style="font-size: 14px;font-weight: normal;font-style: italic;">(' +
                    tax_type_name +
                    ")</span>"
                );
                jQuery("#tax_total_container")
                    .next("div")
                    .html(tax_amount_foreign_currency);
                jQuery("#grand_total_container")
                    .next("div")
                    .html(grand_total_foreign_currency);

                // price number to words
                // var numericValue = grand_total_foreign_currency;
                var numericValue = this.state.grandTotal;

                numericValue = parseFloat(numericValue).toFixed(2);
                var amount = numericValue.toString().split(".");
                var split_price = amount[0];
                var split_paisa = amount[1];
                jQuery("#amount_words_tag")
                    .next("div")
                    .html(
                        this.convertNumberToWords(split_price) +
                        "Rupees and " +
                        this.convertNumberToWords(split_paisa) +
                        "Paisa only"
                    );

                var getHTML = jQuery("#printing_template").html();


                fetch("https://v2018.api2pdf.com/chrome/html", {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "27662ed5-3115-47b9-b6df-aec6e053edc8", //Get your API key from https://portal.api2pdf.com      11011305-f6cf-4868-b731-74c53dcf9f89
                    },
                    body: JSON.stringify({
                        html: getHTML,
                        inlinePdf: true,
                        fileName: "test.pdf",
                    }),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.success === true) {
                            window.open(res.pdf);
                            //window.location.href = res.pdf;
                        } else {
                        }
                    });
            } else {
                this.setState({ isTablefilled: true });
            }
        }
    };

    desChange = (e) => {
        this.setState({ payment_desc: e.target.value })
    }

    get_customerlist = () => {
        let client_id = this.state.logged_client_id;
        FetchAllApi.customer_list_create_invoice(client_id, (err, response) => {
            if (response.status === 1) {
                this.setState({ customer_list: response.list });
            } else {
                this.setState({});
            }
        });
    };
    selected_customer = (id, name, currency) => {
   //     alert(currency);
        this.setState({ currency_customer: currency, ToCurrency: currency });
        jQuery("#selected" + id).addClass("active");
        this.setState({
            active_selected: id,
            selected_customer_name: name,
        });
        if (id !== this.state.active)
            jQuery("#selected" + this.state.active).removeClass("active");
    };

    convert_date_format = () => {
        var convert = (str) => {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
        };
        return convert(this.state.date);
    };
    convertDateformat = (x) => {
        var convert = (str) => {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
        };
        return convert(x);
    };

    save_template = (e, btn_type) => {
        this.handleChangeItems(0, this.state.rows.length - 1);

        // alert(jQuery('#categry_id'+0).val())
        if (
            this.state.myarray.length > this.state.rows.length - 1 &&
            this.state.myarray[this.state.myarray.length - 1].price > 0 &&
            this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
            this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
            //&& item_check != ''
        ) {
            this.setState({ isTablefilled: false });
        } else {
            this.setState({ isTablefilled: true });
        }
        var btn_type = btn_type;
        let InvoiceCurrency = jQuery("#invoice_curr_id option:selected").val();
        // alert(InvoiceCurrency)
        if (InvoiceCurrency != "" && InvoiceCurrency != undefined) {
            this.setState({ isInvoiceCurrency: false });
        } else {
            this.setState({ isInvoiceCurrency: true });
        }
        let template_sel = jQuery("#template_sel option:selected").val();

        if (template_sel != "" && template_sel != undefined) {
            this.setState({ isTemplate: false });
        } else {
            this.setState({ isTemplate: true });
        }

        let customer_id = jQuery("#variable_pay_type option:selected").data(
            "status"
        );
        if (customer_id != "" && customer_id != undefined) {
            this.setState({ isCustomer: false });
        } else {
            this.setState({ isCustomer: true });
        }

        let InvoiceDate = jQuery("#invoice_date").val();
        if (InvoiceDate != "" && InvoiceDate != undefined) {
            this.setState({ isInvoiceDate: false });
        } else {
            this.setState({ isInvoiceDate: true });
        }
        let Due_date = jQuery("#due_date").val();
        if (Due_date != "" && Due_date != undefined) {
            this.setState({ isDueDate: false });
        } else {
            this.setState({ isDueDate: true });
        }

        // let Job_name = jQuery('#jobName option:selected').data('status')
        // if (Job_name != '' && Job_name != undefined) {
        //   this.setState({ isJobName: false })
        // } else {
        //   this.setState({ isJobName: true })
        // }

        var payable_amount = jQuery("#payable_amount").val();
        if (payable_amount != "" && payable_amount != undefined) {
            this.setState({ isPayable_amount: false });

            var paymentdate = jQuery("#payment_date").val();
            if (paymentdate != "" && paymentdate != undefined) {
                this.setState({ isPaymetDate: false });
            } else {
                this.setState({ isPaymetDate: true });
            }

            var payment_method = jQuery("#payment_method option:selected").val();
            if (payment_method != "" && payment_method != undefined) {
                this.setState({ isPaymentMethod: false });
            } else {
                this.setState({ isPaymentMethod: true });
            }

            var balanceCategId = jQuery(
                "#balanceSheetCategeory option:selected"
            ).val();

            if (balanceCategId != "" && balanceCategId != undefined) {
                this.setState({ isbalanceSheetcatId: false });
            } else {
                this.setState({ isbalanceSheetcatId: true });
            }
            // if(!is3partyAccRequired){
            // this.setState({ is3partyAccRequired: true })

            if (
                jQuery("#third_account_id option:selected").data("status") !==
                undefined ||
                jQuery("#third_account_id option:selected").data("status") !== ""
            ) {
                this.setState({ is3partyAccRequired: true });
            } else {
                // this.setState({ is3partyAccRequired: true })
            }
        } else {
            // this.setState({ isPayable_amount: true })
        }

        let account_id = jQuery("#account_id").val();
        if (account_id != "" && account_id != undefined) {
            this.setState({ isAccounId: false });
        } else {
            this.setState({ isAccounId: true });
        }

        let payment_date = this.state.payment_date;
        let amount_in_words = jQuery("#amount_in_words").val();

        // alert(this.state.exchange_value)

        var selected_date = this.convert_date_format();
        let client_id = this.state.logged_client_id;
        // let customer_id = this.state.active_selected

        let item_total_home_currency = jQuery("#foreigncurrencytyt").html();
        let tax_amount_home_currency = jQuery("#foreign_tax_total").html();
        let descripation = this.state.payment_desc
        // let grand_total_home_currency = jQuery("#foreign_grand_total").html();
        let grand_total_home_currency =
            Number(item_total_home_currency) + Number(tax_amount_home_currency);

        let item_total_foreign_currency = jQuery("#homecurrencytyt").html();
        let tax_amount_foreign_currency = jQuery("#home_tax_total").html();
        let grand_total_foreign_currency = jQuery("#home_grand_total").html();
        let currency = this.state.CurrentSelectedCurr;
        // let exchange_rate = this.state.exchange_value;cus_rate_rate
        let exchange_rate = this.state.cus_rate_rate;
        let invoice_date = selected_date;
        let company_name = this.state.logged_company_name;
        let type = 1;
        let invoice_number = jQuery("#invoice_no").val();
        let list_id = this.state.logged_user_id;
        let tagged_user_id = this.state.logged_user_id;
        let job_name = jQuery("#job_name").val();
        let shipping_address = jQuery("#shipping_to").val();
        let memo = jQuery("#memo").val();
        let thanking_message = jQuery("#footeroptionthanksmessages").val();
        let terms_and_conditions = jQuery("#termcondmsg").val();
        let item_list = this.state.myarray;

        let shipping_to = jQuery("#shipping_to").val();
        let company_address = jQuery("#shipping_to").val();
        let footer_memo = jQuery("#footer_memo").val();
        let footer_thankyou = jQuery("#footeroptionthanksmessages").val();
        let footer_termscondition = jQuery("#termcondmsg").val();
        let mobile_no = jQuery("#mobile_no").val();

        if (this.state.isChecked) {
            var tax_type_name = "inclusive";
        } else {
            var tax_type_name = "exclusive";
        }


        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        var get_invoice_date = new Date(invoice_date);
        var invoice_month = get_invoice_date.getMonth();
        var invoice_day = get_invoice_date.getDate();
        var invoice_year = get_invoice_date.getFullYear();

        var change_invoice_date =
            invoice_day + " " + monthNames[invoice_month] + " " + invoice_year;

        jQuery("#invoice_no_content").html(
            '<span id="invoice_value" style="font-weight: 600;">Invoice No:</span> ' +
            invoice_number
        );
        jQuery("#billed_to_content").next("p").html(company_address);
        jQuery("#date_content").html(
            '<span id="date_value" style="font-weight: 600;">Date:</span> ' +
            change_invoice_date
        );
        jQuery("#thank_u_msg_tag").html(footer_thankyou);
        jQuery("#terms_cond_msg_tag").html(footer_termscondition);
        jQuery("#footer_address").html(company_address);
        jQuery("#footer_mobile").html("| Mob: " + mobile_no);

        var item_incre = "";
        item_list.map((item_list_data, index) => {
            var incre = parseInt(index) + 1;

            item_incre +=
                '<tr id="table_row' +
                incre +
                '"><td id="no' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                incre +
                '</td><td id="item' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                item_list_data.item_name +
                '</td><td id="descrip' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                item_list_data.descr +
                '</td><td id="priceeach' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px;">' +
                item_list_data.unit_price +
                '</td><td id="quantity' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                item_list_data.quantity +
                '</td><td id="tax' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                item_list_data.item_tax +
                '</td><td id="total' +
                incre +
                '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
                item_list_data.item_total +
                "</td></tr>";
        });
        jQuery("#data_result table tbody").html(item_incre);

        jQuery("#sub_total_container")
            .next("div")
            .html(item_total_foreign_currency);
        jQuery("#tax_total_container").html(
            'Tax<span style="font-size: 14px;font-weight: normal;font-style: italic;">(' +
            tax_type_name +
            ")</span>"
        );
        jQuery("#tax_total_container")
            .next("div")
            .html(tax_amount_foreign_currency);
        jQuery("#grand_total_container")
            .next("div")
            .html(grand_total_foreign_currency);

        // price number to words
        // var numericValue = grand_total_foreign_currency;
        var numericValue = this.state.grandTotal;

        numericValue = parseFloat(numericValue).toFixed(2);
        var amount = numericValue.toString().split(".");
        var split_price = amount[0];
        var split_paisa = amount[1];

        jQuery("#amount_words_tag")
            .next("div")
            .html(
                this.convertNumberToWords(split_price) +
                "Rupees and " +
                this.convertNumberToWords(split_paisa) +
                "Paisa only"
            );

        if (company_address === "") {
            this.setState({ isInvoice_to: true });
        } else {
            this.setState({ isInvoice_to: false });
        }
        if (job_name === "") {
            this.setState({ isjob_name: true });
        } else {
            this.setState({ isjob_name: false });
        }
        if (invoice_number === "") {
            this.setState({ isInvoice_no: true });
        } else {
            this.setState({ isInvoice_no: false });
        }

        if (this.state.selected_customer_name === "") {
            this.setState({ isCustomername: true });
        } else {
            this.setState({ isCustomername: false });
        }
        if (company_address === "") {
            this.setState({ isShippingt_to: true });
        }
        if (mobile_no === "") {
            this.setState({ isMobileno: true });
        } else {
            this.setState({ isMobileno: false });
        }

        if (jQuery("#invoice_to").val() === "") {
            this.setState({ isInvoice_to: true });
        } else {
            this.setState({ isInvoice_to: false });
        }
        if (jQuery("#template_sel").val() === '') {
            this.setState({ isTemplate_selected: true })
        } else {
            this.setState({ isTemplate_selected: false })
        }

        if (jQuery("#shipping_to").val() === "") {
            this.setState({ isShippingt_to: true });
        } else {
            this.setState({ isShippingt_to: false });
        }
        if (
            // this.state.myarray.length > this.state.rows.length - 1 &&
            // this.state.myarray[this.state.myarray.length - 1].price > 0 &&
            // this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
            // this.state.myarray[this.state.myarray.length - 1].category_id.length >
            //   0 &&
            // this.state.selected_templateName != 'Choose'
            client_id
        ) {
            let job_data = this.state.customerjoblist.find(
                (e) => e.job_name === "Others"
            );
            let job_id;
            let job_name;
            if (this.state.job_id === "" && job_data !== undefined) {
                job_id = job_data.id;
                job_name = job_data.job_name;
            } else {
                job_id = this.state.job_id;
                job_name = this.state.job_name;
            }
            let data = {
                client_id: this.state.logged_client_id,
                estimate_id: this.state.estimate_id,
                customer_id: customer_id,
                item_total_home_currency: item_total_home_currency,
                tax_amount_home_currency: tax_amount_home_currency,
                grand_total_home_currency: grand_total_home_currency,
                item_total_foreign_currency: item_total_foreign_currency,
                tax_amount_foreign_currency: tax_amount_foreign_currency,
                grand_total_foreign_currency: grand_total_foreign_currency,
                currency: currency,
                exchange_rate: exchange_rate,
                invoice_date: this.custConverter(jQuery("#invoice_date").val()),
                company_name: company_name,
                type: type,
                invoice_number: invoice_number,
                company_address: jQuery("#invoice_to").val(),
                list_id: list_id,
                tagged_user_id: this.state.logged_user_id,
                item_list: item_list,
                // job_name: job_name,
                job_name: job_name,
                memo: jQuery("#footer_memo").val(),
                shipping_address: company_address,
                thanking_message: thanking_message,
                terms_and_conditions: terms_and_conditions,
                template_id: this.state.template_id,
                // job_id: jQuery("#jobName option:selected").data("status"),
                job_id: job_id,
                // payment_date: this.custConverter(jQuery('#payment_date').val()),
                payment_date:
                    this.custConverter(jQuery("#payment_date").val()) ==
                        "undefined-undefined-"
                        ? ""
                        : this.custConverter(jQuery("#payment_date").val()),
                payment_method: payment_method,
                descripation: this.state.payment_desc,
                amount_in_words: jQuery("#amount_in_words").val(),
                due_date: this.custConverter(jQuery("#due_date").val()),
                reference: jQuery("#reference").val(),
                payment_amount: payable_amount,
                account: jQuery("#account_id").val(),
                payment_exchange_rate: jQuery("#payment_exchange_rate").val(),
                balance_sheet_category: balanceCategId,
                tax_inclusive: this.state.isChecked ? "1" : 0,
                thrird_party_account_id: jQuery("#third_account_id").val(),
                third_party_type: this.state.thrird_party_type,
                third_party_account_name: jQuery(
                    "#third_account_id option:selected"
                ).data("status"),
                descripation: this.state.payment_desc,
                isInvoiceEditable: this.state.isInvoiceEditable,
                sales_order_id: this.state.sales_order_id,

                custom_header_fields: this.state.custom_header_fields,

                custom_footer_fields: this.state.custom_footer_fields,
                is_credit_limit_accepted : this.state.is_credit_limit_accepted
            };

            if (
                InvoiceCurrency &&
                template_sel &&
                customer_id &&
                InvoiceDate &&
                Due_date &&
                account_id
            ) {
                if (!this.state.isInvoiceEditable || this.state.isInvoiceEditable) {
                    let payable_amount = jQuery("#payable_amount").val();
                    if (payable_amount == "" || payable_amount == undefined) {
                        // alert(payable_amount)
                        // alert(typeof payable_amount)
                        
                        FetchAllApi.create_salesorder(data, (err, response) => {
                            this.update_template_properties()
                            if (response.status !== 2)
                            alert(response.message);
                            if (response.status === 1) {
                                if (btn_type === "save") {

                                    // for pdf print
                                    this.setState({ isInvoiceEditable: true, invoice_id_used: response.sales_order_id, sales_order_id: response.sales_order_id });
                                    // for pdf print

                                    // localStorage.setItem('customer','')

                                    this.setState({ isClose: true });
                                    // setTimeout(() => {
                                    // if (jQuery("#closeme").fadeOut(2000));
                                    // this.setState({ isClose: false });

                                    // jQuery(".form-control").val("");
                                    // jQuery("#homecurrencytyt").html("0");
                                    // jQuery("#foreigncurrencytyt").html("0");
                                    // jQuery("#home_grand_total").html("0");
                                    // jQuery("#foreign_grand_total").html("0");
                                    // jQuery("#selectednow0").html("Choose");
                                    // jQuery("#home_tax_total").html("0");
                                    // }, 4000);
                                     this.props.history.push("/loading", ["/all_lists"]);
                                } else {
                                    localStorage.setItem("customer", "");
                                    // alert("Succesfully saved, Click ok to proceed next one");
                                    // this.props.history.push("/loading", ["/create_salesorder"]);
                                    window.location.reload();

                                    this.setState({ isClose: true });
                                    setTimeout(() => {
                                        // if (jQuery("#closeme").fadeOut(2000));
                                        this.setState({ isClose: false });

                                        jQuery(".form-control").val("");
                                        jQuery("#homecurrencytyt").html("0");
                                        jQuery("#foreigncurrencytyt").html("0");
                                        jQuery("#home_grand_total").html("0");
                                        jQuery("#foreign_grand_total").html("0");
                                        jQuery("#selectednow0").html("Choose");
                                        jQuery("#home_tax_total").html("0");
                                    }, 4000);
                                    setTimeout(() => {
                                        if (jQuery("#closeme").fadeOut(2000));
                                    }, 4000);
                                    // alert(response.message)
                                    this.setState({
                                        isClose: true,
                                        isCustomername: false,
                                        isAdd: false,
                                        isInvoice_to: false,
                                        isShippingt_to: false,
                                        isThanking_msg: false,
                                        isTerms_cond_msg: false,
                                        isInvoice_no: false,
                                        isjob_name: false,
                                        // isTablefilled: false,
                                        isCustomername: false,
                                        selected_customer_name: "",
                                        tax_home_currency: "0",
                                        tax_home_currency: "0",
                                        rows: ["row 1"],
                                    });
                                    setTimeout(function () {
                                        if (jQuery("#closeme").fadeOut(2000));
                                    }, 8000);
                                    jQuery(".form-control").val("");
                                    jQuery("#homecurrencytyt").html("0");
                                    jQuery("#foreigncurrencytyt").html("0");
                                    jQuery("#home_grand_total").html("0");
                                    jQuery("#foreign_grand_total").html("0");
                                    jQuery("#selectednow0").html("Choose");
                                    jQuery("#home_tax_total").html("0");

                                    this.setState({});
                                }
                            } else if (response.status === 2) {
                                this.setState({credit_limit_msg:response.message})
                                setTimeout(() => {
                                window.jQuery("#credit_limit").modal("show");
                                }, 500);
                                // var mymsg = response.message;
                                // if (mymsg.includes("Invoice number already exists")) {
                                //     this.setState({
                                //         ExistMsg: response.message,
                                //         isAlreadyTaken: true,
                                //     });
                                // }
                                // this.setState({
                                //     isRejected: true,
                                //     reject_msg: response.message,
                                // });
                                // setTimeout(function () {
                                //     if (jQuery("#failed_alrt").fadeOut(2000));
                                // }, 4000);
                            }
                        });
                    } else {
                        // alert(payable_amount)
                        // alert(typeof payable_amount)
                        // if(balanceCategId !==undefined)
                        // alert('i am on the wa')
                        if (
                            paymentdate != undefined &&
                            paymentdate != "" &&
                            payment_method != undefined &&
                            payment_method != "" &&
                            balanceCategId != undefined &&
                            balanceCategId != ""
                        ) {
                            if (this.state.isThirdPartyName) {
                                if (
                                    jQuery("#third_account_id option:selected").data("status") !==
                                    undefined &&
                                    jQuery("#third_account_id option:selected").data("status") !==
                                    ""
                                ) {
                                    FetchAllApi.create_salesorder(data, (err, response) => {
                                        this.update_template_properties()
                                        if (response.status !== 2)
                                        alert(response.message);
                                        if (response.status === 1) {
                                            if (btn_type === "save") {

                                                this.setState({ isInvoiceEditable: true, invoice_id_used: response.sales_order_id, sales_order_id: response.sales_order_id });

                                                // localStorage.setItem('customer','')

                                                this.setState({ isClose: true });
                                                setTimeout(() => {
                                                    // if (jQuery("#closeme").fadeOut(2000));
                                                    this.setState({ isClose: false });

                                                    // jQuery(".form-control").val("");
                                                    // jQuery("#homecurrencytyt").html("0");
                                                    // jQuery("#foreigncurrencytyt").html("0");
                                                    // jQuery("#home_grand_total").html("0");
                                                    // jQuery("#foreign_grand_total").html("0");
                                                    // jQuery("#selectednow0").html("Choose");
                                                    // jQuery("#home_tax_total").html("0");
                                                }, 4000);
                                                this.props.history.push("/loading", [
                                                    "/all_lists",
                                                ]);
                                            } else {
                                                localStorage.setItem("customer", "");
                                                // alert(
                                                //     "Succesfully saved, Click ok to proceed next one"
                                                // );
                                                // this.props.history.push("/loading", [
                                                //     "/create_salesorder",
                                                // ]);
                                                window.location.reload();
                                                this.setState({ isClose: true });
                                                setTimeout(() => {
                                                    // if (jQuery("#closeme").fadeOut(2000));
                                                    this.setState({ isClose: false });

                                                    jQuery(".form-control").val("");
                                                    jQuery("#homecurrencytyt").html("0");
                                                    jQuery("#foreigncurrencytyt").html("0");
                                                    jQuery("#home_grand_total").html("0");
                                                    jQuery("#foreign_grand_total").html("0");
                                                    jQuery("#selectednow0").html("Choose");
                                                    jQuery("#home_tax_total").html("0");
                                                }, 4000);
                                                setTimeout(() => {
                                                    if (jQuery("#closeme").fadeOut(2000));
                                                }, 4000);
                                                // alert(response.message)
                                                this.setState({
                                                    isClose: true,
                                                    isCustomername: false,
                                                    isAdd: false,
                                                    isInvoice_to: false,
                                                    isShippingt_to: false,
                                                    isThanking_msg: false,
                                                    isTerms_cond_msg: false,
                                                    isInvoice_no: false,
                                                    isjob_name: false,
                                                    // isTablefilled: false,
                                                    isCustomername: false,
                                                    selected_customer_name: "",
                                                    tax_home_currency: "0",
                                                    tax_home_currency: "0",
                                                    rows: ["row 1"],
                                                });
                                                setTimeout(function () {
                                                    if (jQuery("#closeme").fadeOut(2000));
                                                }, 8000);
                                                jQuery(".form-control").val("");
                                                jQuery("#homecurrencytyt").html("0");
                                                jQuery("#foreigncurrencytyt").html("0");
                                                jQuery("#home_grand_total").html("0");
                                                jQuery("#foreign_grand_total").html("0");
                                                jQuery("#selectednow0").html("Choose");
                                                jQuery("#home_tax_total").html("0");

                                                this.setState({});
                                            }
                                        } else if (response.status === 2) {
                                            this.setState({credit_limit_msg:response.message})
                                            setTimeout(() => {
                                            window.jQuery("#credit_limit").modal("show");
                                            }, 500);


                                            // var mymsg = response.message;
                                            // if (mymsg.includes("Invoice number already exists")) {
                                            //     this.setState({
                                            //         ExistMsg: response.message,
                                            //         isAlreadyTaken: true,
                                            //     });
                                            // }
                                            // this.setState({
                                            //     isRejected: true,
                                            //     reject_msg: response.message,
                                            // });
                                            // setTimeout(function () {
                                            //     if (jQuery("#failed_alrt").fadeOut(2000));
                                            // }, 4000);
                                        }
                                    });
                                } else {
                                    this.setState({ is3partyAccRequired: true });

                                    alert("please fill out payment details");
                                }
                            } else {
                                FetchAllApi.create_salesorder(data, (err, response) => {
                                    this.update_template_properties()
                                    // alert(response.message);
                                    if (response.status === 1) {
                                        if (btn_type === "save") {
                                            // localStorage.setItem('customer','')
                                            this.setState({ isInvoiceEditable: true, invoice_id_used: response.sales_order_id, sales_order_id: response.sales_order_id });

                                            this.setState({ isClose: true });
                                            setTimeout(() => {
                                                // if (jQuery("#closeme").fadeOut(2000));
                                                this.setState({ isClose: false });

                                                // jQuery(".form-control").val("");
                                                // jQuery("#homecurrencytyt").html("0");
                                                // jQuery("#foreigncurrencytyt").html("0");
                                                // jQuery("#home_grand_total").html("0");
                                                // jQuery("#foreign_grand_total").html("0");
                                                // jQuery("#selectednow0").html("Choose");
                                                // jQuery("#home_tax_total").html("0");
                                            }, 4000);
                                             this.props.history.push("/loading", ["/all_lists"]);
                                        } else {
                                            localStorage.setItem("customer", "");
                                            // alert("Succesfully saved, Click ok to proceed next one");
                                            // this.props.history.push("/loading", ["/create_salesorder"]);
                                            window.location.reload();

                                            this.setState({ isClose: true });
                                            setTimeout(() => {
                                                // if (jQuery("#closeme").fadeOut(2000));
                                                this.setState({ isClose: false });

                                                jQuery(".form-control").val("");
                                                jQuery("#homecurrencytyt").html("0");
                                                jQuery("#foreigncurrencytyt").html("0");
                                                jQuery("#home_grand_total").html("0");
                                                jQuery("#foreign_grand_total").html("0");
                                                jQuery("#selectednow0").html("Choose");
                                                jQuery("#home_tax_total").html("0");
                                            }, 4000);
                                            setTimeout(() => {
                                                if (jQuery("#closeme").fadeOut(2000));
                                            }, 4000);
                                            // alert(response.message)
                                            this.setState({
                                                isClose: true,
                                                isCustomername: false,
                                                isAdd: false,
                                                isInvoice_to: false,
                                                isShippingt_to: false,
                                                isThanking_msg: false,
                                                isTerms_cond_msg: false,
                                                isInvoice_no: false,
                                                isjob_name: false,
                                                // isTablefilled: false,
                                                isCustomername: false,
                                                selected_customer_name: "",
                                                tax_home_currency: "0",
                                                tax_home_currency: "0",
                                                rows: ["row 1"],
                                            });
                                            setTimeout(function () {
                                                if (jQuery("#closeme").fadeOut(2000));
                                            }, 8000);
                                            jQuery(".form-control").val("");
                                            jQuery("#homecurrencytyt").html("0");
                                            jQuery("#foreigncurrencytyt").html("0");
                                            jQuery("#home_grand_total").html("0");
                                            jQuery("#foreign_grand_total").html("0");
                                            jQuery("#selectednow0").html("Choose");
                                            jQuery("#home_tax_total").html("0");

                                            this.setState({});
                                        }
                                    }else if (response.status === 2) {
                                        this.setState({credit_limit_msg:response.message})
                                        setTimeout(() => {
                                        window.jQuery("#credit_limit").modal("show");
                                        }, 500);
                                        // var mymsg = response.message;
                                        // if (mymsg.includes("Invoice number already exists")) {
                                        //     this.setState({
                                        //         ExistMsg: response.message,
                                        //         isAlreadyTaken: true,
                                        //     });
                                        // }
                                        // this.setState({
                                        //     isRejected: true,
                                        //     reject_msg: response.message,
                                        // });
                                        // setTimeout(function () {
                                        //     if (jQuery("#failed_alrt").fadeOut(2000));
                                        // }, 4000);
                                    }
                                });
                            }
                        } else {
                            alert("Please fill out payment details !");
                        }
                    }
                }
                //  else {
                //     // alert('hiii')
                //     var invoice_id = this.state.currInvoiceId;
                //     // data['invoice_id']=invoice_id

                //     var payment_id = this.state.currpayment_id;

                //     let datas = {
                //         client_id: this.state.logged_client_id,
                //         customer_id: customer_id,
                //         item_total_home_currency: item_total_home_currency,
                //         tax_amount_home_currency: tax_amount_home_currency,
                //         grand_total_home_currency: grand_total_home_currency,
                //         item_total_foreign_currency: item_total_foreign_currency,
                //         tax_amount_foreign_currency: tax_amount_foreign_currency,
                //         grand_total_foreign_currency: grand_total_foreign_currency,
                //         currency: currency,
                //         descripation: descripation,
                //         template_id: this.state.template_id,
                //         exchange_rate: exchange_rate,
                //         invoice_date: this.custConverter(jQuery("#invoice_date").val()),
                //         company_name: company_name,
                //         type: type,
                //         invoice_number: invoice_number,
                //         company_address: jQuery("#invoice_to").val(),
                //         list_id: list_id,
                //         tagged_user_id: this.state.logged_user_id,
                //         item_list: item_list,
                //         // job_name: job_name,
                //         job_name: this.state.job_name,
                //         memo: jQuery("#footer_memo").val(),
                //         shipping_address: company_address,
                //         thanking_message: thanking_message,
                //         terms_and_conditions: terms_and_conditions,
                //         // job_id: jQuery("#jobName option:selected").data("status"),
                //         job_id: this.state.JobId,
                //         payment_date:
                //             this.custConverter(jQuery("#payment_date").val()) ==
                //                 "undefined-undefined-"
                //                 ? ""
                //                 : this.custConverter(jQuery("#payment_date").val()),
                //         payment_method: payment_method,
                //         amount_in_words: jQuery("#amount_in_words").val(),
                //         due_date: this.custConverter(jQuery("#due_date").val()),
                //         reference: jQuery("#reference").val(),
                //         payment_amount: payable_amount,
                //         account: jQuery("#account_id").val(),
                //         payment_exchange_rate: jQuery("#payment_exchange_rate").val(),
                //         balance_sheet_category: balanceCategId,
                //         tax_inclusive: this.state.isChecked ? "1" : 0,
                //         thrird_party_account_id: jQuery("#third_account_id").val(),
                //         third_party_type: this.state.thrird_party_type,
                //         third_party_account_name: jQuery(
                //             "#third_account_id option:selected"
                //         ).data("status"),
                //         invoice_id: this.state.invoice_id_used,
                //         payment_id: payment_id,
                //         descripation: this.state.payment_desc
                //     };

                //     if (payment_id > 0) {
                //         // alert(payment_id)
                //         if (
                //             paymentdate != undefined &&
                //             paymentdate != "" &&
                //             payment_method != undefined &&
                //             payment_method != "" &&
                //             balanceCategId != undefined &&
                //             balanceCategId != ""
                //         ) {
                //             if (this.state.isThirdPartyName) {
                //                 if (
                //                     jQuery("#third_account_id option:selected").data("status") !==
                //                     undefined &&
                //                     jQuery("#third_account_id option:selected").data("status") !==
                //                     ""
                //                 ) {
                //                     FetchAllApi.edit_sales_invoice_payment(
                //                         datas,
                //                         (err, response) => {
                //                             if (response.status === 1) {
                //                                 alert(response.message);
                //                                 if (btn_type === "save") {
                //                                     // localStorage.setItem('customer','')

                //                                     this.setState({ isClose: true });
                //                                     setTimeout(() => {
                //                                         // if (jQuery("#closeme").fadeOut(2000));
                //                                         this.setState({ isClose: false });

                //                                         jQuery(".form-control").val("");
                //                                         jQuery("#homecurrencytyt").html("0");
                //                                         jQuery("#foreigncurrencytyt").html("0");
                //                                         jQuery("#home_grand_total").html("0");
                //                                         jQuery("#foreign_grand_total").html("0");
                //                                         jQuery("#selectednow0").html("Choose");
                //                                         jQuery("#home_tax_total").html("0");
                //                                     }, 4000);
                //                                     this.props.history.push("/loading", [
                //                                         "/create_salesorder",
                //                                     ]);
                //                                 } else {
                //                                     localStorage.setItem("customer", "");
                //                                     alert(
                //                                         "Succesfully saved, Click ok to proceed next one"
                //                                     );
                //                                     this.props.history.push("/loading", [
                //                                         "/create_salesorder",
                //                                     ]);

                //                                     this.setState({ isClose: true });
                //                                     setTimeout(() => {
                //                                         // if (jQuery("#closeme").fadeOut(2000));
                //                                         this.setState({ isClose: false });

                //                                         jQuery(".form-control").val("");
                //                                         jQuery("#homecurrencytyt").html("0");
                //                                         jQuery("#foreigncurrencytyt").html("0");
                //                                         jQuery("#home_grand_total").html("0");
                //                                         jQuery("#foreign_grand_total").html("0");
                //                                         jQuery("#selectednow0").html("Choose");
                //                                         jQuery("#home_tax_total").html("0");
                //                                     }, 4000);
                //                                     setTimeout(() => {
                //                                         if (jQuery("#closeme").fadeOut(2000));
                //                                     }, 4000);
                //                                     // alert(response.message)
                //                                     this.setState({
                //                                         isClose: true,
                //                                         isCustomername: false,
                //                                         isAdd: false,
                //                                         isInvoice_to: false,
                //                                         isShippingt_to: false,
                //                                         isThanking_msg: false,
                //                                         isTerms_cond_msg: false,
                //                                         isInvoice_no: false,
                //                                         isjob_name: false,
                //                                         // isTablefilled: false,
                //                                         isCustomername: false,
                //                                         selected_customer_name: "",
                //                                         tax_home_currency: "0",
                //                                         tax_home_currency: "0",
                //                                         rows: ["row 1"],
                //                                     });
                //                                     setTimeout(function () {
                //                                         if (jQuery("#closeme").fadeOut(2000));
                //                                     }, 8000);
                //                                     jQuery(".form-control").val("");
                //                                     jQuery("#homecurrencytyt").html("0");
                //                                     jQuery("#foreigncurrencytyt").html("0");
                //                                     jQuery("#home_grand_total").html("0");
                //                                     jQuery("#foreign_grand_total").html("0");
                //                                     jQuery("#selectednow0").html("Choose");
                //                                     jQuery("#home_tax_total").html("0");

                //                                     this.setState({});
                //                                 }
                //                                 localStorage.setItem("updated", "no");

                //                                 localStorage.setItem("updated", "yes");
                //                                 var iframe = document.createElement("iframe");
                //                                 iframe.style.cssText = "opacity:0;position:absolute";
                //                                 iframe.src = "about:blank";
                //                                 iframe.onload = function () {
                //                                     iframe.contentWindow.close.call(window);
                //                                     document.body.removeChild(iframe);
                //                                 };
                //                                 document.body.appendChild(iframe);
                //                             } else {
                //                                 alert(response.message);

                //                                 var mymsg = response.message;
                //                                 if (mymsg.includes("Invoice number already exists")) {
                //                                     this.setState({
                //                                         ExistMsg: response.message,
                //                                         isAlreadyTaken: true,
                //                                     });
                //                                 }
                //                                 this.setState({
                //                                     isRejected: true,
                //                                     reject_msg: response.message,
                //                                 });
                //                                 setTimeout(function () {
                //                                     if (jQuery("#failed_alrt").fadeOut(2000));
                //                                 }, 4000);
                //                             }
                //                         }
                //                     );
                //                 } else {
                //                     alert("please fill out payment details");
                //                 }
                //             } else {
                //                 FetchAllApi.edit_sales_invoice_payment(
                //                     datas,
                //                     (err, response) => {
                //                         if (response.status === 1) {
                //                             alert(response.message);
                //                             if (btn_type === "save") {
                //                                 // localStorage.setItem('customer','')

                //                                 this.setState({ isClose: true });
                //                                 setTimeout(() => {
                //                                     // if (jQuery("#closeme").fadeOut(2000));
                //                                     this.setState({ isClose: false });

                //                                     jQuery(".form-control").val("");
                //                                     jQuery("#homecurrencytyt").html("0");
                //                                     jQuery("#foreigncurrencytyt").html("0");
                //                                     jQuery("#home_grand_total").html("0");
                //                                     jQuery("#foreign_grand_total").html("0");
                //                                     jQuery("#selectednow0").html("Choose");
                //                                     jQuery("#home_tax_total").html("0");
                //                                 }, 4000);
                //                                 this.props.history.push("/loading", [
                //                                     "/create_salesorder",
                //                                 ]);
                //                             } else {
                //                                 localStorage.setItem("customer", "");
                //                                 alert(
                //                                     "Succesfully saved, Click ok to proceed next one"
                //                                 );
                //                                 this.props.history.push("/loading", [
                //                                     "/create_salesorder",
                //                                 ]);

                //                                 this.setState({ isClose: true });
                //                                 setTimeout(() => {
                //                                     // if (jQuery("#closeme").fadeOut(2000));
                //                                     this.setState({ isClose: false });

                //                                     jQuery(".form-control").val("");
                //                                     jQuery("#homecurrencytyt").html("0");
                //                                     jQuery("#foreigncurrencytyt").html("0");
                //                                     jQuery("#home_grand_total").html("0");
                //                                     jQuery("#foreign_grand_total").html("0");
                //                                     jQuery("#selectednow0").html("Choose");
                //                                     jQuery("#home_tax_total").html("0");
                //                                 }, 4000);
                //                                 setTimeout(() => {
                //                                     if (jQuery("#closeme").fadeOut(2000));
                //                                 }, 4000);
                //                                 // alert(response.message)
                //                                 this.setState({
                //                                     isClose: true,
                //                                     isCustomername: false,
                //                                     isAdd: false,
                //                                     isInvoice_to: false,
                //                                     isShippingt_to: false,
                //                                     isThanking_msg: false,
                //                                     isTerms_cond_msg: false,
                //                                     isInvoice_no: false,
                //                                     isjob_name: false,
                //                                     // isTablefilled: false,
                //                                     isCustomername: false,
                //                                     selected_customer_name: "",
                //                                     tax_home_currency: "0",
                //                                     tax_home_currency: "0",
                //                                     rows: ["row 1"],
                //                                 });
                //                                 setTimeout(function () {
                //                                     if (jQuery("#closeme").fadeOut(2000));
                //                                 }, 8000);
                //                                 jQuery(".form-control").val("");
                //                                 jQuery("#homecurrencytyt").html("0");
                //                                 jQuery("#foreigncurrencytyt").html("0");
                //                                 jQuery("#home_grand_total").html("0");
                //                                 jQuery("#foreign_grand_total").html("0");
                //                                 jQuery("#selectednow0").html("Choose");
                //                                 jQuery("#home_tax_total").html("0");

                //                                 this.setState({});
                //                             }
                //                             localStorage.setItem("updated", "no");

                //                             localStorage.setItem("updated", "yes");
                //                             var iframe = document.createElement("iframe");
                //                             iframe.style.cssText = "opacity:0;position:absolute";
                //                             iframe.src = "about:blank";
                //                             iframe.onload = function () {
                //                                 iframe.contentWindow.close.call(window);
                //                                 document.body.removeChild(iframe);
                //                             };
                //                             document.body.appendChild(iframe);
                //                         } else {
                //                             alert(response.message);

                //                             var mymsg = response.message;
                //                             if (mymsg.includes("Invoice number already exists")) {
                //                                 this.setState({
                //                                     ExistMsg: response.message,
                //                                     isAlreadyTaken: true,
                //                                 });
                //                             }
                //                             this.setState({
                //                                 isRejected: true,
                //                                 reject_msg: response.message,
                //                             });
                //                             setTimeout(function () {
                //                                 if (jQuery("#failed_alrt").fadeOut(2000));
                //                             }, 4000);
                //                         }
                //                     }
                //                 );
                //             }
                //         } else {
                //             alert("Please fill out payment details");
                //         }
                //     } else {
                //         //   if(  payable_amount===undefined ||payable_amount===null||payable_amount==''){
                //         //     FetchAllApi.update_sales_invoice(datas, (err, response) => {
                //         //       if (response.status === 1) {
                //         //         alert('sales invoice updated succesfully')

                //         //         if (btn_type === 'save') {
                //         //           // localStorage.setItem('customer','')

                //         //           this.setState({ isClose: true })
                //         //           setTimeout(() => {
                //         //             // if (jQuery("#closeme").fadeOut(2000));
                //         //             this.setState({ isClose: false })

                //         //             jQuery('.form-control').val('')
                //         //             jQuery('#homecurrencytyt').html('0')
                //         //             jQuery('#foreigncurrencytyt').html('0')
                //         //             jQuery('#home_grand_total').html('0')
                //         //             jQuery('#foreign_grand_total').html('0')
                //         //             jQuery('#selectednow0').html('Choose')
                //         //             jQuery('#home_tax_total').html('0')
                //         //           }, 4000)
                //         //           this.props.history.push('/loading', ['/create_invoice'])
                //         //         } else {
                //         //           localStorage.setItem('customer', '')
                //         //           alert('Succesfully saved, Click ok to proceed next one')
                //         //           this.props.history.push('/loading', ['/create_invoice'])

                //         //           this.setState({ isClose: true })
                //         //           setTimeout(() => {
                //         //             // if (jQuery("#closeme").fadeOut(2000));
                //         //             this.setState({ isClose: false })

                //         //             jQuery('.form-control').val('')
                //         //             jQuery('#homecurrencytyt').html('0')
                //         //             jQuery('#foreigncurrencytyt').html('0')
                //         //             jQuery('#home_grand_total').html('0')
                //         //             jQuery('#foreign_grand_total').html('0')
                //         //             jQuery('#selectednow0').html('Choose')
                //         //             jQuery('#home_tax_total').html('0')
                //         //           }, 4000)
                //         //           setTimeout(() => {
                //         //             if (jQuery('#closeme').fadeOut(2000));
                //         //           }, 4000)
                //         //           // alert(response.message)
                //         //           this.setState({
                //         //             isClose: true,
                //         //             isCustomername: false,
                //         //             isAdd: false,
                //         //             isInvoice_to: false,
                //         //             isShippingt_to: false,
                //         //             isThanking_msg: false,
                //         //             isTerms_cond_msg: false,
                //         //             isInvoice_no: false,
                //         //             isjob_name: false,
                //         //             // isTablefilled: false,
                //         //             isCustomername: false,
                //         //             selected_customer_name: '',
                //         //             tax_home_currency: '0',
                //         //             tax_home_currency: '0',
                //         //             rows: ['row 1']
                //         //           })
                //         //           setTimeout(function () {
                //         //             if (jQuery('#closeme').fadeOut(2000));
                //         //           }, 8000)
                //         //           jQuery('.form-control').val('')
                //         //           jQuery('#homecurrencytyt').html('0')
                //         //           jQuery('#foreigncurrencytyt').html('0')
                //         //           jQuery('#home_grand_total').html('0')
                //         //           jQuery('#foreign_grand_total').html('0')
                //         //           jQuery('#selectednow0').html('Choose')
                //         //           jQuery('#home_tax_total').html('0')

                //         //           this.setState({})
                //         //         }
                //         //         localStorage.setItem('updated','no')

                //         //         localStorage.setItem('updated','yes')
                //         //         var iframe = document.createElement('iframe');
                //         //         iframe.style.cssText = 'opacity:0;position:absolute';
                //         //         iframe.src = 'about:blank';
                //         //         iframe.onload = function() {
                //         //         iframe.contentWindow.close.call(window);
                //         //        document.body.removeChild(iframe);
                //         //     };
                //         //     document.body.appendChild(iframe);
                //         //       } else {
                //         //         alert(response.message)

                //         //         var mymsg=response.message;
                //         //         if(mymsg.includes('Invoice number already exists')){
                //         //           this.setState({ExistMsg:response.message,isAlreadyTaken:true});
                //         //         }
                //         //         this.setState({ isRejected: true, reject_msg: response.message })
                //         //         setTimeout(function () {
                //         //           if (jQuery('#failed_alrt').fadeOut(2000));
                //         //         }, 4000)
                //         //       }
                //         //     })
                //         //   } else{
                //         //     if( payable_amount !=undefined && paymentdate!=undefined &&  paymentdate!=''&&payment_method!=undefined && payment_method!=''&&balanceCategId!=undefined&& balanceCategId!=''
                //         // ){
                //         //   if(this.state.isThirdPartyName ){
                //         //   if(jQuery('#third_account_id option:selected').data('status') !==undefined && jQuery('#third_account_id option:selected').data('status') !==''){
                //         //   FetchAllApi.update_sales_invoice(datas, (err, response) => {
                //         //   if (response.status === 1) {
                //         //     alert('Payment updated succesfully')

                //         //     if (btn_type === 'save') {
                //         //       // localStorage.setItem('customer','')

                //         //       this.setState({ isClose: true })
                //         //       setTimeout(() => {
                //         //         // if (jQuery("#closeme").fadeOut(2000));
                //         //         this.setState({ isClose: false })

                //         //         jQuery('.form-control').val('')
                //         //         jQuery('#homecurrencytyt').html('0')
                //         //         jQuery('#foreigncurrencytyt').html('0')
                //         //         jQuery('#home_grand_total').html('0')
                //         //         jQuery('#foreign_grand_total').html('0')
                //         //         jQuery('#selectednow0').html('Choose')
                //         //         jQuery('#home_tax_total').html('0')
                //         //       }, 4000)
                //         //       this.props.history.push('/loading', ['/create_invoice'])
                //         //     } else {
                //         //       localStorage.setItem('customer', '')
                //         //       alert('Succesfully saved, Click ok to proceed next one')
                //         //       this.props.history.push('/loading', ['/create_invoice'])

                //         //       this.setState({ isClose: true })
                //         //       setTimeout(() => {
                //         //         // if (jQuery("#closeme").fadeOut(2000));
                //         //         this.setState({ isClose: false })

                //         //         jQuery('.form-control').val('')
                //         //         jQuery('#homecurrencytyt').html('0')
                //         //         jQuery('#foreigncurrencytyt').html('0')
                //         //         jQuery('#home_grand_total').html('0')
                //         //         jQuery('#foreign_grand_total').html('0')
                //         //         jQuery('#selectednow0').html('Choose')
                //         //         jQuery('#home_tax_total').html('0')
                //         //       }, 4000)
                //         //       setTimeout(() => {
                //         //         if (jQuery('#closeme').fadeOut(2000));
                //         //       }, 4000)
                //         //       // alert(response.message)
                //         //       this.setState({
                //         //         isClose: true,
                //         //         isCustomername: false,
                //         //         isAdd: false,
                //         //         isInvoice_to: false,
                //         //         isShippingt_to: false,
                //         //         isThanking_msg: false,
                //         //         isTerms_cond_msg: false,
                //         //         isInvoice_no: false,
                //         //         isjob_name: false,
                //         //         // isTablefilled: false,
                //         //         isCustomername: false,
                //         //         selected_customer_name: '',
                //         //         tax_home_currency: '0',
                //         //         tax_home_currency: '0',
                //         //         rows: ['row 1']
                //         //       })
                //         //       setTimeout(function () {
                //         //         if (jQuery('#closeme').fadeOut(2000));
                //         //       }, 8000)
                //         //       jQuery('.form-control').val('')
                //         //       jQuery('#homecurrencytyt').html('0')
                //         //       jQuery('#foreigncurrencytyt').html('0')
                //         //       jQuery('#home_grand_total').html('0')
                //         //       jQuery('#foreign_grand_total').html('0')
                //         //       jQuery('#selectednow0').html('Choose')
                //         //       jQuery('#home_tax_total').html('0')

                //         //       this.setState({})
                //         //     }

                //         //     localStorage.setItem('updated','yes')
                //         //     var iframe = document.createElement('iframe');
                //         //     iframe.style.cssText = 'opacity:0;position:absolute';
                //         //     iframe.src = 'about:blank';
                //         //     iframe.onload = function() {
                //         //     iframe.contentWindow.close.call(window);
                //         //    document.body.removeChild(iframe);
                //         // };
                //         // document.body.appendChild(iframe);
                //         //   } else {
                //         //     alert(response.message)

                //         //     var mymsg=response.message;
                //         //     if(mymsg.includes('Invoice number already exists')){
                //         //       this.setState({ExistMsg:response.message,isAlreadyTaken:true});
                //         //     }
                //         //     this.setState({ isRejected: true, reject_msg: response.message })
                //         //     setTimeout(function () {
                //         //       if (jQuery('#failed_alrt').fadeOut(2000));
                //         //     }, 4000)
                //         //   }
                //         // })}else{
                //         //   FetchAllApi.update_sales_invoice(datas, (err, response) => {
                //         //     if (response.status === 1) {
                //         //       alert('Payment updated succesfully')

                //         //       if (btn_type === 'save') {
                //         //         // localStorage.setItem('customer','')

                //         //         this.setState({ isClose: true })
                //         //         setTimeout(() => {
                //         //           // if (jQuery("#closeme").fadeOut(2000));
                //         //           this.setState({ isClose: false })

                //         //           jQuery('.form-control').val('')
                //         //           jQuery('#homecurrencytyt').html('0')
                //         //           jQuery('#foreigncurrencytyt').html('0')
                //         //           jQuery('#home_grand_total').html('0')
                //         //           jQuery('#foreign_grand_total').html('0')
                //         //           jQuery('#selectednow0').html('Choose')
                //         //           jQuery('#home_tax_total').html('0')
                //         //         }, 4000)
                //         //         this.props.history.push('/loading', ['/create_invoice'])
                //         //       } else {
                //         //         localStorage.setItem('customer', '')
                //         //         alert('Succesfully saved, Click ok to proceed next one')
                //         //         this.props.history.push('/loading', ['/create_invoice'])

                //         //         this.setState({ isClose: true })
                //         //         setTimeout(() => {
                //         //           // if (jQuery("#closeme").fadeOut(2000));
                //         //           this.setState({ isClose: false })

                //         //           jQuery('.form-control').val('')
                //         //           jQuery('#homecurrencytyt').html('0')
                //         //           jQuery('#foreigncurrencytyt').html('0')
                //         //           jQuery('#home_grand_total').html('0')
                //         //           jQuery('#foreign_grand_total').html('0')
                //         //           jQuery('#selectednow0').html('Choose')
                //         //           jQuery('#home_tax_total').html('0')
                //         //         }, 4000)
                //         //         setTimeout(() => {
                //         //           if (jQuery('#closeme').fadeOut(2000));
                //         //         }, 4000)
                //         //         // alert(response.message)
                //         //         this.setState({
                //         //           isClose: true,
                //         //           isCustomername: false,
                //         //           isAdd: false,
                //         //           isInvoice_to: false,
                //         //           isShippingt_to: false,
                //         //           isThanking_msg: false,
                //         //           isTerms_cond_msg: false,
                //         //           isInvoice_no: false,
                //         //           isjob_name: false,
                //         //           // isTablefilled: false,
                //         //           isCustomername: false,
                //         //           selected_customer_name: '',
                //         //           tax_home_currency: '0',
                //         //           tax_home_currency: '0',
                //         //           rows: ['row 1']
                //         //         })
                //         //         setTimeout(function () {
                //         //           if (jQuery('#closeme').fadeOut(2000));
                //         //         }, 8000)
                //         //         jQuery('.form-control').val('')
                //         //         jQuery('#homecurrencytyt').html('0')
                //         //         jQuery('#foreigncurrencytyt').html('0')
                //         //         jQuery('#home_grand_total').html('0')
                //         //         jQuery('#foreign_grand_total').html('0')
                //         //         jQuery('#selectednow0').html('Choose')
                //         //         jQuery('#home_tax_total').html('0')

                //         //         this.setState({})
                //         //       }
                //         //       localStorage.setItem('updated','no')

                //         //       localStorage.setItem('updated','yes')
                //         //       var iframe = document.createElement('iframe');
                //         //       iframe.style.cssText = 'opacity:0;position:absolute';
                //         //       iframe.src = 'about:blank';
                //         //       iframe.onload = function() {
                //         //       iframe.contentWindow.close.call(window);
                //         //      document.body.removeChild(iframe);
                //         //   };
                //         //   document.body.appendChild(iframe);
                //         //     } else {
                //         //       alert(response.message)

                //         //       var mymsg=response.message;
                //         //       if(mymsg.includes('Invoice number already exists')){
                //         //         this.setState({ExistMsg:response.message,isAlreadyTaken:true});
                //         //       }
                //         //       this.setState({ isRejected: true, reject_msg: response.message })
                //         //       setTimeout(function () {
                //         //         if (jQuery('#failed_alrt').fadeOut(2000));
                //         //       }, 4000)
                //         //     }
                //         //   })

                //         // }

                //         // }else{
                //         //   FetchAllApi.update_sales_invoice(datas, (err, response) => {
                //         //     if (response.status === 1) {
                //         //       alert('Payment updated succesfully')

                //         //       if (btn_type === 'save') {
                //         //         // localStorage.setItem('customer','')

                //         //         this.setState({ isClose: true })
                //         //         setTimeout(() => {
                //         //           // if (jQuery("#closeme").fadeOut(2000));
                //         //           this.setState({ isClose: false })

                //         //           jQuery('.form-control').val('')
                //         //           jQuery('#homecurrencytyt').html('0')
                //         //           jQuery('#foreigncurrencytyt').html('0')
                //         //           jQuery('#home_grand_total').html('0')
                //         //           jQuery('#foreign_grand_total').html('0')
                //         //           jQuery('#selectednow0').html('Choose')
                //         //           jQuery('#home_tax_total').html('0')
                //         //         }, 4000)
                //         //         this.props.history.push('/loading', ['/create_invoice'])
                //         //       } else {
                //         //         localStorage.setItem('customer', '')
                //         //         alert('Succesfully saved, Click ok to proceed next one')
                //         //         this.props.history.push('/loading', ['/create_invoice'])

                //         //         this.setState({ isClose: true })
                //         //         setTimeout(() => {
                //         //           // if (jQuery("#closeme").fadeOut(2000));
                //         //           this.setState({ isClose: false })

                //         //           jQuery('.form-control').val('')
                //         //           jQuery('#homecurrencytyt').html('0')
                //         //           jQuery('#foreigncurrencytyt').html('0')
                //         //           jQuery('#home_grand_total').html('0')
                //         //           jQuery('#foreign_grand_total').html('0')
                //         //           jQuery('#selectednow0').html('Choose')
                //         //           jQuery('#home_tax_total').html('0')
                //         //         }, 4000)
                //         //         setTimeout(() => {
                //         //           if (jQuery('#closeme').fadeOut(2000));
                //         //         }, 4000)
                //         //         // alert(response.message)
                //         //         this.setState({
                //         //           isClose: true,
                //         //           isCustomername: false,
                //         //           isAdd: false,
                //         //           isInvoice_to: false,
                //         //           isShippingt_to: false,
                //         //           isThanking_msg: false,
                //         //           isTerms_cond_msg: false,
                //         //           isInvoice_no: false,
                //         //           isjob_name: false,
                //         //           // isTablefilled: false,
                //         //           isCustomername: false,
                //         //           selected_customer_name: '',
                //         //           tax_home_currency: '0',
                //         //           tax_home_currency: '0',
                //         //           rows: ['row 1']
                //         //         })
                //         //         setTimeout(function () {
                //         //           if (jQuery('#closeme').fadeOut(2000));
                //         //         }, 8000)
                //         //         jQuery('.form-control').val('')
                //         //         jQuery('#homecurrencytyt').html('0')
                //         //         jQuery('#foreigncurrencytyt').html('0')
                //         //         jQuery('#home_grand_total').html('0')
                //         //         jQuery('#foreign_grand_total').html('0')
                //         //         jQuery('#selectednow0').html('Choose')
                //         //         jQuery('#home_tax_total').html('0')

                //         //         this.setState({})
                //         //       }
                //         //       localStorage.setItem('updated','no')

                //         //       localStorage.setItem('updated','yes')
                //         //       var iframe = document.createElement('iframe');
                //         //       iframe.style.cssText = 'opacity:0;position:absolute';
                //         //       iframe.src = 'about:blank';
                //         //       iframe.onload = function() {
                //         //       iframe.contentWindow.close.call(window);
                //         //      document.body.removeChild(iframe);
                //         //   };
                //         //   document.body.appendChild(iframe);
                //         //     } else {
                //         //       alert(response.message)

                //         //       var mymsg=response.message;
                //         //       if(mymsg.includes('Invoice number already exists')){
                //         //         this.setState({ExistMsg:response.message,isAlreadyTaken:true});
                //         //       }
                //         //       this.setState({ isRejected: true, reject_msg: response.message })
                //         //       setTimeout(function () {
                //         //         if (jQuery('#failed_alrt').fadeOut(2000));
                //         //       }, 4000)
                //         //     }
                //         //   })

                //         //   // alert('Please fill out payment details')
                //         // }
                //         // }else{
                //         //   this.setState({is3partyAccRequired:true});
                //         //   alert('Please fill out payment details')
                //         // }
                //         //   }

                //         // alert('I am regarding update invoice')

                //         let payable_amount = jQuery("#payable_amount").val();
                //         if (payable_amount == "" || payable_amount == undefined) {
                //             // alert(payable_amount)
                //             // alert(typeof payable_amount)
                //             FetchAllApi.update_sales_invoice(datas, (err, response) => {
                //                 if (response.status === 1) {
                //                     alert("sales invoice updated succesfully");

                //                     if (btn_type === "save") {
                //                         // localStorage.setItem('customer','')

                //                         this.setState({ isClose: true });
                //                         setTimeout(() => {
                //                             // if (jQuery("#closeme").fadeOut(2000));
                //                             this.setState({ isClose: false });

                //                             jQuery(".form-control").val("");
                //                             jQuery("#homecurrencytyt").html("0");
                //                             jQuery("#foreigncurrencytyt").html("0");
                //                             jQuery("#home_grand_total").html("0");
                //                             jQuery("#foreign_grand_total").html("0");
                //                             jQuery("#selectednow0").html("Choose");
                //                             jQuery("#home_tax_total").html("0");
                //                         }, 4000);
                //                         this.props.history.push("/loading", ["/create_salesorder"]);
                //                     } else {
                //                         localStorage.setItem("customer", "");
                //                         alert("Succesfully saved, Click ok to proceed next one");
                //                         this.props.history.push("/loading", ["/create_salesorder"]);

                //                         this.setState({ isClose: true });
                //                         setTimeout(() => {
                //                             // if (jQuery("#closeme").fadeOut(2000));
                //                             this.setState({ isClose: false });

                //                             jQuery(".form-control").val("");
                //                             jQuery("#homecurrencytyt").html("0");
                //                             jQuery("#foreigncurrencytyt").html("0");
                //                             jQuery("#home_grand_total").html("0");
                //                             jQuery("#foreign_grand_total").html("0");
                //                             jQuery("#selectednow0").html("Choose");
                //                             jQuery("#home_tax_total").html("0");
                //                         }, 4000);
                //                         setTimeout(() => {
                //                             if (jQuery("#closeme").fadeOut(2000));
                //                         }, 4000);
                //                         // alert(response.message)
                //                         this.setState({
                //                             isClose: true,
                //                             isCustomername: false,
                //                             isAdd: false,
                //                             isInvoice_to: false,
                //                             isShippingt_to: false,
                //                             isThanking_msg: false,
                //                             isTerms_cond_msg: false,
                //                             isInvoice_no: false,
                //                             isjob_name: false,
                //                             // isTablefilled: false,
                //                             isCustomername: false,
                //                             selected_customer_name: "",
                //                             tax_home_currency: "0",
                //                             tax_home_currency: "0",
                //                             rows: ["row 1"],
                //                         });
                //                         setTimeout(function () {
                //                             if (jQuery("#closeme").fadeOut(2000));
                //                         }, 8000);
                //                         jQuery(".form-control").val("");
                //                         jQuery("#homecurrencytyt").html("0");
                //                         jQuery("#foreigncurrencytyt").html("0");
                //                         jQuery("#home_grand_total").html("0");
                //                         jQuery("#foreign_grand_total").html("0");
                //                         jQuery("#selectednow0").html("Choose");
                //                         jQuery("#home_tax_total").html("0");

                //                         this.setState({});
                //                     }
                //                     localStorage.setItem("updated", "no");

                //                     localStorage.setItem("updated", "yes");
                //                     var iframe = document.createElement("iframe");
                //                     iframe.style.cssText = "opacity:0;position:absolute";
                //                     iframe.src = "about:blank";
                //                     iframe.onload = function () {
                //                         iframe.contentWindow.close.call(window);
                //                         document.body.removeChild(iframe);
                //                     };
                //                     document.body.appendChild(iframe);
                //                 } else {
                //                     alert(response.message);

                //                     var mymsg = response.message;
                //                     if (mymsg.includes("Invoice number already exists")) {
                //                         this.setState({
                //                             ExistMsg: response.message,
                //                             isAlreadyTaken: true,
                //                         });
                //                     }
                //                     this.setState({
                //                         isRejected: true,
                //                         reject_msg: response.message,
                //                     });
                //                     setTimeout(function () {
                //                         if (jQuery("#failed_alrt").fadeOut(2000));
                //                     }, 4000);
                //                 }
                //             });
                //         } else {
                //             // alert(payable_amount)
                //             // alert(typeof payable_amount)
                //             // if(balanceCategId !==undefined)
                //             // alert('i am on the wa')
                //             if (
                //                 paymentdate != undefined &&
                //                 paymentdate != "" &&
                //                 payment_method != undefined &&
                //                 payment_method != "" &&
                //                 balanceCategId != undefined &&
                //                 balanceCategId != ""
                //             ) {
                //                 if (this.state.isThirdPartyName) {
                //                     if (
                //                         jQuery("#third_account_id option:selected").data(
                //                             "status"
                //                         ) !== undefined &&
                //                         jQuery("#third_account_id option:selected").data(
                //                             "status"
                //                         ) !== ""
                //                     ) {
                //                         FetchAllApi.update_sales_invoice(datas, (err, response) => {
                //                             if (response.status === 1) {
                //                                 alert("sales invoice updated succesfully");

                //                                 if (btn_type === "save") {
                //                                     // localStorage.setItem('customer','')

                //                                     this.setState({ isClose: true });
                //                                     setTimeout(() => {
                //                                         // if (jQuery("#closeme").fadeOut(2000));
                //                                         this.setState({ isClose: false });

                //                                         jQuery(".form-control").val("");
                //                                         jQuery("#homecurrencytyt").html("0");
                //                                         jQuery("#foreigncurrencytyt").html("0");
                //                                         jQuery("#home_grand_total").html("0");
                //                                         jQuery("#foreign_grand_total").html("0");
                //                                         jQuery("#selectednow0").html("Choose");
                //                                         jQuery("#home_tax_total").html("0");
                //                                     }, 4000);
                //                                     this.props.history.push("/loading", [
                //                                         "/create_salesorder",
                //                                     ]);
                //                                 } else {
                //                                     localStorage.setItem("customer", "");
                //                                     alert(
                //                                         "Succesfully saved, Click ok to proceed next one"
                //                                     );
                //                                     this.props.history.push("/loading", [
                //                                         "/create_salesorder",
                //                                     ]);

                //                                     this.setState({ isClose: true });
                //                                     setTimeout(() => {
                //                                         // if (jQuery("#closeme").fadeOut(2000));
                //                                         this.setState({ isClose: false });

                //                                         jQuery(".form-control").val("");
                //                                         jQuery("#homecurrencytyt").html("0");
                //                                         jQuery("#foreigncurrencytyt").html("0");
                //                                         jQuery("#home_grand_total").html("0");
                //                                         jQuery("#foreign_grand_total").html("0");
                //                                         jQuery("#selectednow0").html("Choose");
                //                                         jQuery("#home_tax_total").html("0");
                //                                     }, 4000);
                //                                     setTimeout(() => {
                //                                         if (jQuery("#closeme").fadeOut(2000));
                //                                     }, 4000);
                //                                     // alert(response.message)
                //                                     this.setState({
                //                                         isClose: true,
                //                                         isCustomername: false,
                //                                         isAdd: false,
                //                                         isInvoice_to: false,
                //                                         isShippingt_to: false,
                //                                         isThanking_msg: false,
                //                                         isTerms_cond_msg: false,
                //                                         isInvoice_no: false,
                //                                         isjob_name: false,
                //                                         // isTablefilled: false,
                //                                         isCustomername: false,
                //                                         selected_customer_name: "",
                //                                         tax_home_currency: "0",
                //                                         tax_home_currency: "0",
                //                                         rows: ["row 1"],
                //                                     });
                //                                     setTimeout(function () {
                //                                         if (jQuery("#closeme").fadeOut(2000));
                //                                     }, 8000);
                //                                     jQuery(".form-control").val("");
                //                                     jQuery("#homecurrencytyt").html("0");
                //                                     jQuery("#foreigncurrencytyt").html("0");
                //                                     jQuery("#home_grand_total").html("0");
                //                                     jQuery("#foreign_grand_total").html("0");
                //                                     jQuery("#selectednow0").html("Choose");
                //                                     jQuery("#home_tax_total").html("0");

                //                                     this.setState({});
                //                                 }
                //                                 localStorage.setItem("updated", "no");

                //                                 localStorage.setItem("updated", "yes");
                //                                 var iframe = document.createElement("iframe");
                //                                 iframe.style.cssText = "opacity:0;position:absolute";
                //                                 iframe.src = "about:blank";
                //                                 iframe.onload = function () {
                //                                     iframe.contentWindow.close.call(window);
                //                                     document.body.removeChild(iframe);
                //                                 };
                //                                 document.body.appendChild(iframe);
                //                             } else {
                //                                 alert(response.message);

                //                                 var mymsg = response.message;
                //                                 if (mymsg.includes("Invoice number already exists")) {
                //                                     this.setState({
                //                                         ExistMsg: response.message,
                //                                         isAlreadyTaken: true,
                //                                     });
                //                                 }
                //                                 this.setState({
                //                                     isRejected: true,
                //                                     reject_msg: response.message,
                //                                 });
                //                                 setTimeout(function () {
                //                                     if (jQuery("#failed_alrt").fadeOut(2000));
                //                                 }, 4000);
                //                             }
                //                         });
                //                     } else {
                //                         this.setState({ is3partyAccRequired: true });

                //                         alert("please fill out payment details");
                //                     }
                //                 } else {
                //                     FetchAllApi.update_sales_invoice(datas, (err, response) => {
                //                         if (response.status === 1) {
                //                             alert("sales invoice updated succesfully");

                //                             if (btn_type === "save") {
                //                                 // localStorage.setItem('customer','')

                //                                 this.setState({ isClose: true });
                //                                 setTimeout(() => {
                //                                     // if (jQuery("#closeme").fadeOut(2000));
                //                                     this.setState({ isClose: false });

                //                                     jQuery(".form-control").val("");
                //                                     jQuery("#homecurrencytyt").html("0");
                //                                     jQuery("#foreigncurrencytyt").html("0");
                //                                     jQuery("#home_grand_total").html("0");
                //                                     jQuery("#foreign_grand_total").html("0");
                //                                     jQuery("#selectednow0").html("Choose");
                //                                     jQuery("#home_tax_total").html("0");
                //                                 }, 4000);
                //                                 this.props.history.push("/loading", [
                //                                     "/create_salesorder",
                //                                 ]);
                //                             } else {
                //                                 localStorage.setItem("customer", "");
                //                                 alert(
                //                                     "Succesfully saved, Click ok to proceed next one"
                //                                 );
                //                                 this.props.history.push("/loading", [
                //                                     "/create_salesorder",
                //                                 ]);

                //                                 this.setState({ isClose: true });
                //                                 setTimeout(() => {
                //                                     // if (jQuery("#closeme").fadeOut(2000));
                //                                     this.setState({ isClose: false });

                //                                     jQuery(".form-control").val("");
                //                                     jQuery("#homecurrencytyt").html("0");
                //                                     jQuery("#foreigncurrencytyt").html("0");
                //                                     jQuery("#home_grand_total").html("0");
                //                                     jQuery("#foreign_grand_total").html("0");
                //                                     jQuery("#selectednow0").html("Choose");
                //                                     jQuery("#home_tax_total").html("0");
                //                                 }, 4000);
                //                                 setTimeout(() => {
                //                                     if (jQuery("#closeme").fadeOut(2000));
                //                                 }, 4000);
                //                                 // alert(response.message)
                //                                 this.setState({
                //                                     isClose: true,
                //                                     isCustomername: false,
                //                                     isAdd: false,
                //                                     isInvoice_to: false,
                //                                     isShippingt_to: false,
                //                                     isThanking_msg: false,
                //                                     isTerms_cond_msg: false,
                //                                     isInvoice_no: false,
                //                                     isjob_name: false,
                //                                     // isTablefilled: false,
                //                                     isCustomername: false,
                //                                     selected_customer_name: "",
                //                                     tax_home_currency: "0",
                //                                     tax_home_currency: "0",
                //                                     rows: ["row 1"],
                //                                 });
                //                                 setTimeout(function () {
                //                                     if (jQuery("#closeme").fadeOut(2000));
                //                                 }, 8000);
                //                                 jQuery(".form-control").val("");
                //                                 jQuery("#homecurrencytyt").html("0");
                //                                 jQuery("#foreigncurrencytyt").html("0");
                //                                 jQuery("#home_grand_total").html("0");
                //                                 jQuery("#foreign_grand_total").html("0");
                //                                 jQuery("#selectednow0").html("Choose");
                //                                 jQuery("#home_tax_total").html("0");

                //                                 this.setState({});
                //                             }
                //                             localStorage.setItem("updated", "no");

                //                             localStorage.setItem("updated", "yes");
                //                             var iframe = document.createElement("iframe");
                //                             iframe.style.cssText = "opacity:0;position:absolute";
                //                             iframe.src = "about:blank";
                //                             iframe.onload = function () {
                //                                 iframe.contentWindow.close.call(window);
                //                                 document.body.removeChild(iframe);
                //                             };
                //                             document.body.appendChild(iframe);
                //                         } else {
                //                             alert(response.message);

                //                             var mymsg = response.message;
                //                             if (mymsg.includes("Invoice number already exists")) {
                //                                 this.setState({
                //                                     ExistMsg: response.message,
                //                                     isAlreadyTaken: true,
                //                                 });
                //                             }
                //                             this.setState({
                //                                 isRejected: true,
                //                                 reject_msg: response.message,
                //                             });
                //                             setTimeout(function () {
                //                                 if (jQuery("#failed_alrt").fadeOut(2000));
                //                             }, 4000);
                //                         }
                //                     });
                //                 }
                //             } else {
                //                 alert("Please fill out payment details !");
                //             }
                //         }
                //     }
                // }
            }
        } else {
            this.setState({ isTablefilled: true });
        }
    };

    callAllLocale = () => {
        FetchAllApi.locale_list((err, response) => {

            if (response.status === 1) {
                this.setState({});
            } else {
            }
        });
    };
    formatCurrency = (curr) => {
        const filtered = data.filter((item) => item.currency == curr);
        if (filtered.length > 0) {
            var useme = filtered[0].locale;
        } else {
            let trimed = curr.trim();
            let sliced = trimed.slice(0, 2);
            var useme = "en" + sliced;
        }
        return (amnt) => {
            return new Intl.NumberFormat("en-US", {
                currency: "USD",
            }).format(amnt);
        };
    };
    typeOfColumnTobeModified = (changeEvent) => {
        this.setState({
            selectedColumnType: changeEvent.target.value,
        });
    };
    add_coulmn = (colType) => {
        var user_id = parseFloat(this.state.logged_user_id);
        let type = this.state.selectedColumnType;
        type = type ? type : colType;
        if (type === "textField") {
            var type_ = 1;
        } else {
            var type_ = 2;
        }
        var myVal = type_;
        let coulmn_name = jQuery("#coulmn_name").val();

        var coulmnData = this.state.number_of_columns_list;
        var obJ = {
            column_name: coulmn_name,
            type: myVal,
            options: [],
            is_visible: 1,
        };
        // alert(coulmnData)

        coulmnData.push(obJ);
        var coreData = {
            user_id: this.state.logged_user_id,
            columns: coulmnData,
            client_id: this.state.logged_client_id
        };

        FetchAllApi.upDateCoulmns(coreData, (err, response) => {
            alert(response.message);
            if (response.status === 1) {
                this.getColumns();

                //   this.setState({ items: response.list[0].columns })
            } else {
            }
        });

        // FetchAllApi.add_columns_list(
        //   user_id,
        //   type_,
        //   coulmn_name,
        //   (err, response) => {
        //     if (response.status === 1) {
        //       this.getColList()
        //     } else {
        //       this.setState({
        //         number_of_columns_list: []
        //       })
        //     }
        //   }
        // )

        //       FetchAllApi.get_columns_list(user_id, (err, response) => {
        //   if (response.status === 1) {
        //     this.setState({
        //       number_of_columns_list: response.list
        //     })
        //   } else {
        //     this.setState({
        //       number_of_columns_list: []
        //     })
        //   }
        // })

        // let type = this.state.selectedColumnType
        // type = type ? type : colType
        // var user_id = parseFloat(this.state.logged_user_id)
        // if (type === 'dropDownField') {
        //   // TODO: Make the API
        //   FetchAllApi.get_columns_list(user_id, (err, response) => {
        //     if (response.status === 1) {
        //       this.setState({
        //         number_of_columns_list: response.list
        //       })
        //     } else {
        //       this.setState({
        //         number_of_columns_list: []
        //       })
        //     }
        //   })
        // }
        // let item_check = jQuery(
        //   `#coulmn${this.state.rows.length - 1}${this.state.coulmns.length - 1}`
        // ).val()
        //   var coulmns = this.state.coulmns
        //   coulmns.push('new row')
        //   this.setState({ coulmns: coulmns })

        window.jQuery("#pop-modal-2").modal("hide");
    };
    removeOverFlow = (e, col) => {
        if (col) {
            this.setState({
                columnId: col,
            });
        }
        jQuery(".form-table").addClass("ovrFlwRmve");
    };

    getPaymethod = () => {
        FetchAllApi.getPaymethod((err, response) => {

            if (response.status === 1) {
                this.setState({
                    payment_method_list: response.lists,
                });
            } else {
            }
        });
    };

    defaultcategorylist_onchange = (x, y, z) => {
        let keyy = "";
        let from_create_invoice = 1;
        var client_id = this.state.logged_client_id;

        FetchAllApi.defaultcategorylist_onchange2(
            keyy,
            from_create_invoice,
            client_id,
            (err, response) => {
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
                            window.jQuery("#categry_id0").selectpicker("refresh");
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
    // get_currencies = () => {
    //   FetchAllApi.currencies((err, response) => {
    //     if (response.status === 1) {
    //       this.setState({ currencies: response.lists })
    //     } else {
    //       this.setState({ currencies: [] })
    //     }
    //   })
    // }

    changeState = () => {
        this.getColumns();
        this.addSerialNumber();
        this.onChange_filter_balancesheet();
    };
    onChange_filter_balancesheet = () => {
        let search_key = "";
        var client_id = this.state.logged_client_id;

        //alert(search_key)
        FetchAllApi.balancesheetlist_onchange(
            search_key,
            client_id,
            (err, response) => {
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
    // changeMe=()=>{
    //   this.setState({
    //     isEditCol: !this.state.isEditCol
    //   })
    // }
    //  myFunction=() =>{
    //   var x = document.getElementsByTagName("tr");
    //   var i;
    //   for (i = 0; i < x.length; i++) {
    //      alert(x[0].rowIndex)
    //   }

    // }

    getSubAccountList = () => {
        var coreData = {
            account_type_id: 2,
            client_id: this.state.logged_client_id,
        };

        FetchAllApi.getSubAccountList(coreData, (err, response) => {

            if (response.status === 1) {
                this.setState({ SubAccountList: response.list });

                // alert('success')
                // this.getItems()
                // window.jQuery('#add_items').modal('hide')
            } else {
            }
        });
    };

    findInSubAccountList = () => {
        // alert('entered')
        var currency = this.state.CurrentSelectedCurr;
        var result = [];
        this.state.SubAccountList.forEach((item, i) => {
            var fullString = item.name.split("-");
            var list_curr = fullString[1];

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

                if (response.status === 1) {
                    this.getSubAccountList();

                    jQuery("#account_id").val(response.account_type_id);

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

            if (
                jQuery("#invoice_curr_id option:selected").val() != "" &&
                jQuery("#invoice_curr_id option:selected").val() != undefined
            ) {
                jQuery("#account_id").val(result[0].id);
            }
            // alert('no worries match found')
        }
    };

    fetchThirdPartyNames = (payment_account_id) => {
        let client_id = this.state.logged_client_id;
        FetchAllApi.third_party_account_list(
            client_id,
            payment_account_id,
            (err, response) => {
                if (response.status === 1) {
                    this.setState({ third_party_account_list: response.data });

                    localStorage.setItem("third_party_customer_id", "");
                } else {
                }
            }
        );
    };

    next_sales_order_number = () => {
        var coreData = {
            client_id: this.state.logged_client_id,
        };
        FetchAllApi.next_sales_order_number(coreData, (err, response) => {
            // alert('rightu')
            if (response.status === 1) {
                this.setState({ invoice_number_for_print: response.invoice_number, invoice_date_for_print: moment(response.invoice_date).format("DD/MM/YYYY") })
                jQuery("#invoice_no").val(response.invoice_number);
                jQuery("#invoice_date").val(
                    moment(response.invoice_date).format("DD/MM/YYYY")
                );
                jQuery("#footeroptionthanksmessages").val(response.thanking_message);
                jQuery("#termcondmsg").val(response.terms_conditions);
                // alert(response.invoice_number)
                // this.setState({ customerjoblist: response.results })
            } else {
                this.setState({ customerjoblist: [] });
            }
        });
    };

    render() {

        var data = "";
        data = this.state.currencies;
        const toWords = new ToWords();
        // const toWords = new ToWords();

        let THIS = this;
        if (!this.state.isEditCol) {
            return (
                <div>

                {/* <div style={{ position: 'absolute', height: '100%', weight: '100%', zIndex: '99999999', top: '0', left: '0', right: '0', bottom: '0' }}></div> */}
      
                {this.state.is_void && < div style={{
                  position: 'fixed',
                  display: 'none',
                  width: ' 100%',
                  height: '100%',
                  top: '0',
                  left: ' 0',
                  right: '0',
                  bottom: ' 0',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  zIndex: '99999',
                  cursor: 'pointer',
                  display: 'block'
      
                }} >
                  <h1 className="watermark" >Voided</h1></div>}
                <div id="mynode">
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
                                        onClick={() => this.props.history.push("/all_lists")}
                                        className="back hidden-xs"
                                        class="back hidden-xs"
                                    >
                                        <img src="../../images/back-arrow-blue.svg" />
                                    </a>

                                    <ul class="list-unstyled breadcrumb page-title hidden-xs">
                                        <li>
                                            <a href="javascript: ;">Create Sales Order</a>
                                        </li>
                                        <li>Accounts Receivable</li>
                                    </ul>
                                    <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
                                </div>
                                <div>
                                    <div className="content-top col-md-12 col-xs-12">
                                        <form
                                            className="custom-form form-inline row"
                                            id="form_clear_input"
                                        >
                                            <div
                                                className="form-group col-md-3 col-sm-4"

                                            >
                                                <label>Sales order Currency<span className="astrick">*</span></label>
                                                <div>
                                                    <select
                                                        className="selectpicker form-control hh w-100 "
                                                        id="invoice_curr_id"
                                                        data-live-search="true"
                                                        title={`Choose`}
                                                        // data-width="150%"
                                                        onChange={(e) => {
                                                            if (
                                                                jQuery("#paid_status").val() ==
                                                                "Partially paid--invoice"
                                                            ) {
                                                                alert(
                                                                    "you cannot change currency to partially paid invoices"
                                                                );
                                                            } else {
                                                                jQuery("#Exchange").val("");

                                                                this.setState(
                                                                    {
                                                                        CurrentSelectedCurr: e.target.value,
                                                                        duplicateVar: e.target.value,
                                                                    },
                                                                    () => {
                                                                        this.handleChangeItems(
                                                                            0,
                                                                            this.state.rows.length - 1
                                                                        );
                                                                        setTimeout(() => {
                                                                            this.setState(
                                                                                {
                                                                                    cus_rate_rate: this.state
                                                                                        .exchange_value_ref,
                                                                                },
                                                                                () => {
                                                                                    this.handleChangeItems(
                                                                                        0,
                                                                                        this.state.rows.length - 1
                                                                                    );
                                                                                }
                                                                            );
                                                                        }, 2000);
                                                                    }
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        {/* <option selected={true}>Choose{'         '}</option> */}
                                                        {/* {Object.keys(data).map(item => {
                              return (
                                <React.Fragment>
                                  <option
                                    value={data[item].code}
                                    data-status={data[item].id}
                                    data-currency={data[item].code}
                                  >
                                    {data[item].code}
                                  </option>

                                </React.Fragment>
                              )
                            })} */}

                                                        {this.state.currencies &&
                                                            this.state.currencies.map((item) => {
                                                                if (item.code !== "ALL") {
                                                                    return <option value={item}> {item}</option>;
                                                                }
                                                            })}
                                                    </select>
                                                </div>
                                                {this.state.isInvoiceCurrency ? (
                                                    <div >
                                                        <small style={{ color: "red" }}>*Required.</small>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                            <div
                                                className="form-group col-md-3 col-sm-4 "

                                            >
                                                <label>Templates<span className="astrick">*</span></label>
                                                <div>
                                                    <select
                                                        className="selectpicker form-control "
                                                        id="template_sel"
                                                        data-live-search="true"
                                                        title={`Choose`}
                                                        data-width="100%"
                                                        value={this.state.template_id}
                                                        onChange={(e) => {
                                                            let value = e.target.value
                                                            let obj =  this.state.response.list.find((itm)=> itm.id == value) 
                                                            this.setState({ template_id: value ,selected_template_type : obj.selected_template_type})
                                                            this.temChanged(value)
                                                            // var index = e.target.value;
                                                            // this.apply_template_format(
                                                            //     index,
                                                            //     this.state.response.list[
                                                            //         index
                                                            //     ].template_name.slice(0, 20),
                                                            //     this.state.response.list[index].html_content
                                                            // );
                                                        }}
                                                    >
                                                        {this.state.response.list != undefined &&
                                                            this.state.response.list.map((item, index) => {
                                                                // if (item.id == 5) {
                                                                return (
                                                                    // <li
                                                                    //   key={index}
                                                                    //   id={index}
                                                                    //   onClick={() =>
                                                                    //     this.apply_template_format(
                                                                    //       index,
                                                                    //       this.state.response.list[
                                                                    //         index
                                                                    //       ].template_name.slice(0, 20),
                                                                    //       this.state.response.list[index]
                                                                    //         .html_content
                                                                    //     )
                                                                    //   }
                                                                    // >
                                                                    //   <a href='javascript:;'>
                                                                    //     {
                                                                    //       this.state.response.list[index]
                                                                    //         .template_name
                                                                    //     }
                                                                    //   </a>
                                                                    // </li>

                                                                    <option value={item.id}>
                                                                        {

                                                                            item.template_name
                                                                        }
                                                                    </option>
                                                                );
                                                                // }
                                                            })}
                                                    </select>
                                                </div>
                                                {this.state.isTemplate_selected ? (
                                                    <div >
                                                        <small style={{ color: "red" }}>*Required.</small>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                            <div style={{ display: 'none' }}
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
                                                        disabled={true}
                                                    >
                                                        {this.state.SubAccountList != undefined &&
                                                            this.state.SubAccountList.map((item, index) => {
                                                                return (
                                                                    // <li
                                                                    //   key={index}
                                                                    //   id={index}
                                                                    //   onClick={() =>
                                                                    //     this.apply_template_format(
                                                                    //       index,
                                                                    //       this.state.response.list[
                                                                    //         index
                                                                    //       ].template_name.slice(0, 20),
                                                                    //       this.state.response.list[index]
                                                                    //         .html_content
                                                                    //     )
                                                                    //   }
                                                                    // >
                                                                    //   <a href='javascript:;'>
                                                                    //     {
                                                                    //       this.state.response.list[index]
                                                                    //         .template_name
                                                                    //     }
                                                                    //   </a>
                                                                    // </li>

                                                                    <option value={item.id}>{item.name}</option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                                {/* {this.state.isAccounId ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>*Required.</small>
                          </div>
                        ) : (
                          ''
                        )} */}
                                            </div>

                                            <div style={{ display: 'none' }}
                                                className="form-group col-md-3 col-sm-4 no-edit"

                                            >
                                                <label>{"Paid Status"}</label>

                                                <input
                                                    type="text"
                                                    name="inv-no"
                                                    className="form-control w-100"
                                                    id="paid_status"
                                                    autoComplete="off"
                                                    placeholder=" "
                                                    disabled
                                                    defaultValue={'--'}
                                                />

                                            </div>
                                        </form>
                                    </div>
                                    {this.state.loading ? <div class="loading_spinner">Loading&#8230;</div> : ''}
                                    {/* <Loader
                                        type="ThreeDots"
                                        color="#00BFFF"
                                        height={100}
                                        width={100}
                                        visible={this.state.loading}
                                    /> */}
                                </div>
                                <div className="main-content col-md-12 col-xs-12">
                                    <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                                        <form className="custom-form invoice-form">
                                            <div className="row">
                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label>Customer Name<span className="astrick">*</span></label>

                                                    <select
                                                        className="selectpicker form-control add-new"
                                                        data-live-search="true"
                                                        title="Choose customer"
                                                        id="variable_pay_type"
                                                        name="selValue"
                                                        onChange={(e) => {
                                                            this.handleChange(e.target.value);
                                                        }}
                                                    >
                                                        <option>Create New </option>
                                                        {this.state.customer_and_job_list &&
                                                            this.state.customer_and_job_list.map((item) => {
                                                                // let isCustomer =
                                                                //   localStorage.getItem('customer') != undefined
                                                                //     ? true
                                                                //     : false
                                                                // if (isCustomer) {
                                                                //   var allString = localStorage.getItem(
                                                                //     'customer'
                                                                //   )
                                                                //   var splited = allString.split('=')
                                                                //   var id = splited[1]
                                                                // }
                                                                // if (item.id == id) {
                                                                //   var selected = true
                                                                // }

                                                                if (
                                                                    this.state.customerID != undefined &&
                                                                    this.state.customerID != null &&
                                                                    this.state.customerID != "" &&
                                                                    item.id == this.state.customerID
                                                                ) {
                                                                    var selected = true;
                                                                }  else if(
                                                                    this.state.customer_id != undefined &&
                                                                    this.state.customer_id != null &&
                                                                    this.state.customer_id != "" &&
                                                                    item.id == this.state.customer_id
                                                                  ) {
                                                                    var selected = true;
                                                                  } else {
                                                                    var selected = false;
                                                                  }

                                                                return (
                                                                    <option
                                                                        selected={selected}
                                                                        value={item.id}
                                                                        data-status={item.id}
                                                                    >
                                                                        {item.name}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                    {this.state.isCustomer ? (
                                                        <div>
                                                            <small style={{ color: "red" }}>*Required.</small>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                                {/* <div className='form-group col-md-4'>
                      <label>Customer Name</label>
                      <div className='custom-select-drop dropdown'>
                        <a
                          aria-expanded='false'
                          aria-haspopup='true'
                          role='button'
                          data-toggle='dropdown'
                          className='dropdown-toggle btn form-control'
                          href='javascript:;'
                        >
                          <span id='selected'>
                            {this.state.selected_customer_name === ''
                              ? 'Choose customer'
                              : this.state.selected_customer_name}
                          </span>
                          <span className='caret' />
                        </a>
                        <ul className='dropdown-menu'>
                          {this.state.customer_list != '' &&
                            this.state.customer_list.map((item, index) => {
                              return (
                                <li key={index} id={'selected' + index}>
                                  <a
                                    href='javascript:;'
                                    onClick={() =>
                                      this.selected_customer(
                                        index,
                                        item.name,
                                        item.currency
                                      )
                                    }
                                  >
                                    {item.customer_name}
                                  </a>
                                </li>
                              )
                            })}
                        </ul>{' '}
                        {this.state.isCustomername ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please choose customer name.
                            </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <converter ref={this.child} />
                    </div> */}
                                                <div
                                                    className="form-group col-md-4"
                                                    id="itemoptionDatestatus"
                                                >
                                                    <label>Sales order Date<span className="astrick">*</span></label>
                                                    {/* <div>
                            <DatePicker
                              onChange={this.onChange}
                              value={this.state.date}
                              className='form-control'
                              clearIcon={null}
                              clearAriaLabel='aria-label'
                              style={{ paddingLeft: 30 }}
                              format='dd-MM-yyyy'
                              placeholder='dd-mm-yyyy'
                            />
                          </div> */}

                                                    <div className="input-group date mar-t-no">
                                                        <input
                                                            type="text"
                                                            autoComplete="off"
                                                            name="Date"
                                                            id="invoice_date"
                                                            onBlur={() => {




                                                                // same function for check lock date

                                                                setTimeout(() => {
                                                                    this.setState({ temp_date: jQuery('#invoice_date').val() })
                                                                }, 500);

                                                                setTimeout(() => {
                                                                    if (this.state.lock_date) {
                                                                        if (jQuery('#invoice_date').val()) {
                                                                            // console.log('ppppp', this.state.lock_date)
                                                                            let date = this.changefromDate()
                                                                            // console.log('ppppp', date)
                                                                            if (this.state.lock_date >= date) {
                                                                                jQuery('#invoice_date').val("")
                                                                                window.jQuery("#lock_date").modal("show");
                                                                                // console.log('ppppp', 'ask password')
                                                                            } else {

                                                                                setTimeout(() => {
                                                                                    this.setState(
                                                                                        {
                                                                                            cus_rate_rate: this.state
                                                                                                .exchange_value_ref,
                                                                                        })
                                                                                }, 500);

                                                                                setTimeout(
                                                                                    () => {
                                                                                        this.handleChangeItems(
                                                                                            0,
                                                                                            this.state.rows.length - 1
                                                                                        )
                                                                                    }, 500
                                                                                )
                                                                                window.jQuery("#lock_date").modal("hide");
                                                                                // console.log('ppppp', 'leave date')
                                                                            }
                                                                        }
                                                                    }
                                                                }, 1000);

                                                                // same function for check lock date



                                                                // // let date = jQuery("#invoice_date").val();
                                                                // // this.setState({ invoice_date_for_print: moment(date).format("DD/MM/YYYY") })
                                                                // // alert('date changed')
                                                                // this.setState(
                                                                //     {
                                                                //         cus_rate_rate: this.state
                                                                //             .exchange_value_ref,
                                                                //     })
                                                                // setTimeout(
                                                                //     () => {
                                                                //         this.handleChangeItems(
                                                                //             0,
                                                                //             this.state.rows.length - 1
                                                                //         )
                                                                //     }, 1000
                                                                // )


                                                            }}
                                                            className="form-control"
                                                            required
                                                        />
                                                        <div className="input-group-addon">
                                                            <img src="images/calendar-icon.svg" alt="icon" />
                                                        </div>
                                                    </div>

                                                    {this.state.isInvoiceDate ? (
                                                        <div >
                                                            <small style={{ color: "red" }}>*Required.</small>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                                <div
                                                    className="form-group col-md-4"
                                                    id="itemoptioninvoicenostatus"
                                                >
                                                    <label>Sales order No</label>
                                                    <input
                                                        type="text"
                                                        name="inv-no"
                                                        className="form-control"
                                                        id="invoice_no"
                                                        required
                                                        autoComplete="off"
                                                        onChange={() => {
                                                            var no = jQuery('#invoice_no').val()
                                                            this.setState({ invoice_number_for_print: no })
                                                        }}
                                                    />{" "}
                                                    {/* {this.state.isInvoice_no ? (
                            <div >
                              <small style={{ color: "red" }}>*Required.</small>
                            </div>
                          ) : (
                            ""
                          )}
                          {this.state.isAlreadyTaken ? (
                            <div >
                              <small style={{ color: "red" }}>
                                {this.state.ExistMsg}
                              </small>
                            </div>
                          ) : (
                            ""
                          )} */}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-4" style={{ display: 'none' }} >
                                                    <label>Due Date</label>
                                                    <div className="input-group date mar-t-no">
                                                        <input
                                                            type="text"
                                                            autoComplete="off"
                                                            name="incorport_date"
                                                            id="due_date"
                                                            // onBlur={e => this.changeDate(e.target.value)}
                                                            className="form-control"
                                                            required
                                                        />

                                                        <div className="input-group-addon">
                                                            <img src="images/calendar-icon.svg" alt="icon" />
                                                        </div>
                                                    </div>
                                                    {this.state.isDueDate ? (
                                                        <div >
                                                            <small style={{ color: "red" }}>*Required.</small>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                    <small className="text-red"></small>
                                                </div>

                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                    <label>Job Name</label>

                                                    <select
                                                        className="selectpicker form-control add-new"
                                                        data-live-search="true"
                                                        title="Choose..."
                                                        id="jobName"
                                                        onChange={(e) => {
                                                            this.newJob(e.target.value);
                                                        }}
                                                    >
                                                        <option> Create New </option>
                                                        {this.state.customerjoblist &&
                                                            this.state.customerjoblist.map((item) => {
                                                                if (
                                                                    this.state.JobId != undefined &&
                                                                   item.id ==  this.state.JobId 
                                                                ) {
                                                                    var selected = true;
                                                                } else {
                                                                  //  jQuery("#jobName").val("Others");
                                                                    var selected = false;
                                                                }
                                                                return (
                                                                    <option
                                                                        selected={selected}
                                                                        value={item.job_name}
                                                                        data-status={item.id}
                                                                    >
                                                                        {item.job_name}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                    {/* {this.state.isJobName ? (
                            <div style={{ float: 'left' }}>
                              <small style={{ color: 'red' }}>*Required.</small>
                            </div>
                          ) : (
                            ''
                          )} */}
                                                </div>
                                            </div>



                                            <div className="row">

                                                {this.state.customField && this.state.customField.map((item, i) => {

                                                    return (
                                                        <>
                                                            {item.type == 'text' &&
                                                                <div
                                                                    className="form-group col-md-4"
                                                                // id="itemoptioninvoicenostatus"
                                                                >
                                                                    <label>{item.name}</label>
                                                                    <input
                                                                        type="text"
                                                                        name="inv-no"
                                                                        className="form-control"
                                                                        value={this.state[`customField${i}`]}
                                                                        required
                                                                        autoComplete="off"
                                                                        onChange={(e) => {
                                                                            this.setState({ [`customField${i}`]: e.target.value })
                                                                            setTimeout(() => {
                                                                                this.customValues()
                                                                            }, 500);
                                                                        }}
                                                                    />{" "}

                                                                </div>
                                                            }
                                                            {item.type == 'date' &&
                                                                <div className="form-group col-md-4">
                                                                    <label>{item.name}<span className="astrick">*</span></label>
                                                                    <div className="input-group date mar-t-no">
                                                                        <input
                                                                            type="text"
                                                                            autoComplete="off"
                                                                            value={this.state[`customField${i}`]}
                                                                            id={`customField${i}`}
                                                                            onBlur={() => {
                                                                                setTimeout(() => {
                                                                                    //   alert(`#customField${i}`) 
                                                                                    //  alert(jQuery(`#customField${i}`).val()) 
                                                                                    let a = jQuery(`#customField${i}`).val()
                                                                                    this.setState({ [`customField${i}`]: a }, () => this.customValues())
                                                                                }, 1000);
                                                                            }
                                                                            }
                                                                            // value={this.state[`customField${i}`]}
                                                                            // onChange={e => {
                                                                            //     this.setState({ [`customField${i}`]: e.target.value })
                                                                            //     setTimeout(() => {
                                                                            //         this.customValues()
                                                                            //     }, 500);
                                                                            // }
                                                                            // }
                                                                            className="form-control"
                                                                            required
                                                                        />
                                                                        <div className="input-group-addon" onClick={() => jQuery('#customField' + i).focus()}>
                                                                            <img src="images/calendar-icon.svg" alt="icon" />
                                                                        </div>
                                                                    </div>
                                                                    <small className="text-red"></small>
                                                                </div>
                                                            }
                                                            {item.type == 'dropDown' &&
                                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                                    <label>{item.name}</label>

                                                                    <select
                                                                        className="selectpicker form-control add-new"
                                                                        data-live-search="true"
                                                                        title="Choose..."
                                                                        value={this.state[`customField${i}`]}
                                                                        id={`customField${i}`}
                                                                        onChange={(e) => {
                                                                            let value = e.target.value
                                                                            if (value == 'new') {
                                                                                window.jQuery("#custom_column_options").modal("show");
                                                                                this.setState({ idx: i })
                                                                            } else {
                                                                                this.setState({ [`customField${i}`]: value })
                                                                                setTimeout(() => {
                                                                                    this.customValues()
                                                                                }, 500);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <option value='new'> Create New </option>
                                                                        {this.state.customField[i].options &&
                                                                            this.state.customField[i].options.map((item) => {
                                                                                return (
                                                                                    <option
                                                                                        value={item}
                                                                                    >
                                                                                        {item}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                    </select>

                                                                </div>
                                                            }
                                                        </>
                                                    )
                                                })}

                                            </div>




                                            {/* 
                  <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                    <label>Currency</label>
                    <select
                      className='selectpicker form-control'
                      id='currency_id'
                      data-live-search='true'
                      // onChange={e => {
                      //   this.setState({
                      //     preferred_deliveryMethod: e.target.value
                      //   })
                      // }}
                      onChange={e => {
                        var result = []

                        var options = e.target.options
                        var opt
                        for (
                          var i = 0, iLen = options.length;
                          i < iLen;
                          i++
                        ) {
                          opt = options[i]

                          if (opt.selected) {
                            result.push(opt.value)
                            this.setState({
                              selected_currency: opt.value
                            })
                          } else {
                          }
                        }

                        // this.setState({
                        //   preferred_paymentMethod: e.target.value
                        // })
                      }}
                    >
                      <option selected={true}>Choose</option>
                      {Object.keys(data).map(item => {
                        return (
                          <React.Fragment>
                            <option
                              value={data[item].id}
                              data-status={data[item].id}
                              data-currency={data[item].code}
                            >
                              {data[item].code}
                            </option>
                          </React.Fragment>
                        )
                      })}
                    </select>
                
                
                  </div> */}

                                            {/* <div className='form-group col-md-4'>
                    <label>Job Name</label>
                    <select
                          className="selectpicker form-control add-new"
                          data-live-search="true"
                          title="Choose"
                          id="variable_pay_type"
                                                                                
                        >
                          <option>Create New </option>
                          <option>job 1</option>
                          <option>job 2</option>
                          <option>job 3</option>
                        </select>
                        </div> */}
                                            {/* <textarea
                      className='form-control'
                      defaultValue={''}
                      id='job_name'
                    />
                    {this.state.isjob_name ? (
                      <div style={{ float: 'left' }}>
                        <small style={{ color: 'red' }}>
                          *Please fill out job name.
                        </small>
                      </div>
                    ) : (
                      ''
                    )} */}
                                            <div className="row">
                                                {/* <div
                    className='form-group col-md-4'
                    id='dummy'
                    style={{visibility:'hidden'}}
                  >
                    <label>Invoice to</label>
                    <textarea
                      id='dummy'
                      className='form-control'
                  
                    />
                 
                  </div> */}

                                                <div
                                                    className="form-group col-md-4"
                                                    id="itemoptionbilltostatus"
                                                >
                                                    <label>Salesorder to<span className="astrick">*</span></label>
                                                    <textarea
                                                        id="invoice_to"
                                                        className="form-control"
                                                        value={this.state.billing_address}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                billing_address: e.target.value,
                                                            });
                                                        }}
                                                        required
                                                    />
                                                    {this.state.isInvoice_to ? (
                                                        <div >
                                                            <small style={{ color: "red" }}>*Required.</small>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}{" "}
                                                </div>

                                                <div
                                                    className="form-group col-md-4"
                                                    id="itemoptionshippingtostatus"
                                                >
                                                    <label>Shipping to<span className="astrick">*</span></label>
                                                    <textarea
                                                        id="shipping_to"
                                                        className="form-control"
                                                        value={this.state.shipping_address}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                shipping_address: e.target.value,
                                                            });
                                                        }}
                                                    // required
                                                    ></textarea>
                                                    {/* {this.state.isShippingt_to ? (
                                                        <div >
                                                            <small style={{ color: "red" }}>*Required.</small>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )} */}
                                                </div>
                                                <div
                                                    className="form-group col-md-4"
                                                    id="footertermsstatus"
                                                >
                                                    <label>Memo</label>
                                                    <textarea
                                                        className="form-control"
                                                        id="footer_memo"
                                                        defaultValue={""}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {/* <div
                    className='form-group col-md-4'
                    id='itemoptioninvoicenostatus'
                  >
                    <label>Mobile No.</label>
                    <input
                      type='text'
                      name='mobile_no'
                      className='form-control'
                      id='mobile_no'
                      required
                    />{' '}
                    {this.state.isMobileno ? (
                      <div style={{ float: 'left' }}>
                        <small style={{ color: 'red' }}>
                          *Please fill out mobile no.
                        </small>
                      </div>
                    ) : (
                      ''
                    )}
                  </div> */}
                                            {/* //Jp work */}

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
                                                                            name="sales_tax_code"
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
                                                                            name="salesTax_name_entered"
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
                                                                                    THIS.state.selectedOption ===
                                                                                    "option1"
                                                                                }
                                                                                onChange={THIS.handleOptionChange}
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
                                                                                    THIS.state.selectedOption ===
                                                                                    "option2"
                                                                                }
                                                                                onChange={THIS.handleOptionChange}
                                                                            />{" "}
                                                                            Non-Taxable/Exempt
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                        {THIS.state.selectedOption === "option1" ? (
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
                                                                                                    name="tax"
                                                                                                    id="tax"
                                                                                                    autoComplete="off"
                                                                                                    required
                                                                                                    onInput={(event) =>
                                                                                                        THIS.handleChange_gst_type(
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
                                                                        className="btn btn-lightgray btn-align"
                                                                        data-dismiss="modal"
                                                                        onClick={this.modal_cancel}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <span>{"   "}</span>
                                                                    <button
                                                                        className="btn btn-green btn-align"
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


                                            <div className="modal fade pop-modal" id="custom_column_options" role="dialog">
            <div className="modal-dialog modal-md custom-modal">
              <button
                type="button"
                className="close hidden-xs"
                data-dismiss="modal"
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
                          placeholder="Enter options seperate by comma"
                          value={this.state.addedOptions}
                          onChange={(e) => this.setState({ addedOptions: e.target.value })}
                        />
                        <div >
                        </div>{" "}
                      </div>
                    </div>
                    <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                      <button
                        className="btn btn-lightgray btn-align"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <span>{"   "}</span>
                      <button
                        data-dismiss="modal"
                        className="btn btn-green btn-align"
                        type="button"
                        onClick={(e) => {
                            let value = this.state.addedOptions
                            let valueArray = value.split(',')
                            let customField = this.state.customField                         
                            valueArray.map((item, l) => { 
                                if (customField[this.state.idx].options.length != 0) {
                                    let duplicatecustomary=customField[this.state.idx].options.map(customname=>customname.toLowerCase());
                                  if (duplicatecustomary.indexOf(item.toLowerCase())>=0)
                                  {
                                      alert('Options ' + item + ' already available.')
                                  }
                                  else{
                                      customField[this.state.idx].options.push(item)
                                  }
                                } 
                                else { customField[this.state.idx].options.push(item) }
                          })
                            this.setState({ customField, addedOptions: '' })
                            jQuery(`#customField${this.state.idx}`).val('');
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



          <div className="modal fade pop-modal" id="custom_column_options1" role="dialog">
            <div className="modal-dialog modal-md custom-modal">
              <button
                type="button"
                className="close hidden-xs"
                data-dismiss="modal"
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
                          placeholder="Enter options seperate by comma"
                          value={this.state.addedOptions1}
                          onChange={(e) => this.setState({ addedOptions1: e.target.value })}
                        />
                        <div >
                        </div>{" "}
                      </div>
                    </div>
                    <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                      <button
                        className="btn btn-lightgray btn-align"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <span>{"   "}</span>
                      <button
                        data-dismiss="modal"
                        className="btn btn-green btn-align"
                        type="button"
                        onClick={(e) => {
                          let value = this.state.addedOptions1
                          let valueArray = value.split(',')
                          let customFieldB = this.state.customFieldB
                          valueArray.map((item, l) => {
                            customFieldB[this.state.idx].options.push(item)
                          })
                          this.setState({ customFieldB, addedOptions1: '' })
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



                                            {/* for lock date modal */}
                                            <div>
                                                <div
                                                    class="modal fade in"
                                                    id="lock_date"
                                                    role="dialog"
                                                    style={{ paddingLeft: 15 }}
                                                >
                                                    <div class="modal-dialog modal-md" style={{ width: 440 }}>
                                                        <button
                                                            type="button"
                                                            class="close hidden-xs"
                                                            data-dismiss="modal"
                                                        >
                                                            <img
                                                                class="img-responsive"
                                                                src="../../images/close-red.svg"
                                                                alt="icon"
                                                            />
                                                        </button>
                                                        <div class="modal-content">
                                                            <div class="modal-body text-center success-modal">
                                                                <div class="pop-icon img-size">
                                                                    {/* {<img src="../../images/delete-icon.svg" alt="icon" />} */}
                                                                </div>

                                                                <h3>Are you sure?</h3>

                                                                <p class="fw-500">This date is beyond lock date. To apply this date , need to verify Lock Date password</p>
                                                                <button
                                                                    className="btn btn-lightgray btn-align"
                                                                    data-dismiss="modal"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <span>{"   "}</span>
                                                                <button
                                                                    class="btn btn-red btn-align"
                                                                    type="button"
                                                                    data-dismiss="modal"
                                                                    data-toggle="modal" data-target="#asking_password_for_delete"
                                                                // onClick={this.deleteUser}
                                                                >
                                                                    Apply
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="modal fade pop-modal" id="asking_password_for_delete" >
                                                <div className="modal-dialog modal-xs custom-modal">
                                                    {/* Modal content*/}
                                                    <button type="button" className="close hidden-xs" data-dismiss="modal">
                                                        <img className="img-responsive" src="images/close-red.svg" alt="icon" />
                                                    </button>
                                                    <div className="modal-content">
                                                        <div className="modal-body text-center">
                                                            <h3>Change Password</h3>
                                                            <form className="custom-form row column">

                                                                <div className="form-group col-md-12 col-xs-12">
                                                                    <label>Enter Lock Password<span className="astrick">*</span></label>
                                                                    <div className="form-group login-eye">
                                                                        <i className="pass-visible" toggle="#password-fieldc" onClick={() => this.setState({ show: !this.state.show })}>
                                                                            <img className="off" src="images/visibility-off.svg" alt="hide" />
                                                                            <img className="on" src="images/visibility.svg" alt="show" />
                                                                        </i>
                                                                        <input
                                                                            type={this.state.show ? "text" : "password"}
                                                                            value={this.state.old_password}
                                                                            className="form-control"
                                                                            required="required"
                                                                            autocomplete="off"
                                                                            onChange={(e) => this.setState({ old_password: e.target.value })}
                                                                        />
                                                                    </div>
                                                                    {this.state.old_password == '' ? (
                                                                        <div style={{ float: 'left' }}>
                                                                            <small style={{ color: 'red' }}>
                                                                                please enter this password field.
                                                                            </small>
                                                                        </div>
                                                                    ) : (
                                                                        ''
                                                                    )}
                                                                    {this.state.old_password != '' && this.state.deleteMsg == true ? (
                                                                        <div style={{ float: 'left' }}>
                                                                            <small style={{ color: 'red' }}>
                                                                                *Incorrect password
                                                                            </small>
                                                                        </div>
                                                                    ) : (
                                                                        ''
                                                                    )}
                                                                </div>
                                                                <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                                                                    <button className="btn btn-lightgray mar-rgt-5" data-dismiss="modal">Cancel</button>
                                                                    <input type="button" className="btn btn-green mar-rgt-5" value="Submit" onClick={() => {
                                                                        if (this.state.old_password !== '') {
                                                                            this.checkPassword()

                                                                        }
                                                                    }} />
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* for lock date modal */}



                                            <div className=" row ">
                                                <div className="form-group col-md-12">


                                                    <label className="custom-checkbox">
                                                        <input
                                                            id="changeme"
                                                            type="checkbox"
                                                            checked={this.state.isChecked}
                                                            onChange={this.toggleChange}
                                                        />{" "}
                                                        Including Tax
                                                        <span className="checkmark"></span>
                                                    </label>


                                                    {this.state.paymentGRTR == 0 && (
                                                        <div className="th-action-inv">
                                                            <a
                                                                title="Add new column"
                                                                href="javascript:;"
                                                                className="add-col"
                                                                data-toggle="modal"
                                                                data-target="#pop-modal-2"
                                                            >
                                                                <img
                                                                    className="img-responsive"
                                                                    src="images/plus-icon.svg"
                                                                    alt="icon"
                                                                />
                                                            </a>
                                                            <a
                                                                title="Edit columns"
                                                                href="javascript:;"
                                                                // data-toggle='modal'
                                                                // data-target='#editCol'
                                                                onClick={() => {
                                                                    var win = window.open(
                                                                        "/coulmn-rearrange",
                                                                        "_blank"
                                                                    );
                                                                    win.focus();
                                                                    // this.setState({
                                                                    //   isEditCol: !this.state.isEditCol
                                                                    // })
                                                                }}
                                                                className="add-col edit-col"
                                                            >
                                                                <img
                                                                    className="img-responsive"
                                                                    src="images/pen-blue.svg"
                                                                    alt="icon"
                                                                />
                                                            </a>
                                                        </div>
                                                    )}

                                                    <div
                                                        className="table-responsive col-md-12 mar-top"
                                                        
                                                    >
                                                        <table className="invoice-item-table " id="mytable"
                                                        // onClick={() => jQuery(".table-responsive").css("overflow", "visible")}
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th>No</th>
                                                                    <th>Item</th>
                                                                    <th>Description</th>
                                                                    <th className="text-right">Unit Price</th>
                                                                    <th className="text-center">Quantity</th>
                                                                    <th className="text-center">Tax</th>

                                                                    <th className="text-right">Total</th>
                                                                    <th>Category</th>

                                                                    {/* {this.state.coulmns != undefined &&
                                  this.state.coulmns.map((coulmn, index) => {
                                    return (
                                      <th
                                        className='handle'
                                        key={coulmn}
                                        id={`header${index}`}
                                        contentEditable
                                        onInput={event =>
                                          THIS.handleChangeItems(
                                            event,
                                            THIS.state.rows.length - 1
                                          )
                                        }
                                        required
                                        placeholder='Editable'
                                      >
                                        Editable
                                      </th>
                                    )
                                  })} */}
                                                                    {Array.isArray(
                                                                        this.state.number_of_columns_list
                                                                    ) &&
                                                                        this.state.number_of_columns_list !=
                                                                        undefined &&
                                                                        this.state.number_of_columns_list.map(
                                                                            (coulmn, index) => {
                                                                                if (coulmn.is_visible == 1) {
                                                                                    return (
                                                                                        <th
                                                                                            className="handle text-center"
                                                                                            key={coulmn.column_name}
                                                                                            id={`header${index}`}
                                                                                            onInput={(event) =>
                                                                                                THIS.handleChangeItems(
                                                                                                    event,
                                                                                                    THIS.state.rows.length - 1
                                                                                                )
                                                                                            }
                                                                                            required
                                                                                            placeholder="DropDown"
                                                                                        >
                                                                                            {coulmn.column_name}
                                                                                        </th>
                                                                                    );
                                                                                }
                                                                            }
                                                                        )}
                                                                    {/* <th
                              className='text-center'
                              style={{ paddingTop: 1 }}
                            >
                              <a
                                href='javascript:;'
                                className='add-col'
                                data-toggle='modal'
                                data-target='#pop-modal-2'
                              >
                                <img
                                  src='../../images/plus-icon.svg'
                                  alt='icon'
                                />
                              </a>
                            </th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody className="ui-sortable">
                                                                {this.state.rows.map(function (row, index) {
                                                                    let itemid = index;
                                                                    let myvalue =
                                                                        THIS.state.myarray.length > 0 &&
                                                                            THIS.state.myarray[itemid] &&
                                                                            THIS.state.myarray[itemid].price != "" &&
                                                                            THIS.state.myarray[itemid].price != 0
                                                                            ? THIS.state.myarray[itemid].price
                                                                            : "";

                                                                    let selected_categeory =
                                                                        THIS.state.myarray.length > 0 &&
                                                                            THIS.state.myarray[itemid] &&
                                                                            THIS.state.myarray[itemid].category_id !=
                                                                            "" &&
                                                                            THIS.state.myarray[itemid].category_id != 0
                                                                            ? THIS.state.myarray[itemid].category_id
                                                                            : THIS.state.selected;
                                                                    //   alert(itemid)
                                                                    return (
                                                                        <tr key={row} className="handle">
                                                                            <td

                                                                            >
                                                                                <input type="hidden" id="getMe" />
                                                                                <span className="drag-icon handle">
                                                                                    <img
                                                                                        src="images/dots-menu.svg"
                                                                                        alt="icon"
                                                                                    />
                                                                                </span>
                                                                                {/* {index + 1} */}
                                                                                {/* {jQuery('table tr').index(tr)} */}
                                                                            </td>
                                                                            <td className="text-center"></td>


                                                                            <td className="Tax_width"

                                                                            >
                                                                                <input
                                                                                    type="hidden"
                                                                                    className="form-control"
                                                                                    placeholder="Enter Item"
                                                                                    autoComplete="off"
                                                                                    name="item_name"
                                                                                    id={`item${itemid}`}
                                                                                    // defaultValue={'product1'}
                                                                                    onInput={(event) =>
                                                                                        THIS.handleChangeItems(
                                                                                            event,
                                                                                            THIS.state.rows.length - 1
                                                                                        )
                                                                                    }
                                                                                    required
                                                                                />

                                                                                <select
                                                                                    className="selectpicker custom-select-drop cus add-new"
                                                                                    id={`cust_items${itemid}`}
                                                                                    // data-display="static"
                                                                                    data-live-search="true"
                                                                                    title="Choose"
                                                                                    onChange={(e) => {
                                                                                        if (e.target.value == "1e") {
                                                                                            var use = "#cust_items" + itemid;
                                                                                            jQuery(`${use} option`)
                                                                                                .prop("selected", false)
                                                                                                .trigger("change");

                                                                                            window
                                                                                                .jQuery("#add_items")
                                                                                                .modal("show");
                                                                                            jQuery("#iamfrom").val(itemid);
                                                                                        } else {
                                                                                            var res = e.target.value.split(
                                                                                                "="
                                                                                            );
                                                                                            var rate =
                                                                                                res[0] != "null" ? res[0] : "";
                                                                                            var des =
                                                                                                res[1] != "null" ? res[1] : "";
                                                                                            var cat_id =
                                                                                                res[2] != "null" ? res[2] : "";

                                                                                            jQuery("#descr" + itemid).val(
                                                                                                des
                                                                                            );
                                                                                            jQuery(
                                                                                                "#unit_price" + itemid
                                                                                            ).val(rate);

                                                                                            jQuery("#categry_id" + itemid)
                                                                                                .val(cat_id)
                                                                                                .trigger("change");

                                                                                            jQuery("#item" + itemid).val(
                                                                                                res[3]
                                                                                            );

                                                                                            jQuery("#itemsid" + itemid).val(
                                                                                                res[4]
                                                                                            );

                                                                                            THIS.handleChangeItems(
                                                                                                0,
                                                                                                THIS.state.rows.length - 1
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <option value="1e"> Add New </option>
                                                                                    {THIS.state.opt != "" &&
                                                                                        THIS.state.opt != undefined
                                                                                        ? THIS.state.opt
                                                                                        : ""}
                                                                                </select>
                                                                                <input
                                                                                    type="hidden"
                                                                                    id={`itemsid${itemid}`}
                                                                                />
                                                                            </td>


                                                                            {/* <td>  <Select options={options} /></td> */}
                                                                            <td>
                                                                                <textarea
                                                                                    className="form-control mycustextarea"
                                                                                    placeholder="Description"
                                                                                    style={{
                                                                                        height: "auto",
                                                                                        width: "auto",
                                                                                    }}
                                                                                    autoComplete="off"
                                                                                    name="description"
                                                                                    id={`descr${itemid}`}
                                                                                    onInput={(event) =>
                                                                                        THIS.handleChangeItems(
                                                                                            event,
                                                                                            THIS.state.rows.length - 1
                                                                                        )
                                                                                    }
                                                                                ></textarea>
                                                                            </td>

                                                                            <td className="text-right">
                                                                                <input
                                                                                    type="number"
                                                                                    name="unit_price"
                                                                                    className="form-control text-right"
                                                                                    placeholder={"00.00"}
                                                                                    autoComplete="off"
                                                                                    id={`unit_price${itemid}`}
                                                                                    onInput={(event) => {
                                                                                        THIS.handleChangeItems(
                                                                                            event,
                                                                                            THIS.state.rows.length - 1
                                                                                        )
                                                                                        setTimeout(() => { THIS.handleChangeItems('', THIS.state.rows.length - 1) }, 1000)
                                                                                    }
                                                                                    }
                                                                                    required
                                                                                />
                                                                            </td>
                                                                            <td className="text-center">
                                                                                <input
                                                                                    type="number"
                                                                                    name="quantity"
                                                                                    className="form-control"
                                                                                    placeholder={"00.00"}
                                                                                    id={`quantity${itemid}`}
                                                                                    onInput={(event) => {
                                                                                        THIS.handleChangeItems(
                                                                                            event,
                                                                                            THIS.state.rows.length - 1
                                                                                        )
                                                                                        setTimeout(() => { THIS.handleChangeItems('', THIS.state.rows.length - 1) }, 1000)
                                                                                    }
                                                                                    }
                                                                                    required
                                                                                />
                                                                            </td>

                                                                            <td className="Tax_width" >
                                                                                {/* <select
                                          className="selectpicker form-control add-new"
                                          data-live-search="true"
                                          title="Choose Tax"
                                          // id="variable_pay_typegggg"
                                          id={`taxdisable${itemid}`}
                                          name="selValue"
                                          onChange={(e) => {

                                            THIS.state.gst_list.map((item) => {
                                              if (item == e.target.value) {

                                                THIS.handleCheck_get_selected_tax.bind(
                                                  THIS,
                                                  item.id,
                                                  itemid,
                                                  "selectednow" +
                                                  itemid,
                                                  item.sales_tax_name,
                                                  item.rate,
                                                  item.rate_type
                                                )

                                              }

                                            })
                                          }}
                                        >
                                          <option>Create New </option>
                                          {
                                            THIS.state.gst_list &&
                                            THIS.state.gst_list.map((item) => {

                                              if (
                                                THIS.state.customerID != undefined &&
                                                THIS.state.customerID != null &&
                                                THIS.state.customerID != "" &&
                                                item.id == THIS.state.customerID
                                              ) {
                                                var selected = true;
                                              } else {
                                                var selected = false;
                                              }

                                              return (
                                                <option
                                                  // selected={selected}
                                                  value={item.name}
                                                  data-status={item.name}
                                                >
                                                  {item.sales_tax_name}
                                                </option>
                                              );
                                            })
                                          }
                                        </select>

                                        <span
                                          id={`selectednow_id${itemid}`}
                                          style={{ display: "none" }}
                                        >
                                          NO_VALUE
                                            </span>
                                        <input
                                          type="hidden"
                                          id={`selectedrate_id${itemid}`}
                                        />
                                        <input
                                          type="hidden"
                                          id={`selectedtype_id${itemid}`}
                                        /> */}

                                                                                <div className="custom-select-drop dropdown cus">
                                                                                    <a
                                                                                        aria-expanded="false"
                                                                                        aria-haspopup="true"
                                                                                        role="button"
                                                                                        data-toggle="dropdown"
                                                                                        className="dropdown-toggle btn useDRP"
                                                                                        id={`taxdisable${itemid}`}
                                                                                        href="javascript:;"
                                                                                        value={THIS.state.selected}
                                                                                        required
                                                                                    >


                                                                                        <span
                                                                                            id={`selectednow${itemid}`}
                                                                                            className="salesTaxName"
                                                                                        >
                                                                                            {THIS.state.selected != ""
                                                                                                ? THIS.state.selected
                                                                                                : "Choose"}{" "}
                                                                                        </span>

                                                                                        <span
                                                                                            id={`selectednow_id${itemid}`}
                                                                                            style={{ display: "none" }}
                                                                                        >
                                                                                            NO_VALUE
                                                                                        </span>
                                                                                        <input
                                                                                            type="hidden"
                                                                                            id={`selectedrate_id${itemid}`}
                                                                                        />
                                                                                        <input
                                                                                            type="hidden"
                                                                                            id={`selectedtype_id${itemid}`}
                                                                                        />

                                                                                        <span className="caret"></span>
                                                                                    </a>
                                                                                    <ul
                                                                                        className="dropdown-menu category"
                                                                                    // style={{
                                                                                    //   height: 213,
                                                                                    //   overflowY: "scroll",
                                                                                    //   width: "auto",
                                                                                    //   overflowX: "auto",
                                                                                    // }}
                                                                                    >
                                                                                        {/* <li
                                              className="active"

                                              data-name={""}
                                              data-rate={0}
                                              data-type={""}
                                            >
                                              <a href="javascript:;" value={0}>
                                                choose
                                              </a>
                                            </li> */}

                                                                                        <li>
                                                                                            <input
                                                                                                type="text"
                                                                                                name="search"
                                                                                                id="gst_search"
                                                                                                autoComplete="off"
                                                                                                className="form-control"
                                                                                                onInput={(event) =>
                                                                                                    THIS.update_search_keyword(
                                                                                                        event
                                                                                                    )
                                                                                                }
                                                                                                required
                                                                                            />
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-rounded btn-blue"
                                                                                                data-toggle="modal"
                                                                                                data-target="#pop-modal-1"
                                                                                            >
                                                                                                Add New
                                                                                                <img
                                                                                                    className="arrow-icon"
                                                                                                    src="../../images/right-arrow.svg"
                                                                                                    alt="icon"
                                                                                                />
                                                                                            </button>
                                                                                        </li>
                                                                                        <li>
                                                                                            <ul className="list-unstyled">
                                                                                                {THIS.state.gst_list.map(
                                                                                                    (item, index) => {
                                                                                                        return (
                                                                                                            <li
                                                                                                                key={index}
                                                                                                                onClick={THIS.handleCheck_get_selected_tax.bind(
                                                                                                                    THIS,
                                                                                                                    item.id,
                                                                                                                    itemid,
                                                                                                                    "selectednow" +
                                                                                                                    itemid,
                                                                                                                    item.sales_tax_name,
                                                                                                                    item.rate,
                                                                                                                    item.rate_type
                                                                                                                )}
                                                                                                                data-name={
                                                                                                                    item.sales_tax_name
                                                                                                                }
                                                                                                                data-rate={item.rate}
                                                                                                                data-type={
                                                                                                                    item.rate_type
                                                                                                                }
                                                                                                            >
                                                                                                                <a
                                                                                                                    href="javascript:;"
                                                                                                                    value={item.name}
                                                                                                                >
                                                                                                                    {item.sales_tax_name}
                                                                                                                </a>
                                                                                                            </li>
                                                                                                        );
                                                                                                    }
                                                                                                )}
                                                                                            </ul>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>

                                                                            </td>


                                                                            <td className="text-right">
                                                                                <input
                                                                                    type="text"

                                                                                    className="form-control"
                                                                                    placeholder={"00.00"}
                                                                                    name="sub_total"
                                                                                    // onFocus={()=>{
                                                                                    //   jQuery('#subtotal'+itemid).val('')

                                                                                    // }}
                                                                                    onChange={(e) => {
                                                                                        var vv = e.target.value;
                                                                                        if (!isNaN(Number(vv))) {
                                                                                            jQuery(
                                                                                                "#unit_price" + itemid
                                                                                            ).val(Number(vv));
                                                                                            jQuery("#quantity" + itemid).val(
                                                                                                Number(1)
                                                                                            );
                                                                                            THIS.handleChangeItems(
                                                                                                itemid,
                                                                                                THIS.state.rows.length - 1
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                    id={`subtotal${itemid}`}
                                                                                />
                                                                            </td>
                                                                            <td className="catagory_width">
                                                                                <select
                                                                                    className="selectpicker form-control add-new"
                                                                                    data-live-search="true"
                                                                                    title="Choose"
                                                                                    id={`categry_id${itemid}`}
                                                                                    onChange={(e) => {
                                                                                        if (e.target.value == "1e") {
                                                                                            jQuery(
                                                                                                `#categry_id${itemid} option`
                                                                                            )
                                                                                                .prop("selected", false)
                                                                                                .trigger("change");

                                                                                            window
                                                                                                .jQuery("#pop-modal")
                                                                                                .modal("show");
                                                                                        }
                                                                                        // to update category 
                                                                                        THIS.handleChangeItems(
                                                                                            itemid,
                                                                                            THIS.state.rows.length - 1
                                                                                        );
                                                                                        // to update category 
                                                                                    }}
                                                                                >
                                                                                    <option value="1e">
                                                                                        Add New{" "}
                                                                                    </option>
                                                                                    {THIS.state.default_category_list &&
                                                                                        THIS.state.default_category_list.map(
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
                                                                            </td>

                                                                            {Array.isArray(
                                                                                THIS.state.number_of_columns_list
                                                                            ) &&
                                                                                THIS.state.number_of_columns_list !=
                                                                                undefined &&
                                                                                THIS.state.number_of_columns_list.map(
                                                                                    (column, index) => {
                                                                                        var colId = index;

                                                                                        if (column.type == 2) {
                                                                                            const optionsMap = column.options.map(
                                                                                                (item) => {
                                                                                                    return (
                                                                                                        <option value={item}>
                                                                                                            {item}
                                                                                                        </option>
                                                                                                    );
                                                                                                }
                                                                                            );


                                                                                            if (column.is_visible == 1) {
                                                                                                return (
                                                                                                    <td>
                                                                                                        <select
                                                                                                            className="selectpicker form-control add-new cus"
                                                                                                            id={`addtext${colId}${itemid}`}
                                                                                                            data-live-search="true"
                                                                                                            title="Choose..."
                                                                                                            onChange={
                                                                                                                (event) => THIS.tableDropDynamic(event, THIS.state.rows.length - 1, colId)}
                                                                                                        >
                                                                                                            <option value="1e">
                                                                                                                {" "}
                                                                                                                Add New{" "}
                                                                                                            </option>

                                                                                                            {optionsMap}
                                                                                                        </select>
                                                                                                    </td>
                                                                                                );
                                                                                            }
                                                                                        }
                                                                                        //do here text  field
                                                                                        if (column.type == 1) {
                                                                                            if (column.is_visible == 1) {
                                                                                                return (
                                                                                                    <td className="textwidth text-center">
                                                                                                        <input
                                                                                                            type="text"

                                                                                                            className="form-control"
                                                                                                            placeholder="Type..."
                                                                                                            id={`addtext${colId}${itemid}`}
                                                                                                            onInput={(event) =>
                                                                                                                THIS.handleChangeItems(
                                                                                                                    event,
                                                                                                                    THIS.state.rows
                                                                                                                        .length - 1
                                                                                                                )
                                                                                                            }
                                                                                                            required
                                                                                                        />
                                                                                                    </td>
                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                )}

                                                                            {THIS.state.coulmns != undefined &&
                                                                                THIS.state.coulmns.length > 0 &&
                                                                                THIS.state.coulmns.map((item, p) => {
                                                                                    return (
                                                                                        <td className="text-center">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                placeholder={"00.00"}
                                                                                                name="sub_total1"
                                                                                                id={`subtotal`}
                                                                                            />
                                                                                        </td>
                                                                                    );
                                                                                })}

                                                                            <td>
                                                                                {THIS.state.paymentGRTR == 0 && (
                                                                                    <div className="action-wrap">
                                                                                        <a
                                                                                            title="copy row"
                                                                                            href="javascript:;"
                                                                                            className="clone-row"
                                                                                            onClick={() =>
                                                                                                THIS.copyRow(itemid)
                                                                                            }
                                                                                        >
                                                                                            <img
                                                                                                src="images/clone-icon.svg"
                                                                                                alt="icon"
                                                                                            />
                                                                                        </a>

                                                                                        <a
                                                                                            title="delete row"
                                                                                            href="javascript:;"
                                                                                            className="del-row"
                                                                                            data-toggle="modal"
                                                                                            data-target="#modal_delete"
                                                                                            onClick={() => {
                                                                                                THIS.setState({
                                                                                                    specific_id_delete: itemid,
                                                                                                });
                                                                                            }}
                                                                                        >
                                                                                            <img
                                                                                                src="images/delete-icon.svg"
                                                                                                alt="icon"
                                                                                            />
                                                                                        </a>
                                                                                    </div>
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>

                                                        {/* <div className='form-group col-md-12 mar-b-no'>
                          <a href='javascript:;' className='add-input'>ADD ROW</a>
                        </div> */}
                                                        <div class="form-group col-md-12 mar-b-no">
                                                            {" "}
                                                            {this.state.isTablefilled ? (
                                                                <div >
                                                                    {/* <small style={{ color: "red" }}>
                                                                        *Please fill all fields.
                                  </small> */}
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            {this.control_addButton()}
                                                        </div>
                                                        {/* <div className='error_tbl_fld'>
                          Please fill out all table fields.
                        </div> */}
                                                    </div>


                                                </div>

                                            </div>

                                            {/* {this.state.isRejected ? (
                        <div
                          id='failed_alrt'
                          class='alert alert-card danger alert-dismissible fade in'
                        >
                          <a
                            href='#'
                            class='close'
                            data-dismiss='alert'
                            aria-label='close'
                          >
                            &times;
                          </a>
                          <div class='img-wrap'>
                            <img
                              class='img-responsive'
                              src='images/alert-cross.svg'
                              alt='icon'
                            />
                          </div>
                          <div class='alert-cont'>
                            <strong class='title'>Failed!</strong>
                            {this.state.reject_msg}.
                          </div>
                        </div>
                      ) : (
                        ''
                      )} */}

                                            {this.state.isClose ? (
                                                <div
                                                    class="alert alert-card success alert-dismissible fade in"
                                                    id="closeme"
                                                >
                                                    <a
                                                        href="#"
                                                        class="close"
                                                        data-dismiss="alert"
                                                        aria-label="close"
                                                    >
                                                        &times;
                                                    </a>
                                                    <div class="img-wrap">
                                                        <img
                                                            class="img-responsive"
                                                            src="../../images/alert-success.svg"
                                                            alt="icon"
                                                        />
                                                    </div>
                                                    <div class="alert-cont">
                                                        <strong class="title">Success!</strong>
                                                        saved successfully.
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <div >

                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 total-row" id="uss">
                                                    <div className="row">
                                                        <div className="form-group exchange-col col-md-5 col-xs-12">
                                                            <label className="fw-sbold">
                                                                Exchange Rate 1 {this.state.CurrentSelectedCurr}
                                                            </label>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    name="inv-no"
                                                                    className="form-control text-right"
                                                                    id="Exchange"
                                                                    required
                                                                    autoComplete="off"
                                                                    placeholder={Number(
                                                                        this.state.exchange_value_ref
                                                                    )}
                                                                    // defaultValue={this.state.exchange_value_ref}
                                                                    onChange={(e) => {
                                                                        if (e.target.value.length > 0) {
                                                                            // alert(e.target.value)
                                                                            this.setState(
                                                                                {
                                                                                    cus_rate_rate: e.target.value,
                                                                                },
                                                                                () => {
                                                                                    this.handleChangeItems(
                                                                                        0,
                                                                                        this.state.rows.length - 1
                                                                                    );
                                                                                }
                                                                            );
                                                                        } else {
                                                                            this.setState(
                                                                                {
                                                                                    cus_rate_rate: this.state
                                                                                        .exchange_value_ref,
                                                                                },
                                                                                () => {
                                                                                    this.handleChangeItems(
                                                                                        0,
                                                                                        this.state.rows.length - 1
                                                                                    );
                                                                                }
                                                                            );
                                                                        }
                                                                    }}
                                                                />{" "}
                                                                {/* <span
                            type='text'
                            name='exchangeRate'
                            className='form-control'
                            defaultValue={this.state.exchange_value}
                          >
                            {this.state.exchange_value}
                          </span> */}
                                                                <span className="label">
                                                                    {this.state.clientHomeCurrency}
                                                                </span>
                                                            </div>
                                                        </div>





                                                        {/* for comma separation display none here and displayed below */}

                                                        <div className="form-group col-md-7 col-xs-12 total-table" style={{ display: 'none' }}>
                                                            <table className="pull-right">
                                                                <thead>
                                                                    <tr>
                                                                        <th>&nbsp;</th>
                                                                        <th className="text-center">
                                                                            Foreign Currency
                                                                            <br />
                                                                            {/* ({this.state.currency_customer}) */}(
                                                                            {this.state.CurrentSelectedCurr})
                                                                        </th>
                                                                        <th className="text-center">
                                                                            Home Currency
                                                                            <br />({this.state.clientHomeCurrency})
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="text-right">Sub Total</td>

                                                                        <td
                                                                            className="text-center"
                                                                            id="homecurrencytyt"
                                                                        >
                                                                            {isNaN(this.state.subTotal)
                                                                                ? "0.00"
                                                                                : this.state.subTotal.toFixed(2)}
                                                                        </td>
                                                                        <td
                                                                            // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }

                                                                            className="text-center"
                                                                            id="foreigncurrencytyt"
                                                                        >
                                                                            {isNaN(this.state.sub_total_home_currency)
                                                                                ? "0.00"
                                                                                : // : this.formatCurrency('SGD') (parseFloat(this.state.sub_total_home_currency))}
                                                                                this.state.sub_total_home_currency}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="text-right">Tax</td>

                                                                        <td
                                                                            className="text-center"
                                                                            id="home_tax_total"
                                                                        >
                                                                            00.00
                                                                        </td>
                                                                        <td
                                                                            className="text-center"
                                                                            id="foreign_tax_total"
                                                                        >
                                                                            {
                                                                                isNaN(this.state.tax_home_currency)
                                                                                    ? "0.00"
                                                                                    : this.state.tax_home_currency
                                                                                //  this.formatCurrency('SGD') (parseFloat(this.state.tax_home_currency))}
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="text-right">Grand Total</td>

                                                                        <td
                                                                            className="text-center"
                                                                            id="home_grand_total"
                                                                        >
                                                                            0.00{" "}
                                                                            {/* {this.formatCurrency('USD')(parseFloat(0).toFixed(2))} */}
                                                                        </td>
                                                                        <td
                                                                            className="text-center"
                                                                            id="foreign_grand_total"
                                                                        >
                                                                            {/* {
                                      isNaN(
                                        Number(this.state.sub_total_home_currency )+ Number(this.state.tax_home_currency)
                                      )
                                        ? "0"
                                        :( Number(this.state.sub_total_home_currency) +Number(this.state.tax_home_currency))
                                      // this.formatCurrency('SGD')(parseFloat(this.state.grand_total_home_currency).toFixed(2))
                                    } */}

                                                                            {Number(
                                                                                Number(
                                                                                    isNaN(
                                                                                        Number(
                                                                                            this.state.sub_total_home_currency
                                                                                        )
                                                                                    )
                                                                                        ? 0.0
                                                                                        : this.state.sub_total_home_currency
                                                                                ) +
                                                                                Number(
                                                                                    isNaN(
                                                                                        Number(this.state.tax_home_currency)
                                                                                    )
                                                                                        ? 0.0
                                                                                        : this.state.tax_home_currency
                                                                                )
                                                                            ).toFixed(2)}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>



                                                        <div className="form-group col-md-7 col-xs-12 total-table">
                                                            <table className="pull-right">
                                                                <thead>
                                                                    <tr>
                                                                        <th>&nbsp;</th>
                                                                        <th className="text-center">
                                                                            Foreign Currency
                                                                            <br />
                                                                            ( {this.state.CurrentSelectedCurr})
                                                                        </th>
                                                                        <th className="text-center">
                                                                            Home Currency
                                                                            <br />({this.state.clientHomeCurrency})
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="text-right">Sub Total</td>

                                                                        <td
                                                                            className="text-center"
                                                                        // id="homecurrencytyt"
                                                                        >
                                                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                                                { style: 'currency', currency: this.state.home_currency }).format(isNaN(jQuery('#homecurrencytyt').html()) ? "0.00" : jQuery('#homecurrencytyt').html())).replace(this.state.home_currency_symbol, '')}

                                                                        </td>
                                                                        <td


                                                                            className="text-center"
                                                                        // id="foreigncurrencytyt"
                                                                        >
                                                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                                                { style: 'currency', currency: this.state.home_currency }).format(isNaN(jQuery('#foreigncurrencytyt').html()) ? "0.00" : jQuery('#foreigncurrencytyt').html())).replace(this.state.home_currency_symbol, '')}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="text-right">Tax</td>

                                                                        <td
                                                                            className="text-center"
                                                                        // id="home_tax_total"
                                                                        >
                                                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                                                { style: 'currency', currency: this.state.home_currency }).format(isNaN(jQuery('#home_tax_total').html()) ? "0.00" : jQuery('#home_tax_total').html())).replace(this.state.home_currency_symbol, '')}

                                                                        </td>
                                                                        <td
                                                                            className="text-center"
                                                                            id="foreign_tax_total"
                                                                        >
                                                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                                                { style: 'currency', currency: this.state.home_currency }).format(isNaN(jQuery('#foreign_tax_total').html()) ? "0.00" : jQuery('#foreign_tax_total').html())).replace(this.state.home_currency_symbol, '')}

                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="text-right">Grand Total</td>

                                                                        <td
                                                                            className="text-center"
                                                                            id="home_grand_total"
                                                                        >
                                                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                                                { style: 'currency', currency: this.state.home_currency }).format(jQuery('#home_grand_total').html() == undefined ? '0.00' : jQuery('#home_grand_total').html().replace(/,/g, "")).replace(this.state.home_currency_symbol, ''))}

                                                                        </td>
                                                                        <td
                                                                            className="text-center"
                                                                            id="foreign_grand_total"
                                                                        >
                                                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                                                { style: 'currency', currency: this.state.home_currency }).format(isNaN(jQuery('#foreign_grand_total').html()) ? "0.00" : jQuery('#foreign_grand_total').html())).replace(this.state.home_currency_symbol, '')}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>




                                                        {/* for comma separation display none here and displayed below */}


                                                    </div>




                                                    {this.state.isInvoiceEditable && (
                                                        <div className="row">
                                                            <div className="form-group exchange-col col-md-5 col-xs-12"></div>
                                                            <div className="form-group col-md-7 col-xs-12 total-table">
                                                                <table className="pull-right">
                                                                    <thead
                                                                    // style={{ visibility: "hidden" }}
                                                                    >
                                                                        <tr>
                                                                            <th>&nbsp;</th>
                                                                            <th className="text-center">
                                                                                Amount Paid
                                                                                <br />
                                                                                {/* ({this.state.currency_customer}) */}(
                                                                                {this.state.CurrentSelectedCurr})
                                                                            </th>
                                                                            <th className="text-center">
                                                                                Home Currency
                                                                                <br />({this.state.clientHomeCurrency})
                                                                            </th>
                                                                        </tr>
                                                                    </thead>

                                                                    <tbody style={{ display: 'none' }}>
                                                                        <tr style={{ background: "#fff" }}>
                                                                            <td className="text-right"> Amount Paid</td>

                                                                            <td
                                                                                // style={{ textDecorationColor: "#0000ff", textDecoration: "underline", color: "#0000ff" }} 
                                                                                id="appliedfor" data-toggle="modal" data-target="#table_items" className="text-center">
                                                                                {/* <input className='form-control' disabled={true} style={{width:100}} /> */}
                                                                            </td>
                                                                            <td
                                                                                // style={{ textDecorationColor: "#0000ff", textDecoration: "underline", color: "#0000ff" }}
                                                                                data-toggle="modal" data-target="#table_items"
                                                                                // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }
                                                                                id="appliedhom"
                                                                                className="text-center"
                                                                            >
                                                                                {/* <input className='form-control' disabled={true} style={{width:100}}  id='appliedhom'/> */}
                                                                            </td>
                                                                        </tr>

                                                                        <tr style={{ background: "#fff" }}>
                                                                            <td className="text-right">
                                                                                {" "}
                                                                                Exchange Gain/Loss
                                                                            </td>

                                                                            <td className="text-center">
                                                                                {/* <input className='form-control' disabled={true} style={{width:100}} /> */}
                                                                            </td>
                                                                            <td
                                                                                // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }
                                                                                id="exchangeGain"
                                                                                className="text-center"
                                                                            >
                                                                                {/* <input className='form-control' disabled={true} style={{width:100}}  id='appliedhom'/> */}
                                                                            </td>
                                                                        </tr>

                                                                        <tr style={{ background: "#fff" }}>
                                                                            <td className="text-right">Balance Due</td>

                                                                            <td id="forbaldue" className="text-center">
                                                                                {/* <input className='form-control' disabled={true} style={{width:100}} /> */}
                                                                            </td>
                                                                            <td id="homebaldue" className="text-center">
                                                                                {/* <input className='form-control' disabled={true} style={{width:100}} /> */}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>



                                                                    {/* for comma separation display none here and displayed below */}

                                                                    <tbody>
                                                                        <tr style={{ background: "#fff" }}>
                                                                            <td className="text-right"> Amount Paid</td>

                                                                            <td style={{ cursor:"pointer",textDecorationColor: "#0000ff", textDecoration: "underline", color: "#0000ff" }}
                                                                                data-toggle="modal" data-target="#table_items" className="text-center">
                                                                                <Comma value={jQuery('#appliedfor').html()} />
                                                                            </td>
                                                                            <td
                                                                                style={{cursor:"pointer", textDecorationColor: "#0000ff", textDecoration: "underline", color: "#0000ff" }}
                                                                                data-toggle="modal" data-target="#table_items"
                                                                                className="text-center"
                                                                            ><Comma value={jQuery('#appliedhom').html()} />
                                                                            </td>
                                                                        </tr>

                                                                        <tr style={{ background: "#fff" }}>
                                                                            <td className="text-right">
                                                                                {" "}
                                                                                Exchange Gain/Loss
                                                                            </td>

                                                                            <td className="text-center">
                                                                            </td>
                                                                            <td
                                                                                className="text-center"
                                                                            >
                                                                                <Comma value={jQuery('#exchangeGain').html()} />
                                                                            </td>
                                                                        </tr>

                                                                        <tr style={{ background: "#fff" }}>
                                                                            <td className="text-right">Balance Due</td>

                                                                            <td className="text-center"><Comma value={jQuery('#forbaldue').html()} />
                                                                            </td>
                                                                            <td className="text-center"><Comma value={jQuery('#homebaldue').html()} />
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>

                                                                    {/* for comma separation display none here and displayed below */}

                                                                </table>
                                                            </div>
                                                        </div>
                                                    )}


                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="modal fade in"
                                                    id="modal_delete"
                                                    role="dialog"

                                                >
                                                    <div
                                                        class="modal-dialog modal-md"

                                                    >
                                                        <button
                                                            type="button"
                                                            class="close hidden-xs"
                                                            data-dismiss="modal"
                                                        >
                                                            <img
                                                                class="img-responsive"
                                                                src="../../images/close-red.svg"
                                                                alt="icon"
                                                            />
                                                        </button>
                                                        <div class="modal-content">
                                                            <div class="modal-body text-center success-modal">
                                                                <div class="pop-icon img-size">
                                                                    {
                                                                        <img
                                                                            src="../../images/delete-icon.svg"
                                                                            alt="icon"
                                                                        />
                                                                    }
                                                                </div>

                                                                <h3>Are you sure?</h3>

                                                                <p class="fw-500">
                                                                    Selected item will be deleted.
                                                                </p>
                                                                <button
                                                                    className="btn btn-lightgray btn-align"
                                                                    data-dismiss="modal"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <span>{"   "}</span>
                                                                <button
                                                                    class="btn btn-red btn-align"
                                                                    type="button"
                                                                    onClick={this.delete_Rows}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div
                        className='form-group col-md-4'
                        id='footeroptionthanksmessagestatus'
                      >
                        <label>Payment Exchange rate</label>
                        <input
                          type='text'
                          name='inv-no'
                          className='form-control'
                          id=''
                          required
                          placeholder={'0.00'}
                          autoComplete='off'
                          value={Number(this.state.exchange_value_ref).toFixed(
                            2
                          )}
                          disabled={true}
                        />{' '}
                        {this.state.isThanking_msg ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out thanking message.
                            </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>

                      <div
                        className='form-group col-md-4'
                        id='footeroptionthanksmessagestatus'
                      >
                        <label>Amount</label>
                        <input
                          type='text'
                          name='inv-no'
                          className='form-control'
                          id='amount'
                          required
                          placeholder={'0.00'}
                          autoComplete='off'
                          onChange={e => {
                            if (!isNaN(e.target.value)) {
                              this.setState({ amount_entered: e.target.value })
                            }
                          }}
                        />{' '}
                        {this.state.isThanking_msg ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out thanking message.
                            </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>

                      <div
                        className='form-group col-md-4'
                        id='footertermsstatus'
                      >
                        <label>Payment Method</label>
                        <select
                          className='selectpicker form-control'
                          data-live-search='true'
                          title='Choose customer'
                          id='payment_method'
                        >
                          {this.state.payment_method_list &&
                            this.state.payment_method_list.map(item => {
                              return (
                                <option value={item.name} data-status={item.id}>
                                  {item.name}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className='form-group col-md-4'>
                        <label>
                          Payment Date<span className='astrick'>*</span>
                        </label>
                        <div className='input-group date'>
                          <input
                            type='text'
                            autoComplete='off'
                            name='incorport_date'
                            id='fromdate'
                            onBlur={e => this.changeDate(e.target.value)}
                            className='form-control'
                            required
                          />
                          <div className='input-group-addon'>
                            <img src='images/calendar-icon.svg' alt='icon' />
                          </div>
                        </div>
                        
                        <small className='text-red'></small>
                      </div>
                      <div
                        className='form-group col-md-4'
                        id='termsandconditions'
                      >
                        <label>Reference</label>
                        <input
                          type='text'
                          name='inv-no'
                          className='form-control'
                          id='ref'
                          required
                          autoComplete='off'
                        />{' '}
                        {this.state.isTerms_cond_msg ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out terms and conditions.
                            </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div> */}

                                            <div className="row" style={{ display: 'none' }} >
                                                <div className="col-md-12 col-xs-12">
                                                    <div className="invoice-pay col-md-12 col-xs-12">
                                                        <p className="title">Payment Details</p>
                                                        <div className="row">
                                                            <div className="form-group col-md-4">
                                                                <label>Date of Payment</label>
                                                                <div className="input-group date">
                                                                    <input
                                                                        type="text"
                                                                        autoComplete="off"
                                                                        name="incorport_date"
                                                                        id="payment_date"
                                                                        className="form-control"
                                                                        required
                                                                    />
                                                                    <div className="input-group-addon">
                                                                        <img
                                                                            src="images/calendar-icon.svg"
                                                                            alt="icon"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                {this.state.isPaymetDate ? (
                                                                    <div >
                                                                        <small style={{ color: "red" }}>
                                                                            *Required.
                                                                        </small>
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>


                                                            <div className="form-group exchange-col col-md-4 mar-b-no">

                                                                <label>Amount of Payment</label>
                                                                <div className="w-100">
                                                                    <input
                                                                        type="text"
                                                                        name="inv-no"
                                                                        className="form-control"
                                                                        id="payable_amount"
                                                                        required
                                                                        placeholder={"0.00"}
                                                                        autoComplete="off"
                                                                        onChange={(e) => {
                                                                            if (!isNaN(e.target.value)) {
                                                                                jQuery("#payment_exchange_rate").val(
                                                                                    isNaN(
                                                                                        Number(this.state.exchange_value_ref)
                                                                                    )
                                                                                        ? ""
                                                                                        : Number(
                                                                                            this.state.exchange_value_ref
                                                                                        )
                                                                                );
                                                                                this.setState({
                                                                                    amount_entered: e.target.value,
                                                                                });
                                                                            }
                                                                        }}
                                                                    />
                                                                    <span className="label">
                                                                        {this.state.clientHomeCurrency}
                                                                    </span>
                                                                </div>
                                                                {this.state.isPayable_amount ? (
                                                                    <div >
                                                                        <small style={{ color: "red" }}>
                                                                            *Required.
                                                                        </small>
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                            <div className="form-group col-md-4">
                                                                <label>Mode of Payment</label>

                                                                <select
                                                                    className="selectpicker form-control add-new"
                                                                    data-live-search="true"
                                                                    title="Choose customer"
                                                                    id="payment_method"
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
                                                                    {this.state.payment_method_list &&
                                                                        this.state.payment_method_list.map(
                                                                            (item) => {
                                                                                return (
                                                                                    <option
                                                                                        value={item.name}
                                                                                        data-status={item.id}
                                                                                    >
                                                                                        {item.name}
                                                                                    </option>
                                                                                );
                                                                            }
                                                                        )}
                                                                </select>
                                                                {this.state.isPaymentMethod ? (
                                                                    <div >
                                                                        <small style={{ color: "red" }}>
                                                                            *Required.
                                                                        </small>
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="row" >
                                                            <div className="form-group col-md-4 mar-b-no">
                                                                <label>Payment Reference</label>
                                                                <input
                                                                    type="text"
                                                                    name="inv-no"
                                                                    className="form-control"
                                                                    id="reference"
                                                                    required
                                                                    autoComplete="off"
                                                                />{" "}
                                                            </div>
                                                            <div className="form-group col-md-4 mar-b-no">
                                                                <label>Description</label>
                                                                <input
                                                                    type="text"
                                                                    name="inv-no"
                                                                    className="form-control"
                                                                    value={this.state.payment_desc}
                                                                    id="desc_pay"
                                                                    required
                                                                    onChange={this.desChange}
                                                                    autoComplete="off"
                                                                />{" "}
                                                            </div>
                                                            <div className="form-group exchange-col col-md-4 mar-b-no">
                                                                <label>
                                                                    Exchange Rate 1{" "}
                                                                    {this.state.CurrentSelectedCurr}
                                                                </label>
                                                                <div className="w-100">
                                                                    <input
                                                                        type="text"
                                                                        name="inv-no"
                                                                        id="payment_exchange_rate"
                                                                        className="form-control"
                                                                        required
                                                                        autoComplete="off"
                                                                    // defaultValue={Number(this.state.exchange_value_ref).toFixed(2)}
                                                                    // disabled={true}
                                                                    />{" "}
                                                                    <span className="label">
                                                                        {this.state.clientHomeCurrency}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row" >
                                                            <div className="form-group col-md-4  ">
                                                                <label>Payment Account</label>
                                                                <select
                                                                    className="selectpicker form-control add-new"
                                                                    data-live-search="true"
                                                                    title="Choose "
                                                                    value={this.state.cate_id}
                                                                    // value={this.state.pay_acc}
                                                                    id="balanceSheetCategeory"
                                                                    onChange={(e) => {
                                                                        if (e.target.value == "1e") {
                                                                            jQuery("#balanceSheetCategeory option")
                                                                                .prop("selected", false)
                                                                                .trigger("change");
                                                                            jQuery("#balanceSheetCategeory").val("");
                                                                            window.jQuery("#pop-modal").modal("show");
                                                                        } else {
                                                                            this.state.balancesheetlist.forEach(
                                                                                (item, i) => {
                                                                                    if (item.id == e.target.value) {
                                                                                        const string = item.name;
                                                                                        const Payable = string.includes(
                                                                                            "ayable"
                                                                                        );
                                                                                        const Receivable = string.includes(
                                                                                            "eceivable"
                                                                                        );
                                                                                        if (
                                                                                            item.account_type_id == "5" ||
                                                                                            item.account_type_id == "2"
                                                                                        ) {
                                                                                            this.setState({
                                                                                                isThirdPartyName: true,
                                                                                            });
                                                                                            if (item.account_type_id == "5") {
                                                                                                this.setState({
                                                                                                    thrird_party_type: 2,
                                                                                                });
                                                                                                this.fetchThirdPartyNames(5);
                                                                                            }
                                                                                            if (item.account_type_id == "2") {
                                                                                                this.setState({
                                                                                                    thrird_party_type: 1,
                                                                                                });

                                                                                                this.fetchThirdPartyNames(2);
                                                                                            }
                                                                                        } else {
                                                                                            this.setState({
                                                                                                isThirdPartyName: false,
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                }
                                                                            );

                                                                            //  const matchedList= this.state.balancesheetlist.filter(item=>item[e.target.value]==e.target.value)
                                                                        }
                                                                    }}
                                                                >
                                                                    <option value="1e"> Add New </option>
                                                                    {this.state.balancesheetlist &&
                                                                        this.state.balancesheetlist.map((item) => {
                                                                            return (
                                                                                <option
                                                                                    value={item.id}
                                                                                    data-status={item.name}
                                                                                >
                                                                                    {item.name}
                                                                                </option>
                                                                            );
                                                                        })}
                                                                </select>
                                                                {this.state.isbalanceSheetcatId ? (
                                                                    <div >
                                                                        <small style={{ color: "red" }}>
                                                                            *Required.
                                                                        </small>
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                            {this.state.isThirdPartyName && (

                                                                <div className="form-group col-md-4">
                                                                    <label>Third Party Account Name</label>
                                                                    <select
                                                                        className="selectpicker form-control add-new"
                                                                        data-live-search="true"
                                                                        title="Choose..."
                                                                        id="third_account_id"
                                                                        value={this.state.third_party_value}
                                                                        onChange={(e) => {
                                                                            this.setState({
                                                                                third_party_value: e.target.value,
                                                                            });
                                                                            // alert( jQuery("#third_account_id").val())
                                                                            if (
                                                                                jQuery("#third_account_id").val() ==
                                                                                "new"
                                                                            ) {
                                                                                if (this.state.thrird_party_type == 1) {
                                                                                    localStorage.setItem(
                                                                                        "comes_from",
                                                                                        "third_party"
                                                                                    );
                                                                                    let win = window.open(
                                                                                        "/add-new-customer",
                                                                                        "_blank"
                                                                                    );
                                                                                    win.focus();
                                                                                }
                                                                                if (this.state.thrird_party_type == 2) {
                                                                                    localStorage.setItem(
                                                                                        "comes_from",
                                                                                        "third_party"
                                                                                    );
                                                                                    let win = window.open(
                                                                                        "/add_new_vendor",
                                                                                        "_blank"
                                                                                    );
                                                                                    win.focus();
                                                                                }
                                                                                // alert( 'in')
                                                                            }
                                                                        }}
                                                                    >
                                                                        {/* <option>Create New </option> */}
                                                                        {/* <option value="new">Add New</option> */}
                                                                        <option value="new">Add New</option>
                                                                        {this.state.third_party_account_list &&
                                                                            this.state.third_party_account_list.map(
                                                                                (item) => {
                                                                                    return (
                                                                                        <option
                                                                                            value={item.id}
                                                                                            data-status={item.name}
                                                                                        >
                                                                                            {item.name}
                                                                                        </option>
                                                                                    );
                                                                                }
                                                                            )}
                                                                    </select>
                                                                    {this.state.is3partyAccRequired ? (
                                                                        <div >
                                                                            <small style={{ color: "red" }}>
                                                                                *Required.
                                                                            </small>
                                                                        </div>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>

                                                            )}
                                                        </div>



                                                        {/* <div className='row'>
{this.state.isThirdPartyName && (
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Third Party Account Name</label>
                            <select
                              className='selectpicker form-control add-new'
                              data-live-search='true'
                              title='Choose...'
                              id='third_account_id'
                            >
                              <option>Create New </option>
                              {this.state.third_party_account_list &&
                                this.state.third_party_account_list.map(
                                  item => {
                                    return (
                                      <option
                                        value={item.id}
                                        data-status={item.id}
                                      >
                                        {item.name}
                                      </option>
                                    )
                                  }
                                )}
                            </select>
                          </div>
                        )}

</div>

                      
                      
                       */}
                                                    </div>
                                                </div>
                                            </div>





                                            <div className="row">

                                                {this.state.customFieldB && this.state.customFieldB.map((item, i) => {

                                                    return (
                                                        <>
                                                            {item.type == 'text' &&
                                                                <div
                                                                    className="form-group col-md-4"
                                                                // id="itemoptioninvoicenostatus"
                                                                >
                                                                    <label>{item.name}</label>
                                                                    <input
                                                                        type="text"
                                                                        name="inv-no"
                                                                        className="form-control"
                                                                        value={this.state[`customFieldB${i}`]}
                                                                        required
                                                                        autoComplete="off"
                                                                        onChange={(e) => {
                                                                            this.setState({ [`customFieldB${i}`]: e.target.value })
                                                                            setTimeout(() => {
                                                                                this.customValues()
                                                                            }, 500);
                                                                        }}
                                                                    />{" "}

                                                                </div>
                                                            }
                                                            {item.type == 'date' &&
                                                                <div className="form-group col-md-4">
                                                                    <label>{item.name}<span className="astrick">*</span></label>
                                                                    <div className="input-group date mar-t-no">
                                                                        <input
                                                                            type="text"
                                                                            autoComplete="off"
                                                                            value={this.state[`customField${i}`]}
                                                                            id={`customFieldB${i}`}
                                                                            onBlur={() => {
                                                                                setTimeout(() => {
                                                                                    //   alert(`#customFieldB${i}`) 
                                                                                    //  alert(jQuery(`#customFieldB${i}`).val()) 
                                                                                    let a = jQuery(`#customFieldB${i}`).val()
                                                                                    this.setState({ [`customFieldB${i}`]: a }, () => this.customValues())
                                                                                }, 1000);
                                                                            }
                                                                            }
                                                                            // value={this.state[`customFieldB${i}`]}
                                                                            // onChange={e => {
                                                                            //     this.setState({ [`customFieldB${i}`]: e.target.value })
                                                                            //     setTimeout(() => {
                                                                            //         this.customValues()
                                                                            //     }, 500);
                                                                            // }
                                                                            // }
                                                                            className="form-control"
                                                                            required
                                                                        />
                                                                        <div className="input-group-addon" onClick={() => jQuery(`#customFieldB${i}`).focus()}>
                                                                            <img src="images/calendar-icon.svg" alt="icon" />
                                                                        </div>
                                                                    </div>
                                                                    <small className="text-red"></small>
                                                                </div>
                                                            }
                                                            {item.type == 'dropDown' &&
                                                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                                    <label>{item.name}</label>

                                                                    <select
                                                                        className="selectpicker form-control add-new"
                                                                        data-live-search="true"
                                                                        title="Choose..."
                                                                        value={this.state[`customFieldB${i}`]}
                                                                        onChange={(e) => {
                                                                            let value = e.target.value
                                                                            if (value == 'new') {
                                                                                window.jQuery("#custom_column_options1").modal("show");
                                                                                this.setState({ idx: i })
                                                                            } else {
                                                                                this.setState({ [`customFieldB${i}`]: value })
                                                                                setTimeout(() => {
                                                                                    this.customValues()
                                                                                }, 500);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <option value='new'> Create New </option>
                                                                        {this.state.customFieldB[i].options &&
                                                                            this.state.customFieldB[i].options.map((item) => {
                                                                                return (
                                                                                    <option
                                                                                        value={item}
                                                                                    >
                                                                                        {item}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                    </select>

                                                                </div>
                                                            }
                                                        </>
                                                    )
                                                })}

                                            </div>






                                            <div className='row'>
                                                <div
                                                    className="form-group col-md-4"
                                                    id="termsandconditions"
                                                >
                                                    <label>Amount In Words</label>
                                                    <textarea
                                                        type="text"
                                                        name="inv-no"
                                                        className="form-control"
                                                        id="amount_in_words"
                                                        required
                                                        autoComplete="off"
                                                        disabled="true"
                                                        defaultValue={toWords.convert(0)}
                                                    />{" "}
                                                    {this.state.isTerms_cond_msg ? (
                                                        <div>
                                                            <small style={{ color: "red" }}>*Required.</small>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                                <div
                                                    className="form-group col-md-4"
                                                    id="footeroptionthanksmessagestatus"
                                                >
                                                    <label>Thank you message and Banking details</label>
                                                    <textarea
                                                        id="footeroptionthanksmessages"
                                                        className="form-control"
                                                        defaultValue={""}
                                                        required
                                                    />{" "}
                                                    {this.state.isThanking_msg ? (
                                                        <div >
                                                            <small style={{ color: "red" }}>*Required.</small>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div
                                                    className="form-group col-md-4"
                                                    id="termsandconditions"
                                                >
                                                    <label>Terms &amp; Conditions</label>
                                                    <textarea
                                                        id="termcondmsg"
                                                        className="form-control"
                                                        defaultValue={""}
                                                        required
                                                    />
                                                    {this.state.isTerms_cond_msg ? (
                                                        <div >
                                                            <small style={{ color: "red" }}>*Required.</small>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                            {/* Modal Wrapper Starts here */}
                                            <div
                                                className="modal pop-modal fade"
                                                id="editCol"
                                                role="dialog"
                                            >
                                                <div className="modal-dialog modal-md">
                                                    {/* Modal content*/}
                                                    <button
                                                        type="button"
                                                        className="close hidden-xs"
                                                        data-dismiss="modal"
                                                    >
                                                        <img
                                                            className="img-responsive"
                                                            src="images/close-red.svg"
                                                            alt="icon"
                                                        />
                                                    </button>

                                                    {/* <CoulmnRearrage/> */}

                                                    {/* <div className='modal-content'>
                        <div className='modal-body'>
                          <h3>Edit Column</h3>
                          <div className='sortable-enclose row'>
                            <div className='col-md-12'>
                              <div className='row-head col-md-12 col-xs-12'>
                                <div className='col-sm-10 col-xs-8'>
                                  Column Label
                                </div>
                                <div className='col-sm-2 col-xs-4 text-center'>
                                  Show
                                </div>
                              </div>
                              <div className='row-body col-md-12 col-xs-12'>
                                <div className='row-item row'>
                                  <div className='col-sm-10 col-xs-8'>
                                    <span className='drag-icon'>
                                      <img
                                        src='images/dots-menu.svg'
                                        alt='icon'
                                      />
                                    </span>
                                    <div className='custom-col-lab'>
                                      <span contentEditable='true'>
                                        Custom Column
                                      </span>
                                      <div className='pull-right'>
                                        <button className='btn'>
                                          <img
                                            src='images/tick-green.svg'
                                            alt='icon'
                                          />
                                        </button>
                                        <button className='btn'>
                                          <img
                                            src='images/cross-red.svg'
                                            alt='icon'
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-sm-2 col-xs-4 text-center'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        name
                                        defaultChecked='checked'
                                      />
                                      <span className='checkmark' />
                                    </label>
                                    <a
                                      href='javascript:;'
                                      className='del-row'
                                    >
                                      <img
                                        className='img-responsive'
                                        src='images/delete-icon.svg'
                                        alt='icon'
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className='row-item row'>
                                  <div className='col-sm-10 col-xs-8'>
                                    <span className='drag-icon'>
                                      <img
                                        src='images/dots-menu.svg'
                                        alt='icon'
                                      />
                                    </span>
                                    <div className='custom-col-lab'>
                                      <span contentEditable='true'>
                                        Custom Column One
                                      </span>
                                      <div className='pull-right'>
                                        <button className='btn'>
                                          <img
                                            src='images/tick-green.svg'
                                            alt='icon'
                                          />
                                        </button>
                                        <button className='btn'>
                                          <img
                                            src='images/cross-red.svg'
                                            alt='icon'
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-sm-2 col-xs-4 text-center'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        name
                                        defaultChecked='checked'
                                      />
                                      <span className='checkmark' />
                                    </label>
                                    <a
                                      href='javascript:;'
                                      className='del-row'
                                    >
                                      <img
                                        className='img-responsive'
                                        src='images/delete-icon.svg'
                                        alt='icon'
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className='row-item row'>
                                  <div className='col-sm-10 col-xs-8'>
                                    <span className='drag-icon'>
                                      <img
                                        src='images/dots-menu.svg'
                                        alt='icon'
                                      />
                                    </span>
                                    <div className='custom-col-lab'>
                                      <span contentEditable='true'>
                                        Custom Column Two
                                      </span>
                                      <div className='pull-right'>
                                        <button className='btn'>
                                          <img
                                            src='images/tick-green.svg'
                                            alt='icon'
                                          />
                                        </button>
                                        <button className='btn'>
                                          <img
                                            src='images/cross-red.svg'
                                            alt='icon'
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-sm-2 col-xs-4 text-center'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        name
                                        defaultChecked='checked'
                                      />
                                      <span className='checkmark' />
                                    </label>
                                    <a
                                      href='javascript:;'
                                      className='del-row'
                                    >
                                      <img
                                        className='img-responsive'
                                        src='images/delete-icon.svg'
                                        alt='icon'
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className='row-item row'>
                                  <div className='col-sm-10 col-xs-8'>
                                    <span className='drag-icon'>
                                      <img
                                        src='images/dots-menu.svg'
                                        alt='icon'
                                      />
                                    </span>
                                    <div className='custom-col-lab'>
                                      <span contentEditable='true'>
                                        Custom Column Three
                                      </span>
                                      <div className='pull-right'>
                                        <button className='btn'>
                                          <img
                                            src='images/tick-green.svg'
                                            alt='icon'
                                          />
                                        </button>
                                        <button className='btn'>
                                          <img
                                            src='images/cross-red.svg'
                                            alt='icon'
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-sm-2 col-xs-4 text-center'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        name
                                        defaultChecked='checked'
                                      />
                                      <span className='checkmark' />
                                    </label>
                                    <a
                                      href='javascript:;'
                                      className='del-row'
                                    >
                                      <img
                                        className='img-responsive'
                                        src='images/delete-icon.svg'
                                        alt='icon'
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className='row-item row'>
                                  <div className='col-sm-10 col-xs-8'>
                                    <span className='drag-icon'>
                                      <img
                                        src='images/dots-menu.svg'
                                        alt='icon'
                                      />
                                    </span>
                                    <div className='custom-col-lab'>
                                      <span contentEditable='true'>
                                        Custom Column Four
                                      </span>
                                      <div className='pull-right'>
                                        <button className='btn'>
                                          <img
                                            src='images/tick-green.svg'
                                            alt='icon'
                                          />
                                        </button>
                                        <button className='btn'>
                                          <img
                                            src='images/cross-red.svg'
                                            alt='icon'
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-sm-2 col-xs-4 text-center'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        name
                                        defaultChecked='checked'
                                      />
                                      <span className='checkmark' />
                                    </label>
                                    <a
                                      href='javascript:;'
                                      className='del-row'
                                    >
                                      <img
                                        className='img-responsive'
                                        src='images/delete-icon.svg'
                                        alt='icon'
                                      />
                                    </a>
                                  </div>
                                </div>
                             
                             
                             
                              </div>
                            </div>
                      
                      
                          </div>
                          <div className='btn-sec pad-no mar-no text-center'>
                            <hr />
                            <button className='btn btn-lightgray'>
                              Cancel
                            </button>
                            <button className='btn btn-green'>Update</button>
                          </div>
                        </div>
                      
                      
                      </div>
                   
                    */}
                                                </div>
                                            </div>

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
                                                            <h3>Add New Column</h3>
                                                            <form className="custom-form row">
                                                                <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                                                    <div className="col-md-4 col-sm-4 col-xs-12">
                                                                        <label>Type Of the Editable Field</label>
                                                                    </div>
                                                                    <div className="col-md-8 col-sm-8 col-xs-12">
                                                                        <label className="custom-checkbox radio mar-rgt taxable">
                                                                            <input
                                                                                type="radio"
                                                                                name="editableField"
                                                                                value="textField"
                                                                                checked={
                                                                                    this.state.selectedColumnType ===
                                                                                    "textField"
                                                                                }
                                                                                onChange={THIS.typeOfColumnTobeModified}
                                                                            />
                                                                            Text
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                        <label className="custom-checkbox radio non-taxable">
                                                                            <input
                                                                                type="radio"
                                                                                name="editableField"
                                                                                value="dropDownField"
                                                                                checked={
                                                                                    this.state.selectedColumnType ===
                                                                                    "dropDownField"
                                                                                }
                                                                                onChange={THIS.typeOfColumnTobeModified}
                                                                            />{" "}
                                                                            Drop Down
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                                                    <div className="col-md-4 col-sm-4 col-xs-12">
                                                                        <label>Coulmn Name</label>
                                                                    </div>
                                                                    <div className="col-md-8 col-sm-8 col-xs-12">
                                                                        <input
                                                                            autoComplete="off"
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="coulmn_name"
                                                                        />
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
                                                                        className="btn btn-lightgray btn-align"
                                                                        data-dismiss="modal"
                                                                        onClick={this.modal_cancel}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <span>{"   "}</span>
                                                                    <button
                                                                        className="btn btn-green btn-align"
                                                                        type="button"
                                                                        onClick={THIS.add_coulmn}
                                                                    >
                                                                        Save
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pf-btm-wrap">

                                                <div className="col-md-6 col-sm-6 col-xs-12 pad-no">
                                                    {this.state.isInvoiceEditable && <button
                                                        className="btn btn-empty ico"
                                                        // onClick={this.convertHtmlToPdf.bind(this)}
                                                        onClick={() => this.saveAsPdf()}
                                                    // onClick={() => this.print()}
                                                    >
                                                        <img src="images/print-icon.svg" alt="icon" />
                                                        Print
                                                    </button>}

                                                    {/* {this.state.isInvoiceEditable && <button
                                                        type="button"
                                                        className="btn btn-empty ico"
                                                        // onClick={this.convertHtmlToPdf.bind(this)}
                                                        onClick={() => this.saveAsPdf()}
                                                    >
                                                        <img src="images/pdf-icon.svg" alt="icon" />
                                                        Save as PDF
                                                    </button>} */}
                                                    {this.state.isInvoiceEditable &&
                                                        <button
                                                            type="button"
                                                            className="btn btn-empty ico"
                                                            // onClick={this.convertHtmlToPdf.bind(this)}
                                                            onClick={() => this.frontPrint()}
                                                        >
                                                            <img src="images/pdf-icon.svg" alt="icon" />
                                                            {/* Front Print */}
                                                            Save as PDF
                                                        </button>
                                                    }
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12 text-right pad-no pull-right">
                                                    {this.state.isInvoiceEditable &&
                                                        <>
                                                            <button className="btn btn-green dropdown-toggle btn useDRP mar-rgt-5" type="button" data-toggle="dropdown">Action
                                                                <span className="caret" /></button>
                                                            <ul className="dropdown-menu category">
                                                                <li><a onClick={() => { this.changeSalestoinvoice("copy") }} >Create a copy</a></li>
                                                                <li><a data-toggle="modal" data-target="#modal_delete_invoice"
                                                                // onClick={() => this.delete_or_void_sales_order(10)} 
                                                                >Delete</a></li>
                                                                <li><a data-toggle="modal" data-target="#modal_void_invoice"
                                                                // onClick={() => this.delete_or_void_sales_order(11)} 
                                                                >Void</a></li>
                                                                <li><a data-toggle="modal" data-target="#modal-new" >Create invoice</a></li>
                                                                <li><a data-toggle="modal" data-target="#modal-autoinvoice" >Auto invoice</a></li>
                                                            </ul>
                                                        </>

                                                    }
                                                    <button
                                                        className="btn btn-lightgray btn-align"
                                                        type="button"
                                                        onClick={() => {
                                                            window.close()
                                                            // this.props.history.push("/all_lists");
                                                        }}
                                                    >
                                                        Close
                                                    </button>
                                                    {"  "}
                                                    {/* {!this.state.isInvoiceEditable &&  */}
                                                    <button
                                                        className="btn btn-yellow mar-rgt-5 btn-align"
                                                        type="button"
                                                        onClick={(e) => this.save_template(e, "saveandnew")}
                                                    >
                                                        Save &amp; New
                                                    </button>
                                                    {/* } */}

                                                    {/* {!this.state.isInvoiceEditable &&  */}
                                                    <input
                                                        className="btn btn-green  mar-rgt-5 btn-align"
                                                        type="button"
                                                        value="Save "
                                                        onClick={(e) => this.save_template(e, "save")}
                                                    />
                                                    {/* } */}
                                                </div>
                                            </div>



                                            {/* <div id='data_result1'>
                    {HTMLReactParser(this.state.html_content)}
                  </div> */}
                                        </form>
                                    </div>
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
                                                className="btn btn-lightgray btn-align"
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
                                                className="btn btn-green btn-align"
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
                                                                // alert(response.message)
                                                                if (response.status === 1) {
                                                                    this.setState({ pay_method: response.name })
                                                                    this.getPaymethod();
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

                    <div className="modal fade pop-modal" id="add_new_role" role="dialog">
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
                                                    id="options"
                                                    placeholder="Enter options seperate by comma"
                                                />
                                                <div >
                                                    {this.state.roleStringLen && (
                                                        <small style={{ color: "red" }}>*Required.</small>
                                                    )}
                                                </div>{" "}
                                            </div>
                                        </div>

                                        <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                                            <button
                                                className="btn btn-lightgray btn-align"
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
                                                className="btn btn-green btn-align"
                                                type="button"
                                                onClick={() => {
                                                    const userId = Number(THIS.state.logged_user_id);
                                                    const coulmnId = Number(jQuery("#colid").val());
                                                    const localString = jQuery("#options").val();
                                                    const optionsArray = localString.split(",");
                                                    var items = this.state.number_of_columns_list;
                                                    var exist = items[coulmnId].options;
                                                    var options = [...exist, ...optionsArray];
                                                    items[coulmnId]["options"] = options;

                                                    var coreData = {
                                                        user_id: this.state.logged_user_id,
                                                        columns: items,
                                                        client_id: this.state.logged_client_id
                                                    };

                                                    FetchAllApi.upDateCoulmns(
                                                        coreData,
                                                        (err, response) => {
                                                            alert(response.message);
                                                            if (response.status === 1) {
                                                                this.getColumns();

                                                                jQuery("#options").val("");
                                                                window.jQuery("#add_new_role").modal("hide");
                                                                //   this.setState({ items: response.list[0].columns })
                                                                this.setState({})
                                                            } else {
                                                            }
                                                        }
                                                    );
                                                    // FetchAllApi.invoiceadd_dropdown_options(
                                                    //   userId,
                                                    //   coulmnId,
                                                    //   optionsArray,
                                                    //   (err, response) => {

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

                    <div className="modal fade pop-modal" id="add_items" role="dialog">
                        <div className="modal-dialog modal-md custom-modal">
                            <button
                                type="button"
                                className="close hidden-xs"
                                data-dismiss="modal"
                                onClick={() => {
                                    jQuery("#item_categeory option")
                                        .prop("selected", false)
                                        .trigger("change");
                                    jQuery("#item_text").val("");
                                    jQuery("#item_rate").val("");
                                    jQuery("#hiddenCategID").val("");
                                    jQuery("#item_descrption").val("");
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
                                    <h3>Add New Items</h3>
                                    <form className="custom-form row">
                                        <div className="form-group col-md-12 col-xs-12 pad-no ">
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <label>Item Name</label>
                                            </div>
                                            <div className="col-md-8 col-sm-8 col-xs-12">
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="item_text"
                                                />
                                                <div >
                                                    {this.state.roleStringLen && (
                                                        <small style={{ color: "red" }}>*Required.</small>
                                                    )}
                                                </div>{" "}
                                            </div>
                                        </div>

                                        <div className="form-group col-md-12 col-xs-12 pad-no ">
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <label>Rate</label>
                                            </div>
                                            <div className="col-md-8 col-sm-8 col-xs-12">
                                                <input
                                                    autoComplete="off"
                                                    type="number"
                                                    className="form-control"
                                                    id="item_rate"
                                                />
                                                <input
                                                    type="hidden"
                                                    className="form-control"
                                                    id="iamfrom"
                                                />
                                                <div >
                                                    {this.state.roleStringLen && (
                                                        <small style={{ color: "red" }}>*Required.</small>
                                                    )}
                                                </div>{" "}
                                            </div>
                                        </div>

                                        <div className="form-group col-md-12 col-xs-12 pad-no ">
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <label>Description</label>
                                            </div>
                                            <div className="col-md-8 col-sm-8 col-xs-12">
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control"
                                                    id="item_descrption"
                                                />
                                                <div >
                                                    {this.state.roleStringLen && (
                                                        <small style={{ color: "red" }}>*Required.</small>
                                                    )}
                                                </div>{" "}
                                            </div>
                                        </div>

                                        <div className="form-group col-md-12 col-xs-12 pad-no ">
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <label>Category</label>
                                            </div>
                                            <div className="col-md-8 col-sm-8 col-xs-12">
                                                <select
                                                    className="selectpicker form-control add-new kk"
                                                    data-live-search="true"
                                                    title="Choose Category"
                                                    id="item_categeory"
                                                    onChange={(e) => {
                                                        if (e.target.value == "1e") {
                                                            window.jQuery("#pop-modal").modal("show");
                                                        } else {
                                                            jQuery("#hiddenCategID").val(e.target.value);
                                                        }
                                                    }}
                                                >
                                                    <option value="1e">Add New </option>
                                                    {THIS.state.default_category_list &&
                                                        THIS.state.default_category_list.map((item, k) => {
                                                            var usee = item.name;
                                                            if (usee.includes(this.state.nameFilter)) {
                                                                // alert(this.state.nameFilter)
                                                                var selected = true;
                                                                jQuery("#hiddenCategID").val(item.id);

                                                                // jQuery('.kk').val(item.id)
                                                            }

                                                            // if(this.state.selectNeedIndex==k){
                                                            //    var usee=item.name

                                                            //   // jQuery('.kk').val(item.id)
                                                            //   // setTimeout(()=>{
                                                            //     // jQuery('#item_categeory').val(item.id)
                                                            //   // },3000)

                                                            //   if(this.state.selectNeedIndex !='empty'){
                                                            //     this.setState({selectNeedIndex:'empty'})

                                                            //   }
                                                            // }else{
                                                            //   var selected=false

                                                            // }
                                                            return (
                                                                <option
                                                                    selected={selected}
                                                                    value={item.id}
                                                                    data-status={item.id}
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            );
                                                        })}
                                                </select>
                                                <input
                                                    autoComplete="off"
                                                    type="hidden"
                                                    className="form-control"
                                                    id="hiddenCategID"
                                                    placeholder="Enter new item"
                                                />
                                                <div >
                                                    {this.state.roleStringLen && (
                                                        <small style={{ color: "red" }}>*Required.</small>
                                                    )}
                                                </div>{" "}
                                            </div>
                                        </div>

                                        <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                                            <button
                                                className="btn btn-lightgray btn-align"
                                                data-dismiss="modal"
                                                onClick={() => {
                                                    this.setState({ roleStringLen: false });
                                                    jQuery("#item_categeory option")
                                                        .prop("selected", false)
                                                        .trigger("change");

                                                    jQuery("#item_text").val("");
                                                    jQuery("#item_rate").val("");
                                                    jQuery("#hiddenCategID").val("");
                                                    jQuery("#item_descrption").val("");
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <span>{"   "}</span>
                                            <input type="hidden" id="colid" />

                                            <button
                                                className="btn btn-green btn-align"
                                                type="button"
                                                onClick={() => {
                                                    const item = jQuery("#item_text").val();
                                                    const item_descrption = jQuery(
                                                        "#item_descrption"
                                                    ).val();

                                                    const item_rate = jQuery("#item_rate").val();
                                                    const item_categeory = jQuery("#hiddenCategID").val();

                                                    var coreData = {
                                                        client_id: this.state.logged_client_id,
                                                        item_name: item,
                                                        category_id: item_categeory,
                                                        rate: item_rate,
                                                        description: item_descrption,
                                                    };

                                                    FetchAllApi.addItems(coreData, (err, response) => {

                                                        if (response.status === 1) {
                                                            this.getItems(
                                                                jQuery("#item_text").val(),
                                                                jQuery("#iamfrom").val()
                                                            );

                                                            alert("success");
                                                            this.setState({ roleStringLen: false });
                                                            jQuery("#item_categeory option")
                                                                .prop("selected", false)
                                                                .trigger("change");

                                                            jQuery("#item_text").val("");
                                                            jQuery("#item_rate").val("");
                                                            jQuery("#hiddenCategID").val("");
                                                            jQuery("#item_descrption").val("");
                                                            window.jQuery("#add_items").modal("hide");
                                                        } else  if (response.status === 0) {
                                                            alert(response.message);
                                                          }
                                                    });
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


                    <div className="modal fade pop-modal" id="modal-new" role="dialog">
                        <div className="modal-dialog modal-xs custom-modal">
                            {/* Modal content*/}
                            <button type="button" className="close hidden-xs" data-dismiss="modal">
                                <img className="img-responsive" src="images/close-red.svg" alt="icon" />
                            </button>
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <h3>Specify what to include on the invoice</h3>
                                    <form className="custom-form row column">
                                        <div className="form-group col-md-12 col-xs-12">
                                            <div className="check-row">
                                                <label className="custom-checkbox radio">
                                                    <input type="radio" name="mail-address" onClick={() => { this.setState({ radio: "all" }) }} />
                                                    <span>Create invoice for all items</span>
                                                    <span className="checkmark" />
                                                </label>
                                                <label className="custom-checkbox radio">
                                                    <input type="radio" name="mail-address" onClick={() => { this.setState({ radio: "selected" }) }} />
                                                    <span>Create invoice for selected items</span>
                                                    <span className="checkmark" />
                                                </label>
                                            </div>

                                        </div>
                                        <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                                            <button className="btn btn-lightgray mar-rgt-5" data-dismiss="modal">Cancel</button>
                                            <button type="button" className="btn btn-green mar-rgt-5" data-dismiss="modal" onClick={(e) => {
                                                if (this.state.radio == "selected") {
                                                    window.jQuery('#table_items_pop_up').modal('show');
                                                } else {
                                                    this.changeSalestoinvoiceAll();
                                                }
                                            }} >OK</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade pop-modal" id="table_items_pop_up" role="dialog" >
                        <div className="modal-dialog modal-md custom-modal" style={{ width: "80%" }}>
                            <button
                                type="button"
                                className="close hidden-xs"
                                data-dismiss="modal"

                            >
                                <img
                                    className="img-responsive"
                                    src="../../images/close-red.svg"
                                    alt="icon"
                                />
                            </button>
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <h3>Table of Items</h3>
                                    <form className="custom-form row">
                                        <div className="form-group col-md-12 col-xs-12 pad-no ">
                                            <table className="table detail-report">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th className="text-left">
                                                            Item
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                        </th>
                                                        <th>
                                                            Description
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                        </th>
                                                        <th className="text-right">
                                                            Unit Price
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                        </th>
                                                        <th className="text-right">
                                                            Quantity
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                        </th>
                                                        <th className="text-right">
                                                            Tax
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                        </th>
                                                        <th className="text-right">
                                                            Total
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                        </th>
                                                        <th className="text-right">
                                                            Category
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.myarray.map((data, idx) => {
                                                        return (
                                                            <tr>
                                                            {/*  */}
                                                                <td className="text-left-imp" >
                                                                    <label className="custom-checkbox small mar-t-no">
                                                                        <input type="checkbox" name="all" onClick={() => { this.popup_check_cal(0, idx) }} />&nbsp;
                                                                        <span className="checkmark" />
                                                                    </label>
                                                                </td>
                                                                <td className="text-left-imp" >{data.item_name}</td>
                                                                <td className="text-left">{data.descr}</td>
                                                                <td className="text-center">{data.unit_price}</td>
                                                                <td className="text-center">{data.quantity}</td>
                                                                <td>{data.tax_name}</td>
                                                                <td>{data.item_total}</td>
                                                                <td>{this.state.default_category_list.map((cat) => {
                                                                    if (data.category_id == cat.id) {
                                                                        return cat.name
                                                                    }
                                                                })}</td>

                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                                            <button className="btn btn-lightgray mar-rgt-5" data-dismiss="modal">Cancel</button>
                                            <input type="button" data-toggle="modal" data-target="#table_items_pop_up" className="btn btn-green mar-rgt-5" value="OK" onClick={() => { this.changeSalestoinvoice("invoice") }} />
                                        </div>
                                    </form>
                                </div>





                            </div>
                        </div>
                    </div>








                    {/* modal for asking delete invoice */}


                    <div>
                        <div
                            class="modal fade in"
                            id="modal_delete_invoice"
                            role="dialog"
                            style={{ paddingLeft: 15 }}
                        >
                            <div class="modal-dialog modal-md" style={{ width: 440 }}>
                                <button
                                    type="button"
                                    class="close hidden-xs"
                                    data-dismiss="modal"
                                >
                                    <img
                                        class="img-responsive"
                                        src="../../images/close-red.svg"
                                        alt="icon"
                                    />
                                </button>
                                <div class="modal-content">
                                    <div class="modal-body text-center success-modal">
                                        <div class="pop-icon img-size">
                                            {<img src="../../images/delete-icon.svg" alt="icon" />}
                                        </div>

                                        <h3>Are you sure?</h3>

                                        <p class="fw-500">This invoice will be deleted </p>
                                        <button
                                            className="btn btn-lightgray btn-align"
                                            data-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <span>{"   "}</span>
                                        <button
                                            class="btn btn-red btn-align"
                                            type="button"
                                            // data-dismiss="modal"
                                            // data-toggle="modal" data-target="#asking_password_for_delete"

                                            onClick={() => this.delete_or_void_sales_order(10)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* modal for asking delete invoice    */}




                    {/* modal for paid_invoice_delete_modal  */}


                    <div>
                        <div
                            class="modal fade in"
                            id="paid_invoice_delete_modal"
                            role="dialog"
                            style={{ paddingLeft: 15 }}
                        >
                            <div class="modal-dialog modal-md" style={{ width: 440 }}>
                                <button
                                    type="button"
                                    class="close hidden-xs"
                                    data-dismiss="modal"
                                >
                                    <img
                                        class="img-responsive"
                                        src="../../images/close-red.svg"
                                        alt="icon"
                                    />
                                </button>
                                <div class="modal-content">
                                    <div class="modal-body text-center success-modal">
                                        <div class="pop-icon img-size">
                                            {<img src="../../images/delete-icon.svg" alt="icon" />}
                                        </div>

                                        <h3>Are you sure?</h3>

                                        <p class="fw-500"> {this.state.delete_alert_msg} </p>
                                        <button
                                            className="btn btn-lightgray btn-align"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                window.jQuery('#paid_invoice_delete_modal').modal('hide')
                                                window.jQuery('#modal_delete_invoice').modal('hide')
                                            }
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <span>{"   "}</span>
                                        <button
                                            class="btn btn-red btn-align"
                                            type="button"
                                            // data-dismiss="modal"
                                            // data-toggle="modal" data-target="#asking_password_for_delete"
                                            onClick={() => {

                                                let input = {
                                                    client_id: this.state.logged_client_id,
                                                    sales_order_id: this.state.sales_order_id,
                                                    status_to_set: 10,
                                                    confirm_action: 1

                                                }

                                                FetchAllApi.delete_or_void_sales_order(
                                                    input,
                                                    (err, response) => {
                                                        if (response.status === 1) {
                                                            alert(response.message)
                                                            // window.jQuery('#paid_invoice_delete_modal').modal('hide')
                                                            // this.props.history.push('/all_lists')
                                                            window.location.href = "/all_lists"
                                                        } else {
                                                            alert(response.message)
                                                        }
                                                    }
                                                );

                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* modal for asking paid_invoice_delete_modal*/}







                    {/* modal for asking void invoice */}


                    <div>
                        <div
                            class="modal fade in"
                            id="modal_void_invoice"
                            role="dialog"
                            style={{ paddingLeft: 15 }}
                        >
                            <div class="modal-dialog modal-md" style={{ width: 440 }}>
                                <button
                                    type="button"
                                    class="close hidden-xs"
                                    data-dismiss="modal"
                                >
                                    <img
                                        class="img-responsive"
                                        src="../../images/close-red.svg"
                                        alt="icon"
                                    />
                                </button>
                                <div class="modal-content">
                                    <div class="modal-body text-center success-modal">
                                        <div class="pop-icon img-size">
                                            {/* {<img src="../../images/delete-icon.svg" alt="icon" />} */}
                                        </div>

                                        <h3>Are you sure?</h3>

                                        <p class="fw-500">This invoice will be voided </p>
                                        <button
                                            className="btn btn-lightgray btn-align"
                                            data-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <span>{"   "}</span>
                                        <button
                                            class="btn btn-red btn-align"
                                            type="button"
                                            // data-dismiss="modal"
                                            // data-toggle="modal" data-target="#asking_password_for_delete"

                                            onClick={() => this.delete_or_void_sales_order(11)}
                                        >
                                            Make Void
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* modal for asking void invoice    */}

                    {/* moal for auto invoice */}
                    <div
                                                 class="modal fade in"
                                                id="modal-autoinvoice"
                                                role="dialog"                                                
                                            >
                                                <div className="modal-dialog modal-md custom-modal">
                                                    <button
                                                        type="button"
                                                        className="close hidden-xs"
                                                        data-dismiss="modal"
                                                        onClick={this.modal_autoinvoice_cancel}
                                                    >
                                                        <img
                                                            className="img-responsive"
                                                            src="../../images/close-red.svg"
                                                            alt="icon"
                                                        />
                                                    </button>                                                    
                                                    <div className="modal-content">
                                                        <div className="modal-body text-center">
                                                            <h3>Auto Invoice</h3>
                                                            <form className="custom-form row">
                                                                <div className="form-group col-md-12 col-xs-12 pad-no">
                                                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                                                    <label>Start Date</label>
                                  <div
                                    className='input-group date mar-t-no'
                                    data-date-format='dd/mm/yyyy'
                                  >
                                    <input
                                      type='text'
                                      className='form-control'
                                      autoComplete='off'  
                                      id='autoinvoicestartdate'
                                      name="autoinvoicestartdate" 
                                    />
                                    <div className='input-group-addon'>
                                      <img
                                        src='../images/calendar-icon.svg'
                                        alt='icon'
                                      />
                                    </div>
                                  </div>
                                  </div>
                                                                {/* </div>
                                                                <div className="form-group col-md-12 col-xs-12 pad-no"> */}
                                                                    <div className="col-md-6 col-sm-6 col-md-6">
                                                                        <label>
                                                                           End Date
                                                                            <span className="astrick">*</span>
                                                                        </label>
                                                                    
                                                                    <div
                                    className='input-group date mar-t-no'
                                    data-date-format='dd/mm/yyyy'
                                  >
                                    <input
                                      type='text' name="autoinvoiceenddate" id='autoinvoiceenddate'
                                      className='form-control'
                                      autoComplete='off'                                      
                                     
                                     
                                    />
                                    <div className='input-group-addon'>
                                      <img
                                        src='../images/calendar-icon.svg'
                                        alt='icon'
                                      />
                                    </div>
                                  </div></div>
                                                                </div>
                                                                
                                                                <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                                                    <div className="col-md-4 col-sm-4 col-xs-12">
                                                                        <label>Month / Number</label>
                                                                    </div>
                                                                    <div className="col-md-8 col-sm-8 col-xs-12">
                                                                        <label className="custom-checkbox radio mar-rgt taxable" >
                                                                            <input
                                                                                type="radio"
                                                                                name="tax-item"
                                                                                value="option1"
                                                                                checked={
                                                                                    THIS.state.monthnumberoption ===
                                                                                    "option1"
                                                                                    
                                                                                }
                                                                                onChange={THIS.handleautoinvoiceoption}
                                                                            />
                                                                            Month
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                        <label className="custom-checkbox radio mar-rgt taxable" style={{marginTop:'10px'}}>
                                                                            <input
                                                                                type="radio"
                                                                                name="tax-item"
                                                                                value="option2"
                                                                                checked={
                                                                                    THIS.state.monthnumberoption ===
                                                                                    "option2"
                                                                                }
                                                                                onChange={THIS.handleautoinvoiceoption}
                                                                            />{" "}
                                                                           Number
                                                                            <span className="checkmark"></span>
                                                                        </label>                                                                      
                                                                    </div>
                                                                </div>
                                                                <div className="form-group col-md-12 col-xs-12 pad-no">
                                                                    <div className="col-md-4 col-sm-4 col-xs-12">
                                                                        <label>Auto Invoice date</label>
                                                                    </div>
                                                                    <div className="col-md-8 col-sm-8 col-xs-12">
                                                                    <select
                                                        className="selectpicker form-control hh w-100 "
                                                        id="autoinvoicedate" name="autoinvoicedate"
                                                        data-live-search="true"   
                                                        title={`Choose`}
                                                        // data-width="150%"                                                      
                                                    >     
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="03">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                    <option value="25">25</option>
                                                    <option value="26">26</option>
                                                    <option value="27">27</option>
                                                    <option value="28">28</option>
                                                    <option value="29">29</option>
                                                    <option value="30">30</option>
                                                    <option value="31">31</option>
                                                     </select>                                                            
                                                                    </div>
                                                                </div>
                                                                {/* <div className='mymsg'>{this.state.modal_info_msg}</div> */}
                                                                <small
                                                                    style={{ color: "red" }}
                                                                    className="mymsg"
                                                                >
                                                                    {this.state.modal_info_msg}{" "}
                                                                </small>

                                                                <div className="form-group col-md-12 col-xs-12 btn-sec pad-no">
                                                                    {this.state.show_succes ? (
                                                                        <div className="alert alert-success">
                                                                            <strong>Success!</strong> Your new GST is
                                                                            added.
                                                                        </div>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                    <button
                                                                        className="btn btn-lightgray btn-align"
                                                                        data-dismiss="modal"
                                                                        onClick={this.modal_autoinvoice_cancel}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <span>{"   "}</span>
                                                                    <button
                                                                        className="btn btn-green btn-align"
                                                                        type="submit"
                                                                        onClick={this.add_autoinvoice}
                                                                    >
                                                                        Save
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>





                    {/* modal for paid_invoice_delete_modal  */}


                    <div>
                        <div
                            class="modal fade in"
                            id="paid_invoice_void_modal"
                            role="dialog"
                            style={{ paddingLeft: 15 }}
                        >
                            <div class="modal-dialog modal-md" style={{ width: 440 }}>
                                <button
                                    type="button"
                                    class="close hidden-xs"
                                    data-dismiss="modal"
                                >
                                    <img
                                        class="img-responsive"
                                        src="../../images/close-red.svg"
                                        alt="icon"
                                    />
                                </button>
                                <div class="modal-content">
                                    <div class="modal-body text-center success-modal">
                                        <div class="pop-icon img-size">
                                            {/* {<img src="../../images/delete-icon.svg" alt="icon" />} */}
                                        </div>

                                        <h3>Are you sure?</h3>

                                        <p class="fw-500"> {this.state.delete_alert_msg} </p>
                                        <button
                                            className="btn btn-lightgray btn-align"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                window.jQuery('#paid_invoice_void_modal').modal('hide')
                                                // setTimeout(() => {
                                                //   window.jQuery('#modal_delete_invoice').modal('hide')
                                                // }, 500);

                                            }
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <span>{"   "}</span>
                                        <button
                                            class="btn btn-red btn-align"
                                            type="button"
                                            // data-dismiss="modal"
                                            // data-toggle="modal" data-target="#asking_password_for_delete"
                                            onClick={() => {

                                                let input = {
                                                    client_id: this.state.logged_client_id,
                                                    invoice_id: this.state.invoice_id_used,
                                                    status_to_set: 11,
                                                    confirm_action: 1

                                                }

                                                FetchAllApi.delete_or_void_sales_order(
                                                    input,
                                                    (err, response) => {
                                                        if (response.status === 1) {
                                                            alert(response.message)
                                                            // window.open('/all_lists')
                                                            window.location.href = "/all_lists"
                                                            // window.jQuery('#paid_invoice_void_modal').modal('hide')
                                                            // window.jQuery('#modal_void_invoice').modal('hide')

                                                            // this.props.history.push('/all_lists')
                                                        } else {
                                                            alert(response.message)
                                                        }
                                                    }
                                                );

                                            }}
                                        >
                                            Make Void
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* modal for asking paid_invoice_void_modal*/}




                    
          {/* modal for asking paid_invoice_void_modal*/}



 {/* credit limit alert modal */}
 <div>
                        <div
                          class="modal fade in"
                          id="credit_limit"
                          role="dialog"
                          style={{ paddingLeft: 15 }}
                        >
                          <div class="modal-dialog modal-md" style={{ width: 440 }}>
                            <button
                              type="button"
                              class="close hidden-xs"
                              data-dismiss="modal"
                            >
                              <img
                                class="img-responsive"
                                src="../../images/close-red.svg"
                                alt="icon"
                              />
                            </button>
                            <div class="modal-content">
                              <div class="modal-body text-center success-modal">
                                <div class="pop-icon img-size">
                                  {/* {<img src="../../images/delete-icon.svg" alt="icon" />} */}
                                </div>

                                <h3>Are you sure?</h3>

                                <p class="fw-500">{this.state.credit_limit_msg}</p>
                                <button
                                  className="btn btn-lightgray btn-align"
                                  data-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <span>{"   "}</span>
                                <button
                                  class="btn btn-red btn-align"
                                  type="button"
                                  data-dismiss="modal"
                                   onClick={ ()=> this.setState({ is_credit_limit_accepted : 1 },(e)=>this.save_template(e, "save"))}
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

 {/* credit limit alert modal */}


                    <div className="builder-right" style={{ display: 'none' }}>
                        <div id='whole_template' className="template-item">
                            <div id="#whole_template" >
                                {this.state.html_contents && parse(this.state.html_contents)}
                            </div>
                        </div>
                    </div>

                    <Footer
                        defaultcategorylist_onchange={this.defaultcategorylist_onchange}
                        logoutSubmit={(e) => this.logoutLink(e)}
                    />
                </div>
                </div >  );
        } else {
            return (
                <CoulmnRearrage createInvoice={"1"} changeState={this.changeState} />
            );
        }
    }
}
export default Testing_create_salesorder;