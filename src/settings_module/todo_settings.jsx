import React, { useEffect, useState, useRef } from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"
import moment from "moment";



export default function Todo(props) {
  const [state, setState] = useState({ to_do_list_arr: [], })
  const [client_id, setClient_id] = useState(localStorage.getItem("logged_client_id"))
  const [user_id, setUser_id] = useState(localStorage.getItem("logged_user_id"))
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDue_date] = useState("");
  const [Id, setId] = useState("");
  const [edit, setEdit] = useState("");
  const [error, setError] = useState(false);
  // {tittle:"",description:"",due_date:"",Id:"",edit:false,error:false}
  useEffect(() => {
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });
    if (
      user_id === "" ||
      user_id === null ||
      user_id === undefined
    ) {
      props.history.push("/");
    }
    listDetailFunc();
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

  }, []);



  const newFunc = () => {
    setTittle('');
    setDescription('');
    setDue_date('');
    setId('');
    setEdit(false);
  };


  const valueChange = (e) => {
    setTittle(e)
  };

  const descChange = (e) => {
    setDescription(e)
  };

  const dateChange = (e) => {
    let val = jQuery("#due_date").val()
    setDue_date(val)
  };




  const editTodoData = (data) => {

    let date = data.due_date;
    let due_date1;
    if (date !== undefined && date !== "") {
      var array = date.split("-");
      var date_formated = array[2] + "/" + array[1] + "/" + array[0];
      due_date1 = date_formated
    }
    setTittle(data.title);
    setDescription(data.description);
    setDue_date(due_date1);
    setId(data.id);
    setEdit(true);
  };

  const submitFunc = () => {
    let text1 = tittle;
    let desc1 = description;
    let date = due_date;
    let id = Id
    let due_date1;
    if (date !== undefined && date !== "") {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      due_date1 = date_formated
    }
    let input = {
      client_id: client_id,
      title: text1,
      description: desc1,
      due_date: due_date1
    };

    let editInput = {
      client_id: client_id,
      title: text1,
      description: desc1,
      due_date: due_date1,
      id: id
    }
    if (text1 !== "" && due_date1 !== "") {
      if (edit == false) {
        FetchAllApi.create_todo_list(input, (err, response) => {
          if (response.status === 1) {
            alert("ToDo list created successfully")
            jQuery("#add-new-todo").trigger('click');
            listDetailFunc();
          }
        });
      } else {
        FetchAllApi.done_todo_list_edit(editInput, (err, response) => {
          if (response.status === 1) {
            alert("ToDo list Edited successfully")
            jQuery("#add-new-todo").trigger('click');
            setTittle('');
            setDescription('');
            setDue_date('');
            setId('');
            setEdit(false);
            listDetailFunc();
          }
        });
      }
    } else {
      setError(true)
    }
  };

  const listDetailFunc = () => {
    let client = client_id;
    FetchAllApi.to_do_list_details(client, (err, response) => {
      if (response.status === 1) {
        setState({ to_do_list_arr: response.data })
      }
    })
  };

  const doneTodoList = (id, inlet) => {
    let is_done;
    if (inlet == "done") {
      is_done = 0
    } else {
      is_done = 1
    }
    let input = {
      client_id: state.logged_client_id,
      id: id,
      is_done: is_done
    }

    FetchAllApi.done_todo_list(input, (err, response) => {
      if (response.status === 1) {
        listDetailFunc();
      }
    });
  };


  const deleteTodoData = (id) => {
    FetchAllApi.done_todo_list_delete(id, (err, response) => {
      if (response.status === 1) {
        alert("Todo list delete successfully")
        listDetailFunc();
      }
    });
  };

  const logoutLink = () => {
    localStorage.clear();

    props.history.push("/");
  };

  const pageLink = (page_slug) => {
    props.history.push('/' + page_slug)
  }


  return (
    <React.Fragment>
      <div className="container-fluid">
        {/* header Starts here */}
        <UserTopbar logoutSubmit={(e) => logoutLink()} />
        {/* header Ends here */}
        {/* <div class="title-sec col-md-12 col-xs-12">
        <h3>Subscribers</h3>
    </div> */}
        {/* user-content Starts here */}
        <section className="user-content row pad-b-no">
          <Sidebar pageSubmit={e => pageLink(e)} />
          <div className="user-cont-right">
            <div className="title-sec col-md-12 col-xs-12">
              <h3>Todo</h3>
            </div>
            <div className="col-md-12 col-xs-12 pad-no">
              <div className="row todo-encl">
                <div className="col-md-6">
                  <div className="todo-list">
                    <h4>Todo</h4>
                    <div className="todo-listwrap">
                      {state.to_do_list_arr.map((list, idx) => {
                        if (list.is_done == 0) {
                          return (
                            <div className="todo-item">
                              <label className="custom-checkbox small">
                                <input type="checkbox" name="all" onClick={() => { doneTodoList(list.id, "add") }} />&nbsp;
                            <span className="checkmark" />
                              </label>
                              <div className="todo-cont">
                                <span>{list.title}</span>
                                <small>Due Date:{moment(list.due_date, "YYYY/MM/DD").format("DD-MM-YYYY")}</small>
                              </div>
                              <div className="action-item">
                                <a href="javascript:;" data-toggle="modal" data-target="#add-new-todo" onClick={() => { editTodoData(list) }}>
                                  <img className="img-responsive" src="images/pencil-icon.svg" alt="icon" />
                                </a>
                                <a href="javascript:;" onClick={() => { deleteTodoData(list.id) }}>
                                  <img className="img-responsive" src="images/delete-icon.svg" alt="icon" />
                                </a>
                              </div>
                            </div>
                          )
                        }
                      })}
                      <button className="btn btn-dashed add-new" data-toggle="modal" data-target="#add-new-todo">
                        <img src="images/plus-add.svg" alt="icon" />
                          Add New
                        </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="todo-list">
                    <h4>Done</h4>
                    <div className="todo-listwrap done">
                      {state.to_do_list_arr.map((list, idx) => {
                        if (list.is_done == 1) {
                          return (
                            <div className="todo-item">
                              <label className="custom-checkbox small">
                                <input type="checkbox" defaultChecked="checked" name="all" onClick={() => { doneTodoList(list.id, "done") }} />&nbsp;
                            <span className="checkmark" />
                              </label>
                              <div className="todo-cont">
                                <span>{list.title}</span>
                              </div>
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* user-content Ends here */}
      </div>
      {/* Main Wrapper Ends here */}
      {/* Modal Wrapper Starts here */}
      <div className="modal fade pop-modal" id="add-new-todo" role="dialog">
        <div className="modal-dialog modal-xs custom-modal">
          {/* Modal content*/}
          <button type="button" className="close hidden-xs" data-dismiss="modal" onClick={newFunc}>
            <img className="img-responsive" src="images/close-red.svg" alt="icon" />
          </button>
          <div className="modal-content">
            <div className="modal-body text-center">
              {edit == false ? (
                <h3>Add New Todo</h3>) : (
                <h3>Edit New Todo</h3>
              )
              }
              <form className="custom-form row column mar-btm">
                <div className="form-group col-md-12 col-xs-12">
                  <label>Todo Title<span className="astrick">*</span></label>
                  <input type="text" className="form-control" value={tittle} name="tittle" onChange={(e) => { valueChange(e.target.value) }} />
                </div>
                <div className="form-group col-md-12 col-xs-12">
                  <label>Description<span className="astrick">*</span></label>
                  <textarea className="form-control" cols={9} rows={4} name='description' value={description} onChange={(e) => { descChange(e.target.value) }} />
                </div>
                <div className="form-group col-md-12 col-xs-12 pad-btm">
                  <label>Due Date<span className="astrick">*</span></label>
                  <div className="input-group date mar-t-no" >
                    <input type="text" className="form-control" id="due_date" name="due_date" value={due_date} onBlur={(event) => {
                      let value = event.target.value
                      setTimeout(() => { dateChange(value) }, 500)
                    }} />
                    <div className="input-group-addon">
                      <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#due_date').focus()} />
                    </div>
                  </div>
                  {error == true ? (
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
                  <button className="btn btn-lightgray mar-rgt-5" type="button" onClick={() => { jQuery("#add-new-todo").trigger('click'); }}>Cancel</button>
                  <input className="btn btn-green mar-rgt-5" type="button" onClick={submitFunc} value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Wrapper Ends here */}
      {/* Bootstrap Select Picker JS */}
      {/* Scrollbar Js */}
      {/* Bootstrap Datepicker JS */}
      {/* jQueryUI JS */}
    </React.Fragment>

  )
}