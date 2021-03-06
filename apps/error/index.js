var derby = require('derby');
var path = require('path');

module.exports = function () {
  var errorApp = derby.createApp();
  errorApp.loadViews(path.join(__dirname, '/views/error'));
  errorApp.loadStyles(path.join(__dirname, '/styles/reset'));
  errorApp.loadStyles(path.join(__dirname, '/styles/error'));

  return function (err, req, res, next) {
    console.log('error');
    if (!err) return next();

    var message = err.message || err.toString();
    var status = parseInt(message);
    status = ((status >= 400) && (status < 600)) ? status : 500;

    if (status < 500) {
      console.log(err.message || err);
    } else {
      console.log(err.stack || err);
    }

    var page = errorApp.createPage(req, res, next);
    page.renderStatic(status, status.toString());
  }
}
