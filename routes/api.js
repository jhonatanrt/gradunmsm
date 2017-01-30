
var FB              = require('fb'),

    config          = require('../config');

exports.search = function (req, res) {
    var parameters              = req.query;
    parameters.access_token     = req.session.access_token;
    FB.api('/search', req.query, function (result) {
        if(!result || result.error) {
            return res.send(500, 'error');
        }
        res.send(result);
    });
};

exports.friends = function (req, res) {

    console.log("Entro"+"");
    console.log("token: "+req.session.access_token);
    var id_image='855583204512932';

    FB.api(id_image+'/likes', {
      fields: ['name', 'picture'],
      limit: 300,
      access_token: req.session.access_token
    }, function (result) {

        result.data.forEach(function (value){
          console.log(value.name);
          console.log(value.picture.data.url);
        })

        res.send(result);
    });

    /*FB.api('me/friends', {
        fields:         ['name','picture'],
        limit:          250,
        access_token:   req.session.access_token
    }, function (result) {
        if(!result || result.error) {
            return res.send(500, 'error');
        }
        res.send(result);
    });*/
};

exports.announce = function (req, res) {
    var parameters              = req.body;
    parameters.access_token     = req.session.access_token;
    FB.api('/me/' + config.facebook.appNamespace +':eat', 'post', parameters , function (result) {

        if(!result) {
            return res.send(500, 'error');
        } else if(result.error) {
            if(result.error.type == 'OAuthException') {
                result.redirectUri = FB.getLoginUrl({ scope: 'user_about_me,publish_actions', state: encodeURIComponent(JSON.stringify(parameters)) });
            }
            return res.send(500, result);
        }

        res.send(result);
    });
};
