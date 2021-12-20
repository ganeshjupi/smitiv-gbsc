import React from 'react'
import LeftSidebar from './left_sidebar'
import Footer from './footer'

import Topbar from './topbar'

import FetchAllApi from '../api_links/fetch_all_api'

import { PDFtoIMG } from 'react-pdf-to-image'

import jQuery from 'jquery'
// import 'bootstrap';
// import 'bootstrap-select';
import config from '../api_links/api_links'
var unique = require('array-unique')

var authorization_key = 'O5mGIP3VNia0JvPH2IBiwA=='

class AddNewVendor extends React.Component {
  constructor(props) {
    super(props)
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem('logged_user_id'),
      logged_client_id: localStorage.getItem('logged_client_id'),
      logged_role_id: localStorage.getItem('logged_role_id'),
      logged_user_name: localStorage.getItem('logged_user_name'),
      logged_user_email: localStorage.getItem('logged_user_email'),
      logged_user_phone: localStorage.getItem('logged_user_phone'),
      logged_user_image: localStorage.getItem('logged_user_image'),
      logged_company_name: localStorage.getItem('logged_company_name'),
      dropdown: '',
      inbox_list: [],
      response_stus: 0,
      response_msg: 'No data found',
      item_details: '',
      item_file_path: '',
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
      selected_currency: 'SGD',
      paymentTermsSelected: '',
      preferred_paymentMethod: '',
      preferred_deliveryMethod: '',
      tax_settings: '',
      salesTaxSettingsLists: [],
      salesDefaultAccountsList: [],
      sales_default_account: '',
      purchaseTaxSettingsList: [],
      purchase_tax_settings: '',
      purchaseDefaultAccountsList: [],
      purchase_default_account: '',
      customerSalesTaxList: [],
      default_sales_tax_selected: ' ',
      defaultPurchaseTaxLists: [],
      defaultPurchaseTax_selected: '',
      referel_fromLists: [],
      referel_fromList_selected: '',
      rep_infoLists: [],
      rep_infoList_selected: '',
      type_infoLists: [],
      type_infoList_slected: '',
      status_infoLists: [],
      status_infoList_selected: '',
      isSuccessful: false,
      isAllmandatoryFilled: false,
      iscompany_name: false,
      isbussinesno: false,
      iscustomer_name: false,
      iscurrency_id: false,
      isFailed: false,
      selectedCurrency: 3,
      customerTypeLists: [],
      rows: ['row1'],
      initial_value: 0,
      initial_valueContact: 0,

      resultArray: [],
      specific_id_delete: '',
      specific_item: '',
      addressArray: [],
      contactArray: [],
      rowContacts: ['row1'],
      BankDetails: ['row1'],
      initialArray: [],
      initialArrayAddress: [],
      first_address_id: '',
      taxName: "",
      taxType: '',
      taxRate: '',
      taxCode: '',
      show_succes: false,
      country_code: '',
      modal_info_msg: "",
      selected_rate_type: "%",
      maximum_chr_lngth: 4,
      selectedOption: "option2",
      rate_entered: "",
      search_key_gst: "",
      gst_list:[],
    }
  }

  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass('minimize_leftbar')

    // jQuery('title').html('User Inbox | GBSC')

    if (
      this.state.logged_user_id === '' ||
      this.state.logged_user_id === 'null' ||
      this.state.logged_user_id === 'undefined'
    ) {
      this.props.history.push('/')
    }

    // this.get_inbox_list()
  }
  convert_date = date => {
    if (date != undefined) {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
    }
    return date_formated
  }

  convert_toDefaultPicker = date => {
    if (date != undefined) {
      var array = date.split('-')

      var date_formated = array[2] + '/' + array[1] + '/' + array[0]
    }
    return date_formated
  }

  addNewBank = () => {
    var newrows = this.state.rows

    this.setState({ initial_value: this.state.initial_value + 1 })
    newrows.push('row' + (this.state.initial_value + 1))

    this.setState({ BankDetails: newrows })
  }

  addNew = () => {
    var newrows = this.state.rows

    this.setState({ initial_value: this.state.initial_value + 1 })
    newrows.push('row' + (this.state.initial_value + 1))

    this.setState({ rows: newrows })
  }

  addNewContact = () => {
    var newrows = this.state.rowContacts

    this.setState({
      initial_valueContact: this.state.initial_valueContact + 1
    })
    newrows.push('row' + (this.state.initial_valueContact + 1))
    this.setState({ rowContacts: newrows })
  }
  deleteContact = id => {
    var item_to_remove = Number(jQuery('#hiddencontactid' + id).val())

    var myobj = document.getElementById('todelete' + id)
    myobj.remove()

    var specific_item = id
    var newrows = this.state.rowContacts

    // if (this.state.rowContacts.length >= 1) {
    //   if (specific_item > -1) {
    //     newrows.splice(specific_item, 1);
    //   }
    // } else {
    //   jQuery("#name0").val("");
    //   jQuery("#designation0").val("");
    //   jQuery("#department0").val("");
    //   jQuery("#phone_work0").val("");
    //   jQuery("#phone_personal0").val("");
    //   jQuery("#email0").val("");
    //   jQuery("#skype0").val("");
    //   jQuery("#hiddencontactid0").val("");
    // }

    // this.setState({ rowContacts: newrows }, () => {
    //   this.handleChangeContacts();
    // });

    this.setState(
      {
        rowContacts: newrows,
        initialArray: [...this.state.initialArray, item_to_remove]
      },
      () => {
        this.handleChangeContacts()
      }
    )
  }

  delete = id => {
    var item_to_remove = Number(jQuery('#hidden_address_id' + id).val())
    var specific_item = id
    var newrows = this.state.rows

    var myobj = document.getElementById('addDelete' + id)
    myobj.remove()

    if (this.state.rows.length > 1) {
    } else {
      jQuery('#itemA0').val('')
      jQuery('#itemB0').val('')
      jQuery('#hidden_address_id').val('')
    }

    this.setState(
      {
        rows: newrows,
        initialArrayAddress: [...this.state.initialArrayAddress, item_to_remove]
      },
      () => {
        this.handleChange()
      }
    )
  }

  // delete = id => {
  //   var specific_item = id;
  //   var newrows = this.state.rows;

  //   if (this.state.rows.length > 1) {
  //     if (specific_item > -1) {
  //       newrows.splice(specific_item, 1);
  //     }
  //   } else {
  //     jQuery("#itemA0").val("");
  //     jQuery("#itemB0").val("");
  //     jQuery("#hidden_address_id").val("");
  //   }

  //   this.setState({ rows: newrows }, () => {
  //     this.handleChange();
  //   });
  // };
  handleChangeContacts = () => {
    var resultArray = []

    this.setState({ contactArray: resultArray })
    var rowlength = this.state.rowContacts.length
    for (var i = 0; i < rowlength; i++) {
      var name = jQuery('#name' + i).val()
      var designation = jQuery('#designation' + i).val()
      var department = jQuery('#department' + i).val()
      var phone_work = jQuery('#phone_work' + i).val()
      var phone_personal = jQuery('#phone_personal' + i).val()
      var email = jQuery('#email' + i).val()
      var skype = jQuery('#skype' + i).val()
      var is_primary = jQuery('#contact_chkbox' + i).is(':checked')
      var contact_id =
        jQuery('#hiddencontactid' + i).val() != ''
          ? jQuery('#hiddencontactid' + i).val()
          : '0'

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
        if (
          this.props.location.state != '' &&
          this.props.location.state != undefined
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
            contact_id: contact_id
          }
        } else {
          var current_item = {
            name: name,
            designation: designation,
            phone_work: phone_work,
            department: department,
            phone_personal: phone_personal,
            email: email,
            skype: skype,
            is_primary: is_primary
          }
        }
      }

      resultArray.push(current_item)
    }
  }
  // handleChangeContacts = () => {
  //   var resultArray = [];
  //   this.setState({ contactArray: resultArray });
  //   var rowlength = this.state.rowContacts.length;

  //   for (var i = 0; i < rowlength; i++) {
  //     var name = jQuery("#name" + i).val();
  //     var designation = jQuery("#designation" + i).val();
  //     var department = jQuery("#department" + i).val();
  //     var phone_work = jQuery("#phone_work" + i).val();
  //     var phone_personal = jQuery("#phone_personal" + i).val();
  //     var email = jQuery("#email" + i).val();
  //     var skype = jQuery("#skype" + i).val();
  //     var is_primary = jQuery("#contact_chkbox" + i).is(":checked");

  //     if (
  //       name != undefined &&
  //       designation != undefined &&
  //       department != undefined &&
  //       phone_work != undefined &&
  //       phone_personal != undefined &&
  //       email != undefined &&
  //       skype != undefined &&
  //       is_primary != undefined
  //     ) {
  //       var current_item = {
  //         name: name,
  //         designation: designation,
  //         phone_work: phone_work,
  //         department: department,
  //         phone_personal: phone_personal,
  //         email: email,
  //         skype: skype,
  //         is_primary: is_primary
  //       };
  //     }

  //     resultArray.push(current_item);
  //   }
  // };

  handleChange = e => {
    // var length= this.state.rows.length
    var resultArray = []


    let first_address = {
      shipping_address_name: '',
      shipping_address: jQuery('#shipping_address').val(),
      is_default: 0,
      billing_address: jQuery('#invoice_bill_to').val(),
      address_id: this.state.first_address_id ? this.state.first_address_id : 0
    }
    resultArray.push(first_address)

    this.setState({ addressArray: resultArray })
    var rowlength = this.state.rows.length
    for (var i = 0; i < rowlength; i++) {
      var shippingName = jQuery('#itemA' + i).val()
      var shippingAddress = jQuery('#itemB' + i).val()
      var checkbox = jQuery('#itemC' + i).is(':checked')
      var address_id = jQuery('#hidden_address_id' + i).val()

      if (checkbox === true) {
        var is_default = '1'
      } else {
        var is_default = '0'
      }

      if (
        this.props.location.state != '' &&
        this.props.location.state != undefined
      ) {
        if (shippingName != undefined && shippingAddress != undefined) {
          var current_item = {
            shipped_address_name: shippingName,
            shipped_address: shippingAddress,
            is_default: is_default,
            billing_address: jQuery('#invoice_bill_to').val(),
            address_id: Number(address_id)
          }
        }
      } else {
        if (shippingName != undefined && shippingAddress != undefined) {
          var current_item = {
            shipped_address_name: shippingName,
            shipped_address: shippingAddress,
            is_default: is_default,
            billing_address: jQuery('#invoice_bill_to').val()
          }
        }
      }

      if (current_item != undefined) {
        resultArray.push(current_item)
      }
    }
  }

  addNewCustomer = () => {
    // const contactArray = Object.values(
    //   this.state.contactArray.reduce((a, c) => {
    //     a[c.label + '|' + c.email] = c;
    //     return a
    //   }, {}))

    this.handleChange()

    setTimeout(() => {
      var contactArray = this.state.contactArray
      unique(contactArray)

      var addressArray = this.state.addressArray
      unique(addressArray)

      if (addressArray[0] === null) {
        addressArray.shift()
      } else {
      }


      // const addressArray = Object.values(
      //   this.state.addressArray.reduce((a, c) => {
      //     a[c.label + '|' + c.billing_address] = c;
      //     return a
      //   }, {}))

      //  alert( 'hi')
      let customer_name = jQuery('#customer_name').val()
      let customer_type_selected = jQuery('#customer_type option:selected').data(
        'status'
      )
      let open_balance = jQuery('#open_balance').val()
      let date_asofnow = this.convert_date(jQuery('#date_asofnow').val())

      let company_name = jQuery('#company_name').val()
      let bussiness_reg_no = jQuery('#bussiness_reg_no').val()
      let seletedCurrency = this.state.selected_currency
      let currency_id = jQuery('#currency_id option:selected').data('status')
      let currency_type = jQuery('#currency_id option:selected').data('currency')
      let website_name = jQuery('#website_name').val()

      let primary_contact_person = jQuery('#primary_contact_person').val()
      let primary_designation = jQuery('#primary_designation').val()
      let primary_department = jQuery('#primary_department').val()
      let primary_phone_work = jQuery('#primary_phone_work').val()
      let primary_phone_personel = jQuery('#primary_phone_personel').val()
      let primary_email_of = jQuery('#primary_email_of').val()
      let primary_skype = jQuery('#primary_skype').val()

      let invoice_bill_to = jQuery('#invoice_bill_to').val()
      let shipping_address = jQuery('#shipping_address').val()
      let shipping_addrs_name = jQuery('#shipping_addrs_name').val()
      let shipping_adress_last = jQuery('#shipping_adress_last').val()

      let bank_ac_no = jQuery('#bank_ac_no').val()
      let credit_limit = jQuery('#credit_limit').val()
      let price_level = jQuery('#price_level').val()
      let payment_terms = jQuery('#payment_terms option:selected').data('status')

      let Bank_Account_No = jQuery('#Bank_Account_No').val()
      let IFSC_Code = jQuery('#IFSC_Code').val()

      let tax_id = jQuery('#tax_id').val()
      let bussiness_reg_no_finance = jQuery('#bussiness_reg_no_finance').val()
      let default_sales_tax_selected = jQuery(
        '#default_sales_tax option:selected'
      ).data('status')
      let defaultPurchaseTax_selected = jQuery(
        '#default_purchase_tax option:selected'
      ).data('status')

      if (
        this.props.location.state != '' &&
        this.props.location.state != undefined
      ) {
        //Route for update

        if (bussiness_reg_no && company_name && customer_name && currency_id) {
          FetchAllApi.edit_vendor(
            customer_name,
            customer_type_selected,
            open_balance,
            date_asofnow,

            company_name,
            bussiness_reg_no,
            currency_type,
            currency_id,
            website_name,

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

            bank_ac_no,
            credit_limit,
            price_level,
            payment_terms,

            Bank_Account_No,
            IFSC_Code,

            tax_id,
            bussiness_reg_no_finance,
            default_sales_tax_selected,
            defaultPurchaseTax_selected,
            addressArray,
            contactArray,
            this.state.logged_user_id,
            this.state.logged_client_id,
            this.props.location.state.vendor_id,
            this.state.initialArray,
            this.state.initialArrayAddress,

            (err, response) => {
              if (response.status === 1) {
                this.setState({ isSuccessful: true })
                setTimeout(() => {
                  this.props.history.push('/Vendors_list')
                }, 1500)
                this.clearAllFormValues()




              } else {
                this.setState({ isFailed: true })
                setTimeout(() => {
                  this.setState({ isFailed: false })
                }, 5000)
              }
            }
          )
        } else {
          this.setState({ isAllmandatoryFilled: true })
          setTimeout(() => {
            this.setState({ isAllmandatoryFilled: false })
          }, 5000)
          if (!bussiness_reg_no) {
            this.setState({ isbussinesno: true })
          } else {
            this.setState({ isbussinesno: false })
          }

          if (!company_name) {
            this.setState({ iscompany_name: true })
          } else {
            this.setState({ iscompany_name: false })
          }
          if (!customer_name) {
            this.setState({ iscustomer_name: true })
          } else {
            this.setState({ iscustomer_name: false })
          }

          if (!currency_id) {
            this.setState({ iscurrency_id: true })
          } else {
            this.setState({ iscurrency_id: false })
          }
          if (!seletedCurrency) {
          }
        }

        // ends here
      } else {
        if (bussiness_reg_no && company_name && customer_name && currency_id) {
          FetchAllApi.addNew_Vendor(
            customer_name,
            customer_type_selected,
            open_balance,
            date_asofnow,

            company_name,
            bussiness_reg_no,
            currency_type,
            currency_id,
            website_name,

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

            bank_ac_no,
            credit_limit,
            price_level,
            payment_terms,

            Bank_Account_No,
            IFSC_Code,

            tax_id,
            bussiness_reg_no_finance,
            default_sales_tax_selected,
            defaultPurchaseTax_selected,
            this.state.addressArray,
            this.state.contactArray,
            this.state.logged_user_id,
            this.state.logged_client_id,

            (err, response) => {
              if (response.status === 1) {
                this.setState({ isSuccessful: true })
                alert('vendor added successfully')
                setTimeout(() => {
                  this.props.history.push('/Vendors_list')
                }, 1500)
                this.clearAllFormValues()
              } else {
                this.setState({ isFailed: true })
                setTimeout(() => {
                  this.setState({ isFailed: false })
                }, 5000)
              }

              localStorage.setItem('customer_added', 'yes')
              localStorage.setItem('customer_added_id', response.vendor_id)
              //  for add third party id
              localStorage.setItem("third_party_customer_id", response.vendor_id)
              localStorage.setItem("third_party_customer", 'yes2');

              var iframe = document.createElement('iframe');
              iframe.style.cssText = 'opacity:0;position:absolute';
              iframe.src = 'about:blank';
              iframe.onload = function () {
                iframe.contentWindow.close.call(window);
                document.body.removeChild(iframe);
              };
              document.body.appendChild(iframe);

            }
          )
        } else {
          this.setState({ isAllmandatoryFilled: true })
          setTimeout(() => {
            this.setState({ isAllmandatoryFilled: false })
          }, 5000)
          if (!bussiness_reg_no) {
            this.setState({ isbussinesno: true })
          } else {
            this.setState({ isbussinesno: false })
          }

          if (!company_name) {
            this.setState({ iscompany_name: true })
          } else {
            this.setState({ iscompany_name: false })
          }
          if (!customer_name) {
            this.setState({ iscustomer_name: true })
          } else {
            this.setState({ iscustomer_name: false })
          }
          if (!currency_id) {
            this.setState({ iscurrency_id: true })
          } else {
            this.setState({ iscurrency_id: false })
          }
          if (!seletedCurrency) {
          }
        }
      }
    }, 500);


  }

  clearAllFormValues = () => {
    this.setState({
      tax_settings: '',
      purchase_tax_settings: '',
      purchase_default_account: '',
      default_sales_tax_selected: '',
      defaultPurchaseTax_selected: '',
      referel_fromList_selected: '',
      rep_infoList_selected: '',
      type_infoList_slected: '',
      status_infoList_selected: ''
    })

    jQuery('#bussiness_reg_no').val('')
    jQuery('#company_name').val('')
    jQuery('#customer_name').val('')
    jQuery('.customer_type').html('')
    jQuery('#open_balance').val('')
    jQuery('#date_asofnow').val('')
    jQuery('#website_name').val('')
    jQuery('#primary_contact_person').val('')
    jQuery('#primary_designation').val('')
    jQuery('#primary_department').val('')
    jQuery('#primary_phone_work').val('')
    jQuery('#primary_phone_personel').val('')
    jQuery('#primary_email_of').val('')
    jQuery('#primary_skype').val('')
    jQuery('#invoice_bill_to').val('')
    jQuery('#shipping_address').val('')
    jQuery('#shipping_addrs_name').val('')
    jQuery('#shipping_adress_last').val('')
    jQuery('#bank_ac_no').val('')
    jQuery('#contact_person').val('')
    jQuery('#credit_limit').val('')
    jQuery('#price_level').val('')
    jQuery('#tax_id').val('')
    jQuery('#decription_job').val('')
    jQuery('#start_date').val('')
    jQuery('#end_date').val('')
    jQuery('#project_end_date').val('')
  }

  // get_currencies = () => {
  //   fetch('https://api.exchangerate-api.com/v4/latest/SGD')
  //     .then(response => response.json())
  //     .then(data => {
  //       let first = Object.keys(data.rates)
  //       this.setState({ currencies: first })
  //     })
  // }

  get_paymentTerms = () => {
    var client_id = this.state.logged_client_id
    FetchAllApi.vendorPaymentTerms(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ paymentTerms: response.list })
      } else {
        this.setState({ paymentTerms: [] })
      }
    })
  }

  delivery_method = () => {
    FetchAllApi.deliveryMethodList(this.state.logged_client_id,(err, response) => {
      if (response.status === 1) {
        this.setState({ deliveryMethod: response.lists })
      } else {
        this.setState({ deliveryMethod: [] })
      }
    })
  }

  PreferredPaymentMethod = () => {
    fetch(config.PreferredPaymentMethod, {
      method: 'GET',

      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: authorization_key
      }
    })
      .then(response => response.json())
      .then(data => {
        let first = data.lists
        this.setState({ PreferredPaymentMethod: first })
      })
  }

  // salesDefaultAccounts = () => {
  //   FetchAllApi.salesDefaultAccountsList(this.state.logged_client_id,(err, response) => {
  //     if (response.status === 1) {
  //       this.setState({ salesDefaultAccountsList: response.lists })
  //     } else {
  //       this.setState({ salesDefaultAccountsList: [] })
  //     }
  //   })
  // }

  customer_SalesTaxLists = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.vendor_sales_tax_list(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ customerSalesTaxList: response.list })
      } else {
        this.setState({ customerSalesTaxList: [] })
      }
    })
  }

  purchaseDefaultAccounts = () => {
    FetchAllApi.purchaseDefaultAccountsList(this.state.logged_client_id,(err, response) => {
      if (response.status === 1) {
        this.setState({ purchaseDefaultAccountsList: response.lists })
      } else {
        this.setState({ purchaseDefaultAccountsList: [] })
      }
    })
  }
  salesTaxSettings = () => {
    FetchAllApi.salesTaxSettingsList(this.state.logged_client_id,(err, response) => {
      if (response.status === 1) {
        this.setState({ salesTaxSettingsLists: response.lists })
      } else {
        this.setState({ salesTaxSettingsLists: [] })
      }
    })
  }
  purchaseTaxSettings = () => {
    FetchAllApi.purchaseTaxSettingsList(this.state.logged_client_id,(err, response) => {
      if (response.status === 1) {
        this.setState({ purchaseTaxSettingsList: response.lists })
      } else {
        this.setState({ purchaseTaxSettingsList: [] })
      }
    })
  }

  defaultPurchaseTaxLists = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.vendor_purchase_tax_list(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ defaultPurchaseTaxLists: response.list })
      } else {
        this.setState({ defaultPurchaseTaxLists: [] })
      }
    })
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

  //1

  referel_from = () => {
    FetchAllApi.referel_from(this.state.logged_client_id,(err, response) => {
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
      if (response.status === 1) {
        this.setState({ type_infoLists: response.lists })
      } else {
        this.setState({ type_infoLists: [] })
      }
    })
  }
  //4

  status_info = () => {
    FetchAllApi.status_info(this.state.logged_client_id,(err, response) => {
      if (response.status === 1) {
        this.setState({ status_infoLists: response.lists })
      } else {
        this.setState({ status_infoLists: [] })
      }
    })
  }

  //5 pending
  customer_type = () => {
    FetchAllApi.customer_type((err, response) => {
      if (response.status === 1) {
        this.setState({ customer_typeLists: response.lists })
      } else {
        this.setState({ customer_typeLists: [] })
      }
    })
  }

  //6
  get_currencies = () => {
    FetchAllApi.currencies((err, response) => {
      if (response.status === 1) {
        this.setState({ currencies: response.lists })
      } else {
        this.setState({ currencies: [] })
      }
    })
  }

  //7
  get_customer_type = () => {
    var client_id = this.state.logged_client_id

    FetchAllApi.vendorTypes(client_id, (err, response) => {

      if (response.status === 1) {
        this.setState({ customerTypeLists: response.list })
      } else {
        this.setState({ customerTypeLists: [] })
      }
    })
  };


  handleChangeTax(event) {

    this.setState(
      {
        [event.target.name]: event.target.value,
      },

    );
  };


  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  };


  



  handleChange_gst_type = (event) => {
    if (this.state.selected_rate_type != "Fixed price") {

      let entered_value = event.target.value;
      console.log(isNaN(entered_value))
      // alert(entered_value)
      if (isNaN(entered_value)) {
        jQuery("#tax").val("");
      } else {
        if (entered_value > 100) {
          jQuery("#tax").val("");
        } else {
          this.setState({ taxRate: entered_value });
        }
      }
    } else {
      let entered_value = event.target.value;
      if (isNaN(entered_value)) {
        jQuery("#tax").val("");
      } else {
        this.setState({ taxRate: entered_value });
      }
    }
  };


  add_gst_details = (e) => {
    e.preventDefault();
    let sales_tax_code = this.state.taxCode;
    let sales_tax_name = this.state.taxName;
    let show_on_list = 1;
    let tax_type = this.state.selectedOption === "option1" ? 1 : 2;
    let rate = this.state.taxRate;

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
    console.log("hjagsjkhlkasjh", items);
    FetchAllApi.add_gst_details(items, (err, response) => {
      console.log("add comment", response.status);

      if (response.status === 1) {
        jQuery("#sales_tax_code").val("");
        jQuery("#sales_tax_name").val("");
        jQuery("#sales_tax_name").val("");
        jQuery("#tax").val("");
        this.setState({ show_succes: true });
        this.get_gst_list();
        var THIS = this;
        setTimeout(function () {
          THIS.setState({ show_succes: false });
        }, 4000);
        window.jQuery("#pop-modal-Tax").modal("hide");
      } else {
        this.setState({ modal_info_msg: response.message });
        jQuery(".mymsg").fadeIn(2000);
        setTimeout(function () {
          jQuery(".mymsg").fadeOut(2000);
        }, 8000);
      }
    });
  };

  getCountry = () => {
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
  }

  get_gst_list = () => {
    let country_code = this.state.country_code;
    //alert(country_code)
    let keyword = this.state.search_key_gst;
    FetchAllApi.get_gst_list(country_code, keyword, this.state.logged_client_id, (err, response) => {
      console.log("defaultcategorylist", response);
      //alert(response.message)
      if (response.status === 1) {
        response.list.map((item) => {
          item.check = false
        })
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

  componentDidUpdate() {
    window.jQuery('.selectpicker').selectpicker('refresh')
    // jQuery("#currency_selected").val(4);
  }
  componentDidMount() {

    if (
      this.props.location.state != '' &&
      this.props.location.state != undefined &&
      this.props.location.state.contacts != '' &&
      this.props.location.state.contacts != undefined
    ) {
      // Set rowContacts  array
      this.setState({ rowContacts: this.props.location.state.contacts }, () => {
        // Loop to append details

        for (let i = 0; i < this.props.location.state.contacts.length; i++) {
          jQuery('#name' + i).val(this.props.location.state.contacts[i].name)
          jQuery('#designation' + i).val(
            this.props.location.state.contacts[i].designation
          )
          jQuery('#department' + i).val(
            this.props.location.state.contacts[i].department
          )
          jQuery('#phone_work' + i).val(
            this.props.location.state.contacts[i].phone_work
          )
          // jQuery("#phone_personal" + i).val("Key is not there");
          jQuery('#phone_personal' + i).val(
            this.props.location.state.contacts[i].phone_personal
          )
          jQuery('#hiddencontactid' + i).val(
            this.props.location.state.contacts[i].contact_id
          )

          jQuery('#email' + i).val(this.props.location.state.contacts[i].email)
          jQuery('#skype' + i).val(this.props.location.state.contacts[i].skype)
        }

        this.handleChangeContacts();
        
      })
    }





    // if (
    //   this.props.location.state &&
    //   this.props.location.state.address != undefined &&
    //   this.props.location.state.address
    // ) {
    //   this.setState({ rows: this.props.location.state.address }, () => {
    //     for (let i = 0; i < this.props.location.state.address.length; i++) {
    //       // alert(this.props.location.state.address[i].shipping_address_name)

    //       jQuery('#itemA' + i).val(
    //         this.props.location.state.address[i].shipped_address_name
    //       )
    //       jQuery('#itemB' + i).val(
    //         this.props.location.state.address[i].shipped_address
    //       )
    //       jQuery('#itemC' + i).val(
    //         this.props.location.state.address[i].is_default
    //       )
    //       jQuery('#hidden_address_id' + i).val(
    //         this.props.location.state.address[i].address_id
    //       )
    //     }

    //     this.handleChange()
    //   })
    // }

    if (
      this.props.location.state != '' &&
      this.props.location.state != undefined
    ) {
      let customerName = this.props.location.state.vendor.name
      if (customerName != undefined && customerName != '') {
        jQuery('#customer_name').val(customerName)
      }

      let companyName = this.props.location.state.company.company_name
      if (companyName != undefined && companyName != '') {
        jQuery('#company_name').val(companyName)
      }

      let website = this.props.location.state.company.website
      if (website != undefined && website != '') {
        jQuery('#website_name').val(website)
      }

      let bussiness_reg_no1 = this.props.location.state.company.business_reg_no
      if (bussiness_reg_no1 != undefined) {
        jQuery('#bussiness_reg_no').val(bussiness_reg_no1)
      }

      let Bank_Account_No = this.props.location.state.finance.bank_account_no
      if (Bank_Account_No != undefined) {
        jQuery('#Bank_Account_No').val(Bank_Account_No)
      }

      let IFSC_Code = this.props.location.state.finance.ifsc_code
      if (IFSC_Code != undefined) {
        jQuery('#IFSC_Code').val(IFSC_Code)
      }

      // if (
      //   this.props.location.state.address[0] != undefined &&
      //   this.props.location.state.address[0] != ''
      // ) {
      //   let invoice_bill_to = this.props.location.state.address[0]
      //     .billing_address

      //   jQuery('#invoice_bill_to').val(invoice_bill_to)
      // }



      if (
        this.props.location.state.address[0] != undefined &&
        this.props.location.state.address[0] != ''
      ) {
        let invoice_bill_to = this.props.location.state.address[0]
          .billing_address

        let shipped_address = this.props.location.state.address[0]
          .shipped_address

        jQuery('#invoice_bill_to').val(invoice_bill_to)
        jQuery('#shipping_address').val(shipped_address)

        let first_address_id = this.props.location.state.address[0].address_id
        setTimeout(() => {
          this.setState({ first_address_id })
        }, 500);
      }

      if (
        this.props.location.state.address != undefined &&
        this.props.location.state.address != ''
      ) {

        let array_temp = this.props.location.state.address
        array_temp.shift()
        this.setState({ rows: array_temp }, () => {
          // Loop to append details

          for (let i = 0; i < array_temp.length; i++) {
            jQuery('#itemA' + i).val(
              array_temp[i].shipped_address_name
            )
            jQuery('#itemB' + i).val(
              array_temp[i].shipped_address
            )
            jQuery('#itemC' + i).val(
              array_temp[i].is_default
            )
            jQuery('#hidden_address_id' + i).val(
              array_temp[i].address_id
            )
          }
          // To retrieve all the data from existing

          setTimeout(() => {

          }, () => this.handleChange(), 500);

        })
      }

      let date_asofnow = this.props.location.state.vendor.as_of
      if (date_asofnow != undefined && date_asofnow != '') {
        jQuery('#date_asofnow').val(this.convert_toDefaultPicker(date_asofnow))
      }

      let open_balance = this.props.location.state.vendor.opening_balance
      if (open_balance != undefined && open_balance != '') {
        jQuery('#open_balance').val(open_balance)
      }

      //finance
      //alert(this.props.location.state.finance.payment_terms)

      let bank_account_no = this.props.location.state.finance.bank_account_no
      if (bank_account_no != undefined && bank_account_no != '') {
        jQuery('#bank_ac_no').val(bank_account_no)
      }

      let price_level = this.props.location.state.finance.billing_price_level
      if (price_level != undefined && price_level != '') {
        jQuery('#price_level').val(price_level)
      }

      let credit_limit = this.props.location.state.finance.credit_limit
      if (credit_limit != undefined && credit_limit != '') {
        jQuery('#credit_limit').val(credit_limit)
      }

      let tax_id = this.props.location.state.finance.tax_id
      if (tax_id != undefined && tax_id != '') {
        jQuery('#tax_id').val(tax_id)
      }

      let business_reg_no = this.props.location.state.finance.business_reg_no
      if (business_reg_no != undefined && business_reg_no != '') {
        jQuery('#bussiness_reg_no_finance').val(business_reg_no)
      }
    }

    // alert(this.props.location.state.customer.name)
    this.rep_info()
    this.type_info()
    this.referel_from()
    this.status_info()
    this.get_currencies()
    this.get_paymentTerms()
    this.delivery_method()
    this.PreferredPaymentMethod()
    this.salesTaxSettings()
    // this.salesDefaultAccounts()
    this.purchaseTaxSettings()
    this.purchaseDefaultAccounts()
    this.customer_SalesTaxLists()
    this.defaultPurchaseTaxLists()
    this.get_customer_type()
    this.defaultcategorylist_onchange();
    this.getCountry();

    jQuery(window).on('load', function () {
      jQuery('.mscroll-y').mCustomScrollbar({
        axis: 'y',
        scrollEasing: 'linear',
        scrollInertia: 600,
        autoHideScrollbar: 'true',
        autoExpandScrollbar: 'true'
      })
      jQuery('.mscroll-x').mCustomScrollbar({
        axis: 'x',
        scrollEasing: 'linear',
        scrollInertia: 600,
        autoHideScrollbar: 'true',
        autoExpandScrollbar: 'true'
      })

      jQuery('.ib-scroll').mCustomScrollbar({
        scrollEasing: 'linear',
        scrollInertia: 600,
        scrollbarPosition: 'outside'
      })
    })

    jQuery(document).ready(function () {
      jQuery('.left-navmenu .has-sub').click(function () {
        jQuery('.left-navmenu li a').removeClass('active')
        jQuery(this).addClass('active')
        jQuery('.left-navmenu li a:not(.active)')
          .siblings('.sub-menu')
          .slideUp()
        jQuery(this)
          .siblings('.sub-menu')
          .slideToggle()
      })
      jQuery('.left-navmenu .sub-menu li a').click(function () {
        jQuery('.left-navmenu .sub-menu li a').removeClass('active')
        jQuery(this).addClass('active')
      })
      jQuery('.search-btn').click(function () {
        jQuery('.hdr-search').addClass('active')
      })
      jQuery('.hdr-search .close-icon').click(function () {
        jQuery('.hdr-search').removeClass('active')
      })
      window.jQuery('.select-picker').selectpicker()
      jQuery('.label-enclose .label').click(function () {
        jQuery(this).toggleClass('active')
      })
      jQuery('.nav-brand-res').click(function () {
        jQuery('.left-navbar').addClass('active')
      })
      jQuery('.menu-close').click(function () {
        jQuery('.left-navbar').removeClass('active')
      })
      // jQuery('.custom-select-drop .dropdown-menu a').click(function () {
      //   jQuery('.open.custom-select-drop .dropdown-menu li.active').removeClass(
      //     'active'
      //   )
      //   jQuery(this)
      //     .parent('li')
      //     .addClass('active')
      //   jQuery('.open #selected').text(jQuery(this).text())
      // })

      window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

      jQuery('[data-toggle="tooltip"]').tooltip()

      jQuery('.snippet').mouseenter(function () {
        jQuery('.snippet').removeClass('active')
        jQuery(this).addClass('active')
      })

      jQuery('.filter-btn').click(function () {
        jQuery(this).css('visibility', 'hidden')
        jQuery('.report-filter').slideDown()
      })

      jQuery('.report-filter .close-btn').click(function () {
        jQuery('.filter-btn').css('visibility', 'visible')
        jQuery('.report-filter').slideUp()
      })
    })

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

    this.props.history.push('/')
  }

  dataTaggingFunc(list_id, file_id) {
    this.props.history.push('/data_tagging/' + list_id + '/' + file_id)
    window.scrollTo(0, 0)
  }
  // get_inbox_list = () => {
  //   var page_no = 1
  //   var items_limit = 10
  //   var filter_status = ''
  //   var client_id = ''

  //   FetchAllApi.inboxList(
  //     page_no,
  //     items_limit,
  //     filter_status,
  //     client_id,
  //     (err, response) => {
  //       if (response.status === 1) {
  //         this.setState({
  //           inbox_list: response.list,
  //           response_msg: response.message,
  //           response_stus: response.status
  //         })
  //         jQuery('.item-listwrap').css('display', 'block')
  //         jQuery('.inbox-right').css('display', 'flex')
  //         jQuery('.no_rec').css('display', 'none')
  //       } else {
  //         jQuery('.item-listwrap, .inbox-right').css('display', 'none')
  //         jQuery('.no_rec').css('display', 'block')
  //       }
  //     }
  //   )
  // }

  // getItemDetails (list_id) {
  //   var status = 0
  //   var client_id = 0

  //   this.setState({
  //     list_id: list_id
  //   })

  //   FetchAllApi.getItemDetails(list_id, status, client_id, (err, response) => {
  //     jQuery('.inbox-item').removeClass('active')
  //     if (response.status === 1) {
  //       jQuery('#list-' + list_id).addClass('active')
  //       jQuery('#inboxRgt').removeClass('inboxRgtDisp')
  //       jQuery('#inboxLft').removeClass('fluid')

  //       this.setState({
  //         item_details: response.details,
  //         item_file_path: response.details.file_path,
  //         item_file_id: response.details.attachments
  //       })

  //       if (response.details.previous_record !== '') {
  //         jQuery('#prev').removeClass('in-active')
  //       } else {
  //         jQuery('#prev').addClass('in-active')
  //       }
  //       if (response.details.next_record !== '') {
  //         jQuery('#next').removeClass('in-active')
  //       } else {
  //         jQuery('#next').addClass('in-active')
  //       }
  //     } else {
  //       jQuery('#inboxRgt').addClass('inboxRgtDisp')
  //     }
  //   })
  // }

  // filterInboxItem (page_no, items_limit, filter_stat,client_id) {

  //   var selected_sorting = [...this.state.waiting_re,...this.state.re_assigned];
  //   if(selected_sorting !=''){
  //     var filter_status=selected_sorting;
  //     FetchAllApi.inboxList(
  //       page_no,
  //       items_limit,
  //       filter_status,
  //       client_id=this.state.logged_client_id,
  //       (err, response) => {
  //         if (response.status === 1) {
  //           this.setState({
  //             inbox_list: response.list,
  //             response_msg: response.message,
  //             response_stus: response.status
  //           })
  //           jQuery('.item-listwrap').css('display', 'block')
  //           jQuery('.inbox-right').css('display', 'flex')
  //           jQuery('.no_rec').css('display', 'none')
  //         } else {
  //           jQuery('.item-listwrap, .inbox-right').css('display', 'none')
  //           jQuery('.no_rec').css('display', 'block')
  //         }
  //       }
  //     )
  //   }else{this.get_inbox_list()}

  // }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }
  routedChange(parameter) {
    this.props.history.push('/' + parameter)
    window.scrollTo(0, 0)
  }

  copyFunction = () => {
    let addrss = jQuery('#invoice_bill_to').val()
    jQuery('#shipping_address').val(addrss)
  }

  render() {
    console.log("render",this.state.salesDefaultAccountsList)
    var data = ''
    data = this.state.currencies
    let get_file_path,
      dis_file_path = [],
      item_file_path = [],
      attach_file_path,
      options = [],
      page_no = 1,
      items_limit = 10,
      no_items

    if (
      this.state.item_details.user_image !== '' &&
      this.state.item_details.user_image !== 'null'
    ) {
      var item_user_image = this.state.item_details.user_image
    } else {
      var item_user_image = 'images/user-img-1.png'
    }

    if (
      this.state.item_file_path !== '' &&
      this.state.item_file_path !== 'null'
    ) {
      item_file_path = []
      var split_file_path = this.state.item_file_path.toString().split(',')
      var split_file_id = this.state.item_file_id.toString().split(',')
      if (split_file_path.length >= 1) {
        for (var i = 0; i < split_file_path.length; i++) {
          var get_file_url = split_file_path[i]
          var split_file_name = split_file_path[i].toString().split('/')
          var arr_reverse = split_file_name.reverse()

          var get_file_name = arr_reverse[0].substring(
            arr_reverse[0].length - 15,
            arr_reverse[0].length
          )

          var get_file_ext = arr_reverse[0].substring(
            arr_reverse[0].lastIndexOf('.') + 1,
            arr_reverse[0].length
          )
          if (get_file_ext === 'pdf') {
            var file_icon = 'images/pdf-icon.png'
          } else {
            var file_icon = 'images/img-icon.png'
          }


          if (get_file_ext === 'pdf') {
            item_file_path.push(
              <div className='attach-item'>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  className='img-wrap'
                  data-id={split_file_id[i]}
                >
                  <iframe
                    src={get_file_url}
                    id='pdf_thumb_viewer'
                    frameborder='0'
                    scrolling='no'
                    width='190'
                    height='190'
                  ></iframe>
                  <span className='go'>
                    <img
                      src='../images/next-arrow-white.svg'
                      className='mCS_img_loaded'
                    />
                  </span>
                </a>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  data-toggle='tooltip'
                  data-placement='top'
                  title={get_file_url}
                  data-id={split_file_id[i]}
                >
                  <span>{get_file_name}</span>
                  <img
                    src='../images/download-icon.svg'
                    alt='Icon'
                    className='mCS_img_loaded'
                  />
                </a>
              </div>
            )
          } else {
            item_file_path.push(
              <div className='attach-item'>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  className='img-wrap'
                  data-id={split_file_id[i]}
                >
                  <img
                    className='img-responsive mCS_img_loaded'
                    src={get_file_url}
                    alt={get_file_ext}
                  />
                  <span className='go'>
                    <img
                      src='../images/next-arrow-white.svg'
                      className='mCS_img_loaded'
                    />
                  </span>
                </a>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  data-toggle='tooltip'
                  data-placement='top'
                  title={get_file_url}
                  data-id={split_file_id[i]}
                >
                  <span>{get_file_name}</span>
                  <a href={get_file_url} download={get_file_name}>
                    {get_file_name}
                    <img
                      src='../images/download-icon.svg'
                      alt='Icon'
                      className='mCS_img_loaded'
                    />
                  </a>
                </a>
              </div>
            )
          }
        }
      }
    }

    options.push(<option>ORG-250</option>)

    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <LeftSidebar history={this.props.history} pageSubmit={e => this.pageLink(e)} />

            <div className='main-wrap col-md-12 col-xs-12 pad-r-no'>
              <div className='top-bar col-md-12 col-xs-12 pad-r-no'>
                <div className='nav-brand-res visible-xs'>
                  <img
                    className='img-responsive'
                    src='../images/logo-icon.png'
                    alt='LogoIcon'
                  />
                </div>
                {/* <span className='page-title hidden-xs'>Inbox</span> */}
                <a href='javascript:;' class='back hidden-xs' onClick={() => this.props.history.goBack()}>
                  {' '}
                  <img src='../images/back-arrow-blue.svg' />{' '}
                </a>
                <ul className='list-unstyled breadcrumb page-title hidden-xs'>
                  <li>
                    <a
                      href='javascript: ;'
                      onClick={this.routedChange.bind(this, 'Vendors_list')}
                    >
                      Vendors
                    </a>
                  </li>
                  <li>
                    {this.props.location.state !== undefined
                      ? 'Update Vendor Details'
                      : 'Add New Vendor'}
                  </li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className='content-top col-md-12 col-xs-12'>
                <ul className='nav nav-pills transparent nowrap'>
                  <li className='active' id='company'>
                    <a data-toggle='pill' href='#company-info'>
                      Company Info
                    </a>
                  </li>
                  <li id='finance'>
                    <a data-toggle='pill' href='#finance-info'>
                      Finance Info
                    </a>
                  </li>
                  {/* <li id='additional'>
                    <a data-toggle='pill' href='#additional-info'>
                      Additional Info
                    </a>
                  </li> */}
                </ul>
              </div>

              <div className='main-content col-md-12 col-xs-12'>
                <div className='content-sec col-md-12 col-xs-12 pad-no mar-t-no'>
                  <div className='tab-content'>
                    <div id='company-info' className='tab-pane fade in active'>
                      <form className='custom-form invoice-form col-md-12 col-xs-12 legend-form pad-no'>
                        <div className='row'>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>
                              Vendor Name<span className='astrick'>*</span>
                            </label>
                            <input
                              type='text'
                              name='cus-name'
                              id='customer_name'
                              autoComplete='off'
                              className='form-control'
                              onChange={e => {
                                if (e.target.event != '') {
                                  this.setState({ iscustomer_name: false })
                                } else {
                                  this.setState({ iscustomer_name: true })
                                }
                              }}
                            />
                            {this.state.iscustomer_name ? (
                              <div style={{ float: 'left' }}>
                                <small style={{ color: 'red' }}>
                                  *Please fill out customer name.
                                </small>
                              </div>
                            ) : (
                                ''
                              )}
                          </div>

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Vendor Type</label>
                            <div id='currency_selected'>
                              <select
                                className='selectpicker form-control'
                                id='customer_type'
                                data-live-search='true'
                              // onChange={e => {
                              //   this.setState({
                              //     preferred_deliveryMethod: e.target.value
                              //   })
                              // }}
                              >
                                <option selected={true}>Choose</option>
                                {this.state.customerTypeLists &&
                                  this.state.customerTypeLists.map(item => {
                                    if (
                                      this.props.location.state != undefined &&
                                      this.props.location.state.vendor
                                        .vendor_type === item.id
                                    ) {
                                      var selected = 'selected'
                                    }
                                    return (
                                      <React.Fragment>
                                        <option
                                          selected={selected}
                                          data-status={item.id}
                                        >
                                          {item.name}
                                        </option>
                                      </React.Fragment>
                                    )
                                  })}
                              </select>
                            </div>
                          </div>
                          {/* <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 input-group-cus'>
                            <div>
                              <label>Open Balance</label>
                              <input
                                type='text'
                                name='cus-name'
                                id='open_balance'
                                autoComplete='off'
                                className='form-control'
                                onChange={e => {
                                  if (isNaN(e.target.value)) {
                                    jQuery('#open_balance').val('')
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <label>As of</label>
                              <div
                                className='input-group date mar-t-no'
                                data-date-format='dd/mm/yyyy'
                              >
                                <input
                                  type='text'
                                  className='form-control'
                                  id='date_asofnow'
                                  autoComplete='off'
                                />
                                <div className='input-group-addon'>
                                  <img
                                    src='../images/calendar-icon.svg'
                                    alt='icon'
                                  />
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                        <div className='row'>
                          <div className='col-md-12 col-xs-12'>
                            <span className='form-legend'>
                              Company Information
                            </span>
                          </div>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>
                              Company Name<span className='astrick'>*</span>
                            </label>
                            <input
                              type='text'
                              name='cus-name'
                              id='company_name'
                              autoComplete='off'
                              className='form-control'
                            />
                            {this.state.iscompany_name ? (
                              <div style={{ float: 'left' }}>
                                <small style={{ color: 'red' }}>
                                  *Please fill out company name.
                                </small>
                              </div>
                            ) : (
                                ''
                              )}
                          </div>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>
                              Business Reg No.<span className='astrick'>*</span>
                            </label>
                            <input
                              type='text'
                              name='cus-name'
                              id='bussiness_reg_no'
                              autoComplete='off'
                              className='form-control'
                            />
                            {this.state.isbussinesno ? (
                              <div style={{ float: 'left' }}>
                                <small style={{ color: 'red' }}>
                                  *Please fill out bussiness reg no.
                                </small>
                              </div>
                            ) : (
                                ''
                              )}
                          </div>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>
                              Currency<span className='astrick'>*</span>
                            </label>
                            <div id='currency_selected'>
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
                                  if (
                                    this.props.location.state != undefined &&
                                    this.props.location.state.company
                                      .currency_id === data[item].id
                                  ) {
                                    var selected = 'selected'
                                  }
                                  return (
                                    <React.Fragment>
                                      <option
                                        value={data[item].id}
                                        selected={selected}
                                        data-status={data[item].id}
                                        data-currency={data[item].code}
                                      >
                                        {data[item].code}
                                      </option>
                                    </React.Fragment>
                                  )
                                })}
                              </select>
                            </div>
                            {this.state.iscurrency_id ? (
                              <div style={{ float: 'left' }}>
                                <small style={{ color: 'red' }}>
                                  *Please choose currency.
                                </small>
                              </div>
                            ) : (
                                ''
                              )}
                          </div>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Website</label>
                            <input
                              type='text'
                              name='website'
                              id='website_name'
                              autoComplete='off'
                              className='form-control'
                            />
                          </div>
                        </div>

                        {this.state.rowContacts.map((item, index) => {
                          return (
                            <div id={`todelete${index}`}>
                              {index == 0 && (
                                <div className='col-md-12 col-xs-12'>
                                  <span className='form-legend'>
                                    Primary Contact
                                  </span>
                                </div>
                              )}
                              <div
                                className='row bg-add-sec'
                                key={item}
                                style={{
                                  background: index === 0 ? 'transparent' : ''
                                }}
                              >
                                {index !== 0 && (
                                  <div className='form-group col-md-12'>
                                    <div className='pull-left'>
                                      <label className='custom-checkbox'>
                                        <input
                                          type='checkbox'
                                          name='all'
                                          id={`contact_chkbox${index}`}
                                          defaultChecked={item.is_primary===1?true:false}
                                          onChange={event => {
                                            this.handleChangeContacts()
                                          }}
                                        />
                                        Use as Primary Contact
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                    {index !== 0 && (
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
                                    )}
                                  </div>
                                )}

                                <div className='form-group col-md-4'>
                                  <label>Contact Person</label>
                                  <input
                                    type='text'
                                    name='cus-name'
                                    autoComplete='off'
                                    id={`name${index}`}
                                    onChange={event => {
                                      this.handleChangeContacts()
                                    }}
                                    className='form-control'
                                  />
                                </div>
                                <div className='form-group col-md-4'>
                                  <label>Designation</label>
                                  <input
                                    type='text'
                                    name='cus-name'
                                    id={`designation${index}`}
                                    onChange={event => {
                                      this.handleChangeContacts()
                                    }}
                                    className='form-control'
                                    autoComplete='off'
                                  />
                                </div>
                                <div className='form-group col-md-4'>
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
                                <div className='form-group col-md-4 input-group-cus'>
                                  <div>
                                    <label>Phone (Work)</label>
                                    <input
                                      type="number"
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
                                      type="number"
                                      name='cus-name'
                                      id={`phone_personal${index}`}
                                      onChange={event => {
                                        this.handleChangeContacts()
                                      }}
                                      className='form-control'
                                      autoComplete='off'
                                    />

                                    <input
                                      type='hidden'
                                      name='cus-name'
                                      id={`hiddencontactid${index}`}
                                      onChange={event => {
                                        this.handleChangeContacts()
                                      }}
                                      className='form-control'
                                      autoComplete='off'
                                    />
                                  </div>
                                </div>
                                <div className='form-group col-md-4'>
                                  <label>Email</label>
                                  <input
                                    type="email"
                                    name='cus-name'
                                    autoComplete='off'
                                    id={`email${index}`}
                                    onChange={event => {
                                      this.handleChangeContacts()
                                    }}
                                    className='form-control'
                                  />
                                </div>
                                <div className='form-group col-md-4'>
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
                        })}

                        {/* {this.state.rowContacts.map((item, index) => {
                          return (
                            <div>
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
                                  background: index === 0 ? "transparent" : ""
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
                                          onChange={event => {
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
                                    onChange={event => {
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
                                    onChange={event => {
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
                                    onChange={event => {
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
                                      onChange={event => {
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
                                      onChange={event => {
                                        this.handleChangeContacts();
                                      }}
                                      className="form-control"
                                      autoComplete="off"
                                    />

                                    <input
                                      type="hidden"
                                      name="cus-name"
                                      id={`hiddencontactid${index}`}
                                      onChange={event => {
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
                                    onChange={event => {
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
                                    onChange={event => {
                                      this.handleChangeContacts();
                                    }}
                                    id={`skype${index}`}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })} */}

                        <a
                          href='javascript:;'
                          className='add-input'
                          onClick={() => {
                            this.addNewContact()
                          }}
                        >
                          Add Another Person
                        </a>

                        <div className='row'>
                          <div className='col-md-12 col-xs-12'>
                            <span className='form-legend'>
                              Address Information
                            </span>
                          </div>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Billed From</label>
                            <textarea
                              className='form-control'
                              defaultValue={''}
                              autoComplete='off'
                              id='invoice_bill_to'
                              onChange={() => {
                                this.handleChange()
                              }}
                            />
                            <a
                              href='javascript:;'
                              className='add-input'
                              onClick={() => {
                                this.copyFunction()
                              }}
                            >
                              Copy Billing Address to Shipping
                            </a>
                          </div>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Shipped From</label>
                            <textarea
                              className='form-control'
                              defaultValue={''}
                              autoComplete='off'
                              id='shipping_address'
                            />
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-lg-8 col-md-12'>
                            {this.state.rows.map((item, i) => {
                              let itemid = i

                              return (
                                <div
                                  className='row bg-add-sec'
                                  key={item}
                                  id={`addDelete${i}`}
                                >
                                  <div className='form-group col-md-12 col-xs-12'>
                                    <div className='pull-left'>
                                      <label className='custom-checkbox'>
                                        <input
                                          type='hidden'
                                          name='all'
                                          id={`hidden_address_id${i}`}
                                          onChange={event => {
                                            this.handleChange(
                                              event.target.checked
                                            )
                                          }}
                                        />
                                        <input
                                          type='checkbox'
                                          name='all'
                                          id={`itemC${i}`}
                                          defaultChecked={item.is_default===1?true:false}
                                          onChange={event => {
                                            this.handleChange(
                                              event.target.checked
                                            )
                                          }}
                                        />
                                        Use as Primary Contact
                                        <span className='checkmark' />
                                      </label>
                                    </div>
                                    {/* <a
                                      href='javascript:;'
                                      className='pull-right'
                                      onClick={() => {
                                        this.delete(itemid)
                                      }}
                                    >
                                      <img
                                        src='../images/delete-icon.svg'
                                        alt='icon'
                                      />
                                    </a> */}
                                  </div>
                                  <div className='form-group col-md-6 col-sm-6 col-xs-12'>
                                    <label>Shipping Address Name</label>
                                    <input
                                      type='text'
                                      name='cus-name'
                                      className='form-control'
                                      autoComplete='off'
                                      id={`itemA${i}`}
                                      onChange={() => {
                                        this.handleChange()
                                      }}
                                    />
                                  </div>
                                  <div className='form-group col-md-6 col-sm-6 col-xs-12'>
                                    <label>Shipping Address</label>
                                    <textarea
                                      className='form-control'
                                      defaultValue={''}
                                      autoComplete='off'
                                      id={`itemB${i}`}
                                      onChange={() => {
                                        this.handleChange()
                                      }}
                                    />
                                  </div>
                                </div>
                              )
                            })}
                            <a
                              href='javascript:;'
                              className='add-input'
                              onClick={this.addNew}
                            >
                              Add New Address
                            </a>
                          </div>
                        </div>
                        <div className='col-md-12 col-xs-12 btn-bdr'>
                          <a
                            data-toggle='pill'
                            className='btn btn-blue'
                            href='#finance-info'
                            onClick={() => {
                              jQuery('#finance').addClass('active')
                              jQuery('#company').removeClass('active')
                            }}
                          >
                            Next
                          </a>
                        </div>
                      </form>
                    </div>
                    <div id='finance-info' className='tab-pane fade in'>
                      <form className='custom-form invoice-form col-md-12 col-xs-12 legend-form pad-no'>
                        <div className='row'>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Name on cheque as</label>
                            <input
                              type='text'
                              name='cus-name'
                              id='bank_ac_no'
                              autoComplete='off'
                              className='form-control'
                            />
                          </div>
                          <div className='form-group exchange-col col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Credit Limit</label>
                            <div>
                              <input
                                type='text'
                                name='exchangeRate'
                                id='credit_limit'
                                className='form-control'
                                autoComplete='off'
                              />
                              <span className='label'>SGD</span>
                            </div>
                          </div>
                          {/* <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Billing Rate Level</label>
                            <i
                              data-toggle='tooltip'
                              data-placement='right'
                              tabIndex={0}
                              title='Lipsum - Need short content from GBSC'
                            >
                              <img
                                src='../images/round-info-btn-blue.svg'
                                alt='icon'
                              />
                            </i>
                            <input
                              type='text'
                              name='cus-name'
                              id='price_level'
                              autoComplete='off'
                              className='form-control'
                            />
                          </div> */}
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Payment Terms</label>
                            <br />
                            <select
                              className='selectpicker form-control'
                              id='payment_terms'
                              data-live-search='true'
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
                                      paymentTermsSelected: opt.value
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

                              {this.state.paymentTerms.length > 0 &&
                                this.state.paymentTerms.map((item, i) => {
                                  if (
                                    this.props.location.state != undefined &&
                                    this.props.location.state.finance
                                      .payment_terms === item.id
                                  ) {
                                    var selected = 'selected'
                                  }
                                  return (
                                    <option
                                      value={item.id}
                                      selected={selected}
                                      data-status={item.id}
                                    >
                                      {item.terms}
                                    </option>
                                  )
                                })}
                            </select>
                          </div>
                        </div>
                        {this.state.BankDetails.map((item, index) => {
                          return (
                            <div className='row'>
                              <div className='col-md-12 col-xs-12'>
                                <span className='form-legend'>
                                  Bank Information
                                </span>
                              </div>

                              <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                                <label>Bank Account No.</label>
                                <input
                                  type='text'
                                  name='cus-name'
                                  id='Bank_Account_No'
                                  Bank_Account_No
                                  autoComplete='off'
                                  className='form-control'
                                />
                              </div>
                              <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                                <label>IFSC Code</label>
                                <input
                                  type='text'
                                  name='cus-name'
                                  id='IFSC_Code'
                                  autoComplete='off'
                                  className='form-control'
                                />
                                {/* <a
                              href="javascript:;"
                              className="add-input"
                              onClick={this.addNewBank}
                            >
                              ADD NEW
                            </a> */}
                              </div>
                            </div>
                          )
                        })}

                        <div className='row'>
                          <div className='col-md-12 col-xs-12'>
                            <span className='form-legend'>Tax Information</span>
                          </div>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Tax ID</label>
                            <input
                              type='text'
                              name='cus-name'
                              id='tax_id'
                              autoComplete='off'
                              className='form-control'
                            />
                          </div>
                          {/* <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Business Reg No.</label>
                            <input
                              type='text'
                              name='cus-name'
                              id='bussiness_reg_no_finance'
                              autoComplete='off'
                              className='form-control'
                            />
                          </div> */}
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Default Category</label>
                            <div>
                              <select
                                className='selectpicker form-control'
                                id='default_sales_tax'
                                title ="Choose.."
                                data-live-search='true'
                                onChange={e => {
                                  if(e.target.value == "Add"){
                                    window.jQuery("#pop-modal").modal("show");
                                  }else{
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
                                        default_sales_tax_selected: opt.value
                                      })
                                    } else {
                                    }
                                  }
                                }}}
                              >
                                <option value ="Add">Add New</option>
                                {this.state.salesDefaultAccountsList.length > 0 &&
                                  this.state.salesDefaultAccountsList.map(
                                    (item, i) => {
                                      if (
                                        this.props.location.state !=
                                        undefined &&
                                        this.props.location.state.finance
                                          .default_sales_tax === item.id
                                      ) {
                                        var selected = 'selected'
                                      }

                                      return (
                                        <option
                                          value={item.id}
                                          selected={selected}
                                          data-status={item.id}
                                        >
                                          {item.name}
                                        </option>
                                      )
                                    }
                                  )}
                              </select>
                            </div>
                          </div>
                        

                        
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Default Purchase Tax</label>
                            <div>
                              <select
                                className='selectpicker form-control'
                                id='default_purchase_tax'
                                data-live-search='true'
                                title ='Choose..'
                                onChange={e => {
                                  if (e.target.value == '1qw') {
                                    jQuery('#sales_tax_selected option').prop("selected", false).trigger('change');

                                    window
                                      .jQuery('#pop-modal-Tax')
                                      .modal('show')

                                  }
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
                                        defaultPurchaseTax_selected: opt.value
                                      })
                                    } else {
                                    }
                                  }
                                }}
                              >
                                <option value='1qw'>Add New</option>
                                {this.state.gst_list.length >
                                  0 &&
                                  this.state.gst_list.map(
                                    (item, i) => {
                                      if (
                                        this.props.location.state !=
                                        undefined &&
                                        this.props.location.state.finance
                                          .default_purchase_tax === item.id
                                      ) {
                                        var selected = 'selected'
                                      }
                                      return (
                                        <option
                                          value={item.id}
                                          selected={selected}
                                          data-status={item.id}
                                        >
                                          {item.sales_tax_name}
                                        </option>
                                      )
                                    }
                                  )}
                              </select>
                            </div>
                            </div>
                        </div>
                        {this.state.isSuccessful ? (
                          <div
                            className='alert alert-card success alert-dismissible fade in'
                            id='closeme1'
                          >
                            <a
                              href='#'
                              className='close'
                              data-dismiss='alert'
                              aria-label='close'
                            >
                              &times;
                            </a>
                            <div className='img-wrap'>
                              <img
                                className='img-responsive'
                                src='../../images/alert-success.svg'
                                alt='icon'
                              />
                            </div>
                            <div className='alert-cont'>
                              <strong className='title'>Success!</strong>
                              {this.props.location.state != '' &&
                                this.props.location.state != undefined
                                ? 'Vendor Updated Successfully'
                                : ' New Vendor added successfully.'}
                            </div>
                          </div>
                        ) : (
                            ''
                          )}
                        <div className='col-md-12 col-xs-12 btn-bdr'>
                          <button
                            type='button'
                            className='btn btn-green'
                            onClick={() => {
                              this.addNewCustomer()
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
              <div className='alert alert-card danger alert-dismissible fade in'>
                <a
                  href='#'
                  className='close'
                  onClick={() => {
                    this.setState({ isFailed: false })
                  }}
                  data-dismiss='alert'
                  aria-label='close'
                >
                  ×
                </a>
                <div className='img-wrap'>
                  <img
                    className='img-responsive'
                    src='images/alert-cross.svg'
                    alt='icon'
                  />
                </div>
                <div className='alert-cont'>
                  <strong className='title'>Failed!</strong>Try again later
                </div>
              </div>
            )}
          </div>
          {this.state.isAllmandatoryFilled && (
            <div className='alert alert-card warning alert-dismissible fade in '>
              <a
                href='#'
                className='close'
                data-dismiss='alert'
                aria-label='close'
                onClick={() => {
                  this.setState({ isAllmandatoryFilled: false })
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
                  Please Fill Atleast Mandatory Fields!
                </strong>
                Please go back to the Company info and fill required fields to
                proceed.
              </div>
            </div>
          )}
          <div
            className="modal fade pop-modal"
            id="pop-modal-Tax"
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
                          name="taxCode"
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
                          name="taxName"
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
                              this.state.selectedOption ===
                              "option1"
                            }
                            onChange={this.handleOptionChange}
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
                              this.state.selectedOption ===
                              "option2"
                            }
                            onChange={this.handleOptionChange}
                          />{" "}
                                      Non-Taxable/Exempt
                                      <span className="checkmark"></span>
                        </label>
                        {this.state.selectedOption === "option1" ? (
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
                                      name="taxRate"
                                      id="tax"
                                      autoComplete="off"
                                      required
                                      onInput={(event) =>
                                        this.handleChange_gst_type(
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
                        className="btn btn-lightgray"
                        data-dismiss="modal"
                        onClick={this.modal_cancel}
                      >
                        Cancel
                                  </button>
                      <span>{"   "}</span>
                      <button
                        className="btn btn-green"
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


          <Footer logoutSubmit={e => this.logoutLink()} defaultcategorylist_onchange={this.defaultcategorylist_onchange} />
        </div>
      </div>
    )
  }
}
export default AddNewVendor
