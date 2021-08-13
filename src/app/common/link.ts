export class Link {
    relation: string = "";
    url: string = "";

    constructor( theLink: any ) {
        this.relation = theLink.relation;
        this.url = theLink.url;
    }
}