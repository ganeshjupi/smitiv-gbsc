import React, { Component } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FetchAllApi from "../../api_links/fetch_all_api";

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",

  background: isDragging ? "lightgreen" : "",

  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({});

class BatchColumnRearrange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      logged_subscription_start_date: localStorage.getItem(
        "logged_subscription_start_date"
      ),
      logged_subscription_end_date: localStorage.getItem(
        "logged_subscription_end_date"
      ),
      logged_plan_id: localStorage.getItem("logged_plan_id"),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    this.setState({ items: result });
    return result;
  };
  componentDidMount() {
    // console.log('lolo',this.props.history)
    this.getColumns();
  }

  getColumns = () => {
    var coreData = {
      user_id: this.state.logged_user_id,
      client_id: this.state.logged_client_id
    };
    var data = { "status": 1, "message": "Product item list fetched successfully", "user_id": "1", "list": [{ "id": 1, "user_id": 1, "columns": [{ "column_name": "sample 1", "type": 1, "options": [], "is_visible": 2 }, { "column_name": "sample 2", "type": 2, "options": ["1", "2", "3", "4", "5"], "is_visible": 2 }, { "column_name": "sample 3", "type": 1, "options": [], "is_visible": 2 }, { "column_name": "sample 4", "type": 1, "options": [], "is_visible": 2 }, { "column_name": "sample 5", "type": 2, "options": ["1", "2", "3", "4", "5"], "is_visible": 2 }] }] }
    this.setState({ items: data.list[0].columns });
    // FetchAllApi.getAllColumns(coreData, (err, response) => {
    //   console.log("new document", response.message);
    //   if (response.status === 1) {
    //     this.setState({ items: data.list[0].columns });
    //   } else {
    //   }
    // });
  };
  deleteCoulmn = (index) => {
    var items = this.state.items;
    items.splice(index, 1);
    this.setState({ items });
  };

  upDateCoulmns = () => {
    var coreData = {
      user_id: this.state.logged_user_id,
      columns: this.state.items,
      client_id: this.state.logged_client_id
    };

    FetchAllApi.upDateCoulmns(coreData, (err, response) => {
      console.log("new document", response.message);
      alert(response.message);
      if (response.status === 1) {
        localStorage.setItem("is_coulmn_updated", "yes");
        var iframe = document.createElement("iframe");
        iframe.style.cssText = "opacity:0;position:absolute";
        iframe.src = "about:blank";
        iframe.onload = function () {
          iframe.contentWindow.close.call(window);
          document.body.removeChild(iframe);
        };
        document.body.appendChild(iframe);

        // this.props.changeState()
        //   this.getColumns()

        //   this.setState({ items: response.list[0].columns })
      } else {
      }
    });
  };
  callMe = (e, index) => {
    //   alert(e.currentTarget.textContent)
    var items = this.state.items;
    console.log("sduailu", items);
    items[index]["column_name"] = e.currentTarget.textContent;
    this.setState({ items }, () => { });
  };
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    console.log("hfhfhf", this.state.items);
    return (
      // <div className='modal-content'>
      <div>
        <div className="row" style={{ margin: 12 }}>
          <a class="close-btn" style={{ float: "right" }}>
            <img
              onClick={() => {
                //   this.props.history.push('/create_invoice')

                this.props.changeState();
              }}
              className="img-responsive"
              src={
                this.props.createInvoice == "1"
                  ? "images/close-circle-red.svg"
                  : "../../images/close-circle-red.svg"
              }
            />
          </a>
        </div>

        <div className="modal-body">
          <h3>Edit Column</h3>

          <div className="sortable-enclose row">
            <div className="col-md-12">
              <div className="row-head col-md-12 col-xs-12">
                <div className="col-sm-10 col-xs-8">Column Label</div>
                <div className="col-sm-2 col-xs-4 text-center">Show</div>
              </div>

              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      className="row-body col-md-12 col-xs-12"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {this.state.items.map((item, index) => (
                        <Draggable
                          key={item.column_name}
                          draggableId={item.column_name}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="row-item row"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div className="col-sm-10 col-xs-8">
                                <span>
                                  <img
                                    src={
                                      this.props.createInvoice == "1"
                                        ? "images/dots-menu.svg"
                                        : "../../images/dots-menu.svg"
                                    }
                                    alt="icon"
                                    style={{ marginTop: "-17px" }}
                                  />
                                </span>
                                <div className="custom-col-lab">
                                  <span
                                    contentEditable="true"
                                    onBlur={(e) => {
                                      this.callMe(e, index);
                                    }}
                                  >
                                    {item.column_name}{" "}
                                  </span>
                                  <div className="pull-right">
                                    <button className="btn">
                                      <img
                                        src={
                                          this.props.createInvoice == "1"
                                            ? "images/tick-green.svg"
                                            : "../../images/tick-green.svg"
                                        }
                                        alt="icon"
                                      />
                                    </button>
                                    <button className="btn">
                                      <img
                                        src={
                                          this.props.createInvoice == "1"
                                            ? "images/cross-red.svg"
                                            : "../../images/cross-red.svg"
                                        }
                                        alt="icon"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-2 col-xs-4 text-center">
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      if (
                                        this.state.items[index].is_visible == 1
                                      ) {
                                        var items = this.state.items;
                                        items[index].is_visible = 2;
                                        this.setState({ items });
                                      } else {
                                        var items = this.state.items;
                                        items[index].is_visible = 1;
                                        this.setState({ items });
                                      }
                                    }}
                                    name
                                    defaultChecked={
                                      this.state.items[index].is_visible == 1
                                        ? true
                                        : false
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                                <a
                                  href="javascript:;"
                                  className="del-row"
                                  onClick={() => {
                                    this.deleteCoulmn(index);
                                  }}
                                >
                                  <img
                                    className="img-responsive"
                                    src={
                                      this.props.createInvoice == "1"
                                        ? "images/delete-icon.svg"
                                        : "../../images/delete-icon.svg"
                                    }
                                    alt="icon"
                                  />
                                </a>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
          <div className="btn-sec pad-no mar-no text-center">
            <hr />
            <button
              className="btn btn-lightgray"
              type="button"
              onClick={() => {
                //   this.props.history.push('/create_invoice')

                this.props.changeState();
              }}
            >
              Cancel
            </button>
            {"           "}
            <button
              className="btn btn-green"
              type="button"
              onClick={() => {
                this.upDateCoulmns();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BatchColumnRearrange;
