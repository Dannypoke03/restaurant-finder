# Restaurant Finder App

## Problem & Solution

The proposed problem was to find a place for lunch close by to the company address. To solve this problem this website app was created. Using available API's it will list restaurant locations within a 1km radius of the company that are currently open. These restaurant are then displayed on a map where details and photos from each place can be seen. To further assist with choosing a restaurant, the results may be filtered by a query from the user to find more applicable options.

## Technical choices

Vite was used for the project setup as it provides an easy to use project setup tool and a good overall developer experience with hot reload and bundling speeds. Vite also has a lot of community support increasing the available resources online for extra functionality such as a reliable testing library (Vitest).

The rest of the project was setup with React and SCSS. SCSS was setup for developer experience as it can be much nicer to use than plain CSS and for the limited amount of styling required for this app it was appropriate. For a larger app a proper design system should be created, or an existing one such as tailwind would be better suited.

For app architecture, this project only contains a front-end application which connects to external API's. The structure for this project is broken down into multiple folders/sections. `tests` contain all test specification files. `public` contains all public resources that will be served with the application, such as static images and fonts. `src` is where the logic of the application lives. Which is then further broken down. `assets` is for private assets that will be bundled and not served publicly. `components` is for a collection of common components that are reused throughout the app. `hook` is for any custom defined hooks that can be reused. `models` is for all typescript interface and type declarations, such as API response types and more. `pages` is where the main components for each "page" of the app live along with their styles. `services` contain common functions for data fetching to be reused in the app. Finally `utils` contain a collection of small useful code snipits or commonly used functions.

## Trade offs

With more time I'd improve the overall user experience by adding better error handling, more information on restaurants, small comfort features such as better map interactivity. Additionally with more time I'd flesh out the currently limited testing suite to cover more of the app.

Security was also a trade off as both the Google API token and Foursquare API token would be exposed to the end user. If properly implemented both of these tokens should be properly restricted and proxied through a server side application such that the tokens are not publicly exposed.

## Other work

Two projects (that are publicly available) that I'm proud of my work in are:

-   A npm package to manage websocket connections to a beatsaber tournament server [Github](https://github.com/Dannypoke03/TournamentAssistantClient) - [NPM](https://npmjs.org/package/tournament-assistant-client)
-   Frontend design & development work on Scoresaber, a beatsaber leaderboard website [Github](https://github.com/ScoreSaber/ScoreSaber-Frontend) - [Website](https://scoresaber.com/)

Finally here are links to my [resume](https://drive.google.com/file/d/12tJJxBtDAOalf7QiNajOE5pEs1pz7sa5/view?usp=share_link) and [Github Profile](https://github.com/Dannypoke03)
