var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
//reading multiple files
var MultiStream = require('multistream');
var fs = require('fs');

//get a specific file by vin (accessed at GET http://localhost:3000/api/getImageByVin/{vin})
//i used filename=vin number of the car, so i can bring all the images for a specific vin number 
///////////////start////////////
module.exports.getImageByVin = function (req, res){
 var gfs = Grid(conn.db);
 var arr = [];
var i =0;
//added this to return all the images at once, it's unmodefied code
gfs.files.find({}, {}).forEach(function (files) {

    if (files.length === 0) {
        return res.status(400).send({
            message: 'File not found'
        });
    }

        arr.push(files);

        res.writeHead(200, {'Content-Type': arr[i].contentType});

        var readstream = gfs.createReadStream({
            filename: arr[i].filename
        });

        arr.splice(i, 1 );

        readstream.on('data', function (data) {
            res.write(data);  
        });

        readstream.on('end', function () {
            res.end();   
        });

        readstream.on('error', function (err) {
            console.log('An error occurred!', err);
            throw err;
        });

});

};
}

////////////////end//////////////


//get a specific file (accessed at GET http://localhost:3000/api/getImageById/{file_id})
module.exports.getImageById = function (req, res){

    console.log("hit the /files get route");

    // see what the request looks like
    //console.log(req);
    //console.log(req.params.file_id);
/*    res.send(req.params)*/
    var gfs = Grid(conn.db);

    // finds the specific file by id
    // we can substitute vin number to find image for a car
    gfs.files.find({ "_id": mongoose.Types.ObjectId(req.params.file_id) }).toArray(function (err, files) {

        // if no results returned, send message that file was not found
        if(files.length===0){
            return res.status(400).send({
                message: 'File not found'
            });
        }
      // console.log(files);

        // unsure why there is a need to specify the filename or contentType
        var readstream = gfs.createReadStream({
             _id: req.params.file_id
        });
        // not sure if this is needed or not, but keeping it in here for now...
        res.set('Content-Type', files[0].contentType);
        // This allows the client to directly download the file requested, if requesting the file via an href
        // path within an html element
        res.set('Content-Disposition', 'attachment; filename=' + files[0].filename);
     //   console.log(res);
        // set up the readstream pipe to send the result out as a html response
       
       readstream.pipe(res);
    });

};



// get all files associated with a specific chat (Accessed at GET http://localhost:3000/api/files/chat/{chat_id})
module.exports.getImages = function (req, res){

    console.log("hit the /files/chat get route");

    var gfs = Grid(conn.db);

    // why the need for the .toArray, when with other non-GridFS routes there is no need...?
    gfs.files.find().toArray(function(err, files) {
        if (err)
            res.send(err);
        res.json(files);
        
    });

};

// write a file (accessed at POST http://localhost:3000/api/files)
module.exports.postAFile = function(req, res){

    console.log("hit the /files post route");
    
    // lets see what the request looks like
    var part = req.files.file;
    var vin =req.body.vin;

    // add the user who uploaded the file to the metadata field of the GridFS file document
    var metadata = {
          vin: vin
    };
 
// console.log("part name is " + part.name + " and req.body.vin is " +vin);
    var gfs = Grid(conn.db);
    // writes the file provided to the GridFS collections and gives it a name
    // the name is specified by the filename field
    // opens a write stream with the follow parameters
    var writeStream = gfs.createWriteStream({
       // id: req.body._id,
       // filename: part.name,
        filename: vin,
        mode: 'w',
        content_type: part.mimetype,
        metadata: metadata
    });

    // close event that's triggered when you call writeStream.end()?
    writeStream.on('close', function(file) {
        console.log("in callback function of writeStream.on('close')");
        // send back the fileid
        res.json({
            id: file._id,
            dateUploaded: file.uploadDate
        });
    });

    // writes the data to GridFS?
    writeStream.write(part.data);
    console.log("after writeStream.write()");
    // closes the write stream
    writeStream.end();
    console.log("after writeStream.end()");

};

///this is giving me a json format i need to display it in stream image????????????????
// module.exports.getImageByVin = function (req, res){
//     var gfs = Grid(conn.db);

//     // why the need for the .toArray, when with other non-GridFS routes there is no need...?
//     gfs.files.find({filename: req.params.vin } ).toArray(function(err,files){
//   console.log(files.length);
//                 // if no results returned, send message that file was not found
//         if(files.length===0){
//             return res.status(400).send({
//                 message: 'File not found'
//             });
//         }

//   console.log(" read stream is given as ");
//     console.log(" read stream is given as ");
// /*   var readstream = gfs.createReadStream({
//       _id: req.params.id
//    });
//    readstream.pipe(res);
// */
// res.json(files);
// })
// }

module.exports.getImageByVin11 = function (req, res){

    console.log("hit the /files get route");

    // see what the request looks like
    //console.log(req);
    //console.log(req.params.file_id);
/*    res.send(req.params)*/
    var gfs = Grid(conn.db);

    // finds the specific file by id
    // we can substitute vin number to find image for a car
    gfs.files.find({ filename: req.params.vin }).toArray(function (err, files) {
       // if no results returned, send message that file was not found   
        if(files.length===0){
            return res.status(400).send({
                message: 'File not found'
            });
        }

    var vin=req.params.vin;
        // unsure why there is a need to specify the filename or contentType
        // streaming from gridfs



       var readstream =  gfs.createReadStream({filename : vin});
            

readstream.pipe(res) 
//MultiStream(readstream).pipe(res);
      
/*        // not sure if this is needed or not, but keeping it in here for now...
        res.set('Content-Type', files[0].contentType);
        // This allows the client to directly download the file requested, if requesting the file via an href
        // path within an html element
        res.set('Content-Disposition', 'attachment; filename=' + files[0].filename);
        //   console.log(res);
        // set up the readstream pipe to send the result out as a html response
       


        //error handling, e.g. file does not exist
        readstream.on('error', function (err) {
          console.log('An error occurred!', err);
          throw err;
        });

        readstream.pipe(res);*/
    

    })

};

