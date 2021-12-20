import React from "react";
import UserTopbar from "../components/user_module/userTopbar";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery';
import Moment from 'moment';
import ImageUploader from 'react-images-upload';
import "./preference.css";




export default class Preferences extends React.Component {
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
      number: [],
      dial_code: [93],
      phone: [],
      mail: [""],
      email: [],
      entityname: "",
      entity_type: '',
      entity_list: [],
      uen: "",
      activities: '',
      address: "",
      country: '',
      state: '',
      time: 'india',
      country_list: [],
      state_list: [],
      entity_list: [],
      incorport_date: "",
      phone_code: "",
      beggining_year: "",
      end_year: "",
      date_format: "YYYY-MM-DD",
      lock_date: "",
      password: "",
      logoImg: '',
      home_currency: "SGD - Singapore Doller",
      data: [],
      name_fill: false,
      type_fill: false,
      uen_fill: false,
      incorp_fill: false,
      start_fill: false,
      end_fill: false,
      phone_fill: false,
      email_fill: false,
      address_fill: false,
      state_fill: false,
      country_fill: false,
      clientHomeCurrency: '',
      sendLogo: '',
      emailError: false,
      show: false,
    }
    this.password = React.createRef()

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


  componentDidUpdate() {

    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

  };


  validateFunc = () => {
    let name = this.state.entityname
    let type = this.state.entity_type
    let uen = this.state.uen
    let incorp = this.state.incorport_date
    let start = this.state.beggining_year
    let end = this.state.end_year
    let address = this.state.address
    let email = this.state.email
    let phone = this.state.number
    let country = this.state.country
    let state = this.state.state
    let error = ''
    if (name !== "" && name !== null && name !== undefined && type !== "" && type !== null && type !== undefined && uen !== "" && uen !== null && uen !== undefined &&
      incorp !== "" && incorp !== null && incorp !== undefined && address !== "" && address !== null && address !== undefined
      && email !== "" && email !== null && email !== undefined && phone !== "" && phone !== null && phone !== undefined && country !== "" && country !== null && country !== undefined && state !== "" && state !== null && state !== undefined) {
      email.map((val) => {
        if (/^[a-z0-9]+@(?:[a-z0-9]+\.)+[A-Za-z]+$/.test(val)) {
          this.setState({ emailError: false })
          this.save();
        } else {
          this.setState({ emailError: true })
        }

      })

    } else {
      if (name == "" || name == null || name == undefined) {
        this.setState({ name_fill: true })
      } else {
        this.setState({ name_fill: false })
      };
      if (type == "" || type == null || type == undefined) {
        this.setState({ type_fill: true })
      } else {
        this.setState({ type_fill: false })
      };
      if (uen == "" || uen == null || uen == undefined) {
        this.setState({ uen_fill: true })
      } else {
        this.setState({ uen_fill: false })
      };
      if (incorp == "" || incorp == null || incorp == undefined) {
        this.setState({ incorp_fill: true })
      } else {
        this.setState({ incorp_fill: false })
      };
      // if (start == "" || start == null || start == undefined) {
      //   this.setState({ start_fill: true })
      // } else {
      //   this.setState({ start_fill: false })
      // };
      // if (end == "" || end == null || end == undefined) {
      //   this.setState({ end_fill: true })
      // } else {
      //   this.setState({ end_fill: false })
      // };
      if (address == "" || address == null || address == undefined) {
        this.setState({ address_fill: true })
      } else {
        this.setState({ address_fill: false })
      };
      if (email == "" || email == null || email == undefined) {
        this.setState({ email_fill: true })
      } else {
        this.setState({ email_fill: false })
      };
      email.map((val) => {
        if (/^[a-z0-9]+@(?:[a-z0-9]+\.)+[A-Za-z]+$/.test(val)) {
          this.setState({ emailError: false })
        } else {
          this.setState({ emailError: true })
        }
      })
      if (phone == "" || phone == null || phone == undefined) {
        this.setState({ phone_fill: true })
      } else {
        this.setState({ phone_fill: false })
      };
      if (country == "" || country == null || country == undefined) {
        this.setState({ country_fill: true })
      } else {
        this.setState({ country_fill: false })
      };
      if (state == "" || state == null || state == undefined) {
        this.setState({ state_fill: true })
      } else {
        this.setState({ state_fill: false })
      };
    }
  };


  save = (e) => {

    let incorp_date = this.state.incorport_date;
    let begining_year = this.state.beggining_year;
    let end_year = this.state.end_year;
    let lock = this.state.lock_date;

    let date_formated1 = ''
    let date_formated2 = ''
    let date_formated3 = ''
    let date_formated4 = ''

    if (incorp_date == undefined || incorp_date == "undefined") {
      date_formated1 = ''
    };
    if (begining_year == undefined || begining_year == "undefined") {
      date_formated2 = ''
    };
    if (end_year == undefined || end_year == "undefined") {
      date_formated3 = ''
    };
    if (lock == undefined || lock == "undefined") {
      date_formated4 = ''
    };

    if (incorp_date !== '' && incorp_date !== null && incorp_date !== undefined && incorp_date != "undefined") {
      var array1 = incorp_date.split("-");
      if (this.state.date_format == "DD-MM-YYYY") {
        date_formated1 = array1[2] + "-" + array1[1] + "-" + array1[0];
      } else if (this.state.date_format == "MM-DD-YYYY") {
        date_formated1 = array1[2] + "-" + array1[0] + "-" + array1[1];
      } else {
        date_formated1 = this.state.incorport_date;
      }
    };
    if (begining_year !== '' && begining_year !== null && begining_year !== undefined && begining_year != "undefined") {
      var array2 = begining_year.split("-");
      if (this.state.date_format == "DD-MM-YYYY") {
        date_formated2 = array2[2] + "-" + array2[1] + "-" + array2[0];
      } else if (this.state.date_format == "MM-DD-YYYY") {
        date_formated2 = array2[2] + "-" + array2[0] + "-" + array2[1];
      } else {
        date_formated2 = this.state.beggining_year;
      }
    };
    if (end_year !== '' && end_year !== null && end_year !== undefined && end_year != "undefined") {
      var array3 = end_year.split("-");
      if (this.state.date_format == "DD-MM-YYYY") {
        date_formated3 = array3[2] + "-" + array3[1] + "-" + array3[0];
      } else if (this.state.date_format == "MM-DD-YYYY") {
        date_formated3 = array3[2] + "-" + array3[0] + "-" + array3[1];
      } else {
        date_formated3 = this.state.end_year;
      }
    };
    if (lock !== '' && lock !== null && lock !== undefined && lock != "undefined") {
      var array4 = lock.split("-");
      if (this.state.date_format == "DD-MM-YYYY") {
        date_formated4 = array4[2] + "-" + array4[1] + "-" + array4[0];
      } else if (this.state.date_format == "MM-DD-YYYY") {
        date_formated4 = array4[2] + "-" + array4[0] + "-" + array4[1];
      } else {
        date_formated4 = this.state.lock_date;
      }
    };



















    localStorage.setItem("fiscal_start_year", date_formated2);
    localStorage.setItem("fiscal_end_year", date_formated3);
    var formdata = new FormData();
    formdata.append("name", this.state.entityname);
    formdata.append("entity_type", this.state.entity_type);
    formdata.append("unique_entity_number", this.state.uen);
    formdata.append("incorpation_date", date_formated1);
    formdata.append("princple_actvtes", this.state.activities);
    formdata.append("begining_year", date_formated2);
    formdata.append("end_year", date_formated3);
    formdata.append("home_currency", this.state.home_currency);
    formdata.append("phone", [this.state.number]);
    formdata.append("email_id", this.state.email);
    formdata.append("address", this.state.address);
    formdata.append("country", this.state.country);
    formdata.append("state", this.state.state);
    formdata.append("time_zone", this.state.time);
    formdata.append("date_format", this.state.date_format);
    formdata.append("logo", this.state.sendLogo);
    formdata.append("logo_dummy", this.state.logoImg);
    formdata.append("password", this.state.password);
    formdata.append("lock_date", date_formated4);
    formdata.append("client_id", this.state.logged_client_id);
    formdata.append("phone_code", [this.state.dial_code]);


    FetchAllApi.create_Organization_Profile(formdata, (err, response) => {
      if (response.status === 1) {
        localStorage.setItem("logged_company_name", this.state.entityname);
        alert("profile Updated successfully")

        // just for update company name in topbar
        setTimeout(() => {
          window.location.reload()
        }, 500);
        // just for update company name in topbar
        
      }
    });


  }


  getAllData = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.get_data(client_id, (err, response) => {
      if (response.status === 1) {
        localStorage.setItem("Entityname", response.data[0].name)
        this.password.current.value = response.data[0].password

        this.setState({
          entityname: response.data[0].name,
          entity_type: response.data[0].entity_type,
          uen: response.data[0].entity_number,
          incorport_date: response.data[0].incorporation_date,
          activities: response.data[0].principle_activities,
          beggining_year: response.data[0].begining_year,
          end_year: response.data[0].end_year,
          home_currency: response.data[0].home_currency,
          number: response.data[0].phone && response.data[0].phone.split(','),
          email: response.data[0].email_id && response.data[0].email_id.split(','),
          address: response.data[0].address,
          country: response.data[0].country,
          state: response.data[0].state,
          time: response.data[0].time_zone,
          logoImg: response.data[0].logo,
          sendLogo: response.data[0].logo,
          lock_date: response.data[0].lock_date,
          date_format: response.data[0].date_format,
        }, () => { this.initialChangeDate(response.data[0].date_format) }

        )
      }
    });



  };

  initialChangeDate = (prevValue) => {
    let date1 = this.state.incorport_date
    let start = this.state.beggining_year
    let end = this.state.end_year
    let lock = this.state.lock_date
    let format = this.state.date_format
    //  if(format !== ""){
    //    if(format == "DD-MM-YYYY"){
    //      if(date1 !=="" && date1 !==undefined){
    //        let change=date1.split("-")
    //        let arr=change[1]+"/"+change[2]+"/"+change[0]
    //        this.setState({incorport_date:arr})
    //      }
    //      if(start !=="" && start !==undefined){
    //       let change=start.split("-")
    //       let arr=change[1]+"/"+change[2]+"/"+change[0]
    //       this.setState({incorport_date:arr})
    //     }
    //     if(end !=="" && end !==undefined){
    //       let change=end.split("-")
    //       let arr=change[1]+"/"+change[2]+"/"+change[0]
    //       this.setState({incorport_date:arr})
    //     }

    //     if(end !=="" && end !==undefined){
    //       let change=end.split("-")
    //       let arr=change[1]+"/"+change[2]+"/"+change[0]
    //       this.setState({incorport_date:arr})
    //     }

    //     if(lock !=="" && lock !==undefined){
    //       let change=lock.split("-")
    //       let arr=change[1]+"/"+change[2]+"/"+change[0]
    //       this.setState({incorport_date:arr})
    //     }

    //    }else if(format == "YYYY-MM-DD"){
    //     if(date1 !=="" && date1 !==undefined){
    //       let change=date1.split("-")
    //       let arr=change[0]+"/"+change[1]+"/"+change[2]
    //       this.setState({incorport_date:arr})
    //     }
    //     if(start !=="" && start !==undefined){
    //      let change=start.split("-")
    //      let arr=change[0]+"/"+change[1]+"/"+change[2]
    //      this.setState({incorport_date:arr})
    //    }
    //    if(end !=="" && end !==undefined){
    //      let change=end.split("-")
    //      let arr=change[0]+"/"+change[1]+"/"+change[2]
    //      this.setState({incorport_date:arr})
    //    }

    //    if(end !=="" && end !==undefined){
    //      let change=end.split("-")
    //      let arr=change[0]+"/"+change[1]+"/"+change[2]
    //      this.setState({incorport_date:arr})
    //    }

    //    if(lock !=="" && lock !==undefined){
    //      let change=lock.split("-")
    //      let arr=change[0]+"/"+change[1]+"/"+change[2]
    //      this.setState({incorport_date:arr})
    //    }else if(format == "MM-DD-YYYY"){
    //     if(date1 !=="" && date1 !==undefined){
    //       let change=date1.split("-")
    //       let arr=change[2]+"/"+change[1]+"/"+change[0]
    //       this.setState({incorport_date:arr})
    //     }
    //     if(start !=="" && start !==undefined){
    //      let change=start.split("-")
    //      let arr=change[2]+"/"+change[1]+"/"+change[0]
    //      this.setState({incorport_date:arr})
    //    }
    //    if(end !=="" && end !==undefined){
    //      let change=end.split("-")
    //      let arr=change[2]+"/"+change[1]+"/"+change[0]
    //      this.setState({incorport_date:arr})
    //    }

    //    if(end !=="" && end !==undefined){
    //      let change=end.split("-")
    //      let arr=change[2]+"/"+change[1]+"/"+change[0]
    //      this.setState({incorport_date:arr})
    //    }

    //    if(lock !=="" && lock !==undefined){
    //      let change=lock.split("-")
    //      let arr=change[2]+"/"+change[1]+"/"+change[0]
    //      this.setState({incorport_date:arr})
    //    }

    //   }

    //  };

    if (date1 != '' && date1 != undefined && date1 != "undefined" && date1 != null || start != '' && start != "undefined" && start != undefined && start != null || end != '' && end != "undefined" && end != undefined && end != null || lock != '' && lock != undefined && lock != null && lock != "undefined") {

      if (this.state.date_format == "DD-MM-YYYY" || this.state.date_format == "MM-DD-YYYY" || this.state.date_format == "YYYY-MM-DD") {

        if (this.state.date_format == "YYYY-MM-DD" && prevValue === "DD-MM-YYYY") {

          var dateString = date1;

          var dateParts = dateString.split("-");

          // month is 0-based, that's why we need dataParts[1] - 1
          date1 = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        }
        if (this.state.date_format == "YYYY-MM-DD" && prevValue === "MM-DD-YYYY") {
          date1 = date1.replaceAll("-", "/")
        }

        if (date1 !== "" && date1 !== undefined && date1 !== null) {
          let format = new Date(date1)
          if (this.state.date_format == "DD-MM-YYYY") {
            var date_formated = Moment(format).format("DD-MM-YYYY")

            this.setState({
              incorport_date: date_formated,

            })
            document.getElementById("incorp").value = date_formated;
          } else if (this.state.date_format == "YYYY-MM-DD") {

            //  let input=new Date(date1)
            var date_formated = Moment(format).format("YYYY-MM-DD")

            this.setState({
              incorport_date: date_formated,

            })
            document.getElementById("incorp").value = date_formated;
          } else if (this.state.date_format == "MM-DD-YYYY") {

            var change = new Date(date1.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
            // let input=new Date(date1)
            var date_formated = Moment(change).format("MM-DD-YYYY")
            this.setState({
              incorport_date: date_formated,

            })
            document.getElementById("incorp").value = date_formated;
          }
        }

        if (start !== "" && start !== undefined && start !== null) {
          let input = new Date(start)
          if (this.state.date_format == "DD-MM-YYYY") {

            var date_formated = Moment(input).format("DD-MM-YYYY")

            this.setState({
              beggining_year: date_formated,
            })
            document.getElementById("begin").value = date_formated;
          } else if (this.state.date_format == "YYYY-MM-DD") {
            //  let input=new Date(date1)
            var date_formated = Moment(input).format("YYYY-MM-DD")
            this.setState({
              beggining_year: date_formated,
            })
            document.getElementById("begin").value = date_formated;
          } else if (this.state.date_format == "MM-DD-YYYY") {

            var change = new Date(start.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
            // let input=new Date(date1)
            var date_formated = Moment(change).format("MM-DD-YYYY")
            this.setState({
              beggining_year: date_formated,

            })
            document.getElementById("begin").value = date_formated;
          }
        }
        if (end !== "" && end !== undefined && end !== null) {
          let input = new Date(end)
          if (this.state.date_format == "DD-MM-YYYY") {


            var date_formated = Moment(input).format("DD-MM-YYYY")

            this.setState({
              end_year: date_formated,

            })
            document.getElementById("end").value = date_formated;
          } else if (this.state.date_format == "YYYY-MM-DD") {
            //  let input=new Date(date1)
            var date_formated = Moment(input).format("YYYY-MM-DD")

            this.setState({
              end_year: date_formated,

            })
            document.getElementById("end").value = date_formated;
          } else if (this.state.date_format == "MM-DD-YYYY") {
            var change = new Date(end.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
            // let input=new Date(date1)
            var date_formated = Moment(change).format("MM-DD-YYYY")
            this.setState({
              end_year: date_formated,

            })
            document.getElementById("end").value = date_formated;
          }
        }
        if (lock !== "" && lock !== undefined && lock !== null) {
          let input = new Date(lock)
          if (this.state.date_format == "DD-MM-YYYY") {

            var date_formated = Moment(input).format("DD-MM-YYYY")

            this.setState({
              lock_date: date_formated,

            })
            document.getElementById("lock").value = date_formated;
          } else if (this.state.date_format == "YYYY-MM-DD") {

            //  let input=new Date(date1)
            var date_formated = Moment(input).format("YYYY-MM-DD")

            this.setState({
              lock_date: date_formated,

            })
            document.getElementById("lock").value = date_formated;
          } else if (this.state.date_format == "MM-DD-YYYY") {
            var change = new Date(lock.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))

            // let input=new Date(date1)
            var date_formated = Moment(change).format("MM-DD-YYYY")
            this.setState({
              lock_date: date_formated,

            })
            document.getElementById("lock").value = date_formated;
          }
        }



      }
    }

  };



  setDateFormat = (e) => {
    var prevValue = this.state.date_format;
    this.setState({ date_format: e.target.value }, () => this.initialChangeDate(prevValue))

  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ password: this.password.current.value })

  }
  handleChange = (e) => {

    this.setState({ [e.target.name]: e.target.value, })

  }


  handleCountry = (e) => {
    this.setState({
      country: e.target.attributes[0].value
    })
  }




  phoneCodeChange = (e, idx) => {

    let code = [...this.state.dial_code]
    code[idx] = e.target.value
    this.setState({ dial_code: code })
    console.log("val", code)
  }

  phoneChange = (e, idx) => {

    let phone = [...this.state.number]
    phone[idx] = e.target.value
    this.setState({ number: phone })
  }
  emailChange = (e, idx) => {

    let email = [...this.state.email]
    email[idx] = e.target.value
    this.setState({ email: email, emailError: false })

  }
  

  getPhoneCode = () => {
    let input = {to_get_phone_code : 1}
    FetchAllApi.get_countries_phone_code(input,(err, response) => {
      if (response.status === 1) {
        this.setState({phone_codes_array: response.list})
      }else{
        this.setState({phone_codes_array: []})
      }
    });
  }

  getCountry = (id, phone) => {

    let country_id = id

    FetchAllApi.get_countries((err, response) => {
      if (response.status === 1) {
        this.setState({
          country_list: response.list,
        })
      }
    });


  }

  getEntityList = () => {
    FetchAllApi.get_entity_types((err, response) => {
      if (response.status === 1) {
        this.setState({
          entity_list: response.list
        })
      } else {

      }
    });
  }


  changeDate() {
    let date = jQuery('#incorp').val();
    if (date == '') {
      this.setState({ incorport_date: '' })
    }
    if (date != "" && date != null && date != undefined) {
      if (this.state.date_format == "DD-MM-YYYY") {
        console.log('"DD-MM-YYYY"')
        var array = date.split("/")
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[0] + '-' + array[1] + '-' + array[2]

        if (date_formated)
          this.setState({ incorport_date: date_formated })
        document.getElementById("incorp").value = date_formated;
      } else if (this.state.date_format == "YYYY-MM-DD") {
        console.log('YYYY-MM-DD')
        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        console.log('array', array)
        var date_formated = array[2] + '-' + array[1] + '-' + array[0]
        if (date_formated)
          this.setState({ incorport_date: date_formated })
        document.getElementById("incorp").value = date_formated;
      } else if (this.state.date_format == "MM-DD-YYYY") {
        console.log('MM-DD-YYYY')
        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[1] + '-' + array[0] + '-' + array[2]
        if (date_formated)
          this.setState({ incorport_date: date_formated })
        document.getElementById("incorp").value = date_formated;
      }


    }
    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  };

  beginingDate() {
    let date = jQuery('#begin').val();
    console.log("neww", date)
    if (date == '') {
      this.setState({ beggining_year: '' })
    }
    if (date !== "" && date != null && date !== undefined) {
      if (this.state.date_format == "DD-MM-YYYY") {
        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[0] + '-' + array[1] + '-' + array[2]
        this.setState({
          beggining_year: date_formated

        })
        document.getElementById("begin").value = date_formated;
      } else if (this.state.date_format == "YYYY-MM-DD") {
        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[2] + '-' + array[1] + '-' + array[0]
        this.setState({
          beggining_year: date_formated

        })
        document.getElementById("begin").value = date_formated;
      } else if (this.state.date_format == "MM-DD-YYYY") {

        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[1] + '-' + array[0] + '-' + array[2]
        this.setState({
          beggining_year: date_formated

        })
        document.getElementById("begin").value = date_formated;

      }
    }

  };
  endDate() {
    let date = jQuery('#end').val()
    if (date == '') {
      this.setState({ end_year: '' })
    }
    if (date !== "" && date !== null && date !== undefined) {
      if (this.state.date_format == "DD-MM-YYYY") {
        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[0] + '-' + array[1] + '-' + array[2]
        this.setState({
          end_year: date_formated

        })
        document.getElementById("end").value = date_formated;
        this.check(date_formated)
      } else if (this.state.date_format == "YYYY-MM-DD") {


        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[2] + '-' + array[1] + '-' + array[0]
        this.setState({
          end_year: date_formated

        })
        document.getElementById("end").value = date_formated;
        this.check(date_formated)
      } else if (this.state.date_format == "MM-DD-YYYY") {

        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[1] + '-' + array[0] + '-' + array[2]
        this.setState({
          end_year: date_formated

        })
        document.getElementById("end").value = date_formated;
        this.check(date_formated)
      }
    }


  };

  check = (date_formated) => {
    if (new Date(this.state.beggining_year).getTime() > new Date(date_formated).getTime()) {
      this.setState({ end_year: "" })
      alert("please fill correct end year")

    } else {
      this.setState({ end_year: date_formated })
    }
  }

  lockDate() {
    let date = jQuery('#lock').val()
    if (date == '') {
      this.setState({ lock_date: '' })
    }
    if (date !== "" && date !== null && date !== undefined) {
      if (this.state.date_format == "DD-MM-YYYY") {
        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[0] + '-' + array[1] + '-' + array[2]
        this.setState({
          lock_date: date_formated

        })
        document.getElementById("lock").value = date_formated;
      } else if (this.state.date_format == "YYYY-MM-DD") {
        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[2] + '-' + array[1] + '-' + array[0]
        this.setState({
          lock_date: date_formated

        })
        document.getElementById("lock").value = date_formated;
      } else if (this.state.date_format == "MM-DD-YYYY") {

        var array = date.split('/')
        if (array[2] === undefined)
          array = date.split('-')
        var date_formated = array[1] + '-' + array[0] + '-' + array[2]
        this.setState({
          lock_date: date_formated

        })
        document.getElementById("lock").value = date_formated;
      }
    }

  };


  componentDidMount() {
    this.getCountry();
    this.getPhoneCode();
    this.getEntityList();
    this.getAllData();
    this.get_client_home_currency();

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

  }

  countryChange = (e) => {

    const value = e.target.value;
    const options = e.target.children;
    let id = null;
    for (let i = 0; i < options.length; i++) {
      if (options[i].innerHTML === value) {
        id = options[i].id;
        break;
      }

    }

    let country_id = id
    this.setState({ country: e.target.value }, () => {
      FetchAllApi.get_states(country_id, (err, response) => {
        //alert(response)

        if (response.status === 1) {
          this.setState({
            state_list: response.list,
            state: "",
          })
        }
      })
    })
  };

  get_client_home_currency = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.get_client_home_currency(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({
          clientHomeCurrency: response.currency,
        })
      } else {
      }
    });
  };

  fileUpload = e => {
    if ( e.target.files && e.target.files[0] && e.target.files[0].size <= 2000000) {
      let image = window.URL.createObjectURL(e.target.files[0])
      this.setState({ logoImg: image, sendLogo: e.target.files[0] })
    } else {
      alert("Image size should be 2 Mb")
      this.setState({ logoImg: '', sendLogo: '' })
      e.target.value = '';
    }
  };
  addPhone = () => {
    let newNumber = [...this.state.number]
    newNumber.push("")
    this.setState({ number: newNumber })
  };


  addMail = () => {
    let newMail = [...this.state.email]
    newMail.push("")
    this.setState({ email: newMail })
  };

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    console.log("this", this.state.dial_code, this.state.number)
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
                <h3>Members</h3>
              </div>
              <div className="col-md-12">
                <form className="row custom-form ff-cl-reverse-sm"  >
                  <div className="col-lg-4 col-md-5">
                    <div className="row">
                      <div className="form-group">
                        <label>Entity Name<span className="astrick">*</span></label>
                        <input type="text" name="entityname" className="form-control" value={this.state.entityname} onChange={this.handleChange} required />
                        {this.state.name_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out Entity name.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}

                      </div>
                      <div className="form-group">
                        <label>Entity Type<span className="astrick">*</span></label>
                        <div className="custom-select-drop dropdown">
                          <select className="selectpicker form-control hh " data-live-search="true" placeholder={this.state.entity_type} name="entity_type" value={this.state.entity_type} onChange={this.handleChange} title="Choose..." id="country_region" required>
                            {

                              this.state.entity_list.map((t, index) => {
                                return (
                                  <option value={t.id} >{t.name}</option>
                                )
                              })

                            }
                          </select>
                        </div>
                        {this.state.type_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out Entity Type name.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="form-group ">
                        <label>Unique Entity Number (UEN)<span className="astrick">*</span></label>
                        <input type="text" className="form-control" name="uen" value={this.state.uen} onChange={this.handleChange} required />
                        {this.state.uen_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out UEN Number.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="form-group ">
                        <label>Date Format</label>
                        <div className="custom-select-drop dropdown" name="date_format" >
                          <select className="selectpicker form-control hh " data-live-search="true" value={this.state.date_format} onChange={this.setDateFormat}>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                            <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Incorporation Date<span className="astrick">*</span></label>
                        <div className="input-group date mar-t-no" data-date-format={this.state.date_format} data-provide="datepicker">
                          <input type="text" name="incorport_date" id='incorp' onBlur={(event) => {
                            let value = event.target.value
                            setTimeout(() => { this.changeDate(value) }, 500)
                          }} className="form-control" required />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#incorp').focus()} />
                          </div>
                        </div>
                        {this.state.incorp_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out Incorporation Date.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="form-group">
                        <label>Principle Activities</label>
                        <input type="text" className="form-control" name="activities" value={this.state.activities} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Fiscal Year</label>
                        <span className="label-tag">Beginning of the financial year</span>
                        <div className="input-group date mar-t-no mar-btm" data-date-format={this.state.date_format}  >
                          <input type="text" name="financial year" id='begin' onBlur={(event) => {
                            let value = event.target.value
                            setTimeout(() => { this.beginingDate(value) }, 500)
                          }} className="form-control" required />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#begin').focus()} />
                          </div>

                        </div>

                        {/* {this.state.start_fill ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out start date.
                                </small>
                          </div>

                        ) : (
                          ''
                        )} */}
                        <span className="label-tag">End of the financial year</span>
                        <div className="input-group date mar-t-no" data-date-format={this.state.date_format} >
                          <input type="text" className="form-control" id='end' name="financial year end" onBlur={(event) => {
                            let value = event.target.value
                            setTimeout(() => { this.endDate(value) }, 500)
                          }} required />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#end').focus()} />
                          </div>
                        </div>
                        {/* {this.state.end_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out end date.
                                </small>
                          </div>
                        ) : (
                          ''
                        )} */}
                      </div>
                      <div className="form-group no-edit">
                        <label>Home Currency</label>
                        <input type="text" className="form-control" defaultValue={this.state.clientHomeCurrency} name />
                      </div>
                      <div className="form-group">
                        <label>Phone<span className="astrick">*</span></label>
                        {this.state.number.map((phone, idx) => {
                          return (<div key={idx} style={{display:'flex'}} className="input-group ph-grp">
                            <div className=" dropdown tiny-input">
                              {/* <select className="select-dropdown form-control" data-live-search="true" name="dial_code" value={this.state.dial_code[idx]} onChange={(e) => { this.phoneCodeChange(e, idx) }} required>
                                {
                                  this.state.country_list.map((country_data, index) => {
                                    return (
                                      <option value={country_data.phonecode} >+{country_data.phonecode}</option>
                                    )
                                  })
                                }
                              </select> */}
                              <select
                                    className="selectpicker form-control"
                                    data-live-search="true"
                                    title="Choose..."
                                    value={this.state.dial_code[idx]}
                                    onChange={(e) => { this.phoneCodeChange(e, idx) }}
                                    required
                                  >
                                    {
                                  this.state.phone_codes_array && this.state.phone_codes_array.map((country_data, index) => {
                                    return (
                                      <option value={country_data.phonecode} >+{country_data.phonecode}</option>
                                    )
                                  })
                                }
                                  </select>
                            </div>
                            <input type="text" className="form-control large-input" value={phone} onChange={(e) => { this.phoneChange(e, idx) }} required />
                          </div>)
                        })}
                        {this.state.phone_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out phone number.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}
                        <a href="javascript:;" className="add-input" onClick={this.addPhone}  >ADD MORE</a>
                      </div>
                      <div className="form-group">
                        <label>Email<span className="astrick">*</span></label>
                        {this.state.email.map((Email, idx) =>

                          <input key={idx} type="email" className="form-control" value={Email} onChange={(e) => { this.emailChange(e, idx) }} required />
                        )}

                        {this.state.email_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out Email id.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}
                        {this.state.emailError == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill Valid Email id.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}
                        <a href="javascript:;" className="add-input" onClick={this.addMail}>ADD MORE</a>
                      </div>
                      <div className="form-group">
                        <label>Address<span className="astrick">*</span></label>
                        <textarea className="form-control" name="address" value={this.state.address} onChange={this.handleChange} required />
                        {this.state.address_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out address.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="form-group">
                        <label>Country / Region<span className="astrick">*</span></label>
                        <div className="custom-select-drop dropdown" >


                          <select className="selectpicker form-control hh " data-live-search="true" placeholder={this.state.country} name="country" value={this.state.country} title="Choose..." onChange={this.countryChange} required>
                            {

                              this.state.country_list.map((country_data, index) => {
                                return (
                                  <option value={country_data.name} id={country_data.id} phone_code={country_data.phonecode} >{country_data.name}</option>
                                )
                              })

                            }
                          </select>
                        </div>
                        {this.state.country_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out country.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>

                      <div className="form-group">
                        <label>State / Province<span className="astrick">*</span></label>
                        <div className="custom-select-drop dropdown">
                          <select className="selectpicker form-control hh " data-live-search="true" defaultValue={this.state.state} name="state" value={this.state.state} onChange={event => this.handleChange(event)} required>
                            <option >{this.state.state}</option>
                            {

                              this.state.state_list.map((state_data, index) => {
                                return (
                                  <option value={state_data.name} >{state_data.name}</option>
                                )
                              })

                            }
                          </select>
                        </div>
                        {this.state.state_fill == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out state.
                                </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      {/* <div className="form-group">
                        <label>Time Zone</label>
                        <div className="custom-select-drop dropdown">
                          <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                            <span id="selected">(GMT 5:30) India Standard Time</span><span className="caret" />
                          </a>
                          <ul className="dropdown-menu">
                            <li className="active"><a href="javascript:;">(GMT 5:30) India Standard Time</a></li>
                            <li><a href="javascript:;">Dropdown Item 1</a></li>
                            <li><a href="javascript:;">Dropdown Item 2</a></li>
                            <li><a href="javascript:;">Dropdown Item 3</a></li>
                          </ul>
                        </div>
                      </div> */}
                      <div className="form-group">
                        <label>Lock Dates</label>
                        <span className="label-tag">Stop all users making changes on and before this date unless enter password</span>
                        <div className="input-group date mar-t-no" data-date-format={this.state.date_format} data-provide="datepicker">
                          <input type="text" className="form-control" id="lock" onBlur={(event) => {
                            let value = event.target.value
                            setTimeout(() => { this.lockDate(value) }, 500)
                          }} />
                          <div className="input-group-addon">
                            <img src="images/calendar-icon.svg" alt="icon" onClick={() => jQuery('#lock').focus()} />
                          </div>
                        </div>
                      </div>
                      <a href="javascript:;" data-toggle="modal" data-target="#account-pass-modal">Account password Modal</a>
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-1" />
                  <div className="col-lg-4 col-md-5">
                    <div className="row">
                      <div className="form-group">
                        <label>Your Logo</label>
                        <a href="javascript:;" for="myfile" className="logo-upload-btn ">
                          <img src={this.state.logoImg} style={{ maxWidth: "200px" }} />

                          <input type="file" id="myfile" name="myfile" accept= ".png,.jpg" onChange={this.fileUpload}></input>
                        </a>
                        <span className="label-tag">This logo will appear on the documents (Quotation, invoices, etc.) that are created. <br />Preferred Image Size: 500px x 500px @ 72 DPI Maximum size of 2MB.
                        <br />Format should be png or jpg/jpeg</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          <div className="pf-btm-wrap bg-sticky">
            <div className="col-md-12 text-right pad-no">
              <button className="btn btn-lightgray mar-rgt-5" onClick={() => { this.props.history.push('/loading', ['/preferences']) }}>Cancel</button>
              <button className="btn btn-green mar-rgt-5" type="submit" onClick={this.validateFunc}>Save</button>
            </div>
          </div>
          {/* pf-btm-wrap Ends here */}
        </div>
        {/* Main Wrapper Ends here */}
        <div className="modal fade pop-modal" id="account-pass-modal" role="dialog">
          <div className="modal-dialog modal-xs custom-modal">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs" data-dismiss="modal">
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Accounting Closing Date Password</h3>
                <form className="custom-form row column">
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Enter Password</label>
                    <div className="form-group login-eye">
                      <i className="pass-visible" toggle="#password-fieldc" onClick={() => this.setState({ show: !this.state.show })}>
                        {this.state.show == false ? (
                          <img src="images/visibility-off.svg" alt="hide" />
                        ) : (
                          <img src="images/visibility.svg" alt="show" />
                        )
                        }
                      </i>
                      <input type={this.state.show ? "text" : "password"} ref={this.password} className="form-control" name="password" />
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                    <button className="btn btn-lightgray mar-rgt-5" data-dismiss="modal">Cancel</button>
                    <input type="button" data-dismiss="modal" className="btn btn-green mar-rgt-5" value="Submit" onClick={this.handleSubmit} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>




      </React.Fragment>

    )



  }
}