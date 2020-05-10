import gql from "graphql-tag";

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(where: { id: $id }) {
      id
      type
      sportType
      tags
      title
      host
      coaches
      speakers
      date
      startTime
      endTime
      location
      link
      sponsors
      imgUrl
      details
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent(
    $type: String!
    $sportType: String!
    $tags: String!
    $title: String!
    $host: String!
    $coaches: String!
    $speakers: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $location: String!
    $link: String!
    $sponsors: String!
    $imgUrl: String!
    $details: String!
  ) {
    createEvent(
      data: {
        type: $type
        sportType: $sportType
        tags: $tags
        title: $title
        host: $host
        coaches: $coaches
        speakers: $speakers
        date: $date
        startTime: $startTime
        endTime: $endTime
        location: $location
        link: $link
        sponsors: $sponsors
        imgUrl: $imgUrl
        details: $details
      }
    ) {
      id
      type
      sportType
      tags
      title
      host
      coaches
      speakers
      date
      startTime
      endTime
      location
      link
      sponsors
      imgUrl
      details
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $id: ID!
    $type: String!
    $sportType: String!
    $tags: String!
    $title: String!
    $host: String!
    $coaches: String!
    $speakers: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $location: String!
    $link: String!
    $sponsors: String!
    $imgUrl: String!
    $details: String!
  ) {
    updateEvent(
      where: { id: $id }
      data: {
        type: $type
        sportType: $sportType
        tags: $tags
        title: $title
        host: $host
        coaches: $coaches
        speakers: $speakers
        date: $date
        startTime: $startTime
        endTime: $endTime
        location: $location
        link: $link
        sponsors: $sponsors
        imgUrl: $imgUrl
        details: $details
      }
    ) {
      id
      type
      sportType
      tags
      title
      host
      coaches
      speakers
      date
      startTime
      endTime
      location
      link
      sponsors
      imgUrl
      details
    }
  }
`;

////////////// Activity Creation ///////////////
export const CREATE_ACTIVITY = gql`
  mutation CreateActivity(
    $name: String!
    $type: String!
    $sportType: String!
    $date: String!
    $location: String!
    $link: String
    $startTime: String!
    $endTime: String
    $details: String
    $coaches: String!
    $eventId: ID!
  ) {
    createActivity(
      data: {
        name: $name
        type: $type
        sportType: $sportType
        date: $date
        location: $location
        link: $link
        startTime: $startTime
        endTime: $endTime
        details: $details
        coaches: $coaches
        event: { connect: { id: $eventId } }
      }
    ) {
      id
    }
  }
`;

export const GET_ACTIVITIES = gql`
  query getEventActivities($id: ID!) {
    event(where: { id: $id }) {
      id
      title
      date
      location
      activities {
        id
        name
        date
        location
        startTime
        endTime
        type
        details
      }
    }
  }
`;

export const DELETE_ACTIVITY = gql`
  mutation DeleteActivity($id: ID!) {
    deleteActivity(where: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity(
    $id: ID!
    $name: String!
    $startDate: String!
    $startTime: String!
    $location: String
    $link: String
    $type: String
    $details: String
  ) {
    updateActivity(
      data: {
        name: $name
        startDate: $startDate
        startTime: $startTime
        location: $location
        link: $link
        type: $type
        details: $details
      }
      where: { id: $id }
    ) {
      id
      name
      startDate
      startTime
      location
      link
      type
      details
      event {
        title
      }
    }
  }
`;
