const jwt = require('jsonwebtoken');
const User = require('../models/User');


const refreshAccessToken = async function (req, res){
    const { refreshToken } = req.body;

    jwt.verify( refreshToken, process.env.REFRESH_SECRET,
        async (err, payload) => {
            if (err) return res.status(401).json({ error: "Invalid Token" });

            const newAccessToken = jwt.sign(
                {id: payload.id, email: payload.email},
                process.env.ACCESS_SECRET,
                {expiresIn : '2h'}
            );

            const newRefreshToken = jwt.sign({
                id: payload.id, email: payload.email},
                process.env.REFRESH_SECRET,
                {expiresIn : '30d'});

            await User.update(
                {refreshToken : newRefreshToken},
                {where : { id : payload.id }}
            )

            res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken});
        });
    
}

module.exports = refreshAccessToken;