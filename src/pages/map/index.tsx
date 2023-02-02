import { useEffect, useState } from "react";
import Loader from "../../components/loader/loader";
import { SearchBar } from "../../components/search/search";
import { IFoursquare } from "../../models/foursquare";
import { getRestaurants } from "../../services/foursquare";
import { RestaurantDetail } from "./detail";
import { PlaceListItem } from "./listItem";
import { Map } from "./map";
import "./map.scss";

export default function () {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [lastSearch, setLastSearch] = useState<string>();
    const [places, setPlaces] = useState<IFoursquare.Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<IFoursquare.Place | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getRestaurants(searchTerm);
            setLoading(false);
            setPlaces(data.results);
        };
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
