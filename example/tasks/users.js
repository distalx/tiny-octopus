module.exports = {
  source_c: "users",
  destination_c: ['posts', 'comments'],
  source_f: "_id",
  destination_f: "author.id",
  fields: {
    'username': "author.username"
  }
};
