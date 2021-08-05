import './giveSuccess.css';
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { Typography, Grid } from '@material-ui/core';
// import { useNavigate } from "react-router";

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Geocode from "react-geocode";



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const OutlinedButtons = ()  => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" href="#outlined-buttons">
        Link
      </Button>
    </div>
  );
}

function SelectCenter() {
  // const navigate = useNavigate()
  // var center = {center}.name
  // navigate("/give/Confirmation")

  <Link to ="/give/Confirmation"> </Link>
}

const mapStyles = {
  width: "40%",
  height: "30%",
};

const centers = [
  { position: { lat: 37.7749, lng: -122.4194}, name: <Typography>Hīrā Drop Off Center (1765 California St, San Francisco, CA 94109)</Typography>, distance: 4},
  { position: { lat: 37.7993, lng:  -122.3977}, name: <Typography>Hīrā Drop Off Center (1098 The Embarcadero, San Francisco, CA 94111)</Typography>, distance: 5},
  { position: { lat: 37.8715, lng: -122.2730}, name: <Typography>Hīrā Drop Off Center (2495 Bancroft Way, Berkeley, CA 94704)</Typography>, distance: 3},
  { position: { lat: 37.7640954, lng: -122.2419132}, name: <Typography>Hīrā Drop Off Center (2201 Shore Line Dr, Alameda, CA 94501)</Typography>, distance: 2},
  { position: { lat: 37.8128, lng: -122.2610}, name: <Typography>Hīrā Drop Off Center (230 Bay Pl, Oakland, CA 94612)</Typography>, distance: 1},
];

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    
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
          <Grid className="addy" container key={center.name}>
            <Grid item xs={12}>
              <Link to ="/give/Confirmation">
              <Button variant="outlined" color="primary">{center.name}, {center.distance}</Button>
              </Link>
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