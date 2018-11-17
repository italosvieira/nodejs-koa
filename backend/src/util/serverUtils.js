module.exports = {
  exit: function (msg, code, error) {
    console.log(msg, error)
    process.exit(code)
  }
}