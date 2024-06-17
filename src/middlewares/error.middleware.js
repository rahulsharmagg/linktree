function NotFound (req, res, next) {
  res.status(400).send('Not Found')
}

function ErrorHandler (err, req, res, next) {
  if (err) {
    console.error(err.stack)
    res.status(500).send(err.message)
  } else {
    res.status(400).end()
  }
}

module.exports.NotFound = NotFound
module.exports.ErrorHandler = ErrorHandler
