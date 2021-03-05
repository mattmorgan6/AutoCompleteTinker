
var fs = require('fs');
console.log("heyo")

const filepath = "input.txt"




fs.readFile(filepath, 'utf8', function(err, data) {
  if(err) {
      console.error("Could not open file: %s", err);
      return;
  }

  let arr = []

  // function myFunc(value) {
  //   curr = value.split()
  //   obj = {}
  //   obj["name1"] = curr[1]
  //   obj["name2"] = curr[2]
  //   arr.push(obj)
  // }

  lines = data.split("\n")
  lines.forEach(element => {
    curr = element.split(" ")
    obj = {}
    obj["name1"] = curr[1]
    obj["name2"] = curr[2]
    arr.push(obj)
  });
  
  const myJSON = JSON.stringify(arr);

  // console.log(lines[0]);
  // console.log(lines[3]);
  // console.log(arr[0]);
  // console.log(arr[2]);

  fs.writeFile('genes.json', myJSON, function(err) {
      if(err) {
          console.error("Could not write file: %s", err);
      }
  });
});