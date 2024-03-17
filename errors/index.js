const CustomAPIError = require('./custom-error')
const BadRequest = require('./badRequest')
const Unauthenticate = require('./un-authenticated')
const NotFound = require('./notFound')

module.exports = {
    CustomAPIError,
    BadRequest,
    Unauthenticate,
    NotFound,
}