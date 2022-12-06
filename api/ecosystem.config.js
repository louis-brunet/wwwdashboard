module.exports = {
    apps: [
        {
            name: 'express_api',
            script: './src/index.js',
            watch: true,
            ignoreWatch: ['node_modules'],
        },
    ],

    // Deployment config
    deploy: {
        production: {
            key: '~/.ssh/id_rsa',
            user: 'ubuntu',
            host: ['129.151.226.58'],
            ref: 'origin/main',
            repo: 'git@github.com:louis-brunet/wwwdashboard.git',
            path: '/srv/api',
            'post-deploy': 'cd ./api && npm install && npm run serve',
        },
    },
}
