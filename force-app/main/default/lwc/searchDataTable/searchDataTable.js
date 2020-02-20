import { LightningElement,api,track } from 'lwc';

export default class SearchDataTable extends LightningElement {
    

    @track dataTableClass="slds-size--1-of-1 slds-medium-size--6-of-6 slds-large-size--12-of-12 datatable-container";
    @track formClass="slds-size--1-of-2 slds-medium-size--1-of-6 slds-large-size--4-of-12 slds-hide slds-border_left form-container";
    //private variables
    
    _config={};
    _tableid=null;
    _rowid=null;
    
    // exposed api methods ----------------------------------------------------------------------------------------

    // this will have all the configuration for table
    @api 
    get config()
    {
        console.log("search datatable config get");
        return this._config;
    }
    
    set config(value)
    {
        console.log("search datatable config set");
        //console.log(JSON.stringify(value));
        this._config=value;

        let datatable =this.template.querySelector(`[data-id="` + this.tableid + `"]`);
        if(datatable)
        {
            datatable.config=value;
        }

    }

    @api 
    get tableid()
    {
        return this._tableid;
    }
    
    set tableid(value)
    {
        this._tableid=value;
    }

    get key()
    {
        return "" + Date.now() + "" + Math.random();
    }

    @api
    get rowId()
    {
        return this._rowid;
    }
   
    set rowId(value)
    {
        this._rowid=value;
    }

    
    closeForm = event => {
        this.dataTableClass="slds-size--1-of-1 slds-medium-size--6-of-6 slds-large-size--12-of-12  datatable-container";
        this.formClass="slds-size--1-of-2 slds-medium-size--1-of-6 slds-large-size--4-of-12 slds-border_left form-container slds-hide";
       
    }

    handleRowAction = event => {
        if(this._config.editConfig.openMode==="slideout")
        {

            this.dataTableClass="slds-size--1-of-2 slds-medium-size--3-of-6 slds-large-size--6-of-12 datatable-container";
            this.formClass="slds-size--1-of-2 slds-medium-size--3-of-6 slds-large-size--6-of-12 slds-border_left form-container";
            this.rowId=event.detail.row.Id;
           
        }
        this.dispatchEvent(new CustomEvent('rowaction', {
            detail: {
                action: event.detail.action,
                row: event.detail.row,
                openMode: this._config.editConfig.openMode
            }
        }));
    }

    getDatatable(index)
    {
        return this.template.querySelector(`[data-id="dt` + index + `"]`);
    }

}