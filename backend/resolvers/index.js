const { mergeResolvers } = require('@graphql-tools/merge'); // Import mergeResolvers function from the merge package
const eventResolvers = require('./eventResolvers'); // Import eventResolvers
const userResolvers = require('./userResolvers'); // Import userResolvers

module.exports = mergeResolvers([eventResolvers, userResolvers]); // Export merged resolvers
