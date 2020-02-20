import { LightningElement,api,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { getConfigs,deleteObjectRecord } from 'c/utils';
export default class TabsetContainer extends LightningElement {

    // Private variables
    _configs=[];
    _tableid=null;
    _currentTabIndex=0;

    @track
    configs=getConfigs();

    _tabTemplate={tabid:this._currentTabIndex,isSearch:true,label:"Search",showRemoveTab:false , config:this.configs[0],tableid:"dt" + this._currentTabIndex,editiconname:""}

    @track
    tabCollection=[this._tabTemplate];

    get key()
    {
        return "" + Date.now() + "" + Math.random();
    }

    onEndIconClick= event =>
    {
        console.log("end icon click");
        console.log(event.detail);
        let index=event.detail.value;
        this.tabCollection=this.tabCollection.filter( function(item){ if(item.tabid!==parseInt(index) ) return item;});  
    }

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
    
        console.log(config);
        this.tabCollection[index].config=config;

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

    showNewChildForm = event =>
    {
        let parentId = event.detail.parentId;  //event.target.dataset.parentid;
        let objectName= event.detail.objectName; //event.target.dataset.objectname;
        console.log(objectName);
        
        this.showEditFormTab(objectName,{},parentId,"edit");
    }

    handleNewForm = event =>
   {
       let objectName=event.detail.objectName;
       this.showEditFormTab(objectName,{},null,"edit");
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
    processChildren(configRef,parentId,index)
    {
        for(let i=0;i<configRef.children.length;i++)
        {
            configRef.children[i].queryFilters=configRef.children[i].relField.api + "='" + parentId + "'";  
            this.addOptionstoColumnsinTable(configRef.children[i].tableConfig.columns,index,configRef.children[i].objectName)
        }
    }
    addOptionstoColumnsinTable(columns,index,objectName)
    {
        columns[columns.length-1].typeAttributes.rowActions[0]={ label: 'View', name: "View_" + index + "_" + objectName};
        columns[columns.length-1].typeAttributes.rowActions[1]={ label: 'Edit', name: "Edit_" + index + "_" + objectName};
        columns[columns.length-1].typeAttributes.rowActions[2]={ label: 'Delete', name: "Delete_" + index + "_" + objectName};
    }
    cloneJSON(value)
   {
        return JSON.parse(JSON.stringify( value));
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
}