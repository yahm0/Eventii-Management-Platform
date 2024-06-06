const { mergeResolvers } = require('@graphql-tools/merge');
const eventResolvers = require('./eventResolvers');
const userResolvers = require('./userResolvers');

module.exports = mergeResolvers([eventResolvers, userResolvers]);
