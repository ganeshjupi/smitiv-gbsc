import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class Dummy extends React.Component{
    constructor(){
        super()
    }

    approveFunc=()=>{
       const urlParams = new URLSearchParams(window.location.search);
       let client_id=urlParams.get('client_id')
       let email_address=urlParams.get('email_address')
       FetchAllApi.settings_approval( client_id,email_address,(err, response) => {
        if (response.status === 1) {
          alert("Approval permission genrated successfully")
          
        }
      })

    };


    componentWillMount (){
        if (
          this.state.logged_user_id === "" ||
          this.state.logged_user_id === null ||
          this.state.logged_user_id === undefined
        ) {
          this.props.history.push("/");
        }
      };

    render(){
        const design={
            marginLeft:"600px",
        marginTop: "250px",
        backgroundColor: "#228B22",
        height:"55px",
        color:"white",
        borderRadius:"12px",
        fontSize: "25px",

        }
        return(
            <React.Fragment>
                          <button style={design} onClick={this.approveFunc}>APPROVE</button>
            </React.Fragment>
        )
    }
}