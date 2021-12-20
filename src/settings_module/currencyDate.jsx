import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"
import config from './../api_links/api_links'
export default class Sales extends React.Component {
  constructor() {
    super()
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      exact_date: '',
      start_date: '',
      end_date: '',
      currentPage: 1,
      pageList: [1, 2],
      currency: [],
      rowPerPage: 10,
      filteredval: [],
      cur_arr: [],
      incorpdate: "",
      search: "",     
      defaultend : new Date()
    }
  
   this.handleTextChange = this.handleTextChange.bind(this);
   this.dateCondition=this.dateCondition.bind(this);
  };

  rename = (obj, curr) => {
    let a = {}
    Object.keys(obj).map((key) => {
      let newKey = key.replace(curr, '')
      Object.assign(a, { [newKey]: obj[key] })
    })
    return a
  }


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


  componentDidMount = async() => {
    this.get_client_home_currency();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    await this.setState({defaultend:today});
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("exact_date")[0].setAttribute('min', this.state.incorpdate); 
    document.getElementsByName("start_date")[0].setAttribute('min', this.state.incorpdate); 
    document.getElementsByName("end_date")[0].setAttribute('min', this.state.incorpdate); 
    document.getElementsByName("exact_date")[0].setAttribute('max', today); 
    document.getElementsByName("start_date")[0].setAttribute('max', today); 
    document.getElementsByName("end_date")[0].setAttribute('max', today);    
   
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

  componentDidUpdate() {

    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

  };

  exactChange =async (event) => {
   await this.setState({ exact_date: event });
   this.dateCondition("exact");
  };

  handleTextChange =  async(e,input)=>{   
  this.setState({[e.target.name]: [e.target.value] });
  localStorage.setItem([e.target.name],[e.target.value])    
  this.dateCondition(input);
  console.log(this.state.defaultend);
  if(input==="start" && localStorage.getItem("start_date")!='' ){
    var mindate=localStorage.getItem("start_date")
    console.log(mindate,this.state.defaultend);
   document.getElementsByName("end_date")[0].setAttribute('min', mindate); 
    document.getElementsByName("end_date")[0].setAttribute('max', this.state.defaultend); 
  }
};
  startChange = () => {
    let e = jQuery('#start').val()
    this.setState({ start_date: e }, () => { this.dateCondition("start") })
  };

  endChange = () => {
    let e = jQuery('#end').val()
    this.setState({ end_date: e }, () => { this.dateCondition("end") })
  };

  dateCondition = (input) => {
    let date1;
    let date2 = this.state.incorpdate;
    if (input == "exact") { 
      //date1 = this.state.start_date;     
      date1 = localStorage.getItem("exact_date")
      localStorage.setItem("start_date","")   
      localStorage.setItem("end_date","")   
    } else if (input == "start") {
     // date1 = this.state.start_date
     localStorage.setItem("exact_date","")   
      date1 = localStorage.getItem("start_date")
    } else if (input == "end") {
     // date1 = this.state.end_date
     localStorage.setItem("exact_date","")  
      date1 = localStorage.getItem("end_date")
    }    
    // if (date1 !== undefined && date1 !== "") {
    //   var array = date1.split('/')
    //   var date_formated = array[2] + '-' + array[1] + '-' + array[0]
    // }   
    if (date1 !== "") {
      if (new Date(date1).getTime() < new Date(date2).getTime()) {
        if (input == "exact") {
          this.setState({ exact_date: "" })
          localStorage.setItem("exact_date","")    
        } else if (input == "start") {
          this.setState({ start_date: "" })
          localStorage.setItem("start_date","")    
        } else if (input == "end") {
          this.setState({ end_date: "" })
          localStorage.setItem("end_date","")    
        }
        alert("please enter date same as incorporation date or greater than incorporation date")
      } else {
        if (input == "exact") {
          this.setState({ exact_date: date1 })
        } else if (input == "start") {
          this.setState({ start_date: date1 })
        } else if (input == "end") {
          this.setState({ end_date: date1 })
        }
      }
    }
  };

  clearFUnc = (e) => {
    this.setState({ exact_date: '', start_date: '', end_date: '' })
  };

  setRowPerPage = val => {
    const arr = this.state.cur_arr;
    let fill = arr.filter((obj) => {
      if (obj.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.role_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.status_text.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
        return true
      }
      else {
        return false
      }
    });
    if (!this.state.search) {
      fill = arr;
    }
    if (val > fill.length) {
      this.setState({
        rowPerPage: val,
        filteredval: fill.slice(0, val),
        currentPage: 1,
        pageList: [1, 2]
      });
      return;
    }
    let pageList = [...this.state.pageList];
    this.setState({
      rowPerPage: val,
      filteredval: fill.slice(0, val),
      currentPage: 1,
      pageList,
    });
  };



  setPagination = (page, pageList = this.state.pageList) => {
    const arr = this.state.cur_arr;
    console.log(arr);
    let fill = arr.filter((obj) => {
      if (obj.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.role_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.status_text.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
        return true
      }
      else {
        return false
      }
    });
    if (!this.state.search) {
      fill = arr;
    }
    const max = page * this.state.rowPerPage;
    const min = max - this.state.rowPerPage;
    this.setState({
      filteredval: fill.slice(min, max),
      currentPage: page,
      pageList: pageList,
    });
  }


  onNextPagination = () => {
    if (this.state.currentPage % 2 === 0) {
      this.setPagination(this.state.currentPage + 1, [this.state.currentPage + 1, this.state.currentPage + 2]);
    } else {
      this.setPagination(this.state.currentPage + 2, [this.state.currentPage + 2, this.state.currentPage + 3]);
    }
  }
  onPrevPagination = () => {
    if (this.state.currentPage % 2 === 0) {
      const arr = !(this.state.currentPage - 2) ? [1, 2] : [this.state.currentPage - 3, this.state.currentPage - 2];
      this.setPagination(this.state.currentPage - 2 || 1, arr);
    } else {
      this.setPagination(this.state.currentPage - 1, [this.state.currentPage - 2, this.state.currentPage - 1]);
    }
  };

  get_client_home_currency = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.get_client_home_currency(client_id, (err, response) => {
      if (response.status === 1) {
        console.log("Basio state", response);
        this.setState({
          clientHomeCurrency: response.currency,
        }, () => { this.get_incorpDate() })
      } else {
      }
    });
  };

  get_incorpDate = () => {
    let client_id = this.state.logged_client_id;
    FetchAllApi.get_client_incorpdate(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({
          incorpdate: response.incorporation_date,
        }, () => { this.searchDefault() })
      }
    });
  };



  searchDefault = () => {
    let date = new Date()
    let defaultend = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    let code = this.props.location.state.code
    fetch(
      // "https://api.exchangeratesapi.io/history?start_at=" + this.state.incorpdate + "&end_at=" + defaultend + "&base=" + code + "&symbols=" + this.state.clientHomeCurrency
      `https://api.currencylayer.com/timeframe?access_key=${config.api_key}&start_date=${this.state.incorpdate}&end_date=${defaultend}&currencies=${this.state.clientHomeCurrency}&&source=${code}`
    )
      .then((response) => response.json())
      .then((data) => {
if(data.success == true){
        let newObj = this.rename(data.quotes, code)

        let currencyAr = [];

        let first = newObj;
        console.log(first, "First")
        let arrlen = Object.keys(first);
        for (let i = 0; i < arrlen.length; i++) {

          currencyAr.push({
            'date': arrlen[i],
            'rate': first[arrlen[i]][this.state.clientHomeCurrency]
          });
        }
        this.setState({ cur_arr: currencyAr, filteredval: currencyAr })
      }

      })

  }

  searchCall = () => {
    let start = localStorage.getItem('start_date');//this.state.start_date
    let end = localStorage.getItem('end_date');//this.state.end_date
    let exact =localStorage.getItem('exact_date');    
    let code = this.props.location.state.code
    if (exact !== "") {
      var array = exact.split('/')
     // var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      fetch(
        // "https://api.exchangeratesapi.io/" + date_formated + "?base=" + code + "&symbols=" + this.state.clientHomeCurrency
        `https://api.currencylayer.com/timeframe?access_key=${config.api_key}&start_date=${exact}&end_date=${exact}&currencies=${this.state.clientHomeCurrency}&&source=${code}`

      )
        .then((response) => response.json())
        .then((data) => {
          if(data.success == true){
          let newObj = this.rename(data.quotes, code)
          let currencyAr = [];
          let first = newObj;
          currencyAr.push({
            'date': data.start_date,
            'rate': isNaN(first[data.start_date][code+this.state.clientHomeCurrency])? 0.0000 :(first[data.start_date][code+this.state.clientHomeCurrency]).toFixed(4)
          });
          this.setState({ cur_arr: currencyAr, filteredval: currencyAr })
        }
        })
    } else if (start !== "" && end !== "") {
      // var array = start.split('/')
      // var date_formated1 = array[2] + '-' + array[1] + '-' + array[0]
      // var array1 = end.split('/')
      // var date_formated2 = array1[2] + '-' + array1[1] + '-' + array1[0]      
      fetch(
        // "https://api.exchangeratesapi.io/history?start_at=" + date_formated1 + "&end_at=" + date_formated2 + "&base=" + code + "&symbols=" + this.state.clientHomeCurrency
        `https://api.currencylayer.com/timeframe?access_key=${config.api_key}&start_date=${start}&end_date=${end}&currencies=${this.state.clientHomeCurrency}&&source=${code}`
      )
        .then((response) => response.json())
        .then((data) => {
          if(data.success == true){
          let newObj = this.rename(data.quotes, code)
          let currencyAr = [];
          let first = newObj;
          console.log(first, "First")
          let arrlen = Object.keys(first);
          console.log(arrlen);
          // for (let i = 0; i < arrlen.length; i++) {

          //   currencyAr.push({
          //     'date': arrlen[i],
          //     'rate': first[arrlen[i]][this.state.clientHomeCurrency]
          //   });
          // }
          Object.entries(newObj).map(([k, v]) => (
            currencyAr.push({
              'date':k,
              'rate': isNaN(v[code+this.state.clientHomeCurrency])? 0.0000 :(v[code+this.state.clientHomeCurrency]).toFixed(4)
            })
           // console.log(k[code+this.state.clientHomeCurrency])
          ));
          console.log(currencyAr);
          this.setState({ cur_arr: currencyAr, filteredval: currencyAr });          
        }
        })

    }

  };
 
  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    console.log(this.state.incorpdate,this.state.incorpdate)
    let totalPages = Math.ceil(this.state.filteredval.length / this.state.rowPerPage);
    let arr = [];
    if (this.state.search) {
      totalPages = Math.ceil(this.state.filteredval.length / this.state.rowPerPage);
      arr = this.state.filteredval;
    } else {
      totalPages = Math.ceil(this.state.currency.length / this.state.rowPerPage);
      arr = this.state.filteredval.slice(0, 10);
    }
    return (
      <React.Fragment>

        <link rel="stylesheet" type="text/css" href="user-module-style.css" />
        {/* Main Wrapper Starts here */}
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
                <h3>
                  <a href="/currency" className="back">
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  Currencies- {this.props.location.state.currency}
                </h3>
                <div>
                  <button className="btn btn-blue with-icon">
                    <img src="images/plus-add.svg" className="filter-white" />
                    Add Currency
                  </button>
                </div>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <form className="custom-form filter-form">
                    <div className="row">
                      <label className="col-md-12">Filter by</label>
                      <div className="form-group col-md-4" id='exact'>
                        <div className="input-group" >
                          <input type="date" className="form-control" name="exact_date"  value={this.state.exact_date}                          
                          onChange={(e) => { 
                            jQuery('#start').css('display','none');
                          jQuery('#end').css('display','none');
                          this.handleTextChange(e,"exact")
                          }}  placeholder="dd-mm-yyyy" defaultValue="dd-mm-yyyy" id="exact"  />
                         {/* onBlur={(event) => {
                             jQuery('#start').css('display','none')
                             jQuery('#end').css('display','none')
                            let value = event.target.value                          
                            this.exactChange(value) }} 
                          /> */}
                          <div className="input-group-addon">
                            {/* <img src="images/calendar-icon.svg" alt="icon"  /> */}
                          </div> 
                        </div>
                      </div>
                      <div className="form-group col-md-4" id='start'>
                        <div className="input-group" >
                     
                          <input type="date" className="form-control" placeholder="start_date" 
                          name="start_date" id="start" value={this.state.start_date}  
                          onChange={(e) => { 
                           jQuery('#exact').css('display','none')
                           this.handleTextChange(e,"start")
                          }} />
                          <div className="input-group-addon">
                            {/* <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#start').focus()} /> */}
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-4" id='end'>
                        <div className="input-group">
                          <input type="date" className="form-control" placeholder="end_date" id="end"
                          value={this.state.end_date} name="end_date" onChange={(e) => { 
                            jQuery('#exact').css('display','none')
                            this.handleTextChange(e,"end")
                          }} />
                          <div className="input-group-addon">
                            {/* <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#end').focus()} /> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 text-right">
                        <div className="btn btn-lightgray mar-rgt-5" onClick={(e) =>{ 
                          jQuery('#exact').css('display','block')
                          jQuery('#start').css('display','block')
                          jQuery('#end').css('display','block')
                          this.clearFUnc(e)
                        }
                        }
                           >Clear</div>
                        <div className="btn btn-green mar-rgt-5" onClick={this.searchCall}>Search</div>
                      </div>
                    </div>
                  </form>

                  <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 pad-no mar-b-no">
                    <div className="table-responsive">
                      <table className="table detail-report">
                        <thead>
                          <tr>
                            <th className="text-left">
                              Date
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th className="text-right">
                              Foreign Currency per {this.state.clientHomeCurrency}
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th className="text-right">
                              {this.state.clientHomeCurrency} per Foreign Currency
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.cur_arr.map((cur) => {
                            return (
                              <tr>
                                <td>{cur.date}</td>
                                <td className="text-right">{cur.rate}</td>
                                <td className="text-right">{(1 / cur.rate).toFixed(4)}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
        </div>
        {/* Main Wrapper Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}


      </React.Fragment>
    )
  }
}