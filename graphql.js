const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLScalarType,
} = require("graphql");

// Importing the 'companys' model from the './models' directory
const { companies } = require("./models");

// Define the CompanyType
const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    companyName: { type: GraphQLString },
    companyDescription: { type: GraphQLString },
    industryCategory: { type: GraphQLString },
    location: {
      type: new GraphQLObjectType({
        name: "Location",
        fields: () => ({
          address: { type: GraphQLString },
          city: { type: GraphQLString },
          state: { type: GraphQLString },
          country: { type: GraphQLString },
        }),
      }),
    },
    contactInfo: {
      type: new GraphQLObjectType({
        name: "ContactInfo",
        fields: () => ({
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLString },
          favoriteColor: { type: GraphQLString },
          birthday: { type: GraphQLString }, // Assuming Date is represented as String
        }),
      }),
    },
    websiteURL: { type: GraphQLString },
  }),
});

// Define the root query object for GraphQL queries, which includes fields for querying companies
const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    // Field to query all companies, returning a list of CompanyType
    companies: {
      type: GraphQLList(CompanyType),
      resolve: async () => {
        try {
          return await companies.find(); // Use find() to get all companies from the database
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    // Field to query a company by its ID, returning a single CompanyType
    companyById: {
      type: CompanyType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }) => {
        try {
          return await companies.findById(id); // Use findById() to get company by ID
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
