/**
 * Generates Order Id
 * @return {String} ORDXYZ123...
 */
function generateOrderId () {
  const prefix = 'ORD'
  const length = 10
  const pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const allowedChars = pattern.split('')
  let id = prefix
  for (let i = 0; i < length - prefix.length; ++i) {
    id += allowedChars[Math.floor(Math.random() * allowedChars.length)]
  }
  return id
}

module.exports.generateOrderId = generateOrderId
