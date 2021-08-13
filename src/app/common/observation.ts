import { ObsComponent } from "./obscomponent";

export class Observation {

    fullUrl: string | undefined;
    id: string;
    status: string;
    category: string;
    loincCode: string;
    display: string;
    issued: Date;
    valueQuantity?: number;
    valueUnit: string = '';
    components: ObsComponent[] = [];


    constructor( observationFhirObject: any ) {
        this.fullUrl = observationFhirObject.fullUrl;
        const observationResource = observationFhirObject.resource;
        this.id = observationResource.id;
        this.status = observationResource.status;
        this.category = observationResource.category[0].coding[0].display;

        if ( observationResource.hasOwnProperty( 'code' ) ) {
            if ( observationResource.code.coding[0].system == "https://loinc.org" ) {
                this.loincCode = observationResource.code.coding[0].code;
            }
            else {
                this.loincCode = '';
            }
        } else {
            this.loincCode = '';
        }

        this.display = observationResource.code.text;
        this.issued = new Date( observationResource.issued );

        if ( observationResource.hasOwnProperty( 'valueQuantity' ) ) {
            this.valueQuantity = +observationResource.valueQuantity.value;
            this.valueUnit = observationResource.valueQuantity.unit;
        }

        if ( observationResource.hasOwnProperty( 'valueCodeableConcept' ) ) {
            this.valueQuantity = -1;
            this.valueUnit = observationResource.valueCodeableConcept.coding[0].display;
        }

        if ( observationResource.hasOwnProperty( 'component' ) ) {
            observationResource.component.forEach( ( item: any ) => {
                let tempComp: ObsComponent = new ObsComponent( item );
                this.components.push( tempComp );
            } );
        }
    }

}
