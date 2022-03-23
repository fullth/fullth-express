const google = require('../passport/google');

module.exports = function(app, passport, db) {
    // login이 최초로 성공했을 때만 호출되는 함수
    // done(null, user.id)로 세션을 초기화 한다.
    passport.serializeUser(function (user, done) {
        console.log('user.id >>> ' + user.id);
        done(null, user.id);
    });
    
    // 사용자가 페이지를 방문할 때마다 호출되는 함수
    // done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
    passport.deserializeUser(function (id, done) {
        done(null, id);
    });

    app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));
    
    // google login 성공과 실패 리다이렉트
    app.get("/auth/google/callback",
        passport.authenticate("google", {
            successRedirect: "/",
            failureRedirect: "/login",
        })
    );
    
    // logout
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    
    passport.use('google', google(app, passport, db));
}