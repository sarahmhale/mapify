import React, { Component } from 'react'
import { Query } from "react-apollo"
import { GET_LEDAMOTER } from '../../queries'
import gql from "graphql-tag"
import SwipeContainer from '../../../Components/SwipeContainer'
import { ClipLoader } from 'react-spinners'
import 'react-loading-bar/dist/index.css'

export default class LedamoterList extends Component {

  render(){
    let nr = 16;
    return (
      <Query query={GET_LEDAMOTER} variables={{nr}}>
        {({ loading, error, data }) => {
          if (loading) return (
            <div className="loader-container">
              <ClipLoader size={56} color={'#FE6060'} loading={true} />
              <p className="loader-text">Hämtar ledamöter...</p>
            </div>
          )
          if (error) {
            console.log(error);
            return <p>Error :(</p>;
            }
          return <SwipeContainer ledamoter={data.ledamoter}/>
        }}
      </Query>
    )
  }
}
