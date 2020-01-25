import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
export default class sampleNewTable extends LightningElement {

    @track
    defaultValue ="G1_Product__c";

     // Config to hold Schema definition
     configs=[
        {
            objectName: "G1_Picklist__c",
            
            soslSearchTerm:"",
            searchTerm:"",
            tableConfig: {
                columns: [
                    { id:1,api: 'Name', label: 'Name', fieldName: 'Name', sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_G1_Picklist__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties"},
                    { id:2,api: 'Code__c', label: 'Code', fieldName: 'Code__c', type: 'text', sortable: true ,section:"General Properties"},
                    
                    { id:2,api: 'Is_Active__c', label: 'Is Active', fieldName: 'Is_Active__c', type: 'boolean', sortable: true ,section:"General Properties"},
                    
                    { id:2,api: 'Desc__c', label: 'Desc', fieldName: 'Desc__c', type: 'text', sortable: true ,section:"General Properties"},
                    { id:2,api: 'Type__c', label: 'Type', fieldName: 'Type__c', type: 'text', sortable: true ,section:"General Properties"},
                    {
                        type: 'action',
                        typeAttributes: { rowActions: [] },
                    }
                
                ]
            },
            editConfig:{
                label: 'Pick List Details'

            },
            children:[{
                objectName: "G1_PickItem__c",
                relField:  { id:2,api: 'G1_Picklist__c', label: 'G1 Picklist', fieldName: 'G1_Picklist', type: 'Text', sortable: true ,section:"General Properties",value:"",withvalue:true},
                section:"Picklist Items",
                
                tableConfig: {
                    columns: [
                        { id:1,api: 'Name', label: 'Name', fieldName: 'Name', sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_G1_PickItem__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties"},
                        { id:2,api: 'Code__c', label: 'Code', fieldName: 'Code__c', type: 'Text', sortable: true ,section:"General Properties"},
                        { id:3,api: 'Desc__c', label: 'Desc', fieldName: 'Desc__c', type: 'Text', sortable: true ,section:"General Properties"},
                        { id:4,api: 'Seq__c', label: 'Seq', fieldName: 'SeSeq__c', type: 'Text', sortable: true ,section:"General Properties"},
                        { id:5,api: 'CreatedDate', label: 'Created On', fieldName: 'CreatedDate', type: 'date', sortable: true ,section:"System Properties"},
                        { id:6,api: 'CreatedBy.Name', label: 'Created By', fieldName: 'CreatedByName', sortable: true,section:"System Properties" },
                        {
                            type: 'action',
                            typeAttributes: { rowActions: [] },
                        }
                    ]
                },
                editConfig:{
                    label: 'PickList Item Details'
    
                }
            }]
        },
        {
            objectName: "G1_Product__c",
            soslSearchTerm:"",
            tableConfig: {
                columns: [
                    { id:1,api: 'Name', label: 'Name', fieldName: 'Name', sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_G1_Product__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties"},
                    { id:2,api: 'Price__c', label: 'Price', fieldName: 'Price__c', type: 'currency', sortable: true ,section:"General Properties"},
                    { id:3,api: 'CreatedDate', label: 'Created On', fieldName: 'CreatedDate', type: 'date', sortable: true ,section:"System Properties"},
                    { id:4,api: 'CreatedBy.Name', label: 'Created By', fieldName: 'CreatedByName', sortable: true ,section:"System Properties"},
                    {
                        type: 'action',
                        typeAttributes: { rowActions: [] },
                    }
                    
                ]
            },
            editConfig:{
                label: 'Product Details'
            }
        },
        {
            objectName: "G1_Promotion__c",
            soslSearchTerm:"",
            tableConfig: {
                columns: [
                    { id:1,api: 'Name', label: 'Name', fieldName: 'Name', sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_G1_Promotion__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties"},
                    { id:2,api: 'Start_Date__c', label: 'Start Date', fieldName: 'Start_Date__c', type: 'date', sortable: true ,section:"General Properties"},
                    { id:3,api: 'CreatedDate', label: 'Created On', fieldName: 'CreatedDate', type: 'date', sortable: true ,section:"System Properties"},
                    { id:4,api: 'CreatedBy.Name', label: 'Created By', fieldName: 'CreatedByName', sortable: true ,section:"System Properties"},
                    {
                        type: 'action',
                        typeAttributes: { rowActions: [] },
                    }
                ]
            },
            editConfig:{
                label: 'Promotion Details'
            }
        }
    ];
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
        //config= config.replace("#index#",this._currentTabIndex);
        let newTab={tabid:this._currentTabIndex,isSearch:true,label:"Search",showRemoveTab:true , config:config,tableid:"dt" + this._currentTabIndex,endiconname:"utility:close"};
        this.tabCollection.push(newTab);
        console.log(this.tabCollection);
    }

    // Combo change Handler
    objectListChange = event => {

      let objectName = event.detail.value;
      
      let index = event.target.dataset.indexcombo;

      // Filter config file based on selection
      let config=this.cloneJSON(this.configs.filter( function(item){ if(item.objectName===objectName ) return item;})[0]);
      config.tableConfig.columns[0].typeAttributes.name=config.tableConfig.columns[0].typeAttributes.name.replace("#index#",index);
      
      this.addOptionstoColumnsinTable(config.tableConfig.columns,index,objectName);
     
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
        let parentId = event.target.dataset.parentid;
        let objectName=event.target.dataset.objectname;
        console.log(objectName);
        
        this.showEditFormTab(objectName,{},parentId,"edit");
    }

   cloneJSON(value)
   {
        return JSON.parse(JSON.stringify( value));
   }

    showEditFormTab(objectName,currentRow,parentId,actionName)
    {
        let configRef = this.cloneJSON(this.retrieveConfig(objectName));
        let tabLabel=" New ";

        //let configRef= this.configs[objectName=actionName];
        console.log(configRef)
        let columns= configRef.tableConfig.columns;

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

        let actionDetails= this.getDetailsFromAction(event.detail.action.name)
        let actionName=actionDetails.actionName;
        console.log(actionName);
        let row = event.detail.row;
        if(actionName.toLowerCase()==="edit" || actionName==="View")
            this.showEditFormTab(actionDetails.objectName,row,null,actionName);
        else if(actionName==="Delete")
            this.deleteObjectRecord(row,actionDetails)    
      
    }
  
    deleteObjectRecord(currentRow,actionDetails)
    {
        deleteRecord(currentRow.Id)
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
    onSearchTermChange = event =>
    {
        let searchTerm = event.detail.value;
        

        let index = event.target.dataset.index;
       // console.log(this.tabCollection[index].config.searchTerm);

        var delayMillis = 500;
        let timeoutId = event.target.dataset.searchTimeoutId;
        //this.tabCollection[index].config.soslSearchTerm=searchTerm
        let config=this.tabCollection[index].config;

        var dataTable=this.getDatatable(index);
       
        //this.tabCollection[index].config.queryFilters=" Name like '%" + config.searchTerm + "%'"
       clearTimeout( timeoutId );
       // eslint-disable-next-line @lwc/lwc/no-async-operation
        timeoutId = setTimeout(
            function(){
                
                if( searchTerm!=="")
                dataTable.queryFilters=" Name like '%" + searchTerm + "%'";
                else
                dataTable.queryFilters="";
                
            }, delayMillis );
        event.target.dataset.searchTimeoutId=timeoutId;
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
            if (!sections[section]) sections[section] = { section, columns: [] };
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
