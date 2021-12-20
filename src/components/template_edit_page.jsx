import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import FetchAllApi from '../api_links/fetch_all_api'
import jQuery from 'jquery'
// import { render } from 'jsx-to-html'
import parse from 'html-react-parser'
import moment from "moment";
// import Comma from "./comma";

export class Template_edit_page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_user_id: localStorage.getItem('logged_user_id'),
            logged_client_id: localStorage.getItem('logged_client_id'),
            logged_role_id: localStorage.getItem('logged_role_id'),
            logged_user_name: localStorage.getItem('logged_user_name'),
            logged_user_email: localStorage.getItem('logged_user_email'),
            logged_user_phone: localStorage.getItem('logged_user_phone'),
            logged_user_image: localStorage.getItem('logged_user_image'),
            logged_company_name: localStorage.getItem('logged_company_name'),

            // entity_details:

            // {
            //     "status": 1,
            //     "message": "success..!!",
            //     "data": [
            //         {
            //             "phone_code": "93",
            //             "logo": "https://api.genie.com.sg/logo/logo_1622805572973.webp",
            //             "client_id": 152,
            //             "id": 152,
            //             "address": "address",
            //             "country": "India",
            //             "email_id": "manoj@mailinator.com",
            //             "state": "Karnataka",
            //             "home_currency": "SGD",
            //             "phone": "77654545454",
            //             "name": "mano",
            //             "entity_number": "23",
            //             "entity_type": 4,
            //             "principle_activities": "testing",
            //             "incorporation_date": "2021-04-14",
            //             "unique_entity_number": "23",
            //             "begining_year": "",
            //             "end_year": "",
            //             "time_zone": "null",
            //             "date_format": "DD-MM-YYYY",
            //             "password": "",
            //             "lock_date": ""
            //         }
            //     ]
            // },
           
            entity_details:'',
            // html_content: this.props.location.state.html_content
            html_content:( this.props.location.state && this.props.location.state.html_content) ? this.props.location.state.html_content : `<div style=" color: #6a6a6a; background: #fff; min-height: 98%; border: 1px solid #c7c7c7; width: 95%; margin: 0 auto; font-size: 20px; display: block; overflow: hidden; "> <div style="float: left; width: 100%; padding: 25px; box-sizing: border-box"> <div id="isLogo" style=" float: left; display: flex; align-items: center; " > <img id="image" style="width:100px;" src="" alt="logo"/> </div> <div id="mobDiv" style="float: right; text-align: right; width: 42%"> <p id="isEntityName" style="margin-bottom: 0 ;display: block">[Entity name]</p> <p id="isAddress" style="margin-bottom: 0 ;display: block">[Address]</p> <p id="isPhoneNumber" style="margin-bottom: 0 ;display: block">[Phone number]</p> <p id="isEmail" style="margin-bottom: 0 ;display: block">[Email]</p> <p id="isUenNumber" style="margin-bottom: 0 ;display: block">[UEN number]</p> <p id="isGstNumber" style="margin-bottom: 0 ;display: block"></p> </div> </div> <div id="stripeDiv" style="background: #e6e6e6; height: 18px; float: left; width: 100%"> <span id="template_name" style=" color: #6a6a6a; background: #fff; font-size: 20px; font-weight: 600; text-transform: uppercase; float: right; margin: -3px 25px 0 0; padding: 0 18px; " >INVOICE</span > </div> <div style="float: left; width: 100%; padding: 25px; box-sizing: border-box"> <div style="float: left; width: 100%"> <div style="float: left; width: 100%"> <div id="headDiv"> <div style="float: left; width: 33%"> <p style="margin-bottom: 8px; font-weight: 600">Invoice to</p> <p> <span id="p-company_address"> [company address] <span> </p> </div> <div style="float: left; width: 33%"> <p style="margin-bottom: 8px; font-weight: 600">Shipping to</p> <p> <span id="p-shipping_address">[shipping address] <span> </p> </div> <div style="float: right; width: 34%; text-align: right"> <p style="margin-bottom: 7px"> <span style="font-weight: 600">Invoice No:</span><span style="margin-left: 25px" id="p-invoice_number">100230<span> </p> <p style="margin-bottom: 0"> <span style="font-weight: 600">Date:</span><span  style="margin-left: 25px"  id="p-invoice_date">10 May 2021<span> </p> <p style="margin-bottom: 0"> <span style="font-weight: 600">Duedate:</span> <span  style="margin-left: 25px"  id="p-due_date">18 May 2021<span> </p> </div> <div style="float: left; width: 100%"> <div style="float: left; width: 20%"> <p style="margin-bottom: 8px; font-weight: 600">Invoice Currency</p> <p id="p-foreign_currency">[Your invoice currency]</p> </div> <div style="float: left; width: 20%"> <p style="margin-bottom: 8px; font-weight: 600">Job Name</p> <p id="p-job_name">[Your job name]</p> </div> <div style="float: left; width: 20%"> <p style="margin-bottom: 8px; font-weight: 600">Memo</p> <p id="p-memo">[Your memo]</p> </div> <div style="float: left; width: 20%" id="p-exchange_div"> <p style="margin-bottom: 8px; font-weight: 600">Exchange Rate</p> <p id="p-exchange_rate">00.00</p> </div> <div style="float: left; width: 20%; display:none" id="customField0"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName0">Exchange Rate</p> <p id="head-0">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField1"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName1">Exchange Rate</p> <p id="head-1">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField2"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName2">Exchange Rate</p> <p id="head-2">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField3"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName3">Exchange Rate</p> <p id="head-3">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField4"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName4">Exchange Rate</p> <p id="head-4">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField5"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName5">Exchange Rate</p> <p id="head-5">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField6"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName6">Exchange Rate</p> <p id="head-6">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField7"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName7">Exchange Rate</p> <p id="head-7">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField8"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName8">Exchange Rate</p> <p id="head-8">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField9"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName9">Exchange Rate</p> <p id="head-9">[Field value]</p> </div> </div> </div> <div id="itemDiv"> <div style="width: 100%; float: left; min-height: 25.5%"> <table style="box-sizing: border-box;border-collapse: collapse;width: 100%; float: left; margin-top: 25px"> <thead id="thead" style="background: #5e5e5e; border: 1px solid #5e5e5e"> <tr style="color: #fff; font-weight: 500"> <td style="padding: 12px 8px; box-sizing: border-box">No</td> <td style="padding: 12px 8px; box-sizing: border-box"> Item & Description </td> <td style="padding: 12px 8px; box-sizing: border-box"> Price Each </td> <td style=" padding: 12px 8px; text-align: center; box-sizing: border-box; " > Qty </td> <td style=" padding: 12px 8px; text-align: center; box-sizing: border-box; " > Tax </td> <td style=" padding: 12px 8px; text-align: center; box-sizing: border-box; " > Total </td> </tr> </thead> <tbody style="border: 1px solid #bababa"> <tr id="row-1" style="display:table-row"> <td id="row-1-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-1-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-1-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-1-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-1-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-1-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-2" style="display:table-row"> <td id="row-2-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-2-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-2-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-2-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-2-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-2-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-3" style="display:table-row"> <td id="row-3-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-3-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-3-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-3-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-3-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-3-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-4" style="display:none"> <td id="row-4-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-4-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-4-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-4-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-4-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-4-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-5" style="display:none"> <td id="row-5-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-5-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-5-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-5-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-5-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-5-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-6" style="display:none"> <td id="row-6-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-6-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-6-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-6-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-6-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-6-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-7" style="display:none"> <td id="row-7-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-7-2" 
            style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-7-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-7-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-7-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-7-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-8" style="display:none"> <td id="row-8-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-8-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-8-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-8-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-8-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-8-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-9" style="display:none"> <td id="row-9-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-9-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-9-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-9-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-9-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-9-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-10" style="display:none"> <td id="row-10-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-10-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-10-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-10-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-10-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-10-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> </tbody> </table> </div> <div style="float: left; width: 65%; margin-top: 60px"> <p style="margin-bottom: 5px; font-weight: 500">Amount in Words</p> <div id="p-amount_in_words" style=" border: 1px solid #bababa; float: left; width: 100%; padding: 13px 10px; box-sizing: border-box; " > Amount in Words </div> </div> <div style=" float: right; width: 35%; padding-left: 20px; box-sizing: border-box; " > <div style=" float: left; width: 100%; padding: 13px 10px; margin-top: 10px; box-sizing: border-box; " > <div style=" float: left; width: 50%; font-weight: 600; text-align: right; padding-right: 10px; box-sizing: border-box; " > Sub total </div> <div id = "p-item_total_foreign_currency" style=" text-align: right; padding: 0 10px; float: right; width: 50%; box-sizing: border-box; " > 0.00 </div> </div> <div style=" float: left; width: 100%; padding: 13px 10px; box-sizing: border-box; " > <div style=" float: left; width: 50%; font-weight: 600; text-align: right; padding-right: 10px; box-sizing: border-box; " > Tax </div> <div id = "p-tax_amount_foreign_currency" style=" text-align: right; padding: 0 10px; float: right; width: 50%; box-sizing: border-box; " > 0.00 </div> </div> <div style=" float: left; width: 100%; padding: 15px 10px; background: #efefef; border-radius: 3px; box-sizing: border-box; " > <div style=" float: left; width: 50%; font-weight: 600; text-align: right; padding-right: 10px; box-sizing: border-box; " > Grand Total </div> <div id = "p-grand_total_foreign_currency" style=" text-align: right; padding: 0 10px; float: right; width: 50%; box-sizing: border-box; " > 0.00 </div> </div> </div> </div> </div> <div id="footerCustomDiv"> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField10"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName10">Footer field-1</p> <p id="foot-0">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField11"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName11">Footer field-2</p> <p id="foot-1">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField12"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName12">Footer field-3</p> <p id="foot-2">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField13"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName13">Footer field-3</p> <p id="foot-3">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField14"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName14">Footer field-4</p> <p id="foot-4">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField15"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName15">Footer field-5</p> <p id="foot-5">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField16"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName16">Footer field-6</p> <p id="foot-6">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField17"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName17">Footer field-7</p> <p id="foot-7">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField18"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName18">Footer field-8</p> <p id="foot-8">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField19"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName19">Footer field-9</p> <p id="foot-9">[Field value]</p> </div> </div> <div id="footerDiv" style=" float: left; width: 100%; margin-top: 30px; padding: 0 0 25px 0; box-sizing: border-box; " > <p style="margin-bottom: 5px; font-weight: bold">Thank you message and Banking details</p> <p id="p-thanking_message" style="margin-top: 0; margin-bottom: 15px">Thank you message and Banking details</p> <div style="float: left; width: 100%"> <p style="margin-bottom: 7px; font-weight: 600">Terms & Conditions</p> <p id="p-terms_and_conditions" style="font-size: 20px; margin-bottom: 0"> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore </p> </div> </div> </div> </div> </div>`

            // html_content: `<div style=" color: #6a6a6a; background: #fff; min-height: 98%; border: 1px solid #c7c7c7; width: 95%; margin: 0 auto; font-size: 14px; display: block; overflow: hidden; "> <div style="float: left; width: 100%; padding: 25px; box-sizing: border-box"> <div id="isLogo" style=" float: left; width: 35%; height: 73px; display: flex; align-items: center; " > <img id="image" style="max-width:100%;max-height:100%;" src="https://api.genie.com.sg/logo/logo_1622805572973.webp" alt="logo"/> </div> <div id="mobDiv" style="float: right; text-align: right; width: 42%"> <p id="isEntityName" style="margin-bottom: 0 ;display: block">[Entity name]</p> <p id="isAddress" style="margin-bottom: 0 ;display: block">[Address]</p> <p id="isPhoneNumber" style="margin-bottom: 0 ;display: block">[Phone number]</p> <p id="isEmail" style="margin-bottom: 0 ;display: block">[Email]</p> <p id="isUenNumber" style="margin-bottom: 0 ;display: block">[UEN number]</p> <p id="isGstNumber" style="margin-bottom: 0 ;display: block"></p> </div> </div> <div id="stripeDiv" style="background: #e6e6e6; height: 18px; float: left; width: 100%"> <span id="template_name" style=" color: #6a6a6a; background: #fff; font-size: 20px; font-weight: 600; text-transform: uppercase; float: right; margin: -3px 25px 0 0; padding: 0 18px; " >INVOICE</span > </div> <div style="float: left; width: 100%; padding: 25px; box-sizing: border-box"> <div style="float: left"> <div style="float: left; width: 100%"> <div id="headDiv"> <div style="float: left; width: 33%"> <p style="margin-bottom: 8px; font-weight: 600">Invoice to</p> <p> <span id="p-company_address"> [company address] <span> </p> </div> <div style="float: left; width: 33%"> <p style="margin-bottom: 8px; font-weight: 600">Shipping to</p> <p> <span id="p-shipping_address">[shipping address] <span> </p> </div> <div style="float: right; width: 34%; text-align: right"> <p style="margin-bottom: 7px"> <span style="font-weight: 600">Invoice No:</span><span id="p-invoice_number">100230<span> </p> <p style="margin-bottom: 0"> <span style="font-weight: 600">Date:</span><span id="p-invoice_date">10 May 2021<span> </p> <p style="margin-bottom: 0"> <span style="font-weight: 600">Duedate:</span> <span id="p-due_date">18 May 2021<span> </p> </div> <div style="float: left; width: 100%"> <div style="float: left; width: 20%"> <p style="margin-bottom: 8px; font-weight: 600">Invoice Currency</p> <p id="p-foreign_currency">[Your invoice currency]</p> </div> <div style="float: left; width: 20%"> <p style="margin-bottom: 8px; font-weight: 600">Job Name</p> <p id="p-job_name">[Your job name]</p> </div> <div style="float: left; width: 20%"> <p style="margin-bottom: 8px; font-weight: 600">Memo</p> <p id="p-memo">[Your memo]</p> </div> <div style="float: left; width: 20%" id="p-exchange_div"> <p style="margin-bottom: 8px; font-weight: 600">Exchange Rate</p> <p id="p-exchange_rate">00.00</p> </div> <div style="float: left; width: 20%; display:none" id="customField0"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName0">Exchange Rate</p> <p id="head-0">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField1"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName1">Exchange Rate</p> <p id="head-1">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField2"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName2">Exchange Rate</p> <p id="head-2">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField3"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName3">Exchange Rate</p> <p id="head-3">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField4"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName4">Exchange Rate</p> <p id="head-4">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField5"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName5">Exchange Rate</p> <p id="head-5">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField6"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName6">Exchange Rate</p> <p id="head-6">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField7"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName7">Exchange Rate</p> <p id="head-7">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField8"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName8">Exchange Rate</p> <p id="head-8">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField9"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName9">Exchange Rate</p> <p id="head-9">[Field value]</p> </div> </div> </div> <div id="itemDiv"> <div style="width: 100%; float: left; min-height: 58.2%"> <table style="width: 100%; float: left; margin-top: 25px"> <thead id="thead" style="background: #5e5e5e; border: 1px solid #5e5e5e"> <tr style="color: #fff; font-weight: 500"> <td style="padding: 12px 8px; box-sizing: border-box">No</td> <td style="padding: 12px 8px; box-sizing: border-box"> Item & Description </td> <td style="padding: 12px 8px; box-sizing: border-box"> Price Each </td> <td style=" padding: 12px 8px; text-align: center; box-sizing: border-box; " > Qty </td> <td style=" padding: 12px 8px; text-align: center; box-sizing: border-box; " > Tax </td> <td style=" padding: 12px 8px; text-align: center; box-sizing: border-box; " > Total </td> </tr> </thead> <tbody style="border: 1px solid #bababa"> <tr id="row-1" style="display:table-row"> <td id="row-1-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-1-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-1-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-1-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-1-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-1-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-2" style="display:table-row"> <td id="row-2-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-2-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-2-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-2-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-2-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-2-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-3" style="display:table-row"> <td id="row-3-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-3-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-3-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-3-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-3-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-3-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-4" style="display:none"> <td id="row-4-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-4-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-4-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-4-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-4-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-4-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-5" style="display:none"> <td id="row-5-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-5-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-5-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-5-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-5-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-5-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-6" style="display:none"> <td id="row-6-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-6-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-6-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-6-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-6-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-6-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-7" style="display:none"> <td id="row-7-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-7-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-7-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-7-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-7-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-7-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-8" style="display:none"> <td id="row-8-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-8-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-8-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-8-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-8-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-8-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-9" style="display:none"> <td id="row-9-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-9-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-9-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-9-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-9-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-9-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-10" style="display:none"> <td id="row-10-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-10-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-10-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-10-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-10-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-10-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> </tbody> </table> </div> <div style="float: left; width: 65%; margin-top: 60px"> <p style="margin-bottom: 5px; font-weight: 500">Amount in Words</p> <div id="p-amount_in_words" style=" border: 1px solid #bababa; float: left; width: 100%; padding: 13px 10px; box-sizing: border-box; " > Amount in Words </div> </div> <div style=" float: right; width: 35%; padding-left: 20px; box-sizing: border-box; " > <div style=" float: left; width: 100%; padding: 13px 10px; margin-top: 10px; box-sizing: border-box; " > <div style=" float: left; width: 50%; font-weight: 600; text-align: right; padding-right: 10px; box-sizing: border-box; " > Sub total </div> <div id = "p-item_total_foreign_currency" style=" text-align: right; padding: 0 10px; float: right; width: 50%; box-sizing: border-box; " > 0.00 </div> </div> <div style=" float: left; width: 100%; padding: 13px 10px; box-sizing: border-box; " > <div style=" float: left; width: 50%; font-weight: 600; text-align: right; padding-right: 10px; box-sizing: border-box; " > Tax </div> <div id = "p-tax_amount_foreign_currency" style=" text-align: right; padding: 0 10px; float: right; width: 50%; box-sizing: border-box; " > 0.00 </div> </div> <div style=" float: left; width: 100%; padding: 15px 10px; background: #efefef; border-radius: 3px; box-sizing: border-box; " > <div style=" float: left; width: 50%; font-weight: 600; text-align: right; padding-right: 10px; box-sizing: border-box; " > Grand Total </div> <div id = "p-grand_total_foreign_currency" style=" text-align: right; padding: 0 10px; float: right; width: 50%; box-sizing: border-box; " > 0.00 </div> </div> </div> </div> </div> <div id="footerCustomDiv"> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField10"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName10">Footer field-1</p> <p id="foot-0">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField11"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName11">Footer field-2</p> <p id="foot-1>[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField12"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName12">Footer field-3</p> <p id="foot-2>[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField13"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName13">Footer field-3</p> <p id="foot-3>[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField14"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName14">Footer field-4</p> <p id="foot-4>[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField15"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName15">Footer field-5</p> <p id="foot-5>[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField16"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName16">Footer field-6</p> <p id="foot-6>[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField17"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName17">Footer field-7</p> <p id="foot-7>[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField18"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName18">Footer field-8</p> <p id="foot-8>[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField19"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName19">Footer field-9</p> <p id="foot-9>[Field value]</p> </div> </div> <div id="footerDiv" style=" float: left; width: 100%; margin-top: 30px; padding: 0 0 25px 0; box-sizing: border-box; " > <p style="margin-bottom: 5px; font-weight: bold">Thanking Message</p> <p id="p-thanking_message" style="margin-top: 0; margin-bottom: 15px">Thank you message</p> <div style="float: left; width: 100%"> <p style="margin-bottom: 7px; font-weight: 600">Terms & Conditions</p> <p id="p-terms_and_conditions" style="font-size: 12px; margin-bottom: 0"> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore </p> </div> </div> </div> </div> </div>`
            // `<div
            //                         style="
            //                           color: #6a6a6a;
            //                           background: #fff;
            //                           min-height: 98%;
            //                           border: 1px solid #c7c7c7;
            //                           width: 95%;
            //                           margin: 0 auto;
            //                           font-size: 14px;
            //                           display: block;
            //                           overflow: hidden;
            //                         ">
            //                         <div style="float: left; width: 100%; padding: 25px; box-sizing: border-box">
            //                           <div
            //                           id="isLogo"
            //                             style="
            //                               float: left;
            //                               width: 35%;
            //                               height: 73px;
            //                               display: flex;
            //                               align-items: center;
            //                             "
            //                           >
            //                           <img id="image" style="max-width:100%;max-height:100%;" src="https://api.genie.com.sg/logo/logo_1622805572973.webp" alt="logo"/>
            //                           </div>
            //                           <div id="mobDiv" style="float: right; text-align: right; width: 42%"> 
            //                              <p id="isEntityName" style="margin-bottom: 0 ;display: block">[Entity name]</p>
            //                              <p id="isAddress" style="margin-bottom: 0 ;display: block">[Address]</p>  
            //                              <p id="isPhoneNumber" style="margin-bottom: 0 ;display: block">[Phone number]</p>
            //                              <p id="isEmail" style="margin-bottom: 0 ;display: block">[Email]</p>
            //                              <p id="isUenNumber" style="margin-bottom: 0 ;display: block">[UEN number]</p>
            //                              <p id="isGstNumber" style="margin-bottom: 0 ;display: block"></p>
            //                           </div>
            //                         </div>
            //                         <div id="stripeDiv" style="background: #e6e6e6; height: 18px; float: left; width: 100%">
            //                           <span
            //                           id="template_name"
            //                             style="
            //                               color: #6a6a6a;
            //                               background: #fff;
            //                               font-size: 20px;
            //                               font-weight: 600;
            //                               text-transform: uppercase;
            //                               float: right;
            //                               margin: -3px 25px 0 0;
            //                               padding: 0 18px;
            //                             "
            //                             >INVOICE</span
            //                           >
            //                         </div>
            //                         <div style="float: left; width: 100%; padding: 25px; box-sizing: border-box">
            //                           <div style="float: left">
            //                             <div style="float: left; width: 100%">
            //                             <div id="headDiv">
            //                               <div style="float: left; width: 33%">
            //                                 <p style="margin-bottom: 8px; font-weight: 600">Invoice to</p>
            //                                 <p>
            //                                  <span id="p-company_address"> [company address] <span>
            //                                 </p>
            //                               </div>
            //                               <div style="float: left; width: 33%">
            //                                 <p style="margin-bottom: 8px; font-weight: 600">Shipping to</p>
            //                                 <p>
            //                                 <span id="p-shipping_address">[shipping address] <span>
            //                                 </p>
            //                               </div>
            //                               <div style="float: right; width: 34%; text-align: right">
            //                                 <p style="margin-bottom: 7px">
            //                                   <span style="font-weight: 600">Invoice No:</span><span id="p-invoice_number">100230<span>
            //                                 </p>
            //                                 <p style="margin-bottom: 0">
            //                                   <span style="font-weight: 600">Date:</span><span id="p-invoice_date">10 May 2021<span> 
            //                                 </p>
            //                                 <p style="margin-bottom: 0">
            //                                   <span style="font-weight: 600">Duedate:</span> <span id="p-due_date">18 May 2021<span>
            //                                 </p>
            //                               </div>
            //                               <div style="float: left; width: 100%">
            //                                 <div style="float: left; width: 20%">
            //                                   <p style="margin-bottom: 8px; font-weight: 600">Invoice Currency</p>
            //                                   <p id="p-foreign_currency">[Your invoice currency]</p>
            //                                 </div>
            //                                 <div style="float: left; width: 20%">
            //                                   <p style="margin-bottom: 8px; font-weight: 600">Job Name</p>
            //                                   <p id="p-job_name">[Your job name]</p>
            //                                 </div>
            //                                 <div style="float: left; width: 20%">
            //                                   <p style="margin-bottom: 8px; font-weight: 600">Memo</p>
            //                                   <p id="p-memo">[Your memo]</p>
            //                                 </div>
            //                                 <div style="float: left; width: 20%" id="p-exchange_div">
            //                                   <p style="margin-bottom: 8px; font-weight: 600">Exchange Rate</p>
            //                                   <p id="p-exchange_rate">00.00</p>
            //                                 </div>
            //                                 <div style="float: left; width: 20%; display:none" id="customField0">
            //                                 <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName0">Exchange Rate</p>
            //                                 <p id="head-0">[Field value]</p>
            //                               </div>
            //                               <div style="float: left; width: 20%; display:none" id="customField1">
            //                               <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName1">Exchange Rate</p>
            //                               <p id="head-1">[Field value]</p>
            //                             </div>
            //                             <div style="float: left; width: 20%; display:none" id="customField2">
            //                             <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName2">Exchange Rate</p>
            //                             <p id="head-2">[Field value]</p>
            //                           </div>
            //                           <div style="float: left; width: 20%; display:none" id="customField3">
            //                           <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName3">Exchange Rate</p>
            //                           <p id="head-3">[Field value]</p>
            //                         </div>
            //                         <div style="float: left; width: 20%; display:none" id="customField4">
            //                         <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName4">Exchange Rate</p>
            //                         <p id="head-4">[Field value]</p>
            //                       </div>
            //                       <div style="float: left; width: 20%; display:none" id="customField5">
            //                       <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName5">Exchange Rate</p>
            //                       <p id="head-5">[Field value]</p>
            //                     </div>
            //                     <div style="float: left; width: 20%; display:none" id="customField6">
            //                     <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName6">Exchange Rate</p>
            //                     <p id="head-6">[Field value]</p>
            //                   </div>
            //                   <div style="float: left; width: 20%; display:none" id="customField7">
            //                   <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName7">Exchange Rate</p>
            //                   <p id="head-7">[Field value]</p>
            //                 </div>
            //                 <div style="float: left; width: 20%; display:none" id="customField8">
            //                 <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName8">Exchange Rate</p>
            //                 <p id="head-8">[Field value]</p>
            //               </div>
            //               <div style="float: left; width: 20%; display:none" id="customField9">
            //               <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName9">Exchange Rate</p>
            //               <p id="head-9">[Field value]</p>
            //             </div>
            //                               </div>
            //                             </div>
            //                             <div id="itemDiv">
            //                               <div style="width: 100%; float: left; min-height: 58.2%">
            //                                 <table style="width: 100%; float: left; margin-top: 25px">
            //                                   <thead id="thead" style="background: #5e5e5e; border: 1px solid #5e5e5e">
            //                                     <tr style="color: #fff; font-weight: 500">
            //                                       <td style="padding: 12px 8px; box-sizing: border-box">No</td>
            //                                       <td style="padding: 12px 8px; box-sizing: border-box">
            //                                         Item & Description
            //                                       </td>
            //                                       <td style="padding: 12px 8px; box-sizing: border-box">
            //                                         Price Each
            //                                       </td>
            //                                       <td
            //                                         style="
            //                                           padding: 12px 8px;
            //                                           text-align: center;
            //                                           box-sizing: border-box;
            //                                         "
            //                                       >
            //                                         Qty
            //                                       </td>
                                                
            //                                       <td
            //                                         style="
            //                                           padding: 12px 8px;
            //                                           text-align: center;
            //                                           box-sizing: border-box;
            //                                         "
            //                                       >
            //                                         Tax
            //                                       </td>                   
            //                                       <td
            //                                         style="
            //                                           padding: 12px 8px;
            //                                           text-align: center;
            //                                           box-sizing: border-box;
            //                                         "
            //                                       >
            //                                         Total
            //                                       </td>
            //                                     </tr>
            //                                   </thead>
            //                                   <tbody style="border: 1px solid #bababa">
            //                                       <tr id="row-1" style="display:table-row">
            //                                       <td id="row-1-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td>
            //                                       <td id="row-1-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td>
            //                                       <td id="row-1-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td>
            //                                       <td id="row-1-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td>
            //                                       <td id="row-1-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td>
            //                                       <td id="row-1-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td>
            //                                       </tr>
            //                                       <tr id="row-2" style="display:table-row">
            //                                       <td id="row-2-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td>
            //                                       <td id="row-2-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td>
            //                                       <td id="row-2-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td>
            //                                       <td id="row-2-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td>
            //                                       <td id="row-2-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td>
            //                                       <td id="row-2-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td>
            //                                       </tr>
            //                                       <tr id="row-3" style="display:table-row">
            //                                       <td id="row-3-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td>
            //                                       <td id="row-3-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td>
            //                                       <td id="row-3-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td>
            //                                       <td id="row-3-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td>
            //                                       <td id="row-3-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td>
            //                                       <td id="row-3-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td>
            //                                       </tr>
            //                                       <tr id="row-4" style="display:none">
            //                                       <td id="row-4-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td>
            //                                       <td id="row-4-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td>
            //                                       <td id="row-4-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td>
            //                                       <td id="row-4-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td>
            //                                       <td id="row-4-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td>
            //                                       <td id="row-4-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td>
            //                                       </tr>
            //                                       <tr id="row-5" style="display:none">
            //                                       <td id="row-5-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td>
            //                                       <td id="row-5-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td>
            //                                       <td id="row-5-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td>
            //                                       <td id="row-5-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td>
            //                                       <td id="row-5-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td>
            //                                       <td id="row-5-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td>
            //                                       </tr>
            //                                       <tr id="row-6" style="display:none">
            //                                       <td id="row-6-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td>
            //                                       <td id="row-6-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td>
            //                                       <td id="row-6-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td>
            //                                       <td id="row-6-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td>
            //                                       <td id="row-6-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td>
            //                                       <td id="row-6-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td>
            //                                       </tr>
            //                                       <tr id="row-7" style="display:none">
            //                                       <td id="row-7-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td>
            //                                       <td id="row-7-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td>
            //                                       <td id="row-7-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td>
            //                                       <td id="row-7-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td>
            //                                       <td id="row-7-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td>
            //                                       <td id="row-7-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td>
            //                                       </tr>
            //                                       <tr id="row-8" style="display:none">
            //                                       <td id="row-8-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td>
            //                                       <td id="row-8-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td>
            //                                       <td id="row-8-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td>
            //                                       <td id="row-8-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td>
            //                                       <td id="row-8-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td>
            //                                       <td id="row-8-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td>
            //                                       </tr>
            //                                       <tr id="row-9" style="display:none">
            //                                       <td id="row-9-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td>
            //                                       <td id="row-9-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td>
            //                                       <td id="row-9-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td>
            //                                       <td id="row-9-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td>
            //                                       <td id="row-9-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td>
            //                                       <td id="row-9-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td>
            //                                       </tr>
            //                                       <tr id="row-10" style="display:none">
            //                                       <td id="row-10-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td>
            //                                       <td id="row-10-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td>
            //                                       <td id="row-10-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td>
            //                                       <td id="row-10-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td>
            //                                       <td id="row-10-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td>
            //                                       <td id="row-10-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td>
            //                                       </tr>        
            //                                   </tbody>
            //                                 </table>
            //                               </div>
            //                               <div style="float: left; width: 65%; margin-top: 60px">
            //                                 <p style="margin-bottom: 5px; font-weight: 500">Amount in Words</p>
            //                                 <div
            //                                 id="p-amount_in_words"
            //                                   style="
            //                                     border: 1px solid #bababa;
            //                                     float: left;
            //                                     width: 100%;
            //                                     padding: 13px 10px;
            //                                     box-sizing: border-box;
            //                                   "
            //                                 >
            //                                 Amount in Words
            //                                 </div>
            //                               </div>
            //                               <div
            //                                 style="
            //                                   float: right;
            //                                   width: 35%;
            //                                   padding-left: 20px;
            //                                   box-sizing: border-box;
            //                                 "
            //                               >
            //                                 <div
            //                                   style="
            //                                     float: left;
            //                                     width: 100%;
            //                                     padding: 13px 10px;
            //                                     margin-top: 10px;
            //                                     box-sizing: border-box;
            //                                   "
            //                                 >
            //                                   <div
            //                                     style="
            //                                       float: left;
            //                                       width: 50%;
            //                                       font-weight: 600;
            //                                       text-align: right;
            //                                       padding-right: 10px;
            //                                       box-sizing: border-box;
            //                                     "
            //                                   >
            //                                     Sub total 
            //                                   </div>
            //                                   <div
            //                                   id = "p-item_total_foreign_currency"
            //                                     style="
            //                                       text-align: right;
            //                                       padding: 0 10px;
            //                                       float: right;
            //                                       width: 50%;
            //                                       box-sizing: border-box;
            //                                     "
            //                                   >
            //                                   0.00
            //                                   </div>
            //                                 </div>
            //                                 <div
            //                                   style="
            //                                     float: left;
            //                                     width: 100%;
            //                                     padding: 13px 10px;
            //                                     box-sizing: border-box;
            //                                   "
            //                                 >
            //                                   <div
            //                                     style="
            //                                       float: left;
            //                                       width: 50%;
            //                                       font-weight: 600;
            //                                       text-align: right;
            //                                       padding-right: 10px;
            //                                       box-sizing: border-box;
            //                                     "
            //                                   >
            //                                   Tax
            //                                   </div>
            //                                   <div
            //                                   id = "p-tax_amount_foreign_currency"
            //                                     style="
            //                                       text-align: right;
            //                                       padding: 0 10px;
            //                                       float: right;
            //                                       width: 50%;
            //                                       box-sizing: border-box;
            //                                     "
            //                                   >
            //                                   0.00
            //                                   </div>
            //                                 </div>
            //                                 <div
            //                                   style="
            //                                     float: left;
            //                                     width: 100%;
            //                                     padding: 15px 10px;
            //                                     background: #efefef;
            //                                     border-radius: 3px;
            //                                     box-sizing: border-box;
            //                                   "
            //                                 >
            //                                   <div
            //                                     style="
            //                                       float: left;
            //                                       width: 50%;
            //                                       font-weight: 600;
            //                                       text-align: right;
            //                                       padding-right: 10px;
            //                                       box-sizing: border-box;
            //                                     "
            //                                   >
            //                                     Grand Total
            //                                   </div>
            //                                   <div
            //                                   id = "p-grand_total_foreign_currency"
            //                                     style="
            //                                       text-align: right;
            //                                       padding: 0 10px;
            //                                       float: right;
            //                                       width: 50%;
            //                                       box-sizing: border-box;
            //                                     "
            //                                   >
            //                                     0.00
            //                                   </div>
            //                                 </div>
            //                               </div>
            //                               </div>
            //                             </div>
            //             <div id="footerCustomDiv">
            //                             <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField10">
            //                                 <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName10">Footer field-1</p>
            //                                 <p id="foot-0">[Field value]</p>
            //                               </div>
            //                               <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField11">
            //                               <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName11">Footer field-2</p>
            //                               <p id="foot-1">[Field value]</p>
            //                             </div>
            //                             <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField12">
            //                             <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName12">Footer field-3</p>
            //                             <p id="foot-2">[Field value]</p>
            //                           </div>
            //                           <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField13">
            //                           <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName13">Footer field-3</p>
            //                           <p id="foot-3">[Field value]</p>
            //                         </div>
            //                         <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField14">
            //                         <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName14">Footer field-4</p>
            //                         <p id="foot-4">[Field value]</p>
            //                       </div>
            //                       <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField15">
            //                       <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName15">Footer field-5</p>
            //                       <p id="foot-5">[Field value]</p>
            //                     </div>
            //                     <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField16">
            //                     <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName16">Footer field-6</p>
            //                     <p id="foot-6">[Field value]</p>
            //                   </div>
            //                   <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField17">
            //                   <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName17">Footer field-7</p>
            //                   <p id="foot-7">[Field value]</p>
            //                 </div>
            //                 <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField18">
            //                 <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName18">Footer field-8</p>
            //                 <p id="foot-8">[Field value]</p>
            //               </div>
            //               <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField19">
            //               <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName19">Footer field-9</p>
            //               <p id="foot-9">[Field value]</p>
            //             </div>
            //             </div> <div id="footerDiv"
            //                               style="
            //                                 float: left;
            //                                 width: 100%;
            //                                 margin-top: 30px;
            //                                 padding: 0 0 25px 0;
            //                                 box-sizing: border-box;
            //                               "
            //                                >
            //                               <p style="margin-bottom: 5px; font-weight: bold">Thanking Message</p>
            //                               <p id="p-thanking_message" style="margin-top: 0; margin-bottom: 15px">Thank you message</p>
            //                               <div style="float: left; width: 100%">
            //                                 <p style="margin-bottom: 7px; font-weight: 600">Terms & Conditions</p>
            //                                 <p id="p-terms_and_conditions" style="font-size: 12px; margin-bottom: 0">
            //                                   Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            //                                   accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            //                                   quae ab illo inventore
            //                                 </p>
            //                               </div>
            //                             </div>
            //                           </div>
            //                         </div>
            //                       </div>
            //                    `
                               ,
            invoice_details:
            {
                "status": 1,
                "message": "Invoice details fetched successfully",
                "invoice_details": {
                    "id": 677,
                    "client_id": 152,
                    "item_total_home_currency": 430.37,
                    "tax_amount_home_currency": 19.63,
                    "grand_total_home_currency": 450,
                    "invoice_date": "2021-04-26",
                    "company_name": "mano",
                    "created_on": "2021-07-04 06:08:54",
                    "type": 2,
                    "invoice_number": "SI-9",
                    "foreign_currency": "SGD",
                    "company_address": "inv to",
                    "item_total": 0,
                    "list_id": 1,
                    "status": 1,
                    "tagged_user_id": 1,
                    "item_total_foreign_currency": 430.37,
                    "tax_amount_foreign_currency": 19.63,
                    "grand_total_foreign_currency": 450,
                    "exchange_rate": 1,
                    "balance_sheet_category": 0,
                    "shipping_address": "shipp to",
                    "job_name": "Others",
                    "memo": "memo line",
                    "thanking_message": "thank msg",
                    "terms_and_conditions": "term con",
                    "customer_id": 18,
                    "template_id": 112,
                    "job_id": 247,
                    "due_date": "2021-04-26",
                    "terms": null,
                    "open_balance_home_currency": 379,
                    "open_balance_foreign_currency": 379,
                    "vendor_id": null,
                    "payment_status": 0,
                    "type_name": null,
                    "lastmodified": "2021-07-04 06:08:54",
                    "lastmodifiedby": "",
                    "account": "16668",
                    "debit": 450,
                    "credit": 0,
                    "ship_date": null,
                    "purchase_order_no": 0,
                    "foreign_debit": 450,
                    "foreign_credit": 0,
                    "updated_on": "2021-07-04 06:08:54",
                    "amount_in_words": "Four Hundred Fifty",
                    "tax_inclusive": 1,
                    "file_id": "0",
                    "transaction_number": 58,
                    "is_unapplied_credit_memo": 0,
                    "payment_reference_number": null,
                    "is_reconcile": 0,
                    "description": "",
                    "batch_transaction_id": 0,
                    "default_category": null,
                    "group_accounting_sales_invoice_id": 0,
                    "multi_payment_applied_invoices": null,
                    "due_date_term": 1,
                    "employee_id": 0,
                    "other_staff_id": 0,
                    "batch_transaction_row_index": 0,
                    "invoice_details": [
                        {
                            "item_name": "ee",
                            "descr": "derf",
                            "quantity": "10",
                            "price": 0,
                            "unit_price": "5",
                            "category_id": "13585",
                            "tax_name": "Choose ",
                            "tax_rate": "",
                            "tax_type": "",
                            "item_tax": "0.00",
                            "item_total": 0,
                            "home_item_total": "0.00",
                            "custom_column": [{ "man": "1" }, { "man": "2" }, { "man": "4" }],
                            "man": "1",
                            "tax_code": null,
                            "debit": 0,
                            "credit": "0.00"
                        },
                        {
                            "item_name": "ee",
                            "descr": "derf",
                            "quantity": "20",
                            "price": 0,
                            "unit_price": "5",
                            "category_id": "14168",
                            "tax_name": "Choose ",
                            "tax_rate": "",
                            "tax_type": "",
                            "item_tax": "0.00",
                            "item_total": 0,
                            "home_item_total": "0.00",
                            "custom_column": [{ "man": "1" }, { "man": "2" }, { "man": "4" }],
                            "man": "2",
                            "tax_code": null,
                            "debit": 0,
                            "credit": "0.00"
                        },
                        {
                            "item_name": "ee",
                            "descr": "derf one",
                            "quantity": "30",
                            "price": 280.3738317757009,
                            "unit_price": "10",
                            "category_id": "13585",
                            "tax_name": "7% GST",
                            "tax_rate": "7",
                            "tax_type": "1",
                            "item_tax": "19.63",
                            "item_total": 280.3738317757009,
                            "home_item_total": "280.37",
                            "custom_column": [{ "man": "1" }, { "man": "2" }, { "man": "4" }],
                            "man": "4",
                            "tax_code": "7%",
                            "debit": 0,
                            "credit": "280.37"
                        },
                    ],
                    "payments_applied_foreign_currency": "71.00",
                    "payments_applied_home_currency": "71.00",
                    "exchange_gain_or_loss": 0,
                    "paid_status": "Partially paid",
                    "payment_id": 0,
                    "payment_date": "",
                    "payment_method": "",
                    "payment_amount": 0,
                    "payment_exchange_rate": "",
                    "thrird_party_account_id": "",
                    "third_party_type": "",
                    "third_party_account_name": "",
                    "reference": "",
                    "descripation": "",
                    "custom_header_fields": {
                        "text1": "text1",
                        "drop1": "custom drop 1",
                        "date1": "11/12/2021",
                        "your_extra_data": [
                            ["text1", "custom drop 1", "11/12/2021"],
                            ["foo text", "foo drop", "21/11/2011"]
                        ]
                    },
                    "custom_footer_fields": {
                        "text2": "foo text",
                        "drop2": "foo drop",
                        "date": "21/11/2011"
                    }
                },
                "paymentDetails": [
                    {
                        "id": 58,
                        "invoice_id": 677,
                        "created_date": "2021-07-04 06:08:54",
                        "payment_type": "SinglePayment",
                        "exchange_rate": 1,
                        "total_payment_home_currency": 71,
                        "total_payment_foreign_currency": 71,
                        "customer_id": 18,
                        "job_id": 247,
                        "client_id": 152,
                        "payment_date": "2021-07-04",
                        "open_balance_home_currency": "0",
                        "payor_name": "",
                        "descripation": "pay desc",
                        "third_party_account_name": "",
                        "reference_number": "pay ref",
                        "ar_account": "13522",
                        "third_party_account_id": null,
                        "updated_date": "2021-07-04 06:08:54",
                        "is_bank_reconcile": 0,
                        "status": 0,
                        "bank_id": null,
                        "third_party_type": null,
                        "initial_payment": 1,
                        "exchange_gain_or_loss": 0,
                        "memo": null,
                        "type": 1,
                        "transaction_number": 59,
                        "is_multipayment": 0,
                        "multi_payment_applied_invoices": null,
                        "open_balance_foreign_currency": null,
                        "unapplied_payment_invoices_account": 0
                    }
                ]
            },


            //    html_content:",
            // for headers
            entityname:'Entity name',
            entityaddress:'Address',
            entityphno:'Phone number',
            entityemail:'Email',
            entityuen:'UEN number',
            columnType: "text",
            columnName: "",
            options: [],
            isHeaderColumnUpdate: false,
            // for headers

            // for footers
            columnType1: "text",
            columnName1: "",
            options1: [],
            isHeaderColumnUpdate1: false,
            // for headers
            selected_template_type:'',

            // properties: this.props.location.state.properties

            "properties":  (this.props.location.state && this.props.location.state.properties)  ? this.props.location.state.properties  : {
                "company": {
                    "isEntityName": "true",
                    "isAddress": "true",
                    "isPhoneNumber": "true",
                    "isEmail": "true",
                    "isUenNumber": "true",
                    "isGstNumber": "true"
                },
                "template": {
                    "template_name": "INVOICE",
                    "template_name_color": "",
                    "stripeColor": ""
                },
                "header": {
                    "isLogo": "true",
                    "logoPath": "",
                    "header_text_color": "black",
                    "customField": [],
                    "logoSize": "",
                    "logo_float": "left",
                    "logo_text_align": "left",
                    "logo_display": "flex",
                    "mobDiv_float": "right",
                    "mobDiv_text_align": "right",
                    "fontFamily": "",
                    "fontSize": ""
                },
                "item": {
                    "item_text_color": "black",
                    "fontFamily": "",
                    "fontSize": "",
                    "tableColor": ""
                },
                "footer": {
                    "footer_text_color": "black",
                    "customField": [],
                    "fontFamily": "",
                    "fontSize": ""
                }
            }
        }
    }


    routing_to_edit() {
        FetchAllApi.get_specific_invoice_html(this.props.location.state, (err, response) => {
            if (response.status === 1) {
                let properties = response.details.properties.properties
                // alert(properties.header.header_text_color)
                this.setState({
                    html_content: response.details.html_content,
                    properties
                })


            } else {
                this.setState({})
            }
        })
    }
    handlechange() { 
        
        this.setState({html_content:`<div style=" color: #6a6a6a; background: #fff; min-height: 98%; border: 1px solid #c7c7c7; width: 95%; margin: 0 auto; font-size: 20px; display: block; overflow: hidden; "> <div style="float: left; width: 100%; padding: 25px; box-sizing: border-box"> <div id="isLogo" style=" float: left; display: flex; align-items: center; " > <img id="image" style="width:100px;" src="" alt="logo"/> </div> <div id="mobDiv" style="float: right; text-align: right; width: 42%"> <p id="isEntityName" style="margin-bottom: 0 ;display: block">[`+this.state.entityname+`]</p> <p id="isAddress" style="margin-bottom: 0 ;display: block">[`+this.state.entityaddress+`]</p> <p id="isPhoneNumber" style="margin-bottom: 0 ;display: block">[`+this.state.entityphno+`]</p> <p id="isEmail" style="margin-bottom: 0 ;display: block">[`+this.state.entityemail+`]</p> <p id="isUenNumber" style="margin-bottom: 0 ;display: block">[`+this.state.entityuen+`]</p> <p id="isGstNumber" style="margin-bottom: 0 ;display: block"></p> </div> </div> <div id="stripeDiv" style="background: #e6e6e6; height: 18px; float: left; width: 100%"> <span id="template_name" style=" color: #6a6a6a; background: #fff; font-size: 20px; font-weight: 600; text-transform: uppercase; float: right; margin: -3px 25px 0 0; padding: 0 18px; " >INVOICE</span > </div> <div style="float: left; width: 100%; padding: 25px; box-sizing: border-box"> <div style="float: left; width: 100%"> <div style="float: left; width: 100%"> <div id="headDiv"> <div style="float: left; width: 33%"> <p style="margin-bottom: 8px; font-weight: 600">Invoice to</p> <p> <span id="p-company_address"> [company address] <span> </p> </div> <div style="float: left; width: 33%"> <p style="margin-bottom: 8px; font-weight: 600">Shipping to</p> <p> <span id="p-shipping_address">[shipping address] <span> </p> </div> <div style="float: right; width: 34%; text-align: right"> <p style="margin-bottom: 7px"> <span style="font-weight: 600">Invoice No:</span><span style="margin-left: 25px" id="p-invoice_number">100230<span> </p> <p style="margin-bottom: 0"> <span style="font-weight: 600">Date:</span><span  style="margin-left: 25px"  id="p-invoice_date">10 May 2021<span> </p> <p style="margin-bottom: 0"> <span style="font-weight: 600">Duedate:</span> <span  style="margin-left: 25px"  id="p-due_date">18 May 2021<span> </p> </div> <div style="float: left; width: 100%"> <div style="float: left; width: 20%"> <p style="margin-bottom: 8px; font-weight: 600">Invoice Currency</p> <p id="p-foreign_currency">[Your invoice currency]</p> </div> <div style="float: left; width: 20%"> <p style="margin-bottom: 8px; font-weight: 600">Job Name</p> <p id="p-job_name">[Your job name]</p> </div> <div style="float: left; width: 20%"> <p style="margin-bottom: 8px; font-weight: 600">Memo</p> <p id="p-memo">[Your memo]</p> </div> <div style="float: left; width: 20%" id="p-exchange_div"> <p style="margin-bottom: 8px; font-weight: 600">Exchange Rate</p> <p id="p-exchange_rate">00.00</p> </div> <div style="float: left; width: 20%; display:none" id="customField0"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName0">Exchange Rate</p> <p id="head-0">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField1"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName1">Exchange Rate</p> <p id="head-1">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField2"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName2">Exchange Rate</p> <p id="head-2">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField3"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName3">Exchange Rate</p> <p id="head-3">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField4"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName4">Exchange Rate</p> <p id="head-4">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField5"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName5">Exchange Rate</p> <p id="head-5">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField6"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName6">Exchange Rate</p> <p id="head-6">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField7"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName7">Exchange Rate</p> <p id="head-7">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField8"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName8">Exchange Rate</p> <p id="head-8">[Field value]</p> </div> <div style="float: left; width: 20%; display:none" id="customField9"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName9">Exchange Rate</p> <p id="head-9">[Field value]</p> </div> </div> </div> <div id="itemDiv"> <div style="width: 100%; float: left; min-height: 25.5%"> <table style="box-sizing: border-box;border-collapse: collapse;width: 100%; float: left; margin-top: 25px"> <thead id="thead" style="background: #5e5e5e; border: 1px solid #5e5e5e"> <tr style="color: #fff; font-weight: 500"> <td style="padding: 12px 8px; box-sizing: border-box">No</td> <td style="padding: 12px 8px; box-sizing: border-box"> Item & Description </td> <td style="padding: 12px 8px; box-sizing: border-box"> Price Each </td> <td style=" padding: 12px 8px; text-align: center; box-sizing: border-box; " > Qty </td> <td style=" padding: 12px 8px; text-align: center; box-sizing: border-box; " > Tax </td> <td style=" padding: 12px 8px; text-align: center; box-sizing: border-box; " > Total </td> </tr> </thead> <tbody style="border: 1px solid #bababa"> <tr id="row-1" style="display:table-row"> <td id="row-1-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-1-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-1-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-1-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-1-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-1-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-2" style="display:table-row"> <td id="row-2-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-2-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-2-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-2-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-2-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-2-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-3" style="display:table-row"> <td id="row-3-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-3-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-3-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-3-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-3-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-3-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-4" style="display:none"> <td id="row-4-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-4-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-4-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-4-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-4-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-4-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-5" style="display:none"> <td id="row-5-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-5-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-5-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-5-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-5-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-5-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-6" style="display:none"> <td id="row-6-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-6-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-6-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-6-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-6-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-6-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-7" style="display:none"> <td id="row-7-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-7-2" 
            style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-7-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-7-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-7-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-7-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-8" style="display:none"> <td id="row-8-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-8-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-8-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-8-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-8-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-8-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-9" style="display:none"> <td id="row-9-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-9-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-9-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-9-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-9-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-9-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> <tr id="row-10" style="display:none"> <td id="row-10-1" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">01</td> <td id="row-10-2" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">Lorem ipsum dolor sit amet</td> <td id="row-10-3" style="font-size:20px;padding:12px 8px;box-sizing:border-box;">00.00</td> <td id="row-10-4" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00</td> <td id="row-10-5" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">0.0%</td> <td id="row-10-6" style="font-size:20px;padding:12px 8px;text-align:center;box-sizing:border-box;">00.00</td> </tr> </tbody> </table> </div> <div style="float: left; width: 65%; margin-top: 60px"> <p style="margin-bottom: 5px; font-weight: 500">Amount in Words</p> <div id="p-amount_in_words" style=" border: 1px solid #bababa; float: left; width: 100%; padding: 13px 10px; box-sizing: border-box; " > Amount in Words </div> </div> <div style=" float: right; width: 35%; padding-left: 20px; box-sizing: border-box; " > <div style=" float: left; width: 100%; padding: 13px 10px; margin-top: 10px; box-sizing: border-box; " > <div style=" float: left; width: 50%; font-weight: 600; text-align: right; padding-right: 10px; box-sizing: border-box; " > Sub total </div> <div id = "p-item_total_foreign_currency" style=" text-align: right; padding: 0 10px; float: right; width: 50%; box-sizing: border-box; " > 0.00 </div> </div> <div style=" float: left; width: 100%; padding: 13px 10px; box-sizing: border-box; " > <div style=" float: left; width: 50%; font-weight: 600; text-align: right; padding-right: 10px; box-sizing: border-box; " > Tax </div> <div id = "p-tax_amount_foreign_currency" style=" text-align: right; padding: 0 10px; float: right; width: 50%; box-sizing: border-box; " > 0.00 </div> </div> <div style=" float: left; width: 100%; padding: 15px 10px; background: #efefef; border-radius: 3px; box-sizing: border-box; " > <div style=" float: left; width: 50%; font-weight: 600; text-align: right; padding-right: 10px; box-sizing: border-box; " > Grand Total </div> <div id = "p-grand_total_foreign_currency" style=" text-align: right; padding: 0 10px; float: right; width: 50%; box-sizing: border-box; " > 0.00 </div> </div> </div> </div> </div> <div id="footerCustomDiv"> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField10"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName10">Footer field-1</p> <p id="foot-0">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField11"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName11">Footer field-2</p> <p id="foot-1">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField12"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName12">Footer field-3</p> <p id="foot-2">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField13"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName13">Footer field-3</p> <p id="foot-3">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField14"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName14">Footer field-4</p> <p id="foot-4">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField15"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName15">Footer field-5</p> <p id="foot-5">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField16"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName16">Footer field-6</p> <p id="foot-6">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField17"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName17">Footer field-7</p> <p id="foot-7">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField18"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName18">Footer field-8</p> <p id="foot-8">[Field value]</p> </div> <div style="float: left; width: 20%; display:none ; margin-top: 25px" id="customField19"> <p style="margin-bottom: 8px; font-weight: 600" id="customFieldName19">Footer field-9</p> <p id="foot-9">[Field value]</p> </div> </div> <div id="footerDiv" style=" float: left; width: 100%; margin-top: 30px; padding: 0 0 25px 0; box-sizing: border-box; " > <p style="margin-bottom: 5px; font-weight: bold">Thank you message and Banking details</p> <p id="p-thanking_message" style="margin-top: 0; margin-bottom: 15px">Thank you message and Banking details</p> <div style="float: left; width: 100%"> <p style="margin-bottom: 7px; font-weight: 600">Terms & Conditions</p> <p id="p-terms_and_conditions" style="font-size: 20px; margin-bottom: 0"> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore </p> </div> </div> </div> </div> </div>`});
    }

    handleTextChange =async function(e){
        await this.setState({ [e.target.name]: e.target.value });      
        this.handlechange();   
    };

    print = () => {
        let client_id = this.state.logged_client_id
        let invoice_id = 482
        let html_content = jQuery('#whole_template').html()

        fetch("https://api.genie.com.sg/save_sales_invoice_as_pdf_with_html", {
            method: "POST",
            body: JSON.stringify({
                client_id,
                invoice_id,
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
    }

    updateState = (a, b, c) => {
        let { properties } = this.state
        properties[a][b] = c
        this.setState({ properties })
    }


    // to update state finally
    increase_logo_size = (value) => {
        jQuery('#image').css('width', value*3 + 'px')
        this.updateState('header', 'logoSize', jQuery('#image').css('width'))
    }

    logo_left_right = (value) => {
        if (value == 'left') {
            jQuery('#isLogo').css({ 'float': 'left', 'text-align': 'left', 'display': 'flex' })
            jQuery('#mobDiv').css({ 'float': 'right', 'text-align': 'right' })
        } else {
            jQuery('#isLogo').css({ 'float': 'right', 'text-align': 'right', 'display': 'block' })
            jQuery('#mobDiv').css({ 'float': 'left', 'text-align': 'left' })
        }
        this.updateState('header', 'logo_float', jQuery('#isLogo').css('float'))
        this.updateState('header', 'logo_text_align', jQuery('#isLogo').css('text-align'))
        this.updateState('header', 'logo_display', jQuery('#isLogo').css('display'))
        this.updateState('header', 'mobDiv_float', jQuery('#mobDiv').css('float'))
        this.updateState('header', 'mobDiv_text_align', jQuery('#mobDiv').css('text-align'))
    }

    font_family = (part, value) => {
        if (part == 'header') {
            jQuery('#mobDiv').css('font-family', value)
            jQuery('#headDiv').css('font-family', value)
            this.updateState(part, 'fontFamily', value)
            this.updateState(part, 'fontFamily', value)
        } else if (part == 'item') {
            jQuery('#itemDiv').css('font-family', value)
            this.updateState(part, 'fontFamily', value)
        } else if (part == 'footer') {
            jQuery('#footerDiv').css('font-family', value)
            jQuery('#footerCustomDiv').css('font-family', value)
            this.updateState(part, 'fontFamily', value)
            this.updateState(part, 'fontFamily', value)
        }
    }

    font_size = (part, value) => {
        if (part == 'header') {
            jQuery('#mobDiv').css('font-size', value + 'px')
            jQuery('#headDiv').css('font-size', value + 'px')
            this.updateState(part, 'fontSize', value)
            this.updateState(part, 'fontSize', value)
        } else if (part == 'item') {
            jQuery('#itemDiv').css('font-size', value + 'px')
            this.updateState(part, 'fontSize', value)
        } else if (part == 'footer') {
            jQuery('#footerDiv').css('font-size', value + 'px')
            jQuery('#footerCustomDiv').css('font-size', value + 'px')
            this.updateState(part, 'fontSize', value)
            this.updateState(part, 'fontSize', value)
        }
    }

    stripeColor = e => {
        let value = e.target.value
        jQuery('#template_name').css({ 'color': value })
        jQuery('#stripeDiv').css({ 'background': value })
        this.updateState('template', 'template_name_color', value)
        this.updateState('template', 'stripeColor', value)
    }

    tableColor = e => {
        jQuery('#thead').css({ 'background': e })
        this.updateState('item', 'tableColor', e)
    }

    company = (value, name) => {
        let { properties } = this.state
        properties.company[name] = value
        this.setState({ properties })
        // setTimeout(() => {
        if (value) {
            jQuery('#' + name).css({ 'display': 'block' })
        } else {
            jQuery('#' + name).css({ 'display': 'none' })
        }
        // }, 300);

    }
    // to update state finally


    save = (x) => {
        var template_id = 7
        let data = {
            user_id: this.state.logged_user_id,
            template_name: this.state.properties.template.template_name,
            template_id: ( this.props.location.state && this.props.location.state.id) ? this.props.location.state.id : template_id,
            client_id: this.state.logged_client_id,
            properties: this.state.properties,
            html_content: jQuery('#whole_template').html(),
            save_as_copy:x,
            selected_template_type: this.state.selected_template_type
        } 
        FetchAllApi.edit_invoice_template(data, (err, response) => {
            alert(response.message)
            if (response.status === 1) {
                // this.props.history.push('/invoice_templates')
                this.setState({})
            } else {
                this.setState({
                    default_category_list: []
                })
            }
        })
    }


    // header edit section

    addCoulmn = (e) => {
        let { properties, columnType, columnName } = this.state
        if (columnName !== '') {
            let key = columnName.toLocaleLowerCase().replace(' ', '_')
            let a = { type: columnType, name: columnName, options: this.state.options, key }
            properties['header']['customField'].push(a)
            this.setState({ properties })
            this.modalCancel()
            window.jQuery("#header-add-column").modal("hide")
            setTimeout(() => {
                this.addColunmInTemplate()
            }, 200);
        }
    }
    addColunmInTemplate = (e) => {
        this.state.properties.header.customField.map((item, i) => {
            jQuery('#customField' + i).css('display', 'block')
            jQuery('#customFieldName' + i).html(item.name)
        })
    }
    modalCancel = (e) => { this.setState({ columnType: 'text', columnName: '' }) }
    headerAddCoulmn = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    editColumn = (i) => {
        let obj = this.state.properties['header']['customField'][i]
        this.setState({ columnType: obj.type, columnName: obj.name, options: obj.options, isHeaderColumnUpdate: true, headRow: i })
        window.jQuery("#header-add-column").modal("show")
    }

    updateCoulmn = () => {
        let { properties, columnType, columnName, headRow } = this.state
        if (columnName !== '') {
            let key = columnName.toLocaleLowerCase().replace(' ', '_')
            let a = { type: columnType, name: columnName, options: this.state.options, key }
            let b = properties['header']['customField'][headRow]
            b['type'] = columnType
            b['name'] = columnName
            b['options'] = this.state.options
            b['key'] = key
            this.setState({ properties })
            this.modalCancel()
            window.jQuery("#header-add-column").modal("hide")
            setTimeout(() => {
                this.addColunmInTemplate()
            }, 300);
        }
    }

    deleteColumn = (i) => {
        // setTimeout(() => {
        // this.state.properties.header.customField.map((item, i) => {
        jQuery('#customField' + i).css('display', 'none')
        jQuery('#customFieldName' + i).html('')
        // })
        // }, 200);
        setTimeout(() => {
            let { properties } = this.state
            properties['header']['customField'].splice(i, 1)
            this.setState({ properties })
        }, 300);
    }

    // header edit section

    // Footer edit section   --  just copy of header functions with 1  --

    addCoulmn1 = (e) => {
        let { properties, columnType1, columnName1 } = this.state
        if (columnName1 !== '') {
            let key = columnName1.toLocaleLowerCase().replace(' ', '_')
            let a = { type: columnType1, name: columnName1, options: this.state.options1, key }
            properties['footer']['customField'].push(a)
            this.setState({ properties })
            this.modalCancel1()
            window.jQuery("#footer-add-column").modal("hide")
            setTimeout(() => {
                this.addColunmInTemplate1()
            }, 300);
        }
    }
    addColunmInTemplate1 = (e) => {
        this.state.properties.footer.customField.map((item, i) => {
            jQuery('#customField1' + i).css('display', 'block')
            jQuery('#customFieldName1' + i).html(item.name)
        })
    }
    modalCancel1 = (e) => { this.setState({ columnType1: 'text', columnName1: '' }) }
    headerAddCoulmn1 = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    editColumn1 = (i) => {
        let obj = this.state.properties['footer']['customField'][i]
        this.setState({ columnType1: obj.type, columnName1: obj.name, options1: obj.options, isHeaderColumnUpdate1: true, headRow1: i })
        window.jQuery("#footer-add-column").modal("show")
    }
    updateCoulmn1 = () => {
        let { properties, columnType1, columnName1, headRow1 } = this.state
        if (columnName1 !== '') {
            let key = columnName1.toLocaleLowerCase().replace(' ', '_')
            let a = { type: columnType1, name: columnName1, options: this.state.options1, key }
            let b = properties['footer']['customField'][headRow1]
            b['type'] = columnType1
            b['name'] = columnName1
            b['options'] = this.state.options1
            b['key'] = key
            this.setState({ properties })
            this.modalCancel1()
            window.jQuery("#footer-add-column").modal("hide")
            setTimeout(() => {
                this.addColunmInTemplate1()
            }, 300);
        }
    }
    deleteColumn1 = (i) => {
        jQuery('#customField1' + i).css('display', 'none')
        jQuery('#customFieldName1' + i).html('')
        setTimeout(() => {
            let { properties } = this.state
            properties['footer']['customField'].splice(i, 1)
            this.setState({ properties })
        }, 300);
    }

    // Footer edit section



    append = () => {

        let cc = this.state.invoice_details.invoice_details.invoice_details
       let dd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
       dd.map(row => {
            if (cc.length >= row){
                jQuery("#row-" + row).css("display", "table-row")

                jQuery("#row-" + row + "-" + 1).html(row)
                jQuery("#row-" + row + "-" + 2).html(cc[row-1].descr)
                jQuery("#row-" + row + "-" + 3).html(cc[row-1].unit_price)
                jQuery("#row-" + row + "-" + 4).html(cc[row-1].quantity)
                jQuery("#row-" + row + "-" + 5).html(cc[row-1].tax_name == "Choose " ? "--" : cc[row-1].tax_name)
                jQuery("#row-" + row + "-" + 6).html(Number(cc[row-1].quantity) * Number(cc[row-1].unit_price) )
            }else{
                jQuery("#row-" + row).css("display", "none")
            }
})
        


        let bb = this.state.entity_details.data[0]
        jQuery("#isEntityName").html(bb.name)
        jQuery("#isAddress").html(bb.address)
        jQuery("#isPhoneNumber").html(bb.phone)
        jQuery("#isEmail").html(bb.email_id)
        jQuery("#isUenNumber").html(bb.unique_entity_number)



        let aa = this.state.invoice_details.invoice_details
        jQuery("#p-company_address").html(aa.company_address)
        jQuery("#p-shipping_address").html(aa.shipping_address)
        jQuery("#p-invoice_number").html(aa.invoice_number)
        jQuery("#p-invoice_date").html(moment(aa.invoice_date).format('DD/MM/YYYY'))
        jQuery("#p-due_date").html(moment(aa.due_date).format('DD/MM/YYYY'))

        jQuery("#p-foreign_currency").html(aa.foreign_currency)
        jQuery("#p-job_name").html(aa.job_name)
        jQuery("#p-memo").html(aa.memo)

        if (aa.exchange_rate == 1) {
            jQuery("#p-exchange_div").css('display', 'none')
        } else {
            jQuery("#p-exchange_rate").html(aa.exchange_rate)
        }

        jQuery("#p-amount_in_words").html(aa.amount_in_words)
        jQuery("#p-item_total_foreign_currency").html(aa.item_total_foreign_currency)
        jQuery("#p-tax_amount_foreign_currency").html(aa.tax_amount_foreign_currency)
        jQuery("#p-grand_total_foreign_currency").html(aa.grand_total_foreign_currency)

        jQuery("#p-thanking_message").html(aa.thanking_message)
        jQuery("#p-terms_and_conditions").html(aa.terms_and_conditions)




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


    }


    componentDidMount() {
 
        FetchAllApi.get_data(this.state.logged_client_id, (err, response) => {
            if (response.status === 1) {
                let logo = response.data[0] ? response.data[0].logo ? response.data[0].logo : '' : ''
                // let properties = this.state.properties
                // properties['header']['logoPath'] = response.data[0].logo
              this.setState({entity_details:response 
                // ,properties
            })
             
              setTimeout(() => {
                  document.getElementById("image").src = logo
              }, 500);
            }
          })

        //   this.routing_to_edit()
          

        // designer code

        window.jQuery(".mscroll-y").mCustomScrollbar({
            axis: "y",
            scrollEasing: "linear",
            scrollInertia: 300,
            autoHideScrollbar: "true",
            autoExpandScrollbar: "true",
            scrollbarPosition: "outside"
        });
        window.jQuery(".ib-scroll").mCustomScrollbar({
            scrollEasing: "linear",
            scrollInertia: 600,
            scrollbarPosition: "outside"
        });
        jQuery(document).ready(function () {
            jQuery(".has-sub").click(function () {
                jQuery(this).parent().addClass("active").next(".sub-menu").slideToggle();
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
            jQuery('[data-toggle="tooltip"]').tooltip();

        });
        jQuery(document).on("shown.bs.dropdown", ".dropdown", function () {
            // calculate the required sizes, spaces
            var jQueryul = jQuery(this).children(".dropdown-menu");
            var jQuerybutton = jQuery(this).children(".dropdown-toggle");
            var ulOffset = jQueryul.offset();
            // how much space would be left on the top if the dropdown opened that direction
            var spaceUp = (ulOffset.top - jQuerybutton.height() - jQueryul.height()) - jQuery(window).scrollTop();
            // how much space is left at the bottom
            var spaceDown = jQuery(window).scrollTop() + jQuery(window).height() - (ulOffset.top + jQueryul.height());
            // switch to dropup only if there is no space at the bottom AND there is space at the top, or there isn't either but it would be still better fit
            if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown))
                jQuery(this).addClass("dropup");
        }).on("hidden.bs.dropdown", ".dropdown", function () {
            // always reset after close
            jQuery(this).removeClass("dropup");
        });

        

    }


    updateProperties = (e, part, type, use) => {
        let { name } = e.target
        let properties = this.state.properties
        let value = type == 'html' ? e.target.value : type == 'checked' ? e.target.checked : ''
        properties[part][name] = value
        this.setState({ properties })
        setTimeout(() => {
            this.updateTemplate(name, value, type, use)
        }, 100);
    }

    updateTemplate = (name, value, type, use) => {

        if (type == 'html')
            jQuery('#' + name).html(value)

        if (type == 'checked') {
            let set = value ? use : 'none'
            jQuery('#' + name).css('display', set)
        }
    }

    headerTextColorChanged = (e, part) => {
        let { name, value } = e.target
        let properties = this.state.properties
        properties[part][name] = value
        this.setState({ properties })

        setTimeout(() => {
            if (part == 'header') {
                jQuery('#mobDiv').css('color', value)
                jQuery('#headDiv').css('color', value)
            }
            if (part == 'item'){
                jQuery('#itemDiv').css('color', value)
            }
            if (part == 'footer') {
                jQuery('#footerDiv').css('color', value)
                jQuery('#footerCustomDiv').css('color', value)
            }
        }, 100);
    }

    render() {

        let { company, template, header, item, footer } = this.state.properties


        return (
            <div>
                {/* Main Wrapper Starts here */}
                <div className="container-fluid invoice-editor">
                    <div className="row">
                        {/* Builder Left Starts here */}
                        <div className="builder-left">
                            <div className="mscroll-y">
                                <form className="custom-form mar-btm">
                                    <h5>Template Name</h5>
                                    <input type="text" className="form-control" name='template_name' value={template['template_name']} placeholder="Template Title"
                                        onChange={(e) => { this.updateProperties(e, 'template', 'html', 'noNeed') }}
                                    />
                                </form>
                                <h5>Template Properties</h5>
                                <ul className="nav nav-pills">
                                    <li><a data-toggle="pill" href="#tab-company">Company</a></li>
                                    <li className="active"><a data-toggle="pill" href="#tab-header">Header</a></li>
                                    <li><a data-toggle="pill" href="#tab-item">Item</a></li>
                                    <li style={{ margin: '10px' }} ><a data-toggle="pill" href="#tab-footer">Footer</a></li>
                                </ul>
                                <div className="tab-content">


                                    <div id="tab-company" className="tab-pane fade">
                                        <form className="custom-form">
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox"
                                                            checked={company.isEntityName}
                                                            onChange={(e) => this.company(e.target.checked, 'isEntityName')}
                                                        />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Entity Name</span>
                                                </span>
                                                <div className="input-group">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="entityname" value={this.state.entityname} onChange={(e) => this.handleTextChange(e)} placeholder="Entity Name" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox"
                                                            checked={company.isAddress}
                                                            onChange={(e) => this.company(e.target.checked, 'isAddress')}
                                                        />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Address</span>
                                                </span>
                                                <div className="input-group">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="entityaddress" value={this.state.entityaddress} onChange={(e) => this.handleTextChange(e)}  placeholder="Address" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox"
                                                            checked={company.isPhoneNumber}
                                                            onChange={(e) => this.company(e.target.checked, 'isPhoneNumber')}
                                                        />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Phone number</span>
                                                </span>
                                                <div className="input-group">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="entityphno" value={this.state.entityphno} onChange={(e) => this.handleTextChange(e)} placeholder="Phone number" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox"
                                                            checked={company.isEmail}
                                                            onChange={(e) => this.company(e.target.checked, 'isEmail')}
                                                        />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">E-mail</span>
                                                </span>
                                                <div className="input-group">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="entityemail" value={this.state.entityemail} onChange={(e) => this.handleTextChange(e)} placeholder="E-mail" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox"
                                                            checked={company.isUenNumber}
                                                            onChange={(e) => this.company(e.target.checked, 'isUenNumber')}
                                                        />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">UEN number</span>
                                                </span>
                                                <div className="input-group">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="entityuen" value={this.state.entityuen} onChange={(e) => this.handleTextChange(e)} placeholder="UEN number" />
                                                </div>
                                            </div>
                                            {/* <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox"
                                                            checked={company.isGstNumber}
                                                            onChange={(e) => this.company(e.target.checked, 'isGstNumber')}
                                                        />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">GST registration number</span>
                                                </span>
                                                <div className="input-group">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="label" defaultValue="GST registration number" />
                                                </div>
                                            </div> */}



                                        </form>
                                    </div>





                                    <div id="tab-header" className="tab-pane fade in active">
                                        <form className="custom-form">
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input name='isLogo' type="checkbox" checked={header.isLogo}
                                                            onChange={(e) => { this.updateProperties(e, 'header', 'checked', 'flex') }}
                                                        />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">
                                                        Entity Logo
                                                        <i data-toggle="tooltip" data-placement="right" tabIndex={0} title="You can change the logo from Organization settings">
                                                            <img src={"images/round-info-icon.svg"} alt="icon" />
                                                        </i>
                                                    </span>
                                                </span>
                                                <div className="logo-wrap">
                                                    <img className="img-responsive" src={header.logoPath ? header.logoPath : "images/form-sample-logo.png"} alt="icon" />
                                                </div>
                                                <div className="range-encl">
                                                    <span className="form-label">Logo Size</span>
                                                    <input type="range" name="img-size"
                                                        onChange={e =>
                                                            this.increase_logo_size(e.target.value)
                                                        } />
                                                </div>
                                            </div>
                                            <div className='form-group clearfix'>
                                                <span className='form-label'>Logo position</span>
                                                <div className='input-group'>
                                                    <select
                                                        className='form-control'
                                                        onChange={e =>
                                                            this.logo_left_right(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option>left</option>
                                                        {/* <option>center</option> */}
                                                        <option>right</option>
                                                    </select>
                                                </div>
                                            </div>



                                            <div className='form-group clearfix'>
                                                <span className='form-label'>Font family</span>
                                                <div className='input-group'>
                                                    <select
                                                        className='form-control'
                                                        onChange={e =>
                                                            this.font_family('header', e.target.value)
                                                        }
                                                    >
                                                        <option value=''>Choose</option>
                                                        <option>Arial, sans-serif</option>
                                                        <option>Helvetica, sans-serif</option>
                                                        <option>Gill Sans, sans-serif</option>
                                                        <option>Lucida, sans-serif</option>
                                                        <option>Helvetica Narrow, sans-serif</option>
                                                        <option>sans-serif</option>


                                                        <option>Times, serif</option>
                                                        <option>Times New Roman, serif</option>
                                                        <option>Palatino, serif</option>
                                                        <option>Bookman, serif</option>
                                                        <option>New Century Schoolbook, serif</option>
                                                        <option>serif</option>


                                                        <option>Andale Mono, monospace</option>
                                                        <option>Courier New, monospace</option>
                                                        <option>Courier, monospace</option>
                                                        <option>Lucidatypewriter, monospace</option>
                                                        <option>Fixed, monospace</option>
                                                        <option>monospace</option>


                                                        <option>Comic Sans, Comic Sans MS, cursive</option>
                                                        <option>Zapf Chancery, cursive</option>
                                                        <option>Coronetscript, cursive</option>
                                                        <option>Florence, cursive</option>
                                                        <option>Parkavenue, cursive</option>
                                                        <option>cursive</option>


                                                        <option>Impact, fantasy</option>
                                                        <option>Arnoldboecklin, fantasy</option>
                                                        <option>Oldtown, fantasy</option>
                                                        <option>Blippo, fantasy</option>
                                                        <option>Brushstroke, fantasy</option>
                                                        <option>fantasy</option>
                                                      
                                                    </select>
                                                </div>
                                            </div>


                                            <div className='form-group clearfix'>
                                                <span className='form-label'>Font Size</span>
                                                <div className='input-group'>
                                                    <select
                                                        className='form-control'
                                                        onChange={e =>
                                                            this.font_size('header',
                                                                Number(e.target.value)*1.33
                                                            )
                                                        }
                                                    >
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                        <option value='4' selected>4</option>
                                                        <option value='5'>5</option>
                                                        <option value='6'>6</option>
                                                        <option value='7'>7</option>
                                                        <option value='8'>8</option>
                                                        <option value='9'>9</option>
                                                        <option value='10'>10</option>
                                                        <option value='11'>11</option>
                                                        <option value='12'>12</option>
                                                        <option value='13'>13</option>
                                                        <option value='14'>14</option>
                                                        <option value='15'>15</option>
                                                        <option value='16'>16</option>
                                                        <option value='17'>17</option>
                                                        <option value='18'>18</option>
                                                        <option value='19'>19</option>
                                                        <option value='20'>20</option>
                                                        <option value='21'>21</option>
                                                        <option value='22'>22</option>
                                                        <option value='23'>23</option>
                                                        <option value='24'>24</option>
                                                        <option value='25'>25</option>
                                                        <option value='26'>26</option>
                                                        <option value='27'>27</option>
                                                        <option value='28'>28</option>
                                                        <option value='29'>29</option>
                                                        <option value='30'>30</option>

                                                    </select>
                                                </div>
                                            </div>



                                            <div className="form-group clearfix">


                                                <span className="form-label fw-sbold w-100 mar-btm">Header Options</span>
                                                {/* <div className="clearfix">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Stripe Background</span>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" name="text-color" />
                                                            <span className="input-group-addon">
                                                                <img src="images/color-wheel-icon.svg" alt="icon" />
                                                            </span>
                                                        </div>
                                                    </span>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="form-label">Text Size</span>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="text-size" />
                                                        <span className="input-group-addon fw-500">pt</span>
                                                    </div>
                                                </div>
                                                */}

                                                <div className="clearfix">
                                                    <span className="form-label"> Stripe Color</span>
                                                    <div className="input-group">
                                                        <input type="color" name='header_stripe_color' className="form-control"
                                                            value={header.header_stripe_color}
                                                            onChange={(e) => {
                                                                this.stripeColor(e)
                                                            }} />
                                                        <span className="input-group-addon">
                                                            <img src="images/color-wheel-icon.svg" alt="icon" />
                                                        </span>
                                                    </div>
                                                </div>


                                                <div className="clearfix">
                                                    <span className="form-label">Text Color</span>
                                                    <div className="input-group">
                                                        <input type="color" name='header_text_color' className="form-control"
                                                            value={header.header_text_color}
                                                            onChange={(e) => {
                                                                this.headerTextColorChanged(e, 'header')
                                                            }} />
                                                        <span className="input-group-addon">
                                                            <img src="images/color-wheel-icon.svg" alt="icon" />
                                                        </span>
                                                    </div>
                                                </div>


                                            </div>

                                            {/*                                             
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox" />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Entity Name</span>
                                                </span>
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox" defaultChecked="checked" />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Entity Address</span>
                                                </span>
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox" defaultChecked="checked" />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Entity Contact No.</span>
                                                </span>
                                            </div>
                                            <div className="form-group clearfix mar-b-no">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox" defaultChecked="checked" />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Entity Email</span>
                                                </span>
                                            </div>
                                          */}


                                            <span className="form-label fw-sbold w-100 mar-btm">Custom Columns</span>
                                            <button className="btn btn-blue btn-img mar-btm" type='button' onClick={() => {
                                                this.setState({ isHeaderColumnUpdate: false })
                                                setTimeout(() => {
                                                    window.jQuery("#header-add-column").modal("show")
                                                }, 300);

                                            }
                                            }>
                                                <img src="images/add-circular-icon.svg" alt="icon" />Add Fields


                                            </button>
                                            {header.customField && header.customField.map((item, i) => {
                                                return (
                                                    <>
                                                        <div className='pull-right' >
                                                            <a onClick={() => this.editColumn(i)}>Edit</a>{' '}
                                                            <a onClick={() => this.deleteColumn(i)}>Delete</a>
                                                        </div>
                                                        <div className="clearfix mar-btm">
                                                            {/* <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Grand Total</span>
                                                    </span> */}
                                                            <div className="input-group">
                                                                <span className="input-group-addon addon-left fw-500">{item.type}</span>
                                                                <input type="text" className="form-control" name="label" value={item.name} />
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })}


                                            <small><i>Change header item content from organization profile</i></small>
                                        </form>
                                    </div>
                                    <div id="tab-item" className="tab-pane fade">
                                        <form className="custom-form">
                                            <div className="form-group clearfix">
                                                <span className="form-label fw-sbold w-100 mar-btm">Items Options</span>
                                                {/* <div className="clearfix mar-btm">
                                                    <span className="form-label">Text Size</span>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="text-size" />
                                                        <span className="input-group-addon fw-500">pt</span>
                                                    </div>
                                                </div>
                                                */}

                                                <div className="clearfix">
                                                    <span className="form-label">Table Color</span>
                                                    <div className="input-group">
                                                        <input type="color" className="form-control" name='item_table_color' value={item.item_table_color}
                                                            onChange={(e) => {
                                                                this.tableColor(e.target.value)
                                                            }}
                                                        />
                                                        <span className="input-group-addon">
                                                            <img src="images/color-wheel-icon.svg" alt="icon" />
                                                        </span>
                                                    </div>
                                                </div>


                                                <div className="clearfix">
                                                    <span className="form-label">Text Color</span>
                                                    <div className="input-group">
                                                        <input type="color" className="form-control" name='item_text_color' value={item.item_text_color}
                                                            onChange={(e) => {
                                                                this.headerTextColorChanged(e, 'item')
                                                            }}
                                                        />
                                                        <span className="input-group-addon">
                                                            <img src="images/color-wheel-icon.svg" alt="icon" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox" defaultChecked="checked" />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Invoice to</span>
                                                </span>
                                                <div className="input-group">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="label" defaultValue="Invoice to" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox" />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Bill to</span>
                                                </span>
                                                <div className="input-group">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="label" defaultValue="Bill to" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox" defaultChecked="checked" />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Invoice No</span>
                                                </span>
                                                <div className="input-group">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="label" defaultValue="Invoice no" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox" defaultChecked="checked" />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Date</span>
                                                </span>
                                                <div className="input-group">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="label" defaultValue="Date" />
                                                </div>
                                            </div>
                                             */}

                                            {/* <div className="form-group clearfix">
                                                <span className="form-label fw-sbold w-100 mar-btm">Table Properties</span>
                                                <div className="clearfix mar-btm">
                                                    <span className="form-label">Text Size</span>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="text-size" />
                                                        <span className="input-group-addon fw-500">pt</span>
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="form-label">Text Color</span>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="text-color" />
                                                        <span className="input-group-addon">
                                                            <img src="images/color-wheel-icon.svg" alt="icon" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="form-label">Table background</span>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="text-color" />
                                                        <span className="input-group-addon">
                                                            <img src="images/color-wheel-icon.svg" alt="icon" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="form-label">Table head background</span>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="text-color" />
                                                        <span className="input-group-addon">
                                                            <img src="images/color-wheel-icon.svg" alt="icon" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="form-label">Table row background</span>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="text-color" />
                                                        <span className="input-group-addon">
                                                            <img src="images/color-wheel-icon.svg" alt="icon" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="form-label">Table border color</span>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="text-color" />
                                                        <span className="input-group-addon">
                                                            <img src="images/color-wheel-icon.svg" alt="icon" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="form-label fw-sbold w-100 mar-btm">Table Label</span>
                                                <button className="btn btn-blue btn-img mar-btm">
                                                    <img src="images/add-circular-icon.svg" alt="icon" />Add Label
                                                </button>
                                                <div className="clearfix mar-btm">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">No</span>
                                                    </span>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addon-left fw-500">Label</span>
                                                        <input type="text" className="form-control" name="label" defaultValue="No" />
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Item</span>
                                                    </span>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addon-left fw-500">Label</span>
                                                        <input type="text" className="form-control" name="label" defaultValue="Item & Description" />
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Price Each</span>
                                                    </span>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addon-left fw-500">Label</span>
                                                        <input type="text" className="form-control" name="label" defaultValue="Price Each" />
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Quantity</span>
                                                    </span>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addon-left fw-500">Label</span>
                                                        <input type="text" className="form-control" name="label" defaultValue="Qty" />
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Tax</span>
                                                    </span>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addon-left fw-500">Label</span>
                                                        <input type="text" className="form-control" name="label" defaultValue="Tax" />
                                                    </div>
                                                </div>
                                                <div className="clearfix">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Total</span>
                                                    </span>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addon-left fw-500">Label</span>
                                                        <input type="text" className="form-control" name="label" defaultValue="Total" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="form-label fw-sbold w-100 mar-btm">Total Properties</span>
                                                <div className="clearfix mar-btm">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Sub Total</span>
                                                    </span>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addon-left fw-500">Label</span>
                                                        <input type="text" className="form-control" name="label" defaultValue="Sub Total" />
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Tax</span>
                                                    </span>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addon-left fw-500">Label</span>
                                                        <input type="text" className="form-control" name="label" defaultValue="Tax" />
                                                    </div>
                                                </div>
                                                <div className="clearfix mar-btm">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Grand Total</span>
                                                    </span>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addon-left fw-500">Label</span>
                                                        <input type="text" className="form-control" name="label" defaultValue="Grand Total" />
                                                    </div>
                                                </div>
                                                <div className="clearfix">
                                                    <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Amount in Words</span>
                                                    </span>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addon-left fw-500">Label</span>
                                                        <input type="text" className="form-control" name="label" defaultValue="Amount in Words" />
                                                    </div>
                                                </div>
                                            </div>
                                        */}





                                            <div className='form-group clearfix'>
                                                <span className='form-label'>Font family</span>
                                                <div className='input-group'>
                                                    <select
                                                        className='form-control'
                                                        onChange={e =>
                                                            this.font_family('item', e.target.value)
                                                        }
                                                    >
                                                        <option value=''>Choose</option>
                                                        <option>Arial, sans-serif</option>
                                                        <option>Helvetica, sans-serif</option>
                                                        <option>Gill Sans, sans-serif</option>
                                                        <option>Lucida, sans-serif</option>
                                                        <option>Helvetica Narrow, sans-serif</option>
                                                        <option>sans-serif</option>


                                                        <option>Times, serif</option>
                                                        <option>Times New Roman, serif</option>
                                                        <option>Palatino, serif</option>
                                                        <option>Bookman, serif</option>
                                                        <option>New Century Schoolbook, serif</option>
                                                        <option>serif</option>


                                                        <option>Andale Mono, monospace</option>
                                                        <option>Courier New, monospace</option>
                                                        <option>Courier, monospace</option>
                                                        <option>Lucidatypewriter, monospace</option>
                                                        <option>Fixed, monospace</option>
                                                        <option>monospace</option>


                                                        <option>Comic Sans, Comic Sans MS, cursive</option>
                                                        <option>Zapf Chancery, cursive</option>
                                                        <option>Coronetscript, cursive</option>
                                                        <option>Florence, cursive</option>
                                                        <option>Parkavenue, cursive</option>
                                                        <option>cursive</option>


                                                        <option>Impact, fantasy</option>
                                                        <option>Arnoldboecklin, fantasy</option>
                                                        <option>Oldtown, fantasy</option>
                                                        <option>Blippo, fantasy</option>
                                                        <option>Brushstroke, fantasy</option>
                                                        <option>fantasy</option>
                                                    </select>
                                                </div>
                                            </div>


                                            <div className='form-group clearfix'>
                                                <span className='form-label'>Font Size</span>
                                                <div className='input-group'>
                                                    <select
                                                        className='form-control'
                                                        onChange={e =>
                                                            this.font_size('item',
                                                            Number(e.target.value)*1.33
                                                            )
                                                        }
                                                    >
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                        <option value='4' selected>4</option>
                                                        <option value='5'>5</option>
                                                        <option value='6'>6</option>
                                                        <option value='7'>7</option>
                                                        <option value='8'>8</option>
                                                        <option value='9'>9</option>
                                                        <option value='10'>10</option>
                                                        <option value='11'>11</option>
                                                        <option value='12'>12</option>
                                                        <option value='13'>13</option>
                                                        <option value='14'>14</option>
                                                        <option value='15'>15</option>
                                                        <option value='16'>16</option>
                                                        <option value='17'>17</option>
                                                        <option value='18'>18</option>
                                                        <option value='19'>19</option>
                                                        <option value='20'>20</option>
                                                        <option value='21'>21</option>
                                                        <option value='22'>22</option>
                                                        <option value='23'>23</option>
                                                        <option value='24'>24</option>
                                                        <option value='25'>25</option>
                                                        <option value='26'>26</option>
                                                        <option value='27'>27</option>
                                                        <option value='28'>28</option>
                                                        <option value='29'>29</option>
                                                        <option value='30'>30</option>

                                                    </select>
                                                </div>
                                            </div>




                                        </form>
                                    </div>
                                    <div id="tab-footer" className="tab-pane fade">
                                        <form className="custom-form">
                                            <div className="form-group clearfix">
                                                <span className="form-label fw-sbold w-100 mar-btm">Footer Options</span>
                                                {/* <div className="clearfix mar-btm">
                                                    <span className="form-label">Text Size</span>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="text-size" />
                                                        <span className="input-group-addon fw-500">pt</span>
                                                    </div>
                                                </div>
                                                 */}
                                                <div className="clearfix">
                                                    <span className="form-label">Text Color</span>
                                                    <div className="input-group">
                                                        <input type="color" className="form-control" name='footer_text_color'
                                                            value={header.footer_text_color}
                                                            onChange={(e) => {
                                                                this.headerTextColorChanged(e, 'footer')
                                                            }} />
                                                        <span className="input-group-addon">
                                                            <img src="images/color-wheel-icon.svg" alt="icon" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox" defaultChecked="checked" />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Thanking Message</span>
                                                </span>
                                                <textarea className="form-control" placeholder="Thank you" defaultValue={""} />
                                            </div>
                                            <div className="form-group clearfix">
                                                <span className="editor-label">
                                                    <label className="switch">
                                                        <input type="checkbox" defaultChecked="checked" />
                                                        <span className="drag-ball">
                                                            <span className="off" />
                                                            <span className="on" />
                                                        </span>
                                                    </label>
                                                    <span className="form-label">Terms &amp; Conditions</span>
                                                </span>
                                                <div className="input-group mar-btm">
                                                    <span className="input-group-addon addon-left fw-500">Label</span>
                                                    <input type="text" className="form-control" name="label" defaultValue="Terms & Conditions" />
                                                </div>
                                                <textarea className="form-control" placeholder="Terms & Conditions" defaultValue={""} />
                                            </div>
                                         */}


                                            <div className='form-group clearfix'>
                                                <span className='form-label'>Font family</span>
                                                <div className='input-group'>
                                                    <select
                                                        className='form-control'
                                                        onChange={e =>
                                                            this.font_family('footer', e.target.value)
                                                        }
                                                    > <option value=''>Choose</option>
                                                        <option>Arial, sans-serif</option>
                                                        <option>Helvetica, sans-serif</option>
                                                        <option>Gill Sans, sans-serif</option>
                                                        <option>Lucida, sans-serif</option>
                                                        <option>Helvetica Narrow, sans-serif</option>
                                                        <option>sans-serif</option>


                                                        <option>Times, serif</option>
                                                        <option>Times New Roman, serif</option>
                                                        <option>Palatino, serif</option>
                                                        <option>Bookman, serif</option>
                                                        <option>New Century Schoolbook, serif</option>
                                                        <option>serif</option>


                                                        <option>Andale Mono, monospace</option>
                                                        <option>Courier New, monospace</option>
                                                        <option>Courier, monospace</option>
                                                        <option>Lucidatypewriter, monospace</option>
                                                        <option>Fixed, monospace</option>
                                                        <option>monospace</option>


                                                        <option>Comic Sans, Comic Sans MS, cursive</option>
                                                        <option>Zapf Chancery, cursive</option>
                                                        <option>Coronetscript, cursive</option>
                                                        <option>Florence, cursive</option>
                                                        <option>Parkavenue, cursive</option>
                                                        <option>cursive</option>


                                                        <option>Impact, fantasy</option>
                                                        <option>Arnoldboecklin, fantasy</option>
                                                        <option>Oldtown, fantasy</option>
                                                        <option>Blippo, fantasy</option>
                                                        <option>Brushstroke, fantasy</option>
                                                        <option>fantasy</option>
                                                    </select>
                                                </div>
                                            </div>


                                            <div className='form-group clearfix'>
                                                <span className='form-label'>Font Size</span>
                                                <div className='input-group'>
                                                    <select
                                                        className='form-control'
                                                        onChange={e =>
                                                            this.font_size('footer',
                                                            Number(e.target.value)*1.33
                                                            )
                                                        }
                                                    >
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                        <option value='4' selected>4</option>
                                                        <option value='5'>5</option>
                                                        <option value='6'>6</option>
                                                        <option value='7'>7</option>
                                                        <option value='8'>8</option>
                                                        <option value='9'>9</option>
                                                        <option value='10'>10</option>
                                                        <option value='11'>11</option>
                                                        <option value='12'>12</option>
                                                        <option value='13'>13</option>
                                                        <option value='14'>14</option>
                                                        <option value='15'>15</option>
                                                        <option value='16'>16</option>
                                                        <option value='17'>17</option>
                                                        <option value='18'>18</option>
                                                        <option value='19'>19</option>
                                                        <option value='20'>20</option>
                                                        <option value='21'>21</option>
                                                        <option value='22'>22</option>
                                                        <option value='23'>23</option>
                                                        <option value='24'>24</option>
                                                        <option value='25'>25</option>
                                                        <option value='26'>26</option>
                                                        <option value='27'>27</option>
                                                        <option value='28'>28</option>
                                                        <option value='29'>29</option>
                                                        <option value='30'>30</option>

                                                    </select>
                                                </div>
                                            </div>





                                            <span className="form-label fw-sbold w-100 mar-btm">Custom Columns</span>
                                            <button className="btn btn-blue btn-img mar-btm" type='button' onClick={() => {
                                                this.setState({ isHeaderColumnUpdate1: false })
                                                setTimeout(() => {
                                                    window.jQuery("#footer-add-column").modal("show")
                                                }, 300);

                                            }
                                            }>
                                                <img src="images/add-circular-icon.svg" alt="icon" />Add Fields


                                            </button>
                                            {footer.customField && footer.customField.map((item, i) => {
                                                return (
                                                    <>
                                                        <div className='pull-right' >
                                                            <a onClick={() => this.editColumn1(i)}>Edit</a>{' '}
                                                            <a onClick={() => this.deleteColumn1(i)}>Delete</a>
                                                        </div>
                                                        <div className="clearfix mar-btm">
                                                            {/* <span className="editor-label">
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked="checked" />
                                                            <span className="drag-ball">
                                                                <span className="off" />
                                                                <span className="on" />
                                                            </span>
                                                        </label>
                                                        <span className="form-label">Grand Total</span>
                                                    </span> */}
                                                            <div className="input-group">
                                                                <span className="input-group-addon addon-left fw-500">{item.type}</span>
                                                                <input type="text" className="form-control" name="label" value={item.name} />
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })}






                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-wrap text-right hidden-xs small-btn-wrap">
                                {/* <button className="btn btn-lightgray">Preview</button> */}
                                <button type='button' className="btn btn-success" onClick={() => { 
                                    window.jQuery("#checkingType").modal("show")
                                    // this.save(1) 
                                    }}>Save as new template</button>
                                <button type='button' className="btn btn-warning" onClick={() => { this.save(0) }}>Update this template</button>
                                {/* <button type='button' className="btn btn-success" onClick={() => { this.print() }}>check</button> */}
                                {/* <button type='button' className="btn btn-success" onClick={() => { this.append() }}>append</button> */}
                                {/* <div className="custom-select-drop dropdown btn">
                                    <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn btn-green" href="javascript:;">
                                        <span
                                        // id="selected"
                                        >Save</span><span className="caret" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="active"><a href="javascript:;" data-toggle="modal" data-target="#successModal">Save</a></li>
                                        <li><a href="javascript:;">Save &amp; Continue</a></li>
                                        <li><a href="javascript:;">Save as Copy</a></li>
                                        <li><a href="javascript:;">Save Draft</a></li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                        {/* Builder Left Ends here */}
                        {/* Builder Right Starts here */}
                        <div className="builder-right">
                            <a href="/invoice_templates" className="close-btn"><img className="img-responsive" src="images/close-circle-red.svg" /></a>
                            <div id='whole_template' className="template-item">
                                {/* Simple Invoice Template Starts here */}
                                {parse(
                                   this.state.html_content
                                )}
                                {/* Simple Invoice Template Ends here */}
                            </div>
                            <div className="zoom-btn">
                                <a href="javascript:;" className="plus"><img src="images/zoom-in.svg" alt="icon" /></a>
                                <a href="javascript:;" className="minus"><img src="images/zoom-out.svg" alt="icon" /></a>
                            </div>
                            <div className="btn-wrap text-right visible-xs">
                                {/* <button className="btn btn-lightgray">Preview</button> */}

                                {/* <div className="custom-select-drop dropdown btn">
                                    <a aria-expanded="false"
                                        aria-haspopup="true"
                                        role="button"
                                        data-toggle="dropdown" 
                                        className="dropdown-toggle btn btn-green" 
                                        // href="javascript:;"
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            alert('hii')
                                        }}
                                        >
                                        <span id="selected">Save</span><span className="caret" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="active"><a href="javascript:;">Save</a></li>
                                        <li><a href="javascript:;">Save &amp; Continue</a></li>
                                        <li><a href="javascript:;">Save as Copy</a></li>
                                        <li><a href="javascript:;">Save Draft</a></li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                        {/* Builder Right Ends here */}
                    </div>
                </div>

                {/* Main Wrapper Ends here */}
                {/* Modal Wrapper Starts here */}
                <div className="modal fade" id="successModal" role="dialog">
                    <div className="modal-dialog modal-md">
                        {/* Modal content*/}
                        <button type="button" className="close hidden-xs" data-dismiss="modal">
                            <img className="img-responsive" src="images/close-red.svg" alt="icon" />
                        </button>
                        <div className="modal-content">
                            <div className="modal-body text-center success-modal">
                                <div className="pop-icon">
                                    <img src="images/template-success-icon.png" alt="icon" />
                                </div>
                                <h3>Awesome!</h3>
                                <p className="fw-500">Your invoice template has been saved successfully</p>
                                <button className="btn btn-green" data-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal Wrapper Ends here */}


                {/* add header custom column */}
                <div
                    className="modal fade pop-modal"
                    id="header-add-column"
                    role="dialog"
                >
                    <div className="modal-dialog modal-md custom-modal">
                        <button
                            type="button"
                            className="close hidden-xs"
                            data-dismiss="modal"
                        // onClick={this.cancel_gst_modal}
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
                                            <label>Type of the field</label>
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-xs-12 mar-btm">
                                            <label className="custom-checkbox radio mar-rgt taxable">
                                                <input
                                                    type="radio"
                                                    name="columnType"
                                                    value="text"
                                                    checked={
                                                        this.state.columnType ===
                                                        "text"
                                                    }
                                                    onChange={this.headerAddCoulmn}
                                                />
                                                Text
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="custom-checkbox radio mar-rgt non-taxable">
                                                <input
                                                    type="radio"
                                                    name="columnType"
                                                    value="dropDown"
                                                    checked={
                                                        this.state.columnType ===
                                                        "dropDown"
                                                    }
                                                    onChange={this.headerAddCoulmn}
                                                />{" "}
                                                Drop Down
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="custom-checkbox radio mar-rgt taxable">
                                                <input
                                                    type="radio"
                                                    name="columnType"
                                                    value="date"
                                                    checked={
                                                        this.state.columnType ===
                                                        "date"
                                                    }
                                                    onChange={this.headerAddCoulmn}
                                                />
                                                Date
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
                                                name="columnName"
                                                value={this.state.columnName}
                                                onChange={this.headerAddCoulmn}
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
                                            className="btn btn-lightgray"
                                            data-dismiss="modal"
                                            onClick={this.modalCancel}
                                        >
                                            Cancel
                                        </button>
                                        <span>{"   "}</span>
                                        <button
                                            className="btn btn-green"
                                            type="button"
                                            onClick={() => {
                                                if (!this.state.isHeaderColumnUpdate)
                                                    this.addCoulmn()
                                                else
                                                    this.updateCoulmn()
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
                {/* add header custom column */}



                {/* add header custom column */}
                <div
                    className="modal fade pop-modal"
                    id="footer-add-column"
                    role="dialog"
                >
                    <div className="modal-dialog modal-md custom-modal">
                        <button
                            type="button"
                            className="close hidden-xs"
                            data-dismiss="modal"
                        // onClick={this.cancel_gst_modal}
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
                                            <label>Type of the field</label>
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-xs-12 mar-btm">
                                            <label className="custom-checkbox radio mar-rgt taxable">
                                                <input
                                                    type="radio"
                                                    name="columnType1"
                                                    value="text"
                                                    checked={
                                                        this.state.columnType1 ===
                                                        "text"
                                                    }
                                                    onChange={this.headerAddCoulmn1}
                                                />
                                                Text
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="custom-checkbox radio mar-rgt non-taxable">
                                                <input
                                                    type="radio"
                                                    name="columnType1"
                                                    value="dropDown"
                                                    checked={
                                                        this.state.columnType1 ===
                                                        "dropDown"
                                                    }
                                                    onChange={this.headerAddCoulmn1}
                                                />{" "}
                                                Drop Down
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="custom-checkbox radio mar-rgt taxable">
                                                <input
                                                    type="radio"
                                                    name="columnType1"
                                                    value="date"
                                                    checked={
                                                        this.state.columnType1 ===
                                                        "date"
                                                    }
                                                    onChange={this.headerAddCoulmn1}
                                                />
                                                Date
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
                                                name="columnName1"
                                                value={this.state.columnName1}
                                                onChange={this.headerAddCoulmn1}
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
                                            className="btn btn-lightgray"
                                            data-dismiss="modal"
                                            onClick={this.modalCancel1}
                                        >
                                            Cancel
                                        </button>
                                        <span>{"   "}</span>
                                        <button
                                            className="btn btn-green"
                                            type="button"
                                            onClick={() => {
                                                if (!this.state.isHeaderColumnUpdate1)
                                                    this.addCoulmn1()
                                                else
                                                    this.updateCoulmn1()
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

                {/* add footer custom column */}


                {/* duplicating modal */}
                <div
                    className="modal fade pop-modal"
                    id="checkingType"
                    role="dialog"
                >
                    <div className="modal-dialog modal-md custom-modal">
                        <button
                            type="button"
                            className="close hidden-xs"
                            data-dismiss="modal"
                        // onClick={this.cancel_gst_modal}
                        >
                            <img
                                className="img-responsive"
                                src="../../images/close-red.svg"
                                alt="icon"
                            />
                        </button>
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <h3>Please Choose Any One</h3>
                                <form className="custom-form row">
                                    <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                        <div className="col-md-4 col-sm-4 col-xs-12">
                                            <label>Type of the template</label>
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-xs-12">
                                            <label className="custom-checkbox radio mar-rgt taxable w-100">
                                                <input
                                                    type="radio"
                                                    name="selected_template_type"
                                                    value="1"
                                                    checked={
                                                        this.state.selected_template_type ==
                                                        "1"
                                                    }
                                                    onChange={()=>this.setState({selected_template_type:'1'})}
                                                />
                                                All Templates ( including Sales invoice )
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="custom-checkbox radio non-taxable w-100">
                                                <input
                                                    type="radio"
                                                    name="selected_template_type"
                                                    value="2"
                                                    checked={
                                                        this.state.selected_template_type ===
                                                        "2"
                                                    }
                                                    onChange={()=>this.setState({selected_template_type:'2'})}
                                                />{" "}
                                                Credit Memo
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="custom-checkbox radio mar-rgt taxable w-100">
                                                <input
                                                    type="radio"
                                                    name="selected_template_type"
                                                    value="3"
                                                    checked={
                                                        this.state.selected_template_type ===
                                                        "3"
                                                    }
                                                    onChange={()=>this.setState({selected_template_type:'3'})}
                                                />
                                                Quotation
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="custom-checkbox radio mar-rgt taxable w-100">
                                                <input
                                                    type="radio"
                                                    name="selected_template_type"
                                                    value="4"
                                                    checked={
                                                        this.state.selected_template_type ===
                                                        "4"
                                                    }
                                                    onChange={()=>this.setState({selected_template_type:'4'})}
                                                />
                                                Sales Order
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="custom-checkbox radio mar-rgt taxable w-100">
                                                <input
                                                    type="radio"
                                                    name="selected_template_type"
                                                    value="5"
                                                    checked={
                                                        this.state.selected_template_type ===
                                                        "5"
                                                    }
                                                    onChange={()=>this.setState({selected_template_type:'5'})}
                                                />
                                                Purchase Order
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="custom-checkbox radio mar-rgt taxable w-100">
                                                <input
                                                    type="radio"
                                                    name="selected_template_type"
                                                    value="6"
                                                    checked={
                                                        this.state.selected_template_type ===
                                                        "6"
                                                    }
                                                    onChange={()=>this.setState({selected_template_type:'6'})}
                                                />
                                                Statement
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                         
                                    <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                                        <button
                                            className="btn btn-lightgray"
                                            data-dismiss="modal"
                                            onClick={() => this.setState({selected_template_type:''})}
                                        >
                                            Cancel
                                        </button>
                                        <span>{"   "}</span>
                                        <button
                                            className="btn btn-green"
                                            type="button"
                                            data-dismiss="modal"
                                            onClick={() => this.save(1)}
                                        >
                                            Duplicate
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* duplicating modal */}



            </div>

        )
    }
}

export default Template_edit_page
