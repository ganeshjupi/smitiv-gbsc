import React from "react";
import LeftSidebar from "./left_sidebar";
import Footer from "./footer";

import Topbar from "./topbar";

import FetchAllApi from "../api_links/fetch_all_api";

// import { PDFtoIMG } from "react-pdf-to-image";

import jQuery from "jquery";
// import 'bootstrap';
// import 'bootstrap-select';
import config from "../api_links/api_links.jsx";

var authorization_key = "O5mGIP3VNia0JvPH2IBiwA==";

class addJob extends React.Component {
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
      dropdown: "",
      inbox_list: [],
      response_stus: 0,
      response_msg: "No data found",
      item_details: "",
      item_file_path: "",
      waiting_re: [],
      re_assigned: [],
      currencies: [],
      currency_clone: [],
      paymentTerms: [],
      deliveryMethod: [],
      PreferredPaymentMethod: [],
      salesTaxSettings: [],
      salesDefaultAccount: [],
      purchaseTaxSetting: [],
      purchaseDefaultAccount: [],
      defaultSalesTax: [],
      defaultPurchaseTax: [],
      referralFrom: [],
      Rep: [],
      Type: [],
      Status: [],
      selected_currency: "SGD",
      paymentTermsSelected: "",
      preferred_paymentMethod: "",
      preferred_deliveryMethod: "",
      tax_settings: "",
      salesTaxSettingsLists: [],
      salesDefaultAccountsList: [],
      sales_default_account: "",
      purchaseTaxSettingsList: [],
      purchase_tax_settings: "",
      purchaseDefaultAccountsList: [],
      purchase_default_account: "",
      customerSalesTaxList: [],
      default_sales_tax_selected: " ",
      defaultPurchaseTaxLists: [],
      defaultPurchaseTax_selected: "",
      referel_fromLists: [],
      referel_fromList_selected: "",
      rep_infoLists: [],
      rep_infoList_selected: "",
      type_infoLists: [],
      type_infoList_slected: "",
      status_infoLists: [],
      status_infoList_selected: "",
      isSuccessful: false,
      isAllmandatoryFilled: false,
      iscompany_name: false,
      isbussinesno: false,
      iscustomer_name: false,
      iscurrency_id: false,
      isFailed: false,
      selectedCurrency: 3,
      customerTypeLists: [],
      rows: ["row1"],
      initial_value: 0,
      initial_valueContact: 0,

      resultArray: [],
      specific_id_delete: "",
      specific_item: "",
      addressArray: [],
      contactArray: [],
      rowContacts: ["row1"],
      selected_customer_id: ''
    };
  }


  convert_date = (date) => {
    if (date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
    }
    return date_formated;
  };

  convert_toDefaultPicker = (date) => {
    if (date != undefined) {
      var array = date.split("-");

      console.log("jshdjkshkldjhks", array);
      var date_formated = array[2] + "/" + array[1] + "/" + array[0];
    }
    return date_formated;
  };

  addNew = () => {
    var newrows = this.state.rows;

    this.setState({ initial_value: this.state.initial_value + 1 });
    newrows.push("row" + (this.state.initial_value + 1));

    this.setState({ rows: newrows });
  };

  addNewContact = () => {
    var newrows = this.state.rowContacts;

    this.setState({
      initial_valueContact: this.state.initial_valueContact + 1,
    });
    newrows.push("row" + (this.state.initial_valueContact + 1));

    this.setState({ rowContacts: newrows });
  };
  deleteContact = (id) => {
    var specific_item = id;
    var newrows = this.state.rowContacts;

    if (this.state.rowContacts.length >= 1) {
      if (specific_item > -1) {
        newrows.splice(specific_item, 1);
      }
    } else {
      jQuery("#name0").val("");
      jQuery("#designation0").val("");
      jQuery("#department0").val("");
      jQuery("#phone_work0").val("");
      jQuery("#phone_personal0").val("");
      jQuery("#email0").val("");
      jQuery("#skype0").val("");
      jQuery("#hiddencontactid0").val("");
    }

    this.setState({ rowContacts: newrows }, () => {
      this.handleChangeContacts();
    });
    //console.log("oii",this.state.resultArray)
  };
  delete = (id) => {
    var specific_item = id;
    var newrows = this.state.rows;

    if (this.state.rows.length > 1) {
      if (specific_item > -1) {
        newrows.splice(specific_item, 1);
      }
    } else {
      jQuery("#itemA0").val("");
      jQuery("#itemB0").val("");
      jQuery("#hidden_address_id").val("");
    }

    this.setState({ rows: newrows }, () => {
      this.handleChange();
    });
    //console.log("oii",this.state.resultArray)
  };
  handleChangeContacts = () => {
    var resultArray = [];
    this.setState({ contactArray: resultArray });
    var rowlength = this.state.rowContacts.length;
    console.log("roe", rowlength);
    for (var i = 0; i < rowlength; i++) {
      var name = jQuery("#name" + i).val();
      var designation = jQuery("#designation" + i).val();
      var department = jQuery("#department" + i).val();
      var phone_work = jQuery("#phone_work" + i).val();
      var phone_personal = jQuery("#phone_personal" + i).val();
      var email = jQuery("#email" + i).val();
      var skype = jQuery("#skype" + i).val();
      var is_primary = jQuery("#contact_chkbox" + i).is(":checked");
      var contact_id =
        jQuery("#hiddencontactid" + i).val() != ""
          ? jQuery("#hiddencontactid" + i).val()
          : "0";

      if (
        name != undefined &&
        designation != undefined &&
        department != undefined &&
        phone_work != undefined &&
        phone_personal != undefined &&
        email != undefined &&
        skype != undefined &&
        is_primary != undefined
      ) {
        var current_item = {
          name: name,
          designation: designation,
          phone_work: phone_work,
          department: department,
          phone_personal: phone_personal,
          email: email,
          skype: skype,
          is_primary: is_primary,
          contact_id: contact_id,
        };
      }
      console.log("shippingobj", current_item);

      resultArray.push(current_item);
    }
  };

  handleChange = (e) => {
    // var length= this.state.rows.length
    var resultArray = [];
    this.setState({ addressArray: resultArray });
    var rowlength = this.state.rows.length;
    console.log("roe", rowlength);
    for (var i = 0; i < rowlength; i++) {
      var shippingName = jQuery("#itemA" + i).val();
      var shippingAddress = jQuery("#itemB" + i).val();
      var checkbox = jQuery("#itemC" + i).is(":checked");
      var address_id =
        jQuery("#hidden_address_id" + i).val() != ""
          ? jQuery("#hidden_address_id" + i).val()
          : "0";
      if (checkbox === true) {
        var is_default = "1";
      } else {
        var is_default = "0";
      }

      // var is_default = console.log('ivalue', i)

      if (shippingName != undefined && shippingAddress != undefined) {
        var current_item = {
          shipping_address_name: shippingName,
          shipping_address: shippingAddress,
          is_default: is_default,
          billing_address: jQuery("#invoice_bill_to").val(),
        };
      }
      console.log("shippingobj", current_item);

      resultArray.push(current_item);
    }
  };

  addNewCustomer = () => {
    // alert()

    let bussiness_reg_no = jQuery("#bussiness_reg_no").val();
    let company_name = jQuery("#company_name").val();
    let customer_name = jQuery("#customer_name").val();
    let seletedCurrency = this.state.selected_currency;
    //let customer_type = jQuery('.customer_type').html()
    let open_balance = jQuery("#open_balance").val();
    let date_asofnow = this.convert_date(jQuery("#date_asofnow").val());
    let website_name = jQuery("#website_name").val();
    let primary_contact_person = jQuery("#primary_contact_person").val();
    let primary_designation = jQuery("#primary_designation").val();
    let primary_department = jQuery("#primary_department").val();
    let primary_phone_work = jQuery("#primary_phone_work").val();
    let primary_phone_personel = jQuery("#primary_phone_personel").val();
    let primary_email_of = jQuery("#primary_email_of").val();
    let primary_skype = jQuery("#primary_skype").val();
    let invoice_bill_to = jQuery("#invoice_bill_to").val();
    let shipping_address = jQuery("#shipping_address").val();
    let shipping_addrs_name = jQuery("#shipping_addrs_name").val();
    let shipping_adress_last = jQuery("#shipping_adress_last").val();
    let bank_ac_no = jQuery("#bank_ac_no").val();
    //let contact_person = jQuery('#contact_person').val()
    let credit_limit = jQuery("#credit_limit").val();
    let price_level = jQuery("#price_level").val();
    let tax_id = jQuery("#tax_id").val();
    let decription_job = jQuery("#decription_job").val();
    let start_date = this.convert_date(jQuery("#start_date").val());
    let end_date = this.convert_date(jQuery("#end_date").val());
    let project_end_date = this.convert_date(jQuery("#project_end_date").val());
    let sales_default_account = jQuery(
      "#sales_default_account option:selected"
    ).data("status");

    let currency_id = jQuery("#currency_id option:selected").data("status");

    let currency_type = jQuery("#currency_id option:selected").data("currency");
    // To be considered
    let sales_tax_settings = jQuery("#sales_tax_selected option:selected").data(
      "status"
    );
    let purchase_tax_settings = jQuery(
      "#purchase_default_tax option:selected"
    ).data("status");
    let purchase_default_account = jQuery(
      "#default_account_purchase option:selected"
    ).data("status");
    let default_sales_tax_selected = jQuery(
      "#default_sales_tax option:selected"
    ).data("status");
    let defaultPurchaseTax_selected = jQuery(
      "#default_purchase_tax option:selected"
    ).data("status");
    let referel_fromList_selected = jQuery(
      "#refereal_frm option:selected"
    ).data("status");
    let rep_infoList_selected = jQuery("#repselected option:selected").data(
      "status"
    );
    let type_infoList_slected = jQuery(
      "#type_id_selected option:selected"
    ).data("status");
    let status_infoList_selected = jQuery(
      "#status_slected option:selected"
    ).data("status");

    let preferred_delivery_method = jQuery(
      "#preferred_delivery_method option:selected"
    ).data("status");

    let prefererd_payment_method = jQuery(
      "#prefererd_payment_method option:selected"
    ).data("status");

    let customer_type_selected = jQuery("#customer_type option:selected").data(
      "status"
    );

    let payment_terms = jQuery("#payment_terms option:selected").data("status");

    if (this.props.location.state instanceof Array) {
      var customer_id = this.props.location.state[0];
      var job_id =
        this.props.location.state[1] != "" &&
          this.props.location.state[1] != undefined
          ? this.props.location.state[1]
          : 0;
    } else {
      var customer_id = this.props.location.state;
      var job_id = 0;
    }
console.log(this.state.selected_customer_id);
    if (bussiness_reg_no && company_name && customer_name) {
      FetchAllApi.addNew_Job(
        customer_name,
        customer_type_selected,
        currency_type,
        open_balance,
        date_asofnow,
        company_name,
        bussiness_reg_no,
        currency_id,
        website_name,
        bank_ac_no,
        credit_limit,
        price_level,
        payment_terms,
        preferred_delivery_method,
        prefererd_payment_method,
        sales_tax_settings,
        sales_default_account,
        purchase_tax_settings,
        purchase_default_account,
        tax_id,
        bussiness_reg_no,
        default_sales_tax_selected,
        defaultPurchaseTax_selected,
        referel_fromList_selected,
        rep_infoList_selected,
        decription_job,
        type_infoList_slected,
        status_infoList_selected,
        start_date,
        end_date,
        project_end_date,
        3,

        primary_contact_person,
        primary_designation,
        primary_department,
        primary_phone_work,
        primary_phone_personel,
        primary_email_of,
        primary_skype,
        invoice_bill_to,
        shipping_address,
        shipping_addrs_name,
        shipping_adress_last,
        this.state.addressArray,
        this.state.contactArray,
        this.state.selected_customer_id,
        job_id,
        // this.props.location.state[0],
        // this.props.location.state[1] !='' && this.props.location.state[1] !=undefined ?this.props.location.state[1]:0,
        localStorage.getItem("logged_user_id"),
        this.state.logged_client_id,

        (err, response) => {
          if (response.status === 1) {
            this.setState({ isSuccessful: true });
            setTimeout(() => {
              if (this.props.location.state instanceof Array) { this.props.history.push("/customers-list") }
              else {

                localStorage.setItem('job_cus_id', this.props.location.state);
                localStorage.setItem('customerId', this.props.location.state)

                localStorage.setItem('job_id', response.job_id)

                // this.props.history.push("/create_invoice") 
                localStorage.setItem('job_added', 'yes')
                localStorage.setItem('job_added_id', response.job_id)

                var iframe = document.createElement('iframe');
                iframe.style.cssText = 'opacity:0;position:absolute';
                iframe.src = 'about:blank';
                iframe.onload = function () {
                  iframe.contentWindow.close.call(window);
                  document.body.removeChild(iframe);
                };
                document.body.appendChild(iframe);


              }
            }, 1500);
            this.clearAllFormValues();
          } else {
            this.setState({ isFailed: true });
            setTimeout(() => {
              this.setState({ isFailed: false });
            }, 5000);
          }
        }
      );
    } else {
      this.setState({ isAllmandatoryFilled: true });
      setTimeout(() => {
        this.setState({ isAllmandatoryFilled: false });
      }, 5000);
      if (!bussiness_reg_no) {
        this.setState({ isbussinesno: true });
      } else {
        this.setState({ isbussinesno: false });
      }

      if (!company_name) {
        this.setState({ iscompany_name: true });
      } else {
        this.setState({ iscompany_name: false });
      }
      if (!customer_name) {
        this.setState({ iscustomer_name: true });
      } else {
        this.setState({ iscustomer_name: false });
      }
      if (!currency_id) {
        this.setState({ iscurrency_id: true });
      } else {
        this.setState({ iscurrency_id: false });
      }
      if (!seletedCurrency) {
      }
    }
  };

  clearAllFormValues = () => {
    this.setState({
      tax_settings: "",
      purchase_tax_settings: "",
      purchase_default_account: "",
      default_sales_tax_selected: "",
      defaultPurchaseTax_selected: "",
      referel_fromList_selected: "",
      rep_infoList_selected: "",
      type_infoList_slected: "",
      status_infoList_selected: "",
    });

    jQuery("#bussiness_reg_no").val("");
    jQuery("#company_name").val("");
    jQuery("#customer_name").val("");
    jQuery(".customer_type").html("");
    jQuery("#open_balance").val("");
    jQuery("#date_asofnow").val("");
    jQuery("#website_name").val("");
    jQuery("#primary_contact_person").val("");
    jQuery("#primary_designation").val("");
    jQuery("#primary_department").val("");
    jQuery("#primary_phone_work").val("");
    jQuery("#primary_phone_personel").val("");
    jQuery("#primary_email_of").val("");
    jQuery("#primary_skype").val("");
    jQuery("#invoice_bill_to").val("");
    jQuery("#shipping_address").val("");
    jQuery("#shipping_addrs_name").val("");
    jQuery("#shipping_adress_last").val("");
    jQuery("#bank_ac_no").val("");
    jQuery("#contact_person").val("");
    jQuery("#credit_limit").val("");
    jQuery("#price_level").val("");
    jQuery("#tax_id").val("");
    jQuery("#decription_job").val("");
    jQuery("#start_date").val("");
    jQuery("#end_date").val("");
    jQuery("#project_end_date").val("");
  };

  get_paymentTerms = () => {
    FetchAllApi.paymentTerms(this.state.logged_client_id,(err, response) => {
      if (response.status === 1) {
        this.setState({ paymentTerms: response.lists })
      } else {
        this.setState({ paymentTerms: [] })
      }
    })}

    delivery_method = () => {
      FetchAllApi.deliveryMethodList(this.state.logged_client_id,(err, response) => {
        console.log('Customer list', response)
        if (response.status === 1) {
          this.setState({ deliveryMethod: response.lists })
        } else {
          this.setState({ deliveryMethod: [] })
        }
      })
    }
  
    PreferredPaymentMethod = () => {
      FetchAllApi.vendor_payment_method(this.state.logged_client_id,(err, response) => {
        if (response.status === 1) {
          this.setState({ PreferredPaymentMethod: response.lists })
        } else {
          this.setState({ PreferredPaymentMethod: [] })
        }
      })}

      // salesDefaultAccounts = () => {
      //   FetchAllApi.salesDefaultAccountsList(this.state.logged_client_id,(err, response) => {
      //     console.log('Customer list', response)
      //     if (response.status === 1) {
      //       this.setState({ salesDefaultAccountsList: response.lists })
      //     } else {
      //       this.setState({ salesDefaultAccountsList: [] })
      //     }
      //   })
      // }

      customer_SalesTaxLists = () => {
        FetchAllApi.get_sales_tax_list(this.state.logged_client_id,(err, response) => {
          console.log('Customer list', response)
          if (response.status === 1) {
            this.setState({ customerSalesTaxList: response.lists })
          } else {
            this.setState({ customerSalesTaxList: [] })
          }
        })
      }

      // purchaseDefaultAccounts = () => {
      //   FetchAllApi.purchaseDefaultAccountsList(this.state.logged_client_id,(err, response) => {
      //     console.log('Customer list', response)
      //     if (response.status === 1) {
      //       this.setState({ purchaseDefaultAccountsList: response.lists })
      //     } else {
      //       this.setState({ purchaseDefaultAccountsList: [] })
      //     }
      //   })
      // }
      salesTaxSettings = () => {
        FetchAllApi.salesTaxSettingsList(this.state.logged_client_id,(err, response) => {
          console.log('Customer list', response)
          if (response.status === 1) {
            this.setState({ salesTaxSettingsLists: response.lists })
          } else {
            this.setState({ salesTaxSettingsLists: [] })
          }
        })
      }
      purchaseTaxSettings = () => {
        FetchAllApi.purchaseTaxSettingsList(this.state.logged_client_id,(err, response) => {
          console.log('Customer list', response)
          if (response.status === 1) {
            this.setState({ purchaseTaxSettingsList: response.lists })
          } else {
            this.setState({ purchaseTaxSettingsList: [] })
          }
        })
      }

  defaultPurchaseTaxLists = () => {
    FetchAllApi.get_defaultPurchaseTaxLists(this.state.logged_client_id,(err, response) => {
      console.log("Customer list", response);
      if (response.status === 1) {
        this.setState({ defaultPurchaseTaxLists: response.lists });
      } else {
        this.setState({ defaultPurchaseTaxLists: [] });
      }
    });
  };

  //1

  referel_from = () => {
    FetchAllApi.referel_from(this.state.logged_client_id,(err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ referel_fromLists: response.lists })
      } else {
        this.setState({ referel_fromLists: [] })
      }
    })
  }

  //2

  rep_info = () => {
    FetchAllApi.rep_info(this.state.logged_client_id,(err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ rep_infoLists: response.lists })
      } else {
        this.setState({ rep_infoLists: [] })
      }
    })
  }
  //3

  type_info = () => {
    FetchAllApi.type_info(this.state.logged_client_id,(err, response) => {
      console.log("Customer list", response);
      if (response.status === 1) {
        this.setState({ type_infoLists: response.lists });
      } else {
        this.setState({ type_infoLists: [] });
      }
    });
  };
  //4

  status_info = () => {
    FetchAllApi.status_info(this.state.logged_client_id,(err, response) => {
      console.log("Customer list", response);
      if (response.status === 1) {
        this.setState({ status_infoLists: response.lists });
      } else {
        this.setState({ status_infoLists: [] });
      }
    });
  };

  //5 pending
  customer_type = () => {
    FetchAllApi.customer_type((err, response) => {
      console.log("Customer list", response);
      if (response.status === 1) {
        this.setState({ customer_typeLists: response.lists });
      } else {
        this.setState({ customer_typeLists: [] });
      }
    });
  };

  //6
  get_currencies = () => {
    FetchAllApi.currencies((err, response) => {
      console.log("Customer list", response);
      if (response.status === 1) {
        this.setState({ currencies: response.lists });
      } else {
        this.setState({ currencies: [] });
      }
    });
  };

  //7
  get_customer_type = () => {
    FetchAllApi.customerTypes((err, response) => {
      console.log("Customer list", response);

      if (response.status === 1) {
        this.setState({ customerTypeLists: response.lists });
      } else {
        this.setState({ customerTypeLists: [] });
      }
    });
  };

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
    // jQuery("#currency_selected").val(4);
    console.log("myattriqbute", this.props.location.state);
  }

  RefreshAllDropdowns = () => {
    this.rep_info();
    this.type_info();
    this.referel_from();
    this.status_info();
    this.get_currencies();
    this.get_paymentTerms();
    this.delivery_method();
    this.PreferredPaymentMethod();
    this.salesTaxSettings();
    // this.salesDefaultAccounts();
    this.purchaseTaxSettings();
    // this.purchaseDefaultAccounts();
    this.customer_SalesTaxLists();
    this.defaultPurchaseTaxLists();
    this.get_customer_type();
  }
  componentDidMount() {
    this.RefreshAllDropdowns();
    this.defaultcategorylist_onchange();
    var selected_cus_id = localStorage.getItem('selected_customer_id')
  
    this.setState({ selected_customer_id: selected_cus_id });
    this.setState({
      selected_customer_id:  selected_cus_id
    },()=>console.log("this state....",this.state));
    
    if (selected_cus_id != undefined && selected_cus_id != '' && selected_cus_id != null) {
     
      // alert(selected_cus_id)
      FetchAllApi.Basic_info(
        this.state.logged_client_id,
        selected_cus_id,
        (err, response) => {
          localStorage.setItem('selected_customer_id', '')
          // alert(response.message)
          console.log('Customjhckxlcer_list', response.message)
          if (response.status === 1) {

            let companyName = response.response[0].company_name;
            let regno = response.response[0].bus_reg;
            let curr = response.response[0].currency_id;
            // alert(companyName)
            jQuery('#company_name').val(companyName)
            jQuery('#customer_name').val(companyName)
            jQuery('#bussiness_reg_no').val(regno)
            jQuery('#currency_id').val(curr)
            jQuery('#tax_id').val(regno)
            jQuery('#bussiness_reg_no_finance').val(regno)




          } else {

          }
        }
      )






    } else {
      alert('It seems you have not select customer yet...Please choose a customer')
     // this.props.history.push('/create_invoice')
    }



    // localStorage.setItem('prevpath','addjob')

    // let isCustomer=localStorage.getItem('customer')!=undefined?true:false
    // if(isCustomer){
    // var allString=localStorage.getItem('customer');var splited=allString.split('=');var id=splited[1];
    // var cus_name=splited[0];
    // alert(id)
    // jQuery('#customer_name').val(cus_name)
    // jQuery('#company_name').val(cus_name)

    // }
    // alert(this.props.location.state[0])


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
      // jQuery(".custom-select-drop .dropdown-menu a").click(function () {
      //   jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass(
      //     "active"
      //   );
      //   jQuery(this).parent("li").addClass("active");
      //   jQuery(".open #selected").text(jQuery(this).text());
      // });

      window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

      jQuery('[data-toggle="tooltip"]').tooltip();

      jQuery(".snippet").mouseenter(function () {
        jQuery(".snippet").removeClass("active");
        jQuery(this).addClass("active");
      });

      jQuery(".filter-btn").click(function () {
        jQuery(this).css("visibility", "hidden");
        jQuery(".report-filter").slideDown();
      });

      jQuery(".report-filter .close-btn").click(function () {
        jQuery(".filter-btn").css("visibility", "visible");
        jQuery(".report-filter").slideUp();
      });
    });

    // $(document).on("shown.bs.dropdown", ".dropdown", function () {
    // // calculate the required sizes, spaces
    // var $ul = $(this).children(".dropdown-menu");
    // var $button = $(this).children(".dropdown-toggle");
    // var ulOffset = $ul.offset();
    // // how much space would be left on the top if the dropdown opened that direction
    // var spaceUp = (ulOffset.top - $button.height() - $ul.height()) - $(window).scrollTop();
    // // how much space is left at the bottom
    // var spaceDown = $(window).scrollTop() + $(window).height() - (ulOffset.top + $ul.height());
    // // switch to dropup only if there is no space at the bottom AND there is space at the top, or there isn't either but it would be still better fit
    // if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown))
    // $(this).addClass("dropup");
    // }).on("hidden.bs.dropdown", ".dropdown", function() {
    // // always reset after close
    // $(this).removeClass("dropup");
    // });

    // alert(jQuery('#refereal_frm').val())
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  dataTaggingFunc(list_id, file_id) {
    this.props.history.push("/data_tagging/" + list_id + "/" + file_id);
    window.scrollTo(0, 0);
  };

  defaultcategorylist_onchange = (x, y) => {
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
              salesDefaultAccountsList: response.list,
            },
            () => {
              window.jQuery("#categry_id0").selectpicker("refresh");
            }
          );
        } else {
          this.setState({
            salesDefaultAccountsList: [],
          });
        }
      }
    );
  };



  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }
  routedChange(parameter) {
    this.props.history.push("/" + parameter);
    window.scrollTo(0, 0);
  }

  copyFunction = () => {
    let addrss = jQuery("#invoice_bill_to").val();
    jQuery("#shipping_address").val(addrss);
  };

  render() {
    console.log("myattriqbute", this.props.location.state);
    var data = "";
    data = this.state.currencies;
    // console.log('khcjkcklshk', this.state.currencies)
    let get_file_path,
      dis_file_path = [],
      item_file_path = [],
      attach_file_path,
      options = [],
      page_no = 1,
      items_limit = 10,
      no_items;

    if (
      this.state.item_details.user_image !== "" &&
      this.state.item_details.user_image !== "null"
    ) {
      var item_user_image = this.state.item_details.user_image;
    } else {
      var item_user_image = "images/user-img-1.png";
    }

    //console.log('item_files', this.state.item_file_path);
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

          //console.log('pdf_file_link',get_file_url);

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
      <div>
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



                <div className='modal fade pop-modal' id='single_Modal' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStrinsinglegLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='option_dynamic'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  terms: jQuery('#option_dynamic').val(),
                                  client_id:this.state.logged_client_id,
                                }
                                FetchAllApi.add_customer_payment_terms(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()


                                      // this.getColumns()
                                      jQuery('#options').val('')
                                      window.jQuery('#option_dynamic').modal('hide')
                                      //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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



                <div className='modal fade pop-modal' id='add_customer_preferred_delivery' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='option_dynamic1'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  name: jQuery('#option_dynamic1').val(),
                                  client_id:this.state.logged_client_id
                                }
                                FetchAllApi.add_customer_preferred_delivery(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()

                                      // this.getColumns()
                                      jQuery('#options').val('')
                                      window
                                        .jQuery('#add_customer_preferred_delivery')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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



                {/* third */}



                <div className='modal fade pop-modal' id='add_customer_preferred_payment' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='option_dynamic2'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  name: jQuery('#option_dynamic2').val(),
                                  client_id:this.state.logged_client_id,
                                }
                                FetchAllApi.add_customer_preferred_payment(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()
                                      this.PreferredPaymentMethod()
                                      // this.getColumns()
                                      jQuery('#options').val('')
                                      window
                                        .jQuery('#add_customer_preferred_payment')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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



                <div className='modal fade pop-modal' id='add_customer_sales_tax_settings' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='dynamic4'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  name: jQuery('#dynamic4').val(),
                                  client_id:this.state.logged_client_id,
                                }
                                FetchAllApi.add_customer_sales_tax_settings(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()

                                      // this.getColumns()
                                      jQuery('#dynamic4').val('')
                                      window
                                        .jQuery('#add_customer_sales_tax_settings')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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


                {/* five */}
                <div className='modal fade pop-modal' id='add_customer_sales_deafult_account_option' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='dynamic5'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  name: jQuery('#dynamic5').val(),
                                  client_id:this.state.logged_client_id,
                                }
                                FetchAllApi.add_customer_sales_deafult_account_option(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()

                                      // this.getColumns()
                                      jQuery('#dynamic5').val('')
                                      window
                                        .jQuery('#add_customer_sales_deafult_account_option')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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



                <div className='modal fade pop-modal' id='add_customer_purchase_tax_settings' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='dynamic6'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  name: jQuery('#dynamic6').val(),
                                  client_id:this.state.logged_client_id,
                                }
                                FetchAllApi.add_customer_purchase_tax_settings(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()

                                      // this.getColumns()
                                      jQuery('#dynamic6').val('')
                                      window
                                        .jQuery('#add_customer_purchase_tax_settings')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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


                <div className='modal fade pop-modal' id='add_customer_purchase_default_account_option' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='dynamic7'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  name: jQuery('#dynamic7').val(),
                                  client_id:this.state.logged_client_id
                                }
                                FetchAllApi.add_customer_purchase_default_account_option(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()

                                      // this.getColumns()
                                      jQuery('#dynamic7').val('')
                                      window
                                        .jQuery('#add_customer_purchase_default_account_option')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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

                <div className='modal fade pop-modal' id='add_customer_default_sales_tax_option' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='dynamic8'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  name: jQuery('#dynamic8').val(),
                                  client_id:this.state.logged_client_id,
                                }
                                FetchAllApi.add_customer_default_sales_tax_option(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()

                                      // this.getColumns()
                                      jQuery('#dynamic8').val('')
                                      window
                                        .jQuery('#add_customer_default_sales_tax_option')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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

                <div className='modal fade pop-modal' id='add_customer_default_purchase_tax_option' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='dynamic9'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  name: jQuery('#dynamic9').val(),
                                  client_id:this.state.logged_client_id,
                                }
                                FetchAllApi.add_customer_default_purchase_tax_option(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()

                                      // this.getColumns()
                                      jQuery('#dynamic9').val('')
                                      window
                                        .jQuery('#add_customer_default_purchase_tax_option')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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


                <div className='modal fade pop-modal' id='add_customer_job_type' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='dynamic10'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  name: jQuery('#dynamic10').val(),
                                  client_id:this.state.logged_client_id,
                                }
                                FetchAllApi.add_customer_job_type(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()

                                      // this.getColumns()
                                      jQuery('#dynamic10').val('')
                                      window
                                        .jQuery('#add_customer_job_type')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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



                <div className='modal fade pop-modal' id='add_customer_job_status' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='dynamic11'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  desc: jQuery('#dynamic11').val(),
                                  client_id:this.state.logged_client_id,
                                }
                                FetchAllApi.add_customer_job_status(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()

                                      // this.getColumns()
                                      jQuery('#dynamic11').val('')
                                      window
                                        .jQuery('#add_customer_job_status')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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



                <div className='modal fade pop-modal' id='add_customer_referral_from' role='dialog'>
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Enter New Option</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input
                                autoComplete='off'
                                type='text'
                                className='form-control'
                                id='dynamic12'
                                placeholder=''
                              />
                              {/* <div style={{ float: 'left' }}>
                          {this.state.roleStringLen && (
                            <small style={{ color: 'red' }}>
                                *Required.
                            </small>
                          )}
                        </div>{' '} */}
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                              onClick={() => {
                              }}
                            >
                              Cancel
                      </button>
                            <span>{'   '}</span>
                            {/* <input type='hidden' id='colid' /> */}

                            <button
                              className='btn btn-green'
                              type='button'
                              onClick={() => {

                                var coreData = {
                                  name: jQuery('#dynamic12').val(),
                                  client_id:this.state.logged_client_id,
                                }
                                FetchAllApi.add_customer_referral_from(
                                  coreData,
                                  (err, response) => {
                                    console.log('new document', response.message)
                                    alert(response.message)
                                    if (response.status === 1) {
                                      this.RefreshAllDropdowns()

                                      // this.getColumns()
                                      jQuery('#dynamic12').val('')
                                      window
                                        .jQuery('#add_customer_referral_from')
                                        .modal('hide')                                //   this.setState({ items: response.list[0].columns })
                                    } else {
                                    }
                                  }
                                )

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




                {/* <span className='page-title hidden-xs'>Inbox</span> */}
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li>
                    <a
                      href="javascript: ;"
                      onClick={this.routedChange.bind(this, "Customers")}
                    >
                      Customers
                    </a>
                  </li>
                  <li>Add Job</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>

              <div className="content-top col-md-12 col-xs-12">
                <ul className="nav nav-pills transparent nowrap">
                  <li className="active" id="company">
                    <a data-toggle="pill" href="#company-info">
                      Job Info
                    </a>
                  </li>
                  <li id="finance">
                    <a data-toggle="pill" href="#finance-info">
                      Finance Info
                    </a>
                  </li>
                  <li id="additional">
                    <a data-toggle="pill" href="#additional-info">
                      Additional Info
                    </a>
                  </li>
                </ul>
              </div>

              <div className="main-content col-md-12 col-xs-12">
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                  <div className="tab-content">
                    <div id="company-info" className="tab-pane fade in active">
                      <form className="custom-form invoice-form col-md-12 col-xs-12 legend-form pad-no">
                        <div className="row">
                          <div className="col-md-12 col-xs-12">
                            <span className="form-legend">
                              Job Information
                            </span>
                          </div>
                          <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                            <label>
                              Company Name<span className="astrick">*</span>
                            </label>
                            <input
                              type="text"
                              name="cus-name"
                              id="company_name"
                              autoComplete="off"
                              className="form-control"
                              onChange={() => {


                                jQuery('#customer_name').val(jQuery('#company_name').val())
                              }}
                            />
                            {this.state.iscompany_name ? (
                              <div style={{ float: "left" }}>
                                <small style={{ color: "red" }}>
                                  *Please fill out company name.
                                </small>
                              </div>
                            ) : (
                                ""
                              )}
                          </div>
                          <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                            <label>
                              Business Reg No.<span className="astrick">*</span>
                            </label>
                            <input
                              type="text"
                              name="cus-name"
                              id="bussiness_reg_no"
                              autoComplete="off"
                              className="form-control"
                            />
                            {this.state.isbussinesno ? (
                              <div style={{ float: "left" }}>
                                <small style={{ color: "red" }}>
                                  *Please fill out bussiness reg no.
                                </small>
                              </div>
                            ) : (
                                ""
                              )}
                          </div>
                          <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                            <label>Website</label>
                            <input
                              type="text"
                              name="website"
                              id="website_name"
                              autoComplete="off"
                              className="form-control"
                            />
                          </div>
                        </div>





                        <div className="row">
                          <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                            <label>
                              Job Name<span className="astrick">*</span>
                            </label>
                            <input
                              type="text"
                              name="cus-name"
                              id="customer_name"
                              autoComplete="off"
                              className="form-control"
                              onChange={(e) => {
                                if (e.target.event != "") {
                                  this.setState({ iscustomer_name: false });
                                } else {
                                  this.setState({ iscustomer_name: true });
                                }
                              }}
                            />
                            {this.state.iscustomer_name ? (
                              <div style={{ float: "left" }}>
                                <small style={{ color: "red" }}>
                                  *Please fill out customer name.
                                </small>
                              </div>
                            ) : (
                                ""
                              )}
                          </div>


                        </div>

                        {this.state.rowContacts.map((item, index) => {
                          return (
                            <div className="row">
                              {index == 0 && (
                                
                                  <div className="col-md-12 col-xs-12">
                                    <span className="form-legend">
                                      Primary Contact
                                  </span>
                                  </div>
                              )}
                              
                                  <div
                                    className="row bg-add-sec"
                                    key={item}
                                    style={{
                                      background: index === 0 ? "transparent" : "",
                                    }}
                                  >
                                    {index !== 0 && (
                                      <div className="form-group col-md-12">
                                        <div className="pull-left">
                                          <label className="custom-checkbox">
                                            <input
                                              type="checkbox"
                                              name="all"
                                              id={`contact_chkbox${index}`}
                                              onChange={(event) => {
                                                this.handleChangeContacts();
                                              }}
                                            />
                                        Use as Primary Contact
                                        <span className="checkmark" />
                                          </label>
                                        </div>
                                        {index !== 0 && (
                                          <a
                                            href="javascript:;"
                                            className="pull-right"
                                            onClick={() => {
                                              this.deleteContact(index);
                                            }}
                                          >
                                            <img
                                              src="../images/delete-icon.svg"
                                              alt="icon"
                                            />
                                          </a>
                                        )}
                                      </div>
                                    )}

                                    <div className="form-group col-md-4">
                                      <label>Contact Person</label>
                                      <input
                                        type="text"
                                        name="cus-name"
                                        autoComplete="off"
                                        id={`name${index}`}
                                        onChange={(event) => {
                                          this.handleChangeContacts();
                                        }}
                                        className="form-control"
                                      />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label>Designation</label>
                                      <input
                                        type="text"
                                        name="cus-name"
                                        id={`designation${index}`}
                                        onChange={(event) => {
                                          this.handleChangeContacts();
                                        }}
                                        className="form-control"
                                        autoComplete="off"
                                      />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label>Department</label>
                                      <input
                                        type="text"
                                        name="cus-name"
                                        id={`department${index}`}
                                        onChange={(event) => {
                                          this.handleChangeContacts();
                                        }}
                                        autoComplete="off"
                                        className="form-control"
                                      />
                                    </div>
                                    <div className="form-group col-md-4 input-group-cus">
                                      <div>
                                        <label>Phone (Work)</label>
                                        <input
                                          type="text"
                                          name="cus-name"
                                          id={`phone_work${index}`}
                                          onChange={(event) => {
                                            this.handleChangeContacts();
                                          }}
                                          autoComplete="off"
                                          className="form-control"
                                        />
                                      </div>
                                      <div>
                                        <label>(Personal)</label>
                                        <input
                                          type="text"
                                          name="cus-name"
                                          id={`phone_personal${index}`}
                                          onChange={(event) => {
                                            this.handleChangeContacts();
                                          }}
                                          className="form-control"
                                          autoComplete="off"
                                        />

                                        <input
                                          type="hidden"
                                          name="cus-name"
                                          id={`hiddencontactid${index}`}
                                          onChange={(event) => {
                                            this.handleChangeContacts();
                                          }}
                                          className="form-control"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label>Email</label>
                                      <input
                                        type="text"
                                        name="cus-name"
                                        autoComplete="off"
                                        id={`email${index}`}
                                        onChange={(event) => {
                                          this.handleChangeContacts();
                                        }}
                                        className="form-control"
                                      />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label>Skype</label>
                                      <input
                                        type="text"
                                        name="cus-name"
                                        autoComplete="off"
                                        onChange={(event) => {
                                          this.handleChangeContacts();
                                        }}
                                        id={`skype${index}`}
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                  </div>
                                  
                                  
                              );
                        })}

                              {/* {this.state.rowContacts.map((item, index) => {
                          return (
                            <div >
                           {index===0 && 
                           <div className='col-md-12 col-xs-12'>
                            <span className='form-legend'>Primary Contact</span>
                          </div>}
                         
                          
                            <div className='row bg-add-sec' key={item} style={{background:(index===0?'transparent':'')}}>
                           {index !==0 &&
                                                         <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                                                         {index !==0 &&
                                                               <div className='pull-left'>
                                                               <label className='custom-checkbox'>
                                                                 <input
                                                                   type='checkbox'
                                                                   name='all'
                                                                   id={`contact_chkbox${index}`}
                                                                   onChange={event => {
                                                                     this.handleChangeContacts()
                                                                   }}
                                                                 />
                                                                 Use as Primary Contact
                                                                 <span className='checkmark' />
                                                               </label>
                                                             </div>}
                                                       
                                                           {index !==0 && 
                                                            <a
                                                               href='javascript:;'
                                                               className='pull-right'
                                                               onClick={() => {
                                                                 this.deleteContact(index)
                                                               }}
                                                             >
                                                               <img
                                                                 src='../images/delete-icon.svg'
                                                                 alt='icon'
                                                               />
                                                             </a>
                                                             
                                                             }
                                                           </div>
                                                     } 
     
                              <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                               
                                <label>Department</label>
                                <input
                                  type='text'
                                  name='cus-name'
                                  id={`department${index}`}
                                  onChange={event => {
                                    this.handleChangeContacts()
                                  }}
                                  autoComplete='off'
                                  className='form-control'
                                />
                              </div>
                              <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 input-group-cus'>
                                <div>
                                  <label>Phone (Work)</label>
                                  <input
                                    type='text'
                                    name='cus-name'
                                    id={`phone_work${index}`}
                                    onChange={event => {
                                      this.handleChangeContacts()
                                    }}
                                    autoComplete='off'
                                    className='form-control'
                                  />
                                </div>
                                <div>
                                  <label>(Personal)</label>
                                  <input
                                    type='text'
                                    name='cus-name'
                                    id={`phone_personal${index}`}
                                    onChange={event => {
                                      this.handleChangeContacts()
                                    }}
                                    className='form-control'
                                    autoComplete='off'
                                  />
                                </div>
                              </div>
                              <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                                <label>Email</label>
                                <input
                                  type='text'
                                  name='cus-name'
                                  autoComplete='off'
                                  id={`email${index}`}
                                  onChange={event => {
                                    this.handleChangeContacts()
                                  }}
                                  className='form-control'
                                />
                              </div>
                              <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                                <label>Skype</label>
                                <input
                                  type='text'
                                  name='cus-name'
                                  autoComplete='off'
                                  onChange={event => {
                                    this.handleChangeContacts()
                                  }}
                                  id={`skype${index}`}
                                  className='form-control'
                                />
                              </div>
                            </div>
                            </div>
                          )
                        })} */}

                              <a
                                href="javascript:;"
                                className="add-input"
                                onClick={() => {
                                  this.addNewContact();
                                }}
                              >
                                Add Another Person
                        </a>

                              <div className="row">
                                <div className="col-md-12 col-xs-12">
                                  <span className="form-legend">
                                    Address Information
                            </span>
                                </div>
                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                  <label>Invoice / Bill To</label>
                                  <textarea
                                    className="form-control"
                                    defaultValue={""}
                                    autoComplete="off"
                                    id="invoice_bill_to"
                                  />
                                  <a
                                    href="javascript:;"
                                    className="add-input"
                                    onClick={() => {
                                      this.copyFunction();
                                    }}
                                  >
                                    Copy Billing Address to Shipping
                            </a>
                                </div>
                                <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                  <label>Shipping Address</label>
                                  <textarea
                                    className="form-control"
                                    defaultValue={""}
                                    autoComplete="off"
                                    id="shipping_address"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-8 col-md-12">
                                  {this.state.rows.map((item, i) => {
                                    console.log("rowsnow", this.state.rows.length);
                                    let itemid = i;

                                    return (
                                      <div className="row bg-add-sec" key={item}>
                                        <div className="form-group col-md-12 col-xs-12">
                                          <div className="pull-left">
                                            <label className="custom-checkbox">
                                              <input
                                                type="hidden"
                                                name="all"
                                                id={`hidden_address_id${i}`}
                                                onChange={(event) => {
                                                  this.handleChange(
                                                    event.target.checked
                                                  );
                                                }}
                                              />
                                              <input
                                                type="checkbox"
                                                name="all"
                                                id={`itemC${i}`}
                                                onChange={(event) => {
                                                  this.handleChange(
                                                    event.target.checked
                                                  );
                                                }}
                                              />
                                        Use as Primary Contact
                                        <span className="checkmark" />
                                            </label>
                                          </div>
                                          <a
                                            href="javascript:;"
                                            className="pull-right"
                                            onClick={() => {
                                              this.delete(itemid);
                                            }}
                                          >
                                            <img
                                              src="../images/delete-icon.svg"
                                              alt="icon"
                                            />
                                          </a>
                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                          <label>Shipping Address Name</label>
                                          <input
                                            type="text"
                                            name="cus-name"
                                            className="form-control"
                                            autoComplete="off"
                                            id={`itemA${i}`}
                                            onChange={() => {
                                              this.handleChange();
                                            }}
                                          />
                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                          <label>Shipping Address</label>
                                          <textarea
                                            className="form-control"
                                            defaultValue={""}
                                            autoComplete="off"
                                            id={`itemB${i}`}
                                            onChange={() => {
                                              this.handleChange();
                                            }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                  <a
                                    href="javascript:;"
                                    className="add-input"
                                    onClick={this.addNew}
                                  >
                                    Add New Address
                            </a>
                                </div>
                              </div>
                              <div className="col-md-12 col-xs-12 btn-bdr">
                                <a
                                  data-toggle="pill"
                                  className="btn btn-blue"
                                  href="#finance-info"
                                  onClick={() => {
                                    jQuery("#finance").addClass("active");
                                    jQuery("#company").removeClass("active");
                                  }}
                                >
                                  Next
                          </a>
                              </div>
                      </form>
                    </div>
                      <div id="finance-info" className="tab-pane fade in">
                        <form className="custom-form invoice-form col-md-12 col-xs-12 legend-form pad-no">
                          <div className="row">
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Bank Account No.</label>
                              <input
                                type="text"
                                name="cus-name"
                                id="bank_ac_no"
                                autoComplete="off"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group exchange-col col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Credit Limit</label>
                              <div>
                                <input
                                  type="text"
                                  name="exchangeRate"
                                  id="credit_limit"
                                  className="form-control"
                                  autoComplete="off"
                                />
                                {/* <span className="label">SGD</span> */}
                              </div>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Price Level</label>
                              <i
                                data-toggle="tooltip"
                                data-placement="right"
                                tabIndex={0}
                                title="Lipsum - Need short content from GBSC"
                              >
                                <img
                                  src="../images/round-info-btn-blue.svg"
                                  alt="icon"
                                />
                              </i>
                              <input
                                type="text"
                                name="cus-name"
                                id="price_level"
                                autoComplete="off"
                                className="form-control"
                              />
                            </div>

                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Preferred Delivery Method</label>
                              <select
                                className="selectpicker form-control add-new"
                                id="preferred_delivery_method"
                                title='Choose'
                                data-live-search="true"
                                // onChange={e => {
                                //   this.setState({
                                //     preferred_deliveryMethod: e.target.value
                                //   })
                                // }}
                                onChange={(e) => {
                                  if (e.target.value == '1qw') {
                                    jQuery('#preferred_delivery_method option').prop("selected", false).trigger('change');

                                    window
                                      .jQuery('#add_customer_preferred_delivery')
                                      .modal('show')

                                  }
                                  var result = [];

                                  var options = e.target.options;
                                  var opt;
                                  for (
                                    var i = 0, iLen = options.length;
                                    i < iLen;
                                    i++
                                  ) {
                                    opt = options[i];

                                    if (opt.selected) {
                                      result.push(opt.value);
                                      this.setState({
                                        preferred_deliveryMethod: opt.value,
                                      });
                                    } else {
                                    }
                                  }

                                  // this.setState({
                                  //   preferred_paymentMethod: e.target.value
                                  // })
                                }}
                              >
                                <option value='1qw'>Add New</option>

                                {this.state.deliveryMethod.length > 0 &&
                                  this.state.deliveryMethod.map((item, i) => {
                                    return (
                                      <option
                                        value={item.id}
                                        data-status={item.id}
                                      >
                                        {item.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Preferred Payment Method</label>
                              <select
                                className="selectpicker form-control add-new"
                                id="prefererd_payment_method"
                                data-live-search="true"
                                title='Choose'
                                onChange={(e) => {
                                  if (e.target.value == '1qw') {
                                    jQuery('#prefererd_payment_method option').prop("selected", false).trigger('change');

                                    window
                                      .jQuery('#add_customer_preferred_payment')
                                      .modal('show')

                                  }
                                  var result = [];

                                  var options = e.target.options;
                                  var opt;
                                  for (
                                    var i = 0, iLen = options.length;
                                    i < iLen;
                                    i++
                                  ) {
                                    opt = options[i];

                                    if (opt.selected) {
                                      result.push(opt.value);

                                      this.setState({
                                        preferred_paymentMethod: opt.value,
                                      });
                                    } else {
                                    }
                                  }

                                  // this.setState({
                                  //   preferred_paymentMethod: e.target.value
                                  // })
                                }}
                              >
                                <option value='1qw'>Add New</option>

                                {this.state.PreferredPaymentMethod.length > 0 &&
                                  this.state.PreferredPaymentMethod.map(
                                    (item, i) => {
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
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 col-xs-12">
                              <span className="form-legend">
                                Sales Information
                            </span>
                              <span className="legend-sub">
                                You can also overwrite below default items on
                                individual transactions
                            </span>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Tax Settings</label>
                              <div>
                                <select
                                  className="selectpicker form-control add-new"
                                  id="sales_tax_selected"
                                  title='Choose'

                                  data-live-search="true"
                                  // onChange={e => {
                                  //   this.setState({ tax_settings: e.target.value })
                                  // }}
                                  onChange={(e) => {

                                    if (e.target.value == '1qw') {
                                      jQuery('#sales_tax_selected option').prop("selected", false).trigger('change');

                                      window
                                        .jQuery('#add_customer_sales_tax_settings')
                                        .modal('show')

                                    }
                                    var result = [];

                                    var options = e.target.options;
                                    var opt;
                                    for (
                                      var i = 0, iLen = options.length;
                                      i < iLen;
                                      i++
                                    ) {
                                      opt = options[i];

                                      if (opt.selected) {
                                        result.push(opt.value);

                                        this.setState({
                                          tax_settings: opt.value,
                                        });
                                      } else {
                                      }
                                    }

                                    // this.setState({
                                    //   preferred_paymentMethod: e.target.value
                                    // })
                                  }}
                                >
                                  <option value='1qw'>Add New</option>
                                  {this.state.salesTaxSettingsLists.length > 0 &&
                                    this.state.salesTaxSettingsLists.map(
                                      (item, i) => {
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
                              </div>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Default Account</label>
                              <div>
                                <select
                                  className="selectpicker form-control add-new"
                                  id="sales_default_account"
                                  data-live-search="true"
                                  title='Choose'
                                  // onChange={e => {
                                  //   this.setState({ tax_settings: e.target.value })
                                  // }}
                                  onChange={(e) => {
                                    if (e.target.value == '1qw') {
                                      jQuery('#sales_default_account option').prop("selected", false).trigger('change');

                                      window
                                        .jQuery('#pop-modal')
                                        .modal('show')

                                    }
                                    var result = [];

                                    var options = e.target.options;
                                    var opt;
                                    for (
                                      var i = 0, iLen = options.length;
                                      i < iLen;
                                      i++
                                    ) {
                                      opt = options[i];

                                      if (opt.selected) {
                                        result.push(opt.value);

                                        this.setState({
                                          sales_default_account: opt.value,
                                        });
                                      } else {
                                      }
                                    }

                                    // this.setState({
                                    //   preferred_paymentMethod: e.target.value
                                    // })
                                  }}
                                >
                                  <option value='1qw'>Add New</option>
                                  {this.state.salesDefaultAccountsList.length >
                                    0 &&
                                    this.state.salesDefaultAccountsList.map(
                                      (item, i) => {
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
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 col-xs-12">
                              <span className="form-legend">
                                Purchase Information
                            </span>
                              <span className="legend-sub">
                                You can also overwrite below default items on
                                individual transactions
                            </span>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Tax Settings</label>
                              <div>
                                <select
                                  className="selectpicker form-control add-new"
                                  id="purchase_default_tax"
                                  title='Choose'
                                  data-live-search="true"
                                  // onChange={e => {
                                  //   this.setState({ tax_settings: e.target.value })
                                  // }}
                                  onChange={(e) => {
                                    if (e.target.value == '1qw') {
                                      jQuery('#purchase_default_tax option').prop("selected", false).trigger('change');

                                      window
                                        .jQuery('#add_customer_purchase_tax_settings')
                                        .modal('show')

                                    }
                                    var result = [];

                                    var options = e.target.options;
                                    var opt;
                                    for (
                                      var i = 0, iLen = options.length;
                                      i < iLen;
                                      i++
                                    ) {
                                      opt = options[i];

                                      if (opt.selected) {
                                        result.push(opt.value);

                                        this.setState({
                                          purchase_tax_settings: opt.value,
                                        });
                                      } else {
                                      }
                                    }

                                    // this.setState({
                                    //   preferred_paymentMethod: e.target.value
                                    // })
                                  }}
                                >
                                  <option value='1qw'>Add New</option>
                                  {this.state.salesDefaultAccountsList.length >
                                    0 &&
                                    this.state.salesDefaultAccountsList.map(
                                      (item, i) => {
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
                              </div>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Default Account</label>
                              <div>
                                <select
                                  className="selectpicker form-control add-new"
                                  id="default_account_purchase"
                                  data-live-search="true"
                                  title='Choose'
                                  // onChange={e => {
                                  //   this.setState({ tax_settings: e.target.value })
                                  // }}
                                  onChange={(e) => {
                                    if (e.target.value == '1qw') {
                                      jQuery('#default_account_purchase option').prop("selected", false).trigger('change');

                                      window
                                        .jQuery('#pop-modal')
                                        .modal('show')

                                    }
                                    var result = [];

                                    var options = e.target.options;
                                    var opt;
                                    for (
                                      var i = 0, iLen = options.length;
                                      i < iLen;
                                      i++
                                    ) {
                                      opt = options[i];

                                      if (opt.selected) {
                                        result.push(opt.value);

                                        this.setState({
                                          purchase_default_account: opt.value,
                                        });
                                      } else {
                                      }
                                    }
                                  }}
                                >
                                  <option value='1qw'>Add New</option>
                                  {this.state.salesDefaultAccountsList.length >
                                    0 &&
                                    this.state.salesDefaultAccountsList.map(
                                      (item, i) => {
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
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 col-xs-12">
                              <span className="form-legend">Tax Information</span>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Tax ID</label>
                              <input
                                type="text"
                                name="cus-name"
                                id="tax_id"
                                autoComplete="off"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Business Reg No.</label>
                              <input
                                type="text"
                                name="cus-name"
                                id="bussiness_reg_no_finance"
                                autoComplete="off"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Default Sales Tax</label>
                              <div>
                                <select
                                  className="selectpicker form-control add-new"
                                  id="default_sales_tax"
                                  data-live-search="true"
                                  title='Choose'
                                  onChange={(e) => {

                                    if (e.target.value == '1qw') {
                                      jQuery('#default_sales_tax option').prop("selected", false).trigger('change');

                                      window
                                        .jQuery('#add_customer_default_sales_tax_option')
                                        .modal('show')

                                    }
                                    var result = [];

                                    var options = e.target.options;
                                    var opt;
                                    for (
                                      var i = 0, iLen = options.length;
                                      i < iLen;
                                      i++
                                    ) {
                                      opt = options[i];

                                      if (opt.selected) {
                                        result.push(opt.value);

                                        this.setState({
                                          default_sales_tax_selected: opt.value,
                                        });
                                      } else {
                                      }
                                    }
                                  }}
                                >
                                  <option value='1qw'>Add New</option>
                                  {this.state.customerSalesTaxList.length > 0 &&
                                    this.state.customerSalesTaxList.map(
                                      (item, i) => {
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
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Default Purchase Tax</label>
                              <div>
                                <select
                                  className="selectpicker form-control add-new"
                                  id="default_purchase_tax"
                                  data-live-search="true"
                                  title='Choose'
                                  onChange={(e) => {
                                    if (e.target.value == '1qw') {
                                      jQuery('#default_purchase_tax option').prop("selected", false).trigger('change');

                                      window
                                        .jQuery('#add_customer_default_purchase_tax_option')
                                        .modal('show')

                                    }
                                    var result = [];

                                    var options = e.target.options;
                                    var opt;
                                    for (
                                      var i = 0, iLen = options.length;
                                      i < iLen;
                                      i++
                                    ) {
                                      opt = options[i];

                                      if (opt.selected) {
                                        result.push(opt.value);

                                        this.setState({
                                          defaultPurchaseTax_selected: opt.value,
                                        });
                                      } else {
                                      }
                                    }
                                  }}
                                >
                                  <option value='1qw'>Add New</option>
                                  {this.state.defaultPurchaseTaxLists.length >
                                    0 &&
                                    this.state.defaultPurchaseTaxLists.map(
                                      (item, i) => {
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
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-xs-12 btn-bdr">
                            <a
                              data-toggle="pill"
                              onClick={() => {
                                jQuery("#additional").addClass("active");
                                jQuery("#finance").removeClass("active");
                              }}
                              className="btn btn-blue"
                              href="#additional-info"
                            >
                              Next
                          </a>
                          </div>
                        </form>
                      </div>
                      <div id="additional-info" className="tab-pane fade in">
                        <form className="custom-form invoice-form col-md-12 col-xs-12 legend-form pad-no">
                          <div className="row">
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Referral From</label>
                              <div>
                                <select
                                  className="selectpicker form-control add-new"
                                  id="refereal_frm"
                                  data-live-search="true"
                                  title='Choose'

                                  onChange={(e) => {
                                    if (e.target.value == '1qw') {
                                      jQuery('#refereal_frm option').prop("selected", false).trigger('change');

                                      window
                                        .jQuery('#add_customer_referral_from')
                                        .modal('show')

                                    }
                                    var result = [];

                                    var options = e.target.options;
                                    var opt;
                                    for (
                                      var i = 0, iLen = options.length;
                                      i < iLen;
                                      i++
                                    ) {
                                      opt = options[i];

                                      if (opt.selected) {
                                        result.push(opt.value);

                                        this.setState(
                                          {
                                            referel_fromList_selected: opt.value,
                                          },
                                          () => {
                                            console.log(
                                              "myattribute",
                                              this.state.referel_fromList_selected
                                            );
                                          }
                                        );
                                      } else {
                                      }
                                    }
                                  }}
                                >
                                  <option value='1qw'>Add New</option>
                                  {this.state.referel_fromLists.length > 0 &&
                                    this.state.referel_fromLists.map(
                                      (item, i) => {
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
                              </div>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                              <label>Rep</label>

                              <div>
                                <select
                                  className="selectpicker form-control add-new"
                                  id="repselected"
                                  title='Choose'
                                  data-live-search="true"
                                  onChange={(e) => {
                                    if (e.target.value == '1qw') {
                                      jQuery('#repselected option').prop("selected", false).trigger('change');

                                      // window
                                      // .jQuery('#add_customer_referral_from')
                                      // .modal('show')

                                    }
                                    var result = [];

                                    var options = e.target.options;
                                    var opt;
                                    for (
                                      var i = 0, iLen = options.length;
                                      i < iLen;
                                      i++
                                    ) {
                                      opt = options[i];

                                      if (opt.selected) {
                                        result.push(opt.value);

                                        this.setState({
                                          rep_infoList_selected: opt.value,
                                        });
                                      } else {
                                      }
                                    }
                                  }}
                                >
                                  <option value='1qw'>Add New</option>
                                  {this.state.rep_infoLists.length > 0 &&
                                    this.state.rep_infoLists.map((item, i) => {
                                      return (
                                        <option
                                          value={item.id}
                                          data-status={item.id}
                                        >
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 col-xs-12">
                              <span className="form-legend">Job Information</span>
                            </div>
                            <div className="form-group col-lg-4 col-md-12">
                              <label>Description</label>
                              <textarea
                                className="form-control"
                                defaultValue={""}
                                autoComplete="off"
                                id="decription_job"
                              />
                            </div>
                            {this.state.isAllmandatoryFilled && (
                              <div className="alert alert-card warning alert-dismissible fade in ">
                                <a
                                  href="#"
                                  className="close"
                                  data-dismiss="alert"
                                  aria-label="close"
                                  onClick={() => {
                                    this.setState({
                                      isAllmandatoryFilled: false,
                                    });
                                  }}
                                >
                                  ×
                              </a>
                                <div className="img-wrap">
                                  <img
                                    className="img-responsive"
                                    src="images/alert-warning.svg"
                                    alt="icon"
                                  />
                                </div>
                                <div className="alert-cont">
                                  <strong className="title">
                                    Mandatory fields must be filled!
                                </strong>
                                Please go back to the Company info and fill
                                required fields to proceed.
                              </div>
                              </div>
                            )}
                            <div className="col-lg-8 col-md-12 col-xs-12">
                              <div className="row">
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                  <label>Type</label>

                                  <div>
                                    <select
                                      className="selectpicker form-control add-new"
                                      id="type_id_selected"
                                      data-live-search="true"
                                      title='Choose'
                                      // onChange={e => {
                                      //   this.setState({ tax_settings: e.target.value })
                                      // }}
                                      onChange={(e) => {
                                        if (e.target.value == '1qw') {
                                          jQuery('#type_id_selected option').prop("selected", false).trigger('change');

                                          window
                                            .jQuery('#add_customer_job_type')
                                            .modal('show')

                                        }
                                        var result = [];

                                        var options = e.target.options;
                                        var opt;
                                        for (
                                          var i = 0, iLen = options.length;
                                          i < iLen;
                                          i++
                                        ) {
                                          opt = options[i];

                                          if (opt.selected) {
                                            result.push(opt.value);

                                            this.setState({
                                              type_infoList_slected: opt.value,
                                            });
                                          } else {
                                          }
                                        }

                                        // this.setState({
                                        //   preferred_paymentMethod: e.target.value
                                        // })
                                      }}
                                    >
                                      <option value='1qw'>Add New</option>
                                      {this.state.type_infoLists.length > 0 &&
                                        this.state.type_infoLists.map(
                                          (item, i) => {
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
                                  </div>
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                  <label>Status</label>
                                  <div>
                                    <select
                                      className="selectpicker form-control add-new"
                                      id="status_slected"
                                      title='Choose'
                                      data-live-search="true"
                                      // onChange={e => {
                                      //   this.setState({ tax_settings: e.target.value })
                                      // }}
                                      onChange={(e) => {
                                        if (e.target.value == '1qw') {
                                          jQuery('#status_slected option').prop("selected", false).trigger('change');

                                          window
                                            .jQuery('#add_customer_job_status')
                                            .modal('show')

                                        }
                                        var result = [];

                                        var options = e.target.options;
                                        var opt;
                                        for (
                                          var i = 0, iLen = options.length;
                                          i < iLen;
                                          i++
                                        ) {
                                          opt = options[i];

                                          if (opt.selected) {
                                            result.push(opt.value);

                                            this.setState({
                                              status_infoList_selected: opt.value,
                                            });
                                          } else {
                                          }
                                        }
                                      }}
                                    >
                                      <option value='1qw'>Add New</option>
                                      {this.state.status_infoLists.length > 0 &&
                                        this.state.status_infoLists.map(
                                          (item, i) => {
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
                                  </div>
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12 input-group-cus">
                                  <div>
                                    <label>Start Date</label>
                                    <div
                                      className="input-group date mar-t-no"
                                      data-date-format="dd/mm/yyyy"
                                    >
                                      <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        id="start_date"
                                      />
                                      <div className="input-group-addon">
                                        <img
                                          src="../images/calendar-icon.svg"
                                          alt="icon"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <label>End Date</label>
                                    <div
                                      className="input-group date mar-t-no"
                                      data-date-format="dd/mm/yyyy"
                                    >
                                      <input
                                        type="text"
                                        id="end_date"
                                        autoComplete="off"
                                        className="form-control"
                                      />
                                      <div className="input-group-addon">
                                        <img
                                          src="../images/calendar-icon.svg"
                                          alt="icon"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                  <label>Project End Date</label>
                                  <div
                                    className="input-group date mar-t-no"
                                    data-date-format="dd/mm/yyyy"
                                  >
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="project_end_date"
                                      autoComplete="off"
                                    />
                                    <div className="input-group-addon">
                                      <img
                                        src="../images/calendar-icon.svg"
                                        alt="icon"
                                      />
                                    </div>
                                  </div>
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
                                <strong className="title">Success!</strong>
                                {/* {this.props.location.state != '' &&
                              this.props.location.state != undefined
                                ? 'Customer Updated Successfully'
                                : ' New Customer added successfully.'} */}
                              New Job added successfully.
                            </div>
                            </div>
                          ) : (
                              ""
                            )}
                          <div className="col-md-12 col-xs-12 btn-bdr">
                            <button
                              type="button"
                              className="btn btn-green"
                              onClick={() => {
                                this.addNewCustomer();
                              }}
                            >
                              Finish
                          </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                    <strong className="title">Failed!</strong>Try again later
                </div>
                </div>
              )}
            </div>

            <Footer logoutSubmit={(e) => this.logoutLink()} defaultcategorylist_onchange={this.defaultcategorylist_onchange} />
          </div>
        </div>
    );
  }
}
export default addJob;
