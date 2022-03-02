var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const jwt = require('jsonwebtoken');
const authen = require('../middle/authen');




// API Đăng Kí
router.post('/dang-ky', async function (req, res, next) {

    const { username, password, confirm_password } = req.body;
    const user = await userController.register(username, password, confirm_password);
    if (user) {
        res.json({ status: true, user })
    } else {
        res.json({ status: false, user })
    }

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
        res.json({ status: true, user: checkLogin, token });
    } else {
        res.json({ status: false });

    }

});

/* thực hiện đăng xuất */
router.get('/dang-xuat', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            res.json({ status: false });
        } else {
            res.json({ status: true });
        }
    })
});
module.exports = router;
