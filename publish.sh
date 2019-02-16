\rm -fr infra_health_check_upload.zip
zip -r infra_health_check_upload.zip index.js
aws lambda update-function-code --function-name InfraHealthCheck --zip-file fileb://infra_health_check_upload.zip
