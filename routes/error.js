
exports.get404 = (req, res, next) => {
    res.status(404).render('error', { message : 'Page Not Found', error : {status: '/404'} });
  };
  