const BSON = require('bson')
let bson = new BSON();

function TinyOctopus (state, task) {
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

  // A new Change Stream instanc
  const change_stream =  source_c.watch(pipeline, options);

  // Fired for each new matching change in the specified namespace.
  change_stream.on('change', function(change) {
      console.log(`=======\n`);

      // marshalling of resumeToken
      const b64String = bson.serialize(change._id).toString('base64')
      const resumeToken = bson.deserialize(Buffer.from(b64String, 'base64'));

      // make update to destination collection
      task.destination_c.forEach((collectionName)=>{

        // destination collection
        const collection = state.db.collection(collectionName);

        const filter = {}
        filter[task.destination_f] = change.documentKey._id

        let temp_update = {}

        for (let key in task.fields) {
          if (change.updateDescription.updatedFields.hasOwnProperty(key)){
            const k = task.fields[key]
            temp_update[k] = change.updateDescription.updatedFields[key]
          }
        }


        const update = {
          "$set" : temp_update
        }

        console.log(filter, update);
        //
        collection.updateMany(filter, update)
          .then((result) => {
            console.log(`update ${result}`);
          })
          .catch((error) => {
            console.log(`error ${error}`);
          });

      })

      console.log(`=======\n`);
  });
}

module.exports = TinyOctopus;
