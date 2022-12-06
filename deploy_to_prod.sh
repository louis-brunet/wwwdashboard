#!/bin/bash
# must be run in ~/wwwdashboard/
# validating woking directory
if [[ ! -d ./vue-dashboard ]];
then
    echo "Could not find front end src directory. Did you launch in the git project root ?"
    exit 1;
fi 
if [[ ! -d ./api ]];
then
    echo "Could not find API src directory. Did you launch in the git project root ?"
    exit 1;
fi 

if [[ `git status --porcelain` ]]; then
  # Changes
  echo "commit and push before deploying";
  exit 1;
fi
vpsssh='ssh -i ~/.ssh/id_rsa ubuntu@129.151.226.58';
$vpsssh "cd wwwdashboard && git pull && ./start_server.sh";
