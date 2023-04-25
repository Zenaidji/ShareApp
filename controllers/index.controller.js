
module.exports.home =
(req, res) => res.render('index', { title: 'Introduction à JWT' });

module.exports.about =
  (req, res) => res.render('about');

module.exports.adminonly =
  (req, res) => res.render('adminonly');
