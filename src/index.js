import 'babel-core/register'
import 'babel-polyfill'
import GoogleContactsCrud from 'google-contacts-crud'
import { google } from 'googleapis'
import { get } from 'lodash'

export default class GoogleContact {
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
  constructor (options) {
    const { APP_CONFIG, credentials } = options
    this._APP_CONFIG = APP_CONFIG
    this._credentials = credentials
    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = APP_CONFIG
    this.googleContactCrud = new GoogleContactsCrud(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    )
    this.oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    )
    this.googleContactCrud.setUserCredentials(credentials || {})
  }

  async getUserCredentialsByCode (code) {
    const { tokens } = await this.oauth2Client.getToken(code)
    await this.setUserCredentials(tokens)
    return tokens
  }

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
  async setUserCredentials (credentials) {
    this.googleContactCrud.setUserCredentials(credentials)
  }

  /**
   * @returns Promise<Groups[]>
   */
  async getGroup () {
    return this.googleContactCrud.getGroup()
  }

  /**
   * Get group by a filter function
   *
   * @param {Function} filter
   * @returns Promise<Group>
   */
  async getGroupByFilter (filter) {
    const groups = await this.getGroup()
    return groups.find(filter)
  }

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
  async addContactByGroupId (options, groupId) {
    const group = await this.getGroupByFilter((group) => (
      get(group, 'shortmetadata.systemGroup') === groupId
    ))
    const groupMembershipId = get(group, 'shortmetadata.id')
    if (groupMembershipId) {
      options.groupMembershipId = groupMembershipId
    }
    return this.googleContactCrud.addContact(options)
  }

}
