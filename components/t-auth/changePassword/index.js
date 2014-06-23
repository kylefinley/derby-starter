// Generated by CoffeeScript 1.6.3
var check, sanitize, validator;

validator = require('validator/validator-min.js');
check = validator.check;
sanitize = validator.sanitize;

exports.init = function(model) {};

exports.create = function(model, dom) {
  model.on('change', 'password', function(password) {
    var err;
    if (!password) {
      return;
    }
    try {
      check(password).len(6);
      return model.set('errors.password', '');
    } catch (_error) {
      err = _error;
      return model.set('errors.password', 'Password must be at least 6 characters');
    }
  });
  model.on('change', 'passwordConfirmation', function(passwordConfirmation) {
    var err;
    if (!passwordConfirmation) {
      return;
    }
    try {
      check(passwordConfirmation).equals(model.get('password'));
      return model.set('errors.passwordConfirmation', '');
    } catch (_error) {
      err = _error;
      return model.set('errors.passwordConfirmation', err.message);
    }
  });
  return model.on('change', 'errors.*', function(error) {
    var canSubmit, m;
    m = model.get();
    canSubmit = !m.errors.passwordConfirmation && !m.errors.password && !!m.passwordConfirmation && !!m.password;
    return model.set('canSubmit', canSubmit);
  });
};

exports.submitPasswordChange = function(e, el) {
  var model, rootModel;
  model = this.model;
  rootModel = model.parent().parent();
  return typeof $ !== "undefined" && $ !== null ? $.ajax({
    url: '/password-change',
    type: 'POST',
    data: {
      uid: rootModel.get('_session.userId'),
      oldPassword: model.get('oldPassword'),
      newPassword: model.get('password')
    },
    success: function(data, textStatus, jqXHR) {
      return alert("Password successfully changed");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      return model.set('errors.oldPassword', jqXHR.responseText);
    }
  }) : void 0;
};