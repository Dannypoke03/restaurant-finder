import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/debounce";
import "./search.scss";

export function SearchBar(props: { onSearch: (search: string) => void }) {
    const [search, setSearch] = useState<string>("");

    // Alias function where the value can be modified as required before passing the value out to other components
    const onSearch = (v: string) => {
        v = v.trim();
        props.onSearch(v);
    };

    // Debounce the search term to only update 500 ms after user has stopped typing
    const debouncedSearch = useDebounce(search, 500);

    // When the debounced term updates send the value to the callback function
    useEffect(() => {
        onSearch(debouncedSearch);
    }, [debouncedSearch]);

    return (
        <>
            <div className="search-bar">
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search" />
                <i onClick={() => onSearch(search)} className="fas fa-search"></i>
            </div>
            {search}
        </>
    );
}
