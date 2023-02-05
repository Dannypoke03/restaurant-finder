import { useEffect, useState } from "react";
import Loader from "../../components/loader/loader";
import { IFoursquare } from "../../models/foursquare";
import { getPlacePhotos, getPlaceTips } from "../../services/foursquare";
import "./restaurant.scss";

export function RestaurantDetail({ place }: { place: IFoursquare.Place }) {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState<IFoursquare.Photos[]>([]);
    const [reviews, setReviews] = useState<IFoursquare.Tip[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let photos = await getPlacePhotos(place.fsq_id);
            setPhotos(photos);
            let reviews = await getPlaceTips(place.fsq_id);
            setReviews(reviews);
            setLoading(false);
        };
        fetchData().catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [place]);

    return (
        <div className="placeDetailed">
            <div className="name">{place.name}</div>
            <div className="details">
                <span className="address">{place.location.address}</span>
                <span className="distance">{place.distance} m</span>
            </div>
            {loading && <Loader />}
            {!loading && (
                <>
                    <h2>Photos</h2>
                    <div className="photos">
                        {photos.map((photo, i) => (
                            <img key={i} src={photo.prefix + "300x200" + photo.suffix} alt="" />
                        ))}
                    </div>
                    <h2>Reviews</h2>
                    <div className="reviews">
                        {reviews.map((review, i) => (
                            <div key={i} className="review">
                                <div className="text">{review.text}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
