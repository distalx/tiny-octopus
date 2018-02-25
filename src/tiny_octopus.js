const QueryBuilder = require('./query_builder');
const Task = require('./task');


function TinyOctopus (state, task) {
  try {
    task = new Task(task)
  } catch (e) {
    throw new Error(e)
  }

  // source collection
  const source_c = state.db.collection(task.source_c);

  // pipeline An array of aggregation-pipeline
  const pipeline = [
    {
      $match: {
        operationType: 'update'
      }
    }
  ]

  // optional settings
  const options = {
    "fullDocument": "updateLookup"
  }

  // A new Change Stream instance
  const change_stream =  source_c.watch(pipeline, options);


  // Fired for each new matching change in the specified namespace.
  change_stream.on('change', function(change) {


    // make update to destination collection
    task.destination_c.forEach((collectionName)=>{

      // destination collection
      const collection = state.db.collection(collectionName);

      const { filter, update } = QueryBuilder(task, change)


      collection.updateMany(filter, update)
        .then((result) => {
          console.log(`update ${result}`);
        })
        .catch((error) => {
          console.log(`error ${error}`);
        });

    })


  });
}

module.exports = TinyOctopus;
