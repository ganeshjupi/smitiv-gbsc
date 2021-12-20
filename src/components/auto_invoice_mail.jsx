import { Link } from "react-router-dom";

import FetchAllApi from "../api_links/fetch_all_api";
import React from "react";
import jQuery from "jquery";
import moment from "moment";
import parse from 'html-react-parser'
class InvoiceMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice_id:"",
      client_id: "",
      user_id: "",
      email_id: "",
      password: "",
      conformPassword: "",
      subscriber_id: "",
      show1: false,
      show2: false,
      html_contents:'',
      language_code:'ta',
      country_sortname:'SG',
      home_currency:'SGD',
      home_currency_symbol :'SGD'
    };
  };

  componentWillMount() {
    localStorage.clear();
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    let invoice_data = params.get("data");
    invoice_data = Buffer.from(invoice_data, 'base64').toString('ascii');
    let invoiceData = JSON.parse(invoice_data);
    this.setState({
      invoice_id: invoiceData.invoice_id,
      client_id: invoiceData.client_id
    },()=>console.log("this state....",this.state));
    let input = { client_id: invoiceData.client_id, user_id: invoiceData.user_id, selected_template_type: 1 }
    let entity_details=[]
    FetchAllApi.get_data(invoiceData.client_id, (err, response) => {
      if (response.status === 1) {
        entity_details= response;
      }
    })
    var coreData = {
      invoice_id: invoiceData.invoice_id,
      client_id: invoiceData.client_id,
      payment_id: 0,
    };
    let invoice_details=[];
    FetchAllApi.getInvoiceDetails(coreData, (err, response) => {

      if (response.status === 1) {
        invoice_details = response.invoice_details;
      }
    });
    FetchAllApi.get_edit_invoice_html(input, (err, response) => {
      if (response.status === 1) {
      
        this.temChanged(response.default_template_id,response,invoice_details,entity_details,invoiceData)
      }
    });
  };
  temChanged = (id,response,invoice_details,entity_details,invoiceData) => {
    let obj = response.list.find((e) => e.id == id)
    let customField =obj && obj.properties && obj.properties.header && obj.properties.header.customField &&  obj.properties.header.customField
    let customFieldB = obj && obj.properties && obj.properties.footer && obj.properties.footer.customField && obj.properties.footer.customField
    this.setState({html_contents: obj && obj.html_content});
    this.frontPrint(customField, invoice_details, entity_details,invoiceData)
  }
  frontPrint = (customField,invoice_details,entity_details,invoiceData) => {
    customField && customField.map((itm, i) => {
      jQuery("#head-" + i).html(this.state[`customField${i}`])
      jQuery("#foot-" + i).html(this.state[`customFieldB${i}`])
    })
    console.log(invoice_details.invoice_details);
    let cc = invoice_details && invoice_details.invoice_details
    let dd =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let subDebit = 0
    let subCredit = 0
    let subcreditdisp=0
    let subdebitdisp=0
    dd.map(row => {      
      if (cc.length >= row) {
        jQuery("#row-" + row).css("display", "table-row")
        let rowTotal = Number(cc[row - 1].quantity) * Number(cc[row - 1].unit_price)
        let rowTotaldisplay =(new Intl.NumberFormat(invoiceData.language_code + '-' + invoiceData.country_sortname,
        { style: 'currency', currency: invoiceData.home_currency }).format(isNaN(rowTotal) ? "0.00" : rowTotal).replace(invoiceData.home_currency_symbol, ''))
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
          subdebitdisp =(new Intl.NumberFormat(invoiceData.language_code + '-' + invoiceData.country_sortname,
               { style: 'currency', currency: invoiceData.home_currency }).format(isNaN(subDebit) ? "0.00" : subDebit).replace(invoiceData.home_currency_symbol, ''))
          } else {
          jQuery("#row-" + row + "-" + 7).html('--')
          jQuery("#row-" + row + "-" + 8).html(rowTotaldisplay)
          subCredit = subCredit + rowTotal                 
          subcreditdisp =(new Intl.NumberFormat(invoiceData.language_code + '-' + 
          invoiceData.country_sortname,
          { style: 'currency', currency: invoiceData.home_currency })
          .format(isNaN(subCredit) ? "0.00" : subCredit)
          .replace(invoiceData.home_currency_symbol, '')) 
        }
      } else {
        jQuery("#row-" + row).css("display", "none")
      }
    })
    jQuery("#row-total-2").html(subdebitdisp)
    jQuery("#row-total-3").html(subcreditdisp)
    let bb = entity_details.data[0]
    jQuery("#isEntityName").html(bb.name)
    jQuery("#isAddress").html(bb.address)
    jQuery("#isPhoneNumber").html(bb.phone)
    jQuery("#isEmail").html(bb.email_id)
    jQuery("#isUenNumber").html(bb.unique_entity_number)
    let aa = invoice_details
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
    let grandtotal=(new Intl.NumberFormat(invoiceData.language_code + '-' +     invoiceData.country_sortname,
    { style: 'currency', currency: invoiceData.home_currency }).format(isNaN(aa.grand_total_foreign_currency) ? "0.00" : aa.grand_total_foreign_currency)
    .replace(invoiceData.home_currency_symbol, ''));
    let itemtotal=(new Intl.NumberFormat(invoiceData.language_code + '-' +     invoiceData.country_sortname,
    { style: 'currency', currency: invoiceData.home_currency }).format(isNaN(aa.item_total_foreign_currency) ? "0.00" : aa.item_total_foreign_currency)
    .replace(invoiceData.home_currency_symbol, ''));
    jQuery("#p-amount_in_words").html(aa.amount_in_words)
    jQuery("#p-item_total_foreign_currency").html(itemtotal)
    jQuery("#p-tax_amount_foreign_currency").html(aa.tax_amount_foreign_currency)
    jQuery("#p-grand_total_foreign_currency").html(grandtotal)

    jQuery("#p-thanking_message").html(aa.thanking_message)
    jQuery("#p-terms_and_conditions").html(aa.terms_and_conditions)
      jQuery("#template_name").html("INVOICE")
    
    let client_id = invoiceData.client_id
    let invoice_id = invoiceData.invoice_id
    let html_content = jQuery('#whole_template').html()  
  
      setTimeout(() => {     
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
            if (data.status === 1) {
              window.open(data.file_path);
              // callback(null, data);
            } else {
              // callback(null, data);
            }
          });
      }, 1000);
    }
  UNSAFE_componentWillMount() {
    jQuery("title").html("View auto invoice | GBSC");
  }

  loginFormSubmit(e) {
    e.preventDefault();
    alert("submitted");

    // var user_email = jQuery("#login_user_email").val();
    // var user_password = jQuery("#login_user_pwd").val();

    // if (user_email !== "" && user_password !== "") {
    //   if (user_email !== user_password) {
    //     jQuery(".alert-wrap")
    //       .removeClass("hide")
    //       .html("<p>Password & conform Password does not match!</p>");
    //   } else {
        
    //     FetchAllApi.updatePassword(
    //       this.state.user_id,
    //       user_password,
    //       this.state.email_id,
    //       (err, response) => {
    //         //console.log('Login Status', response.status);
    //         if (response.status === 1) {
    //           this.hhwt_success_login_action(
    //             response.details.user_id,
    //             response.details.client_id,
    //             response.details.role_id,
    //             response.details.user_name,
    //             response.details.email,
    //             response.details.phone,
    //             response.details.user_image,
    //             response.details.company_name,
    //             response.details.subscription_start_date,
    //             response.details.subscription_end_date,
    //             response.details.plan_id
    //           );
    //           // this.role_permissions(response.role_permissions)
    //           localStorage.setItem(
    //             "role_permissions",
    //             JSON.stringify(response.details.role_permissions)
    //           );
    //           // localStorage.setItem("logged_user_email", response.userdetails.email);
    //           // localStorage.setItem("logged_user_name", response.userdetails.name);

    //           localStorage.setItem(
    //             "role_permissions",
    //             JSON.stringify(response.details.role_permissionsle)
    //           );
    //           localStorage.setItem(
    //             "user_layer_role",
    //             JSON.stringify(response.details.user_layer_role)
    //           );
    //           localStorage.setItem(
    //             "layer",
    //             JSON.stringify(response.details.layer)
    //           );


    //           localStorage.setItem("country_sortname", (response.country_sortname));
    //           localStorage.setItem("language_code", (response.language_code));
    //           localStorage.setItem("home_currency", (response.home_currency));

    //           if (response.incorporation_date != '' && response.incorporation_date != null && response.incorporation_date != undefined && response.incorporation_date != "0000-00-00") {
    //             localStorage.setItem("incorporation_date", (response.incorporation_date));
    //             localStorage.setItem("first_incorporation_date", (response.incorporation_date));
    //           } else {
    //             localStorage.setItem("incorporation_date", "1970-01-01");
    //             localStorage.setItem("first_incorporation_date", "1970-01-01");
    //           }
    //           localStorage.setItem("lock_date", response.lock_date);
    //           localStorage.setItem("home_currency_symbol", response.home_currency_symbol);

    //           this.props.history.push("/");
    //         } else {
    //           jQuery(".alert-wrap")
    //             .removeClass("hide")
    //             .html("<p>Username & Password does not match!</p>");
    //         }
    //       }
    //     );
    //   }
    // } else {
    //   jQuery(".alert-wrap")
    //     .removeClass("hide")
    //     .html("<p>Enter Username & Password!</p>");
    // }
  }

  render() {
    console.log("after state update",this.state);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 col-sm-5 login-left hidden-sm hidden-xs">
            <h1>
              Welcome to <strong>GENIE</strong>
            </h1>
            <p>
              Cloud based accounting software with OCR, AI automation, Instant payment notification of Accounts receivable for all business contacts within genie platform.
            </p>

            <p>
              meaning NO hassle when it comes to Accounting anymore
            </p>
            <div className="img-wrap">
              <img
                className="img-responsive"
                src="../images/login-img.png"
                alt=""
              />
            </div>
          </div>
          <div className="builder-right" style={{ display: 'none' }}>
            <div id='whole_template' className="template-item">

              <div id="#whole_template" >
                {this.state.html_contents && parse(this.state.html_contents)}
              </div>

            </div>
          </div>
          <div className="col-md-7 col-sm-12 offset-md-4 login-right">
            <div className="login-wrap">
              <div className="nav-brand">
                <img src="../images/logo-genie.png" alt="Genie" />
              </div>
              {/* <p className="lead">View auto generated Invoice</p> */}

              <form
                className="login-form"
                onSubmit={()=>{
                  //this.loginFormSubmit.bind(this)
                  localStorage.setItem('comingFrom', 'General Ledger');

                  localStorage.setItem("invoice_id",this.state.invoice_id);
                  localStorage.setItem("job_id","");

                  var win = window.open(
                    "/create_invoice",
                    "_blank"
                  );
                  win.focus();
                }}
              >
                <div className="form-group">
                  <button type="submit" className="btn login-btn">
                    View Invoice
                  </button>
                  <a href="/" className="forgot-pass">
                    cancel
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default InvoiceMail;