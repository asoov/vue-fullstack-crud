# Fullstack CRUD-App

This is a fullstack CRUD-App I created for a coding challenge. 

## Structure

It contains a Frontend built with Vue3/Vite/Vitest/Vuetify and a NodeJS Backend with Nest.JS and SQLite as a database.
It's being created as a monorepo to improve code sharing.

## Installation

To install the project, you need to have NodeJS and NPM installed. When working on this project I was using Node v16.17.0.

To install the dependencies, run the following command in the root directory:

`yarn install`

## Running the project

- To start the server in dev mode: `yarn server:start:dev`
- To start the client in dev mode: `yarn client:start:dev`

For other available commands like building and testing refer to the scripts in the package.json files.

## Notes

I opted out of using a state management library like Vuex or Pinia, because I didn't feel like it was necessary for a simple project like this.
However this could be easily implemented if needed.



