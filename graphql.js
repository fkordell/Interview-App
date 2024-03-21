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
const { companies, users, schools, interviews } = require("./models");

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

// Define the User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    userFirstName: { type: GraphQLString },
    userLastName: { type: GraphQLString },
    userEmail: { type: GraphQLString },
    userPassword: { type: GraphQLString },
  }),
});

// Define the School Type
const SchoolType = new GraphQLObjectType({
  name: "School",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    schoolName: { type: GraphQLString },
    schoolAddress: { type: GraphQLString },
    schoolPhone: { type: GraphQLString },
  }),
});

// Define the Interview Type
const InterviewType = new GraphQLObjectType({
  name: "Interview",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    interviewer: { type: GraphQLString },
    position: { type: GraphQLString },
    location: { type: GraphQLString },
    date: { type: GraphQLString }, // Assuming Date is represented as String
    time: { type: GraphQLString },
  }),
});

// Define the root query object for GraphQL queries
const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    // Field to query all companies
    companies: {
      type: GraphQLList(CompanyType),
      resolve: async () => {
        try {
          return await companies.find();
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    // Field to query a company by its ID
    companyById: {
      type: CompanyType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }) => {
        try {
          return await companies.findById(id);
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    // Field to query all users
    users: {
      type: GraphQLList(UserType),
      resolve: async () => {
        try {
          return await users.find();
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    // Field to query a user by ID
    userById: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }) => {
        try {
          return await users.findById(id);
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    // Field to query all schools
    schools: {
      type: GraphQLList(SchoolType),
      resolve: async () => {
        try {
          return await schools.find();
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    // Field to query a school by ID
    schoolById: {
      type: SchoolType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }) => {
        try {
          return await schools.findById(id);
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    // Field to query all interviews
    interviews: {
      type: GraphQLList(InterviewType),
      resolve: async () => {
        try {
          return await interviews.find();
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },
    // Field to query an interview by ID
    interviewById: {
      type: InterviewType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }) => {
        try {
          return await interviews.findById(id);
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
