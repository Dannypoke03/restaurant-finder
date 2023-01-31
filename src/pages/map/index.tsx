import { SearchBar } from "../../components/search/search";

export default function () {
    return (
        <>
            <div className="left">
                <SearchBar onSearch={v => console.log(v)} />
                {/* List of restaurants */}
            </div>
            <div className="right">{/* Map of restaurants */}</div>
        </>
    );
}
