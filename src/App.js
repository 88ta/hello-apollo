import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_STAR_REPOSITORY = gql `
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR_REPOSITORY = gql `
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const query = gql`
  {
    organization(login: "apollographql") {
      repositories(first: 5, isFork: false) {
        nodes {
          id
          name
          url
          viewerHasStarred
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

const App = () => (
  <Query query={query}>
    {({ loading, data }) => {
      if (loading) return <p>Loading...</p>;

      const repositories = data.organization.repositories.nodes;

      return (
        <ul>
          {repositories.map(repo => (
            <li key={repo.id}>
              <a href={repo.url}>{repo.name}</a>
              <button>{repo.stargazers.totalCount} Star</button>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default App;
