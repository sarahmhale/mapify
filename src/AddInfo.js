import React, { Component } from 'react';
import {
  InfoWindow,
  Marker
} from "react-google-maps";
import { Mutation } from "react-apollo";
import {CREATE_MARKER,GET_MARKERS} from './api/queries'


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
    return (<Mutation mutation={CREATE_MARKER}
      update={(cache, { data: { createMarker } }) => {
        const {markers} = cache.readQuery({ query: GET_MARKERS });
        
        cache.writeQuery({
            query: GET_MARKERS,
          data: { markers: markers.concat([createMarker.marker]) }
        });
      }}>
      {(createMarker, { data,error }) => {
        return(
          <Marker
            position={{ lat: this.props.lat, lng: this.props.lng}}
          >
            <InfoWindow >
              <form onSubmit={(event)=>{
                event.preventDefault()
                this.props.doneCreatingMarker()

                createMarker({variables:{marker:{
                  longitude: this.props.lng,
                  latitude:this.props.lat,
                  song:this.state.searchedSong
                }}})

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
        )
        }}
      </Mutation>


    );
  }
}
