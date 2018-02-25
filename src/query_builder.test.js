const expect = require ('chai').expect;
const QueryBuilder = require('./query_builder');

describe('QueryBuilder',function(){
  it('update query',function(){
    const task = {
      source_c: "tags",
      destination_c: ['posts'],
      source_f: "_id",
      destination_f: "tags.id",
      fields: {
        'title': "tags.$.title"
      }
    };

    const change = {
      documentKey: { _id: '2' },
      updateDescription: { updatedFields: { title: 'JS' }, removedFields: [] }
    };

    const { filter, update } = QueryBuilder(task, change)

    expect(filter).to.deep.equal({ 'tags.id': '2' });
    expect(update).to.deep.equal({ '$set': { 'tags.$.title': 'JS' } });

  });
});
