import { LightningElement, track } from 'lwc';
import fetchDataHelper from './fetchDataHelper';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
];

const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'Close At', fieldName: 'closeAt', type: 'date' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

const config= {
    objectName: "G1_Product__c",
    soslSearchTerm:"",
    tableConfig: {
        columns: [
            { id:1,api: 'Name', label: 'Name', fieldName: 'Name', sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_G1_Product__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties"},
            { id:2,api: 'Price__c', label: 'Price', fieldName: 'Price__c', type: 'currency', sortable: true ,section:"General Properties"},
            { id:3,api: 'CreatedDate', label: 'Created On', fieldName: 'CreatedDate', type: 'date', sortable: true ,section:"System Properties"},
            { id:4,api: 'CreatedBy.Name', label: 'Created By', fieldName: 'CreatedByName', sortable: true ,section:"System Properties"}
            ,{
                type: 'action',
                typeAttributes: { rowActions: actions },
            }            
        ]
    },
    editConfig:{
        label: 'Product Details'
    }
}

export default class test extends LightningElement {
    @track data = [];
    @track columns = columns;
    @track config = config;
    @track record = {};
    @track tabCollection=[{a:1},{b:2}];
    async connectedCallback() {
        this.data = await fetchDataHelper({ amountOfRecords: 100 });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'show_details':
                this.showRowDetails(row);
                break;
            default:
        }
    }

    deleteRow(row) {
        const { id } = row;
        const index = this.findRowIndexById(id);
        if (index !== -1) {
            this.data = this.data
                .slice(0, index)
                .concat(this.data.slice(index + 1));
        }
    }

    findRowIndexById(id) {
        let ret = -1;
        this.data.some((row, index) => {
            if (row.id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }

    showRowDetails(row) {
        this.record = row;
    }
}
