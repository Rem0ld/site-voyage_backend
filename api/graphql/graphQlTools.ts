
const typeDefs = `
type User {
  id: ID
  createdAt: Date
  updatedAt: Date
  email: String
  username: String
  country: String
  city: String
  zip: String
  role: RoleEnum
}

type Notification {
  id: ID
  user: User
  travelId: Int
}

type Review {
  id: ID
  comment: String
  score: Int
  user: User
  country: Country
  url: String
}

type Country {
  id: ID
  numericCode: String
  createdAt: Date
  updatedAt: Date
  name: String
  capital: String
  topLevelDomain: [String!]
  alpha2Code: String
  alpha3Code: String
  callingCodes: [String!]
  altSpellings: [String!]
  region: String
  subregion: String
  population: Int
  latlng: [Int!]
  demonym: String
  area: String
  gini: Int
  timezones: [String!]
  borders: [String!]
  nativeName: String
  currencies: [JSON]
  languages: [JSON]
  translations: [JSON]
  flag: String
  regionalBlocks: [JSON]
  cioc: String
}

type Travel {
  id: ID
  destination: String
  fromCountry: String
  user: User
  done: Boolean
}

type Picture {
  id: ID
  destination: String
  fromCountry: String
  user: User
  country: Country
  url: String
}

# Date custom scalar type
scalar Date

enum RoleEnum {
  ADMIN
  USER
}

# JSON scalar type
scalar JSON

type Query {
  getAllUser: [User]
  getOneUser(id: Int!): User
}
`
