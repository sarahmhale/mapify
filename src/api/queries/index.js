import gql from "graphql-tag";

export const GET_MARKERS = gql`
query markers {
  markers {
    id
    longitude
    latitude
    icon
    song
  }
}
`

export const CREATE_MARKER = gql`
query markers {
  markers {
    id
    longitude
    latitude
    icon
    song
  }
}
`

export const DELETE_MARKER = gql`
query markers {
  markers {
    id
    longitude
    latitude
    icon
    song
  }
}
`
