import fetchDataMap from '@salesforce/apex/datatableController.fetchDataMap';
import fetchDataMapCached from '@salesforce/apex/datatableController.fetchDataMapCached';
import { deleteRecord } from 'lightning/uiRecordApi';

const _configs=[
    {
        objectName: "App__c",
        soslSearchTerm:"",
        
        searchTerm:"",
        tabid:0,
        editMode:false,
        tableConfig: {
            columns: [
                { id:1,api: 'Name', label: 'App Name', fieldName: 'Name',sortorder:2, sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_App__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties",sectionsort:1},
                { id:2,api: 'Code__c', label: 'Code',sortorder:3, fieldName: 'Code', type: 'boolean', sortable: true ,section:"General Properties",sectionsort:1},
                { id:2,api: 'Version__c', label: 'Version', fieldName: 'Version',sortorder:1, type: 'text', sortable: true ,section:"General Properties",sectionsort:1},
                { id:2,api: 'Is_Gravity_App__c', label: 'Is Gravity App', fieldName: 'Is_Gravity_App',sortorder:4, type: 'text', sortable: true ,section:"General Properties",sectionsort:1},
                { id:2,api: 'System__c', label: 'System', fieldName: 'System',sortorder:5, type: 'text', sortable: true ,section:"General Properties",sectionsort:1},
                { id:2,api: 'Schema_check_date__c', label: 'Schema check date', fieldName: 'Schema_check_date',sortorder:5, type: 'text', sortable: true ,section:"General Properties",sectionsort:1},
                { id:2,api: 'Schema_Org__c', label: 'Schema Org', fieldName: 'Schema_Org',sortorder:5, type: 'text', sortable: true ,section:"General Properties",sectionsort:1},
                { id:2,api: 'Active__c', label: 'Active', fieldName: 'Active',sortorder:5, type: 'text', sortable: true ,section:"General Properties",sectionsort:1},
                {
                    type: 'action',
                    typeAttributes: { rowActions: [] },
                }
            
            ]
        },
        searchConfig:{
            filterColumns:[
                { id:1,api: 'Name', label: 'Name', type: 'text',typeAttributes:{"smallDeviceSize":5,"size":12,"mediumDeviceSize":5,"largeDeviceSize":5,"padding":"around-small"}}
            ] ,
            buttons:[
                {"label":"New","actionType":"new","objectName":"App__c","type":"button"}
            ]
        },
        editConfig:{
            label: 'App Details',
            openMode:"tab",
            columnSize:2,
            columns: [
                { id:1,api: 'Name', label: 'App Name', fieldName: 'Name',sortorder:2, sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_App__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties",sectionsort:1},
                { id:2,api: 'Code__c', label: 'Code',sortorder:3, fieldName: 'Code', type: 'boolean', sortable: true ,section:"General Properties",sectionsort:1},
                { id:1,api: 'Effective_From__c', label: 'Effective From', fieldName: 'Effective_From',sortorder:2, sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#App__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties",sectionsort:1},
                { id:2,api: 'Effective_To__c', label: 'Effective To',sortorder:3, fieldName: 'Effective_To', type: 'boolean', sortable: true ,section:"General Properties",sectionsort:1},
                { id:2,api: 'Version__c', label: 'Version', fieldName: 'Version',sortorder:1, type: 'text', sortable: true ,section:"General Properties",sectionsort:1},
                { id:2,api: 'Active__c', label: 'Active', fieldName: 'Active',sortorder:5, type: 'text', sortable: true ,section:"General Properties",sectionsort:1},
                { id:2,api: 'Description__c', label: 'Description', fieldName: 'Description',sortorder:4, type: 'text', sortable: true ,section:"General Properties",sectionsort:1},
                {
                    type: 'action',
                    typeAttributes: { rowActions: [] },
                }
            
            ]

        },
        children:[{
            objectName: "Object__c",
            relField:  { id:2,api: 'App__c', label: 'App', fieldName: 'App', type: 'Text', sortable: true ,section:"General Properties",value:"",withvalue:true},
            section:"Objects",
            editMode:false,
            tabid:0,
            tableConfig: {
                columns: [
                    { id:1,api: 'Name', label: 'Object Name', fieldName: 'Name',sortorder:2, sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_Object__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties",sectionsort:2},
                    { id:2,api: 'Object_API__c', label: 'Object API', fieldName: 'Object_API',sortorder:1, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                    { id:3,api: 'Object_Code__c', label: 'Object Code', fieldName: 'Object_Code',sortorder:3, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                    { id:4,api: 'Object_Type__c', label: 'Object Type', fieldName: 'Object_Type',sortorder:4, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                    { id:5,api: 'Is_Managed_Object__c', label: 'Is Managed Object', fieldName: 'Is_Managed_Object',sortorder:5, type: 'date', sortable: true ,section:"System Properties",readonly:true,sectionsort:1},
                    { id:6,api: 'Is_Reference_Object__c', label: 'Is Reference Object', fieldName: 'Is_Reference_Object',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                    { id:6,api: 'Is_Deploy_Ready__c', label: 'Is Deploy Ready', fieldName: 'Is_Deploy_Ready',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                    { id:6,api: 'Gravity_GUUID__c', label: 'Gravity UUID', fieldName: 'Gravity_GUUID',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                    {
                        type: 'action',
                        typeAttributes: { rowActions: [] },
                    }
                ]
            },
            editConfig:{
                label: 'Object Details',
                openMode:"slideout",
                columnSize:3,
                columns: [
                    { id:1,api: 'Name', label: 'Object Name', fieldName: 'Name',sortorder:2, sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_Object__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties",sectionsort:2},
                    { id:3,api: 'Object_Code__c', label: 'Object Code', fieldName: 'Object_Code',sortorder:3, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                    { id:2,api: 'Object_API__c', label: 'Object API', fieldName: 'Object_API',sortorder:1, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                    { id:4,api: 'Object_Type__c', label: 'Object Type', fieldName: 'Object_Type',sortorder:4, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                    { id:5,api: 'Is_Managed_Object__c', label: 'Is Managed Object', fieldName: 'Is_Managed_Object',sortorder:5, type: 'date', sortable: true ,section:"System Properties",readonly:true,sectionsort:1},
                    { id:6,api: 'Is_Reference_Object__c', label: 'Is Reference Object', fieldName: 'Is_Reference_Object',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                    { id:6,api: 'Is_Deploy_Ready__c', label: 'Is Deploy Ready', fieldName: 'Is_Deploy_Ready',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                    { id:6,api: 'Gravity_GUUID__c', label: 'Gravity UUID', fieldName: 'Gravity_GUUID',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                    { id:6,api: 'Delete_Allowed__c', label: 'Delete Allowed', fieldName: 'Delete_Allowed',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                    { id:6,api: 'Is_Deploy_Ready__c', label: 'Is Deploy Ready', fieldName: 'Is_Deploy_Ready',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                    {
                        type: 'action',
                        typeAttributes: { rowActions: [] },
                    }
                ]

            }
        }]
    },
    {
        objectName: "Object__c",
        relField:  { id:2,api: 'App__c', label: 'App', fieldName: 'App', type: 'Text', sortable: true ,section:"General Properties",value:"",withvalue:true},
        section:"Objects",
        editMode:false,
        tabid:0,
        tableConfig: {
            columns: [
                { id:1,api: 'Name', label: 'Object Name', fieldName: 'Name',sortorder:2, sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_Object__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties",sectionsort:2},
                { id:2,api: 'Object_API__c', label: 'Object API', fieldName: 'Object_API',sortorder:1, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                { id:3,api: 'Object_Code__c', label: 'Object Code', fieldName: 'Object_Code',sortorder:3, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                { id:4,api: 'Object_Type__c', label: 'Object Type', fieldName: 'Object_Type',sortorder:4, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                { id:5,api: 'Is_Managed_Object__c', label: 'Is Managed Object', fieldName: 'Is_Managed_Object',sortorder:5, type: 'date', sortable: true ,section:"System Properties",readonly:true,sectionsort:1},
                { id:6,api: 'Is_Reference_Object__c', label: 'Is Reference Object', fieldName: 'Is_Reference_Object',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                { id:6,api: 'Is_Deploy_Ready__c', label: 'Is Deploy Ready', fieldName: 'Is_Deploy_Ready',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                { id:6,api: 'Gravity_GUUID__c', label: 'Gravity UUID', fieldName: 'Gravity_GUUID',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                {
                    type: 'action',
                    typeAttributes: { rowActions: [] },
                }
            ]
        },
        editConfig:{
            label: 'Object Details',
            openMode:"slideout",
            columnSize:3,
            columns: [
                { id:1,api: 'Name', label: 'Object Name', fieldName: 'Name',sortorder:2, sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_Object__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties",sectionsort:2},
                { id:3,api: 'Object_Code__c', label: 'Object Code', fieldName: 'Object_Code',sortorder:3, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                { id:2,api: 'Object_API__c', label: 'Object API', fieldName: 'Object_API',sortorder:1, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                { id:4,api: 'Object_Type__c', label: 'Object Type', fieldName: 'Object_Type',sortorder:4, type: 'Text', sortable: true ,section:"General Properties",sectionsort:2},
                { id:5,api: 'Is_Managed_Object__c', label: 'Is Managed Object', fieldName: 'Is_Managed_Object',sortorder:5, type: 'date', sortable: true ,section:"System Properties",readonly:true,sectionsort:1},
                { id:6,api: 'Is_Reference_Object__c', label: 'Is Reference Object', fieldName: 'Is_Reference_Object',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                { id:6,api: 'Is_Deploy_Ready__c', label: 'Is Deploy Ready', fieldName: 'Is_Deploy_Ready',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                { id:6,api: 'Gravity_GUUID__c', label: 'Gravity UUID', fieldName: 'Gravity_GUUID',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                { id:6,api: 'Delete_Allowed__c', label: 'Delete Allowed', fieldName: 'Delete_Allowed',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                { id:6,api: 'Is_Deploy_Ready__c', label: 'Is Deploy Ready', fieldName: 'Is_Deploy_Ready',sortorder:6, sortable: true,section:"System Properties" ,readonly:true,sectionsort:1},
                {
                    type: 'action',
                    typeAttributes: { rowActions: [] },
                }
            ]

        }
    },
    {
        objectName: "Field__c",
        soslSearchTerm:"",
        editMode:false,
        tabid:0,
        tableConfig: {
            columns: [
                { id:1,api: 'Name', label: 'Name', fieldName: 'Name',sortorder:2, sortable: true, type: 'button', typeAttributes: { name: 'edit_#index#_G1_Promotion__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties"},
                { id:2,api: 'Start_Date__c', label: 'Start Date', fieldName: 'Start_Date__c',sortorder:1, type: 'date', sortable: true ,section:"General Properties"},
                { id:3,api: 'CreatedDate', label: 'Created On', fieldName: 'CreatedDate',sortorder:3, type: 'date', sortable: true ,section:"System Properties",readonly:true},
                { id:4,api: 'CreatedBy.Name', label: 'Created By', fieldName: 'CreatedByName',sortorder:4, sortable: true ,section:"System Properties",readonly:true},
                {
                    type: 'action',
                    typeAttributes: { rowActions: [] },
                }
            ]
        },
        editConfig:{
            label: 'Promotion Details',
            openMode:"slideout",
            columnSize:4,
            columns: [
                { id:1,api: 'Name', label: 'Name', fieldName: 'Name', sortable: true,sortorder:2, type: 'button', typeAttributes: { name: 'edit_#index#_G1_Promotion__c',variant:"base",label: {  fieldName: 'Name'},target: '_self'},section:"General Properties"},
                { id:2,api: 'Start_Date__c', label: 'Start Date', fieldName: 'Start_Date__c',sortorder:1, type: 'date', sortable: true ,section:"General Properties"},
                { id:3,api: 'CreatedDate', label: 'Created On', fieldName: 'CreatedDate',sortorder:3, type: 'date', sortable: true ,section:"System Properties",readonly:true},
                { id:4,api: 'CreatedBy.Name', label: 'Created By', fieldName: 'CreatedByName',sortorder:4, sortable: true ,section:"System Properties",readonly:true},
                {
                    type: 'action',
                    typeAttributes: { rowActions: [] },
                }
            ]
        }
    }
];

export function getConfigs()
{
    return _configs;
}


export function deleteObjectRecord(recordId)
{
    return new Promise((resolve,reject) => {
        deleteRecord(recordId).then(resolve).catch(reject);
    });
}


// retrieve the records form database
export function retrieveRecords(params,cacheable) {
    console.log(params);
    return new Promise((resolve, reject) => {
        console.log(params);
        if (cacheable) {
            fetchDataMapCached({ params })
                .then(DataMap => resolve(DataMap))
                .catch(error => reject(error));
        } else {
            fetchDataMap({ params })
                .then(DataMap => resolve(DataMap))
                .catch(error => reject(error));
        }
    });
}

