import React from 'react'
import LeftSidebar from './left_sidebar'
import Footer from './footer'
import moment from 'moment'

import Topbar from './topbar'

import FetchAllApi from '../api_links/fetch_all_api'

import jQuery from 'jquery'
// import 'bootstrap';
import config from '../api_links/api_links'
// import 'bootstrap-select';

var authorization_key = 'O5mGIP3VNia0JvPH2IBiwA=='

class EditEmployee extends React.Component {
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
      rowContacts1: ['row1'],
      initialArray: [],
      initialArrayAddress: [],
      departmentList: [],
      employeeTypeList: [],
      emp_PaymentMethodLists: [],
      payrollFrequencyList: [],
      officeLocationList: [],
      shiftLists: [],
      wrkcontactArray: [],
      rowContactsPersonal: ['row1'],
      salaryTypeLists: [],
      variable_freq_type: [],
      personnalcontactArray: [],
      response: this.props.location.state,
      variablepayrollFrequencyList:[],
    }
  }

  UNSAFE_componentWillMount() {
    console.log('hkhjkdsjhksdhsdhtropk', this.props.location.state)
    //append all data

    jQuery(document.body).removeClass('minimize_leftbar')

    if (
      this.state.logged_user_id === '' ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
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

      console.log('jshdjkshkldjhks', array)
      var date_formated = array[2] + '/' + array[1] + '/' + array[0]
    }
    return date_formated
  }

  addNew = () => {
    var newrows = this.state.rows

    this.setState({ initial_value: this.state.initial_value + 1 })
    newrows.push('row' + (this.state.initial_value + 1))

    this.setState({ rows: newrows })
  }

  addNewContact = () => {
    var newrows = this.state.rowContacts

    this.setState({ initial_valueContact: this.state.initial_valueContact + 1 })
    newrows.push('row' + (this.state.initial_valueContact + 1))

    this.setState({ rowContacts: newrows })
  }
  deleteContact = id => {
    var item_to_remove = Number(jQuery('#hiddencontactid' + id).val())
    var specific_item = id
    var newrows = this.state.rowContacts

    if (this.state.rowContacts.length >= 1) {
      if (specific_item > -1) {
        newrows.splice(specific_item, 1)
      }
    } else {
      jQuery('#name0').val('')
      jQuery('#designation0').val('')
      jQuery('#department0').val('')
      jQuery('#phone_work0').val('')
      jQuery('#phone_personal0').val('')
      jQuery('#email0').val('')
      jQuery('#skype0').val('')
      jQuery('#hiddencontactid0').val('')
    }

    this.setState(
      {
        rowContacts: newrows,
        initialArray: [...this.state.initialArray, item_to_remove]
      },
      () => {
        this.handleChangeContacts()
      }
    )
    //console.log("oii",this.state.resultArray)
  }
  delete = id => {
    var item_to_remove = Number(jQuery('#hidden_address_id' + id).val())

    var specific_item = id
    var newrows = this.state.rows

    if (this.state.rows.length > 1) {
      if (specific_item > -1) {
        newrows.splice(specific_item, 1)
      }
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
    //console.log("oii",this.state.resultArray)
  }
  handleChangeContacts = () => {
    var resultArray = []
    this.setState({ wrkcontactArray: resultArray })
    var rowlength = this.state.rowContacts.length
    console.log('roe', rowlength)
    for (var i = 0; i < rowlength; i++) {
      var email = jQuery('#wrkemail' + i).val()
      var phone = jQuery('#wrkphone' + i).val()

      var current_item = {
        email: email,
        phone: phone
      }
      console.log('shippingobj', current_item)

      resultArray.push(current_item)
    }
  }

  handleChangeContactspersonl1 = () => {
    var resultArray = []
    this.setState({ personnalcontactArray: resultArray })
    var rowlength = this.state.rows.length
    console.log('roe', rowlength)
    for (var i = 0; i < rowlength; i++) {
      var email = jQuery('#personalemail1' + i).val()
      var phone = jQuery('#personalemail2' + i).val()

      var current_item = {
        email: email,
        phone: phone
      }
      console.log('shippingobj', current_item)

      resultArray.push(current_item)
    }
  }
  handleChange = e => {
    // var length= this.state.rows.length
    var resultArray = []
    this.setState({ addressArray: resultArray })
    var rowlength = this.state.rows.length
    console.log('roe', rowlength)
    for (var i = 0; i < rowlength; i++) {
      var shippingName = jQuery('#itemA' + i).val()
      var shippingAddress = jQuery('#itemB' + i).val()
      var checkbox = jQuery('#itemC' + i).is(':checked')
      var address_id =
        jQuery('#hidden_address_id' + i).val() != ''
          ? jQuery('#hidden_address_id' + i).val()
          : '0'
      if (checkbox === true) {
        var is_default = '1'
      } else {
        var is_default = '0'
      }

      // var is_default = console.log('ivalue', i)

      if (shippingName != undefined && shippingAddress != undefined) {
        var current_item = {
          shipping_address_name: shippingName,
          shipping_address: shippingAddress,
          is_default: is_default,
          billing_address: jQuery('#invoice_bill_to').val(),
          address_id: address_id
        }
      }
      console.log('shippingobj', current_item)

      resultArray.push(current_item)
    }
  }

  addNewCustomer = () => {
    // alert()
    let user_id = this.state.logged_user_id
    let bussiness_reg_no = jQuery('#bussiness_reg_no').val()
    let company_name = jQuery('#company_name').val()
    let customer_name = jQuery('#customer_name').val()
    let seletedCurrency = this.state.selected_currency
    //let customer_type = jQuery('.customer_type').html()
    let open_balance = jQuery('#open_balance').val()
    let date_asofnow = this.convert_date(jQuery('#date_asofnow').val())
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
    //let contact_person = jQuery('#contact_person').val()
    let credit_limit = jQuery('#credit_limit').val()
    let price_level = jQuery('#price_level').val()
    let tax_id = jQuery('#tax_id').val()
    let decription_job = jQuery('#decription_job').val()
    let start_date = this.convert_date(jQuery('#start_date').val())
    let end_date = this.convert_date(jQuery('#end_date').val())
    let project_end_date = this.convert_date(jQuery('#project_end_date').val())
    let sales_default_account = jQuery(
      '#sales_default_account option:selected'
    ).data('status')

    let currency_id = jQuery('#currency_id option:selected').data('status')

    let currency_type = jQuery('#currency_id option:selected').data('currency')
    // To be considered
    let sales_tax_settings = jQuery('#sales_tax_selected option:selected').data(
      'status'
    )
    let purchase_tax_settings = jQuery(
      '#purchase_default_tax option:selected'
    ).data('status')
    let purchase_default_account = jQuery(
      '#default_account_purchase option:selected'
    ).data('status')
    let default_sales_tax_selected = jQuery(
      '#default_sales_tax option:selected'
    ).data('status')
    let defaultPurchaseTax_selected = jQuery(
      '#default_purchase_tax option:selected'
    ).data('status')
    let referel_fromList_selected = jQuery(
      '#refereal_frm option:selected'
    ).data('status')
    let rep_infoList_selected = jQuery('#repselected option:selected').data(
      'status'
    )
    let type_infoList_slected = jQuery(
      '#type_id_selected option:selected'
    ).data('status')
    let status_infoList_selected = jQuery(
      '#status_slected option:selected'
    ).data('status')

    let preferred_delivery_method = jQuery(
      '#preferred_delivery_method option:selected'
    ).data('status')

    let prefererd_payment_method = jQuery(
      '#prefererd_payment_method option:selected'
    ).data('status')

    let customer_type_selected = jQuery('#customer_type option:selected').data(
      'status'
    )

    let payment_terms = jQuery('#payment_terms option:selected').data('status')

    if (
      this.props.location.state != '' &&
      this.props.location.state != undefined
    ) {
      //Route for update

      if (bussiness_reg_no && company_name && customer_name && currency_id) {
        FetchAllApi.updateCustomer(
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
          this.props.location.state.customer_id,

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
          this.props.location.state.customer_id,
          this.state.initialArray,
          this.state.initialArrayAddress,
          user_id,

          (err, response) => {
            if (response.status === 1) {
              this.setState({ isSuccessful: true })
              setTimeout(() => {
                this.props.history.push('/customers-list')
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
        FetchAllApi.addNew_Customer(
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
          user_id,

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

          (err, response) => {
            if (response.status === 1) {
              this.setState({ isSuccessful: true })
              setTimeout(() => {
                this.props.history.push('/customers-list')
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
    }
  }

  convert_date = date => {
    if (date != undefined) {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
    }
    return date_formated
  }

  addEmployee = () => {
    let first_name = jQuery('#first_name').val()
    let last_name = jQuery('#last_name').val()
    let identification_no = jQuery('#identification_no').val()
    let gender = jQuery('#gender option:selected').data('status')
    let date_of_birth = this.convert_date(jQuery('#date_of_birth').val())
    let client_id = this.state.logged_client_id
    //  alert(this.convert_date(jQuery('#date_of_birth').val()))

    let employee_code = jQuery('#employee_code').val()
    let date_of_joining = this.convert_date(jQuery('#date_of_joining').val())
    let date_of_releave = this.convert_date(jQuery('#date_of_releave').val())
    let department = jQuery('#department option:selected').data('status')
    let designation = jQuery('#designation').val()
    let employee_type = jQuery('#employee_type option:selected').data('status')
    let shift = jQuery('#shift option:selected').data('status')
    let office_location = jQuery('#office_location option:selected').data(
      'status'
    )
    let account_no = jQuery('#account_no').val()
    let ifsc_code = jQuery('#ifsc_code').val()

    let permanent_address = jQuery('#permanent_address').val()
    let residential_address = jQuery('#residential_address').val()

    let salary = jQuery('#salary').val()
    let effective_date = this.convert_date(jQuery('#effective_date').val())
    let salary_type = jQuery('#salary_type option:selected').data('status')
    let variable_pay = jQuery('#variable_pay').val()
    let variable_pay_type = jQuery('#variable_pay_type option:selected').data(
      'status'
    )
    let varibale_pay_frequency = jQuery(
      '#varibale_pay_frequency option:selected'
    ).data('status')
    let variable_pay_notes = jQuery('#variable_pay_notes').val()
    let payroll_frequency = jQuery('#payroll_frequency option:selected').data(
      'status'
    )
    let payment_method = jQuery('#payment_method option:selected').data(
      'status'
    )

    if (first_name && last_name) {
      FetchAllApi.employee_update(
        first_name,
        last_name,
        identification_no,
        gender,
        date_of_birth,
        client_id,
        employee_code,
        date_of_joining,
        date_of_releave,
        department,
        designation,
        employee_type,
        shift,
        office_location,
        account_no,
        ifsc_code,
        permanent_address,
        residential_address,
        salary,
        salary_type,
        variable_pay,
        variable_pay_type,
        varibale_pay_frequency,
        variable_pay_notes,
        payroll_frequency,
        payment_method,
        this.state.wrkcontactArray,
        effective_date,
        this.state.personnalcontactArray,

        (err, response) => {
          if (response.status === 1) {
            this.setState({ isSuccessful: true })
            setTimeout(() => {
              this.props.history.push('/employee-list')
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
      //fill mandotory
      this.setState({ isAllmandatoryFilled: true })

      this.setState({ iscurrency_id: true })
      this.setState({ iscompany_name: true })
    }
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
  //       console.log('currency list', first)
  //       this.setState({ currencies: first })
  //     })
  // }

  updatedate = e => {
    // alert(e)
  }
  get_paymentTerms = () => {
    fetch('http://54.251.142.179:9002/customer/paymentterm/list', {
      method: 'GET',

      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: authorization_key
      }
    })
      .then(response => response.json())
      .then(data => {
        let first = data.lists
        console.log('paymentTerms', first)
        this.setState({ paymentTerms: first })
      })
  }

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
    fetch(config.PreferredPaymentMethod, {
      method: 'POST',

      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: authorization_key
      }
    })
      .then(response => response.json())
      .then(data => {
        let first = data.lists
        console.log('PreferredPaymentMethod', first)
        this.setState({ PreferredPaymentMethod: first })
      })
  }

  salesDefaultAccounts = () => {
    FetchAllApi.salesDefaultAccountsList(this.state.logged_client_id,(err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ salesDefaultAccountsList: response.lists })
      } else {
        this.setState({ salesDefaultAccountsList: [] })
      }
    })
  }

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

  purchaseDefaultAccounts = () => {
    FetchAllApi.purchaseDefaultAccountsList(this.state.logged_client_id,(err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ purchaseDefaultAccountsList: response.lists })
      } else {
        this.setState({ purchaseDefaultAccountsList: [] })
      }
    })
  }
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
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ defaultPurchaseTaxLists: response.lists })
      } else {
        this.setState({ defaultPurchaseTaxLists: [] })
      }
    })
  }

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
      console.log('Customer list', response)
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
      console.log('Customer list', response)
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
      console.log('Customer list', response)
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
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ currencies: response.lists })
      } else {
        this.setState({ currencies: [] })
      }
    })
  }

  //7
  get_customer_type = () => {
    FetchAllApi.customerTypes((err, response) => {
      console.log('Customer list', response)

      if (response.status === 1) {
        this.setState({ customerTypeLists: response.lists })
      } else {
        this.setState({ customerTypeLists: [] })
      }
    })
  }

  //7
  getDepartmentList = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.getDepartmentList(client_id,(err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ departmentList: response.lists })
      } else {
        this.setState({ departmentList: [] })
      }
    })
  }

  getEmployeeType = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.getEmployeeType(client_id,(err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ employeeTypeList: response.lists })
      } else {
        this.setState({ employeeTypeList: [] })
      }
    })
  }

  getPaymentMethodEmp = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.getPaymentMethodEmp(client_id,(err, response) => {
      console.log('Customer list', response)

      if (response.status === 1) {
        this.setState({ emp_PaymentMethodLists: response.lists })
      } else {
        this.setState({ emp_PaymentMethodLists: [] })
      }
    })
  }
  //get payroll frequency
  getPayrollFrequency = () => {
    let client_id = this.state.logged_client_id;
    FetchAllApi.getPayrollFrequency(client_id,(err, response) => {
      console.log('Customer list', response)

      if (response.status === 1) {
        this.setState({ payrollFrequencyList: response.lists })
      } else {
        this.setState({ payrollFrequencyList: [] })
      }
    })
  }

  getVariablePayrollFrequency = () => {
    let client_id = this.state.logged_client_id;
    FetchAllApi.getVariabletPayrollFrequency(client_id,(err, response) => {
      console.log('Customer list', response)

      if (response.status === 1) {
        this.setState({ variablepayrollFrequencyList: response.lists })
      } else {
        this.setState({ variablepayrollFrequencyList: [] })
      }
    })
  }

  //officeLocationList
  getOfficeLocationList = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.getOfficeLocationList(client_id,(err, response) => {
      console.log('Customer list', response)

      if (response.status === 1) {
        this.setState({ officeLocationList: response.lists })
      } else {
        this.setState({ officeLocationList: [] })
      }
    })
  }
  getSalaryType = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.getSalaryType(client_id,(err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ salaryTypeLists: response.lists })
      } else {
        this.setState({ salaryTypeLists: [] })
      }
    })
  }
  //variable_freq_type
  variable_freq_type = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.variable_freq_type(client_id,(err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ variable_freq_type: response.lists })
      } else {
        this.setState({ variable_freq_type: [] })
      }
    })
  }
  //shiftLists
  getShiftList = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.getShiftList(client_id,(err, response) => {
      console.log('Customer list', response)

      if (response.status === 1) {
        this.setState({ shiftLists: response.lists })
      } else {
        this.setState({ shiftLists: [] })
      }
    })
  }
  componentDidUpdate() {
    window.jQuery('.selectpicker').selectpicker('refresh')
    // jQuery("#currency_selected").val(4);
  }
  componentDidMount() {
    console.log("location",this.props.location.state)
    this.rep_info()
    this.type_info()
    this.referel_from()
    this.status_info()
    this.get_currencies()
    this.get_paymentTerms()
    this.delivery_method()
    this.PreferredPaymentMethod()
    this.salesTaxSettings()
    this.salesDefaultAccounts()
    this.purchaseTaxSettings()
    this.purchaseDefaultAccounts()
    this.customer_SalesTaxLists()
    this.defaultPurchaseTaxLists()
    this.get_customer_type()
    this.getDepartmentList()
    this.getEmployeeType()
    this.getPaymentMethodEmp()
    this.getPayrollFrequency()
    this.getOfficeLocationList()
    this.getShiftList()
    this.getSalaryType()
    this.variable_freq_type()
    this.getVariablePayrollFrequency();
    //Append data
    // let first_name = jQuery('#first_name').val()
    // let last_name = jQuery('#last_name').val()
    // let identification_no = jQuery('#identification_no').val()
    // let gender = jQuery('#gender option:selected').data('status')---pen
    // let date_of_birth = jQuery('#date_of_birth').val()

    // alert(this.props.location.state.customer.name)

    if (this.state.response.updatelist.basic_info.first_name != undefined) {
      jQuery('#first_name').val(
        this.state.response.updatelist.basic_info.first_name
      )

      jQuery('#gender').val(this.state.response.updatelist.basic_info.gender)
    }

    if (this.state.response.updatelist.basic_info.last_name != undefined) {
      jQuery('#last_name').val(
        this.state.response.updatelist.basic_info.last_name
      )
    }
   
    if (this.state.response.updatelist.contact_info != undefined) {
      jQuery('#permanent_address').val(
        this.state.response.updatelist.contact_info.permanent_address
      );
      jQuery('#residential_address').val(
        this.state.response.updatelist.contact_info.residential_address
      )
    }

    if (
      this.state.response.updatelist.basic_info.identification_no != undefined
    ) {
      jQuery('#identification_no').val(
        this.state.response.updatelist.basic_info.identification_no
      )
    }

    if (this.state.response.updatelist.basic_info.date_of_birth != undefined) {
      jQuery('#date_of_birth').val(
        this.state.response.updatelist.basic_info.date_of_birth
      )
    }

    //work info

    // let employee_code = jQuery('#employee_code').val()
    // let date_of_joining = jQuery('#date_of_joining').val()
    // let date_of_releave = jQuery('#date_of_releave').val()
    // let department = jQuery('#department option:selected').data('status')--pen
    // let designation = jQuery('#designation').val()
    // let employee_type = jQuery('#employee_type option:selected').data('status')--pen
    // let shift = jQuery('#shift option:selected').data('status')---pen
    // let office_location = jQuery('#office_location option:selected').data(
    //   'status'---pen
    if (this.state.response.updatelist.work_info.employee_code != undefined) {
      jQuery('#employee_code').val(
        this.state.response.updatelist.work_info.employee_code
      )
    }

    if (this.state.response.updatelist.work_info.date_of_joining != undefined) {
      jQuery('#date_of_joining').val(
        this.state.response.updatelist.work_info.date_of_joining
      )
    }

    if (this.state.response.updatelist.work_info.date_of_releave != undefined) {
      jQuery('#date_of_releave').val(
        this.state.response.updatelist.work_info.date_of_releave
      )
    }

    if (this.state.response.updatelist.work_info.designation != undefined) {
      jQuery('#designation').val(
        this.state.response.updatelist.work_info.designation
      )
    }

    if (this.state.response.updatelist.bank_infos.account_no != undefined) {
      jQuery('#account_no').val(
        this.state.response.updatelist.bank_infos.account_no
      )
    }
    if (this.state.response.updatelist.bank_infos.ifsc_code != undefined) {
      jQuery('#ifsc_code').val(
        this.state.response.updatelist.bank_infos.ifsc_code
      )
    }

    if (this.state.response.updatelist.personal_contact) {
      // alert(this.state.response.updatelist.personal_contact[0].email)

      this.setState(
        {
          rows: this.state.response.updatelist.personal_contact
        },
        () => {
          for (let i = 0; i < this.state.rows.length; i++) {
            jQuery('#personalemail1' + i).val(
              this.state.response.updatelist.personal_contact[i].email
            )
            jQuery('#personalemail2' + i).val(
              this.state.response.updatelist.personal_contact[i].phone
            )
          }
          this.handleChangeContactspersonl1()
        }
      )
    }

    //dropdowns

    //work contact

    if (this.state.response.updatelist.work_contact) {
      // alert(this.state.response.updatelist.personal_contact[0].email)

      this.setState(
        {
          rowContacts: this.state.response.updatelist.work_contact
        },
        () => {
          this.state.rowContacts.map((val,idx)=>{
            // alert(this.state.response.updatelist.work_contact[i].email)
            jQuery('#wrkemail' + idx).val(
              val.email
            )
            jQuery('#wrkphone' + idx).val(
              val.phone
            )
          })
          
          this.handleChangeContacts()
        }
      )
    }

    //finance

    if (this.state.response.updatelist.finance_info.salary != undefined) {
      jQuery('#salary').val(this.state.response.updatelist.finance_info.salary)
    }

    if (
      this.state.response.updatelist.finance_info.variable_pay_notes !=
      undefined
    ) {
      jQuery('#variable_pay_notes').val(
        this.state.response.updatelist.finance_info.variable_pay_notes
      )
    }

    if (this.state.response.updatelist.finance_info.variable_pay != undefined) {
      jQuery('#variable_pay').val(
        this.state.response.updatelist.finance_info.variable_pay
      )
    }

    if (
      this.state.response.updatelist.finance_info.effective_date != undefined
    ) {
      jQuery('#effective_date').val(
        this.state.response.updatelist.finance_info.effective_date
      )
    }

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
          jQuery('#phone_personal' + i).val(
            this.props.location.state.contacts[i].phone_personal
          )
          jQuery('#hiddencontactid' + i).val(
            this.props.location.state.contacts[i].contact_id
          )

          // jQuery('#hiddencontactid' + i).val('Key is not there')
          jQuery('#email' + i).val(this.props.location.state.contacts[i].email)
          jQuery('#skype' + i).val(this.props.location.state.contacts[i].skype)
        }
        // To retrieve all the data from existing
        this.handleChangeContacts()
      })

      // this.setState({ rows:})

      // var shippingName = jQuery('#itemA' + i).val()
      // var shippingAddress = jQuery('#itemB' + i).val()
      // var checkbox = jQuery('#itemC' + i).is(':checked')

      this.setState({ rows: this.props.location.state.address }, () => {
        // Loop to append details

        for (let i = 0; i < this.props.location.state.address.length; i++) {
          jQuery('#itemA' + i).val(
            this.props.location.state.address[i].shipping_address_name
          )
          jQuery('#itemB' + i).val(
            this.props.location.state.address[i].shipping_address
          )
          jQuery('#itemC' + i).val(
            this.props.location.state.address[i].is_default
          )
          jQuery('#hidden_address_id' + i).val(
            this.props.location.state.address[i].address_id
          )
        }
        // To retrieve all the data from existing
        this.handleChange()
      })
    }

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


  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }
  routedChange(parameter) {
    this.props.history.push('/' + parameter)
    window.scrollTo(0, 0)
  }

  copyFunction = () => {
    let addrss = jQuery('#permanent_address').val()
    jQuery('#residential_address').val(addrss)
  }

  render() {
    console.log('myatjhj980890e', this.state.personnalcontactArray)
    console.log('res====', this.state.response)

    var data = ''
    data = this.state.currencies
    // console.log('khcjkcklshk', this.state.currencies)
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

    //console.log('item_files', this.state.item_file_path);
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

          //console.log('pdf_file_link',get_file_url);

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
                <ul className='list-unstyled breadcrumb page-title hidden-xs'>
                  <li>
                    <a
                      href='javascript: ;'
                      onClick={this.routedChange.bind(this, 'Customers')}
                    >
                      Employee
                    </a>
                  </li>
                  <li>Update Employee</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className='content-top col-md-12 col-xs-12'>
                <ul className='nav nav-pills transparent nowrap'>
                  <li className='active' id='company'>
                    <a data-toggle='pill' href='#company-info'>
                      Job Info
                    </a>
                  </li>
                  <li id='finance'>
                    <a data-toggle='pill' href='#finance-info'>
                      Address Info
                    </a>
                  </li>
                  <li id='additional'>
                    <a data-toggle='pill' href='#additional-info'>
                      Payroll Info
                    </a>
                  </li>
                </ul>
              </div>

              <div className='main-content col-md-12 col-xs-12'>
                <div className='content-sec col-md-12 col-xs-12 pad-no mar-t-no'>
                  <div className='tab-content'>
                    <div id='company-info' className='tab-pane fade in active'>
                      <form className='custom-form invoice-form col-md-12 col-xs-12 legend-form pad-no'>
                        <div className='row'>
                          <div className='col-md-12 col-xs-12'>
                            <span className='form-legend'>
                              Personal Information
                            </span>
                          </div>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>
                              First Name<span className='astrick'>*</span>
                            </label>
                            <input
                              type='text'
                              name='cus-name'
                              id='first_name'
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
                            {this.state.iscompany_name ? (
                              <div style={{ float: 'left' }}>
                                <small style={{ color: 'red' }}>
                                  *Please fill out first name.
                                </small>
                              </div>
                            ) : (
                                ''
                              )}
                          </div>

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>
                              Last Name<span className='astrick'>*</span>
                            </label>
                            <input
                              type='text'
                              name='cus-name'
                              id='last_name'
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
                            {this.state.iscurrency_id ? (
                              <div style={{ float: 'left' }}>
                                <small style={{ color: 'red' }}>
                                  *Please fill out last name.
                                </small>
                              </div>
                            ) : (
                                ''
                              )}
                          </div>

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Identification No.</label>
                            <input
                              type='text'
                              name='cus-name'
                              id='identification_no'
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
                            <label>Date Of Birth</label>
                            <div
                              className='input-group date mar-t-no'
                              data-date-format='dd/mm/yyyy'
                            >
                              <input
                                type='text'
                                className='form-control'
                                id='date_of_birth'
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

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Gender</label>
                            <div>
                              <select
                                className='selectpicker form-control'
                                id='gender'
                                data-live-search='true'
                              >
                                <option selected={true}>Choose</option>
                                <option data-status='0' value='0'>
                                  Male
                                </option>
                                <option data-status='1' value='1'>
                                  Female
                                </option>

                                {/* {this.state.paymentTerms.length > 0 &&
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
                                  })} */}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-md-12 col-xs-12'>
                            <span className='form-legend'>
                              Work Information
                            </span>
                          </div>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Employee Code</label>
                            <input
                              type='text'
                              name='cus-name'
                              id='employee_code'
                              autoComplete='off'
                              className='form-control'
                            />
                          </div>

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Date Of Joining</label>
                            <div
                              className='input-group date mar-t-no'
                              data-date-format='dd/mm/yyyy'
                            >
                              <input
                                type='text'
                                className='form-control'
                                id='date_of_joining'
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
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Date Of Releave</label>
                            <div
                              className='input-group date mar-t-no'
                              data-date-format='dd/mm/yyyy'
                            >
                              <input
                                type='text'
                                className='form-control'
                                id='date_of_releave'
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

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Department</label>
                            <div>
                              <select
                                className='selectpicker form-control'
                                id='department'
                                data-live-search='true'
                                onChange={e => {

                                  if (e.target.value == '1qw') {
                                    
  
                                    window
                                      .jQuery('#employeedepartmentModal')
                                      .modal('show')
  
                                  }}}
                              >
                                <option selected={true}>Choose</option>
                                <option value="1qw">Add New</option>

                                {this.state.departmentList.length > 0 &&
                                  this.state.departmentList.map((item, i) => {
                                    if (
                                      this.state.response.updatelist
                                        .work_info != undefined &&
                                      this.state.response.updatelist.work_info
                                        .department == item.id
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
                                  })}
                              </select>
                            </div>
                          </div>

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Designation</label>
                            <input
                              type='text'
                              name='website'
                              id='designation'
                              autoComplete='off'
                              className='form-control'
                            />
                          </div>

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Employee Type</label>
                            <div>
                              <select
                                className='selectpicker form-control'
                                id='employee_type'
                                data-live-search='true'
                                onChange={e => {

                                  if (e.target.value == '1qw') {
                                    
  
                                    window
                                      .jQuery('#employeetypeModal')
                                      .modal('show')
  
                                  }}}
                              >
                                <option selected={true}>Choose</option>
                                <option value="1qw">Add New</option>

                                {this.state.employeeTypeList.length > 0 &&
                                  this.state.employeeTypeList.map((item, i) => {
                                    if (
                                      this.state.response.updatelist.work_info
                                        .employee_type != undefined &&
                                      this.state.response.updatelist.work_info
                                        .employee_type == item.id
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
                                  })}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          
                            <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                              <label>Shift</label>
                              <div>
                                <select
                                  className='selectpicker form-control'
                                  id='shift'
                                  data-live-search='true'
                                  onChange={e => {

                                    if (e.target.value == '1qw') {
                                      
    
                                      window
                                        .jQuery('#employeeshiftModal')
                                        .modal('show')
    
                                    }}}
                                >
                                  <option selected={true}>Choose</option>
                                  <option value="1qw">Add New</option>
                                  {this.state.shiftLists.length > 0 &&
                                    this.state.shiftLists.map((item, i) => {
                                      if (
                                        this.state.response.updatelist.work_info
                                          .shift != undefined &&
                                        this.state.response.updatelist.work_info
                                          .shift == item.id
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
                                    })}
                                </select>
                              </div>
                            </div>

                            <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                              <label>Office Location</label>
                              <div>
                                <select
                                  className='selectpicker form-control'
                                  id='office_location'
                                  data-live-search='true'
                                  onChange={e => {

                                    if (e.target.value == '1qw') {
                                      
    
                                      window
                                        .jQuery('#employeelocationModal')
                                        .modal('show')
    
                                    }}}
                                >
                                  <option selected={true}>Choose</option>
                                  <option value="1qw">Add New</option>

                                  {this.state.officeLocationList.length > 0 &&
                                    this.state.officeLocationList.map(
                                      (item, i) => {
                                        if (
                                          this.state.response.updatelist
                                            .work_info.office_location !=
                                          undefined &&
                                          this.state.response.updatelist
                                            .work_info.office_location ==
                                          item.id
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
                         
                        </div>

                        {this.state.rowContacts.map((item, index) => {
                          return (
                            <div className='row'>
                              {index == 0 && (
                                <div className='col-md-12 col-xs-12'>
                                  <span className='form-legend'>
                                    Work Contact
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
                                    <div className='pull-left'></div>
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
                                  <label>Email</label>
                                  <input
                                    type='text'
                                    name='cus-name'
                                    autoComplete='off'
                                    id={`wrkemail${index}`}
                                    onChange={event => {
                                      this.handleChangeContacts()
                                    }}
                                    className='form-control'
                                  />
                                </div>
                                <div className='form-group col-md-4'>
                                  <label>Contact No</label>
                                  <input
                                    type='text'
                                    name='cus-name'
                                    autoComplete='off'
                                    onChange={event => {
                                      this.handleChangeContacts()
                                    }}
                                    id={`wrkphone${index}`}
                                    className='form-control'
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        })}

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
                                <div className='form-group col-md-4'>
                                  <label>Account No.</label>
                                  <input
                                    type='text'
                                    name='cus-name'
                                    autoComplete='off'
                                    id='account_no'
                                    onChange={event => {
                                      this.handleChangeContacts()
                                    }}
                                    className='form-control'
                                  />
                                </div>
                                <div className='form-group col-md-4'>
                                  <label>IFSC</label>
                                  <input
                                    type='text'
                                    name='cus-name'
                                    autoComplete='off'
                                    onChange={event => {
                                      this.handleChangeContacts()
                                    }}
                                    id='ifsc_code'
                                    className='form-control'
                                  />
                                </div>
                              </div>
                            
                        

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
                          {this.state.rows.map((item, index) => {
                            return (
                              <div>
                                {index == 0 && (
                                  <div className='col-md-12 col-xs-12'>
                                    <span className='form-legend'>
                                      Personal Contact
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
                                      <div className='pull-left'></div>
                                      {index !== 0 && (
                                        <a
                                          href='javascript:;'
                                          className='pull-right'
                                          onClick={() => {
                                            this.delete(index)
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
                                    <label>Email</label>
                                    <input
                                      type='text'
                                      name='cus-name'
                                      autoComplete='off'
                                      id={`personalemail1${index}`}
                                      onChange={event => {
                                        this.handleChangeContactspersonl1()
                                      }}
                                      className='form-control'
                                    />
                                  </div>
                                  <div className='form-group col-md-4'>
                                    <label>Contact No</label>
                                    <input
                                      type='text'
                                      name='cus-name'
                                      autoComplete='off'
                                      onChange={event => {
                                        this.handleChangeContactspersonl1()
                                      }}
                                      id={`personalemail2${index}`}
                                      className='form-control'
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          })}

                          <a
                            href='javascript:;'
                            className='add-input'
                            onClick={() => {
                              this.addNew()
                            }}
                          >
                            Add Another Person
                          </a>
                        </div>

                        <div className='row'>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Permanant Address</label>
                            <textarea
                              className='form-control'
                              defaultValue={''}
                              autoComplete='off'
                              id='permanent_address'
                            />
                            <a
                              href='javascript:;'
                              className='add-input'
                              onClick={() => {
                                this.copyFunction()
                              }}
                            >
                              Copy Permanant Address to Residential
                            </a>
                          </div>
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Residential Address</label>
                            <textarea
                              className='form-control'
                              defaultValue={''}
                              autoComplete='off'
                              id='residential_address'
                            />
                          </div>
                        </div>

                        <div className='col-md-12 col-xs-12 btn-bdr'>
                          <a
                            data-toggle='pill'
                            onClick={() => {
                              jQuery('#additional').addClass('active')
                              jQuery('#finance').removeClass('active')
                            }}
                            className='btn btn-blue'
                            href='#additional-info'
                          >
                            Next
                          </a>
                        </div>
                      </form>
                    </div>
                    <div id='additional-info' className='tab-pane fade in'>
                      <form className='custom-form invoice-form col-md-12 col-xs-12 legend-form pad-no'>
                        <div className='row'>
                          <div className='col-md-12 col-xs-12'>
                            <span className='form-legend'> Salary</span>
                          </div>

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Effective Date</label>
                            <div
                              className='input-group date mar-t-no'
                              data-date-format='dd/mm/yyyy'
                            >
                              <input
                                type='text'
                                className='form-control'
                                id='effective_date'
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

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Salary</label>
                            <input
                              type='text'
                              name='cus-name'
                              id='salary'
                              autoComplete='off'
                              className='form-control'
                            />
                          </div>

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Salary Type</label>
                            <div>
                              <select
                                className='selectpicker form-control'
                                id='salary_type'
                                data-live-search='true'
                                onChange={e => {

                                  if (e.target.value == '1qw') {
                                    
  
                                    window
                                      .jQuery('#employeesalaryModal')
                                      .modal('show')
  
                                  }}}
                              >
                                <option selected={true}>Choose</option>
                                <option value="1qw">Add New</option>
                                {this.state.salaryTypeLists.length > 0 &&
                                  this.state.salaryTypeLists.map((item, i) => {
                                    if (
                                      this.state.response.updatelist
                                        .finance_info != undefined &&
                                      this.state.response.updatelist
                                        .finance_info.salary_type == item.id
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
                                  })}
                              </select>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-md-12 col-xs-12'>
                              <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                                <label>Payment Method</label>
                                <div>
                                  <select
                                    className='selectpicker form-control'
                                    id='payment_method'
                                    data-live-search='true'
                                    onChange={e => {

                                      if (e.target.value == '1qw') {
                                        
      
                                        window
                                          .jQuery('#employeepaymentModal')
                                          .modal('show')
      
                                      }}}
                                  >
                                    <option selected={true}>Choose</option>
                                    <option value="1qw">Add New</option>
                                    {this.state.emp_PaymentMethodLists.length >
                                      0 &&
                                      this.state.emp_PaymentMethodLists.map(
                                        (item, i) => {
                                          if (
                                            this.state.response.updatelist
                                              .finance_info.payment_method !=
                                            undefined &&
                                            this.state.response.updatelist
                                              .finance_info.payment_method ==
                                            item.id
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
                                <label>Payroll Frequency</label>

                                <div>
                                  <select
                                    className='selectpicker form-control'
                                    id='payroll_frequency'
                                    data-live-search='true'
                                    onChange={e => {

                                      if (e.target.value == '1qw') {
                                        
      
                                        window
                                          .jQuery('#employeepayrollModal')
                                          .modal('show')
      
                                      }}}
                                  >
                                    <option selected={true}>Choose</option>
                                    <option value="1qw">Add New</option>
                                    {this.state.payrollFrequencyList.length >
                                      0 &&
                                      this.state.payrollFrequencyList.map(
                                        (item, i) => {
                                          if (
                                            this.state.response.updatelist
                                              .finance_info.payroll_frequency !=
                                            undefined &&
                                            this.state.response.updatelist
                                              .finance_info.payroll_frequency ==
                                            item.id
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
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12 col-xs-12'>
                            <span className='form-legend'>Variable Pay</span>
                          </div>
                          <div className='form-group col-lg-4 col-md-12'>
                            <label>Variable Pay Notes</label>
                            <textarea
                              className='form-control'
                              defaultValue={''}
                              autoComplete='off'
                              id='variable_pay_notes'
                            />
                          </div>

                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Variable Pay Frequency</label>

                            <div>
                              <select
                                className='selectpicker form-control'
                                id='varibale_pay_frequency'
                                data-live-search='true'
                                onChange={e => {

                                  if (e.target.value == '1qw') {
                                    
  
                                    window
                                      .jQuery('#employeevariablepayModal')
                                      .modal('show')
  
                                  }}}
                              >
                                <option selected={true}>Choose</option>
                                <option value="1qw">Add New</option>
                                {this.state.variablepayrollFrequencyList.length > 0 &&
                                  this.state.variablepayrollFrequencyList.map(
                                    (item, i) => {
                                      if (
                                        this.state.response.updatelist
                                          .finance_info
                                          .varibale_pay_frequency !=
                                        undefined &&
                                        this.state.response.updatelist
                                          .finance_info
                                          .varibale_pay_frequency == item.id
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
                                  Mandatory fields must be filled!
                                </strong>
                                Please go back to the Job info and fill required
                                fields to proceed.
                              </div>
                            </div>
                          )}
                          <div className='col-lg-8 col-md-12 col-xs-12'>
                            <div className='row'>
                              <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                                <label>Vaiable Pay</label>
                                <input
                                  type='text'
                                  name='cus-name'
                                  id='variable_pay'
                                  autoComplete='off'
                                  className='form-control'
                                />
                              </div>

                              <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                                <label>Variable Pay Type</label>

                                <div>
                                  <select
                                    className='selectpicker form-control'
                                    id='variable_pay_type'
                                    data-live-search='true'
                                    onChange={e => {
                                      if (e.target.value == '1qw') {
  

                                        window
                                          .jQuery('#employeevariablepaytypeModal')
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
                                            type_infoList_slected: opt.value
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
<option value="1qw">Add New</option>
                                    {this.state.variable_freq_type.length > 0 &&
                                      this.state.variable_freq_type.map(
                                        (item, i) => {
                                          if (
                                            this.state.response.updatelist
                                              .finance_info.variable_pay_type !=
                                            undefined &&
                                            this.state.response.updatelist
                                              .finance_info.variable_pay_type ==
                                            item.id
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
                              Employee has been updated successfully!
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
                              this.addEmployee()
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
          
          <div className='modal fade pop-modal' id='employeedepartmentModal' role='dialog'>
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
                        <label>Enter New Department</label>
                      </div>
                      <div className='col-md-8 col-sm-8 col-xs-12'>
                        <input
                          autoComplete='off'
                          type='text'
                          className='form-control'
                          id='option_type'
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
                            client_id:this.state.logged_client_id,
                            name: jQuery('#option_type').val(),
                          }
                          FetchAllApi.add_new_employee_department(
                            coreData,
                            (err, response) => {
                              console.log('new document', response.message)
                              alert(response.message)
                              if (response.status === 1) {
                                jQuery("#department").val("")
                                this.getDepartmentList();
                                window
                                  .jQuery('#employeedepartmentModal')
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

          <div className='modal fade pop-modal' id='employeetypeModal' role='dialog'>
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
                        <label>Enter New Employee Type</label>
                      </div>
                      <div className='col-md-8 col-sm-8 col-xs-12'>
                        <input
                          autoComplete='off'
                          type='text'
                          className='form-control'
                          id='option_type1'
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
                            client_id:this.state.logged_client_id,
                            name: jQuery('#option_type1').val(),
                          }
                          FetchAllApi.add_new_employee_type(
                            coreData,
                            (err, response) => {
                              console.log('new document', response.message)
                              alert(response.message)
                              if (response.status === 1) {
                                this.getEmployeeType()

                                // this.getColumns()
                                jQuery('#employee_type').val('')
                                window
                                  .jQuery('#employeetypeModal')
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
          <div className='modal fade pop-modal' id='employeeshiftModal' role='dialog'>
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
                        <label>Enter New shift</label>
                      </div>
                      <div className='col-md-8 col-sm-8 col-xs-12'>
                        <input
                          autoComplete='off'
                          type='text'
                          className='form-control'
                          id='option_type2'
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
                            client_id:this.state.logged_client_id,
                            name: jQuery('#option_type2').val(),
                          }
                          FetchAllApi.add_new_employee_shift(
                            coreData,
                            (err, response) => {
                              console.log('new document', response.message)
                              alert(response.message)
                              if (response.status === 1) {
                                this.getShiftList()

                                // this.getColumns()
                                jQuery('#shift').val('')
                                window
                                  .jQuery('#employeeshiftModal')
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
          <div className='modal fade pop-modal' id='employeelocationModal' role='dialog'>
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
                        <label>Enter New location</label>
                      </div>
                      <div className='col-md-8 col-sm-8 col-xs-12'>
                        <input
                          autoComplete='off'
                          type='text'
                          className='form-control'
                          id='option_type3'
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
                            client_id:this.state.logged_client_id,
                            name: jQuery('#option_type3').val(),
                          }
                          FetchAllApi.add_new_employee_location(
                            coreData,
                            (err, response) => {
                              console.log('new document', response.message)
                              alert(response.message)
                              if (response.status === 1) {
                                this.getOfficeLocationList()

                                // this.getColumns()
                                jQuery('#office_location').val('')
                                window
                                  .jQuery('#employeelocationModal')
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
          <div className='modal fade pop-modal' id='employeesalaryModal' role='dialog'>
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
                        <label>Enter New salary Type</label>
                      </div>
                      <div className='col-md-8 col-sm-8 col-xs-12'>
                        <input
                          autoComplete='off'
                          type='text'
                          className='form-control'
                          id='option_type4'
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
                            client_id:this.state.logged_client_id,
                            name: jQuery('#option_type4').val(),
                          }
                          FetchAllApi.add_new_employee_salary(
                            coreData,
                            (err, response) => {
                              console.log('new document', response.message)
                              alert(response.message)
                              if (response.status === 1) {
                                this.getSalaryType()

                                // this.getColumns()
                                jQuery('#salary_type').val('')
                                window
                                  .jQuery('#employeesalaryModal')
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
          <div className='modal fade pop-modal' id='employeepaymentModal' role='dialog'>
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
                        <label>Enter New Payment Method</label>
                      </div>
                      <div className='col-md-8 col-sm-8 col-xs-12'>
                        <input
                          autoComplete='off'
                          type='text'
                          className='form-control'
                          id='option_type5'
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
                            client_id:this.state.logged_client_id,
                            name: jQuery('#option_type5').val(),
                          }
                          FetchAllApi.add_new_employee_payment(
                            coreData,
                            (err, response) => {
                              console.log('new document', response.message)
                              alert(response.message)
                              if (response.status === 1) {
                                this.getPaymentMethodEmp()

                                // this.getColumns()
                                jQuery('#payment_method').val('')
                                window
                                  .jQuery('#employeepaymentModal')
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

          <div className='modal fade pop-modal' id='employeepayrollModal' role='dialog'>
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
                        <label>Enter New payroll Frequency </label>
                      </div>
                      <div className='col-md-8 col-sm-8 col-xs-12'>
                        <input
                          autoComplete='off'
                          type='text'
                          className='form-control'
                          id='option_type6'
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
                            client_id:this.state.logged_client_id,
                            name: jQuery('#option_type6').val(),
                          }
                          FetchAllApi.add_new_employee_payroll_frequency(
                            coreData,
                            (err, response) => {
                              console.log('new document', response.message)
                              alert(response.message)
                              if (response.status === 1) {
                                this.getPayrollFrequency()

                                // this.getColumns()
                                jQuery('#payroll_frequency').val('')
                                window
                                  .jQuery('#employeepayrollModal')
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

          <div className='modal fade pop-modal' id='employeevariablepayModal' role='dialog'>
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
                        <label>Enter New Variable Pay Frequency</label>
                      </div>
                      <div className='col-md-8 col-sm-8 col-xs-12'>
                        <input
                          autoComplete='off'
                          type='text'
                          className='form-control'
                          id='option_type7'
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
                            client_id:this.state.logged_client_id,
                            name: jQuery('#option_type7').val(),
                          }
                          FetchAllApi.add_new_employee_variable_pay_frequency(
                            coreData,
                            (err, response) => {
                              console.log('new document', response.message)
                              alert(response.message)
                              if (response.status === 1) {
                                this.getVariablePayrollFrequency()

                                // this.getColumns()
                                jQuery('#varibale_pay_frequency').val('')
                                window
                                  .jQuery('#employeevariablepayModal')
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

          <div className='modal fade pop-modal' id='employeevariablepaytypeModal' role='dialog'>
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
                        <label>Enter New Variable Pay Type</label>
                      </div>
                      <div className='col-md-8 col-sm-8 col-xs-12'>
                        <input
                          autoComplete='off'
                          type='text'
                          className='form-control'
                          id='option_type8'
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
                            client_id:this.state.logged_client_id,
                            name: jQuery('#option_type8').val(),
                          }
                          FetchAllApi.add_new_employee_variable_pay_type(
                            coreData,
                            (err, response) => {
                              console.log('new document', response.message)
                              alert(response.message)
                              if (response.status === 1) {
                                this.variable_freq_type()

                                // this.getColumns()
                                jQuery('#variable_pay_type').val('')
                                window
                                  .jQuery('#employeevariablepaytypeModal')
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

          <Footer logoutSubmit={e => this.logoutLink()} />
        </div>
      </div>
    )
  }
}
export default EditEmployee
