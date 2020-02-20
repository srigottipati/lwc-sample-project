import { LightningElement,api } from 'lwc';

export default class EditDetailsForm extends LightningElement {

    _config={};
    _recordId;
    _objectName;
    _tableId;

    @api 
    get config()
    {
        return this._config;
    }
    
    set config(value)
    {
        this._config=value;
    }

    @api 
    get recordId()
    {
        return this._recordId;
        
    }
    
    set recordId(value)
    {
        this._recordId=value;
       
    }

    @api 
    get tableId()
    {
        return this._tableId;
        
    }
    
    set tableId(value)
    {
        this._tableId=value;
       
    }

    @api 
    get row()
    {
        return this._row;
        
    }
    
    set row(value)
    {
        this._row=value;
       
    }

    @api 
    get objectName()
    {
        return this._objectName;
    }
    
    set objectName(value)
    {
        this._objectName=value;
    }


    handleRowAction = event => {

        console.log("handleRowAction");
        this.dispatchEvent(new CustomEvent('rowaction', {
            detail: event.detail
        }));

      
    }

    showNewChildForm = event =>
    {
        let parentId = event.target.dataset.parentid;
        let objectName=event.target.dataset.objectname;
        console.log(objectName);
        
        this.dispatchEvent(new CustomEvent('newclick', {
            detail: {parentId:parentId,objectName:objectName}
        }));
        
    }
}