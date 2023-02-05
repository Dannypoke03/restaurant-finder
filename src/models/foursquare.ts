export namespace IFoursquare {
    export interface Icon {
        prefix: string;
        suffix: string;
    }

    export interface Category {
        id: number;
        name: string;
        icon: Icon;
    }

    export interface Chain {
        id: string;
        name: string;
    }

    export interface Main {
        latitude: number;
        longitude: number;
    }

    export interface Roof {
        latitude: number;
        longitude: number;
    }

    export interface Geocodes {
        main: Main;
        roof: Roof;
    }

    export interface Location {
        address: string;
        census_block?: string;
        country: string;
        cross_street: string;
        dma?: string;
        formatted_address: string;
        locality: string;
        postcode: string;
        region: string;
        address_extended: string;
    }

    export interface Parent {
        fsq_id: string;
        name: string;
    }

    export interface Child {
        fsq_id: string;
        name: string;
    }

    export interface RelatedPlaces {
        parent: Parent;
        children: Child[];
    }

    export interface Place {
        fsq_id: string;
        categories: Category[];
        chains: Chain[];
        distance: number;
        geocodes: Geocodes;
        link: string;
        location: Location;
        name: string;
        related_places?: RelatedPlaces;
        timezone: string;
    }

    export interface Center {
        latitude: number;
        longitude: number;
    }

    export interface Circle {
        center: Center;
        radius: number;
    }

    export interface GeoBounds {
        circle: Circle;
    }

    export interface Context {
        geo_bounds: GeoBounds;
    }

    export interface Response<T> {
        results: T[];
        context: Context;
    }

    export interface Photos {
        id: string;
        created_at: Date;
        prefix: string;
        suffix: string;
        width: number;
        height: number;
        classifications: string[];
    }

    export interface Tip {
        id: string;
        created_at: Date;
        text: string;
    }
}
