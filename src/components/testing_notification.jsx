import React from "react";
import jQuery from "jquery";
import FetchAllApi from '../api_links/fetch_all_api';
import data from "./reports/CountryCodes";

export default class Testing_notification extends React.Component {
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
            notifi_list: [],
        };
    }

    componentDidMount() {
        this.getNotification();
        jQuery(".search-btn").click(function () {
            jQuery(".hdr-search").addClass("active");
        });
        jQuery(".hdr-search .close-icon").click(function () {
            jQuery(".hdr-search").removeClass("active");
        });

        jQuery("input[name='search']").on("input", function (e) {
            var selected = jQuery(this).val();
            // alert(selected)
            console.log("gfgf", selected);
        });
    }

    getNotification = () => {
        let client_id = this.state.logged_client_id
        FetchAllApi.get_notification(client_id, (err, response) => {
            if (response.status === 1) {
                let notifi_list = response.results
                this.setState({ notifi_list })
            }
        })
    };

    title = (type) => {
        switch (type) {
            case '1':
                return 'Group Accounting Request'
            case '2':
                return 'Received Bill'
            case '3':
                return 'Received payment for sales invoice'
            case '4':
                return 'Customer Multipayment Received'
            default:
                return ''
        }
    }


    navigate = (item) =>{
        

        switch (item.type) {

            case 1:
                {
                    localStorage.setItem('group_request', JSON.stringify(item))
                    window.location.href = "/accounting_request"
                } break;

            case 2:
                {
                    localStorage.setItem('received_bill', item.list_id)
                    localStorage.setItem('sales_invoice_id', item.sales_invoice_id)
                    window.location.href = "/received_bill"
                } break;

            case 3:
                {
                    localStorage.setItem('group_payment_request', item.id)
                    localStorage.setItem('sales_invoice_id', item.sales_invoice_id)
                    window.location.href = "/create_invoice"
                } break;

            case 4:
                {
                    localStorage.setItem('customer_receive_payment_notification', item.id)
                    window.location.href = "/Customer_multipayment_notification"
                } break;

            case 20:
                {
                    // localStorage.setItem('group_payment_request', item.id)
                    // localStorage.setItem('sales_invoice_id', item.sales_invoice_id)
                    window.location.href = "/requests"
                } break;

            case 21:
                {
                    // localStorage.setItem('group_payment_request', item.id)
                    // localStorage.setItem('sales_invoice_id', item.sales_invoice_id)
                    window.location.href = "/requests"
                } break;

            case 22:
                {
                    localStorage.setItem('group_payment_request', item.id)
                    localStorage.setItem('sales_invoice_id', item.sales_invoice_id)
                    window.location.href = "/create_invoice"
                } break;

            default:
                return ''
        }
    }

    clicked = (item) => {

        if( item.type == 20 || item.type == 21 || item.type == 22){
        let input = { client_id: this.state.logged_client_id,notification_id: item.id}
        FetchAllApi.mark_notification_as_read(input, (err, response) => {
            if (response.status == 1) {
                this.navigate(item)
            }
        })
       }else{
           this.navigate(item)
       }

    }

    render() {
        return (
            <div className="notify-wrap">
                <a >
                    <img src="../../images/notification-icon.svg" alt="Notification" />
                    <span class="badge badge-notify">{this.state.notifi_list.length>0?this.state.notifi_list.length:''}</span>
                    <div className="notify-encl">
                        <h3>Notifications</h3>
                        <ul className="list-unstyled">

                            <li>
                                {this.state.notifi_list.map((item, i) => {
                                    return (
                                        <a href="javascript:;" style={{ background: item.is_read == 1 ? '#DFDAD4' : '' }} onClick={() => this.clicked(item)}>
                                            <div className="notifi-icon">
                                                <img className="img-responsive" src={item.logo_path} alt="icon" />
                                            </div>
                                            <div className="notify-cont">
                                                <p>{this.title(item.type)}</p>
                                                <span>{item.message}</span>
                                                <img className="next-arrow" src="images/item-active-arrow.svg" alt="icon" />
                                            </div>
                                        </a>
                                    )
                                })}
                            </li>

                        </ul>
                    </div>
                </a>
            </div>
        )
    }
}