function getHome(req, res) {
  res.send("<h1>You've reached the homepage</h1>");
}

module.exports = { getHome };
