function QueryBuilder (task, change) {
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

  return { filter, update }
}

module.exports = QueryBuilder;
