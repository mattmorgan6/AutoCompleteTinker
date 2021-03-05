
function getJson(data) {
  let arr = []

  // Fill arr with all the genes if they are defined.
  lines = data.split("\n")
  lines.forEach(element => {
    curr = element.split(" ")
    if (curr[1] && curr[2]) {
      obj = {}
      obj["name"] = curr[1]
      obj["coordinate"] = curr[2]
      arr.push(obj)
    }
  });
  
  // newarr = arr.slice(0,95000);
  console.log(arr.length);
  const myJSON = JSON.stringify(arr);
  return myJSON;
}

var fs = require('fs');
console.log("Creating genes12.json")

const filepath = "input.txt"

fs.readFile(filepath, 'utf8', function(err, data) {
  if(err) {
      console.error("Could not open file: %s", err);
      return;
  }

  const myJSON = getJson(data)

  fs.writeFile('genes12.json', myJSON, function(err) {
      if(err) {
          console.error("Could not write file: %s", err);
      }
  });
});