import { LightningElement,api,track } from 'lwc';

export default class ViewRenderer extends LightningElement {
    _configs={};
    _tabid=null;
    _item=null;

    @api 
    get item()
    {
        return this._item;
    }
    
    set item(value)
    {
        console.log(value);
        this._item=value;
    }

    @api 
    get configs()
    {
        return this._configs;
    }
    
    set configs(value)
    {
        console.log(value);
        this._configs=value;
    }

    @api 
    get tabid()
    {
        return this._tabid;
    }
    
    set tabid(value)
    {
        console.log("tabid:" + value);
        this._tabid=value;
    }

    get key()
    {
        return "" + Date.now() + "" + Math.random();
    }


    objectListChange = event => {
        this.dispatchEvent(new CustomEvent('objectlistchange', {
            detail: event.detail
        }));

    }

    handleRowAction = event => {
        this.dispatchEvent(new CustomEvent('rowaction', {
            detail: event.detail
        }));

    }

    handleNewForm = event => {
        this.dispatchEvent(new CustomEvent('newform', {
            detail: event.detail
        }));

    }

    showNewChildForm = event => {
        this.dispatchEvent(new CustomEvent('newclick', {
            detail: event.detail
        }));

    }
}