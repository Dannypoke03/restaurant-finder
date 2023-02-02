import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { IFoursquare } from "../../models/foursquare";
import "./map.scss";

export function Map({ places }: { places: IFoursquare.Place[] }) {
    const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_API,
        version: "weekly"
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

    useEffect(() => {
        loader.load().then(() => {
            const tempMap = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lng: 139.7378198, lat: 35.6646782 },
                zoom: 15
            });
            setMap(tempMap);

            // Add cogent labs marker
            new google.maps.Marker({
                position: { lng: 139.7378198, lat: 35.6646782 },
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

    const addMarkersFromProps = (curMap: google.maps.Map) => {
        // console.log(places, map);
        // Remove old markers
        for (const marker of markers) {
            marker.setMap(null);
        }
        let tempMarkers = [];
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
