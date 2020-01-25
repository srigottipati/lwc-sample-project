public with sharing class datatableController {

    
    @AuraEnabled(Cacheable=true)
    public static Map<String, Object> fetchDataMapCached(Map<String, Object> params) {
        return fetchDataMap(params);
    }

    @AuraEnabled
    public static List<sObject>  getFieldList(String ObjectName)
    {
        List<sObject> allFieldName = new List<sObject>();
        SObjectType accountType = Schema.getGlobalDescribe().get(ObjectName);
        Map<String,Schema.SObjectField> mfields = accountType.getDescribe().fields.getMap();
        for(Schema.SObjectField field: mfields.values())
        {
            Schema.DescribeFieldResult dfr=field.getDescribe();
            if(dfr.isCreateable())
            {
                 //allFieldName.add(dfr.getName());
            }
        }
        return allFieldName;
    }

    @AuraEnabled
    public static List<String> getAllCustomSObjects()
    {
        List<String> sObjectList = new List<String>();
        for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values())
        {
            Schema.DescribeSObjectResult describeSObjectResultObj = objTyp.getDescribe();
            if(describeSObjectResultObj.isCustom())
            {
                String name = objTyp.getDescribe().getName();
                // Exclude all the unwanted Sobjects e.g. History, Share etc..
                if(!name.containsignorecase('history') && !name.containsignorecase('tag')&&
                !name.containsignorecase('share') && !name.containsignorecase('feed'))
                {
                    SobjectList.add(name);
                }
            }
        }
        system.debug('SObjectList****' + SObjectList);
        return sObjectList;
    }

    @AuraEnabled
    public static Map<String, Object> fetchDataMap(Map<String, Object> params) {

        String objectName = params.containsKey('objectName') ? (String)params.get('objectName') : null;
        String fields = params.containsKey('fields') ? (String)params.get('fields') : null;
        String queryFilters = params.containsKey('queryFilters') ? (String)params.get('queryFilters') : null;
        String sortBy = params.containsKey('sortBy') ? (String)params.get('sortBy') : null;
        String queryType = params.containsKey('queryType') ? (String)params.get('queryType') : null;
        String soslSearchTerm = params.containsKey('soslSearchTerm') ? (String)params.get('soslSearchTerm') : null;
        Boolean sortAsc = params.containsKey('sortAsc') ? (Boolean)params.get('sortAsc') : false;
        Integer limitRecords = params.containsKey('limitRecords') ? Integer.valueOf(params.get('limitRecords')) : null;
        
        try{
            //Initial checks
            String limitRecordsStr = String.valueOf(Integer.valueOf(limitRecords));
            
            //Declare query string
            String query;
            
            //Query initialization for Soql and Sosl
            if(queryType == 'SOQL'){
                query = 'SELECT Id, ' + fields + ' FROM ' + objectName;
            }
            else if(queryType == 'SOSL') {
                query = 'Id, ' + fields;
            }

            //Adding filters
            if(String.isNotBlank(queryFilters)){
                query += ' WHERE ' + queryFilters;
            }
            
            //Adding order by and limit records
            if(String.isNotBlank(sortBy) && queryType == 'SOQL'){
                query += ' ORDER BY ' + sortBy + (sortAsc?' ASC ':' DESC ');
            }
            
            if(String.isNotBlank(limitRecordsStr)) {
                query += ' LIMIT ' + limitRecordsStr;
            }
            
            //Log the query before getting query results from database
            Map<String, Object> returnMap = new Map<String, Object>();
            List<sObject> sObjectsList = new List<sObject>();
            if(queryType == 'SOQL'){
                system.debug('query => '+query);
                sObjectsList = Database.query(query);
            }
            else if(queryType == 'SOSL') {
                query = 'FIND \'' + String.escapeSingleQuotes(soslSearchTerm) + '\' IN ALL FIELDS RETURNING ' + objectName + '(' + query + ')';
                system.debug('query => '+query);
                sObjectsList = Search.query(query)[0];
            }

            returnMap.put('records', sObjectsList);
            
            //Log the result
            system.debug('returnMap => '+returnMap);
            
            return returnMap;     
        }
        catch(Exception ex) {
            system.debug('Error => '+ex.getMessage());
            throw new AuraHandledException(ex.getMessage());
        }   
    }

}