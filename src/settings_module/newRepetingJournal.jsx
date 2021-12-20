import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery';
import Footer from "../components/footer.jsx";
import Moment from 'moment';
import Category from "./categoryadd"
import "./preference.css"
import Comma from './../components/comma'

import config from './../api_links/api_links'




export default class Repetingjournal extends React.Component {
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
      narration: "",
      entry_no: "",
      journal_date: "",
      repeat_journal: "",
      repeat_journal_date: "",
      end_date: "",
      insert_placeholder: "",
      data_table: [{ name: "", descr: "", credit: "", debit: "", foreign_debit: "", foreign_credit: "", selectedTax: "", category: "", tax_name: '', tax_rate: 0, tax_type: "", item_tax_debit: "", item_tax_credit: "", foreign_item_tax_credit: "", foreign_item_tax_debit: "" }],
      myarray: [],
      rows: ["row 1"],
      rows: ["row 1"],
      initial_value: 0,
      isTablefilled: false,
      taxName: "",
      taxType: '',
      taxRate: '',
      taxCode: '',
      deleteArr: [],
      show_succes: false,
      country_code: '',
      modal_info_msg: "",
      selected_rate_type: "%",
      maximum_chr_lngth: 4,
      selectedOption: "option2",
      rate_entered: "",
      search_key_gst: "",
      gst_list: [],
      isAdd: false,
      tax: "",
      account: "",
      including_tax: false,
      addRate: '',
      debitSubTotal: "00.00",
      creditSubTotal: "00.00",
      debitSubTotalHome: "00.00",
      creditSubTotalHome: "00.00",
      taxTotalDebit: 0,
      taxTotalDebitHome: 0,
      taxTotalCredit: 0,
      taxTotalCreditHome: 0,
      exchange_rate: '',
      clientHomeCurrency: '',
      currency_list: [],
      currency: {},
      default_category_list: [],
      selected_currency: "",
      exchange_rate: '',
      totalTaxarrDebit: [],
      totalTaxarrCredit: [],
      name: [],
      indexdebit: 0,
      indexcredit: 0,
      grandTotalDebit: "00.00",
      grandTotalDebitHome: "00.00",
      grandTotalCredit: "00.00",
      grandTotalCreditHome: "00.00",
      debitSubTotalarr: [],
      creditSubTotalarr: [],
      taxincluarrDebit: [],
      taxincluarrCredit: [],
      indetax: 0,
      repeatOption: "",
      dummydate: "",
      errorMsg: false,
      namelist: [],
      check: true,
      loading: false,
    }
    this.taxindeb = [];
    this.subtdeb = [];
    this.taxincre = [];
    this.subtcre = [];
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

  componentDidMount() {
    this.getCountry();
    this.get_client_home_currency();
    this.defaultcategorylist_onchange();
    this.addRow();
    this.fetchNames();
    this.newJournalNextFunc();

    setInterval(() => {

      if (localStorage.getItem("customerId") != '' || localStorage.getItem("third_party_customer_id") != '') {
        this.fetchNames();
        localStorage.setItem("customerId", '')
        localStorage.setItem("third_party_customer_id", '')
      }
    }, 3000);

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
  repeatOptionChange = (e) => {
    this.setState({ repeatOption: e.target.value }, this.autoFilledEnd)
  };

  changeJournalDate = (e) => {
    let val = jQuery("#repeat_journal_date").val();
    this.setState({ repeat_journal_date: val }, this.autoFilledEnd)
  };

  endDateChange = (e) => {
    let val = jQuery("#end_date").val();
    console.log("new", val)
    this.setState({ end_date: val }, this.howmanyCount)
  };

  howmanyCount = (e) => {
    let dummy = this.state.repeat_journal_date;
    let end = this.state.end_date;
    let con = this.state.repeatOption;
    console.log(dummy, end, con)
    let date_formated1;
    let date_formated2;
    if (dummy !== "") {
      let date = dummy.split('/')
      date_formated1 = date[1] + "/" + date[0] + "/" + date[2]
    };
    if (end !== "") {
      let date = end.split('/')
      date_formated2 = date[1] + "/" + date[0] + "/" + date[2]
    }

    let diff;
    if (dummy !== "" && end !== "") {
      if (con == "daily") {
        diff = Moment(date_formated2).diff(Moment(date_formated1), 'days')
        console.log(diff)
        this.setState({ repeat_journal: diff })
      } else if (con == "weekly") {
        diff = Moment(date_formated2).diff(Moment(date_formated1), 'weeks')
        this.setState({ repeat_journal: diff })
      } else if (con == "monthly") {
        diff = Moment(date_formated2).diff(Moment(date_formated1), 'months')
        this.setState({ repeat_journal: diff })
      } else if (con == "yearly") {
        diff = Moment(date_formated2).diff(Moment(date_formated1), 'years')
        this.setState({ repeat_journal: diff })
      }
    }
  };

  changeRepeateJournal = (e) => {
    this.setState({ repeat_journal: e.target.value }, this.autoFilledEnd)
  }

  autoFilledEnd = () => {
    let option = this.state.repeatOption
    let input = this.state.repeat_journal_date
    let date
    let date_formated
    if (input !== "") {
      date = input.split('/')
      date_formated = date[1] + "/" + date[0] + "/" + date[2]
    }
    let howmany = this.state.repeat_journal
    let out;
    if (option !== "" && input !== "" && howmany !== "") {
      if (option == "monthly") {
        out = Moment(date_formated).add(howmany, "M").calendar()
      } else if (option == "yearly") {
        out = Moment(date_formated).add(howmany, "y").calendar()
      } else if (option == "weekly") {
        out = Moment(date_formated).add(howmany, "w").calendar()
      } else if (option == "daily") {
        out = Moment(date_formated).add(howmany, "d").calendar()
      }

      let date1 = out.split('/')
      let format = date1[1] + "/" + date1[0] + "/" + date1[2]

      this.setState({ end_date: format })
    }
  };


  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  narrationChange = (e) => {
    this.setState({ narration: e.target.value }, this.changeMemo(0, e.target.value))
  };


  changeDate = (e) => {
    let val = jQuery("#journal_date").val();
    this.setState({ journal_date: val })
  };

  currencyChange = (e) => {
    this.setState({ selected_currency: e.target.value }, this.exchangeRateChange)
  };

  exchangeRateChange = () => {
    let rate = this.state.currency[this.state.selected_currency]
    let rateChange = parseFloat((1 / rate).toFixed(5))
    this.setState({ exchange_rate: rateChange })
  };

  changeMemo = (idx, e) => {
    console.log("name", this.state.check)
    let table = [...this.state.data_table]
    if (this.state.check == true) {
      table[idx].descr = e;
    } else {
      table[idx].descr = '';
    };

    this.setState({ data_table: table })
  };

  categoryChange = (idx, e) => {
    const table = [...this.state.data_table]
    table[idx].category = e
    this.setState({ data_table: table })
  };

  taxClick = (idx, value) => {
    let table = [...this.state.data_table]
    table[idx].selectedTax = value
    this.setState({ data_table: table })
    this.state.gst_list.map((data) => {
      if (data.id == value) {
        table[idx].tax_name = data.sales_tax_name
        table[idx].tax_rate = data.rate

        table[idx].tax_type = data.rate_type
        this.setState({ data_table: table }, () => {
          this.excludingTaxTotalDebit(idx)
          this.excludingTaxTotalCredit(idx)
        })
      }
    })
  };


  changeName = (idx, e) => {
    let table = [...this.state.data_table]
    table[idx].name = e
    this.setState({ data_table: table })
  };

  changeCredit = (idx, e) => {
    let table = [...this.state.data_table]
    let tax = [...this.state.totalTaxarrDebit]
    table[idx].foreign_credit = e
    table[idx].foreign_debit = 0
    if (tax[idx] !== 0) {
      tax[idx] = 0
    }
    table[idx].credit = e * this.state.exchange_rate
    table[idx].debit = ""
    this.setState({ data_table: table, totalTaxarrDebit: tax }, () => {
      this.excludingTaxTotalCredit(idx)
      this.excludingTaxTotalDebit(idx)
    })
  };

  changeDebit = (idx, e) => {
    let table = [...this.state.data_table]
    let tax = [...this.state.totalTaxarrCredit]
    console.log(tax[idx])
    table[idx].foreign_debit = e
    table[idx].foreign_credit = 0
    if (tax[idx] !== 0) {
      tax[idx] = 0
    }
    table[idx].debit = e * this.state.exchange_rate
    table[idx].credit = ""
    this.setState({ data_table: table, totalTaxarrCredit: tax }, () => {
      this.excludingTaxTotalDebit(idx)
      this.excludingTaxTotalCredit(idx)
    })
  };


  checkChange = (val) => {

    this.setState({ check: val }, () => this.changeMemo(0, this.state.narration))
  };

  addRow = () => {
    let val = [...this.state.data_table];
    if (this.state.check == true) {
      val.push({ descr: this.state.narration, name: "", debit: "", credit: "", foreign_credit: "", foreign_debit: "", selectedTax: "", category: "", tax_name: '', tax_rate: 0, tax_type: "", item_tax_debit: "", item_tax_credit: "", foreign_item_tax_credit: "", foreign_item_tax_debit: "" })
    } else {
      val.push({ descr: "", name: "", debit: "", credit: "", foreign_credit: "", foreign_debit: "", selectedTax: "", category: "", tax_name: '', tax_rate: 0, tax_type: "", item_tax_debit: "", item_tax_credit: "", foreign_item_tax_credit: "", foreign_item_tax_debit: "" })
    };
    this.setState({ data_table: val },)
  };

  copyRow = (idx) => {
    let copy = [...this.state.data_table]
    let val = copy[idx]
    copy.push({ descr: val.descr, name: val.name, debit: val.debit, credit: val.credit, foreign_credit: val.foreign_credit, foreign_debit: val.foreign_debit, selectedTax: val.selectedTax, category: val.category, tax_name: val.tax_name, tax_rate: val.tax_rate, tax_type: val.tax_type, item_tax_debit: val.item_tax_debit, item_tax_credit: val.item_tax_credit, foreign_item_tax_credit: val.foreign_item_tax_credit, foreign_item_tax_debit: val.foreign_item_tax_debit })
    this.setState({ data_table: copy }, () => {
      this.excludingTaxTotalCredit(idx)
      this.excludingTaxTotalDebit(idx)
    })

  };

  excludingTaxTotalDebit = (idx, lop) => {
    let table = [...this.state.data_table]
    let taxarr = [...this.state.totalTaxarrDebit]
    let taxin;
    if (table[idx].foreign_Debit !== "") {
      this.setState({ indexdebit: idx })
    }
    let subtarr;
    if (lop !== undefined) {
      taxin = this.taxindeb
      subtarr = this.subtdeb;

    } else {
      taxin = [...this.state.taxincluarrDebit]
      subtarr = [...this.state.debitSubTotalarr]
    }
    let cal;
    let sum;
    let subt;
    let tax;
    if (this.state.including_tax == true) {
      if (table[idx].foreign_debit !== "") {
        if (this.state.indexdebit == idx) {
          subt = table[idx].foreign_debit * (100 / (100 + table[idx].tax_rate))
          table[idx].foreign_item_tax_debit = subt
          table[idx].item_tax_debit = subt * this.state.exchange_rate
          this.setState({ data_table: table })
          subtarr.splice(idx, 1, subt)
          sum = subtarr.reduce(function (prev, current) {
            return prev + +current
          }, 0)
          let equ = table[idx].foreign_debit - subtarr[idx]
          taxin.splice(idx, 1, equ)
          tax = taxin.reduce(function (prev, current) {
            return prev + +current
          }, 0)
          let mul = this.state.exchange_rate * sum
          let taxmul = this.state.exchange_rate * tax
          this.setState({ debitSubTotal: sum, taxTotalDebit: tax, debitSubTotalarr: subtarr, taxincluarrDebit: taxin, debitSubTotalHome: mul, taxTotalDebitHome: taxmul }, this.grandTotalDebitFunc)
        } else {
          subt = table[idx].foreign_debit * (100 / (100 + table[idx].tax_rate))
          table[idx].foreign_item_tax_debit = subt
          table[idx].item_tax_debit = subt * this.state.exchange_rate
          this.setState({ data_table: table })
          subtarr[idx] = subt
          sum = subtarr.reduce(function (prev, current) {
            return prev + +current
          }, 0)
          let equ = table[idx].foreign_debit - subtarr[idx]
          taxin[idx] = equ
          tax = taxin.reduce(function (prev, current) {
            return prev + +current
          }, 0)
          let mul = this.state.exchange_rate * sum
          let taxmul = this.state.exchange_rate * tax
          this.setState({ debitSubTotal: sum, taxTotalDebit: tax, debitSubTotalarr: subtarr, taxincluarrDebit: taxin, debitSubTotalHome: mul, taxTotalDebitHome: taxmul }, this.grandTotalDebitFunc)

        }
      }
    } else {
      sum = table.reduce(function (prev, current) {
        return prev + +current.foreign_debit
      }, 0)
      if (this.state.indexdebit == idx) {
        cal = (table[idx].tax_rate / 100) * table[idx].foreign_debit
        table[idx].foreign_item_tax_debit = cal
        table[idx].item_tax_debit = cal * this.state.exchange_rate
        this.setState({ data_table: table })
        taxarr.splice(idx, 1, cal);
        tax = taxarr.reduce(function (prev, current) {
          return prev + +current
        }, 0)
        let mul = this.state.exchange_rate * sum
        let taxmul = this.state.exchange_rate * tax
        this.setState({ debitSubTotal: sum, taxTotalDebit: tax, totalTaxarrDebit: taxarr, debitSubTotalHome: mul, taxTotalDebitHome: taxmul }, this.grandTotalDebitFunc)
      }
      else {
        cal = (table[idx].tax_rate / 100) * table[idx].foreign_debit
        table[idx].foreign_item_tax_debit = cal
        table[idx].item_tax_debit = cal * this.state.exchange_rate
        this.setState({ data_table: table })
        taxarr[idx] = cal
        tax = taxarr.reduce(function (prev, current) {
          return prev + +current
        }, 0)
        let mul = this.state.exchange_rate * sum
        let taxmul = this.state.exchange_rate * tax
        this.setState({ debitSubTotal: sum, taxTotalDebit: tax, totalTaxarrDebit: taxarr, debitSubTotalHome: mul, taxTotalDebitHome: taxmul }, this.grandTotalDebitFunc)
      }
    }

  };


  excludingTaxTotalCredit = (idx, lop) => {
    let table = [...this.state.data_table]
    let taxarr = [...this.state.totalTaxarrCredit]
    let taxin;
    if (table[idx].foreign_credit !== "") {
      this.setState({ indexcredit: idx })
    }
    let subtarr;
    if (lop !== undefined) {
      taxin = this.taxincre;
      subtarr = this.subtcre;

    } else {
      taxin = [...this.state.taxincluarrCredit]
      subtarr = [...this.state.creditSubTotalarr]
    }
    let cal;
    let sum;
    let subt;
    let tax;
    if (this.state.including_tax == true) {
      if (table[idx].foreign_credit !== "") {
        if (this.state.indexcredit == idx) {
          subt = table[idx].foreign_credit * (100 / (100 + table[idx].tax_rate))
          table[idx].foreign_item_tax_credit = subt
          table[idx].item_tax_credit = subt * this.state.exchange_rate
          this.setState({ data_table: table })
          subtarr.splice(idx, 1, subt)
          sum = subtarr.reduce(function (prev, current) {
            return prev + +current
          }, 0)
          let equ = table[idx].foreign_credit - subtarr[idx]
          taxin.splice(idx, 1, equ)
          tax = taxin.reduce(function (prev, current) {
            return prev + +current
          }, 0)
          let mul = this.state.exchange_rate * sum
          let taxmul = this.state.exchange_rate * tax
          this.setState({ creditSubTotal: sum, taxTotalCredit: tax, creditSubTotalarr: subtarr, taxincluarrCredit: taxin, creditSubTotalHome: mul, taxTotalCreditHome: taxmul }, this.grandTotalCreditFunc)
        } else {
          subt = table[idx].foreign_credit * (100 / (100 + table[idx].tax_rate))
          table[idx].foreign_item_tax_credit = subt
          table[idx].item_tax_credit = subt * this.state.exchange_rate
          this.setState({ data_table: table })
          subtarr[idx] = subt
          sum = subtarr.reduce(function (prev, current) {
            return prev + +current
          }, 0)
          let equ = table[idx].foreign_credit - subtarr[idx]
          taxin[idx] = equ
          tax = taxin.reduce(function (prev, current) {
            return prev + +current
          }, 0)
          let mul = this.state.exchange_rate * sum
          let taxmul = this.state.exchange_rate * tax
          this.setState({ creditSubTotal: sum, taxTotalCredit: tax, creditSubTotalarr: subtarr, taxincluarrCredit: taxin, creditSubTotalHome: mul, taxTotalCreditHome: taxmul }, this.grandTotalCreditFunc)

        }
      }
    } else {
      sum = table.reduce(function (prev, current) {
        return prev + +current.foreign_credit
      }, 0)
      if (this.state.indexcredit == idx) {
        cal = (table[idx].tax_rate / 100) * table[idx].foreign_credit
        table[idx].foreign_item_tax_credit = cal
        table[idx].item_tax_credit = cal * this.state.exchange_rate
        this.setState({ data_table: table })
        taxarr.splice(idx, 1, cal);
        tax = taxarr.reduce(function (prev, current) {
          return prev + +current
        }, 0)
        let mul = this.state.exchange_rate * sum
        let taxmul = this.state.exchange_rate * tax
        this.setState({ creditSubTotal: sum, taxTotalCredit: tax, totalTaxarrCredit: taxarr, creditSubTotalHome: mul, taxTotalCreditHome: taxmul }, this.grandTotalCreditFunc)
      }
      else {
        cal = (table[idx].tax_rate / 100) * table[idx].foreign_credit
        table[idx].foreign_item_tax_credit = cal
        table[idx].item_tax_credit = cal * this.state.exchange_rate
        this.setState({ data_table: table })
        taxarr[idx] = cal
        tax = taxarr.reduce(function (prev, current) {
          return prev + +current
        }, 0)
        let mul = this.state.exchange_rate * sum
        let taxmul = this.state.exchange_rate * tax
        this.setState({ creditSubTotal: sum, taxTotalCredit: tax, totalTaxarrCredit: taxarr, creditSubTotalHome: mul, taxTotalCreditHome: taxmul }, this.grandTotalCreditFunc)
      }
    }

  };


  deleteRow = (idx) => {
    console.log("del", idx)
    let data = [...this.state.data_table]
    if (data.length > 2) {
      data.splice(idx, 1)
      this.setState({ data_table: data }, this.afterDelFunc)

    }
  };

  afterDelFunc = () => {
    for (var i = 0; i < this.state.data_table.length; i++) {
      this.excludingTaxTotalDebit(i)
      this.excludingTaxTotalCredit(i)
    }
  };


  debitTotalFunc = () => {
    let table = [...this.state.data_table]
    let sum = table.reduce(function (prev, current) {
      return prev + +current.debit
    }, 0)
    this.setState({ debitSubTotal: sum }, this.creditTotalFunc)


  };

  creditTotalFunc = () => {

    let table = [...this.state.data_table]
    let sum = table.reduce(function (prev, current) {
      return prev + +current.credit
    }, 0)
    this.setState({ creditSubTotal: sum })

  };
  grandTotalCreditFunc = () => {
    let creditTotal = this.state.creditSubTotal + this.state.taxTotalCredit
    let creditTotalHome = this.state.creditSubTotalHome + this.state.taxTotalCreditHome
    this.setState({ grandTotalCredit: creditTotal, grandTotalCreditHome: creditTotalHome })
  };

  grandTotalDebitFunc = () => {
    let debitTotal = this.state.debitSubTotal + this.state.taxTotalDebit
    let debitTotalHome = this.state.debitSubTotalHome + this.state.taxTotalDebitHome
    this.setState({ grandTotalDebit: debitTotal, grandTotalDebitHome: debitTotalHome })
  }


  taxAdd = (e) => {
    console.log(e.target.checked)
    let arr = [...this.state.data_table]
    this.setState({ including_tax: e.target.checked }, this.incluOrExcluFunc);
  };

  incluOrExcluFunc = () => {
    if (this.state.including_tax == true) {
      if (this.state.data_table[0].debit !== "0" && this.state.data_table[0].credit !== "0") {
        for (var i = 0; i < this.state.data_table.length; i++) {
          this.excludingTaxTotalDebit(i, "lop")
          this.excludingTaxTotalCredit(i, "lop")
        }
      }
    } else {
      this.excludingTaxTotalDebit(0)
      this.excludingTaxTotalCredit(0)

    }
  };






  handleChangeTax(event) {

    this.setState(
      {
        [event.target.name]: event.target.value,
      },

    );
  };

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  };

  handleCheck_get_selected_tax(
    selectednow_id,
    itemid,
    id,
    valueres,
    rate,
    type
  ) {
    console.log("selectednow_id", id);
    if (selectednow_id > 0) {
      jQuery("#" + id).html(valueres);
      jQuery("#selectedrate_id" + itemid).val(rate);
      jQuery("#selectedtype_id" + itemid).val(type);
      jQuery("#selectednow_id" + itemid).html(selectednow_id);

      this.handleChangeItems(valueres, this.state.rows.length - 1);

      jQuery(".form-table").removeClass("ovrFlwRmve");
    } else {
      alert("sorry fault is here only");
    }

    jQuery("#gst_search").val("");
    this.get_gst_list();
  }


  add_gst_details = (e) => {
    e.preventDefault();
    let sales_tax_code = this.state.taxCode;
    let sales_tax_name = this.state.taxName;
    let show_on_list = 1;
    let tax_type = this.state.taxType === "option1" ? 1 : 2;
    let rate = this.state.taxRate;
    let country = this.state.country_code;
    if (
      this.state.selected_rate_type != "Fixed price" &&
      this.state.selected_rate_type === "%"
    ) {
      var rate_type = 1;
    } else {
      var rate_type = 2;
    }


    let items = {
      sales_tax_code: sales_tax_code,
      sales_tax_name: sales_tax_name,
      show_on_list: show_on_list,
      tax_type: tax_type,
      rate: rate,
      rate_type: rate_type,
      country: country,
      client_id: this.state.logged_client_id
    };
    console.log("hjagsjkhlkasjh", items);
    FetchAllApi.add_gst_details(items, (err, response) => {
      console.log("add comment", response.status);

      if (response.status === 1) {
        jQuery("#sales_tax_code").val("");
        jQuery("#sales_tax_name").val("");
        jQuery("#sales_tax_name").val("");
        jQuery("#tax").val("");
        this.setState({ show_succes: true });
        this.get_gst_list();
        var THIS = this;
        setTimeout(function () {
          THIS.setState({ show_succes: false });
        }, 4000);
        window.jQuery("#pop-modal-1").modal("hide");
      } else {
        this.setState({ modal_info_msg: response.message });
        jQuery(".mymsg").fadeIn(2000);
        setTimeout(function () {
          jQuery(".mymsg").fadeOut(2000);
        }, 8000);
      }
    });
  };


  update_search_keyword = (event) => {
    this.setState({ search_key_gst: event.target.value }, () => {
      this.get_gst_list();
    });
  };

  get_gst_list = () => {
    let country_code = this.state.country_code;
    //alert(country_code)
    let keyword = this.state.search_key_gst;
    FetchAllApi.get_gst_list(country_code, keyword, this.state.logged_client_id, (err, response) => {
      console.log("defaultcategorylist", response);
      //alert(response.message)
      if (response.status === 1) {
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

  update_rate_fixed = () => {
    jQuery("#tax").val("");
    this.setState({
      selected_rate_type: "Fixed price",
      maximum_chr_lngth: 100,
    });
  };
  update_rate_type = () => {
    jQuery("#tax").val("");
    this.setState({
      selected_rate_type: "%",
      maximum_chr_lngth: 4,
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
  }

  modal_cancel = () => {
    jQuery("#sales_tax_code").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#tax").val("");
    this.setState({ modal_info_msg: "" });
    window.jQuery("#pop-modal-1").modal("hide");
  };


  handleChange_gst_type = (event) => {
    if (this.state.selected_rate_type != "Fixed price") {

      let entered_value = event.target.value;
      console.log(isNaN(entered_value))
      // alert(entered_value)
      if (isNaN(entered_value)) {
        jQuery("#tax").val("");
      } else {
        if (entered_value > 100) {
          jQuery("#tax").val("");
        } else {
          this.setState({ taxRate: entered_value });
        }
      }
    } else {
      let entered_value = event.target.value;
      if (isNaN(entered_value)) {
        jQuery("#tax").val("");
      } else {
        this.setState({ taxRate: entered_value });
      }
    }
  };

  newJournalNextFunc = () => {
    let client_Id = this.state.logged_client_id;
    FetchAllApi.get_manual_journal_next_number(client_Id, (err, response) => {
      if (response.status === 1) {
        this.setState(
          {
            entry_no: response.manual_journal_number,
          },

        );
      }
    });
  }


  get_currencies = () => {


    fetch(
      // `https://api.exchangerate-api.com/v4/latest/${this.state.clientHomeCurrency}`
      `https://api.currencylayer.com/live?access_key=${config.api_key}&source=${this.state.clientHomeCurrency}`

    )
      .then((response) => response.json())
      .then((data) => {
        let newObj = this.rename(data.quotes, this.state.clientHomeCurrency)

        const currencyAr = [];
        let first = newObj;
        for (const key in first) {
          currencyAr.push(key);
        }
        this.setState({ currency_list: currencyAr, currency: first });
      });
  };


  get_client_home_currency = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.get_client_home_currency(client_id, (err, response) => {
      if (response.status === 1) {
        console.log("Basio state", response);
        this.setState({
          clientHomeCurrency: response.currency,
        }, this.get_currencies);
      } else {
      }
    });
  };


  defaultcategorylist_onchange = (x, y) => {
    let keyy = "";
    let from_create_invoice = 1;
    var client_id = this.state.logged_client_id;

    FetchAllApi.manual_journal_defaultcategorylist(
      keyy,
      from_create_invoice,
      client_id,
      (err, response) => {
        if (response.status === 1) {
          if (x == "added") {
            this.setState({
              selectNeedIndex: response.list.length - 1,
              nameFilter: y,
            });
          }
          this.setState(
            {
              default_category_list: response.list,
            },
            () => {
              window.jQuery("#categry_id0").selectpicker("refresh");
            }
          );
        } else {
          this.setState({
            default_category_list: [],
          });
        }
      }
    );
  };





  fetchNames = () => {
    let client_Id = this.state.logged_client_id;
    FetchAllApi.settings_find_drop2_contact(client_Id, (err, response) => {
      if (response.status === 1) {
        this.setState({ namelist: response.list })
      }
    })
  };

  saveClick = (val1, val2) => {
    let status;
    if (val1 == "post") {
      status = 1
    } else {
      status = 2
    }
    let option;
    let repeatOption = this.state.repeatOption
    if (repeatOption == "daily") {
      option = 1
    } else if (repeatOption == "weekly") {
      option = 2
    } else if (repeatOption == "monthly") {
      option = 3
    } else if (repeatOption == "yearly") {
      option = 4
    };
    let tax;
    if (this.state.including_tax == true) {
      tax = 1
    } else {
      tax = 0
    };
    let journal_date;
    let journal_repeat_date
    let date = this.state.journal_date
    let date1 = this.state.end_date
    if (date !== undefined && date !== "") {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      journal_date = date_formated
    }
    if (date1 !== undefined && date1 !== "") {
      var array = date1.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      journal_repeat_date = date_formated
    }
    let input = {
      client_id: this.state.logged_client_id,
      type: 2,
      status: status,
      journal_number: this.state.entry_no,
      journal_date: journal_date,
      repeating_end_date: journal_repeat_date,
      Repeating_period: option,
      repeating_count: this.state.repeat_journal,
      narration: this.state.narration,
      show_default_narration: 1,
      tax_inclusive: tax,
      foreign_currency: this.state.selected_currency,
      exchange_rate: this.state.exchange_rate,
      sub_total_debit_home_currency: this.state.debitSubTotalHome,
      tax_total_debit_home_currency: this.state.taxTotalDebitHome,
      grand_total_debit_home_currency: this.state.grandTotalDebitHome,
      sub_total_debit_foreign_currency: this.state.debitSubTotal,
      tax_total_debit_foreign_currency: this.state.taxTotalDebit,
      grand_total_debit_foreign_currency: this.state.grandTotalDebit,
      sub_total_credit_home_currency: this.state.creditSubTotalHome,
      tax_total_credit_home_currency: this.state.taxTotalCreditHome,
      grand_total_credit_home_currency: this.state.grandTotalCreditHome,
      sub_total_credit_foreign_currency: this.state.creditSubTotal,
      tax_total_credit_foreign_currency: this.state.taxTotalCredit,
      grand_total_credit_foreign_currency: this.state.grandTotalCredit,
      user_id: this.state.logged_user_id,
      item_list: this.state.data_table

    };
    if (val1 == "post") {
      if (this.state.narration !== "" && this.state.entry_no !== '' && journal_date !== '' && this.state.selected_currency !== '') {

        if (this.state.grandTotalCredit == this.state.grandTotalDebit) {
          this.setState({ loading: true })
          FetchAllApi.post_new_journal(input, (err, response) => {
            if (response.status === 1) {
              this.setState({ loading: false })
              if (val1 == "post") {
                if (val2 == "new") {
                  alert("New journal posted successfully")
                  window.open("/new_journal")
                } else {
                  alert("New journal posted successfully")
                  this.props.history.push("/manual_journal")
                }
              }

            } else {
              this.setState({ loading: false })
              alert(response.message)
            }
          })
        } else {
          alert("Credit & Debit Grand total amount should be Equal")
        }

      } else {

        this.setState({ errorMsg: true, tableerror: true })
        setTimeout(() => {
          this.setState({ errorMsg: false })
        }, 4000)
      }
    } else {
      this.setState({ loading: true })
      FetchAllApi.post_new_journal(input, (err, response) => {
        if (response.status === 1) {
          this.setState({ loading: false })
          if (val1 == "draft") {
            if (val2 == "new") {
              alert("Draft saved successfully")
              window.open("/new_journal")
            } else {
              alert("Draft saved successfully")
              this.props.history.push("/manual_journal")
            }
          }

        }
        else {
          this.setState({ loading: false })
          alert(response.message)
        }
      })

    }
  }

  render() {
    console.log(this.state.journal_date)
    return (
      <React.Fragment>
        {this.state.loading ? <div class="loading_spinner">Loading&#8230;</div> : ''}

        <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
        <h3>Subscribers</h3>
    </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
            <Sidebar />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>
                  <a href="/manual_journal" className="back">
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  New Repeating Journals
                </h3>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <form className="custom-form invoice-form col-md-12 pad-no">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Narration<span className="astrick">*</span></label>
                          <textarea className="form-control narration repeat" name="narration" value={this.state.narration} onChange={this.narrationChange} defaultValue={""} />
                        </div>
                        <div className="form-group">
                          <label className="custom-checkbox small">
                            <input type="checkbox" name="all" checked={this.state.check} onChange={(e) => { this.checkChange(e.target.checked) }} />Default narration to journal line description
                            <span className="checkmark" />
                          </label>
                          {/* <label className="custom-checkbox small">
                            <input type="checkbox" name="all" defaultChecked="checked" />Show journal on cash basis reports
                            <span className="checkmark" />
                          </label> */}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Journal Entry No#<span className="astrick">*</span></label>
                          <input type="text" className="form-control" defaultValue="MJ-0032" name="entry_no" value={this.state.entry_no} onChange={this.changeValue} />
                        </div>
                        <div className="form-group">
                          <label>First Journal Date<span className="astrick">*</span></label>
                          <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" >
                            <input type="text" className="form-control" name="journal_date" id="journal_date" value={this.state.journal_date} onBlur={(event) => {
                              let value = event.target.value
                              setTimeout(() => { this.changeDate(value) }, 500)
                            }} />
                            <div className="input-group-addon">
                              <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#journal_date').focus()} />
                            </div>
                          </div>
                        </div>

                        <div className="form-group repeat-tis">
                          <div className="label-select">
                            <label className="mar-rgt">Repeat this Journal Every</label>
                            <div className="w-auto">
                              <select className="selectpicker form-control hh" onChange={this.repeatOptionChange}>
                                <option value="">Choose..</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                              </select>
                            </div>
                          </div>
                          <div className="dflex mar-top">
                            <input type="text" className="form-control tiny" name="repeat_journal" value={this.state.repeat_journal} onChange={this.changeRepeateJournal} />
                            <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy"  >
                              <input type="text" className="form-control" name="repeat_journal_date" id="repeat_journal_date" value={this.state.repeat_journal_date} onBlur={(event) => {
                                let value = event.target.value
                                setTimeout(() => { this.changeJournalDate(value) }, 500)
                              }} />
                              <div className="input-group-addon">
                                <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#repeat_journal_date').focus()} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>End Date (Optional)</label>
                          <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" >
                            <input type="text" className="form-control" name="end_date" id="end_date" value={this.state.end_date} onBlur={(event) => {
                              let value = event.target.value
                              setTimeout(() => { this.endDateChange(value) }, 500)
                            }} />
                            <div className="input-group-addon">
                              <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#end_date').focus()} />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Currency<span className="astrick">*</span></label>
                          <select type="text" className="selectpicker form-control hh " data-live-search="true" defaultValue="MJ-0032" name="selected_currency" value={this.state.selected_currency} onChange={this.currencyChange} >
                            <option value="">choose...</option>
                            {this.state.currency_list.map((amm, idx) => {
                              return (
                                <option value={amm}>{amm}</option>
                              )
                            })
                            }
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mar-top">
                          <label className="custom-checkbox small">
                            <input type="checkbox" name="all" onClick={this.taxAdd} />Including Tax
                            <span className="checkmark" />
                          </label>
                          <div className="table-responsive col-md-12">
                            <table className="invoice-item-table">
                              <thead>
                                <tr>
                                  <th>Description</th>
                                  <th>Name</th>
                                  <th>Category</th>
                                  <th>Tax</th>
                                  <th className="text-right">Debit {this.state.selected_currency}</th>
                                  <th className="text-right">Credit {this.state.selected_currency}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.data_table.map((row, idx) =>

                                  <tr>
                                    <td>
                                      <span className="drag-icon">
                                        <img src="images/dots-menu.svg" alt="icon" />
                                      </span>
                                      <textarea className="form-control" placeholder="Enter Description" id={`descr${idx}`} name="descr" value={this.state.data_table[idx].descr} onChange={(e) => { this.changeMemo(idx, e.target.value) }} />
                                    </td>
                                    <td>
                                      <select
                                        className="selectpicker form-control add-new"
                                        data-live-search="true"
                                        title="Choose"
                                        value={this.state.data_table[idx].name}
                                        onChange={(e) => {
                                          if (e.target.value == "Add") {
                                            window.jQuery('#add-new-modal').modal('show')
                                            // this.props.history.push("/add-new-customer")
                                          } else {
                                            this.changeName(idx, e.target.value)
                                          }
                                        }}
                                      >
                                        <option value="Add">Add new</option>
                                        {this.state.namelist.map((data, idx) => {
                                          return (
                                            <option value={data.id}>{data.name}</option>
                                          )

                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select
                                        className="selectpicker form-control add-new"
                                        data-live-search="true"
                                        title="Choose"
                                        value={this.state.data_table[idx].category}
                                        // id={`categry_id${itemid}`}
                                        onChange={(e) => {
                                          if (e.target.value == "1e") {
                                            jQuery(
                                              `#categry_id option`
                                            )
                                              .prop("selected", false)
                                              .trigger("change");

                                            window
                                              .jQuery("#pop-modal")
                                              .modal("show");

                                          } else {
                                            this.categoryChange(idx, e.target.value)
                                          }
                                        }}
                                      >
                                        <option value="1e">
                                          Create New{" "}
                                        </option>
                                        {this.state.default_category_list &&
                                          this.state.default_category_list.map(
                                            (item) => {
                                              return (
                                                <option
                                                  value={item.id}
                                                  data-status={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          )}
                                      </select>
                                    </td>
                                    <td className="text-center ">
                                      <select
                                        className="selectpicker form-control add-new"
                                        data-live-search="true"
                                        title="Choose"
                                        value={this.state.data_table[idx].selectedTax}
                                        // id={`categry_id${itemid}`}
                                        onChange={(e) => {
                                          if (e.target.value == "1e") {
                                            jQuery(
                                              `#categry_id option`
                                            )
                                              .prop("selected", false)
                                              .trigger("change");

                                            window
                                              .jQuery("#pop-modal-1")
                                              .modal("show");

                                          } else {
                                            this.taxClick(idx, e.target.value)
                                          }
                                        }}
                                      >
                                        <option value="1e">
                                          Add New{" "}
                                        </option>
                                        {this.state.gst_list.map(
                                          (item) => {
                                            return (
                                              <option
                                                value={item.id}
                                                data-status={item.id}
                                              >
                                                {item.sales_tax_name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </select>
                                    </td>
                                    <td className="text-right">
                                      <input type="text" name="total" className="form-control" name="debit" value={this.state.data_table[idx].foreign_debit} onChange={(e) => { this.changeDebit(idx, e.target.value) }} />
                                    </td>
                                    <td className="text-right">
                                      <input type="text" name="total" className="form-control" name="credit" value={this.state.data_table[idx].foreign_credit} onChange={(e) => { this.changeCredit(idx, e.target.value) }} />
                                      <div className="action-wrap">
                                        <a href="javascript:;" className="clone-row">
                                          <img src="images/clone-icon.svg" alt="icon" onClick={() => this.copyRow(idx)} />
                                        </a>
                                        <a href="javascript:;" className="del-row" onClick={() => this.deleteRow(idx)}>
                                          <img src="images/delete-icon.svg" alt="icon" />
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                            <div className="form-group col-md-12 mar-b-no">
                              <a href="javascript:;" className="add-input" onClick={this.addRow}>ADD ROW</a>
                            </div>
                          </div>
                        </div>
                        <div className="form-group mar-top col-md-12 col-xs-12 total-table">
                          <table className="pull-right">
                            <thead>
                              <tr>
                                <th>&nbsp;</th>
                                <th className="text-center">
                                  Foreign Currency Debit
                                    <br />
                                  {/* ({this.state.currency_customer}) */}(
                                    {this.state.selected_currency})
                                  </th>

                                <th className="text-center">
                                  Foreign Currency Credit
                                    <br />
                                  {/* ({this.state.currency_customer}) */}(
                                    {this.state.selected_currency})
                                  </th>
                                <th className="text-center">
                                  Home Currency Debit
                                    <br />({this.state.clientHomeCurrency})
                                  </th>
                                <th className="text-center">
                                  Home Currency Credit
                                    <br />({this.state.clientHomeCurrency})
                                  </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-right">Sub Total</td>
                                <td className="text-center"><Comma value={this.state.debitSubTotal} /></td>
                                <td className="text-center"><Comma value={this.state.creditSubTotal} /></td>
                                <td className="text-center"><Comma value={this.state.debitSubTotalHome} /></td>
                                <td className="text-center"><Comma value={this.state.creditSubTotalHome} /></td>
                              </tr>
                              <tr>
                                <td className="text-right">Tax</td>
                                <td className="text-center"><Comma value={this.state.taxTotalDebit} /></td>
                                <td className="text-center"><Comma value={this.state.taxTotalCredit} /></td>
                                <td className="text-center"><Comma value={this.state.taxTotalDebitHome} /></td>
                                <td className="text-center"><Comma value={this.state.taxTotalCreditHome} /></td>
                              </tr>

                              <tr>
                                <td className="text-right">Grand Total</td>
                                <td className="text-center"><Comma value={this.state.grandTotalDebit} /></td>
                                <td className="text-center"><Comma value={this.state.grandTotalCredit} /></td>
                                <td className="text-center"><Comma value={this.state.grandTotalDebitHome} /></td>
                                <td className="text-center"><Comma value={this.state.grandTotalCreditHome} /></td>
                              </tr>
                              {/* <tr>
                                <td className="text-right">Sub Total</td>
                                <td className="text-center">{parseFloat(this.state.debitSubTotal).toFixed(2)}</td>
                                <td className="text-center" >{parseFloat(this.state.creditSubTotal).toFixed(2)}</td>
                                <td className="text-center">{parseFloat(this.state.debitSubTotalHome).toFixed(2)}</td>
                                <td className="text-center">{parseFloat(this.state.creditSubTotalHome).toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td className="text-right">Tax</td>
                                <td className="text-center">{parseFloat(this.state.taxTotalDebit).toFixed(2)}</td>
                                <td className="text-center">{parseFloat(this.state.taxTotalCredit).toFixed(2)}</td>
                                <td className="text-center">{parseFloat(this.state.taxTotalDebitHome).toFixed(2)}</td>
                                <td className="text-center">{parseFloat(this.state.taxTotalCreditHome).toFixed(2)}</td>
                              </tr>

                              <tr>
                                <td className="text-right">Grand Total</td>
                                <td className="text-center">{parseFloat(this.state.grandTotalDebit).toFixed(2)}</td>
                                <td className="text-center">{parseFloat(this.state.grandTotalCredit).toFixed(2)}</td>
                                <td className="text-center">{parseFloat(this.state.grandTotalDebitHome).toFixed(2)}</td>
                                <td className="text-center">{parseFloat(this.state.grandTotalCreditHome).toFixed(2)}</td>
                              </tr> */}
                            </tbody>
                          </table>
                        </div>
                        <div className="col-md-12 total-row" id="uss">
                          <div className="row">
                            <div className="form-group exchange-col col-md-5 col-xs-12">
                              <label className="fw-sbold">
                                Exchange Rate 1 {this.state.selected_currency}
                              </label>
                              <div>
                                <input
                                  type="text"
                                  name="exchange_rate"
                                  className="form-control"
                                  id="Exchange"
                                  required
                                  value={this.state.exchange_rate}
                                  autoComplete="off"
                                  onChange={this.changeValue}


                                />{" "}

                                <span className="label">
                                  {this.state.clientHomeCurrency}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          <div className="pf-btm-wrap bg-sticky">
            <div className="col-md-12 text-right pad-no">
              <button className="btn btn-lightgray mar-rgt-5" type='button' onClick={()=>this.props.history.push('/manual_journal')}>Close</button>
              <div className="btn-group mar-rgt-5">
                <button type="button" className="btn btn-yellow" onClick={() => { this.saveClick("draft", "no") }}>Save as Draft</button>
                <button type="button" className="btn btn-yellow dropdown-toggle" data-toggle="dropdown">
                  <span className="caret" />
                </button>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="javascript:;" onClick={() => { this.saveClick("draft", "no") }}>Save as Draft</a></li>
                  <li><a href="javascript:;" onClick={() => { this.saveClick("draft", "new") }}>Save &amp; Add New</a></li>
                </ul>
              </div>
              <div className="btn-group mar-rgt-5">
                <button type="button" className="btn btn-green" onClick={() => { this.saveClick("post", "no") }}>Post</button>
                <button type="button" className="btn btn-green dropdown-toggle" data-toggle="dropdown">
                  <span className="caret" />
                </button>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="javascript:;" onClick={() => { this.saveClick("post", "no") }}>Post</a></li>
                  <li><a href="javascript:;" onClick={() => { this.saveClick("post", "new") }}>Post &amp; Add New</a></li>
                </ul>
              </div>
            </div>
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

        </div>
        {/* pf-btm-wrap Ends here */}







        {/* add new modal */}


        <div className="modal fade pop-modal" id="add-new-modal" role="dialog">
          <div className="modal-dialog modal-xs custom-modal">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs" data-dismiss="modal">
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Please select one</h3>
                <form className="custom-form row column">
                  <div className="form-group col-md-12 col-xs-12">
                    <div className="check-row">
                      <label className="custom-checkbox radio">
                        <input type="radio" name="mail-address" onClick={() => { this.setState({ radio: "Customer" }) }} />
                        <span>Customer</span>
                        <span className="checkmark" />
                      </label>
                      <label className="custom-checkbox radio">
                        <input type="radio" name="mail-address" onClick={() => { this.setState({ radio: "Vendor" }) }} />
                        <span>Vendor</span>
                        <span className="checkmark" />
                      </label>
                      {/* <label className="custom-checkbox radio">
                        <input type="radio" name="mail-address" onClick={() => { this.setState({ radio: "Employee" }) }} />
                        <span>Employee</span>
                        <span className="checkmark" />
                      </label> */}
                      <label className="custom-checkbox radio">
                        <input type="radio" name="mail-address" onClick={() => { this.setState({ radio: "Others" }) }} />
                        <span>Others</span>
                        <span className="checkmark" />
                      </label>
                    </div>

                  </div>
                  <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                    <button className="btn btn-lightgray mar-rgt-5" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-green mar-rgt-5" data-dismiss="modal" onClick={(e) => {
                      if (this.state.radio == "Customer") {
                        window.open('/add-new-customer')
                      } else if (this.state.radio == "Vendor") {
                        window.open('/add_new_vendor')
                      }
                      // else if (this.state.radio == "Employee") {
                      //   window.open('/add-new-employee')
                      // }
                      else {

                      }
                    }} >OK</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>



        {/* add new modal */}



        <div
          className="modal fade pop-modal"
          id="pop-modal-1"
          role="dialog"
        >
          <div className="modal-dialog modal-md custom-modal">
            <button
              type="button"
              className="close hidden-xs"
              data-dismiss="modal"
              onClick={this.cancel_gst_modal}
            >
              <img
                className="img-responsive"
                src="../../images/close-red.svg"
                alt="icon"
              />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Add New GST</h3>
                <form className="custom-form row">
                  <div className="form-group col-md-12 col-xs-12 pad-no">
                    <div className="col-md-4 col-sm-4 col-xs-12">
                      <label>
                        Sales Tax Code
                                      <span className="astrick">*</span>
                      </label>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-12">
                      <input

                        type="text"
                        name="taxCode"
                        id="sales_tax_code"
                        autoComplete="off"
                        maxLength="4"
                        className="form-control"
                        onChange={(event) =>
                          this.handleChangeTax(event)
                        }
                        required
                      />

                      <p className="input-info">
                        (Maximum 4 characters)
                                    </p>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 pad-no">
                    <div className="col-md-4 col-sm-4 col-md-12">
                      <label>
                        Sales Tax Name
                                      <span className="astrick">*</span>
                      </label>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-12">
                      <input

                        type="text"
                        name="taxName"
                        autoComplete="off"
                        id="sales_tax_name"
                        className="form-control"
                        onChange={(event) =>
                          this.handleChangeTax(event)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                    <div className="col-md-4 col-sm-4 col-xs-12">
                      <label>Tax Type</label>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-12">
                      <label className="custom-checkbox radio mar-rgt taxable">
                        <input

                          type="radio"
                          name="tax-item"
                          value="option1"
                          checked={
                            this.state.selectedOption ===
                            "option1"
                          }
                          onChange={this.handleOptionChange}
                        />
                                      Taxable
                                      <span className="checkmark"></span>
                      </label>
                      <label className="custom-checkbox radio non-taxable">
                        <input
                          type="radio"
                          name="tax-item"
                          value="option2"
                          checked={
                            this.state.selectedOption ===
                            "option2"
                          }
                          onChange={this.handleOptionChange}
                        />{" "}
                                      Non-Taxable/Exempt
                                      <span className="checkmark"></span>
                      </label>
                      {this.state.selectedOption === "option1" ? (
                        <div className="hidden-field col-md-12 col-xs-12">
                          <div className="form-group">
                            <label className="mar-t-no mar-btm">
                              Tax item for purchases & sales
                                          </label>
                            <div className="col-md-12">
                              <div className="row">
                                <label
                                  className="mar-rgt"
                                  style={{ marginTop: 8 }}
                                >
                                  Rate
                                              </label>
                                { }
                                <div className="input-group rate-input">
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="taxRate"
                                    id="tax"
                                    autoComplete="off"
                                    required
                                    onInput={(event) =>
                                      this.handleChange_gst_type(
                                        event
                                      )
                                    }
                                  />
                                  <div className="input-group-btn">
                                    <div className="custom-select-drop dropdown">
                                      <a
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        role="button"
                                        data-toggle="dropdown"
                                        className="dropdown-toggle btn"
                                        href="javascript:;"
                                      >
                                        <span id="selected">
                                          {
                                            this.state
                                              .selected_rate_type
                                          }
                                        </span>
                                        <span className="caret"></span>
                                      </a>
                                      <ul className="dropdown-menu">
                                        <li className="active">
                                          <a
                                            href="javascript:;"
                                            onClick={
                                              this
                                                .update_rate_type
                                            }
                                          >
                                            %
                                                        </a>
                                        </li>
                                        <li>
                                          <a
                                            href="javascript:;"
                                            onClick={
                                              this
                                                .update_rate_fixed
                                            }
                                          >
                                            Fixed price
                                                        </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {/* <div className='mymsg'>{this.state.modal_info_msg}</div> */}
                  <small
                    style={{ color: "red" }}
                    className="mymsg"
                  >
                    {this.state.modal_info_msg}{" "}
                  </small>

                  <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                    {this.state.show_succes ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> Your new GST is
                                      added.
                      </div>
                    ) : (
                      ""
                    )}
                    <button
                      className="btn btn-lightgray"
                      data-dismiss="modal"
                      onClick={this.modal_cancel}
                    >
                      Cancel
                                  </button>
                    <span>{"   "}</span>
                    <button
                      className="btn btn-green"
                      type="submit"
                      onClick={this.add_gst_details}
                    >
                      Save
                                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>



        <Category
          defaultcategorylist_onchange={this.defaultcategorylist_onchange}
        />
        {/* Main Wrapper Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}
      </React.Fragment>

    )
  }
}