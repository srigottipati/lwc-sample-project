import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { getConfigs,deleteObjectRecord } from 'c/utils';
export default class runtimeController extends LightningElement {

    @track
    defaultValue ="G1_Product__c";

     // Config to hold Schema definition
     @track
     configs=getConfigs();

     // Private variables
     _currentTabIndex=0;

     _tabTemplate={tabid:this._currentTabIndex,isSearch:true,label:"Search",showRemoveTab:false , config:this.configs[1],tableid:"dt" + this._currentTabIndex,editiconname:""}

     
  
    @track
    tabCollection=[this._tabTemplate];

    
   // row actions
        actions = [
        { label: 'Record Details', name: 'record_details'}, 
        { label: 'Edit', name: 'edit'}, 
        { label: 'Delete', name: 'delete'}
    ];
    
    //Options to populate Combo
    get options() {
        return [
            { label: 'G1 Product', value: 'G1_Product__c' },
            { label: 'G1 Picklist', value: 'G1_Picklist__c' },
            { label: 'G1 Promotion', value: 'G1_Promotion__c' },
        ];
    }

    
    //To add new search tab
    onTabsetEndIconClick = event =>
    {
        console.log(this._currentTabIndex);
        this._currentTabIndex++;
        let config=this.configs[1];
        config.tableConfig.columns[0].typeAttributes.name=config.tableConfig.columns[0].typeAttributes.name.replace("#index#",this._currentTabIndex);
        config.tabid=this._currentTabIndex;
        //config= config.replace("#index#",this._currentTabIndex);
        let newTab={tabid:this._currentTabIndex,isSearch:true,label:"Search",showRemoveTab:true , config:config,tableid:"dt" + this._currentTabIndex,endiconname:"utility:close"};
        this.tabCollection.push(newTab);
        console.log(this.tabCollection);
    }

    // Combo change Handler
    objectListChange = event => {

      let config = event.detail.config;

      let index = event.detail.index;
      
     // let index = event.target.dataset.indexcombo;

      // Filter config file based on selection
      //let config=this.cloneJSON(this.configs.filter( function(item){ if(item.objectName===objectName ) return item;})[0]);
      //config.tableConfig.columns[0].typeAttributes.name=config.tableConfig.columns[0].typeAttributes.name.replace("#index#",index);
      
      //this.addOptionstoColumnsinTable(config.tableConfig.columns,index,objectName);
     
      console.log(config);
      this.tabCollection[index].config=config;

    }
    
    addOptionstoColumnsinTable(columns,index,objectName)
    {
    /*    columns.push({
            type: 'action',
            typeAttributes: {
                rowActions: [
                    { label: 'View', name: "View_" + index + "_" + objectName},
                    { label: 'Edit', name: "Edit_" + index + "_" + objectName},
                    { label: 'Delete', name: "Delete_" + index + "_" + objectName}
                    
                ],
                menuAlignment: 'center'
            }
        })
*/
        columns[columns.length-1].typeAttributes.rowActions[0]={ label: 'View', name: "View_" + index + "_" + objectName};
        columns[columns.length-1].typeAttributes.rowActions[1]={ label: 'Edit', name: "Edit_" + index + "_" + objectName};
        columns[columns.length-1].typeAttributes.rowActions[2]={ label: 'Delete', name: "Delete_" + index + "_" + objectName};
    }

    attachIconClick()
    {
        this.template.querySelector(".slds-icon-utility-close").addEventListener("click",function(event){

            console.log("icon click");
        console.log(event.target);
        console.log(event.currentTarget);

        });
    }

    renderedCallback()
    {
       /* console.log("");
        console.log(document.querySelector); 
         document.querySelector("[class].slds-icon-utility-close").addEventListener("click",function(event){

                console.log("rendered icon click");
            console.log(event.target);
            console.log(event.currentTarget);

            });
            */
    }
    connectedCallback()
    {
      this.addOptionstoColumnsinTable(this.tabCollection[0].config.tableConfig.columns,0,this.tabCollection[0].config.objectName);

    }
   
    showNewForm = event =>
    {
        let index = event.target.dataset.indexbutton;
        let comboRef= this.template.querySelector(`[data-indexcombo="` + index + `"]`);
        let objectName=comboRef.value;
        //let configRef = this.cloneJSON(this.retrieveConfig(objectName));
        this.showEditFormTab(objectName,{},null,"edit");
    }
    showNewChildForm = event =>
    {
        let parentId = event.detail.parentId;  //event.target.dataset.parentid;
        let objectName= event.detail.objectName; //event.target.dataset.objectname;
        console.log(objectName);
        
        this.showEditFormTab(objectName,{},parentId,"edit");
    }

   cloneJSON(value)
   {
        return JSON.parse(JSON.stringify( value));
   }

   handleNewForm = event =>
   {
       let objectName=event.detail.objectName;
       this.showEditFormTab(objectName,{},null,"edit");
   }
   processButtonClick = event =>
    {
        console.log("processButtonClick");
        let objectName=event.target.dataset.objectname;
        let actionType=event.target.dataset.actiontype;
        let tabid=event.target.dataset.tabid;
        if(actionType==="new")
        {
            this.showEditFormTab(objectName,{},null,"edit");
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
            console.log(rows);
        }
        
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
   
    showFormInSlideout(objectName,currentRow,parentId,actionName)
    {

    }
    showEditFormTab(objectName,currentRow,parentId,actionName)
    {
        let configRef = this.cloneJSON(this.retrieveConfig(objectName));
        let tabLabel=" New ";

        //let configRef= this.configs[objectName=actionName];
        console.log(configRef)
        let columns= configRef.editConfig.columns;

        if(actionName.toLowerCase()==="edit")
            configRef.editMode=true
        else if(actionName==="View")    
            configRef.viewMode=true

        if(parentId)
        {
            let relField=this.cloneJSON (configRef.relField);
            relField.value=parentId;
            columns.push(relField);
            console.log(columns);
        }
            

        this._currentTabIndex++;
            
        //Add Parent filter to Children
        if(configRef.children )
        {
            this.processChildren(configRef, currentRow.Id,this._currentTabIndex);
            
        }


        
        if(this.isNotBlank(currentRow.Name))
            tabLabel =currentRow.Name;

        console.log(configRef)
        tabLabel= configRef.editConfig.label + " ( " + tabLabel + " ) " ;
           
        let sectionWiseColumns=this.getSectionWiseColumns(columns);

          //  console.log(sectionWiseColumns);  
        var newTab={tabid:this._currentTabIndex,isSearch:false,actionName:true,config:configRef,label:tabLabel,row:currentRow,showRemoveTab:true,sectionWiseColumns:sectionWiseColumns,tableid:"dt" + this._currentTabIndex,endiconname:"utility:close"};
        
        this.tabCollection.push(newTab);
    }

    getDetailsFromAction(actionName)
    {
        let arrName = actionName.split("_");
        let actualActionName=arrName.shift();
        let index= arrName.shift();
        let objectName=arrName.join("_")
        return {actionName:actualActionName,index:index,objectName:objectName}
    }
    
    handleRowAction = event => {

        let detail=event.detail;
        let actionDetails= event.detail.actionDetails; //this.getDetailsFromAction(event.detail.action.name)
        let openMode= event.detail.openMode;
        console.log(openMode);
        let actionName=event.detail.actionName;//actionDetails.actionName;
        let objectName=event.detail.objectName;
        console.log(actionName);
        let row = event.detail.row;
        if(actionName!==undefined && actionName.toLowerCase()==="edit" || actionName==="View")
        {
            if(openMode==="tab" || openMode===undefined)
            this.showEditFormTab(objectName,row,null,actionName);
        }
            
        else if(actionName==="Delete")
            this.deleteObjectRecord(row,actionDetails)    
      
    }
  
    
    deleteObjectRecord(currentRow,actionDetails)
    {
        deleteObjectRecord(currentRow.Id)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record Is  Deleted',
                        variant: 'success',
                    }),

                );
                let dataTable=this.getDatatable(actionDetails.index);
                dataTable.refresh();

            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error While Deleting record',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });
        
    }

    getDatatable(index)
    {
        return this.template.querySelector(`[data-id="dt` + index + `"]`);
    }
   
    retrieveConfig(objectName)
    {
        let configRef;
        for(let i=0;i<this.configs.length;i++)
        {
            if(this.configs[i].objectName===objectName)
            {
                configRef=this.configs[i]
                break;
            }
            else if (this.configs[i].children)
            {
                for(let j=0;j<this.configs[i].children.length;j++)
                {
                    if(this.configs[i].children[j].objectName===objectName)
                    {
                        configRef=this.configs[i].children[j];
                        break;
                    }    
                }
            }
        }
        return configRef;
    }

    onTabsetSelect = event =>
    {
        console.log("select tab");
    }

    onTabClick = event =>
    {
        console.log("tab click");
    }
    onTabsetClick = event =>
    {

        console.log(this);
        console.log("tabset click");
        console.log(event.target);
        var target = event.target || event.srcElement;
        var id = target.id
        console.log(event.target.nodeName);
    }

    onEndIconClick= event =>
    {
        console.log("end icon click");
        console.log(event.detail);
        let index=event.detail.value;
        this.tabCollection=this.tabCollection.filter( function(item){ if(item.tabid!==parseInt(index) ) return item;});  
    }
    onTactiveActive = event =>
    {
        console.log("tab active");
    }

    processChildren(configRef,parentId,index)
    {
        for(let i=0;i<configRef.children.length;i++)
        {
            configRef.children[i].queryFilters=configRef.children[i].relField.api + "='" + parentId + "'";  
            this.addOptionstoColumnsinTable(configRef.children[i].tableConfig.columns,index,configRef.children[i].objectName)
        }
    }

    getSectionWiseColumns(columns)
    {
        let sectionWiseColumns=Object.values(columns.reduce((sections, current) => {
            let section =current.section;
            if(section!==undefined){
            if (!sections[section]) sections[section] = { section,"sectionsort":current.sectionsort, columns: [] };
            sections[section].columns.push(current);
            }
            return sections;
          }, {}))

          return sectionWiseColumns;
    }

    isNotBlank(checkString) {
        return (checkString !== '' && checkString !== null && checkString !== undefined);
    }

    removeTab(event) 
    {
        let index = event.target.dataset.index;
        this.tabCollection=this.tabCollection.filter( function(item){ if(item.tabid!==parseInt(index) ) return item;});  
    }
  
    get key()
    {
        return "" + Date.now() + "" + Math.random();
    }
    showToast() {
        const event = new ShowToastEvent({
            title: 'Saved',
            message: 'Successfully Saved',
        });
        this.dispatchEvent(event);
    }
 
}
