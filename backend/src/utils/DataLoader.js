const DataLoader = require('dataloader');
const User = require('../modules/users/models/User');

const createUserLoader = () => new DataLoader(async (userIds) => {
    const users = await User.find({ _id: { $in: userIds } });
    return userIds.map((id) => users.find((user) => user.id === id));
});

module.exports = createUserLoader;
