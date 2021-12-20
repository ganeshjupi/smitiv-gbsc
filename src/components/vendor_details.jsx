import React from 'react'
import LeftSidebar from './left_sidebar'
import Footer from './footer'

import Topbar from './topbar'

import FetchAllApi from '../api_links/fetch_all_api';
import moment from 'moment'

import jQuery from 'jquery'
// import 'bootstrap';
// import 'bootstrap-select';

class VendorDetails extends React.Component {
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
      role_permissions: JSON.parse(localStorage.getItem('role_permissions')) || [],
      dropdown: '',
      gst_list:[],
      inbox_list: [],
      response_stus: 0,
      response_msg: 'No data found',
      item_details: '',
      item_file_path: '',
      waiting_re: [],
      re_assigned: [],
      customerListArray: [],
      TotalPages: [],
      pgNo: '10',
      salesDefaultAccountsList:[],
      customer_Transaction: [],
      Recent_items: [],
      Recent_items_payment: [],
      Basic_info: {},
      customerDetails: [],
      table_Rows: '',
      statement: '',
      totalBal: '',
      response: '',
      isSuccessful: false,
      res_msg: '',
      isWarning: false,
      fromDate: "2020-01-01",
      toDate: moment(new Date()).format('YYYY/MM/DD'),
      response_to_inactive: '',
      vendorTypeLists: [],
      paymentTerms: [],
      customerSalesTaxList: [],
      defaultPurchaseTaxLists: [],
      response_statement: ''
    }
  };



  saveAsPdf = () => {
    let Input = {
      client_id: this.state.logged_client_id,
      vendor_id: this.props.location.state,
      fromDate: this.state.fromDate,
      show_id: this.state.show_id,
      toDate: this.state.toDate,
    }

    let dummy = {
      "status": 1,
      "message": "PDF saved successfully",
      "file_path": "http://13.250.63.251:9002/saved_sales_invoies/invoice-SIC-4.pdf"
    }

    // window.open(dummy.file_path);

    FetchAllApi.print_pdf(Input, 'vendor_statement', (err, response) => {
      if (response.status === 1) {
        alert(response.message)
        window.open(response.file_path);
      } else {
      }
      alert(response.message)
    });

  };



  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  };

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


  }

  routedChange(parameter) {
    this.props.history.push('/' + parameter)
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    this.vendor_transaction()
    this.Recent_Items()
    this.Basic_info()
    this.getNotes()
    this.statement();
    this.getCountry();
    this.defaultcategorylist_onchange();






    require('jquery-mousewheel')
    require('malihu-custom-scrollbar-plugin')

    jQuery('.item-listwrap').mCustomScrollbar({
      scrollEasing: 'linear',
      scrollInertia: 600,
      scrollbarPosition: 'outside'
    })

    jQuery('.label-enclose .label span').click(function () {
      //jQuery('.label-enclose .label').removeClass('active')
      jQuery(this)
        .parent('.label-enclose .label')
        .addClass('active')
    })
    jQuery('.label-enclose .label a').click(function () {
      jQuery(this)
        .parent('.label-enclose .label')
        .removeClass('active')
    })
  }

  vendor_transaction = (id) => {
    let client_id = this.state.logged_client_id
    // let customer_id = this.props.location.state

    let fromDate = this.state.fromDate
    let toDate = this.state.toDate

    let vendor_id = this.props.location.state;
    let show_id;
    if (id == undefined) {
      show_id = 1;
      this.setState({ show_id })
    } else {
      show_id = id;
      this.setState({ show_id })
    };

    FetchAllApi.vendor_transaction(
      client_id,
      vendor_id,
      fromDate,
      toDate,
      show_id,
      (err, response) => {
        // alert(response.response.length)
        if (response.status === 1) {
          this.setState({ customer_Transaction: response.response })
        } else {
          this.setState({ customer_Transaction: [] })
        }

      }
    )
  }


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


  Basic_info = () => {
    let client_id = this.state.logged_client_id
    let vendor_id = this.props.location.state
    FetchAllApi.vendor_basic_info(client_id, vendor_id, (err, response) => {

      if (response.status === 1) {
        this.setState({
          response: response,
          Basic_info: response.updatelist,
          customerDetails: response.updatelist
        }, this.nxtCall)
      } else {
      }
    })
  };

  nxtCall = () => {
    this.get_vendor_type();
    this.get_paymentTerms();
    this.customer_SalesTaxLists();
    this.defaultPurchaseTaxLists();
  };

  defaultPurchaseTaxLists = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.vendor_purchase_tax_list(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ defaultPurchaseTaxLists: response.list })
      } else {
        this.setState({ defaultPurchaseTaxLists: [] })
      }
    })
  }

  get_paymentTerms = () => {
    var client_id = this.state.logged_client_id
    FetchAllApi.vendorPaymentTerms(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ paymentTerms: response.list })
      } else {
        this.setState({ paymentTerms: [] })
      }
    })
  };

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

  Recent_Items = () => {
    let client_id = this.state.logged_client_id
    let vendor_id = this.props.location.state
    // let customer_id = this.props.location.state

    FetchAllApi.vendor_recent_items(client_id, vendor_id, (err, response) => {
      // alert(response.response.length)
      if (response.status === 1) {
        this.setState({ Recent_items: response.response, Recent_items_payment: response.payment })
      } else {
        this.setState({ Recent_items: [], Recent_items_payment: [] })
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


  statement = (id) => {
    let client_id = this.state.logged_client_id
    let vendor_id = this.props.location.state
    let from_date = this.state.fromDate
    let to_date = this.state.toDate
    let show_id;
    if (id == undefined) {
      show_id = 1;
    } else {
      show_id = id;
    };

    FetchAllApi.vendor_statement(
      client_id,
      vendor_id,
      from_date,
      to_date,
      show_id,
      (err, response) => {
        // alert(response.response.length)
        if (response.status === 1) {
          this.setState({
            statement: response.list,
            totalBal: response.totalamount,
            response_statement: response,

          })
        } else {
        }
      }
    )
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }

  dataTaggingFunc(list_id, file_id) {
    this.props.history.push('/data_tagging/' + list_id + '/' + file_id)
    window.scrollTo(0, 0)
  }


  makeActive = () => {
    let client_id = this.state.logged_client_id
    let vendor_id = this.props.location.state
    FetchAllApi.make_vendor_active(
      client_id,
      vendor_id,

      (err, response) => {
        if (response.status === 1) {
          alert(response.message)
          this.props.history.push('/Vendors_list')
        } else {
        }
      }
    )
  }

  // changedatevalue(seleteddateformat) {
  //   var dateresult = moment()
  //   let from_date, to_date

  //   if (seleteddateformat === 'This Month-to-date') {
  //     from_date = dateresult.startOf('month')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     // alert(from_date.format('YYYY-MM-DD'))
  //     this.setState(
  //       {
  //         fromDate: from_date.format('YYYY-MM-DD'),
  //         toDate: moment(new Date()).format('YYYY-MM-DD')
  //       },
  //       () => {
  //         this.vendor_transaction()
  //       }
  //     )
  //   } else if (seleteddateformat === 'This Week') {
  //     from_date = dateresult.startOf('week')

  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     to_date = dateresult.endOf('week')

  //     // from_date = dateresult.startOf('week')
  //     this.setState(
  //       {
  //         fromDate: from_date.format('YYYY-MM-DD'),
  //         toDate: dateresult.endOf('week')
  //       },
  //       () => {
  //         this.vendor_transaction()
  //       }
  //     )

  //     // this.state.start_date = from_date.format('YYYY-MM-DD')
  //     // to_date = dateresult.endOf('week')
  //   } else if (seleteddateformat === 'This Month') {
  //     from_date = dateresult.startOf('month')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     to_date = dateresult.endOf('month')
  //     this.state.end_date = to_date.format('YYYY-MM-DD')
  //     this.setState(
  //       {
  //         fromDate: from_date.format('YYYY-MM-DD'),
  //         toDate: to_date.format('YYYY-MM-DD')
  //       },
  //       () => {
  //         this.vendor_transaction()
  //       }
  //     )
  //   } else if (seleteddateformat === 'This Week-to-date') {
  //     from_date = dateresult.startOf('week')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')

  //     this.state.end_date = moment(new Date()).format('YYYY-MM-DD')
  //     this.setState(
  //       {
  //         fromDate: from_date.format('YYYY-MM-DD'),
  //         toDate: moment(new Date()).format('YYYY-MM-DD')
  //       },
  //       () => {
  //         this.vendor_transaction()
  //       }
  //     )
  //   } else if (seleteddateformat === 'This Year') {
  //     from_date = dateresult.startOf('year')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     to_date = dateresult.endOf('year')
  //     this.state.end_date = to_date.format('YYYY-MM-DD')
  //     this.setState(
  //       {
  //         fromDate: from_date.format('YYYY-MM-DD'),
  //         toDate: to_date.format('YYYY-MM-DD')
  //       },
  //       () => {
  //         this.vendor_transaction()
  //       }
  //     )
  //   } else if (seleteddateformat === 'This Year-to-date') {
  //     from_date = dateresult.startOf('year')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     to_date = moment(new Date()).format('YYYY-MM-DD')
  //     this.state.end_date = to_date
  //     this.setState(
  //       {
  //         fromDate: from_date.format('YYYY-MM-DD'),
  //         toDate: to_date
  //       },
  //       () => {
  //         this.vendor_transaction()
  //       }
  //     )
  //   }
  //   // let startDate = jQuery('#fromdate').val()
  //   // let end_date = jQuery('#todate').val()
  //   // this.setState({ start_date: startDate, end_date: end_date }, () => {
  //   // })
  // }

  changedatevalue(seleteddateformat) {
    var dateresult = moment();
    let from_date, to_date;

    if (seleteddateformat === "This Month-to-date") {
      from_date = dateresult.startOf("month");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      // document.getElementById("todate").value = moment(new Date()).format(
      //   "DD-MM-YYYY"
      // );
      this.state.toDate = moment(new Date()).format("YYYY-MM-DD");
      this.vendor_transaction();
    } else if (seleteddateformat === "This Week") {
      from_date = dateresult.startOf("week");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("week");
      // document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.toDate = to_date.format("YYYY-MM-DD");
      this.vendor_transaction();
    } else if (seleteddateformat === "This Month") {
      from_date = dateresult.startOf("month");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("month");
      // document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.toDate = to_date.format("YYYY-MM-DD");
      this.vendor_transaction();
    } else if (seleteddateformat === "This Week-to-date") {
      from_date = dateresult.startOf("week");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      // document.getElementById("todate").value = moment(new Date()).format(
      //   "DD-MM-YYYY"
      // );
      this.state.toDate = moment(new Date()).format("YYYY-MM-DD");
      this.vendor_transaction();
    } else if (seleteddateformat === "This Year") {
      from_date = dateresult.startOf("year");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("year");
      // document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.toDate = to_date.format("YYYY-MM-DD");
      this.vendor_transaction();
    } else if (seleteddateformat === "This Year-to-date") {
      from_date = dateresult.startOf("year");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      to_date = moment(new Date()).format("YYYY-MM-DD");
      // document.getElementById("todate").value = moment(to_date).format(
      //   "DD-MM-YYYY"
      // );
      this.state.toDate = to_date;
      this.vendor_transaction();
    }

    if (seleteddateformat == "ALL") {
      this.setState(
        {
          fromDate: this.state.incorporation_date,
          toDate: moment().add(1, 'day').format("YYYY-MM-DD"),
        },
        () => {
          this.vendor_transaction();
        }
      );
      // document.getElementById("fromdate").value = "";
      // document.getElementById("todate").value = "";
    }
  }

  deleteCustomer = statuscode => {
    // alert('hi')
    let client_id = this.state.logged_client_id
    let vendor_id = this.props.location.state

    // 0 for delete customer
    let status_to_set = statuscode

    FetchAllApi.make_vendor_inactive(
      client_id,
      vendor_id,
      status_to_set,

      (err, response) => {
        // alert(response.response.length)
        if (response.status === 1) {
          window.jQuery('#pop_add_notes').modal('hide')

          // this.props.history.push('/customers-list')
          this.setState(
            { isSuccessful: true, res_msg: response.message },
            () => {
              setTimeout(() => {
                this.setState({ isSuccessful: true })
                this.props.history.push('/Vendors_list')
              }, 1500)
            }
          )
        }
        if (response.status === 2) {
          this.setState({ response_to_inactive: response.message }, () => {
            window.jQuery('#pop_add_notes').modal('show')
          })
        }

        if (response.status === 0) {
          // alert('you cant delete')
          this.setState(
            { isSuccessful: true, isWarning: true, res_msg: response.message },
            () => {
              setTimeout(() => {
                this.setState({ isWarning: false })
              }, 1500)
            }
          )
        }
      }
    )
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  getNotes = search => {
    // let customer_id = this.props.location.state
    let vendor_id = this.props.location.state
    let client_id = this.state.logged_client_id
    let Search_value = search
    // let job_id=0

    FetchAllApi.vendor_notes(
      client_id,
      vendor_id,
      Search_value,
      (err, response) => {
        if (response.status === 1) {
          if (response.list !== '' && response.list !== undefined) {
            this.setState({
              notesArray: response.list
            })
          }
        } else {
          this.setState({
            notesArray: []
          })
        }
      }
    )
  };

  get_vendor_type = () => {
    var client_id = this.state.logged_client_id

    FetchAllApi.vendorTypes(client_id, (err, response) => {

      if (response.status === 1) {
        this.setState({ vendorTypeLists: response.list })
      } else {
        this.setState({ vendorTypeLists: [] })
      }
    })
  }

  createNotes = () => {
    let vendor_id = this.props.location.state
    let client_id = this.state.logged_client_id
    let user_id = this.state.logged_user_id
    let contact = jQuery('#contact_notes').val()
    let notes = jQuery('#note_notes').val()
    let note_title = jQuery('#tittle_notes').val()

    // let user_id = localStorage.getItem('logged_user_id')

    FetchAllApi.create_vendor_Notes(
      client_id,
      vendor_id,
      user_id,
      notes,
      note_title,
      contact,

      (err, response) => {
        if (response.status === 1) {
          window.jQuery('#pop-modal-for-notes').modal('hide')
          jQuery('#contact_notes').val('')
          jQuery('#note_notes').val('')
          jQuery('#tittle_notes').val('')
          this.getNotes()
        } else {
          alert(response.message)
        }
      }
    )
  }

  deleteNote = id => {
    let notes_id = id
    let vendor_id = this.props.location.state

    FetchAllApi.delete_vendor_Note(notes_id, vendor_id, (err, response) => {
      if (response.status === 1) {
        this.getNotes()
      } else {
        alert(response.message)
      }
    })
  }
  updateNotes = () => {
    let user_id = this.state.logged_user_id
    let client_id = this.state.logged_client_id
    let notes = jQuery('#note_notes1').val()
    let note_title = jQuery('#tittle_notes1').val()
    let notes_id = jQuery('#hiddenJobId').val()
    // let note_id = 1
    let vendor_id = this.props.location.state
    // let customer =jQuery('#hiddenJobId').val()

    // // let customer_id = this.props.location.state
    // let client_id = 1

    //    // alert(typeof job_id)
    let contact = jQuery('#contact_notes1').val()
    // let notes = jQuery('#note_notes1').val()
    // let note_name = jQuery('#tittle_notes1').val()
    // let user_id = localStorage.getItem('logged_user_id')
    // let note_id= jQuery('#hiddenJobId').val()
    FetchAllApi.update_vendor_Notes(
      client_id,
      user_id,
      notes,
      note_title,
      notes_id,
      vendor_id,
      contact,
      (err, response) => {
        if (response.status === 1) {
          window.jQuery('#pop-modal-for-notes').modal('hide')
          jQuery('#contact_notes1').val('')
          jQuery('#note_notes1').val('')
          jQuery('#tittle_notes1').val('')
          window.jQuery('#pop-modal-for-notesUpdate').modal('hide')

          this.getNotes()
        } else {
          alert(response.message)
        }
      }
    )
  }

  render() {
    let basicInfo =
      this.state.Basic_info != '' && this.state.Basic_info != undefined
        ? this.state.Basic_info
        : ''
    const { response } = this.state
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
                <a
                  href='javascript:;'
                  class='back hidden-xs'
                  onClick={this.routedChange.bind(this, 'Vendors_list')}
                >
                  <img src='../images/back-arrow-blue.svg' />
                </a>
                {/* <span className='page-title hidden-xs'>Inbox</span> */}
                <ul className='list-unstyled breadcrumb page-title hidden-xs'>
                  <li>
                    <a
                      href='javascript: ;'
                      onClick={this.routedChange.bind(this, 'Vendors_list')}
                    >
                      Vendors
                    </a>
                  </li>
                  <li>Vendors List </li>
                  <li>
                    {' '}
                    {this.state.response != '' &&
                      this.state.response != undefined
                      ? this.state.response.updatelist.vendor.name
                      : '--'}
                  </li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className='content-top col-md-12 col-xs-12 pad-b-no'>
                <div className='col-md-12 col-xs-12'>
                  <div className='row'>
                    <h4 className='fw-sbold mar-t-no pull-left hidden-xs'>
                      {this.state.response != '' &&
                        this.state.response != undefined
                        ? this.state.response.updatelist.vendor.name
                        : '--'}
                    </h4>
                    <div className='pull-right mob-xs-flft'>
                      <button
                        className='btn btn-white pull-left mar-rgt-5'
                        onClick={() => {
                          this.state.role_permissions.includes(20) ? (
                            this.props.history.push('/add_new_vendor', {
                              ...this.state.customerDetails
                            })) : alert("Required permission")
                        }}
                      >
                        Edit
                      </button>
                      <div className="dropdown menu-item new-cus pull-left mar-rgt-5">
                        <button
                          className='btn btn-white dropdown-toggle btn-arrow'
                          data-toggle='dropdown'
                          aria-expanded='false'
                        >
                          More
                          <span className='caret' />
                        </button>
                        <ul className='dropdown-menu align-right'>
                          <li
                            onClick={() => {
                              this.deleteCustomer(0)
                            }}
                          >
                            <a href='javascript:;'>Delete</a>
                          </li>
                          {/* <li
                            onClick={() => {
                              this.makeActive()
                            }}
                          >
                            <a href='javascript:;'>Make vendor active </a>
                          </li> */}
                        </ul>
                      </div>
                      <div className="dropdown menu-item new-cus pull-left mar-rgt-5">
                        <button
                          className='btn btn-blue dropdown-toggle btn-arrow'
                          data-toggle='dropdown'
                          aria-expanded='false'
                        >
                          New
                          <span className='caret' />
                        </button>
                        <ul className='dropdown-menu align-right'>
                          <li>
                            <a href='javascript:;'>Write cheque</a>
                          </li>
                          {/* <li>
                            <a href='/data_tagging/:list_id/:file_id'>Enter Bills</a>
                          </li>
                          <li>
                            <a href='/data_tagging/:list_id/:file_id'>Enter Credit</a>
                          </li> */}
                          <li>
                            <a href='/vendor_bill_payment'>Pay Bills</a>
                          </li>
                          <li>
                            <a href='/create_purchaseorder'> Create Purchase orders</a>
                          </li>
                          {/* <li>
                            <a href='javascript:;'>Receive Items(inventory)</a>
                          </li>
                          <li>
                            <a href='javascript:;'>Receive Items&Enter Bill(inventory)</a>
                          </li>
                          <li>
                            <a href='javascript:;'> Enter Bill for received items(inventory)</a>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-12 col-xs-12'>
                  <div className='row'>
                    <ul className='nav nav-tabs nowrap'>
                      <li role='presentation' className='active'>
                        <a data-toggle='tab' href='#basic-info'>
                          Basic Information
                        </a>
                      </li>
                      {/* <li role='presentation'>
                        <a data-toggle='tab' href='#job-list'>
                          Jobs List
                        </a>
                      </li> */}
                      <li role='presentation'>
                        <a data-toggle='tab' href='#transaction'>
                          Transactions
                        </a>
                      </li>
                      <li role='presentation'>
                        <a data-toggle='tab' href='#notes'>
                          Notes
                        </a>
                      </li>
                      <li role='presentation'>
                        <a data-toggle='tab' href='#recent-items'>
                          Recent Items
                        </a>
                      </li>
                      <li role='presentation'>
                        <a data-toggle='tab' href='#statement'>
                          Statement
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='main-content col-md-12 col-xs-12'>
                <div className='content-sec col-md-12 col-xs-12 pad-no mar-t-no'>
                  <div className='tab-content'>
                    <div id='basic-info' className='tab-pane fade in active'>
                      <React.Fragment>
                        <div className='row dflex mar-btm'>
                          <div className='col-md-6 col-xs-12'>
                            <h4 className='info-title'>Overview</h4>
                            <div className='col-md-12 info-block'>
                              <div className='row text-right'>
                                <a onClick={() => {
                                  this.state.role_permissions.includes(20) ? (
                                    this.props.history.push('/add_new_vendor', {
                                      ...this.state.customerDetails
                                    })) : alert("Required permission")
                                }} className='edit'>
                                  Edit
                                </a>
                              </div>
                              <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Company Name
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.response != '' &&
                                    this.state.response != undefined
                                    ? this.state.response.updatelist.company
                                      .company_name
                                    : '--'}
                                </span>
                              </div>
                              <div className='row mar-btm'>
                                <span className='col-md-4 col-sm-12 col-xs-12  sub'>
                                  Vendor Type
                                </span>
                                <span className='col-md-8 col-sm-12 col-xs-12  main'>
                                  {this.state.vendorTypeLists.map((ven) => {
                                    if (this.state.response.updatelist.vendor.vendor_type == ven.id) {
                                      return (
                                        ven.name)

                                    } else {
                                      return (
                                        null)
                                    }
                                  })}

                                </span>
                              </div>
                              <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Business Reg No.
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.response != '' &&
                                    this.state.response != undefined
                                    ? this.state.response.updatelist.company
                                      .business_reg_no
                                    : '--'}
                                </span>
                              </div>
                              <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Currency
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.response != '' &&
                                    this.state.response != undefined
                                    ? this.state.response.updatelist.vendor
                                      .currency
                                    : '--'}
                                </span>
                              </div>
                              {/* <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Opening Balance
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.response != '' &&
                                    this.state.response != undefined
                                    ? this.state.response.updatelist.vendor
                                      .opening_balance
                                    : '--'}
                                </span>
                              </div> */}
                              <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Website
                                </span>
                                <span className='col-md-8 col-sm-12 col-xs-12  main'>
                                  <a href='javascript:;'>
                                    {this.state.response != '' &&
                                      this.state.response != undefined
                                      ? this.state.response.updatelist.company
                                        .website
                                      : '--'}
                                  </a>
                                </span>
                              </div>
                              <hr />

                              {response &&
                                response.updatelist &&
                                response.updatelist.contacts.map((item, i) => {
                                  return (
                                    <div className='row mar-btm' key={item}>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        {i === 0 && 'Contact Persons'}
                                      </span>

                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        <label
                                          className='label label-danger'
                                          style={{
                                            visibility:
                                              item.is_primary == 1
                                                ? 'visible'
                                                : 'hidden'
                                          }}
                                        >
                                          Primary
                                        </label>

                                        <br />
                                        {item.name}
                                        <span>
                                          <a href='tel:(713)-090-0558'>
                                            {item.phone_work}{' '}
                                          </a>
                                        </span>
                                        <span>
                                          <a href='tel:(842)-294-8453'>
                                            {item.phone_personal}{' '}
                                          </a>
                                        </span>
                                        <span>
                                          <a href='mailto:johndoe.fifthrouge@gmail.com'>
                                            {item.email}
                                          </a>
                                        </span>
                                        <br />
                                      </span>
                                      <br />
                                    </div>
                                  )
                                })}

                              {response &&
                                response.updatelist &&
                                response.updatelist.address.map((item, i) => {
                                  return (

                                    <div className='row mar-btm'>
                                      {i === 0 && <div>
                                        <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                          {i === 0 ? 'Billing Address' : ''}
                                        </span>
                                        <span className='col-md-8  col-sm-12 col-xs-12 main'>

                                          <span>{item.billing_address}</span>
                                        </span> </div>}

                                    </div>
                                  )
                                })}

                              {response &&
                                response.updatelist &&
                                response.updatelist.address.map((item, i) => {
                                  return (
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        {i === 0 ? 'Shipping Address' : ''}
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.shipped_address_name}{' '}
                                        <span>{item.shipped_address}</span>
                                      </span>
                                    </div>
                                  )
                                })}

                              {/* <div className='row'>
                                <span className='col-md-4 col-sm-12 col-xs-12  sub'>
                                  Shipping Address
                                </span>

                                <span className='col-md-8 col-sm-12 col-xs-12  main'>
                                  company name <span>address</span>
                                </span>
                              </div> */}
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
                                    src={
                                      this.state.isWarning
                                        ? '../../images/alert-warning.svg'
                                        : '../../images/alert-success.svg'
                                    }
                                    alt='icon'
                                  />
                                </div>
                                <div className='alert-cont'>
                                  <strong className='title'>Success!</strong>
                                  {this.state.res_msg}
                                </div>
                              </div>
                            ) : (
                                ''
                              )}
                          </div>
                          <div className='col-md-6 col-xs-12'>
                            <h4 className='info-title'>Finance Details</h4>
                            <div className='col-md-12 info-block'>
                              <div className='row text-right'>
                                <a onClick={() => {
                                  this.state.role_permissions.includes(20) ? (
                                    this.props.history.push('/add_new_vendor', {
                                      ...this.state.customerDetails
                                    })) : alert("Required permission")
                                }} className='edit'>
                                  Edit
                                </a>
                              </div>

                              <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Name on Cheque as
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.response != '' &&
                                    this.state.response != undefined
                                    ? this.state.response.updatelist.vendor.name
                                    : '--'}
                                </span>
                              </div>
                              <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Bank Acc No.
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.response != '' &&
                                    this.state.response != undefined
                                    ? this.state.response.updatelist.finance
                                      .bank_account_no
                                    : '--'}
                                </span>
                              </div>
                              <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Credit Limit
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.response != '' &&
                                    this.state.response != undefined
                                    ? this.state.response.updatelist.finance
                                      .credit_limit
                                    : '--'}
                                </span>
                              </div>
                              <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Billing Rate Lvel
                                </span>
                                <span className='col-md-8 col-sm-12 col-xs-12  main'>
                                  {this.state.response != '' &&
                                    this.state.response != undefined
                                    ? this.state.response.updatelist.finance
                                      .billing_price_level
                                    : '--'}
                                </span>
                              </div>
                              <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Payment Terms
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.paymentTerms.map((pay) => {
                                    if (this.state.response.updatelist.finance
                                      .payment_terms == pay.id) {
                                      return (pay.terms)
                                    } else { return (null) }
                                  })}
                                </span>
                              </div>

                              <hr />
                              <div className='row mar-btm'>
                                <span className='col-md-12 col-xs-12 sub-title'>
                                  Tax Information
                                </span>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Tax ID
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.response != '' &&
                                    this.state.response != undefined
                                    ? this.state.response.updatelist.finance
                                      .tax_id
                                    : '--'}
                                </span>
                              </div>
                              <div className='row mar-btm'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Default Category
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.salesDefaultAccountsList && this.state.salesDefaultAccountsList.map((tax) => {
                                    if (this.state.response && this.state.response.updatelist  && this.state.response.updatelist.finance && this.state.response.updatelist.finance
                                      .default_sales_tax == tax.id) {
                                      return (tax.name)
                                    } else {
                                      return (null)
                                    }
                                  })}
                                </span>
                              </div>
                              <div className='row'>
                                <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                  Default Purchase Tax
                                </span>
                                <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                  {this.state.gst_list.map((ter) => {
                                    if (this.state.response.updatelist.finance
                                      .default_purchase_tax == ter.id) {
                                      return (ter.sales_tax_name)
                                    } else {
                                      return null
                                    }
                                  })
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    </div>

                    {/* <div id='job-list' className='tab-pane fade in active'>
                      <div className='report-table col-md-12 col-xs-12 pad-no'>
                        <div className='table-responsive'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>
                             
                                  Jobs List
                                </th>
                                <th >
                                 
                                  Currency
                                </th>{' '}
                                <th >
                            
                                  Open balance
                                </th>
                                <th >
                                 
                                  Price Level
                                </th>

                              </tr>
                            </thead>
                            <tbody>
                              {this.state.table_Rows != '' &&
                                this.state.table_Rows != undefined &&
                                this.state.table_Rows}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                     */}
                    <div id='transaction' className='tab-pane fade in'>
                      <div className='report-setting'>
                        <form className='custom-form form-inline'>
                          <div className='form-group mar-rgt'>
                            <label>Show</label>
                            <div className="form-cont" >
                              <select
                                className="selectpicker form-control hh "
                                onChange={e =>
                                  this.vendor_transaction(e.target.value)
                                }
                              >

                                <option value="1">ALL</option>
                                <option value="2">Bill</option>
                                <option value="3">Vendor credit</option>
                                <option value="4">Purchase order</option>
                              </select>
                            </div>
                          </div>
                          {/* <div className='form-group mar-rgt'>
                            <label>Filter</label>
                            <div className='custom-select-drop dropdown'>
                              <a
                                aria-expanded='false'
                                aria-haspopup='true'
                                role='button'
                                data-toggle='dropdown'
                                className='dropdown-toggle btn form-control'
                                href='javascript:;'
                              >
                                <span id='selected'>All</span>
                                <span className='caret' />
                              </a>
                              <ul className='dropdown-menu'>
                                <li className='active'>
                                  <a href='javascript:;'>All</a>
                                </li>
                                <li>
                                  <a href='javascript:;'>Lorem ipsum</a>
                                </li>
                                <li>
                                  <a href='javascript:;'>Ipsum dolor</a>
                                </li>
                                <li>
                                  <a href='javascript:;'>Dolor seit amet</a>
                                </li>
                              </ul>
                            </div>
                          </div> */}
                          <div className='form-group mar-rgt'>
                            <label>Date</label>
                            <div className='custom-select-drop dropdown'>
                              <div className="form-cont" >
                                <select
                                  className="selectpicker form-control hh "
                                  onChange={e =>
                                    this.changedatevalue(e.target.value, "transaction")
                                  }
                                >
                                  <option>This Month-to-date</option>
                                  <option>This Week</option>
                                  <option>This Month</option>
                                  <option>This Week-to-date</option>
                                  <option>This Year</option>
                                  <option>This Year-to-date</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className='report-table col-md-12 col-xs-12 pad-no'>
                        <div className='table-responsive'>
                          <table className='table detail-report'>
                            <thead>
                              <tr>
                                <th className='pad-lft'>
                                  Type
                                  <i className='th-sort'>
                                    <img
                                      src='../images/sort-icon.svg'
                                      alt='SortIcon'
                                    />
                                  </i>
                                </th>
                                <th>
                                  Date
                                  <i className='th-sort'>
                                    <img
                                      src='../images/sort-icon.svg'
                                      alt='SortIcon'
                                    />
                                  </i>
                                </th>
                                <th>
                                  No#
                                  <i className='th-sort'>
                                    <img
                                      src='../images/sort-icon.svg'
                                      alt='SortIcon'
                                    />
                                  </i>
                                </th>
                                <th>
                                  Account
                                  <i className='th-sort'>
                                    <img
                                      src='../images/sort-icon.svg'
                                      alt='SortIcon'
                                    />
                                  </i>
                                </th>
                                <th className='text-right'>
                                  Amount
                                  <i className='th-sort'>
                                    <img
                                      src='../images/sort-icon.svg'
                                      alt='SortIcon'
                                    />
                                  </i>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.customer_Transaction &&
                                this.state.customer_Transaction.map(
                                  (item, i) => {
                                    return (
                                      <tr className='item-step1'>
                                        <td>
                                          <span>
                                            {item.type != '' &&
                                              item.type != undefined
                                              ? item.type
                                              : '--'}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {item.invoice_date != '' &&
                                              item.invoice_date != undefined
                                              ? item.invoice_date
                                              : '--'}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {item.invoice_number != '' &&
                                              item.invoice_number != undefined
                                              ? item.invoice_number
                                              : '--'}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {item.account != '' &&
                                              item.account != undefined
                                              ? item.account
                                              : '--'}
                                          </span>
                                        </td>
                                        <td className='text-right'>
                                          <span>
                                            {item.amount != '' &&
                                              item.amount != undefined
                                              ? item.amount
                                              : '--'}
                                          </span>
                                        </td>
                                      </tr>
                                    )
                                  }
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div id='notes' className='tab-pane fade in'>
                      <div className='col-md-12 col-xs-12'>
                        <div className='row'>
                          <em className='info-em col-md-12 col-xs-12 pad-no'>
                            * This notes section only for internal purpose
                          </em>
                          <form className='custom-form form-inline h-small col-md-6 col-sm-6 col-xs-12 mar-top pad-no'>
                            <div className='form-group search-box mar-rgt'>
                              <input
                                type='text'
                                name='search'
                                className='form-control'
                                placeholder='Enter notes name...'
                                autocomplete='off'
                                onInput={event =>
                                  this.getNotes(event.target.value)
                                }
                              />
                            </div>
                          </form>
                          <div className='pull-right mar-top mob-xs-flft'>
                            <button
                              className='btn btn-blue add-new pull-right'
                              onClick={() => {
                                window
                                  .jQuery('#pop-modal-for-notes')
                                  .modal('show')
                              }}
                            >
                              <img
                                className='filter-white'
                                src='images/plus-add.svg'
                                alt='icon'
                              />
                              Add New
                            </button>
                            {/* <div className='dropdown menu-item pull-left mar-rgt-5'>
                              <button
                                className='btn btn-white dropdown-toggle btn-arrow'
                                data-toggle='dropdown'
                                aria-expanded='false'
                              >
                                Export
                                <span className='caret' />
                              </button>
                              <ul className='dropdown-menu align-right'>
                                <li>
                                  <a href='javascript:;'>Export as Excel</a>
                                </li>
                                <li>
                                  <a href='javascript:;'>Export as PDF</a>
                                </li>
                              </ul>
                            </div> */}
                          </div>
                        </div>
                        <div className='row mar-top pad-top'>
                          {this.state.notesArray != '' &&
                            this.state.notesArray != undefined &&
                            this.state.notesArray.map((item, i) => {
                              return (
                                <div
                                  className='col-md-12 col-xs-12 note-item'
                                  key={i}
                                >
                                  <div className='col-md-1'>
                                    <label className='custom-checkbox'>
                                      <input type='checkbox' name='all' />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                  <div className='col-md-2'>
                                    <p className='mar-b-no date'>
                                      {item.created_date}
                                    </p>
                                  </div>
                                  <div className='col-md-7'>
                                    <p>{item.note_title}</p>
                                    <span>{item.notes}</span>
                                  </div>
                                  <div className='col-md-2'>
                                    <span className='by pull-right'>
                                      Created by <br /> {item.created_by}
                                    </span>
                                  </div>
                                  <div className="dropdown menu-item new-cus">
                                    <input type='hidden' id='hiddenJobId' />
                                    <button
                                      className='btn btn-green dropdown-toggle'
                                      type='button'
                                      data-toggle='dropdown'
                                    >
                                      Action
                                      <span className='caret' />
                                    </button>
                                    <ul className='dropdown-menu align-right'>
                                      <li
                                        onClick={() => {
                                          jQuery('#contact_notes1').val(
                                            item.contact
                                          )
                                          jQuery('#note_notes1').val(item.notes)
                                          jQuery('#tittle_notes1').val(
                                            item.note_title
                                          )
                                          jQuery('#hiddenJobId').val(
                                            item.notes_id
                                          )

                                          window
                                            .jQuery(
                                              '#pop-modal-for-notesUpdate'
                                            )
                                            .modal('show')
                                        }}
                                      >

                                        <a >Edit</a>
                                      </li>
                                      <li
                                        onClick={() => {
                                          this.state.role_permissions.includes(22) ? (
                                            this.deleteNote(item.notes_id)) : alert('Required permission')
                                        }}
                                      >
                                        <a href='javascript:;'>Delete</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </div>
                    <div id='recent-items' className='tab-pane fade in '>
                      <div className='col-md-12 col-xs-12'>
                        <div className='row'>
                          <div
                            className='custom-accordion panel-group'
                            id='accordion'
                          >
                            <div className='panel'>
                              <div className='panel-heading'>
                                <h4 className='panel-title'>
                                  <a
                                    data-toggle='collapse'
                                    data-parent='#accordion'
                                    href='#collapseOne'
                                  >
                                    Last 10 Bills
                                    <span className='accordion-arrow'>
                                      <img
                                        src='../images/accordion-arrow.svg'
                                        alt='icon'
                                      />
                                    </span>
                                  </a>
                                </h4>
                              </div>
                              <div
                                id='collapseOne'
                                className='panel-collapse collapse in'
                              >
                                <div className='panel-body'>
                                  <div className='report-table col-md-12 col-xs-12'>
                                    <div className='table-responsive'>
                                      <table className='table detail-report'>
                                        <thead>
                                          <tr>
                                            <th className='pad-lft'>
                                              Date
                                              <i className='th-sort'>
                                                <img
                                                  src='../images/sort-icon.svg'
                                                  alt='SortIcon'
                                                />
                                              </i>
                                            </th>
                                            <th>
                                              No#
                                              <i className='th-sort'>
                                                <img
                                                  src='../images/sort-icon.svg'
                                                  alt='SortIcon'
                                                />
                                              </i>
                                            </th>
                                            <th className='text-right'>
                                              Amount
                                              <i className='th-sort'>
                                                <img
                                                  src='../images/sort-icon.svg'
                                                  alt='SortIcon'
                                                />
                                              </i>
                                            </th>
                                            <th className='text-right'>
                                              Open Balance
                                              <i className='th-sort'>
                                                <img
                                                  src='../images/sort-icon.svg'
                                                  alt='SortIcon'
                                                />
                                              </i>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {this.state.Recent_items &&
                                            this.state.Recent_items.map(
                                              (item, i) => {
                                                let openBal =
                                                  '' + item.opening_balance
                                                return (
                                                  <tr className='item-step1'>
                                                    <td>
                                                      <span>
                                                        {item.invoice_date !=
                                                          '' &&
                                                          item.invoice_date !=
                                                          undefined
                                                          ? item.invoice_date
                                                          : '--'}
                                                      </span>
                                                    </td>
                                                    <td>
                                                      <span>
                                                        {item.invoice_number !=
                                                          '' &&
                                                          item.invoice_number !=
                                                          undefined
                                                          ? item.invoice_number
                                                          : '--'}
                                                      </span>
                                                    </td>
                                                    <td className='text-right'>
                                                      <span>
                                                        {item.amount != '' &&
                                                          item.amount != undefined
                                                          ? item.amount
                                                          : '--'}
                                                      </span>
                                                    </td>
                                                    <td className='text-right'>
                                                      <span>
                                                        {openBal != '' &&
                                                          openBal != undefined
                                                          ? openBal
                                                          : '--'}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                )
                                              }
                                            )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  {/* <a href='javascript:;' className='text-link'>
                                    Go to Report
                                  </a> */}
                                </div>
                              </div>
                            </div>
                            <div className='panel'>
                              <div className='panel-heading'>
                                <h4 className='panel-title'>
                                  <a
                                    data-toggle='collapse'
                                    data-parent='#accordion'
                                    href='#collapseTwo'
                                  >
                                    Last 10 Payments
                                    <span className='accordion-arrow'>
                                      <img
                                        src='../images/accordion-arrow.svg'
                                        alt='icon'
                                      />
                                    </span>
                                  </a>
                                </h4>
                              </div>
                              <div
                                id='collapseTwo'
                                className='panel-collapse collapse'
                              >
                                <div className='panel-body'>
                                  <div className='report-table col-md-12 col-xs-12'>
                                    <div className='table-responsive'>
                                      <table className='table detail-report'>
                                        <thead>
                                          <tr>
                                            <th className='pad-lft'>
                                              Date
                                              <i className='th-sort'>
                                                <img
                                                  src='images/sort-icon.svg'
                                                  alt='SortIcon'
                                                />
                                              </i>
                                            </th>
                                            <th>
                                              No#
                                              <i className='th-sort'>
                                                <img
                                                  src='images/sort-icon.svg'
                                                  alt='SortIcon'
                                                />
                                              </i>
                                            </th>
                                            <th className='text-right'>
                                              Amount
                                              <i className='th-sort'>
                                                <img
                                                  src='images/sort-icon.svg'
                                                  alt='SortIcon'
                                                />
                                              </i>
                                            </th>
                                            <th className='text-right'>
                                              Open Balance
                                              <i className='th-sort'>
                                                <img
                                                  src='images/sort-icon.svg'
                                                  alt='SortIcon'
                                                />
                                              </i>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {this.state.Recent_items_payment != "" &&
                                            this.state.Recent_items_payment.map((pay) => {
                                              return (
                                                <tr className='item-step1'>
                                                  <td>
                                                    <span>{pay.payment_date}</span>
                                                  </td>
                                                  <td>
                                                    <span>{pay.invoice_number}</span>
                                                  </td>
                                                  <td className='text-right'>
                                                    <span>{pay.amount}</span>
                                                  </td>
                                                  <td className='text-right'>
                                                    <span>{pay.opening_balance}</span>
                                                  </td>
                                                </tr>
                                              )
                                            })}

                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  {/* <a href='javascript:;' className='text-link'>
                                    Go to Report
                                  </a> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id='statement' className='tab-pane fade in'>
                      <div className='report-setting'>
                        <form className='custom-form form-inline'>
                          <div className='form-group mar-rgt'>
                            <label>Date</label>
                            <div className="form-cont" >
                              <select
                                className="selectpicker form-control hh "
                                onChange={e =>
                                  this.changedatevalue(e.target.value, "statement")
                                }
                              >
                                <option>This Month-to-date</option>
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>This Week-to-date</option>
                                <option>This Year</option>
                                <option>This Year-to-date</option>
                              </select>
                            </div>
                          </div>
                          <div className='form-group mar-rgt'>
                            <label>Filter</label>
                            <div className="form-cont" >
                              <select
                                className="selectpicker form-control hh "
                                onChange={e =>
                                  this.statement(e.target.value)
                                }
                              >

                                <option value="1">ALL</option>
                                <option value="2">Bill</option>
                                <option value="3">Bill payment</option>
                              </select>
                            </div>
                          </div>
                        </form>
                        <div className='text-right pad-hor-no'>
                          <button type='button' className='btn btn-empty ico' onClick={() => this.saveAsPdf()}>
                            <img src='images/print-icon.svg' alt='icon' />
                            Print
                          </button>
                          <button type='button' className='btn btn-empty ico' onClick={() => this.saveAsPdf()}>
                            <img src='images/pdf-icon.svg' alt='icon' />
                            Save as PDF
                          </button>
                        </div>
                      </div>
                      <div className='statement-wrap col-md-12 pad-hor-no'>
                        <div
                          style={{
                            color: '#6A6A6A',
                            background: '#fff',
                            minHeight: '230px',
                            border: '1px solid #eee',
                            width: '830px',
                            margin: '0 auto',
                            fontSize: '14px',
                            display: 'block',
                            overflow: 'hidden',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.12)',
                            MozBoxShadow: '0px 4px 6px rgba(0, 0, 0, 0.12)',
                            WebkitBoxShadow: '0px 4px 6px rgba(0, 0, 0, 0.12)',
                            borderRadius: '4px'
                          }}
                        >
                          {/* Template Header Starts here */}
                          <div
                            style={{
                              float: 'left',
                              width: '100%',
                              padding: '35px'
                            }}
                          >
                            <div
                              style={{
                                float: 'left',
                                width: '35%',
                                height: '73px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              {/* <img
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                                src='images/sample-logo-horz.png'
                                alt='logo'
                              /> */}
                            </div>
                            <div
                              style={{
                                float: 'right',
                                textAlign: 'right',
                                width: '42%'
                              }}
                            >
                              <p style={{ marginBottom: 0 }}>
                                <span style={{ fontWeight: 600 }}>Mob:</span>{' '}
                                {this.state.response_statement != '' &&
                                  this.state.response_statement != undefined &&
                                  this.state.response_statement.mobilenumber
                                }
                              </p>
                              <p style={{ marginBottom: 0 }}>
                                {this.state.response_statement != '' &&
                                  this.state.response_statement != undefined &&
                                  this.state.response_statement.company_address
                                }
                              </p>
                            </div>
                          </div>
                          {/* Template Header Ends here */}
                          {/* Template Content Starts here */}
                          <div
                            style={{
                              float: 'left',
                              width: '100%',
                              padding: '35px'
                            }}
                          >
                            {/* Template Content Head Starts here */}
                            <div style={{ float: 'left', width: '100%' }}>
                              <div style={{ float: 'left', width: '45%' }}>
                                <p
                                  style={{
                                    marginBottom: '8px',
                                    fontWeight: 600
                                  }}
                                >
                                  To
                                </p>
                                <p>
                                  {this.state.response_statement != '' &&
                                    this.state.response_statement != undefined &&
                                    this.state.response_statement.billing_address
                                  }
                                </p>
                              </div>
                              <div
                                style={{
                                  float: 'right',
                                  width: '38%',
                                  textAlign: 'right'
                                }}
                              >
                                <p style={{ float: 'left', width: '50%' }}>
                                  <span style={{ fontWeight: 600 }}>
                                    From Date
                                  </span>
                                  <br />
                                  {moment(this.state.fromDate).format('DD-MM-YYYY')}
                                </p>
                                <p style={{ float: 'left', width: '50%' }}>
                                  <span style={{ fontWeight: 600 }}>
                                    To Date
                                  </span>
                                  <br />
                                  {moment(this.state.toDate).format('DD-MM-YYYY')}
                                </p>
                              </div>
                            </div>
                            {/* Template Content Head Ends here */}
                            {/* Table Starts here */}
                            <table
                              style={{
                                width: '100%',
                                float: 'left',
                                marginTop: '25px'
                              }}
                            >
                              <thead
                                style={{
                                  background: '#5e5e5e',
                                  border: '1px solid #5e5e5e'
                                }}
                              >
                                <tr style={{ color: '#fff', fontWeight: 500 }}>
                                  <td style={{ padding: '15px 10px' }}>Date</td>
                                  <td style={{ padding: '15px 10px' }}>
                                    Reference
                                  </td>
                                  <td style={{ padding: '15px 10px' }}>
                                    Details
                                  </td>
                                  <td style={{ padding: '15px 10px' }}>
                                    Due Date
                                  </td>
                                  <td style={{ padding: '15px 10px' }}>
                                    Amount
                                  </td>
                                  <td style={{ padding: '15px 10px' }}>
                                    Payments
                                  </td>
                                  <td
                                    style={{
                                      padding: '15px 10px',
                                      textAlign: 'right'
                                    }}
                                  >
                                    Balance Due
                                  </td>
                                </tr>
                              </thead>
                              <tbody style={{ border: '1px solid #BABABA' }}>
                                {this.state.statement &&
                                  this.state.statement.map((item, i) => {
                                    return (
                                      <tr>
                                        <td
                                          style={{
                                            fontSize: '13px',
                                            padding: '15px 10px'
                                          }}
                                        >
                                          {item.invoice_date}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: '13px',
                                            padding: '15px 10px'
                                          }}
                                        >
                                          {item.reference}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: '13px',
                                            padding: '15px 10px'
                                          }}
                                        >
                                          {item.details}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: '13px',
                                            padding: '15px 10px'
                                          }}
                                        >
                                          {item.due_date}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: '13px',
                                            padding: '15px 10px'
                                          }}
                                        >
                                          {item.amount}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: '13px',
                                            padding: '15px 10px'
                                          }}
                                        >
                                          {item.payment}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: '13px',
                                            padding: '15px 10px',
                                            textAlign: 'right'
                                          }}
                                        >
                                          {item.open_balance_home_currency}
                                        </td>
                                      </tr>
                                    )
                                  })}
                              </tbody>
                            </table>
                            {/* Table Ends here */}
                            {/* Total Sec Starts here */}

                            <div
                              style={{
                                float: 'right',
                                width: '35%',
                                paddingLeft: '20px',
                                marginTop: '20px'
                              }}
                            >
                              <div
                                style={{
                                  float: 'left',
                                  width: '100%',
                                  padding: '15px 10px',
                                  background: '#EFEFEF',
                                  borderRadius: '3px'
                                }}
                              >
                                <div
                                  style={{
                                    float: 'left',
                                    width: '50%',
                                    fontWeight: 600,
                                    textAlign: 'right',
                                    paddingRight: '10px'
                                  }}
                                >
                                  Total Balance Due
                                </div>
                                <div
                                  style={{
                                    textAlign: 'right',
                                    padding: '0 10px',
                                    float: 'right',
                                    width: '50%'
                                  }}
                                >
                                  {this.state.totalBal}
                                </div>
                              </div>
                            </div>

                            {/* Total Sec Ends here */}
                          </div>
                          {/* Template Content Ends here */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            //update notes
            <div
              className='modal fade pop-modal'
              id='pop-modal-for-notesUpdate'
              role='dialog'
            >
              <div className='modal-dialog modal-md custom-modal'>
                <button
                  type='button'
                  className='close hidden-xs'
                  data-dismiss='modal'
                >
                  <img
                    className='img-responsive'
                    src='../../images/close-red.svg'
                    alt='icon'
                  />
                </button>
                <div className='modal-content'>
                  <div className='modal-body text-center'>
                    <h3>Edit Notes</h3>
                    <form className='custom-form row'>
                      <div className='form-group col-md-12 col-xs-12 pad-no'>
                        <div className='col-md-4 col-sm-4 col-xs-12'>
                          <label>Title</label>
                        </div>
                        <div className='col-md-8 col-sm-8 col-xs-12'>
                          <input
                            type='text'
                            id='tittle_notes1'
                            name='account_name'
                            className='form-control'
                            autoComplete='off'
                            required
                          />
                        </div>
                      </div>

                      <div className='form-group col-md-12 col-xs-12 pad-no'>
                        <div className='col-md-4 col-sm-4 col-xs-12'>
                          <label>Contact</label>
                        </div>
                        <div className='col-md-8 col-sm-8 col-xs-12'>
                          <input
                            type='text'
                            id='contact_notes1'
                            name='account_name'
                            className='form-control'
                            autoComplete='off'
                            required
                          />
                        </div>
                      </div>

                      <div className='form-group col-md-12 col-xs-12 pad-no'>
                        <div className='col-md-4 col-sm-4 col-xs-12'>
                          <label>
                            Note<span className='astrick'>*</span>
                          </label>
                        </div>
                        <div className='col-md-8 col-sm-8 col-xs-12'>
                          <input
                            type='text'
                            id='note_notes1'
                            style={{ height: 100 }}
                            name='account_name'
                            className='form-control'
                            autoComplete='off'
                            required
                          />
                        </div>
                      </div>

                      <div className='form-group col-md-12 col-xs-12 btn-sec pad-no'>
                        <button
                          className='btn btn-lightgray'
                          type='button'
                          data-dismiss='modal'
                        >
                          Cancel
                        </button>
                        <span> </span>
                        <button
                          className='btn btn-green'
                          type='button'
                          onClick={() => {
                            this.updateNotes()
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* //create notes */}
            <div
              className='modal fade pop-modal'
              id='pop-modal-for-notes'
              role='dialog'
            >
              <div className='modal-dialog modal-md custom-modal'>
                <button
                  type='button'
                  className='close hidden-xs'
                  data-dismiss='modal'
                >
                  <img
                    className='img-responsive'
                    src='../../images/close-red.svg'
                    alt='icon'
                  />
                </button>
                <div className='modal-content'>
                  <div className='modal-body text-center'>
                    <h3>Create Notes</h3>
                    <form className='custom-form row'>
                      <div className='form-group col-md-12 col-xs-12 pad-no'>
                        <div className='col-md-4 col-sm-4 col-xs-12'>
                          <label>Title</label>
                        </div>
                        <div className='col-md-8 col-sm-8 col-xs-12'>
                          <input
                            type='text'
                            id='tittle_notes'
                            name='account_name'
                            className='form-control'
                            autoComplete='off'
                            required
                          />
                        </div>
                      </div>

                      <div className='form-group col-md-12 col-xs-12 pad-no'>
                        <div className='col-md-4 col-sm-4 col-xs-12'>
                          <label>Contact</label>
                        </div>
                        <div className='col-md-8 col-sm-8 col-xs-12'>
                          <input
                            type='text'
                            id='contact_notes'
                            name='account_name'
                            className='form-control'
                            autoComplete='off'
                            required
                          />
                        </div>
                      </div>

                      <div className='form-group col-md-12 col-xs-12 pad-no'>
                        <div className='col-md-4 col-sm-4 col-xs-12'>
                          <label>
                            Note<span className='astrick'>*</span>
                          </label>
                        </div>
                        <div className='col-md-8 col-sm-8 col-xs-12'>
                          <input
                            type='text'
                            id='note_notes'
                            style={{ height: 100 }}
                            name='account_name'
                            className='form-control'
                            autoComplete='off'
                            required
                          />
                        </div>
                      </div>

                      <div className='form-group col-md-12 col-xs-12 btn-sec pad-no'>
                        <button
                          className='btn btn-lightgray'
                          type='button'
                          data-dismiss='modal'
                        >
                          Cancel
                        </button>
                        <span> </span>
                        <button
                          className='btn btn-green'
                          type='button'
                          onClick={() => {
                            this.createNotes()
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
            <div
              className='modal fade pop-modal'
              id='pop_add_notes'
              role='dialog'
            >
              <div className='modal-dialog modal-md custom-modal'>
                <button
                  type='button'
                  className='close hidden-xs'
                  data-dismiss='modal'
                >
                  <img
                    className='img-responsive'
                    src='../../images/close-red.svg'
                    alt='icon'
                  />
                </button>
                <div className='modal-content'>
                  <div className='modal-body text-center'>
                    <h3>Warning!</h3>

                    <form className='custom-form row'>
                      <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                        {this.state.response_to_inactive}{' '}
                      </div>

                      <div
                        className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'
                        className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'
                      >
                        <button
                          className='btn btn-lightgray'
                          data-dismiss='modal'
                        >
                          Cancel
                        </button>
                        <span>{'   '}</span>
                        <button
                          className='btn btn-green'
                          type='button'
                          onClick={() => {
                            this.deleteCustomer(3)
                          }}
                        >
                          Make Inactive
                        </button>
                      </div>
                      {/* <div className='mymsg'>{this.state.modal_info_msg}</div> */}
                    </form>
                  </div>
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
export default VendorDetails
