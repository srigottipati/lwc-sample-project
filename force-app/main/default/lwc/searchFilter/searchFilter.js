import { LightningElement, api } from 'lwc';

export default class SearchFilter extends LightningElement {


    _config={};
    _tabid=null;

    @api 
    get config()
    {
        return this._config;
    }
    
    set config(value)
    {
        console.log(value);
        this._config=value;
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


    onSearchTermChange = event =>
    {
       // let searchTerm = event.detail.value;
        

        let index = event.target.dataset.queryindex;
       // console.log(this.tabCollection[index].config.searchTerm);

       let filters= this.template.querySelectorAll(`[data-queryindex="` + index + `"]`);
       let queryFilters=[];
       for(let i=0;i<filters.length;i++)
       {
           if(filters[i].value != "")
                queryFilters.push(filters[i].name + "  like '%" + filters[i].value + "%'")
                
           
       }
       console.log(queryFilters.join(" and "));
       let searchTerm = queryFilters.join(" and ");

        this.dispatchEvent(new CustomEvent('searchtermchange', {
            detail: {
                searchterm: searchTerm,
                tabid: index
            }
        }));
     
    }

}
