import React from 'react'
import LeftSidebar from './left_sidebar'
import Footer from '.././components/footer'
import Topbar from './topbar'
import Comma from './comma'
import moment from 'moment'
import FetchAllApi from '../api_links/fetch_all_api'
import { datatagging_save, get_invoiceDetails, getAllCompanycoords,savedatatagingcoordsdraft, getInvoiceId, getInvoiceIds } from '../api_links/api_links'
// import request from 'superagent'
import jQuery from 'jquery'
// import DatePicker from 'react-date-picker'
import Cropper from 'cropperjs'
//npm i react-date-picker
//import Jcrop from 'jquery-jcrop';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { ToWords } from "to-words";
import CoulmnRearrage from "../components/coulmn_rearrange";
// import { zIndex } from 'html2canvas/dist/types/css/property-descriptors/z-index'
import config from "./../api_links/api_links";
var _ = require("lodash");
const toWords = new ToWords();
var authorization_key = "O5mGIP3VNia0JvPH2IBiwA==";

class data_tagging extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      crop: {},
      tablerows: [],
      reference: "",
      third_party_account_list: [],
      payment_method: "",
      payment_desc: '',
      vendor_payment_account_type: [],
      amount_in_words: "",
      paymentexchangerate: "",
      payment_method_list: [],
      paymentdate: "",
      isThirdpartyEssenstial: false,
      payment_amount: "",
      isChecked: false,
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      comingFrom: localStorage.getItem("comingFrom"),
      processed: localStorage.getItem("processed"),
      check_void: localStorage.getItem("check_void") ? localStorage.getItem("check_void") : '',
      date_format: localStorage.getItem("date_format") ? localStorage.getItem("date_format") : "DD/MM/YYYY",
      
      country_sortname: localStorage.getItem("country_sortname"),
      language_code: localStorage.getItem("language_code"),
      home_currency_symbol: localStorage.getItem("home_currency_symbol"),
      home_currency: localStorage.getItem("home_currency"),

      // get_file_path: [],
      get_file_path: '',
      // get_file_path: 'https://api.genie.com.sg/documents/2021-05-05/test1.pdf',
      // get_file_path: "https://api.genie.com.sg/documents/2021-05-05/converted_png_1620217741375-$$$$MX-M464N_20210503_200632-1.png",

      add_cmnt_msg: "",
      file_comments: [],
      list_id: this.props.match.params.list_id,
      is_called: false,
      sub_comments: [],
      checkSubComments: false,
      clickedParentId: null,
      attachment_file: [],
      attachment_file_jquery: [],
      attachment_file_length: 0,
      attachment_fileName: [],
      currencies: [],
      item_total_home_currency: "",
      tax_amount_foreign_currency: "",
      grand_total_foreign_currency: "",
      grand_total_home_currency: "",
      item_total_foreign_currency: "",
      ToCurrency: "",
      company_name: "",
      invoice_no: "",
      incorport_date: "2019-04-12",
      address: "",
      account_category: "",
      exchange_value: "",
      rows: ["row 1"],
      coulmns: [],
      myarray: [],
      isTax: true,
      default_category_list: [],
      number_of_columns_list: [],
      selected: "",
      selectedindex: "",
      balancesheetlist: [],
      balance_list_selected: "",
      changeme: "",
      date: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(),
      balance_sheet_category_name: "",
      balance_sheet_category_id: "",
      categorylist: [],
      sub_categorylist: [],
      categoryname: "",
      sub_categoryname: "Choose sub category",
      category_id: "",
      sub_category_id: "",
      Accounttype: [],
      Account_type_name: "",
      Account_type_id: "",
      Currency_name: "",
      account_name: "",
      isAdd: false,
      search_key: "",
      currency_clone: [],
      showAddmore: false,
      isClose: false,
      isClose1: false,
      invoiceNumber: false,
      gst_list: [],
      sales_tax_name: "Zero-rated supplies",
      sales_tax_rate: 0,
      sales_tax_type: 1,
      search_key_gst: "",
      selected_rate_type: "%",
      maximum_chr_lngth: 4,
      sales_tax_code: "",
      rate_entered: "",
      salesTax_name_entered: "",
      modal_info_msg: "",
      show_succes: false,
      rate_type: 1,
      coulmn_header: [],
      selectedOption: "option2",
      selectedColumnType: "",
      columnId: "",
      initial_value: 0,
      specific_id_delete: "",
      isCompany_name: true,
      isInvoice_no: true,
      isBalance_sheet_category_name: true,
      isTable_notEmpty: false,
      showme: false,
      combinedArray: [],
      convertedImageDAta3: "",
      number_of_columns_list: [],
      isEditCol: false,
      SubAccountList: [],
      template_type: "1",
      cus_rate_rate: "",
      balanceSheetCategeory: "",
      dueDate: "",
      dueDateReal: "",
      editData: false,
      invoice_idl: "",
      update: false,
      invoice_id: "",
      third_party_id: "",
      payment_id: "",
      third_party_type: 0,
      clientHomeCurrency: "",
      // new table data
      appliedhom: 0,
      appliedfor: 0,
      forbaldue: 0,
      homebaldue: 0,
      exchangeGain: 0,
      category_rows: [],
      payment_exchange_rate: '',
      handlecheckCompany: false,
      data_tagging_done: false,
      item_coordinate: '',
      description_coordinate: '',
      coming_from_bill: 'no',
      bill_to_credit: false,
      message: '',
      undo_value: '',
      undo_value_name: '',
      exchangeRateApiResult: [],
      // loading: true,
      is_void: false,
      payement_table: [],
      file_id: '',
      // list_id: '',
      // cloud: false,
      invoice_details_data: {},
      // file_path_array: [],
      file_path_array: [
        // {
        //   file_id: 183,
        //   file_path: "https://api.genie.com.sg/documents/2021-05-05/converted_png_1620217741375-$$$$MX-M464N_20210503_200632-1.png"
        // },
        // {
        //   file_id: 184,
        //   file_path: "https://api.genie.com.sg/documents/2021-05-05/converted_png_1620217741375-$$$$MX-M464N_20210503_200632-2.png"
        // },
        // {
        //   file_id: 185,
        //   file_path: "https://api.genie.com.sg/documents/2021-05-05/converted_png_1620217741375-$$$$MX-M464N_20210503_200632-3.png"
        // },
        // {
        //   file_id: 186,
        //   file_path: "https://api.genie.com.sg/documents/2021-05-05/converted_png_1620217741375-$$$$MX-M464N_20210503_200632-4.png"
        // },
        // {
        //   file_id: 187,
        //   file_path: "https://api.genie.com.sg/documents/2021-05-05/converted_png_1620217741375-$$$$MX-M464N_20210503_200632-5.png"
        // }
      ],
      div: 0,

      continueButton: false,
      con1: false,
      con2: false,
      con3: false,
      row1: 0,
      row2: 0,
      row3: 0,

      present_file_id: '',
      tagged_file_ids: [],

      undo_line1: 0,
      undo_line2: 0,
      undo_line3: 0,

      clicked_processed: false,
      type_of_ocr: '',
      description_type: '',
      isNotCompanyMatchedAlready: localStorage.getItem("processed") == "Processed" ? false : true

    };

    this.loadFile = this.loadFile.bind(this);
    this.myDivToFocus = React.createRef();
  }

  tagged_file_ids = () => {
    let { tagged_file_ids, present_file_id } = this.state
    if (!tagged_file_ids.includes(present_file_id)) {
      tagged_file_ids.push(present_file_id)
      this.setState({ tagged_file_ids })
    }
  }

  rename = (obj, curr) => {
    let a = {}
    Object.keys(obj).map((key) => {
      let newKey = key.replace(curr, '')
      Object.assign(a, { [newKey]: obj[key] })
    })
    return a
  }


  change_attachment_to_void = () => {
    let Input = {
      list_id: this.props.match.params.list_id,
      file_id: this.state.present_file_id,
      // file_id: this.props.match.params.file_id,
    }
    FetchAllApi.change_attachment_to_void(Input, (err, response) => {
      if (response.status === 1) {
        alert('this document successfully voided')
        this.props.history.goBack()
      } else {
        alert(response.message)
      }
    });
  };

  onDateChange = () => {
    // alert(jQuery("#date").val())
    let nope

    var date_formated
    let date = jQuery("#dateReal").val();
    if (date != undefined && date != null && date != '') {
      var array = date.split("/");
      date_formated = array[2] + "-" + array[1] + "-" + array[0];
      // console.log('date_formated', date_formated)
      // nope = `https://api.currencylayer.com/historical?access_key=${config.api_key}&date=${date_formated}&source=`
      nope = `https://api.currencylayer.com/historical?access_key=${config.api_key}&date=${date_formated}&source=`

    } else {
      date_formated = 'latest'
      nope = `https://api.currencylayer.com/live?access_key=${config.api_key}&source=`

    }


    // let nope = "https://api.exchangeratesapi.io/" + date_formated + "?base="
    let res = nope.concat(this.state.ToCurrency ? this.state.ToCurrency : "USD");
    fetch(res)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          let newObj = this.rename(data.quotes, this.state.ToCurrency ? this.state.ToCurrency : "USD")
          const currencyAr = [];
          let first = newObj;
          for (const key in first) {
            currencyAr.push(key);
          }
          this.setState({
            currencies: currencyAr, currency_clone: currencyAr, exchangeRateApiResult: first

          });

          setTimeout(() => {
            // alert(this.state.date)
            this.handleChangeItems(0, this.state.rows.length - 1);
          }, 1000);
        }
      });
  }

  componentWillUnmount = () => {
    // alert('unmount')
    localStorage.setItem("vendor_bill", null);
  }

  get_client_home_currency = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.get_client_home_currency(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({
          clientHomeCurrency: response.currency,
        });
        setTimeout(() => {
          this.get_currencies();
        }, 2000);
      } else {
      }
    });
  };

  vendor_list_for_bill = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.vendor_list_for_bill(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({
          vendorNameList: response.list,
        });
      } else {
      }
    });
  };

  update_tagged_item = () => {
    alert(" working ");
    //   let items = {
    //   client_id: this.state.logged_client_id,
    //   item_total_foreign_currency: this.state.item_total_foreign_currency,
    //   tax_amount_home_currency: this.state.tax_amount_home_currency,
    //   grand_total_home_currency: this.state.grand_total_home_currency,
    //   item_total_home_currency: this.state.item_total_home_currency,
    //   tax_amount_foreign_currency: this.state.tax_amount_foreign_currency,
    //   grand_total_foreign_currency: this.state.grand_total_foreign_currency,
    //   currency: this.state.ToCurrency,
    //   exchange_rate: exchange_rate,
    //   type: 1,
    //   list_id: this.props.match.params.list_id,
    //   file_id: this.props.match.params.file_id,
    //   tagged_user_id: this.state.logged_user_id,
    //   invoice_date: selected_date,
    //   company_name: this.state.company_name,
    //   invoice_no: this.state.invoice_no,
    //   invoice_number: this.state.invoice_no,
    //   company_address: this.state.address,
    //   incorport_date: selected_date,
    //   account_category: this.state.account_category,
    //   item_list: this.state.myarray,
    //   // balance_sheet_category: 1,
    //   balance_sheet_category: jQuery("#account_id").val(),
    //   payment_date: moment(this.state.paymentdate).format("YYYY-MM-DD"),
    //   reference: this.state.reference,
    //   amount_in_words: toWords.convert(
    //     Number(this.state.grand_total_home_currency)
    //   ),
    //   payment_method: jQuery("#payment_method").val(),
    //   payment_amount: this.state.payment_amount,
    //   payment_exchange_rate: this.state.exchange_value,
    //   payment_account: this.state.balanceSheetCategeory,
    //   // payment_account: jQuery("#balanceSheetCategeory").val(),
    //   third_account_id: jQuery("#third_account_id").val(),
    //   including_tax: this.state.isChecked,
    //   template_type: this.state.template_type,
    //   due_date: this.state.dueDate,
    // };

    // FetchAllApi.update_tagged_item(items, (err, response) => {
    //   if (response.status === 1) {
    //    alert('bill updated successfully')
    // }})
  };

  onChange = (e) => this.setState({ date: e.target.value });

  handleOnClick = (event) => {
    if (this.myDivToFocus.current) {
      this.myDivToFocus.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  handleoncropchange = (crop) => {
    // console.log('cropon', crop)
    this.setState({ crop: crop });
  };
  // handleoncropcomplete = (crop, pixelCrop) => {
  //   var xr, yr;
  //   var file_path_list1, coval;
  //   file_path_list1 = this.state.get_file_path.toString();
  //   var tmpImg = new Image();
  //   tmpImg.src = file_path_list1;
  //   var orgWidth = tmpImg.width;
  //   var orgHeight = tmpImg.height;
  //   var riw, rih;
  //   riw = jQuery(".ReactCrop__image").width();
  //   rih = jQuery(".ReactCrop__image").height();
  //   var wr, hr;
  //   wr = orgWidth / riw;
  //   hr = orgHeight / rih;
  //   xr = parseInt(crop.x * wr);
  //   var coordinates = [xr, xr1, yr, yr1];
  //   coval = this.state.convertedImageDAta3;
  //   var descval = "";
  //   var temp = "";
  //   coval !== "" &&
  //     coval.result.map((e, i) => {
  //       if (i == 0) {
  //         this.state.tabelData = e.description;
  //       }

  //       let Description = e.description;
  //       if (
  //         ((xr <= e.boundingPoly.vertices[0].x &&
  //           xr1 >= e.boundingPoly.vertices[0].x) ||
  //           (xr <= e.boundingPoly.vertices[1].x &&
  //             xr1 >= e.boundingPoly.vertices[1].x) ||
  //           (xr <= e.boundingPoly.vertices[2].x &&
  //             xr1 >= e.boundingPoly.vertices[2].x) ||
  //           (xr <= e.boundingPoly.vertices[3].x &&
  //             xr1 >= e.boundingPoly.vertices[3].x)
  //         ) &&
  //         ((yr <= e.boundingPoly.vertices[0].y &&
  //           yr1 >= e.boundingPoly.vertices[0].y) ||
  //           (yr <= e.boundingPoly.vertices[1].y &&
  //             yr1 >= e.boundingPoly.vertices[1].y) ||
  //           (yr <= e.boundingPoly.vertices[2].y &&
  //             yr1 >= e.boundingPoly.vertices[2].y) ||
  //           (yr <= e.boundingPoly.vertices[3].y &&
  //             yr1 >= e.boundingPoly.vertices[3].y))
  //       ) {
  //         if (temp === e.boundingPoly.vertices[0].x) {
  //           descval = descval + " " + Description;
  //           temp = e.boundingPoly.vertices[0].x;
  //         } else {
  //           descval = descval + " " + Description;
  //           temp = e.boundingPoly.vertices[0].x;
  //         }
  //       }
  //     });

  //   // alert(descval);
  //   if (descval) {
  //     jQuery("#selectedOCRVALUE").text(descval);
  //     this.state.coordinates = coordinates;
  //     window.jQuery("#add-modal-ocr").modal("show");
  //   }
  // };



  //   getMeta= (url, callback) => {
  //     var img = new Image();
  //     img.src = url;
  //     img.onload = function() { callback(this.width, this.height); }
  // }


  loadImagefirst = (crop) => {
    let data = crop
    var tmpImg = new Image();
    tmpImg.src = this.state.get_file_path.toString();

    var width = tmpImg.width;
    var height = tmpImg.height;

    if (width != 0 && height != 0) {
      this.setState({ width, height })
    }
    this.handleoncropcomplete(data, width ? width : this.state.width, height ? height : this.state.height)

  }

  handleoncropcomplete = (crop, width, height) => {



    // this.getMeta(this.state.get_file_path,callback)


    // console.log('cropcom', this.state.crop)



    // console.log('filepath', this.state.get_file_path)
    // console.log('filepath12', this.state.get_file_path.toString())
    // let crop = this.state.crop



    // let crop = this.state.crop

    var xr, yr;
    var coval;
    // var file_path_list1
    // file_path_list1 = this.state.get_file_path.toString();
    // console.log('filepath1', file_path_list1)

    // var tmpImg = new Image();
    // tmpImg.src = file_path_list1;
    // console.log('filepath2', tmpImg)

    var orgWidth = width          //tmpImg.width;
    var orgHeight = height        //tmpImg.height;

    // console.log('filepath3', orgWidth, orgHeight)

    var riw, rih;
    riw = jQuery(".ReactCrop__image").width();
    rih = jQuery(".ReactCrop__image").height();
    var wr, hr;
    wr = orgWidth / riw;
    hr = orgHeight / rih;
    xr = parseInt(crop.x * wr);
    yr = parseInt(crop.y * hr);
    var xr1 = xr + (crop.width * wr);
    var yr1 = yr + (crop.height * hr);
    var coordinates = [xr, xr1, yr, yr1];
    coval = this.state.convertedImageDAta3;
    var descval = "";
    var temp = "";

    // console.log('cropcom', this.state.convertedImageDAta3)

    // console.log('coordinates', coordinates, 'orgWidth-', orgWidth, 'orgHeight-', orgHeight, 'riw-', riw, 'rih-', rih, 'wr-', wr, 'hr-', hr)


    coval !== "" &&
      coval.result.map((e, i) => {
        if (i == 0) {
          this.state.tabelData = e.description;
        }

        let Description = e.description;


        // console.log('cropdesc', Description)
        // console.log('cropdesc12', xr, 'xr1', xr1, ' e.boundingPoly.vertices[0].x', e.boundingPoly.vertices[0])
        // console.log('cropdesc12', yr, 'yr1', yr1, ' e.boundingPoly.vertices[0].y', e.boundingPoly.vertices[0])



        if (
          ((xr <= e.boundingPoly.vertices[0].x &&
            xr1 >= e.boundingPoly.vertices[0].x) ||
            (xr <= e.boundingPoly.vertices[1].x &&
              xr1 >= e.boundingPoly.vertices[1].x) ||
            (xr <= e.boundingPoly.vertices[2].x &&
              xr1 >= e.boundingPoly.vertices[2].x) ||
            (xr <= e.boundingPoly.vertices[3].x &&
              xr1 >= e.boundingPoly.vertices[3].x)
          ) &&
          ((yr <= e.boundingPoly.vertices[0].y &&
            yr1 >= e.boundingPoly.vertices[0].y) ||
            (yr <= e.boundingPoly.vertices[1].y &&
              yr1 >= e.boundingPoly.vertices[1].y) ||
            (yr <= e.boundingPoly.vertices[2].y &&
              yr1 >= e.boundingPoly.vertices[2].y) ||
            (yr <= e.boundingPoly.vertices[3].y &&
              yr1 >= e.boundingPoly.vertices[3].y))
        ) {
          if (temp === e.boundingPoly.vertices[0].x) {

            descval = descval + " " + Description;
            // console.log('cropif', descval)
            temp = e.boundingPoly.vertices[0].x;
          } else {

            descval = descval + " " + Description;
            // console.log('cropelse', descval)
            temp = e.boundingPoly.vertices[0].x;
          }
        }
      });


    // console.log('cropresult', descval)


    // alert(descval);
    if (descval) {
      jQuery("#selectedOCRVALUE").text(descval);
      this.state.coordinates = coordinates;
      window.jQuery("#add-modal-ocr").modal("show");
    }
  };
  handleCoords = () => {
    if (this.state.convertedImageDAta3 != "") {
      if (this.state.coords && this.state.coords.companyCoordinate != null) {
        var coordinates = this.state.coords.companyCoordinate.split(",");
        var descval = "";
        var temp = "";
        var coval = this.state.convertedImageDAta3;
        coval !== "" &&
          coval.result.map((e, i) => {
            let Description = e.description;
            if (
              coordinates[0] <= e.boundingPoly.vertices[0].x &&
              coordinates[1] >= e.boundingPoly.vertices[0].x &&
              coordinates[2] <= e.boundingPoly.vertices[3].y &&
              coordinates[3] >= e.boundingPoly.vertices[3].y
            ) {
              if (temp === e.boundingPoly.vertices[0].x) {
                descval = descval + " " + Description;
                temp = e.boundingPoly.vertices[0].x;
              } else {
                descval = descval + " " + Description;
                temp = e.boundingPoly.vertices[0].x;
              }
            }
          });
        // alert(descval);
        if (descval != "") {
          //   this.handleIdByName(descval);
          // }
          // if (this.state.newId != '' && this.state.newId != null && descval != '' && descval != null) {
          this.handleCoordsValues(descval);
        } else {
          if (
            (descval === "" && descval === null) ||
            this.state.coords.companyName != descval.trim()
          ) {
            const index = this.state.ids.indexOf(
              this.state.coords.invoiceNumber
            );
            if (this.state.ids.includes(this.state.coords.invoiceNumber)) {
              this.state.ids.splice(index, 1);
              // this.handleInvoiceCordsApi(this.state.ids[0]);
            }
          }
        }
      } else {
        // if( this.state.ids != undefined && this.state.ids.length > 0){
        //   this.handleInvoiceCordsApi(this.state.ids[0]);
        // }
      }
    }
  };

  handleIdByName = (e) => {
    // fetch(get_invoiceDetails, {
    //   method: "GET",

    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     Authorization: authorization_key,
    //   },
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //   });
    // request
    //   .get(getInvoiceId + "?" + "id=" + e)
    //   //.set('Authorization', AuthorizationKey)
    //   .set('Content-Type', 'application/json;charset=UTF-8')
    //   .end((err, result) => {
    //     if (result.text !== '') {
    //       this.setState({
    //         newId: result.text
    //       });
    //     }
    //     // else {
    //     //   if (this.state.coords.invoiceNumber != '' && this.state.coords.invoiceNumber != null) {
    //     //     const index = this.state.ids.indexOf(this.state.coords.invoiceNumber);
    //     //     if (this.state.ids.includes(this.state.coords.invoiceNumber)) {
    //     //       let ids = this.state.ids
    //     //       ids.splice(index, 1);
    //     //       this.handleInvoiceCordsApi(this.state.ids[0]);
    //     //     }
    //     //   }
    //     // }
    //   });
  };

  handleInitialDataTagging = () => {
    // console.log("placecheck4")
    var coval = this.state.convertedImageDAta3;
    // console.log('coval', coval)
    
    fetch(getAllCompanycoords, {
      method: "POST",
      body:JSON.stringify({
        client_id: this.state.logged_client_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      }
     
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          // console.log("placecheck5")
          data.data.forEach(element => {

            this.handleCheckCompanyName(coval, element.name, element.name_coordinates);
          }, this.setState({ loading: false }));
        }
        this.setState({ loading: false })
      });
  }

  handleCoordsValues = (e) => {

    var coval = this.state.convertedImageDAta3;
    fetch(get_invoiceDetails, {
      method: "POST",
      body: JSON.stringify({
        companyName: e,
        client_id: this.state.logged_client_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          if (data.data.length > 0) {



            this.setState({
              data_tagging_done: true, companyName: e, company_name: e,
              // my work
              company_name: data.data[0].name,
              name_coordinate: data.data[0].name_coordinates,
              address: data.data[0].address,
              address_coordinate: data.data[0].address_coordinates,
              invoice_no: data.data[0].invoiceNumber,
              invoice_no_coordinate: data.data[0].invoice_coordinates,
              invoice_date1: data.data[0].date,
              date_coordinate: data.data[0].date_coordinates,
              due_date: data.data[0].due_date,
              due_date_coordinate: data.data[0].due_date_coordinate,
              item_coordinate: data.data[0].item_coordinate,
              description_coordinate: data.data[0].description_coordinate,
              quantity_coordinate: data.data[0].quantity_coordinate,
              unit_price_coordinate: data.data[0].unit_price_coordinate,
              selected: data.data[0].account_category,
              selectedindex: data.data[0].account_category_id,
              myarray: data.data[0].itemlist,
              currency_coordinate: data.data[0].currency_coordinate,

              // my work
            })
            var arr = data.data[0];
            if (arr.invoice_coordinates != null && arr.invoice_coordinates != "") { this.handleInvoiceCoordinate(coval, arr.invoice_coordinates); }

            if (arr.address_coordinates != null && arr.address_coordinates != "") { this.handleAddressCoordinate(coval, arr.address_coordinates); }

            if (arr.due_date_coordinates != null && arr.due_date_coordinates != "") { this.handleDueDateCoordinate(coval, arr.due_date_coordinates); }

            if (arr.date_coordinates != null && arr.date_coordinates != "") { this.handleDateCoordinate(coval, arr.date_coordinates); }

            if (arr.quantity_coordinates != null && arr.quantity_coordinates != "") { this.handleQuantityCoordinate(coval, arr.quantity_coordinates); }

            if (arr.unit_price_coordinates != null && arr.unit_price_coordinates != "") { this.handleUnitPriceCoordinate(coval, arr.unit_price_coordinates); }

            if (arr.currency_coordinate != null && arr.currency_coordinate != "") { this.handleCurrencyCoordinate(coval, arr.currency_coordinate); }


            if (arr.item_coordinates != null && arr.item_coordinates != "") {
              this.handleItemCoordinate(coval, arr.item_coordinates);
            } else {
              if (arr.item != null && arr.item != "") {
                var vals;
                vals = arr.item.trim();
                var res = vals.split(" ");
                var useme = res.length - 1;
                for (var i = 0; i < useme; i++) {
                  var rows = this.state.rows;
                  if (this.state.rows.length < res.length) {
                    rows.push("row" + (this.state.initial_value + 1));
                  }
                  this.setState({
                    isAdd: false,
                    initial_value: this.state.initial_value + 1,
                  });
                  this.setState({ rows: rows }, () => {
                    this.state.rows.forEach((item, i) => {
                      jQuery("#item" + i).val(res[i]);
                    });
                  });
                }
              }
            }
            if (arr.description_coordinates != null && arr.description_coordinates != "" && arr.description_coordinates != undefined
              // && arr.description_type != 'description'
            ) {
              this.handleDescriptionCoordinate(coval, arr.description_coordinates);
            } else {
              if (
                arr.description_coordinates != null && arr.description_coordinates != "" && arr.description_coordinates != undefined &&
                arr.description_type == 'description'
              ) {

                // old code

                // var vals;
                // vals = arr.description.trim();
                // var res = vals.split(" ");
                // var useme = res.length - 1;
                // for (var i = 0; i < useme; i++) {
                //   var rows = this.state.rows;
                //   if (this.state.rows.length < res.length) {
                //     rows.push("row" + (this.state.initial_value + 1));
                //   }
                //   this.setState({
                //     isAdd: false,
                //     initial_value: this.state.initial_value + 1,
                //   });
                //   this.setState({ rows: rows }, () => {
                //     this.state.rows.forEach((item, i) => {
                //       jQuery('#descr' + i).val(res[i])
                //       jQuery('#description' + i).val(res[i])
                //     });
                //   });
                // }

                // old code
              }
            }

            if (arr.account_category_id != null && arr.account_category_id != "") {
              this.setState({ selected: arr.account_category, selectedindex: arr.account_category_id })
            }
            this.setState({ loading: false })
          }
        } else {
          this.setState({ loading: false })
        }
      });


    // request
    //   .get(get_invoiceDetails + "?" + "id=" + this.state.newId)
    //   //.set('Authorization', AuthorizationKey)
    //   .set('Content-Type', 'application/json;charset=UTF-8')
    //   .end((err, result) => {
    //     if (result.body !== null) {
    //       if (result.body.companyName == this.state.coords.companyName) {
    //         this.state.ids = [];
    //         if (this.state.coords.companyCoordinate && this.state.coords.companyCoordinate != null) {
    //           this.handleCompanyCoordinate(coval);
    //         }
    //         if (this.state.coords.invoiceCoordinate && this.state.coords.invoiceCoordinate != null) {
    //           this.handleInvoiceCoordinate(coval);
    //         }
    //         if (this.state.coords.addressCoordinate && this.state.coords.addressCoordinate != null) {
    //           this.handleAddressCoordinate(coval);
    //         }
    //         if (this.state.coords.dateCoordinate && this.state.coords.dateCoordinate != null) {
    //           this.handleDateCoordinate(coval);
    //         }
    //         if (this.state.coords.item_coordinate && this.state.coords.item_coordinate != null) {
    //           this.handleItemCoordinate(coval);
    //         }
    //         if (this.state.coords.description_coordinate && this.state.coords.description_coordinate != null) {
    //           this.handleDescriptionCoordinate(coval)
    //         }
    //         if (this.state.coords.quantity_coordinate && this.state.coords.quantity_coordinate != null) {
    //           this.handleQuantityCoordinate(coval)
    //         }
    //         if (this.state.coords.unit_price_coordinate && this.state.coords.unit_price_coordinate != null) {
    //           this.handleUnitPriceCoordinate(coval)
    //         }
    //       } else {
    //         this.handleInvoiceCordsApi(this.state.ids[0]);
    //       }
    //     }
    //   });
  };

  handleCheckCompanyName = (e, name, coords) => {


    if (this.state.isNotCompanyMatchedAlready) {    // to allow only once


      // console.log('covalcare', e, name, coords)
      var companyCoords = coords.split(",");
      var compVal = "";
      var tempVal = "";
      e !== "" &&
        e.result.map((e, i) => {
          let Description1 = e.description;
          if (
            ((companyCoords[0] <= e.boundingPoly.vertices[0].x &&
              companyCoords[1] >= e.boundingPoly.vertices[0].x) ||
              (companyCoords[0] <= e.boundingPoly.vertices[1].x &&
                companyCoords[1] >= e.boundingPoly.vertices[1].x) ||
              (companyCoords[0] <= e.boundingPoly.vertices[2].x &&
                companyCoords[1] >= e.boundingPoly.vertices[2].x) ||
              (companyCoords[0] <= e.boundingPoly.vertices[3].x &&
                companyCoords[1] >= e.boundingPoly.vertices[3].x)
            ) &&
            ((companyCoords[2] <= e.boundingPoly.vertices[0].y &&
              companyCoords[3] >= e.boundingPoly.vertices[0].y) ||
              (companyCoords[2] <= e.boundingPoly.vertices[1].y &&
                companyCoords[3] >= e.boundingPoly.vertices[1].y) ||
              (companyCoords[2] <= e.boundingPoly.vertices[2].y &&
                companyCoords[3] >= e.boundingPoly.vertices[2].y) ||
              (companyCoords[2] <= e.boundingPoly.vertices[3].y &&
                companyCoords[3] >= e.boundingPoly.vertices[3].y))
          )
          // if (
          //   companyCoords[0] <= e.boundingPoly.vertices[0].x &&
          //   companyCoords[1] >= e.boundingPoly.vertices[0].x &&
          //   companyCoords[2] <= e.boundingPoly.vertices[3].y &&
          //   companyCoords[3] >= e.boundingPoly.vertices[3].y
          // ) 
          {
            if (tempVal === e.boundingPoly.vertices[0].x) {
              compVal = compVal + " " + Description1;
              tempVal = e.boundingPoly.vertices[0].x;
              // console.log('covalcare11', compVal, tempVal)
            } else {
              compVal = compVal + " " + Description1;
              tempVal = e.boundingPoly.vertices[0].x;
              // console.log('covalcare22', compVal, tempVal)
            }
          }
        })
      // console.log('covalcare33', compVal, name)
      if (compVal.trim() === name.trim()) {
        this.setState({ isNotCompanyMatchedAlready: false })
        // alert("Company name matched")
        this.handleCoordsValues(name);
      }


    }

  }


  handleInvoiceCoordinate = (e, coords) => {
    var companyCoords = coords.split(",");
    var compVal = "";
    var tempVal = "";
    e !== "" &&
      e.result.map((e, i) => {
        let Description1 = e.description;
        if (
          companyCoords[0] <= e.boundingPoly.vertices[0].x &&
          companyCoords[1] >= e.boundingPoly.vertices[0].x &&
          companyCoords[2] <= e.boundingPoly.vertices[3].y &&
          companyCoords[3] >= e.boundingPoly.vertices[3].y
        ) {
          if (tempVal === e.boundingPoly.vertices[0].x) {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          } else {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          }
        }
      });
    this.setState({
      invoice_no: compVal,
    });
  };



  handleCurrencyCoordinate = (e, coords) => {
    var companyCoords = coords.split(",");
    var compVal = "";
    var tempVal = "";
    e !== "" &&
      e.result.map((e, i) => {
        let Description1 = e.description;
        if (
          companyCoords[0] <= e.boundingPoly.vertices[0].x &&
          companyCoords[1] >= e.boundingPoly.vertices[0].x &&
          companyCoords[2] <= e.boundingPoly.vertices[3].y &&
          companyCoords[3] >= e.boundingPoly.vertices[3].y
        ) {
          if (tempVal === e.boundingPoly.vertices[0].x) {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          } else {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          }
        }
      });
    this.handleCheck_currency(compVal);
  };

  
  handleAddressCoordinate = (e, coords) => {
    var companyCoords = coords.split(",");
    var compVal = "";
    var tempVal = "";
    e !== "" &&
      e.result.map((e, i) => {
        let Description1 = e.description;
        if (
          companyCoords[0] <= e.boundingPoly.vertices[0].x &&
          companyCoords[1] >= e.boundingPoly.vertices[0].x &&
          companyCoords[2] <= e.boundingPoly.vertices[3].y &&
          companyCoords[3] >= e.boundingPoly.vertices[3].y
        ) {
          if (tempVal === e.boundingPoly.vertices[0].x) {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          } else {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          }
        }
      });
    this.setState({
      address: compVal,
    });
  };

  handleDateCoordinate = (e, coords) => {
    var companyCoords = coords.split(",");
    var compVal = ''
    var tempVal = ''
    e !== "" &&
      e.result.map((e, i) => {
        let Description1 = e.description
        if (
          companyCoords[0] <= e.boundingPoly.vertices[0].x &&
          companyCoords[1] >= e.boundingPoly.vertices[0].x &&
          companyCoords[2] <= e.boundingPoly.vertices[3].y &&
          companyCoords[3] >= e.boundingPoly.vertices[3].y
        ) {
          if (tempVal === e.boundingPoly.vertices[0].x) {
            compVal = compVal + ' ' + Description1
            tempVal = e.boundingPoly.vertices[0].x
          } else {
            compVal = compVal + ' ' + Description1
            tempVal = e.boundingPoly.vertices[0].x
          }
        }
      })

      let vals
      let date = compVal
      let check = date.split('/')
     if(check && check.length == 2){
       vals = moment(date,this.state.date_format).format('DD/MM/YYYY') == 'Invalid date' ? moment(date,"MM/DD/YYYY").format('DD/MM/YYYY')  : moment(date,this.state.date_format).format('DD/MM/YYYY')
      }else{
       vals = moment(date).format('DD/MM/YYYY') == 'Invalid date' ? moment(date).format('DD/MM/YYYY') : moment(date).format('DD/MM/YYYY').replace('-','')
      }
      
    this.setState({
      invoice_date1: vals,
      date: vals
    })
  }

  handleDueDateCoordinate = (e, coords) => {
    var companyCoords = coords.split(",");
    var compVal = ''
    var tempVal = ''
    e !== "" &&
      e.result.map((e, i) => {
        let Description1 = e.description;
        if (
          companyCoords[0] <= e.boundingPoly.vertices[0].x &&
          companyCoords[1] >= e.boundingPoly.vertices[0].x &&
          companyCoords[2] <= e.boundingPoly.vertices[3].y &&
          companyCoords[3] >= e.boundingPoly.vertices[3].y
        ) {
          if (tempVal === e.boundingPoly.vertices[0].x) {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          } else {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          }
        }
      });

      let vals
      let date = compVal
      let check = date.split('/')
     if(check && check.length == 2){
       vals = moment(date,this.state.date_format).format('DD/MM/YYYY') == 'Invalid date' ? moment(date,"MM/DD/YYYY").format('DD/MM/YYYY')  : moment(date,this.state.date_format).format('DD/MM/YYYY')
      }else{
       vals = moment(date).format('DD/MM/YYYY') == 'Invalid date' ? moment(date).format('DD/MM/YYYY') : moment(date).format('DD/MM/YYYY').replace('-','')
      }

    this.setState({
      dueDateReal: vals
    })
  }

  handleItemCoordinate = (e, coords) => {
    var companyCoords = coords.split(",");
    var compVal = ''
    var tempVal = ''
    e !== "" &&
      e.result.map((e, i) => {
        let Description1 = e.description;
        if (
          companyCoords[0] <= e.boundingPoly.vertices[0].x &&
          companyCoords[1] >= e.boundingPoly.vertices[0].x &&
          companyCoords[2] <= e.boundingPoly.vertices[3].y &&
          companyCoords[3] >= e.boundingPoly.vertices[3].y
        ) {
          if (tempVal === e.boundingPoly.vertices[0].x) {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          } else {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          }
        }
      });
    let ocrradio, vals;
    vals = compVal.trim();
    var res = vals.split(" ");
    var useme = res.length - 1;
    for (var i = 0; i < useme; i++) {
      var rows = this.state.rows;
      if (this.state.rows.length < res.length) {
        rows.push("row" + (this.state.initial_value + 1));
      }
      this.setState({
        isAdd: false,
        initial_value: this.state.initial_value + 1,
      });
      this.setState({ rows: rows }, () => {
        this.state.rows.forEach((item, i) => {
          jQuery("#item" + i).val(res[i]);
        });
      });
    }
  };

  handleDescriptionCoordinate = (e, coords) => {
    var companyCoords = coords.split(",");
    var compVal = ''
    var tempVal = ''
    e !== "" &&
      e.result.map((e, i) => {
        if (i == 0) {
          this.state.tabelData = e.description;
        }
        let Description1 = e.description;
        if (
          companyCoords[0] <= e.boundingPoly.vertices[0].x &&
          companyCoords[1] >= e.boundingPoly.vertices[0].x &&
          companyCoords[2] <= e.boundingPoly.vertices[3].y &&
          companyCoords[3] >= e.boundingPoly.vertices[3].y
        ) {
          if (tempVal === e.boundingPoly.vertices[0].x) {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          } else {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          }
        }
      })
    let ocrradio, vals;
    if (this.state.tabelData) {
      let newDes = this.state.tabelData.split("\n");
      vals = compVal.trim();
      var newResut = [];
      newDes.map((res2) => {
        var temp = res2.split(" ");
        if (temp.length > 3) {
          var tempString = res2.substring(
            res2.indexOf(" ") + 1,
            res2.lastIndexOf(" ")
          );
        } else {
          var tempString = res2;
        }
        if (
          tempString != "" &&
          tempString.length > 1 &&
          vals.includes(tempString)
        ) {
          if (res2 != "") {
            newResut.push(res2);
          }
          newResut = newResut.filter(
            (item, index) => newResut.indexOf(item) == index
          );
        }
      });
      var useme = newResut.length;

      // my code 
      var initial_value = Number(this.state.initial_value);
      let n = this.state.row1

      //to arrange file id array
      this.tagged_file_ids()
      //to arrange file id array
      // mycode


      for (var i = n; i < useme + n; i++) {
        var rows = this.state.rows;
        if (this.state.rows.length < useme + n) {
          rows.push("row" + (initial_value + 1));
        }
        initial_value = initial_value + 1 + n;
        this.setState({
          isAdd: false,
          initial_value: initial_value,
        });
        this.setState({ rows: rows, row1: useme + n, undo_line1: n - 1 }, () => {
          this.state.rows.forEach((item, i) => {
            let r = n + i
            jQuery('#descr' + r).val(newResut[i])
            jQuery('#description' + r).val(newResut[i])
          })
        })
      }
    }
  };

  handleQuantityCoordinate = (e, coords) => {
    var companyCoords = coords.split(",");
    var compVal = ''
    var tempVal = ''
    e !== "" &&
      e.result.map((e, i) => {
        if (i == 0) {
          this.state.tabelData = e.description;
        }
        let Description1 = e.description;
        if (
          companyCoords[0] <= e.boundingPoly.vertices[0].x &&
          companyCoords[1] >= e.boundingPoly.vertices[0].x &&
          companyCoords[2] <= e.boundingPoly.vertices[3].y &&
          companyCoords[3] >= e.boundingPoly.vertices[3].y
        ) {
          if (tempVal === e.boundingPoly.vertices[0].x) {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          } else {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          }
        }
      });
    let ocrradio, vals;
    vals = compVal.trim();
    var res = vals.split(" ");
    var useme = res.length - 1;
    for (var i = 0; i < useme; i++) {
      var rows = this.state.rows;
      this.setState({
        isAdd: false,
        initial_value: this.state.initial_value + 1,
      });
      this.setState({ rows: rows }, () => {
        this.state.rows.forEach((item, i) => {
          jQuery("#quantity" + i).val(res[i]);
          this.handleChangeItems(0, i);
        });
      });
    }
  };

  handleUnitPriceCoordinate = (e, coords) => {
    // console.log('handleunit', e, coords)
    var companyCoords = coords.split(",");
    var compVal = ''
    var tempVal = ''
    e !== "" &&
      e.result.map((e, i) => {
        if (i == 0) {
          this.state.tabelData = e.description;
        }
        let Description1 = e.description;
        if (
          companyCoords[0] <= e.boundingPoly.vertices[0].x &&
          companyCoords[1] >= e.boundingPoly.vertices[0].x &&
          companyCoords[2] <= e.boundingPoly.vertices[3].y &&
          companyCoords[3] >= e.boundingPoly.vertices[3].y
        ) {
          if (tempVal === e.boundingPoly.vertices[0].x) {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          } else {
            compVal = compVal + " " + Description1;
            tempVal = e.boundingPoly.vertices[0].x;
          }
        }
      });
    let ocrradio, vals;
    vals = compVal.trim();
    vals = vals.replace(",", "");
    var res = vals.split(" ");
    var useme = res.length;

    // mycode
    let n = this.state.row3
    let whichRow = 'row3'
    let whichRow_line = 'undo_line3'
    var initial_value = Number(this.state.initial_value) + 1


    //to arrange file id array
    this.tagged_file_ids()
    //to arrange file id array

    // mycode


    for (var i = n; i < useme + n; i++) {
      var rows = this.state.rows;

      // mycode
      initial_value = initial_value + 1 + n;
      if (this.state.rows.length < useme + n) {
        rows.push('row' + (initial_value + 1))
      }


      // mycode

      this.setState({
        isAdd: false,
        initial_value: this.state.initial_value + 1 + n,
      });
      this.setState({ rows: rows, [whichRow]: useme + n, [whichRow_line]: n - 1, unit_price_content: rows, undo_value: 'unit_price_content', undo_value_name: 'unit_price' }, () => {
        this.state.rows.forEach((item, i) => {

          // mycode
          let r = n + i
          var number = 0;
          if (res[i] != undefined || res[i] != null) {
            number = Number(res[i].replace(/[^0-9\.-]+/g, ""));
          }
          // mycode
          jQuery("#unit_price" + r).val(number);
          this.handleChangeItems(0, r);
        });
      });
    }
  };







  componentWillUnmount() {
    jQuery(document.body).removeClass("minimize_leftbar");
  }
  nestComments = (commentList) => {
    const commentMap = {};

    // move all the comments into a map of id => comment
    commentList.forEach(
      (comment) => (commentMap[comment.comment_id] = comment)
    );

    // iterate over the comments again and correctly nest the children
    commentList.forEach((comment) => {
      if (comment.parent_comment !== 0) {
        const parent = commentMap[comment.parent_comment];
        parent.children = (parent.children || []).push(comment);
      }
    });

    // filter the list to return a list of correctly nested comments
    return commentList.filter((comment) => {
      return comment.parent_comment === 0;
    });
  };
  getColumns = () => {
    var coreData = {
      user_id: this.state.logged_user_id,
      client_id: this.state.logged_client_id
    };
    FetchAllApi.getAllColumns(coreData, (err, response) => {
      if (response.status === 1) {
        this.setState({ number_of_columns_list: response.list[0].columns });
      } else {
      }
    });
  };

  get_bill_credit_details = (invoice_id, payment_id) => {
    setTimeout(() => {
      FetchAllApi.get_vendor_credit_details(
        this.state.logged_client_id,
        invoice_id,
        payment_id,
        (err, response) => {
          if (response.status === 1) {
            let data = response.details;

            // this.state.default_category_list.map((item) => {
            //   if (
            //     Number(item.id) === Number(data.invoice_details[0].category_id)
            //   ) {
            //     // alert("match");
            //     this.setState({ selected: item.id, selected: item.name });
            //   }
            // });
            // let category_data = this.state.default_category_list.find(e => e.id = data.invoice_details[0].category_id)
            // this.setState({selectedindex :category_data.id, selected: category_data.name})
            var row_temp = [];
            data.invoice_details.map((item, i) => {
              row_temp.push("row" + i);
            });
            this.setState({ rows: row_temp });
            // this.state.rows = [];

            data.invoice_details.map((item, i) => {
              // row_temp.push("row" + (i));
              jQuery("#item" + i).val(item.item_name);
              // jQuery('#' + `item${i}`).val(item.item_name);
              jQuery("#" + `descr${i}`).val(item.descripation);
              jQuery("#" + `quantity${i}`).val(item.quantity);
              jQuery("#" + `unit_price${i}`).val(item.unit_price);
              jQuery("#" + `subtotal${i}`).val(item.item_total);
              jQuery("#catagory_name" + i).val(item.catagory_name);
              jQuery("#catagory_id" + i).val(item.category_id);
              jQuery("#selectednow" + i).val(item.tax_name);
              jQuery("#selectedrate" + i).val(item.tax_rate);
              jQuery("#selectedtype_id" + i).val(item.tax_type);
              this.changetext1(
                item.category_id,
                i,
                "catagory_id" + i,
                item.catagory_name
              );
              this.handleChangeItems(0, i);
            });

            // this.state.rows.push(row_temp);
            // let invoice_date = moment(data.invoice_date, 'YYYY-MM-DD').format('DD/MM/YYYY')

            // default gst id
            jQuery("#default_gst_id").val(data.default_gst);
            let obj = this.state.gst_list.find((e)=>e.id == data.default_gst)
            jQuery("#selectedrate").val(obj.rate);
            jQuery("#selectedtype_id").val(obj.rate_type);
            jQuery("#selectednow").html(obj.sales_tax_name);
            // default gst id

            jQuery("#paid_status").html("Credit Note");
            jQuery("#company_name").val(data.company_name);
            jQuery("#invoice_no").val(data.invoice_number);
            // jQuery("#date").val(invoice_date);
            jQuery("#address").val(data.company_address);
            // this.setState({ ToCurrency : data.foreign_currency,invoice_no:data.id, invoice_idl:data.id, dueDateReal : data.due_date, editData:true  })
            jQuery("#currency").val(data.foreign_currency);
            jQuery("#default_catagory").val(
              data.invoice_details[0].category_id
            );
            // this.setState({ selected: data.default_category })
            jQuery("#Exchange").val(data.exchange_rate);
            jQuery("#description").val(data.descripation);
            jQuery("#payment_amount").val(data.payment_amount);
            jQuery("#payment_method").val(data.payment_method);
            jQuery("#fromdate").val(
              moment(data.payment_date).format("DD-MM-YYYY")
            );
            jQuery("#reference").val(data.reference);
            jQuery("#balanceSheetCategeory").val(data.payment_account);
            jQuery("#third_account_id").val(data.third_party_account_id);
            // jQuery('#third_account_id').val(data.third_party_account_id)
            // new table data

            jQuery("#appliedhom").html(
              (isNaN(
                Number(
                  data.payments_applied_home_currency !== undefined
                    ? data.payments_applied_home_currency
                    : 0
                )
              )
                ? 0
                : Number(data.payments_applied_home_currency)
              ).toFixed(2)
            );

            // jQuery('#forbaldue').html((data.open_balance_foreign_currency).toFixed(2));
            // jQuery('#homebaldue').html((data.open_balance_home_currency).toFixed(2));

            // jQuery('#appliedfor').html((data.payments_applied_foreign_currency).toFixed(2));
            //hey
            jQuery("#appliedfor").html(
              (isNaN(
                Number(
                  data.payments_applied_foreign_currency !== undefined
                    ? data.payments_applied_foreign_currency
                    : 0
                )
              )
                ? 0
                : Number(data.payments_applied_foreign_currency)
              ).toFixed(2)
            );
            jQuery("#forbaldue").html(
              (isNaN(
                Number(
                  data.open_balance_foreign_currency !== undefined
                    ? data.open_balance_foreign_currency
                    : 0
                )
              )
                ? 0
                : Number(data.open_balance_foreign_currency)
              ).toFixed(2)
            );
            jQuery("#homebaldue").html(
              (isNaN(
                Number(
                  data.open_balance_home_currency !== undefined
                    ? data.open_balance_home_currency
                    : 0
                )
              )
                ? 0
                : Number(data.open_balance_home_currency)
              ).toFixed(2)
            );

            jQuery("#exchangeGain").html(
              (isNaN(
                Number(
                  data.exchange_gain_or_loss !== undefined
                    ? data.exchange_gain_or_loss
                    : 0
                )
              )
                ? 0
                : Number(data.exchange_gain_or_loss)
              ).toFixed(2)
            );

            // new table data

            if (data.third_party_account_id !== "") {
              this.state.balancesheetlist.forEach((item, i) => {
                if (item.id == data.payment_account) {
                  const string = item.name;
                  const Payable = string.includes("ayable");
                  const Receivable = string.includes("eceivable");
                  if (Payable || Receivable) {
                    this.setState({
                      isThirdPartyName: true,
                    });
                    if (Payable) {
                      this.fetchThirdPartyNames(5, data.third_party_account_id);
                    }
                    if (Receivable) {
                      this.fetchThirdPartyNames(2, data.third_party_account_id);
                    }
                  } else {
                    this.setState({
                      isThirdPartyName: false,
                    });
                  }
                }
              });
            }
            jQuery("#account_id").val(data.balance_sheet_category);

            this.setState(
              {
                ToCurrency: data.foreign_currency,
                invoice_no: data.id,
                invoice_idl: data.id,
                dueDateReal: moment(data.due_date, 'YYYY-MM-DD').format("DD/MM/YYYY"),
                date: moment(data.invoice_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                editData: true,
                item_total_foreign_currency: data.item_total_foreign_currency,
                tax_amount_home_currency: data.tax_amount_home_currency,
                grand_total_home_currency: data.grand_total_home_currency,
                item_total_home_currency: data.item_total_home_currency,
                tax_amount_foreign_currency: data.tax_amount_foreign_currency,
                grand_total_foreign_currency: data.grand_total_foreign_currency,
                ToCurrency: data.foreign_currency,
                exchange_rate: data.exchange_rate,
                cus_rate_rate: data.exchange_rate,

                company_name: data.company_name,
                invoice_no: data.invoice_number,
                address: data.company_address,
                account_category: data.balance_sheet_category,
                myarray: data.invoice_details,
                // balance_sheet_category: 1,
                paymentdate: data.payment_date,
                reference: data.reference,

                payment_amount: data.payment_amount,
                payment_desc: data.descripation,
                exchange_value: data.exchange_rate,
                balanceSheetCategeory: data.payment_account,
                // payment_account: jQuery("#balanceSheetCategeory").val(),

                isChecked: data.tax_inclusive == 1 ? true : false,
                // dueDate: data.due_date,
                // dueDateReal: data.due_date,
                invoice_id: data.id,
                template_type: 2,
                third_party_id: data.third_party_account_id,
                payment_id: payment_id,
                rows: row_temp,

                appliedhom: data.payments_applied_home_currency,
                appliedfor: data.payments_applied_foreign_currency,
                forbaldue: data.open_balance_foreign_currency,
                homebaldue: data.open_balance_home_currency,
                exchangeGain: data.exchange_gain_or_loss,
                account_id_name: data.account_name,
                account_id: data.balance_sheet_category,
                selected: data.default_category_name, selectedindex: data.default_category,
                coming_from_bill: 'yes',

              },


            );
            this.findInSubAccountList(data.foreign_currency)
            // payment_amount    payment_amount
            // payment_method      Payment method
            // fromdate          payment_date

            // reference         reference
            // balanceSheetCategeory    balance_sheet_category
            // third_account_id          third_party_account_id   third_party_account_name    third_party_type
            // this.setState({selectedindex :category_data.id, selected: category_data.name, editData: true})

          } else {
          }
        }
      );
      this.setState({ loading: false })
    }, 7000);
  };

  get_bill_by_attachment = (list_id, file_id) => {
    let payment_id = 0
    let Input = {
      client_id: this.state.logged_client_id,
      list_id: list_id,
      file_id: file_id
    }
    setTimeout(() => {
      FetchAllApi.get_bill_by_attachment(Input,

        (err, response) => {
          if (response.status === 1) {
            let data = response.invoice_details;

            // this.state.default_category_list.map((item) => {
            //   if (
            //     Number(item.id) === Number(data.invoice_details[0].category_id)
            //   ) {
            //     // alert("match");
            //     this.setState({ selectedindex: item.id, selected: item.name });
            //   }
            // });
            // let category_data = this.state.default_category_list.find(e => e.id = data.invoice_details[0].category_id)
            // this.setState({selectedindex :category_data.id, selected: category_data.name})
            var row_temp = [];
            data.invoice_details.map((item, i) => {
              row_temp.push("row" + i);
            });
            this.setState({ rows: row_temp });
            // this.state.rows = [];

            data.invoice_details.map((item, i) => {
              // row_temp.push("row" + (i));
              jQuery("#item" + i).val(item.item_name);
              // jQuery('#' + `item${i}`).val(item.item_name);
              jQuery("#" + `descr${i}`).val(item.descripation);
              jQuery("#" + `quantity${i}`).val(item.quantity);
              jQuery("#" + `unit_price${i}`).val(item.unit_price);
              jQuery("#" + `subtotal${i}`).val(item.item_total);
              jQuery("#catagory_name" + i).val(item.catagory_name);
              jQuery("#catagory_id" + i).val(item.category_id);
              jQuery("#selectednow" + i).val(item.tax_name);
              jQuery("#selectedrate" + i).val(item.tax_rate);
              jQuery("#selectedtype_id" + i).val(item.tax_type);
              this.changetext1(
                item.category_id,
                i,
                "catagory_id" + i,
                item.catagory_name
              );
              this.handleChangeItems(0, i);
            });

            // this.state.rows.push(row_temp);

            // default gst id
            jQuery("#default_gst_id").val(data.default_gst);
            let obj = this.state.gst_list.find((e)=>e.id == data.default_gst)
            if(obj){
            jQuery("#selectedrate").val(obj.rate);
            jQuery("#selectedtype_id").val(obj.rate_type);
            jQuery("#selectednow").html(obj.sales_tax_name);
            // default gst id
            }

            jQuery("#paid_status").html(data.paid_status + "--Bill");

            jQuery("#company_name").val(data.company_name);
            jQuery("#invoice_no").val(data.invoice_number);
            jQuery("#dateReal").val(data.incvoice_date);
            jQuery("#address").val(data.company_address);
            // this.setState({ ToCurrency : data.foreign_currency,invoice_no:data.id, invoice_idl:data.id, dueDateReal : data.due_date, editData:true  })
            jQuery("#currency").val(data.foreign_currency);
            jQuery("#default_catagory").val(
              data.invoice_details[0].category_id
            );

            jQuery("#Exchange").val(data.exchange_rate);

            jQuery("#payment_amount").val(data.payment_amount);
            jQuery("#payment_method").val(data.payment_method);
            jQuery("#description").val(data.descripation);
            jQuery("#fromdate").val(
              moment(data.payment_date).format("DD-MM-YYYY")
            );
            jQuery("#reference").val(data.reference);
            jQuery("#balanceSheetCategeory").val(data.payment_account);
            jQuery("#third_account_id").val(data.third_party_account_id);
            // jQuery('#third_account_id').val(data.third_party_account_id)
            // new table data

            jQuery("#appliedhom").html(
              (isNaN(
                Number(
                  data.payments_applied_home_currency !== undefined
                    ? data.payments_applied_home_currency
                    : 0
                )
              )
                ? 0
                : Number(data.payments_applied_home_currency)
              ).toFixed(2)
            );

            // jQuery('#forbaldue').html((data.open_balance_foreign_currency).toFixed(2));
            // jQuery('#homebaldue').html((data.open_balance_home_currency).toFixed(2));

            // jQuery('#appliedfor').html((data.payments_applied_foreign_currency).toFixed(2));
            //hey
            jQuery("#appliedfor").html(
              (isNaN(
                Number(
                  data.payments_applied_foreign_currency !== undefined
                    ? data.payments_applied_foreign_currency
                    : 0
                )
              )
                ? 0
                : Number(data.payments_applied_foreign_currency)
              ).toFixed(2)
            );
            jQuery("#forbaldue").html(
              (isNaN(
                Number(
                  data.open_balance_foreign_currency !== undefined
                    ? data.open_balance_foreign_currency
                    : 0
                )
              )
                ? 0
                : Number(data.open_balance_foreign_currency)
              ).toFixed(2)
            );
            jQuery("#homebaldue").html(
              (isNaN(
                Number(
                  data.open_balance_home_currency !== undefined
                    ? data.open_balance_home_currency
                    : 0
                )
              )
                ? 0
                : Number(data.open_balance_home_currency)
              ).toFixed(2)
            );

            jQuery("#exchangeGain").html(
              (isNaN(
                Number(
                  data.exchange_gain_or_loss !== undefined
                    ? data.exchange_gain_or_loss
                    : 0
                )
              )
                ? 0
                : Number(data.exchange_gain_or_loss)
              ).toFixed(2)
            );

            // new table data

            if (data.third_party_account_id !== "") {
              this.state.balancesheetlist.forEach((item, i) => {
                if (item.id == data.payment_account) {
                  const string = item.name;
                  const Payable = string.includes("ayable");
                  const Receivable = string.includes("eceivable");
                  if (Payable || Receivable) {
                    this.setState({
                      isThirdPartyName: true,
                    });
                    if (Payable) {
                      this.fetchThirdPartyNames(5, data.third_party_account_id);
                    }
                    if (Receivable) {
                      this.fetchThirdPartyNames(2, data.third_party_account_id);
                    }
                  } else {
                    this.setState({
                      isThirdPartyName: false,
                    });
                  }
                }
              });
            }
            jQuery("#account_id").val(data.balance_sheet_category);

            this.setState(
              {
                ToCurrency: data.foreign_currency,
                invoice_no: data.id,
                invoice_idl: data.id,
                dueDateReal: moment(data.due_date, 'YYYY-MM-DD').format("DD/MM/YYYY"),
                date: moment(data.invoice_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                editData: true,
                item_total_foreign_currency: data.item_total_foreign_currency,
                tax_amount_home_currency: data.tax_amount_home_currency,
                grand_total_home_currency: data.grand_total_home_currency,
                item_total_home_currency: data.item_total_home_currency,
                tax_amount_foreign_currency: data.tax_amount_foreign_currency,
                grand_total_foreign_currency: data.grand_total_foreign_currency,
                ToCurrency: data.foreign_currency,
                exchange_rate: data.exchange_rate,
                cus_rate_rate: data.exchange_rate,

                company_name: data.company_name,
                invoice_no: data.invoice_number,
                address: data.company_address,
                account_category: data.balance_sheet_category,
                myarray: data.invoice_details,
                // balance_sheet_category: 1,
                paymentdate: data.payment_date,
                reference: data.reference,

                payment_amount: data.payment_amount,
                payment_desc: data.descripation,
                exchange_value: data.exchange_rate,
                balanceSheetCategeory: data.payment_account,
                // payment_account: jQuery("#balanceSheetCategeory").val(),

                isChecked: data.tax_inclusive == 1 ? true : false,
                dueDate: data.due_date,
                // dueDateReal: data.due_date,
                invoice_id: data.id,
                template_type: data.type == "1" ? "1" : "2",
                third_party_id: data.third_party_account_id,
                payment_id: payment_id,
                rows: row_temp,

                appliedhom: data.payments_applied_home_currency,
                appliedfor: data.payments_applied_foreign_currency,
                forbaldue: data.open_balance_foreign_currency,
                homebaldue: data.open_balance_home_currency,
                exchangeGain: data.exchange_gain_or_loss,
                account_id_name: data.account_name,
                account_id: data.balance_sheet_category,
                selectedindex: data.default_category,
                selected: data.default_category_name,
                coming_from_bill: 'yes',
                tagged_file_ids: data.file_id,
                clicked_processed: true,
              },
              this.findInSubAccountList(data.foreign_currency)
            );

            // payment_amount    payment_amount
            // payment_method      Payment method
            // fromdate          payment_date

            // reference         reference
            // balanceSheetCategeory    balance_sheet_category
            // third_account_id          third_party_account_id   third_party_account_name    third_party_type
            // this.setState({selectedindex :category_data.id, selected: category_data.name, editData: true})
            // localStorage.setItem("vendor_bill", "");
          } else {
          }
        }
      );
      this.setState({ loading: false })
    }, 7000);
  };


  clearTable = () => {

    this.state.rows.map((item, i) => {
      jQuery("#item" + i).val('');
      jQuery("#" + `descr${i}`).val('');
      jQuery("#" + `quantity${i}`).val('');
      jQuery("#" + `unit_price${i}`).val('');
      jQuery("#" + `subtotal${i}`).val('');

      jQuery("#selectednow" + i).val('');
      jQuery("#selectednow_id" + i).val('');
      jQuery("#chosen" + i).val('');

      jQuery("#catagory_name" + i).html('');
      jQuery("#catagory_id" + i).html('');

      jQuery("#selectedrate" + i).val('');
      jQuery("#selectedtype_id" + i).val('');
      this.changetext1('', i, "catagory_id" + i, '');
      this.handleCheck_get_selected_tax(i, '', 0, '');
      this.handleChangeItems(0, i);
    });

    setTimeout(() => {
      this.setState({ rows: ["row 1"], row1: 0, row2: 0, row3: 0, })
      this.handleChangeItems(0, 0);
    }, 2000);

  }

  clear = () => {


    this.state.rows.map((item, i) => {
      // row_temp.push("row" + (i));
      jQuery("#item" + i).val('');
      jQuery("#" + `descr${i}`).val('');
      jQuery("#" + `quantity${i}`).val('');
      jQuery("#" + `unit_price${i}`).val('');
      jQuery("#" + `subtotal${i}`).val('');

      jQuery("#catagory_name" + i).html('');
      jQuery("#catagory_id" + i).html('');

      jQuery("#selectednow" + i).val('');
      jQuery("#selectednow_id" + i).val('');
      jQuery("#chosen" + i).val('');

      jQuery("#selectedrate" + i).val('');
      jQuery("#selectedtype_id" + i).val('');

      this.changetext1('', i, "catagory_id" + i, '');
      this.handleCheck_get_selected_tax(i, '', 0, '');
      this.handleChangeItems(0, i);

    });

    setTimeout(() => {
      this.setState({ rows: ["row 1"] })
      this.handleChangeItems(0, 0);
    }, 3000);


    jQuery("#company_name").val('');
    jQuery("#invoice_no").val('');
    jQuery("#dateReal").val('');
    jQuery("#address").val('');
    jQuery("#currency").val('');

    jQuery("#default_catagory").val('');
    jQuery("#Exchange").val('');
    jQuery("#realdueDate").val('');
    // jQuery("#payment_amount").val('');
    // jQuery("#description").val('');
    //  jQuery("#payment_method").val('');
    //              jQuery("#fromdate").val(
    //   ''
    // );
    // jQuery("#reference").val('');
    // jQuery("#balanceSheetCategeory").val('');
    // jQuery("#third_account_id").val('');

    jQuery("#appliedfor").html(
      0.00
    );
    jQuery("#forbaldue").html(
      0.00
    );
    jQuery("#homebaldue").html(
      0.00
    );

    jQuery("#exchangeGain").html(
      0.00
    );

    jQuery("#account_id").val('');

    this.setState(
      {
        company_name: '',
        invoice_no: '',
        date: '',
        address: '',

        ToCurrency: '',
        // invoice_no: '',
        // invoice_idl: '',
        selected: '',
        selectedindex: '',
        dueDate: '',
        dueDateReal: '',
        item_total_foreign_currency: '',
        tax_amount_home_currency: '',
        grand_total_home_currency: '',
        item_total_home_currency: '',
        tax_amount_foreign_currency: '',
        grand_total_foreign_currency: '',
        ToCurrency: '',
        exchange_rate: '',
        cus_rate_rate: '',
        exchange_value: '',

        company_name: '',
        // invoice_no: '',
        address: '',
        account_category: '',
        myarray: '',
        //  paymentdate: '',
        //  reference: '',
        //  payment_desc: '',
        // payment_amount: '',
        // exchange_value: '',
        balanceSheetCategeory: ' ',
        // payment_account: jQuery("#balanceSheetCategeory").val(),

        isChecked: false,
        dueDate: '',
        // dueDate: moment(data.due_date).format("DD-MM-YYYY"),
        // invoice_id: '',
        template_type: "1",
        //  third_party_id: '',
        // payment_id: '',
        // rows: ['row1'],

        appliedhom: '',
        appliedfor: '',
        forbaldue: '',
        homebaldue: '',
        exchangeGain: '',
        account_id_name: '',
        account_id: '',
        coming_from_bill: '',
        selected: '',
        selectedindex: '',

        row1: 0,
        row2: 0,
        row3: 0,
      },



    );

  }

  get_bill_details = (invoice_id, payment_id) => {
    setTimeout(() => {
      FetchAllApi.get_vendor_bill_details(
        this.state.logged_client_id,
        invoice_id,
        payment_id,
        (err, response) => {
          if (response.status === 1) {
            let data = response.invoice_details;
            this.setState({ payement_table: response.paymentDetailItems })

            // this.state.default_category_list.map((item) => {
            //   if (
            //     Number(item.id) === Number(data.invoice_details[0].default_category)
            //   ) {
            //     // alert("match");
            //     this.setState({ selectedindex: item.id, selected: item.name });
            //   }
            // });
            // let category_data = this.state.default_category_list.find(e => e.id = data.invoice_details[0].category_id)
            // this.setState({selectedindex :category_data.id, selected: category_data.name})
            var row_temp = [];
            data.invoice_details.map((item, i) => {
              row_temp.push("row" + i);
            });
            this.setState({ rows: row_temp });
            // this.state.rows = [];

            data.invoice_details.map((item, i) => {
              // row_temp.push("row" + (i));
              jQuery("#item" + i).val(item.item_name);
              // jQuery('#' + `item${i}`).val(item.item_name);
              jQuery("#" + `descr${i}`).val(item.descripation);
              jQuery("#" + `quantity${i}`).val(item.quantity);
              jQuery("#" + `unit_price${i}`).val(item.unit_price);
              jQuery("#" + `subtotal${i}`).val(item.item_total);
              jQuery("#catagory_name" + i).val(item.catagory_name);
              jQuery("#catagory_id" + i).val(item.category_id);
              jQuery("#selectednow" + i).val(item.tax_name);
              jQuery("#selectedrate" + i).val(item.tax_rate);
              jQuery("#selectedtype_id" + i).val(item.tax_type);
              this.changetext1(
                item.category_id,
                i,
                "catagory_id" + i,
                item.catagory_name
              );
              this.handleChangeItems(0, i);
            });

            // this.state.rows.push(row_temp);
            
            // default gst id
            jQuery("#default_gst_id").val(data.default_gst);
            let obj = this.state.gst_list.find((e)=>e.id == data.default_gst)
            if(obj){
            jQuery("#selectedrate").val(obj.rate);
            jQuery("#selectedtype_id").val(obj.rate_type);
            jQuery("#selectednow").html(obj.sales_tax_name);
            // default gst id
            }else{   jQuery("#selectedrate").val('');
            jQuery("#selectedtype_id").val('');
            jQuery("#selectednow").html('');}

            jQuery("#paid_status").html(data.paid_status + "--Bill");

            jQuery("#company_name").val(data.company_name);
            jQuery("#invoice_no").val(data.invoice_number);
            // jQuery("#date").val(data.invoice_date);
            jQuery("#address").val(data.company_address);
            // this.setState({ ToCurrency : data.foreign_currency,invoice_no:data.id, invoice_idl:data.id, dueDateReal : data.due_date, editData:true  })
            jQuery("#currency").val(data.foreign_currency);

            jQuery("#default_catagory").val(
              data.invoice_details[0].default_category_name
            );
            // this.setState({ selected: data.default_category })

            jQuery("#Exchange").val(data.exchange_rate);

            jQuery("#payment_amount").val(data.payment_amount);
            console.log(response.paymentDetailItems)
            if(response.paymentDetailItems && response.paymentDetailItems.length!=0 && response.paymentDetailItems[0].descripation){
            jQuery("#description").val(response.paymentDetailItems[0].descripation);
            }
            else{
              jQuery("#description").val(data.descripation);
            }
            jQuery("#payment_method").val(data.payment_method);
            jQuery("#fromdate").val(
              moment(data.payment_date).format("DD-MM-YYYY")
            );
            jQuery("#reference").val(data.reference);
            jQuery("#balanceSheetCategeory").val(data.payment_account);
            jQuery("#third_account_id").val(data.third_party_account_id);
            // jQuery('#third_account_id').val(data.third_party_account_id)
            // new table data

            this.state.number_of_columns_list.map((val, idx) => {

              let value = val.column_name

              data.invoice_details[0].custom_column.map((inv, i) => {

                jQuery("#addtext" + idx + i).val(inv[value])

              })

            })

            jQuery("#appliedhom").html(
              (isNaN(
                Number(
                  data.payments_applied_home_currency !== undefined
                    ? data.payments_applied_home_currency
                    : 0
                )
              )
                ? 0
                : Number(data.payments_applied_home_currency)
              ).toFixed(2)
            );

            // jQuery('#forbaldue').html((data.open_balance_foreign_currency).toFixed(2));
            // jQuery('#homebaldue').html((data.open_balance_home_currency).toFixed(2));

            // jQuery('#appliedfor').html((data.payments_applied_foreign_currency).toFixed(2));
            //
            jQuery("#appliedfor").html(
              (isNaN(
                Number(
                  data.payments_applied_foreign_currency !== undefined
                    ? data.payments_applied_foreign_currency
                    : 0
                )
              )
                ? 0
                : Number(data.payments_applied_foreign_currency)
              ).toFixed(2)
            );
            jQuery("#forbaldue").html(
              (isNaN(
                Number(
                  data.open_balance_foreign_currency !== undefined
                    ? data.open_balance_foreign_currency
                    : 0
                )
              )
                ? 0
                : Number(data.open_balance_foreign_currency)
              ).toFixed(2)
            );
            jQuery("#homebaldue").html(
              (isNaN(
                Number(
                  data.open_balance_home_currency !== undefined
                    ? data.open_balance_home_currency
                    : 0
                )
              )
                ? 0
                : Number(data.open_balance_home_currency)
              ).toFixed(2)
            );

            jQuery("#exchangeGain").html(
              (isNaN(
                Number(
                  data.exchange_gain_or_loss !== undefined
                    ? data.exchange_gain_or_loss
                    : 0
                )
              )
                ? 0
                : Number(data.exchange_gain_or_loss)
              ).toFixed(2)
            );

            // new table data

            if (data.third_party_account_id !== "") {
              this.state.balancesheetlist.forEach((item, i) => {
                if (item.id == data.payment_account) {
                  const string = item.name;
                  const Payable = string.includes("ayable");
                  const Receivable = string.includes("eceivable");
                  if (Payable || Receivable) {
                    this.setState({
                      isThirdPartyName: true,
                    });
                    if (Payable) {
                      this.fetchThirdPartyNames(5, data.third_party_account_id);
                    }
                    if (Receivable) {
                      this.fetchThirdPartyNames(2, data.third_party_account_id);
                    }
                  } else {
                    this.setState({
                      isThirdPartyName: false,
                    });
                  }
                }
              });
            }
            jQuery("#account_id").val(data.balance_sheet_category);

            this.setState(
              {
                ToCurrency: data.foreign_currency,
                invoice_no: data.id,
                invoice_idl: data.id,
                dueDateReal: moment(data.due_date, 'YYYY-MM-DD').format("DD/MM/YYYY"),
                date: moment(data.invoice_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                editData: true,
                item_total_foreign_currency: data.item_total_foreign_currency,
                tax_amount_home_currency: data.tax_amount_home_currency,
                grand_total_home_currency: data.grand_total_home_currency,
                item_total_home_currency: data.item_total_home_currency,
                tax_amount_foreign_currency: data.tax_amount_foreign_currency,
                grand_total_foreign_currency: data.grand_total_foreign_currency,
                ToCurrency: data.foreign_currency,
                exchange_rate: data.exchange_rate,
                cus_rate_rate: data.exchange_rate,
                file_id: data.file_id,
                list_id: data.list_id,

                company_name: data.company_name,
                invoice_no: data.invoice_number,
                address: data.company_address,
                account_category: data.balance_sheet_category,
                myarray: data.invoice_details,
                // balance_sheet_category: 1,
                paymentdate: data.payment_date,
                reference: data.reference,
                payment_desc: data.descripation,
                payment_amount: data.payment_amount,
                exchange_value: data.exchange_rate,
                balanceSheetCategeory: data.payment_account,
                // payment_account: jQuery("#balanceSheetCategeory").val(),

                isChecked: data.tax_inclusive == 1 ? true : false,
                // dueDate: data.due_date,
                // dueDateReal: data.due_date,
                // dueDate: moment(data.due_date).format("DD-MM-YYYY"),
                invoice_id: data.id,
                template_type: data.type == "1" ? "1" : "2",
                third_party_id: data.third_party_account_id,
                payment_id: payment_id,
                rows: row_temp,

                appliedhom: data.payments_applied_home_currency,
                appliedfor: data.payments_applied_foreign_currency,
                forbaldue: data.open_balance_foreign_currency,
                homebaldue: data.open_balance_home_currency,
                exchangeGain: data.exchange_gain_or_loss,
                account_id_name: data.account_name,
                account_id: data.balance_sheet_category,
                coming_from_bill: 'yes',
                // comingFrom: 'General Ledger',
                selected: data.default_category_name,
                selectedindex: data.default_category
              },

              this.findInSubAccountList(data.foreign_currency)


            );

            // payment_amount    payment_amount
            // payment_method      Payment method
            // fromdate          payment_date

            // reference         reference
            // balanceSheetCategeory    balance_sheet_category
            // third_account_id          third_party_account_id   third_party_account_name    third_party_type
            // this.setState({selectedindex :category_data.id, selected: category_data.name, editData: true})
            // localStorage.setItem("vendor_bill", "");
          } else {
          }
        }
      );
      this.setState({ loading: false })
    }, 7000);
  };

  makeDisabled = () => {
    jQuery("#company_name").attr("disabled", true);
    jQuery("#invoice_no").attr("disabled", true);
    jQuery("#company_name").attr("disabled", true);
    jQuery("#company_name").attr("disabled", true);
  };

  async componentDidMount() {


    // for table dropdown hiding issue

    jQuery(function () {
      jQuery(document).on('hidden.bs.dropdown', function () {

        jQuery('#changeme').css('height', 'auto')


      });
    });

    jQuery(function () {
      jQuery(document).on('show.bs.dropdown', function () {

        jQuery('#changeme').css('height', '1000px')


      });
    });

    // for table dropdown hiding issue


    if ((this.state.comingFrom == 'Accountant Inbox' ||
      this.state.comingFrom == 'Inbox' ||
      this.state.comingFrom == 'Sent Items') && this.state.processed == "Not Processed" && this.state.check_void == 'Voided') {
      this.setState({ is_void: true })
    }


    // if (this.props.location.state == "coming_from_sent_item") {
    //   this.makeDisabled();
    // }
    // if (this.props.location.state != '' &&
    //   this.props.location.state != null &&
    //   this.props.location.state != undefined
    // ) {
    //   this.setState({ comingFrom: this.props.location.state })
    // } else {

    // }
    this.get_client_home_currency();
    this.vendor_list_for_bill()
    window.jQuery(".selectpicker").selectpicker("refresh");



    // alert(localStorage.getItem( "vendor_bill"));
    this.deafultCategoryList(this);
    this.getSubAccountList();
    jQuery(function () {
      jQuery(document).on("hidden.bs.dropdown", function () {
        jQuery("#changeme").css("height", "auto");
      });
    });

    // jQuery(function () {
    //   jQuery(document).on("show.bs.dropdown", function () {
    //     jQuery("#changeme").css("height", "1000px");
    //   });
    // });
    this.getColumns();
    this.watchCoulmnUpdated();
    var commentList = [
      {
        ago_value: "a few seconds ago",
        attachment_count: 0,
        attachments: [],
        attachments_list: "",
        id: 473,
        comment_text: "hi this is parent",
        comment_user: "SAS technoligies",
        date: "16:40 - 20 May",
        file_path: [],
        parentid: 0,
        status: 1,
        status_message: "New",
        sub_comment_count: 0,
        sub_parent: 0,
        user_id: this.state.logged_user_id,
        user_image: "",
      },
      {
        ago_value: "a few seconds ago",
        attachment_count: 0,
        attachments: [],
        attachments_list: "",
        id: 474,
        comment_text: "hi this is parent",
        comment_user: "SAS technoligies",
        date: "16:40 - 20 May",
        file_path: [],
        parentid: 473,
        status: 1,
        status_message: "New",
        sub_comment_count: 0,
        sub_parent: 0,
        user_id: this.state.logged_user_id,
        user_image: "",
      },
      {
        ago_value: "a few seconds ago",
        attachment_count: 0,
        attachments: [],
        attachments_list: "",
        id: 478,
        comment_text: "hi this is parent",
        comment_user: "SAS technoligies",
        date: "16:40 - 20 May",
        file_path: [],
        parentid: 474,
        status: 1,
        status_message: "New",
        sub_comment_count: 0,
        sub_parent: 0,
        user_id: this.state.logged_user_id,
        user_image: "",
      },
    ];

    const lessTension = (items, id = 0, link = "parentid") =>
      items
        .filter((item) => item[link] === id)
        .map((item) => ({
          ...item,
          sub_comments: lessTension(items, item.id),
        }));

    jQuery(document).ready(function () {
      jQuery(".has-sub").click(function () {
        jQuery(this)
          .parent()
          .addClass("active")
          .next(".sub-menu")
          .slideToggle();
      });

      window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

      jQuery(".search-btn").click(function () {
        jQuery(".hdr-search").addClass("active");
      });
      jQuery(".hdr-search .close-icon").click(function () {
        jQuery(".hdr-search").removeClass("active");
      });
      // jQuery(".select-picker").selectpicker();
      jQuery(".label-enclose .label").click(function () {
        jQuery(this).toggleClass("active");
      });

      jQuery(".nav-brand-res").click(function () {
        jQuery(".left-navbar").addClass("active");
      });
      jQuery(".menu-close").click(function () {
        jQuery(".left-navbar").removeClass("active");
      });
      jQuery(".sidebar-toggle").click(function () {
        jQuery(".top-bar").toggleClass("add-pl");
        jQuery("body").toggleClass("minimize_leftbar");
      });
      jQuery(".custom-select-drop .dropdown-menu a").click(function () {
        jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass(
          "active"
        );
        jQuery(this).parent("li").addClass("active");
        jQuery(".open #selected").text(jQuery(this).text());
      });

      jQuery(".tbl_drop_down").on("click", function () {
        jQuery(".form-table").addClass("ovrFlwRmve");
      });
    });

    this.getPaymethod();
    this.vendor_payment_account_type();
    // var jcp;
    // if(document.getElementById("overviewSeatMap")){
    //   window.Jcrop.load('overviewSeatMap').then(img => {
    //     jcp = Jcrop.attach(img,{multi:true});
    //     const rect = Jcrop.Rect.sizeOf(jcp.el);
    //     jcp.newWidget(rect.scale(.7,.5).center(rect.w,rect.h));
    //     jcp.focus();
    //   });
    // }

    this.findInSubAccountList("");

    if (
      localStorage.getItem("vendor_bill") !== "" &&
      localStorage.getItem("vendor_bill") !== undefined &&
      localStorage.getItem("vendor_bill") !== null &&
      localStorage.getItem("vendor_bill") !== "null"
    ) {
      var update_details = JSON.parse(localStorage.getItem("vendor_bill"));
      if (update_details[0] == "Bill") {
        this.get_bill_details(update_details[1]);
      }

      if (update_details[0] == "Credit") {
        this.setState(
          { template_type: 2 },
          this.get_bill_details(update_details[1])
        );
      }

      if (update_details[0] == "Bill payment") {
        this.get_bill_details(update_details[1], update_details[2]);
      }

      if (update_details[0] == "Vendor credit note") {
        this.get_bill_credit_details(update_details[1]);
      }

      if (update_details[0] == "from_inbox_pages") {
        this.get_bill_by_attachment(update_details[1], update_details[2]);
      }

    }

    var file_id = this.props.match.params.file_id;
    FetchAllApi.getFilePath(file_id, (err, response) => {
      if (response.status === 1) {

        // to find which type ocr
        let length = (response.file_path_array && response.file_path_array.length > 0) ? response.file_path_array.length : 0
        let path, type_of_ocr, present_file_id
        if (length == 0) {
          path = response.file_path
          type_of_ocr = 'single'
          present_file_id = response.file_id
        } else if (length == 1) {
          path = response.file_path_array[0].file_path
          type_of_ocr = 'single_array'
          present_file_id = response.file_path_array[0].file_id
        } else if (length > 1) {
          path = response.file_path_array[0].file_path
          type_of_ocr = 'multiple'
          present_file_id = response.file_path_array[0].file_id
        }
        // to find which type ocr

        // let type_of_ocr = (response.file_path_array && response.file_path_array.length > 0) ? 'multiple' : 'single'
        // let path = type_of_ocr == 'single' ? response.file_path : response.file_path_array[0].file_path



        this.setState({
          get_file_path: path, file_path_array: response.file_path_array, type_of_ocr, present_file_id
        });
        this.get_api_cloud(path);
        this.getCommments(present_file_id);
        // this.get_api_cloud(this.state.get_file_path);
      } else {
      }
    });


    // await FetchAllApi.getFilePath(file_id, async (err, response) => {
    //   if (response.status === 1) {

    //     // to find which type ocr
    //     let length = (response.file_path_array && response.file_path_array.length > 0) ? response.file_path_array.length : 0
    //     let path, type_of_ocr, present_file_id
    //     if (length == 0) {
    //       path = response.file_path
    //       type_of_ocr = 'single'
    //       present_file_id = response.file_id
    //     } else if (length == 1) {
    //       path = response.file_path_array[0].file_path
    //       type_of_ocr = 'single_array'
    //       present_file_id = response.file_path_array[0].file_id
    //     } else if (length > 1) {
    //       path = response.file_path_array[0].file_path
    //       type_of_ocr = 'multiple'
    //       present_file_id = response.file_path_array[0].file_id
    //     }
    //     // to find which type ocr


    //     this.setState({
    //       get_file_path: path, file_path_array: response.file_path_array, type_of_ocr, present_file_id
    //     });

    //     // const img = new Image();
    //     // img.src = response.file_path;
    //     // img.onload = () => {
    //     //   alert(this.width + 'x' + this.height);
    //     // }




    //     await this.get_api_cloud(path);
    //     // await this.get_api_cloud(this.state.get_file_path);


    //     // this.get_api_cloud(response.file_path);
    //   } else {
    //   }
    // });


  }

  handleInvoiceIds = () => {
    // request
    //   .get(getInvoiceIds)
    //   //.set('Authorization', AuthorizationKey)
    //   .set('Content-Type', 'application/json;charset=UTF-8')
    //   .end((err, result) => {
    //     if (result.body !== null) {
    //       this.setState({
    //         ids: result.body
    //       });
    //     }
    //   });
  };

  // handleInvoiceCordsApi = (e) => {
  //   request
  //     .get(getInvoiceCords + "?" + "id=" + e)    
  //     //.set('Authorization', AuthorizationKey)
  //     .set('Content-Type', 'application/json;charset=UTF-8')
  //     .end((err, result) => {
  //       if (result.body !== null) {
  //         this.setState({
  //           coords: result.body
  //         });
  //       } 
  //     });
  // }

  update_search_keyword = (event) => {
    this.setState({ search_key_gst: event.target.value }, () => {
      this.get_gst_list();
    });
  };

  get_api_cloud(image_path) {
    // if (0) {
    if (
      (this.state.comingFrom == 'Accountant Inbox' ||
        this.state.comingFrom == 'Inbox' ||
        this.state.comingFrom == 'Sent Items' || 'Received Bill') && this.state.processed == "Not Processed"
    ) {
      // alert('oooq')
      // alert('calling inside')

      if (
        this.state.convertedImageDAta3 === "" ||
        this.state.convertedImageDAta3 === null
      ) {
        // alert('00022')
        // this.setState({ cloud: true })
        FetchAllApi.cloud_vision_api(image_path, (err, response) => {
          if (response.status === 1) {
            var apiresult = response.result;
            if (apiresult.length > 0)
              this.setState({ convertedImageDAta3: response, loading: false, cloud: false, });
            this.handleInitialDataTagging();

          } else {
            this.setState({ convertedImageDAta3: "", loading: false, cloud: false, });

          }
        });
        //this.setState({ convertedImageDAta3: resjsons});
      }
      if (this.state.convertedImageDAta3 != "") {
        this.handleCoords();
      }



    } else {


      // do nothing for already processed one


    }


    // }

  }


  get_gst_list = () => {
    let country_code = this.state.country_code;
    let keyword = this.state.search_key_gst;
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

  // removeOverFlow = (e, col) => {
  //   if (col) {
  //     this.setState({
  //       columnId: col,
  //     });
  //   }
  //   jQuery(".form-table").addClass("ovrFlwRmve");
  // };
  control_addButton = () => {
    let item_check = jQuery(
      `#coulmn${this.state.rows.length - 1}${this.state.coulmns.length - 1}`
    ).val();

    if (
      this.state.myarray && this.state.myarray.length > this.state.rows.length - 1 &&
      this.state.myarray[this.state.myarray.length - 1].price > -1 &&
      this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
      this.state.myarray[this.state.myarray.length - 1].category_id.length >
      0 &&
      item_check != ""
    ) {
      return (
        <div className="form-group col-md-12 mar-b-no pad-no">
          <a href="javascript:;" className="add-input" onClick={this.addRow}>
            ADD ROW
          </a>
        </div>
      );
    }
  };
  callocrmodelvaue = async () => {
    setTimeout(() => {
      this.handleChangeItems(
        0,
        this.state.rows.length - 1
      );
    }, 2000);

    // console.log('jdhud', this.state.coordinates)

    let ocrradio, selectedOCRVALUE, vals;
    var coordinate = this.state.coordinates.join(",");
    selectedOCRVALUE = jQuery('#selectedOCRVALUE').text()
    ocrradio = jQuery('input[type=radio][name=ocrradio]:checked').val();
    // alert(ocrradio);
    if (
      ocrradio === "item_total_home_currency" ||
      ocrradio === "tax_amount_home_currency" ||
      ocrradio === "subtotal0"
    ) {
      vals = jQuery("#" + ocrradio).text();
      vals = selectedOCRVALUE;
      jQuery("#" + ocrradio).text(vals);
      var t =
        parseFloat(jQuery("#item_total_home_currency").text()) +
        parseFloat(jQuery("#tax_amount_home_currency").text());
      jQuery("#grand_total_home_currency").text(t);
    } else if (ocrradio === "item") {
      vals = jQuery("#" + ocrradio).val();
      vals = selectedOCRVALUE.trim();
      var res = vals.split(" ");
      var useme = res.length

      for (var i = 0; i < useme; i++) {
        var rows = this.state.rows

        if (this.state.rows.length < useme) {
          rows.push('row' + (this.state.initial_value + 1))
        }
        //rows.push('row' + (this.state.initial_value + 1))
        this.setState({
          isAdd: false,
          initial_value: this.state.initial_value + 1,
        });
        await this.setState({ rows: rows, item_coordinate: coordinate, item_content: rows,
           undo_value: 'item_content', undo_value_name: 'item' }, () => {
          this.state.rows.forEach((item, i) => {
            jQuery('#item' + i).val(res[i])
          })
        })
        var ocrradio1 = ocrradio + i
        jQuery('#' + ocrradio1).text(res[i])

      }
    }
    // block for description wothout white spaces
    else if (ocrradio === 'description_without_white_space') {
      let newDes = (this.state.tabelData).split('\n');
      //var newR= newDes.split(',')      

      vals = jQuery("#" + ocrradio).val();
      vals = selectedOCRVALUE.trim();
      var res = vals.split(" ");

      var newResut = [];
      //res.map((res1)=>{
      newDes.map((res2) => {
        var temp = res2.split(" ");

        if (temp.length > 3) {
          var tempString = res2.substring(
            res2.indexOf(" ") + 1,
            res2.lastIndexOf(" ")
          );
        } else {
          var tempString = res2;
        }


        if (tempString != '' && tempString.length > 1 && vals.includes(tempString)) {
          newResut.push(res2);
          newResut = newResut.filter(
            (item, index) => newResut.indexOf(item) == index
          );
        }
      });
      //})+1
      var initial_value = Number(this.state.initial_value);
      var useme = newResut.length

      // console.log('useme', newResut)
      // my code
      // let n = this.state.con1 ? Number(this.state.rows.length) : this.state.row1
      let n = this.state.row1
      let one = this.state.continueButton ? 1 : 0

      //to arrange file id array
      this.tagged_file_ids()
      //to arrange file id array

      // my code

      for (var i = n; i < useme + n; i++) {
        var rows = this.state.rows;
        if (this.state.rows.length < useme + n) {
          rows.push("row" + (initial_value + 1));
        }
        initial_value = initial_value + 1 + n;
        await this.setState({
          isAdd: false,
          initial_value: this.state.initial_value + 1 + n
        })

        await  this.setState({ con1: false, row1: useme + n, undo_line1: n - 1, rows: rows,
           description_coordinate: coordinate, description_content: rows, 
           undo_value: 'description_content', undo_value_name: 'descr', description_type: ocrradio }, 
           () => {
          this.state.rows.forEach((item, i) => {
            let r = n + i
            jQuery('#description' + r).val(newResut[i])
            jQuery('#descr' + r).val(newResut[i])
          })
        })
        var ocrradio1 = ocrradio + i
        jQuery('#' + ocrradio1).text(newResut[i])
      }
    }
    else if (ocrradio === 'description') {
      let newDes = (this.state.tabelData).split('\n');

      vals = jQuery("#" + ocrradio).val();
      vals = selectedOCRVALUE.trim();
      var res = vals.split(" ");

      let temp_var = 50, temparr = [], newarr = [], iq = 1;
      this.state.convertedImageDAta3.result.map((e, i) => {
        if (
          ((this.state.coordinates[0] <= e.boundingPoly.vertices[0].x &&
            this.state.coordinates[1] >= e.boundingPoly.vertices[0].x) ||
            (this.state.coordinates[0] <= e.boundingPoly.vertices[1].x &&
              this.state.coordinates[1] >= e.boundingPoly.vertices[1].x) ||
            (this.state.coordinates[0] <= e.boundingPoly.vertices[2].x &&
              this.state.coordinates[1] >= e.boundingPoly.vertices[2].x) ||
            (this.state.coordinates[0] <= e.boundingPoly.vertices[3].x &&
              this.state.coordinates[1] >= e.boundingPoly.vertices[3].x)
          ) &&
          ((this.state.coordinates[2] <= e.boundingPoly.vertices[0].y &&
            this.state.coordinates[3] >= e.boundingPoly.vertices[0].y) ||
            (this.state.coordinates[2] <= e.boundingPoly.vertices[1].y &&
              this.state.coordinates[3] >= e.boundingPoly.vertices[1].y) ||
            (this.state.coordinates[2] <= e.boundingPoly.vertices[2].y &&
              this.state.coordinates[3] >= e.boundingPoly.vertices[2].y) ||
            (this.state.coordinates[2] <= e.boundingPoly.vertices[3].y &&
              this.state.coordinates[3] >= e.boundingPoly.vertices[3].y))
        ) {

          if (iq == 1) {
            temp_var = temp_var + parseFloat(e.boundingPoly.vertices[0].y);
            iq = iq + 1;

          }
          if ((e.boundingPoly.vertices[0].y) <= temp_var) {

            newarr.push(e.description);
            temp_var = 25 + parseFloat(e.boundingPoly.vertices[0].y);
          } else {
            temparr.push(newarr.join(' '));
            newarr = [];
            newarr.push(e.description);
            temp_var = 25 + parseFloat(e.boundingPoly.vertices[0].y);
          }
        }
      })

      temparr.push(newarr.join(' '));


      var newResut = [];
      //res.map((res1)=>{
      newDes.map((res2) => {
        var temp = res2.split(" ");

        if (temp.length > 3) {
          var tempString = res2.substring(
            res2.indexOf(" ") + 1,
            res2.lastIndexOf(" ")
          );
        } else {
          var tempString = res2;
        }


        if (tempString != '' && tempString.length > 1 && vals.includes(tempString)) {
          newResut.push(res2);
          newResut = newResut.filter(
            (item, index) => newResut.indexOf(item) == index
          );
        }
      });
      //})

      var useme = temparr.length
      var initial_value = this.state.initial_value;


      // my code
      // let n = this.state.con1 ? Number(this.state.rows.length) : this.state.row1
      let n = this.state.row1
      let one = this.state.continueButton ? 1 : 0

      //to arrange file id array
      this.tagged_file_ids()
      //to arrange file id array

      // my code

      for (var i = n; i <= useme + n; i++) {
        var rows = this.state.rows;
        if (this.state.rows.length < temparr.length + n) {
          rows.push("row" + (initial_value + 1));
        }
        initial_value = initial_value + 1 + n;
        await this.setState({
          isAdd: false,
          initial_value: this.state.initial_value + 1 + n
        })
        await  this.setState({ con1: false, row1: useme + n, undo_line1: n - 1, rows: rows, description_coordinate: coordinate, description_content: rows, undo_value: 'description_content', undo_value_name: 'descr', description_type: ocrradio }, () => {
          this.state.rows.forEach((item, i) => {
            let r = n + i
            jQuery('#description' + r).val(temparr[i])
            jQuery('#descr' + r).val(temparr[i])
          })
        })
        var ocrradio1 = ocrradio + i
        jQuery('#' + ocrradio1).text(temparr[i])
      }
    } else if (
      ocrradio === "quantity" ||
      ocrradio === "unit_price" ||
      ocrradio === "subtotal"
    ) {
      vals = jQuery("#" + ocrradio).val();
      vals = selectedOCRVALUE.trim();
      vals = vals.replace(",", "");
      //vals =vals.replace('.',''); /[.\-_]/
      var res = vals.split(" ");
      var useme = res.length;
      var initial_value = Number(this.state.initial_value) + 1;

      // my code
      let check1 = ocrradio === "quantity" ? this.state.con2 : this.state.con3
      let check2 = ocrradio === "quantity" ? this.state.row2 : this.state.row3
      let whichRow = ocrradio === "quantity" ? 'row2' : 'row3'
      let whichRow_line = ocrradio === "quantity" ? 'undo_line2' : 'undo_line3'


      // let n = check1 ? Number(this.state.rows.length) : check2
      let n = check2
      let one = this.state.continueButton ? 1 : 0

      //to arrange file id array
      this.tagged_file_ids()
      //to arrange file id array

      // my code

      for (var i = check2; i < useme + n; i++) {
        var rows = this.state.rows;
        if (this.state.rows.length < res.length + n) {
          rows.push('row' + (initial_value + 1))
        }
        initial_value = initial_value + 1 + n;
        this.setState({
          isAdd: false,
          initial_value: this.state.initial_value + 1 + n,
        });


        if (ocrradio === "quantity") {
          await this.setState({ con2: false, rows: rows, [whichRow]: useme + n, [whichRow_line]: n - 1, quantity_coordinate: coordinate, quantity_content: rows, undo_value: 'quantity_content', undo_value_name: 'quantity' }, () => {
            this.state.rows.forEach((item, i) => {
              let r = n + i
              jQuery("#quantity" + r).val(res[i]);
              this.handleChangeItems(0, r);
            });
          });
        } else if (ocrradio === "unit_price") {
          await this.setState(
            { con3: false, rows: rows, [whichRow]: useme + n, [whichRow_line]: n - 1, unit_price_coordinate: coordinate, unit_price_content: rows, undo_value: 'unit_price_content', undo_value_name: 'unit_price' },
            () => {
              this.state.rows.forEach((item, i) => {
                let r = n + i
                // alert(res[i]);
                var number = 0;
                if (res[i] != undefined || res[i] != null) {
                  number = Number(res[i].replace(/[^0-9\.-]+/g, ""));
                }
                jQuery("#unit_price" + r).val(number);
                this.handleChangeItems(0, r);
              });
            }
          );
        } else if (ocrradio === "subtotal") {
          await   this.setState({ rows: rows }, () => {
            this.state.rows.forEach((item, i) => {
              jQuery("#subtotal" + i).val(res[i]);
              this.handleChangeItems(0, i);
            });
          });
        }
        var ocrradio1 = ocrradio + i;
        jQuery("#" + ocrradio1).text(res[i]);
      }
    } else if (ocrradio === "company_name") {
      vals = jQuery("#" + ocrradio)
        .val()
        .trim();
      vals = vals + " " + selectedOCRVALUE;
      //jQuery('#' + ocrradio).val(vals)
      // alert(vals);
      await this.setState({ company_name: vals.trim(), name_coordinate: coordinate, undo_value: 'company_name' });
      this.handleCoordsValues(vals.trim());
    } else if (ocrradio === "invoice_no") {
      vals = jQuery("#" + ocrradio).val();
      vals = vals + " " + selectedOCRVALUE.trim();
      //jQuery('#' + ocrradio).val(vals)
      await this.setState({ invoice_no: vals, invoice_no_coordinate: coordinate, undo_value: 'invoice_no' });
    } else if (ocrradio === "address") {
      vals = jQuery("#" + ocrradio).val();
      vals = vals + " " + selectedOCRVALUE.trim();
      //jQuery('#' + ocrradio).val(vals)
      await this.setState({ address: vals, address_coordinate: coordinate });
    } else if (ocrradio === "currency") {
      vals = jQuery("#" + ocrradio).val();
      vals = vals + " " + selectedOCRVALUE.trim();
      if (
        jQuery("#paid_status").html() ==
        "Partially paid--Bill"
      ) {
        alert(
          "you cannot change currency to partially paid Bills"
        );
      } else {
        jQuery("#Exchange").val("");
        this.handleCheck_currency(vals);
      }
      //jQuery('#' + ocrradio).val(vals)
      await this.setState({ currency_coordinate: coordinate });
    }
    else if (ocrradio === "date") {

      // vals = jQuery("#" + ocrradio).val();
      // vals = selectedOCRVALUE.trim();
      //jQuery('#' + ocrradio).val(vals)
      // vals = jQuery('#' + ocrradio).val()
      // vals = selectedOCRVALUE.trim();
      // console.log('mmmm',jQuery("#" + ocrradio).val())
      // console.log('mmmm',selectedOCRVALUE)
      // vals = jQuery("#" + ocrradio).val() ? moment(jQuery("#" + ocrradio).val()).format('DD/MM/YYYY') : ''

      let vals
      let date = selectedOCRVALUE.trim()
      let check = date.split('/')
     if(check && check.length == 2){
       vals = moment(date,this.state.date_format).format('DD/MM/YYYY') == 'Invalid date' ? moment(date,"MM/DD/YYYY").format('DD/MM/YYYY')  : moment(date,this.state.date_format).format('DD/MM/YYYY')
       console.log('mmmm1',vals)
      }else{
       vals = moment(date).format('DD/MM/YYYY') == 'Invalid date' ? moment(date).format('DD/MM/YYYY') : moment(date).format('DD/MM/YYYY').replace('-','')
       console.log('mmmm',vals)
       console.log('mmmm2',selectedOCRVALUE.trim())
      }
     
      await this.setState({ invoice_date1: vals, date_coordinate: coordinate, date: vals, undo_value: 'date' })
    } else if (ocrradio === 'due_date') {

      // vals = jQuery('#' + ocrradio).val() ? moment(jQuery("#" + ocrradio).val()).format('DD/MM/YYYY') : ''
      // vals = moment(selectedOCRVALUE.trim()).format('DD/MM/YYYY');

      let vals
      let date = selectedOCRVALUE.trim()
      let check = date.split('/')
     if(check && check.length == 2){
       vals = moment(date,this.state.date_format).format('DD/MM/YYYY') == 'Invalid date' ? moment(date,"MM/DD/YYYY").format('DD/MM/YYYY')  : moment(date,this.state.date_format).format('DD/MM/YYYY')
     }else{
      vals = moment(date).format('DD/MM/YYYY') == 'Invalid date' ? moment(date).format('DD/MM/YYYY') : moment(date).format('DD/MM/YYYY').replace('-','')
    }

    await this.setState({ dueDateReal: vals, due_date_coordinate: coordinate, undo_value: 'dueDateReal' })
    }

    // else {
    //   vals = jQuery('#' + ocrradio).val()
    //   vals = vals + ' ' + selectedOCRVALUE
    //   jQuery('#' + ocrradio).val(vals)
    // }
    fetch(savedatatagingcoordsdraft, {
      method: "POST",
      body: JSON.stringify({
        companyName: this.state.company_name ? this.state.company_name.trim() : '',
        companyCoordinate: this.state.name_coordinate,
        address: this.state.address,
        addressCoordinate: this.state.address_coordinate,
        invoiceNumber: this.state.invoice_no,
        invoiceCoordinate: this.state.invoice_no_coordinate,
        invoiceDate: this.state.invoice_date1,
        dateCoordinates: this.state.date_coordinate,
        due_date: this.state.due_date,
        due_date_coordinate: this.state.due_date_coordinate,
        item_coordinate: this.state.item_coordinate,
        description_coordinate: this.state.description_coordinate,
        quantity_coordinate: this.state.quantity_coordinate,
        unit_price_coordinate: this.state.unit_price_coordinate,
        // item: (this.state.item_coordinate = "") ? this.state.item_content : '',
        // description: (this.state.description_coordinate = "") ? this.state.description_content : '',
        description: (this.state.description_coordinate == "" || this.state.description_coordinate == undefined) ? this.state.description : '',
        account_category: this.state.selected,
        account_category_id: this.state.selectedindex,
        itemlist: this.state.myarray,
        description_type: this.state.description_type,
        currency_coordinate: this.state.currency_coordinate,
        client_id: this.state.logged_client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
      });
    setTimeout(() => {
      window.jQuery("#add-modal-ocr").modal("hide");
    }, 500);


  };
  addRow = () => {
    if (
      this.state.myarray && this.state.myarray.length > this.state.rows.length - 1 &&
      this.state.myarray[this.state.myarray.length - 1].price > -1 &&
      this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
      this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
    ) {
      var rows = this.state.rows;
      rows.push("row" + (this.state.initial_value + 1));

      this.setState({
        isAdd: false,
        initial_value: this.state.initial_value + 1,
      });

      this.setState({ rows: rows }, ()=>{ this.assignDefaultGST() ; this.assignDefaultCatagory()})
    } else {
      this.setState({ isAdd: true });
    }
  };

  // add_coulmn = colType => {
  //   let type = this.state.selectedColumnType
  //   type = type ? type : colType
  //   var user_id = parseFloat(this.state.logged_user_id)
  //   if (type === 'dropDownField') {
  //     // TODO: Make the API
  //     FetchAllApi.get_columns_list(user_id, (err, response) => {

  //       if (response.status === 1) {

  //         this.setState({
  //           number_of_columns_list: response.list
  //         })
  //       } else {
  //         this.setState({
  //           number_of_columns_list: []
  //         })
  //       }
  //     })
  //   }
  //   let item_check = jQuery(
  //     `#coulmn${this.state.rows.length - 1}${this.state.coulmns.length - 1}`
  //   ).val()
  //   if (item_check != '') {
  //     var coulmns = this.state.coulmns
  //     coulmns.push('new row')
  //     this.setState({ coulmns: coulmns })
  //   }
  //   window.jQuery('#pop-modal-2').modal('hide')
  // }
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
      // alert(response.message);
      if (response.status === 1) {
        this.getColumns();

        //   this.setState({ items: response.list[0].columns })
      } else {
      }
    });

    // FetchAllApi.add_columns_list(
    //   user_id,
    //   type_,
    //   coulmn_name,
    //   (err, response) => {
    //     if (response.status === 1) {
    //       this.getColList()
    //     } else {
    //       this.setState({
    //         number_of_columns_list: []
    //       })
    //     }
    //   }
    // )

    //       FetchAllApi.get_columns_list(user_id, (err, response) => {
    //   if (response.status === 1) {
    //     this.setState({
    //       number_of_columns_list: response.list
    //     })
    //   } else {
    //     this.setState({
    //       number_of_columns_list: []
    //     })
    //   }
    // })

    // let type = this.state.selectedColumnType
    // type = type ? type : colType
    // var user_id = parseFloat(this.state.logged_user_id)
    // if (type === 'dropDownField') {
    //   // TODO: Make the API
    //   FetchAllApi.get_columns_list(user_id, (err, response) => {
    //     if (response.status === 1) {
    //       this.setState({
    //         number_of_columns_list: response.list
    //       })
    //     } else {
    //       this.setState({
    //         number_of_columns_list: []
    //       })
    //     }
    //   })
    // }
    // let item_check = jQuery(
    //   `#coulmn${this.state.rows.length - 1}${this.state.coulmns.length - 1}`
    // ).val()
    //   var coulmns = this.state.coulmns
    //   coulmns.push('new row')
    //   this.setState({ coulmns: coulmns })

    window.jQuery("#pop-modal-2").modal("hide");
  };
  add_options = () => {
    let type = this.state.columnId;
    let value = this.state.new_option;
    var user_id = parseFloat(this.state.logged_user_id);
    FetchAllApi.add_options_drop_down(user_id, type, value, (err, response) => {
      if (response.status === 1) {
        jQuery("#new_option").val("");
        this.setState({ show_succes: true });
        this.add_coulmn("dropDownField");
        var THIS = this;
        setTimeout(function () {
          THIS.setState({ show_succes: false });
        }, 4000);
      } else {
        this.setState({ modal_info_msg: response.message });
        jQuery(".mymsg").fadeIn(2000);
        setTimeout(function () {
          jQuery(".mymsg").fadeOut(2000);
        }, 8000);
      }
    });
    window.jQuery("#drop-down-add").modal("hide");
  };
  handleChange_gst_type = (event) => {
    if (this.state.selected_rate_type != "Fixed price") {
      let entered_value = event.target.value;
      // alert(entered_value)
      if (isNaN(entered_value)) {
        jQuery("#tax").val("");
      } else {
        if (entered_value > 100) {
          jQuery("#tax").val("");
        } else {
          this.setState({ rate_entered: entered_value });
        }
      }
    } else {
      let entered_value = event.target.value;
      if (isNaN(entered_value)) {
        jQuery("#tax").val("");
      } else {
        this.setState({ rate_entered: entered_value });
      }
    }
  };

  defaultcategorylist_onchange = (event) => {
    let keyy = event.target.value;
    let from_create_invoice = 1;
    var client_id = this.state.logged_client_id;

    FetchAllApi.defaultcategorylist_onchange2(
      keyy,
      from_create_invoice,
      client_id,
      (err, response) => {
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

  onChange_filter_balancesheet = (event) => {
    let search_key = event.target.value;
    var client_id = this.state.logged_client_id;

    //alert(search_key)
    FetchAllApi.balancesheetlist_onchange(
      search_key,
      client_id,
      (err, response) => {
        if (response.status === 1) {
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

  delete_Rows = () => {
    // alert(this.state.specific_id_delete)
    // alert(this.state.rows.length)
    var itemid = this.state.specific_id_delete;
    var rows_actual = this.state.rows;
    var myarray = this.state.myarray;
    if (this.state.rows.length > 1) {
      if (itemid > -1) {
        rows_actual.splice(itemid, 1);
      }

      this.setState({ rows: rows_actual }, () => {
        this.handleChangeItems(0, this.state.rows.length - 1);
      });
    } else {
      jQuery("#item0").val("");
      jQuery("#quantity0").val("");
      jQuery("#unit_price0").val("");
      jQuery(".no-bg").val("");
      this.setState({ myarray: [] }, () => {
        this.handleChangeItems(0, this.state.rows.length - 1);
      });
    }
    window.jQuery("#modal_delete").modal("hide");
  };

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
        this.setState({ currencies: currencyAr, currency_clone: currencyAr, exchangeRateApiResult: first });
      });
  };

  UNSAFE_componentWillMount() {
    jQuery(document.body).addClass("minimize_leftbar");
    let client_Id = this.state.logged_client_id;
    //alert(client_Id)
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

    // this.get_currencies();

    FetchAllApi.get_categories((err, response) => {
      if (response.status === 1) {
        // alert('Got list :)');
        this.setState({ categorylist: response.list });
      } else {
      }
    });
    this.deafultCategoryList(this);

    FetchAllApi.balancesheetlist(
      this.state.logged_client_id,
      (err, response) => {
        if (response.status === 1) {
          this.setState({
            balancesheetlist: response.list,
          });
        } else {
        }
      }
    );

    jQuery("title").html("Data Tagging | GBSC");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }

    var file_id = this.props.match.params.file_id;

    FetchAllApi.getFilePath(file_id, (err, response) => {
      if (response.status === 1) {

        // to find which type ocr
        let length = (response.file_path_array && response.file_path_array.length > 0) ? response.file_path_array.length : 0
        let path, type_of_ocr, present_file_id
        if (length == 0) {
          path = response.file_path
          type_of_ocr = 'single'
          present_file_id = response.file_id
        } else if (length == 1) {
          path = response.file_path_array[0].file_path
          type_of_ocr = 'single_array'
          present_file_id = response.file_path_array[0].file_id
        } else if (length > 1) {
          path = response.file_path_array[0].file_path
          type_of_ocr = 'multiple'
          present_file_id = response.file_path_array[0].file_id
        }
        // to find which type ocr

        // let type_of_ocr = (response.file_path_array && response.file_path_array.length > 0) ? 'multiple' : 'single'
        // let path = type_of_ocr == 'single' ? response.file_path : response.file_path_array[0].file_path



        this.setState({
          get_file_path: path, file_path_array: response.file_path_array, type_of_ocr, present_file_id
        });
        this.get_api_cloud(path);
        this.getCommments(present_file_id);
        // this.get_api_cloud(this.state.get_file_path);
      } else {
      }
    });

    // FetchAllApi.getJSONGOOGLE(this.state.get_file_path, (err, response) => {
    //   if (response.status === 1) {
    //     this.setState({
    //       convertedImageDAta:response
    //     })

    //   } else {
    //   }
    // })


  }

  getCommments(file_id) {
    FetchAllApi.getFileCmnts(file_id, (err, response) => {
      if (response.status === 1) {
        for (let i = 0; i < response.details.length; i++) {
          this.getSubcomments(response.details[i].comment_id);
        }
        this.setState(
          {
            combinedArray: [],
          },
          () => {
            this.setState({
              file_comments: response.details,
            });
          }
        );
      } else {
        this.setState({ file_comments: [] })
      }
    });
  }

  handleClick(e, data) {
  }

  callmodal(description) {
    jQuery("#selectedOCRVALUE").text(description);
    window.jQuery("#add-modal-ocr").modal("show");
  }

  cancel_gst_modal = () => {
    jQuery("#sales_tax_code").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#tax").val("");

    this.setState({
      modal_info_msg: "",
      selectedOption: "option2",
    });
  };

  loadFile(e) {
    var files = e.target.files;
    this.setState({ attachment_file_length: files.length });

    if (files.length > 0) {
      var fileArra = this.state.attachment_file;
      //var fileThumbArra = this.state.imgThumb;

      for (var i = 0; i < files.length; i++) {
        fileArra.push(e.target.files[i]);
        this.setState({
          //   selectedFile:URL.createObjectURL(e.target.files[i]),
          attachment_file: fileArra,
        });
      }
    }

  }

  addCommentFunc(e) {
    e.preventDefault();
    var pstCommnt = jQuery("#comment_text").val();
    var user_id = parseFloat(this.state.logged_user_id);
    var list_id = parseFloat(this.props.match.params.list_id);
    // var file_id = parseFloat(this.props.match.params.file_id);
    var file_id = parseFloat(this.state.present_file_id);
    var parent_comment_id = 0;
    var attachments = "";

    FetchAllApi.addComment(
      pstCommnt,
      user_id,
      list_id,
      file_id,
      attachments,
      parent_comment_id,
      (err, response) => {
        if (response.status === 1) {
          alert(response.message)
          // alert('success');
          // window.location.reload();
          this.setState({
            add_cmnt_msg: response.message,
          });
          jQuery(".comment-sec")[0].reset();

          // jQuery(".resp_msg").fadeIn(2000);
          // setTimeout(function () {
          //   jQuery(".resp_msg").fadeOut(2000);
          // }, 8000);

          this.getCommments(file_id);
        } else {
          alert(response.message)
          this.setState({
            add_cmnt_msg: response.message,
          });
          // jQuery(".resp_msg").fadeIn(2000);
          // setTimeout(function () {
          //   jQuery(".resp_msg").fadeOut(2000);
          // }, 8000);
        }
      }
    );
  }
  update_rate_type = () => {
    jQuery("#tax").val("");
    this.setState({
      selected_rate_type: "%",
      maximum_chr_lngth: 4,
    });
  };
  update_rate_fixed = () => {
    jQuery("#tax").val("");
    this.setState({
      selected_rate_type: "Fixed price",
      maximum_chr_lngth: 100,
    });
  };
  addSubCommentFunc(prnt_id, index) {
    var pstCommnt = jQuery("#text" + index).val();
    var user_id = parseFloat(this.state.logged_user_id);
    var list_id = parseFloat(this.props.match.params.list_id);
    // var file_id = parseFloat(this.props.match.params.file_id);
    var file_id = parseFloat(this.state.present_file_id);
    var parent_comment_id = prnt_id;
    if (this.state.attachment_file.length > 0) {
      var attachments = this.state.attachment_file;
    } else {
      var attachments = "";
    }

    this.addSubComment(
      pstCommnt,
      user_id,
      list_id,
      file_id,
      attachments,
      parent_comment_id,
      index
    );
  }

  addSubComment(
    pstCommnt,
    user_id,
    list_id,
    file_id,
    attachments,
    parent_comment_id,
    index
  ) {
    FetchAllApi.addComment(
      pstCommnt,
      user_id,
      list_id,
      file_id,
      attachments,
      parent_comment_id,
      (err, response) => {
        if (response.status === 1) {
          jQuery("#text" + index).val("");
          alert("sub comment added");
          this.setState({
            add_cmnt_msg: response.message,
            attachment_file: [],
          });

          // jQuery(".resp_msg").fadeIn(2000);
          // setTimeout(function () {
          //   jQuery(".resp_msg").fadeOut(2000);
          // }, 8000);

          this.getCommments(file_id);
          //   this.replyLink(parent_comment_id, 'replyBtn')
        } else {
          alert(response.message)
          this.setState({
            add_cmnt_msg: response.message,
          });
          // jQuery(".resp_msg").fadeIn(2000);
          // setTimeout(function () {
          //   jQuery(".resp_msg").fadeOut(2000);
          // }, 8000);
        }
      }
    );
  }

  dataTaggingFunc(list_id, file_id) {
    this.props.history.push("/data_tagging/" + list_id + "/" + file_id);
    window.scrollTo(0, 0);
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  routedChange(parameter) {
    this.props.history.push("/" + parameter);
    window.scrollTo(0, 0);
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  updateCmmnt(cmntid, index, prntid) {
    // e.preventDefault()
    var comment_id = cmntid;
    var comment_text = jQuery("#textup" + index).val();
    var user_id = this.state.logged_user_id;
    // var file_id = this.props.match.params.file_id;
    var file_id = this.state.present_file_id;
    var parent_comment_id = prntid;
    this.updateCommentApi(
      comment_id,
      comment_text,
      user_id,
      file_id,
      parent_comment_id,
      index
    );
  }

  updateCommentApi(
    comment_id,
    comment_text,
    user_id,
    file_id,
    parent_comment_id,
    index
  ) {
    FetchAllApi.updateComment(
      comment_id,
      comment_text,
      user_id,
      (err, response) => {
        if (response.status === 1) {
          alert(response.message);

          jQuery("#update_box" + index).css("display", "none");
          this.setState({
            add_cmnt_msg: response.message,
          });

          // jQuery(".resp_msg").fadeIn(2000);
          // setTimeout(function () {
          //   jQuery(".resp_msg").fadeOut(2000);
          // }, 8000);

          jQuery(".comment-txt").removeClass("hide");
          jQuery(".update_cmnt").addClass("hide");

          // this.getCommments(this.props.match.params.file_id);
          this.getCommments(this.state.present_file_id);
          // if(parseFloat(parent_comment_id) > 0){
          //     this.replyFunc(parent_comment_id);
          // }
          // this.replyLink(parent_comment_id, 'replyUpdt')
        } else {
          alert(response.message)
          this.setState({
            add_cmnt_msg: response.message,
          });
          // jQuery(".resp_msg").fadeIn(2000);
          // setTimeout(function () {
          //   jQuery(".resp_msg").fadeOut(2000);
          // }, 8000);
        }
      }
    );
  }

  filter_currenciess = (e) => {
    // alert(e.target.value)
    var matched_terms = [];
    var search_term = e.target.value;
    if (search_term != "") {
      search_term = search_term.toLowerCase();
      this.state.currencies.forEach((item) => {
        if (item.toLowerCase().indexOf(search_term) !== -1) {
          matched_terms.push(item);
        }

        this.setState({ currencies: matched_terms });
      });
    } else {
      this.get_currencies();
    }
  };

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  };

  typeOfColumnTobeModified = (changeEvent) => {
    this.setState({
      selectedColumnType: changeEvent.target.value,
    });
  };

  modal_cancel = () => {
    jQuery("#sales_tax_code").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#tax").val("");
    this.setState({ modal_info_msg: "" });
    window.jQuery("#pop-modal-1").modal("hide");

  };
  deleteComment(comment_id) {
    FetchAllApi.deleteComment(
      comment_id,
      this.state.list_id,
      this.state.logged_user_id,
      (err, response) => {
        if (response.status === 1) {
          alert(response.message)
          this.setState({
            add_cmnt_msg: response.message,
          });
          // this.getCommments(parseInt(this.props.match.params.file_id));
          this.getCommments(parseInt(this.state.present_file_id));
          //jQuery(".comment-txt").removeClass('hide');
          //jQuery(".reply-form").addClass('hide');

          // jQuery(".resp_msg").fadeIn(2000);
          // setTimeout(function () {
          //   jQuery(".resp_msg").fadeOut(2000);
          // }, 8000);
        } else {
          alert(response.message)
          // this.setState({
          //   add_cmnt_msg: response.message,
          // });
          // jQuery(".resp_msg").fadeIn(2000);
          // setTimeout(function () {
          //   jQuery(".resp_msg").fadeOut(2000);
          // }, 8000);
        }
      }
    );
  }

  addNewRole = (inputfromuser) => {
    let input = inputfromuser;
    // alert(input);
    this.setState({
      newrole: input,
    });
  };

  componentDidUpdate() {




    // jQuery("#table_custom").on('click', '.bootstrap-select', function () {
    //   jQuery(".table-responsive").css("overflow", "visible");
    // });
    // window.addEventListener('click', function (e) {
    //   if (document.getElementById('table_custom').contains(e.target)) {
    //     // click inside
    //   } else {
    //     jQuery(".table-responsive").removeAttr("style");
    //   }
    // });


    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

    var THIS = this;
    jQuery(".edit_cmnt").click(function () {
      var text_cmnt = jQuery(this)
        .closest(".prnt_cmnt")
        .next(".comment-txt")
        .text();
      var this_cmnt_id = jQuery(this).attr("data-comment-id");
      var blah = jQuery("#add-new-column").val();
      jQuery(this).closest(".prnt_cmnt").next(".comment-txt").addClass("hide");
      jQuery(this)
        .closest(".prnt_cmnt")
        .next(".comment-txt")
        .next(".reply-form")
        .removeClass("hide");
      jQuery("#cmmnt_txt_id" + this_cmnt_id).val(text_cmnt);
    });

    jQuery(".cancel_button").click(function () {
      jQuery(this).closest(".reply-form").addClass("hide");
      jQuery(this)
        .closest(".reply-form")
        .prev(".comment-txt")
        .removeClass("hide");
    });
    if (jQuery("#overviewSeatMap").length) {
      window.jQuery("#overviewSeatMap").pictarea({
        rescaleOnResize: true,
        maxSelections: 1,
        normal: {
          fillStyle: "transparent",
          strokeStyle: "#ff0f0f",
          lineWidth: 1,
        },
      });
    }
    window.addEventListener("DOMContentLoaded", function () {
      var image = document.querySelector("#image");
      var minAspectRatio = 0.5;
      var maxAspectRatio = 1.5;
      var cropper = new Cropper(image, {
        ready: function () {
          var cropper = this.cropper;
          var containerData = cropper.getContainerData();
          var cropBoxData = cropper.getCropBoxData();
          var aspectRatio = cropBoxData.width / cropBoxData.height;
          var newCropBoxWidth;

          if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
            newCropBoxWidth =
              cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);

            cropper.setCropBoxData({
              left: (containerData.width - newCropBoxWidth) / 2,
              width: newCropBoxWidth,
            });
          }
        },

        cropmove: function () {
          var cropper = this.cropper;
          var cropBoxData = cropper.getCropBoxData();
          var aspectRatio = cropBoxData.width / cropBoxData.height;

          if (aspectRatio < minAspectRatio) {
            cropper.setCropBoxData({
              width: cropBoxData.height * minAspectRatio,
            });
          } else if (aspectRatio > maxAspectRatio) {
            cropper.setCropBoxData({
              width: cropBoxData.height * maxAspectRatio,
            });
          }
        },
      });
    });
  }
  clear_tagged_items = () => {
    this.callme();
    window.jQuery("#successModal").modal("hide");
    this.setState({ isAdd: false });
    // jQuery('#successModal').removeClass('in')
    // jQuery('body').removeClass('modal-open')
    // jQuery('.modal-backdrop').removeClass(
    //   'in'
    // )
  };
  //   replyLink (parent_comment_id, replyToggele) {
  //     var THIS = this
  //     //alert(replyToggele+' '+typeof(parent_comment_id));
  //     if (replyToggele === 'replyLink') {
  //       jQuery('#reply_cnt' + parent_comment_id).toggleClass('in')
  //     }


  //     FetchAllApi.getSubCmmnts(parent_comment_id, (err, response) => {
  //       alert('hi')
  //       if (response.status === 1) {
  //         const sub_comment = response.details.map(item => {
  //           return (
  //             <React.Fragment key={item.parent_comment}>
  //               <div className='reply-cont col-md-12 col-xs-12'>
  //                 <div className='col-md-12 col-xs-12 pad-no'>
  //                   <div className='avatar-img'>
  //                     <img
  //                       className='img-responsive'
  //                       src='../../images/avatar-2.png'
  //                       alt='AvatarIMG'
  //                     />
  //                   </div>
  //                   <div className='reply-user'>
  //                     <span className='col-md-12 col-xs-12 pad-no user-name'>
  //                       Mattie Howell
  //                     </span>
  //                     <span className='col-md-12 col-xs-12 pad-no date'>
  //                       3 hrs ago
  //                     </span>
  //                   </div>
  //                   <div className='dropdown menu-item'>
  //                     <a
  //                       href='javascript'
  //                       className='dropdown-toggle'
  //                       data-toggle='dropdown'
  //                     >
  //                       <img src='../../images/menu-dot.svg' alt='icon' />
  //                     </a>
  //                     <ul className='dropdown-menu'>
  //                       <li>
  //                         <a href='javascript:;'>Edit</a>
  //                       </li>
  //                       <li>
  //                         <a href='javascript:;'>Delete</a>
  //                       </li>
  //                     </ul>
  //                   </div>
  //                 </div>
  //                 <p className='col-md-12 col-xs-12 pad-no comment-txt'>
  //                   Excepteur sint occaecat cupidatat non proident, sunt in culpa
  //                   qui officia deserunt mollit anim
  //                 </p>
  //                 <div className='attachment-item col-md-12 col-xs-12 pad-no'>
  //                   <a href='javascript:;'>
  //                     <img src='../../images/pdf-icon.png' alt='PDF' />
  //                     <span>Bill-payment.pdf</span>
  //                   </a>
  //                   <a href='javascript:;'>
  //                     <img src='../../images/img-icon.png' alt='PDF' />
  //                     <span>Taxi-bill.png</span>
  //                   </a>
  //                 </div>
  //               </div>
  //               <div className='col-md-12 col-xs-12 pad-no'>
  //                 <button className='btn btn-lightgray'>Resolved</button>
  //                 <a href='javascript:;' className='reply-link'>
  //                   Reply
  //                 </a>
  //               </div>
  //             </React.Fragment>
  //           )
  //         })

  //         this.setState({
  //           sub_comments: sub_comment
  //         })
  //       } else {
  //         // jQuery('#reply_cnt' + parent_comment_id)
  //         //   .children('.subCmnt')
  //         //   .html('')

  //         this.setState({
  //           sub_comments: []
  //         })
  //       }
  //     })
  //   }

  selectHandlerBalancelist = (event) => {
    event.preventDefault();
    let balance_list_selected = event.target.value;
    this.setState({ balance_list_selected: event.target.value });
    // this.convertHandler(ToCurrency);
  };
  selectHandler = (event) => {
    event.preventDefault();
    let ToCurrency = event.target.value;
    this.setState({ ToCurrency: event.target.value });
    // this.convertHandler(ToCurrency);
  };

  add_gst_details = () => {
    let sales_tax_code = this.state.sales_tax_code;
    let sales_tax_name = this.state.salesTax_name_entered;
    let show_on_list = 1;
    let tax_type = this.state.selectedOption === "option1" ? 1 : 2;
    let rate = this.state.rate_entered;

    if (
      this.state.selected_rate_type != "Fixed price" &&
      this.state.selected_rate_type === "%"
    ) {
      var rate_type = 1;
    } else {
      var rate_type = 2;
    }

    let country = this.state.country_code;
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
    FetchAllApi.add_gst_details(items, (err, response) => {
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
        // jQuery('.modal fade pop-modal-in').fadeIn(2000)
        // setTimeout(function () {
        //   jQuery('.modal fade pop-modal-in').fadeOut(2000)
        // }, 8000)

        // jQuery('#pop-modal-1').removeClass('in')
        // jQuery('body').removeClass('modal-open')
        // jQuery('.modal-backdrop').removeClass('in')

        // setTimeout(function () {
        //  jQuery('#pop-modal-1').removeClass('in')
        // jQuery('body').removeClass('modal-open')
        // jQuery('.modal-backdrop').removeClass('in')
        // }, 3000)
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

  convert_date_format = () => {
    let date = this.state.date
    let array = date.split('/')
    let format = array[2] + "-" + array[1] + "-" + array[0]
    return format

    // var convert = (str) => {
    //   var date = new Date(str),
    //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    //     day = ("0" + date.getDate()).slice(-2);
    //   return [date.getFullYear(), mnth, day].join("-");
    // };
    // return convert(this.state.date);
  };


  saveAndContinue = () => {
    var selected_date = this.convert_date_format();
    let sales_invoice_id;
    if (this.props.location.state !== undefined) {
      sales_invoice_id = this.props.location.state
    } else {
      sales_invoice_id = 0
    };


    var exchange_rate;
    if (this.state.cus_rate_rate.length > 0) {
      exchange_rate = this.state.cus_rate_rate;
    } else {
      exchange_rate = this.state.exchange_value;
    }

    let items = {
      // invoice_number: this.state.invoice_idl,
      client_id: this.state.logged_client_id,
      item_total_foreign_currency: this.state.item_total_foreign_currency,
      tax_amount_home_currency: this.state.tax_amount_home_currency,
      // grand_total_home_currency: this.state.grand_total_home_currency,
      grand_total_home_currency: Number(
        Number(
          isNaN(Number(this.state.item_total_home_currency))
            ? 0.0
            : this.state.item_total_home_currency
        ) +
        Number(
          isNaN(Number(this.state.tax_amount_home_currency))
            ? 0.0
            : this.state.tax_amount_home_currency
        )
      ).toFixed(2),
      item_total_home_currency: this.state.item_total_home_currency,
      tax_amount_foreign_currency: this.state.tax_amount_foreign_currency,
      grand_total_foreign_currency: this.state.grand_total_foreign_currency,
      currency: this.state.ToCurrency,
      exchange_rate: exchange_rate,
      type: 1,
      sales_invoice_id: sales_invoice_id,
      list_id: this.props.match.params.list_id,
      // file_id: this.props.match.params.file_id,  
      file_id: this.state.tagged_file_ids,
      tagged_user_id: this.state.logged_user_id,
      invoice_date: selected_date,
      company_name: this.state.company_name,
      invoice_no: this.state.invoice_no,
      invoice_number: this.state.invoice_no,
      company_address: this.state.address,
      incorport_date: selected_date,
      account_category: this.state.account_category,
      default_category: this.state.selectedindex,
      item_list: this.state.myarray,
      // balance_sheet_category: 1,
      //  let status_infoList_selected = jQuery(
      // '#status_slected option:selected'
      // ).data('status')
      balance_sheet_category: this.state.account_id,
      // balance_sheet_category: 5,
      payment_date: moment(this.state.paymentdate).format("YYYY-MM-DD"),
      reference: this.state.reference,
      amount_in_words: toWords.convert(
        Number(this.state.grand_total_home_currency)
      ),
      payment_method: jQuery("#payment_method").val(),
      payment_amount: this.state.payment_amount,
      payment_exchange_rate: this.state.exchange_value,
      descripation: this.state.payment_desc,
      payment_account: this.state.balanceSheetCategeory,
      // payment_account: jQuery("#balanceSheetCategeory").val(),
      third_account_id: jQuery("#third_account_id").val(),
      including_tax: this.state.isChecked == true ? 1 : 0,
      template_type: this.state.template_type,
      due_date: this.state.dueDate,
      invoice_id: this.state.invoice_id,
      payment_id: this.state.payment_id,
      third_party_type: this.state.third_party_type,
      message: this.state.message,
      default_gst : jQuery("#default_gst_id").val()
    };
    //alert(item_check)
    if (this.Chk_table_validation()) {
      // alert(this.state.editData);
      FetchAllApi.saveAndContinue(
        items,
        this.state.editData,
        (err, response) => {
          if (response.status === 1) {
            this.handleOnClick();
            this.setState({
              isClose: true,
              isAdd: false,
              sales_tax_name: "Choose",
              sales_tax_rate: 0,
              selected: "Choose",
              rows: ["row 1"],
              balance_sheet_category_name: "",
              balance_sheet_category_id: "",
              isChecked: false,
              coulmns: [],
              isCompany_name: true,
              company_name: "",
              invoice_no: "",
              isInvoice_no: true,
              isBalance_sheet_category_name: true,
              isTable_notEmpty: false,
            });
            jQuery("#closeme").fadeIn(12);
            setTimeout(function () {
              if (jQuery("#closeme").fadeOut(2000));
            }, 8000);

            this.callme();
            document.getElementById("selectednow0").innerHTML = "Choose";

            if (
              this.state.comingFrom == 'Accountant Inbox' ||
              this.state.comingFrom == 'Inbox' ||
              this.state.comingFrom == 'Sent Items' ||
              this.state.comingFrom == 'Reviewed Items') {
              localStorage.setItem('list_id', this.props.match.params.list_id)
              this.props.history.goBack()
            } else {
              localStorage.setItem("updated", "yes");
              var iframe = document.createElement("iframe");
              iframe.style.cssText = "opacity:0;position:absolute";
              iframe.src = "about:blank";
              iframe.onload = function () {
                iframe.contentWindow.close.call(window);
                document.body.removeChild(iframe);
              };
              document.body.appendChild(iframe);

            }
            // else {
            //   localStorage.setItem('list_id', this.props.match.params.list_id)
            //   // this.props.history.push('/user_inbox', this.props.location.state)
            //   this.props.history.goBack()
            // }
          } else {
            this.setState({
              isAdd: true,
            });
            alert(response.message)
            this.setState({ message: response.message })
          }
        }
      );

      // const formData = {
      //   "companyName": this.state.companyName,
      //   "companyCoordinate": this.state.name_coordinate,
      //   "address": this.state.address,
      //   "addressCoordinate": this.state.address_coordinate,
      //   "invoiceNumber": this.state.invoice_no,
      //   "invoiceCoordinate": this.state.invoice_no_coordinate,
      //   "invoiceDate": this.state.invoice_date1,
      //   "dateCoordinates": this.state.date_coordinate,
      //   "invoiceItems": this.state.myarray,

      // }

      // if (this.state.data_tagging_done === false) {


      fetch(datatagging_save, {
        method: "POST",
        body: JSON.stringify({
          companyName: this.state.company_name ? this.state.company_name.trim() : '',
          companyCoordinate: this.state.name_coordinate,
          address: this.state.address,
          addressCoordinate: this.state.address_coordinate,
          invoiceNumber: this.state.invoice_no,
          invoiceCoordinate: this.state.invoice_no_coordinate,
          invoiceDate: this.state.invoice_date1,
          dateCoordinates: this.state.date_coordinate,
          due_date: this.state.due_date,
          due_date_coordinate: this.state.due_date_coordinate,
          item_coordinate: this.state.item_coordinate,
          description_coordinate: this.state.description_coordinate,
          quantity_coordinate: this.state.quantity_coordinate,
          unit_price_coordinate: this.state.unit_price_coordinate,
          // item: (this.state.item_coordinate = "") ? this.state.item_content : '',
          // description: (this.state.description_coordinate = "") ? this.state.description_content : '',
          description: (this.state.description_coordinate == "" || this.state.description_coordinate == undefined) ? this.state.description : '',
          account_category: this.state.selected,
          account_category_id: this.state.selectedindex,
          itemlist: this.state.myarray,
          description_type: this.state.description_type,
          currency_coordinate: this.state.currency_coordinate,
          client_id: this.state.logged_client_id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: authorization_key,
        },
      })
        .then((response) => response.json())
        .then((data) => {
        });
      // }

      // request
      //   .post(datatagging_save)
      //   .send(JSON.stringify(formData))
      //   //.set('Authorization', AuthorizationKey)
      //   .set('Content-Type', 'application/json;charset=UTF-8')
      //   .end((err, result) => {
      //   });
    } else {
      this.validation_msg();
      this.setState({ isAdd: true });
      this.handleOnClick();
    }
  };

  saveAndContinue2 = () => {
    var selected_date = this.convert_date_format();
    let sales_invoice_id;
    if (this.props.location.state !== undefined) {
      sales_invoice_id = this.props.location.state
    } else {
      sales_invoice_id = 0
    };

    var exchange_rate;
    if (this.state.cus_rate_rate.length > 0) {
      exchange_rate = this.state.cus_rate_rate;
    } else {
      exchange_rate = this.state.exchange_value;
    }

    var payment_exchange_rate;
    if (this.state.payment_exchange_rate.length > 0) {
      payment_exchange_rate = this.state.payment_exchange_rate;
    } else {
      payment_exchange_rate = this.state.exchange_value;
    }

    let items = {
      client_id: this.state.logged_client_id,
      item_total_foreign_currency: this.state.item_total_foreign_currency,
      tax_amount_home_currency: this.state.tax_amount_home_currency,
      // grand_total_home_currency: this.state.grand_total_home_currency,
      grand_total_home_currency: Number(
        Number(
          isNaN(Number(this.state.item_total_home_currency))
            ? 0.0
            : this.state.item_total_home_currency
        ) +
        Number(
          isNaN(Number(this.state.tax_amount_home_currency))
            ? 0.0
            : this.state.tax_amount_home_currency
        )
      ).toFixed(2),
      item_total_home_currency: this.state.item_total_home_currency,
      tax_amount_foreign_currency: this.state.tax_amount_foreign_currency,
      grand_total_foreign_currency: this.state.grand_total_foreign_currency,
      currency: this.state.ToCurrency,
      exchange_rate: exchange_rate,
      type: 3,
      sales_invoice_id: sales_invoice_id,
      list_id: this.props.match.params.list_id,
      // file_id: this.props.match.params.file_id,
      file_id: this.state.tagged_file_ids,
      tagged_user_id: this.state.logged_user_id,
      invoice_date: selected_date,
      company_name: this.state.company_name,
      // invoice_no: this.state.invoice_no,
      invoice_number: this.state.invoice_no,
      company_address: this.state.address,
      incorport_date: selected_date,
      account_category: this.state.account_category,
      default_category: this.state.selectedindex,
      item_list: this.state.myarray,
      // balance_sheet_category: 5,
      balance_sheet_category: this.state.account_id,
      payment_date: moment(this.state.paymentdate).format("YYYY-MM-DD"),
      reference: this.state.reference,
      amount_in_words: toWords.convert(
        Number(this.state.grand_total_home_currency)
      ),
      payment_method: jQuery("#payment_method").val(),
      payment_amount: this.state.payment_amount,
      payment_exchange_rate: payment_exchange_rate,
      payment_account: this.state.balanceSheetCategeory,
      descripation: this.state.payment_desc,
      // payment_account: jQuery("#balanceSheetCategeory").val(),
      third_account_id: jQuery("#third_account_id").val(),
      including_tax: this.state.isChecked == true ? 1 : 0,
      template_type: this.state.template_type,
      due_date: this.state.dueDate,
      invoice_id: this.state.invoice_id,
      payment_id: this.state.payment_id,
      third_party_type: this.state.third_party_type,
      message: this.state.message,
      default_gst : jQuery("#default_gst_id").val()
    };
    //alert(item_check)
    if (this.Chk_table_validation()) {
      FetchAllApi.addVendorCredit(
        items,
        this.state.editData,
        (err, response) => {
          if (response.status === 1) {
            this.handleOnClick();
            this.setState({
              isClose: true,
              isAdd: false,
              sales_tax_name: "Choose",
              sales_tax_rate: 0,
              selected: "Choose",
              rows: ["row 1"],
              balance_sheet_category_name: "",
              balance_sheet_category_id: "",
              isChecked: false,
              coulmns: [],
              isCompany_name: true,
              company_name: "",
              invoice_no: "",
              isInvoice_no: true,
              isBalance_sheet_category_name: true,
              isTable_notEmpty: false,
            });
            jQuery("#closeme").fadeIn(12);
            setTimeout(function () {
              if (jQuery("#closeme").fadeOut(2000));
            }, 8000);
            this.callme();
            document.getElementById("selectednow0").innerHTML = "Choose";

            if (
              this.state.comingFrom == 'Accountant Inbox' ||
              this.state.comingFrom == 'Inbox' ||
              this.state.comingFrom == 'Sent Items' ||
              this.state.comingFrom == 'Reviewed Items') {
              localStorage.setItem('list_id', this.props.match.params.list_id)
              this.props.history.goBack()
            }

            if (this.state.editData) {
              localStorage.setItem("updated", "yes");
              var iframe = document.createElement("iframe");
              iframe.style.cssText = "opacity:0;position:absolute";
              iframe.src = "about:blank";
              iframe.onload = function () {
                iframe.contentWindow.close.call(window);
                document.body.removeChild(iframe);
              };
              document.body.appendChild(iframe);

            } else {
              // localStorage.setItem('document', this.props.match.params.list_id)
              this.props.history.goBack()
              // this.props.history.push('/user_inbox', this.props.location.state)
            }
          } else {
            this.setState({
              isAdd: true,
            });
            alert(response.message)
            this.setState({ message: response.message })
          }
        }
      );
    } else {
      this.validation_msg();
      this.setState({ isAdd: true });
      this.handleOnClick();
    }
  };

  saveAndContinue_bill_to_credit = () => {
    var selected_date = this.convert_date_format();
    let sales_invoice_id;
    if (this.props.location.state !== undefined) {
      sales_invoice_id = this.props.location.state
    } else {
      sales_invoice_id = 0
    };

    var exchange_rate;
    if (this.state.cus_rate_rate.length > 0) {
      exchange_rate = this.state.cus_rate_rate;
    } else {
      exchange_rate = this.state.exchange_value;
    }

    var payment_exchange_rate;
    if (this.state.payment_exchange_rate.length > 0) {
      payment_exchange_rate = this.state.payment_exchange_rate;
    } else {
      payment_exchange_rate = this.state.exchange_value;
    }

    let items = {
      client_id: this.state.logged_client_id,
      item_total_foreign_currency: this.state.item_total_foreign_currency,
      tax_amount_home_currency: this.state.tax_amount_home_currency,
      // grand_total_home_currency: this.state.grand_total_home_currency,
      grand_total_home_currency: Number(
        Number(
          isNaN(Number(this.state.item_total_home_currency))
            ? 0.0
            : this.state.item_total_home_currency
        ) +
        Number(
          isNaN(Number(this.state.tax_amount_home_currency))
            ? 0.0
            : this.state.tax_amount_home_currency
        )
      ).toFixed(2),
      item_total_home_currency: this.state.item_total_home_currency,
      tax_amount_foreign_currency: this.state.tax_amount_foreign_currency,
      grand_total_foreign_currency: this.state.grand_total_foreign_currency,
      currency: this.state.ToCurrency,
      exchange_rate: exchange_rate,
      type: 3,
      sales_invoice_id: sales_invoice_id,
      list_id: this.props.match.params.list_id,
      // file_id: this.props.match.params.file_id,
      file_id: this.state.tagged_file_ids,
      tagged_user_id: this.state.logged_user_id,
      invoice_date: selected_date,
      company_name: this.state.company_name,
      // invoice_no: this.state.invoice_no,
      invoice_number: this.state.invoice_no,
      company_address: this.state.address,
      incorport_date: selected_date,
      default_category: this.state.selectedindex,
      account_category: this.state.account_category,
      item_list: this.state.myarray,
      // balance_sheet_category: 5,
      balance_sheet_category: this.state.account_id,
      payment_date: moment(this.state.paymentdate).format("YYYY-MM-DD"),
      reference: this.state.reference,
      amount_in_words: toWords.convert(
        Number(this.state.grand_total_home_currency)
      ),
      payment_method: jQuery("#payment_method").val(),
      descripation: this.state.payment_desc,
      payment_amount: this.state.payment_amount,
      payment_exchange_rate: payment_exchange_rate,
      payment_account: this.state.balanceSheetCategeory,
      // payment_account: jQuery("#balanceSheetCategeory").val(),
      third_account_id: jQuery("#third_account_id").val(),
      including_tax: this.state.isChecked == true ? 1 : 0,
      template_type: this.state.template_type,
      due_date: this.state.dueDate,
      invoice_id: this.state.invoice_id,
      payment_id: this.state.payment_id,
      third_party_type: this.state.third_party_type,
      message: this.state.message,
      default_gst: jQuery("#default_gst_id").val()
    };
    //alert(item_check)
    if (this.Chk_table_validation()) {
      FetchAllApi.save_bill_as_vendor_credit(
        items,
        this.state.editData,
        (err, response) => {
          if (response.status === 1) {
            this.handleOnClick();
            this.setState({
              isClose: true,
              isAdd: false,
              sales_tax_name: "Choose",
              sales_tax_rate: 0,
              selected: "Choose",
              rows: ["row 1"],
              balance_sheet_category_name: "",
              balance_sheet_category_id: "",
              isChecked: false,
              coulmns: [],
              isCompany_name: true,
              company_name: "",
              invoice_no: "",
              isInvoice_no: true,
              isBalance_sheet_category_name: true,
              isTable_notEmpty: false,
            });
            jQuery("#closeme").fadeIn(12);
            setTimeout(function () {
              if (jQuery("#closeme").fadeOut(2000));
            }, 8000);
            this.callme();
            document.getElementById("selectednow0").innerHTML = "Choose";

            if (
              this.state.comingFrom == 'Accountant Inbox' ||
              this.state.comingFrom == 'Inbox' ||
              this.state.comingFrom == 'Sent Items' ||
              this.state.comingFrom == 'Reviewed Items') {
              localStorage.setItem('list_id', this.props.match.params.list_id)
              this.props.history.goBack()
            }

            if (this.state.editData) {
              localStorage.setItem("updated", "yes");
              var iframe = document.createElement("iframe");
              iframe.style.cssText = "opacity:0;position:absolute";
              iframe.src = "about:blank";
              iframe.onload = function () {
                iframe.contentWindow.close.call(window);
                document.body.removeChild(iframe);
              };
              document.body.appendChild(iframe);
            }
          } else {

            this.setState({
              isAdd: true,
            });
            alert(response.message)
            this.setState({ message: response.message })
          }
        }
      );
    } else {
      this.validation_msg();
      this.setState({ isAdd: true });
      this.handleOnClick();
    }
  };

  validation_msg = () => {
    this.state.company_name != ""
      ? this.setState({ isCompany_name: true })
      : this.setState({ isCompany_name: false });
    this.state.invoice_no != ""
      ? this.setState({ isInvoice_no: true })
      : this.setState({ isInvoice_no: false });
    this.state.balance_sheet_category_id != ""
      ? this.setState({ isBalance_sheet_category_name: true })
      : this.setState({ isBalance_sheet_category_name: false });
    this.val_me_Check();
  };
  validation_clean = () => {
    this.state.company_name != ""
      ? this.setState({ isCompany_name: true })
      : this.setState({});
    this.state.invoice_no != ""
      ? this.setState({ isInvoice_no: true })
      : this.setState({});
    this.state.balance_sheet_category_id != ""
      ? this.setState({ isBalance_sheet_category_name: true })
      : this.setState({});
  };
  save_draft = () => {
    var selected_date = this.convert_date_format();
    let items = {
      client_id: this.state.logged_client_id,
      item_total_foreign_currency: this.state.item_total_foreign_currency,
      tax_amount_home_currency: this.state.tax_amount_foreign_currency,
      grand_total_home_currency: this.state.grand_total_home_currency,
      item_total_home_currency: this.state.item_total_home_currency,
      tax_amount_foreign_currency: this.state.tax_amount_home_currency,
      grand_total_foreign_currency: this.state.grand_total_foreign_currency,
      currency: this.state.ToCurrency,
      exchange_rate: this.state.exchange_value,
      type: 1,
      list_id: this.props.match.params.list_id,
      tagged_user_id: this.state.logged_user_id,
      invoice_date: selected_date,
      company_name: this.state.company_name,
      // invoice_no: this.state.invoice_no,
      invoice_number: "0004",
      company_address: this.state.address,
      incorport_date: selected_date,
      account_category: this.state.account_category,
      item_list: this.state.myarray,
      balance_sheet_category_id: this.state.balance_sheet_category_id,
    };
    if (
      this.Chk_table_validation() &&
      this.state.balance_sheet_category_id != ""
    ) {
      FetchAllApi.save_tagged_item_draft(items, (err, response) => {
        if (response.status === 1) {
          this.handleOnClick();
          this.setState({
            isClose: true,
            sales_tax_rate: 0,
            coulmns: [],
            balance_sheet_category_id: "",
            isChecked: false,
            isClose1: true,
            isAdd: false,
            sales_tax_name: "Choose",
            selected: "Choose",
            rows: ["row 1"],
            balance_sheet_category_name: "",
            company_name: "",
            invoice_no: "",
          });
          jQuery("#closeme1").fadeIn(10);
          setTimeout(function () {
            if (jQuery("#closeme").fadeOut(2000));
          }, 8000);
          this.callme();
          document.getElementById("selectednow0").innerHTML = "Choose";
        } else {
          this.validation_msg();

          this.setState({
            isAdd: true,
          });

          // jQuery(".resp_msg").fadeIn(2);
          // setTimeout(function() {
          //   jQuery(".resp_msg").fadeOut(20);
          // }, 8000);
        }
      });
    } else {
      this.validation_msg();
      this.setState({ isAdd: true });
      this.handleOnClick();

      setTimeout(() => {
        this.setState({ isAdd: false });
      }, 5000);
    }
  };

  watchCoulmnUpdated = () => {
    setInterval(() => {
      var checkMeee = localStorage.getItem("is_coulmn_updated");

      if (
        checkMeee !== undefined &&
        checkMeee !== "" &&
        checkMeee !== null &&
        checkMeee === "yes"
      ) {
        this.changeState();

        localStorage.setItem("is_coulmn_updated", null);
      }
    }, 3000);
  };


  saveNew_Account = (e) => {
    let account_name = this.state.account_name;
    let category_id = this.state.category_id;
    let sub_category_id = this.state.sub_category_id;
    let account_type_id = this.state.Account_type_id;
    let currency = this.state.Currency_name;
    if (
      account_name &&
      category_id &&
      sub_category_id &&
      account_type_id &&
      currency != ""
    ) {
      let items = {
        account_name: account_name,
        category_id: category_id,
        sub_category_id: sub_category_id,
        account_type_id: account_type_id,
        currency: currency,
        client_id: this.state.logged_client_id,
      };

      FetchAllApi.save_NewAccountName(items, (err, response) => {
        if (response.status === 1) {
          alert(response.message)
          this.setState({
            add_cmnt_msg: response.message,
          });

          // jQuery(".resp_msg").fadeIn(0.0);
          // setTimeout(function () {
          //   jQuery(".resp_msg").fadeOut(2000);
          // }, 8000);
          // this.callme()
        } else {
          alert(response.message)
          this.setState({});
        }
      });
    } else {
      //  jQuery(".htttt").fadeIn(20);
      //   setTimeout(function() {
      //     jQuery(".htttt").fadeOut(200);
      //   }, 2000);
    }
  };

  callme = () => {
    jQuery(".form-control").val("");
    this.handleChangeItems(0, this.state.rows.length - 1);
  };
  SentTheValue(str) {
    // jQuery('.ReactCrop__image').attr('id', 'overviewSeatMap');
    //jQuery('.ReactCrop__image').attr('useMap', '#overview');

    var dateformat1, dateformat2;
    dateformat1 = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    dateformat2 = /^\d{4}-\d{1,2}-\d{1,2}$/;
    var strResult = str;
    if (!isNaN(str) && str.length > 8) {
      if (this.state.invoiceNumber === false)
        this.setState({ invoiceNumber: str });
    } else if (str.match(dateformat1)) {
      var s = strResult.split("/");

      str = s[0] + "-" + s[1] + "-20" + s[2];

      // this.setState({date: str})
    } else if (str.match(dateformat2)) {
      this.setState({ date: moment(str).format("DD-MM-YYYY") });
    } else if (str === "S$" || str === "s$" || str === "SGD") {
      if (this.state.ToCurrency !== "SGD")
        this.setState({ ToCurrency: "SGD" }, () => {
          this.handleChangeItems(0, this.state.rows.length - 1);
        });
      // jQuery('#_search').val(''); this.get_currencies()
    } else if (str === "$" || str === "USD") {
      if (this.state.ToCurrency !== "USD")
        this.setState({ ToCurrency: "USD" }, () => {
          this.handleChangeItems(0, this.state.rows.length - 1);
        });
      // jQuery('#_search').val(''); this.get_currencies()
    } else if (str === "₹" || str === "INR") {
      if (this.state.ToCurrency !== "INR")
        this.setState({ ToCurrency: "INR" }, () => {
          this.handleChangeItems(0, this.state.rows.length - 1);
        });
      //  jQuery('#_search').val(''); this.get_currencies()
    }
  }
  handleChange(event) {

    // for default cataory
    // this.state.rows.map((item, index) => {
    //   let itemid = index;
    //   jQuery(
    //     "#catagory_name" +
    //     itemid
    //   ).val(this.state.selected);
    //   jQuery(
    //     "#catagory_id" +
    //     itemid
    //   ).val(item.id);
    //   this.changetext1(
    //     item.id,
    //     itemid,
    //     "catagory_id" +
    //     itemid,
    //     this.state.selected
    //   );
    // })
    // for default cataory


    this.setState(
      {
        [event.target.name]: event.target.value.trim(),
      },
      () => this.validation_clean()
    );
  }

  get_value = (id) => {
    this.setState({ columnId: id });
  };

  handleChangeItems(e, itemid) {

    // alert(this.state.cus_rate_rate)
    var result = [];
    var itemprice = [];
    var tax_total = 0;

    var exchange_rate;
    if (this.state.cus_rate_rate.length > 0) {
      exchange_rate = this.state.cus_rate_rate;
    } else {
      exchange_rate = this.state.exchange_value;
    }

    for (var i = itemid; i >= 0; i--) {
      if (document.getElementById("selectednow_id" + i) != null) {
        var item_name =
          jQuery("#item" + i).val() != "" ? jQuery("#item" + i).val() : 0;
        var descripation =
          jQuery("#descr" + i).val() != "" ? jQuery("#descr" + i).val() : "";
        var quantity_check =
          jQuery("#quantity" + i).val() != ""
            ? jQuery("#quantity" + i).val()
            : 0;
        var quantity = isNaN(quantity_check)
          ? jQuery("#quantity" + i).val("")
          : quantity_check;
        var unit_price_check =
          jQuery("#unit_price" + i).val() != ""
            ? jQuery("#unit_price" + i).val()
            : 0;
        var unit_price = isNaN(unit_price_check)
          ? jQuery("#unit_price" + i).val("")
          : unit_price_check;
        var price = quantity * unit_price;
        var selectednow_id = document.getElementById("selectednow_id" + i)
          .innerText;
        var category_id =
          selectednow_id != "NO_VALUE"
            ? selectednow_id
            : this.state.selectedindex != ""
              ? this.state.selectedindex
              : "";
      }
      var custom_details = {};
      var coulmn_index = this.state.coulmns.length;

      for (let k = coulmn_index - 1; k >= 0; k--) {
        var header_nlame_check = document.getElementById("header" + k)
          .innerHTML;
        var header_nlame = header_nlame_check
          .toLowerCase()
          .replace(/\s+/g, "_")
          .trimRight();

        var coulmn_value = jQuery("#coulmn" + i + k).val();
        custom_details[header_nlame.replace(/&.*;/g, "")] = coulmn_value;
      }

      var sales_tax_type =
        jQuery("#selectedtype_id" + i).val() != ""
          ? jQuery("#selectedtype_id" + i).val()
          : 0;
      var sales_tax_rate =
        jQuery("#selectedrate" + i).val() != ""
          ? jQuery("#selectedrate" + i).val()
          : 0;


      if (this.state.isChecked) {
        if (parseFloat(sales_tax_rate) > 0 && parseInt(sales_tax_type) === 1) {
          var tax =
            (price * parseFloat(sales_tax_rate)) /
            (100 + parseFloat(sales_tax_rate));
          // (value / (parseFloat(this.state.sales_tax_rate) + 100)) * 100;

          // var tax = price / parseFloat(sales_tax_rate)
          // var Total = parseFloat(price) - tax
          var Total = parseFloat(price);
        } else if (parseInt(sales_tax_type) === 2) {
          var tax = parseFloat(sales_tax_rate);
          // var Total = parseFloat(price) - tax;
          var Total = parseFloat(price);
        } else {
          var tax = 0;
          var Total = parseFloat(price);
        }
      } else {
        if (parseFloat(sales_tax_rate) > 0 && parseInt(sales_tax_type) === 1) {
          var tax = price * (parseFloat(sales_tax_rate) / 100);
          var Total = parseFloat(price);
        } else if (parseInt(sales_tax_type) === 2) {
          var tax = parseFloat(sales_tax_rate);
          var Total = parseFloat(price);
        } else {
          var tax = 0;
          var Total = parseFloat(price);
        }
      }

      tax_total += tax;

      // if (this.state.isChecked) {
      //   if (
      //     parseFloat(jQuery("#selectedrate" + i).val()) > 0 &&
      //     parseInt(jQuery("#selectedtype_id" + i).val()) == 1
      //   ) {
      //     var tax = price * (parseFloat(jQuery("#selectedrate" + i).val()) / 100);

      //     // var tax = price / parseFloat(sales_tax_rate)
      //     // var Total = parseFloat(price) - tax
      //     var Total = parseFloat(price);
      //   } else if (parseInt(jQuery("#selectedtype_id" + i).val()) == 2) {
      //     var tax = parseFloat(jQuery("#selectedrate" + i).val());
      //     // var Total = parseFloat(price) - tax;
      //     var Total = parseFloat(price);
      //   } else {
      //     var tax = 0;
      //     var Total = parseFloat(price);
      //   }
      // } else {
      //   if (
      //     parseFloat(jQuery("#selectedrate" + i).val()) > 0 &&
      //     parseInt(jQuery("#selectedtype_id" + i).val()) == 1
      //   ) {
      //     var tax = price * (parseFloat(jQuery("#selectedrate" + i).val()) / 100);
      //     var Total = parseFloat(price);
      //   } else if (parseInt(jQuery("#selectedtype_id" + i).val()) == 2) {
      //     var tax = parseFloat(jQuery("#selectedrate" + i).val());
      //     var Total = parseFloat(price);
      //   } else {
      //     var tax = 0;
      //     var Total = parseFloat(price);
      //   }
      // }
      const data = this.state.rows && this.state.rows.map((row, ind) => {
        const obj = this.state.number_of_columns_list.reduce((acc, val, idx) => {
          acc[val.column_name] = jQuery("#addtext" + idx + ind).val()
          return acc
        }, {})
        return obj
      })

      let item_list = {
        item_name: item_name,
        descripation: descripation,
        quantity: quantity,

        price: price,
        unit_price: unit_price,
        catagory_name: jQuery("#catagory_name" + i).val(),
        category_id: jQuery("#catagory_id" + i).val(),
        ...custom_details,

        tax_name: jQuery("#selectednow" + i).val(),
        tax_rate: jQuery("#selectedrate" + i).val(),
        tax_type: jQuery("#selectedtype_id" + i).val(),
        item_tax: tax.toFixed(2),
        item_total: Total.toFixed(2),
        home_item_total: Number(Total * Number(exchange_rate)).toFixed(2),
        custom_column: [...data],
      };
      result.push(item_list);

      itemprice.push(parseFloat(price));
    }

    const add = (a, b) => a + b;
    const trial = itemprice.length > 0 ? itemprice.reduce(add) : 0;
    if (isNaN(trial)) {
      var sum = 0;
    } else {
      var sum = trial;
    }





    if (this.state.isChecked) {
      let foreign_currency = this.state.ToCurrency;
      let value = sum;
      let nope = "https://api.exchangeratesapi.io/" + "latest" + "?base=";
      let res = nope.concat(foreign_currency);
      // fetch(res)
      //   .then((response) => response.json())
      //   .then((data) => {
      // let todayValue = data.rates;
      if (this.state.exchangeRateApiResult) {


        let todayValue = this.state.exchangeRateApiResult
        let exchange_value = todayValue[this.state.clientHomeCurrency];

        var exchange_rate;
        if (this.state.cus_rate_rate.length > 0) {
          exchange_rate = this.state.cus_rate_rate;
        } else {
          exchange_rate = Number(exchange_value.toFixed(4))
        }
        // alert(exchange_value)
        //     if (
        //       this.state.cus_rate_rate != "" &&
        //       this.state.cus_rate_rate != undefined
        //     ) {
        //       todayValue[this.state.clientHomeCurrency] = this.state.cus_rate_rate;
        //     }
        //     // todayValue["SGD"]= 10
        //     // alert(todayValue["SGD"])
        //     if (this.state.sales_tax_type != 2) {
        //       var item_total_foreign_currency =
        //         (value / (parseFloat(this.state.sales_tax_rate) + 100)) * 100;
        //       var tax_amount_foreign_currency =
        //         (item_total_foreign_currency *
        //           parseFloat(this.state.sales_tax_rate)) /
        //         100;
        //       var item_total_home_currency =
        //         todayValue[this.state.clientHomeCurrency] * item_total_foreign_currency;
        //       var tax_amount_home_currency =
        //         todayValue[this.state.clientHomeCurrency] * tax_amount_foreign_currency;
        //       var grand_total_home_currency = todayValue[this.state.clientHomeCurrency] * value;
        //     } else {
        //       var item_total_foreign_currency_check =
        //         value - parseFloat(this.state.sales_tax_rate);
        //       var item_total_foreign_currency = item_total_foreign_currency_check;
        //       var tax_amount_foreign_currency_check = parseFloat(
        //         this.state.sales_tax_rate
        //       );
        //       var tax_amount_foreign_currency = tax_amount_foreign_currency_check;
        //       var item_total_home_currency =
        //         todayValue[this.state.clientHomeCurrency] * item_total_foreign_currency;
        //       var tax_amount_home_currency =
        //         todayValue[this.state.clientHomeCurrency] * tax_amount_foreign_currency;
        //       var grand_total_home_currency = todayValue[this.state.clientHomeCurrency] * value;
        //       var grand_total_foreign_currency_check =
        //         item_total_foreign_currency + tax_amount_foreign_currency;
        //       var grand_total_foreign_currency = grand_total_foreign_currency_check;
        //     }

        var item_total_foreign_currency = sum - tax_total;
        var tax_amount_foreign_currency = tax_total;
        var grand_total_foreign_currency = sum;
        var item_total_home_currency =
          item_total_foreign_currency * exchange_rate;
        var tax_amount_home_currency = tax_total * exchange_rate;
        var grand_total_home_currency =
          item_total_home_currency + tax_amount_home_currency;
        this.setState(
          {
            myarray: result.reverse(),
            exchange_value: Number(exchange_value.toFixed(4)),
            item_total_foreign_currency: item_total_foreign_currency.toFixed(
              2
            ),
            tax_amount_foreign_currency: tax_amount_foreign_currency.toFixed(
              2
            ),
            grand_total_foreign_currency: grand_total_foreign_currency.toFixed(
              2
            ),

            item_total_home_currency: item_total_home_currency.toFixed(2),
            tax_amount_home_currency: tax_amount_home_currency.toFixed(2),
            grand_total_home_currency: grand_total_home_currency.toFixed(2),
          },
          () => {
            this.val_me();
          }
        );
        // });
      }
    } else {




      let foreign_currency = this.state.ToCurrency;
      let value = sum;
      let nope = "https://api.exchangeratesapi.io/" + "latest" + "?base=";
      let res = nope.concat(foreign_currency);
      // fetch(res)
      //   .then((response) => response.json())
      //   .then((data) => {
      if (this.state.exchangeRateApiResult) {
        let todayValue = this.state.exchangeRateApiResult
        let exchange_value = todayValue[this.state.clientHomeCurrency];

        var exchange_rate;
        if (this.state.cus_rate_rate.length > 0) {
          exchange_rate = this.state.cus_rate_rate;
        } else {
          exchange_rate = Number(exchange_value ? Number(exchange_value).toFixed(4) : 0)
        }
        // if (
        //   this.state.cus_rate_rate != "" &&
        //   this.state.cus_rate_rate != undefined
        // ) {
        //   todayValue[this.state.clientHomeCurrency] = this.state.cus_rate_rate;
        // }

        // if (this.state.sales_tax_type != 2) {
        //   var item_total_foreign_currency = value;
        //   var tax_amount_foreign_currency =
        //     (item_total_foreign_currency * this.state.sales_tax_rate) / 100;
        //   var grand_total_foreign_currency =
        //     value + tax_amount_foreign_currency;
        //   var item_total_home_currency =
        //     todayValue[this.state.clientHomeCurrency] * item_total_foreign_currency;
        //   var tax_amount_home_currency =
        //     todayValue[this.state.clientHomeCurrency] * tax_amount_foreign_currency;
        //   var grand_total_home_currency =
        //     todayValue[this.state.clientHomeCurrency] * grand_total_foreign_currency;
        // } else {
        //   var item_total_foreign_currency = value;
        //   var tax_amount_foreign_currency = parseFloat(
        //     this.state.sales_tax_rate
        //   );
        //   var grand_total_foreign_currency =
        //     item_total_foreign_currency + tax_amount_foreign_currency;
        //   var item_total_home_currency =
        //     todayValue[this.state.clientHomeCurrency] * item_total_foreign_currency;
        //   var tax_amount_home_currency =
        //     todayValue[this.state.clientHomeCurrency] * tax_amount_foreign_currency;
        //   var grand_total_home_currency =
        //     todayValue[this.state.clientHomeCurrency] * grand_total_foreign_currency;
        // }

        var item_total_foreign_currency = sum;
        var tax_amount_foreign_currency = tax_total;
        var grand_total_foreign_currency = sum + tax_total;
        var item_total_home_currency =
          item_total_foreign_currency * exchange_rate;
        var tax_amount_home_currency = tax_total * exchange_rate;
        var grand_total_home_currency =
          item_total_home_currency + tax_amount_home_currency;

        this.setState(
          {
            myarray: result.reverse(),
            exchange_value: Number(exchange_value.toFixed(4)),
            item_total_foreign_currency: item_total_foreign_currency.toFixed(
              2
            ),
            tax_amount_foreign_currency: tax_amount_foreign_currency.toFixed(
              2
            ),
            grand_total_foreign_currency: grand_total_foreign_currency.toFixed(
              2
            ),
            item_total_home_currency: item_total_home_currency.toFixed(2),
            tax_amount_home_currency: tax_amount_home_currency.toFixed(2),
            grand_total_home_currency: grand_total_home_currency.toFixed(2),
          },
          () => {
            this.val_me();
          }
        );
        // });
      }
    }
  }

  Chk_table_validation = () => {
    var item_check = jQuery(
      `#coulmn${this.state.rows.length - 1}${this.state.coulmns.length - 1}`
    ).val();

    if (
      this.state.myarray && this.state.myarray.length > this.state.rows.length - 1 &&
      this.state.myarray[this.state.myarray.length - 1].price > -1 &&
      this.state.myarray[this.state.myarray.length - 1].item_name.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  val_me = () => {
    if (this.Chk_table_validation()) {
      this.setState({ isTable_notEmpty: false });
    } else {
    }
  };
  val_me_Check = () => {
    if (this.Chk_table_validation()) {
    } else {
      this.setState({ isTable_notEmpty: true });
    }
  };

  toggleChange = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
      },
      () => {
        this.handleChangeItems(0, this.state.rows.length - 1);
      }
    );
  };

  assignDefaultGST = ()=>{
      // console.log('working2')
      // this.state.rows.map((row, i) => {
      //   console.log('working1')
      //   this.state.gst_list.map(
      //     (item1, index) => {
      //       if (jQuery("#selectednow").val() === item1.name && jQuery("#chosen_gst" + i).val() != 'manual') {
      //         console.log('working')
      //         jQuery(
      //           "#selectedrate" +
      //           i
      //         ).val(item1.rate);
      //         jQuery(
      //           "#selectedtype_id" +
      //           i
      //         ).val(
      //           item1.rate_type
      //         );
      //         jQuery(
      //           "#selectednow" +
      //           i
      //         ).val(
      //           item1.sales_tax_name
      //         );
      //         this.handleCheck_get_selected_tax(
      //           i,
      //           item1.sales_tax_name,
      //           item1.rate,
      //           item1.rate_type
      //         );

      //       }

      //     })
      // })
  }

  assignDefaultCatagory = () => {
    if (this.state.selected != "") {

      setTimeout(() => {
        this.state.rows.map((row, i) => {
          this.state.default_category_list.map(
            (item, index) => {
              if (item.name == this.state.selected && jQuery("#chosen" + i).val() != 'manual') {

                jQuery(
                  "#catagory_name" +
                  i
                ).val(item.name);
                jQuery(
                  "#catagory_id" +
                  i
                ).val(item.id);
                this.changetext1(
                  item.id,
                  i,
                  "catagory_id" +
                  i,
                  item.name
                )

              }

            })
        })

      }, 2000);
    }
  }

  handleCheck(e) {
    // let value = JSON.parse(e.target.value)
    this.setState({
      selected: e.currentTarget.dataset.id,
      selectedindex: e.currentTarget.dataset.the,
    }
      , () => {
        // setTimeout(() => {
          this.state.rows.map((row, i) => {
            this.state.default_category_list.map(
              (item, index) => {
                if (item.name == this.state.selected && jQuery("#chosen" + i).val() != 'manual') {

                  jQuery(
                    "#catagory_name" +
                    i
                  ).val(item.name);
                  jQuery(
                    "#catagory_id" +
                    i
                  ).val(item.id);
                  this.changetext1(
                    item.id,
                    i,
                    "catagory_id" +
                    i,
                    item.name
                  )

                }

              })
          })

        // }, 2000);
      }

    );
    // this.handleChangeItems(0, this.state.rows.length - 1);
    // document.getElementById("demo").innerHTML = "Paragraph changed!";
    jQuery("#_search_def").val("");
    this.deafultCategoryList();
  }

  handleCheck_currency = (e) => {
    let currency = e.currentTarget == undefined ? e.trim() : e.currentTarget.dataset.namee
    this.findInSubAccountList(currency);

    this.setState({ ToCurrency: currency });



    jQuery("#_search").val("");

    // this.get_currencies();

    fetch(
      // `https://api.exchangerate-api.com/v4/latest/${currency}`
      `https://api.currencylayer.com/live?access_key=${config.api_key}&source=${currency}`

    )
      .then((response) => response.json())
      .then((data) => {
// if(data.success == true){

        let newObj = this.rename(data.quotes, currency)

        const currencyAr = [];
        let first = newObj;
        for (const key in first) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr, currency_clone: currencyAr, exchangeRateApiResult: first });

        setTimeout(() => {
          this.handleChangeItems(0, this.state.rows.length - 1);
        }, 2000);
      // }
      });
  };

  handleCheck_get_selected_tax = (itemid, name, rate, rate_type) => {
    this.setState(
      {
        // sales_tax_name: e.currentTarget.dataset.name,
        // sales_tax_rate: e.currentTarget.dataset.rate,
        // sales_tax_type: e.currentTarget.dataset.type
        sales_tax_name: name,
        sales_tax_rate: rate,
        sales_tax_type: rate_type,
      },
      () => {
        this.handleChangeItems(itemid, this.state.rows.length - 1);
      }
    );

    jQuery("#gst_search").val("");
    this.get_gst_list();
  };

  handleCheck_currency_modal = (e) => {
    this.setState({ Currency_name: e });
  };
  handleCheck_balanceSheet_id(e) {
    this.setState(
      {
        balance_sheet_category_name: e.currentTarget.dataset.namee,
        balance_sheet_category_id: e.currentTarget.dataset.id,
      },
      () => {
        this.state.balance_sheet_category_id != ""
          ? this.setState({ isBalance_sheet_category_name: true })
          : this.setState({ isBalance_sheet_category_name: false });
      }
    );
  }
  changetext1 = (selectednow_id, itemid, id, valueres) => {
    document.getElementById(id).innerHTML = valueres;
    if (selectednow_id > 0) {
      document.getElementById("catagory_name" + itemid).innerHTML = valueres;
      this.handleChangeItems(valueres, this.state.rows.length - 1);

      jQuery(".form-table").removeClass("ovrFlwRmve");
    } else {
      // alert("sorry fault is here only");
    }

    jQuery("#_search_deff").val("");
    this.deafultCategoryList();
  };
  fetchSubCategeory = (name, val) => {
    let category_id = val;
    let categoryname = name;
    var from_create_invoice = 1;

    FetchAllApi.get_SubCategory(
      category_id,
      from_create_invoice,
      (err, response) => {
        if (response.status === 1) {
          this.setState({
            sub_categorylist: response.list,
            categoryname: categoryname,
            category_id: category_id,
          });
        } else {
        }
      }
    );
  };
  fetchAccount_type = (name, val) => {
    let sub_categoryname = name;
    let sub_category_id = val;
    let from_create_invoice = 1;

    FetchAllApi.get_Accounttype2(
      sub_category_id,
      from_create_invoice,
      (err, response) => {
        if (response.status === 1) {
          this.setState({
            Accounttype: response.list,
            sub_categoryname: sub_categoryname,
            sub_category_id: sub_category_id,
          });
        } else {
        }
      }
    );
  };

  getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };
  getSubcomments = (comment_id) => {
    // alert('hhh'+comment_id)
    FetchAllApi.getSubCmmnts(comment_id, async (err, response) => {
      if (response.status === 1) {
        if (response.details != undefined && response.details.length > 0) {
          const kk = this.state.combinedArray;
          const cc = response.details;
          const res = [...kk, ...cc];
          // const myarray= _.uniq(res, 'comment_id');
          const myarray = this.getUniqueListBy(res, "comment_id");

          this.setState({ combinedArray: myarray });
        }
      }
    });
  };
  findfullword_in_string = (str) => { };

  activateResolved = (x) => {
    FetchAllApi.resolve_comment(
      x,
      this.state.list_id,
      this.state.logged_user_id,
      (err, response) => {
        if (response.status === 1) {
          // this.getCommments(this.props.match.params.file_id);
          this.getCommments(this.state.present_file_id);
          alert("You have changed status successfully");
          this.setState({});
        } else {
          alert(response.message);
        }
      }
    );
  };
  changeDate = (fromdate) => {
    let date = jQuery("#fromdate").val();
    if (date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ paymentdate: date_formated });
    }
  };
  getPaymethod = () => {
    FetchAllApi.getPaymethod((err, response) => {

      if (response.status === 1) {
        this.setState({
          payment_method_list: response.lists,
        });
      } else {
      }
    });
  };
  handleSelect = (event) => {
    this.setState({
      payment_method: event.target.value,
    });
  };
  third_party_account_list = (x) => {
    let payment_account_id = x;
    if (x == 2 || x == 5) {
      this.setState({ isThirdpartyEssenstial: true });
    } else {
      this.setState({ isThirdpartyEssenstial: false });
    }

    let client_id = this.state.logged_client_id;
    FetchAllApi.third_party_account_list(
      client_id,
      payment_account_id,
      (err, response) => {

        if (response.status === 1) {
          this.setState({ third_party_account_list: response.data });
        } else {
        }
      }
    );
  };

  vendor_payment_account_type = (vendor_id) => {
    var vendor_id = vendor_id;

    FetchAllApi.vendor_payment_account_type(vendor_id, (err, response) => {

      if (response.status === 1) {
        this.setState({ vendor_payment_account_type: response.accountData });
      } else {
      }
    });
  };

  changeState = () => {
    // this.setState({ isEditCol: !this.state.isEditCol }, () => {
    this.getColumns();
    // this.addSerialNumber()
    // });
  };

  fetchThirdPartyNames = (payment_account_id) => {
    let client_id = this.state.logged_client_id;
    FetchAllApi.third_party_account_list(
      client_id,
      payment_account_id,
      (err, response) => {
        if (response.status === 1) {
          this.setState({ third_party_account_list: response.data });
        } else {
        }
      }
    );
  };
  getSubAccountList = () => {
    var coreData = {
      account_type_id: 5,
      client_id: this.state.logged_client_id,
    };

    FetchAllApi.getSubAccountList(coreData, (err, response) => {

      if (response.status === 1) {
        this.setState({ SubAccountList: response.list });

        // alert('success')
        // this.getItems()
        // window.jQuery('#add_items').modal('hide')
      } else {
      }
    });
  };

  findInSubAccountList = (curr) => {
    // alert(curr)
    var currency = curr;
    var result = [];
    this.state.SubAccountList.forEach((item, i) => {
      var fullString = item.name.split("-");
      var list_curr = fullString[1];

      var kk = "Accounts Payable-" + currency;

      if (item.name == kk) {
        result.push(item);
      }
    });

    if (result.length === 0) {
      // alert('not matched')
      var coreData = {
        account_name: "Accounts Payable-" + currency,
        account_type_id: 5,
        currency: currency,
        client_id: this.state.logged_client_id,
      };

      FetchAllApi.addNewAccountName(coreData, (err, response) => {

        if (response.status === 1) {
          this.getSubAccountList();

          jQuery("#account_id").val(response.account_type_id);
          this.setState({
            account_id: response.account_id,
            account_id_name: response.name,
          });

          // alert('new added & refreshed')
          // this.setState({SubAccountList:response.list});

          // alert('success')
          // this.getItems()
          // window.jQuery('#add_items').modal('hide')
        } else {
        }
      });
    } else {
      // alert(result.length)
      jQuery("#account_id").val(result[0].id);
      this.setState({
        account_id: result[0].id,
        account_id_name: result[0].name,
      });
      if (
        jQuery("#invoice_curr_id option:selected").val() != "" &&
        jQuery("#invoice_curr_id option:selected").val() != undefined
      ) {
      }
      // alert('no worries match found')
    }
  };
  defaultcategorylist_onchang = (res, value, id) => {
    this.setState({
      selected: value,
      selectedindex: id,
    }, () => {
      setTimeout(() => {
        this.state.rows.map((row, i) => {
          this.state.default_category_list.map(
            (item, index) => {
              if (item.name == this.state.selected && jQuery("#chosen" + i).val() != 'manual') {
                jQuery(
                  "#catagory_name" +
                  i
                ).val(item.name);
                jQuery(
                  "#catagory_id" +
                  i
                ).val(item.id);
                this.changetext1(
                  item.id,
                  i,
                  "catagory_id" +
                  i,
                  item.name
                )
              }
            })
        })
      }, 2000);
    }
    );
    // this.handleChangeItems(0, this.state.rows.length - 1);
    // document.getElementById("demo").innerHTML = "Paragraph changed!";
    jQuery("#_search_def").val("");
    this.deafultCategoryList();
    // this.defaultcategorylist_onchang();
    // this.deafultCategoryList();
  };

  handleUndoClick = () => {
    if (
      this.state.undo_value === 'item_content' ||
      this.state.undo_value === 'description_content' ||
      this.state.undo_value === 'quantity_content' ||
      this.state.undo_value === 'unit_price_content'

    ) {

      let row = this.state.undo_value === 'description_content' ? 'row1' : this.state.undo_value === 'quantity_content' ? 'row1' : 'row3'
      let rowLength = this.state[row]
      this.state[this.state.undo_value].forEach((item, i) => {
        let undo_line = this.state.undo_value == 'description_content' ? 'undo_line1' : this.state.undo_value == 'quantity_content' ? 'undo_line2' : 'undo_line2'
        if (this.state[undo_line] < i) {
          rowLength = rowLength - 1
          jQuery('#' + this.state.undo_value_name + i).val('')
          if (this.state.undo_value_name === 'descr') {
            jQuery('#description' + i).val('')
          }
          if (this.state.undo_value === 'quantity_content' || this.state.undo_value === 'unit_price_content') {
            this.handleChangeItems(0, i)
          }
        }
      })
      this.setState({ [row]: rowLength })
    } else {
      this.setState({ [this.state.undo_value]: '' })
      // this.state[this.state.undo_value] = ' ' 
    }
  }

  render() {
    // console.log('mano1223', jQuery('#due_date').val())
    // console.log('mano122345', this.state.dueDateReal)


    if (
      this.state.myarray && this.state.myarray.length > 0 &&
      this.state.myarray[0].price != "" &&
      this.state.myarray[0].price > -1
    ) {
    }

    let THIS = this;
    let file_path = [],
      file_path_list = "",
      scanned_div = [],
      comment_list = [];

    file_path_list = this.state.get_file_path.toString();
    if (file_path_list !== "") {
      var get_file_ext = file_path_list.substring(
        file_path_list.lastIndexOf(".") + 1,
        file_path_list.length
      );
      if (
        get_file_ext === "png" ||
        get_file_ext === "jpg" ||
        get_file_ext === "jpeg"
      ) {
        file_path.push(
          <>


            {this.state.type_of_ocr == 'single' &&
              <li onClick={() => console.log()
              }>
                <a href="javascript:;" className="active">
                  <img src={file_path_list} className="img-responsive" />
                </a>
              </li>
            }



            {(this.state.type_of_ocr == 'multiple' || this.state.type_of_ocr == 'single_array') &&
              this.state.file_path_array && this.state.file_path_array.map((paths, no) => {
                return (
                  <li onClick={(e) => {
                    // alert(no + 1 + 'th' + '' + 'page')
                    // console.log("placecheck1")
                    this.setState({ get_file_path: paths.file_path, present_file_id: paths.file_id })

                    FetchAllApi.cloud_vision_api(paths.file_path, (err, response) => {
                      // console.log("placecheck2")
                      if (response.status === 1) {
                        // console.log("placecheck3")
                        var apiresult = response.result;
                        if (apiresult.length > 0)
                          this.setState({ convertedImageDAta3: response, loading: false, cloud: false, });
                        this.handleInitialDataTagging();

                      } else {
                        this.setState({ convertedImageDAta3: "", loading: false, cloud: false, });

                      }
                    });

                    // to get processed details
                    if (paths.processed_status_text == "Processed") {

                      let payment_id = 0
                      let Input = {
                        client_id: this.state.logged_client_id,
                        list_id: this.props.match.params.list_id,
                        file_id: paths.file_id
                      }

                      FetchAllApi.get_bill_by_attachment(Input,

                        (err, response) => {
                          if (response.status === 1) {
                            let data = response.invoice_details;

                            var row_temp = [];
                            data.invoice_details.map((item, i) => {
                              row_temp.push("row" + i);
                            });
                            this.setState({ rows: row_temp });
                            // this.state.rows = [];

                            data.invoice_details.map((item, i) => {
                              // row_temp.push("row" + (i));
                              jQuery("#item" + i).val(item.item_name);
                              // jQuery('#' + `item${i}`).val(item.item_name);
                              jQuery("#" + `descr${i}`).val(item.descripation);
                              jQuery("#" + `quantity${i}`).val(item.quantity);
                              jQuery("#" + `unit_price${i}`).val(item.unit_price);
                              jQuery("#" + `subtotal${i}`).val(item.item_total);
                              jQuery("#catagory_name" + i).val(item.catagory_name);
                              jQuery("#catagory_id" + i).val(item.category_id);
                              jQuery("#selectednow" + i).val(item.tax_name);
                              jQuery("#selectedrate" + i).val(item.tax_rate);
                              jQuery("#selectedtype_id" + i).val(item.tax_type);
                              this.changetext1(
                                item.category_id,
                                i,
                                "catagory_id" + i,
                                item.catagory_name
                              );
                              this.handleChangeItems(0, i);
                            });

                            // this.state.rows.push(row_temp);


                            jQuery("#paid_status").html(data.paid_status + "--Bill");

                            jQuery("#company_name").val(data.company_name);
                            jQuery("#invoice_no").val(data.invoice_number);
                            jQuery("#dateReal").val(data.incvoice_date);
                            jQuery("#address").val(data.company_address);
                            // this.setState({ ToCurrency : data.foreign_currency,invoice_no:data.id, invoice_idl:data.id, dueDateReal : data.due_date, editData:true  })
                            jQuery("#currency").val(data.foreign_currency);
                            jQuery("#default_catagory").val(
                              data.invoice_details[0].category_id
                            );

                            jQuery("#Exchange").val(data.exchange_rate);

                            jQuery("#payment_amount").val(data.payment_amount);
                            jQuery("#payment_method").val(data.payment_method);
                            jQuery("#description").val(data.descripation);
                            jQuery("#fromdate").val(
                              moment(data.payment_date).format("DD-MM-YYYY")
                            );
                            jQuery("#reference").val(data.reference);
                            jQuery("#balanceSheetCategeory").val(data.payment_account);
                            jQuery("#third_account_id").val(data.third_party_account_id);
                            // jQuery('#third_account_id').val(data.third_party_account_id)
                            // new table data

                            jQuery("#appliedhom").html(
                              (isNaN(
                                Number(
                                  data.payments_applied_home_currency !== undefined
                                    ? data.payments_applied_home_currency
                                    : 0
                                )
                              )
                                ? 0
                                : Number(data.payments_applied_home_currency)
                              ).toFixed(2)
                            );


                            jQuery("#appliedfor").html(
                              (isNaN(
                                Number(
                                  data.payments_applied_foreign_currency !== undefined
                                    ? data.payments_applied_foreign_currency
                                    : 0
                                )
                              )
                                ? 0
                                : Number(data.payments_applied_foreign_currency)
                              ).toFixed(2)
                            );
                            jQuery("#forbaldue").html(
                              (isNaN(
                                Number(
                                  data.open_balance_foreign_currency !== undefined
                                    ? data.open_balance_foreign_currency
                                    : 0
                                )
                              )
                                ? 0
                                : Number(data.open_balance_foreign_currency)
                              ).toFixed(2)
                            );
                            jQuery("#homebaldue").html(
                              (isNaN(
                                Number(
                                  data.open_balance_home_currency !== undefined
                                    ? data.open_balance_home_currency
                                    : 0
                                )
                              )
                                ? 0
                                : Number(data.open_balance_home_currency)
                              ).toFixed(2)
                            );

                            jQuery("#exchangeGain").html(
                              (isNaN(
                                Number(
                                  data.exchange_gain_or_loss !== undefined
                                    ? data.exchange_gain_or_loss
                                    : 0
                                )
                              )
                                ? 0
                                : Number(data.exchange_gain_or_loss)
                              ).toFixed(2)
                            );

                            // new table data

                            if (data.third_party_account_id !== "") {
                              this.state.balancesheetlist.forEach((item, i) => {
                                if (item.id == data.payment_account) {
                                  const string = item.name;
                                  const Payable = string.includes("ayable");
                                  const Receivable = string.includes("eceivable");
                                  if (Payable || Receivable) {
                                    this.setState({
                                      isThirdPartyName: true,
                                    });
                                    if (Payable) {
                                      this.fetchThirdPartyNames(5, data.third_party_account_id);
                                    }
                                    if (Receivable) {
                                      this.fetchThirdPartyNames(2, data.third_party_account_id);
                                    }
                                  } else {
                                    this.setState({
                                      isThirdPartyName: false,
                                    });
                                  }
                                }
                              });
                            }
                            jQuery("#account_id").val(data.balance_sheet_category);

                            this.setState(
                              {
                                ToCurrency: data.foreign_currency,
                                invoice_no: data.id,
                                invoice_idl: data.id,
                                dueDateReal: moment(data.due_date, 'YYYY-MM-DD').format("DD/MM/YYYY"),
                                date: moment(data.invoice_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                                editData: true,
                                item_total_foreign_currency: data.item_total_foreign_currency,
                                tax_amount_home_currency: data.tax_amount_home_currency,
                                grand_total_home_currency: data.grand_total_home_currency,
                                item_total_home_currency: data.item_total_home_currency,
                                tax_amount_foreign_currency: data.tax_amount_foreign_currency,
                                grand_total_foreign_currency: data.grand_total_foreign_currency,
                                ToCurrency: data.foreign_currency,
                                exchange_rate: data.exchange_rate,
                                cus_rate_rate: data.exchange_rate,

                                company_name: data.company_name,
                                invoice_no: data.invoice_number,
                                address: data.company_address,
                                account_category: data.balance_sheet_category,
                                myarray: data.invoice_details,
                                // balance_sheet_category: 1,
                                paymentdate: data.payment_date,
                                reference: data.reference,

                                payment_amount: data.payment_amount,
                                payment_desc: data.descripation,
                                exchange_value: data.exchange_rate,
                                balanceSheetCategeory: data.payment_account,
                                // payment_account: jQuery("#balanceSheetCategeory").val(),

                                isChecked: data.tax_inclusive == 1 ? true : false,
                                dueDate: data.due_date,
                                // dueDateReal: data.due_date,
                                invoice_id: data.id,
                                template_type: data.type == "1" ? "1" : "2",
                                third_party_id: data.third_party_account_id,
                                payment_id: payment_id,
                                rows: row_temp,

                                appliedhom: data.payments_applied_home_currency,
                                appliedfor: data.payments_applied_foreign_currency,
                                forbaldue: data.open_balance_foreign_currency,
                                homebaldue: data.open_balance_home_currency,
                                exchangeGain: data.exchange_gain_or_loss,
                                account_id_name: data.account_name,
                                account_id: data.balance_sheet_category,
                                selectedindex: data.default_category,
                                selected: data.default_category_name,
                                coming_from_bill: 'yes',
                                tagged_file_ids: data.file_id,
                                clicked_processed: true

                              },
                              this.findInSubAccountList(data.foreign_currency)
                            );


                          } else {
                          }
                        }
                      );
                    } else {
                      if (this.state.clicked_processed)
                        this.setState({ clicked_processed: false, editData: false, tagged_file_ids: [] }, this.clear())
                    }

                    this.getCommments(paths.file_id);
                    // this.get_api_cloud(paths.file_path)
                  }}>
                    <span title={paths.processed_status_text} className={paths.processed_status_label}>{paths.processed_status_text}</span>
                    <a href="javascript:;" className="active">
                      <img src={paths.file_path} className="img-responsive" />
                    </a>
                  </li>
                )

              })
            }

          </>
          // my work

        );

        scanned_div.push(
          <div className="scanned-file">
            {
              /* <img src={file_path_list} alt='Scanned-file' id="overviewSeatMap" useMap="#overview" /> */
              // this.get_api_cloud(file_path_list)
            }
            <ReactCrop
              src={file_path_list}
              crop={this.state.crop}
              onChange={this.handleoncropchange}
              onComplete={
                () => {
                  this.loadImagefirst(this.state.crop)
                  // setTimeout(() => {
                  //   this.handleoncropcomplete(this.state.crop, '')
                  // }, 1000);
                }

              }
            />
            {this.state.convertedImageDAta3 !== "" && (
              <map name="overview">
                {this.state.convertedImageDAta3 &&
                  this.state.convertedImageDAta3.result.map((e, i) => {
                    let Description = e.description;
                    let drawpoly =
                      e.boundingPoly.vertices[0].x +
                      "," +
                      e.boundingPoly.vertices[0].y +
                      "," +
                      e.boundingPoly.vertices[1].x +
                      "," +
                      e.boundingPoly.vertices[1].y +
                      "," +
                      e.boundingPoly.vertices[2].x +
                      "," +
                      e.boundingPoly.vertices[2].y +
                      "," +
                      e.boundingPoly.vertices[3].x +
                      "," +
                      e.boundingPoly.vertices[3].y;
                    // this.SentTheValue(Description);
                    if (i)
                      return (
                        <area
                          shape="poly"
                          coords={drawpoly}
                          onClick={(e) => this.callmodal(Description)}
                          id={Description}
                        />
                      );
                  })}
              </map>
            )}
          </div>
        );
      } else {
        var pdf_file_url = file_path_list + "#toolbar=0&navpanes=0";
        file_path.push(
          <>
            <li>
              <a href="javascript:;" className="active">
                {/* <img src={file_path_list} className="img-responsive" /> */}
                <iframe
                  src={pdf_file_url}
                  className="data_tagging_thumb"
                  frameborder="0"
                  scrolling="no"
                ></iframe>
              </a>
            </li>


            {/* my work */}

            {/* {this.state.file_path_array && this.state.file_path_array.map((paths, no) => {
              return (

                <li onClick={(e) => { alert('ji') }}>
                  <a className="active"
                    onClick={(e) => {
                      alert('ji');
                      e.preventDefault();
                      this.setState({ div: no }, this.get_api_cloud(this.state.file_path_array[no].file_path))
                    }}>
                    <img src={file_path_list} className="img-responsive" />   //to comment
                    <iframe
                      onClick={() => alert('iframe')}
                      src={paths.file_path}
                      className="data_tagging_thumb"
                      frameborder="0"
                      scrolling="no"
                    ></iframe>
                  </a>
                </li>
              )

            })
            } */}

            {/* my work */}
          </>
        );

        scanned_div.push(
          <>
            {this.state.div == 0 &&
              <div className="scanned-file">
                {/* <img src={file_path_list} alt="Scanned-file" />   */}
                <iframe
                  src={pdf_file_url}
                  className="data_tagging_large"
                  frameborder="0"
                  scrolling="no"
                ></iframe>
              </div>
            }

            {/* <div className="scanned-file">
              <img src={file_path_list} alt="Scanned-file" />     //to commemt
              <iframe
                src={this.state.file_path_array[this.state.div]['file_path'] + "#toolbar=0&navpanes=0"}
                className="data_tagging_large"
                frameborder="0"
                scrolling="no"
              ></iframe>
            </div> */}


            {/* my work */}

            {/* {this.state.file_path_array && this.state.file_path_array.map((paths, no) => {
              if(this.state.div == no + 1){
                return (

                  <div className="scanned-file">
                    <img src={file_path_list} alt="Scanned-file" />
                    <iframe
                      src={paths.file_path}
                      className="data_tagging_large"
                      frameborder="0"
                      scrolling="no"
                    ></iframe>
                  </div>
  
                )
              }
              

            })
            } */}

            {/* my work */}
          </>
        );
      }
    }
    if (!this.state.isEditCol) {
      return (
        <div>

          {/* <div style={{ position: 'absolute', height: '100%', weight: '100%', zIndex: '99999999', top: '0', left: '0', right: '0', bottom: '0' }}></div> */}

          {this.state.is_void && < div style={{
            position: 'fixed',
            display: 'none',
            width: ' 100%',
            height: '100%',
            top: '0',
            left: ' 0',
            right: '0',
            bottom: ' 0',
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: '99999',
            cursor: 'pointer',
            display: 'block'

          }} >
            <h1 className="watermark" >Voided</h1></div>}
          <div className="container-fluid">
            <div className="row">
              <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />

              <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
                <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                  <button className="btn btn-blue sidebar-toggle">
                    <img
                      className="img-responsive"
                      src="../../images/genie-icon.png"
                      alt="LogoIcon"
                    />
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                  <div className="nav-brand-res visible-xs">
                    <img
                      className="img-responsive"
                      src="../../images/logo-icon.png"
                      alt="LogoIcon"
                    />
                  </div>
                  <a
                    href="javascript:;"
                    // onClick={this.routedChange.bind(this, "inbox")}
                    onClick={() => this.props.history.goBack()}
                    className="back hidden-xs"
                    className="back hidden-xs"
                  >
                    <img src="../../images/back-arrow-blue.svg" />
                  </a>
                  <ul className="list-unstyled breadcrumb page-title hidden-xs">
                    <li>
                      <a
                        href="javascript: ;"
                        onClick={
                          () => this.props.history.goBack()
                          // this.routedChange.bind(this, "user_inbox")
                        }
                      >
                        {this.state.comingFrom}
                      </a>
                    </li>
                    <li>Data Tagging</li>
                  </ul>

                  <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
                </div>

                <div className="main-content col-md-12 col-xs-12">
                  <div className="resp_msg">{this.state.add_cmnt_msg}</div>

                  <input
                    type="hidden"
                    id="logged_user_id"
                    value={this.state.logged_user_id}
                  />
                  <input
                    type="hidden"
                    id="file_id"
                    // value={this.props.match.params.file_id}
                    value={this.state.present_file_id}
                  />
                  <input
                    type="hidden"
                    id="list_id"
                    value={this.props.match.params.list_id}
                  />

                  <a
                    onClick={
                      () => this.props.history.goBack()
                      // this.routedChange.bind(this, "user_inbox")
                    }
                    className="back visible-xs"
                  >
                    {/* <img src="../../images/back-arrow-dark.svg"> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18.5"
                      height="14.249"
                      viewBox="0 0 18.5 14.249"
                    >
                      <g
                        id="left-arrow_2_"
                        data-name="left-arrow (2)"
                        transform="translate(0 -58.83)"
                      >
                        <g
                          id="Group_25"
                          data-name="Group 25"
                          transform="translate(0 65.207)"
                        >
                          <g
                            id="Group_24"
                            data-name="Group 24"
                            transform="translate(0 0)"
                          >
                            <path
                              id="Path_19"
                              data-name="Path 19"
                              d="M17.753,235.318H.747a.747.747,0,0,0,0,1.495H17.753a.747.747,0,0,0,0-1.495Z"
                              transform="translate(0 -235.318)"
                            />
                          </g>
                        </g>
                        <g
                          id="Group_27"
                          data-name="Group 27"
                          transform="translate(0 58.83)"
                        >
                          <g
                            id="Group_26"
                            data-name="Group 26"
                            transform="translate(0 0)"
                          >
                            <path
                              id="Path_20"
                              data-name="Path 20"
                              d="M1.8,65.954l5.849-5.849A.747.747,0,1,0,6.6,59.049L.219,65.426a.747.747,0,0,0,0,1.057L6.6,72.86A.747.747,0,1,0,7.653,71.8Z"
                              transform="translate(0 -58.83)"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </a>
                  <span className="page-title visible-xs">
                    Inbox / <span>Data Tagging</span>
                  </span>
                  {(this.state.loading || this.state.cloud) ? <div class="loading_spinner">Loading&#8230;</div> : ''}
                  <div className="content-top col-md-12 col-xs-12 pad-no">
                    {/* <select className="select-dropdown selectpicker">
                      <option>Bill-Payment.pdf</option>
                      <option>Taxi-bill.jpg</option>
                      <option>Stationary.jpg</option>
                    </select> */}

                    {/* my work */}
                    {/* <div className='pull-left mob-xs-flft'>
                      <button
                        // disabled={role_permissions.includes(18) ? true : false}
                        className='btn btn-white pull-left mar-rgt-5'
                        onClick={() => {
                          this.setState({
                            continueButton: true,
                            con1: true,
                            con2: true,
                            con3: true,
                            row1: Number(this.state.rows.length),
                            row2: Number(this.state.rows.length),
                            row3: Number(this.state.rows.length)
                          })
                        }}
                      >
                        Continue
                      </button>
                      <button type='button'
                        //  onClick={() => this.clear()}
                        // disabled={role_permissions.includes(18) ? true : false}
                        className='btn btn-white pull-left mar-rgt-5'
                      >
                        Done
                      </button>
                    </div> */}
                    {/* my work */}


                    <div className='pull-right mob-xs-flft'>
                      <button
                        // disabled={role_permissions.includes(18) ? true : false}
                        className='btn btn-white pull-left mar-rgt-5'
                        onClick={() => { { this.handleUndoClick() } }}
                      >
                        Undo
                      </button>
                      <button type='button' onClick={() => this.clearTable()}
                        // disabled={role_permissions.includes(18) ? true : false}
                        className='btn btn-white pull-left mar-rgt-5'
                      >
                        Clear Table Data
                      </button>
                      <button type='button' onClick={() => {
                        this.clearTable()
                        setTimeout(() => {
                          this.clear()
                        }, 2000);

                      }
                      }
                        // disabled={role_permissions.includes(18) ? true : false}
                        className='btn btn-white pull-left mar-rgt-5'
                      >
                        Clear All Data
                      </button>
                    </div>
                  </div>

                  <div className="content-sec col-md-12 col-xs-12 pad-no inbox-listing">
                    <div className="col-md-12 col-xs-12 scanned-wrap">
                      <p className="visible-xs note-content">
                        This feature cant use in mobile. Please use Desktop
                      </p>
                      <div className="col-md-6 col-md-12 scanned-left hidden-xs">
                        <div className="file-thumbnail">
                          <ul className="list-unstyled">{file_path}</ul>
                        </div>
                        <div className="doc-wrap">
                          <div className="zoom-btn">
                            <a href="javascript:;" className="plus">
                              <img src="../../images/zoom-in.svg" alt="icon" />
                            </a>
                            <a href="javascript:;" className="minus">
                              <img src="../../images/zoom-out.svg" alt="icon" />
                            </a>
                          </div>

                          <ContextMenuTrigger id="some_unique_identifier">
                            {scanned_div}
                          </ContextMenuTrigger>

                          <form
                            className="comment-sec"
                            method="post"
                            onSubmit={this.addCommentFunc.bind(this)}
                          >
                            <textarea
                              cols="3"
                              rows="5"
                              name="comment_text"
                              id="comment_text"
                              className="form-control"
                              placeholder="Comments"
                              required
                            ></textarea>
                            <button className="btn btn-green" type="submit">
                              Send
                            </button>
                          </form>
                          <div className="comments-wrap">
                            {this.state.file_comments.map((item, i) => {
                              var subCommentsArray = this.state.combinedArray.filter(
                                (h) => h.parent_comment === item.comment_id
                              );


                              if (subCommentsArray) {
                                var subCommentsArrayListView = subCommentsArray.map(
                                  (kk, ik) => {
                                    jQuery("#reply" + i).html(
                                      subCommentsArray.length > 1
                                        ? `${subCommentsArray.length} Replies`
                                        : `${subCommentsArray.length} Reply`
                                    );

                                    return (
                                      <React.Fragment>
                                        <div
                                          className="reply-cont col-md-12 col-xs-12"
                                          key={kk.comment_id}
                                        >
                                          <div className="col-md-12 col-xs-12 pad-no">
                                            <div className="avatar-img">
                                              <img
                                                className="img-responsive"
                                                src="../../images/avatar-2.png"
                                                alt="AvatarIMG"
                                              />
                                            </div>
                                            <div className="reply-user">
                                              <span className="col-md-12 col-xs-12 pad-no user-name">
                                                {kk.comment_user}
                                              </span>
                                              <span className="col-md-12 col-xs-12 pad-no date">
                                                {kk.ago_value}
                                              </span>
                                            </div>
                                            <div className="dropdown menu-item new-cus">
                                              <a
                                                href="javascript"
                                                class="dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <img
                                                  src="../../images/menu-dot.svg"
                                                  alt="icon"
                                                />
                                              </a>
                                              <ul className="dropdown-menu">
                                                {kk.is_editable_and_deletable == 1 && kk.user_id == this.state.logged_user_id &&
                                                  <li>
                                                    <a
                                                      href="javascript:;"
                                                      onClick={() => {
                                                        // this.deleteComment(
                                                        //   kk.comment_id
                                                        // )
                                                        // alert('hiiii')
                                                        // alert(jQuery('#textof'+i).html())
                                                        jQuery(
                                                          "#update_box" +
                                                          kk.comment_id
                                                        ).css("display", "block");

                                                        jQuery(
                                                          "textarea#textup" +
                                                          kk.comment_id
                                                        ).html(
                                                          jQuery(
                                                            "#textof" +
                                                            kk.comment_id
                                                          ).html()
                                                        );
                                                      }}
                                                    >
                                                      Edit
                                                    </a>
                                                  </li>}
                                                {kk.is_editable_and_deletable == 1 && kk.user_id == this.state.logged_user_id &&

                                                  <li>
                                                    <a
                                                      href="javascript:;"
                                                      onClick={() => {
                                                        this.deleteComment(
                                                          kk.comment_id
                                                        );
                                                      }}
                                                    >
                                                      Delete
                                                    </a>
                                                  </li>
                                                }
                                              </ul>
                                            </div>
                                          </div>
                                          <p
                                            className="col-md-12 col-xs-12 pad-no comment-txt"
                                            id={`textof${kk.comment_id}`}
                                          >
                                            {kk.comment_text}
                                          </p>
                                          <div className="attachment-item col-md-12 col-xs-12 pad-no">
                                            {kk.file_path.length > 0 &&
                                              kk.file_path.map((img) => {
                                                const url_path = img;
                                                const name_split = url_path.split(
                                                  "/"
                                                );
                                                const name_img =
                                                  name_split[
                                                  name_split.length - 1
                                                  ];
                                                const file_type = name_img.split(
                                                  "."
                                                );
                                                const extension_type =
                                                  file_type[
                                                  file_type.length - 1
                                                  ];

                                                const display_name =
                                                  name_img.length > 0
                                                    ? name_img.slice(0, 23)
                                                    : "";
                                                if (
                                                  extension_type == "png" ||
                                                  extension_type == "jpg" ||
                                                  extension_type == "jpg" ||
                                                  extension_type == "jpeg"
                                                ) {
                                                  return (
                                                    <a
                                                      onClick={() => {
                                                        // this.props.history.push('/data_tagging/' + this.state.list_id + '/' + kk.attachments[0])
                                                        this.props.history.push(
                                                          "/loading",
                                                          [
                                                            "/data_tagging/" +
                                                            this.state
                                                              .list_id +
                                                            "/" +
                                                            Number(
                                                              kk
                                                                .attachments[0]
                                                            ),
                                                          ]
                                                        );
                                                      }}
                                                    >
                                                      <img
                                                        src="../../images/img-icon.png"
                                                        alt="IMG"
                                                      />
                                                      <span>
                                                        {display_name}
                                                      </span>
                                                    </a>
                                                  );
                                                }
                                                if (extension_type == "pdf") {
                                                  return (
                                                    <a
                                                      onClick={() => {
                                                        this.props.history.push(
                                                          "/loading",
                                                          [
                                                            "/data_tagging/" +
                                                            this.state
                                                              .list_id +
                                                            "/" +
                                                            Number(
                                                              kk
                                                                .attachments[0]
                                                            ),
                                                          ]
                                                        );

                                                        // this.props.history.push('/data_tagging/' + this.state.list_id + '/' + Number(kk.attachments[0]))
                                                      }}
                                                    >
                                                      <img
                                                        src="../../images/pdf-icon.png"
                                                        alt="PDF"
                                                      />
                                                      <span>
                                                        {display_name}
                                                      </span>
                                                    </a>
                                                  );
                                                }
                                              })}
                                          </div>
                                        </div>
                                        <form
                                          className="col-md-12 col-xs-12 pad-no reply-form"
                                          id={`update_box${kk.comment_id}`}
                                          style={{ display: "none" }}
                                        >
                                          <textarea
                                            className="col-md-12 col-xs-12"
                                            id={`textup${kk.comment_id}`}
                                            // placeholder='Reply...'
                                            defaultValue={""}
                                          />

                                          <div className="pull-right">
                                            <button
                                              style={{
                                                marginRight: 13,
                                                background: "antiquewhite",
                                                color: "darkgreen",
                                              }}
                                              type="button"
                                              className="btn btn-green"
                                              onClick={() => {
                                                jQuery(
                                                  "#update_box" + kk.comment_id
                                                ).css("display", "none");
                                              }}
                                            >
                                              Cancel
                                            </button>

                                            <button
                                              type="button"
                                              className="btn btn-green"
                                              onClick={() => {
                                                this.updateCmmnt(
                                                  kk.comment_id,
                                                  kk.comment_id,
                                                  item.comment_id
                                                );
                                              }}
                                            >
                                              <img
                                                src="../../images/reply-icon.svg"
                                                alt="icon"
                                              />
                                              Update
                                            </button>
                                          </div>
                                        </form>
                                      </React.Fragment>
                                    );
                                  }
                                );
                              }

                              return (
                                <React.Fragment>
                                  <div className="comment-sec col-md-12 col-xs-12 pad-no">
                                    {item.is_editable_and_deletable == 1 && item.user_id == this.state.logged_user_id &&

                                      <a
                                        onClick={(e) => {
                                          e.preventDefault();
                                          this.deleteComment(
                                            item.comment_id
                                          );
                                        }}>
                                        <img
                                          className="img-responsive"
                                          src="../../images/delete-icon.svg"
                                          alt="icon"
                                        />
                                      </a>
                                    }
                                    <div className="avatar-img">
                                      <img
                                        className="img-responsive"
                                        src="../../images/avatar-1.png"
                                        alt="AvatarIMG"
                                      />
                                    </div>
                                    <div className="comment-cont">
                                      {item.status == 1 ? null : (
                                        <span className="label label-success">
                                          Resolved
                                        </span>
                                      )}
                                      <span className="col-md-12 col-xs-12 pad-no user-name">
                                        {item.comment_user}
                                      </span>
                                      <span className="col-md-12 col-xs-12 pad-no date">
                                        {item.ago_value}
                                      </span>
                                      <p className="col-md-12 col-xs-12 pad-no comment-txt">
                                        {item.comment_text}{" "}
                                      </p>

                                      <a
                                        href="javascript:;"
                                        className="pull-left reply-link"
                                        onClick={() => {
                                          if (
                                            jQuery("#reply_box" + i).css(
                                              "display"
                                            ) == "block"
                                          ) {
                                            jQuery("#reply_box" + i).css(
                                              "display",
                                              "none"
                                            );
                                            jQuery("#comments" + i).css(
                                              "display",
                                              "none"
                                            );
                                          } else {
                                            jQuery("#reply_box" + i).css(
                                              "display",
                                              "block"
                                            );
                                            jQuery("#comments" + i).css(
                                              "display",
                                              "block"
                                            );
                                          }
                                        }}
                                      >
                                        <span id={`reply${i}`}> Reply</span>
                                      </a>
                                      <div
                                        id={`comments${i}`}
                                        style={{ display: "none" }}
                                      >
                                        {subCommentsArrayListView}
                                      </div>
                                      <form
                                        className="col-md-12 col-xs-12 pad-no reply-form"
                                        id={`reply_box${i}`}
                                        style={{ display: "none" }}
                                      >
                                        <textarea
                                          className="col-md-12 col-xs-12"
                                          id={`text${i}`}
                                          placeholder="Reply..."
                                          defaultValue={""}
                                        />
                                        <div className="pull-right">
                                          {this.state.attachment_file.length >
                                            0 && (
                                              <span>
                                                {
                                                  this.state.attachment_file
                                                    .length
                                                }{" "}
                                                item(s) selected
                                              </span>
                                            )}

                                          <a
                                            href="javascript:;"
                                            className=" btn btn-empty"
                                          >
                                            <input
                                              type="file"
                                              name="imgInp[]"
                                              id="imgInp"
                                              className="add_img"
                                              multiple
                                              onChange={this.loadFile.bind(
                                                this
                                              )}
                                              accept="image/*,application/pdf"
                                              required
                                            />
                                            <img
                                              src="../../images/attach-icon.svg"
                                              alt="icon"
                                            />
                                          </a>
                                          <button
                                            type="button"
                                            className="btn btn-green"
                                            onClick={() => {
                                              this.addSubCommentFunc(
                                                item.comment_id,
                                                i
                                              );
                                            }}
                                          >
                                            <img
                                              src="../../images/reply-icon.svg"
                                              alt="icon"
                                            />
                                            Reply
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>

                                  {/* {this.getSubcomments(item.comment_id)} */}
                                  {item.status == 1 && (
                                    <div className="col-md-12 col-xs-12 pad-no">
                                      <button
                                        style={{
                                          marginTop: "1rem",
                                          marginLeft: "5rem",
                                        }}
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => {
                                          if (item.status == 1) {
                                            this.activateResolved(
                                              item.comment_id
                                            );
                                          }
                                        }}
                                      >
                                        {item.status == 1
                                          ? "Waiting for response"
                                          : null}
                                      </button>
                                    </div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-12 col-xs-12 scanned-right hidden-xs">
                        <form
                          id="form_save"
                          className="data-feed"
                        // onSubmit={(e) => {
                        //   e.preventDefault();
                        //   if(this.state.template_type == '2'){this.saveAndContinue()}
                        //   else{this.saveAndContinue2()}
                        // }}
                        >
                          <div className=" form-group col-md-4 col-xs-4 custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadioInline1"
                              name="template_type"
                              className="custom-control-input"
                              onChange={(event) => {
                                if (this.state.coming_from_bill == 'yes' && (jQuery("#paid_status").html() == 'Credit Note' || jQuery("#paid_status").html() == "Unpaid--Bill")) {
                                  if (event.target.checked) {
                                  //  alert('in')
                                    this.setState({ bill_to_credit: true })
                                  }
                                  this.handleChange(event)
                                } else {
                                  this.handleChange(event)
                                }
                              }
                              }
                              value="1"
                              checked={this.state.template_type === "1"}
                            />
                            <label
                              className="custom-control-label"
                              for="customRadioInline1"
                              style={{ margin: "4%" }}
                            >
                              Invoice
                            </label>
                          </div>
                          <div className=" form-group col-md-4 col-xs-4 custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadioInline2"
                              name="template_type"
                              className="custom-control-input"
                              onChange={(event) => {
                                if (this.state.coming_from_bill == 'yes' && jQuery("#paid_status").html() != "Unpaid--Bill") {
                                  alert('you cannot change paid bills to credit note')
                                } else if (this.state.coming_from_bill == 'yes' && jQuery("#paid_status").html() !=
                                  " Unpaid--Bill") {
                                  if (event.target.checked) {
                                   // alert('cre')
                                    this.setState({ bill_to_credit: true })
                                  }
                                  this.handleChange(event)
                                } else {
                                  this.handleChange(event)
                                }
                              }
                              }
                              value="2"
                              checked={this.state.template_type == "2"}
                            />
                            <label
                              className="custom-control-label"
                              for="customRadioInline2"
                              style={{ margin: "4%" }}
                            >
                              Credit Note
                            </label>
                          </div>

                          <div className=" form-group col-md-4 col-xs-4 custom-control custom-radio custom-control-inline">
                            <label
                              id="paid_status"
                              className="custom-control-label"
                              style={{ margin: "4%" }}
                            ></label>
                          </div>

                          <div className="form-group col-md-12 col-xs-12">
                            <label>Company Name</label>
                            <span className="astrick">*</span>
                            <input
                              type="text"
                              name="company_name"
                              id="company_name"
                              className="form-control"
                              autoComplete="off"
                              value={this.state.company_name}
                              onChange={(event) => this.handleChange(event)}
                              list="vendor_name"
                              required
                            />
                            <datalist id="vendor_name">
                              {this.state.vendorNameList &&
                                this.state.vendorNameList.map((item, i) => {
                                  return (
                                    <option value={item.vendor_name} />
                                  )
                                })
                              }


                            </datalist>
                            {!this.state.isCompany_name ? (
                              <div style={{ float: "left" }}>
                                <small style={{ color: "red" }}>
                                  *Please fill out company name.
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="form-group col-md-6 col-sm-6">
                            {this.state.template_type == "1" ? (
                              <label>Invoice No</label>
                            ) : (
                              <label>Credit No</label>
                            )}
                            <span className="astrick">*</span>
                            <input
                              type="text"
                              name="invoice_no"
                              id="invoice_no"
                              autoComplete="off"
                              className="form-control"
                              value={this.state.invoice_no}
                              onChange={(event) => this.handleChange(event)}
                              required
                            />
                            {!this.state.isInvoice_no ? (
                              <div style={{ float: "left" }}>
                                <small style={{ color: "red" }}>
                                  *Please fill out invoice number.
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="form-group col-md-6 col-sm-6">
                            <label>Invoice Date</label>
                            <div className="input-group date mar-t-no" data-date-format="DD/MM/YYYY" >
                              <input
                                id="dateReal"
                                onBlur={(e) => {
                                  setTimeout(() => {
                                    // console.log('wwwww', jQuery('#dateReal').val())
                                    let input = jQuery('#dateReal').val()
                                    let array = input.split('/')
                                    let format = array[1] + "-" + array[0] + "-" + array[2]
                                    let date = moment(format).format("YYYY-MM-DD");
                                    this.setState({
                                      date: input
                                    }, this.onDateChange());
                                  }, 500);

                                }}
                                value={this.state.date}
                                className="form-control"
                                placeholder="DD-MM-YYYY"

                              />
                              <div className="input-group-addon" >
                                <img src="/images/calendar-icon.svg" alt="icon" />
                              </div>
                            </div>
                          </div>


                          {/* <div className="form-group col-md-6 col-sm-6">
                            <label>Date (DD-MM-YYYY)</label>
           
                            <div className="input-group date mar-t-no" 
                             >
                              <input
                              type="text"
                              id="date"
                              clearAriaLabel="aria-label"
                                onBlur={(e) =>{
                                  setTimeout(() => {
                                    console.log('wwwww',jQuery("#date").val(),'date',this.state.date)
                                    let date = jQuery('#date').val()
                                  this.setState({ date },  console.log('wwwww1',jQuery("#date").val(),'date',this.state.date))
                                    this.onDateChange()
                                  }, 500)
}
                                }
                                value={this.state.date}
                                className="form-control"
                               
                                
                              />
                              <div className="input-group-addon">
                                <img src="/images/calendar-icon.svg" alt="icon" />
                              </div>
                            </div>
                          </div> */}
                          <div className="form-group col-md-12 col-xs-12">
                            <label>Address</label>
                            <input
                              type="text"
                              cols="3"
                              rows="5"
                              name="address"
                              id="address"
                              autoComplete="off"
                              className="form-control"
                              value={this.state.address}
                              onChange={(event) => this.handleChange(event)}
                            />
                          </div>
                          <div className="form-group col-md-6 col-sm-6">
                            <label>Currency</label>
                            {/* <select
                              className="selectpicker form-control add-new"
                              id="invoice_curr_id"
                              data-live-search="true"
                              title={`Choose`}
                              // data-width="150%"
                              onChange={(e) => {
                                if (
                                  jQuery("#paid_status").val() ==
                                  "Partially paid--invoice"
                                ) {
                                  alert(
                                    "you cannot change currency to partially paid invoices"
                                  );
                                } else {
                                  jQuery("#Exchange").val("");

                                  this.setState(
                                    {
                                      CurrentSelectedCurr: e.target.value,
                                      duplicateVar: e.target.value,
                                    },
                                    () => {
                                      this.handleChangeItems(
                                        0,
                                        this.state.rows.length - 1
                                      );
                                      setTimeout(() => {
                                        this.setState(
                                          {
                                            cus_rate_rate: this.state
                                              .exchange_value_ref,
                                          },
                                          () => {
                                            this.handleChangeItems(
                                              0,
                                              this.state.rows.length - 1
                                            );
                                          }
                                        );
                                      }, 2000);
                                    }
                                  );
                                }
                              }}
                            >

                              {this.state.currencies &&
                                this.state.currencies.map((item) => {
                                    "sjhkalshasjaj",
                                    this.state.currencies
                                  );

                                  if (item.code !== "ALL") {
                                    return <option value={item}> {item}</option>;
                                  }
                                })}
                            </select> */}

                            <div className="custom-select-drop dropdown">
                              <a
                                aria-expanded="false"
                                aria-haspopup="true"
                                role="button"
                                data-toggle="dropdown"
                                className="dropdown-toggle btn"
                                href="javascript:;"
                                value={this.state.selected}
                                id="currency"
                                required
                              >
                                <span style={{ width: "100%" }}
                                  // id="selected"
                                  onChange={(event) => this.handleChange(event)}
                                >
                                  {this.state.ToCurrency}
                                </span>
                                <span className="caret"></span>
                              </a>
                              <ul
                                className="dropdown-menu category"
                                style={{
                                  height: 213,
                                  overflow: "scroll",
                                  width: "auto",
                                }}
                              >
                                <li>
                                  <input
                                    type="text"
                                    name="search"
                                    className="form-control"
                                    placeholder="Search"
                                    id="_search"
                                    autoComplete="off"
                                    onChange={(e) => this.filter_currenciess(e)}
                                    // onBlur={()=>{jQuery('#_search').val(''); this.get_currencies()}}
                                    required
                                  />
                                </li>
                                <li>
                                  <ul className="list-unstyled">
                                    {this.state.currencies.map(
                                      (item, index) => {
                                        return (
                                          <li
                                            key={index}
                                            onClick={(e) => {
                                              if (
                                                jQuery("#paid_status").html() ==
                                                "Partially paid--Bill"
                                              ) {
                                                alert(
                                                  "you cannot change currency to partially paid Bills"
                                                );
                                              } else {
                                                jQuery("#Exchange").val("");
                                                this.handleCheck_currency(e);
                                              }
                                            }}
                                            name={item}
                                            data-namee={item}
                                            data-id={index}
                                          >
                                            <a
                                              href="javascript:;"
                                              value={item.name}
                                            >
                                              {item}
                                            </a>
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                </li>
                              </ul>
                            </div>


                          </div>

                          <div className="form-group col-md-6 col-sm-6">
                            <label>Default Category</label>

                            {/* <select
                              className="selectpicker form-control add-new"
                              id="invoice_curr_id"
                              data-live-search="true"
                              title={`Choose`}
                              // data-width="150%"
                              onChange={(e) => {
                                if (
                                  jQuery("#paid_status").val() ==
                                  "Partially paid--invoice"
                                ) {
                                  alert(
                                    "you cannot change currency to partially paid invoices"
                                  );
                                } else {
                                  jQuery("#Exchange").val("");

                                  this.setState(
                                    {
                                      CurrentSelectedCurr: e.target.value,
                                      duplicateVar: e.target.value,
                                    },
                                    () => {
                                      this.handleChangeItems(
                                        0,
                                        this.state.rows.length - 1
                                      );
                                      setTimeout(() => {
                                        this.setState(
                                          {
                                            cus_rate_rate: this.state
                                              .exchange_value_ref,
                                          },
                                          () => {
                                            this.handleChangeItems(
                                              0,
                                              this.state.rows.length - 1
                                            );
                                          }
                                        );
                                      }, 2000);
                                    }
                                  );
                                }
                              }}
                            >

                              {this.state.default_category_list &&
                                this.state.default_category_list.map((item) => {
                                

                                  if (item.code !== "ALL") {
                                    return <option value={item.name}> {item.name}</option>;
                                  }
                                })}
                            </select> */}


                            <div className="custom-select-drop dropdown">
                              <a
                                aria-expanded="false"
                                aria-haspopup="true"
                                role="button"
                                data-toggle="dropdown"
                                className="dropdown-toggle btn"
                                href="javascript:;"
                                value={this.state.selected}
                                id="default_catagory"
                                required
                              >
                                <span style={{ overflow: 'hidden' }}
                                  // id="selected"
                                  onChange={(event) => this.handleChange(event)}
                                >
                                  {this.state.selected != ""
                                    ? this.state.selected
                                    : "Choose Category"}
                                </span>
                                <span className="caret"></span>
                              </a>
                              <ul
                                className="dropdown-menu category"
                                style={{
                                  height: 213,
                                  overflow: "scroll",
                                  width: "auto",
                                }}
                              >
                                <li>
                                  <input
                                    type="text"
                                    name="search"
                                    id="_search_def"
                                    className="form-control"
                                    placeholder="Search"
                                    // onBlur={(event)=>{jQuery('_search_def').val('');THIS.defaultcategorylist_onchange(event)}}
                                    autoComplete="off"
                                    onInput={(event) =>
                                      THIS.defaultcategorylist_onchange(event)
                                    }
                                    required
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-rounded btn-blue"
                                    data-toggle="modal"
                                    data-target="#pop-modal"
                                  >
                                    Add New
                                    <img
                                      className="arrow-icon"
                                      src="../../images/right-arrow.svg"
                                      alt="icon"
                                    />
                                  </button>
                                </li>
                                <li>
                                  <ul className="list-unstyled">
                                    {this.state.default_category_list.map(
                                      (item, index) => {
                                        return (
                                          <li
                                            key={index}
                                            onClick={this.handleCheck.bind(
                                              this
                                            )}
                                            name={item}
                                            data-id={item.name}
                                            data-the={item.id}
                                            className={
                                              this.state.selectedindex ==
                                                item.id
                                                ? "active"
                                                : ""
                                            }
                                          >
                                            <a
                                              href="javascript:;"
                                              value={item.name}
                                            >
                                              {item.name}
                                            </a>
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                </li>
                              </ul>
                            </div>
                            {/* 
                            <select className="selectpicker form-control add-new"
                              id="default_catagory"
                              value={this.state.selected}
                              data-live-search="true"
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
                                  this.handleCheck(e)
                                }
                              }}>
                              <option value="">choose...</option>
                              <option value="1e">Add New </option>
                              {this.state.default_category_list.map(
                                (item, index) => {

                                  return (
                                    <option value={item.id} >{item.name}</option>
                                  )
                                })}
                            </select>
 */}

                          </div>

                          {/* //Jp work */}

                          <div
                            className="modal fade pop-modal"
                            id="add-modal-ocr"
                            role="dialog"
                          >
                            <div className="modal-dialog modal-md custom-modal">
                              <button
                                type="button"
                                className="close hidden-xs"
                                data-dismiss="modal"
                              // onClick={this.cancel_gst_modal}  
                              >
                                <img
                                  className="img-responsive"
                                  src="../../images/close-red.svg"
                                  alt="icon"
                                />
                              </button>
                              <div className="modal-content">
                                <div className="modal-body text-center">
                                  <h3>Add to Invoice</h3>
                                  <form className="custom-form row">
                                    <div className="form-group col-md-12 col-xs-12 pad-no">
                                      <div className="col-md-12 col-sm-4 col-xs-12">
                                        <label>
                                          {" "}
                                          Selected Words{" "}
                                          <span
                                            id="selectedOCRVALUE"
                                            className="astrick"
                                          ></span>
                                        </label>
                                      </div>
                                      <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                        <div className="col-md-4 col-sm-4 col-xs-12">
                                          <label>
                                            Select Where to place
                                            <span className="astrick">*</span>
                                          </label>
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-xs-12">
                                          <label className="custom-checkbox radio ">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="company_name"
                                            />
                                            Company name
                                            <span className="checkmark"></span>
                                          </label>
                                          <br />
                                          <br />
                                          <label className="custom-checkbox radio ">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="invoice_no"
                                            />
                                            Invoice No
                                            <span className="checkmark"></span>
                                          </label>
                                          <br />
                                          <br />
                                          <label className="custom-checkbox radio non-taxable">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="date"
                                            />
                                            Invoice Date
                                            <span className="checkmark"></span>
                                          </label>
                                          <br />
                                          <br />
                                          <label className="custom-checkbox radio non-taxable">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="address"
                                            />
                                            Address
                                            <span className="checkmark"></span>
                                          </label>
                                          <br />
                                          <br />
                                          <label className="custom-checkbox radio non-taxable">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="currency"
                                            />
                                            Currency
                                            <span className="checkmark"></span>
                                          </label>
                                          <br />
                                          <br />
                                          <label className="custom-checkbox radio non-taxable">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="due_date"
                                              autoComplete="off"
                                            />
                                            Due Date
                                            <span className="checkmark"></span>
                                          </label>
                                          {/* <br />
                                          <br />
                                          <label className="custom-checkbox radio non-taxable">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="item"
                                            />
                                            Item
                                            <span className="checkmark"></span>
                                          </label> */}
                                          <br />
                                          <br />
                                          <label className="custom-checkbox radio non-taxable">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="description"
                                            />
                                            Description
                                            <span className="checkmark"></span>
                                          </label>
                                          <br />
                                          <br />
                                          <label className="custom-checkbox radio non-taxable">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="description_without_white_space"
                                            />
                                            Description Without WhiteSpace
                                            <span className="checkmark"></span>
                                          </label>
                                          <br />
                                          <br />
                                          <label className="custom-checkbox radio non-taxable">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="quantity"
                                            />
                                            Qty
                                            <span className="checkmark"></span>
                                          </label>
                                          <br />
                                          <br />

                                          <label className="custom-checkbox radio non-taxable">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="unit_price"
                                            />
                                            Unit Price
                                            <span className="checkmark"></span>
                                          </label>
                                          {/* <br />
                                          <br />
                                          <label className="custom-checkbox radio non-taxable">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="subtotal"
                                            />
                                            SubTotal
                                            <span className="checkmark"></span>
                                          </label>
                                          <br />
                                          <br />
                                          <label className="custom-checkbox radio non-item_total_foreign_currency">
                                            <input
                                              type="radio"
                                              name="ocrradio"
                                              value="item_total_home_currency"
                                            />
                                            Total
                                            <span className="checkmark"></span>
                                          </label>
                                      */}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                                      {this.state.show_succes ? (
                                        <div className="alert alert-success">
                                          <strong>Success!</strong> Your new GST
                                          is added.
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      <button
                                        className="btn btn-lightgray"
                                        data-dismiss="modal"
                                      // onClick={this.modal_cancel}
                                      >
                                        Cancel
                                      </button>
                                      <span>{"   "}</span>
                                      <button
                                        className="btn btn-green"
                                        type="button"
                                        onClick={this.callocrmodelvaue}
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* //Jp work */}
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
                                          name="sales_tax_code"
                                          id="sales_tax_code"
                                          autoComplete="off"
                                          maxLength="4"
                                          className="form-control"
                                          onChange={(event) =>
                                            this.handleChange(event)
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
                                          name="salesTax_name_entered"
                                          autoComplete="off"
                                          id="sales_tax_name"
                                          className="form-control"
                                          onChange={(event) =>
                                            this.handleChange(event)
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
                                              THIS.state.selectedOption ===
                                              "option1"
                                            }
                                            onChange={THIS.handleOptionChange}
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
                                              THIS.state.selectedOption ===
                                              "option2"
                                            }
                                            onChange={THIS.handleOptionChange}
                                          />{" "}
                                          Non-Taxable/Exempt
                                          <span className="checkmark"></span>
                                        </label>
                                        {THIS.state.selectedOption ===
                                          "option1" ? (
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
                                                      name="tax"
                                                      id="tax"
                                                      autoComplete="off"
                                                      required
                                                      onInput={(event) =>
                                                        THIS.handleChange_gst_type(
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
                                          <strong>Success!</strong> Your new GST
                                          is added.
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
                                        type="button"
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

                          <div
                            className="modal fade pop-modal"
                            id="pop-modal-2"
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
                                  <h3>Add New Column</h3>
                                  <form className="custom-form row">
                                    <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                      <div className="col-md-4 col-sm-4 col-xs-12">
                                        <label>
                                          Type Of the Editable Field
                                        </label>
                                      </div>
                                      <div className="col-md-8 col-sm-8 col-xs-12">
                                        <label className="custom-checkbox radio mar-rgt taxable">
                                          <input
                                            type="radio"
                                            name="editableField"
                                            value="textField"
                                            checked={
                                              this.state.selectedColumnType ===
                                              "textField"
                                            }
                                            onChange={
                                              THIS.typeOfColumnTobeModified
                                            }
                                          />
                                          Text
                                          <span className="checkmark"></span>
                                        </label>
                                        <label className="custom-checkbox radio non-taxable">
                                          <input
                                            type="radio"
                                            name="editableField"
                                            value="dropDownField"
                                            checked={
                                              this.state.selectedColumnType ===
                                              "dropDownField"
                                            }
                                            onChange={
                                              THIS.typeOfColumnTobeModified
                                            }
                                          />{" "}
                                          Drop Down
                                          <span className="checkmark"></span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                      <div className="col-md-4 col-sm-4 col-xs-12">
                                        <label>Coulmn Name</label>
                                      </div>
                                      <div className="col-md-8 col-sm-8 col-xs-12">
                                        <input
                                          autoComplete="off"
                                          type="text"
                                          className="form-control"
                                          id="coulmn_name"
                                        />
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
                                          <strong>Success!</strong> Your new GST
                                          is added.
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
                                        type="button"
                                        onClick={THIS.add_coulmn}
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-wrap col-md-12 col-xs-12 pad-r-no"></div>

                          <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
                            <div
                              className="modal fade pop-modal"
                              id="drop-down-add"
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
                                    <h3>Add New Option</h3>
                                    <form className="custom-form row">
                                      <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                        <div className="col-md-4 col-sm-4 col-xs-12">
                                          <label>
                                            Enter Your Custom Option
                                          </label>
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-xs-12">
                                          <input
                                            type="text"
                                            name="new_option"
                                            id="new_option"
                                            autoComplete="off"
                                            className="form-control"
                                            onChange={(event) =>
                                              this.handleChange(event)
                                            }
                                            required
                                          />
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
                                            <strong>Success!</strong> Your
                                            Option is being added
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
                                          onClick={THIS.add_options}
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group col-md-6 col-sm-6">
                            <label>Due Date</label>
                            <div className="input-group date mar-t-no" data-date-format="DD/MM/YYYY" >
                              <input
                                id="realdueDate"
                                onBlur={(e) => {
                                  setTimeout(() => {
                                    // console.log('cdcdcsdcsdcsd', jQuery('#realdueDate').val())
                                    let input = jQuery('#realdueDate').val()
                                    let array = input.split('/')
                                    let format = array[1] + "-" + array[0] + "-" + array[2]
                                    let date = moment(format).format("YYYY-MM-DD");
                                    this.setState({
                                      dueDate: date,
                                      dueDateReal: input,
                                    });
                                  }, 500);

                                }}
                                value={this.state.dueDateReal}
                                className="form-control"
                                placeholder="DD-MM-YYYY"

                              />
                              <div className="input-group-addon" >
                                <img src="/images/calendar-icon.svg" alt="icon" />
                              </div>
                            </div>
                          </div>


                          <div className="form-group col-md-6 col-sm-6">
                            <label>Default GST </label>

                            <div className="custom-select-drop dropdown tbl_drop_down cus">
                              <a
                                aria-expanded="false"
                                aria-haspopup="true"
                                role="button"
                                data-toggle="dropdown"
                                className="dropdown-toggle btn"
                                href="javascript:;"
                                // value={THIS.state.default_gst}
                                required
                              >
                                <span id={`selectednow`}> </span>
                                <span
                                  id={`selectednow_id`}
                                  style={{ display: "none" }}
                                >
                                  NO_VALUE
                                </span>
                                <input
                                  type="hidden"
                                  id={`selectedrate`}
                                />
                                <input
                                  type="hidden"
                                  id={`selectedtype_id`}
                                />
                                <input
                                  type="hidden"
                                  id={`selectednow`}
                                />
                                <input
                                  type="hidden"
                                  id={`default_gst_id`}
                                />

                                <span className="caret"></span>
                              </a>

                              <ul
                                className="dropdown-menu category"
                                style={{
                                  height: 213,
                                  overflowY: "scroll",
                                  width: "auto",
                                  overflowX: "auto",
                                }}
                              >
                                <li>
                                  <input
                                    type="text"
                                    name="search"
                                    id="gst_search"
                                    autoComplete="off"
                                    className="form-control"
                                    placeholder="Search"
                                    onInput={(event) =>
                                      THIS.update_search_keyword(
                                        event
                                      )
                                    }
                                    required
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-rounded btn-blue"
                                    data-toggle="modal"
                                    data-target="#pop-modal-1"
                                  >
                                    Add New
                                    <img
                                      className="arrow-icon"
                                      src="../../images/right-arrow.svg"
                                      alt="icon"
                                    />
                                  </button>
                                </li>
                                <li>
                                  <ul className="list-unstyled">
                                    {this.state.gst_list.map(
                                      (item, index) => {
                                        return (
                                          <li
                                            key={index}
                                            onClick={(event) => {
                                              jQuery(
                                                "#default_gst_id"
                                              ).val(item.id);

                                              jQuery(
                                                "#selectedrate"
                                              ).val(item.rate);
                                              jQuery(
                                                "#selectedtype_id"
                                              ).val(
                                                item.rate_type
                                              );
                                              jQuery(
                                                "#selectednow"
                                              ).html(
                                                item.sales_tax_name
                                              );


                                              // console.log('working2')
                                              this.state.rows.map((row, i) => {
                                                // console.log('working1')
                                                this.state.gst_list.map(
                                                  (item1, index) => {
                                                    if (item.name === item1.name && jQuery("#chosen_gst" + i).val() != 'manual') {
                                                      // console.log('working')

                                                      jQuery(
                                                        "#selectedrate" +
                                                        i
                                                      ).val(item.rate);
                                                      jQuery(
                                                        "#selectedtype_id" +
                                                        i
                                                      ).val(
                                                        item.rate_type
                                                      );
                                                      jQuery(
                                                        "#selectednow" +
                                                        i
                                                      ).val(
                                                        item.sales_tax_name
                                                      );
                                                      this.handleCheck_get_selected_tax(
                                                        i,
                                                        item1.sales_tax_name,
                                                        item1.rate,
                                                        item1.rate_type
                                                      );

                                                    }

                                                  })
                                              })


                                            }}
                                            data-name={
                                              item.sales_tax_name
                                            }
                                            data-rate={item.rate}
                                            data-type={
                                              item.rate_type
                                            }
                                          >
                                            <a
                                              href="javascript:;"
                                              value={item.name}
                                            >
                                              {
                                                item.sales_tax_name
                                              }
                                            </a>
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                </li>
                              </ul>
                            </div>


                          </div>


                          <div className='row' >
                            <div className="form-group col-md-3 col-sm-3">
                              <span className="form-label clearfix">Taxes</span>
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  checked={this.state.isChecked}
                                  onChange={this.toggleChange}
                                />{" "}
                                Including Tax
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>

                          <form name="myform" id="myform" className="col-md-12 pad-no">
                            <div className="th-action-inv">
                              <a
                                href="javascript:;"
                                className="add-col"
                                data-toggle="modal"
                                data-target="#pop-modal-2"
                              >
                                <img
                                  className="img-responsive"
                                  src="../../images/plus-icon.svg"
                                  alt="icon"
                                />
                              </a>
                              <a
                                href="javascript:;"
                                // data-toggle='modal'
                                // data-target='#editCol'
                                onClick={() => {
                                  var win = window.open(
                                    "/coulmn-rearrange",
                                    "_blank"
                                  );
                                  win.focus();
                                  // this.setState({
                                  //   isEditCol: !this.state.isEditCol
                                  // })
                                }}
                                className="add-col edit-col"
                              >
                                <img
                                  className="img-responsive"
                                  src="../../images/pen-blue.svg"
                                  alt="icon"
                                />
                              </a>
                            </div>
                            <div
                              className="form-table"
                              id="changeme"
                              style={{ overflowX: "auto" }}
                            >
                              <table id="table_custom"

                              >
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th style={{ display: 'none' }}>Items</th>
                                    <th>Description</th>
                                    <th>Qty</th>
                                    <th>Unit price</th>
                                    <th>GST</th>
                                    <th>Sub Total</th>

                                    {this.state.selectedColumnType ===
                                      "textField" &&
                                      this.state.coulmns &&
                                      this.state.coulmns.map(
                                        (coulmn, index) => {
                                          return (
                                            <th
                                              key={coulmn}
                                              id={`header${index}`}
                                              contentEditable
                                              onInput={(event) =>
                                                THIS.handleChangeItems(
                                                  event,
                                                  THIS.state.rows.length - 1
                                                )
                                              }
                                              required
                                              placeholder="Editable"
                                            >
                                              Editable
                                            </th>
                                          );
                                        }
                                      )}
                                    {/* {this.state.selectedColumnType ===
                                    'dropDownField' &&
                                    this.state.coulmns &&
                                    this.state.number_of_columns_list.map(
                                      (coulmn, index) => {
                                        return (
                                          <th
                                            key={coulmn.column_name}
                                            id={`header${index}`}
                                            onInput={event =>
                                              THIS.handleChangeItems(
                                                event,
                                                THIS.state.rows.length - 1
                                              )
                                            }
                                            required
                                            placeholder='DropDown'
                                          >
                                            {coulmn.column_name}
                                          </th>
                                        )
                                      }
                                    )} */}
                                    <th>Category</th>
                                    {Array.isArray(
                                      this.state.number_of_columns_list
                                    ) &&
                                      this.state.number_of_columns_list !=
                                      undefined &&
                                      this.state.number_of_columns_list.map(
                                        (coulmn, index) => {
                                          if (coulmn.is_visible == 1) {
                                            return (
                                              <th
                                                className="handle"
                                                key={coulmn.column_name}
                                                id={`header${index}`}
                                                onInput={(event) =>
                                                  THIS.handleChangeItems(
                                                    event,
                                                    THIS.state.rows.length - 1
                                                  )
                                                }
                                                required
                                                placeholder="DropDown"
                                              >
                                                {coulmn.column_name}
                                              </th>
                                            );
                                          }
                                        }
                                      )}

                                    <th></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {this.state.rows.map(function (row, index) {
                                    let itemid = index;
                                    let myvalue =
                                      THIS.state.myarray && THIS.state.myarray.length > 0 &&
                                        THIS.state.myarray[itemid]
                                        // &&
                                        // THIS.state.myarray[itemid].price != "" 
                                        // &&
                                        // THIS.state.myarray[itemid].price != 0
                                        ? THIS.state.myarray[itemid].price
                                        : "";
                                    // alert(THIS.state.myarray && THIS.state.myarray.length > 0 &&THIS.state.myarray[itemid] ?THIS.state.myarray[itemid].price : '')
                                    let selected_categeory =
                                      THIS.state.myarray && THIS.state.myarray.length > 0 &&
                                        THIS.state.myarray[itemid] &&
                                        THIS.state.myarray[itemid].category_id !=
                                        "" &&
                                        THIS.state.myarray[itemid].category_id !=
                                        0
                                        ? THIS.state.myarray[itemid].category_id
                                        : THIS.state.selected;
                                    return (
                                      <tr key={row} id={itemid}>
                                        <td> {itemid + 1} </td>
                                        <td style={{ display: 'none' }}>
                                          <input
                                            type="text"
                                            className="form-control min-w no-bg"
                                            name="item_name"
                                            autoComplete="off"
                                            id={`item${itemid}`}
                                            value='no-need'
                                            onInput={(event) =>
                                              THIS.handleChangeItems(
                                                event,
                                                THIS.state.rows.length - 1
                                              )
                                            }
                                            required
                                          />
                                        </td>

                                        <td>
                                          <textarea
                                            className="form-control min-w no-bg"
                                            style={{
                                              height: "auto",
                                              width: "auto",
                                            }}
                                            autoComplete="off"
                                            name="description"
                                            id={`descr${itemid}`}
                                            onInput={(event) =>
                                              THIS.handleChangeItems(
                                                event,
                                                THIS.state.rows.length - 1
                                              )
                                            }
                                          ></textarea>
                                        </td>

                                        <td>
                                          <input
                                            type="text"
                                            className="form-control no-bg"
                                            name="quantity"
                                            autoComplete="off"
                                            value={'1'}
                                            id={`quantity${itemid}`}
                                            onInput={(event) =>
                                              THIS.handleChangeItems(
                                                event,
                                                THIS.state.rows.length - 1
                                              )
                                            }
                                            required
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control no-bg"
                                            name="unit_price"
                                            autoComplete="off"
                                            id={`unit_price${itemid}`}
                                            onInput={(event) =>
                                              THIS.handleChangeItems(
                                                event,
                                                THIS.state.rows.length - 1
                                              )
                                            }
                                            required
                                          />
                                        </td>

                                        <td>

                                          {/* <select
                                            className="selectpicker form-control add-new"
                                            id="invoice_curr_id"
                                            data-live-search="true"
                                            title={`Choose`}
                                            // data-width="150%"
                                            onChange={(e) => {
                                              if (
                                                jQuery("#paid_status").val() ==
                                                "Partially paid--invoice"
                                              ) {
                                                alert(
                                                  "you cannot change currency to partially paid invoices"
                                                );
                                              } else {
                                                jQuery("#Exchange").val("");

                                                THIS.setState(
                                                  {
                                                    CurrentSelectedCurr: e.target.value,
                                                    duplicateVar: e.target.value,
                                                  },
                                                  () => {
                                                    THIS.handleChangeItems(
                                                      0,
                                                      THIS.state.rows.length - 1
                                                    );
                                                    setTimeout(() => {
                                                      THIS.setState(
                                                        {
                                                          cus_rate_rate: THIS.state
                                                            .exchange_value_ref,
                                                        },
                                                        () => {
                                                          THIS.handleChangeItems(
                                                            0,
                                                            THIS.state.rows.length - 1
                                                          );
                                                        }
                                                      );
                                                    }, 2000);
                                                  }
                                                );
                                              }
                                            }}
                                          >

                                            {THIS.state.gst_list &&
                                              THIS.state.gst_list.map((item) => {

                                                if (item.code !== "ALL") {
                                                  return <option value={item.name}> {item.sales_tax_name}</option>
                                                }
                                              })}

                                          </select> */}



                                          <div className="custom-select-drop dropdown tbl_drop_down cus">
                                            <a
                                              aria-expanded="false"
                                              aria-haspopup="true"
                                              role="button"
                                              data-toggle="dropdown"
                                              className="dropdown-toggle btn"
                                              href="javascript:;"
                                              value={THIS.state.selected}
                                              required
                                            >
                                              <span
                                                id={`selectednow${itemid}`}

                                              >
                                                {jQuery(
                                                  "#selectednow" + itemid
                                                ).val()}

                                              </span>

                                              <span
                                                id={`selectednow_id${itemid}`}
                                                style={{ display: "none" }}
                                              >
                                                NO_VALUE
                                              </span>
                                              <input
                                                type="hidden"
                                                id={`selectedrate${itemid}`}
                                              />
                                              <input
                                                type="hidden"
                                                id={`selectedtype_id${itemid}`}
                                              />
                                              <input
                                                type="hidden"
                                                id={`selectednow${itemid}`}
                                              />
                                              <input type='hidden'
                                                id={`chosen_gst${itemid}`}
                                              />

                                              <span className="caret"></span>
                                            </a>

                                            <ul
                                              className="dropdown-menu category"
                                              style={{
                                                height: 213,
                                                overflowY: "scroll",
                                                width: "auto",
                                                overflowX: "auto",
                                              }}
                                            >
                                              <li>
                                                <input
                                                  type="text"
                                                  name="search"
                                                  id="gst_search"
                                                  autoComplete="off"
                                                  className="form-control"
                                                  placeholder="Search"
                                                  onInput={(event) =>
                                                    THIS.update_search_keyword(
                                                      event
                                                    )
                                                  }
                                                  required
                                                />
                                                <button
                                                  type="button"
                                                  className="btn btn-rounded btn-blue"
                                                  data-toggle="modal"
                                                  data-target="#pop-modal-1"
                                                >
                                                  Add New
                                                  <img
                                                    className="arrow-icon"
                                                    src="../../images/right-arrow.svg"
                                                    alt="icon"
                                                  />
                                                </button>
                                              </li>
                                              <li>
                                                <ul className="list-unstyled">
                                                  {THIS.state.gst_list.map(
                                                    (item, index) => {
                                                      return (
                                                        <li
                                                          key={index}
                                                          onClick={(event) => {

                                                            jQuery(
                                                              "#chosen_gst" +
                                                              itemid
                                                            ).val('manual');

                                                            jQuery(
                                                              "#selectedrate" +
                                                              itemid
                                                            ).val(item.rate);
                                                            jQuery(
                                                              "#selectedtype_id" +
                                                              itemid
                                                            ).val(
                                                              item.rate_type
                                                            );
                                                            jQuery(
                                                              "#selectednow" +
                                                              itemid
                                                            ).val(
                                                              item.sales_tax_name
                                                            );

                                                            THIS.handleCheck_get_selected_tax(
                                                              itemid,
                                                              item.sales_tax_name,
                                                              item.rate,
                                                              item.rate_type
                                                            );
                                                          }}
                                                          data-name={
                                                            item.sales_tax_name
                                                          }
                                                          data-rate={item.rate}
                                                          data-type={
                                                            item.rate_type
                                                          }
                                                        >
                                                          <a
                                                            href="javascript:;"
                                                            value={item.name}
                                                          >
                                                            {
                                                              item.sales_tax_name
                                                            }
                                                          </a>
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                                </ul>
                                              </li>
                                            </ul>
                                          </div>


                                        </td>

                                        <td>
                                          <span
                                            type="text"
                                            className="form-control no-bg"
                                            name="sub_total"
                                            id={`subtotal${itemid}`}
                                            style={{
                                              textAlign: "end",
                                              backgroundColor: "none",
                                            }}
                                          >
                                            {/* {isNaN(myvalue) ? "" : myvalue} */}
                                            {/* {myvalue} */}
                                            {THIS.state.myarray && THIS.state.myarray.length > 0 && THIS.state.myarray[itemid] ? THIS.state.myarray[itemid].price : ''
                                            }                                          </span>
                                        </td>

                                        <td>

                                          {/* <select
                                            className="selectpicker form-control add-new"
                                            id="invoice_curr_id"
                                            data-live-search="true"
                                            title={`Choose`}
                                            // data-width="150%"
                                            onChange={(e) => {
                                              if (
                                                jQuery("#paid_status").val() ==
                                                "Partially paid--invoice"
                                              ) {
                                                alert(
                                                  "you cannot change currency to partially paid invoices"
                                                );
                                              } else {
                                                jQuery("#Exchange").val("");

                                                THIS.setState(
                                                  {
                                                    CurrentSelectedCurr: e.target.value,
                                                    duplicateVar: e.target.value,
                                                  },
                                                  () => {
                                                    THIS.handleChangeItems(
                                                      0,
                                                      THIS.state.rows.length - 1
                                                    );
                                                    setTimeout(() => {
                                                      THIS.setState(
                                                        {
                                                          cus_rate_rate: THIS.state
                                                            .exchange_value_ref,
                                                        },
                                                        () => {
                                                          THIS.handleChangeItems(
                                                            0,
                                                            THIS.state.rows.length - 1
                                                          );
                                                        }
                                                      );
                                                    }, 2000);
                                                  }
                                                );
                                              }
                                            }}
                                          >

                                            {THIS.state.default_category_list &&
                                              THIS.state.default_category_list.map((item) => {

                                                if (item.code !== "ALL") {
                                                  return <option value={item.name}> {item.name}</option>;
                                                }
                                              })}
                                          </select> */}


                                          <div className="custom-select-drop dropdown tbl_drop_down">
                                            <a
                                              aria-expanded="false"
                                              aria-haspopup="true"
                                              role="button"
                                              data-toggle="dropdown"
                                              className="dropdown-toggle btn"

                                              href="javascript:;"

                                              required
                                            >
                                              <span
                                                id={`catagory_name${itemid}`}
                                              >

                                              </span>
                                              <span
                                                id={`catagory_id${itemid}`}
                                                style={{ display: "none" }}
                                              >
                                                NO_VALUE
                                              </span>
                                              <input type='hidden'
                                                id={`chosen${itemid}`}
                                              />


                                              <span className="caret"></span>
                                            </a>
                                            <ul
                                              className="dropdown-menu category"
                                              style={{
                                                height: 213,
                                                overflow: "scroll",
                                                minWidth: "217%",
                                                left: -99,
                                              }}
                                            >
                                              <li>
                                                <input
                                                  type="text"
                                                  name="search"
                                                  id="_search_deff"
                                                  className="form-control category_srch"

                                                  placeholder="Search"
                                                  autoComplete="off"
                                                  onInput={(event) =>
                                                    THIS.defaultcategorylist_onchange(
                                                      event
                                                    )
                                                  }
                                                  required
                                                />
                                                <button
                                                  type="button"
                                                  className="btn btn-rounded btn-blue"
                                                  data-toggle="modal"
                                                  data-target="#pop-modal"
                                                >
                                                  Add New
                                                  <img
                                                    className="arrow-icon"
                                                    src="../../images/right-arrow.svg"
                                                    alt="icon"
                                                  />
                                                </button>
                                              </li>
                                              <li>
                                                <ul className="list-unstyled">
                                                  {THIS.state.default_category_list.map(
                                                    (item, index) => {
                                                      let myId = item.name;

                                                      return (
                                                        <li
                                                          key={index}
                                                          onClick={(e) => {
                                                            jQuery(
                                                              "#chosen" +
                                                              itemid
                                                            ).val('manual');


                                                            jQuery(
                                                              "#catagory_name" +
                                                              itemid
                                                            ).val(item.name);
                                                            jQuery(
                                                              "#catagory_id" +
                                                              itemid
                                                            ).val(item.id);
                                                            THIS.changetext1(
                                                              item.id,
                                                              itemid,
                                                              "catagory_id" +
                                                              itemid,
                                                              item.name
                                                            );
                                                          }}
                                                          name={item}
                                                        >
                                                          <a
                                                            href="javascript:;"
                                                            value={item.name}
                                                          >
                                                            {item.name}
                                                          </a>
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                                </ul>
                                              </li>
                                            </ul>
                                          </div>



                                        </td>

                                        {Array.isArray(
                                          THIS.state.number_of_columns_list
                                        ) &&
                                          THIS.state.number_of_columns_list !=
                                          undefined &&
                                          THIS.state.number_of_columns_list.map(
                                            (column, index) => {
                                              var colId = index;

                                              if (column.type == 2) {
                                                const optionsMap = column.options.map(
                                                  (item) => {
                                                    return (
                                                      <option value={item}>
                                                        {item}
                                                      </option>
                                                    );
                                                  }
                                                );

                                                if (column.is_visible == 1) {
                                                  return (
                                                    <td>
                                                      <select
                                                        className="selectpicker form-control add-new cus"
                                                        id={`addtext${colId}${itemid}`}
                                                        data-live-search="true"
                                                        title="Choose..."
                                                        onChange={(e) => {
                                                          const userId =
                                                            THIS.state
                                                              .logged_user_id;
                                                          const coulmnId = colId;
                                                          const isPopup =
                                                            e.target.value;
                                                          jQuery("#colid").val(
                                                            coulmnId
                                                          );
                                                          // alert(isPopup)
                                                          if (isPopup == "1e") {
                                                            jQuery(
                                                              "#customer_type option"
                                                            )
                                                              .prop(
                                                                "selected",
                                                                false
                                                              )
                                                              .trigger(
                                                                "change"
                                                              );

                                                            window
                                                              .jQuery(
                                                                "#add_new_role"
                                                              )
                                                              .modal("show");
                                                          }
                                                        }}
                                                      >
                                                        <option value="1e">
                                                          {" "}
                                                          Add New{" "}
                                                        </option>

                                                        {optionsMap}
                                                      </select>
                                                    </td>
                                                  );
                                                }
                                              }
                                              //do here text  field
                                              if (column.type == 1) {
                                                if (column.is_visible == 1) {
                                                  return (
                                                    <td className="text-center">
                                                      <input
                                                        type="text"
                                                        name="quantity"
                                                        className="form-control"
                                                        placeholder="Type..."
                                                        id={`addtext${colId}${itemid}`}
                                                        onInput={(event) =>
                                                          THIS.handleChangeItems(
                                                            event,
                                                            THIS.state.rows
                                                              .length - 1
                                                          )
                                                        }
                                                        required
                                                      />
                                                    </td>
                                                  );
                                                }
                                              }
                                            }
                                          )}

                                        <td>
                                          {" "}
                                          <a
                                            href="javascript:;"
                                            className="delete-icon"
                                            data-toggle="modal"
                                            data-target="#modal_delete"
                                            // onClick={() =>
                                            //   THIS.delete_Rows(itemid)
                                            // }
                                            onClick={() => {
                                              THIS.setState({
                                                specific_id_delete: itemid,
                                              });
                                            }}
                                          >
                                            <img
                                              className="img-responsive"
                                              src="../../images/delete-icon.svg"
                                              alt="icon"
                                            />
                                          </a>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                              <div>
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
                                              onClick={() => {
                                                const userId = Number(
                                                  THIS.state.logged_user_id
                                                );
                                                const coulmnId = Number(
                                                  jQuery("#colid").val()
                                                );
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
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="modal fade in"
                                  id="modal_delete"
                                  role="dialog"
                                  style={{ paddingLeft: 15 }}
                                >
                                  <div
                                    className="modal-dialog modal-md"
                                    style={{ width: 440 }}
                                  >
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
                                      <div className="modal-body text-center success-modal">
                                        <div className="pop-icon img-size">
                                          {
                                            <img
                                              src="../../images/delete-icon.svg"
                                              alt="icon"
                                            />
                                          }
                                        </div>

                                        <h3>Are you sure?</h3>

                                        <p className="fw-500">
                                          Selected item will be deleted.
                                        </p>
                                        <button
                                          className="btn btn-lightgray"
                                          data-dismiss="modal"
                                        >
                                          Cancel
                                        </button>
                                        <span>{"   "}</span>
                                        <button
                                          className="btn btn-red"
                                          type="button"
                                          onClick={this.delete_Rows}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <div style={{float:'right'}}><a
                              href='javascript:;'
                              className='add-col'
                              // id="btnAddCol"
                              onClick={() => THIS.add_coulmn()}
                            >
                              <img
                                src='../../images/plus-icon.svg'
                                alt='icon'
                              />
                            </a></div> */}
                              {/* <a
                              href='javascript:;'
                              className='add-col'
                              // id="btnAddCol"
                              onClick={() => THIS.add_coulmn()}
                            >
                              <img
                                src='../../images/plus-icon.svg'
                                alt='icon'
                              />
                            </a> */}
                              {/* <a href="javascript:;" className="add-col"><img src="../../images/plus-icon.svg" alt="icon"/></a> */}
                            </div>
                            {/* <a
                            href='javascript:;'
                            className='add-col'
                            // id="btnAddCol"
                            style={{ float: 'right' }}
                            data-toggle='modal'
                            data-target='#pop-modal-2'
                          >
                            <img src='../../images/plus-icon.svg' alt='icon' />
                          </a>
                      
                      
                       */}
                          </form>
                          <div className="form-group">
                            {" "}
                            {this.control_addButton()}
                            {this.state.isTable_notEmpty ? (
                              <div style={{ float: "left" }}>
                                <small style={{ color: "red" }}>
                                  *Please fill out all table fields.
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="form-group currency-label">
                            <span>
                              Foreign Currency({this.state.ToCurrency})
                            </span>
                            <span>
                              {" "}
                              Home Currency({
                                this.state.clientHomeCurrency
                              }){" "}
                            </span>
                          </div>




                          {/* for comma separation display none here and displayed below */}


                          <div className="form-group total-input" style={{ display: 'none' }}>
                            <label>Item Total</label>
                            <div>
                              <span
                                type="text"
                                name="item_total_foreign_currency"
                                className="form-control"
                                onChange={this.convertCurrency}
                                style={{ textAlign: "end" }}
                              >
                                {this.state.item_total_foreign_currency > 0
                                  ? this.state.item_total_foreign_currency
                                  : "0.00"}
                              </span>
                              <span
                                type="text"
                                name="item_total_home_currency"
                                id="item_total_home_currency"
                                className="form-control"
                                style={{ textAlign: "end" }}
                              >
                                {this.state.item_total_foreign_currency > 0
                                  ? this.state.item_total_home_currency
                                  : "0.00"}
                              </span>
                            </div>
                          </div>
                          <div className="form-group total-input" style={{ display: 'none' }}>
                            <label>Tax</label>
                            <div>
                              <span
                                type="text"
                                name="tax_amount_foreign_currency"
                                id="tax_amount_foreign_currency"
                                className="form-control"
                                style={{ textAlign: "end" }}
                              >
                                {this.state.item_total_foreign_currency > 0
                                  ? this.state.tax_amount_foreign_currency
                                  : "0.00"}
                              </span>
                              <span
                                type="text"
                                name="tax_amount_home_currency"
                                id="tax_amount_home_currency"
                                className="form-control"
                                onChange={this.convertCurrency}
                                style={{ textAlign: "end" }}
                              >
                                {this.state.item_total_foreign_currency > 0
                                  ? this.state.tax_amount_home_currency
                                  : "0.00"}
                              </span>
                            </div>
                          </div>

                          <div className="form-group total-input" style={{ display: 'none' }}>
                            <label>Grand Total</label>
                            <div>
                              <span
                                name="grand_total_foreign_currency"
                                className="form-control"
                                style={{ textAlign: "end" }}
                              >
                                {this.state.item_total_foreign_currency > 0
                                  ? this.state.grand_total_foreign_currency
                                  : "0.00"}
                              </span>
                              <span
                                name="grand_total_home_currency"
                                className="form-control"
                                style={{ textAlign: "end" }}
                                id="grand_total_home_currency"
                              // onChange={this.convertCurrency}
                              >
                                {Number(
                                  Number(
                                    isNaN(
                                      Number(
                                        this.state.item_total_home_currency
                                      )
                                    )
                                      ? 0.0
                                      : this.state.item_total_home_currency
                                  ) +
                                  Number(
                                    isNaN(
                                      Number(
                                        this.state.tax_amount_home_currency
                                      )
                                    )
                                      ? 0.0
                                      : this.state.tax_amount_home_currency
                                  )
                                ).toFixed(2)}
                              </span>
                            </div>
                          </div>



                          <div className="form-group total-input" >
                            <label>Item Total</label>
                            <div>
                              <span
                                type="text"
                                name="item_total_foreign_currency"
                                className="form-control"

                                style={{ textAlign: "end" }}
                              >
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(isNaN(this.state.item_total_foreign_currency) ? "0.00" : this.state.item_total_foreign_currency)).replace(this.state.home_currency_symbol, '')}

                              </span>
                              <span
                                type="text"
                                name="item_total_home_currency"
                                id="item_total_home_currency"
                                className="form-control"
                                style={{ textAlign: "end" }}
                              >

                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(isNaN(jQuery('#item_total_home_currency').html()) ? "0.00" : jQuery('#item_total_home_currency').html())).replace(this.state.home_currency_symbol, '')}

                              </span>
                            </div>
                          </div>
                          <div className="form-group total-input" >
                            <label>Tax</label>
                            <div>
                              <span
                                type="text"
                                name="tax_amount_foreign_currency"
                                id="tax_amount_foreign_currency"
                                className="form-control"
                                style={{ textAlign: "end" }}
                              >

                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(isNaN(jQuery('#tax_amount_foreign_currency').html()) ? "0.00" : jQuery('#tax_amount_foreign_currency').html())).replace(this.state.home_currency_symbol, '')}

                              </span>
                              <span
                                type="text"
                                name="tax_amount_home_currency"
                                id="tax_amount_home_currency"
                                className="form-control"
                                onChange={this.convertCurrency}
                                style={{ textAlign: "end" }}
                              >

                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(isNaN(jQuery('#tax_amount_home_currency').html()) ? "0.00" : jQuery('#tax_amount_home_currency').html())).replace(this.state.home_currency_symbol, '')}


                              </span>
                            </div>
                          </div>

                          <div className="form-group total-input" >
                            <label>Grand Total</label>
                            <div>
                              <span
                                name="grand_total_foreign_currency"
                                className="form-control"
                                style={{ textAlign: "end" }}
                              >

                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(isNaN(this.state.grand_total_foreign_currency) ? "0.00" : this.state.grand_total_foreign_currency)).replace(this.state.home_currency_symbol, '')}



                              </span>
                              <span
                                name="grand_total_home_currency"
                                className="form-control"
                                style={{ textAlign: "end" }}
                                id="grand_total_home_currency"
                              // onChange={this.convertCurrency}
                              >
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(isNaN(jQuery('#grand_total_home_currency').html()) ? "0.00" : jQuery('#grand_total_home_currency').html()).replace(this.state.home_currency_symbol, ''))}

                              </span>
                            </div>
                          </div>


                          {/* for comma separation display none here and displayed below */}

                          <div ref={this.myDivToFocus}></div>

                          <div className="form-group total-input">
                            <label>Accounts</label>
                            <div>

                              <span
                                className="form-control w-calc"
                              // style={{ textAlign: "end" }}
                              >
                                {this.state.account_id_name}
                              </span>
                              <span style={{ display: 'none' }}
                                className="form-control"
                              // style={{ textAlign: "end" }}
                              >
                                {this.state.account_id_name}
                              </span>


                              {/* <input
                                type="text"
                                disabled
                                clssName="form-control"
                                id="account_id"
                                name="account_id"
                                value={this.state.account_id_name}
                              /> */}




                              {/* <select
                                className="selectpicker form-control "
                                id="account_id"
                                name="account_id"
                                data-live-search="true"
                                title={`Choose`}
                                data-width="150%"
                                onChange={(e) => {}}
                                disabled={true}
                              >
                                {this.state.SubAccountList != undefined &&
                                  this.state.SubAccountList.map(
                                    (item, index) => {
                                      return (
                                        // <li
                                        //   key={index}
                                        //   id={index}
                                        //   onClick={() =>
                                        //     this.apply_template_format(
                                        //       index,
                                        //       this.state.response.list[
                                        //         index
                                        //       ].template_name.slice(0, 20),
                                        //       this.state.response.list[index]
                                        //         .html_content
                                        //     )
                                        //   }
                                        // >
                                        //   <a href='javascript:;'>
                                        //     {
                                        //       this.state.response.list[index]
                                        //         .template_name
                                        //     }
                                        //   </a>
                                        // </li>

                                        <option value={item.id} data-status ={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </select> */}

                              {/* <div className='custom-select-drop dropdown'>
                              <a
                                aria-expanded='false'
                                aria-haspopup='true'
                                role='button'
                                data-toggle='dropdown'
                                className='dropdown-toggle btn'
                                href='javascript:;'
                                value={this.state.selected}
                                required
                              >
                                <span id='selected'>
                                  {this.state.balance_sheet_category_name != ''
                                    ? this.state.balance_sheet_category_name
                                    : 'Choose'}{' '}
                                </span>
                                <span className='caret'></span>
                              </a>
                              <ul
                                className='dropdown-menu category'
                                style={{
                                  height: 213,
                                  overflow: 'scroll',
                                  width: 'auto'
                                }}
                              >
                                <li>
                                  <input
                                    type='text'
                                    name='search'
                                    className='form-control customInput_width'
                                    placeholder='Search'
                                    style={{ width: '100%' }}
                                    autoComplete='off'
                                    onInput={event =>
                                      THIS.onChange_filter_balancesheet(event)
                                    }
                                    required
                                  />
                                  <button
                                    type='button'
                                    className='btn btn-rounded btn-blue'
                                    data-toggle='modal'
                                    data-target='#pop-modal'
                                  >
                                    Add New
                                    <img
                                      className='arrow-icon'
                                      src='../../images/right-arrow.svg'
                                      alt='icon'
                                    />
                                  </button>
                                </li>
                                <li>
                                  <ul className='list-unstyled'>
                                    {THIS.state.balancesheetlist.map(
                                      (item, index) => {
                                        if(item.account_type_id==5)
                                        {
                                        return (
                                          <li
                                            key={index}
                                            onClick={this.handleCheck_balanceSheet_id.bind(
                                              this
                                            )}
                                            data-namee={item.name}
                                            data-id={item.id}
                                            name={item}
                                          >
                                            <a
                                              href='javascript:;'
                                              value={item.name}
                                            >
                                              {item.name}
                                            </a>
                                          </li>
                                        )
                                      }
                                      }
                                    )}
                                  </ul>
                                </li>
                              </ul>
                            </div>

                         
                          */}
                            </div>
                          </div>
                          {this.state.isClose ? (
                            <div
                              className="alert alert-card success alert-dismissible fade in"
                              id="closeme"
                            >
                              <a
                                href="#"
                                className="close"
                                data-dismiss="alert"
                                aria-label="close"
                              >
                                &times;
                              </a>
                              <div className="img-wrap">
                                <img
                                  className="img-responsive"
                                  src="../../images/alert-success.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="alert-cont">
                                <strong className="title">Success!</strong>
                                Tagged items saved successfully.
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {this.state.isClose1 ? (
                            <div
                              className="alert alert-card success alert-dismissible fade hide"
                              id="closeme1"
                            >
                              <a
                                href="#"
                                className="close"
                                data-dismiss="alert"
                                aria-label="close"
                              >
                                &times;
                              </a>
                              <div className="img-wrap">
                                <img
                                  className="img-responsive"
                                  src="../../images/alert-success.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="alert-cont">
                                <strong className="title">Success!</strong>
                                Tagged items saved in Draft successfully.
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="form-group exchange-rate">
                            <label>
                              Exchange Rate 1 {this.state.ToCurrency}
                            </label>
                            <div>
                              <input
                                type="text"
                                name="inv-no"
                                className="form-control"
                                id="Exchange"
                                autoComplete="off"
                                placeholder={
                                  this.state.cus_rate_rate.length > 0
                                    ? this.state.cus_rate_rate
                                    : this.state.exchange_value
                                }
                                // defaultValue={this.state.exchange_value_ref}

                                onChange={(e) => {
                                  if (e.target.value.length > 0) {
                                    // alert(e.target.value)
                                    this.setState(
                                      {
                                        cus_rate_rate: e.target.value,
                                      },
                                      () => {
                                        this.handleChangeItems(
                                          0,
                                          this.state.rows.length - 1
                                        );
                                      }
                                    );
                                  } else {
                                    this.setState(
                                      {
                                        cus_rate_rate: this.state
                                          .exchange_value,
                                      },
                                      () => {
                                        this.handleChangeItems(
                                          0,
                                          this.state.rows.length - 1
                                        );
                                      }
                                    );
                                  }
                                }}
                              />
                              {/* <span
                                type="text"
                                name="exchangeRate"
                                className="form-control"
                              >
                                {this.state.exchange_value}
                              </span> */}
                              <span className="label">
                                {this.state.clientHomeCurrency}
                              </span>
                            </div>
                          </div>
                          {this.state.editData && (
                            <div className="row">
                              <div className="form-group exchange-col col-md-5 col-xs-12"></div>
                              <div className="form-group col-md-7 col-xs-12 total-table">
                                <table className="pull-right">
                                  <thead
                                  // style={{ visibility: "hidden" }}
                                  >
                                    <tr>
                                      <th>&nbsp;</th>
                                      <th className="text-center">
                                        Amount Paid
                                        <br />
                                        {/* ({this.state.currency_customer}) */}
                                        ({this.state.ToCurrency})
                                      </th>
                                      <th className="text-center">
                                        Home Currency
                                        <br />({this.state.clientHomeCurrency})
                                      </th>
                                    </tr>
                                  </thead>



                                  <tbody style={{ display: 'none' }}>
                                    <tr style={{ background: "#fff" }}>
                                      <td className="text-right">
                                        {" "}
                                        Amount Paid
                                      </td>

                                      <td
                                        id="appliedfor"
                                        className="text-center"
                                        style={{ textDecorationColor: "#0000ff", textDecoration: "underline", color: "#0000ff" }} data-toggle="modal" data-target="#table_items"
                                      >
                                        {/* <input className='form-control' disabled={true} style={{width:100}} /> */}
                                        {this.state.appliedfor}
                                      </td>
                                      <td
                                        // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }
                                        id="appliedhom"
                                        className="text-center"
                                        style={{ textDecorationColor: "#0000ff", textDecoration: "underline", color: "#0000ff" }}
                                        data-toggle="modal" data-target="#table_items"
                                      >
                                        {/* <input className='form-control' disabled={true} style={{width:100}}  id='appliedhom'/> */}
                                        {this.state.appliedhom}
                                      </td>
                                    </tr>

                                    <tr style={{ background: "#fff" }}>
                                      <td className="text-right">
                                        {" "}
                                        Exchange Gain/Loss
                                      </td>

                                      <td className="text-center">
                                        {/* <input className='form-control' disabled={true} style={{width:100}} /> */}
                                      </td>
                                      <td
                                        // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }
                                        id="exchangeGain"
                                        className="text-center"
                                      >
                                        {/* <input className='form-control' disabled={true} style={{width:100}}  id='appliedhom'/> */}
                                        {this.state.exchangeGain}
                                      </td>
                                    </tr>

                                    <tr style={{ background: "#fff" }}>
                                      <td className="text-right">
                                        Balance Due
                                      </td>

                                      <td
                                        id="forbaldue"
                                        className="text-center"
                                      >
                                        {/* <input className='form-control' disabled={true} style={{width:100}} /> */}
                                        {this.state.forbaldue}
                                      </td>
                                      <td
                                        id="homebaldue"
                                        className="text-center"
                                      >
                                        {/* <input className='form-control' disabled={true} style={{width:100}} /> */}
                                        {this.state.homebaldue}
                                      </td>
                                    </tr>
                                  </tbody>


                                  {/* for comma separation display none here and displayed below */}


                                  <tbody >
                                    <tr style={{ background: "#fff" }}>
                                      <td className="text-right">
                                        {" "}
                                        Amount Paid
                                      </td>

                                      <td
                                        className="text-center"
                                        style={{ textDecorationColor: "#0000ff", textDecoration: "underline", color: "#0000ff" }} data-toggle="modal" data-target="#table_items"
                                      >
                                        <Comma value={jQuery('#appliedfor').html()} />
                                      </td>
                                      <td
                                        className="text-center"
                                        style={{ textDecorationColor: "#0000ff", textDecoration: "underline", color: "#0000ff" }}
                                        data-toggle="modal" data-target="#table_items"
                                      >
                                        <Comma value={jQuery('#appliedhom').html()} />
                                      </td>
                                    </tr>

                                    <tr style={{ background: "#fff" }}>
                                      <td className="text-right">
                                        {" "}
                                        Exchange Gain/Loss
                                      </td>

                                      <td className="text-center">
                                      </td>
                                      <td
                                        className="text-center"
                                      >
                                        <Comma value={jQuery('#exchangeGain').html()} />
                                      </td>
                                    </tr>

                                    <tr style={{ background: "#fff" }}>
                                      <td className="text-right">
                                        Balance Due
                                      </td>

                                      <td
                                        className="text-center"
                                      >
                                        <Comma value={jQuery('#forbaldue').html()} />
                                      </td>
                                      <td
                                        className="text-center"
                                      >
                                        <Comma value={jQuery('#homebaldue').html()} />
                                      </td>
                                    </tr>
                                  </tbody>

                                  {/* for comma separation display none here and displayed below */}


                                </table>
                              </div>
                            </div>
                          )}
                          <div className="col-md-12 data-feed-btm">
                            <div className="row">
                              <div
                                class="form-group col-md-4"
                                id="footeroptionthanksmessagestatus"
                              >
                                <label> Amount </label>
                                <input
                                  type="text"
                                  name="payment_amount"
                                  class="form-control"
                                  id="payment_amount"
                                  required=""
                                  placeholder="amount"
                                  onChange={(event) => this.handleChange(event)}
                                />
                              </div>

                              <div
                                class="form-group col-md-4"
                                id="footeroptionthanksmessagestatus"
                              >
                                <label> Payment method </label>
                                <select
                                  className="selectpicker form-control add-new"
                                  data-live-search="true"
                                  title="Choose payment method"
                                  id="payment_method"
                                  onChange={(e) => {
                                    if (e.target.value == "1qw") {
                                      window
                                        .jQuery("#add_new_payment")
                                        .modal("show");
                                      jQuery("#payment_method option")
                                        .prop("selected", false)
                                        .trigger("change");
                                    }
                                  }}
                                >
                                  <option value="1qw">Add new</option>
                                  {this.state.payment_method_list &&
                                    this.state.payment_method_list.map(
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

                                {/* <select
                        className='selectpicker form-control'
                        data-live-search='true'
                        title='Choose payment method'
                       name='payment_method'
                       value={this.state.payment_method}
                        onChange={event => this.handleSelect(event)}
                      >
                        {this.state.payment_method_list.length > 0 &&
                          this.state.payment_method_list.map(item => {
                             return (
                               <option key={item.id} value={item.id}> 
                                {item.name}
                              </option>
                            )
                          })}
                      </select>
                               */}
                              </div>

                              <div className="form-group col-md-4">
                                <label>Payment Date</label>
                                <div className="input-group date mar-t-no">
                                  <input
                                    type="text"
                                    autoComplete="off"
                                    name="incorport_date"
                                    id="fromdate"
                                    onBlur={(e) => {
                                      let value = e.target.value
                                      setTimeout(() => {
                                        this.changeDate(value)
                                      }, 500);
                                    }
                                    }
                                    className="form-control"
                                  />
                                  <div
                                    className="input-group-addon"
                                    style={{ border: "none", background: "#f5f5f5" }}
                                  >
                                    <img
                                      src="/images/calendar-icon.svg"
                                      alt="icon"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div
                                class="form-group col-md-4"
                                id="footeroptionthanksmessagestatus"
                              >
                                <label>
                                  Payment Exchange rate 1{" "}
                                  {this.state.ToCurrency}
                                </label>
                                <input
                                  type="text"
                                  name="exchangeRate"
                                  class="form-control"
                                  id="paymentexchangerate"
                                  placeholder={Number(
                                    this.state.exchange_value
                                  )}
                                  autocomplete="off"
                                  onChange={(e) => {
                                    if (e.target.value.length > 0) {
                                      // alert(e.target.value)
                                      this.setState(
                                        {
                                          payment_exchange_rate: e.target.value,
                                        },
                                        () => {
                                          this.handleChangeItems(
                                            0,
                                            this.state.rows.length - 1
                                          );
                                        }
                                      );
                                    } else {
                                      this.setState(
                                        {
                                          payment_exchange_rate: this.state
                                            .exchange_value,
                                        },
                                        () => {
                                          this.handleChangeItems(
                                            0,
                                            this.state.rows.length - 1
                                          );
                                        }
                                      );
                                    }
                                  }}
                                />
                              </div>

                              {/* <div class="form-group col-md-4" id="footeroptionthanksmessagestatus">
                          <label> Payment Date </label>
                          <DatePicker
                            
                           value={this.state.paymentdate}
                           onChange={this.handleChangetime}
                            className='form-control'
                             
                             
                             
                            style={{ paddingLeft: 30 }}
                            format='dd-MM-yyyy'
                             
                            //placeholder='dd-mm-yyyy'
                          />
                              
                          </div> */}
                              <div
                                class="form-group col-md-4"
                                id="footeroptionthanksmessagestatus"
                              >
                                <label> Reference </label>
                                <input
                                  type="text"
                                  name="reference"
                                  class="form-control"
                                  id="reference"
                                  required=""
                                  placeholder="reference"
                                  onChange={(event) => this.handleChange(event)}
                                />
                              </div>
                              <div
                                class="form-group col-md-4"
                                id="footeroptionthanksmessagestatus"
                              >
                                <label> Description </label>
                                <input
                                  type="text"
                                  name="payment_desc"
                                  class="form-control"
                                  id="description"
                                  required=""
                                  placeholder="description"
                                  onChange={(event) => this.handleChange(event)}
                                />
                              </div>
                            </div>
                            <div className="row">

                              <div
                                class="form-group col-md-4"
                                id="footeroptionthanksmessagestatus"
                              >
                                <label> Payment Account </label>
                                <select
                                  className="selectpicker form-control add-new"
                                  data-live-search="true"
                                  title="Choose "
                                  id="balanceSheetCategeory"
                                  onChange={(e) => {
                                    // alert(e.target.value);
                                    this.setState({
                                      balanceSheetCategeory: e.target.value,
                                    });
                                    if (e.target.value == "1e") {
                                      jQuery("#balanceSheetCategeory option")
                                        .prop("selected", false)
                                        .trigger("change");
                                      jQuery("#balanceSheetCategeory").val("");
                                      window.jQuery("#pop-modal").modal("show");
                                    } else {
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
                                            if (Payable || Receivable) {
                                              this.setState({
                                                isThirdPartyName: true,
                                              });
                                              if (Payable) {
                                                this.setState(
                                                  { third_party_type: 2 },
                                                  this.fetchThirdPartyNames(5)
                                                );
                                              }
                                              if (Receivable) {
                                                this.setState(
                                                  { third_party_type: 1 },
                                                  this.fetchThirdPartyNames(2)
                                                );
                                              }
                                            } else {
                                              this.setState({
                                                isThirdPartyName: false,
                                              });
                                            }
                                          }
                                        }
                                      );
                                      //  const matchedList= this.state.balancesheetlist.filter(item=>item[e.target.value]==e.target.value)
                                    }
                                  }}
                                >
                                  <option value="1e"> Add New </option>
                                  {this.state.balancesheetlist &&
                                    this.state.balancesheetlist.map((item) => {
                                      return (
                                        <option
                                          value={item.id}
                                          data-status={item.id}
                                        >
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                </select>

                                {/* <select
                        className='selectpicker form-control'
                        data-live-search='true'
                        title='Choose payment method'
                       name='payment_method'
                       id='payment_accountid'
                      // value={this.state.payment_method}
                       onChange={e => {
                        this.third_party_account_list(e.target.value)
                      }}
                      >
                       <option>Add new</option>
                            {this.state.vendor_payment_account_type &&
                              this.state.vendor_payment_account_type.map(
                                item => {
                                  return (
                                    <option value={item.id}>{item.name}</option>
                                  )
                                }
                              )}
                      </select>
                               */}
                              </div>

                              {this.state.isThirdPartyName && (

                                <div className="form-group col-md-4">
                                  <label>Third Party Account Name</label>
                                  <select
                                    className="selectpicker form-control add-new"
                                    data-live-search="true"
                                    title="Choose..."
                                    id="third_account_id"
                                    value={this.state.third_party_id}
                                    onChange={(e) =>
                                      this.setState({
                                        third_party_id: e.target.value,
                                      })
                                    }
                                  >
                                    {/* <option>Create New </option> */}
                                    <option>choose...</option>
                                    {this.state.third_party_account_list &&
                                      this.state.third_party_account_list.map(
                                        (item) => {
                                          return (
                                            <option value={item.id}>
                                              {item.name}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                  {/* {this.state.isPayable_amount ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Required.
                            </small>
                          </div>
                        ) : (
                          ''
                        )} */}
                                </div>

                              )}

                            </div>
                            <div className="row">
                              <div
                                class="form-group col-md-12"
                                id="footeroptionthanksmessagestatus"
                              >
                                <label> Amount in words </label>
                                <textarea
                                  type="text"
                                  name="amount_in_words"
                                  class="form-control"
                                  id="amount_in_words"
                                  required=""
                                  placeholder="reference"
                                  onChange={(event) => this.handleChange(event)}
                                  value={toWords.convert(
                                    Number(this.state.grand_total_home_currency)
                                  )}
                                />
                              </div>


                              {/* {this.state.isThirdpartyEssenstial && (
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Third Party Account Name</label>
                            <select
                              className='selectpicker form-control add-new'
                              data-live-search='true'
                              title='Choose...'
                              id='third_account_id'
                            >
                              <option>Create New </option>
                              {this.state.third_party_account_list &&
                                this.state.third_party_account_list.map(
                                  item => {
                                    return (
                                      <option
                                        value={item.id}
                                        data-status={item.id}
                                      >
                                        {item.name}
                                      </option>
                                    )
                                  }
                                )}
                            </select>
                          </div>
                        )} */}
                            </div>

                            {/* <div className='row'>
            <div class="form-group col-md-4" id="footeroptionthanksmessagestatus">
                          <label> Payment Account </label>
                          <select
                        className='selectpicker form-control'
                        data-live-search='true'
                        title='Choose payment method'
                       name='payment_method'
                       id='payment_accountid'
                      // value={this.state.payment_method}
                       onChange={e => {
                        this.third_party_account_list(e.target.value)
                      }}
                      >
                       <option>Add new</option>
                            {this.state.vendor_payment_account_type &&
                              this.state.vendor_payment_account_type.map(
                                item => {
                                  return (
                                    <option value={item.id}>{item.name}</option>
                                  )
                                }
                              )}
                      </select>
                              
                          </div>
                          {this.state.isThirdpartyEssenstial && (
                          <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                            <label>Third Party Account Name</label>
                            <select
                              className='selectpicker form-control add-new'
                              data-live-search='true'
                              title='Choose...'
                              id='third_account_id'
                            >
                              <option>Create New </option>
                              {this.state.third_party_account_list &&
                                this.state.third_party_account_list.map(
                                  item => {
                                    return (
                                      <option
                                        value={item.id}
                                        data-status={item.id}
                                      >
                                        {item.name}
                                      </option>
                                    )
                                  }
                                )}
                            </select>
                          </div>
                        )}


            </div>
                          */}
                          </div>

                          <div className="form-group total-input text-right">
                            {/* {this.state.isAdd ? (
                            <div style={{ float: 'left' }}>
                              <small style={{ color: 'red' }}>
                                *Please fill out all the fields.
                              </small>
                            </div>
                          ) : (
                            ''
                          )} */}

                            <div
                              className="modal fade pop-modal"
                              id="add_new_payment"
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
                                    <h3>Add Payment </h3>
                                    <form className="custom-form row">
                                      <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                        <div className="col-md-4 col-sm-4 col-xs-12">
                                          <label>Name</label>
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-xs-12">
                                          <input
                                            autoComplete="off"
                                            type="text"
                                            className="form-control"
                                            id="pay"
                                          />
                                          <div style={{ float: "left" }}>
                                            {this.state.roleStringLen && (
                                              <small style={{ color: "red" }}>
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
                                          onClick={() => {
                                            if (
                                              jQuery("#pay").val() != "" &&
                                              jQuery("#pay").val() != undefined
                                            ) {
                                              var coreData = {
                                                name: jQuery("#pay").val(),
                                              };

                                              FetchAllApi.create_paymenttype(
                                                coreData,
                                                (err, response) => {

                                                  // alert(response.message)
                                                  if (response.status === 1) {
                                                    this.getPaymethod();
                                                    jQuery("#pay").val("");
                                                    window
                                                      .jQuery(
                                                        "#add_new_payment"
                                                      )
                                                      .modal("hide");
                                                    //   this.setState({ items: response.list[0].columns })
                                                  } else {
                                                  }
                                                }
                                              );
                                            } else {
                                              alert("Please fill out....");
                                            }

                                            // FetchAllApi.invoiceadd_dropdown_options(
                                            //   userId,
                                            //   coulmnId,
                                            //   optionsArray,
                                            //   (err, response) => {

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
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="submit-enclose">

                              {(this.state.comingFrom == 'Accountant Inbox' ||
                                this.state.comingFrom == 'Inbox' ||
                                this.state.comingFrom == 'Sent Items') && this.state.processed == "Not Processed" &&

                                <button onClick={() => this.change_attachment_to_void()}
                                  className="btn btn-danger"
                                  type="button"

                                >
                                  Make void
                                </button>}

                              {/* <button
                                className="btn btn-gray"
                                type="button"
                                data-toggle="modal"
                                data-target="#successModal"
                              >
                                Clear
                              </button> */}
                              <span> </span>
                              {/* <button
                                className="btn btn-yellow"
                                type="submit"
                                onClick={this.save_draft}
                              >
                                Save Draft
                              </button> */}
                              <span> </span>

                              <button
                                className="btn btn-green"
                                type="submit"
                                onClick={() => {
                                  if (this.state.bill_to_credit) {
                                    this.saveAndContinue_bill_to_credit()
                                  } else {
                                    if (this.state.template_type == "1") {
                                      this.saveAndContinue();
                                    } else {
                                      this.saveAndContinue2();
                                    }
                                  }


                                  // this.saveAndContinue
                                }}
                              >
                                Save & Continue
                              </button>
                            </div>
                            <div
                              className="modal fade in"
                              id="successModal"
                              role="dialog"
                              style={{ paddingLeft: 15 }}
                            >
                              <div
                                className="modal-dialog modal-md"
                                style={{ width: 440 }}
                              >
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
                                  <div className="modal-body text-center success-modal">
                                    <div className="pop-icon">
                                      {/* <img src="../../images/template-success-icon.png" alt="icon"/> */}
                                    </div>
                                    <h3>Are you sure?</h3>

                                    <p className="fw-500">
                                      Your all tagged items will be cleared
                                    </p>
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
                                      onClick={this.clear_tagged_items}
                                    >
                                      OK
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade pop-modal" id="table_items" role="dialog">
            <div className="modal-dialog modal-md custom-modal">
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
                  <h3>Payment Details</h3>
                  <form className="custom-form row">
                    <div className="form-group col-md-12 col-xs-12 pad-no ">
                      <table className="table detail-report">
                        <thead>
                          <tr>
                            <th className="text-left">
                              Type
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Date
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th className="text-right">
                              Foreign currency
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th className="text-right">
                              Home currency
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          {this.state.payement_table && this.state.payement_table.length > 0 ?
                            this.state.payement_table.map((pay, idx) => {
                              return (
                                <tr>
                                  <td className="text-left-imp" onClick={() => {
                                    if (pay.payment_type == "SinglePayment") {
                                      let arr = [
                                        "Bill payment",
                                        pay.invoice_id,
                                        pay.id,
                                      ];

                                      localStorage.setItem(
                                        "vendor_bill",
                                        JSON.stringify(arr)
                                      );

                                      // alert(e1.payment_id)
                                      // this.props.history.push('/data_tagging/' + e1.list_id + '/' + e1.file_id)
                                      var win = window.open(
                                        "/data_tagging/" +
                                        this.state.list_id +
                                        "/" +
                                        // this.state.file_id,
                                        this.state.present_file_id,
                                        "_blank"
                                      );
                                      win.focus();
                                    } else {

                                      let arr = [
                                        pay.vendor_id,
                                        pay.multi_payment_applied_invoices,
                                      ];

                                      localStorage.setItem(
                                        "edit_customer_receive_payment",
                                        JSON.stringify(arr)
                                      );
                                      var win = window.open('/vendor_bill_payment', "_blank");
                                      win.focus();
                                    }
                                  }
                                  }><a>{pay.payment_type}</a></td>
                                  <td>{moment(pay.payment_date, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                  <td className="text-right"><Comma value={pay.amount} /></td>
                                  <td className="text-right"><Comma value={pay.total_payment_home_currency} /></td>

                                </tr>)
                            })
                            : ""
                          }

                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <Footer
            defaultcategorylist_onchange={this.defaultcategorylist_onchang}
            logoutSubmit={(e) => this.logoutLink()}
          />
        </div >
      );
    } else {
      return (
        <CoulmnRearrage createInvoice={"2"} changeState={this.changeState} />
      );
    }
  }
}
export default data_tagging;
