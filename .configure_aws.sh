mkdir -p ~/.aws
echo "[default]
aws_access_key_id=$AWS_ACCESS_KEY
aws_secret_access_key=$AWS_SECRET_KEY" > ~/.aws/credentials
echo "[default]
region=ap-northeast-1
output=json" > ~/.aws/config
chmod 0600 ~/.aws/credentials
chmod 0600 ~/.aws/config