# https://devcenter.heroku.com/articles/dynos#startup
# https://stackoverflow.com/a/63447691

# heroku config:set GOOGLE_APPLICATION_CREDENTIALS=gcp_key.json
# heroku config:set GOOGLE_CREDENTIALS=<CONTENTS OF YOU GCP KEY>



echo ${GOOGLE_CREDENTIALS} > /app/gcp_key.json