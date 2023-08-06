function transformFieldsToObject(input) {
  const output = JSON.parse(JSON.stringify(input)); // Deep copy the input
  const fieldsArray = output.data.object.fields;
  delete output.data.object.fields; // Remove the fields array from the output

  fieldsArray.forEach(field => {
    output.data.object[field.key] = field.value; // Add each key-value pair to the output
  });

  return output;
}

const input = {
  "data": {
    "object": {
      "fields": [
        {
          "key": "key1",
          "value": "value1"
        },
        {
          "key": "key2",
          "value": "value2"
        },
        {
          "key": "key3",
          "value": "value3"
        }
      ]
    }
  }
};

console.log(transformFieldsToObject(input));
