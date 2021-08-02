import './giveSuccess.css';
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { Typography, Grid } from '@material-ui/core';
import Geocode from "react-geocode";
const mapStyles = {
  width: '50%',
  height: "40%",
};
const centers = [
  { position: { lat: 37.7749, lng: -122.4194}, name: 'Hīrā Drop Off Center (1765 California St, San Francisco, CA 94109)', distance: 4 },
  { position: { lat: 37.7993, lng:  -122.3977}, name: 'Hīrā Drop Off Center (1098 The Embarcadero, San Francisco, CA 94111)', distance: 5},
  { position: { lat: 37.8715, lng: -122.2730}, name: 'Hīrā Drop Off Center (2495 Bancroft Way, Berkeley, CA 94704)', distance: 3 },
  { position: { lat: 37.7640954, lng: -122.2419132}, name: 'Hīrā Drop Off Center (2201 Shore Line Dr, Alameda, CA 94501)', distance: 2 },
  { position: { lat: 37.8128, lng: -122.2610}, name: 'Hīrā Drop Off Center (230 Bay Pl, Oakland, CA 94612)', distance: 1},
];
// //function that returns the nearest marker to current location 
// function nearestCenter(centers, location) {
//   for i in centers {
//   }
// }
// // }
// // export default function GiveSuccess(){
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
    userPosition: {}
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInnpmfoWindow: false,
        activeMarker: null
      });
    }
  };
  componentDidMount(){
    Geocode.fromAddress(this.props.user.zip_code).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        this.setState({
          ...this.state,
          userPosition: {latitude: lat, longitude: lng}
        })
      },
      (error) => {
        console.error(error);
      }
    );
  }
  render() {
    Geocode.setApiKey("AIzaSyAYlQ6lsXJey1Uaca8vUVExDcHP4TLGgis");
    return (
    <div>
      <h1 className="title">
        Thank you for your donation!
      </h1>
      <h2 className="subtitle">
        Here are the nearest drop off centers:
      </h2>
      <div className="googleMap">
      <Map
        google={this.props.google}
        zoom={11}
        // center={ { lat: this.state.userPosition.latitude, lng: this.state.userPosition.longitude } }
        center={ { lat: 37.8226, lng:  -122.3706 } } 
        style={mapStyles}
      >
        <Marker className="current location"
          position={ { lat: this.state.userPosition.latitude, lng: this.state.userPosition.longitude } }
          onClick={this.onMarkerClick}
          name={'Current Location'}
        />
      {/* use this to prevent retitive code*/}
        {centers.map(center => (
          <Marker key={center.name}
          position={center.position}
          onClick={this.onMarkerClick}
          name={center.name}
          />
          )
        )}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
      </div>
      <div>
        <h2 className="select">
          Please select a drop off location
        </h2>
        {centers.sort((a,b) => {if(a.distance < b.distance){return -1}else{return 1}}).map(center => (
          <Grid container key={center.name}>
            <Grid item xs={12}>
              <Typography variant="h6">{center.name}</Typography>
              <Typography variant="h6">{center.position.lng}</Typography>
              <Typography variant="h6">{center.distance}</Typography>
            </Grid>
          </Grid>
          )
        )}
      </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAYlQ6lsXJey1Uaca8vUVExDcHP4TLGgis'
})(MapContainer);