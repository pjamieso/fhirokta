export class ObsComponent {
    system: string = "loinc";
    code: string = '';
    display: string = '';
    valueQuantity?: number;
    valueUnit: string = '';

    constructor( obscomp: any ) {
        this.display = obscomp.code.text;
        if ( obscomp.hasOwnProperty( 'code.coding' ) ) {
            if ( obscomp.code.coding[0].system !== "https//loic.org" ) {
                this.system = obscomp.coding.code[0].system;
                this.code = obscomp.coding.code[0].code;
            }
        }

        if ( obscomp.hasOwnProperty( 'valueQuantity' ) ) {
            this.valueQuantity = +obscomp.valueQuantity.value;
            this.valueUnit = obscomp.valueQuantity.unit;
        }
    }
}