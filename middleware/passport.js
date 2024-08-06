const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const WechatStrategy = require('passport-wechat').Strategy;
const User = require('../Models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      try {
        let user = await User.findOne({ 'authMethods.googleId': id });

        if (!user) {
          user = new User({
            firstName: displayName,
            lastName: '',
            userName: displayName,
            email: emails[0].value,
            phone: '',
            wechatId: '',
            hashedPassword: '',
            authMethods: { googleId: id, wechatAuthId: '' },
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new WechatStrategy(
    {
      appID: process.env.WECHAT_APP_ID,
      appSecret: process.env.WECHAT_APP_SECRET,
      callbackURL: '/auth/wechat/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { openid, nickname } = profile;
      try {
        let user = await User.findOne({ 'authMethods.wechatAuthId': openid });

        if (!user) {
          user = new User({
            firstName: nickname,
            lastName: '',
            userName: nickname,
            email: '',
            phone: '',
            wechatId: openid,
            hashedPassword: '',
            authMethods: { googleId: '', wechatAuthId: openid },
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;
