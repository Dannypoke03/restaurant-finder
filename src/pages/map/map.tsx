import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { IFoursquare } from "../../models/foursquare";
import { config } from "../../utils/config";
import { COGENT_LABS_LOCATION } from "../../utils/constants";
import "./map.scss";

export function Map({ places }: { places: IFoursquare.Place[] }) {
    const loader = new Loader({
        apiKey: config.googleMapsAPI,
        version: "weekly"
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

    useEffect(() => {
        // load map on first load of component
        loader.load().then(() => {
            const tempMap = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: COGENT_LABS_LOCATION,
                zoom: 15
            });
            setMap(tempMap);

            // Add cogent labs marker
            new google.maps.Marker({
                position: COGENT_LABS_LOCATION,
                map: tempMap,
                title: "Cogent Labs",
                label: {
                    fontFamily: "Fontawesome",
                    text: "\uf0b1"
                }
            });
            addMarkersFromProps(tempMap);
        });
    }, []);

    useEffect(() => {
        addMarkersFromProps(map!);
    }, [places]);

    // Add markers to map
    // Takes map as argument because map is not yet loaded when this function is called
    const addMarkersFromProps = (curMap: google.maps.Map) => {
        // Remove old markers
        for (const marker of markers) {
            marker.setMap(null);
        }
        let tempMarkers = [];
        // Add new markers
        for (const place of places) {
            const marker = new google.maps.Marker({
                position: { lng: place.geocodes.main.longitude, lat: place.geocodes.main.latitude },
                map: curMap,
                title: place.name,
                label: {
                    fontFamily: "Fontawesome",
                    text: "\uf2e7"
                }
            });
            marker.setMap(curMap);
            tempMarkers.push(marker);
        }
        setMarkers(tempMarkers);
    };

    return (
        <div className="map">
            <div id="map" ref={ref}></div>
        </div>
    );
}
