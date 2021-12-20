import React from 'react'
import jQuery from 'jquery'

// import IdleTimer from 'react-idle-timer';
import FetchAllApi from "../api_links/fetch_all_api";
// import data_tagging from '../data_tagging'

class createpay extends React.Component {
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
      address: '',
      account_category: '',
      exchange_value: '',
      isValidation: false,
      rows: ['row 1'],
      isReset: false,
      currencies: [],
      myarray: [],
      isTax: true,
      default_category_list: [],
      selected: '',
      selectedindex: '',
      balancesheetlist: [],
      balance_list_selected: '',
      changeme: '',
      date: new Date(),
      balance_sheet_category_name: '',
      balance_sheet_category_id: '',
      categorylist: [],
      sub_categorylist: [],
      categoryname: '',
      sub_categoryname: '',
      category_id: '',
      sub_category_id: '',
      Accounttype: [],
      Account_type_name: '',
      Account_type_id: '',
      Currency_name: 'USD',
      paymentname: '',
      sub_account_list: [],
      sub_Account_name: '',
      sub_Account_id: ''
    }

    this.idleTimer = null
    this.onAction = this._onAction.bind(this)
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
  }
  AccounttypeAccounttype
  UNSAFE_componentWillMount() {
    var client_id = this.state.logged_client_id

    this.get_currencies()

    FetchAllApi.get_categories((err, response) => {
      console.log('add comment', response.list)
      if (response.status === 1) {
        // alert('Got list :)');
        this.setState({ categorylist: response.list })
      } else {
      }
    })
    FetchAllApi.defaultcategorylist(client_id, (err, response) => {
      console.log('defaultcategorylist', response)
      if (response.status === 1) {
        this.setState({
          default_category_list: response.list
        })
      } else {
      }
    })

    FetchAllApi.balancesheetlist(client_id, (err, response) => {
      console.log('defaultcategorylist', response)
      if (response.status === 1) {
        this.setState({
          balancesheetlist: response.list
        })
      } else {
      }
    })

    fetch('https://api.exchangerate-api.com/v4/latest/SGD')
      .then(response => response.json())
      .then(data => {
        const currencyAr = []
        let first = data.rates
        for (const key in first) {
          currencyAr.push(key)
        }

        this.setState({ currencies: currencyAr })
      })
  }
  componentDidMount() {
    jQuery(document).ready(function () {
      // jQuery('body').on('click', function() {
      //     if(jQuery('.custom-select-drop.dropdown').hasClass('open')) {
      //       jQuery('.form-table').removeClass("ovrFlwRmve");
      //     } else{
      //       jQuery('.form-table').addClass("ovrFlwRmve");
      //     }
      // });
    })
  }
  create_paymenttype = e => {
    let name = this.state.paymentname


    // alert(account_type_id)

    if (
      name

    ) {
      let items = {
        name: name,

      }
      FetchAllApi.create_paymenttype(items, (err, response) => {
        console.log('jhbk', response)

        console.log('add comment', response.status)
        if (response.status === 1) {

          this.close_reset_modal()

          //  alert(response.message)
          this.setState({
            add_cmnt_msg: response.message
          })

          jQuery('.resp_msg').fadeIn(2000)
          setTimeout(function () {
            jQuery('.resp_msg').fadeOut(2000)
          }, 8000)
          this.callme()
        } else {
        }
      })
      this.setState({ isValidation: false })
    } else {
      this.setState({ isValidation: true })
    }
  }

  callme = () => {
    // window.location.reload()
    this.setState({})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  close_reset_modal = () => {
    this.setState({
      categoryname: 'Choose Category',
      sub_categoryname: 'Choose Sub Category',
      Account_type_name: 'Choose Account',
      sub_Account_name: 'Choose Sub Account ',

      sub_categorylist: [],
      sub_account_list: [],
      Accounttype: []
    })

    jQuery('#account_name').val('')
    window.jQuery('#pop-modal').modal('hide')
  }
  handleCheck(e) {
    this.setState({
      selected: e.currentTarget.dataset.id,
      selectedindex: e.currentTarget.dataset.the
    })
  }

  handleCheck_currency(e) {
    // alert(e.currentTarget.dataset.namee)
    this.setState({ ToCurrency: e.currentTarget.dataset.namee })
  }
  handleCheck_currency_modal = e => {
    this.setState({ Currency_name: e })
    jQuery('#serch_filter').val(''); this.get_currencies()
  }
  handleCheck_balanceSheet_id(e) {
    this.setState({
      balance_sheet_category_name: e.currentTarget.dataset.namee,
      balance_sheet_category_id: e.currentTarget.dataset.id
    })
  }
  filter_currencies = e => {
    var matched_terms = []
    var search_term = e.target.value
    if (search_term != '') {
      search_term = search_term.toLowerCase()
      this.state.currencies.forEach(item => {
        if (item.toLowerCase().indexOf(search_term) !== -1) {
          console.log(item)
          matched_terms.push(item)
        }

        this.setState({ currencies: matched_terms })
      })
    } else {
      this.get_currencies()
    }
  }
  get_currencies = () => {
    fetch('https://api.exchangerate-api.com/v4/latest/SGD')
      .then(response => response.json())
      .then(data => {
        const currencyAr = []
        let first = data.rates
        for (const key in first) {
          currencyAr.push(key)
        }
        this.setState({ currencies: currencyAr, currency_clone: currencyAr })
      })
  }
  fetchSubCategeory = (name, val) => {
    this.setState({
      Accounttype: [],
      sub_account_list: []
    })
    let category_id = val
    let categoryname = name
    var from_create_invoice = 1

    FetchAllApi.get_SubCategory(category_id, from_create_invoice, (err, response) => {
      console.log('loklkk', response)
      if (response.status === 1) {
        // alert('got list :)')
        console.log('add======comment', response.status)
        this.setState({
          sub_categorylist: response.list,
          categoryname: categoryname,
          category_id: category_id,
          sub_categoryname: 'Choose sub Category',
          Account_type_name: 'Choose account type',
          sub_Account_name: 'Choose sub account type'
        })
      } else {
      }
    })
  }
  fetchAccount_type = (name, val) => {
    if (this.state.categoryname === 'Balance sheet') {
      this.setState({
        sub_account_list: []
      })

      let sub_categoryname = name
      let sub_category_id = val

      FetchAllApi.get_Accounttype(sub_category_id, (err, response) => {
        console.log('loklkk', response)
        if (response.status === 1) {
          //alert('got list :)')
          console.log('add======comment', response.status)
          this.setState({
            Accounttype: response.list,
            sub_categoryname: sub_categoryname,
            sub_category_id: sub_category_id,
            sub_account_list: [],
            Account_type_name: 'Choose account type',
            sub_Account_name: 'Choose sub account type'
          })
        } else {
        }
      })
    } else {
      this.setState({
        sub_account_list: []
      })

      let sub_categoryname = name
      let sub_category_id = val

      FetchAllApi.get_Accounttype(sub_category_id, (err, response) => {
        console.log('loklkk', response)
        if (response.status === 1) {
          //alert('got list :)')
          console.log('admment', response.list[0].name)
          this.fetch_sub_Account_type(response.list[0].name, response.list[0].id)
          this.setState({
            sub_categoryname: sub_categoryname,
            sub_category_id: sub_category_id,
            sub_account_list: [],
            Account_type_name: 'Choose account type',
            sub_Account_name: 'Choose sub account type'
          })
        } else {
        }
      })
    }

  }

  fetch_sub_Account_type = (name, val) => {
    let sub_Account_name = name
    let sub_Account_id = val
    var client_id = this.state.logged_client_id


    FetchAllApi.get_sub_Accounttype(sub_Account_id, client_id, (err, response) => {
      console.log('loklkk', response)
      if (response.status === 1) {
        //alert('got list :)')
        console.log('add======comment', response.status)
        this.setState({
          sub_account_list: response.list,
          Account_type_name: sub_Account_name,
          Account_type_id: sub_Account_id,
          sub_Account_name: 'Choose sub account type'
        })
      } else {
      }
    })
  }

  _onAction(e) {
    console.log('user did something', this.state.logged_user_id)
  }

  _onActive(e) {
    console.log('user is active', this.state.logged_user_id)
    console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  _onIdle(e) {
    console.log('user is idle', this.state.logged_user_id)
    console.log('last active', this.idleTimer.getLastActiveTime())
    //this.logoutFunc.bind(this);

    this.props.logoutSubmit()
    //this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div>
          {/* <IdleTimer
                ref={ref => { this.idleTimer = ref }}
                element={document}
                onActive={this.onActive}
                onIdle={this.onIdle}
                onAction={this.onAction}
                debounce={250}
                timeout={120000} /> */}
          {/* your app here */}
        </div>
        <div>
          <div className='modal fade pop-modal' id='pop-modal' role='dialog'>
            <div className='modal-dialog modal-md custom-modal'>
              <button
                type='button'
                className='close hidden-xs'
                data-dismiss='modal'
                onClick={this.close_reset_modal}
              >
                <img
                  className='img-responsive'
                  src='../../images/close-red.svg'
                  alt='icon'
                />
              </button>
              <div className='modal-content'>
                <div className='modal-body text-center'>
                  <h3>Create Payment Type</h3>
                  <form className='custom-form row'>
                    <div className='form-group col-md-12 col-xs-12 pad-no'>
                      <div className='col-md-4 col-sm-4 col-xs-12'>
                        <label>Payment  Name<span className="astrick">*</span></label>
                      </div>

                      <div className='col-md-8 col-sm-8 col-xs-12'>
                        <input
                          type='text'
                          id='payment_name'
                          name='payment_name'
                          className='form-control'
                          autoComplete='off'
                          onChange={event => this.handleChange(event)}
                          required
                        />
                      </div>



                    </div>









                    <div className='form-group col-md-12 col-xs-12 btn-sec pad-no'>
                      <button
                        className='btn btn-lightgray'
                        type='button'
                        data-dismiss='modal'
                        onClick={this.close_reset_modal}

                      >
                        Cancel
                      </button>
                      <span> </span>
                      <button
                        className='btn btn-green'
                        type='button'
                        onClick={this.saveNew_Account}
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

        <footer className='container-fluid'>
          <p>
            &copy; Copyrights {new Date().getFullYear()}, Genie. All Rights
            Reserved.
          </p>
        </footer>
      </div>
    )
  }
}
export default createpay