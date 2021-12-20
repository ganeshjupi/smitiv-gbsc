import React from "react";
import LeftSidebar from "./../left_sidebar";
import Footer from "./../footer";
import Topbar from "./../topbar";
import FetchAllApi from "../../api_links/fetch_all_api";
import jQuery from "jquery";
import { ToWords } from "to-words";
import config from './../../api_links/api_links'
import moment from 'moment';
const toWords = new ToWords();

class MakeDeposit extends React.Component {
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

      role_permissions:
        JSON.parse(localStorage.getItem("role_permissions")) || [],

      banks: [],
      bankCurency: "",
      payee_names: [],
      payor_name: "",
      clientHomeCurrency: "SGD",
      currency: "",
      currencies: [],
      currency_clone: [],
      selected_bank: "",
      amount: '',
      rows: ["row 1"],
      coulmns: [],
      myarray: [],
      gst_list: [],
      exchange_rate: 0,
      item_array: [
        {
          id: 1,
          catagory_id: "",
          third_party_acc_id: "",
          memo: "",
          amount: "",
        },
      ],
      bank_balance: 0,
      error: false,
      message: false,
      sourceNameOptions: [],
      errormessage:'',reference_no:'',
      isThirdPartyName: false,
      deposit_id: localStorage.getItem("deposit_id") && localStorage.getItem("deposit_id"),
    };
  }




  rename = (obj, curr) => {
    let a = {}
    Object.keys(obj).map((key) => {
      let newKey = key.replace(curr, '')
      Object.assign(a, { [newKey]: obj[key] })
    })
    return a
  }



  get_bank_balance = (id) => {
    let coreData = {
      client_id: this.state.logged_client_id,
      selectedbank: id,
    };
    FetchAllApi.get_bank_balance(coreData, (err, response) => {
      if (response.status === 1) {
        this.setState({
          bank_balance: response.totalAmount,
        });
      } else {
        this.setState({
          bank_balance: 0,
        });
      }
    });
  };

  bankSelected = (e) => {
    this.state.banks.map((item, i) => {
      if (item.id == e.target.value) {
        this.get_bank_balance(item.id);
        this.get_currencies(item.currency);
        console.log(this.state.currency_clone[item.currency],this.state.currency_clone)
        this.setState({
          selected_bank: e.target.value,
          bankCurency: item.currency,
          exchange_rate: Number(this.state.currency_clone[item.currency].toFixed(4)),
        });
      }
    });
  };

  get_client_home_currency = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.get_client_home_currency(client_id, (err, response) => {
      if (response.status === 1) {
        this.get_currencies(response.currency);
        console.log("Basio state", response);
        this.setState({
          clientHomeCurrency: response.currency,
        });
      } else {
      }
    });
  };

  total = () => {
    let total = 0;
    this.state.item_array &&
      this.state.item_array.map((a, b) => {
        total = total + Number(a.amount);
      });
   // console.log("hdya", total);
    return total.toFixed(2);
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

  catagory_list = () => {
    let search_key = "";
    var client_id = this.state.logged_client_id;

    //alert(search_key)
    FetchAllApi.balancesheetlist_onchange(
      search_key,
      client_id,
      (err, response) => {
        console.log("defaultcategorylist", response);
        if (response.status === 1) {
          // alert('k')
          this.setState({
            balancesheetlist: response.list,
          });
        } else {
          this.setState({
            balancesheetlist: [],
          });
        }
      }
    );
  };

  fetchThirdPartyNames = (payment_account_id, row) => {
    let client_id = this.state.logged_client_id;
    FetchAllApi.third_party_account_list(
      client_id,
      payment_account_id,
      (err, response) => {
        console.log("vendor_names", response);
        if (response.status === 1) {
          console.log("hiiiii==========iiiiiii", response);
          this.setState({ [`third_party_account_list${row}`]: response.data });

          localStorage.setItem("third_party_customer_id", "");
        } else {
        }
      }
    );
  };

  handleTable = (idx) => (e) => {
    const { name, value } = e.target;
    var myarray = this.state.item_array;
    myarray[idx][name] = value;
    this.setState({ item_array: myarray });
  };

  deleteRow = (row) => {
    let array = this.state.item_array;
    if (array.length > 1) {
      array.splice(row, 1);
      console.log("ddsgdusyf", array);
      this.setState({ item_array: array });
    }
  };

  totalTable = () => {
    let total = 0;
    this.stateitem_array &&
      this.state.item_array.map((a, b) => {
        total = total + Number(a.item_amount);
      });
    console.log("hdya", total);
    return total.toFixed(2);
  };

  addRow = (row) => {
    let array = this.state.item_array;
    array.push({
      id: row,
      catagory_id: "",
      third_party_acc_id: "",
      memo: "",
      amount: "",
    });
    this.setState({
      item_array: array,
    });
  };
  clear=()=>{
    window.location.reload();
  }
  save = () => {
    this.state.item_array.map((item, idx) => {
      if (item.catagory_id == "" && item.amount == "") {
        this.setState({ message: true, error: true, errormessage:'Mandatory fields must be filled!'})
        setTimeout(() => {
          this.setState({ error: false })
        }, 4000)
      } else {
        let item_list = [];
       
        this.state.item_array &&
          this.state.item_array.map((item, i) => { 
            let thirdparty=item.third_party_acc_id && JSON.parse(item.third_party_acc_id)  
            let thirdaccount=thirdparty && this.state.sourceNameOptions.filter(item => item.id == thirdparty)   
            console.log(thirdaccount,thirdparty)
            let items = {
              item_name: "make deposit transaction",
              input_type: "make_deposit_transaction",
              tax_code: "",
              descr: item.memo,
              quantity: 1,
              price: 0,
              unit_price: item.amount,
              category_id: item.catagory_id,
              tax_name: "",
              tax_rate: "",
              tax_type: "",
              item_tax: "0",
              item_total: item.amount,
              home_item_total: Number(item.amount) * Number(this.state.exchange_rate),
              credit: item.amount,
              debit: 0,
              selected_user_type:thirdaccount && thirdaccount[0].type ? thirdaccount[0].type:1,
              selected_user_id:thirdaccount && thirdaccount[0].id ? thirdaccount[0].id:0,
            };
            item_list.push(items);
          });
         let payorname=JSON.parse(this.state.payor_name)
         let payordet=this.state.payee_names.filter(item => item.id == payorname)
        let data = {
          client_id: this.state.logged_client_id,
          item_total_home_currency: (
            Number(this.total()) * Number(this.state.exchange_rate)
          ).toFixed(2),
          grand_total_home_currency: (
            Number(this.total()) * Number(this.state.exchange_rate)
          ).toFixed(2),
          invoice_date: moment(this.state.transaction_date).format("YYYY/MM/DD"),
          company_name: payordet[0].id,
          payor_type:payordet[0].type,
          currency: this.state.bankCurency,
          item_total_foreign_currency: this.total(),
          grand_total_foreign_currency: this.total(),
          exchange_rate: Number(this.state.exchange_rate.toFixed(4)),
          customer_id: payordet[0].id,
          account: this.state.selected_bank,
          transaction_date:this.state.transaction_date,
          amount_in_word: toWords.convert(
            isNaN(Number(this.state.amount)) ? 0 : Number(this.state.amount)
          ),
          reference_no: this.state.reference_no,
          memo:this.state.memo,
          item_list: item_list,
        };
        FetchAllApi.make_deposit(data, (err, response) => {
          if (response.status === 1) {
            alert(response.message);
            this.props.history.push("/loading", ["/make_deposit"]);
            // this.setState({ banks: response.data });
          } else {
            this.setState({ error: true ,errormessage:response.message})
            setTimeout(() => {
              this.setState({ error: false })
            }, 4000)
            // this.setState({ banks: [] });
          }
        });
      }
    })
  };

  // 1 for bank account list dropdown

  getAllbanks = () => {
    FetchAllApi.getAllbanks(this.state.logged_client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ banks: response.data },
          () => {

            if (this.props.location.state !== '' && this.props.location.state !== null && this.props.location.state !== undefined) {

              response.data.map((item, i) => {
                if (item.id == this.props.location.state[0]) {
                  this.get_bank_balance(item.id);
                  this.setState({
                    selected_bank: this.props.location.state[0],
                    bankCurency: item.currency,
                    exchange_rate: Number(this.state.currency_clone[item.currency].toFixed(4)),
                    payor_name: this.props.location.state[3],
                    amount: this.props.location.state[2],
                  });
                }
              });
            }
          }
        );
      } else {
        this.setState({ banks: [] }
        );
      }
    });
  };

  customer_vendor_list = () => {
    let client_id = this.state.logged_client_id;
    FetchAllApi.customer_vendor_list(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ payee_names: response.list });
      } else {
        this.setState({ payee_names: [] });
      }
    });
  };

  get_currencies = (home_currency) => {
     //alert(home_currency)

    fetch(
      // `https://api.exchangerate-api.com/v4/latest/${home_currency}`
      `https://api.currencylayer.com/live?access_key=${config.api_key}&source=${home_currency}`

    )
      .then((response) => response.json())
      .then((data) => {
        let newObj = this.rename(data.quotes, home_currency)

        const currencyAr = [];
        let first = newObj;
        for (const key in first) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr, currency_clone: first }, this.getAllbanks());
      });
  };

  changeDate = (fromdate) => {
    let date = jQuery("#transaction_date").val();
    if (date && date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ transaction_date: date_formated });
      console.log(date_formated, this.state.transaction_date)
      // alert(date_formated);
    }
  };

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
    // jQuery("#currency_selected").val(4);
  }

  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass("minimize_leftbar");
    //console.log("logged_user_id", this.state.logged_user_id);

    jQuery("title").html("Customer | GBSC");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === "null" ||
      this.state.logged_user_id === "undefined"
    ) {
      this.props.history.push("/");
    }
  }

  routedChange(parameter) {
    this.props.history.push("/" + parameter);
    window.scrollTo(0, 0);
  }

  componentDidMount() {

    jQuery(function () {
      jQuery(".cus").on("hidden.bs.dropdown", function () {
        jQuery("#changeTableProps").css("height", "auto");
      });
    });

    jQuery(function () {
      jQuery(".cus").on("show.bs.dropdown", function () {
        jQuery("#changeTableProps").css("height", "1000px");
      });
    });

    jQuery("#changeTableProps").click('.bootstrap-select', function (e) {
      jQuery(".table-responsive").css("overflow", "visible");
    });
    this.get_client_home_currency();
    this.catagory_list();
    this.sourceNameOption();
    this.customer_vendor_list();
    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy" });

    console.log('from', this.props.location.state)

    // this.getSpecificPage(1, 10);

    jQuery(window).on("load", function () {
      window.jQuery(".mscroll-y").mCustomScrollbar({
        axis: "y",
        scrollEasing: "linear",
        scrollInertia: 600,
        autoHideScrollbar: "true",
        autoExpandScrollbar: "true",
      });

      window.jQuery(".ib-scroll").mCustomScrollbar({
        scrollEasing: "linear",
        scrollInertia: 600,
        scrollbarPosition: "outside",
      });
    });

    jQuery(document).ready(function () {
      jQuery(".left-navmenu .has-sub").click(function () {
        jQuery(".left-navmenu li a").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".left-navmenu li a:not(.active)")
          .siblings(".sub-menu")
          .slideUp();
        jQuery(this).siblings(".sub-menu").slideToggle();
      });
      jQuery(".left-navmenu .sub-menu li a").click(function () {
        jQuery(".left-navmenu .sub-menu li a").removeClass("active");
        jQuery(this).addClass("active");
      });
      jQuery(".search-btn").click(function () {
        jQuery(".hdr-search").addClass("active");
      });
      jQuery(".hdr-search .close-icon").click(function () {
        jQuery(".hdr-search").removeClass("active");
      });
      window.jQuery(".select-picker").selectpicker();
      jQuery(".label-enclose .label").click(function () {
        jQuery(this).toggleClass("active");
      });
      jQuery(".nav-brand-res").click(function () {
        jQuery(".left-navbar").addClass("active");
      });
      jQuery(".menu-close").click(function () {
        jQuery(".left-navbar").removeClass("active");
      });
    });
    if (
      this.state.deposit_id != '' &&
      this.state.deposit_id != null &&
      this.state.deposit_id != undefined
    ) {
      this.get_deposit_details()
    }
  }
  get_deposit_details= () => {

    let input = {
      client_id: this.state.logged_client_id,
      deposit_id : this.state.deposit_id,      
    }
    FetchAllApi.get_deposit_details(input, (err, response) => {
      if (response.status === 1) {
        let data = response.details
        let detail = response.details.paydetails
        this.get_bank_balance(data.account);
        let date= data.invoice_date.split("-");
        var date_formated = date[2] + "/" + date[1] + "/" + date[0];
        jQuery("#transaction_date").val(date_formated)
       // jQuery("#payor_name").val(data.customer_id)
        var items=[]
        for (let i = 0; i < data.item_list.length; i++) {         
          var item_list = {
            catagory_id: data.item_list[i].category_id,
            third_party_acc_id:data.item_list[i].selected_user_id,
            unit_price: data.item_list[i].unit_price,
            memo: data.item_list[i].descr,
            amount: data.item_list[i].item_total,           
          }        
          items.push(item_list); 
        }
        this.setState({
          isEdit: true,
          selected_bank: data.account,
          transaction_date:data.invoice_date,
          payor_name:data.customer_id,
          bankCurency: data.currency,
          item_array:items,
          reference_no:data.reference_no,
          amount:data.grand_total_foreign_currency,
          memo:data.memo
        }, () => {
          setTimeout(() => {
           console.log(this.state.item_array, this.state.payor_name,this.state.transaction_date)
          }, 1000);
        })
        
      }
        else {
          alert(response.message)
        }
      });
  }
  getSpecificPage = (pageNumber, limitvalue, searchkey) => {
    let client_id = this.state.logged_client_id;
    let page = pageNumber;
    let limit = this.state.selectedLimit;

    let search = searchkey;

    // alert(this.state.logged_client_id)
    FetchAllApi.customer_list(
      client_id,
      page,
      limit,
      search,
      parseInt(this.state.selected_filter_id),
      (err, response) => {
        console.log("Customer_list", response);
        if (response.status === 1) {
          let customerListArray = response.list;
          //  let totalPagesCount = new Array(parseInt( response.TotalPages))
          var totalPagesCount = [];
          for (var i = 1; i <= response.TotalPages; i++) {
            totalPagesCount.push(i);
          }
          this.setState({
            customerListArray: customerListArray,
            TotalPages: totalPagesCount,
            selectedLimit: this.state.selectedLimit,
            totalPagesCount: response.TotalPages,
          });
        } else {
          this.setState({
            customerListArray: [],
            TotalPages: "",
            pgNo: "",
            totalPagesCount: "",
          });
        }
      }
    );
  };

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  render() {
    return (
      <div>
        {/* Main Wrapper Starts here */}
        <div className="container-fluid">
          <div className="row">
            {/* left-navbar Starts here */}
            <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />

            {/* left-navbar Ends here */}
            {/* MainContent Wrapper Starts here */}
            <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
              {/* Top bar Starts here */}
              <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <form className="hdr-search">
                  <input
                    type="text"
                    className="form-control"
                    name="search"
                    placeholder="Search..."
                  />
                  {/* <button type="submit" class="btn btn-green">Search</button> */}
                  <a href="javascript:;" className="close-icon">
                    <img src="images/close-icon-red.svg" alt="Close" />
                  </a>
                </form>
                <div className="nav-brand-res visible-xs">
                  <img
                    className="img-responsive"
                    src="images/logo-icon.png"
                    alt="LogoIcon"
                  />
                </div>
                <a href="javascript:;" className="back hidden-xs" onClick={() => this.props.history.goBack()}>
                  <img src="images/back-arrow-blue.svg" />
                </a>
                {/* <span class="page-title hidden-xs">Preference</span> */}
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li>
                    <a href="javascript:;">Banking</a>
                  </li>
                  <li>Make Deposit</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>
              {/* Top bar Ends here */}
              <div className="col-md-12 col-xs-12 mar-top visible-xs">
                <a href="javascript:;" className="back">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <span className="page-title">Make Deposit</span>
              </div>
              {/* content-top Starts here */}
              <div className="content-top col-md-12 col-xs-12">
                <form className="custom-form row">
                  <div className="form-group col-md-4 mar-b-no">
                    <label>Bank Account<span className="astrick">*</span></label>
                    <div>
                      <select
                        className="selectpicker form-control add-new"
                        id="bank_account"
                        data-live-search="true"
                        title="Choose"
                        value={this.state.selected_bank}
                        onChange={this.bankSelected}
                      // onChange={(e) => {
                      //   if (e.target.value == "1qw") {
                      //   }
                      // }}
                      >
                        <option value="1qw">Choose...</option>

                        {this.state.banks.length > 0 &&
                          this.state.banks.map((item, i) => {
                            // if (
                            //   this.props.location.state !=
                            //     undefined &&
                            //   this.props.location.state.finance
                            //     .sales_default_account === item.id
                            // ) {
                            //   var selected = 'selected'
                            // }
                            return (
                              <option
                                value={item.id}
                              // selected={selected}
                              // dataStatus={item.currency}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group col-md-4 mar-b-no">
                    <label className="bal-txt wc">
                      Ending Balance:{" "}
                      <strong>
                        {this.state.bankCurency} {""} {this.state.bank_balance}
                      </strong>
                    </label>
                  </div>
                </form>
              </div>
              {/* content-top Starts here */}
              {/* Main Content Starts here */}
              <div className="main-content col-md-12 col-xs-12 pad-t-no">
                <div className="content-sec col-md-12 col-xs-12 pad-no">
                  <form className="custom-form invoice-form">
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label>Payer Name<span className="astrick">*</span></label>
                        <div>
                          <select
                            className="selectpicker form-control add-new"
                            id="payor_name"
                            data-live-search="true"
                            title="Choose"
                            value={this.state.payor_name}
                            onChange={(e) => {
                              this.setState({ payor_name: e.target.value });
                            }}
                          // onChange={(e) => {
                          //   this.setState({currency: e.target.value})
                          //   // if (e.target.value == "1qw") {
                          //   // }
                          // }}
                          >
                            
                            <option value="1qw">Choose...</option>
                            {this.state.payee_names.length > 0 && this.state.payee_names.map((val) => {
                        return (
                          <option value={JSON.stringify(val.id)} >{val.name}</option>
                        )
                      })}
                            {/* {this.state.payee_names.length > 0 &&
                              this.state.payee_names.map((item, i) => {
                                // if (
                                //   this.props.location.state != undefined &&
                                //   this.props.location.state.finance
                                //     .sales_default_account === item.id
                                // ) {
                                //   var selected = "selected";
                                // }
                                return (
                                  <option
                                    value={item}
                                    // selected={selected}
                                    data-status={item.id}
                                  >
                                    {item.name}
                                  </option>
                                );
                              })} */}
                          </select>
                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <label>Currency<span className="astrick">*</span></label>
                        <div>
                          <select
                            className="selectpicker form-control add-new"
                            id="bank_account"
                            data-live-search="true"
                            title="Choose"
                            value={this.state.bankCurency}
                            onChange={(e) => {
                              this.setState({
                                currency: e.target.value,
                              });
                              alert(
                                "bank currency and payment currency should be same "
                              );
                              // this.setState({
                              //   currency: e.target.value,
                              //   exchange_rate: this.state.currency_clone[
                              //     e.target.value
                              //   ],
                              // });
                            }}
                          >
                            <option value="1qw">Choose...</option>

                            {this.state.currencies.length > 0 &&
                              this.state.currencies.map((item, i) => {
                                // if (
                                //   this.props.location.state !=
                                //     undefined &&
                                //   this.props.location.state.finance
                                //     .sales_default_account === item.id
                                // ) {
                                //   var selected = 'selected'
                                // }
                                return (
                                  <option
                                    value={item}

                                  // selected={selected}
                                  // data-status={item.id}
                                  >
                                    {item}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <label>Reference No#<span className="astrick">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name
                          value={this.state.reference_no}
                          onChange={(e) =>
                            this.setState({ reference_no: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label>Transaction Date<span className="astrick">*</span></label>
                        <div
                          className="input-group date mar-t-no"
                          data-date-format="dd/mm/yyyy"
                        >
                          <input
                            type="text"
                            className="form-control"
                            id="transaction_date"
                            onBlur={() => this.changeDate()}
                          />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <label>Amount<span className="astrick">*</span></label>
                        <input
                          type="number"
                          className="form-control"
                          name
                          onChange={(e) =>
                            this.setState({ amount: e.target.value })
                          }
                          value={this.state.amount}
                          placeholder={0}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label>Total Amount in Words<span className="astrick">*</span></label>
                        <textarea
                          className="form-control"
                          defaultValue={""}
                          value={toWords.convert(
                            isNaN(Number(this.state.amount))
                              ? 0
                              : Number(this.state.amount)
                          )}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label>Memo</label>
                        <textarea
                          className="form-control"
                          defaultValue={""}
                          onChange={(e) =>
                            this.setState({ memo: e.target.value })
                          }
                          value={this.state.memo}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-12">
                        <div className="table-responsive col-md-12" id="changeTableProps">
                          <table className="invoice-item-table">
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>Category</th>
                                <th>Third Party Name</th>
                                <th>Memo</th>
                                <th className="text-right">Amount</th>
                              </tr>
                            </thead>
                            <tbody className="ui-sortable">
                              {this.state.item_array &&
                                this.state.item_array.map((item, j) => {
                                  let itemid = j
                                  return (
                                    <tr key={item.id}>
                                      <td>
                                        <span className="drag-icon">
                                          <img
                                            src="images/dots-menu.svg"
                                            alt="icon"
                                          />
                                        </span>
                                        <span>{j + 1}</span>
                                      </td>
                                      <td style={{ width: "30%" }}>
                                        {/* <select
                                          className=" form-control add-new"
                                          data-live-search="true"
                                          title="Choose"
                                          name="catagory_id"
                                          value={item.catagory_id}
                                          onChange={this.handleTable(j)}
                                        >
                                          <option value="1e">Choose... </option>
                                          {this.state.default_category_list &&
                                            this.state.default_category_list.map(
                                              (item) => {
                                                return (
                                                  <option
                                                    value={item.id}
                                                    // data-status={item.id}
                                                  >
                                                    {item.name}
                                                  </option>
                                                );
                                              }
                                            )}
                                        </select> */}
                                        <select
                                          className="selectpicker form-control add-new hello"
                                          data-live-search="true"
                                          title="Choose "
                                          name="catagory_id"
                                          value={item.catagory_id}
                                          onChange={(e) => {
                                            const { name, value } = e.target;
                                            var myarray = this.state.item_array;
                                            myarray[j][name] = value;
                                            this.setState({
                                              item_array: myarray,
                                            });
                                            if (e.target.value == "1e") {
                                              jQuery(
                                                `#categry_id${itemid} option`
                                              )
                                                .prop("selected", false)
                                                .trigger("change");

                                              window
                                                .jQuery("#pop-modal")
                                                .modal("show");
                                            }

                                            // to update category 
                                           this.handleTable(itemid)
                                            // to update category 

                                          
                                            // if (e.target.value == "1e") {
                                            //   jQuery("#balanceSheetCategeory option")
                                            //     .prop("selected", false)
                                            //     .trigger("change");
                                            //   jQuery("#balanceSheetCategeory").val("");
                                            //   window.jQuery("#pop-modal").modal("show");
                                            // }

                                            this.state.balancesheetlist.forEach(
                                              (item, i) => {
                                                if (item.id == e.target.value) {                                                 
                                                  const string = item.name;
                                                  const Payable = string.includes(
                                                    "ayable"
                                                  );
                                                  const Receivable = string.includes(
                                                    "eceivable"
                                                  );
                                                  if (
                                                    item.account_type_id ==
                                                    "5" ||
                                                    item.account_type_id == "2"
                                                  ) {

                                                    jQuery("#third_account_id").attr("disabled", false);
                                                    this.setState({
                                                      isThirdPartyName: true,
                                                    });
                                                    if (
                                                      item.account_type_id ==
                                                      "5"
                                                    ) {
                                                      this.setState({
                                                        thrird_party_type: 2,
                                                      });
                                                      this.fetchThirdPartyNames(
                                                        5,
                                                        j
                                                      );
                                                    }
                                                    if (
                                                      item.account_type_id ==
                                                      "2"
                                                    ) {
                                                      this.setState({
                                                        thrird_party_type: 1,
                                                      });

                                                      this.fetchThirdPartyNames(
                                                        2,
                                                        j
                                                      );
                                                    }
                                                  } else {
                                                    jQuery("#third_account_id").attr("disabled", true);
                                                    this.setState({
                                                      isThirdPartyName: false,
                                                    });
                                                  }
                                                }
                                              }
                                            );

                                            //  const matchedList= this.state.balancesheetlist.filter(item=>item[e.target.value]==e.target.value)
                                          }}
                                        >
                                           <option value="1e">
                                            Create New{" "}
                                          </option>
                                         
                                          {this.state.balancesheetlist &&
                                            this.state.balancesheetlist.map(
                                              (item) => {
                                                //console.log("fee", item.name);
                                                return (
                                                  <option
                                                    value={item.id}
                                                    data-status={item.name}
                                                  >
                                                    {item.name}
                                                  </option>
                                                );
                                              }
                                            )}
                                        </select>
                                      </td>
                                      <td>
                                        <select
                                          className="selectpicker form-control add-new"
                                          data-live-search="true"
                                          title="Choose..."
                                          id="third_account_id"
                                          name="third_party_acc_id"
                                          value={item.third_party_acc_id}                                          
                                          onChange={(e) => {
                                            const { name, value } = e.target;
                                            var myarray = this.state.item_array;
                                            myarray[j][name] = value;
                                            this.setState({
                                              item_array: myarray,
                                            });
                                            // alert( jQuery("#third_account_id").val())
                                            // if (
                                            //   jQuery(
                                            //     "#third_account_id"
                                            //   ).val() == "new"
                                            // ) {
                                            //   console.log(
                                            //     "1111",
                                            //     this.state.thrird_party_type
                                            //   );
                                            //   if (
                                            //     this.state.thrird_party_type ==
                                            //     1
                                            //   ) {
                                            //     localStorage.setItem(
                                            //       "comes_from",
                                            //       "third_party"
                                            //     );
                                            //     let win = window.open(
                                            //       "/add-new-customer",
                                            //       "_blank"
                                            //     );
                                            //     win.focus();
                                            //   }
                                            //   if (
                                            //     this.state.thrird_party_type ==
                                            //     2
                                            //   ) {
                                            //     localStorage.setItem(
                                            //       "comes_from",
                                            //       "third_party"
                                            //     );
                                            //     let win = window.open(
                                            //       "/add_new_vendor",
                                            //       "_blank"
                                            //     );
                                            //     win.focus();
                                            //   }
                                            //   // alert( 'in')
                                            // }
                                          }}
                                        >
                                          {/* <option>Create New </option> */}
                                          <option value="new">Choose...</option>
                                          {/* {this.state[
                                            `third_party_account_list${j}`
                                          ] &&
                                            this.state[
                                              `third_party_account_list${j}`
                                            ].map((item) => {
                                              return (
                                                <option
                                                  value={item.id}
                                                  data-status={item.name}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            })} */}
                                              {this.state.sourceNameOptions.map((val) => {
                        return (
                          <option value={JSON.stringify(val.id)} >{val.name}</option>
                        )
                      })}
                                        </select>
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="qty"
                                          className="form-control"
                                          placeholder="--"
                                          name="memo"
                                          value={item.memo}
                                          onChange={this.handleTable(j)}
                                        />
                                      </td>
                                      <td className="text-right">
                                        <input
                                          type="text"
                                          name="amount"
                                          className="form-control"
                                          placeholder="00.00"
                                          name="amount"
                                          value={item.amount}
                                          onChange={this.handleTable(j)}
                                        />
                                        <div className="action-wrap">
                                          {/* <a
                                            href="javascript:;"
                                            className="clone-row"
                                          >
                                            <img
                                              src="images/clone-icon.svg"
                                              alt="icon"
                                            />
                                          </a> */}
                                          <a
                                            href="javascript:;"
                                            className="del-row"
                                            onClick={() => this.deleteRow(j)}
                                          >
                                            <img
                                              src="images/delete-icon.svg"
                                              alt="icon"
                                            />
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                          <div className="form-group col-md-6 mar-b-no">
                            {this.state.message == true ? (
                              <div style={{ float: 'left' }}>
                                <small style={{ color: 'red' }}>
                                  *Please fill out table Field.
                                </small>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                          <div className="form-group col-md-6 mar-b-no">
                            <a
                              href="javascript:;"
                              className="add-input"
                              onClick={() => {
                                this.addRow(this.state.item_array.length + 1);
                              }}
                            >
                              ADD ROW
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 total-row">
                        <div className="row">
                          <div className="form-group exchange-col col-md-5 col-xs-12">
                            <label className="fw-sbold">
                              Exchange Rate 1 {''} {this.state.currency} 
                            </label>
                            <div>
                              <input
                                type="text"
                                name="exchangeRate"
                                className="form-control"
                                defaultValue="0.00"
                                value={this.state.exchange_rate}
                              />
                              <span className="label">
                                {this.state.clientHomeCurrency}
                              </span>
                            </div>
                          </div>
                          <div className="form-group col-md-7 col-xs-12 total-table">
                            <table className="pull-right">
                              <thead>
                                <tr>
                                  <th>&nbsp;</th>
                                  <th className="text-center">
                                    Foreign Currency
                                    <br />({this.state.bankCurency})
                                  </th>
                                  <th className="text-center">
                                    Home Currency
                                    <br />({this.state.clientHomeCurrency})
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-right">Sub Total</td>
                                  <td className="text-center">
                                    {" "}
                                    {this.total()}
                                  </td>
                                  <td className="text-center">
                                    {(
                                      Number(this.total()) *
                                      Number(this.state.exchange_rate)
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-right">Tax</td>
                                  <td className="text-center">00.00</td>
                                  <td className="text-center">00.00</td>
                                </tr>
                                <tr>
                                  <td className="text-right">Grand Total</td>
                                  <td className="text-center">
                                    {this.total()}
                                  </td>
                                  <td className="text-center">
                                    {" "}
                                    {(
                                      Number(this.total()) *
                                      Number(this.state.exchange_rate)
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* Main Content Ends here */}
              <div className="invoice-form">
                <div className="pf-btm-wrap xs-pad-all">
                  <div className="col-md-12 col-xs-12 text-right pad-no">
                    <button type="button"  onClick={() => this.clear()} className="btn btn-lightgray mar-rgt-5 btn-align">
                      Clear
                    </button>
                    <button type="button" className="btn btn-blue mar-rgt-5 btn-align">
                      Save &amp; New
                    </button>
                    <button
                      type="button"
                      disabled={
                        this.total() == Number(this.state.amount).toFixed(2)
                          ? false
                          : true
                      }
                      className="btn btn-green mar-rgt-5 btn-align"
                      onClick={() => this.save()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* MainContent Wrapper Ends here */}
          </div>
          {this.state.error == true ? (
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
                  {this.state.errormessage}
            </strong>
              </div>
            </div>
          ) : null}


        </div>

        {/* Main Wrapper Ends here */}
        {/* footer Starts here */}
        <Footer
          defaultcategorylist_onchange={this.defaultcategorylist_onchange}
          logoutSubmit={(e) => this.logoutLink(e)}
        />
        {/* footer Ends here */}
      </div>
    );
  }
}
export default MakeDeposit;
