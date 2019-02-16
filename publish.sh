\rm -fr infra_health_check_upload.zip
zip -r infra_health_check_upload.zip index.js fs-read-file-s3.js node_modules
aws lambda update-function-code --function-name InfraHealthCheck --zip-file fileb://infra_health_check_upload.zip
