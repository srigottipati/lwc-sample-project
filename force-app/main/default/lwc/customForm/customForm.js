import { LightningElement,api,track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CustomForm extends LightningElement {

    @track activeSections = [];
    @track contactRecord = {};
    @track isObjectNameUpdated=false;
    //private variables 
    
    _config={};
    _tabid=null;
    _objectName="";
    _recordId=null;   
    _sectionWiseColumns=null; 
    // exposed api methods ----------------------------------------------------------------------------------------

    handleLoad(event) {
        if (!this.loadedForm) {
            let fields = Object.values(event.detail.records)[0].fields;
            const recordId = Object.keys(event.detail.records)[0];
            this.contactRecord = {
                Id: recordId,
                ...Object.keys(fields)
                    .filter((field) => !!this.template.querySelector(`[data-field=${field}]`))
                    .reduce((total, field) => {
                        total[field] = fields[field].value;
                        return total;
                    }, {})
            };
            this.loadedForm = true;
        }
    }
    
    handleFieldChange(e) {
        this.contactRecord[e.currentTarget.dataset.field] = e.target.value;
    }

    renderedCallback()
    {
        

    }
    

    saveForm() {
        // if(this.validated())
        console.log('Contact for save => ', JSON.stringify(this.contactRecord));
        updateRecord({ fields: this.contactRecord })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'updated',
                        variant: 'success'
                    })
                );
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
    // this will have all the configuration for table

    @api 
    get columns()
    {
        return this._columns;
        
    }
    
    set columns(value)
    {
        console.log("columns");
        if(value!=null)
        {
            this._columns=value;
            this._sectionWiseColumns=this.getSectionWiseColumns(value)  
            for(let i=0;i<this._sectionWiseColumns.length;i++)
            {
                this.activeSections.push(this._sectionWiseColumns[i].section)
            }
        }
    }

    handlecloseClick ()
    {
        this.dispatchEvent(new CustomEvent('closeform', {}));
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

    @api 
    get sectionWiseColumns()
    {
        return this._sectionWiseColumns;
        
    }
    
    cloneJSON(value)
    {
         return JSON.parse(JSON.stringify( value));
    }

    set sectionWiseColumns(value)
    {
        console.log("sectionwisecolumns");
        this._sectionWiseColumns=this.cloneJSON( value);
        try{
            this._sectionWiseColumns= this._sectionWiseColumns.sort(function(a,b){
                return parseInt(a.sectionsort) - parseInt(b.sectionsort);
            });


        }catch(e)
        {
            console.log(e);
        }
     

        for(let i=0;i<this._sectionWiseColumns.length;i++)
        {
            this.activeSections.push(this._sectionWiseColumns[i].section)
            this._sectionWiseColumns[i].columns.sort(function(a,b){
                return a.sortorder -b.sortorder;
            });
        }
       
        console.log(this._sectionWiseColumns);
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
    get recordId()
    {
        return this._recordId;
        
    }
    
    set recordId(value)
    {
        this._recordId=value;
        this.isObjectNameUpdated=true
    }

    @api 
    get objectName()
    {
        return this._objectName;
    }
    
    set objectName(value)
    {
        this._objectName=value;
        //this.isObjectNameUpdated=true
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

    get key()
    {
        return "" + Date.now() + "" + Math.random();
    }


}