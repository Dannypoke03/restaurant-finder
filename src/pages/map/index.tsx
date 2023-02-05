import { useEffect, useState } from "react";
import Loader from "../../components/loader/loader";
import { SearchBar } from "../../components/search/search";
import { IFoursquare } from "../../models/foursquare";
import { getRestaurants } from "../../services/foursquare";
import { RestaurantDetail } from "../restaurant/index";
import { PlaceListItem } from "./listItem";
import { Map } from "./map";
import "./map.scss";

export default function () {
    // Current search term and previous term to avoid duplicate searches and reduce network calls
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [lastSearch, setLastSearch] = useState<string>();

    // List of places and selected place
    const [places, setPlaces] = useState<IFoursquare.Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<IFoursquare.Place | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    // Fetch restaurants when search term changes
    useEffect(() => {
        const fetchData = async () => {
            let data = await getRestaurants(searchTerm);
            setLoading(false);
            setPlaces(data.results);
        };
        // Only fetch if search term is different from last search and not already loading
        if (searchTerm !== lastSearch && !loading) {
            setLoading(true);
            setLastSearch(searchTerm);
            fetchData().catch(err => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [searchTerm]);

    const selectPlace = (place: IFoursquare.Place) => {
        setSelectedPlace(place);
    };

    return (
        <>
            <div className="left">
                <SearchBar onSearch={v => setSearchTerm(v)} />
                {/* List of restaurants */}
                {loading && (
                    <div>
                        <Loader />
                    </div>
                )}
                {!loading && places.length > 0 && (
                    <div className="places">
                        {places.map((place, i) => (
                            <PlaceListItem selected={place === selectedPlace} place={place} setPlace={selectPlace} key={i} />
                        ))}
                    </div>
                )}
            </div>
            <div className="right">
                {!selectedPlace && <Map places={places} />}
                {selectedPlace && (
                    <>
                        <div className="back" onClick={() => setSelectedPlace(null)}>
                            ← Back
                        </div>
                        <RestaurantDetail place={selectedPlace} />
                    </>
                )}
            </div>
        </>
    );
}
