
const jwt = require('jsonwebtoken');

exports.checkLogin = function (req, res, next) {
    const { session } = req;
    if (session) {
        const { token } = session;
        if (token) {
            jwt.verify(
                token,
                process.env.JWT_SECRET_KEY,
                function (error, decoded) {
                    if (error) {
                        res.redirect('/dang-nhap');
                    } else {
                        next();
                    }

                }
            )
        } else {
            res.redirect('/dang-nhap');
        }
    } else {
        res.redirect('/dang-nhap');
    }
}

exports.checkToken = function (req, res, next) {
    let token = null;
    if (req.headers.authorization &&
        req.headers.authorization.split('')[0] === 'Bearer') {
        token = req.headers.authorization.split('')[1];
    }

    if (token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET_KEY,
            function (error, decoded) {
                if (error) {
                    res.json({ status: false });
                } else {
                    next();
                }
            }
        )
    } else {
        res.json({ status: false });

    }
}
