import React from "react";
// import LeftSidebar from './left_sidebar'
// import Footer from './footer'

import UserTopbar from "./userTopbar";

import FetchAllApi from "./../../api_links/fetch_all_api";

import jQuery from "jquery";
// import 'bootstrap';
// import '';

class InviteMember extends React.Component {
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

      name: "",
      mailAddress: "",
      designation: "",
      role: "",
      designationList: [],
      designationName: "",
      show_success: false,
      errorMsg:false,
      mailerror:false,
    };
  }

  addNewUser = () => {
    // debugger
    console.log( 'abc',this.state.name ,
    this.state.mailAddress ,
    this.state.designation ,
    this.state.role )
    if (
      this.state.name !== "" &&
      this.state.name !== undefined &&
      this.state.mailAddress !== "" &&
      this.state.mailAddress !== undefined 
      // this.state.designation !== "" &&
      // this.state.role !== ""
) {
      FetchAllApi.addNewUser(
        this.state.logged_client_id,
        this.state.name,
        this.state.mailAddress,
        this.state.designation,
        this.state.role_id,
        // this.state.role,
        this.state.logged_user_id,
        (err, response) => {
          if (response.status === 1) {
            // window.jQuery("#pop-modal-1").modal("hide");
            console.log('gty',response)
              alert('user invited sucessfully')
              this.props.history.push('/member_lists')
            // else {
            //   this.setState({
            //     designationList: [],
            //   });
          }else{
            alert(response.message)
          }
        }
      );
    }else{
      this.setState({errorMsg:true})
      setTimeout(()=>{
        this.setState({errorMsg:false})
      },4000)
    }
  };

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  }

  goToRolesPage = () => {
    let data = [
      this.state.name,
      this.state.mailAddress,
      this.state.designation,
    ];
    this.props.history.push("/roles_permissions", data);
  };

  add_destination = () => {
    if (this.state.designationName !== "") {
      let client_id = this.state.logged_client_id;
      let designationName = this.state.designationName;

      FetchAllApi.addNewUserDesignation(
        client_id,
        designationName,
        (err, response) => {
          if (response.status === 1) {
            window.jQuery("#pop-modal-1").modal("hide");
            this.userDesignationList();
            this.setState({designation:response.id})
            // else {
            //   this.setState({
            //     designationList: [],
            //   });
          }
        }
      );
    }
  };

  mailChange=(e) =>{
    
    this.setState({ mailAddress: e.target.value },this.mailValidation)
  };


  mailValidation =()=>{
    if (/^[a-z0-9]+@(?:[a-z0-9]+\.)+[A-Za-z]+$/.test(this.state.mailAddress)){
      this.setState({mailerror:false})
      }
      else{
        this.setState({mailerror:true})
      }
  }

  handleChange = (designation) => {
    console.log(designation);
    if (designation == "Create New") {
      window.jQuery("#pop-modal-1").modal("show");
    } else {
      this.setState({ designation });
    }
  };

  userDesignationList = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.userDesignationList(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({
          designationList: response.list,
        });
      }
      //  else {
      //   this.setState({
      //     designationList: [],
      //   });
      // }
    });
  };

  UNSAFE_componentWillMount() {
    // jQuery(document.body).removeClass("minimize_leftbar");
    //console.log("logged_user_id", this.state.logged_user_id);

    jQuery("title").html("Customer | GBSC");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    

    if (
      this.props.location.state !== "" &&
      this.props.location.state !== undefined
    ) {
      console.log("yyt", this.props.location.state);
      this.setState({
        name: this.props.location.state[0],
        mailAddress: this.props.location.state[1],
        designation: this.props.location.state[2],
        role: this.props.location.state[3],
        role_id : this.props.location.state[4],
      });
    }

    this.userDesignationList();
    // this.getSpecificPage(1, 10)

    //jQuery(".select-picker").selectpicker();
    // jQuery(window).on("load", function () {
    //   window.jQuery(".mscroll-y").mCustomScrollbar({
    //     axis: "y",
    //     scrollEasing: "linear",
    //     scrollInertia: 600,
    //     autoHideScrollbar: "true",
    //     autoExpandScrollbar: "true",
    //   });
    //   window.jQuery(".mscroll-x").mCustomScrollbar({
    //     axis: "x",
    //     scrollEasing: "linear",
    //     scrollInertia: 600,
    //     autoHideScrollbar: "true",
    //     autoExpandScrollbar: "true",
    //   });

    //   window.jQuery(".ib-scroll").mCustomScrollbar({
    //     scrollEasing: "linear",
    //     scrollInertia: 600,
    //     scrollbarPosition: "outside",
    //   });
    // });

    // jQuery(document).ready(function () {
    //   window.jQuery(".select-picker").selectpicker();
    //   jQuery(".show-pass").click(function () {
    //     jQuery(this).parent(".pass-sec").toggleClass("show");
    //   });
    //   jQuery(".custom-select-drop .dropdown-menu a").click(function () {
    //     jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass(
    //       "active"
    //     );
    //     jQuery(this).parent("li").addClass("active");
    //     jQuery(".open #selected").text(jQuery(this).text());
    //   });
    // });


  }

  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  render() {
    console.log("ftr", this.state.role);
    return (
      <React.Fragment>
        <div className="container-fluid">
          <UserTopbar logoutSubmit={(e) => this.logoutLink()}/>

          {/* user-content Starts here */}
          <section className="user-content row" >
            <div className="container">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Invite Member</h3>
              </div>
              {/* Invite Member Form Starts here */}
              <div className="col-md-12 col-xs-12">
                <form className="custom-form legend-form row">
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Member's Info</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>
                        Name<span className="astrick">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>
                        Mail Address<span className="astrick">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={this.state.mailAddress}
                        onChange={this.mailChange}
                      />
                      {this.state.mailerror == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please enter valid email.
                                </small>
                          </div>
                        ) : (
                            ''
                          )}
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Designation</label>
                      <div className="custom-select-drop dropdown">
                        <select
                          className="selectpicker form-control add-new"
                          data-live-search="true"
                          value={this.state.designation}
                          onChange={(e) => {
                            this.handleChange(e.target.value);
                          }}
                        >
                          <option value="">Choose </option>
                          <option value="Create New">Create New </option>
                          {this.state.designationList.map((k, j) => {
                            return (
                              <option value={k.id}>{k.designation}</option>
                            );
                          })}
                        </select>
                        {/* <select
                          className="selectpicker form-control add-new"
                          data-live-search="true"
                          // title="Choose Designation"
                          onChange={(e) => {
                            this.handleChange(e.target.value);
                          }}
                        >
                          <option>Create New </option>
                          <option>view </option>
                          {this.state.designationList &&
                        this.state.designationList.map((item,i) => {
                          var selected = 'selected'
console.log('kkj',item)      
                    return (
                            <React.Fragment key={item.id}>
                              <option value={item.id}>
                                {item.designation}
                              </option>
                            </React.Fragment>
                          )
                        })}
                        </select> */}
                        {/* <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                  <span id="selected">Choose...</span><span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li className="active"><a href="javascript:;">Add New</a></li>
                  <li><a href="javascript:;">Book Keepers</a></li>
                  <li><a href="javascript:;">Admin</a></li>
                </ul> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mar-btm">
            <div className="col-md-12 col-xs-12">
              <span className="form-legend">Member's Limitations</span>
            </div>
            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
              <label>Country</label>
              <div className="custom-select-drop dropdown">
                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                  <span id="selected">All</span><span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li className="active"><a href="javascript:;">All</a></li>
                  <li><a href="javascript:;">India</a></li>
                  <li><a href="javascript:;">Singapore</a></li>
                  <li><a href="javascript:;">Canada</a></li>
                </ul>
              </div>
            </div>
            <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
              <label>Subscribers</label>
              <div className="custom-select-drop dropdown">
                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                  <span id="selected">All</span><span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li className="active"><a href="javascript:;">All</a></li>
                  <li><a href="javascript:;">Subscriber 1</a></li>
                  <li><a href="javascript:;">Subscriber 2</a></li>
                  <li><a href="javascript:;">Subscriber 3</a></li>
                </ul>
              </div>
            </div>
          </div>
         
          */}
                   <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Roles in Genie</span>
                    </div>

                    {this.state.role != "" && this.state.role != undefined  ? (
                      <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        < button type='button' className="btn btn-blue mar-btm no-hover">{this.state.role}</ button>
                      </div>) : null}
                    <div className="clearfix"></div>
                    <div
                      onClick={this.goToRolesPage}
                      className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12"
                    >
                      <button className="btn btn-wide assign-btn">
                        <img src="images/blue-add-icon.svg" alt="icon" /> Assign
                        Roles
                      </button>
                    </div>

                    {/* {this.state.role != "" ? (
                      <span className="badge blue">{this.state.role}</span>
                    ) : null} */}
                    {/* {this.state.role != "" ? (
                      <div
                        className="badge blue"
                        dangerouslySetInnerHTML={{ __html: this.getRole() }}
                      />
                    ) : null} */}
                  </div>

                  <div className="pf-btm-wrap">
                    <div className="container text-right">
                      <button
                        type="button"
                        onClick={() =>
                          this.props.history.push("/loading", ["/invite_member"])
                        }
                        className="btn btn-lightgray mar-rgt-5"
                      >
                        Cancel
                    </button>
                      <button
                        type="button"
                        onClick={(e) => this.addNewUser(e)}
                        className="btn btn-green mar-rgt-5"
                      >
                        Invite
                    </button>
                    </div>
                  </div>

                </form>
              </div>
              {/* Invite Member Form Ends here */}
              {this.state.errorMsg == true ? (
              <div className='alert alert-card warning alert-dismissible fade in '>
                <a
                  href='#'
                  className='close'
                  data-dismiss='alert'
                  aria-label='close'
                  onClick={() => {
                    this.setState({ error: false })
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
                </div>
              </div>
            ) : null}
            </div>
            <div
              className="modal fade pop-modal"
              id="pop-modal-1"
              role="dialog"
            >
              <div className="modal-dialog modal-md custom-modal">
                <div className="modal-content">
                  <div className="modal-body text-center">
                    <h3>Add Designation</h3>
                    <form className="custom-form row">
                      <div className="form-group col-md-12 col-xs-12 pad-no">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <label>
                            Designation Name
                            <span className="astrick">*</span>
                          </label>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              this.setState({ designationName: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      {this.state.show_success ? (
                        <small style={{ color: "green" }} className="mymsg">
                          added successfully
                        </small>
                      ) : (
                        ""
                      )}
                      <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                        <button
                          className="btn btn-lightgray mar-rgt-5"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <span>{"   "}</span>
                        <button
                          className="btn btn-green mar-rgt-5"
                          type="button"
                          onClick={this.add_destination}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
        </div>

        <footer class="container-fluid">
          <p>&copy; Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
      </React.Fragment>
    );
  }
}
export default InviteMember;
