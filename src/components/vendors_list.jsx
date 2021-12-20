import React from "react";
import LeftSidebar from "./left_sidebar";
import Footer from "./footer";

import Topbar from "./topbar";
import Comma from './comma';

// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from 'html2canvas';
// import axios from 'axios';

import FetchAllApi from "../api_links/fetch_all_api";

// import { PDFtoIMG } from "react-pdf-to-image";

import jQuery from "jquery";
// import 'bootstrap';
// import 'bootstrap-select';

class Vendors_list extends React.Component {
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
      role_permissions: JSON.parse(localStorage.getItem('role_permissions')) || [],
      dropdown: "",
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
      totalrecordcount:0,
      pagecountstart:0,
      pagecountend:0,
      searchtext:''
    };
  }

  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass("minimize_leftbar");
    //console.log("logged_user_id", this.state.logged_user_id);

    // jQuery('title').html('User Inbox | GBSC')

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === "null" ||
      this.state.logged_user_id === "undefined"
    ) {
      this.props.history.push("/");
    }

    // this.get_inbox_list();
  }

  routedChange(parameter,params) { 
    localStorage.setItem("customer_id",params);
    this.props.history.push("/" + parameter);
    window.scrollTo(0, 0);
  }
 
  componentWillUnmount() { }

  componentDidMount() {
    this.getSpecificPage(1, 10);

    //jQuery(".select-picker").selectpicker();

    require("jquery-mousewheel");
    require("malihu-custom-scrollbar-plugin");

    jQuery(".item-listwrap").mCustomScrollbar({
      scrollEasing: "linear",
      scrollInertia: 600,
      scrollbarPosition: "outside"
    });

    jQuery(".label-enclose .label span").click(function () {
      //jQuery('.label-enclose .label').removeClass('active')
      jQuery(this)
        .parent(".label-enclose .label")
        .addClass("active");
    });
    jQuery(".label-enclose .label a").click(function () {
      jQuery(this)
        .parent(".label-enclose .label")
        .removeClass("active");
    });
  }

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


  Basic_info = (id) => {
    let client_id = this.state.logged_client_id
    let vendor_id = id
    FetchAllApi.vendor_basic_info(client_id, vendor_id, (err, response) => {
      console.log('findme', response)

      if (response.status === 1) {
        this.setState({
          response: response,
          Basic_info: response.updatelist,
          customerDetails: response.updatelist
        }, this.sendFunc)
      }

    })
  };

  sendFunc = () => {
    this.props.history.push('/add_new_vendor', {
      ...this.state.customerDetails
    })
  };


  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  };

  deleteCustomer = (statuscode, id) => {
    // alert('hi')
    let client_id = this.state.logged_client_id
    let vendor_id = id ? id : this.state.vendor_id

    // 0 for delete customer
    let status_to_set = statuscode
    this.setState({ vendor_id })
    FetchAllApi.make_vendor_inactive(
      client_id,
      vendor_id,
      status_to_set,

      (err, response) => {
        // alert(response.response.length)
        if (response.status === 1) {
          window.jQuery('#pop_add_notes').modal('hide')
          alert(response.message)
          // this.props.history.push('/customers-list')
          this.setState(
            { isSuccessful: true, res_msg: response.message },
            () => {
              setTimeout(() => {
                this.setState({ isSuccessful: true })
                // this.props.history.push('/Vendors_list')
                this.getSpecificPage(1, 10);
              }, 1500)
            }
          )
        }
        if (response.status === 2 || response.status === 3) {
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


  getSpecificPage = (pageNumber, limitvalue, searchkey) => {
    let client_id = this.state.logged_client_id;
    let page = pageNumber;
    let limit = this.state.selectedLimit;
    let search = searchkey!='' && searchkey !=undefined?this.setState({searchtext:searchkey}):'';
    search=this.state.searchtext;
    
    // let fromDate = "2020-01-01";
    // let toDate = "2020-01-31";


    // alert(this.state.logged_client_id)
    FetchAllApi.getVendorList(
      client_id,
      page,
      limit,
      search,
      // fromDate,
      // toDate,
      parseInt(this.state.selected_filter_id),
      (err, response) => {
        console.log("vendor_list", response);
        if (response.status === 1) {
          let customerListArray = response.list;
          //  let totalPagesCount = new Array(parseInt( response.TotalPages))
          var totalPagesCount = [];
          for (var i = 1; i <= response.total_page; i++) {
            totalPagesCount.push(i);
          }
          this.setState({
            customerListArray: customerListArray,
            TotalPages: totalPagesCount,
            selectedLimit: this.state.selectedLimit,
            totalPagesCount: response.TotalPages,
            totalrecordcount:response.total_vendor_count
          });
        } else {
          this.setState({
            customerListArray: [],
            TotalPages: '',
            pgNo: '',
            totalPagesCount: ''
          })
        }
      }
    );
    let pagenumber=pageNumber===''?1:pageNumber;
    this.setState({pagecountstart: pagenumber===1?1:this.state.pagecountend+1,pagecountend:limit*pagenumber});
  };

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

  render() {
    console.log("totalPagesCount", this.state.TotalPages);

    let get_file_path,
      dis_file_path = [],
      item_file_path = [],
      attach_file_path,
      options = [],
      page_no = 1,
      items_limit = 10,
      no_items;

    //console.log('response_stus',this.state.response_stus);

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
            <LeftSidebar history={this.props.history} pageSubmit={e => this.pageLink(e)} />

            <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
              <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <div className="nav-brand-res visible-xs">
                  <img
                    className="img-responsive"
                    src="../images/logo-icon.png"
                    alt="LogoIcon"
                  />
                </div>
                <a href="javascript:;" class="back hidden-xs" onClick={() => this.props.history.goBack()}>
                  <img src="../images/back-arrow-blue.svg" />
                </a>
                {/* <span className='page-title hidden-xs'>Inbox</span> */}
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li>
                    <a
                      href="javascript: ;"
                      onClick={this.routedChange.bind(this, "Vendors_list")}
                    >
                      Vendors
                    </a>
                  </li>
                  <li>Vendors List</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>
              <div className="content-top col-md-12 col-xs-12">
                <h4 className="fw-sbold mar-t-no">Vendors List</h4>
                <div className="custom-form form-inline col-md-12 col-xs-12 h-small pad-top">
                  <div className="row">
                    <div className="form-group mar-rgt">
                      <select
                        className="selectpicker form-control hh "
                        onChange={e => { this.setState({ selected_filter_id: e.target.value }, () => { this.getSpecificPage() }) }}
                      >
                        <option value='1'>Active vendors</option>

                        <option value='2'>All vendors</option>

                        <option value='3'>Inactive vendors</option>
                      </select>
                    </div>
                    {/* <div className="btn-group">
                      <button type="button" className="btn btn-white">
                        Import
                      </button>
                      <button
                        type="button"
                        className="btn btn-white menu-item pad-no"
                      >
                        <div
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Export
                        </div>
                        <ul className="dropdown-menu align-right">
                          <li>
                            <a href="javascript:;" onClick={this.printDocument}>

                              Export as PDF</a>
                          </li>
                          <li>
                            <a href="javascript:;"><ReactHTMLTableToExcel
                              table="table-to-xls"
                              filename="vendorlist"
                              sheet="tablexls"
                              buttonText="Export as Excel"
                            /></a>
                          </li>
                        </ul>
                      </button>
                    </div>
                  
                   */}
                    <button
                      className="btn btn-blue add-new pull-right"
                      onClick={() => {
                        this.props.history.push("/add_new_vendor");
                      }}
                    >
                      <img
                        className="filter-white"
                        src="../images/plus-add.svg"
                        alt="icon"
                      />
                      Add New Vendor
                    </button>
                  </div>
                </div>
              </div>

              <div className="main-content col-md-12 col-xs-12">
                <div className="content-sec cus-list col-md-12 col-xs-12 pad-no mar-t-no">
                  <div>
                    <form className="custom-form form-inline h-small">
                      <div className="form-group search-box mar-rgt">
                        <input
                          type="text"
                          name="search"
                          className="form-control"
                          placeholder="Search..."
                          autocomplete="off"
                          onInput={event =>
                            this.getSpecificPage("", this.state.selectedLimit, event.target.value)
                          }
                        />
                      </div>
                      <div className="form-group pull-right">
                        <label>Show per page</label>
                        <div className="custom-select-drop dropdown">
                          <a
                            aria-expanded="false"
                            aria-haspopup="true"
                            role="button"
                            data-toggle="dropdown"
                            className="dropdown-toggle btn form-control"
                            href="javascript:;"
                          >
                            <span id="selected"> </span> {this.state.selectedLimit}
                            <span className="caret" />
                          </a>
                          <ul className="dropdown-menu align-right minw-unset">
                            {/* <li className="active"><a href="javascript:;">1</a></li>  */}
                            <li onClick={() => { this.setState({ selectedLimit: 2 }, () => { this.getSpecificPage('', 2) }) }}>
                              <a href="javascript:;">2</a>
                            </li>
                            <li onClick={() => { this.setState({ selectedLimit: 4 }, () => { this.getSpecificPage('', 4) }) }}>
                              <a href="javascript:;">4</a>
                            </li>
                            <li onClick={() => { this.setState({ selectedLimit: 6 }, () => { this.getSpecificPage('', 6) }) }}>
                              <a href="javascript:;">6</a>
                            </li>
                            <li onClick={() => { this.setState({ selectedLimit: 8 }, () => { this.getSpecificPage('', 8) }) }}>
                              <a href="javascript:;">8</a>
                            </li>
                            <li onClick={() => { this.setState({ selectedLimit: 10 }, () => { this.getSpecificPage('', 10) }) }}>
                              <a href="javascript:;">10</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="list-table col-md-12 col-xs-12 pad-no">
                    <div
                      className="cus-table-responsive"
                      style={{ paddingRight: "1px" }}
                    >
                      <table className="table" id="table-to-xls">
                        <thead>
                          <tr>
                            <th className="checkbox-td">
                              <label className="custom-checkbox">
                                <input type="checkbox" name="all" />
                                &nbsp;
                                <span className="checkmark" />
                              </label>
                            </th>
                            <th>Vendor Name</th>
                            <th>Currency</th>
                            <th className="text-right">Billing Rate Level</th>
                            <th className="text-right">payables</th>
                            <th className="text-right">Credits</th>
                            <th className="action-td" />
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.customerListArray &&
                            this.state.customerListArray.map((item, i) => {
                              return (
                                <tr

                                >
                                  <td className="checkbox-td">
                                    <label className="custom-checkbox">
                                      <input type="checkbox" name="all" />
                                      &nbsp;
                                      <span className="checkmark" />
                                    </label>
                                  </td>
                                  {/* <td 
                                  onClick={() => {
                                    this.state.role_permissions.includes(21) ? (
                                      this.props.history.push(
                                        "/vendor_details",
                                        item.vendor_id
                                      )) : alert("Required permission")
                                  }}>
                                    <span className="fw-med">
                                      {item.company_name}
                                    </span>
                                  </td> */}
                                  <td className="cont-detail" onClick={() => {
                                    this.state.role_permissions.includes(21) ? (
                                      this.props.history.push(
                                        "/vendor_details",
                                        item.vendor_id
                                      )) : alert("Required permission")
                                  }} >
                                    <span className="fw-med">
                                      {item.vendor_name}
                                    </span>
                                    <span>
                                      <a
                                        className="number"
                                        href="tel:+91 9865 76796"
                                      >
                                        {item.vendor_phone}
                                      </a>
                                    </span>
                                    <span>
                                      <a href="mailto:jeffery.stanley@example.com">
                                        {item.vendor_email}
                                      </a>
                                    </span>
                                  </td>
                                  <td onClick={() => {
                                    this.state.role_permissions.includes(21) ? (
                                      this.props.history.push(
                                        "/vendor_details",
                                        item.vendor_id
                                      )) : alert("Required permission")
                                  }}>{item.currency}</td>
                                  <td className="text-right"><Comma value={item.billing_rate_level} /></td>
                                  <td className="text-right"><Comma value={item.payables} /></td>
                                  <td className="text-right"><Comma value={item.creditamount} /></td>
                                  <td className="action-td">
                                    <div className="dropdown menu-item new-cus">
                                      <button
                                        className="btn btn-green dropdown-toggle"
                                        type="button"
                                        data-toggle="dropdown"
                                      >
                                        Action
                                        <span className="caret" />
                                      </button>
                                      <ul className="dropdown-menu align-right">
                                        <li>
                                          <a onClick={() => {
                                            this.state.role_permissions.includes(20) ? (
                                              this.Basic_info(item.vendor_id)) : alert('Required permission')
                                          }} >Edit</a>
                                        </li>
                                        <li onClick={() => {

                                          this.state.role_permissions.includes(22) ? (
                                            this.deleteCustomer(0, item.vendor_id)) : alert("Required permission")
                                        }}>
                                          <a href="javascript:;">Delete</a>
                                        </li>
                                        <li onClick={() => {
                                          if (item.status == 1) {
                                            this.deleteCustomer(2, item.vendor_id)
                                          } else {
                                            this.deleteCustomer(1, item.vendor_id)
                                          }
                                          // this.state.role_permissions.includes(22) ? (
                                          //   this.deleteCustomer(0, item.vendor_id)) : alert("Required permission")
                                        }}>
                                          <a href="javascript:;">
                                            Make {item.status == 1 ? 'Inactive' : 'active'}
                                          </a>
                                        </li>
                                        <hr />
                                        <li>
                                          <a href="/write_cheque">
                                            Write cheque
                                          </a>
                                        </li>
                                        {/* <li>
                                          <a href="/data_tagging/:list_id/:file_id">
                                            Enter Bills
                                          </a>
                                        </li> */}
                                        {/* <li>
                                          <a href='/data_tagging/:list_id/:file_id'>Enter Credit</a>
                                        </li> */}
                                        <li>
                                          <a href="/vendor_bill_payment">
                                            Pay Bills
                                          </a>
                                        </li>
                                        <li>
                                        <a    onClick={this.routedChange.bind(this, 'create_purchaseorder',item.vendor_id)} >
                                          {/* <a href="/create_purchaseorder"> */}
                                            Create Purchase orders
                                          </a>
                                        </li>
                                        {/* <li>
                                          <a href="javascript:;">
                                            Receive Items(inventory)
                                          </a>
                                        </li> */}
                                        {/* <li>
                                          <a href="javascript:;">
                                            Receive Items&Enter Bill(inventory)
                                          </a>
                                        </li> */}
                                        {/* <li>
                                          <a href="javascript:;">
                                            Enter Bill for received items(inventory)
                                          </a>
                                        </li> */}
                                      </ul>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-12 col-xs-12 pad-no">
                      <p className="fw-med pull-left">
                      Showing {this.state.pagecountstart} - {this.state.pagecountend} of {this.state.totalrecordcount} items
                      </p>
                      <div className="pull-right pagination-wrap">
                        <ul className="pagination">
                          {this.state.TotalPages &&
                            this.state.TotalPages.map((item, i) => {
                              return (
                                // <li className="active"><a href="javascript:;">01</a></li>
                                <li
                                  key={i}
                                  onClick={() => this.getSpecificPage(i + 1)}
                                >
                                  <a href="javascript:;">{i + 1}</a>
                                </li>
                              );
                            })}
                          {/* <li><a href="javascript:;">03</a></li> */}
                          {/* <li><a href="javascript:;">04</a></li> */}
                          {/* <li>
                            <a href="javascript:;" className="btn">
                              Next
                            </a>
                          </li> */}
                        </ul>
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer logoutSubmit={e => this.logoutLink()} />
        </div>
      </div>
    );
  }
}
export default Vendors_list;
