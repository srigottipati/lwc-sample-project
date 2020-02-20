import { LightningElement,api,track } from 'lwc';

export default class SearchContainer extends LightningElement {

    _config={};
    _configs={};
    _tabid=null;
    _tableid=null;
    _rowid=null;
    
    get options() {
        return [
            { label: 'App', value: 'App__c' },
            { label: 'Object', value: 'Object__c' },
            { label: 'Field', value: 'Field__c' },
        ];
    }

    @track
    defaultValue ="App__c";

    // exposed api methods ----------------------------------------------------------------------------------------

    // this will have all the configuration for table
  
    @api 
    get configs()
    {
        
        return this._configs;
    }
    
    set configs(value)
    {
        this._configs=value;
    }
  
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
    get tabid()
    {
        return this._tabid;
    }
    
    set tabid(value)
    {
        this._tabid=value;
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


    onSearchTermChange = event =>
   {
    console.log("onSearchTermChange") ;
       let index= event.detail.tabid;
       let searchTerm=event.detail.searchterm;
       
       var delayMillis = 500;
       let timeoutId = event.target.dataset.searchTimeoutId;
       //this.tabCollection[index].config.soslSearchTerm=searchTerm
       
       var dataTable=this.getDatatable(index);
      
       //this.tabCollection[index].config.queryFilters=" Name like '%" + config.searchTerm + "%'"
      clearTimeout( timeoutId );
      // eslint-disable-next-line @lwc/lwc/no-async-operation
       timeoutId = setTimeout(
           function(){
               
               if( searchTerm!=="")
               dataTable.queryFilters=searchTerm;
               else
               dataTable.queryFilters="";
               
           }, delayMillis );
       event.target.dataset.searchTimeoutId=timeoutId;
   }

   processButtonClick = event =>
   {
       console.log("processButtonClick");
       let objectName=event.target.dataset.objectname;
       let actionType=event.target.dataset.actiontype;
       let tabid=event.target.dataset.tabid;
       if(actionType==="new")
       {
               this.dispatchEvent(new CustomEvent('newform', {
               detail: {
                   objectName: objectName
                   
               }
           }));
       }
       else if(actionType==="bulkdelete")
       {
           var dataTable=this.getDatatable(tabid);
           let rows=dataTable.getSelectedRows();
           
           this.dispatchEvent(new CustomEvent('bulkdelete', {
               detail: {
                   rows: rows
                   
               }
           }));
           
       }
       
   }

   cloneJSON(value)
   {
        return JSON.parse(JSON.stringify( value));
   }

   objectListChange = event => {

    console.log("object list change");
    let objectName = event.detail.value;

    this.objectName=objectName;
    
    let index = event.target.dataset.indexcombo;

    let lConfig=this.configs.filter( function(item){ if(item.objectName===objectName ) return item;});
    // Filter config file based on selection
    let config=this.cloneJSON(lConfig[0]);
    this.config=config;
    this.config.tableConfig.columns[0].typeAttributes.name=config.tableConfig.columns[0].typeAttributes.name.replace("#index#",index);
    
//    this.addOptionstoColumnsinTable(config.tableConfig.columns,index,objectName);
   
    this.dispatchEvent(new CustomEvent('objectlistchange', {
        detail: {
            config: config,
            index: index
            
        }
    }));
    
    
  }


  handleNewForm = event =>
   {

    this.dispatchEvent(new CustomEvent('newform', {
        detail: event.detail
    }));
       
   }


   handleRowAction = event => {

        let actionDetails= this.getDetailsFromAction(event.detail.action.name)
        let openMode= event.detail.openMode;
        console.log(openMode);
        let actionName=actionDetails.actionName;
        console.log(actionName);
        let row = event.detail.row;

        this.dispatchEvent(new CustomEvent('rowaction', {
            detail: {
                row:row,
                actionName:actionName,
                objectName:actionDetails.objectName,
                openMode:openMode,
                actionDetails:actionDetails
            }
        }));

   /*     if(actionName.toLowerCase()==="edit" || actionName==="View")
        {
            if(openMode==="slideout")
            this.showFormInSlideout(actionDetails.objectName,row,null,actionName);
            else
            this.showEditFormTab(actionDetails.objectName,row,null,actionName);
        }
            
        else if(actionName==="Delete")
            this.deleteObjectRecord(row,actionDetails)    
     */ 
    }


    getDetailsFromAction(actionName)
    {
        let arrName = actionName.split("_");
        let actualActionName=arrName.shift();
        let index= arrName.shift();
        let objectName=arrName.join("_")
        return {actionName:actualActionName,index:index,objectName:objectName}
    }

   getDatatable(index)
    {
        return this.template.querySelector(`[data-id="dt` + index + `"]`);
    }
    
    
}