import gql from "graphql-tag";

export const GET_MARKERS = gql `
query markers {
  markers {
    id
    longitude
    latitude
    song
  }
}
`

export const CREATE_MARKER = gql `
mutation createMarker($marker: MarkerInput!) {
  createMarker(marker: $marker) {
    marker{
      id
      longitude
      latitude
      song
    }
  }
}
`

export const DELETE_MARKER = gql `
mutation deleteMarker($id: Int!) {
  deleteMarker(id: $id) {
    message
  }
}
`
