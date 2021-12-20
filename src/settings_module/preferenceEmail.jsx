import React from 'react';
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"




export default class Email extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      oldEmail: "",
      email_address: "",
      email_name: '',
      template_list: [],
      email_show: [],
      replyName: localStorage.getItem('name'),
      replyMail: localStorage.getItem("mail"),
      index: localStorage.getItem("idx"),
      checked: localStorage.getItem("check"),
      check: false,
      status: "",
      errorMsg: false,
      emailValidationerror: false
    }
    this.email = React.createRef()
    this.name = React.createRef()
  };


  componentWillMount() {
    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }
  };


  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  };

  componentDidMount() {
    this.template_details();
    this.showEmail();


    window.jQuery(".mscroll-y").mCustomScrollbar({
      axis: "y",
      scrollEasing: "linear",
      scrollInertia: 600,
      autoHideScrollbar: "true",
      autoExpandScrollbar: "true"
    });
    window.jQuery(".mscroll-x").mCustomScrollbar({
      axis: "x",
      scrollEasing: "linear",
      scrollInertia: 600,
      autoHideScrollbar: "true",
      autoExpandScrollbar: "true"
    });


  }


  template_details = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.email_template_data(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({
          template_list: response.data,
        },
        )
      }
    })
  };

  handleSubmit = (event) => {

    if (this.email.current.value !== "" && this.name.current.value !== "") {
      if (/^[a-z0-9]+@(?:[a-z0-9]+\.)+[A-Za-z]+$/.test(this.email.current.value)) {
        {
          this.setState({ emailValidationerror: false })

          let input = {
            client_id: this.state.logged_client_id,
            email_address: this.email.current.value,
            emal_name: this.name.current.value,
          }


          FetchAllApi.post_email(input, (err, response) => {
            if (response.status === 1) {
              alert("Email created successfully")
              jQuery("#add-new-replymail").trigger('click');
              this.showEmail()

            }
          })
          this.email.current.value = ""
          this.name.current.value = ""
        }
      } else {
        this.setState({ emailValidationerror: true })
      }
    } else {
      this.setState({ errorMsg: true })
    }

  };


  radio = (idx, e) => {
    if (this.state.email_show[idx].email_address) {
      let mail = this.state.email_show[idx].email_address;
      let name = this.state.email_show[idx].emal_name;
      let client_id = this.state.logged_client_id;
      let id = this.state.email_show[idx].id;

      console.log(mail)

      FetchAllApi.select_email_radio(id, (err, response) => {
        if (response.status === 1) {
          alert(response.message)
        }
      })

      this.setState({ replyMail: mail, replyName: name, index: idx, checked: e.target.checked })
      localStorage.setItem("mail", mail)
      localStorage.setItem("name", name)
      localStorage.setItem("idx", idx)
    } else {
      let mail = this.state.email_show[idx].email_id[0].email_address
      let name = this.state.email_show[idx].name;
      let client_id = this.state.logged_client_id;
      let id = this.state.email_show[idx].id;

      console.log(mail)

      FetchAllApi.select_email_radio(id, (err, response) => {
        if (response.status === 1) {
          alert(response.message)
        }
      })

      this.setState({ replyMail: mail, replyName: name, index: idx, checked: e.target.checked })
      localStorage.setItem("mail", mail)
      localStorage.setItem("name", name)
      localStorage.setItem("idx", idx)
    }
  }


  showEmail = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.show_email(client_id, (err, response) => {
      if (response.status === 1) {
        response.results1.map((val) => {
          return (
            val.actve_status = "active",
            val.status = "approved"
          )
        })
        this.setState({ email_show: [...response.results1, ...response.data] })
      }
    })
  }

  verifyEmail = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.verify_Email(client_id, (err, response) => {

      if (response.status === 1) {
        this.setState({ status: response.message },

        )
      }
    })
  }


  templateEdit = (id) => {
    this.props.history.push("/edit_email_template", id)

  }

  setOldEmail = () => {
    console.log(this.state.oldEmail)
    let email = this.state.email_show
    email.push(this.state.oldEmail)
    this.setState({ email_show: email })

  }

  templateDelete = (id) => {
    FetchAllApi.delete_email(id, (err, response) => {
      if (response.status === 1) {
        alert("Template Deleted successfully")
        this.componentDidMount()
      }
    });

  };




  goTo = (id) => {
    this.props.history.push('/view_email_template', id)
  }


  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    console.log("email", this.state.email_show)
    return (
      <div>
        <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
          <h3>Subscribers</h3>
          </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
            <Sidebar pageSubmit={e => this.pageLink(e)} />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Email</h3>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <h5>Reply Email Address</h5>
                  <p className="reply-email">
                    emails are sent as <span className="fw-sbold" id="reply_name"></span> with replies going to
        <span className="twoside-arrow" id="replay_mail"></span>
                  </p>


                  <div className="col-md-6">
                    <div className="row email-sec">
                      {this.state.email_show.map((item, idx) => {
                        if(item.actve_status === "active"){
                          console.log("no",idx)
                          // document.getElementById(`email_radio${idx}`).checked = true;
                        document.getElementById("reply_name").innerText = item.name;
                        document.getElementById("replay_mail").innerText = item.email_id[0].email_address;
                        }
                        return (
                          <div className="check-row">
                            <label className="custom-checkbox radio">
                              {this.state.index == idx ? (
                                <input type="radio" name="mail-address" id={`email_radio${idx}`}  checked="true"  onClick={(e) => { this.radio(idx, e) }} />
                              ) : (<input type="radio" name="mail-address" disabled={item.actve_status != "active"} onClick={(e) => { this.radio(idx, e) }} />)}
                              {item.name ? (
                                <span>{item.name}</span>
                              ) : <span>{item.emal_name}</span>}
                              {item.email_id ? (
                                item.email_id.map((arr) => {
                                  return (
                                    <span>{arr.email_address}</span>
                                  )
                                })
                              ) : (<span>{item.email_address}</span>)}
                              <span className="checkmark" />
                              {item.actve_status == "active" ? (
                                <span className="badge green dib" style={{ width: 85, color: "white" }}>Active</span>
                              ) : (
                                <span className="badge red" style={{ width: 85, color: "white" }}>In-active</span>
                              )}
                            </label>
                            {item.status == "approved" ? (
                              <span></span>
                            ) : <span className="badge dark-yellow">Approval pending</span>
                            }
                          </div>
                        )
                      })}
                      <a className="text-link" data-toggle="modal" data-target="#add-new-replymail">Add email address</a>
                    </div>
                  </div>
                  <div className="clearfix mar-btm" />
                  <div className="col-md-6 pad-top">
                    <div className="row">
                      <h5 className="mar-b-no">Email Templates</h5>
                      <div className="list-table member-table mar-t-no pad-large">
                        <div className="cus-table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Template Type</th>
                                <th>Template Name</th>
                                <th><span className="sr-only">Action</span></th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.template_list.map((item, idx) => {
                                return (
                                  <tr >
                                    <td onClick={() => { this.goTo(item.id) }}><span className="fs-13 fw-med">{item.Template_name}</span></td>
                                    <td onClick={() => { this.goTo(item.id) }}><span className="fs-13">{item.Template_type}</span></td>
                                    <td className="action-td">
                                      <div className="dropdown menu-item new-cus">
                                        <button className="btn btn-green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">Action
                               <span className="caret" /></button>
                                        <ul className="dropdown-menu align-right">
                                          <li><a href="javascript:;" onClick={() => { this.templateEdit(item.id) }}>Edit</a></li>
                                          <li><a href="javascript:;" onClick={() => { this.templateDelete(item.id) }}>Delete</a></li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })}


                            </tbody>
                          </table>
                        </div>
                        <a href="/preference_create_emailtemplate" className="text-link">Add New Email Template</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>



        <div class="modal fade pop-modal" id="add-new-replymail" role="dialog">
          <div class="modal-dialog modal-xs custom-modal">

            {/* Modal content*/}
            <button type="button" className="close hidden-xs" data-dismiss="modal">
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>New Reply Email Address</h3>
                <form className="custom-form row column mar-btm">
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Email Address<span className="astrick">*</span></label>
                    <input type="email" ref={this.email} className="form-control" name="" />
                    {this.state.emailValidationerror == true ? (
                      <div style={{ float: 'left' }}>
                        <small style={{ color: 'red' }}>
                          *Incorrect Email ID.
                                </small>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="form-group col-md-12 col-xs-12 pad-btm">
                    <label>Email Name<span className="astrick">*</span></label>
                    <input type="text" ref={this.name} className="form-control" name />
                    {this.state.errorMsg == true ? (
                      <div style={{ float: 'left' }}>
                        <small style={{ color: 'red' }}>
                          *Please fill mandatory field.
                                </small>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                    <button className="btn btn-lightgray mar-rgt-5" type="button" onClick={() => { jQuery("#add-new-replymail").trigger('click'); }}>Cancel</button>

                    <input type="button" className="btn btn-green mar-rgt-5" onClick={this.handleSubmit} value="Submit" />

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


      </div>
    )
  }
}