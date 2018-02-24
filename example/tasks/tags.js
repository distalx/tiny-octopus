module.exports = {
  source_c: "tags",
  destination_c: ['posts'],
  source_f: "_id",
  destination_f: "tags.id",
  fields: {
    'title': "tags.$.title"
  }
};
