var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const jwt = require('jsonwebtoken');
const authen = require('../middle/authen');



/* kiểm tra đăng nhập */
router.get('/', [authen.checkLogin], function (req, res, next) {
  res.redirect('/san-pham');
});

/* Hiện trang đăng nhập */
router.get('/dang-nhap', function (req, res, next) {
  res.render('dang-nhap', { err: null });
});


/**Thực hiện đăng nhập */
router.post('/dang-nhap', async function (req, res, next) {
  const { username, password } = req.body;
  const checkLogin = await userController.login(username, password);
  if (checkLogin) {
    const token = jwt.sign(
      { id: checkLogin.id, username: checkLogin.username },
      process.env.JWT_SECRET_KEY
    );
    req.session.token = token;
    res.redirect('/san-pham');
    console.log(checkLogin);
    //access_token:60' 24h
    // refesh_token: 30 ngay
  } else {
    res.render('dang-nhap', { err: 'Username or Password invalid' });
  }

});

/* thực hiện đăng xuất */
router.get('/dang-xuat', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/');
  })
});
//Đăng Kí
router.post('/dang-ky', async function (req, res, next) {

  const { username, password, confirm_password } = req.body;
  const user = await userController.register(username, password, confirm_password);
  if (user) {
    res.json({ status: true, user })
  } else {
    res.json({ status: false, user })
  }

});



module.exports = router;
