'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-core/register');

require('babel-polyfill');

var _googleContactsCrud = require('google-contacts-crud');

var _googleContactsCrud2 = _interopRequireDefault(_googleContactsCrud);

var _googleapis = require('googleapis');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleContact = function () {
  /**
   *
   * @param {Object} options
   * @param {Object} options.APP_CONFIG The app config with CLIENT_ID and CLIENT_SECRET
   * @param {String} options.APP_CONFIG.CLIENT_ID The Google App ClientId
   * @param {String} options.APP_CONFIG.CLIENT_SECRET The Google App SecretId
   * @param {String} options.APP_CONFIG.REDIRECT_URI The Google App RedirectUri
   * @param {Object} options.credentials The oAuth2 Credentials Object
   * @param {String} options.credentials.access_token The oAuth2 Credentials access_token
   * @param {String} options.credentials.expiry_date The oAuth2 Credentials expiry_date
   * @param {String} options.credentials.refresh_token The oAuth2 Credentials refresh_token
   * @param {String} options.credentials.token_type The oAuth2 Credentials token_type
   */
  function GoogleContact(options) {
    _classCallCheck(this, GoogleContact);

    var APP_CONFIG = options.APP_CONFIG,
        credentials = options.credentials;

    this._APP_CONFIG = APP_CONFIG;
    this._credentials = credentials;
    var CLIENT_ID = APP_CONFIG.CLIENT_ID,
        CLIENT_SECRET = APP_CONFIG.CLIENT_SECRET,
        REDIRECT_URI = APP_CONFIG.REDIRECT_URI;

    this.googleContactCrud = new _googleContactsCrud2.default(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    this.oauth2Client = new _googleapis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    this.googleContactCrud.setUserCredentials(credentials || {});
  }

  _createClass(GoogleContact, [{
    key: 'getUserCredentialsByCode',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(code) {
        var _ref2, tokens;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.oauth2Client.getToken(code);

              case 2:
                _ref2 = _context.sent;
                tokens = _ref2.tokens;
                _context.next = 6;
                return this.setUserCredentials(tokens);

              case 6:
                return _context.abrupt('return', tokens);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserCredentialsByCode(_x) {
        return _ref.apply(this, arguments);
      }

      return getUserCredentialsByCode;
    }()

    /**
     * Setup the credentials
     *
     * @param {Object} options.credentials The oAuth2 Credentials Object
     * @param {String} options.credentials.access_token The oAuth2 Credentials access_token
     * @param {String} options.credentials.expiry_date The oAuth2 Credentials expiry_date
     * @param {String} options.credentials.refresh_token The oAuth2 Credentials refresh_token
     * @param {String} options.credentials.token_type The oAuth2 Credentials token_type
     * @returns Promise<>
     */

  }, {
    key: 'setUserCredentials',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(credentials) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.googleContactCrud.setUserCredentials(credentials);

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setUserCredentials(_x2) {
        return _ref3.apply(this, arguments);
      }

      return setUserCredentials;
    }()

    /**
     * @returns Promise<Groups[]>
     */

  }, {
    key: 'getGroup',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', this.googleContactCrud.getGroup());

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getGroup() {
        return _ref4.apply(this, arguments);
      }

      return getGroup;
    }()

    /**
     * Get group by a filter function
     *
     * @param {Function} filter
     * @returns Promise<Group>
     */

  }, {
    key: 'getGroupByFilter',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(filter) {
        var groups;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getGroup();

              case 2:
                groups = _context4.sent;
                return _context4.abrupt('return', groups.find(filter));

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getGroupByFilter(_x3) {
        return _ref5.apply(this, arguments);
      }

      return getGroupByFilter;
    }()

    /**
     * Create a new Google Contact.
     *
     * @param {Object} options              New contact info.
     * @param {String} options.name         Full name.
     * @param {String} options.display_name Display name. If empty or undefined, option.name will be used as display name.
     * @param {String} options.email        Email Id.
     * @param {String} options.is_primary   True if it's primary email id of new contact. Default is true.
     * @param {String} options.groupMembershipId The Id of Feed Group, see docs https://developers.google.com/contacts/v3/#working_with_contact_groups
     * @param {String} options.contact_type Home or Other ? Default is other.
     * @param {Object} options.headers      HTTP Headers
     * @param {String} options.headers.GData-Version HTTP Headers. Default is 3.0.
     * @param {String} options.headers.User-Agent    HTTP Headers. Default is client.
     *
     * @param {Array}  options.extended_property            Array of extended property objects. Only extended
     *                                                      property with key and value is supported.
     * @param {String} options.extended_property[idx].name  Key of the property.
     * @param {String} options.extended_property[idx].value Value of the property.
     *
     * @param {String} groupId
     * @returns Promise<Contact>
     */

  }, {
    key: 'addContactByGroupId',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(options, groupId) {
        var group, groupMembershipId;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getGroupByFilter(function (group) {
                  return (0, _lodash.get)(group, 'shortmetadata.systemGroup') === groupId;
                });

              case 2:
                group = _context5.sent;
                groupMembershipId = (0, _lodash.get)(group, 'shortmetadata.id');

                if (groupMembershipId) {
                  options.groupMembershipId = groupMembershipId;
                }
                return _context5.abrupt('return', this.googleContactCrud.addContact(options));

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addContactByGroupId(_x4, _x5) {
        return _ref6.apply(this, arguments);
      }

      return addContactByGroupId;
    }()
  }]);

  return GoogleContact;
}();

exports.default = GoogleContact;
