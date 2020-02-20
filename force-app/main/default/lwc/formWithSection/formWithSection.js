import { LightningElement,api,track } from 'lwc';

export default class FormWithSection extends LightningElement {

    @track activeSections = [];

    //private variables
    
    _config={};
    _tabid=null;
    _objectName=null;
    _recordId=null;   
    _sectionWiseColumns=null; 
    _columns=null; 
    // exposed api methods ----------------------------------------------------------------------------------------

    // this will have all the configuration for table

    @api 
    get columns()
    {
        return this._columns;
        
    }
    
    set columns(value)
    {
        console.log("columns");

        this._columns=value;
        this._sectionWiseColumns=this.getSectionWiseColumns(value)  
        for(let i=0;i<this._sectionWiseColumns.length;i++)
        {
            this.activeSections.push(this._sectionWiseColumns[i].section)
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

    @api 
    get sectionWiseColumns()
    {
        return this._sectionWiseColumns;
        
    }
    
    set sectionWiseColumns(value)
    {
        console.log("sectionwisecolumns");
        this._sectionWiseColumns=value;
        for(let i=0;i<this._sectionWiseColumns.length;i++)
        {
            this.activeSections.push(this._sectionWiseColumns[i].section)
        }
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