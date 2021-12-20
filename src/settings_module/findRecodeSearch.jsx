import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery';
import "./preference.css";
import Loader from "react-loader-spinner";
import { Multiselect } from 'multiselect-react-dropdown';
import { deburr } from "lodash";
import Comma from './../components/comma'
import moment from "moment";




export default class Search extends React.Component {
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
      condition: sessionStorage.getItem("conditions"),
      addCondition: [{ key: "type", condition: "", value: [], from: "", to: "" }],
      AccountOptions: [],
      text: [],
      toggle: false,
      disabled: true,
      selectedVal: [],
      tableDataArr: [],
      checked: false,
      loading: true,
      drop1Arr: [],
      drop2Arr: [],
      index: "",
      checkAll: false,
      tableHeader: "",
      tablesort: false,
      gst_list: [],
      country_code: '',
      sourceNameOptions: [],
      customdrp:[],
      customtxt:'',
      customselect:'',
      customdivflg:false,
      searchtype: localStorage.getItem("search"),
    }
    this.sourceName = React.createRef();
    this.sourceDescription = React.createRef();
    this.sourceAccount = React.createRef();
    this.sourceTax = React.createRef();
    this.manualAccount = React.createRef();
    this.manualTax = React.createRef();
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
    this.dropDown1Fetch();
    this.get_gst_list();
    this.getCountry();
    this.getAccountOption();
    this.sourceNameOption();
    this.conditionalRender();

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
    FetchAllApi.get_custom_column_list(this.state.logged_client_id, (err, response) => {
      if (response.status === 1) {
        //let data = response.data.map((item) => { item.check = false })
        this.setState({ customdrp: response.data })
      }
    })

  };




  conditionalRender = () => {
    let input = this.state.condition
    if (input !== null) {
      let value = JSON.parse(input)
      this.setState({ addCondition: value })
      sessionStorage.clear();
    } else {
      this.setState({ addCondition: [...this.state.addCondition] })
    }
  }

  getVal = () => {
    let string = JSON.parse(this.state.logCondition)
  }

  dropDown1 = (idx, e) => {
    let add = [...this.state.addCondition]
    add[idx].key = e.target.value
    this.setState({ addCondition: add },
    this.dropDown2Fetch(idx))
    if(e.target.value==="custom"){
     this.setState({ customdivflg:true});    
    }
    else{
      this.setState({ customdivflg:false});
    }
  };


  dropDown2(data, idx) {
    if (data == "=") {
      this.setState({ condition: "Equal" })
    } else if (data == ">") {
      this.setState({ condition: "great than" })
    } else if (data == "<") {
      this.setState({ condition: "less than" })
    }
    let add = [...this.state.addCondition]
    add[idx].condition = data
    this.setState({ addCondition: add })
  };


  change = (e) => {
    this.setState({ textField2: e.target.value })
  };

  addConditionFunc = () => {
    let plus = [...this.state.addCondition]
    plus.push({ key: "type", condition: "", value: [], from: "", to: "" })
    this.setState({ addCondition: plus }, this.dropDown1Fetch)
  };

  delCondition = (idx) => {
    let arr = [...this.state.addCondition]
    arr.splice(idx, 1)
    this.setState({ addCondition: arr })
  };

  search = () => {
    this.setState({ toggle: true })
    this.tableDataFunc()
  };



  onSelectText = (idx) => {
    return (selectedList, selectedItem) => {
      console.log(selectedItem, idx)
      let add = [...this.state.addCondition]
      add[idx].value = selectedList
      add[idx].from = "";
      add[idx].to = "";
      this.setState({ addCondition: add })
    }

  };
  onRemoveText = (idx) => {
    return (selectedList, selectedItem) => {
      console.log(selectedItem, idx)
      let add = [...this.state.addCondition]
      add[idx].value = selectedList;
      add[idx].from = "";
      add[idx].to = "";
      this.setState({ addCondition: add })
    }
  };
  typeDateChange = (e, idx) => {
    let date = jQuery("#isdate").val()
    var date_formated;
    if (date != '' && date != undefined) {
      var array = date.split('/')
      date_formated = array[0] + '-' + array[1] + '-' + array[2]
      let add = [...this.state.addCondition]
      add[idx].value = date_formated;
      add[idx].from = "";
      add[idx].to = "";
      this.setState({ addCondition: add })
    }
  };

  typeDateChangeFrom = (e, idx) => {
    let date = jQuery("#from").val()
    var date_formated;
    if (date != '' && date != undefined) {
      var array = date.split('/')
      date_formated = array[0] + '-' + array[1] + '-' + array[2]
      let add = [...this.state.addCondition]
      add[idx].from = date_formated;
      this.setState({ addCondition: add })
    }
  };

  typeDateChangeTo = (e, idx) => {

    let date = jQuery("#to").val()
    var date_formated;
    if (date != '' && date != undefined) {
      var array = date.split('/')
      var date_formated = array[0] + '-' + array[1] + '-' + array[2]
      let add = [...this.state.addCondition]
      add[idx].to = date_formated;
      this.setState({ addCondition: add })
    }
  };

  textChange = (e, idx) => {
    let add = [...this.state.addCondition]
    add[idx].value = e.target.value;
    add[idx].from = "";
    add[idx].to = "";
    this.setState({ addCondition: add })
  };
  handleTextChange =(e)=>{
    this.setState({ [e.target.name]: e.target.value });     
};

  allValues = () => {
    let idx = this.state.index
    let condition = [...this.state.addCondition]
    condition[idx].type = [...this.state.type]
    condition[idx].condition = this.state.condition
    condition[idx].text = [...this.state.text]
    this.setState({ addCondition: condition })
  };

  checkBox = (e, idx) => {
    console.log(e.target.checked)
    const newrecode = [...this.state.tableDataArr]
    newrecode[idx].check = e.target.checked
    this.setState({ disabled: !e.target.checked, tableDataArr: newrecode })

  };
  overallClick = (e) => {
    let checkAll = !this.state.checkAll
    let disabled = !this.state.disabled
    let tableDataArr = [...this.state.tableDataArr]
    tableDataArr.map((item, i) => {
      item.check = checkAll;
    });
    this.setState({ checkAll, tableDataArr, disabled })
  };

  tableDataFunc = (input) => {
    this.setState({ tableHeader: input, tableSort: !this.state.tableSort }, () => {
      if (this.state.tableHeader == undefined) {
        let def = [...this.state.addCondition]
        let input = def.map((val, idx) => {
          let key = val.key
          let condition = val.condition;
          let from = val.from;
          let to = val.to;
          if (key == "account" || key == "invoice_number" || key == "contact") {
            let value = val.value.map((arr) => arr.id)
            let type = val.value.map((arr) => arr.type)
            let out = { key: key, condition: condition, value: value, from: from, to: to ,filter_type: type }
            return out
          }
          else if (key === "custom"){
            var custdrp =this.state.customdrp;
            var filtercustdrp =[];
            filtercustdrp=custdrp.filter(item => item.key == this.state.customselect);
            var defaultcol = '';
            defaultcol=(filtercustdrp && filtercustdrp.legth!=0)? filtercustdrp[0].is_default_column : 0;
            let out = { is_default_column:defaultcol,key: this.state.customselect, condition: condition, value:this.state.customtxt, from: from, to: to  }
            return out
          }
           else {
            // && val.value.map((arr) => arr.key_name)
            let out = { key: val.key, condition: val.condition, value: val.value, from: val.from, to: val.to }
            return out
          }
        })

        console.log('searchpayload',input)
        let client_id = this.state.logged_client_id;
        let sort_by_key = "";
        let sort_by = "asc"

        this.setState({ loading: true })
        FetchAllApi.recode_table(client_id, sort_by_key, sort_by, input, (err, response) => {
          if (response.status === 1) {
            let data = response.data.map((item) => { item.check = false })
            this.setState({ tableDataArr: response.data, loading: false })
          }
        })

      } else {
        let def = [...this.state.addCondition]
        let input = def.map((val, idx) => {
          let key = val.key
          let condition = val.condition;
          let from = val.from;
          let to = val.to;
          if (key == "account" || key == "invoice_number" || key == "contact") {
            let value = val.value.map((arr) => arr.id)
            let out = { key: key, condition: condition, value: value, from: from, to: to }
            return out
          } else {
            let value = val.value.map((arr) => arr.key_name)
            let out = { key: key, condition: condition, value: value, from: from, to: to }
            return out
          }
        })

        console.log(input)
        let client_id = this.state.logged_client_id;
        let sort_by_key = this.state.tableHeader;
        let sort_by;
        if (this.state.tableSort == true) {
          sort_by = "asc";
        } else {
          sort_by = "desc";
        }
        this.setState({ loading: true })
        FetchAllApi.recode_table(client_id, sort_by_key, sort_by, input, (err, response) => {
          if (response.status === 1) {
            let data = response.data.map((item) => { item.check = false })
            this.setState({ tableDataArr: response.data, loading: false })
          }
        })

      }
    })
  };


  dropDown1Fetch = () => {
    let client_Id = this.state.logged_client_id;
    FetchAllApi.settings_find_drop1((err, response) => {
      if (response.status === 1) {
        this.setState({ drop1Arr: response.data }, this.dropDown2Fetch(0))
      }
    })
  };


  dropDown2Fetch = (idx) => {
    let con = [...this.state.addCondition];
    let val = con[idx].key;
    let client_Id = this.state.logged_client_id;
    if (val == "contact") {
      FetchAllApi.settings_find_drop2_contact(client_Id, (err, response) => {
        if (response.status === 1) {
          this.setState({ drop2Arr: { ...this.state.drop2Arr, [idx]: response.list } })
        }
      })
    } else {
      FetchAllApi.settings_find_drop2(val, client_Id, (err, response) => {
        if (response.status === 1) {
          this.setState({ drop2Arr: { ...this.state.drop2Arr, [idx]: response.data } })
        }
      })
    }


  };


  sortApi = (input) => {
    this.setState({ tableHeader: input, tableSort: !this.state.tableSort }, () => {
      if (this.state.tableSort == true) {
        let values = {
          order_string: this.state.tableHeader,
          order_key: "ASC",
        }
        this.setState({ loading: true })
        FetchAllApi.find_sort_table(values, (err, response) => {
          if (response.status === 1) {
            let data = response.data.map((item) => {
              item.check = false
            })
            this.setState({ tableDataArr: response.data, loading: false })
          }
        })
      } else {
        let values = {
          order_string: this.state.tableHeader,
          order_key: "DESC",
        }
        this.setState({ loading: true })
        FetchAllApi.find_sort_table(values, (err, response) => {
          if (response.status === 1) {
            let data = response.data.map((item) => {
              item.check = false
            })
            this.setState({ tableDataArr: response.data, loading: false })
          }
        })
      }
    })
  }

  get_gst_list = () => {
    let country_code = this.state.country_code;
    //alert(country_code)
    let keyword = this.state.search_key_gst;
    FetchAllApi.get_gst_list(country_code, keyword, this.state.logged_client_id, (err, response) => {
      console.log("defaultcategorylist", response);
      //alert(response.message)
      if (response.status === 1) {
        response.list.map((item) => {
          item.check = false
        })
        this.setState({
          gst_list: response.list,
        });
      } else {
        this.setState({
          gst_list: [],
        });
      }
    });
  };

  getCountry = () => {
    let client_Id = this.state.logged_client_id;
    FetchAllApi.get_country_id(client_Id, (err, response) => {
      // alert(response.country_id)
      if (response.status === 1) {
        this.setState(
          {
            country_code: response.country_id,
          },
          () => this.get_gst_list()
        );
      }
    });
  };
  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });
  }



  getAccountOption = () => {
    let client_Id = this.state.logged_client_id;
    let from_create_invoice = 1;
    let search_key = "";
    FetchAllApi.settings_defaultcategorylist(client_Id, from_create_invoice, search_key, (err, response) => {
      // alert(response.country_id)
      if (response.status === 1) {
        this.setState({ AccountOptions: response.list });
      }
    });
  };

  sourceNameOption = () => {
    let client_Id = this.state.logged_client_id;
    FetchAllApi.settings_defaultNamelist(client_Id, (err, response) => {
      // alert(response.country_id)
      if (response.status === 1) {
        this.setState({ sourceNameOptions: response.list });
      }
    });

  }


  sourceReview = () => {

    let client_id = this.state.logged_client_id;
    let tax;
    let tax_rate;
    let nameOptions;
    let name;
    if (this.sourceName.current.value !== "") {
      nameOptions = JSON.parse(this.sourceName.current.value);
      name = {
        id: nameOptions.id,
        name: nameOptions.name,
        type: nameOptions.type,
        job_id: nameOptions.job_id
      }
    } else {
      nameOptions = "";
      name = "";
    }
    if (this.sourceTax.current.value !== "") {
      tax = JSON.parse(this.sourceTax.current.value);
      tax_rate = {
        id: tax.id,
        sales_tax_code: tax.sales_tax_code,
        sales_tax_name: tax.sales_tax_name,
        show_on_list: tax.show_on_list,
        tax_type: tax.tax_type,
        rate: tax.rate,
        rate_type: tax.rate_type,
        country_id: tax.country_id,
        created_on: tax.created_on,
        actve_status: tax.actve_status
      }
    } else {
      tax = "";
      tax_rate = "";
    }
    let table = [...this.state.tableDataArr];
    let filter = table.filter(val => {
      if (val.check == true) {
        let id = val.id
        let entry_type = val.entry_type
        let is_item_detail = val.is_item_detail
        let item_index = val.item_index
        let apiVal = { id: id, entry_type: entry_type, is_item_detail: is_item_detail, item_index: item_index }
        return apiVal
      }
    })

    let id = filter.map((data) => {
      let id = data.id
      let entry_type = data.entry_type
      let is_item_detail = data.is_item_detail
      let item_index = data.item_index
      let apiVal = { id: id, entry_type: entry_type, is_item_detail: is_item_detail, item_index: item_index }
      return apiVal
    })
    let input = {
      client_id: client_id,
      name: name,
      account: this.sourceAccount.current.value,
      tax_rate: tax_rate,
      record_list: id,
      description: this.sourceDescription.current.value,
    }
    console.log(input)
    FetchAllApi.recode_table_data(input, (err, response) => {
      if (response.status === 1) {
        let data = response.data.map((item, idx) => {
          item.check = false
        })
        this.props.history.push("/find_recode_summary", { response: response.data, date: response });
        sessionStorage.setItem("conditions", JSON.stringify(this.state.addCondition))
      }
    })

  };

  manualReview = () => {
    let client_id = this.state.logged_client_id;
    let tax;
    let tax_rate;
    if (this.sourceTax.current.value !== "") {
      tax = JSON.parse(this.sourceTax.current.value);
      tax_rate = {
        id: tax.id,
        sales_tax_code: tax.sales_tax_code,
        sales_tax_name: tax.sales_tax_name,
        show_on_list: tax.show_on_list,
        tax_type: tax.tax_type,
        rate: tax.rate,
        rate_type: tax.rate_type,
        country_id: tax.country_id,
        created_on: tax.created_on,
        actve_status: tax.actve_status
      }
    } else {
      tax = "";
      tax_rate = "";
    }
    let table = [...this.state.tableDataArr];
    let filter = table.filter(val => {
      if (val.check == true) {
        let id = val.id
        let entry_type = val.entry_type
        let apiVal = { id: id, entry_type: entry_type }
        return apiVal
      }
    })

    let id = filter.map((data) => {
      let id = data.id
      let entry_type = data.entry_type
      let apiVal = { id: id, entry_type: entry_type }
      return apiVal
    })


    let input = {
      client_id: client_id,
      account: this.manualAccount.current.value,
      tax_rate: tax_rate,
      record_list: id
    }
    console.log(input)
    FetchAllApi.recode_table_data(input, (err, response) => {
      if (response.status === 1) {
        let data = response.data.map((item, idx) => {
          item.check = false
        })
        this.props.history.push("/find_recode_summary", { search: this.state.addCondition, response: response.data, date: response });
      }
    })

  };

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }



  render() {
    console.log("print", Object.values(this.state.drop2Arr))


    return (
      <React.Fragment>
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
                <h3>Find &amp; Recode</h3>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <form className="custom-form invoice-form col-md-12 col-xs-12 h-small legend-form rule-form">
                    <div className="row">
                      <div className="form-group">
                        <label>Find transaction lines that match of the following conditions</label>
                        <div className="set-w">

                        </div>
                      </div>
                    </div>
                    {this.state.addCondition.map((val, idx) => {
                      console.log("mapo", val)
                      return (
                        <div className="row bg-add-sec" key={idx}>
                          <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                            <div className="custom-select-drop dropdown">
                              <select className="selectpicker form-control hh " data-live-search="true" value={this.state.addCondition[idx].key} onChange={(e) => { this.dropDown1(idx, e) }}>
                                {this.state.drop1Arr.map((val) => {
                                  return (
                                    <option value={val.key}>{val.value}</option>
                                  )
                                })}
                              </select>

                            </div>
                          </div>
                          { this.state.customdivflg &&                           
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12"  >
                                <div className="custom-select-drop dropdown">
                                  <select className="selectpicker form-control hh " name='customselect' data-live-search="true" value={this.state.customselect} onChange={(e) => { this.handleTextChange(e) }}>
                                  <option value="">Choose...</option>
                                    {this.state.customdrp && this.state.customdrp.length != 0 && this.state.customdrp.map((val) => {
                                      return (
                                        <option value={val.key}>{val.value}</option>
                                      )
                                    })}
                                  </select>
                                </div>
                              </div> 
                          }
                            <div>
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12"  >
                                <div className="custom-select-drop dropdown" >
                                  {(() => {
                                    if (this.state.addCondition[idx].key == "transaction_total") {
                                      return (
                                        <select className="selectpicker form-control hh " data-live-search="true" value={this.state.addCondition[idx].condition} onChange={(e) => { this.dropDown2(e.target.value, idx) }}>
                                          <option value="">Choose...</option>
                                          <option value="=">Equal</option>
                                          <option value=">">greater than</option>
                                          <option value="<">less than</option>
                                        </select>)
                                    } else if (this.state.addCondition[idx].key == "date") {
                                      return (
                                        <select className="selectpicker form-control hh " data-live-search="true" value={this.state.addCondition[idx].condition} onChange={(e) => { this.dropDown2(e.target.value, idx) }}>
                                          <option value="">Choose...</option>
                                          <option value="is">is</option>
                                          <option value="is between">is between</option>
                                          <option value="is before">is before</option>
                                          <option value="is after">is after</option>
                                        </select>
                                      )
                                    }else if (this.state.addCondition[idx].key == "custom") {
                                      return (
                                        <select className="selectpicker form-control hh " data-live-search="true" value={this.state.addCondition[idx].condition} onChange={(e) => { this.dropDown2(e.target.value, idx) }}>                                      
                                          <option value="">Choose...</option>
                                          <option value="=">Equal</option>
                                          <option value=">">greater than</option>
                                          <option value="<">less than</option>                                       
                                          <option value="is">is</option>                                         
                                          <option value="is not">is not</option>                                       
                                        </select>
                                      )
                                    } else {
                                      return (
                                        <select className="selectpicker form-control hh " data-live-search="true" value={this.state.addCondition[idx].condition} onChange={(e) => { this.dropDown2(e.target.value, idx) }}>
                                          <option value="">Choose...</option>
                                          <option value="is">is</option>
                                          <option value="is not">is not</option>
                                        </select>
                                      )
                                    }
                                  })()}
                                </div>
                              </div>
                              <div className="form-group col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                {(() => {
                                  if (this.state.addCondition[idx].key == "date") {
                                    if (this.state.addCondition[idx].condition == "is between") {
                                      return (
                                        <div>

                                          <label>From</label>
                                          <div className="input-group date mar-t-no"  >
                                            <input type="text" className="form-control" style={{ width: "120" }} id="from" onBlur={(event) => {
                                              let value = event.target.value
                                              setTimeout(() => { this.typeDateChangeFrom(value, idx) }, 500)
                                            }} />
                                            <div className="input-group-addon">
                                              <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#from').focus()} />
                                            </div>
                                          </div>

                                          <div>
                                            <label>To</label>
                                            <div className="input-group date mar-t-no"  >
                                              <input type="text" id="to" className="form-control" style={{ width: "120" }} onBlur={(event) => {
                                                let value = event.target.value
                                                setTimeout(() => { this.typeDateChangeTo(value, idx) }, 500)
                                              }} />
                                              <div className="input-group-addon">
                                                <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#to').focus()} />
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                      )
                                    } else {
                                      return (
                                        <div className="input-group date mar-t-no"  >
                                          <input type="text" id="isdate" className="form-control" onBlur={(event) => {
                                            let value = event.target.value
                                            setTimeout(() => { this.typeDateChange(value, idx) }, 500)
                                          }} />
                                          <div className="input-group-addon">
                                            <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#isdate').focus()} />
                                          </div>
                                        </div>
                                      )
                                    }
                                  } else if (this.state.addCondition[idx].key == "transaction_total") {
                                    return (
                                      <input className="form-control" type="text" data-role="tagsinput" onChange={(e) => { this.textChange(e, idx) }} />
                                    )
                                  } else if (this.state.addCondition[idx].key == "contact") {
                                    return (
                                      <div className="custom-select-drop dropdown">
                                        <Multiselect
                                          className="dropdown-toggle btn form-control"
                                          selectedValues={this.state.addCondition[idx].value}
                                          options={this.state.drop2Arr[idx]}
                                          displayValue="name"
                                          onRemove={this.onRemoveText(idx)}
                                          onSelect={this.onSelectText(idx)}
                                          style={{
                                            searchBox: {
                                              background: "white"
                                            }
                                          }}
                                        />
                                      </div>)
                                  } else if (this.state.customdivflg) {
                                    return (
                                      <input type="text" name="customtxt" className="form-control" value={this.state.customtxt}  onChange={(e) => this.handleTextChange(e)}/>
                                    )
                                  }else {
                                    return (
                                      <div className="custom-select-drop dropdown">
                                        <Multiselect
                                          className="dropdown-toggle btn form-control"
                                          selectedValues={this.state.addCondition[idx].value}
                                          options={this.state.drop2Arr[idx]}
                                          displayValue="value"
                                          onRemove={this.onRemoveText(idx)}
                                          onSelect={this.onSelectText(idx)}
                                          style={{
                                            searchBox: {
                                              background: "white"
                                            }
                                          }}
                                        />
                                      </div>)
                                  }
                                })()}
                              </div>
                            </div>
                           
                          <a href="javascript:;" className="del-row">
                            <img className="img-responsive" src="images/delete-icon.svg" alt="icon" onClick={() => { this.delCondition(idx) }} />
                          </a>
                        </div>
                      )
                    })}

                    <div className="row">
                      <a onClick={this.addConditionFunc} className="add-input">Add Condition</a>
                    </div>
                    <div className="row text-right">
                      <div className="form-group mar-top">
                        <button type="button" className="btn btn-lightgray mar-rgt-5" onClick={() => { this.props.history.goBack() }}>Cancel</button>
                        <div className="btn btn-blue mar-rgt-5" role="button" onClick={() => { this.search() }}>Search</div>
                      </div>
                    </div>
                  </form>
                </div>
                {this.state.toggle == true ? (
                  <div className="row">
                    <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 mar-t-no pad-no">
                      <div className="table-responsive">
                        <table className="table detail-report">
                          <thead>
                            <tr>
                              {this.state.searchtype!="topbar" ?
                              <th className="checkbox-td">
                                <label className="custom-checkbox small">
                                  <input type="checkbox" name="all" onClick={(e) => { this.overallClick(e) }} />&nbsp;
                                  <span className="checkmark" />
                                </label>
                              </th>:''}
                              <th onClick={() => { this.tableDataFunc("invoice_date") }}>
                                Type
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th onClick={() => { this.tableDataFunc("invoice_date") }}>
                                Date
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th onClick={() => { this.tableDataFunc("company_name") }}>
                                Name
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th onClick={() => { this.tableDataFunc("invoice_number") }}>
                                No#
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th className="text-right" onClick={() => { this.tableDataFunc('credit') }} >
                                Transaction Total Home Currency
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th className="text-right" onClick={() => { this.tableDataFunc('credit') }} >
                                Transaction Total Foreign Currency
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th className="text-right" onClick={() => { this.tableDataFunc('credit') }} >
                                Currency
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                              <th onClick={() => { this.tableDataFunc("name") }}>
                                Account
                                <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                              </th>
                            </tr>
                          </thead>
                          <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            visible={this.state.loading}
                          />
                          <tbody>
                            {this.state.tableDataArr.map((val, idx) => {
                              return (
                                <tr key={idx}>
                                  {this.state.searchtype!="topbar" ? <td className="extra-pad-no">
                                    <label className="custom-checkbox small">
                                      <input type="checkbox" name="all" checked={val.check} onClick={(e) => { this.checkBox(e, idx, val.check) }} />&nbsp;
                                      <span className="checkmark" />
                                    </label>
                                  </td>:''}
                                  <td>{val.entry_type_name}</td>
                                  <td>{moment(val.invoice_date, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                  <td>{val.company_name}</td>
                                  <td>{val.invoice_number}</td>
                                  <td className="text-right"><Comma value={val.credit} /></td>
                                  <td className="text-right"><Comma value={val.foreign_credit} /></td>
                                  <td className="text-center">{val.foreign_currency}</td>
                                  <td>{val.name}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          {this.state.toggle == true ? (
            <div className="pf-btm-wrap bg-sticky">
              <div className="col-md-12 text-right pad-no">
                <p className="selected-no"></p>
                <button type="button" className="btn btn-lightgray mar-rgt-5" onClick={() => { this.props.history.goBack() }}>Cancel</button>
                <div className="dib">
                  <div className="dropdown menu-item new-cus">
                    <a
                      href="javascript"
                      class="dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {this.state.searchtype!="topbar"?
                      <button
                        className="btn btn-green dropdown-toggle"
                        type='button'
                        disabled={this.state.disabled}
                      >
                        Recode
                        <span className='caret' />
                      </button>:''}
                    </a>
                    <ul className="dropdown-menu align-right" style={{width: 'fit-content', marginRight: '30px'}}>
                      <li><a href="javascript:;" data-toggle="modal" data-target="#recode-source">Recode source transactions</a></li>
                      <li><a href={"/new_journal"} >Recode with a manual journal</a></li>

                    </ul>
                  </div>
                  {/* <div className="dropdown menu-item mar-rgt-5">
                    <button className="btn btn-green dropdown-toggle btn-arrow" data-toggle="dropdown" aria-expanded="false" disabled={this.state.disabled}>Recode<span className="caret" /></button>
                    <ul className="dropdown-menu align-right">
                      <li><a href="javascript:;" data-toggle="modal" data-target="#recode-source">Recode source transactions</a></li>
                      <li><a href={"/new_journal"} >Recode with a manual journal</a></li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>
          ) : null}
          {/* pf-btm-wrap Ends here */}
        </div>

        {/* Main Wrapper Ends here */}
        {/* Modal Wrapper Starts here */}
        <div className="modal fade pop-modal" id="recode-source" role="dialog">
          <div className="modal-dialog modal-xs custom-modal">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs" data-dismiss="modal">
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Recode Source Transactions</h3>
                <form className="custom-form row column">
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Name</label>
                    <select className="selectpicker form-control hh " data-live-search='true' ref={this.sourceName}>
                      <option value=''>Don't Change</option>
                      {this.state.sourceNameOptions.map((val) => {
                        return (
                          <option value={JSON.stringify(val)} >{val.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Account</label>
                    <div className="custom-select-drop dropdown">
                      <select className="selectpicker form-control hh " data-live-search='true' ref={this.sourceAccount}>
                        <option value=''>Don't Change</option>
                        {this.state.AccountOptions.map((val) => {
                          return (
                            <option value={val.id} >{val.name}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Sales Tax</label>
                    <div className="custom-select-drop dropdown">
                      <select className="dropdown-toggle btn form-control" ref={this.sourceTax}>
                        <option value=''>Don't Change</option>
                        {this.state.gst_list.map((val) => {
                          return (

                            <option value={JSON.stringify(val)}>{val.sales_tax_name}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Description</label>
                    <input type="text" placeholder="Don't Change" className="form-control" name ref={this.sourceDescription} />
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                    <button type="button" className="btn btn-lightgray mar-rgt-5" onClick={() => { this.props.history.goBack() }}>Cancel</button>
                    <input className="btn btn-green mar-rgt-5" type="button" data-dismiss="modal" value="Review" onClick={this.sourceReview} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade pop-modal" id="recode-manual-journal" role="dialog">
          <div className="modal-dialog modal-xs custom-modal">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs" data-dismiss="modal">
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Recode with a manual journal</h3>
                <form className="custom-form row column">
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Account</label>
                    <div className="custom-select-drop dropdown">
                      <div className="custom-select-drop dropdown">
                        <select className="dropdown-toggle btn form-control" ref={this.manualAccount}>
                          <option value=''>Don't Change</option>
                          {this.state.AccountOptions.map((val) => {
                            return (
                              <option value={val.id}>{val.name}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Sales Tax</label>
                    <div className="custom-select-drop dropdown">
                      <select className="dropdown-toggle btn form-control" ref={this.manualTax}>
                        <option value=''>Don't Change</option>
                        {this.state.gst_list.map((val) => {
                          return (
                            <option value={JSON.stringify(val)}>{val.sales_tax_name}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                    <button type="button" className="btn btn-lightgray mar-rgt-5" onClick={() => { this.props.history.goBack() }}>Cancel</button>
                    <input className="btn btn-green mar-rgt-5" type="button" data-dismiss="modal" value="Review" onClick={this.manualReview} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* Bootstrap TagsInput JS */}
        {/* jQueryUI JS */}

      </React.Fragment>
    )
  }
}