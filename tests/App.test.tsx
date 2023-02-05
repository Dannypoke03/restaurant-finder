import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";

import App from "../src/App";
import { RestaurantDetail } from "../src/pages/restaurant/index";
import { getPlacePhotos, getPlaceTips, getRestaurants } from "../src/services/foursquare";

describe("App", () => {
    it("renders", () => {
        act(() => {
            render(<App />);
        });

        expect(screen.getByText("Restaurant Finder")).toBeInTheDocument();
    });

    it("renders Map", async () => {
        let { container } = render(<App />);

        expect(container.querySelector("#map")).toBeInTheDocument();
        // await waitFor(() => {
        //     expect(container.querySelector("#map")?.children.length).toBeGreaterThan(0);
        // });
    });

    it("loads restaurants", async () => {
        const data = await getRestaurants();
        expect(data).not.toBeNull();
        expect(data.results.length).toBeGreaterThan(0);
    });

    it("renders restaurants", async () => {
        act(() => {});
        const mockPlace = {
            fsq_id: "4e85d32d823180b4128b8035",
            categories: [{ id: 13276, name: "Sushi Restaurant", icon: { prefix: "https://ss3.4sqi.net/img/categories_v2/food/sushi_", suffix: ".png" } }],
            chains: [],
            distance: 345,
            geocodes: { main: { latitude: 35.661859, longitude: 139.736583 }, roof: { latitude: 35.661859, longitude: 139.736583 } },
            link: "/v3/places/4e85d32d823180b4128b8035",
            location: { address: "六本木3丁目16-26", address_extended: "ハリファックスビル1F", country: "JP", cross_street: "Halifaxビル 1F", formatted_address: "六本木3丁目16-26 (Halifaxビル 1F), 港区, Tokyo, 106-0032", locality: "Tokyo", postcode: "106-0032", region: "Tokyo" },
            name: "Abe (意気な寿し処 阿部)",
            timezone: "Asia/Tokyo"
        };
        let { container } = render(<RestaurantDetail place={mockPlace} />);
        expect(container.querySelector(".placeDetailed")).toBeInTheDocument();
        expect(container.querySelector(".name")).toHaveTextContent("Abe (意気な寿し処 阿部)");
    });

    it("loads photos", async () => {
        const data = await getPlacePhotos("4e85d32d823180b4128b8035");
        expect(data).not.toBeNull();
        expect(data.length).toBeGreaterThan(0);
    });

    it("loads tips", async () => {
        const data = await getPlaceTips("4e85d32d823180b4128b8035");
        expect(data).not.toBeNull();
        expect(data.length).toBeGreaterThan(0);
    });
});
