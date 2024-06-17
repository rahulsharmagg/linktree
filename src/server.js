const app = require('./app')

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('\x1b[34m%s\x1b[0m', `[server] LinkTree is Running <PORT>: ${PORT}`)
})
