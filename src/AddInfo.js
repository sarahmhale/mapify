import React, { Component } from 'react';
import {
  InfoWindow
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
      <InfoWindow >
        <form onSubmit={(event)=>{
          event.preventDefault()
          this.props.handleSubmit(this.state.searchedSong)
          this.props.setSong(this.state.searchedSong)
          this.props.handleToggleOpen()
        }


        }>
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

    )
  }
}
