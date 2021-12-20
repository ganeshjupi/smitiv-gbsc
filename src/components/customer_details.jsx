import React from 'react'
import LeftSidebar from './left_sidebar'
import Footer from './footer'

import Topbar from './topbar'

import FetchAllApi from '../api_links/fetch_all_api';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from 'html2canvas';
import axios from 'axios';
import moment from 'moment'
import jQuery from 'jquery'
// import 'bootstrap';
// import 'bootstrap-select';

const role_permissions = JSON.parse(localStorage.getItem('role_permissions'))

class CustomerDetails extends React.Component {
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
      customerListArray: [],
      TotalPages: [],
      pgNo: '10',
      customer_Transaction: [],
      Recent_items: [],
      Recent_items_payment: [],
      Basic_info: [],
      customerDetails: [],
      table_Rows: '',
      statement: '',
      totalBal: '',
      fromDate: '2020-01-01',
      toDate: new Date(),
      isSuccessful: false,
      res_msg: '',
      isWarning: false,
      customer_name: '',
      response_to_inactive: '',
      status_infoLists: [],
      role_permissions: JSON.parse(localStorage.getItem('role_permissions')) || [],
      incorporation_date: localStorage.getItem("incorporation_date"),
      response_statement: '',
      salesDefaultAccountsList: [],
      serviceList: [],
      totalbalance:[],
    }
  }


  saveAsPdf = () => {

    let Input = {
      client_id: this.state.logged_client_id,
      customer_id: this.props.location.state,
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

    FetchAllApi.print_pdf(Input, 'customer_statement', (err, response) => {
      if (response.status === 1) {
        alert(response.message)
        window.open(response.file_path);
      } else {
      }
      alert(response.message)
    });

  };




  printDocument() {
    const input = document.getElementById("table-to-xls");
    html2canvas(input)
      .then((canvas) => {
        var imgWidth = 200;
        var pageHeight = 290;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4')
        var position = 0;
        var heightLeft = imgHeight;
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        pdf.save("download.pdf");
      });
  }

  getFilteredOnDate_transcation = () => { }
  deleteCustomer = statuscode => {

    let client_id = this.state.logged_client_id
    let customer_id = this.props.location.state
    // 0 for delete customer
    let status_to_set = statuscode

    FetchAllApi.deleteCustomer(
      client_id,
      customer_id,
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
                this.props.history.push('/customers-list')
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


  makeActive = () => {
    alert('are u sure')
    let client_id = this.state.logged_client_id
    let customer_id = this.props.location.state
    FetchAllApi.makeActive(
      client_id,
      customer_id,

      (err, response) => {
        if (response.status === 1) {
          alert(response.message)
          this.props.history.push('/customers-list')
        } else {
        }
      }
    )
  }
  createNotes = () => {
    let customer_id = this.props.location.state
    let client_id = this.state.logged_client_id
    let job_id = Number('0')
    // alert(typeof job_id)
    let contacts = jQuery('#contact_notes').val()
    let notes = jQuery('#note_notes').val()
    let note_name = jQuery('#tittle_notes').val()
    let user_id = localStorage.getItem('logged_user_id')

    FetchAllApi.createNotes(
      client_id,
      customer_id,
      contacts,
      notes,
      job_id,
      note_name,
      user_id,
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
  deleteNote = (id) => {
    let note_id = id
    let client_id = this.state.logged_client_id

    FetchAllApi.deleteNote(note_id, client_id,
      (err, response) => {
        if (response.status === 1) {

          this.getNotes()
        } else {
          alert(response.message)
        }
      }
    )
  }
  updateNotes = () => {


    let customer_id = this.props.location.state
    let client_id = this.state.logged_client_id
    let job_id = Number('0')
    // alert(typeof job_id)
    let contacts = jQuery('#contact_notes1').val()
    let notes = jQuery('#note_notes1').val()
    let note_name = jQuery('#tittle_notes1').val()
    let user_id = localStorage.getItem('logged_user_id')
    let note_id = jQuery('#hiddenJobId').val()
    FetchAllApi.updateNotes(
      client_id,
      customer_id,
      contacts,
      notes,
      job_id,
      note_name,
      user_id, note_id,
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
  // changedatevalue(seleteddateformat) {
  //   // debugger
  //   var dateresult = moment()
  //   let from_date, to_date

  //   if (seleteddateformat === 'This Month-to-date') {
  //     let from_date = dateresult.startOf('month')
  //     let val1 = from_date.format("YYYY-MM-DD");
  //     let val2 = moment(new Date()).format("YYYY-MM-DD");
  //     // alert(from_date.format('YYYY-MM-DD'))
  //     this.setState(
  //       {
  //         fromDate: val1,
  //         toDate: val2
  //       },
  //       () => {
  //         this.customer_details()
  //       }
  //     )
  //   } else if (seleteddateformat === 'This Week') {
  //     let from_date = dateresult.startOf('week')

  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     let val1 = from_date.format('YYYY-MM-DD')
  //     let to_date = dateresult.endOf('week')

  //     // from_date = dateresult.startOf('week')
  //     this.setState(
  //       {
  //         fromDate: val1,
  //         toDate: to_date
  //       },
  //       () => {
  //         this.customer_details()
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
  //         this.customer_details()
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
  //         this.customer_details()
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
  //         this.customer_details()
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
  //         this.customer_details()
  //       }
  //     )
  //   }
  //   // let startDate = jQuery('#fromdate').val()
  //   // let end_date = jQuery('#todate').val()
  //   // this.setState({ start_date: startDate, end_date: end_date }, () => {
  //   // })
  // };


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
      this.customer_details();
      this.statement(this.state.show_id)
    } else if (seleteddateformat === "This Week") {
      from_date = dateresult.startOf("week");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("week");
      // document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.toDate = to_date.format("YYYY-MM-DD");
      this.customer_details();
      this.statement(this.state.show_id)
    } else if (seleteddateformat === "This Month") {
      from_date = dateresult.startOf("month");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("month");
      // document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.toDate = to_date.format("YYYY-MM-DD");
      this.customer_details();
      this.statement(this.state.show_id)
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
      this.customer_details();
      this.statement(this.state.show_id)
    } else if (seleteddateformat === "This Year") {
      from_date = dateresult.startOf("year");
      // document.getElementById("fromdate").value = from_date.format(
      //   "DD-MM-YYYY"
      // );
      this.state.fromDate = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("year");
      // document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.toDate = to_date.format("YYYY-MM-DD");
      this.customer_details();
      this.statement(this.state.show_id)
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
      this.customer_details();
      this.statement(this.state.show_id)
    }

    if (seleteddateformat == "ALL") {
      this.setState(
        {
          fromDate: this.state.incorporation_date,
          toDate: moment().add(1, 'day').format("YYYY-MM-DD"),
        },
        () => {
          this.customer_details();
          this.statement(this.state.show_id)
        }
      );
      // document.getElementById("fromdate").value = "";
      // document.getElementById("todate").value = "";
    }
  }
  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  };

  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass('minimize_leftbar')

    jQuery('title').html('Customer | GBSC')

    if (
      this.state.logged_user_id === '' ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push('/')
    }

    // this.get_inbox_list()
  }

  routedChange(parameter) {
    this.props.history.push('/' + parameter)
    window.scrollTo(0, 0)
  };


  status_info = () => {
    FetchAllApi.status_info(this.state.logged_client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ status_infoLists: response.lists })
      } else {
        this.setState({ status_infoLists: [] })
      }
    })
  }

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
        localStorage.setItem("job_added", "");
        alert("new job is added...");
        // this.customerjoblist(myvar, newlyCreatedID);
        this.getJobList()

      }
    }, 3000);
  };

  componentDidMount() {
    this.customer_details()
    this.Recent_Items()
    this.Basic_info()
    this.getJobList()
    this.getNotes()
    this.formatDate()
    this.statement()
    this.status_info();
    this.defaultcategorylist_onchange();
    this.getItems();

    this.watchJobAdded()

    window.jQuery(".select-picker").selectpicker();

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

  formatDate = () => {

    let format = new Date()
    let date = format.getDate()
    let month = format.getMonth() + 1
    let year = format.getFullYear()

    let endDate = year + "-" + month + "-" + date
    return endDate

  }

  customer_details = (id) => {
    let client_id = this.state.logged_client_id
    let customer_id = this.props.location.state

    let fromDate = this.state.fromDate
    let toDate = this.state.toDate
    let show_id;
    if (id == undefined) {
      show_id = 1;
      this.setState({ show_id })
    } else {
      show_id = id;
      this.setState({ show_id })
    }

    FetchAllApi.customer_Transaction(
      client_id,
      customer_id,
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


  Basic_info = () => {
    let client_id = this.state.logged_client_id
    let customer_id = this.props.location.state

    FetchAllApi.Basic_info(client_id, customer_id, (err, response) => {
      if (response.status === 1) {
        this.setState({
          Basic_info: response.response,
          customerDetails: response.updatelist,
          customer_name: response.response[0].customer_name
        })
      } else {
      }
    })
  }

  Recent_Items = () => {
    let client_id = this.state.logged_client_id
    let customer_id = this.props.location.state

    FetchAllApi.Recent_Items(client_id, customer_id, (err, response) => {
      // alert(response.response.length)
      if (response.status === 1) {
        this.setState({ Recent_items: response.response, Recent_items_payment: response.payment })
      } else {
      }
    })
  }


  statement = (id) => {
    let client_id = this.state.logged_client_id
    let customer_id = this.props.location.state
    let from_date = this.state.fromDate
    let to_date = this.state.toDate
    let show_id;
    if (id == undefined) {
      show_id = 1;
    } else {
      show_id = id;
    };

    FetchAllApi.Statement(
      client_id,
      customer_id,
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
            totalbalance:response.total_balance_by_currency
          })
        } else {
          this.setState({
            statement: [],
            totalBal: '',
            response_statement: '',
          })
        }
      }
    )
    console.log(this.state.response_statement);
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

  getItems = (text, id) => {
    var client_id = this.state.logged_client_id;
    let from_settings = 1
    FetchAllApi.sales_product_item_list(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ serviceList: response.list });
      }
    });
  };

  getNotes = search => {
    let customer_id = this.props.location.state
    let client_id = this.state.logged_client_id
    let Search_value = search
    let job_id = 0

    FetchAllApi.getNotes(
      client_id,
      customer_id,
      Search_value,
      job_id,
      (err, response) => {
        if (response.status === 1) {
          this.setState({
            notesArray: response.response
          })
        } else {
          this.setState({
            notesArray: []
          })
        }
      }
    )
  }
  getJobList = () => {
    let customer_id = this.props.location.state
    let client_id = this.state.logged_client_id
    FetchAllApi.getJobList(client_id, customer_id, (err, response) => {
      if (response.status === 1) {
        let items = response.response

        const renderJobList = items => {
          return items.map(item => {
            return (
              <React.Fragment>
                <tr
                  className='item-step1'
                  // onClick={() => {alert(item.job_id)}}
                  // onClick={() =>
                  //   this.props.history.push('/Customer-Job-Details', [
                  //     item.customer_id,
                  //     item.job_id
                  //   ])
                  // }
                  onClick={() => {
                    let client_id = this.state.logged_client_id;
                    let customer_id = item.customer_id
                    let job_id = item.job_id

                    FetchAllApi.Basic_info_job(
                      client_id,
                      customer_id,
                      job_id,
                      (err, response) => {
                        if (response.status === 1) {

                          this.props.history.push("/edit-job", {
                            ...response.updatelist
                          })

                        } else {
                          alert('job details getting not came')
                        }
                      }
                    );
                  }
                  }
                >
                  <td className=''>
                    <span>{item.job_name}</span>
                  </td>
                  <td className=''>
                    <span>{item.currency}</span>
                  </td>
                  <td className=''>
                    <span>{item.recievableamount}</span>
                  </td>
                  <td className=''>
                    <span>{item.creditamount}</span>
                  </td>
                </tr>
                {item.children ? renderJobList(item.children) : null}
              </React.Fragment>
            )
          })
        }

        let table_Rows = renderJobList(items)
        this.setState({ table_Rows: table_Rows })
      } else {
      }
    })
  }

  render() {
    let customer_id = this.props.location.state
    console.log(this.state.response_statement, this.state.totalbalance)
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
                <a href='javascript:;' class='back hidden-xs'>
                  <img
                    src='../images/back-arrow-blue.svg'
                    onClick={() => {
                      this.props.history.push('/customers-list')
                    }}
                  />
                </a>
                {/* <span className='page-title hidden-xs'>Inbox</span> */}
                <ul className='list-unstyled breadcrumb page-title hidden-xs'>
                  <li>
                    <a href='javascript: ;'>Customers</a>
                  </li>
                  <li>List Customers</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className='content-top col-md-12 col-xs-12 pad-b-no'>
                <div className='col-md-12 col-xs-12'>
                  <div className='row'>
                    <h4 className='fw-sbold mar-t-no pull-left hidden-xs'>
                      {this.state.customer_name}
                    </h4>
                    <div className='pull-right mob-xs-flft'>
                      <button
                        // disabled={role_permissions.includes(18) ? true : false}
                        className='btn btn-white pull-left mar-rgt-5'
                        onClick={() => {
                          // this.state.role_permissions.includes(17) ? (
                          this.props.history.push('/add-new-customer', {
                            ...this.state.customerDetails, customer_id
                          })
                          // ) : alert("permission required")
                        }}
                      >
                        Edit
                      </button>
                      {/* <div className='dropdown menu-item pull-left mar-rgt-5'>
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
                              this.state.role_permissions.includes(19) ? (
                                this.deleteCustomer(0)) : alert("required permission")
                            }}
                          >
                            <a href='javascript:;'>Delete</a>
                          </li>
                          <li
                            onClick={() => {
                              this.props.history.push('/add-job', [
                                this.props.location.state,
                                0
                              ])
                            }}
                          >
                            <a href='javascript:;'>Add Customer Job</a>
                          </li>
                          <li
                            onClick={() => {
                              this.makeActive()
                            }}
                          >
                            <a href='javascript:;'>Make Customer active </a>
                          </li>
                        </ul>
                      </div>
                    
                     */}


                      <div className="dropdown menu-item new-cus pull-left mar-rgt-5">

                        <a
                          href="javascript"
                          class="dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <button
                            className='btn btn-white '
                            type='button'

                          >
                            More
                                        <span className='caret' />
                          </button>
                        </a>
                        <ul className="dropdown-menu">

                          <li
                            onClick={() => {
                              // this.state.role_permissions.includes(19) ? (
                              this.deleteCustomer(0)
                              // )
                              //  : alert("required permission")
                            }}
                          >
                            <a href='javascript:;'>Delete</a>
                          </li>
                          <li
                            onClick={() => {
                              localStorage.setItem("selected_customer_id", this.props.location.state);
                              let win = window.open("/add-job", "_blank");
                              win.focus();
                              // this.props.history.push('/add-job', [
                              //   this.props.location.state,
                              //   0
                              // ])
                            }}
                          >
                            <a href='javascript:;'>Add Customer Job</a>
                          </li>
                          {/* <li
                            onClick={() => {
                              this.makeActive()
                            }}
                          >
                            <a href='javascript:;'>Make Customer active</a>
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
                            <a href='/create_invoice'>Create Invoices</a>
                          </li>
                          <li>
                            <a href='/create_estimate'>Create Quotations</a>
                          </li>
                          <li>
                            <a href='/create_salesorder'>Create Sales Orders</a>
                          </li>
                          <li>
                            <a href='/Customer_receive_payment'>Receive Payments</a>
                          </li>
                          {/* <li>
                            <a href='javascript:;'>Make Deposit</a>
                          </li> */}
                          {/* <li>
                            <a href='javascript:;'>Enter Statement Charge</a>
                          </li> */}
                          <li>
                            <a href='/create_creditmemo'>
                              Create Credit Memos
                            </a>
                          </li>
                          {/* <li>
                            <a href='javascript:;'>Create Statements</a>
                          </li> */}
                          {/* <li>
                            <a href='javascript:;'>Assess Finance Charge</a>
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
                      <li role='presentation'>
                        <a data-toggle='tab' href='#job-list'>
                          Jobs List
                        </a>
                      </li>
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
                      {this.state.Basic_info &&
                        this.state.Basic_info.map((item, i) => {
                          return (
                            <React.Fragment>
                              <div className='row dflex mar-btm'>
                                <div className='col-md-6 col-xs-12'>
                                  <h4 className='info-title'>Overview</h4>
                                  <div className='col-md-12 info-block'>
                                    <div className='row text-right'>
                                      {/* <a className='edit' onClick={() => {
                                        this.props.history.push('/add-new-customer', {
                                          ...this.state.customerDetails
                                        })
                                      }}>
                                        Edit
                                      </a> */}
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Company Name
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.company_name != '' &&
                                          item.company_name != undefined
                                          ? item.company_name
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4 col-sm-12 col-xs-12  sub'>
                                        Customer Type
                                      </span>
                                      <span className='col-md-8 col-sm-12 col-xs-12  main'>
                                        {item.customer_type != '' &&
                                          item.customer_type != undefined
                                          ? item.customer_type
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Business Reg No.
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.bus_reg != '' &&
                                          item.bus_reg != undefined
                                          ? item.bus_reg
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Currency
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.currency != '' &&
                                          item.currency != undefined
                                          ? item.currency
                                          : '--'}
                                      </span>
                                    </div>
                                    {/* <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Opening Balance
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.opening_balance != '' &&
                                          item.opening_balance != undefined
                                          ? item.opening_balance
                                          : '--'}
                                      </span>
                                    </div> */}
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Website
                                      </span>
                                      <span className='col-md-8 col-sm-12 col-xs-12  main'>
                                        <a href='javascript:;'>
                                          {item.website != '' &&
                                            item.website != undefined
                                            ? item.website
                                            : '--'}
                                        </a>
                                      </span>
                                    </div>
                                    <hr />

                                    {item.contact_details.length > 0 && (
                                      <React.Fragment>
                                        <div className='row mar-btm'>
                                          {item.contact_details && (
                                            <React.Fragment>
                                              <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                                Contact Persons
                                              </span>
                                              <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                                {item.contact_details.map(
                                                  (a, b) => {
                                                    // alert(b)
                                                    return (
                                                      <React.Fragment>
                                                        {
                                                          (a.is_primary = 1 && (
                                                            <label className='label label-danger'>
                                                              Primary
                                                            </label>
                                                          ))
                                                        }
                                                        <br />
                                                        {a.name}
                                                        <span>
                                                          <a href='tel:(713)-090-0558'>
                                                            {a.phone_work}
                                                          </a>
                                                        </span>
                                                        <span>
                                                          <a href='tel:(842)-294-8453'>
                                                            {a.phone_personal}
                                                          </a>
                                                        </span>
                                                        <span>
                                                          <a href='mailto:johndoe.fifthrouge@gmail.com'>
                                                            {a.email}
                                                          </a>
                                                        </span>
                                                        <br />
                                                      </React.Fragment>
                                                    )
                                                  }
                                                )}
                                              </span>
                                              <br />
                                            </React.Fragment>
                                          )}
                                        </div>
                                      </React.Fragment>
                                    )}

                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Billing Address
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.company_name}
                                        <span>
                                          {item.billing_address != '' &&
                                            item.billing_address != undefined
                                            ? item.billing_address
                                            : '--'}
                                        </span>
                                      </span>
                                    </div>
                                    {/* <div className='row'>
                                      <span className='col-md-4 sub'>
                                        Shipping Address
                                      </span>
                                      <span className='col-md-8 main'>
                                        {item.company_name}
                                        <span>{item.shipping_address}</span>
                                      </span>
                                    </div> */}
                                    {/* {item.address_details.length > 0 && ( */}
                                    <div className='row'>
                                      <span className='col-md-4 col-sm-12 col-xs-12  sub'>
                                        Shipping Address
                                        </span>

                                      {/* {item.address_details &&
                                          item.address_details.map((x, y) => {
                                            return ( */}
                                      <span className='col-md-8 col-sm-12 col-xs-12  main'>
                                        {item.company_name}
                                        <span>
                                          {item.shipping_address}
                                        </span>
                                      </span>
                                      {/* )
                                          })} */}
                                    </div>
                                    {/* )} */}
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
                                        <strong className='title'>
                                          Success!
                                        </strong>
                                        {this.state.res_msg}
                                      </div>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </div>
                                <div className='col-md-6 col-xs-12'>
                                  <h4 className='info-title'>
                                    Finance Details
                                  </h4>
                                  <div className='col-md-12 info-block'>
                                    <div className='row text-right'>
                                      {/* <a className='edit' onClick={() => {
                                        this.props.history.push('/add-new-customer', {
                                          ...this.state.customerDetails
                                        })
                                      }}>
                                        Edit
                                      </a> */}
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Bank Acc No.
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.bank_account_no != '' &&
                                          item.bank_account_no != undefined
                                          ? item.bank_account_no
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Credit Limit
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.creditlimit != '' &&
                                          item.creditlimit != undefined
                                          ? item.creditlimit
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Price Level
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.price_level != '' &&
                                          item.price_level != undefined
                                          ? item.price_level
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Payment Terms
                                      </span>
                                      <span className='col-md-8 col-sm-12 col-xs-12  main'>
                                        {item.payment_terms != '' &&
                                          item.payment_terms != undefined
                                          ? item.payment_terms
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Delivery Method
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.delivery_method != '' &&
                                          item.delivery_method != undefined
                                          ? item.delivery_method
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Payment Method
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.payment_method != '' &&
                                          item.payment_method != undefined
                                          ? item.payment_method
                                          : '--'}
                                      </span>
                                    </div>
                                    <hr />
                                    <div className='row mar-btm'>
                                      <span className='col-md-12 col-xs-12 sub-title'>
                                        Sales Information
                                      </span>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Tax
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.sales_tax != '' &&
                                          item.sales_tax != undefined
                                          ? item.sales_tax
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Default Service Items
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {this.state.serviceList.map((def) => {
                                          if (item.sales_default == def.item_id) {
                                            return def.item_name
                                          } else {
                                            return null
                                          }
                                        })}
                                      </span>
                                    </div>
                                    {/* <hr />
                                    <div className='row mar-btm'>
                                      <span className='col-md-12 col-xs-12 sub-title'>
                                        Purchase Information
                                      </span>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Tax
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.purchase_tax}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Default Account
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                      {this.state.salesDefaultAccountsList.map((def)=>{
                                        if(item.purchase_default ==def.id ){
                                            return def.name
                                        }else{
                                          return null
                                        }
                                          })}
                                      </span>
                                    </div> */}
                                    <hr />
                                    <div className='row mar-btm'>
                                      <span className='col-md-12 col-xs-12 sub-title'>
                                        Tax Information
                                      </span>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Tax ID
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.taxID != '' &&
                                          item.taxID != undefined
                                          ? item.taxID
                                          : '--'}
                                      </span>
                                    </div>
                                    {/* <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Default Sales Tax
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.default_sales_tax != '' &&
                                          item.default_sales_tax != undefined
                                          ? item.default_sales_tax
                                          : '--'}
                                      </span>
                                    </div> */}
                                    {/* <div className='row'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Default Purchase Tax
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.default_purchase_tax != '' &&
                                          item.default_purchase_tax != undefined
                                          ? item.default_purchase_tax
                                          : '--'}
                                      </span>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className='row dflex'>
                                <div className='col-md-6 col-xs-12'>
                                  <h4 className='info-title'>
                                    Additional Information
                                  </h4>
                                  <div className='col-md-12 info-block'>
                                    <div className='row text-right'>
                                      {/* <a href='javascript:;' className='edit' onClick={() => {
                                        this.props.history.push('/add-new-customer', {
                                          ...this.state.customerDetails
                                        })
                                      }}>
                                        Edit
                                      </a> */}
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Referral From
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.referral_from != '' &&
                                          item.referral_from != undefined
                                          ? item.referral_from
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md- col-sm-12 col-xs-12  sub'>
                                        Rep
                                      </span>
                                      <span className='col-md-8 col-sm-12 col-xs-12  main'>
                                        {item.rep != '' && item.rep != undefined
                                          ? item.rep
                                          : '--'}
                                      </span>
                                    </div>
                                    <hr />
                                    <div className='row mar-btm'>
                                      <span className='col-md-12 col-xs-12 sub-title'>
                                        Job Information
                                      </span>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Type
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.job_type != '' &&
                                          item.job_type != undefined
                                          ? item.job_type
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Status
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {this.state.status_infoLists.map((sta) => {
                                          if (item.job_status != '' &&
                                            item.job_status != undefined) {
                                            if (sta.id == item.job_status) {
                                              return sta.name
                                            }

                                          } else {
                                            return null
                                          }
                                        })}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Start Date
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.job_start_date != '' &&
                                          item.job_start_date != undefined
                                          ? item.job_start_date
                                          : '--'}
                                      </span>
                                    </div>
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        End Date
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.job_end_date != '' &&
                                          item.job_end_date != undefined
                                          ? item.job_end_date
                                          : '--'}
                                      </span>
                                    </div>
                                    {/* <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Project End Date
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        {item.job_project_end_date != '' &&
                                          item.job_project_end_date != undefined
                                          ? item.job_project_end_date
                                          : '--'}
                                      </span>
                                    </div> */}
                                    <div className='row mar-btm'>
                                      <span className='col-md-4  col-sm-12 col-xs-12 sub'>
                                        Job Description
                                      </span>
                                      <span className='col-md-8  col-sm-12 col-xs-12 main'>
                                        <span>
                                          {item.job_desc != '' &&
                                            item.job_desc != undefined
                                            ? item.job_desc
                                            : '--'}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          )
                        })}
                    </div>

                    <div id='job-list' className='tab-pane fade in active'>
                      <div className='report-table col-md-12 col-xs-12 pad-no'>
                        <div className='table-responsive'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>Jobs List</th>
                                <th>Currency</th> <th>Receivable</th>
                                <th>Credits</th>
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

                    <div id='transaction' className='tab-pane fade in'>
                      <div className='report-setting'>
                        <form className='custom-form form-inline'>
                          <div className='form-group mar-rgt'>
                            <label>Show</label>
                            <div className="form-cont" >
                              <select
                                className="selectpicker form-control hh "
                                onChange={e =>
                                  this.customer_details(e.target.value)
                                }
                              >

                                <option value="1">ALL</option>
                                <option value="2">Invoices</option>
                                <option value="3">Sales orders</option>
                                <option value="4">Quotations</option>
                                <option value="5">Credit memo</option>
                              </select>
                            </div>
                          </div>
                          {/* <div className='form-group mar-rgt'>
                            <label>Filter</label>
                            <div className="form-cont" >
                            <select
                              className="selectpicker form-control hh "
                              onChange={e =>
                                this.changedatevalue(e.target.value)
                              }
                            >
                              
                              <option  value="1">ALL</option>
                              <option value="2">Invoices</option>
                              <option value="3">Sales orders</option>
                              <option value="4">Quotations</option>
                              <option value="5">Credit memo</option>
                            </select>
                          </div>
                          </div> */}
                          <div className='form-group mar-rgt'>
                            <label>Date</label>
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
                                  <a href='javascript:;'><ReactHTMLTableToExcel
                                    table="table-to-xls"
                                    filename="customerlist"
                                    sheet="tablexls"
                                    buttonText="Export as Excel"
                                  /></a>
                                </li>
                                <li>
                                  <a href='javascript:;' onClick={this.printDocument}>Export as PDF</a>
                                </li>
                              </ul>
                            </div> */}
                          </div>
                        </div>
                        <div className='row mar-top pad-top'>
                          {this.state.notesArray != '' &&
                            this.state.notesArray != undefined &&
                            this.state.notesArray.map(item => {
                              return (
                                <div className='col-md-12 col-xs-12 note-item' onClick={() => {
                                  // jQuery('#contact_notes').val(item.contact)
                                  // jQuery('#note_notes').val(item.notes)
                                  // jQuery('#tittle_notes').val(item.note_name)
                                  // window.jQuery('#pop-modal-for-notes').modal('show')

                                }}>
                                  <div className='col-md-1'>
                                    <label className='custom-checkbox'>
                                      <input type='checkbox' name='all' />
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                  <div className='col-md-2'>
                                    <p className='mar-b-no date'>
                                      {item.note_date}
                                    </p>
                                  </div>
                                  <div className='col-md-7'>
                                    <p>{item.note_name}</p>
                                    <span>{item.notes}</span><br />
                                    <span>Contact :{" " + item.contact}</span>
                                  </div>
                                  <div className='col-md-2'>
                                    <span className='by pull-right'>
                                      Created by <br /> {item.created_by}
                                    </span>
                                  </div>
                                  {/* <div className='dropdown menu-item action-item' onClick={() => { }}>
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
                                      <li onClick={() => {
                                        jQuery('#contact_notes1').val(item.contact)
                                        jQuery('#note_notes1').val(item.notes)
                                        jQuery('#tittle_notes1').val(item.note_name)
                                        jQuery('#hiddenJobId').val(item.note_id)


                                        window.jQuery('#pop-modal-for-notesUpdate').modal('show')


                                      }}>
                                        <a href='javascript:;'>Edit</a>
                                      </li>
                                      <li onClick={() => { this.deleteNote(item.note_id) }}>
                                        <a href='javascript:;'>Delete</a>
                                      </li>

                                    </ul>
                                  </div> */}

                                  <div className="dropdown menu-item new-cus">
                                    <input type='hidden' id='hiddenJobId' />
                                    <a
                                      href="javascript"
                                      class="dropdown-toggle"
                                      data-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <button
                                        className='btn btn-green'
                                        type='button'
                                      // data-toggle='dropdown'
                                      >
                                        Action
                                        <span />
                                      </button>
                                    </a>
                                    <ul className="dropdown-menu">

                                      <li onClick={() => {
                                        jQuery('#contact_notes1').val(item.contact)
                                        jQuery('#note_notes1').val(item.notes)
                                        jQuery('#tittle_notes1').val(item.note_name)
                                        jQuery('#hiddenJobId').val(item.note_id)


                                        window.jQuery('#pop-modal-for-notesUpdate').modal('show')


                                      }}>
                                        <a href='javascript:;'>Edit</a>
                                      </li>
                                      <li onClick={() => { this.deleteNote(item.note_id) }}>
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
                                    Last 10 Sales Invoices
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
                                                        {item.opening_balance !=
                                                          '' &&
                                                          item.opening_balance !=
                                                          undefined
                                                          ? item.opening_balance
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
                                              Payment id
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
                                              Account
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
                                            this.state.Recent_items_payment != undefined &&
                                            this.state.Recent_items_payment.map((item) => {
                                              return (
                                                <tr className='item-step1'>
                                                  <td>
                                                    <span>{item.payment_date}</span>
                                                  </td>
                                                  <td>
                                                    <span>{item.payment_id}</span>
                                                  </td>
                                                  <td className='text-right'>
                                                    <span>{item.amount}</span>
                                                  </td>
                                                  <td className='text-right'>
                                                    <span>{item.account}</span>
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
                                <option value="2">Invoices</option>
                                <option value="3">Payments</option>
                              </select>
                            </div>
                          </div>
                        </form>
                        <div className='text-right pad-hor-no'>
                          <button type="button" className='btn btn-empty ico' onClick={() => this.saveAsPdf()}>
                            <img src='images/print-icon.svg' alt='icon' />
                            Print
                          </button>
                          <button type="button" className='btn btn-empty ico' onClick={() => this.saveAsPdf()}>
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
                          {/* <div
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
                            {/* </div>
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
                          </div> */}
                          {/* Template Header Ends here */}
                          {/* Template Content Starts here */}
                          <div
                            style={{
                              float: 'left',
                              width: '100%',
                              padding: '35px'
                            }}
                          >
                            <div style={{'float':'left','width':'100%','padding':'25px','box-sizing': 'border-box'}}>
            <div id="isLogo" style={{'float':'left','display':'flex','align-items':'center'}}>
                <img id="image" style={{'width':'100px'}} src={this.state.response_statement.company_details && this.state.response_statement.company_details.logo_path} alt="logo"/>
            </div>
              <div id="mobDiv" style={{'float': 'right', 'text-align': 'right', 'width': '42%'}}> 
                 <p id="isEntityName" style={{'margin-bottom': '0' ,'display': 'block'}}>{this.state.response_statement.company_details && this.state.response_statement.company_details.entityname}</p>
                 <p id="isAddress" style={{'margin-bottom': '0' ,'display': 'block'}}>{this.state.response_statement.company_details && this.state.response_statement.company_details && this.state.response_statement.company_details.entityaddress}</p>  
                 <p id="isPhoneNumber" style={{'margin-bottom': '0' ,'display': 'block'}}>{this.state.response_statement.company_details && this.state.response_statement.company_details.entityphno}</p>
                 <p id="isEmail" style={{'margin-bottom':'0' ,'display': 'block'}}>{this.state.response_statement.company_details && this.state.response_statement.company_details.entityemail}</p>
                 <p id="isUenNumber" style={{'margin-bottom': '0' ,'display': 'block'}}>{this.state.response_statement.company_details && this.state.response_statement.company_details.entityuen}</p>
                 <p id="isGstNumber" style={{'margin-bottom': '0' ,'display': 'block'}}></p>
              </div>
        </div>
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
                                   Invoice Amount
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
                                          {item.foreign_amount}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: '13px',
                                            padding: '15px 10px'
                                          }}
                                        >
                                          {item.payment_amount_foreign_currency}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: '13px',
                                            padding: '15px 10px',
                                            textAlign: 'right'
                                          }}
                                        >
                                          {item.open_balance_foreign_currency}
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
                                        float: 'left',
                                        width: '80%',
                                        paddingLeft: '20px',
                                        marginTop: '20px'
                                      }}
                                    ></div>  <b> Total Balance Due</b>
                                    <div
                                        style={{
                                          float: 'right',
                                          width: '50%',
                                          padding: '15px 10px',
                                          background: '#EFEFEF',
                                         // borderRadius: '3px'
                                        }}
                                      > 
                                    
                                      {this.state.totalbalance &&
                              this.state.totalbalance.map((item, i) => {
                                return (
                                  <>
                                   
                                     
                                        <div
                                          style={{
                                            float: 'left',
                                            width: '50%',
                                            fontWeight: 600,
                                            textAlign: 'right',
                                            paddingRight: '10px'
                                          }}
                                        >
                                         {item.currency} :
                                        </div>

                                        {/* <div
                                          style={{
                                            textAlign: 'right',
                                            padding: '0 10px',
                                            float: 'right',
                                            width: '50%'
                                          }}
                                        >
                                         
                                        </div> */}
                                        <div
                                          style={{
                                            textAlign: 'right',
                                            padding: '0 10px',
                                            float: 'right',
                                            width: '30%'
                                          }}
                                        >
                                          {item.total_balance}
                                        </div>

                                    
                                    
                                  </>
                                )
                              })                                
                                } 
                                </div>
                                <div  style={{'float':'left','width':'100%','margin-top': '0','padding': '25px', 'box-sizing': 'border-box'}}>
        <div style={{'float':'left','width':'100%'}}>
        <p style={{'margin-bottom': '5px', 'font-weight': 'bold'}}>Thank you message and Banking details</p> 
        <p style={{'margin-top': '0', 'margin-bottom': '15px'}}>{this.state.response_statement.company_details && this.state.response_statement.company_details.thanking_message_and_company_details}</p>
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
                            type='number'
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
                            type='number'
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
export default CustomerDetails
