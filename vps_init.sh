#!/bin/bash


sudo apt update;
sudo apt upgrade;

# install node 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash;

export NVM_DIR="$HOME/.nvm";
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

source ~/.bashrc;
nvm install 14.18.0;
nvm use 14.18.0;
nvm alias default 14.18.0;

# install pm2 process manager
npm install pm2@latest -g;

# install nginx
sudo apt install nginx;
sudo systemctl enable --now nginx.service;

# configure firewall: http, https, API, mariadb
sudo ufw disable;
sudo apt install firewalld;
sudo systemctl enable firewalld;
sudo systemctl start firewalld;
sudo firewall-cmd --add-service=http --permanent;
sudo firewall-cmd --add-service=https --permanent;
sudo firewall-cmd --add-port=5174/tcp --permanent;
sudo firewall-cmd --add-port=5174/tcp;
sudo firewall-cmd --add-port=3306/tcp --permanent;
sudo firewall-cmd --reload;

# install mariadb
sudo apt install mariadb-server;
sudo systemctl start mariadb;
sudo systemctl enable mariadb.service;
