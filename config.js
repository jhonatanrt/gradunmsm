
var config = { };

// should end in /
config.rootUrl  = process.env.ROOT_URL                  || 'http://localhost:3000/';

config.facebook = {
    appId:          process.env.FACEBOOK_APPID          || '977721655693922',
    appSecret:      process.env.FACEBOOK_APPSECRET      || '93eaf081d3ec9952e8c9d8bbd83766e2',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'prueba',
    redirectUri:    process.env.FACEBOOK_REDIRECTURI    ||  config.rootUrl + 'login/callback'
};

module.exports = config;
