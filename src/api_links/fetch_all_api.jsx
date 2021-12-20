import React from "react";
import config from "./api_links.jsx";

var authorization_key = "O5mGIP3VNia0JvPH2IBiwA==";

class FetchAllApi extends React.Component {
  static userLogin(email_id, password, callback) {
    fetch(config.login_link, {
      method: "POST",
      body: JSON.stringify({
        email_id: email_id,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static edit_sales_invoice_payment(coreData, callback) {
    //kkkk

    ///kkk

    fetch(config.edit_sales_invoice_payment, {
      method: "POST",
      body: JSON.stringify({
        // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
        client_id: coreData.client_id,
        customer_id: coreData.customer_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        invoice_date: coreData.invoice_date,
        company_name: coreData.company_name,
        type: coreData.type,
        invoice_number: coreData.invoice_number,
        company_address: coreData.company_address,
        list_id: coreData.list_id,
        tagged_user_id: coreData.tagged_user_id,
        item_list: coreData.item_list,
        job_name: coreData.job_name,
        memo: coreData.memo,
        job_id: coreData.job_id,
        thrird_party_account_id: coreData.thrird_party_account_id,
        third_party_type: coreData.third_party_type,
        third_party_account_name: coreData.third_party_account_name,
        shipping_address: coreData.shipping_address,
        thanking_message: coreData.thanking_message,
        terms_and_conditions: coreData.terms_and_conditions,

        payment_date: coreData.payment_date,
        payment_method: coreData.payment_method,
        amount_in_words: coreData.amount_in_words,
        due_date: coreData.due_date,
        reference: coreData.reference,
        payment_amount: coreData.payment_amount,
        account: coreData.account,
        payment_exchange_rate: coreData.payment_exchange_rate,
        balance_sheet_category: coreData.balance_sheet_category,
        tax_inclusive: coreData.tax_inclusive,
        invoice_id: coreData.invoice_id,
        payment_id: coreData.payment_id,
        descripation: coreData.descripation,
        template_id: coreData.template_id,
        is_credit_limit_accepted : coreData.is_credit_limit_accepted ?  coreData.is_credit_limit_accepted : 0,
        lock_date_password : coreData.lock_date_password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static create_estimate(coreData, callback) {
  //   //kkkk

  //   ///kkk

  //   fetch(config.create_estimate, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
  //       client_id: coreData.client_id,
  //       customer_id: coreData.customer_id,
  //       item_total_home_currency: coreData.item_total_home_currency,
  //       tax_amount_home_currency: coreData.tax_amount_home_currency,
  //       grand_total_home_currency: coreData.grand_total_home_currency,
  //       item_total_foreign_currency: coreData.item_total_foreign_currency,
  //       tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
  //       grand_total_foreign_currency: coreData.grand_total_foreign_currency,
  //       currency: coreData.currency,
  //       exchange_rate: coreData.exchange_rate,
  //       estimate_date: coreData.estimate_date,
  //       company_name: coreData.company_name,
  //       type: coreData.type,
  //       estimate_number: coreData.estimate_number,
  //       company_address: coreData.company_address,
  //       list_id: coreData.list_id,
  //       tagged_user_id: coreData.tagged_user_id,
  //       item_list: coreData.item_list,
  //       job_name: coreData.job_name,
  //       memo: coreData.memo,
  //       job_id: coreData.job_id,

  //       thanking_message: coreData.thanking_message,
  //       terms_and_conditions: coreData.terms_and_conditions,
  //       amount_in_words: coreData.amount_in_words,
  //       due_date: coreData.due_date,
  //       reference: coreData.reference,
  //       payment_amount: coreData.payment_amount,
  //       account: coreData.account,
  //       payment_exchange_rate: coreData.payment_exchange_rate,
  //       balance_sheet_category: coreData.balance_sheet_category,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static create_estimate(coreData, callback) {

    let url = coreData.isInvoiceEditable ? config.update_estimate : config.create_estimate

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
        client_id: coreData.client_id,
        customer_id: coreData.customer_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        estimate_date: coreData.invoice_date,
        company_name: coreData.company_name,
        type: coreData.type,
        estimate_number: coreData.invoice_number,
        company_address: coreData.company_address,
        list_id: coreData.list_id,
        tagged_user_id: coreData.tagged_user_id,
        item_list: coreData.item_list,
        job_name: coreData.job_name,
        memo: coreData.memo,
        job_id: coreData.job_id,
        thrird_party_account_id: coreData.thrird_party_account_id,
        third_party_type: coreData.third_party_type,
        third_party_account_name: coreData.third_party_account_name,
        shipping_address: coreData.shipping_address,
        thanking_message: coreData.thanking_message,
        terms_and_conditions: coreData.terms_and_conditions,

        payment_date: coreData.payment_date,
        descripation: coreData.descripation,
        payment_method: coreData.payment_method,
        amount_in_words: coreData.amount_in_words,
        due_date: coreData.due_date,
        reference: coreData.reference,
        payment_amount: coreData.payment_amount,
        account: coreData.account,
        payment_exchange_rate: coreData.payment_exchange_rate,
        balance_sheet_category: coreData.balance_sheet_category,
        tax_inclusive: coreData.tax_inclusive,
        template_id: coreData.template_id,
        estimate_id: coreData.estimate_id,
        custom_header_fields: coreData.custom_header_fields,
        custom_footer_fields: coreData.custom_footer_fields,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }



  static getInvoiceDetails(CoreData, callback) {
    fetch(config.get_sales_invoice_details, {
      method: "POST",
      body: JSON.stringify(CoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static getGroupInvoiceDetails(CoreData, callback) {
    fetch(config.getGroupInvoiceDetails, {
      method: "POST",
      body: JSON.stringify(CoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static getMemoDetails(client_id, id, callback) {
    fetch(config.getMemoDetails, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        credit_memo_id: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static create_salesorder(coreData, callback) {
  //   //kkkk

  //   ///kkk

  //   fetch(config.create_salesorder, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
  //       client_id: coreData.client_id,
  //       customer_id: coreData.customer_id,
  //       item_total_home_currency: coreData.item_total_home_currency,
  //       tax_amount_home_currency: coreData.tax_amount_home_currency,
  //       grand_total_home_currency: coreData.grand_total_home_currency,
  //       item_total_foreign_currency: coreData.item_total_foreign_currency,
  //       tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
  //       grand_total_foreign_currency: coreData.grand_total_foreign_currency,
  //       currency: coreData.currency,
  //       exchange_rate: coreData.exchange_rate,
  //       salesorder_date: coreData.salesorder_date,
  //       company_name: coreData.company_name,
  //       type: coreData.type,
  //       salesorder_number: coreData.salesorder_number,
  //       company_address: coreData.company_address,
  //       shipping_address: coreData.shipping_address,
  //       list_id: coreData.list_id,
  //       tagged_user_id: coreData.tagged_user_id,
  //       item_list: coreData.item_list,
  //       job_name: coreData.job_name,
  //       memo: coreData.memo,
  //       job_id: coreData.job_id,

  //       thanking_message: coreData.thanking_message,
  //       terms_and_conditions: coreData.terms_and_conditions,
  //       amount_in_words: coreData.amount_in_words,
  //       due_date: coreData.due_date,
  //       reference: coreData.reference,
  //       payment_amount: coreData.payment_amount,
  //       account: coreData.account,
  //       payment_exchange_rate: coreData.payment_exchange_rate,
  //       balance_sheet_category: coreData.balance_sheet_category,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static create_salesorder(coreData, callback) {

    let url = coreData.isInvoiceEditable ? config.update_salesorder : config.create_salesorder

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
        client_id: coreData.client_id,
        estimate_id: coreData.estimate_id,
        customer_id: coreData.customer_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        salesorder_date: coreData.invoice_date,
        company_name: coreData.company_name,
        type: coreData.type,
        salesorder_number: coreData.invoice_number,
        company_address: coreData.company_address,
        list_id: coreData.list_id,
        tagged_user_id: coreData.tagged_user_id,
        item_list: coreData.item_list,
        job_name: coreData.job_name,
        memo: coreData.memo,
        job_id: coreData.job_id,
        thrird_party_account_id: coreData.thrird_party_account_id,
        third_party_type: coreData.third_party_type,
        third_party_account_name: coreData.third_party_account_name,
        shipping_address: coreData.shipping_address,
        thanking_message: coreData.thanking_message,
        terms_and_conditions: coreData.terms_and_conditions,

        payment_date: coreData.payment_date,
        descripation: coreData.descripation,
        payment_method: coreData.payment_method,
        amount_in_words: coreData.amount_in_words,
        due_date: coreData.due_date,
        reference: coreData.reference,
        payment_amount: coreData.payment_amount,
        account: coreData.account,
        payment_exchange_rate: coreData.payment_exchange_rate,
        balance_sheet_category: coreData.balance_sheet_category,
        tax_inclusive: coreData.tax_inclusive,
        template_id: coreData.template_id,
        sales_order_id: coreData.sales_order_id,
        custom_header_fields: coreData.custom_header_fields,
        custom_footer_fields: coreData.custom_footer_fields,
        is_credit_limit_accepted: coreData.is_credit_limit_accepted ? coreData.is_credit_limit_accepted : 0,


      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static create_creditmemo(coreData, callback) {
    console.log('datago1',coreData)
    let url
    if (coreData.isEdit == true) {
      url = config.edit_creditmemo
    } else {
      url = config.create_creditmemo
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
        client_id: coreData.client_id,
        invoice_id: coreData.invoice_id,
        customer_id: coreData.customer_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        credit_date: coreData.credit_date,
        company_name: coreData.company_name,
        type: coreData.type,
        credit_number: coreData.credit_number,
        company_address: coreData.company_address,
        list_id: coreData.list_id,
        tagged_user_id: coreData.tagged_user_id,
        item_list: coreData.item_list,
        job_name: coreData.job_name,
        memo: coreData.memo,
        job_id: coreData.job_id,
        shipping_address: coreData.shipping_address,
        thanking_message: coreData.thanking_message,
        terms_and_conditions: coreData.terms_and_conditions,
        amount_in_words: coreData.amount_in_words,
        due_date: coreData.due_date,
        reference: coreData.reference,
        payment_amount: coreData.payment_amount,
        account: coreData.account,
        payment_exchange_rate: coreData.payment_exchange_rate,
        balance_sheet_category: coreData.balance_sheet_category,
        credit_memo_id: coreData.credit_memo_id,
        template_id: coreData.template_id,
        custom_header_fields: coreData.custom_header_fields,
        custom_footer_fields: coreData.custom_footer_fields,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // static create_purchaseorder(coreData, callback) {
  //   //kkkk

  //   ///kkk

  //   fetch(config.create_purchaseorder, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
  //       client_id: coreData.client_id,
  //       shipping_id: coreData.shipping_id,
  //       vendor_id: coreData.vendor_id,
  //       item_total_home_currency: coreData.item_total_home_currency,
  //       tax_amount_home_currency: coreData.tax_amount_home_currency,
  //       grand_total_home_currency: coreData.grand_total_home_currency,
  //       item_total_foreign_currency: coreData.item_total_foreign_currency,
  //       tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
  //       grand_total_foreign_currency: coreData.grand_total_foreign_currency,
  //       currency: coreData.currency,
  //       exchange_rate: coreData.exchange_rate,
  //       purchaseorder_date: coreData.purchaseorder_date,
  //       company_name: coreData.company_name,
  //       type: coreData.type,
  //       purchaseorder_number: coreData.purchaseorder_number,
  //       company_address: coreData.company_address,
  //       shipping_address: coreData.shipping_address,
  //       list_id: coreData.list_id,
  //       tagged_user_id: coreData.tagged_user_id,
  //       item_list: coreData.item_list,
  //       job_name: coreData.job_name,
  //       memo: coreData.memo,
  //       job_id: coreData.job_id,

  //       thanking_message: coreData.thanking_message,
  //       terms_and_conditions: coreData.terms_and_conditions,
  //       amount_in_words: coreData.amount_in_words,
  //       // due_date:coreData.due_date,
  //       // reference:coreData.reference,
  //       // payment_amount:coreData.payment_amount,
  //       // account:coreData.account,
  //       // payment_exchange_rate:coreData.payment_exchange_rate,
  //       // balance_sheet_category:coreData.balance_sheet_category
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static create_purchaseorder(coreData, callback) {
    let url = coreData.isInvoiceEditable ? config.update_purchase_order : config.create_purchaseorder

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
        client_id: coreData.client_id,
        customer_id: coreData.customer_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        purchaseorder_date: coreData.invoice_date,
        company_name: coreData.company_name,
        type: coreData.type,
        purchaseorder_number: coreData.invoice_number,
        company_address: coreData.company_address,
        list_id: coreData.list_id,
        tagged_user_id: coreData.tagged_user_id,
        item_list: coreData.item_list,
        job_name: coreData.job_name,
        memo: coreData.memo,
        job_id: coreData.job_id,
        thrird_party_account_id: coreData.thrird_party_account_id,
        third_party_type: coreData.third_party_type,
        third_party_account_name: coreData.third_party_account_name,
        shipping_address: coreData.shipping_address,
        thanking_message: coreData.thanking_message,
        terms_and_conditions: coreData.terms_and_conditions,

        payment_date: coreData.payment_date,
        descripation: coreData.descripation,
        payment_method: coreData.payment_method,
        amount_in_words: coreData.amount_in_words,
        due_date: coreData.due_date,
        reference: coreData.reference,
        payment_amount: coreData.payment_amount,
        account: coreData.account,
        payment_exchange_rate: coreData.payment_exchange_rate,
        balance_sheet_category: coreData.balance_sheet_category,
        tax_inclusive: coreData.tax_inclusive,
        vendor_id: coreData.vendor_id,
        template_id: coreData.template_id,
        purchase_order_id: coreData.purchase_order_id,
        custom_header_fields: coreData.custom_header_fields,
        custom_footer_fields: coreData.custom_footer_fields,
        is_credit_limit_accepted: coreData.is_credit_limit_accepted ? coreData.is_credit_limit_accepted : 0,


      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static cloud_vision_api(image_path, callback) {
    fetch(config.cloudvisionAPI, {
      method: "POST",
      body: JSON.stringify({
        image_path: image_path,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("testapi", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static forgotPwd(email_id, callback) {
    fetch(config.forgot_password_link, {
      method: "POST",
      body: JSON.stringify({
        email_id: email_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static inboxList(
    page,
    limit,
    status,
    client_id,
    filter_id,
    search,
    callback
  ) {

    let url
    if (localStorage.getItem("AllClientMail") == 'yes') {
      url = config.all_client_mail
    } else {
      url = config.inbox_list_link
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        page: page,
        limit: limit,
        status: status,
        client_id: client_id,
        filter_id: filter_id,
        search: search,
        user_id: localStorage.getItem("logged_user_id"),
        subscriber_ids: JSON.parse(localStorage.getItem("subscriber_ids")),
        all_client_mail_status: status == 5 ? 5 : 0

      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // Job Transaction
  static job_Transaction(
    client_id,
    customer_id,
    fromDate,
    toDate,
    job_id,
    show_id,
    callback
  ) {
    fetch(config.job_transaction, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        fromDate: fromDate,
        toDate: toDate,
        job_id: job_id,
        show_id: show_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("now", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static customer_Transaction(
    client_id,
    customer_id,
    fromDate,
    toDate,
    show_id,
    callback
  ) {
    fetch(config.customer_transaction, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        fromDate: fromDate,
        toDate: toDate,
        show_id: show_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("now", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //getbalancesheet
  //getbalancesheet
  static getbalancesheet(
    start_date,
    end_date,
    show_columns,
    client_id,
    sub_columns,
    filter_options,
    filter_id,
    sort_by_column_key,
    sort_by,
    report_type,
    previous_period_start_date,
    previous_period_end_date,
    callback
  ) {
    fetch(config.getbalancesheet, {
      method: "POST",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        show_columns: show_columns,
        client_id: client_id,
        sub_columns: sub_columns,
        filter_options: filter_options,
        filter_id: filter_id,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
        report_type: report_type,
        previous_period_start_date: previous_period_start_date,
        previous_period_end_date: previous_period_end_date
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //vendor_balance_Summary
  static vendor_balance_Summary(
    start_date,
    end_date,
    show_columns,
    client_id,
    sub_columns,
    filter_id,
    filter_options,
    sort_by_column_key,
    sort_by,
    callback
  ) {
    fetch(config.vendor_balance_Summary, {
      method: "POST",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        show_columns: show_columns,
        client_id: client_id,
        sub_columns: sub_columns,
        filter_id,
        filter_options,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // ap aging summary
  static ap_aging_summary(
    start_date,
    end_date,
    client_id,
    interval,
    duedays,
    filter_id,
    filter_options,
    callback
  ) {
    fetch(config.ap_aging_summary, {
      method: "POST",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        client_id: client_id,
        interval: interval,
        duedays: duedays,
        filter_id,
        filter_options,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getcustomersummary(
    start_date,
    end_date,
    show_columns,
    client_id,
    sub_columns,
    filter_id,
    filter_options,
    sort_by_column_key,
    sort_by,
    callback
  ) {
    fetch(config.customer_balance_summary, {
      method: "POST",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        show_columns: show_columns,
        client_id: client_id,
        sub_columns: sub_columns,
        filter_id: filter_id,
        filter_options: filter_options,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static all_report_name(callback) {
    fetch(config.all_report_name, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static payment_terms(callback) {
    fetch(config.payment_terms, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //gst detail report

  static gst_report_detail(
    start_date,
    end_date,
    show_columns,
    client_id,
    sub_columns,
    filter_id,
    filter_options,
    sort_by_column_key,
    sort_by,
    callback
  ) {
    fetch(config.gst_report_detail, {
      method: "POST",
      body: JSON.stringify({
        from_date: start_date,
        to_date: end_date,
        client_id: client_id,
        filter_id: filter_id,
        filter_options: filter_options,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //gst_report_summary

  static gst_report_summary(
    start_date,
    end_date,
    show_columns,
    client_id,
    sub_columns,
    filter_id,
    filter_options,
    sort_by_column_key,
    sort_by,
    callback
  ) {
    fetch(config.gst_report_summary, {
      method: "POST",
      body: JSON.stringify({
        from_date: start_date,
        to_date: end_date,
        client_id: client_id,
        filter_id: filter_id,
        filter_options: filter_options,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_paymenttype(coreData, callback) {
    //kkkk

    ///kkk

    fetch(config.payment_type, {
      method: "POST",
      body: JSON.stringify({
        // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
        name: coreData.name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static create_sales_invoice(coreData, callback) {
    //kkkk

    ///kkk

    fetch(config.create_sales_invoice, {
      method: "POST",
      body: JSON.stringify({
        // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
        client_id: coreData.client_id,
        estimate_id: coreData.estimate_id,
        sales_order_id: coreData.sales_order_id,
        customer_id: coreData.customer_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        invoice_date: coreData.invoice_date,
        company_name: coreData.company_name,
        type: coreData.type,
        invoice_number: coreData.invoice_number,
        company_address: coreData.company_address,
        list_id: coreData.list_id,
        tagged_user_id: coreData.tagged_user_id,
        item_list: coreData.item_list,
        sales_order_item_list:coreData.sales_order_item_list ? coreData.sales_order_item_list:[],
        estimate_item_list:coreData.estimate_item_list?coreData.estimate_item_list:[],
        job_name: coreData.job_name,
        memo: coreData.memo,
        job_id: coreData.job_id,
        thrird_party_account_id: coreData.thrird_party_account_id,
        third_party_type: coreData.third_party_type,
        third_party_account_name: coreData.third_party_account_name,
        shipping_address: coreData.shipping_address,
        thanking_message: coreData.thanking_message,
        terms_and_conditions: coreData.terms_and_conditions,

        payment_date: coreData.payment_date,
        descripation: coreData.descripation,
        payment_method: coreData.payment_method,
        amount_in_words: coreData.amount_in_words,
        due_date: coreData.due_date,
        reference: coreData.reference,
        payment_amount: coreData.payment_amount,
        account: coreData.account,
        payment_exchange_rate: coreData.payment_exchange_rate,
        balance_sheet_category: coreData.balance_sheet_category,
        tax_inclusive: coreData.tax_inclusive,
        template_id: coreData.template_id,

        custom_header_fields: coreData.custom_header_fields,
        custom_footer_fields: coreData.custom_footer_fields,
        your_extra_data: coreData.your_extra_data,
        is_credit_limit_accepted : coreData.is_credit_limit_accepted ?  coreData.is_credit_limit_accepted : 0,
        lock_date_password : coreData.lock_date_password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static update_sales_invoice(coreData, callback) {
    //kkkk

    ///kkk

    fetch(config.edit_sales_invoice, {
      method: "POST",
      body: JSON.stringify({
        // payment_date:'2020-03-12', amount_in_words:'twenty', payment_method:1,due_date:'2020-01-12',
        client_id: coreData.client_id,
        customer_id: coreData.customer_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        invoice_date: coreData.invoice_date,
        company_name: coreData.company_name,
        type: coreData.type,
        invoice_number: coreData.invoice_number,
        company_address: coreData.company_address,
        list_id: coreData.list_id,
        tagged_user_id: coreData.tagged_user_id,
        item_list: coreData.item_list,
        job_name: coreData.job_name,
        memo: coreData.memo,
        job_id: coreData.job_id,
        thrird_party_account_id: coreData.thrird_party_account_id,
        third_party_type: coreData.third_party_type,
        third_party_account_name: coreData.third_party_account_name,
        shipping_address: coreData.shipping_address,
        thanking_message: coreData.thanking_message,
        terms_and_conditions: coreData.terms_and_conditions,

        payment_date: coreData.payment_date,
        payment_method: coreData.payment_method,
        amount_in_words: coreData.amount_in_words,
        due_date: coreData.due_date,
        reference: coreData.reference,
        payment_amount: coreData.payment_amount,
        account: coreData.account,
        payment_exchange_rate: coreData.payment_exchange_rate,
        balance_sheet_category: coreData.balance_sheet_category,
        tax_inclusive: coreData.tax_inclusive,
        invoice_id: coreData.invoice_id,
        payment_id: coreData.payment_id,
        template_id: coreData.template_id,

        custom_header_fields: coreData.custom_header_fields,
        custom_footer_fields: coreData.custom_footer_fields,
        your_extra_data: coreData.your_extra_data,
        is_credit_limit_accepted : coreData.is_credit_limit_accepted ?  coreData.is_credit_limit_accepted : 0,
        lock_date_password : coreData.lock_date_password

      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //Filter Column

  static filter_column(report_id, client_id,filter_key_names, callback) {
    fetch(config.filter_column, {
      method: "POST",
      body: JSON.stringify({
        report_id: report_id,
        filter_key_names: filter_key_names,
        client_id:client_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // A/R aging summary
  static ar_aging_summary(
    start_date,
    end_date,
    client_id,
    interval,
    duedays,
    filter_id,
    filter_options,
    callback
  ) {
    fetch(config.ar_aging_summary, {
      method: "POST",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        client_id: client_id,
        interval: interval,
        duedays: duedays,
        filter_id: filter_id,
        filter_options: filter_options,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getItemDetails(list_id, status, client_id, callback) {
    fetch(config.get_item_details_link, {
      method: "POST",
      body: JSON.stringify({
        list_id: list_id,
        status: status,
        client_id: client_id,
        logged_in_user_id: localStorage.getItem("logged_user_id")
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static rejectBill(client_id, id, callback) {
    fetch(config.rejectBill, {
      method: "POST",
      body: JSON.stringify({
        list_id: id,

        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getFilePath(file_id, callback) {
    fetch(config.get_file_path_link, {
      method: "POST",
      body: JSON.stringify({
        file_id: file_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static addComment(
    comment_text,
    user_id,
    list_id,
    file_id,
    attachments,
    parent_comment_id,
    callback
  ) {
    console.log("attachments_before", attachments);
    let formData = new FormData();
    formData.append("comment_text", comment_text);
    formData.append("user_id", user_id);
    formData.append("list_id", list_id);
    formData.append("file_id", file_id);
    formData.append("parent_comment_id", parent_comment_id);
    if (attachments.length > 0) {
      for (var i = 0; i < attachments.length; i++) {
        formData.append("attachments", attachments[i]);
      }
    } else {
      formData.append("attachments", "");
    }

    console.log("attachments", attachments);

    fetch(config.add_comment_link, {
      method: "POST",
      body: formData,
      headers: {
        //"Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static saveNewDocument(
    client_id,
    user_id,
    title,
    description,
    attachments,
    callback
  ) {
    let formData = new FormData();
    formData.append("client_id", client_id);
    formData.append("user_id", user_id);
    formData.append("title", title);
    formData.append("description", description);
    for (var i = 0; i < attachments.length; i++) {
      formData.append("attachments", attachments[i]);
    }

    console.log("attachments", attachments);

    fetch(config.save_new_document, {
      method: "POST",
      body: formData,
      headers: {
        //"Content-type": "multipart/form-data; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getData(callback) {
    fetch(config.get_plan_list, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }



  static sentItems(client_id, page, limit, search, callback) {

    // for seperate api calls for accountant sent items and user user sent items

    let url;

    if (localStorage.getItem("AllClientMail") == 'yes') {
      url = config.all_client_mail
    } else {

      let role_permissions = JSON.parse(localStorage.getItem("role_permissions")) || [];
      if (role_permissions.includes(8) && role_permissions.includes(29)) {
        url = config.sent_items
      } else if (role_permissions.includes(29)) {
        url = config.accountant_sent_items
      } else if (role_permissions.includes(8)) {
        url = config.sent_items
      }

    }


    // for seperate api calls for accountant sent items and user user sent items

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        page: page,
        limit: limit,
        search: search,
        user_id: localStorage.getItem("logged_user_id"),
        subscriber_ids: JSON.parse(localStorage.getItem("subscriber_ids")),
        all_client_mail_status: 3
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //resolve_comment
  static resolve_comment(comment_id, list_id, user_id, callback) {
    fetch(config.resolve_comment, {
      method: "POST",
      body: JSON.stringify({
        comment_id,
        list_id,
        user_id: user_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static delete_user_role(role_id, callback) {
    fetch(config.delete_user_role, {
      method: "POST",
      body: JSON.stringify({
        role_id: role_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static getTableData(callback) {
    fetch(config.get_Table_Data, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static registerNewCompany(coreData, callback) {
    // alert('fetch')
    fetch(config.register_new_company, {
      method: "POST",
      body: JSON.stringify({
        entity_name: coreData.entity_name,
        address: coreData.address,
        state: coreData.state,
        country: coreData.country,
        email: coreData.email,
        phone: coreData.phone,
        home_currency: coreData.home_currency,
        country_code: coreData.country_code,
        entity_number: coreData.entity_number,
        incorporation_date: coreData.incorporation_date,
        principle_activities: coreData.principle_activities,
        entity_type: coreData.entity_type,
        first_name: coreData.first_name,
        last_name: coreData.last_name,
        company_email: coreData.company_email,
        company_phone: coreData.company_phone,
        password: coreData.password,
        plan_id: coreData.plan_id,
        subscription_start_date: coreData.subscription_start_date,
        subscription_end_date: coreData.subscription_end_date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_entity_types(callback) {
    fetch(config.get_entity_types, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static defaultcategorylist(client_id, callback) {
    fetch(config.default_category_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static defaultcategorylist2(a, client_id, callback) {
    fetch(config.default_category_list, {
      method: "POST",
      body: JSON.stringify({
        from_create_invoice: a,
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static get_invoice_template_list(template_id = 2, callback) {
    fetch(config.invoice_template_details, {
      method: "POST",
      body: JSON.stringify({
        template_id: template_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static set_default_template_id(client_id, template_id, is_default, callback) {
    fetch(config.set_default_invoice_template, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        template_id: template_id,
        is_default: is_default,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_duplicate_template(client_id, template_id, user_id,selected_template_type, callback) {
    fetch(config.duplicate_invoice_template, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        template_id,
        user_id,
        selected_template_type
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static get_edit_invoice_html(input, callback) {
    fetch(config.invoice_template_list, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_specific_invoice_html(template_id, callback) {
    fetch(config.invoice_template_details, {
      method: "POST",
      body: JSON.stringify({
        template_id: template_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static delete_invoice_template(client_id, template_id, callback) {
    fetch(config.remove_invoice_template, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        template_id: template_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static edit_invoice_template(coreData, callback) {
    console.log("jksdhhkj", coreData);
    fetch(config.edit_invoice_template, {
      method: "POST",
      body: JSON.stringify({
        user_id: coreData.user_id,
        template_name: coreData.template_name,
        client_id: coreData.client_id,
        properties: coreData.properties,
        template_id: coreData.template_id,
        html_content: coreData.html_content,
        save_as_copy: coreData.save_as_copy ? coreData.save_as_copy : 0 ,
        selected_template_type: coreData.selected_template_type ? coreData.selected_template_type : 0 ,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static save_invoice_template_draft(coreData, callback) {
    console.log("jksdhhkj", coreData);
    fetch(config.save_invoice_template_draft, {
      method: "POST",
      body: JSON.stringify({
        template_name: coreData.template_name,
        client_id: coreData.client_id,
        properties: coreData.properties,
        html_content: coreData.html_content,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static defaultcategorylist_onchange(search_key, client_id, callback) {
    fetch(config.default_category_list, {
      method: "POST",
      body: JSON.stringify({
        search_key: search_key,
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static defaultcategorylist_onchange2(
    search_key,
    from_create_invoice,
    client_id,
    callback
  ) {
    fetch(config.default_category_list, {
      method: "POST",
      body: JSON.stringify({
        search_key: search_key,
        from_create_invoice: from_create_invoice,
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static manual_journal_defaultcategorylist(
    search_key,
    from_create_invoice,
    client_id,
    callback
  ) {
    fetch(config.manual_journal_defaultcategorylist, {
      method: "POST",
      body: JSON.stringify({
        search_key: search_key,
        from_create_invoice: from_create_invoice,
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_defaultcategorylist(
    client_Id,
    from_create_invoice,
    search_key,
    callback
  ) {
    fetch(config.default_category_list, {
      method: "POST",
      body: JSON.stringify({
        search_key: search_key,
        from_create_invoice: from_create_invoice,
        client_id: client_Id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_asset_type_list(client_id, callback) {
    fetch(config.settings_asset_type_list, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_defaultNamelist(client_id, callback) {
    fetch(config.settings_defaultNamelist, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_gst_list(search_key, keyword, client_id, callback) {
    fetch(config.get_gst_list, {
      method: "POST",
      body: JSON.stringify({
        country_id: search_key,
        keyword: keyword,
        client_id: client_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //get coulmn heading
  static get_col(client_id,report_id, callback) {
    fetch(config.repot_column, {
      method: "POST",
      body: JSON.stringify({
        client_id:client_id,
        report_id: report_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_coulmnlist(report_name, callback) {
    fetch(config.show_column_option_list, {
      method: "POST",
      body: JSON.stringify({
        report_name: report_name,
        client_id: localStorage.getItem("logged_client_id") ? localStorage.getItem("logged_client_id") : ''
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static profit_and_loss_sub_columns(sub_columns, callback) {
    fetch(config.profit_and_loss_sub_columns, {
      method: "POST",
      body: JSON.stringify({
        sub_columns: sub_columns,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static balancesheetlist(client_id, callback) {
    fetch(config.balance_sheet_category_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static balancesheetlist_onchange(search_key, client_id, callback) {
    fetch(config.balance_sheet_category_list, {
      method: "POST",
      body: JSON.stringify({
        search_key: search_key,
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_categories(callback) {
    fetch(config.category_list, {
      method: "POST",
      body: "",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_SubCategory(category_id, from_create_invoice, callback) {
    fetch(config.sub_category_list, {
      method: "POST",
      body: JSON.stringify({
        category_id: category_id,
        from_create_invoice: from_create_invoice,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static get_manual_journal_SubCategory(category_id, from_create_invoice, callback) {
    fetch(config.get_manual_journal_SubCategory, {
      method: "POST",
      body: JSON.stringify({
        category_id: category_id,
        from_create_invoice: from_create_invoice,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static get_Accounttype(sub_category_id, callback) {
    fetch(config.account_type_list, {
      method: "POST",
      body: JSON.stringify({
        sub_category_id: sub_category_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_Accounttype2(sub_category_id, from_create_invoice, callback) {
    fetch(config.account_type_list, {
      method: "POST",
      body: JSON.stringify({
        sub_category_id: sub_category_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_sub_Accounttype(sub_Account_id, client_id, callback) {
    fetch(config.sub_account_list, {
      method: "POST",
      body: JSON.stringify({
        account_type_id: sub_Account_id,
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static save_NewAccountName(coreData, callback) {
    fetch(config.add_new_account_name, {
      method: "POST",
      body: JSON.stringify({
        client_id: coreData.client_id,
        status: 2,
        account_name: coreData.account_name,
        account_type_id: coreData.account_type_id,
        sub_category_id: coreData.sub_category_id,
        sub_account_id: coreData.sub_account_id,
        currency: coreData.currency,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static get_countries(callback) {
    fetch(config.get_countries, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static get_countries_phone_code(input,callback) {
    fetch(config.get_countries, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
      body: JSON.stringify(input),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static get_details_page_subscribers(callback) {
    fetch(config.get_details_page_subscribers, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static get_states(country_id, callback) {
    fetch(config.get_states, {
      method: "POST",
      body: JSON.stringify({
        country_id: country_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static checkPage(user_id, subscriber_id, callback) {
    fetch(config.checkPage, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        subscriber_id: subscriber_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static add_new_entity(create_entity, callback) {
    fetch(config.add_new_entity, {
      method: "POST",
      body: JSON.stringify({
        entity_name: create_entity,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static addUserRole(role_name, permissions, callback) {
    fetch(config.add_new_user_role, {
      method: "POST",
      body: JSON.stringify({
        role_name: role_name,
        permissions: permissions,
        client_id: localStorage.getItem("logged_client_id") ? localStorage.getItem("logged_client_id") : '',
        act_user_id: localStorage.getItem("logged_user_id") ? localStorage.getItem("logged_user_id") : '',
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // Get user role details

  static getUserRoles(callback) {
    fetch(config.get_user_role_list, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static editUserRole(role_id, role_name, permissions, callback) {
    fetch(config.edit_user_role, {
      method: "POST",
      body: JSON.stringify({
        role_id: role_id,
        role_name: role_name,
        permissions: permissions,
        client_id: localStorage.getItem("logged_client_id") ? localStorage.getItem("logged_client_id") : '',
        act_user_id: localStorage.getItem("logged_user_id") ? localStorage.getItem("logged_user_id") : '',
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // Customer list
  static customer_list(client_id, page, limit, search, filter_id, callback) {
    fetch(config.customerlist, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        page: page,
        limit: limit,
        search: search,
        filter_id: filter_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log('objsdghjgsjdject',typeof data.status)
        if (data.status == 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // Get vendor Names
  static getCustomerNames(client_id, callback) {
    fetch(config.customer_list_vendor, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //getBank statements
  static get_bankrule_list(client_id,bank_id,type, callback) {
    fetch(config.get_bankrule_list, {
      method: "POST",
      body: JSON.stringify({client_id:client_id,bank_id:bank_id,type:type}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static getBankstatements(coreData, callback) {
    fetch(config.bankstatment, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //getTransactions
  static getTransactions(coreData, callback) {
    fetch(config.accounttransaction, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //
  static getcashcoding(coreData, callback) {
    fetch(config.cashcoding, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //reConcileGetbankstatement
  static reConcileGetbankstatement(coreData, callback) {
    fetch(config.matchlist, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //bankaccoun
  static get_bankaccountlist(coreData, callback) {
    fetch(config.get_bankaccountlist, {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static customer_list_create_invoice(client_id, callback) {
    fetch(config.customer_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static deleteCustomer(client_id, customer_id, status_to_set, callback) {
    fetch(config.delete_customer, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        status_to_set: status_to_set,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static deleteCustomer_job(
    client_id,
    customer_id,
    job_id,
    status_to_set,
    callback
  ) {
    fetch(config.delete_job, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
        status_to_set: status_to_set,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //add new customer
  // static add_customer_preferred_payment(callback) {
  //   fetch(config.add_customer_preferred_payment, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  //refereal from
  static referel_from(callback) {
    fetch(config.referel_from, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //rep info
  static rep_info(callback) {
    fetch(config.rep_info, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //type_info
  static type_info(callback) {
    fetch(config.type_info, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //status info
  static status_info(client_id, callback) {
    fetch(config.status_info, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //currency
  static currencies(callback) {
    fetch(config.currency, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //getEmployeeType

  static customerTypes(callback) {
    fetch(config.customer_type_list, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static get_defaultPurchaseTaxLists(callback) {
  //   fetch(config.get_defaultPurchaseTaxLists, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  // static get_sales_tax_list(callback) {
  //   fetch(config.customer_sales_tax_list, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static purchaseDefaultAccountsList(client_id, callback) {
    fetch(config.purchase_defaultAccounts, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //salesDefaultAccountsList
  static salesDefaultAccountsList(client_id, callback) {
    fetch(config.sales_defaultAccounts, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static purchaseTaxSettingsList(callback) {
  //   fetch(config.purchase_tax_settings, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static salesTaxSettingsList(client_id, callback) {
    fetch(config.sales_tax_settings, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getFileCmnts(file_id, callback) {
    fetch(config.get_file_comments, {
      method: "POST",
      body: JSON.stringify({
        file_id: file_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static updateComment(comment_id, comment_text, user_id, callback) {
    fetch(config.update_comment, {
      method: "POST",
      body: JSON.stringify({
        comment_id: comment_id,
        comment_text: comment_text,
        user_id: user_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static deleteComment(comment_id, list_id, logged_in_user_id, callback) {
    fetch(config.delete_comment, {
      method: "POST",
      body: JSON.stringify({
        comment_id: comment_id,
        list_id: list_id,
        logged_in_user_id: logged_in_user_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static saveAndContinue(coreData, editData, callback) {
    let url;
    if (editData === true) {
      url = config.update_tagged_item;
    } else {
      url = config.save_tagged_item;
    }
    console.log("testt", coreData);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        client_id: coreData.client_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        sales_invoice_id: coreData.sales_invoice_id,
        type: coreData.type,
        list_id: coreData.list_id,
        file_id: coreData.file_id,
        tagged_user_id: coreData.tagged_user_id,
        company_name: coreData.company_name,
        invoice_number: coreData.invoice_number,
        company_address: coreData.company_address,
        invoice_date: coreData.invoice_date,
        account_category: coreData.account_category,
        balance_sheet_category: coreData.balance_sheet_category,
        item_list: coreData.item_list,
        payment_date: coreData.payment_date,
        reference: coreData.reference,
        amount_in_words: coreData.amount_in_words,
        payment_method: coreData.payment_method,
        descripation: coreData.descripation,
        payment_amount: coreData.payment_amount,
        payment_exchange_rate: coreData.payment_exchange_rate,
        // balance_sheet_category: coreData.balance_sheet_category,
        payment_account: coreData.payment_account,
        third_account_id: coreData.third_account_id,
        including_tax: coreData.including_tax,
        template_type: coreData.template_type,
        due_date: coreData.due_date,
        invoice_id: coreData.invoice_id,
        payment_id: coreData.payment_id,
        third_party_type: coreData.third_party_type,
        default_category: coreData.default_category,
        message: coreData.message,
        default_gst: coreData.default_gst,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static addVendorCredit(coreData, editData, callback) {
    let url;
    if (editData === true) {
      url = config.update_tagged_item;
    } else {
      url = config.save_tagged_item;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        client_id: coreData.client_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        type: coreData.type,
        list_id: coreData.list_id,
        file_id: coreData.file_id,
        sales_invoice_id: coreData.sales_invoice_id,
        tagged_user_id: coreData.tagged_user_id,
        company_name: coreData.company_name,
        invoice_number: coreData.invoice_number,
        company_address: coreData.company_address,
        invoice_date: coreData.invoice_date,
        account_category: coreData.account_category,
        balance_sheet_category: coreData.balance_sheet_category,
        item_list: coreData.item_list,
        payment_date: coreData.payment_date,
        reference: coreData.reference,
        amount_in_words: coreData.amount_in_words,
        payment_method: coreData.payment_method,
        payment_amount: coreData.payment_amount,
        payment_exchange_rate: coreData.payment_exchange_rate,
        // balance_sheet_category: coreData.balance_sheet_category,
        payment_account: coreData.payment_account,
        descripation: coreData.descripation,
        third_account_id: coreData.third_account_id,
        including_tax: coreData.including_tax,
        template_type: coreData.template_type,
        due_date: coreData.due_date,
        invoice_id: coreData.invoice_id,
        payment_id: coreData.payment_id,
        third_party_type: coreData.third_party_type,
        default_category: coreData.default_category,
        message: coreData.message,
        default_gst: coreData.default_gst,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static save_bill_as_vendor_credit(coreData, editData, callback) {
    let url = config.save_bill_as_vendor_credit
    // if (editData === true) {
    //   url = config.update_tagged_item;
    // } else {
    //   url = config.save_tagged_item;
    // }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        client_id: coreData.client_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        sales_invoice_id: coreData.sales_invoice_id,
        type: coreData.type,
        list_id: coreData.list_id,
        file_id: coreData.file_id,
        tagged_user_id: coreData.tagged_user_id,
        company_name: coreData.company_name,
        invoice_number: coreData.invoice_number,
        company_address: coreData.company_address,
        invoice_date: coreData.invoice_date,
        account_category: coreData.account_category,
        balance_sheet_category: coreData.balance_sheet_category,
        item_list: coreData.item_list,
        payment_date: coreData.payment_date,
        reference: coreData.reference,
        amount_in_words: coreData.amount_in_words,
        payment_method: coreData.payment_method,
        descripation: coreData.descripation,
        payment_amount: coreData.payment_amount,
        payment_exchange_rate: coreData.payment_exchange_rate,
        // balance_sheet_category: coreData.balance_sheet_category,
        payment_account: coreData.payment_account,
        third_account_id: coreData.third_account_id,
        including_tax: coreData.including_tax,
        template_type: coreData.template_type,
        due_date: coreData.due_date,
        invoice_id: coreData.invoice_id,
        payment_id: coreData.payment_id,
        third_party_type: coreData.third_party_type,
        default_category: coreData.default_category,
        message: coreData.message,
        default_gst: coreData.default_gst,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static save_tagged_item_draft(coreData, callback) {
    fetch(config.save_tagged_item_draft, {
      method: "POST",
      body: JSON.stringify({
        client_id: coreData.client_id,
        item_total_home_currency: coreData.item_total_home_currency,
        tax_amount_home_currency: coreData.tax_amount_home_currency,
        grand_total_home_currency: coreData.grand_total_home_currency,
        item_total_foreign_currency: coreData.item_total_foreign_currency,
        tax_amount_foreign_currency: coreData.tax_amount_foreign_currency,
        grand_total_foreign_currency: coreData.grand_total_foreign_currency,
        currency: coreData.currency,
        exchange_rate: coreData.exchange_rate,
        type: coreData.type,
        list_id: coreData.list_id,
        tagged_user_id: coreData.tagged_user_id,
        company_name: coreData.company_name,
        invoice_number: coreData.invoice_number,
        company_address: coreData.company_address,
        invoice_date: coreData.invoice_date,
        account_category: coreData.account_category,
        item_list: coreData.item_list,
        default_category: coreData.default_category,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_gst_details(coreData, callback) {
    fetch(config.add_gst_details, {
      method: "POST",
      body: JSON.stringify({
        sales_tax_code: coreData.sales_tax_code,
        sales_tax_name: coreData.sales_tax_name,
        show_on_list: coreData.show_on_list,
        tax_type: coreData.tax_type,
        rate: coreData.rate,
        rate_type: coreData.rate_type,
        country: coreData.country,
        client_id: coreData.client_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getSubCmmnts(comment_id, callback) {
    fetch(config.get_sub_comments, {
      method: "POST",
      body: JSON.stringify({
        comment_id: comment_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_country_id(client_id, callback) {
    fetch(config.get_client_country, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static get_manual_journal_next_number(client_id, callback) {
    fetch(config.get_manual_journal_next_number, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //get_invoice_column_list

  static get_invoice_column_list(client_id, callback) {
    fetch(config.get_invoice_column_list, {
      method: "POST",
      body: JSON.stringify({
        user_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_columns_list(client_id, callback) {
    fetch(config.get_tagging_column_list, {
      method: "POST",
      body: JSON.stringify({
        user_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_options_drop_down(client_id, type, value, callback) {
    fetch(config.add_dropdown_options, {
      method: "POST",
      body: JSON.stringify({
        user_id: client_id,
        options: value,
        column_id: type,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  getVendorNames;

  // Get vendor Names

  static getVendorNames(client_id, callback) {
    fetch(config.vendor_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static genearl_ledger(
    start_date,
    end_date,
    show_columns,
    client_id,
    sub_columns,
    filter_id,
    filter_options,
    sort_by_column_key,
    sort_by,
    report_type,
    callback
  ) {
    fetch(config.general_ledger, {
      method: "POST",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        client_id: client_id,
        filter_id: filter_id,
        filter_options: filter_options,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
        report_type: report_type
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static genearl_ledger_break(
    start_date,
    end_date,
    show_columns,
    account,
    client_id,
    sub_columns,
    filter_id,
    filter_options,
    sort_by_column_key,
    sort_by,
    account_type_id_array,
    category_id_array,
    breakdown_by,
    is_others,
    callback
  ) {
    fetch(config.general_ledger, {
      method: "POST",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        client_id: client_id,
        filter_id: filter_id,
        filter_options: filter_options,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
        account_type_id_array: account_type_id_array,
        category_id_array: category_id_array,
        breakdown_by: breakdown_by,
        is_others: is_others,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static unpaid_Bills(
    start_date,
    end_date,
    show_columns,
    client_id,
    sub_columns,
    filter_id,
    filter_options,
    sort_by_column_key,
    sort_by,
    callback
  ) {
    fetch(config.unpaid_Bills, {
      method: "POST",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        client_id: client_id,
        filter_id: filter_id,
        filter_options: filter_options,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //update customer

  // updateJob
  static updateJob(
    customer_name,
    customer_type,
    currency_type,
    open_balance,
    date_asofnow,
    company_name,
    bussiness_reg_no,
    currency_id,
    website_name,
    bank_ac_no,
    credit_limit,
    price_level,
    payment_terms,
    preferred_delivery_method,
    prefererd_payment_method,
    sales_tax_settings,
    sales_default_account,
    purchase_tax_settings,
    purchase_default_account,
    tax_id,
    bussiness_reg_no1,
    default_sales_tax_selected,
    defaultPurchaseTax_selected,
    referel_fromList_selected,
    rep_infoList_selected,
    decription_job,
    type_infoList_slected,
    status_infoList_selected,
    start_date,
    end_date,
    project_end_date,
    customer_id,

    primary_contact_person,
    primary_designation,
    primary_department,
    primary_phone_work,
    primary_phone_personel,
    primary_email_of,
    primary_skype,
    invoice_bill_to,
    shipping_address,
    shipping_addrs_name,
    shipping_adress_last,
    addressArray,
    contactArray,
    customerid,
    job_id,
    logged_user_id,
    contacts_to_remove,
    initialArrayAddress,
    callback
  ) {
    fetch(config.edit_job_api, {
      method: "POST",
      body: JSON.stringify({
        contact_to_remove: contacts_to_remove,
        address_to_remove: initialArrayAddress,
        user_id: logged_user_id,
        customer_id: customerid,
        job_id: job_id,

        job: {
          client_id: 1,
          job_name: customer_name,
          customer_type: customer_type,
          currency: currency_type,
          as_of: date_asofnow,
        },
        company: {
          company_name: company_name,
          business_reg_no: bussiness_reg_no,
          currency_id: currency_id,
          website: website_name,
        },
        contacts: contactArray,
        address: addressArray,
        // contacts: [
        //   {
        //     name: primary_contact_person,
        //     designation: primary_designation,
        //     department: primary_department,
        //     phone_work: primary_phone_work,
        //     phone_personal: primary_phone_personel,
        //     email: primary_email_of,
        //     skype: primary_skype,
        //     is_primary: true
        //   }
        // ],
        // address: [
        //   {
        //     shipping_address_name: shipping_addrs_name,
        //     shipping_address: shipping_address,
        //     is_default: true,
        //     billing_address: invoice_bill_to
        //   }
        // ],

        finance: {
          bank_account_no: bank_ac_no,
          credit_limit: credit_limit,
          price_level: price_level,
          payment_terms: payment_terms,
          preferred_delivery: preferred_delivery_method,
          preferred_payment: prefererd_payment_method,
          sales_tax: sales_tax_settings,
          sales_default_account: sales_default_account,
          purchase_tax: purchase_tax_settings,
          purchase_default_account: purchase_default_account,
          tax_id: tax_id,
          business_reg_no: bussiness_reg_no,
          default_sales_tax: default_sales_tax_selected,
          default_purchase_tax: defaultPurchaseTax_selected,
        },
        additional: {
          referral_from: referel_fromList_selected,
          rep: rep_infoList_selected,
          description: decription_job,
          type: type_infoList_slected,
          status: status_infoList_selected,
          start_date: start_date,
          end_date: end_date,
          project_end_date: project_end_date,
        },
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //addNew_Job
  static addNew_Job(
    customer_name,
    customer_type,
    currency_type,
    open_balance,
    date_asofnow,
    company_name,
    bussiness_reg_no,
    currency_id,
    website_name,
    bank_ac_no,
    credit_limit,
    price_level,
    payment_terms,
    preferred_delivery_method,
    prefererd_payment_method,
    sales_tax_settings,
    sales_default_account,
    purchase_tax_settings,
    purchase_default_account,
    tax_id,
    bussiness_reg_no1,
    default_sales_tax_selected,
    defaultPurchaseTax_selected,
    referel_fromList_selected,
    rep_infoList_selected,
    decription_job,
    type_infoList_slected,
    status_infoList_selected,
    start_date,
    end_date,
    project_end_date,
    customer_id,

    primary_contact_person,
    primary_designation,
    primary_department,
    primary_phone_work,
    primary_phone_personel,
    primary_email_of,
    primary_skype,
    invoice_bill_to,
    shipping_address,
    shipping_addrs_name,
    shipping_adress_last,
    addressArray,
    contactArray,
    customerid,
    job_id,
    logged_user_id,
    client_ids,
    callback
  ) {
    fetch(config.add_new_job, {
      method: "POST",
      body: JSON.stringify({
        user_id: logged_user_id,
        customer_id: customerid,
        job: {
          client_id: client_ids,
          job_name: customer_name,
          parent_job_id: job_id,
          customer_type: customer_type,
          currency: currency_type,
          opening_balance: open_balance,
          as_of: date_asofnow,
        },
        company: {
          company_name: company_name,
          business_reg_no: bussiness_reg_no,
          currency_id: currency_id,
          website: website_name,
        },
        contacts: contactArray,
        address: addressArray,
        // contacts: [
        //   {
        //     name: primary_contact_person,
        //     designation: primary_designation,
        //     department: primary_department,
        //     phone_work: primary_phone_work,
        //     phone_personal: primary_phone_personel,
        //     email: primary_email_of,
        //     skype: primary_skype,
        //     is_primary: true
        //   }
        // ],
        // address: [
        //   {
        //     shipping_address_name: shipping_addrs_name,
        //     shipping_address: shipping_address,
        //     is_default: true,
        //     billing_address: invoice_bill_to
        //   }
        // ],

        finance: {
          bank_account_no: bank_ac_no,
          credit_limit: credit_limit,
          price_level: price_level,
          payment_terms: payment_terms,
          preferred_delivery: preferred_delivery_method,
          preferred_payment: prefererd_payment_method,
          sales_tax: sales_tax_settings,
          sales_default_account: sales_default_account,
          purchase_tax: purchase_tax_settings,
          purchase_default_account: purchase_default_account,
          tax_id: tax_id,
          business_reg_no: bussiness_reg_no,
          default_sales_tax: default_sales_tax_selected,
          default_purchase_tax: defaultPurchaseTax_selected,
        },
        additional: {
          referral_from: referel_fromList_selected,
          rep: rep_infoList_selected,
          description: decription_job,
          type: type_infoList_slected,
          status: status_infoList_selected,
          start_date: start_date,
          end_date: end_date,
          project_end_date: project_end_date,
        },
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static customer_balance_sheet(
    start_date,
    end_date,
    show_columns,
    client_id,
    sub_columns,
    filter_id,
    filter_options,
    sort_type,
    selectedName,
    callback
  ) {
    fetch(config.customer_balance_sheet, {
      method: "POST",
      body: JSON.stringify({
        fromDate: start_date,
        toDate: end_date,
        client_id: client_id,
        filter_id: filter_id,
        filter_options: filter_options,
        sort_by: sort_type,
        sort_by_column_key: selectedName,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //open invoice detail

  //open invoice detail

  static open_invoices(
    start_date,
    end_date,
    show_columns,
    client_id,
    sub_columns,
    filter_id,
    filter_options,
    sort_by_column_key,
    sort_by,
    callback
  ) {
    fetch(config.open_invoices, {
      method: "POST",
      body: JSON.stringify({
        fromDate: start_date,
        toDate: end_date,
        client_id: client_id,
        filter_id: filter_id,
        filter_options: filter_options,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //vendor balance sheet
  static vendor_balance_detail(
    start_date,
    end_date,
    show_columns,
    client_id,
    sub_columns,
    filter_id,
    filter_options,
    sort_by_column_key,
    sort_by,
    callback
  ) {
    fetch(config.vendor_balance_detail, {
      method: "POST",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        client_id: client_id,
        filter_id,
        filter_options,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static customer_balance_sheetrep (
  //   start_date,
  //   end_date,
  //   show_columns,
  //   client_id,
  //   sub_columns,
  //   callback
  // ) {
  //   fetch(config.customer_balance_sheet, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       fromDate: '2020-01-01',
  //       toDate: '2020-01-31',
  //       client_id: 1
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //       Authorization: authorization_key
  //     }
  //   })
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       if (data.status === 1) {
  //         callback(null, data)
  //       } else {
  //         callback(null, data)
  //       }
  //     })
  // }
  //balance sheet summary

  static customer_balance_summary(
    client_id,
    startDate,
    endDate,
    showCol,
    callback
  ) {
    fetch(config.customer_balance_summary, {
      method: "POST",
      body: JSON.stringify({
        client_id: 1,
        start_date: startDate,
        end_date: endDate,
        show_columns: 3,
        sub_coloumn: [1],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static reports_list(
    client_id,
    startDate,
    endDate,
    showCol,
    filter_id,
    filter_options,
    sort_by_column_key,
    sort_by,
    sub_columns,
    report_type,
    previous_period_start_date,
    previous_period_end_date,
    callback
  ) {
    // alert(startDate)
    fetch(config.reports_api, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        start_date: startDate,
        end_date: endDate,
        show_columns: showCol,
        filter_id: filter_id,
        filter_options: filter_options,
        sort_by_column_key: sort_by_column_key,
        sort_by: sort_by,
        sub_columns: sub_columns,
        report_type: report_type,
        previous_period_start_date: previous_period_start_date,
        previous_period_end_date: previous_period_end_date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static Recent_Items(client_id, customer_id, callback) {
    fetch(config.recent_Items, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Recent_Items", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //p&l breakdown
  static profit_and_loss_break_by_account(input, callback) {
    fetch(config.profit_and_loss_break_by_account, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Recent_Items", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //statement in customer details
  static Statement(client_id, customer_id, from_date, to_date, show_id, callback) {
    fetch(config.Statement_details, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        fromDate: from_date,
        toDate: to_date,
        show_id: show_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("statementss", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //  Basic_info

  static Basic_info(client_id, customer_id, callback) {
    fetch(config.Basic_Info, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_accounts_dropdown(account_type_id, client_id, callback) {
    fetch(config.sub_account_list, {
      method: "POST",
      body: JSON.stringify({
        account_type_id: account_type_id,
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //make active
  static makeActive(client_id, customer_id, callback) {
    fetch(config.make_customer_active, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // deleteNote
  static deleteNote(note_id, client_id, callback) {
    fetch(config.delete_notes, {
      method: "POST",
      body: JSON.stringify({
        note_id: note_id,
        // login_id:login_id
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // updateNotes
  static updateNotes(
    client_id,
    customer_id,
    contacts,
    notes,
    job_id,
    note_name,
    user_id,
    note_id,
    callback
  ) {
    fetch(config.update_notes, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        contacts: contacts,
        notes: notes,
        job_id: job_id,
        note_name: note_name,
        user_id: user_id,
        note_id: note_id,
        // login_id:login_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static createNotes(
    client_id,
    customer_id,
    contacts,
    notes,
    job_id,
    note_name,
    user_id,
    callback
  ) {
    fetch(config.create_notes, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        contacts: contacts,
        notes: notes,
        job_id: job_id,
        note_name: note_name,
        user_id: user_id,
        // login_id:login_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // Recent Items Job

  static Recent_Items_job(client_id, customer_id, job_id, callback) {
    fetch(config.job_recent_invoices, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Recent_Items", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // Basic info Job
  static Basic_info_job(client_id, customer_id, job_id, callback) {
    fetch(config.customer_job_list_by_id, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // Get Notes

  static getNotes(client_id, customer_id, search, job_id, callback) {
    fetch(config.notes_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        search: search,
        job_id: job_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // Get Job List

  static getJobList(client_id, customer_id, callback) {
    fetch(config.customer_job_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // static customer_Transaction(
  //   client_id,
  //   customer_id,
  //   fromDate,
  //   toDate,
  //   callback
  // ) {
  //   fetch(config.customer_transaction, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       client_id: client_id,
  //       customer_id: customer_id,
  //       fromDate: fromDate,
  //       toDate: toDate,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("now", data);
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }
  static show_column_option_list(user, req, callback) {
    fetch(config.show_column_option_list, {
      method: "POST",
      body: JSON.stringify({
        report_name: "profit_and_loss",
        client_id: localStorage.getItem("logged_client_id") ? localStorage.getItem("logged_client_id") : ''
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //   vendormodule
  //   vendor list

  static getVendorList(
    client_id,
    page,
    limit,
    search,
    //fromDate,
    //toDate,
    filter_id,
    callback
  ) {
    fetch(config.vendor_details, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        page: page,
        limit: limit,
        search: search,
        //  fromDate: fromDate,
        //  toDate: toDate,
        filter_id: filter_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data1) => {
        if (data1.status === 1) {
          callback(null, data1);
        } else {
          callback(null, data1);
        }
      });
  }

  static vendorTypes(client_id, callback) {
    fetch(config.vendor_type_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("manoj", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static vendorPaymentTerms(client_id, callback) {
    fetch(config.vendor_paymentTerms, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("manoj", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //vendor sales tax
  static vendor_sales_tax_list(client_id, callback) {
    fetch(config.vendor_sales_tax, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("vendorss", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //vendor purchase tax
  static vendor_purchase_tax_list(client_id, callback) {
    fetch(config.vendor_purchase_tax, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("vendorsss", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //vendor basic info
  static vendor_basic_info(client_id, vendor_id, callback) {
    fetch(config.vendor_basic_info, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        vendor_id: vendor_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("vendor_id", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //vendor_transaction

  static vendor_transaction(client_id, vendor_id, fromDate, toDate, show_id, callback) {
    fetch(config.vendor_transaction, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        vendor_id: vendor_id,
        fromDate: fromDate,
        toDate: toDate,
        show_id: show_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("vendor_transaction", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //vendor_notes

  static vendor_notes(client_id, vendor_id, search_key, callback) {
    fetch(config.vendor_notes, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        vendor_id: vendor_id,
        search_key: search_key,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("vendor_notes", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //vendor_recent_items

  static vendor_recent_items(client_id, vendor_id, callback) {
    fetch(config.vendor_recent_items, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        vendor_id: vendor_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("vendor_notes", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //   // create vendor notes
  static create_vendor_Notes(
    client_id,
    vendor_id,
    user_id,
    notes,
    note_title,
    contact,
    callback
  ) {
    fetch(config.create_vendor_notes, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        vendor_id: vendor_id,
        user_id: user_id,
        notes: notes,
        note_title: note_title,
        contact: contact,
        // login_id:login_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("notescreate", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // update vendor Notes
  static update_vendor_Notes(
    client_id,
    user_id,
    notes,
    note_title,
    notes_id,
    vendor_id,
    contact,
    callback
  ) {
    fetch(config.update_vendor_notes, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        user_id: user_id,
        notes: notes,
        note_title: note_title,
        notes_id: notes_id,
        vendor_id: vendor_id,
        contact: contact,
        // login_id:login_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("update vendor notes", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // deleteNote
  static delete_vendor_Note(notes_id, vendor_id, callback) {
    fetch(config.delete_vendor_notes, {
      method: "POST",
      body: JSON.stringify({
        notes_id: notes_id,
        vendor_id: vendor_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("delete vendor", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //vendor statement

  static vendor_statement(client_id, vendor_id, from_date, to_date, show_id, callback) {
    fetch(config.vendor_statement, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        vendor_id: vendor_id,
        fromDate: from_date,
        toDate: to_date,
        show_id: show_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("statementss", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // add new vendor

  static addNew_Vendor(
    customer_name,
    customer_type_selected,
    open_balance,
    date_asofnow,

    company_name,
    bussiness_reg_no,
    currency_type,
    currency_id,
    website_name,

    primary_contact_person,
    primary_designation,
    primary_department,
    primary_phone_work,
    primary_phone_personel,
    primary_email_of,
    primary_skype,

    invoice_bill_to,
    shipping_address,
    shipping_addrs_name,
    shipping_adress_last,

    bank_ac_no,
    credit_limit,
    price_level,
    payment_terms,

    Bank_Account_No,
    IFSC_Code,

    tax_id,
    bussiness_reg_no_finance,
    default_sales_tax_selected,
    defaultPurchaseTax_selected,
    addressArray,
    contactArray,
    user_id,
    client_id,

    callback
  ) {
    console.log("kss", addressArray);
    console.log("ksss", contactArray);
    fetch(config.add_new_vendor, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        vendor: {
          client_id: client_id,
          vendor_name: customer_name,
          currency: currency_type,
          vendor_type: customer_type_selected,
          opening_balance: open_balance,
          as_of: date_asofnow,
        },
        company: {
          company_name: company_name,
          business_reg_no: bussiness_reg_no,
          currency_id: currency_id,
          website: website_name,
        },
        contacts: contactArray,
        address: addressArray,
        finance: {
          name_on_cheque: bank_ac_no,
          bank_account_no: Bank_Account_No,
          credit_limit: credit_limit,
          billing_rate_level: price_level,
          payment_terms: payment_terms,
          ifsc_code: IFSC_Code,
          tax_id: tax_id,
          business_reg_no: bussiness_reg_no_finance,
          default_sales_tax: default_sales_tax_selected,
          default_purchase_tax: defaultPurchaseTax_selected,
        },
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        console.log("hiid", response);
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //make vendor active
  //make active
  static make_vendor_active(client_id, vendor_id, callback) {
    fetch(config.make_vendor_active, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        vendor_id: vendor_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // make vendor inactive

  static make_vendor_inactive(client_id, vendor_id, status_to_set, callback) {
    // alert('hiiii')
    fetch(config.make_vendor_inactive, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        vendor_id: vendor_id,
        status_to_set: status_to_set,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_infoww", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // edit vendor

  //update vendor
  static edit_vendor(
    customer_name,
    customer_type_selected,
    open_balance,
    date_asofnow,

    company_name,
    bussiness_reg_no,
    currency_type,
    currency_id,
    website_name,

    primary_contact_person,
    primary_designation,
    primary_department,
    primary_phone_work,
    primary_phone_personel,
    primary_email_of,
    primary_skype,

    invoice_bill_to,
    shipping_address,
    shipping_addrs_name,
    shipping_adress_last,

    bank_ac_no,
    credit_limit,
    price_level,
    payment_terms,

    Bank_Account_No,
    IFSC_Code,

    tax_id,
    bussiness_reg_no_finance,
    default_sales_tax_selected,
    defaultPurchaseTax_selected,
    addressArray,
    contactArray,
    user_id,
    client_id,
    vendor_id,
    contactsToremove,
    addressToremove,
    callback
  ) {
    fetch(config.edit_vendor, {
      method: "POST",
      body: JSON.stringify({
        vendor_id: vendor_id,
        contact_to_remove: contactsToremove,
        address_to_remove: addressToremove,
        vendor: {
          client_id: client_id,
          vendor_name: customer_name,
          currency: currency_type,
          vendor_type: customer_type_selected,
          opening_balance: open_balance,
          as_of: date_asofnow,
        },
        company: {
          company_name: company_name,
          business_reg_no: bussiness_reg_no,
          currency_id: currency_id,
          website: website_name,
        },
        contacts: contactArray,
        address: addressArray,
        finance: {
          name_on_cheque: bank_ac_no,
          bank_account_no: Bank_Account_No,
          credit_limit: credit_limit,
          billing_rate_level: price_level,
          payment_terms: payment_terms,
          ifsc_code: IFSC_Code,
          tax_id: tax_id,
          business_reg_no: bussiness_reg_no_finance,
          default_sales_tax: default_sales_tax_selected,
          default_purchase_tax: defaultPurchaseTax_selected,
        },
        act_user_id: localStorage.getItem("logged_user_id") ? localStorage.getItem("logged_user_id") : ''
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static getDepartmentList(client_id, callback) {
    fetch(config.employee_department_list, {
      method: "POST",
      body: JSON.stringify({ client_id }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //payment method
  static getPaymethod(callback) {
    fetch(config.payment_method, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static getEmployeeType(client_id, callback) {
    fetch(config.employee_type, {
      method: "POST",
      body: JSON.stringify({ client_id }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static getPaymentMethodEmp(client_id, callback) {
    fetch(config.payment_method_employee, {
      method: "POST",
      body: JSON.stringify({ client_id }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          console.log("zxjhzjhzx", data);
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getPayrollFrequency(client_id, callback) {
    fetch(config.payroll_frequncy, {
      method: "POST",
      body: JSON.stringify({ client_id }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          console.log("zxjhzjhzx", data);
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getVariabletPayrollFrequency(client_id, callback) {
    fetch(config.getVariabletPayrollFrequency, {
      method: "POST",
      body: JSON.stringify({ client_id }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          console.log("zxjhzjhzx", data);
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static employee_create_notes(
  //   employee_id,
  //   client_id,
  //   //contacts,
  //   user_id,
  //   notes,
  //   note_title,
  //   callback
  // ) {
  //   fetch(config.employee_create_notes, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       employee_id: employee_id,
  //       client_id: client_id,
  //       user_id: user_id,
  //       notes: notes,
  //       note_title: note_title,

  //       // login_id:login_id
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("notescreate", data);
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static employeeList(client_id, page, limit, search, filter_id, callback) {
    fetch(config.employeelist, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        page: page,
        limit: limit,
        search: search,
        filter_id: filter_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log('objsdghjgsjdject',typeof data.status)
        if (data.status == 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getOfficeLocationList(client_id, callback) {
    fetch(config.employee_office_list, {
      method: "POST",
      body: JSON.stringify({ client_id }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          console.log("zxjhzjhzx", data);
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getShiftList(client_id, callback) {
    fetch(config.employee_shift_type, {
      method: "POST",
      body: JSON.stringify({ client_id }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          console.log("zxjhzjhzx", data);
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getSalaryType(client_id, callback) {
    fetch(config.salary_type, {
      method: "POST",
      body: JSON.stringify({ client_id }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          console.log("zxjhzjhzx", data);
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static variable_freq_type(client_id, callback) {
    fetch(config.variable_freq_type, {
      method: "POST",
      body: JSON.stringify({ client_id }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          console.log("zxjhzjhzx", data);
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static employee_update(
    first_name,
    last_name,
    identification_no,
    gender,
    date_of_birth,
    client_id,
    employee_code,
    date_of_joining,
    date_of_releave,
    department,
    designation,
    employee_type,
    shift,
    office_location,
    account_no,
    ifsc_code,
    permanent_address,
    residential_address,
    salary,
    salary_type,
    variable_pay,
    variable_pay_type,
    varibale_pay_frequency,
    variable_pay_notes,
    payroll_frequency,
    payment_method,
    wrkcontactArray,
    effective_date,
    personaladdress,
    callback
  ) {
    fetch(config.employee_update, {
      method: "POST",
      body: JSON.stringify({
        employee_id: localStorage.getItem("employeeid"),
        basic_info: {
          client_id: 1,

          first_name: first_name,
          last_name: last_name,
          identification_no: identification_no,
          gender: gender,
          date_of_birth: date_of_birth,
          client_id: client_id,
        },
        work_info: {
          employee_code: employee_code,
          date_of_joining: date_of_joining,
          date_of_releave: date_of_releave,
          department: department,
          designation: designation,
          employee_type: employee_type,
          shift: shift,
          office_location: office_location,
        },
        bank_infos: {
          account_no: account_no,
          ifsc_code: ifsc_code,
        },
        contact_info: {
          permanent_address: permanent_address,
          residential_address: residential_address,
        },

        personal_contacts: personaladdress,

        work_contacts: wrkcontactArray,

        finance_info: {
          effective_date: effective_date,
          salary: salary,
          salary_type: salary_type,
          variable_pay: variable_pay,
          variable_pay_type: variable_pay_type,
          varibale_pay_frequency: varibale_pay_frequency,
          variable_pay_notes: variable_pay_notes,
          payroll_frequency: payroll_frequency,
          payment_method: payment_method,
        },
        act_user_id: localStorage.getItem("logged_user_id") ? localStorage.getItem("logged_user_id") : ''
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static addEmployee(
    first_name,
    last_name,
    identification_no,
    gender,
    date_of_birth,
    client_id,
    employee_code,
    date_of_joining,
    date_of_releave,
    department,
    designation,
    employee_type,
    shift,
    office_location,
    bankDet,
    permanent_address,
    residential_address,
    salary,
    salary_type,
    variable_pay,
    variable_pay_type,
    varibale_pay_frequency,
    variable_pay_notes,
    payroll_frequency,
    payment_method,
    wrkcontactArray,
    effective_date,
    personnalcontactArray,
    callback
  ) {
    fetch(config.employee_create, {
      method: "POST",
      body: JSON.stringify({
        basic_info: {
          first_name: first_name,
          last_name: last_name,
          identification_no: identification_no,
          gender: gender,
          date_of_birth: date_of_birth,
          client_id: client_id,
        },
        work_info: {
          employee_code: employee_code,
          date_of_joining: date_of_joining,
          date_of_releave: date_of_releave,
          department: department,
          designation: designation,
          employee_type: employee_type,
          shift: shift,
          office_location: office_location,
        },
        bank_infos: {
          ...bankDet
        },
        contact_info: {
          permanent_address: permanent_address,
          residential_address: residential_address,
        },

        personal_contacts: personnalcontactArray,

        work_contacts: wrkcontactArray,

        finance_info: {
          effective_date: effective_date,
          salary: salary,
          salary_type: salary_type,
          variable_pay: variable_pay,
          variable_pay_type: variable_pay_type,
          varibale_pay_frequency: varibale_pay_frequency,
          variable_pay_notes: variable_pay_notes,
          payroll_frequency: payroll_frequency,
          payment_method: payment_method,
        },
        act_user_id: localStorage.getItem("logged_user_id") ? localStorage.getItem("logged_user_id") : ''
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static customer_list(client_id, page, limit, search, filter_id, callback) {
    fetch(config.customerlist, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        page: page,
        limit: limit,
        search: search,
        filter_id: filter_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log('objsdghjgsjdject',typeof data.status)
        if (data.status == 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static deliveryMethodList(client_id, callback) {
    fetch(config.delivery_method_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static addNew_Customer(
    customer_name,
    customer_type,
    currency_type,
    open_balance,
    date_asofnow,
    company_name,
    bussiness_reg_no,
    currency_id,
    website_name,
    bank_ac_no,
    credit_limit,
    price_level,
    payment_terms,
    preferred_delivery_method,
    prefererd_payment_method,
    sales_tax_settings,
    sales_default_account,
    purchase_tax_settings,
    purchase_default_account,
    tax_id,
    bussiness_reg_no1,
    default_sales_tax_selected,
    defaultPurchaseTax_selected,
    referel_fromList_selected,
    rep_infoList_selected,
    decription_job,
    type_infoList_slected,
    status_infoList_selected,
    start_date,
    end_date,
    project_end_date,
    customer_id,

    primary_contact_person,
    primary_designation,
    primary_department,
    primary_phone_work,
    primary_phone_personel,
    primary_email_of,
    primary_skype,
    invoice_bill_to,
    shipping_address,
    shipping_addrs_name,
    shipping_adress_last,
    addressArray,
    contactArray,
    user_id,
    clientId,
    callback
  ) {
    fetch(config.add_new_customer, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        customer: {
          client_id: clientId,
          name: customer_name,
          customer_type: customer_type,
          currency: currency_type,
          opening_balance: open_balance,
          as_of: date_asofnow,
        },
        company: {
          company_name: company_name,
          business_reg_no: bussiness_reg_no,
          currency_id: currency_id,
          website: website_name,
        },
        contacts: contactArray,
        address: addressArray,
        // contacts: [
        //   {
        //     name: primary_contact_person,
        //     designation: primary_designation,
        //     department: primary_department,
        //     phone_work: primary_phone_work,
        //     phone_personal: primary_phone_personel,
        //     email: primary_email_of,
        //     skype: primary_skype,
        //     is_primary: true
        //   }
        // ],
        // address: [
        //   {
        //     shipping_address_name: shipping_addrs_name,
        //     shipping_address: shipping_address,
        //     is_default: true,
        //     billing_address: invoice_bill_to
        //   }
        // ],

        finance: {
          bank_account_no: bank_ac_no,
          credit_limit: credit_limit,
          price_level: price_level,
          payment_terms: payment_terms,
          preferred_delivery: preferred_delivery_method,
          preferred_payment: prefererd_payment_method,
          sales_tax: sales_tax_settings,
          sales_default_account: sales_default_account,
          purchase_tax: purchase_tax_settings,
          purchase_default_account: purchase_default_account,
          tax_id: tax_id,
          business_reg_no: bussiness_reg_no,
          default_sales_tax: default_sales_tax_selected,
          default_purchase_tax: defaultPurchaseTax_selected,
        },
        additional: {
          referral_from: referel_fromList_selected,
          rep: rep_infoList_selected,
          description: decription_job,
          type: type_infoList_slected,
          status: status_infoList_selected,
          start_date: start_date,
          end_date: end_date,
          project_end_date: project_end_date,
        },
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static salesTaxSettingsList(callback) {
  //   fetch(config.sales_tax_settings, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  // static salesDefaultAccountsList(callback) {
  //   fetch(config.sales_defaultAccounts, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static purchaseTaxSettingsList(client_id, callback) {
    fetch(config.purchase_tax_settings, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static purchaseDefaultAccountsList(callback) {
  //   fetch(config.purchase_defaultAccounts, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static get_sales_tax_list(client_id, callback) {
    fetch(config.customer_sales_tax_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_defaultPurchaseTaxLists(client_id, callback) {
    fetch(config.get_defaultPurchaseTaxLists, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static referel_from(client_id, callback) {
    fetch(config.referel_from, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static rep_info(client_id, callback) {
    fetch(config.rep_info, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static type_info(client_id, callback) {
    fetch(config.type_info, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static status_info(callback) {
  //   fetch(config.status_info, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  // static customer_Transaction(
  //   client_id,
  //   customer_id,
  //   fromDate,
  //   toDate,
  //   callback
  // ) {
  //   fetch(config.customer_transaction, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       client_id: client_id,
  //       customer_id: customer_id,
  //       fromDate: fromDate,
  //       toDate: toDate,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("now", data);
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static Recent_Items(client_id, customer_id, callback) {
    fetch(config.recent_Items, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Recent_Items", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static Basic_info(client_id, customer_id, callback) {
    fetch(config.Basic_Info, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static updateCustomer(
    input,
    callback
  ) {
    fetch(config.update_customer, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static currencies(callback) {
    fetch(config.currency, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static customerTypes(callback) {
    fetch(config.customer_type_list, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getJobList(client_id, customer_id, callback) {
    fetch(config.customer_job_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static job_Transaction(
  //   client_id,
  //   customer_id,
  //   fromDate,
  //   toDate,
  //   job_id,
  //   callback
  // ) {
  //   fetch(config.job_transaction, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       client_id: client_id,
  //       customer_id: customer_id,
  //       fromDate: fromDate,
  //       toDate: toDate,
  //       job_id: job_id,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("now", data);
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static Recent_Items_job(client_id, customer_id, job_id, callback) {
    fetch(config.job_recent_invoices, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Recent_Items", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getNotes(client_id, customer_id, search, job_id, callback) {
    fetch(config.notes_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        search: search,
        job_id: job_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static Statement(client_id, customer_id, from_date, to_date, callback) {
  //   fetch(config.Statement_details, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       client_id: client_id,
  //       customer_id: customer_id,
  //       fromDate: from_date,
  //       toDate: to_date,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("statementss", data);
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  // static Basic_info_job(client_id, customer_id, job_id, callback) {
  //   fetch(config.customer_job_list_by_id, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       client_id: client_id,
  //       customer_id: customer_id,
  //       job_id: job_id,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Basic_info", data);
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static deleteCustomer(client_id, customer_id, status_to_set, callback) {
    fetch(config.delete_customer, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        status_to_set: status_to_set,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static deleteCustomer_job(
    client_id,
    customer_id,
    job_id,
    status_to_set,
    callback
  ) {
    fetch(config.delete_job, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
        status_to_set: status_to_set,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static createNotes(
    client_id,
    customer_id,
    contacts,
    notes,
    job_id,
    note_name,
    user_id,
    callback
  ) {
    fetch(config.create_notes, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        contacts: contacts,
        notes: notes,
        job_id: job_id,
        note_name: note_name,
        user_id: user_id,
        // login_id:login_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getCustomerNames(client_id, callback) {
    fetch(config.customer_list_vendor, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static addNew_Job(
  //   customer_name,
  //   customer_type,
  //   currency_type,
  //   open_balance,
  //   date_asofnow,
  //   company_name,
  //   bussiness_reg_no,
  //   currency_id,
  //   website_name,
  //   bank_ac_no,
  //   credit_limit,
  //   price_level,
  //   payment_terms,
  //   preferred_delivery_method,
  //   prefererd_payment_method,
  //   sales_tax_settings,
  //   sales_default_account,
  //   purchase_tax_settings,
  //   purchase_default_account,
  //   tax_id,
  //   bussiness_reg_no1,
  //   default_sales_tax_selected,
  //   defaultPurchaseTax_selected,
  //   referel_fromList_selected,
  //   rep_infoList_selected,
  //   decription_job,
  //   type_infoList_slected,
  //   status_infoList_selected,
  //   start_date,
  //   end_date,
  //   project_end_date,
  //   customer_id,

  //   primary_contact_person,
  //   primary_designation,
  //   primary_department,
  //   primary_phone_work,
  //   primary_phone_personel,
  //   primary_email_of,
  //   primary_skype,
  //   invoice_bill_to,
  //   shipping_address,
  //   shipping_addrs_name,
  //   shipping_adress_last,
  //   addressArray,
  //   contactArray,
  //   customerid,
  //   job_id,
  //   logged_user_id,
  //   callback
  // ) {
  //   fetch(config.add_new_job, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       user_id: logged_user_id,
  //       customer_id: customerid,
  //       job: {
  //         client_id: 1,
  //         job_name: customer_name,
  //         parent_job_id: job_id,
  //         customer_type: customer_type,
  //         currency: currency_type,
  //         opening_balance: open_balance,
  //         as_of: date_asofnow
  //       },
  //       company: {
  //         company_name: company_name,
  //         business_reg_no: bussiness_reg_no,
  //         currency_id: currency_id,
  //         website: website_name
  //       },
  //       contacts: contactArray,
  //       address: addressArray,
  //       // contacts: [
  //       //   {
  //       //     name: primary_contact_person,
  //       //     designation: primary_designation,
  //       //     department: primary_department,
  //       //     phone_work: primary_phone_work,
  //       //     phone_personal: primary_phone_personel,
  //       //     email: primary_email_of,
  //       //     skype: primary_skype,
  //       //     is_primary: true
  //       //   }
  //       // ],
  //       // address: [
  //       //   {
  //       //     shipping_address_name: shipping_addrs_name,
  //       //     shipping_address: shipping_address,
  //       //     is_default: true,
  //       //     billing_address: invoice_bill_to
  //       //   }
  //       // ],

  //       finance: {
  //         bank_account_no: bank_ac_no,
  //         credit_limit: credit_limit,
  //         price_level: price_level,
  //         payment_terms: payment_terms,
  //         preferred_delivery: preferred_delivery_method,
  //         preferred_payment: prefererd_payment_method,
  //         sales_tax: sales_tax_settings,
  //         sales_default_account: sales_default_account,
  //         purchase_tax: purchase_tax_settings,
  //         purchase_default_account: purchase_default_account,
  //         tax_id: tax_id,
  //         business_reg_no: bussiness_reg_no,
  //         default_sales_tax: default_sales_tax_selected,
  //         default_purchase_tax: defaultPurchaseTax_selected
  //       },
  //       additional: {
  //         referral_from: referel_fromList_selected,
  //         rep: rep_infoList_selected,
  //         description: decription_job,
  //         type: type_infoList_slected,
  //         status: status_infoList_selected,
  //         start_date: start_date,
  //         end_date: end_date,
  //         project_end_date: project_end_date
  //       }
  //     }),
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: authorization_key
  //     }
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static updateJob(
    customer_name,
    customer_type,
    currency_type,
    open_balance,
    date_asofnow,
    company_name,
    bussiness_reg_no,
    currency_id,
    website_name,
    bank_ac_no,
    credit_limit,
    price_level,
    payment_terms,
    preferred_delivery_method,
    prefererd_payment_method,
    sales_tax_settings,
    sales_default_account,
    purchase_tax_settings,
    purchase_default_account,
    tax_id,
    bussiness_reg_no1,
    default_sales_tax_selected,
    defaultPurchaseTax_selected,
    referel_fromList_selected,
    rep_infoList_selected,
    decription_job,
    type_infoList_slected,
    status_infoList_selected,
    start_date,
    end_date,
    project_end_date,
    customer_id,

    primary_contact_person,
    primary_designation,
    primary_department,
    primary_phone_work,
    primary_phone_personel,
    primary_email_of,
    primary_skype,
    invoice_bill_to,
    shipping_address,
    shipping_addrs_name,
    shipping_adress_last,
    addressArray,
    contactArray,
    customerid,
    job_id,
    logged_user_id,
    contacts_to_remove,
    initialArrayAddress,
    callback
  ) {
    fetch(config.edit_job_api, {
      method: "POST",
      body: JSON.stringify({
        contact_to_remove: contacts_to_remove,
        address_to_remove: initialArrayAddress,
        user_id: logged_user_id,
        customer_id: customerid,
        job_id: job_id,

        job: {
          client_id: 1,
          job_name: customer_name,
          customer_type: customer_type,
          currency: currency_type,
          as_of: date_asofnow,
        },
        company: {
          company_name: company_name,
          business_reg_no: bussiness_reg_no,
          currency_id: currency_id,
          website: website_name,
        },
        contacts: contactArray,
        address: addressArray,
        // contacts: [
        //   {
        //     name: primary_contact_person,
        //     designation: primary_designation,
        //     department: primary_department,
        //     phone_work: primary_phone_work,
        //     phone_personal: primary_phone_personel,
        //     email: primary_email_of,
        //     skype: primary_skype,
        //     is_primary: true
        //   }
        // ],
        // address: [
        //   {
        //     shipping_address_name: shipping_addrs_name,
        //     shipping_address: shipping_address,
        //     is_default: true,
        //     billing_address: invoice_bill_to
        //   }
        // ],

        finance: {
          bank_account_no: bank_ac_no,
          credit_limit: credit_limit,
          price_level: price_level,
          payment_terms: payment_terms,
          preferred_delivery: preferred_delivery_method,
          preferred_payment: prefererd_payment_method,
          sales_tax: sales_tax_settings,
          sales_default_account: sales_default_account,
          purchase_tax: purchase_tax_settings,
          purchase_default_account: purchase_default_account,
          tax_id: tax_id,
          business_reg_no: bussiness_reg_no,
          default_sales_tax: default_sales_tax_selected,
          default_purchase_tax: defaultPurchaseTax_selected,
        },
        additional: {
          referral_from: referel_fromList_selected,
          rep: rep_infoList_selected,
          description: decription_job,
          type: type_infoList_slected,
          status: status_infoList_selected,
          start_date: start_date,
          end_date: end_date,
          project_end_date: project_end_date,
        },
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static makeActive(client_id, customer_id, callback) {
    fetch(config.make_customer_active, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static updateNotes(
    client_id,
    customer_id,
    contacts,
    notes,
    job_id,
    note_name,
    user_id,
    note_id,
    callback
  ) {
    fetch(config.update_notes, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        contacts: contacts,
        notes: notes,
        job_id: job_id,
        note_name: note_name,
        user_id: user_id,
        note_id: note_id,
        // login_id:login_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static deleteNote(note_id, client_id, callback) {
    fetch(config.delete_notes, {
      method: "POST",
      body: JSON.stringify({
        note_id: note_id,
        // login_id:login_id
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static employeeList(client_id, page, limit, search, filter_id, callback) {
    fetch(config.employeelist, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        page: page,
        limit: limit,
        search: search,
        filter_id: filter_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log('objsdghjgsjdject',typeof data.status)
        if (data.status == 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static employee_create_notes(
    employee_id,
    client_id,
    contacts,
    user_id,
    notes,
    note_title,
    callback
  ) {
    fetch(config.employee_create_notes, {
      method: "POST",
      body: JSON.stringify({
        employee_id: employee_id,
        client_id: client_id,
        user_id: user_id,
        notes: notes,
        note_title: note_title,
        contacts: contacts,

        // login_id:login_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("notescreate", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static employee_notes_list(client_id, vendor_id, search_key, callback) {
    fetch(config.employee_notes_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        employee_id: vendor_id,
        search_key: search_key,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("vendor_notes", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static emp_transaction(client_id, employee_id, fromDate, toDate, callback) {
    fetch(config.employee_transaction, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        employee_id: employee_id,
        fromDate: fromDate,
        toDate: toDate,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("all_transaction", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static employee_basic_info(client_id, employee_id, callback) {
    fetch(config.employee_basic_info, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        employee_id: employee_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        console.log("aallemp", response);

        return response.json();
      })
      .then((data) => {
        console.log("allemp", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static employee_edit_notes(
    client_id,
    employee_id,
    //contacts,
    notes,
    //job_id,
    note_title,
    user_id,
    notes_id,
    contact,
    callback
  ) {
    fetch(config.employee_edit_notes, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        employee_id: employee_id,
        //contacts: contacts,
        notes: notes,
        //job_id: job_id,
        note_title: note_title,
        user_id: user_id,
        notes_id: notes_id,
        contact: contact,
        // login_id:login_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static employee_delete_notes(note_id, employee_id, callback) {
    fetch(config.employee_delete_notes, {
      method: "POST",
      body: JSON.stringify({
        note_id: note_id,
        employee_id: employee_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("delete vendor", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static make_employee_active(client_id, employee_id, callback) {
    fetch(config.make_employee_active, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        employee_id: employee_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_info", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static delete_or_inactive_employee(
    client_id,
    employee_id,
    status_to_set,
    callback
  ) {
    // alert('hiiii')
    fetch(config.delete_or_inactive_employee, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        employee_id: employee_id,
        status_to_set: status_to_set,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Basic_infoww", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static vendor_account_type(client_id, callback) {
    fetch(config.vendor_account_type, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("vendor_account_type1", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static vendor_invoicelist(client_id, vendor_id, selected_account_id, multi_payment_applied_invoices, callback) {
    fetch(config.vendor_invoicelist, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        vendor_id: vendor_id,
        selected_account_id: selected_account_id,
        multi_payment_applied_invoices: multi_payment_applied_invoices
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static vendor_payment_method(client_id, callback) {
    fetch(config.vendor_payment_method, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static vendor_credit_list(vendor_id, account_id, multi_payment_applied_invoices, callback) {
    fetch(config.vendor_credit_list, {
      method: "POST",
      body: JSON.stringify({
        vendor_id: vendor_id,
        account_id: account_id,
        multi_payment_applied_invoices: multi_payment_applied_invoices
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static vendor_category(client_id, callback) {
    fetch(config.vendor_category, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static vendor_payment_account_type(vendor_id, callback) {
    fetch(config.vendor_payment_account_type, {
      method: "POST",
      body: JSON.stringify({
        vendor_id: vendor_id,
        client_id: localStorage.getItem("logged_client_id")
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static vendor_discount_terms(vendor_id, callback) {
    fetch(config.vendor_discount_terms, {
      method: "POST",
      body: JSON.stringify({
        vendor_id: vendor_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static applied_credit_history(vendor_id, callback) {
    fetch(config.applied_credit_history, {
      method: "POST",
      body: JSON.stringify({
        vendor_id: vendor_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static createVendorBillDetail(
    client_id,

    callback
  ) {
    fetch(config.vendor_bill_payment, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static vendor_bank_account(vendor_id, callback) {
    fetch(config.vendor_bank_account, {
      method: "POST",
      body: JSON.stringify({
        vendor_id: vendor_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static third_party_account_list(client_id, payment_account_id, callback) {
    fetch(config.third_party_account_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        payment_account_id: payment_account_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
 static view_prior_filed_tax_return_options_list(client_id,  callback) {
    fetch(config.view_prior_filed_tax_return_options_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static file_tax_return_generate_pdf(input,  callback) {
    fetch(config.file_tax_return_generate_pdf, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static customer_recived_payment(
    customer_id,
    payor_name,
    client_id,
    descripation,
    exchange_rate,
    amount,
    type,
    third_party_account_name,
    reference_number,
    payment_date,
    Vendor_bank_account,
    job_id,
    ar_account,

    writeOff,

    discount_array,

    invoice_list,
    credit_list,

    refundStatus,

    total_amount,
    total_amount_due,
    total_original_amount,
    applied_amount,
    total_discount_credits_amount,
    total_payment_balance,
    payment_balance,
    option,
    old_option,
    third_party_type,
    third_party_account_id,
    received_account,
    unapplied_payment_amount,
    selected_currency,
    selected_account_id,
    user_id,
    final_invoice_credit_array,
    isEdit,
    multi_payment_applied_invoices,
    notification_id,
    callback
  ) {

    let link;

    if (isEdit == true) {
      link = config.edit_customer_multi_payment
    } else {
      link = config.customer_recived_payment
    }


    fetch(link, {
      method: "POST",
      body: JSON.stringify({
        paydetails: {
          customer_id: customer_id,
          payor_name: payor_name,
          client_id: client_id,
          descripation: descripation,
          exchange_rate: exchange_rate,
          amount: amount,
         // ar_account:ar_account,
          ar_account:received_account,
          type: type,
          third_party_account_name: third_party_account_name,
          reference_number: reference_number,
          payment_date: payment_date,
          job_id: job_id,
          Vendor_bank_account: Vendor_bank_account,
        },
        writeoff: writeOff,
        discount: discount_array,
        invoice_list: invoice_list,
        credit_list: credit_list,

        refund: refundStatus,
        total_amount: total_amount,
        total_amount_due: total_amount_due,
        total_original_amount: total_original_amount,
        applied_amount: applied_amount,
        total_discount_credits_amount: total_discount_credits_amount,
        total_payment_balance: total_payment_balance,
        payment_balance: payment_balance,
        option: option,
        old_option: old_option,
        third_party_type: third_party_type,
        third_party_account_id: third_party_account_id,
        unapplied_payment_amount: unapplied_payment_amount,
        multi_payment_foreign_currency: selected_currency,
        retain_credit_account: selected_account_id,
        user_id: user_id,
        final_invoice_credit_array: final_invoice_credit_array,
        multi_payment_applied_invoices: multi_payment_applied_invoices,
        notification_id:notification_id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Recent_Items", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  // vendor bill payment as customer receive payment ===> vendor id , ap account ,payee name only changed

  static vendor_bill_payment(
    customer_id,
    payor_name,
    client_id,
    descripation,
    exchange_rate,
    amount,
    type,
    third_party_account_name,
    reference_number,
    payment_date,
    Vendor_bank_account,
    job_id,
    ar_account,

    writeOff,

    discount_array,

    invoice_list,
    credit_list,

    refundStatus,

    total_amount,
    total_amount_due,
    total_original_amount,
    applied_amount,
    total_discount_credits_amount,
    total_payment_balance,
    payment_balance,
    option,
    old_option,
    third_party_type,
    third_party_account_id,
    received_account,
    unapplied_payment_amount,
    selected_currency,
    selected_account_id,
    user_id,
    final_invoice_credit_array,
    isEdit,
    multi_payment_applied_invoices,
    callback
  ) {

    let link;

    if (isEdit == true) {
      link = config.edit_vendor_bill_payment
    } else {
      link = config.vendor_bill_payment
    }


    fetch(link, {
      method: "POST",
      body: JSON.stringify({
        paydetails: {
          vendor_id: customer_id,
          payee_name: payor_name,
          client_id: client_id,
          descripation: descripation,
          exchange_rate: exchange_rate,
          amount: amount,
          type: type,
          third_party_account_name: third_party_account_name,
          reference_number: reference_number,
          payment_date: payment_date,
          job_id: job_id,
          Vendor_bank_account: Vendor_bank_account,
          ap_account: received_account,
        },
        writeoff: writeOff,
        discount: discount_array,
        invoice_list: invoice_list,
        credit_list: credit_list,

        refund: refundStatus,
        total_amount: total_amount,
        total_amount_due: total_amount_due,
        total_original_amount: total_original_amount,
        applied_amount: applied_amount,
        total_discount_credits_amount: total_discount_credits_amount,
        total_payment_balance: total_payment_balance,
        payment_balance: payment_balance,
        option: option,
        old_option: old_option,
        third_party_type: third_party_type,
        third_party_account_id: third_party_account_id,
        unapplied_payment_amount: unapplied_payment_amount,
        multi_payment_foreign_currency: selected_currency,
        retain_credit_account: selected_account_id,
        user_id: user_id,
        final_invoice_credit_array: final_invoice_credit_array,
        multi_payment_applied_invoices: multi_payment_applied_invoices
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Recent_Items", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // vendor bill payment as customer receive payment



  // // vendor bill payment          old vendor bill payment save params
  // static vendor_bill_payment(
  //   customer_id,
  //   payee_name,
  //   client_id,
  //   descripation,
  //   exchange_rate,
  //   amount,
  //   type,
  //   third_party_account_name,

  //   reference_number,
  //   payment_date,
  //   ar_account,

  //   option,

  //   third_account_id,
  //   writeoff,
  //   discount,
  //   invoice_list,
  //   credit_list,
  //   refund,
  //   total_amount,
  //   total_amount_due,
  //   total_original_amount,
  //   applied_amount,
  //   total_discount_credits_amount,
  //   total_payment_balance,
  //   overPay,
  //   foreign_currency,
  //   third_party_type,
  //   ap_account,
  //   unapplied_payment_amount,
  //   selected_currency,
  //   selected_account_id,
  //   user_id,

  //   callback
  // ) {
  //   fetch(config.vendor_bill_payment, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       paydetails: {
  //         third_party_type: third_party_type,
  //         vendor_id: customer_id,
  //         payee_name: payee_name,
  //         client_id: client_id,
  //         descripation: descripation,
  //         exchange_rate: exchange_rate,
  //         amount: amount,
  //         type: type,
  //         third_party_account_name: third_party_account_name,
  //         reference_number: reference_number,
  //         payment_date: payment_date,
  //         // Vendor_bank_account: 2342423,ap_account
  //         // ap_account: ar_account,
  //         ap_account: ap_account,
  //         third_party_account_id: third_account_id,
  //         foreign_currency: foreign_currency,
  //         reference_number: "",
  //       }, //
  //       writeoff: writeoff, //

  //       invoice_list: invoice_list, //

  //       credit_list: credit_list, //
  //       discount_array: discount, //
  //       refund: refund, //
  //       // total_amount: total_amount,
  //       total_amount_due: total_amount_due, //
  //       // total_original_amount: total_original_amount,
  //       // applied_amount: applied_amount,
  //       // total_discount_credits_amount: total_discount_credits_amount,
  //       // total_payment_balance: total_payment_balance,
  //       // payment_balance: overPay,
  //       option: option, //
  //       unapplied_payment_amount: unapplied_payment_amount,
  //       multi_payment_foreign_currency: selected_currency,
  //       retain_credit_account: selected_account_id,
  //       user_id: user_id,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static customer_account_type(client_id, callback) {
    fetch(config.customer_account_type, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static customer_and_job_list(
    client_id,
    from_customer_receive_payment = 0,
    callback
  ) {
    fetch(config.customer_and_job_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        from_customer_receive_payment: from_customer_receive_payment,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // sales_product_item_list

  static sales_product_item_list(client_id, callback) {
    fetch(config.sales_product_item_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //getAllColumns'

  // Po services
  static purchase_product_item_list(client_id, callback) {
    fetch(config.purchase_product_item_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getAllColumns(coreData, callback) {
    fetch(config.get_sales_invoice_custom_column_list, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //upDateCoulmns
  static upDateCoulmns(coreData, callback) {
    fetch(config.update_sales_invoice_custom_column_list, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getSubAccountList(coreData, callback) {
    fetch(config.sub_account_list, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //addNewAccountName
  static addNewAccountName(coreData, callback) {
    fetch(config.add_new_account_name, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_customer_type(coreData, callback) {
    fetch(config.add_customer_type, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_customer_payment_terms(coreData, callback) {
    fetch(config.add_customer_payment_terms, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_customer_preferred_delivery(coreData, callback) {
    fetch(config.add_customer_preferred_delivery, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static add_new_employee_type(coreData, callback) {
    fetch(config.add_new_employee_type, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static add_new_employee_department(coreData, callback) {
    fetch(config.add_new_employee_department, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static add_new_employee_shift(coreData, callback) {
    fetch(config.add_new_employee_shift, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static add_new_employee_location(coreData, callback) {
    fetch(config.add_new_employee_location, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static add_new_employee_salary(coreData, callback) {
    fetch(config.add_new_employee_salary, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static add_new_employee_payment(coreData, callback) {
    fetch(config.add_new_employee_payment, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static add_new_employee_payroll_frequency(coreData, callback) {
    fetch(config.add_new_employee_payroll_frequency, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static add_new_employee_variable_pay_frequency(coreData, callback) {
    fetch(config.add_new_employee_variable_pay_frequency, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static add_new_employee_variable_pay_type(coreData, callback) {
    fetch(config.add_new_employee_variable_pay_type, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static add_customer_preferred_payment(coreData, callback) {
    fetch(config.add_customer_preferred_payment, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_customer_sales_tax_settings(coreData, callback) {
    fetch(config.add_customer_sales_tax_settings, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_customer_sales_deafult_account_option(coreData, callback) {
    fetch(config.add_customer_sales_deafult_account_option, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static add_customer_purchase_tax_settings(coreData, callback) {
    fetch(config.add_customer_purchase_tax_settings, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_customer_purchase_default_account_option(coreData, callback) {
    fetch(config.add_customer_purchase_default_account_option, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_customer_default_sales_tax_option(coreData, callback) {
    fetch(config.add_customer_default_sales_tax_option, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_customer_default_purchase_tax_option(coreData, callback) {
    fetch(config.add_customer_default_purchase_tax_option, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static add_customer_job_type(coreData, callback) {
    fetch(config.add_customer_job_type, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_customer_job_status(coreData, callback) {
    fetch(config.add_customer_job_status, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_customer_referral_from(coreData, callback) {
    fetch(config.add_customer_referral_from, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static add_customer_rep(coreData, callback) {
    fetch(config.add_customer_rep, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static customer_invoicelist(
    client_id,
    customer_id,
    job_id,
    invoice_account,
    multi_payment_applied_invoices,
    callback
  ) {
    fetch(config.customer_invoicelist, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
        invoice_account: invoice_account,
        multi_payment_applied_invoices: multi_payment_applied_invoices,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static customer_appliedcreditlists(client_id, customer_id, job_id, callback) {
    fetch(config.customer_appliedcreditlists, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static customer_appliedcreditlists(client_id, customer_id, job_id, callback) {
    fetch(config.customer_appliedcreditlists, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //default_discount_term
  static default_discount_term(callback) {
    fetch(config.default_discount_term, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static paymentTerms(client_id, callback) {
    fetch(config.paymentTerms, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static customer_and_job_lists(
    client_id,
    customer_id,
    from_customer_receive_payment = 0,
    callback
  ) {
    fetch(config.customer_and_job_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        from_customer_receive_payment: from_customer_receive_payment,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static customer_and_job_listss(
    client_id,
    customer_id,
    job_id,
    from_customer_receive_payment = 0,
    callback
  ) {
    fetch(config.customer_and_job_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
        from_customer_receive_payment: from_customer_receive_payment,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static customer_creditlists(client_id, customer_id, job_id, credit_account, multi_payment_applied_invoices, callback) {
    fetch(config.customer_creditlists, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
        credit_account: credit_account,
        multi_payment_applied_invoices
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static customer_discount_terms(client_id, customer_id, job_id, callback) {
    fetch(config.customer_discount_terms, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
        job_id: job_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static vendor_payment_account_types(callback) {
    fetch(config.vendor_payment_account_type, {
      method: "POST",
      body: JSON.stringify({
        client_id: localStorage.getItem("logged_client_id")
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // vendor_payment_account_type
  static vendor_payment_account_type(vendor_id, callback) {
    fetch(config.vendor_payment_account_type, {
      method: "POST",
      body: JSON.stringify({
        vendor_id: vendor_id,
        client_id: localStorage.getItem("logged_client_id")
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  getPaymethod;
  static locale_list(callback) {
    fetch(config.locale_list, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //add_columns_list

  static add_columns_list(user_id, type, coulmn_name, callback) {
    fetch(config.add_invoice_column, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        type: type,
        column_name: coulmn_name,
        options: "how",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //invoiceadd_dropdown_options
  static invoiceadd_dropdown_options(user_id, colid, optarray, callback) {
    fetch(config.invoiceadd_dropdown_options, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        column_id: colid,
        options: optarray,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //add items

  static addItems(coreData, callback) {
    fetch(config.add_sales_product_item, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // poadd items
  static add_purchase_product_item(coreData, callback) {
    fetch(config.add_purchase_product_item, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //saveDebitRule
  static saveDebitRule(CoreData, callback) {
    fetch(config.add_bankrule_details, {
      method: "POST",
      body: JSON.stringify(CoreData[0]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //saveCreditRule
  static saveCreditRule(CoreData, callback) {
    fetch(config.add_bankrule_details, {
      method: "POST",
      body: JSON.stringify(CoreData[0]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //getNextInvoiceNumber
  static getNextInvoiceNumber(CoreData, callback) {
    fetch(config.next_invoice_number, {
      method: "POST",
      body: JSON.stringify(CoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //next credit memo no

  static next_credit_number(CoreData, callback) {
    fetch(config.next_credit_number, {
      method: "POST",
      body: JSON.stringify(CoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //saveTrasferRule
  static saveTrasferRule(CoreData, callback) {
    fetch(config.add_bankrule_details, {
      method: "POST",
      body: JSON.stringify(CoreData[0]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //field_list
  static field_list(callback) {
    fetch(config.field_list, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //condition_list
  static condition_list(callback) {
    fetch(config.condition_list, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //get_bankaccountlist
  static get_bankaccountlist(callback) {
    fetch(config.get_bankaccountlist, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static customerjoblist(client_id, customer_id, callback) {
    fetch(config.customerjoblist, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_client_list(callback) {
    fetch(config.get_client_list, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //draft list

  static get_inboxdraft_list(page, limit, client_id, search, callback) {
    fetch(config.get_inboxdraft_list, {
      method: "POST",
      body: JSON.stringify({
        page: page,
        limit: limit,
        client_id: client_id,
        search: search,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static save_doucment_list_draft(
    client_id,
    user_id,
    title,
    description,
    attachments,
    callback
  ) {
    let formData = new FormData();
    formData.append("client_id", client_id);
    formData.append("user_id", user_id);
    formData.append("title", title);
    formData.append("description", description);
    for (var i = 0; i < attachments.length; i++) {
      formData.append("attachments", attachments[i]);
    }

    console.log("attachments", attachments);

    fetch(config.save_doucment_list_draft, {
      method: "POST",
      body: formData,
      headers: {
        //"Content-type": "multipart/form-data; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //report sortby Filter names

  static reportSortbyOptions(report_id, callback) {
    fetch(config.reportSortbyOptions, {
      method: "POST",
      body: JSON.stringify({ report_id: report_id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module Apis starts

  static addNewUser(
    client_id,
    name,
    email_id,
    designation,
    role_id,
    logged_in_user_id,
    callback
  ) {
    fetch(config.addNewUser, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        name: name,
        email_id: email_id,
        designation: designation,
        role_id: role_id,
        logged_in_user_id: logged_in_user_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static userDesignationList(client_id, callback) {
    fetch(config.userDesignationList, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static vendor_credit_note_list(client_id, callback) {
    fetch(config.vendor_credit_note_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static vendor_bill_list(client_id, callback) {
    fetch(config.vendor_bill_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static purchase_order_list(client_id, callback) {
    fetch(config.purchase_order_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static credit_memo_list(client_id, callback) {
    fetch(config.credit_memo_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static sales_order_list(client_id, callback) {
    fetch(config.sales_order_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static estimate_list(client_id, callback) {
    fetch(config.estimate_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static invoice_list(client_id, callback) {
    fetch(config.invoice_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static addNewUserDesignation(client_id, designationName, callback) {
    fetch(config.addNewUserDesignation, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        designation: designationName,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - profile page -  profile details

  static getUserProfile(user_id,client_id, callback) {
    fetch(config.getUserProfile, {
      method: "POST",
      body: JSON.stringify({
        client_id:client_id,
        user_id: user_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - profile page - change profile picture

  static editProfilePicture(client_id, user_id, profile_pic, callback) {
    let formData = new FormData();
    formData.append("client_id", client_id);
    formData.append("user_id", user_id);
    formData.append("profile_pic", profile_pic);

    fetch(config.editProfilePicture, {
      method: "POST",
      body: formData,
      headers: {
        //"Content-type": "multipart/form-data; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - profile page - change profile details

  static editUser(
    client_id,
    role_id,
    name,
    email_id,
    phone,
    designation,
    user_id,
    callback
  ) {
    let formData = new FormData();
    formData.append("client_id", client_id);
    formData.append("user_id", user_id);
    formData.append("role_id", role_id);
    formData.append("name", name);
    formData.append("email_id", email_id);
    formData.append("phone", phone);
    formData.append("designation", designation);

    fetch(config.editUser, {
      method: "POST",
      body: formData,
      headers: {
        //"Content-type": "multipart/form-data; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - profile page -  password change

  static updatePassword(user_id, password, email_id, callback) {
    fetch(config.updatePassword, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        password: password,
        email_id: email_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - profile page -  delete profile

  static deleteUser(user_id, callback) {
    fetch(config.deleteUser, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - subcription page - list

  static get_subscription_list(client_id, callback) {
    fetch(config.get_subscription_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_current_subscription_details(client_id, callback) {
    fetch(config.get_current_subscription_details, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // jairam user module layer 1 - starts

  // static addNewmember(member, callback) {
  //   fetch(config.add_new_member, {
  //     method: "POST",
  //     body: JSON.stringify(member),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("objehjhjhjct", data);
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static change_user_active_or_inactive(user_id, status,client_id, callback) {
    console.log("going", user_id);
    fetch(config.change_user_active_or_inactive, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        status: status,
        client_id:client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static resend_invite(user_id, client_id, logged_user_id, callback) {
    fetch(config.resend_invite, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        user_id: user_id,
        logged_in_user_id: logged_user_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static all_subscription_list(subscriber, callback) {
    fetch(config.all_subscription_list, {
      method: "POST",
      body: JSON.stringify(
        subscriber
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_subscriber_contact_information(address, callback) {
    fetch(config.get_subscriber_contact_information, {
      method: "POST",
      body: JSON.stringify(address),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static list_user(listmember, callback) {
    fetch(config.list_user, {
      method: "POST",
      body: JSON.stringify(listmember),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // vendor_payment_account_type
  static vendor_payment_account_type(vendor_id, callback) {
    fetch(config.vendor_payment_account_type, {
      method: "POST",
      body: JSON.stringify({
        vendor_id: vendor_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  getPaymethod;
  static locale_list(callback) {
    fetch(config.locale_list, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //add_columns_list

  static add_columns_list(user_id, type, coulmn_name, callback) {
    fetch(config.add_invoice_column, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        type: type,
        column_name: coulmn_name,
        options: "how",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //invoiceadd_dropdown_options
  static invoiceadd_dropdown_options(user_id, colid, optarray, callback) {
    fetch(config.invoiceadd_dropdown_options, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        column_id: colid,
        options: optarray,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //add items

  static addItems(coreData, callback) {
    fetch(config.add_sales_product_item, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //saveDebitRule
  static saveDebitRule(CoreData, callback) {
    fetch(config.add_bankrule_details, {
      method: "POST",
      body: JSON.stringify(CoreData[0]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //saveCreditRule
  static saveCreditRule(CoreData, callback) {
    fetch(config.add_bankrule_details, {
      method: "POST",
      body: JSON.stringify(CoreData[0]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //getNextInvoiceNumber
  static getNextInvoiceNumber(CoreData, callback) {
    fetch(config.next_invoice_number, {
      method: "POST",
      body: JSON.stringify(CoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //saveTrasferRule
  static saveTrasferRule(CoreData, callback) {
    fetch(config.add_bankrule_details, {
      method: "POST",
      body: JSON.stringify(CoreData[0]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //field_list
  static field_list(callback) {
    fetch(config.field_list, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //condition_list
  static condition_list(callback) {
    fetch(config.condition_list, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  //get_bankaccountlist
  static get_bankaccountlist(callback) {
    fetch(config.get_bankaccountlist, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static customerjoblist(client_id, customer_id, callback) {
    fetch(config.customerjoblist, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        customer_id: customer_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_client_list(callback) {
    fetch(config.get_client_list, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //draft list

  static get_inboxdraft_list(page, limit, client_id, search, callback) {
    fetch(config.get_inboxdraft_list, {
      method: "POST",
      body: JSON.stringify({
        page: page,
        limit: limit,
        client_id: client_id,
        search: search,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static save_doucment_list_draft(
    client_id,
    user_id,
    title,
    description,
    attachments,
    callback
  ) {
    let formData = new FormData();
    formData.append("client_id", client_id);
    formData.append("user_id", user_id);
    formData.append("title", title);
    formData.append("description", description);
    for (var i = 0; i < attachments.length; i++) {
      formData.append("attachments", attachments[i]);
    }

    console.log("attachments", attachments);

    fetch(config.save_doucment_list_draft, {
      method: "POST",
      body: formData,
      headers: {
        //"Content-type": "multipart/form-data; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //report sortby Filter names

  static reportSortbyOptions(report_id, callback) {
    fetch(config.reportSortbyOptions, {
      method: "POST",
      body: JSON.stringify({ report_id: report_id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module Apis starts

  static addNewUser(
    client_id,
    name,
    email_id,
    designation,
    role_id,
    logged_in_user_id,
    callback
  ) {
    fetch(config.addNewUser, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        name: name,
        email_id: email_id,
        designation: designation,
        role_id: role_id,
        logged_in_user_id: logged_in_user_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static userDesignationList(client_id, callback) {
    fetch(config.userDesignationList, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static addNewUserDesignation(client_id, designationName, callback) {
    fetch(config.addNewUserDesignation, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        designation: designationName,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - profile page -  profile details

  static getUserProfile(user_id,client_id, callback) {
    fetch(config.getUserProfile, {
      method: "POST",
      body: JSON.stringify({
        client_id:client_id,
        user_id: user_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - profile page - change profile picture

  static editProfilePicture(client_id, user_id, profile_pic, callback) {
    let formData = new FormData();
    formData.append("client_id", client_id);
    formData.append("user_id", user_id);
    formData.append("profile_pic", profile_pic);

    fetch(config.editProfilePicture, {
      method: "POST",
      body: formData,
      headers: {
        //"Content-type": "multipart/form-data; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static edit_invoice_template(client_id, user_id, profile_pic, callback) {
  //   let formData = new FormData();
  //   formData.append("client_id", client_id);
  //   formData.append("user_id", user_id);
  //   formData.append("profile_pic", profile_pic);

  //   fetch(config.edit_invoice_template, {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       //"Content-type": "multipart/form-data; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  // user module - profile page - change profile details

  static editUser_profile(
    client_id,
    user_id,
    role_id,
    name,
    email_id,
    phone,
    designation,
    callback
  ) {
    let formData = new FormData();
    formData.append("client_id", client_id);
    formData.append("user_id", user_id);
    formData.append("role_id", role_id);
    formData.append("name", name);
    formData.append("email_id", email_id);
    formData.append("phone", phone);
    formData.append("designation", designation);

    fetch(config.editUser, {
      method: "POST",
      body: formData,
      headers: {
        //"Content-type": "multipart/form-data; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - profile page -  password change

  static updatePassword(user_id, password, email_id, callback) {
    fetch(config.updatePassword, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        password: password,
        email_id: email_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - profile page -  delete profile

  static deleteUser(user_id, callback) {
    fetch(config.deleteUser, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // user module - subcription page - list

  static get_subscription_list(client_id, callback) {
    fetch(config.get_subscription_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_current_subscription_details(client_id, callback) {
    fetch(config.get_current_subscription_details, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //settings module apis

  static create_Organization_Profile(formdata, callback) {
    fetch(config.create_Organization_Profile, {
      method: "POST",
      body: formdata,
      headers: {
        // "Content-type": "multipart/form-data; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static tax_details(client_id, callback) {
    fetch(config.tax_details, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static show_email(client_id, callback) {
    fetch(config.show_email, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static delete_tax(id, callback) {
    fetch(config.delete_tax, {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static tax_status_change(id, callback) {
    fetch(config.tax_status_change, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_estimate(estimate, callback) {
    fetch(config.create_sales_estimate, {
      method: "POST",
      body: JSON.stringify(estimate),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_Default_Email(client_id, callback) {
    fetch(config.get_Default_Email, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static edit_tax(Edit, callback) {
    fetch(config.edit_tax, {
      method: "POST",
      body: JSON.stringify(Edit),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_estimate(estimate, callback) {
    fetch(config.create_sales_estimate, {
      method: "POST",
      body: JSON.stringify(estimate),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static settings_find_drop1(callback) {
    fetch(config.settings_find_drop1, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static select_email_radio(id, callback) {
    fetch(config.select_email_radio, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_find_drop2(key, client_id, callback) {
    fetch(config.settings_find_drop2, {
      method: "POST",
      body: JSON.stringify({
        key: key,
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_find_drop3(key, client_id, callback) {
    fetch(config.settings_find_drop3, {
      method: "POST",
      body: JSON.stringify({
        key: key,
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_expense_account(client_id, asset_account, callback) {
    fetch(config.settings_expense_account, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        asset_account,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_add_new_asset_type(input, callback) {
    fetch(config.settings_add_new_asset_type, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_edit_asset_type(input, callback) {
    fetch(config.settings_edit_asset_type, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_get_asset_type_values(client_id, asset_type_id, callback) {
    fetch(config.settings_get_asset_type_values, {
      method: "POST",
      body: JSON.stringify({ client_id, asset_type_id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static settings_accumulated_account(client_id, asset_account, callback) {
    fetch(config.settings_accumulated_account, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        asset_account,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static group_filter(client_id, asset_account, callback) {
    fetch(config.group_filter, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        search_text: asset_account
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_asset_account(client_id, callback) {
    fetch(config.settings_asset_account, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_depreciation_method_list(client_id, callback) {
    fetch(config.settings_depreciation_method_list, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_averaging_method_list(client_id, callback) {
    fetch(config.settings_averaging_method_list, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static group_send_request_list(client_id,search_key,page,limit, callback) {
    fetch(config.group_send_request_list, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        search_key,
        page,
        limit
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static group_received_list(client_id,search_key,page,limit, callback) {
    fetch(config.group_received_list, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        search_key,
        page,
        limit
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static get_notification(client_id, callback) {
    fetch(config.get_notification, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_approval(client_id, email_address, callback) {
    fetch(config.settings_approval, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        email_address,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static create_sales_estimate_edit(estimate, callback) {
    fetch(config.create_sales_estimate_edit, {
      method: "POST",
      body: JSON.stringify(estimate),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static group_send_req(input, callback) {
    fetch(config.group_send_req, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static request_accept(input, callback) {
    fetch(config.request_accept, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static create_sales_invoice1(invoice, callback) {
    fetch(config.create_sales_invoice1, {
      method: "POST",
      body: JSON.stringify(invoice),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_invoice1_edit(invoice, callback) {
    fetch(config.create_sales_invoice1_edit, {
      method: "POST",
      body: JSON.stringify(invoice),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_order(sales_order, callback) {
    fetch(config.create_sales_order, {
      method: "POST",
      body: JSON.stringify(sales_order),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_order_edit(sales_order, callback) {
    fetch(config.create_sales_order_edit, {
      method: "POST",
      body: JSON.stringify(sales_order),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_credit(credit, callback) {
    fetch(config.create_sales_credit, {
      method: "POST",
      body: JSON.stringify(credit),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_credit_edit(credit, callback) {
    fetch(config.create_sales_credit_edit, {
      method: "POST",
      body: JSON.stringify(credit),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_purchase(purchase, callback) {
    fetch(config.create_sales_purchase, {
      method: "POST",
      body: JSON.stringify(purchase),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_purchase_edit(purchase, callback) {
    fetch(config.create_sales_purchase_edit, {
      method: "POST",
      body: JSON.stringify(purchase),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_statement(statement, callback) {
    fetch(config.create_sales_statement, {
      method: "POST",
      body: JSON.stringify(statement),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_statement_edit(statement, callback) {
    fetch(config.create_sales_statement_edit, {
      method: "POST",
      body: JSON.stringify(statement),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_journal(journal, callback) {
    fetch(config.create_sales_journal, {
      method: "POST",
      body: JSON.stringify(journal),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_sales_journal_edit(journal, callback) {
    fetch(config.create_sales_journal_edit, {
      method: "POST",
      body: JSON.stringify(journal),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static post_email(input, callback) {
    fetch(config.post_email, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static delete_email(id, callback) {
    fetch(config.delete_email, {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static edit_email_template(data, callback) {
    fetch(config.edit_email_template, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static view_email_template(id, callback) {
    fetch(config.view_email_template, {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_email_template(data, callback) {
    fetch(config.create_email_template, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static recode_table(client_id, sort_by_key, sort_by, input, callback) {
    fetch(config.recode_table, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        filter_options: input,
        sort_by: sort_by,
        sort_by_key: sort_by_key,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static verify_Email(client_id, callback) {
    fetch(config.verify_Email, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static condition_is_recode_table(type, name, callback) {
    fetch(config.condition_is_recode_table, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        company_name: type,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static condition_is_not_recode_table(type, name, callback) {
    fetch(config.condition_is_not_recode_table, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        company_name: type,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static find_sort_table(values, callback) {
    fetch(config.find_sort_table, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static recode_table_data(input, callback) {
    fetch(config.recode_table_data, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_sales_estimate(client_id, callback) {
    fetch(config.settings_sales_estimate, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_sales_invoice(client_id, callback) {
    fetch(config.settings_sales_invoice, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_sales_order(client_id, callback) {
    fetch(config.settings_sales_order, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_sales_credit(client_id, callback) {
    fetch(config.settings_sales_credit, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_sales_purchase(client_id, callback) {
    fetch(config.settings_sales_purchase, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_sales_statement(client_id, callback) {
    fetch(config.settings_sales_statement, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_sales_journal(client_id, callback) {
    fetch(config.settings_sales_journal, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_data(client_id, callback) {
    fetch(config.get_data, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static email_template_data(client_id, callback) {
    fetch(config.email_template_data, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // jairam user module layer 1 - starts

  static addNewmember(member, callback) {
    fetch(config.add_new_member, {
      method: "POST",
      body: JSON.stringify(member),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  // static change_user_active_or_inactive(user_id, status, callback) {
  //   fetch(config.change_user_active_or_inactive, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       user_id,
  //       status,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("objehjhjhjct", data);
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  // static resend_invite(user_id, callback) {
  //   fetch(config.change_user_active_or_inactive, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       user_id,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("objehjhjhjct", data);
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static user_designation_list(client_id, callback) {
    fetch(config.user_designation_list, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_subscriber_list_by_country(country_id, callback) {
    fetch(config.get_subscriber_list_by_country, {
      method: "POST",
      body: JSON.stringify({
        country_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_asset_list(client_id, callback) {
    fetch(config.settings_asset_list, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //settings 12-11-2020

  static get_custom_column_list(client_id,callback){
    fetch(config.get_custom_column_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id       
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      }); 
  }

  static settings_asset_date_based_list(
    client_id,
    start_date,
    end_date,
    callback
  ) {
    fetch(config.settings_asset_date_based_list, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        start_date,
        end_date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_asset_depreciation_confirm(
    client_id,
    start_date,
    end_date,
    callback
  ) {
    fetch(config.settings_asset_depreciation_confirm, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        start_date,
        end_date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_asset_rollback(client_id, end_date, callback) {
    fetch(config.settings_asset_rollback, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        end_date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_all_bank_statements(coreData, callback) {
    fetch(config.get_all_bank_statements, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static get_bank_balance(coreData, callback) {
    fetch(config.get_bank_balance, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_add_new_asset(input, callback) {
    fetch(config.settings_add_new_asset, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_edit_asset(input, callback) {
    fetch(config.settings_edit_asset, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static edit_member(input, callback) {
    fetch(config.edit_member, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_get_asset_values(asset_id, callback) {
    fetch(config.settings_get_asset_values, {
      method: "POST",
      body: JSON.stringify({ asset_id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_account_list(client_id, callback) {
    fetch(config.settings_account_list, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static fund_transfer(input, callback) {
    fetch(config.fund_transfer, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // jairam user module layer 1 - ends

  static get_vendor_bill_details(client_id, invoice_id, payment_id, callback) {
    fetch(config.get_vendor_bill_details, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        invoice_id: invoice_id,
        payment_id: payment_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_vendor_credit_details(client_id, credit_memo_id, payment_id, callback) {
    fetch(config.get_vendor_credit_details, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        credit_memo_id: credit_memo_id,
        payment_id: payment_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  //
  static get_user_subscriber_list(input, callback) {
    fetch(config.get_user_subscriber_list, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_client_home_currency(client_id, callback) {
    fetch(config.get_client_home_currency, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static get_home_currency_adjusted_details_by_id(client_id,adjustment_id, callback) {
      fetch(config.get_home_currency_adjusted_details_by_id, {
        method: "POST",
        body: JSON.stringify({
          client_id: client_id,
          adjustment_id:adjustment_id
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: authorization_key,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === 1) {
            callback(null, data);
          } else {
            callback(null, data);
          }
        });
    }
  static get_credit_memo_details(client_id, credit_memo_id, callback) {
    fetch(config.get_credit_memo_details, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        credit_memo_id: credit_memo_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_subscriber_list_by_country(country_id, callback) {
    fetch(config.get_subscriber_list_by_country, {
      method: "POST",
      body: JSON.stringify({
        country_id: country_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static postCashCodingItems(reconcileArray, bank_account, callback) {
    fetch(config.postCashCodingItems, {
      method: "POST",
      body: JSON.stringify({
        reconcileArray: reconcileArray,
        bank_account: bank_account
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static getAllbanks(client_id, callback) {
    fetch(config.getAllbanks, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
      body: JSON.stringify({
        client_id: client_id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static customer_vendor_list(client_id, callback) {
    fetch(config.customer_vendor_list, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static make_deposit(coreData, callback) {
    fetch(config.make_deposit, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
static get_deposit_details(coreData, callback) {
    fetch(config.get_deposit_details, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static write_cheaque(coreData, callback) {
    fetch(config.write_cheaque, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static get_cheque_details(coreData, callback) {
    fetch(config.get_cheque_details, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static post_delete_bank_statements(coreData, callback) {
    fetch(config.post_delete_bank_statements, {
      method: "POST",
      body: JSON.stringify({ statement_arr: coreData }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_all_account_statements(coreData, callback) {
    fetch(config.get_all_account_statements, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static create_batch_transaction(coreData, callback) {
    fetch(config.create_batch_transaction, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static get_batch_enter_custom_column(client_id, callback) {
    fetch(config.get_batch_enter_custom_column, {
      method: "POST",
      body: JSON.stringify({client_id:client_id}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static add_batch_enter_custom_column(coreData, callback) {
    fetch(config.add_batch_enter_custom_column, {
      method: "POST",
      body: JSON.stringify(coreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static settings_asset_account_type(client_id, asset_type_name, callback) {
    fetch(config.settings_asset_account_type, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        asset_type_name
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static to_do_list_details(client_id, callback) {
    fetch(config.to_do_list_details, {
      method: "POST",
      body: JSON.stringify({
        client_id,

      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  // static history_notes_search(client_id, asset_type_name, callback) {
  //   fetch(config.history_notes_search, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       client_id,
  //       asset_type_name
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("objehjhjhjct", data);
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static create_todo_list(input, callback) {
    fetch(config.create_todo_list, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static done_todo_list(input, callback) {
    fetch(config.done_todo_list, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static trial_balance(input, callback) {
    fetch(config.trial_balance, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static sequence_check_option_list(callback) {
    fetch(config.sequence_check_option_list, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static sequence_check_by_type(input, callback) {
    fetch(config.sequence_check_by_type, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  // now
  // alreay
  // static sales_product_item_list(client_id, from_settings, callback) {
  //   fetch(config.sales_product_item_list, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       client_id: client_id,
  //       from_settings: from_settings
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: authorization_key,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 1) {
  //         callback(null, data);
  //       } else {
  //         callback(null, data);
  //       }
  //     });
  // }

  static editServiceItems(editCoreData, callback) {
    fetch(config.editServiceItems, {
      method: "POST",
      body: JSON.stringify(editCoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  // poedit tiems
  static edit_purchase_product_item(editCoreData, callback) {
    fetch(config.edit_purchase_product_item, {
      method: "POST",
      body: JSON.stringify(editCoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };



  static service_item_delete(deleteCoreData, callback) {
    fetch(config.service_item_delete, {
      method: "POST",
      body: JSON.stringify(deleteCoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static settings_find_drop2_contact(client_id, callback) {
    fetch(config.settings_find_drop2_contact, {
      method: "POST",
      body: JSON.stringify({

        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static manual_journal_main(client_id, start_date, end_date, type, status, search_key, callback) {
    fetch(config.manual_journal_main, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        start_date: start_date,
        end_date: end_date,
        status: status,
        search_key: search_key,
        type: type,

      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static post_new_journal(input, callback) {
    let url = input.isEdit ? config.edit_manual_journal : config.post_new_journal
    fetch(url, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  // allready

  static history_notes_search(client_id, user_id, page, limit, item, start_date, end_date, callback) {
    fetch(config.history_notes_search, {
      method: "POST",
      body: JSON.stringify({
        client_id,
        user_id,
        page,
        limit,
        item,
        start_date,
        end_date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static done_todo_list_delete(id, callback) {
    fetch(config.done_todo_list_delete, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static done_todo_list_edit(editInput, callback) {
    fetch(config.done_todo_list_edit, {
      method: "POST",
      body: JSON.stringify(editInput),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static journal_report(
    start_date,
    end_date,
    // show_columns,
    client_id,
    // sub_columns,
    // filter_id,
    // filter_options,
    // sort_by_column_key,
    // sort_by,
    callback
  ) {
    fetch(config.journal_report, {
      method: "POST",
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static get_settings_currency(client_id, callback) {
    fetch(config.get_settings_currency, {
      method: "POST",
      body: JSON.stringify({
        client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static get_chart_accounts(client_id, account_status, callback) {
    fetch(config.get_chart_accounts, {
      method: "POST",
      body: JSON.stringify({
        client_id, account_status
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("jhsgdjsadhg", data.status);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static get_client_incorpdate(client_id, callback) {
    fetch(config.get_client_incorpdate, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static add_new_currency(input, callback) {
    fetch(config.add_new_currency, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  // now


  // from branch of develoment branch

  static get_customer_review_data(editInput, callback) {
    fetch(config.get_customer_review_data, {
      method: "POST",
      body: JSON.stringify(editInput),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  // from branch of develoment branch

  static get_bill_by_attachment(Input, callback) {
    fetch(config.get_bill_by_attachment, {
      method: "POST",
      body: JSON.stringify(Input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  // for pdf print 

  static print_pdf(Input, from, callback) {
    let url;
    if (from == 'create_invoice') {
      url = config.save_sales_invoice_as_pdf
    } else if (from == 'credit_memo') {
      url = config.save_credit_memo_as_pdf
    } else if (from == 'estimate') {
      url = config.save_estimate_as_pdf
    } else if (from == 'salesorder') {
      url = config.save_sales_order_as_pdf
    } else if (from == 'purchaseorder') {
      url = config.save_purchase_order_as_pdf
    } else if (from == 'vendor_statement') {
      url = config.save_vendor_statement_as_pdf
    } else if (from == 'customer_statement') {
      url = config.save_customer_statement_as_pdf
    } else {
      url = config.save_sales_invoice_as_pdf
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(Input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  // for pdf print 

  static get_customer_multipayment_details(input, callback) {
    // let url;
    // if (from = 'edit') {
    //   url = config.get_customer_multipayment_details
    // } else {
    //   url = config.get_group_accounting_multipayment_details
    // }
    // alert('final' + url + from)
    fetch(config.get_customer_multipayment_details, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static get_vendor_multipayment_details(input, callback) {
    // let url;
    // if (from = 'edit') {
    //   url = config.get_customer_multipayment_details
    // } else {
    //   url = config.get_group_accounting_multipayment_details
    // }
    // alert('final' + url + from)
    fetch(config.get_vendor_multipayment_details, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static customer_receive_payment_notification(input, callback) {
    // let url;
    // if (from = 'edit') {
    //   url = config.get_customer_multipayment_details
    // } else {
    //   url = config.get_group_accounting_multipayment_details
    // }
    // alert('final' + url + from)
    fetch(config.get_group_accounting_multipayment_details, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };
  static get_group_accounting_reveived_payment(client_id,search_key,page,limit, callback) {
    fetch(config.get_group_accounting_reveived_payment, {
      method: "POST",
      body: JSON.stringify({client_id,
        search_key,
        page,
        limit
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };
  static get_group_accounting_sent_bills(client_id,search_key,page,limit, callback) {
    fetch(config.get_group_accounting_sent_bills, {
      method: "POST",
      body: JSON.stringify({client_id,
        search_key,
        page,
        limit
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static get_list_to_adjust_currency(input, callback) {
    fetch(config.get_list_to_adjust_currency, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static save_adjusted_currency(input, callback) {
    fetch(config.save_adjusted_currency, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };



  static get_estimate_details(input, callback) {
    fetch(config.get_estimate_details, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };



  static get_sales_order_details(input, callback) {
    fetch(config.get_sales_order_details, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };



  static get_purchase_order_details(input, callback) {
    fetch(config.get_purchase_order_details, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static all_account_list(input, callback) {
    fetch(config.all_account_list, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  static all_transaction_type_list(input, callback) {
    fetch(config.all_transaction_type_list, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };


  static job_name_list(input, callback) {
    fetch(config.job_name_list, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  };

  // next


  static next_estimate_number(CoreData, callback) {
    fetch(config.next_estimate_number, {
      method: "POST",
      body: JSON.stringify(CoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static next_sales_order_number(CoreData, callback) {
    fetch(config.next_sales_order_number, {
      method: "POST",
      body: JSON.stringify(CoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static next_purchase_order_number(CoreData, callback) {
    fetch(config.next_purchase_order_number, {
      method: "POST",
      body: JSON.stringify(CoreData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static vendor_list_for_bill(client_id, callback) {
    fetch(config.vendor_list_for_bill, {
      method: "POST",
      body: JSON.stringify({ client_id: client_id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  // next invoice number

  static change_attachment_to_void(input, callback) {
    fetch(config.change_attachment_to_void, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }



  static verify_lock_date_password(input, callback) {
    fetch(config.verify_lock_date_password, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static delete_or_void_credit_memo(input, callback) {
    fetch(config.delete_or_void_credit_memo, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static delete_or_void_estimate(input, callback) {
    fetch(config.delete_or_void_estimate, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static delete_or_void_sales_order(input, callback) {
    fetch(config.delete_or_void_sales_order, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }
  static delete_or_void_purchase_order(input, callback) {
    fetch(config.delete_or_void_purchase_order, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static delete_or_void_sales_invoice(input, callback) {
    fetch(config.delete_or_void_sales_invoice, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static customer_apply_credit(input, callback) {
    fetch(config.customer_apply_credit, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static sales_default_due_date_terms(callback) {
    fetch(config.sales_default_due_date_terms, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static get_journal_details(input, callback) {

    fetch(config.get_journal_details, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }



  static delete_or_inactive_account_name(input, callback) {

    fetch(config.delete_or_inactive_account_name, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }

  static check_user_email(input, callback) {
    fetch(config.check_user_email, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static register_company_with_existing_user(input, callback) {
    fetch(config.register_company_with_existing_user, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {
          callback(null, data);
        }
      });
  }


  static customer_and_vendor_list_for_journal(client_id, callback) {
    fetch(config.customer_and_vendor_list_for_journal, {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {  
          callback(null, data);
        }
      });
  };

  static add_employee_with_name(input, callback) {
    fetch(config.add_employee_with_name, {
      method: "POST",
      body: JSON.stringify(
        input
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {  
          callback(null, data);
        }
      });
  };

  static add_other_staff(input, callback) {
    fetch(config.add_other_staff, {
      method: "POST",
      body: JSON.stringify(
        input
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {  
          callback(null, data);
        }
      });
  };

  static mark_notification_as_read(input, callback) {
    fetch(config.mark_notification_as_read, {
      method: "POST",
      body: JSON.stringify(
        input
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {  
          callback(null, data);
        }
      });
  };

  static update_template_properties(input, callback) {
    fetch(config.update_template_properties, {
      method: "POST",
      body: JSON.stringify(
        input
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {  
          callback(null, data);
        }
      });
  };

  static rename_invoice_template(input, callback) {
    fetch(config.rename_invoice_template, {
      method: "POST",
      body: JSON.stringify(
        input
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("objehjhjhjct", data);
        if (data.status === 1) {
          callback(null, data);
        } else {  
          callback(null, data);
        }
      });
  };
  static send_invoice_mail(input, callback) {
    fetch(config.send_invoice_mail, {
      method: "POST",
      body: JSON.stringify(
        input
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: authorization_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {      
        if (data.status === 1) {
          callback(null, data);
        } else {  
          callback(null, data);
        }
      });
  };
  static sales_order_to_auto_invoice(input, callback) {
      fetch(config.sales_order_to_auto_invoice, {
        method: "POST",
        body: JSON.stringify(
          input
        ),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: authorization_key,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {      
          if (data.status === 1) {
            callback(null, data);
          } else {  
            callback(null, data);
          }
        });
    };
};
export default FetchAllApi;