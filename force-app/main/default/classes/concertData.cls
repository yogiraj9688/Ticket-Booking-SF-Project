public with sharing class concertData {

    @AuraEnabled(cacheable=true)
    public static List<Concert__c> getConcerts()
    {
        return [Select Id, Name, Concert_Type__c, Concert_Venue__c, Date_of_Concert__c, Price__c
                From Concert__c where Date_of_Concert__c > TODAY ORDER BY Date_of_Concert__c ASC];
    }
}