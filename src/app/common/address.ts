export class Address {
    street?: string;
    city: string;
    state: string;
    zip: string;
    country: string;

    constructor( theStreet: string, theCity: string, theState: string, theZip: string, theCountry: string ) {
        this.street = theStreet;
        this.city = theCity;
        this.state = theState;
        this.zip = theZip;
        this.country = theCountry;
    }
}