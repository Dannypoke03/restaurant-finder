import { useEffect, useState } from "react";
import { SearchBar } from "../../components/search/search";
import { IFoursquare } from "../../models/foursquare";
import { getRestaurants } from "../../services/foursquare";

export default function () {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [lastSearch, setLastSearch] = useState<string>();
    const [places, setPlaces] = useState<IFoursquare.Place[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getRestaurants(searchTerm);
            console.log(data);
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

    return (
        <>
            <div className="left">
                <SearchBar onSearch={v => setSearchTerm(v)} />
                {/* List of restaurants */}
            </div>
            <div className="right">{/* Map of restaurants */}</div>
        </>
    );
}
