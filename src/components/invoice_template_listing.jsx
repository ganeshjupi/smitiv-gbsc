import React from 'react'
import LeftSidebar from './left_sidebar'
import Footer from './footer'

import Topbar from './topbar'

import FetchAllApi from '../api_links/fetch_all_api';
import parse from 'html-react-parser'
import jQuery from 'jquery'
class invoice_template_listing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataUrl: '',
      logged_user_id: localStorage.getItem('logged_user_id'),
      logged_client_id: localStorage.getItem('logged_client_id'),
      logged_role_id: localStorage.getItem('logged_role_id'),
      logged_user_name: localStorage.getItem('logged_user_name'),
      logged_user_email: localStorage.getItem('logged_user_email'),
      logged_user_phone: localStorage.getItem('logged_user_phone'),
      logged_user_image: localStorage.getItem('logged_user_image'),
      logged_company_name: localStorage.getItem('logged_company_name'),
      logged_subscription_start_date: localStorage.getItem(
        'logged_subscription_start_date'
      ),
      logged_subscription_end_date: localStorage.getItem(
        'logged_subscription_end_date'
      ),
      logged_plan_id: localStorage.getItem('logged_plan_id'),
      dropdown: '',
      inbox_list: [],
      response_stus: 0,
      response_msg: 'No data found',
      item_details: '',
      item_file_path: '',
      list_id: '',
      response: '',
      htmlcont: '',
      columnType: '1'
    }
  }

  UNSAFE_componentWillMount() {
    this.get_invoice_list()
    if (
      this.state.logged_user_id === '' ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push('/')
    }

    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1 //January is 0!
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    var today_date = yyyy + '-' + mm + '-' + dd

    console.log('logged_user_id', this.state.logged_user_id)
    console.log(
      'logged_subscription_end_date',
      this.state.logged_subscription_end_date
    )

    if (this.state.logged_subscription_end_date < today_date) {
      //this.props.history.push('/register_Payment');
    }
  }


  set_default_template = (id) => {
    let template_id = id;
    let is_default = 1
    let client_id = this.state.logged_client_id
    FetchAllApi.set_default_template_id(client_id, template_id, is_default, (err, response) => {
      if (response.status === 1) {
        this.get_invoice_list()
        alert(response.message)
      } else {
        this.setState({})
      }
    })
  }

  rename_template = (id) => {
    let input = { client_id: this.state.logged_client_id, template_id: id, template_name: this.state.template_name }
    FetchAllApi.rename_invoice_template(input, (err, response) => {
      if (response.status === 1) {
        alert(response.message)
        this.get_invoice_list()
      } else {
        alert(response.message)
      }
    })
  }

  create_duplicate = (id) => {
    let template_id = id;
    let user_id = this.state.logged_user_id
    let selected_template_type = this.state.columnType

    let client_id = this.state.logged_client_id
    FetchAllApi.create_duplicate_template(client_id, template_id, user_id, selected_template_type, (err, response) => {
      if (response.status === 1) {
        alert(response.message)
        setTimeout(() => {
        this.get_invoice_list()
      }, 1000);
      } else {
        this.setState({})
      }
    })
  }

  get_invoice_list = () => {
    let input = { client_id: this.state.logged_client_id, user_id: this.state.logged_user_id }
    FetchAllApi.get_edit_invoice_html(input, (err, response) => {
      if (response.status === 1) {
        this.setState({
          response: response,
          htmlcont: response.list[0].html_content
        })
      } else {
        this.setState({})
      }
    })
  }

  delete_invoice_list = id => {
    let client_id = this.state.logged_client_id
    let template_id = id
    FetchAllApi.delete_invoice_template(
      client_id,
      template_id,
      (err, response) => {
        console.log('defaultcatejhwdjkjhgorylist', response)
        alert(response.message)
        if (response.status === 1) {
          this.get_invoice_list()
          this.setState({})
        } else {
          this.setState({})
        }
      }
    )
  }

  componentDidMount() {

    //jQuery(".select-picker").selectpicker();

    require('jquery-mousewheel')
    require('malihu-custom-scrollbar-plugin')

    jQuery('.item-listwrap').mCustomScrollbar({
      scrollEasing: 'linear',
      scrollInertia: 600,
      scrollbarPosition: 'outside'
    })

    jQuery('.label-enclose .label span').click(function () {
      jQuery('.label-enclose .label').removeClass('active')
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
  onDocumentLoadSuccess = () => {
    console.log('success')
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }

  //   dataTaggingFunc(list_id,file_id) {
  //     this.props.history.push("/data_tagging/" + list_id + "/" + file_id );
  //     window.scrollTo(0, 0);
  //   }

  routedChange(parameter) {
    this.props.history.push('/' + parameter)
    window.scrollTo(0, 0)
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }
  routing_to_edit(template_id, type, obj) {
    let path = type == 1 ? '/template_edit_page' : type == 2 ? '/template_edit_page_2' : '/template_edit_page_3'
    this.props.history.push(path, obj)
    // window.location.reload()
    // FetchAllApi.get_specific_invoice_html(template_id, (err, response) => {
    //   // console.log('defaultcategorylist', response)
    //   // alert(response.message)
    //   // console.log('html content', response.list[0].html_content)

    //   if (response.status === 1) {
    //     // console.log('jai', response)
    //     // this.props.history.push('/editable/' + template_id, { ...response })
    //     this.props.history.push('/template_edit_page', { ...response })
    //     window.location.reload();
    //     window.scrollTo(0, 0)
    //   } else {
    //     this.setState({})
    //   }
    // })

  }

  render() {
    let x;

    return (
      <div id='mynode'>
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

                <span className='page-title hidden-xs'>Invoice templates</span>

                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>
              <div className='main-content col-md-12 col-xs-12'>
                <span className='page-title visible-xs'>
                  Choose &amp; Customize
                </span>
                <div className='content-sec col-md-12 col-xs-12 pad-no mar-t-no template-enclose'>
                  {/* <div className='col-md-4 col-sm-6 col-xs-12 template-wrap'>
                    <a href='#' className='btn create-temp-btn'>
                      <img src='images/create-template-icon.svg' alt='icon' />
                      Create Your Template
                    </a>
                  </div> */}

                  {this.state.response.list != undefined &&
                    this.state.response.list.map((i, index) => {
                      // console.log(this.state.response)
                      let image = i.thumbnail_source_url ? i.thumbnail_source_url : ''
                      let template_id = i.id
                      let self = this;
                      x = parse(i.html_content);
                      let name = i.template_name
                      let template_type = i.properties.template_type ? i.properties.template_type : 1
                      let selected_type = i.selected_template_type ? i.selected_template_type : 1
                      let type = selected_type == 1 ? "All Templates" :
                        selected_type == 2 ? "Credit Memo" :
                          selected_type == 3 ? "Quotation" :
                            selected_type == 4 ? "Sales Order" :
                              selected_type == 5 ? "Purchase Order" :
                                selected_type == 6 ? "Statement" : "All Templates"
                      //    alert(i.image_path)
                      return (
                        <div class="col-md-3 col-sm-6 col-xs-12">
                          <div class="template-wrap">
                            <div class="thumb-img">
                              <img src={image} class="bdr-all img-responsive" alt="thumb-img" />
                            </div>
                            <div class="thumb-detail">
                              <span class="title">{name}</span>
                              <span>{type}</span>
                              <div className="dropdown menu-item new-cus">
                                <a
                                  href="javascript"
                                  class="dropdown-toggle"
                                  data-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <button
                                    className="dropdown-toggle"
                                    type='button'
                                  >
                                    <img src="images/more-menu-dot.svg" alt="icon" />
                                  </button>
                                </a>
                                <ul className="dropdown-menu align-right">
                                  <li>
                                    <a onClick={() => { this.routing_to_edit(template_id, template_type, i) }}>Edit Template</a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() => {
                                        this.setState({ template_name: name, template_id }, () => { window.jQuery("#rename-template").modal("show") })
                                        // this.routing_to_edit(template_id, template_type, i) 
                                      }}
                                    >Rename</a>
                                  </li>
                                  <li>
                                    <a onClick={() => this.set_default_template(template_id)}>Set as Default</a>
                                  </li>
                                  {/* <li>
                                       <a href='javascript:;'>Preview</a>
                                     </li> */}
                                  <li>
                                    <a onClick={() => {
                                      this.setState({ template_id })
                                      setTimeout(() => {
                                        window.jQuery("#checkingType").modal("show")
                                      }, 500);
                                      // this.create_duplicate(template_id)
                                    }
                                    }>Duplicate</a>
                                  </li>
                                  <li>
                                    <a data-toggle="modal" data-target="#modal_delete"
                                      onClick={() =>
                                        this.setState({ template_id })
                                      }
                                    >
                                      Delete
                                    </a>
                                  </li>


                                </ul>
                              </div>
                              {/* <div class="dropdown menu-item">
                                    <button class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                        <img src="images/more-menu-dot.svg" alt="icon"/>
                                    </button>
                                    <ul class="dropdown-menu align-right">
                                        <li><a href="javascript:;">Set as Default</a></li>
                                        <li><a href="javascript:;">Preview</a></li>
                                        <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                                        <li><a href="javascript:;">Edit</a></li>
                                        <li><a href="javascript:;">Delete</a></li>
                                    </ul>
                                </div> */}
                            </div>
                          </div>
                        </div>

                        // <div
                        //   className='col-md-4 col-sm-6 col-xs-12 template-wrap'
                        //   key={index}
                        // >
                        //   <div className='col-md-12 col-xs-12 pad-no'>
                        //     <div className='thumb-img'>
                        //       <div id="resize_page" style={{
                        //         MozTransform: 'scale(0.4)',
                        //         OTransform: 'scale(0.4)',
                        //         WebkitTransform: 'scale(0.4)',
                        //         transform: 'scale(1.0)',
                        //         overflow: 'hidden',
                        //         height: '300px',
                        //         position: 'relative',
                        //         width: 'initial'
                        //       }}>
                        //         {parse(i.html_content)}
                        //       </div>
                        //       <div className='thumb-menu'>
                        //         <a
                        //           onClick={() => { this.routing_to_edit(template_id, template_type, i) }}
                        //           className='btn btn-green'
                        //         >
                        //           Edit
                        //         </a>
                        //         <div className='dropdown menu-item'>
                        //           <button
                        //             className='btn btn-yellow dropdown-toggle'
                        //             data-toggle='dropdown'
                        //             aria-expanded='true'
                        //           >
                        //             More
                        //           </button>
                        //           <ul className='dropdown-menu'>
                        //             <li>
                        //               <a onClick={() => this.set_default_template(template_id)}>Set as Default</a>
                        //             </li>
                        //             <li>
                        //               <a href='javascript:;'>Preview</a>
                        //             </li>
                        //             <li>
                        //               <a onClick={() => {
                        //                 this.setState({template_id})
                        //                 setTimeout(() => {
                        //                   window.jQuery("#checkingType").modal("show")
                        //                 }, 500);
                        //                 // this.create_duplicate(template_id)
                        //               }
                        //               }>Duplicate</a>
                        //             </li>
                        //             <li>
                        //               <a
                        //                 onClick={() =>
                        //                   this.delete_invoice_list(template_id)
                        //                 }
                        //               >
                        //                 Delete
                        //               </a>
                        //             </li>
                        //           </ul>
                        //         </div>
                        //       </div>
                        //     </div>
                        //   </div>
                        //   <span className='col-md-12 col-xs-12 text-center fw-med'>
                        //     {this.state.response.list[index].template_name}{' '}
                        //   </span>
                        //   <div class="dropdown menu-item">
                        //             <button class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                        //                 <img src="images/more-menu-dot.svg" alt="icon"/>
                        //             </button>
                        //             <ul class="dropdown-menu align-right">
                        //                 <li><a href="javascript:;">Set as Default</a></li>
                        //                 <li><a href="javascript:;">Preview</a></li>
                        //                 <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                        //                 <li><a href="javascript:;">Edit</a></li>
                        //                 <li><a href="javascript:;">Delete</a></li>
                        //             </ul>
                        //         </div>
                        // </div>


                      )
                    })}
                </div>

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
                                  name="columnType"
                                  value="1"
                                  checked={
                                    this.state.columnType ==
                                    "1"
                                  }
                                  onChange={() => this.setState({ columnType: '1' })}
                                />
                                All Templates ( including Sales invoice )
                                <span className="checkmark"></span>
                              </label>
                              <label className="custom-checkbox radio non-taxable w-100">
                                <input
                                  type="radio"
                                  name="columnType"
                                  value="2"
                                  checked={
                                    this.state.columnType ===
                                    "2"
                                  }
                                  onChange={() => this.setState({ columnType: '2' })}
                                />{" "}
                                Credit Memo
                                <span className="checkmark"></span>
                              </label>
                              <label className="custom-checkbox radio mar-rgt taxable w-100">
                                <input
                                  type="radio"
                                  name="columnType"
                                  value="3"
                                  checked={
                                    this.state.columnType ===
                                    "3"
                                  }
                                  onChange={() => this.setState({ columnType: '3' })}
                                />
                                Quotation
                                <span className="checkmark"></span>
                              </label>
                              <label className="custom-checkbox radio mar-rgt taxable w-100">
                                <input
                                  type="radio"
                                  name="columnType"
                                  value="4"
                                  checked={
                                    this.state.columnType ===
                                    "4"
                                  }
                                  onChange={() => this.setState({ columnType: '4' })}
                                />
                                Sales Order
                                <span className="checkmark"></span>
                              </label>
                              <label className="custom-checkbox radio mar-rgt taxable w-100">
                                <input
                                  type="radio"
                                  name="columnType"
                                  value="5"
                                  checked={
                                    this.state.columnType ===
                                    "5"
                                  }
                                  onChange={() => this.setState({ columnType: '5' })}
                                />
                                Purchase Order
                                <span className="checkmark"></span>
                              </label>
                              <label className="custom-checkbox radio mar-rgt taxable w-100">
                                <input
                                  type="radio"
                                  name="columnType"
                                  value="6"
                                  checked={
                                    this.state.columnType ===
                                    "6"
                                  }
                                  onChange={() => this.setState({ columnType: '6' })}
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
                            >
                              Cancel
                            </button>
                            <span>{"   "}</span>
                            <button
                              className="btn btn-green"
                              type="button"
                              data-dismiss="modal"
                              onClick={() => this.create_duplicate(this.state.template_id)}
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


                {/* rename modal */}
                <div
                  className="modal fade pop-modal"
                  id="rename-template"
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
                        <h3>Rename Template</h3>
                        <form className="custom-form row">
                          <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                            <div className="col-md-4 col-sm-4 col-xs-12">
                              <label>New Name</label>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-12">
                              <input
                                autoComplete="off"
                                type="text"
                                className="form-control"
                                value={this.state.template_name}
                                onChange={(e) => {
                                  let value = e.target.value
                                  let a = this.state.template_name.split('-')
                                  let b = a[0].length
                                  console.log('aaaaaa',a,'bbbb',b,'cccc',value.length)
                                  if (value.length < b) { alert('you cannot change base name of the template') }
                                  else if (value.length == b) { alert('template name cannot be empty') }
                                  else {
                                    this.setState({ template_name: value })
                                    // this.rename_template(this.state.template_id)
                                  }

                                }}
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
                            >
                              Cancel
                            </button>
                            <span>{"   "}</span>
                            <button
                              className="btn btn-green"
                              type="button"
                              data-dismiss="modal"
                              onClick={() => {this.rename_template(this.state.template_id)}}
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/* rename modal */}



                {/* <PDFViewer
            document={{
                url: 'http://ec2-54-251-142-179.ap-southeast-1.compute.amazonaws.com:9002/invoice_templates_pdf/Template-1.pdf',
            }}
        /> */}
              </div>
              {/* Main Content Ends here */}
            </div>
          </div>
        </div>



{/* delete modal  */}
<div>
              <div
                class="modal fade in"
                id="modal_delete"
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

                      <p class="fw-500">This Template will be deleted </p>
                      <button
                        className="btn btn-lightgray"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <span>{"   "}</span>
                      <button
                        class="btn btn-red"
                        type="button"
                        data-dismiss="modal"
                        onClick={()=>this.delete_invoice_list(this.state.template_id)} 
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
{/* delete modal */}



        <Footer logoutSubmit={e => this.logoutLink(e)} />
      </div>
    )
  }
}
export default invoice_template_listing