import { LightningElement, track, wire } from 'lwc';
import{ NavigationMixin } from 'lightning/navigation';

import getConcerts from '@salesforce/apex/concertData.getConcerts';

export default class EventBooking extends NavigationMixin (LightningElement) {
handleNavigate()
{
    let cmpDef = {
        componentDef: "c:ticketBooking"
    };

    let encodeDef = btoa(JSON.stringify(cmpDef));
    this[NavigationMixin.Navigate]({
        type:"standard__webPage",
        attributes:{
            url: "/one/one.app#" +encodeDef
        }
    });
}

    @track concertList;

    @wire(getConcerts) 
    wiredConcerts({data, error})
    {
        if(data)
        {
            this.concertList = data;
            console.log(data);
        }

        else if(error)
        {
            console.log(error);
        }
    }
}