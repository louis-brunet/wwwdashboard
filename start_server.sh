#!/bin/bash
# must be run in ~/wwwdashboard/

# defining vars
PROJECT_ROOT=$(pwd);

FRONT_END_SRC_ROOT=$PROJECT_ROOT/vue-dashboard;
FRONT_END_BUILD_ROOT=/srv;

API_SRC_ROOT=$PROJECT_ROOT/api;

NGINX_DEFAULT_CONFIG_FILE=$PROJECT_ROOT/nginx_default.conf;

# validating woking directory
if [[ ! -d $FRONT_END_SRC_ROOT ]];
then
    echo "Could not find front end src directory. Did you launch in the git project root ?"
    exit 1;
fi 
if [[ ! -d $API_SRC_ROOT ]];
then
    echo "Could not find API src directory. Did you launch in the git project root ?"
    exit 1;
fi 

# create front end build dir
sudo mkdir $FRONT_END_BUILD_ROOT/dashboard;
#sudo chown -R nginx:nginx /srv/dashboard;
#sudo chcon -Rt httpd_sys_content_t /srv/dashboard;

# nginx config
sudo cp $NGINX_DEFAULT_CONFIG_FILE /etc/nginx/conf.d/default.conf;

# redbuild front end
cd $FRONT_END_SRC_ROOT;
npm i;
npm run build;
sudo rm -rf $FRONT_END_BUILD_ROOT/dashboard/*;
sudo cp -r $FRONT_END_SRC_ROOT/dist/* $FRONT_END_BUILD_ROOT/dashboard/;

# restart nginx
sudo systemctl restart nginx;

# restart api
cd $API_SRC_ROOT;
npm i;
pm2 delete ecosystem.config.js;
npm run serve;
