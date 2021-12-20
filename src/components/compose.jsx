import React from 'react'
import LeftSidebar from './left_sidebar'
import Footer from './footer'

import Topbar from './topbar'
import FetchAllApi from '../api_links/fetch_all_api'
import { PDFtoIMG } from 'react-pdf-to-image'
import pdf_file from '../singtel.pdf'

import jQuery from 'jquery'

class compose extends React.Component {
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

      selectedFile: '',
      succ_msg: '',
      attachment_file: [],
      attachment_file_length: 0,
      attachment_fileName: [],
      imgThumb: '',
      pages: []
    }

    this.loadFile = this.loadFile.bind(this)
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

  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }

  dataTaggingFunc(file_id) {
    this.props.history.push('/data_tagging/' + file_id)
    window.scrollTo(0, 0)
  }



  sendUserInput(e) {
    e.preventDefault()
    // alert(e.props.value)
    //const data = new FormData();

    var subject = jQuery('#subject').val()
    var description = jQuery('#description').val()
    var client_id = this.state.logged_client_id
    var user_id = this.state.logged_user_id
    var attachments = this.state.attachment_file

    console.log('attachments', attachments, 'file_length', attachments.length)

    FetchAllApi.saveNewDocument(
      client_id,
      user_id,
      subject,
      description,
      attachments,
      (err, response) => {
        console.log('new document', response.message)
        if (response.status === 1) {
          // jQuery("#subject").val('');
          // jQuery("#description").val('');
          jQuery('#composeFrm')[0].reset()
          jQuery('.previewImg').remove()

          jQuery('.upload-space').removeClass('hide')
          jQuery('.upload-thumb').addClass('hide')

          this.setState({
            succ_msg: response.message,


          })
          jQuery('.resp_msg').fadeIn(500)
          setTimeout(function () {
            jQuery('.resp_msg').fadeOut(2000)
          }, 8000)
        } else {
          this.setState({
            succ_msg: response.message
          })
          jQuery('.resp_msg').fadeIn(500)
          setTimeout(function () {
            jQuery('.resp_msg').fadeOut(2000)
          }, 8000)
        }
      }
    )
  }

  sendUserInputs = () => {
    // e.preventDefault()
    // alert(e.props.value)
    //const data = new FormData();
    console.log("hdgdhd")
    var subject = jQuery('#subject').val()
    var description = jQuery('#description').val()
    var client_id = this.state.logged_client_id
    var user_id = this.state.logged_user_id
    var attachments = this.state.attachment_file

    console.log('attachments', attachments, 'file_length', attachments.length)

    FetchAllApi.save_doucment_list_draft(
      client_id,
      user_id,
      subject,
      description,
      attachments,
      (err, response) => {
        console.log('new document', response.message)
        if (response.status === 1) {
          //alert('gud')
          // jQuery("#subject").val('');
          // jQuery("#description").val('');
          jQuery('#composeFrm')[0].reset()
          jQuery('.previewImg').remove()

          jQuery('.upload-space').removeClass('hide')
          jQuery('.upload-thumb').addClass('hide')

          this.setState({
            succ_msg: response.message
          })
          jQuery('.resp_msg').fadeIn(500)
          setTimeout(function () {
            jQuery('.resp_msg').fadeOut(2000)
          }, 8000)
        } else {
          this.setState({
            succ_msg: response.message
          })
          jQuery('.resp_msg').fadeIn(500)
          setTimeout(function () {
            jQuery('.resp_msg').fadeOut(2000)
          }, 8000)
        }
      }
    )
  }

  routedChange(parameter) {
    this.props.history.push('/' + parameter)
    window.scrollTo(0, 0)
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  removeImage = e => {
    const updated = this.state.attachment_file.filter(item => item.name !== e)
    this.setState({
      attachment_file: updated
    })
  }
  loadFile(e) {
    var files = e.target.files
    this.setState({ attachment_file_length: files.length })
    if (files.length > 0) {
      jQuery('.upload-space').addClass('hide')
      jQuery('.upload-thumb').removeClass('hide')
      var fileArra = this.state.attachment_file
      //var fileThumbArra = this.state.imgThumb;
      for (var i = 0; i < files.length; i++) {
        fileArra.push(e.target.files[i])
        this.setState({
          selectedFile: URL.createObjectURL(e.target.files[i]),
          attachment_file: fileArra
        })
      }
    }
  }

  render() {
    console.log('selectedFile', this.state.selectedFile)

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
                  onClick={this.routedChange.bind(this, 'inbox')}
                  className='back hidden-xs'
                >
                  <svg width='18.5' height='14.249' viewBox='0 0 18.5 14.249'>
                    <g
                      id='left-arrow_2_'
                      data-name='left-arrow (2)'
                      transform='translate(0 -58.83)'
                    >
                      <g
                        id='Group_25'
                        data-name='Group 25'
                        transform='translate(0 65.207)'
                      >
                        <g
                          id='Group_24'
                          data-name='Group 24'
                          transform='translate(0 0)'
                        >
                          <path
                            id='Path_19'
                            data-name='Path 19'
                            d='M17.753,235.318H.747a.747.747,0,0,0,0,1.495H17.753a.747.747,0,0,0,0-1.495Z'
                            transform='translate(0 -235.318)'
                          ></path>
                        </g>
                      </g>
                      <g
                        id='Group_27'
                        data-name='Group 27'
                        transform='translate(0 58.83)'
                      >
                        <g
                          id='Group_26'
                          data-name='Group 26'
                          transform='translate(0 0)'
                        >
                          <path
                            id='Path_20'
                            data-name='Path 20'
                            d='M1.8,65.954l5.849-5.849A.747.747,0,1,0,6.6,59.049L.219,65.426a.747.747,0,0,0,0,1.057L6.6,72.86A.747.747,0,1,0,7.653,71.8Z'
                            transform='translate(0 -58.83)'
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>

                <span className='page-title hidden-xs'>Compose</span>

                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className='main-content col-md-12 col-xs-12'>
                <div className='resp_msg'>{this.state.succ_msg}</div>

                <div className='content-top col-md-12 col-xs-12 pad-no'>
                  <img src='images/mail-attachment.svg' alt='icon' />
                  <span className='page-title'>Send New Attachments</span>
                </div>
                <div className='content-sec col-md-12 col-xs-12 pad-no send-attachment'>
                  <form
                    className='attachment-form row custom-form'
                    id='composeFrm'
                    method='post'
                    onSubmit={this.sendUserInput.bind(this)}
                  >
                    <div className='col-md-6 col-xs-12'>
                      <div className='form-group'>
                        <label>Subject</label>
                        <input
                          type='text'
                          name='subject'
                          id='subject'
                          className='form-control'
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Message</label>
                        <textarea
                          className='form-control'
                          id='description'
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className='col-md-6 col-xs-12'>
                      <div className='form-group'>
                        <label>Upload Attachments</label>
                        <div className='upload-wizard'>
                          <div className='upload-thumb hide'>
                            <ul className='list-inline'>
                              {this.state.attachment_file.map(
                                (file_data, index) => {
                                  var file_url = URL.createObjectURL(file_data)
                                  var file_name = file_data.name

                                  if (file_data.type === 'application/pdf') {
                                    var blob = file_url

                                    console.log('blob_url', file_data.name)

                                    //return this.createPdfImg(file_data);

                                    return (
                                      <li className='previewImg'>
                                        <div className='thumb-img'>
                                          <PDFtoIMG file={blob}>
                                            {({ pages }) => {
                                              console.log('check length', pages)

                                              if (!pages.length)
                                                return 'check Loading...'
                                              return pages.map((page, index) =>
                                                index == 0 ? (
                                                  <img
                                                    key={index}
                                                    src={page}
                                                    title={file_name}
                                                    alt='pdf'
                                                  />
                                                ) : (
                                                  ''
                                                )
                                              )
                                            }}
                                          </PDFtoIMG>
                                        </div>
                                        <span className='file-name'>
                                          {file_name}
                                        </span>
                                        <a href='javascript:;' className='del-btn'>
                                          <img
                                            src='./images/close-icon-white.svg'
                                            alt='delete'
                                          />
                                        </a>
                                      </li>
                                    )
                                  } else {
                                    return (
                                      <li className='previewImg'>
                                        <div className='thumb-img'>
                                          <img
                                            src={file_url}
                                            alt='image'
                                            title={file_data.name}
                                          />
                                        </div>
                                        <span className='file-name'>
                                          {file_data.name}
                                        </span>
                                        <a
                                          href='javascript:;'
                                          className='del-btn'
                                          onClick={() => {
                                            this.removeImage(file_data.name)
                                          }}
                                        >
                                          <img
                                            src='./images/close-icon-white.svg'
                                            alt='delete'
                                          />
                                        </a>

                                      </li>
                                    )
                                  }
                                }
                              )}

                              <li className='addMore'>
                                <input
                                  type='file'
                                  name='imgInp[]'
                                  id='imgInp2'
                                  className='add_img'
                                  multiple
                                  onChange={this.loadFile.bind(this)}
                                  accept='image/*,application/pdf'
                                />
                                <a href='javascript:;' className='add-more'>
                                  <div>
                                    <img
                                      src='images/upload-icon.svg'
                                      alt='icon'
                                    />
                                    Add or Drag here
                                  </div>
                                </a>
                              </li>

                              {/* <li className="addMore">
                                <a href="javascript:;"  className="add-more" primary={false} onClick={() => {this.upload.click();}}>
                                  <div >
                                  <input id="myInput" type="file" ref={ref => (this.upload = ref)} style={{ display: "none" }}
                                      onChange={this.onChangeFile.bind(this)}/>
                                    <label htmlFor="file">{file}</label>

                                    {this.state.file ? (
                                      <PDFtoIMG file={this.state.file}>
                                        {({ pages }) => {
                                          console.log("length", pages);

                                          if (!pages.length)
                                            return "Loading...";
                                          return pages.map((page, index) => (
                                            (index==0)?
                                            <img   key={index} src={page} style={{height:104.9,width:105.9,marginTop: 13,}}  />
                                            
                                            :""
                                          ));
                                        }}
                                      </PDFtoIMG>
                                    ) : (
                                      <div>Add more</div>
                                    )}
                                    <span className="file-name">{fileName}</span>                              
                                  </div>                                  
                                </a>
                              </li> */}
                            </ul>
                          </div>
                          <div className='upload-space'>
                            <input
                              type='file'
                              name='imgInp[]'
                              id='imgInp'
                              className='add_img'
                              multiple
                              onChange={this.loadFile.bind(this)}
                              accept='image/*,application/pdf'
                              required
                            />
                            {/* <img id="output" src="#" alt="your image" width="70" height="50" /> */}
                            <div>
                              <img
                                className='icon'
                                src='images/upload-icon.svg'
                                alt='icon'
                              />
                              <span>.pdf .png .jpg</span>
                              <span className='note-txt'>
                                Drag and drop your files here
                                <br />
                                or
                                <br />
                                <a href='javascript:;'>click here</a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12 col-xs-12 text-right '>
                      <button
                        onClick={() => this.props.history.push('/loading', ['/compose'])}
                        type='button'
                        className='btn btn-lightgray'
                        type='button'
                      >Cancel</button>
                      {'   '}

                      {/* <button
                        className='btn btn-yellow'
                        value='save-draft'
                        type='button'
                      // onClick = {()=>{this.sendUserInputs()}}
                      >Save Draft</button> */}
                      {'   '}

                      <button type='submit' className='btn btn-green'>
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <Footer logoutSubmit={e => this.logoutLink(e)} />
        </div>
      </div>
    )
  }
}
export default compose
