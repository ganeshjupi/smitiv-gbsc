import React from 'react'

export default class Comma extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            country_sortname: localStorage.getItem("country_sortname"),
            language_code: localStorage.getItem("language_code"),
            home_currency_symbol: localStorage.getItem("home_currency_symbol"),
            home_currency: localStorage.getItem("home_currency"),
        }
    }
    render() {
        return (
            new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                { style: 'currency', currency: this.state.home_currency }).format(isNaN(this.props.value) ? "0.00" : this.props.value)).replace(this.state.home_currency_symbol, ''
                )
    }
}