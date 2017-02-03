var mongoose=require("mongoose");
var Image=mongoose.model("Image");
// call the packages
// bodyparser handling file uploads

/*var app         = express();



// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '200mb' }));*/

/////////************************///////////////
/////// post a new image
/////////************************///////////////


// writing a file (accessed at POST http://localhost:3001/api/files) to the database
module.exports.postImage=function(req, res) {

    console.log("Files route POST /files");

    // lets see what the request looks like
    console.log(req);


    var part = req.files.file;


    // add the user who uploaded the file to the metadata field of the GridFS file document
    var metadata = {
        // username: req.body.username,
        // chatid: req.body.chatid
    };

    var gfs = Grid( mongoose.connection.db);


    // writes the file provided to the GridFS collections with the name the user assigned, May have to look for
    //      collisions and create a view-by-name that is unique


    // filename, mode, etc... are the parameters received/(expected possibly required) with the request
    var writeStream = gfs.createWriteStream({

        filename: part.name,
        mode: 'w',
        content_type: part.mimetype,
        metadata: metadata

    });


    // responding to request and closing connection
    writeStream.on('close', function(file) {

        console.log("response output");

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

/////////************************///////////////
/////// get all images
/////////************************///////////////

module.exports.getImage=function( req, res )
{
    var gfs = Grid( mongoose.connection.db );

    gfs.files.find({'filename': /jpg$/}).toArray( function( error, files )
    {
        if( files.length === 0 )
        {
            return res.status( 400 ).send( { message: 'File not found :(' });
        }

        var jpegImageNames = files.map( function( file ) { return {imageId: file._id, filename: file.filename }; });

        // for( var i = 0; i < files.length; i++ )
        // {
        //     var imageMeta = { imageId : files[i]._id, filename : files[i].filename };
        //     jpegImageNames.push( imageMeta );
        // }


        res.end( JSON.stringify( jpegImageNames ) );
    });
};