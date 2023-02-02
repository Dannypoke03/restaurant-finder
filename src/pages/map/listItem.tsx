import { IFoursquare } from "../../models/foursquare";
import "./listItem.scss";

export function PlaceListItem(props: { place: IFoursquare.Place; setPlace: (place: IFoursquare.Place) => void; selected: boolean }) {
    return (
        <div className={"place " + (props.selected && "selected")} onClick={() => props.setPlace(props.place)}>
            <div className="name">{props.place.name}</div>
            <div className="details">
                <span className="address">{props.place.location.address}</span>
                <span className="distance">{props.place.distance} m</span>
            </div>
        </div>
    );
}
