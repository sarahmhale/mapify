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
mutation createMarker($marker: MarkerInput!) {
  createMarker(marker: $marker) {
    marker: {
      id
      longitude
      latitude
      icon
      song
    }
  }
}
`
export const DELETE_MARKER = gql`
mutation deleteMarker($id: Int!) {
  createMarker(id: $id) {
    message
  }
}
`


export const CREATE_BILLING = gql `
  mutation  createBilling($input: CreateBillingInput!) {
  createBilling(input: $input) {
    bi_address
    bi_postcode
    bi_city
    co_id
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
