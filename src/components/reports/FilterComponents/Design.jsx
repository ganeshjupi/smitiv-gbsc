<div className='form-group col-md-12 col-xs-12'>
    <div className='row'>
        <div className='col-lg-5 col-md-3'>
        <label className='fw-sbold'>Filter by</label>
        </div>
        <div className='col-lg-7 col-md-9'>
        <div className='custom-select-drop dropdown'>
            <select
            className='selectpicker'
            multiple
            data-live-search='true'
            onChange={e => this.selected_filters(e)}
            >
            {/* { this.state.coulmns_head && this.state.coulmns_head !==undefined && 
                this.state.coulmns_head && 
                
                this.state.coulmns_head.map((item,i)=>{
                let statusSelected="";
                if(item.status === 1)
                    statusSelected="selected"

                return(<option value={ i+1 } selected={ statusSelected } >{item.heading_name}</option>)
                

                }) } */}
            {this.state.filtervalue &&
                this.state.filtervalue.name &&
                this.state.filtervalue.name.map(
                (item, index) => {
                    return (
                    <option
                        key={index}
                        id={item.filter_name}
                        data-id={item.id}
                        value={item.id}
                    >
                        {item.filter_name}
                    </option>
                    )
                }
                )}
            </select>
        </div>
        </div>
    </div>
    </div>

States
// filtervalue: [],
// options: '',
// From: '',
// To: '',
// filter_options: { condition: '', value: '', from: '', to: '' },
// valueAmount: '',
// valueAmount_type: '',
// disable: false,
// selectedFil: 0,
// currencies: [],
// vendorNames: [],
// selectedCurrencies: '',
// selected_vendor_ids: [],
// changefromDate_duedate: '',
// todate_duedate: '',
