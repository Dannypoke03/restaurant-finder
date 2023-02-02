import { IFoursquare } from "../models/foursquare";

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
        ll: "35.6646782,139.7378198", // Cogent Labs
        open_now: "true"
    });
    const url = `https://api.foursquare.com/v3/places/search?${urlParams.toString()}`;
    const response = await fetch(url, {
        headers: {
            Authorization: import.meta.env.VITE_FOURSQUARE_API
        }
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: IFoursquare.Response<IFoursquare.Place> = await response.json();
    return data;
};

export const getPlacePhotos = async (id: string) => {
    const url = `https://api.foursquare.com/v3/places/${id}/photos`;
    const response = await fetch(url, {
        headers: {
            Authorization: import.meta.env.VITE_FOURSQUARE_API
        }
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: IFoursquare.Photos[] = await response.json();
    return data;
};

export const getPlaceTips = async (id: string) => {
    const url = `https://api.foursquare.com/v3/places/${id}/tips`;
    const response = await fetch(url, {
        headers: {
            Authorization: import.meta.env.VITE_FOURSQUARE_API
        }
    });
    if (!response.ok) throw new Error(response.statusText);
    const data: IFoursquare.Tip[] = await response.json();
    return data;
};
