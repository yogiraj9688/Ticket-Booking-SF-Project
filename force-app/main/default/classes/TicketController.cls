public with sharing class TicketController {
    @AuraEnabled
    public static Decimal getPrice(Id recordId)
    {
        System.debug('Inside Method');
        Decimal concerts = [
            Select Id, Name, Price__c from Concert__c where Id =: recordId].Price__c;
            return concerts;
    }
}