// GeoJSON data for countries (simplified)
export const geoFeatures = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": { "id": "USA", "name": "United States" },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-124.731422, 49.10506],
              [-124.509595, 48.857194],
              // Add more coordinates for the United States...
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": { "id": "CAN", "name": "Canada" },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-63.6645, 46.55001],
              [-63.6645, 60.001],
              // Add more coordinates for Canada...
            ]
          ]
        }
      },
      // Add more countries here...
    ]
  };
  // Mock population data for countries
export const mockGeographyData = [
    { "id": "USA", "value": 331449281 }, // Population of the United States
    { "id": "CAN", "value": 38005238 },  // Population of Canada
    // Add more population data here for other countries if needed
  ];
  