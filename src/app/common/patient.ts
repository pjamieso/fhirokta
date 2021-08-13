import { Address } from "./address";

export class Patient {

    fullUrl: string | undefined;
    id: string;
    firstName: string;
    lastName: string;
    nameUse?: string;
    mobilePhone?: string;
    homePhone?: string;
    gender: string;
    birthDate: Date;
    deceasedDate?: Date;
    maritalStatus: string;
    multipleBirth?: boolean;
    language?: string;
    language2?: string;
    address?: Address;
    birthPlace?: Address;
    maidenName?: string;
    mrnIdentifier?: string;
    ssnIdentifier?: string;


    constructor( patientFhirObject: any ) {
        this.fullUrl = patientFhirObject.fullUrl;
        const patietResource = patientFhirObject.resource;
        this.id = patietResource.id;
        this.firstName = patietResource.name[0].given[0];
        this.lastName = patietResource.name[0].family;
        this.nameUse = patietResource.name[0].use;
        this.gender = patietResource.gender;
        this.birthDate = new Date( patietResource.birthDate );
        this.maritalStatus = patietResource.maritalStatus.text;
        if ( this.maritalStatus === 'M' ) {
            this.maritalStatus = "Married";
        } else {
            if ( this.maritalStatus === 'S' ) {
                this.maritalStatus = "Single";
            }
        }

        if ( patietResource.hasOwnProperty( 'deceasedDateTime' ) ) {
            this.deceasedDate = new Date( patietResource.deceasedDateTime );
        }

        if ( patietResource.hasOwnProperty( 'multipleBirthBoolean' ) ) {
            this.multipleBirth = patietResource.multipleBirthBoolean;
        }

        if ( patietResource.hasOwnProperty( 'telecom' ) ) {
            patietResource.telecom.forEach( ( item: any ) => this.telecomHelper( item ) );
        }

        if ( patietResource.hasOwnProperty( 'communication' ) ) {
            this.language = patietResource.communication[0].language.text;
            if ( patietResource.communication.length > 1 ) {
                this.language2 = patietResource.communication[1].language.text;
            }
        }

        if ( patietResource.hasOwnProperty( 'identifier' ) ) {
            patietResource.identifier.forEach( ( item: any ) => this.identifierHelper( item ) );
        }

        if ( patietResource.hasOwnProperty( 'address' ) ) {
            const address = patietResource.address[0];
            this.address = new Address( address.line[0], address.city, address.state, address.postalCode, address.country );
        }

        if ( patietResource.hasOwnProperty( 'extension' ) ) {
            patietResource.extension.forEach( ( item: any ) => this.extensionHelper( item ) );
        }

    }


    extensionHelper( ext: any ) {
        if ( ext.url == 'http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName' ) {
            this.maidenName = ext.valueString;
        }

        if ( ext.url == 'http://hl7.org/fhir/StructureDefinition/patient-birthPlace' ) {
            const valueAddress = ext.valueAddress;
            this.birthPlace = new Address( "", valueAddress.city, valueAddress.state, "", valueAddress.country );
        }
    }


    telecomHelper( tele: any ) {
        if ( tele.use == 'home' ) {
            this.homePhone = tele.value;
        }
        else {
            if ( tele.use == 'mobile' ) {
                this.mobilePhone = tele.value;
            }
        }
    }

    identifierHelper( ident: any ) {
        //console.log( ident );
        if ( ident.hasOwnProperty( 'type' ) ) {

            if ( ident.type.text == 'Medical Record Number' ) {
                this.mrnIdentifier = ident.value;
            }
            else {
                if ( ident.type.text == 'Social Security Number' ) {
                    this.ssnIdentifier = ident.value;
                }
            }
        }
    }
}
