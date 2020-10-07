const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

/*
// All IDs set automatically by mongoDB compass
// Don't forget to update after creation
const directorsJson = [
  { "name": "Quentin Tarantino", "age": 55 }, // 5f7d7c3175691806366dc91f
  { "name": "Michael Radford", "age": 72 }, // 5f7d7dbd75691806366dc922
  { "name": "James McTeigue", "age": 51 }, // 5f7d7dce75691806366dc923
  { "name": "Guy Ritchie", "age": 50 }, // 5f7d7ddd75691806366dc924
];
// directorId - it is ID from the directors collection
const moviesJson = [
  { "name": "Pulp Fiction", "genre": "Crime", "directorId": "5f7d7c3175691806366dc91f" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "5c84caebfb6fc0720131f9e4" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "5c84cb24fb6fc0720131f9e8" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "5f7d7ddd75691806366dc924" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "5f7d7c3175691806366dc91f" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "5f7d7c3175691806366dc91f" },
  { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "5f7d7c3175691806366dc91f" },
  { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "5f7d7ddd75691806366dc924" },
]

const movies = [
  { id: '1', name: "Pulp Fiction", genre: "Crime", directorId: "1" },
  { id: '2', name: "1984", genre: "Sci-Fi", directorId: "2" },
  { id: '3', name: "V for vendetta", genre: "Sci-Fi-Triller", directorId: "3" },
  { id: '4', name: "Snatch", genre: "Crime-Comedy", directorId: "4" },
  { id: '5', name: "Reservoir Dogs", genre: "Crime", directorId: "1" },
  { id: '6', name: "The Hateful Eight", genre: "Crime", directorId: "1" },
  { id: '7', name: "Inglourious Basterds", genre: "Crime", directorId: "1" },
  { id: '8', name: "Lock, Stock and Two Smoking Barrels", genre: "Crime-Comedy", directorId: "4" },
]

const directors = [
	{ id: '1', name: "Quentin Tarantino", age: 55 },
  { id: '2', name: "Michael Radford", age: 72 },
  { id: '3', name: "James McTeigue", age: 51 },
  { id: '4', name: "Guy Ritchie", age: 50 },
]
*/

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find(director => director.id === parent.id)
      }
    }
  }),
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter(movie => movie.directorId === parent.id)
      },
    },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find(movie => movie.id === args.id)
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find(director => director.id === args.id)
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
})
