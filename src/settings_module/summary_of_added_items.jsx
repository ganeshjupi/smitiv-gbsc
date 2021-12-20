import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class Summary extends React.Component {
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
      selectedColumnType: '',
      number_of_columns_list: [],
      showId: "",
      option: "",
      editIdx: '',
      edit: false,
      editValue: '',
      search:'',
    }

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

  componentDidMount = () => {
    this.getColumns();

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

  };

  typeOfColumnTobeModified = (changeEvent) => {
    this.setState({
      selectedColumnType: changeEvent.target.value,
    });
  };

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  };


  onFunc = (val) => {
    if (val == undefined) {
      let int = this.state.number_of_columns_list[0].column_name;
      let show =  this.state.number_of_columns_list[0].type == 1 ? false : true
      this.setState({ showId: int , show})
    } else {
      let obj = this.state.number_of_columns_list.find((e)=> e.column_name == val) 
      let show = obj.type == 1 ? false : true
      this.setState({ showId: val,show })
    }
  };

  newFunc = () => {
    this.setState({
      option: "",
      editIdx: '',
      edit: false,
      editValue: '',
    })
  };

  changeOption = (e) => {
    this.setState({ option: e.target.value })
  };

  editFunc = (input, val, idx) => {
    this.setState({ editValue: input, option: val, editIdx: idx, edit: true })
  };



  add_coulmn = (colType) => {
    var user_id = parseFloat(this.state.logged_user_id);
    let type = this.state.selectedColumnType;
    type = type ? type : colType;
    if (type === "textField") {
      var type_ = 1;
    } else {
      var type_ = 2;
    }
    var myVal = type_;
    let coulmn_name = jQuery("#coulmn_name").val();

    var coulmnData = this.state.number_of_columns_list;
    var obJ = {
      column_name: coulmn_name,
      type: myVal,
      options: [],
      is_visible: 1,
    };
    // alert(coulmnData)

    coulmnData.push(obJ);
    var coreData = {
      user_id: this.state.logged_user_id,
      columns: coulmnData,
      client_id: this.state.logged_client_id
    };

    FetchAllApi.upDateCoulmns(coreData, (err, response) => {
      console.log("new document", response.message);
      alert(response.message);
      if (response.status === 1) {
        this.getColumns();

        //   this.setState({ items: response.list[0].columns })
      } else {
      }
    });
    window.jQuery("#pop-modal-2").modal("hide");
  };

  modal_cancel = () => {
    jQuery("#sales_tax_code").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#tax").val("");
    this.setState({ modal_info_msg: "" });
    window.jQuery("#pop-modal-1").modal("hide");
  };


  getColumns = () => {
    // this.setState({ number_of_columns_list: [] });
    var coreData = {
      user_id: this.state.logged_user_id,
      client_id: this.state.logged_client_id,
      search: this.state.search,
    };
    FetchAllApi.getAllColumns(coreData, (err, response) => {
      if (response.status === 1) {
        this.setState({ number_of_columns_list: response.list[0].columns }, this.onFunc);
      } else {
      }
    });
  };


  deleteColumns = (value, ind) => {
    this.state.number_of_columns_list.map((item, idx) => {
      if (item.column_name == value.column_name) {
        let arr = item.options
        arr.splice(ind, 1)
        let items = this.state.number_of_columns_list
        items[idx][
          "options"
        ] = arr;
        var coreData = {
          user_id: this.state.logged_user_id,
          columns: items,
          client_id: this.state.logged_client_id
        };

        FetchAllApi.upDateCoulmns(coreData, (err, response) => {
          if (response.status === 1) {
            alert("Iteam deleted successfully")
            this.getColumns();
          } else {
          }
        });
      }
    })

  };


  editColumns = () => {
    let value = this.state.editValue
    this.state.number_of_columns_list.map((item, idx) => {
      if (item.column_name == value.column_name) {
        let arr = item.options
        arr.splice(this.state.editIdx, 1, this.state.option)
        let items = this.state.number_of_columns_list
        items[idx][
          "options"
        ] = arr;
        var coreData = {
          user_id: this.state.logged_user_id,
          columns: items,
          client_id: this.state.logged_client_id
        };

        FetchAllApi.upDateCoulmns(coreData, (err, response) => {
          if (response.status === 1) {
            alert("Iteam Edited successfully")
            this.getColumns();
          } else {
          }
        });
      }
    })

  };


  statusChange = (value, ind) => {
    this.state.number_of_columns_list.map((item, idx) => {
      if (item.column_name == value.column_name) {
        let val;
        if (value.is_visible == 1) {
          val = 0;
        } else {
          val = 1
        }
        let items = this.state.number_of_columns_list
        items[idx][
          "is_visible"
        ] = val;
        var coreData = {
          user_id: this.state.logged_user_id,
          columns: items,
          client_id: this.state.logged_client_id
        };

        FetchAllApi.upDateCoulmns(coreData, (err, response) => {
          if (response.status === 1) {
            alert("Item status change successfully")
            this.getColumns();
          } else {
          }
        });
      }
    })



  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }


  render() {
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
              <div className="title-sec col-md-12 col-xs-12 mar-btm">
                <h3>Summary of Added Items</h3>
                {/* <div>
                  <div className="dib">
                    <div className="dropdown menu-item">
                      <button className="btn btn-blue dropdown-toggle btn-arrow" data-toggle="dropdown" aria-expanded="false">Export<span className="caret" /></button>
                      <ul className="dropdown-menu align-right">
                        <li><a href="javascript:;">Export as Excel</a></li>
                        <li><a href="javascript:;">Export as PDF</a></li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
              {this.state.number_of_columns_list.length == 0 ? (
                <div className="img-concept text-center">
                  <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                  <p>Looks like there's no column list</p>
                </div>) : (
                  <div className="col-md-12 col-xs-12">
                    <div className="row">
                      <div className="pills-search">
                        <ul className="nav nav-pills transparent nowrap ofx-auto">
                          {this.state.number_of_columns_list.map((col, idx) => {
                            return (
                              <li  ><a data-toggle="pill" onClick={() => { this.onFunc(col.column_name) }}>{col.column_name}</a></li>
                            )
                          })}
                        </ul>
                        <form className="custom-form h-small mar-b-no">
                          <div className="form-group search-box mar-no">
                            <input type="text" name="search" className="form-control" value={this.state.search} onChange={(e)=>this.setState({search: e.target.value},()=>this.getColumns())} placeholder="Search..." />
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="row tab-content mar-top">
                      <div id={this.state.showId} className="mar-top tab-pane fade in active">
                     {this.state.show &&
                        <div className="col-md-12 col-xs-12 pad-no">
                          <button className="btn btn-dashed add-new" data-toggle="modal" data-target="#add_new_role" onClick={this.newFunc} >
                            <img src="images/plus-add.svg" alt="icon" />
                        Add New {this.state.showId}
                          </button>
                        </div>}
                        <div className="report-table reconcile-table col-md-12 col-xs-12 pad-no">
                          <div className="table-responsive">
                            <table className="table detail-report">
                              <thead>
                                <tr>
                                  <th>
                                    <label className="custom-checkbox small">
                                      <input type="checkbox" 
                                      // checked={this.state.all_checked} 
                                      // onChange={(e)=>{
                                      //   if(e.target.checked){

                                      //   }else{
                                          
                                      //   }

                                      // }} 
                                      name="all" />&nbsp;
                                  <span className="checkmark" />
                                    </label>
                                  </th>
                                  <th>Name</th>
                                  <th>Created on</th>
                                  <td><span className="sr-only">Action</span></td>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.number_of_columns_list.map((col, idx) => {
                                  if (this.state.showId == col.column_name) {
                                    return (
                                      col.options.map((sub, idx) => {
                                        return (
                                          <tr>
                                            <td>
                                              <label className="custom-checkbox small">
                                                <input type="checkbox" name="all" />&nbsp;
                                  <span className="checkmark" />
                                              </label>
                                            </td>
                                            <td>{sub}</td>
                                            <td>06-08-2020</td>
                                            <td className="text-right">
                                            <div className="dropdown menu-item new-cus">
                                      <a
                                        href="javascript"
                                        class="dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <button
                                          className="btn btn-green dropdown-toggle"
                                          type='button'
                                        >
                                          Action
                                        <span className='caret' />
                                        </button>
                                      </a>
                                      <ul className="dropdown-menu align-right">
                                      <li><a href="javascript:;" data-toggle="modal" data-target="#add_new_role" onClick={() => { this.editFunc(col, sub, idx) }}>Edit</a></li>
                                                  <li><a href="javascript:;" onClick={() => { this.deleteColumns(col, idx) }}>Delete</a></li>
                                                  <li><a href="javascript:;" onClick={() => { this.statusChange(col, idx) }}>Inactive</a></li>
 </ul>
                                    </div>
                                              {/* <div className="dropdown menu-item action-item">
                                                <button className="btn btn-green dropdown-toggle" type="button" data-toggle="dropdown">Action
                                    <span className="caret" /></button>
                                                <ul className="dropdown-menu align-right">
                                                  <li><a href="javascript:;" data-toggle="modal" data-target="#add_new_role" onClick={() => { this.editFunc(col, sub, idx) }}>Edit</a></li>
                                                  <li><a href="javascript:;" onClick={() => { this.deleteColumns(col, idx) }}>Delete</a></li>
                                                  <li><a href="javascript:;" onClick={() => { this.statusChange(col, idx) }}>Inactive</a></li>
                                                </ul>
                                              </div> */}
                                            </td>
                                          </tr>
                                        )
                                      }))
                                  }
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </section>
          {/* user-content Ends here */}
        </div>
        <div
          className="modal fade pop-modal"
          id="add_new_role"
          role="dialog"
        >
          <div className="modal-dialog modal-md custom-modal">
            <button
              type="button"
              className="close hidden-xs"
              data-dismiss="modal"
              onClick={() => {
                this.setState({ roleStringLen: false });
              }}
            >
              <img
                className="img-responsive"
                src="../../images/close-red.svg"
                alt="icon"
              />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Add Options</h3>
                <form className="custom-form row">
                  <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                    <div className="col-md-4 col-sm-4 col-xs-12">
                      <label>Options</label>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-12">
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="options"
                        placeholder="Enter options seperate by comma"
                        value={this.state.option}
                        onChange={this.changeOption}
                      />
                      <div style={{ float: "left" }}>
                        {this.state.roleStringLen && (
                          <small
                            style={{ color: "red" }}
                          >
                            *Required.
                          </small>
                        )}
                      </div>{" "}
                    </div>
                  </div>

                  <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                    <button
                      className="btn btn-lightgray"
                      data-dismiss="modal"
                      onClick={() => {
                        this.setState({
                          roleStringLen: false,
                        });
                      }}
                    >
                      Cancel
                                            </button>
                    <span>{"   "}</span>
                    <input type="hidden" id="colid" />

                    <button
                      className="btn btn-green"
                      type="button"
                      data-dismiss="modal"
                      onClick={() => {
                        if (this.state.edit == false) {
                          const userId = Number(
                            this.state.logged_user_id
                          );

                          let coulmnId
                          this.state.number_of_columns_list.map((col, idx) => {
                            if (this.state.showId == col.column_name) {
                              coulmnId = idx
                              return coulmnId
                            }
                          })
                          console.log("button", coulmnId)
                          const localString = jQuery(
                            "#options"
                          ).val();
                          const optionsArray = localString.split(
                            ","
                          );
                          var items = this.state
                            .number_of_columns_list;
                          var exist =
                            items[coulmnId].options;
                          var options = [
                            ...exist,
                            ...optionsArray,
                          ];
                          items[coulmnId][
                            "options"
                          ] = options;

                          var coreData = {
                            user_id: this.state
                              .logged_user_id,
                            columns: items,
                            client_id: this.state.logged_client_id
                          };

                          FetchAllApi.upDateCoulmns(
                            coreData,
                            (err, response) => {
                              console.log(
                                "new document",
                                response.message
                              );
                              // alert(response.message);
                              if (response.status === 1) {
                                this.getColumns();
                                jQuery("#options").val(
                                  ""
                                );
                                window
                                  .jQuery("#add_new_role")
                                  .modal("hide");
                                //   this.setState({ items: response.list[0].columns })
                              } else {
                              }
                            }
                          );
                          // FetchAllApi.invoiceadd_dropdown_options(
                          //   userId,
                          //   coulmnId,
                          //   optionsArray,
                          //   (err, response) => {
                          //     console.log('vendor_names', response)

                          //     if (response.status === 1) {
                          //       alert('success')
                          //       this.getColList()
                          //       window.jQuery('#add_new_role').modal('hide')
                          //     } else {
                          //     }
                          //   }
                          // )
                        } else {
                          this.editColumns();
                        }
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



        {/* Main Wrapper Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}
      </div>

    )
  }
}