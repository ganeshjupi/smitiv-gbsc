import React from "react";
// import profileImage from './../../../'
// import Footer from './footer'

import UserTopbar from "./header";
import LeftSidebar from './../left_sidebar';

import FetchAllApi from "./../../api_links/fetch_all_api";

import jQuery from "jquery";
// import 'bootstrap';
// import '';


class UserProfile extends React.Component {
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


      profileImage: "",
      name: "manojkumar",
      emailId: "manoj@rgmoiles.com",
      mobile: "9786657923",
      password: "11111",
      verificationType: "enabled",
      designation: '',
      type: "password",
      close: "",
      msgerror: false,
      errormsg: false,
      isName: false,
      isEmailId: false,
      isMobile: false,
      isPassword: false,
      isVerificationType: false,
      show: false,
      show1: false,
      isChanged: false,
      isChangedMob: false,
      email_to_show:''

    };
    this.password1 = React.createRef();
    this.password2 = React.createRef();

  }


  cancelFunc = () => {
    this.password1.current.value = ""
    this.password2.current.value = ""
    this.setState({show : false, show1:false,old_password:''})
  }


  checkPassword = () => {
    FetchAllApi.userLogin(this.state.emailId, this.state.old_password, (err, response) => {
      if (response.status === 1) {
        this.setState({ deleteMsg: false },()=>this.deleteUser())
        return true
      } else {
        this.setState({ deleteMsg: true })
        return false
      }
    });
  };


  getUserProfile = () => {
    let user_id = this.state.logged_user_id;
    let client_id = this.state.logged_client_id;
    console.log('user detail')
    FetchAllApi.getUserProfile(user_id,client_id, (err, response) => {
      if (response.status === 1) {
        console.log('oi', response)
        this.setState({
          profileImage: response.details.profile_pic,
          name: response.details.name,
          emailId: response.details.email_id,
          email_to_show: response.details.email_id,
          mobile: response.details.phone,
          password: 'enter new password',
          verificationType: "enabled",
          designation: response.details.designation

        }, this.imageDefault);
      }
    });
  };



  imageDefault = () => {
    if (this.state.profileImage == "") {
      this.setState({ profileImage: "images/placeholder-profile-pic.png" })
    } else {

    }
  }

  uploadProfilePicture = (uploadedPicture) => {
    let image = window.URL.createObjectURL(uploadedPicture)

    let profile_pic = uploadedPicture
    let client_id = this.state.logged_client_id;
    let user_id = this.state.logged_user_id;

    // this.setState({ profileImage: window.URL.createObjectURL(image) });
    console.log("ooo", image);
    FetchAllApi.editProfilePicture(client_id, user_id, profile_pic, (err, response) => {
      if (response.status === 1) {

        localStorage.setItem("logged_user_image", response.user_image)
        this.setState({
          profileImage: image,
        });
        // setTimeout(() => {
          // window.location.reload();
        // }, 500);
      }
    });
  };

  handleSubmit = () => {
    let pass1 = this.password1.current.value;
    let pass2 = this.password2.current.value;
    if (pass1 !== "" && pass2 !== "") {
      if (pass1 == pass2) {
        jQuery("#account-modal").trigger('click');
        this.setState({ password: pass2, msgerror: false, errormsg: false }, this.emptyFunc)
      } else {
        this.setState({ msgerror: true, errormsg: false })
      }
    } else {
      this.setState({ errormsg: true, msgerror: false })
    }
  };

  emptyFunc = () => {
    this.changePassword()
    this.password1.current.value = ""
    this.password2.current.value = ""
  };

  textTypeChange = (val) => {
    this.setState({ type: val })
    document.getElementById("eyesy").style.display = "none";
  }

  editProfile = () => {

    // this.changePassword()

    let client_id = this.state.logged_client_id;
    let user_id = this.state.logged_user_id;
    let role_id = this.state.logged_role_id;
    let name = this.state.name;
    let emailId = this.state.emailId;
    let mobile = this.state.mobile;
    let designation = this.state.designation;


    FetchAllApi.editUser_profile(client_id, user_id, role_id, name, emailId, mobile, designation, (err, response) => {
      if (response.status === 1) {
        alert('details updated succesfully')
        this.setState({ isChangedMob: false, isChanged: false })
        this.getUserProfile()
        // this.setState({
        //   profileImage: response.list,
        // });
      }else{
        alert(response.message)
      }
    });
  };

  changePassword = () => {

    let password = this.state.password;
    if (password != "enter new password") {
      let user_id = this.state.logged_user_id;
      let emailId = this.state.emailId;

      FetchAllApi.updatePassword(user_id, password, emailId, (err, response) => {
        if (response.status === 1) {
          alert(response.message)
          //   this.setState({
          //     profileImage: response.list,
          //   });
        } else {
          alert(response.message)
        }
      });
    }
  };

  deleteUser = () => {

    let user_id = this.state.logged_user_id;
   
    FetchAllApi.deleteUser(user_id, (err, response) => {
      if (response.status === 1) {
        alert('user deleted successfully')
        localStorage.clear()
        // jQuery("#asking_password_for_delete").modal('hide')
        setTimeout(() => {
          window.location.href = '/'
        // this.props.history.push("/");
        }, 500);
        
        // this.setState({
        //   profileImage: response.list,
        // });
      }else if(response.status === 2){
        alert(response.message);
      }else{
        alert(response.message);
      }
    });
  };

  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass("minimize_leftbar");
    //console.log("logged_user_id", this.state.logged_user_id);

    jQuery("title").html("profile | GBSC");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.getUserProfile();


    // this.getSpecificPage(1, 10)

    //jQuery(".select-picker").selectpicker();


    jQuery(".close-modal").click(function () {
      jQuery('.pass-visible').removeClass("off");
    });

    jQuery(document).ready(function () {

      jQuery(".pass-visible").click(function () {
        jQuery(this).toggleClass("off");
        var input = jQuery(jQuery(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });
      // jQuery('.datepicker').datepicker();
    });


    require("jquery-mousewheel");
    require("malihu-custom-scrollbar-plugin");
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
      window.jQuery(".select-picker").selectpicker();
      jQuery(".show-pass").click(function () {
        jQuery(this).parent(".pass-sec").toggleClass("show");
      });
    });

    // jQuery(document)
    //   .on("shown.bs.dropdown", ".dropdown", function () {
    //     // calculate the required sizes, spaces
    //     var jQueryul = jQuery(this).children(".dropdown-menu");
    //     var jQuerybutton = jQuery(this).children(".dropdown-toggle");
    //     var ulOffset = jQueryul.offset();
    //     // how much space would be left on the top if the dropdown opened that direction
    //     var spaceUp =
    //       ulOffset.top -
    //       jQuerybutton.height() -
    //       jQueryul.height() -
    //       jQuery(window).scrollTop();
    //     // how much space is left at the bottom
    //     var spaceDown =
    //       jQuery(window).scrollTop() +
    //       jQuery(window).height() -
    //       (ulOffset.top + jQueryul.height());
    //     // switch to dropup only if there is no space at the bottom AND there is space at the top, or there isn't either but it would be still better fit
    //     if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown))
    //       jQuery(this).addClass("dropup");
    //   })
    //   .on("hidden.bs.dropdown", ".dropdown", function () {
    //     // always reset after close
    //     jQuery(this).removeClass("dropup");
    //   });
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }



  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    return (
      <React.Fragment>
        <div class="container-fluid">
          {/* <LeftSidebar history={this.props.history}  pageSubmit={e => this.pageLink(e)} /> */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          <section className="user-content row" >
            <div className="container">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Profile &amp; Settings</h3>
              </div>
              {/* Profile Widget Starts here */}
              <div className="profile-widget">
                <div className="profile-img-wrap">
                  <div className="profile-img">
                    <img
                      // src="images/profile-pic.jpg"
                      src={this.state.profileImage}
                      className="img-responsive"
                      alt="Kylie Rogers"
                    />
                  </div>
                  <a href="javascript:;" className="change-pic">
                    <label for="file_input_id">
                      <img
                        src="images/pencil-icon.svg"
                        className="img-responsive"
                        alt="icon"
                      />
                    </label>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id="file_input_id"
                      onChange={(e) => {
                        this.uploadProfilePicture(e.target.files[0]);
                      }}
                    />
                  </a>
                </div>
                <span className="profile-name">
                  {this.state.isName ? (
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value })

                      }}
                      onBlur={(e) => {
                        this.setState({ isName: !this.state.isName });
                        document.getElementById("nmedit").style.display = "inline-block"

                      }}
                    />
                  ) : (
                    this.state.name
                  )}
                  <a
                    href="#"
                    id="nmedit"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ isName: !this.state.isName });
                      document.getElementById("nmedit").style.display = "none"
                    }}
                  >
                    <span className="edit">Edit</span>
                  </a>
                </span>

                <div className="profile-cont col-md-12 col-xs-12">
                  <div className="prof-cont-row col-md-12 col-xs-12">
                    <div className="row">
                      <div className="col-md-8 col-xs-12">
                        <span className="head">Mail Address</span>
                        {this.state.isEmailId ? (
                          <input
                            type="email"
                            className="form-control"
                            value={this.state.emailId}
                            onChange={(e) => {
                              this.setState({ emailId: e.target.value, isChanged: true })
                            }

                            }
                          />
                        ) : (
                          <span>{this.state.emailId}</span>
                        )}
                      </div>
                      <div className="col-md-4 col-xs-12 text-right">
                        <a
                          href="javascript:;"
                          className="edit"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ isEmailId: !this.state.isEmailId },
                              () => {
                                if (this.state.isChanged) {
                                  this.editProfile()
                                }
                              });
                          }}
                        >
                          {this.state.isChanged ? 'Submit' : 'Change'}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="prof-cont-row col-md-12 col-xs-12">
                    <div className="row">
                      <div className="col-md-8 col-xs-12">
                        <span className="head">Mobile Number</span>
                        {this.state.isMobile ? (
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.mobile}
                            onChange={(e) =>
                              this.setState({ mobile: e.target.value, isChangedMob: true })
                            }
                          />
                        ) : (
                          <span>{this.state.mobile}</span>
                        )}
                      </div>
                      <div className="col-md-4 col-xs-12 text-right">
                        <a
                          href="javascript:;"
                          className="edit"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ isMobile: !this.state.isMobile },
                              () => {
                                if (this.state.isChangedMob) {
                                  this.editProfile()
                                }
                              });
                          }}
                        >
                          {this.state.isChangedMob ? 'Submit' : 'Change'}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="prof-cont-row col-md-12 col-xs-12">
                    <div class="row">
                      <div class="col-md-8 col-xs-12 pass-sec">
                        <span class="head">Password</span>
                        <span class="prof-pass mar-rgt-5">{this.state.password}</span>
                        <span class="pass-mask mar-rgt-5" >**********</span>
                        {/* <a href="javascript:;" class="show-pass">
                          <img class="visible-icon" src="images/visible-icon.svg" alt="icon" />
                          <img class="invisible-icon" src="images/invisible-icon.svg" alt="icon" />
                        </a> */}
                      </div>

                      {/* {this.state.isPassword ? (
                          <input
                            type={this.state.type}
                            className="form-control"
                            value={this.state.password}
                            onChange={(e) =>
                              this.setState({ password: e.target.value })
                            }
                          />
                        ) : (
                            <span className="pass-mask">
                              <input
                                type={this.state.type}
                                style={{ outline: "none", border: "none" }}
                                value={this.state.password}
                              />{" "}
                         
                            </span>
                            
                          )} */}



                      <div className="col-md-4 col-xs-12 text-right">
                        <a
                          href="javascript:;"
                          className="edit"
                          data-toggle="modal" data-target="#account-modal"
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   this.setState({
                        //     isPassword: !this.state.isPassword,
                        //   });
                        // }}
                        >
                          Change
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* <div className="prof-cont-row col-md-12 col-xs-12">
                    <div className="row">
                      <div className="col-md-8 col-xs-12">
                        <span className="head">Two Step Verification</span>
                        <span>Enabled</span>
                      </div>
                      <div className="col-md-4 col-xs-12 text-right">
                        <a href="javascript:;" className="edit">
                          Change
                        </a>
                      </div>
                    </div>
                  </div> */}
                  <div className="prof-cont-row col-md-12 col-xs-12">
                    <div className="row">
                      <div className="col-md-8 col-xs-12">
                        <span className="head">Delete Account</span>
                        <span>
                          Account you are requesting to be deleted:
                          {this.state.email_to_show}
                        </span>
                      </div>
                      <div className="col-md-4 col-xs-12 text-right">
                        <button type='button' className="btn btn-red"
                          data-target='#modal_delete'
                          onClick={() => window.jQuery('#modal_delete').modal('show')}
                        >Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Profile Widget Ends here */}
            </div>


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

                      <p class="fw-500">This user will be deleted </p>
                      <button className="btn btn-lightgray" data-dismiss="modal">
                        Cancel
                  </button>
                      <span>{"   "}</span>
                      <button
                        class="btn btn-red"
                        type="button"
                        data-dismiss="modal"
                        data-toggle="modal" data-target="#asking_password_for_delete"
                      // onClick={() => jQuery('#asking_password_for_delete').modal('show')}
                      >
                        Delete
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="pf-btm-wrap">
              <div className="container text-right">
                <button type='button' onClick={() => { this.getUserProfile() }} className="btn btn-lightgray mar-rgt-5">Cancel</button>
                <button type='button' onClick={() => { this.editProfile() }} className="btn btn-green mar-rgt-5">Update Details</button>
              </div>
            </div> */}
          </section>
        </div>

        <footer class="container-fluid">
          <p>&copy; Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>

        <div className="modal fade pop-modal" id="account-modal" role="dialog">
          <div className="modal-dialog modal-xs custom-modal">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs close-modal" data-dismiss="modal" onClick={() => this.cancelFunc()}>
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Change Password</h3>
                <form className="custom-form row column">
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Enter Password <span className="astrick">*</span></label>

                    <div className="form-group login-eye">
                      <i className="pass-visible" toggle="#password-fieldc" onClick={() => this.setState({ show1: !this.state.show1 })}>
                        <img className="off" src="images/visibility-off.svg" alt="hide" />
                        <img className="on" src="images/visibility.svg" alt="show" />
                      </i>
                      <input
                        autoComplete="off"
                        type={this.state.show1 ? "text" : "password"}
                        name="password1"
                        ref={this.password1}
                        className="form-control"
                        name="password" />
                    </div>

                  </div>
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Re-enter Password<span className="astrick">*</span></label>
                    <div className="form-group login-eye">
                      <i className="pass-visible" toggle="#password-fieldc" onClick={() => this.setState({ show: !this.state.show })}>
                        <img className="off" src="images/visibility-off.svg" alt="hide" />
                        <img className="on" src="images/visibility.svg" alt="show" />
                      </i>
                      <input
                        autoComplete="off"
                        type={this.state.show ? "text" : "password"}
                        name="password2"
                        id="login_user_pwd"
                        className="form-control"
                        required="required"
                        ref={this.password2}
                      />
                    </div>
                    {this.state.msgerror == true ? (
                      <div style={{ float: 'left' }}>
                        <small style={{ color: 'red' }}>
                          *Password should be same.
                                </small>
                      </div>
                    ) : (
                      ''
                    )}
                    {this.state.errormsg == true ? (
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
                    <button className="btn btn-lightgray mar-rgt-5 close-modal" data-dismiss="modal"
                    onClick={() => this.cancelFunc()}
                    >Cancel</button>
                    <input type="button" className="btn btn-green mar-rgt-5" value="Submit" onClick={this.handleSubmit} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


        <div className="modal fade pop-modal" id="asking_password_for_delete" role="dialog">
          <div className="modal-dialog modal-xs custom-modal">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs close-modal" data-dismiss="modal" onClick={() => this.cancelFunc()}>
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Password Verification</h3>
                <form className="custom-form row column">

                  <div className="form-group col-md-12 col-xs-12">
                    <label>Enter Password<span className="astrick">*</span></label>
                    <div className="form-group login-eye">
                      <i className="pass-visible" toggle="#password-fieldc" onClick={() => this.setState({ show: !this.state.show })}>
                        <img className="off" src="images/visibility-off.svg" alt="hide" />
                        <img className="on" src="images/visibility.svg" alt="show" />
                      </i>
                      <input
                        type={this.state.show ? "text" : "password"}
                        value={this.state.old_password}
                        className="form-control"
                        required="required"
                        onChange={(e) => this.setState({ old_password: e.target.value })}
                      />
                    </div>
                    {this.state.old_password == '' ? (
                      <div style={{ float: 'left' }}>
                        <small style={{ color: 'red' }}>
                          please enter password field.
                                </small>
                      </div>
                    ) : (
                      ''
                    )}
                    {this.state.old_password != '' && this.state.deleteMsg == true ? (
                      <div style={{ float: 'left' }}>
                        <small style={{ color: 'red' }}>
                          *Incorrect password
                                </small>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                    <button className="btn btn-lightgray mar-rgt-5 close-modal" data-dismiss="modal" onClick={() => this.cancelFunc()}>Cancel</button>
                    <input type="button" className="btn btn-green mar-rgt-5" value="Submit" onClick={() => {
                      if (this.state.old_password !== '') {
                        if (this.checkPassword()) {
                          // this.setState({ deleteMsg: false })
                          // this.deleteUser()
                        } else {
                          // this.setState({ deleteMsg: true })
                        }
                      }
                    }} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>



      </React.Fragment>
    );
  }
}
export default UserProfile;
