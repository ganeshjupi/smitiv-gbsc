import React from "react";
// import LeftSidebar from './left_sidebar'
// import Footer from './footer'
import { Multiselect } from "multiselect-react-dropdown";
// import UserTopbar from "./header";

import UserTopbar from "./header";
import FetchAllApi from "./../../api_links/fetch_all_api";
import LeftSidebar from "./../left_sidebar";

import jQuery from "jquery";
import { meanBy } from "lodash";
// import 'bootstrap';
// import '';

class InviteMember extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      first_logged_client_id: localStorage.getItem("first_logged_client_id"),
      name: "",
      mailAddress: "",
      designation: "",
      role: "",
      designationList: [],
      designationName: "",
      country: [], // ["india", "singapore"]
      subscribers: [],
      // [
      //   { name: "subscriber1", id: 1 },
      //   { name: "subscriber2", id: 2 },
      // ], // 5
      selectedCountry: [],
      selectedSubscribers: [],
      show_success: false,
      selectedValue: [],
      role_id: "",
      country_ids: [],
      errorMsg: false,
      mailerror: false,
    };
    this.multiselectRef = React.createRef();
    this.multiselectRef_subscriber = React.createRef();
  }

  addNewUser = (e) => {
    let sub_ids = [];
    this.state.selectedSubscribers.map((itm) => sub_ids.push(itm.id));

    e.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.mailAddress !== ""
      // this.state.designation !== "" &&
      // this.state.selectedCountry.length &&
      // this.state.selectedSubscribers.length
    ) {
      const member = {
        client_id: this.state.logged_client_id,
        role_id: this.state.role_id, // this.props.location.state.roles;
        name: this.state.name,
        email_id: this.state.mailAddress,
        logged_in_user_id: this.state.logged_user_id,
        designation: this.state.designation,
        country_id: this.state.country_ids,
        subscribers: sub_ids,
        is_client_selected: this.state.logged_client_id != this.state.first_logged_client_id ? 1 : 0
      };
      FetchAllApi.addNewmember(member, (err, response) => {
        if (response.status === 1) {
          alert("API success- Memeber added");
          this.props.history.push("/loading", ["/member_invite"]);
        } else {
          // this.props.history.push("/loading", ["/member_invite"]);
          alert(response.message);
        }
      });
    } else {
      this.setState({ errorMsg: true })
      setTimeout(() => {
        this.setState({ errorMsg: false })
      }, 4000)
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
      this.multiselectRef.current.getSelectedItems(),
      this.multiselectRef_subscriber.current.getSelectedItems(),
    ];
    this.props.history.push("/add_roles", data);
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
            this.setState({ designation: response.id });
            // else {
            //   this.setState({
            //     designationList: [],
            //   });
          }
        }
      );
    }
  };

  handleChange = (designation) => {
    if (designation == "Create New") {
      window.jQuery("#pop-modal-1").modal("show");
    } else {
      this.setState({ designation });
    }
  };

  // onSelectCountry = (selectedList, selectedItem) => {
  //   this.setState({ country: selectedList });
  // };
  // onRemoveCountry = (selectedList, removedItem) => {
  //   this.setState({ country: selectedList });
  // };
  // onSelectSubscriber = (selectedList, selectedItem) => {
  //   this.setState({ selectedSubscribers: selectedList });
  // };
  // onRemoveSubscriber = (selectedList, removedItem) => {
  //   this.setState({ selectedSubscribers: selectedList });
  // };

  get_subscriber_list = () => {
    var country_ids = [];
    let selected_countries = this.multiselectRef.current.getSelectedItems();
    if (
      // this.multiselectRef.current.getSelectedItems() == "" ||
      // this.multiselectRef.current.getSelectedItems() == null ||
      this.multiselectRef.current.getSelectedItems() == undefined
    ) {
      selected_countries = this.props.location.state.member[3];
    }
    selected_countries.map((itm) => country_ids.push(itm.id));
    console.log("country_ids", country_ids);
    this.setState({ country_ids: country_ids });
    FetchAllApi.get_subscriber_list_by_country(country_ids, (err, response) => {
      if (response.status === 1) {
        this.setState({ subscribers: response.list });
      } else {
        this.setState({
          subscribers: [],
        });
      }
    });
  };

  onSelect = (selectedList, selectedItem) => {
    // this.setState({ selectedCountry: selectedList });
    this.get_subscriber_list();
    // console.log(
    //   "selectedCountry1",
    //   this.multiselectRef.current.getSelectedItems()
    // );
  };
  onRemove = (selectedList, removedItem) => {
    this.get_subscriber_list();
    // this.setState({ selectedCountry: selectedList });
  };
  onSelectSubscriber = (selectedList, selectedItem) => {
    // this.setState({ selectedSubscribers: selectedList });
  };
  onRemoveSubscriber = (selectedList, removedItem) => {
    // this.setState({ selectedSubscribers: selectedList });
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
    jQuery(document.body).removeClass("minimize_leftbar");
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

  getRole = () => {
    const arr = [];
    console.log(this.state.role);
    for (const property in this.state.role) {
      const val = this.state.role[property];
      const html = `<span className="badge blue">${property}</span>`;
      arr.push(html);
    }
    return arr;
  };

  country = () => {
    let country_id = 101;

    FetchAllApi.get_subscriber_list_by_country(country_id, (err, response) => {
      window.jQuery("#pop-modal-1").modal("hide");

      this.setState({ selectedCountry: response.id });
      console.log(response);
    });
  };

  country = () => {
    let country_id = 101;

    FetchAllApi.get_countries((err, response) => {
      //alert(response)
      console.log("get_countries_list", response.list);
      if (response.status === 1) {
        this.setState({
          selectedCountry: response.list,
        });
      }
    });
  };

  getRole = () => {
    const arr = [];
    for (const property in this.state.role) {
      const val = this.state.role[property];
      const html = `<span className="badge blue">${property}</span>`;
      arr.push(html);
    }
    return arr;
  };

  // country = () => {
  //   let country_id = 101;

  //   FetchAllApi.get_subscriber_list_by_country(country_id, (err, response) => {
  //     window.jQuery("#pop-modal-1").modal("hide");

  //     this.setState({ selectedCountry: response.id });
  //     console.log(response);
  //   });
  // };

  // country = () => {
  //   let country_id = 101;

  //   FetchAllApi.get_countries((err, response) => {
  //     //alert(response)
  //     console.log("get_countries_list", response.list.length);
  //     if (response.status === 1) {
  //       this.setState({
  //         selectedCountry: response.list,
  //       });
  //     }
  //   });
  // };

  mailChange = (e) => {

    this.setState({ mailAddress: e.target.value }, this.mailValidation)
  };


  mailValidation = () => {
    if (/^[a-z0-9]+@(?:[a-z0-9]+\.)+[A-Za-z]+$/.test(this.state.mailAddress)) {
      this.setState({ mailerror: false })
    }
    else {
      this.setState({ mailerror: true })
    }
  }

  componentDidMount() {
    // this.country();
    // const { member, roles } = this.props.location.state;
    // console.log("country", roles);

    if (
      this.props.location.state !== "" &&
      this.props.location.state !== null &&
      this.props.location.state !== undefined
    ) {
      const { member, roles, role_id } = this.props.location.state;
      console.log("member", role_id);
      if (member) {
        let country_ids = [];
        member[3].map((itm) => country_ids.push(itm.id));

        this.multiselectRef.current.value = member[3];
        this.multiselectRef_subscriber.current.value = member[4];

        this.setState(
          {
            name: member[0],
            mailAddress: member[1],
            designation: member[2],
            selectedValues: member[3],
            selectedSubscribers: member[4],
            role: roles,
            role_id: role_id,
            country_ids: country_ids,
          },
          this.get_subscriber_list()
        );
      }
    }



    // if (
    //   this.props.location.state != "" &&
    //   this.props.location.state != undefined
    // ) {
    //   console.log("yyt", localStorage.getItem("rolesAndPermissionForMemberInvite"));
    // }
    this.country();
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

    jQuery(document).ready(function () {
      window.jQuery(".select-picker").selectpicker();
      jQuery(".show-pass").click(function () {
        jQuery(this).parent(".pass-sec").toggleClass("show");
      });
      // jQuery(".custom-select-drop .dropdown-menu a").click(function () {
      //   jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass(
      //     "active"
      //   );
      //   jQuery(this).parent("li").addClass("active");
      //   jQuery(".open #selected").text(jQuery(this).text());
      // });
    });


  }

  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  render() {
    console.log("ftr", this.props.location.state);

    // console.log("ftr", this.state.selectedSubscribers);

    return (
      <div>
        <div className="container-fluid">
          {/* header Starts here */}
          {/* <LeftSidebar history={this.props.history}  pageSubmit={(e) => this.pageLink(e)} /> */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
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
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                        type="text"
                        name="name"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>
                        Mail Address<span className="astrick">*</span>
                      </label>
                      <input
                        type="text"

                        value={this.state.mailAddress}
                        onChange={this.mailChange}
                        className="form-control"
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
                    </div>

                  </div>
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Member's Limitations</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Country</label>
                      <Multiselect
                        ref={this.multiselectRef}
                        className="selectpicker form-control add-new"
                        selectedValues={this.state.selectedValues}
                        options={this.state.selectedCountry}
                        displayValue="name"
                        onRemove={() => {
                          this.country();
                          this.onRemove();
                        }}
                        onSelect={() => {
                          this.country();
                          this.onSelect();
                        }}
                      >
                        {/* {this.country()} */}
                      </Multiselect>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Subscribers</label>
                      <Multiselect
                        ref={this.multiselectRef_subscriber}
                        className="selectpicker form-control add-new"
                        options={this.state.subscribers}
                        selectedValues={this.state.selectedSubscribers}
                        displayValue="name"
                        onRemove={this.onRemoveSubscriber}
                        onSelect={this.onSelectSubscriber}
                      />
                    </div>
                  </div>
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Roles in Genie</span>
                    </div>

                    {this.state.role != "" ? (
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

                  <div className="col-md-12 text-left">
                    <div className="row mar-top">
                      <button
                        type="button"
                        onClick={() =>
                          this.props.history.push("/loading", ["/member_invite"])
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
                          className="btn btn-lightgray"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <span>{"   "}</span>
                        <button
                          className="btn btn-green"
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
        {/* Main Wrapper Ends here */}
        {/* footer Starts here */}
        <footer className="container-fluid">
          <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
        {/* footer Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}
      </div>
    );
  }
}
export default InviteMember;
