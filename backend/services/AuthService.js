const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');


const Authservice = {

    //sign up service operation
    signup: async (req, res) => {
        const { fullname, username, email, phonenumber, password, cfpassword } = req.body;
        if (password != cfpassword) return res.status(403).json({ message: 'missing password & confirmation' });

        //config salt bcrypt
        const salt = await bcrypt.genSalt();
        //hash password
        const hashpassword = await bcrypt.hash(password, salt);

        try {

            //analyze sql insert query
            let sql = `INSERT INTO users (fullname,username,email,phonenumber,password) VALUES 
            ("${req.body.fullname}","${username}","${email}","${phonenumber}","${hashpassword}")`;

            // execute query
            db.query(sql, function (err, result) {
                //Handle failure query
                if (err) {
                    console.log(err+"msg");
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // Handle success query
                res.status(201).json({ success: 'Operation has been achieved with success' });

            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    //sign in service operation
    signin: async (req, res) => {

        try {
            if (!req.body.email || !req.body.password) {
                return res.status(400).json({ msg: "Connection error, Verify your fields." });
            }

            //build query to verify the existing user this email field.
            const user = ` SELECT * FROM users WHERE email = "${req.body.email}" `;

            //handle query
            db.query(user, function (err, result) {
                if (err) throw result.status(500).send({ error: 'Internal server error happened' });
                if (!result || !result.length) return res.status(400).json({ msg: "Email is not correct." });

                // verify match password (clear & hashed)
                const match = bcrypt.compareSync(req?.body?.password, result[0]?.password);
                if (!match) return res.status(400).json({ msg: "Password is not correct." });

                //Fetching result
                const id = result[0].id;
                const fullname = result[0].fullname;
                const email = result[0].email;
                const accessToken = jwt.sign({ id, fullname, email }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '15s'
                });
                const refreshToken = jwt.sign({ id, fullname, email }, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: '1d'
                });

                //Refresh Token when user is logged in
                const sql2 = `UPDATE users SET refresh_token = "${refreshToken}" WHERE id = "${id}" `;
                db.query(sql2, function (err, result) {
                    if (err) return result.status(500).send({ error: 'Internal server error happened' });
                    res.status(201);
                });

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 100
                });

                res.json({ accessToken: accessToken, refreshToken: refreshToken });
            });

        } catch (error) {
            res.status(404).json({ msg: 'email not found' });
        }

    },

    logout: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(204);
        let user = `SELECT * FROM users WHERE refresh_token = "${refreshToken}"`;
        db.query(user, function (err, result) {
            console.log("Test");
            if (err) return result.status(500).send({ error: 'Internal server error happened' });
            res.status(201);

            console.log(result);
            if (!result[0]) return result[0]?.id;
            const userId = result[0]?.id;

            let deleteTK = `UPDATE users SET refresh_token = "" WHERE id = "${userId}"`;

            db.query(deleteTK, function (err, result) {
                if (err) return result.status(500).send({ error: 'Internal server error happened' });
            });

        });

        res.status(201);
        res.clearCookie('refreshToken');
        return res.send(200);
    }
}
module.exports = Authservice;