import { IFoursquare } from "../../models/foursquare";
import "./listItem.scss";

export function PlaceListItem(props: { place: IFoursquare.Place }) {
    return (
        <div className="place">
            <div className="name">{props.place.name}</div>
            <div className="details">
                <span className="address">{props.place.location.address}</span>
                <span className="distance">{props.place.distance} m</span>
            </div>
        </div>
    );
}
