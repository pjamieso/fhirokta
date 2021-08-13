export class Address {
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    country: string = '';

    constructor( theStreet: string, theCity: string, theState: string, theZip: string, theCountry: string ) {
        this.street = theStreet;
        this.city = theCity;
        this.state = theState;
        if ( theZip != undefined ) {
            this.zip = theZip;
        }

        this.country = theCountry;
    }

    toString() {
        if ( ( this.street !== '' ) && ( this.zip !== '' ) ) {
            return `${this.street}, ${this.city}, ${this.state}, ${this.zip}, ${this.country}`;
        }
        else {
            return `${this.street}, ${this.city}, ${this.state}, ${this.country}`;
        }
    }
}