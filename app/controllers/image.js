var config      = require('../config/main');

var uuid = require('uuid'); // https://github.com/defunctzombie/node-uuid
var multiparty = require('multiparty'); // https://github.com/andrewrk/node-multiparty
var s3 = require('s3'); // https://github.com/andrewrk/node-s3-client

var s3Client = s3.createClient({
  secret: 'config.secret',
  bucket: '<your_bucket>'
});

module.exports = function(app) {
  app.post('/api/image', function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      var file = files.file[0];
      var contentType = file.headers['content-type'];
      var extension = file.path.substring(file.path.lastIndexOf('.'));
      var destPath = '/' + user.id + '/profile' + '/' + uuid.v4() + extension;

      var headers = {
        'x-amz-acl': 'public-read',
        'Content-Length': file.size,
        'Content-Type': contentType
      };
      var uploader = s3Client.upload(file.path, destPath, headers);

      uploader.on('error', function(err) {
        //TODO handle this
      });

      uploader.on('end', function(url) {
        //TODO do something with the url
        console.log('file opened:', url);
      });
    });
  });
}
