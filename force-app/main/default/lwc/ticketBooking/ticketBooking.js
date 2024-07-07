import { LightningElement, api, track } from 'lwc';

import getPrice from '@salesforce/apex/TicketController.getPrice';
import Ticket__c from '@salesforce/schema/Ticket__c';
import Concert__c from '@salesforce/schema/Ticket__c.Concert__c';
import Price__c from '@salesforce/schema/Ticket__c.Price__c';
import Individual__c from '@salesforce/schema/Ticket__c.Individual__c';

import{ ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class TicketBooking extends LightningElement 
{
    showPrice;
    selectedFields = [Concert__c, Individual__c, Price__c];

    @api recordId;
    @track recordId1;
    @track customFormModal = false;

    createTicket(event){
        this.recordId1 = event.detail.id;
        const evt = new ShowToastEvent(
             {
                 title: 'Ticket Booked',
                 message: 'Record Id: ' +event.detail.id,
                 variant: 'success'
             });
             this.dispatchEvent(evt);
             console.log('Ticket Detail : ' +event.detail.fields);
    }
    handleChange(event)
    {
        let targetId= event.target.value;
        console.log('targetId: '+targetId);
        getPrice({ recordId:targetId })
        .then((data) => {
            console.log(data);
            this.showPrice = data;
            console.log('this.showPrice: '+this.showPrice);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Price updated Successfully",
                    message: "",
                    variant: "success"
                })
            );
        })
        .catch((error) =>{
            console.log(error.message);
            this.dispatchEvent(
                new ShowToastEvent({
                    title:"Unable to Update price",
                    message: error.message,
                    variant: "error"
                })
            );
        });
        
    }
    customShowModalPopup()
    {
        this.customFormModal = true;
    }
    customHideModalPopup()
    {
        this.customFormModal = false;
    }
}