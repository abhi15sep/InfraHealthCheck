//var awsConfig = require('aws-config');
var AWS = require('aws-sdk');
var s3 = new AWS.S3({});

var getS3Content = function(bucket, file, callback) {
    var options = {
        Bucket: bucket,
        Key: file,
    };
    s3.getObject(options, function(err, data) {
        const body = Buffer.from(data.Body).toString('utf8');
        console.log(body);
        callback(undefined, {
          body: body
        });
    });
}

module.exports = {
getS3Content
}
//getS3Content('alexa-thbsops', 'aemauthor_status.txt');
