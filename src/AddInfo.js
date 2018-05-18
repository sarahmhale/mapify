import React, { Component } from 'react';
import {
  InfoWindow,
  Marker
} from "react-google-maps";


export class AddInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedSong: '',

    }
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    this.setState({ searchedSong: event.target.value });
  }



  render() {
    return (
      //TODO: mutation
      //  <Mutation mutation={CREATE_MARKER}>
      //  {(createMarker, { data,error }) => {
      <Marker
        position={{ lat: this.props.lat, lng: this.props.lng}}
      >
        <InfoWindow >
          <form onSubmit={(event)=>{
            event.preventDefault()
            this.props.handleToggleOpen()
            //createMarker(input: .....)

          }}>
            <label>
              Song:
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
              />
            </label>
            <input
              type="submit"
              value="Submit"
            />
          </form>
        </InfoWindow>

        </Marker>
        //   }}
        //</Mutation>


    );
  }
}
