# travelAppUdacity

This is a full JS server/client project for Udacity Frontend Developer nanodegree.

Using 3 different apis (Geonames, Weatherbit, and Pixabay), the server builds an entire trip with destination, dates, weather and destination image.

The client displays a grid of trips showing the full information that the server returns plus the time left to the trip date.

## Functionality

In this project you can list and manage trips (add and delete).

- To add a new trip, click the blue button on le bottom right of the screen.
- To delete, move your mouse to the top right corner of the trip card, and a deleting button will display. Just click on it.


## Before starting

- Open the console in the project's folder
- Run `npm install`

## Running the project

### Start the server

- Open the terminal on the project's folder
- Run `npm run start-server`

### Start the client

- Open the terminal on the project's folder
- Run `npm start`
- Open in your browser http://localhost:8000/

### More

To be able to use the api you will need:

- Create a `.env` file at the root of the project.
- In that file add the following code:
`PIXABAY_API_KEY=XXXXXXXX`
`GEONAMES_USERNAME=XXXXXX`
`WEATHERBIT_API_KEY=XXXXX`
- Replace the `X` with your api keys and username.
> **Note:**  You will need to register in all the api providers listed above.

## Build

- Run `npm run build`


## Test

- Run `npm run test`
