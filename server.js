var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var jFile = require('fs');

var server = http.createServer();


server.on('request', function(req,res){

var fileName;
var contentType;
var getRequest = 0;
var postRequest = 0;

if (req.method === 'GET' && req.url === '/'){
 fileName = './form.html';
 contentType = "'Content-Type': 'text/html'"
 getRequest = 1;
}

else if (req.method === 'POST' && req.url === '/'){
  fileName = './form.html';
  contentType = "'Content-Type': 'text/html'"
  postRequest = 1;
   var userArray = [];
   var jsonObjArray = [];

  var body ='';
  req.on('data', function(data){
    body += data.toString();
  });
  req.on('end', function(){
    var postObj = qs.parse(body);
    // console.log(postObj);

    var bodyArray= body.split("&");

    var start=0;
    var objString='';
    var thisUser=[];
    var numUsers= 0;

    for(var i = 0;i< bodyArray.length;i++){

      var thisString = bodyArray[i];
      if(i !== bodyArray.length -1){
        var nextString = bodyArray[i+1];
      }

      if(thisString.includes("fName")){
        start = i;
      }
      else if(nextString.includes("fName") || (i === bodyArray.length -1)){
        var u=0;
        for(var o= start; o<= i; o++, u++){
          var _data = bodyArray[o].split("=");
          objString = bodyArray[o];
          thisUser[u] = objString//qs.parse(objString);
          // console.log(objString);
        }

        var finalString= "{";
        for(var p=0;p<thisUser.length;p++){
          objString = thisUser[p];
          objString = objString.replace('=', "\":\"");
          objString = objString.replace('\n', "");
          objString = objString.replace('\r', "");
          objString = objString.replace('%40', "@");
          if(p !== thisUser.length -1){
            finalString = finalString + " \""+ objString + "\",";
          }
          else{
            finalString = finalString + " \""+ objString + "\"}";
          }
        }
        // console.log(finalString);
        // var final = qs.parse(finalString);
        // console.log(final);
        var jsonObj = JSON.parse(finalString);
        console.log("Created "+ jsonObj.fName);

        jsonObjArray[numUsers] = jsonObj;
        numUsers++;

      }
    }
        fs.readFile('./data/users.json', 'UTF-8', (err, file) => {

          try{
             userArray = JSON.parse(file);
           }catch(e){}
             // userArray.people.push(Object.assign({},jsonObj));
             // userArray.people.push(jsonObj);
             for(var u=0;u< numUsers;u++){
               userArray.push(jsonObjArray[u]);
               console.log("Added "+ jsonObjArray[u].fName);

             }

             // console.log(JSON.stringify(userArray));

             fs.writeFile('./data/users.json', JSON.stringify(userArray), 'UTF-8', function(err){
               // fs.writeFile('./data/users.json', JSON.stringify(userArray), function(err){
                  // console.log(JSON.stringify(userArray));
                 if (err) console.error(err);
                 // console.log("It's saved!");
             });

        });
        res.writeHead(200);
        res.write('Successfully Posted!, Check the users.html file.');
        getRequest = 0;
        postRequest = 0;
        res.end()
  });
}
else if (req.method === 'GET' && req.url.match(/^\/.+\.png$/)){

  var imgpath = path.join(__dirname,req.url);
  var imgstream = fs.createReadStream(imgpath, { highWaterMark: 1024 });
  res.writeHead(200, {"Content-Type": "image/png"});
  imgstream.pipe(res);
}

else if(req.method === 'GET' && req.url == '/data/users.json'){
  fileName = './data/users.json';
  contentType = "'Content-Type': 'application/json'"


fs.open('./data/users.json', 'ax+', function (err, file) {  });

  getRequest = 1;
}

else if (req.method === 'GET' && req.url === '/users.html'){
 fileName = './users.html';
 contentType = "'Content-Type': 'text/html'"
 getRequest = 1;
}

else if (req.method === 'GET' && req.url === '/formAction.js'){
 fileName = './formAction.js';
 contentType = "'Content-Type': 'application/javascript'"
 getRequest = 1;
}

else {
  res.writeHead(404);
  res.write('404 Error');
  getRequest = 0;
  postRequest = 0;
  res.end()
}

if(getRequest === 1){
  fs.readFile(fileName, function(err, data) {
     res.writeHead(200, {contentType});
     res.write(data);
     getRequest = 0;
     res.end();
   });
 }

});

server.listen(15014);
// server.listen(8080);

console.log('Magic is happening on port 15014');
