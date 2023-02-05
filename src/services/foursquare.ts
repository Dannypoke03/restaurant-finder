import { IFoursquare } from "../models/foursquare";
import { config } from "../utils/config";
import { COGENT_LABS_LOCATION } from "../utils/constants";

/**
 * https://location.foursquare.com/developer/reference/place-search
 * @param query search query
 * @returns list of restaurants in the area filtered by query
 */
export const getRestaurants = async (query: string = "") => {
    const urlParams = new URLSearchParams({
        ...(query && {
            query: query
        }),
        radius: "1000",
        categories: "13065", // All Restaurants - All Categories: https://location.foursquare.com/places/docs/categories
        ll: `${COGENT_LABS_LOCATION.lat},${COGENT_LABS_LOCATION.lng}`,
        open_now: "true"
    });
    const url = `https://api.foursquare.com/v3/places/search?${urlParams.toString()}`;
    const response = await fetch(url, {
        headers: {
            Authorization: config.foursquareAPI
        }
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: IFoursquare.Response<IFoursquare.Place> = await response.json();
    return data;
};

/**
 * https://location.foursquare.com/developer/reference/place-photos
 * @param id foursquare id
 * @returns a list of photos for a place
 */
export const getPlacePhotos = async (id: string) => {
    const url = `https://api.foursquare.com/v3/places/${id}/photos`;
    const response = await fetch(url, {
        headers: {
            Authorization: config.foursquareAPI
        }
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: IFoursquare.Photos[] = await response.json();
    return data;
};

/**
 * https://location.foursquare.com/developer/reference/place-tips
 * @param id foursquare id
 * @returns a list of tips for a place
 */
export const getPlaceTips = async (id: string) => {
    const url = `https://api.foursquare.com/v3/places/${id}/tips`;
    const response = await fetch(url, {
        headers: {
            Authorization: config.foursquareAPI
        }
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: IFoursquare.Tip[] = await response.json();
    return data;
};
