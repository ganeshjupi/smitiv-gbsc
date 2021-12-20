import React from "react";
import LeftSidebar from "./../left_sidebar";
import Footer from "./../footer";
import Topbar from "./../topbar";
import jQuery from "jquery";
import FetchAllApi from "../../api_links/fetch_all_api";
import moment from "moment";
import "datatables.net-dt/css/jquery.dataTables.css";
import config from "./../../api_links/api_links.jsx";
import { split } from "lodash";
var _ = require("lodash");
var authorization_key = "O5mGIP3VNia0JvPH2IBiwA==";
const $ = require("jquery");
$.DataTable = require("datatables.net");

class BankReconcileMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      BankstatementsList: [],
      CashcodingList: [],
      TransactionsList: [],
      BankAccList: [],
      selectedBankId: 0,
      totalBankAmount: 0,
      TotalTransactionAmount: 0,
      ReconcileBankStatmentList: [],
      ReConcileList: [],
      recocileCount: 0,
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      banks: [],
      transaction_list: [],
      selectedItemFind: [],
      DebOrCr: "",
      usrSearchedAmt: 0,
      usrSearchedName: "",
      usrSearchedRef: "",
      findMatchingItems: [],
      selectedfindMatchingItemss: [],
      selectedFindTotalAmount: 0,
      findTotalAmount: 0,
      search_amt: "",
      search_name: "",
      search_ref: "",
      bankList: [],
      creditrulelist:[],
      debitrulelist:[],
      selectedRule:'',
      account_list: [],
      customer_list: [],
      default_category_list: [],

      selectedBox: [],
      default_category_list: [],
      gst_list: [],

      amt_to_adjust: 0,
      adjustment: 0,
      showMatched: false,
      split: "",
      sampleArray: [
        {
          split_memo: "",
          split_account: "",
          split_tax: "",
          split_amount: "",
        },
      ],
      search_key: "",
      exact_amount: false,
      maximum: 0,
      minimum: 0,
      exact_date: false,
      from_date: "",
      to_date: "",
      status: "",
      excact: "",
      exact_dat: "",
      selectedRow: [],
      accountList: [],
      ReconcileAll: [],
    };
  }

  deleteBankStaments = () => {
    var deleteBankStaments = [];

    this.state.selectedRow.map((item, j) => {
      deleteBankStaments.push(this.state.bankList[item].id);
    });
    console.log("deleteBankStaments", deleteBankStaments);
    FetchAllApi.post_delete_bank_statements(
      deleteBankStaments,
      (err, response) => {
        if (response.status === 1) {
          alert(" Deleted-Success ");
          this.setState({ selectedRow: [] }, this.get_all_bank_statements());

          // this.setState({
          //   gst_list: response.list,
          // });
        } else {
          alert(response.message);
          // this.setState({
          //   gst_list: [],
          // });
        }
      }
    );
  };

  changeDate1 = () => {
    let date = jQuery("#from_date").val();
    if (date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ from_date: date_formated });
      setTimeout(() => {
        this.get_all_bank_statements();
      }, 1000);
      // alert(date_formated);
    }
  };

  changeDate2 = () => {
    let date = jQuery("#to_date").val();
    if (date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ to_date: date_formated });
      setTimeout(() => {
        this.get_all_bank_statements();
      }, 1000);
      // alert(date_formated);
    }
  };
  getbankrulelist= (id) => {
    FetchAllApi.get_bankrule_list(this.state.logged_client_id,id,1, (err, response) => {
      if (response.status === 1) {
        this.setState({
          debitrulelist: response.list,
        });
      } else {
        this.setState({
          debitrulelist: [],
        });
      }
    });
    FetchAllApi.get_bankrule_list(this.state.logged_client_id,id,2, (err, response) => {
      if (response.status === 1) {
        this.setState({
          creditrulelist: response.list,
        });
      } else {
        this.setState({
          creditrulelist: [],
        });
      }
    });
  }
  changeDate3 = () => {
    let date = jQuery("#exact_date").val();
    if (date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ exact_dat: date_formated });
      setTimeout(() => {
        this.get_all_bank_statements();
      }, 1000);
      // alert(date_formated);
    }
  };

  get_all_bank_statements = () => {
    this.setState({
      bankList: [],
    });
    let coreData = {
      client_id: this.state.logged_client_id,
      selectedbank: this.state.selectedBankId,
      search_text: this.state.search_key,
      is_exact_amt: this.state.exact_amount ? 1 : 0,
      exact_amount: this.state.excact,
      maximum_amount: this.state.maximum,
      minimum_amount: this.state.minimum,
      is_exact_date: this.state.exact_date ? 1 : 0,
      exact_date: this.state.exact_dat,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      status: this.state.status,
    };

    FetchAllApi.get_all_bank_statements(coreData, (err, response) => {
      if (response.status === 1) {
        this.setState({
          bankList: response.rows,
        });
      } else {
        this.setState({
          bankList: [],
        });
      }
    });
  };

  get_all_account_statements = () => {
    this.setState({
      accountList: [],
    });
    let coreData = {
      client_id: this.state.logged_client_id,
      selectedbank: this.state.selectedBankId,
      search_text: this.state.search_key,
      is_exact_amt: this.state.exact_amount ? 1 : 0,
      exact_amount: this.state.excact,
      maximum_amount: this.state.maximum,
      minimum_amount: this.state.minimum,
      is_exact_date: this.state.exact_date ? 1 : 0,
      exact_date: this.state.exact_dat,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      status: this.state.status,
    };

    FetchAllApi.get_all_account_statements(coreData, (err, response) => {
      if (response.status === 1) {
        this.setState({
          accountList: response.rows,
        });
      } else {
        this.setState({
          accountList: [],
        });
      }
    });
  };

  total = () => {
    let total = 0;
    this.state[`split_array${this.state.split}`] &&
      this.state[`split_array${this.state.split}`].map((a, b) => {
        total = total + Number(a.split_amount);
      });
    console.log("hdya", total);
    return total.toFixed(2);
  };

  is_disabled = () => {
    // console.log(
    //   "ferfer",
    //   this.state.findTotalAmount > Number(this.state.selectedFindTotalAmount)
    // );
    if (
      this.state.findTotalAmount > Number(this.state.selectedFindTotalAmount)
    ) {
      console.log(
        "ferfer1",
        Number(this.state.selectedFindTotalAmount) +
        Number(this.state.adjustment)
      );
      if (
        this.state.findTotalAmount ===
        Number(this.state.selectedFindTotalAmount) +
        Number(this.state.adjustment)
      ) {
        console.log(
          "ferfer2",
          Number(this.state.selectedFindTotalAmount) +
          Number(this.state.adjustment)
        );

        return false;
      } else {
        return true;
      }
    } else {
      if (
        this.state.findTotalAmount ===
        Number(this.state.selectedFindTotalAmount) -
        Number(this.state.adjustment)
      ) {
        // console.log(
        //   "ferfer3",
        //   Number(this.state.selectedFindTotalAmount) +
        //   Number(this.state.adjustment)
        // );

        return false;
      } else {
        return true;
      }
    }
  };

  reconcile = async() => {
    // this.state.selectedBox.map((itm, j) => {
    //   myarray[itm][name] = value;
    // });
    var reconcileArray = [];

    this.state.selectedBox.map((i, j) => {
      let object = {
        client_id: this.state.logged_client_id,
        total_amount:
          this.state.ReConcileList[i].debit +
          this.state.ReConcileList[i].credit,
        tax_percentage: this.state[`rate${i}`],
        date: moment(this.state.ReConcileList[i].date).format("YYYY/MM/DD"),
        name: this.state.ReConcileList[i].payee,
        currency: this.state.ReConcileList[i].selectedBankCurrency,
        customer_id: this.state.ReConcileList[i].customerid,
        vendor_id: this.state.ReConcileList[i].vendorid,
        account: this.state.ReConcileList[i].category_id,
        debit: this.state.ReConcileList[i].debit,
        credit: this.state.ReConcileList[i].credit,
        sales_tax_code: this.state[`sales_tax_code${i}`],
        sales_tax_name: this.state[`sales_tax_name${i}`],
        rate_type: this.state[`rate_type${i}`],
        bank_row_id: this.state.ReConcileList[i].id,
      };

      reconcileArray.push(object);

      console.log("reconcileArray", reconcileArray);
    });

    FetchAllApi.postCashCodingItems(reconcileArray, this.state.selectedBankId, (err, response) => {
      if (response.status === 1) {
        alert("success - reconciled");
        //this.setState(
         // { selectedBox: [] },

        //);

        // this.setState({
        //   gst_list: response.list,
        // });
      } else {
        alert(response.message);
        // this.setState({
        //   gst_list: [],
        // });
      }
    });
    await this.getReconcileItems(this.state.selectedBankId)
    console.log(this.state.ReConcileList);
  };

  get_gst_list = () => {
    let country_code = 196;
    let keyword = "";
    FetchAllApi.get_gst_list(country_code, keyword, this.state.logged_client_id, (err, response) => {
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

  deafultCategoryList(e) {
    let a = 1;
    var client_id = this.state.logged_client_id;

    FetchAllApi.defaultcategorylist2(a, client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({
          default_category_list: response.list,
        });
      } else {
      }
    });
  }

  dataTable = () => {
    this.$el = $(this.el);
    var table = this.$el.DataTable({
      paging: true,
    });

    $("#example4_filter").keyup(function (e) {
      $("#example4").dataTable().fnFilter(this.value);
    });
  };

  handleOnChange = (idx) => (e) => {
    const { name, value } = e.target;
    var myarray = this.state.ReConcileList;

    this.state.selectedBox.map((itm, j) => {
      myarray[itm][name] = value;
    });

    if (this.state.selectedBox.length == 0) {
      myarray[idx][name] = value;
    }

    this.setState(
      {
        ReConcileList: myarray,
      },
      console.log("this", this.state.ReConcileList)
    );
  };

  handleSplit = (idx) => (e) => {
    console.log("tkjdhis01", this.state.split);

    const { name, value } = e.target;
    var myarray = this.state[`split_array${this.state.split}`];

    myarray[idx][name] = value;

    this.setState({ [`split_array${this.state.split}`]: myarray });
    console.log("tkjdhis0", this.state[`split_array0`]);
    console.log("tkjdhis1", this.state[`split_array1`]);
    console.log("tkjdhis2", this.state[`split_array2`]);
    console.log("tkjdhis3", this.state[`split_array3`]);
    console.log("tkjdhis4", this.state[`split_array4`]);
  };

  deleteSplit = (row) => {
    let array = this.state[`split_array${this.state.split}`];
    if (array.length > 1) {
      array.splice(row, 1);
      this.setState({ [`split_array${this.state.split}`]: array });
    }
  };

  componentDidMount = () => {
    this.get_gst_list();
    this.deafultCategoryList();
    this.get_all_account_statements();
    window.jQuery(".selectpicker").selectpicker("refresh");

    // jQuery('.dark-overlay, .find-match-sec').addClass('active')
    // jQuery('body').css('overflow-y', 'hidden')

    // window
    //                                             .jQuery("#add_transaction")
    //                                             .modal("show");
    fetch(config.getAllbanks, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
      body: JSON.stringify({
        client_id: this.state.logged_client_id,

      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          this.setState({ banks: data.data });
        }
      });
  };



  getReconcileItems = async(id) => {
    this.setState({
      ReConcileList: [],
      transaction_list: [],
      bankList: [],
      account_list: [],
    });
    await fetch(config.get_reconcile_items, {
      method: "POST",
      body: JSON.stringify({
        client_id: this.state.logged_client_id,
        selectedbank: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then(async (response) => await response.json())
      .then(async (data) => {
        console.log("data", data);
        if (data.status == 1) {
          // let arr = data.bank_statements_list;

        await this.setState(
            {
              ReConcileList: data.bank_statements_list,
              transaction_list: data.transaction_list,
              totalBankAmount: data.bank_statements_list_amount,
              TotalTransactionAmount: data.transaction_list_amount,
              recocileCount: data.reconcileCount,
              account_list: data.transaction_list,
            },()=>{this.get_all_bank_statements();this.get_all_account_statements();}
            // ,this.dataTable
          );
          // let test = arr.find(el => el.debit === 100);
          // console.log("data1", test);

          data.bank_statements_list.map((itm, i) =>
            this.setState(
              { [`split_array${i}`]: this.state.sampleArray },
              console.log("jfsdhfs", this.state[`split_array${i}`])
            )
          );
        }
      });
  };

  getBankstatements = () => {
    let CoreData = {
      page: 1,
      limit: 10,
      client_id: "14",
      bank_id: this.state.selectedBankId,
      search: "",
    };

    FetchAllApi.getBankstatements(CoreData, (err, response) => {
      if (response.status === 1) {
        this.setState({ BankstatementsList: response.response });
      } else {
      }
    });
  };

  reConcileGetbankstatement = () => {
    let CoreData = {
      client_id: this.state.logged_client_id,
      bank_id: this.state.selectedBankId,
    };
    FetchAllApi.reConcileGetbankstatement(CoreData, (err, response) => {
      if (response.status === 1) {
        const recocileCount = response.paymentData.filter(
          (item) => item.matchlist.length > 0
        );
        this.setState({
          ReConcileList: response.paymentData,

          recocileCount: recocileCount,
        });
      } else {
      }
    });
  };
  getTransactions = () => {
    let CoreData = {
      page: 1,
      limit: 10,
      client_id: "1",
      bank_id: this.state.selectedBankId,
      search: {
        date: {
          from: "",
          to: "",
        },
        amount: {
          from: "",
          to: "",
        },
        status: "",
      },
    };

    FetchAllApi.getTransactions(CoreData, (err, response) => {
      if (response.status === 1) {
        this.setState({ TransactionsList: response.paymentData });
      } else {
      }
    });
  };

  getcashcoding = () => {
    let CoreData = {
      client_id: 14,
      bank_id: this.state.selectedBankId,
    };
    FetchAllApi.getcashcoding(CoreData, (err, response) => {
      if (response.status === 1) {
        this.setState({ CashcodingList: response.paymentData });
      } else {
      }
    });
  };
  get_bankaccountlist = () => {
    FetchAllApi.get_bankaccountlist((err, response) => {
      if (response.status === 1) {
        this.setState({ BankAccList: response.customerData }, () => {
          // alert('i am here');
          window.jQuery(".selectpicker").selectpicker("refresh");
        });
      } else {
      }
    });
  };
  fireAll = (x) => {
    this.getBankstatements();
    this.getTransactions();
    this.getcashcoding();
    this.get_bankaccountlist();
    this.reConcileGetbankstatement();
  };

  componentDidUpdate() {
    window.jQuery('.selectpicker').selectpicker('refresh')
  }

  routedChange(page_slug) {
    this.props.pageSubmit(page_slug);
    // window.location.href= '/'+page_slug
  }

  componentDidMount() {
    this.fireAll();

    // jQuery(window).on('load', function () {
    //   jQuery('.mscroll-y').mCustomScrollbar({
    //     axis: 'y',
    //     scrollEasing: 'linear',
    //     scrollInertia: 600,
    //     autoHideScrollbar: 'true',
    //     autoExpandScrollbar: 'true'
    //   })
    //   jQuery('.mscroll-x').mCustomScrollbar({
    //     axis: 'x',
    //     scrollEasing: 'linear',
    //     scrollInertia: 600,
    //     autoHideScrollbar: 'true',
    //     autoExpandScrollbar: 'true'
    //   })

    //   jQuery('.ib-scroll').mCustomScrollbar({
    //     scrollEasing: 'linear',
    //     scrollInertia: 600,
    //     scrollbarPosition: 'outside'
    //   })
    // })

    jQuery(".left-navmenu .has-sub").click(function () {
      jQuery(".left-navmenu li a").removeClass("active");
      jQuery(this).addClass("active");
      jQuery(".left-navmenu li a:not(.active)").siblings(".sub-menu").slideUp();
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
    // jQuery(".custom-select-drop .dropdown-menu a").click(function () {
    //   jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass(
    //     "active"
    //   );
    //   jQuery(this).parent("li").addClass("active");
    //   jQuery(".open #selected").text(jQuery(this).text());
    // });

    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

    jQuery('[data-toggle="tooltip"]').tooltip();

    jQuery(".collapse.in").each(function () {
      jQuery(this)
        .siblings(".panel-heading")
        .find(".accordion-arrow")
        .addClass("rotate");
    });

    // Toggle plus minus icon on show hide of collapse element
    jQuery(".collapse")
      .on("show.bs.collapse", function () {
        jQuery(this).parent().find(".accordion-arrow").addClass("rotate");
      })
      .on("hide.bs.collapse", function () {
        jQuery(this).parent().find(".accordion-arrow").removeClass("rotate");
      });

    jQuery(".create-trans").click(function () {
      jQuery(this).parents(".transact-item").addClass("blue");
    });
    jQuery(".match-trans").click(function () {
      jQuery(this).parents(".transact-item").removeClass("blue");
    });

    jQuery(".adjustment").click(function () {
      jQuery(".adjust-form").slideToggle(200);
    });

    jQuery(".adjust-form .remove-item").click(function () {
      jQuery(".adjust-form").slideUp(200);
    });

    jQuery(".find-match").click(function () {
      jQuery(".dark-overlay, .find-match-sec").addClass("active");
      jQuery("body").css("overflow-y", "hidden");
    });

    jQuery(".find-match-sec .close-btn, .dark-overlay").click(function () {
      jQuery(".dark-overlay, .find-match-sec").removeClass("active");
      jQuery("body").css("overflow-y", "auto");
    });

    jQuery(".reconcile-table")
      .on("change keyup keydown paste cut", "textarea", function () {
        jQuery(this).height(0).height(this.scrollHeight);
      })
      .find("textarea")
      .change();

    jQuery(".filter-btn").click(function () {
      jQuery(this).css("visibility", "hidden");
      jQuery(".report-filter").slideDown();
    });

    jQuery(".report-filter .close-btn").click(function () {
      jQuery(".filter-btn").css("visibility", "visible");
      jQuery(".report-filter").slideUp();
    });

    jQuery(document)
      .on("shown.bs.dropdown", ".dropdown", function () {
        // calculate the required sizes, spaces
        var jQueryul = jQuery(this).children(".dropdown-menu");
        var jQuerybutton = jQuery(this).children(".dropdown-toggle");
        var ulOffset = jQueryul.offset();
        // how much space would be left on the top if the dropdown opened that direction
        var spaceUp =
          ulOffset.top -
          jQuerybutton.height() -
          jQueryul.height() -
          jQuery(window).scrollTop();
        // how much space is left at the bottom
        var spaceDown =
          jQuery(window).scrollTop() +
          jQuery(window).height() -
          (ulOffset.top + jQueryul.height());
        // switch to dropup only if there is no space at the bottom AND there is space at the top, or there isn't either but it would be still better fit
        if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown))
          jQuery(this).addClass("dropup");
      })
      .on("hidden.bs.dropdown", ".dropdown", function () {
        // always reset after close
        jQuery(this).removeClass("dropup");
      });
  }
  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  handleBankAccountChange = (id) => {

    this.state.banks && this.state.banks.map((item, i) => {

      if (item.id == id) {


        this.setState({
          selectedBank: item.name,
          selectedBankId: item.id,
          selectedBankCurrency: item.currency,
        })
        setTimeout(() => {
          this.get_all_bank_statements();
          this.get_all_account_statements();
        }, 1000);
        this.getReconcileItems(id);
        this.getbankrulelist(id)
      }

    })
  };

  handleReconciletem = (reconcileAllArray) => {
    // alert("hi");
    fetch(config.post_reconcile_items, {
      method: "POST",
      body: JSON.stringify({
        client_id: this.state.logged_client_id,
        reconcileArr: reconcileAllArray,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.status == 1) {
          this.getReconcileItems(this.state.selectedBankId);
          // let arr = data.bank_statements_list;
          // this.setState({ ReConcileList : data.bank_statements_list, transaction_list :data.transaction_list, totalBankAmount:data.bank_statements_list_amount, TotalTransactionAmount : data.transaction_list_amount,recocileCount : data.bank_statements_list.length })
          // let test = arr.find(el => el.debit === 100);
          // console.log("data1", test);
        }
      });
  };

  handleFetchFindItem = (rlist) => {
    let amount = rlist.credit > 0 ? rlist.credit : rlist.debit;

    this.setState({
      selectedItemFind: rlist,
      findTotalAmount: amount,
      selectedfindMatchingItemss: [],
    });
    if (rlist.credit > 0) {
      this.setState({ DebOrCr: 1 });
    } else {
      this.setState({ DebOrCr: 0 });
    }

    this.handleMatchingItem();
    jQuery(".dark-overlay, .find-match-sec").addClass("active");
    jQuery("body").css("overflow-y", "hidden");
  };

  handleClearMatchingItem = () => {
    this.setState(
      { search_ref: "", search_name: "", search_amt: "" },
      this.handleMatchingItem()
    );
  };

  handleMatchingItem = () => {
    this.setState({ findMatchingItems: [] });

    fetch(config.get_matching_trans, {
      method: "POST",
      body: JSON.stringify({
        client_id: this.state.logged_client_id,
        selectedbank: this.state.selectedBankId,
        name: this.state.search_name,
        ref: this.state.search_ref,
        amount: this.state.search_amt,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.status == 1) {
          // let arr = data.bank_statements_list;
          this.setState({ findMatchingItems: data.rows });
          // let test = arr.find(el => el.debit === 100);
          // console.log("data1", test);
        }
      });
  };

  get_customerlist = () => {
    let client_id = this.state.logged_client_id;
    var from_customer_receive_payment = 0;
    FetchAllApi.customer_and_job_list(
      client_id,
      from_customer_receive_payment,
      (err, response) => {
        if (response.status === 1) {
          this.setState({ customer_list: response.list });
        } else {
          this.setState({});
        }
      }
    );

    let keyy = "";
    let from_create_invoice = 1;

    FetchAllApi.defaultcategorylist_onchange2(
      keyy,
      from_create_invoice,
      client_id,
      (err, response) => {
        console.log("defaultcat9999egorylist", response);
        if (response.status === 1) {
          this.setState({
            default_category_list: response.list,
          });
        } else {
          this.setState({
            default_category_list: [],
          });
        }
      }
    );
  };

  findReconcileSubmit = () => {
    console.log(this.state.selectedItemFind);
    console.log(this.state.selectedfindMatchingItemss);

    // for remove nulls in array
    var a = this.state.selectedfindMatchingItemss;
    var b = [];
    a &&
      a.map((item) => {
        if (item !== null) {
          b.push(item);
        }
      });
    //removed nulls

    console.log("hhhh", b);
    fetch(config.Find_reconcile_items, {
      method: "POST",
      body: JSON.stringify({
        client_id: this.state.logged_client_id,
        selectedbank: this.state.selectedBankId,
        bank_statement_id: this.state.selectedItemFind.id,
        reconcile_list: b,
        adjust_amount: this.state.adjustment,
        description: this.state.description,
        adjust_acc: this.state.adjustment_account,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("datass", data);
        if (data.status == 1) {
          // let arr = data.bank_statements_list;
          // this.setState({ findMatchingItems : data.rows})
          // let test = arr.find(el => el.debit === 100);
          // console.log("data1", test);
          this.getReconcileItems(this.state.selectedBankId);
          jQuery(".dark-overlay, .find-match-sec").removeClass("active");
          jQuery("body").css("overflow-y", "auto");
        }
      });
  };

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  render() {
    console.log(this.state.ReConcileList)
    let ReconcileAll = [];
    let total = 0;

    // console.log('qqwwqwe',Number(this.state.selectedFindTotalAmount) + Number(this.state.adjustment) )
    const BankStatementList = this.state.BankstatementsList;
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    } else {
      return (
        <div>
          <div className="container-fluid">
            <div className="row">
              {/* left-navbar Starts here */}
              <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />
              <div className="menu-close visible-xs">&nbsp;</div>
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
                    <a href="javascript:;" className="close-icon"  >
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
                  <a href="javascript:;" className="back hidden-xs" onClick={() => this.props.history.goBack()} >
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  <ul className="list-unstyled breadcrumb page-title hidden-xs">
                    <li>
                      <a href="javascript:;">Reconciliation Items</a>
                    </li>
                  </ul>
                  <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
                </div>
                {/* Top bar Ends here */}
                <div className="col-md-12 col-xs-12 mar-top visible-xs">
                  <a href="javascript:;" className="back" onClick={() => this.props.history.goBack()}>
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  <span className="page-title">Reconciliation Items</span>
                </div>
                {/* content-top Starts here */}
                <div className="content-top col-md-12 col-xs-12 pad-b-no">
                  <div className="col-md-12 col-xs-12">
                    <div className="row">
                      <form className="custom-form row">
                        <div className="form-group col-md-4 mar-b-no">
                          <label>Bank Accounts</label>
                          <div className="form cont" >

                            <select className="selectpicker form-control hh " data-live-search="true"
                              onChange={(e) => {
                                // console.log('kjdau', e.target.value)
                                this.handleBankAccountChange(e.target.value)
                              }
                              }>
                              <option value="">Choose...</option>
                              {this.state.banks && this.state.banks.map((item, i) => {
                                return (
                                  <option value={item.id}
                                    className={
                                      item.name === this.state.selectedBank
                                        ? "active"
                                        : ""
                                    }
                                  >

                                    {item.name}

                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </form>
                      <div className="pull-right mob-xs-flft mar-top-xs">
                        {/* <button class="btn btn-blue pull-left mar-rgt-5">Reconciliation Report</button> */}
                        <div className="dropdown more">
                          <button
                            className="btn btn-blue dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                          >
                            More
                            <span className="caret" />
                          </button>
                          <ul className="dropdown-menu align-right">
                            <li>
                              <a
                                href="javascript:;"
                                onClick={() =>
                                  this.props.history.push(
                                    "/bank_import_statements"
                                  )
                                }
                              >
                                Import Bank Statement
                              </a>
                            </li>
                            <li>
                              <a
                                href="javascript:;"
                                onClick={() =>
                                  this.props.history.push(
                                    "/bank_reconcile_summary"
                                  )
                                }
                              >
                                Reconciliation Report
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-xs-12">
                    <div className="row">
                      <ul className="nav nav-tabs nowrap ofy-hidden">
                        <li role="presentation" className="active">
                          <a data-toggle="tab" href="#reconcile">
                            Reconcile{" "}
                            <span className="badge orange">
                              {this.state.recocileCount}
                            </span>
                          </a>
                        </li>
                        <li role="presentation">
                          <a data-toggle="tab" href="#cash-coding">
                            Cash Coding
                          </a>
                        </li>
                        <li role="presentation">
                          <a data-toggle="tab" href="#bank-statement">
                            Bank Statements
                          </a>
                        </li>
                        <li role="presentation">
                          <a data-toggle="tab" href="#account-transaction">
                            Account Transactions
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* content-top Starts here */}
                {/* Main Content Starts here */}
                <div className="main-content col-md-12 col-xs-12">
                  <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                    <div className="tab-content">
                      <div id="reconcile" className="tab-pane fade in active">
                        <div
                          style={{ display: "none" }}
                          className="landing-wrap upload-sec"
                        >
                          <a href="javascript:;" className="btn btn-wide">
                            <img src="images/upload-file.svg" alt="icon" />
                            Import your bank statement
                          </a>
                          <div className="img-concept no-data">
                            <img
                              className="img-responsive"
                              src="images/no-data.svg"
                              alt="img"
                            />
                            <p>Looks like there's no reconcile items</p>
                          </div>
                        </div>
                        <div className="row text-center reconcile-head">
                          <div className="col-md-6 col-xs-6">
                            <h4>
                              {this.state.totalBankAmount}
                              <span>Statement Balance</span>
                            </h4>
                            <p className="hidden-xs hidden-sm">
                              Your Bank Statement
                            </p>
                          </div>
                          <div className="col-md-6 col-xs-6">
                            <h4>
                              {this.state.TotalTransactionAmount}
                              <span>Balance in Genie</span>
                            </h4>
                            <p className="hidden-xs hidden-sm">
                              Your Transactions in Genie
                            </p>
                          </div>
                        </div>
                        <div className="row reconcile-body">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-6 col-xs-12 pr-50">
                                <p className="col-md-6 col-xs-6">Details</p>
                                <p className="col-md-3 col-xs-3 text-right">
                                  Credit(Money In)
                                </p>
                                <p className="col-md-3 col-xs-3 text-right pad-r-no">
                                  Debit(Money out)
                                </p>
                              </div>
                              <div className="col-md-6 pl-35 hidden-xs hidden-sm">
                                <p className="col-md-6">Details</p>
                                <p className="col-md-3 text-right pad-r-no">
                                  Credit (Money Out)
                                </p>
                                <p className="col-md-3 text-right pad-r-no">
                                  Debit (Money In)
                                </p>
                              </div>
                            </div>
                          </div>
                          {this.state.ReConcileList.map((rlist, i) => {
                            let isMatched = 0;
                            let matchedItem = this.state.transaction_list.find(
                              (el) =>
                                el.total_payment_foreign_currency ===
                                rlist.credit
                            );

                            if (matchedItem == undefined) {
                              matchedItem = this.state.transaction_list.find(
                                (el) =>
                                  el.total_payment_foreign_currency ===
                                  rlist.debit
                              );
                            }
                            if (matchedItem != undefined) {
                              console.log(
                                "matched",
                                matchedItem.total_payment_foreign_currency
                              );
                              isMatched = 1;
                              ReconcileAll.push({
                                bank_id: rlist.id,
                                transaction_id: matchedItem.id,
                                reconcile_transaction_type:matchedItem.reconcile_transaction_type,
                                type:
                                  matchedItem.type == "customer"
                                    ? "credit"
                                    : "debit",
                              });
                              console.log("ferfer7", ReconcileAll);
                            }
                            return (
                              <div className="col-md-12 reconcile-item-encl">
                                <div className="col-md-6 col-xs-12">
                                  <div className="row reconcile-item">
                                    <div className="col-md-6 col-xs-6 pad-l-no">
                                      <p>
                                        {moment(rlist.date).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </p>
                                      <p>{rlist.payee}</p>
                                      <p>{rlist.reference}</p>
                                      <p className="more">
                                        <a href="javascript:;">More</a>
                                        <span className="more-detail">
                                          <span>
                                            <strong>Memo:</strong> memo
                                          </span>
                                          <span>
                                            <strong>Transaction Type:</strong>{" "}
                                            {rlist.debit > 0 ? "Debit" : ""}{" "}
                                            {rlist.credit > 0 ? "Credit" : ""}
                                          </span>
                                          <span>
                                            <strong>Cheque No:</strong> -
                                          </span>
                                        </span>
                                      </p>
                                    </div>
                                    <div className="col-md-3 col-xs-3 pad-l-no text-right">
                                      <p>
                                        {rlist.credit > 0 ? rlist.credit : "-"}
                                      </p>
                                    </div>
                                    <div className="col-md-3 col-xs-3 pad-l-no pad-r-no text-right">
                                      <p>
                                        {rlist.debit > 0 ? rlist.debit : "-"}{" "}
                                      </p>
                                    </div>
                                    {/* <p className="create-rule">
                                    <a href="javascript:;">Create Bank Rule</a>
                                  </p> */}
                                    {/* <a href="javascript:;" className="remove-item">
                                    <img className="img-responsive" src="images/delete-icon.svg" alt="icon" />
                                  </a> */}
                                  </div>
                                </div>
                                {isMatched === 1 ? (
                                  <button
                                    className="btn btn-green match-btn"
                                    onClick={() =>
                                      this.handleReconciletem(
                                        rlist,
                                        matchedItem
                                      )
                                    }
                                  >
                                    <img
                                      className="filter-white"
                                      src="images/tick-big.svg"
                                      alt="icon"
                                    />
                                  </button>
                                ) : null}
                                <div className="col-md-6 col-xs-12">
                                  <div
                                    className={
                                      isMatched === 1
                                        ? "row transact-item"
                                        : "row transact-item blue"
                                    }
                                  >
                                    <button
                                      className="btn btn-white find-match"
                                      onClick={() =>
                                        this.handleFetchFindItem(rlist)
                                      }
                                    >
                                      {" "}
                                      Find &amp; Match
                                    </button>
                                    <ul className="nav nav-tabs">
                                      {(isMatched = 1) ? (
                                        <li className="active">
                                          <a
                                            className="match-trans"
                                            data-toggle="tab"
                                            href={`#match${i}`}
                                          >
                                            Match
                                          </a>
                                        </li>
                                      ) : null}
                                      <li
                                        className={
                                          isMatched != 1 ? "active" : null
                                        }
                                      >
                                        <a
                                          className="create-trans"
                                          data-toggle="tab"
                                          href={`#create${i}`}
                                        >
                                          Create
                                        </a>
                                      </li>
                                    </ul>
                                    <div className="tab-content">
                                      <div
                                        id={`match${i}`}
                                        className={
                                          isMatched === 1
                                            ? "tab-pane fade in active"
                                            : "tab-pane fade in"
                                        }
                                      >
                                        <div className="row">
                                          {isMatched === 1 &&
                                            matchedItem != undefined ? (
                                              <div>
                                                <div className="col-md-6 col-xs-6">
                                                  <p>
                                                    {moment(
                                                      matchedItem.created_date
                                                    ).format("DD/MM/YYYY")}
                                                  </p>
                                                  {/* <p>{matchedItem.total_payment_foreign_currency}</p> */}
                                                  <p>
                                                    Ref:{" "}
                                                    {matchedItem.reference_number}
                                                  </p>
                                                </div>
                                                <div className="col-md-3 col-xs-3 text-right">
                                                  <p>-</p>
                                                </div>
                                                <div className="col-md-3 col-xs-3 text-right">
                                                  <p>
                                                    {
                                                      matchedItem.total_payment_foreign_currency
                                                    }
                                                  </p>
                                                </div>
                                              </div>
                                            ) : null}
                                          {/* <div className="col-md-12">
                                          <button className="btn btn-blue btn-small">Find &amp; Match</button>
                                        </div> */}
                                        </div>
                                      </div>
                                      <div
                                        id={`create${i}`}
                                        className="tab-pane fade in"
                                      >
                                        <div className="row">
                                          <div className="col-md-12">
                                            <button
                                              className="btn-small btn btn-blue"
                                              onClick={() => {

                                                let amount
                                                let id

                                                if (rlist.credit > 0) {
                                                  amount = rlist.credit
                                                  id = rlist.customerid
                                                  this.setState({ DebOrCr: 1, pass_amount: amount, passid: id });
                                                } else {
                                                  amount = rlist.debit
                                                  id = rlist.vendorid
                                                  this.setState({ DebOrCr: 0, pass_amount: amount, passid: id });
                                                }

                                                this.get_customerlist();
                                                window
                                                  .jQuery("#add_transaction")
                                                  .modal("show");
                                              }}
                                            >
                                              <img
                                                className="filter-white mar-rgt-5"
                                                src="images/plus-add.svg"
                                                alt="icon"
                                              />
                                              Add Transactions
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {/* <div class="col-md-12 col-xs-12">
                                    <hr>
                                    <p class="fw-med pull-left">Showing - 10 of 40 items</p>
                                    <div class="pull-right pagination-wrap">
                                        <ul class="pagination">
                                            <li class="active"><a href="javascript:;">01</a></li>
                                            <li><a href="javascript:;">02</a></li>
                                            <li><a href="javascript:;">03</a></li>
                                            <li><a href="javascript:;">04</a></li>
                                            <li><a href="javascript:;" class="btn">Next</a></li>
                                        </ul>
                                    </div>
                                </div> */}
                        </div>
                        <button
                          className="btn btn-green "
                          onClick={() => {
                            const unique = [];

                            ReconcileAll.map((x) =>
                              unique.filter(
                                (a) =>
                                  (
                                    a.bankId == x.bankId &&
                                    a.transId == x.transId &&
                                    a.reconcile_transaction_type == x.reconcile_transaction_type
                                  ).length > 0
                              ).length > 0
                                ? null
                                : unique.push(x)
                            );

                            console.log("unique", unique);
                            this.handleReconciletem(unique);
                          }}
                        >
                          Reconcile All
                        </button>
                      </div>


                      {(this.state.ReConcileList.length == 0 ? (
                        <div id="cash-coding" className="col-md-12 tab-pane fade in pad-no">
                          <div className="landing-wrap">
                            <div className="img-concept text-center">
                              <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                              <p>Looks like there's no data</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                          <div id="cash-coding" className="tab-pane fade in">
                            <div className="report-setting mar-t-no">
                              <form className="custom-form mh form-inline w-100">
                                <div className="col-md-6 col-xs-12 form-group pad-no">
                                  <label className="custom-checkbox">
                                    <input
                                      type="checkbox"
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          this.setState({ showMatched: true });
                                        } else {
                                          this.setState({ showMatched: false });
                                        }
                                      }}
                                    />{" "}
                                Show lines with suggested matches
                                <span className="checkmark" />
                                  </label>
                                </div>
                                <div className="col-md-6 col-xs-12 text-right pad-no">
                                  {/* <div className="dropdown apply-rule-btn mar-lft form-group"> */}
                                  <div className="apply-rule-btn inlinefix form-group">
                                    <button
                                      className="btn btn-blue dropdown-toggle btn-arrow"
                                      data-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      Apply Rule
                                  <span className="caret" />
                                    </button>
                                    <ul className="dropdown-menu align-right">
                                    <li className="debit-sec">
                                        <span className="head">
                                          Debit Amount Rule
                                    </span>
                                    {/* </li>
                                    <li> */}
                                    <ul className="list-unstyled">
                                                {this.state.debitrulelist.map(
                                                  (item, index) => {
                                                    return (


                                    <li className="debit-sec"  key={index}
                                    >
                                    <a
                                      href="javascript:;"
                                      value={item.title}
                                    >
                                      {item.title}
                                    </a>
                                  </li>
                                                    )})}
                                  </ul>
                                  </li>

                                      <li className="credit-sec">
                                        <span className="head">
                                          Credit Amount Rule
                                    </span>
                                    {/* </li>
                                    <li> */}
                                    <ul className="list-unstyled">
                                    {this.state.creditrulelist.map(
                                                  (item, index) => {
                                                    return (


                                    <li className="debit-sec"  key={index}
                                    >
                                    <a
                                      href="javascript:;"
                                      value={item.title}
                                    >
                                      {item.title}
                                    </a>
                                  </li>
                                                    )})}
                                  </ul>
                                  </li>
                                  </ul>
                                    {/* <ul className="dropdown-menu align-right">
                                      <li className="debit-sec">
                                        <span className="head">
                                          Debit Amount Rule
                                    </span>
                                        <a href="javascript:;">Debit Rule 1</a>
                                        <a href="javascript:;">Debit Rule 2</a>
                                        <a href="javascript:;">Debit Rule 3</a>
                                      </li>
                                      <li className="credit-sec">
                                        <span className="head">
                                          Credit Amount Rule
                                    </span>
                                        <a href="javascript:;">Credit Rule 1</a>
                                        <a href="javascript:;">Credit Rule 2</a>
                                        <a href="javascript:;">Credit Rule 3</a>
                                      </li>
                                    </ul> */}
                                  </div>
                                  <div className="form-group mar-lft">
                                    <label>Show per page</label>
                                    <div className="custom-select-drop dropdown">
                                      <a
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        role="button"
                                        data-toggle="dropdown"
                                        className="dropdown-toggle btn form-control w-auto"
                                        href="javascript:;"
                                      >
                                        <span id="selected">20</span>
                                        <span className="caret" />
                                      </a>
                                      <ul className="dropdown-menu align-right">
                                        <li className="active">
                                          <a href="javascript:;">20</a>
                                        </li>
                                        <li>
                                          <a href="javascript:;">30</a>
                                        </li>
                                        <li>
                                          <a href="javascript:;">40</a>
                                        </li>
                                        <li>
                                          <a href="javascript:;">50</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="report-table reconcile-table col-md-12 col-xs-12 pad-no">
                              <div className="table-responsive">
                                <table
                                  className="table detail-report"
                                  id="example4"
                                  ref={(el) => (this.el = el)}
                                >
                                  <thead>
                                    <tr>
                                      <th>
                                        <label className="custom-checkbox small">
                                          <input
                                            type="checkbox"
                                            name="all"
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                var array = [];

                                                this.state.ReConcileList &&
                                                  this.state.ReConcileList.map(
                                                    (item, i) => {
                                                      array.push(i);
                                                    }
                                                  );
                                                this.setState({
                                                  selectedBox: array,
                                                });
                                              }
                                              if (!e.target.checked) {
                                                this.setState({ selectedBox: [] });
                                              }
                                            }}
                                          />
                                      &nbsp;
                                      <span className="checkmark" />
                                        </label>
                                      </th>
                                      <th>
                                        Date
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th>
                                        No#
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th>
                                        Name
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th className="memo">
                                        Memo
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th>
                                        Account
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th>
                                        Tax Rate
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th className="text-right">
                                        Credit (Money In)
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th className="text-right">
                                        Debit (Money In)
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.ReConcileList &&
                                      this.state.ReConcileList.map((item, i) => {
                                        let isMatched = 0;
                                        let matchedItem = this.state.transaction_list.find(
                                          (el) =>
                                            el.total_payment_foreign_currency ===
                                            item.credit
                                        );
                                        if (matchedItem != undefined) {
                                          console.log(
                                            "matched",
                                            matchedItem.total_payment_foreign_currency
                                          );
                                          isMatched = 1;
                                        }

                                        if (isMatched !== 1) {
                                          return (
                                            <tr
                                              key={item.id}
                                              className={
                                                this.state.selectedBox.includes(i)
                                                  ? "match-row"
                                                  : ""
                                              }
                                            >
                                              <td>
                                                <label className="custom-checkbox small">
                                                  <input
                                                    type="checkbox"
                                                    name="all"
                                                    checked={
                                                      this.state.selectedBox.includes(
                                                        i
                                                      )
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={(e) => {
                                                      let newlySelected = i;
                                                      if (e.target.checked) {
                                                        let selectedBox = this.state
                                                          .selectedBox;
                                                        let newBox = [
                                                          ...selectedBox,
                                                          newlySelected,
                                                        ];
                                                        this.setState({
                                                          selectedBox: newBox,
                                                        });
                                                      }
                                                      if (!e.target.checked) {
                                                        let selectedBox = this.state
                                                          .selectedBox;
                                                        const removeElement = selectedBox.indexOf(
                                                          newlySelected
                                                        );
                                                        if (removeElement > -1) {
                                                          selectedBox.splice(
                                                            removeElement,
                                                            1
                                                          );
                                                        }
                                                        this.setState({
                                                          selectedBox: selectedBox,
                                                        });
                                                      }
                                                    }}
                                                  />
                                              &nbsp;
                                              <span className="checkmark" />
                                                </label>
                                              </td>
                                              <td className="td-bg-gray">
                                                {item.date}
                                              </td>
                                              <td>
                                                <input
                                                  type="text"
                                                  name="id"
                                                  className="form-control"
                                                  defaultValue={0}
                                                  value={
                                                    this.state.ReConcileList[i].id
                                                  }
                                                // onChange={this.handleOnChange(i)}
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  type="text"
                                                  name="payee"
                                                  className="form-control"
                                                  defaultValue={"name"}
                                                  value={
                                                    this.state.ReConcileList[i]
                                                      .payee
                                                  }
                                                  onChange={this.handleOnChange(i)}
                                                />
                                              </td>
                                              {/* <td>
              <div className="custom-select-drop dropdown">
                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                  <span id="selected">Dobson's Properties</span><span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li className="active"><a href="javascript:;">Dobson's Properties</a></li>
                  <li><a href="javascript:;">Name 1</a></li>
                  <li><a href="javascript:;">Name 2</a></li>
                  <li><a href="javascript:;">Name 3</a></li>
                  <li><a href="javascript:;">Name 4</a></li>
                </ul>
              </div>
            </td> */}
                                              <td className="memo">
                                                <textarea
                                                  className="form-control"
                                                  defaultValue={"--"}
                                                  name="reference"
                                                  value={
                                                    this.state.ReConcileList[i]
                                                      .reference
                                                  }
                                                  onChange={this.handleOnChange(i)}
                                                />
                                              </td>
                                              <td>
                                                <select
                                                  className="form-control add-new"
                                                  data-live-search="true"
                                                  title="Choose"
                                                  name="category_id"
                                                  value={
                                                    this.state.ReConcileList[i]
                                                      .category_id
                                                  }
                                                  onChange={this.handleOnChange(i)}
                                                >
                                                  <option value="1e">
                                                    Choose{" "}
                                                  </option>
                                                  {this.state
                                                    .default_category_list &&
                                                    this.state.default_category_list.map(
                                                      (item, i) => {
                                                        return (
                                                          <option value={item.id}>
                                                            {" "}
                                                            {item.name}{" "}
                                                          </option>
                                                        );
                                                      }
                                                    )}
                                                </select>
                                                {/* <div className="custom-select-drop dropdown">
                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                  <span id="selected">Liability Insurance</span><span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li className="active"><a href="javascript:;">Liability Insurance</a></li>
                  <li><a href="javascript:;">Account Category 1</a></li>
                  <li><a href="javascript:;">Account Category 2</a></li>
                  <li><a href="javascript:;">Account Category 3</a></li>
                  <li><a href="javascript:;">Account Category 4</a></li>
                </ul>
              </div> */}
                                              </td>
                                              <td>
                                                <select
                                                  className="form-control add-new"
                                                  data-live-search="true"
                                                  title="Choose"
                                                  name="chequeno"
                                                  value={
                                                    this.state.ReConcileList[i]
                                                      .chequeno
                                                  }
                                                  // onChange={this.handleOnChange(i)}
                                                  onChange={(e) => {
                                                    // alert(e.target.value);

                                                    var myarray = this.state
                                                      .ReConcileList;

                                                    this.state.selectedBox.map(
                                                      (itm, j) => {
                                                        myarray[itm]["chequeno"] =
                                                          e.target.value;

                                                        this.state.gst_list &&
                                                          this.state.gst_list.map(
                                                            (data, j) => {
                                                              if (
                                                                data.id ==
                                                                e.target.value
                                                              ) {
                                                                this.setState({
                                                                  [`sales_tax_code${itm}`]: data.sales_tax_code,
                                                                  [`sales_tax_name${itm}`]: data.sales_tax_name,
                                                                  [`rate_type${itm}`]: data.rate_type,
                                                                  [`rate${itm}`]: data.rate,
                                                                });
                                                              }
                                                            }
                                                          );
                                                      }
                                                    );
                                                    this.setState({
                                                      ReConcileList: myarray,
                                                    });
                                                  }}
                                                >
                                                  <option value="1e">
                                                    Choose{" "}
                                                  </option>
                                                  {this.state.gst_list &&
                                                    this.state.gst_list.map(
                                                      (a, b) => {
                                                        return (
                                                          <option value={a.id}>
                                                            {a.sales_tax_name}
                                                          </option>
                                                        );
                                                      }
                                                    )}
                                                </select>
                                                {/* <div className="custom-select-drop dropdown">
                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                  <span id="selected">Tax on Purchase 0.5%</span><span className="caret" />
                </a>
                 <ul className="dropdown-menu">
                  <li className="active"><a href="javascript:;">Tax on Purchase 0.5%</a></li>
                  <li><a href="javascript:;">Tax Item 1</a></li>
                  <li><a href="javascript:;">Tax Item 2</a></li>
                  <li><a href="javascript:;">Tax Item 3</a></li>
                  <li><a href="javascript:;">Tax Item 4</a></li>
                </ul>
              </div> */}
                                              </td>

                                              <td className="text-right pad-r-25 td-bg-gray">
                                                {item.credit}
                                              </td>
                                              <td className="text-right pad-r-25 td-bg-gray">
                                                {item.debit}
                                                <div className="dropdown action-item">
                                                  <button
                                                    className="btn btn-green dropdown-toggle"
                                                    type="button"
                                                    // data-toggle="dropdown"
                                                    data-toggle="modal"
                                                    data-target="#splitModal"
                                                    onClick={() => {
                                                      this.setState({
                                                        split: i,
                                                      });

                                                      this.state.ReConcileList.map(
                                                        (itm, i) =>
                                                          this.setState(
                                                            {
                                                              [`split_array${i}`]: [
                                                                {
                                                                  split_memo: "",
                                                                  split_account: "",
                                                                  split_tax: "",
                                                                  split_amount: "",
                                                                },
                                                              ],
                                                            },
                                                            console.log(
                                                              "jfsdhfs",
                                                              this.state[
                                                              `split_array${i}`
                                                              ]
                                                            )
                                                          )
                                                      );
                                                      // console.log(
                                                      //   "sdfsuasd",
                                                      //   this.state[
                                                      //     `split_array${i}`
                                                      //   ]
                                                      // );
                                                    }}
                                                  >
                                                    Action
                                                <span className="caret" />
                                                  </button>
                                                  <ul className="dropdown-menu align-right">
                                                    <li>
                                                      <a href="javascript:;">
                                                        Create Bank Rule
                                                  </a>
                                                    </li>
                                                    <li>
                                                      <a
                                                        href="javascript:;"
                                                        data-toggle="modal"
                                                        data-target="#splitModal"
                                                      >
                                                        Split
                                                  </a>
                                                    </li>
                                                    <li>
                                                      <a
                                                        href="javascript:;"
                                                        data-toggle="modal"
                                                        data-target="#deleteModal"
                                                      >
                                                        Delete
                                                  </a>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </td>
                                            </tr>
                                          );
                                        } else {
                                          if (this.state.showMatched) {
                                            return (
                                              <tr
                                                className={
                                                  // this.state.selectedBox.includes(i)
                                                  //   ?
                                                  "match-row"
                                                  // : ""
                                                }
                                              >
                                                <td>
                                                  <label className="custom-checkbox small">
                                                    <input
                                                      type="checkbox"
                                                      name="all"
                                                      checked={
                                                        this.state.selectedBox.includes(
                                                          i
                                                        )
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={(e) => {
                                                        let newlySelected = i;
                                                        if (e.target.checked) {
                                                          let selectedBox = this
                                                            .state.selectedBox;
                                                          let newBox = [
                                                            ...selectedBox,
                                                            newlySelected,
                                                          ];
                                                          this.setState({
                                                            selectedBox: newBox,
                                                          });
                                                        }
                                                        if (!e.target.checked) {
                                                          let selectedBox = this
                                                            .state.selectedBox;
                                                          const removeElement = selectedBox.indexOf(
                                                            newlySelected
                                                          );
                                                          if (removeElement > -1) {
                                                            selectedBox.splice(
                                                              removeElement,
                                                              1
                                                            );
                                                          }
                                                          this.setState({
                                                            selectedBox: selectedBox,
                                                          });
                                                        }
                                                      }}
                                                    />
                                                &nbsp;
                                                <span className="checkmark" />
                                                  </label>
                                                </td>
                                                <td className="td-bg-gray">
                                                  {item.date}
                                                </td>
                                                <td>
                                                  <input
                                                    type="text"
                                                    name="id"
                                                    className="form-control"
                                                    defaultValue={0}
                                                    value={
                                                      this.state.ReConcileList[i].id
                                                    }
                                                    onChange={this.handleOnChange(
                                                      i
                                                    )}
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="text"
                                                    name="payee"
                                                    className="form-control"
                                                    defaultValue={"name"}
                                                    value={
                                                      this.state.ReConcileList[i]
                                                        .payee
                                                    }
                                                    onChange={this.handleOnChange(
                                                      i
                                                    )}
                                                  />
                                                </td>
                                                {/* <td>
                <div className="custom-select-drop dropdown">
                  <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                    <span id="selected">Dobson's Properties</span><span className="caret" />
                  </a>
                  <ul className="dropdown-menu">
                    <li className="active"><a href="javascript:;">Dobson's Properties</a></li>
                    <li><a href="javascript:;">Name 1</a></li>
                    <li><a href="javascript:;">Name 2</a></li>
                    <li><a href="javascript:;">Name 3</a></li>
                    <li><a href="javascript:;">Name 4</a></li>
                  </ul>
                </div>
              </td> */}
                                                <td className="memo">
                                                  <textarea
                                                    className="form-control"
                                                    defaultValue={"--"}
                                                    name="reference"
                                                    value={
                                                      this.state.ReConcileList[i]
                                                        .reference
                                                    }
                                                    onChange={this.handleOnChange(
                                                      i
                                                    )}
                                                  />
                                                </td>
                                                <td>
                                                  <select
                                                    className="form-control add-new"
                                                    data-live-search="true"
                                                    title="Choose"
                                                    name="category_id"
                                                    value={
                                                      this.state.ReConcileList[i]
                                                        .category_id
                                                    }
                                                    onChange={this.handleOnChange(
                                                      i
                                                    )}
                                                  >
                                                    <option value="1e">
                                                      Choose{" "}
                                                    </option>
                                                    {this.state
                                                      .default_category_list &&
                                                      this.state.default_category_list.map(
                                                        (item, i) => {
                                                          return (
                                                            <option value={item.id}>
                                                              {" "}
                                                              {item.name}{" "}
                                                            </option>
                                                          );
                                                        }
                                                      )}
                                                  </select>
                                                  {/* <div className="custom-select-drop dropdown">
                  <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                    <span id="selected">Liability Insurance</span><span className="caret" />
                  </a>
                  <ul className="dropdown-menu">
                    <li className="active"><a href="javascript:;">Liability Insurance</a></li>
                    <li><a href="javascript:;">Account Category 1</a></li>
                    <li><a href="javascript:;">Account Category 2</a></li>
                    <li><a href="javascript:;">Account Category 3</a></li>
                    <li><a href="javascript:;">Account Category 4</a></li>
                  </ul>
                </div> */}
                                                </td>
                                                <td>
                                                  <select
                                                    className="form-control add-new"
                                                    data-live-search="true"
                                                    title="Choose"
                                                    name="bankid"
                                                    value={
                                                      this.state.ReConcileList[i]
                                                        .bankid
                                                    }
                                                    // onChange={this.handleOnChange(i)}
                                                    onChange={(e) => {
                                                      alert(e.target.value);

                                                      var myarray = this.state
                                                        .ReConcileList;

                                                      this.state.selectedBox.map(
                                                        (itm, j) => {
                                                          myarray[itm]["bankid"] =
                                                            e.target.value;

                                                          this.state.gst_list &&
                                                            this.state.gst_list.map(
                                                              (data, j) => {
                                                                if (
                                                                  data.id ==
                                                                  e.target.value
                                                                ) {
                                                                  this.setState({
                                                                    [`sales_tax_code${itm}`]: data.sales_tax_code,
                                                                    [`sales_tax_name${itm}`]: data.sales_tax_name,
                                                                    [`rate_type${itm}`]: data.rate_type,
                                                                    [`rate${itm}`]: data.rate,
                                                                  });
                                                                }
                                                              }
                                                            );
                                                        }
                                                      );
                                                      this.setState({
                                                        ReConcileList: myarray,
                                                      });
                                                    }}
                                                  >
                                                    <option value="1e">
                                                      Choose{" "}
                                                    </option>
                                                    {this.state.gst_list &&
                                                      this.state.gst_list.map(
                                                        (a, b) => {
                                                          return (
                                                            <option value={a.id}>
                                                              {a.sales_tax_name}
                                                            </option>
                                                          );
                                                        }
                                                      )}
                                                  </select>
                                                  {/* <div className="custom-select-drop dropdown">
                  <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                    <span id="selected">Tax on Purchase 0.5%</span><span className="caret" />
                  </a>
                   <ul className="dropdown-menu">
                    <li className="active"><a href="javascript:;">Tax on Purchase 0.5%</a></li>
                    <li><a href="javascript:;">Tax Item 1</a></li>
                    <li><a href="javascript:;">Tax Item 2</a></li>
                    <li><a href="javascript:;">Tax Item 3</a></li>
                    <li><a href="javascript:;">Tax Item 4</a></li>
                  </ul>
                </div> */}
                                                </td>

                                                <td className="text-right pad-r-25 td-bg-gray">
                                                  {item.credit}
                                                </td>
                                                <td className="text-right pad-r-25 td-bg-gray">
                                                  {item.debit}
                                                  <div className="dropdown action-item">
                                                    <button
                                                      className="btn btn-green dropdown-toggle"
                                                      type="button"
                                                      // data-toggle="dropdown"
                                                      data-toggle="modal"
                                                      data-target="#splitModal"
                                                      onClick={() =>
                                                        this.setState({ split: i })
                                                      }
                                                    >
                                                      Action
                                                  <span className="caret" />
                                                    </button>
                                                    <ul className="dropdown-menu align-right">
                                                      <li>
                                                        <a href="javascript:;">
                                                          Create Bank Rule
                                                    </a>
                                                      </li>
                                                      <li>
                                                        <a
                                                          href="javascript:;"
                                                          data-toggle="modal"
                                                          data-target="#splitModal"
                                                        >
                                                          Split
                                                    </a>
                                                      </li>
                                                      <li>
                                                        <a
                                                          href="javascript:;"
                                                          data-toggle="modal"
                                                          data-target="#deleteModal"
                                                        >
                                                          Delete
                                                    </a>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </td>
                                              </tr>
                                            );
                                          }
                                        }
                                      })}
                                  </tbody>
                                </table>
                              </div>
                              {/* <div className="col-md-12 col-xs-12 pad-no mar-top pagination-sec">
                          <p className="fw-med pull-left">Showing - 10 of 40 items</p>
                          <div className="pull-right pagination-wrap">
                            <ul className="pagination">
                              <li className="active"><a href="javascript:;">01</a></li>
                              <li><a href="javascript:;">02</a></li>
                              <li><a href="javascript:;">03</a></li>
                              <li><a href="javascript:;">04</a></li>
                              <li><a href="javascript:;" className="btn">Next</a></li>
                            </ul>
                          </div>
                        </div> */}
                            </div>
                            <div className="invoice-form">
                              <div className="pf-btm-wrap">
                                <div className="col-md-12 col-xs-12 text-right pad-no">
                                  <button className="btn btn-lightgray mar-rgt-5 btn-align">
                                    Discard Changes
                              </button>
                                  <button className="btn btn-yellow mar-rgt-5 btn-align">
                                    Save Changes
                              </button>
                                  <button
                                    className="btn btn-green mar-rgt-5 btn-align"
                                    type="button"
                                    onClick={() => this.reconcile()}
                                  >
                                    Reconcile
                              </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                      {this.state.bankList.length == 0 ? (
                        <div id="bank-statement" className="col-md-12 tab-pane fade in pad-no">
                          <div className="landing-wrap">
                            <div className="img-concept text-center">
                              <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                              <p>Looks like there's no data</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                          <div id="bank-statement" className="tab-pane fade in">
                            <div className="report-setting">
                              <form className="custom-form mh form-inline w-100">
                                <div className="col-md-6 col-xs-12 form-group pad-no">
                                  <div className="search-input">
                                    <img
                                      className="search-icon"
                                      src="images/search-icon.svg"
                                      alt="Search"
                                    />
                                    <input
                                      onChange={(e) => {
                                        this.setState({
                                          search_key: e.target.value,
                                        });
                                        setTimeout(() => {
                                          this.get_all_bank_statements();
                                        }, 1000);
                                      }}
                                      type="text"
                                      className="form-control"
                                      placeholder="Search..."
                                      name
                                    />
                                  </div>
                                  <a
                                    onClick={(e) => {
                                      e.preventDefault();
                                      window
                                        .jQuery(this)
                                        .css("visibility", "hidden");
                                      window.jQuery(".report-filter").slideDown();
                                    }}
                                    href="javascript:;"
                                    className="text-link filter-btn"
                                  >
                                    Advanced
                              </a>
                                </div>
                                <div className="col-md-6 col-xs-12 text-right pad-no">
                                  {/* <div className="form-group">
                              <div className="custom-select-drop dropdown">
                                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn btn-blue form-control w-auto" href="javascript:;">
                                  <span id="selected">Statement Lines</span><span className="caret" />
                                </a>
                                <ul className="dropdown-menu align-right">
                                  <li className="active"><a href="javascript:;">Statement Lines</a></li>
                                  <li><a href="javascript:;">Statements Summary</a></li>
                                </ul>
                              </div>
                            </div> */}
                                  {/* <div className="form-group mar-lft">
                              <label>Show per page</label>
                              <div className="custom-select-drop dropdown">
                                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control w-auto" href="javascript:;">
                                  <span id="selected">20</span><span className="caret" />
                                </a>
                                <ul className="dropdown-menu align-right">
                                  <li className="active"><a href="javascript:;">20</a></li>
                                  <li><a href="javascript:;">30</a></li>
                                  <li><a href="javascript:;">40</a></li>
                                  <li><a href="javascript:;">50</a></li>
                                </ul>
                              </div>
                            </div> */}
                                </div>
                              </form>
                              <div className="col-md-12 col-xs-12 report-filter">
                                <a
                                  href="javascript:;"
                                  className="close-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window
                                      .jQuery(this)
                                      .css("visibility", "visible");
                                    window.jQuery(".report-filter").slideUp();
                                  }}
                                >
                                  <img src="images/cross-red.svg" />
                                </a>
                                <form className="reconcile-search custom-form w-100">
                                  <div className="form-group col-md-4 mar-b-no">
                                    <label className="fw-sbold">Amount</label>
                                    <div className="input-group w-100">
                                      {!this.state.exact_amount && (
                                        <>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Minimum"
                                            name="min"
                                            value={this.state.minimum}
                                            onChange={(e) => {
                                              this.setState({
                                                minimum: e.target.value,
                                              });
                                              setTimeout(() => {
                                                this.get_all_bank_statements();
                                              }, 1000);
                                            }}
                                          />
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Maximum"
                                            name="max"
                                            value={this.state.maximum}
                                            onChange={(e) => {
                                              this.setState({
                                                maximum: e.target.value,
                                              });
                                              setTimeout(() => {
                                                this.get_all_bank_statements();
                                              }, 1000);
                                            }}
                                          />
                                        </>
                                      )}
                                      {this.state.exact_amount && (
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="exact"
                                          name="max"
                                          value={this.state.excact}
                                          onChange={(e) => {
                                            this.setState({
                                              excact: e.target.value,
                                            });
                                            setTimeout(() => {
                                              this.get_all_bank_statements();
                                            }, 1000);
                                          }}
                                        />
                                      )}
                                    </div>
                                    <label className="custom-checkbox small">
                                      <input
                                        type="checkbox"
                                        name="exact"
                                        checked={this.state.eexact_amount}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            this.setState({ exact_amount: true });
                                          } else {
                                            this.setState({ exact_amount: false });
                                          }
                                        }}
                                      />{" "}
                                  Exact Amount
                                  <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-group col-md-4 mar-b-no">
                                    <label className="fw-sbold">Date</label>
                                    <div className="input-group w-100">
                                      {!this.state.exact_date && (
                                        <>
                                          <div
                                            className="input-group date mar-t-no"
                                            data-date-format="dd/mm/yyyy"
                                            onClick={() =>
                                              window
                                                .jQuery(".input-group.date")
                                                .datepicker({
                                                  format: "dd/mm/yyyy",
                                                })
                                            }
                                          >
                                            <input
                                              id="from_date"
                                              value={this.state.from_date}
                                              onBlur={() => this.changeDate1()}
                                              placeholder="From"
                                              type="text"
                                              className="w-100 form-control"
                                            />
                                            <div className="input-group-addon">
                                              <img
                                                src="images/calendar-icon.svg"
                                                alt="icon"
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="input-group date mar-t-no"
                                            data-date-format="dd/mm/yyyy"
                                            onClick={() =>
                                              window
                                                .jQuery(".input-group.date")
                                                .datepicker({
                                                  format: "dd/mm/yyyy",
                                                })
                                            }
                                          >
                                            <input
                                              id="to_date"
                                              placeholder="To"
                                              type="text"
                                              className="w-100 form-control"
                                              value={this.state.to_date}
                                              onBlur={() => this.changeDate2()}
                                            />
                                            <div className="input-group-addon">
                                              <img
                                                src="images/calendar-icon.svg"
                                                alt="icon"
                                              />
                                            </div>
                                          </div>
                                        </>
                                      )}
                                      {this.state.exact_date && (
                                        <div
                                          className="input-group date mar-t-no"
                                          data-date-format="dd/mm/yyyy"
                                          onClick={() =>
                                            window
                                              .jQuery(".input-group.date")
                                              .datepicker({ format: "dd/mm/yyyy" })
                                          }
                                        >
                                          <input
                                            id="exact_date"
                                            onBlur={() => this.changeDate3()}
                                            placeholder="Exact Date"
                                            type="text"
                                            className="w-100 form-control"
                                            value={this.state.exact_dat}
                                          />
                                          <div className="input-group-addon">
                                            <img
                                              src="images/calendar-icon.svg"
                                              alt="icon"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <label className="custom-checkbox small">
                                      <input
                                        type="checkbox"
                                        name="exact"
                                        checked={this.state.exact_date}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            this.setState({ exact_date: true });
                                          } else {
                                            this.setState({ exact_date: false });
                                          }
                                        }}
                                      />{" "}
                                  Exact Date
                                  <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-group col-md-4 col-xs-12 mar-b-no">
                                    <label>Status</label>
                                    <div className="custom-select-drop dropdown">
                                      <select
                                        className="selectpicker form-control add-new"
                                        data-live-search="true"
                                        title="Choose"
                                        value={this.state.status}
                                        onChange={(e) => {
                                          this.setState({ status: e.target.value });
                                          setTimeout(() => {
                                            this.get_all_bank_statements();
                                          }, 1000);
                                        }}
                                      >
                                        <option value="">choose...</option>
                                        <option value="1">Reconciled</option>
                                        <option value="0">Unreconciled</option>
                                      </select>
                                      {/* <a
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    role="button"
                                    data-toggle="dropdown"
                                    className="dropdown-toggle btn form-control w-auto"
                                    href="javascript:;"
                                  >
                                    <span id="selected">Choose</span>
                                    <span className="caret" />
                                  </a>
                                  <ul className="dropdown-menu align-right">
                                    <li className="active">
                                      <a href="javascript:;">Choose</a>
                                    </li>
                                    <li>
                                      <a href="javascript:;">Reconcilied</a>
                                    </li>
                                    <li>
                                      <a href="javascript:;">Unreconcilied</a>
                                    </li>
                                  </ul> */}
                                    </div>
                                  </div>
                                  <div className="form-group col-md-12 col-xs-12 text-right mar-b-no">
                                    <button
                                      className="btn btn-lightgray btn-align"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        this.setState({
                                          search_key: "",
                                          exact_amount: false,
                                          maximum: "",
                                          minimum: "",
                                          exact_date: false,
                                          from_date: "",
                                          to_date: "",
                                          status: "",
                                          excact: "",
                                          exact_dat: "",
                                        });
                                        setTimeout(() => {
                                          this.get_all_bank_statements();
                                        }, 1000);
                                      }}
                                    >
                                      Clear
                                </button>
                                    <button className="btn btn-green btn-align">
                                      Search
                                </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div className="report-table reconcile-table col-md-12 col-xs-12 pad-no">
                              <div className="table-responsive">
                                <table className="table detail-report">
                                  <thead>
                                    <tr>
                                      <th>
                                        <label className="custom-checkbox small">
                                          <input
                                            type="checkbox"
                                            name="all"
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                var array = [];

                                                this.state.bankList &&
                                                  this.state.bankList.map(
                                                    (item, i) => {
                                                      array.push(i);
                                                    }
                                                  );
                                                this.setState({
                                                  selectedRow: array,
                                                });
                                              }
                                              if (!e.target.checked) {
                                                this.setState({ selectedRow: [] });
                                              }
                                            }}
                                          />
                                      &nbsp;
                                      <span className="checkmark" />
                                        </label>
                                      </th>
                                      <th>
                                        Date
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th>
                                        Type
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th>
                                        No#
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th>
                                        Name
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th className="memo">
                                        Reference
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th className="text-right">
                                        Credit (Money In)
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th className="text-right">
                                        Debit(Money Out)
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      {/* <th className="text-right">
                                  Balance
                                  <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th> */}
                                      <th>
                                        <span className="sr-only">Status</span>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.bankList.map((item, i) => {
                                      return (
                                        <tr
                                          className={
                                            this.state.selectedRow.includes(i)
                                              ? "match-row"
                                              : ""
                                          }
                                        >
                                          <td>
                                            <label className="custom-checkbox small">
                                              <input
                                                type="checkbox"
                                                name="all"
                                                checked={
                                                  this.state.selectedRow.includes(i)
                                                    ? true
                                                    : false
                                                }
                                                onChange={(e) => {
                                                  let newlySelected = i;
                                                  if (e.target.checked) {
                                                    let selectedRow = this.state
                                                      .selectedRow;
                                                    let newBox = [
                                                      ...selectedRow,
                                                      newlySelected,
                                                    ];
                                                    this.setState({
                                                      selectedRow: newBox,
                                                    });
                                                  }
                                                  if (!e.target.checked) {
                                                    let selectedRow = this.state
                                                      .selectedRow;
                                                    const removeElement = selectedRow.indexOf(
                                                      newlySelected
                                                    );
                                                    if (removeElement > -1) {
                                                      selectedRow.splice(
                                                        removeElement,
                                                        1
                                                      );
                                                    }
                                                    this.setState({
                                                      selectedRow: selectedRow,
                                                    });
                                                  }
                                                }}
                                              />
                                          &nbsp;
                                          <span className="checkmark" />
                                            </label>
                                          </td>
                                          <td>
                                            {moment(item.payment_date).format(
                                              "DD/MM/YYYY"
                                            )}
                                          </td>
                                          <td>
                                            {item.credit > 0 ? "Credit" : "Debit"}
                                          </td>
                                          <td>{item.id}</td>
                                          <td>{item.payee}</td>
                                          <td>{item.reference}</td>
                                          <td className="text-right pad-r-25">
                                            {item.credit > 0 ? item.credit : "--"}
                                          </td>
                                          <td className="text-right pad-r-25">
                                            {item.debit > 0 ? item.debit : "--"}
                                          </td>

                                          {/* <td className="text-right pad-r-25">8,315.64</td> */}
                                          {item.is_bank_reconcile === 1 ? (
                                            <td>
                                              <span className="badge green">
                                                Reconciled
                                          </span>
                                            </td>
                                          ) : (
                                              <td>
                                                <span className="badge orange">
                                                  Unreconciled
                                          </span>
                                              </td>
                                            )}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                              {/* <div className="col-md-12 col-xs-12 pad-no mar-top pagination-sec">
                          <p className="fw-med pull-left">Showing - 10 of 40 items</p>
                          <div className="pull-right pagination-wrap">
                            <ul className="pagination">
                              <li className="active"><a href="javascript:;">01</a></li>
                              <li><a href="javascript:;">02</a></li>
                              <li><a href="javascript:;">03</a></li>
                              <li><a href="javascript:;">04</a></li>
                              <li><a href="javascript:;" className="btn">Next</a></li>
                            </ul>
                          </div>
                        </div> */}
                            </div>
                            <div className="invoice-form">
                              <div className="pf-btm-wrap">
                                <div className="col-md-12 col-xs-12 text-right pad-no">
                                  {/* <p className="selected-no">6 transactions selected</p> */}
                                  {/* <button className="btn btn-lightgray">Uncheck</button> */}
                                  <button
                                    type="button"
                                    className="btn btn-red"
                                    onClick={() => this.deleteBankStaments()}
                                  >
                                    Delete
                              </button>
                                  {/* <button className="btn btn-green">Restore</button> */}
                                </div>
                              </div>
                            </div>
                            <div
                              style={{ display: "none" }}
                              className="col-md-12 col-xs-12 pad-no mar-top"
                            >
                              <div className="table-responsive col-md-12 col-xs-12 pad-no mar-top">
                                <table className="invoice-item-table summary-table">
                                  <thead>
                                    <tr>
                                      <th>Start Date</th>
                                      <th>End Date</th>
                                      <th className="text-right">Start Balance</th>
                                      <th className="text-right">End Balance</th>
                                      <th className="text-center">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>18 Apr 2020</td>
                                      <td>6 May 2020</td>
                                      <td className="text-right">3,353.14</td>
                                      <td className="text-right">8,315.64</td>
                                      <td className="text-center">
                                        <span className="badge orange">
                                          Unreconciled
                                    </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>6 Apr 2020</td>
                                      <td>16 Apr 2020</td>
                                      <td className="text-right">1,926.05</td>
                                      <td className="text-right">3,353.14</td>
                                      <td className="text-center">
                                        <span className="badge green">
                                          Reconcilied
                                    </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}

                      {this.state.accountList.length == 0 ? (
                        <div id="account-transaction" className="col-md-12 tab-pane fade in pad-no">
                          <div className="landing-wrap">
                            <div className="img-concept text-center">
                              <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                              <p>Looks like there's no data</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                          <div
                            id="account-transaction"
                            className="tab-pane fade in"
                          >
                            <div className="report-setting">
                              <form className="custom-form mh form-inline w-100">
                                <div className="col-md-6 col-xs-12 form-group pad-no">
                                  <div className="search-input">
                                    <img
                                      className="search-icon"
                                      src="images/search-icon.svg"
                                      alt="Search"
                                    />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Search..."
                                      onChange={(e) => {
                                        this.setState({
                                          search_key: e.target.value,
                                        });
                                        setTimeout(() => {
                                          this.get_all_account_statements();
                                        }, 1000);
                                      }}
                                    />
                                  </div>
                                  <a
                                    href="javascript:;"
                                    className="text-link filter-btn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      window
                                        .jQuery(this)
                                        .css("visibility", "hidden");
                                      window.jQuery(".report-filter").slideDown();
                                    }}
                                  >
                                    Advanced
                              </a>
                                </div>
                                <div className="col-md-6 col-xs-12 text-right pad-no">
                                  <div className="form-group">
                                    <a
                                      className="btn btn-blue"
                                      onClick={() => {
                                        window
                                          .jQuery("#add_transaction")
                                          .modal("show");
                                      }}
                                    >
                                      Add Transaction
                                </a>
                                  </div>
                                  {/* <div className="form-group mar-lft">
                              <label>Show per page</label>
                              <div className="custom-select-drop dropdown">
                                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control w-auto" href="javascript:;">
                                  <span id="selected">20</span><span className="caret" />
                                </a>
                                <ul className="dropdown-menu align-right">
                                  <li className="active"><a href="javascript:;">20</a></li>
                                  <li><a href="javascript:;">30</a></li>
                                  <li><a href="javascript:;">40</a></li>
                                  <li><a href="javascript:;">50</a></li>
                                </ul>
                              </div>
                            </div> */}
                                </div>
                              </form>
                              <div className="col-md-12 col-xs-12 report-filter">
                                <a
                                  href="javascript:;"
                                  className="close-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window
                                      .jQuery(this)
                                      .css("visibility", "visible");
                                    window.jQuery(".report-filter").slideUp();
                                  }}
                                >
                                  <img src="images/cross-red.svg" />
                                </a>
                                <form className="reconcile-search custom-form w-100">
                                  <div className="form-group col-md-4 mar-b-no">
                                    <label className="fw-sbold">Amount</label>
                                    <div className="input-group w-100">
                                      {!this.state.exact_amount && (
                                        <>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Minimum"
                                            name="min"
                                            value={this.state.minimum}
                                            onChange={(e) => {
                                              this.setState({
                                                minimum: e.target.value,
                                              });
                                              setTimeout(() => {
                                                this.get_all_account_statements();
                                              }, 1000);
                                            }}
                                          />
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Maximum"
                                            name="max"
                                            value={this.state.maximum}
                                            onChange={(e) => {
                                              this.setState({
                                                maximum: e.target.value,
                                              });
                                              setTimeout(() => {
                                                this.get_all_account_statements();
                                              }, 1000);
                                            }}
                                          />
                                        </>
                                      )}
                                      {this.state.exact_amount && (
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="exact"
                                          name="max"
                                          value={this.state.excact}
                                          onChange={(e) => {
                                            this.setState({
                                              excact: e.target.value,
                                            });
                                            setTimeout(() => {
                                              this.get_all_account_statements();
                                            }, 1000);
                                          }}
                                        />
                                      )}
                                    </div>
                                    <label className="custom-checkbox small">
                                      <input
                                        type="checkbox"
                                        name="exact"
                                        checked={this.state.eexact_amount}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            this.setState({ exact_amount: true });
                                          } else {
                                            this.setState({ exact_amount: false });
                                          }
                                        }}
                                      />{" "}
                                  Exact Amount
                                  <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-group col-md-4 mar-b-no">
                                    <label className="fw-sbold">Date</label>
                                    <div className="input-group w-100">
                                      {!this.state.exact_date && (
                                        <>
                                          <div
                                            className="input-group date mar-t-no"
                                            data-date-format="dd/mm/yyyy"
                                            onClick={() =>
                                              window
                                                .jQuery(".input-group.date")
                                                .datepicker({
                                                  format: "dd/mm/yyyy",
                                                })
                                            }
                                          >
                                            <input
                                              id="from_date"
                                              value={this.state.from_date}
                                              onBlur={() => this.changeDate1()}
                                              placeholder="From"
                                              type="text"
                                              className="w-100 form-control"
                                            />
                                            <div className="input-group-addon">
                                              <img
                                                src="images/calendar-icon.svg"
                                                alt="icon"
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="input-group date mar-t-no"
                                            data-date-format="dd/mm/yyyy"
                                            onClick={() =>
                                              window
                                                .jQuery(".input-group.date")
                                                .datepicker({
                                                  format: "dd/mm/yyyy",
                                                })
                                            }
                                          >
                                            <input
                                              id="to_date"
                                              placeholder="To"
                                              type="text"
                                              className="w-100 form-control"
                                              value={this.state.to_date}
                                              onBlur={() => this.changeDate2()}
                                            />
                                            <div className="input-group-addon">
                                              <img
                                                src="images/calendar-icon.svg"
                                                alt="icon"
                                              />
                                            </div>
                                          </div>
                                        </>
                                      )}
                                      {this.state.exact_date && (
                                        <div
                                          className="input-group date mar-t-no"
                                          data-date-format="dd/mm/yyyy"
                                          onClick={() =>
                                            window
                                              .jQuery(".input-group.date")
                                              .datepicker({ format: "dd/mm/yyyy" })
                                          }
                                        >
                                          <input
                                            id="exact_date"
                                            onBlur={() => this.changeDate3()}
                                            placeholder="Exact Date"
                                            type="text"
                                            className="w-100 form-control"
                                            value={this.state.exact_dat}
                                          />
                                          <div className="input-group-addon">
                                            <img
                                              src="images/calendar-icon.svg"
                                              alt="icon"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <label className="custom-checkbox small">
                                      <input
                                        type="checkbox"
                                        name="exact"
                                        checked={this.state.exact_date}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            this.setState({ exact_date: true });
                                          } else {
                                            this.setState({ exact_date: false });
                                          }
                                        }}
                                      />{" "}
                                  Exact Date
                                  <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-group col-md-4 col-xs-12 mar-b-no">
                                    <label>Status</label>
                                    <div className="custom-select-drop dropdown">
                                      <select
                                        className="selectpicker form-control add-new"
                                        data-live-search="true"
                                        title="Choose"
                                        value={this.state.status}
                                        onChange={(e) => {
                                          this.setState({ status: e.target.value });
                                          setTimeout(() => {
                                            this.get_all_account_statements();
                                          }, 1000);
                                        }}
                                      >
                                        <option value="">choose...</option>
                                        <option value="1">Reconciled</option>
                                        <option value="0">Unreconciled</option>
                                      </select>
                                      {/* <a
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    role="button"
                                    data-toggle="dropdown"
                                    className="dropdown-toggle btn form-control w-auto"
                                    href="javascript:;"
                                  >
                                    <span id="selected">Choose</span>
                                    <span className="caret" />
                                  </a>
                                  <ul className="dropdown-menu align-right">
                                    <li className="active">
                                      <a href="javascript:;">Choose</a>
                                    </li>
                                    <li>
                                      <a href="javascript:;">Reconcilied</a>
                                    </li>
                                    <li>
                                      <a href="javascript:;">Unreconcilied</a>
                                    </li>
                                  </ul> */}
                                    </div>
                                  </div>
                                  <div className="form-group col-md-12 col-xs-12 text-right mar-b-no">
                                    <button
                                      className="btn btn-lightgray btn-align"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        this.setState({
                                          search_key: "",
                                          exact_amount: false,
                                          maximum: "",
                                          minimum: "",
                                          exact_date: false,
                                          from_date: "",
                                          to_date: "",
                                          status: "",
                                          excact: "",
                                          exact_dat: "",
                                        });
                                        setTimeout(() => {
                                          this.get_all_account_statements();
                                        }, 1000);
                                      }}
                                    >
                                      Clear
                                </button>
                                    <button className="btn btn-green btn-align">
                                      Search
                                </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div className="report-table reconcile-table col-md-12 col-xs-12 pad-no">
                              <div className="table-responsive">
                                <table className="table detail-report">
                                  <thead>
                                    <tr>
                                      <th>
                                        <label className="custom-checkbox small">
                                          <input type="checkbox" name="all" />
                                      &nbsp;
                                      <span className="checkmark" />
                                        </label>
                                      </th>
                                      <th>
                                        Date
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th>
                                        No#
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th>
                                        Name
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th className="memo">
                                        Reference
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th className="text-right">
                                        Credit (Money Out)
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      <th className="text-right">
                                        Debit(Money In)
                                    <i className="th-sort">
                                          <img
                                            src="images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      {/* <th className="text-right">
                                  Balance
                                  <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                </th> */}
                                      <th>
                                        <span className="sr-only">Status</span>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.accountList.map((item) => {
                                      return (
                                        <tr>
                                          <td>
                                            <label className="custom-checkbox small">
                                              <input type="checkbox" name="all" />
                                          &nbsp;
                                          <span className="checkmark" />
                                            </label>
                                          </td>
                                          <td>
                                            {moment(item.payment_date).format(
                                              "DD/MM/YYYY"
                                            )}
                                          </td>
                                          <td>{item.id}</td>
                                          <td>{item.name}</td>
                                          <td>{item.reference_number}</td>
                                          <td className="text-right pad-r-25">
                                          {item.credit}
                                      </td>
                                          <td className="text-right pad-r-25">
                                            {item.debit}
                                          </td>

                                          {/* <td className="text-right pad-r-25">8,315.64</td> */}
                                          {item.is_bank_reconcile === 1 ? (
                                            <td>
                                              <span className="badge green">
                                                Reconciled
                                          </span>
                                            </td>
                                          ) : (
                                              <td>
                                                <span className="badge orange">
                                                  Unreconciled
                                          </span>
                                              </td>
                                            )}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                              {/* <div className="col-md-12 col-xs-12 pad-no mar-top pagination-sec">
                          <p className="fw-med pull-left">Showing - 10 of 40 items</p>
                          <div className="pull-right pagination-wrap">
                            <ul className="pagination">
                              <li className="active"><a href="javascript:;">01</a></li>
                              <li><a href="javascript:;">02</a></li>
                              <li><a href="javascript:;">03</a></li>
                              <li><a href="javascript:;">04</a></li>
                              <li><a href="javascript:;" className="btn">Next</a></li>
                            </ul>
                          </div>
                        </div> */}
                            </div>
                            <div className="invoice-form">
                              <div className="pf-btm-wrap">
                                <div className="col-md-12 col-xs-12 text-right pad-no">
                                  {/* <p className="selected-no">6 transactions selected</p> */}
                                  <button className="btn btn-lightgray mar-rgt-5">
                                    Uncheck
                              </button>
                                  <button className="btn btn-red mar-rgt-5">Delete</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* Main Content Ends here */}
              </div>
              {/* MainContent Wrapper Ends here */}
            </div>
          </div>
          {/* Main Wrapper Ends here */}
          {/* footer Starts here */}
          <footer className="container-fluid">
            <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
          </footer>
          {/* footer Ends here */}
          {/* Find and Match Starts here */}
          <div className="dark-overlay" />
          <div className="find-match-sec create-match">
            <div className="col-md-12 col-xs-12 reconcile-sticky">
              <div className="reconcile-body pad-no">
                <h3 className="col-md-12">Find &amp; Match</h3>
                <a
                  href="javascript:;"
                  className="close-btn"
                  onClick={() => {
                    this.setState({
                      findTotalAmount: 0,
                      selectedFindTotalAmount: 0,
                    });
                    jQuery(".dark-overlay, .find-match-sec").removeClass(
                      "active"
                    );
                    jQuery("body").css("overflow-y", "auto");
                  }}
                >
                  <img
                    className="img-responsive"
                    src="images/close-circle-red.svg"
                  />
                </a>
                <div className="col-md-12 reconcile-item-encl">
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="row reconcile-item">
                      <div className="col-md-6 col-xs-6 pad-l-no">
                        <p>{this.state.selectedItemFind.date}</p>
                        <p>{this.state.selectedItemFind.payee}</p>
                        <p>Ref: {this.state.selectedItemFind.reference}</p>
                        {/* <p className="more"> */}
                        {/* <a href="javascript:;">More</a>
                        <span className="more-detail">
                          <span><strong>Memo:</strong> Lorem ipsum dolor seit</span>
                          <span><strong>Transaction Type:</strong> Direct Deposit</span>
                          <span><strong>Cheque No:</strong> -</span>
                        </span>
                      </p> */}
                      </div>
                      <div className="col-md-3 col-xs-3 pad-l-no text-right">
                        <p>-</p>
                      </div>
                      <div className="col-md-3 col-xs-3 pad-l-no pad-r-no text-right">
                        <p>{this.state.findTotalAmount}</p>
                      </div>
                      <p className="create-rule">
                        <a href="javascript:;">Create Bank Rule</a>
                      </p>
                      <a href="javascript:;" className="remove-item">
                        <img
                          className="img-responsive"
                          src="images/delete-icon.svg"
                          alt="icon"
                        />
                      </a>
                    </div>
                  </div>

                  {this.is_disabled() ? (
                    ""
                  ) : (
                      <>
                        <button className="btn btn-green match-btn">
                          <img
                            className="filter-white"
                            src="images/tick-big.svg"
                            alt="icon"
                          />
                        </button>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <div className="row transact-item">
                            <button
                              className="btn btn-white find-match"
                            // onClick={() => {
                            //   jQuery(".dark-overlay, .find-match-sec").addClass(
                            //     "active"
                            //   );
                            //   jQuery("body").css("overflow-y", "hidden");
                            // }}
                            >
                              Find &amp; Match
                          </button>
                            <ul className="nav nav-tabs">
                              <li className="active">
                                <a
                                  className="match-trans"
                                  data-toggle="tab"
                                  href="#match"
                                >
                                  Match
                              </a>
                              </li>
                              <li>
                                <a
                                  className="create-trans"
                                  data-toggle="tab"
                                // href="#create"
                                >
                                  Create
                              </a>
                              </li>
                            </ul>
                            <div className="tab-content">
                              <div id="match" className="tab-pane fade in active">
                                <div className="row">
                                  <div className="col-md-6 col-xs-6">
                                    <p>{this.state.selectedItemFind.date}</p>
                                    <p>{this.state.selectedItemFind.payee}</p>
                                    <p>
                                      Ref: {this.state.selectedItemFind.reference}
                                    </p>
                                  </div>
                                  <div className="col-md-3 col-xs-3 text-right">
                                    <p>-</p>
                                  </div>
                                  <div className="col-md-3 col-xs-3 text-right">
                                    <p>{this.state.selectedItemFind.debit}</p>
                                  </div>
                                </div>
                              </div>
                              <div id="create" className="tab-pane fade in">
                                <div className="row">
                                  <div className="col-md-12">
                                    <button
                                      className="btn-small btn btn-blue"
                                      onClick={() => {
                                        window
                                          .jQuery("#add_transaction")
                                          .modal("show");
                                      }}
                                    >
                                      <img
                                        className="filter-white mar-rgt-5"
                                        src="images/plus-add.svg"
                                        alt="icon"
                                      />
                                    Add Transactions
                                  </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </div>
            </div>

            <div className="col-md-12 col-xs-12 create-match-body">
              <div className="content-sec">
                <div className="col-md-12 col-xs-12 choose-match">
                  <div className="col-md-12 col-xs-12">
                    <h3>
                      Choose Matching Transaction
                      {/* <button
                        className="btn-small btn btn-blue"
                        onClick={() => {
                          this.get_customerlist();
                          window.jQuery("#add_transaction").modal("show");
                        }}
                      >
                        <img
                          className="filter-white mar-rgt-5"
                          src="images/plus-add.svg"
                          alt="icon"
                        />
                        Add Transactions
                      </button> */}
                    </h3>
                  </div>
                  <form className="custom-form mh col-md-12 mar-btm">
                    <div className="row">
                      <p className="fw-sbold col-md-12">Search by</p>
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          value={this.state.search_name}
                          onChange={(e) =>
                            this.setState({ search_name: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Reference"
                          name="refrence"
                          value={this.state.search_ref}
                          onChange={(e) =>
                            this.setState({ search_ref: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Amount"
                          name="refrence"
                          value={this.state.search_amt}
                          onChange={(e) =>
                            this.setState({ search_amt: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-12 col-xs-12 text-right mar-top">
                        <button
                          className="btn btn-white btn-align"
                          type="button"
                          onClick={() => this.handleClearMatchingItem()}
                        >
                          Clear
                        </button>
                        <button
                          className="btn btn-green btn-align"
                          type="button"
                          onClick={() => this.handleMatchingItem()}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="col-md-12 col-xs-12 mar-top table-responsive">
                    <table className="choose-match-table">
                      <thead>
                        <tr>
                          <th>
                            {/* <label className="custom-checkbox">
                            <input type="checkbox" name="all" />&nbsp;
                            <span className="checkmark" />
                          </label> */}
                          </th>
                          <th>Date</th>
                          <th>Name</th>
                          <th>No#</th>
                          {/* <th className="text-right">Credit (Money Out)</th> */}
                          <th className="text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.findMatchingItems.map((item, i) => {
                          if (
                            this.state.DebOrCr == 1 &&
                            item.type === "customer"
                          ) {
                            return (
                              <tr>
                                <td>
                                  <label className="custom-checkbox">
                                    <input
                                      type="checkbox"
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          console.log(
                                            "check",
                                            this.state.selectedFindTotalAmount
                                          );
                                          this.state.selectedfindMatchingItemss[
                                            i
                                          ] = item;
                                          this.setState({
                                            selectedFindTotalAmount:
                                              this.state
                                                .selectedFindTotalAmount +
                                              item.total_payment_foreign_currency,
                                          });
                                        } else {
                                          console.log(
                                            "check",
                                            this.state.selectedFindTotalAmount
                                          );
                                          this.state.selectedfindMatchingItemss[
                                            i
                                          ] = "";
                                          this.setState({
                                            selectedFindTotalAmount:
                                              this.state
                                                .selectedFindTotalAmount -
                                              item.total_payment_foreign_currency,
                                          });
                                        }
                                      }}
                                      name={`match_item${i}`}
                                      id={`match_item${i}`}
                                    />
                                    &nbsp;
                                    <span className="checkmark" />
                                  </label>
                                </td>
                                <td>{item.created_date}</td>
                                <td>{item.name}</td>
                                <td>{item.reference_number}</td>
                                {/* <td className="text-right">--</td> */}
                                <td className="text-right">
                                  {item.total_payment_foreign_currency}
                                </td>
                              </tr>
                            );
                          }
                          if (
                            this.state.DebOrCr == 0 &&
                            item.type == "vendor"
                          ) {
                            return (
                              <tr>
                                <td>
                                  <label className="custom-checkbox">
                                    <input
                                      type="checkbox"
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          console.log(
                                            "check",
                                            this.state.selectedFindTotalAmount
                                          );
                                          this.state.selectedfindMatchingItemss[
                                            i
                                          ] = item;
                                          this.setState({
                                            selectedFindTotalAmount:
                                              this.state
                                                .selectedFindTotalAmount +
                                              item.total_payment_foreign_currency,
                                          });
                                        } else {
                                          console.log(
                                            "check",
                                            this.state.selectedFindTotalAmount
                                          );
                                          this.state.selectedfindMatchingItemss[
                                            i
                                          ] = "";
                                          this.setState({
                                            selectedFindTotalAmount:
                                              this.state
                                                .selectedFindTotalAmount -
                                              item.total_payment_foreign_currency,
                                          });
                                        }
                                      }}
                                      name={`match_item${i}`}
                                      id={`match_item${i}`}
                                    />
                                    &nbsp;
                                    <span className="checkmark" />
                                  </label>
                                </td>
                                <td>{item.created_date}</td>
                                <td>{item.name}</td>
                                <td>{item.reference_number}</td>
                                {/* <td className="text-right">--</td> */}
                                <td className="text-right">
                                  {item.total_payment_foreign_currency}
                                </td>
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* <div className="col-md-12 col-xs-12 pagination-sec">
                  <p className="fw-med pull-left">Showing - 10 of 40 items</p>
                  <div className="pull-right pagination-wrap">
                    <ul className="pagination">
                      <li className="active"><a href="javascript:;">01</a></li>
                      <li><a href="javascript:;">02</a></li>
                      <li><a href="javascript:;">03</a></li>
                      <li><a href="javascript:;">04</a></li>
                      <li><a href="javascript:;" className="btn">Next</a></li>
                    </ul>
                  </div>
                </div> */}

                  <div className="col-md-12 col-xs-12 match-footer">
                    <h4>
                      Transactions must match the money received. Make
                      adjustments, as needed.
                      <a
                        href="javascript:;"
                        className="adjustment"
                        onClick={(e) => {
                          e.preventDefault();
                          jQuery(".adjust-form").slideToggle(200);
                        }}
                      >
                        Adjustments
                      </a>
                    </h4>
                    <div className="match-subtotal">
                      <div className="row">
                        <p className="col-md-6 col-xs-6">Sub Total</p>
                        <p className="col-md-6 col-xs-6 text-right fw-sbold">
                          {" "}
                          {this.state.selectedFindTotalAmount}{" "}
                        </p>
                      </div>
                      <div className="row adjust-form">
                        <p className="col-md-6 col-sm-6 col-xs-12 mar-b-no">
                          Adjustments
                        </p>
                        <form className="custom-form col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group col-md-4 col-sm-6 col-xs-6">
                            <select
                              className="form-control add-new"
                              data-live-search="true"
                              title="Choose Account"
                              value={this.state.adjustment_account}
                              onChange={(e) =>
                                this.setState({
                                  adjustment_account: e.target.value,
                                })
                              }
                            >
                              <option value={""}>choose account </option>
                              {this.state.default_category_list &&
                                this.state.default_category_list.map(
                                  (item, i) => {
                                    return (
                                      <option value={item.id}>
                                        {" "}
                                        {item.name}{" "}
                                      </option>
                                    );
                                  }
                                )}
                            </select>
                          </div>
                          <div className="form-group col-md-4 col-sm-6 col-xs-6">
                            <input
                              className="form-control"
                              placeholder="description"
                              onChange={(e) =>
                                this.setState({ description: e.target.value })
                              }
                              type="text"
                              name
                            />
                          </div>
                          <div className="form-group col-md-4 col-sm-6 col-xs-6">
                            <input
                              className="form-control"
                              placeholder="amount"
                              onChange={(e) =>
                                this.setState({ adjustment: e.target.value })
                              }
                              type="text"
                              name
                            />
                          </div>
                          {/* <div className="form-group col-md-4 col-sm-6 col-xs-6">
                          <div className="custom-select-drop dropdown inline">
                            <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                              <span id="selected">DBS Bank</span><span className="caret" />
                            </a>
                            <ul className="dropdown-menu">
                              <li className="active"><a href="javascript:;">DBS Bank</a></li>
                              <li><a href="javascript:;">Bank Account 1</a></li>
                              <li><a href="javascript:;">Bank Account 2</a></li>
                              <li><a href="javascript:;">Bank Account 3</a></li>
                            </ul>
                          </div>
                        </div> */}
                          <a href="javascript:;" className="remove-item">
                            <img
                              className="img-responsive"
                              src="images/delete-icon.svg"
                              alt="icon"
                            />
                          </a>
                        </form>
                      </div>
                      <div className="total">
                        <div className="row">
                          <p className="col-md-6 col-xs-6 fw-sbold">Total</p>
                          <p className="col-md-6 col-xs-6 text-right fw-sbold">
                            {this.state.selectedFindTotalAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-xs-12 total-btm">
              <div className="pull-left">
                <span className="total-snip green">
                  Must Match: {this.state.findTotalAmount}
                </span>
                <p class="red">
                  Total is out by :
                  {this.is_disabled() === false
                    ? 0
                    : this.state.findTotalAmount -
                    (Number(this.state.selectedFindTotalAmount) +
                      Number(this.state.adjustment))}
                </p>
              </div>
              <div className="pull-right">
                <button className="btn btn-white btn-align" type="button">
                  Cancel
                </button>
                <button
                  className="btn btn-green btn-align"
                  type="button"
                  disabled={this.is_disabled()}
                  onClick={() => this.findReconcileSubmit()}
                >
                  Reconcile
                </button>
              </div>
            </div>
          </div>

          <div className="modal fade pop-modal" id="add_new_role" role="dialog">
            <div className="modal-dialog modal-md ">
              <button
                type="button"
                className="close hidden-xs"
                data-dismiss="modal"
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
                        />
                        <div style={{ float: "left" }}></div>{" "}
                      </div>
                    </div>

                    <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                      <button
                        className="btn btn-lightgray"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <span>{"   "}</span>
                      <input type="hidden" id="colid" />

                      {/* <button
                        className="btn btn-green"
                        type="button"
                        onClick={() => {
                          const userId = Number(THIS.state.logged_user_id);
                          const coulmnId = Number(jQuery("#colid").val());
                          const localString = jQuery("#options").val();
                          const optionsArray = localString.split(",");
                          var items = this.state.number_of_columns_list;
                          var exist = items[coulmnId].options;
                          var options = [...exist, ...optionsArray];
                          items[coulmnId]["options"] = options;

                          var coreData = {
                            user_id: this.state.logged_user_id,
                            columns: items,
                          };

                          FetchAllApi.upDateCoulmns(
                            coreData,
                            (err, response) => {
                              console.log("new document", response.message);
                              alert(response.message);
                              if (response.status === 1) {
                                this.getColumns();
                                jQuery("#options").val("");
                                window.jQuery("#add_new_role").modal("hide");
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
                        }}
                      >
                        Save
                      </button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* add transaction modal */}

          <div className="modal fade pop-modal" id="add_transaction" role="dialog">
            <div className="modal-dialog modal-md">
              {/* Modal content*/}
              <button
                type="button"
                className="close hidden-xs"
                data-dismiss="modal"
              >
                <img
                  className="img-responsive"
                  src="images/close-red.svg"
                  alt="icon"
                />
              </button>
              <div className="modal-content">
                <div className="modal-body text-center">
                  <h3>Add Transaction</h3>
                  <form className="custom-form row">
                    {/* <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Customer</label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <select
                          className="selectpicker form-control add-new"
                          data-live-search="true"
                          title="Choose customer"
                          id="customer_id"
                          name="customer_id"
                          onChange={(e) => {
                            this.setState({ customer_id: e.target.value });
                          }}
                        >
                          {this.state.customer_list &&
                            this.state.customer_list.map((item) => {
                              if (
                                this.state.customer_id != undefined &&
                                this.state.customer_id != null &&
                                this.state.customer_id != "" &&
                                item.id == this.state.customer_id
                              ) {
                                var selected = true;
                              } else {
                                var selected = false;
                              }
                              return (
                                <option
                                  selected={selected}
                                  value={item.id}
                                  data-status={item.id}
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Reference</label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          id="trans_ref"
                          name="trans_ref"
                          value={this.state.trans_ref}
                          onChange={(e) =>
                            this.setState({ trans_ref: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Account</label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <select
                          className="selectpicker form-control add-new"
                          data-live-search="true"
                          title="Choose customer"
                          id="category_id"
                          name="category_id"
                          onChange={(e) => {
                            this.setState({ category_id: e.target.value });
                          }}
                        >
                          {this.state.default_category_list &&
                            this.state.default_category_list.map((item) => {
                              return (
                                <option
                                  // selected={selected}
                                  value={item.id}
                                  data-status={item.id}
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                   */}
                    <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-top">
                      <button
                        className="btn btn-blue mar-rgt-5"
                        data-dismiss="modal"
                        onClick={() => {

                          if (this.state.DebOrCr == 1) {
                            this.props.history.push("/make_deposit", [this.state.selectedBankId, this.state.selectedBankCurrency, this.state.pass_amount, this.state.passid])
                            // window.open("make_deposit", "_blank")
                          } else {
                            this.props.history.push("/write_cheque", [this.state.selectedBankId, this.state.selectedBankCurrency, this.state.pass_amount, this.state.passid])
                            // window.open("write_cheque", "_blank")
                          }
                        }
                        }
                      >
                        {this.state.DebOrCr == 1 ? 'To Deposit' : "To Write Check"}

                      </button>
                      <button
                        className="btn btn-blue mar-top-xs"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => {
                          if (this.state.DebOrCr == 1) {
                            this.props.history.push("/Customer_receive_payment", [this.state.selectedBankId, this.state.selectedBankCurrency, this.state.pass_amount, this.state.passid])
                            // window.open("Customer_receive_payment", "_blank")

                          } else {
                            this.props.history.push("/vendor_bill_payment", [this.state.selectedBankId, this.state.selectedBankCurrency, this.state.pass_amount, this.state.passid])
                            // window.open("vendor_bill_payment", "_blank")

                          }
                        }
                        }
                      >
                        {this.state.DebOrCr == 1 ? 'To Customer Receive Payment' : "To Vendor Bill Payment"}
                      </button>
                      <span>{"   "}</span>
                      <input type="hidden" id="colid" />

                      {/* <button
                        className="btn btn-green"
                        type="button"
                        onClick={() => {
                          const userId = Number(THIS.state.logged_user_id);
                          const coulmnId = Number(jQuery("#colid").val());
                          const localString = jQuery("#options").val();
                          const optionsArray = localString.split(",");
                          var items = this.state.number_of_columns_list;
                          var exist = items[coulmnId].options;
                          var options = [...exist, ...optionsArray];
                          items[coulmnId]["options"] = options;

                          var coreData = {
                            user_id: this.state.logged_user_id,
                            columns: items,
                          };

                          FetchAllApi.upDateCoulmns(
                            coreData,
                            (err, response) => {
                              console.log("new document", response.message);
                              alert(response.message);
                              if (response.status === 1) {
                                this.getColumns();
                                jQuery("#options").val("");
                                window.jQuery("#add_new_role").modal("hide");
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
                        }}
                      >
                        Save
                      </button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Find and Match Ends here */}
          {/* Modal Wrapper Starts here */}
          <div className="modal fade" id="deleteModal" role="dialog">
            <div className="modal-dialog modal-md">
              {/* Modal content*/}
              <button
                type="button"
                className="close hidden-xs"
                data-dismiss="modal"
              >
                <img
                  className="img-responsive"
                  src="images/close-red.svg"
                  alt="icon"
                />
              </button>
              <div className="modal-content">
                <div className="modal-body text-center success-modal">
                  <div className="pop-icon">
                    <img
                      className="w-100"
                      src="images/delete-icon.svg"
                      alt="icon"
                    />
                  </div>
                  <h3>Are you sure?</h3>
                  <p>
                    you want to delete this statement line? <br />
                    This will change your statement balance in Genie
                  </p>
                  <p className="bg-content">
                    Generally this is only required to remove duplicate
                    statement lines.
                  </p>
                  <div className="btn-sec pad-no mar-b-no">
                    <button className="btn btn-lightgray">Cancel</button>
                    <button className="btn btn-red">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal Wrapper Ends here */}
          {/* Modal Wrapper Starts here */}
          <div className="modal pop-modal fade" id="splitModal" role="dialog">
            <div className="modal-dialog modal-md">
              {/* Modal content*/}
              <button
                type="button"
                className="close hidden-xs"
                data-dismiss="modal"
              >
                <img
                  className="img-responsive"
                  src="images/close-red.svg"
                  alt="icon"
                />
              </button>
              <div className="modal-content">
                {this.state.ReConcileList &&
                  this.state.ReConcileList.map((item, i) => {
                    // console.log(
                    //   "ufagsisad",
                    //   this.state[`split_array${this.state.split}`],
                    //   "sdfs",
                    //   this.state.split
                    // );
                    if (i === this.state.split) {
                      return (
                        <div className="modal-body">
                          <h3>Split</h3>
                          <form className="custom-form row">
                            <div className="form-group col-md-12 col-xs-12">
                              <p className="mar-b-no">
                                <span className="fw-sbold">Date:</span>{" "}
                                {item.date}
                              </p>
                            </div>
                            <div className="form-group col-md-6">
                              <p className="mar-b-no">
                                <span className="fw-sbold">Payee:</span>{" "}
                                {item.payee}
                              </p>
                            </div>
                            <div className="form-group inline col-md-6">
                              <label>No#</label>
                              <input
                                type="text"
                                className="form-control"
                                value={this.state[`no${i}`]}
                                onChange={(e) =>
                                  this.setState({ [`no${i}`]: e.target.value })
                                }
                                name
                              />
                            </div>
                            <div className="table-responsive col-md-12">
                              <table className="invoice-item-table rule-table">
                                <thead>
                                  <tr>
                                    <th>Memo</th>
                                    <th>Account</th>
                                    <th>Tax</th>
                                    <th className="text-right">Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state[
                                    `split_array${this.state.split}`
                                  ] &&
                                    this.state[
                                      `split_array${this.state.split}`
                                    ].map((a, b) => {
                                      return (
                                        <tr>
                                          <td style={{ width: "40%" }}>
                                            <textarea
                                              className="form-control"
                                              rows={1}
                                              placeholder="memo"
                                              name="split_memo"
                                              value={a.split_memo}
                                              onChange={this.handleSplit(b)}
                                            />
                                          </td>
                                          <td>
                                            <select
                                              className="form-control add-new"
                                              data-live-search="true"
                                              title="Choose"
                                              name="split_account"
                                              value={a.split_account}
                                              onChange={this.handleSplit(b)}
                                            >
                                              <option value="1e">
                                                Choose{" "}
                                              </option>
                                              {this.state
                                                .default_category_list &&
                                                this.state.default_category_list.map(
                                                  (item, i) => {
                                                    return (
                                                      <option value={item.id}>
                                                        {" "}
                                                        {item.name}{" "}
                                                      </option>
                                                    );
                                                  }
                                                )}
                                            </select>
                                          </td>
                                          <td>
                                            <select
                                              className="form-control add-new"
                                              data-live-search="true"
                                              title="Choose"
                                              name="split_tax"
                                              value={a.split_tax}
                                              onChange={this.handleSplit(b)}
                                            >
                                              <option value="1e">
                                                Choose{" "}
                                              </option>
                                              {this.state.gst_list &&
                                                this.state.gst_list.map(
                                                  (a, b) => {
                                                    return (
                                                      <option value={a.id}>
                                                        {a.sales_tax_name}
                                                      </option>
                                                    );
                                                  }
                                                )}
                                            </select>
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              name="total"
                                              className="form-control text-right"
                                              placeholder="00.00"
                                              name="split_amount"
                                              value={a.split_amount}
                                              onChange={this.handleSplit(b)}
                                            />
                                            <div className="action-wrap">
                                              <a
                                                onClick={(e) => {
                                                  this.deleteSplit(b);
                                                }}
                                                href="javascript:;"
                                                className="del-row"
                                              >
                                                <img
                                                  className="img-responsive"
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
                              <div className="form-group col-md-12 mar-b-no pad-no">
                                <a
                                  href="javascript:;"
                                  className="add-input"
                                  onClick={() => {
                                    let array = this.state[`split_array${i}`];
                                    array.push({
                                      split_memo: "",
                                      split_account: "",
                                      split_tax: "",
                                      split_amount: "",
                                    });
                                    this.setState({
                                      [`split_array${i}`]: array,
                                    });
                                  }}
                                >
                                  Add New Line
                                </a>
                                <span className="total">
                                  Total: {this.total()}
                                </span>
                                <p class="red">
                                  Total is out by :
                                  {(item.credit + item.debit).toFixed(2) -
                                    this.total()}
                                </p>
                              </div>
                            </div>
                          </form>
                          <div className="btn-sec pad-no mar-b-no text-center">
                            <hr />
                            <button
                              className="btn btn-lightgray"
                              data-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              data-dismiss="modal"
                              onClick={() => this.reconcile()}
                              type="button"
                              disabled={
                                (item.credit + item.debit).toFixed(2) ==
                                  this.total()
                                  ? false
                                  : true
                              }
                              className="btn btn-green"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default BankReconcileMatch;
