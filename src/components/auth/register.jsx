import React, { Fragment } from "react";
import './strengthMeter.css';
import jQuery from "jquery";
// import DatePicker from "react-datepicker";
import FetchAllApi from '../../api_links/fetch_all_api';
import moment from "moment";


//import "react-datepicker/dist/react-datepicker.css";


export default class register extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      fname: "", lname: "", country_region: "", state_province: "", email_id: "", phone_no: "", password: "", cpassword: "",
      entity_name: "", entity_num: "", incorport_date: "", principle_activities: "", home_currency: "", company_phn: "", company_email: "", comp_address: "", entity_type_list: [], stateSelected: "", startDate: "", selectedDate: "", succ_msg: "", today_date: '', end_date: '', country_list: [], country_list_length: 0, state_list: [], dialing_code: "",
      currencies: [], rows: ['row1'], row: ['row1'], initial_value: 0, initial_values: 0, phone_code_string: '', phone_arr: [], email_arr: [], password_strength: 0,

      isentity_name: false,
      isentity_num: false,
      isincorport_date: false,
      ishome_currency: false,
      isprinciple_activities: false,
      iscompany_phn: false,
      iscompany_email: false,
      iscomp_address: false,
      isentity_type: false,
      loading: true,

      hide: false,
      logged_user_email: localStorage.getItem("logged_user_email"),

    };

  }




  checkSubmit = (e) => {
    e.preventDefault();
    if (this.props.location.state === true) {


    var entity_name = this.state.entity_name;
    var entity_num = this.state.entity_num;
    var incorport_date = this.state.incorport_date;
    // var incorport_date = moment(jQuery('#fromdate').value).format('YYYY-MM-DD')
    var home_currency = this.state.home_currency;
    var principle_activities = this.state.principle_activities;
    var company_phn = this.state.phone_arr;
    var company_email = this.state.email_arr;
    var comp_address = this.state.comp_address;
    var entity_type = jQuery("#entity_type").val();

      if (entity_name !== "" && entity_num !== "" && incorport_date !== "" && home_currency !== "" && principle_activities !== "" && company_phn !== "" && company_email !== "" && comp_address !== "" && entity_type !== "") {
        let input ={
          entity_name : this.state.entity_name  ,
          entity_number : this.state.entity_num ,
          incorporation_date : this.state.incorport_date ,
          home_currency : this.state.home_currency ,
          principle_activities : this.state.principle_activities ,
          company_phone : this.state.phone_arr ,
           company_email : this.state.email_arr ,
           address : this.state.comp_address ,
           entity_type : jQuery("#entity_type").val() ,
           country_code : '91' ,
           plan_id : 1 ,
           subscription_start_date : this.state.today_date ,
           subscription_end_date : this.state.end_date ,
           email:this.state.logged_user_email
        }
        FetchAllApi.register_company_with_existing_user(input, (err, response) => {
          if (response.status === 1) {
           alert(response.message)
           this.props.history.push("/client_selection");
          }else {
            alert(response.message)
          }
        })
      }else{
        alert('please fill all the fields')
      }
    } else {
      this.regFunc_2()
    }
  }

  check_user_email = () => {
    let input = { email_id: this.state.email_id }
    FetchAllApi.check_user_email(input, (err, response) => {
      if (response.status === 1) {
        this.regFunc()
      } else if (response.status === 2) {
        alert('This E-mail id already exist.So, please log-in to your email id and credentials and create a company')
        this.props.history.push('/')
      } else {
        alert(response.message)
      }
    })
  }


  changeDate(fromdate) {
    let date = jQuery('#fromdate').val()
    console.log("icop", date)
    if (date != undefined && date != '' && date != null) {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      this.setState({ incorport_date: date_formated })
    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }

  handlePhone = e => {
    // var length= this.state.rows.length
    var resultArray = []
    console.log('roeee', this.state.phone_arr)

    this.setState({ phone_arr: resultArray })
    var rowlength = this.state.rows.length
    console.log('roe', rowlength)
    for (var i = 0; i < rowlength; i++) {
      var shippingName = jQuery('#itemA' + i).val()

      if (shippingName != undefined) {
        var current_item = { phone_number: shippingName }
      }

      console.log('shippingobj', current_item)
      if (current_item != undefined) {
        resultArray.push(current_item)
      }
    }
  }

  handleEmail = e => {
    // var length= this.state.rows.length
    var resultArray = []
    console.log('roeeeq', this.state.email_arr)

    this.setState({ email_arr: resultArray })
    var rowlength = this.state.row.length
    console.log('roe', rowlength)
    for (var i = 0; i < rowlength; i++) {
      var email_address = jQuery('#itemB' + i).val()

      if (email_address != undefined) {
        var current_item = { email_address: email_address }
      }

      console.log('shippingobj', current_item)
      if (current_item != undefined) {
        resultArray.push(current_item)
      }
    }
  }


  //1
  get_currencies = () => {
    FetchAllApi.currencies((err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ currencies: response.lists })
      } else {
        this.setState({ currencies: [] })
      }
    })
  }

  //2

  addNewPhone = () => {
    var newrows = this.state.rows

    this.setState({ initial_value: this.state.initial_value + 1 })
    newrows.push('row' + (this.state.initial_value + 1))

    this.setState({ rows: newrows })
  }

  //3
  deletePhone = (id) => {
    var specific_item = id
    var newrows = this.state.rows

    if (this.state.rows.length > 1) {
      if (specific_item > -1) {
        newrows.splice(specific_item, 1)
      }

      this.setState(
        { rows: newrows }, () => { this.handlePhone() })
    }
  }

  //3
  addNewEmail = () => {
    var newrow = this.state.row

    this.setState({ initial_values: this.state.initial_values + 1 })
    newrow.push('row' + (this.state.initial_values + 1))

    this.setState({ row: newrow })
  }

  //3
  deleteEmail = (id) => {
    var specific_item = id
    var newrow = this.state.row

    if (this.state.row.length > 1) {
      if (specific_item > -1) {
        newrow.splice(specific_item, 1)
      }

      this.setState(
        { row: newrow }, () => { this.handleEmail() })
    }
  }

  UNSAFE_componentWillMount() {

    this.get_entity_list();

    FetchAllApi.get_countries((err, response) => {
      //alert(response)
      console.log("get_countries_list", response.list.length);
      if (response.status === 1) {
        this.setState({
          country_list: response.list,
          country_list_length: response.list.length
        })
      }
    });

  }



  get_entity_list = () => {
    FetchAllApi.get_entity_types((err, response) => {
      //alert(response)
      console.log("entity_type_list", response);
      if (response.status === 1) {
        this.setState({
          entity_type_list: response.list
        })
      } else {

      }
    });
  }


  componentDidUpdate() {
    window.jQuery('.selectpicker').selectpicker('refresh')
  }
  componentDidMount() {

    if (this.props.location.state === true) {
      jQuery(".form-step1").hide();
      jQuery(".form-step2").show();
      jQuery(".regBack").show();
    }

    // jQuery('#add_new_entity').modal('show')
    // window.jQuery('#add_new_entity').modal('show')

    this.get_currencies()

    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });//DidUpdate




    //GET Today Date
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    var today_date = yyyy + '-' + mm + '-' + dd;

    var cur_end_date = new Date();
    cur_end_date.setMonth(cur_end_date.getMonth() + 1);
    var dd = cur_end_date.getDate();
    var mm = cur_end_date.getMonth() + 1; //January is 0!
    var yyyy = cur_end_date.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    var end_date = yyyy + '-' + mm + '-' + (dd);
    document.getElementById("fromdate").setAttribute("max", today_date);

    this.setState({
      today_date: today_date,
      end_date: end_date
    })

    // jQuery(".form-step1").hide();
    // jQuery(".form-step2").show();
    // jQuery("a.back").show();

    jQuery("a.back").click(function () {
      jQuery(".form-step2").hide();
      jQuery(".form-step1").show();
      jQuery(this).hide();
    });
    //    this. fnameValidate();
    var THIS = this;

    jQuery("#country_region").change(function () {
      var selectedItem = jQuery(this).val();
      var country_id = jQuery(this).find(':selected').data('id');
      var phone_code = jQuery(this).find(':selected').data('dialing-code')
      if (phone_code !== '') {
        var phone_code_string = phone_code.toString()
        THIS.setState({ country_region: selectedItem, dialing_code: phone_code, phone_code_string: phone_code_string });

        FetchAllApi.get_states(country_id, (err, response) => {
          //alert(response)
          console.log("get_states_list", response.list.length);
          if (response.status === 1) {
            THIS.setState({
              state_list: response.list,
            })
          }
        })
      }
    })

    jQuery(document).ready(function () {

      jQuery(".pass-visible").click(function () {
        jQuery(this).toggleClass("off");
        var input = jQuery(jQuery(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });
      // jQuery('.datepicker').datepicker();
    });

    // jQuery(".add-phone-input").click(function() {
    //   jQuery(
    //     "<div className='form-group clone'><input className='form-control comp_phone_no' type='tel' required/><a href='javascript:;' className='remove-input'><img className='img-responsive' src='images/close-icon-red.svg'/></a></div>"
    //   ).insertBefore(this);
    // });
    // jQuery(".add-email-input").click(function() {
    //   jQuery(
    //     "<div className='form-group clone'><input className='form-control comp_email_id' type='email' required/><a href='javascript:;' className='remove-input'><img className='img-responsive' src='images/close-icon-red.svg'/></a></div>"
    //   ).insertBefore(this);
    // });

    // jQuery(".form-group").on("click", ".remove-input", function () {
    //   jQuery(this)
    //     .parent(".form-group")
    //     .remove();
    // });

    this.setState({ loading: false })
  }

  changeEntType(ent_type_id, ent_type_name) {
    console.log("ent_type_id", ent_type_id);
    jQuery("#entity_type").val(ent_type_id);
    jQuery(".dropdown-select .btn-value").text(ent_type_name);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  regFunc = (e) => {
    // e.preventDefault();
    var password_strength = Number(jQuery('#password_strength').val())
    // alert(password_strength)
    if (password_strength == 2 || password_strength == 3 || password_strength == 4) {
      var passWrd = false;
      var formValidation_1 = false;

      var first_name = this.state.fname;
      var last_name = this.state.lname;
      var country_region = this.state.country_region;
      var state_province = this.state.state_province;
      var email_id = this.state.email_id;
      var phone_no = this.state.phone_no;
      var password = this.state.password;
      var cpassword = this.state.cpassword;
      //       var password_strength = jQuery('#password_strength').val()
      // alert(password_strength)

      if (password !== cpassword) {
        jQuery("#password-fieldc").next(".text-red").html("Password and confirm password fields doesn't match!");
        passWrd = false;
      } else {
        jQuery("#password-fieldc").next(".text-red").html("");
        passWrd = true;
      }

      if (first_name !== "" && last_name !== "" && country_region !== "" && state_province !== "" && email_id !== "" && phone_no !== "" && passWrd === true) {
        jQuery(".form-step1").hide();
        jQuery(".form-step2").show();
        jQuery(".regBack").show();
        formValidation_1 = true;
      } else {
        jQuery(".form-step2").hide();
        jQuery(".form-step1").show();
        jQuery(".regBack").hide();
        formValidation_1 = false;
      }


    } else {
      alert('Please enter atleast fair password')
    }
  }

  regFunc_2 = () => {
    // alert('hi')
    this.setState({ loading: true })
    // e.preventDefault();

    var passWrd = false;
    var formValidation_1 = false;
    var formValidation_2 = false;

    var first_name = this.state.fname;
    var last_name = this.state.lname;
    var country_region = this.state.country_region;
    var state_province = this.state.state_province;
    var email_id = this.state.email_id;
    var phone_no = this.state.phone_no;
    var password = this.state.password;
    var cpassword = this.state.cpassword;

    var entity_name = this.state.entity_name;
    var entity_num = this.state.entity_num;
    var incorport_date = this.state.incorport_date;
    // var incorport_date = moment(jQuery('#fromdate').value).format('YYYY-MM-DD')
    var home_currency = this.state.home_currency;
    var principle_activities = this.state.principle_activities;
    var company_phn = this.state.phone_arr;
    var company_email = this.state.email_arr;
    var comp_address = this.state.comp_address;
    var entity_type = jQuery("#entity_type").val();

    let country_code = this.state.dialing_code;
    let plan_id = 0;
    let subscription_start_date = this.state.today_date;
    let subscription_end_date = this.state.end_date;

    if (password !== cpassword) {
      jQuery("#password-fieldc").next(".text-red").html("Password and confirm password fields doesn't match!");
      passWrd = false;
    } else {
      jQuery("#password-fieldc").next(".text-red").html("");
      passWrd = true;
    }

    if (first_name !== "" && last_name !== "" && country_region !== "" && state_province !== "" && email_id !== "" && phone_no !== "" && passWrd === true) {
      jQuery(".form-step1").hide();
      jQuery(".form-step2").show();
      jQuery(".regBack").show();
      formValidation_1 = true;
    } else {
      jQuery(".form-step2").hide();
      jQuery(".form-step1").show();
      jQuery(".regBack").hide();
      formValidation_1 = false;
    }



    if (entity_name !== "" && entity_num !== "" && incorport_date !== "" && home_currency !== "" && principle_activities !== "" && company_phn !== "" && company_email !== "" && comp_address !== "" && entity_type !== "") {
      formValidation_2 = true;
    } else {
      formValidation_2 = false;

      if (entity_name == '') {
        this.setState({ succ_msg: 'please fill entity name' })
        jQuery(".resp_msg").fadeIn(500);
        jQuery(".resp_msg").fadeOut(3000);
      } if (entity_num == '') {
        jQuery(".resp_msg").fadeIn(500);
        jQuery(".resp_msg").fadeOut(3000);
        this.setState({ succ_msg: 'please fill entity number' })
      } if (incorport_date == '') {
        jQuery(".resp_msg").fadeIn(500);
        jQuery(".resp_msg").fadeOut(3000);
        this.setState({ succ_msg: 'please fill incorporate date' })
      } if (home_currency == '') {
        jQuery(".resp_msg").fadeIn(500);
        jQuery(".resp_msg").fadeOut(3000);
        this.setState({ succ_msg: 'please fill home currency' })
      } if (principle_activities == '') {
        jQuery(".resp_msg").fadeIn(500);
        jQuery(".resp_msg").fadeOut(3000);
        this.setState({ succ_msg: 'please fill priinciple activities' })
      } if (company_phn == '') {
        jQuery(".resp_msg").fadeIn(500);
        jQuery(".resp_msg").fadeOut(3000);
        this.setState({ succ_msg: 'please fill company phone number' })
      } if (company_email == '') {
        jQuery(".resp_msg").fadeIn(500);
        jQuery(".resp_msg").fadeOut(3000);
        this.setState({ succ_msg: 'please fill company email' })
      } if (comp_address == '') {
        jQuery(".resp_msg").fadeIn(500);
        jQuery(".resp_msg").fadeOut(3000);
        this.setState({ succ_msg: 'please fill company address' })
      } if (entity_type == '') {
        jQuery(".resp_msg").fadeIn(500);
        jQuery(".resp_msg").fadeOut(3000);
        this.setState({ succ_msg: 'please fill entity type' })
      }
      this.setState({ loading: false })
    }



    console.log("entity_name", entity_name);
    console.log("entity_num", entity_num);
    console.log("incorport_date", incorport_date);
    console.log("home_currency", home_currency);
    console.log("principle_activities", principle_activities);
    console.log("company_phn", company_phn);
    console.log("company_email", company_email);
    console.log("comp_address", comp_address);
    console.log("entity_type", entity_type);

    console.log("form_validation1", formValidation_1);
    console.log("form_validation2", formValidation_2);
    //alert(formValidation_1+' '+formValidation_2);

    if (formValidation_1 === true && formValidation_2 === true) {
      // var company_phn_arr = [];
      // var company_email_arr = [];

      // company_phn_arr.push(this.state.company_phn);
      // var comp_phn_length = jQuery(".comp_phone_no").length;
      // if(comp_phn_length > 0){
      //   jQuery('.comp_phone_no').each(function(){
      //     company_phn_arr.push(this.value); 
      //   });
      // }
      // //console.log("company_phn_arr", company_phn_arr);

      // company_email_arr.push(this.state.company_email);
      // var comp_email_length = jQuery(".comp_email_id").length;
      // if(comp_email_length > 0){
      //   jQuery('.comp_phone_no').each(function(){
      //     company_email_arr.push(this.value); 
      //   });
      // }
      //console.log("company_email_arr", company_email_arr);

      let registerDetails = {
        first_name: first_name,
        last_name: last_name,
        country: country_region,
        state: state_province,
        email: email_id,
        phone: phone_no,
        password: password,
        entity_name: entity_name,
        entity_number: entity_num,
        entity_type: entity_type,
        incorporation_date: incorport_date,
        home_currency: home_currency,
        principle_activities: principle_activities,
        company_phone: company_phn,
        company_email: company_email,
        country_code: country_code,
        address: comp_address,
        plan_id: plan_id,
        subscription_start_date: subscription_start_date,
        subscription_end_date: subscription_end_date
      };

      console.log("registerDetails", registerDetails);

      FetchAllApi.registerNewCompany(registerDetails, (err, response) => {
        //console.log("userdajjjjjjjjjjjjjjjjjjta", response);
        var THIS = this;
        if (response.status === 1) {
          this.setState({
            succ_msg: response.message
          })

          jQuery(".resp_msg").fadeIn(500);
          // setTimeout(function () {
          jQuery(".resp_msg").fadeOut(2000);
          THIS.props.history.push("/register_finished");
          // }, 8000);
          this.setState({ loading: false })
        } else {
          this.setState({
            succ_msg: response.message
          })

          jQuery(".resp_msg").fadeIn(500);
          // setTimeout(function () { 
          jQuery(".resp_msg").fadeOut(2000);
          // }, 8000);
          this.setState({ loading: false })
        }
      });
    }
  }

  createEntity = (e) => {
    e.preventDefault();
    //alert("test");
    var create_entity = jQuery("#create_entity").val();

    if (create_entity !== "") {
      FetchAllApi.add_new_entity(create_entity, (err, response) => {
        var THIS = this;
        if (response.status === 1) {
          window.jQuery('#add_new_entity').modal('hide')

          this.setState({
            succ_msg: response.message
          })
          alert('Succesfully added')
          this.get_entity_list();

          jQuery("#entity_type").val(response.entity_id);
          jQuery(".dropdown-select .btn-value").text(response.entity_name);

          jQuery(".resp_msg").fadeIn(500);
          setTimeout(function () {
            jQuery(".resp_msg").fadeOut(2000);
          }, 8000);
          jQuery(".form-step1").hide();
          jQuery(".form-step2").show();
          jQuery(".regBack").show();

        } else {
          alert('Failed! please check your internet connection')

          this.setState({
            succ_msg: response.message
          })
          jQuery(".resp_msg").fadeIn(500);
          setTimeout(function () { jQuery(".resp_msg").fadeOut(2000); }, 8000);

        }
      });
    } else {
      jQuery(".enttype_drpdwn").next(".text-red").html("Please enter entitty name!");
    }
  }

  callbackFunction = (childData) => {
    // console.log('tytre5t',childData)
    jQuery('#password_strength').val(childData)
    // this.setState({password_strength: childData})
  }

  render() {
    console.log('1', this.state.today_date)
    console.log('12', this.state.end_date)

    console.log('roeeeq', this.state.email_arr)
    console.log('roeee', this.state.phone_arr)

    const { password } = this.state
    console.log('ytty', this.state.dialing_code)
    console.log('yttty', this.state.phone_code_string)

    // var phonenumber = this.state.dialing_code.toString()
    console.log('yty', this.state.currencies)
    var data = ''
    data = this.state.currencies
    console.log('country_length', this.state.country_list.length);
    return (
      <div>
        <div className="container-fluid">
          <div className="row dflex">
            <div className="col-md-4 col-sm-4 register-left hidden-xs">
              <div className="nav-brand text-center" onClick={() => this.props.history.push('/')}>
                <a>
                  <img
                    className="img-responsive"
                    src="images/nav-brand-transparent.png"
                    alt="Logo"
                  />
                </a>
              </div>
              {/* <h1>Genie lorem ipsum dolor</h1> */}
              <ul className="list-unstyled">
                <li>
                  <img src="images/ease-icon.svg" alt="icon" />
                  <span>
                    Ease of deployment of customised process solutions
                  </span>
                </li>
                <li>
                  <img src="images/performance-icon.svg" alt="icon" />
                  <span>Process performance visibilty</span>
                </li>
                <li>
                  <img src="images/increase-icon.svg" alt="icon" />
                  <span>Finance process flexibility to scale</span>
                </li>
                <li>
                  <img src="images/accuracy-icon.svg" alt="icon" />
                  <span>Data accuracy</span>
                </li>
                <li>
                  <img src="images/fulltime-icon.svg" alt="icon" />
                  <span>24/7 Operational capability</span>
                </li>
                <li>
                  <img src="images/cost-icon.svg" alt="icon" />
                  <span>Affordable cost</span>
                </li>
              </ul>
            </div>

            <div className="col-md-8 col-sm-8 register-right">
              <div className="resp_msg">{this.state.succ_msg}</div>

              <div className="register-form col-md-12 col-xs-12">
                <div className="nav-brand text-center visible-xs">
                  <img
                    className="img-responsive"
                    src="images/logo-genie.png"
                    alt="Logo"
                  />
                </div>
                <div className="register-head col-md-12 col-xs-12">
                  <a href="javascript:;" className="back regBack">
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  <span>
                    Ready to Get Started?
                    <br />
                    <small>Please fill with your details</small>
                  </span>
                </div>


                <div className="formstep-enclose step-1 col-md-12 col-xs-12 pad-no">

                  <form action="#" className="custom-form" autoComplete="off">
                    <div className="form-step1 col-md-12 col-xs-12 pad-no">

                      <div className="form-group col-md-6">
                        <label>First Name<span className="astrick">*</span></label>
                        <input type="text" name="fname" id="fname" onChange={event => this.handleChange(event)} className="form-control" required />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Last Name<span className="astrick">*</span></label>
                        <input type="text" name="lname" id="lname" onChange={event => this.handleChange(event)} className="form-control" required />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Country / Region<span className="astrick">*</span></label>
                        <select autoComplete='off' className="selectpicker form-control hh " data-live-search="true" name="country_region" title="Choose..." id="country_region" required>
                          <option value="" data-dialing-code={''}>Choose...</option>
                          {
                            this.state.country_list_length > 0 ? (
                              this.state.country_list.map((country_data, index) => {
                                return (
                                  <option value={country_data.name} data-id={country_data.id} data-dialing-code={country_data.phonecode}>{country_data.name}</option>
                                )
                              })
                            ) : ''
                          }
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label>State / Province<span className="astrick">*</span></label>
                        <select autoComplete='off' className="selectpicker form-control hh " data-live-search="true" name="state_province" title="Choose..." id="state_province" onChange={event => this.handleChange(event)} required>
                          <option value="">Choose...</option>
                          {
                            this.state.state_list.length > 0 ? (
                              this.state.state_list.map((state_data, index) => {
                                return (
                                  <option value={state_data.name} data-id={state_data.id}>{state_data.name}</option>
                                )
                              })
                            ) : ''
                          }
                        </select>
                      </div>

                      <div className="form-group col-md-6">
                        <label>Email<span className="astrick">*</span></label>
                        <input type="email" name="email_id" id="email_id" className="form-control" onChange={event => this.handleChange(event)} required />
                      </div>


                      <div className="form-group col-md-6">
                        <label>Phone<span className="astrick">*</span></label>
                        <div class="input-group col-md-6">
                          <span class="input-group-addon"> + {this.state.phone_code_string} </span>
                          <input type="tel" name="phone_no" id="phone_no" className="form-control" onChange={event => this.handleChange(event)} required />
                        </div>
                      </div>


                      <div className="form-group col-md-6">
                        <label>Password<span className="astrick">*</span></label>
                        <i className="pass-visible" toggle="#password-field">
                          <img className="off" src="images/visibility-off.svg" alt="hide" />
                          <img className="on" src="images/visibility.svg" alt="show" />
                        </i>
                        <input id="password-field" type="password" name="password" className="form-control" onChange={event => this.handleChange(event)} required />
                      </div>

                      <div className="form-group col-md-6">
                        <label>Confirm Password<span className="astrick">*</span></label>
                        <i className="pass-visible" toggle="#password-fieldc">
                          <img className="off" src="images/visibility-off.svg" alt="hide" />
                          <img className="on" src="images/visibility.svg" alt="show" />
                        </i>
                        <input id="password-fieldc" type="password" name="cpassword" className="form-control" onChange={event => this.handleChange(event)} required />
                        <small className="text-red"></small>
                      </div>

                      {this.state.password != '' &&
                        <div className="form-group col-md-6">
                          <PasswordStrengthMeter password={password} parentCallback={this.callbackFunction} />
                        </div>
                      }

                      <div className="col-md-12 col-xs-12 text-right">
                        <button type="button" className="btn btn-blue btn-rounded next"
                          onClick={() => this.check_user_email()}
                        >Next</button>
                      </div>
                    </div>


                  </form>


                  <form action="#" className="custom-form" onSubmit={(e) => this.checkSubmit(e)} autoComplete="off">
                    <div className="form-step2 col-md-12 col-xs-12 pad-no">

                      <div className="form-group col-md-6">
                        <label>Entity Name<span className="astrick">*</span></label>
                        <input type="text" name="entity_name" onChange={event => this.handleChange(event)} className="form-control" required />
                        {this.state.isentity_name && <small style={{ color: 'red' }}>this field is required</small>}
                      </div>
                      <div className="form-group col-md-6">
                        <label>Unique Entity Number (UEN)<span className="astrick">*</span></label>
                        <input type="text" name="entity_num" onChange={event => this.handleChange(event)} className="form-control" required />
                        {this.state.isentity_num && <small style={{ color: 'red' }}>this field is required</small>}
                      </div>
                      <div className="form-group col-md-6">
                        <label>Entity Type<span className="astrick">*</span></label>
                        <input type="hidden" name="entity_type" id="entity_type" required />

                        <div className="dropdown custom-select-drop enttype_drpdwn">
                          <button id="dLabel" className="form-control dropdown-select" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="btn-value">Choose...</span>
                            <span className="bs-caret"><span className="caret"></span></span>
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dLabel">
                            <li className="create-new">
                              <input type="text" name="create_entity" onChange={(e) => {
                                jQuery('#create_entity').val(e.target.value);
                                jQuery('#newicon').html(e.target.value)
                              }} className="form-control" placeholder="Create New..." />
                              <button className="btn btn-blue btn-rounded"
                                onClick={() => {
                                  window.jQuery('#add_new_entity').modal('show')

                                }}
                              >
                                Create new Entity type  <strong><span id='newicon'></span></strong>
                                <img src="images/btn-arrow-white.svg" alt="Icon" />
                              </button>
                            </li>
                            {
                              this.state.entity_type_list.length > 0 ? (
                                this.state.entity_type_list.map((ent_type_date, index) => {
                                  return (
                                    <li><a href="javascript:;" onClick={this.changeEntType.bind(this, ent_type_date.id, ent_type_date.name)}>{ent_type_date.name}</a></li>
                                  )
                                })
                              ) : ''
                            }
                          </ul>
                          {this.state.isentity_type && <small style={{ color: 'red' }}>this field is required</small>}
                          {/* <small className="text-red"></small> */}
                        </div>



                      </div>

                      <div className="form-group col-md-6">
                        <label>Incorporation Date<span className="astrick">*</span></label>
                        <div className="input-group date">
                          <input type="text" name="incorport_date" id='fromdate'
                            onBlur={(e) => {
                              let value = e.target.value
                              setTimeout(() => { this.changeDate(value) }, 500)
                            }}
                            className="form-control" required />
                          <div className="input-group-addon"><img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#fromdate').focus()} /></div>
                        </div>
                        {this.state.isincorport_date && <small style={{ color: 'red' }}>this field is required</small>}
                        {/* <small className="text-red"></small> */}
                      </div>


                      <div className="form-group col-md-6">
                        <label>Home Currency<span className="astrick">*</span></label>
                        <select autoComplete='off' className="selectpicker form-control hh " onChange={event => this.handleChange(event)} data-live-search="true" title="Choose..." id="home_currency" name="home_currency" required>

                          {

                            this.state.currencies && (
                              this.state.currencies.map((country_data, index) => {
                                return (
                                  <option>{country_data.code}</option>
                                )
                              })
                            )
                          }

                        </select>
                        {this.state.ishome_currency && <small style={{ color: 'red' }}>this field is required</small>}
                      </div>

                      <div className="form-group col-md-6">
                        <label>Principle Activities<span className="astrick">*</span></label>
                        <input type="text" name="principle_activities" onChange={event => this.handleChange(event)} className="form-control" required />
                        {this.state.isprinciple_activities && <small style={{ color: 'red' }}>this field is required</small>}
                      </div>

                      <div className="form-group col-md-6">
                        <label>Phone<span className="astrick">*</span></label>

                        {this.state.rows.map((item, i) => {
                          return (
                            <React.Fragment key={item}>
                              <div class={i > 0 ? "input-group form-group clone col-md-6" : "input-group  col-md-6"}>
                                <span class="input-group-addon"> + {this.state.phone_code_string} </span>
                                <input type="tel" name="phone_arr" id={`itemA${i}`} onChange={() => { this.handlePhone() }} className="form-control" required />
                                {i > 0 ? (<a href='javascript:;' className='remove-input' onClick={() => { this.deletePhone(i) }}>
                                  <img className='img-responsive' src='../images/delete-icon.svg' alt='icon' />
                                </a>) : ''}
                              </div>



                            </React.Fragment>

                          )
                        })}
                        {this.state.iscompany_phn && <small style={{ color: 'red' }}>this field is required</small>}
                        <a href="javascript:;" className="add-input add-phone-input" onClick={this.addNewPhone} >ADD MORE</a>

                      </div>
                      {/* 
                      <div className="form-group col-md-6">
                        <label>testing<span className="astrick">*</span></label>
                        <input type="text" name="principle_activities" onChange={event => this.handleChange(event)} className="form-control"  required/>
                      </div> */}


                      <div className="form-group col-md-6">

                        <label>Email<span className="astrick">*</span></label>
                        {this.state.row.map((item, i) => {
                          return (
                            <React.Fragment key={item}>
                              <div class={i > 0 ? "input-group form-group clone col-md-6" : "input-group  col-md-6"}>

                                <input type="email" name="company_email" id={`itemB${i}`} onChange={() => { this.handleEmail() }} className="form-control" required />
                                {i > 0 ? (<a href='javascript:;' className='remove-input' onClick={() => { this.deleteEmail(i) }}>
                                  <img className='img-responsive' src='../images/delete-icon.svg' alt='icon' />
                                </a>) : ''}
                              </div>


                            </React.Fragment>

                          )
                        })}
                        {this.state.iscompany_email && <small style={{ color: 'red' }}>this field is required</small>}
                        <a href="javascript:;" className="add-input add-email-input" onClick={this.addNewEmail}>ADD MORE</a>
                      </div>
                      <div className="form-group col-md-12 col-xs-12">
                        <label>Address<span className="astrick">*</span></label>
                        <textarea className="form-control" cols="8" rows="5" name="comp_address" onChange={event => this.handleChange(event)} required></textarea>
                        {this.state.iscomp_address && <small style={{ color: 'red' }}>this field is required</small>}
                      </div>
                      <div className="col-md-12 col-xs-12 ">
                        <button type="button" className="btn btn-rounded btn-blue "
                          onClick={() => {
                            jQuery(".form-step2").hide();
                            jQuery(".form-step1").show();
                            jQuery(".regBack").hide();
                          }}
                        >Previous page</button>
                        <button type="submit" className="btn btn-rounded btn-blue pull-right">Submit</button>
                      </div>

                    </div>
                  </form>

                </div>

                <div
                  className='modal fade pop-modal'
                  id='add_new_entity'
                  role='dialog'
                >
                  <div className='modal-dialog modal-md custom-modal'>
                    <button
                      type='button'
                      className='close hidden-xs'
                      data-dismiss='modal'
                      onClick={() => { this.setState({ roleStringLen: false }) }}
                    >
                      <img
                        className='img-responsive'
                        src='../../images/close-red.svg'
                        alt='icon'
                      />
                    </button>
                    <div className='modal-content'>
                      <div className='modal-body text-center'>
                        <h3>Add New Entity</h3>
                        <form className='custom-form row'>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4 col-xs-12'>
                              <label>Entity Name</label>
                            </div>
                            <div className='col-md-8 col-sm-8 col-xs-12'>
                              <input autoComplete='off' type='text' className='form-control' id='create_entity' />
                              <div style={{ float: 'left' }}>
                                {this.state.roleStringLen && <small style={{ color: 'red' }}>
                                  *Please fill out entity name.
                                </small>}
                              </div>                        </div>

                          </div>

                          <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>

                            <button
                              className='btn btn-lightgray'
                              data-dismiss='modal'
                            >
                              Cancel
                            </button>
                            <span>{'   '}</span>
                            <button className='btn btn-green' type='button' onClick=
                              {
                                this.createEntity
                              }>

                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  type="hidden"
                  id='password_strength'
                />

              </div>
            </div>
          </div>
        </div>

        {/* {this.state.loading ? <div class="loading_spinner">Loading&#8230;</div> : ''} */}
      </div>
    );
  }
}

class PasswordStrengthMeter extends React.Component {
  constructor(props) {
    super(props);
  }


  //   sendData = () => {
  //     this.props.parentCallback();
  // }


  createPasswordLabel = (result) => {
    // console.log('tytre5t1',result.score)
    this.props.parentCallback(result.score)
    switch (result.score) {
      case 0:
        return 'Too Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  }
  render() {

    const { password } = this.props
    var zxcvbn = require('zxcvbn')
    const testedResult = zxcvbn(password)
    return (
      <div className="password-strength-meter">
        <progress
          className={`password-strength-meter-progress strength-${this.createPasswordLabel(testedResult)}`}
          value={testedResult.score}
          max="4"
        />
        <br />

        <label
          className="password-strength-meter-label"
        >
          {password && (
            <>
              <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
            </>
          )}
        </label>
      </div>
    )
  }
}