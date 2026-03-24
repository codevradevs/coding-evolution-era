const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User, UserProfile } = require('../models');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try { done(null, await User.findById(id)); } catch (e) { done(e, null); }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/auth/google/callback`,
      state: false,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          if (!user.googleId) { user.googleId = profile.id; user.avatar = profile.photos[0]?.value; await user.save(); }
          await UserProfile.findOneAndUpdate(
            { userId: user._id, avatar: { $in: [null, '', undefined] } },
            { avatar: profile.photos[0]?.value },
            { upsert: false }
          ).catch(() => {});
          return done(null, user);
        }
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0]?.value,
          provider: 'google',
        });
        await UserProfile.create({ userId: user._id, avatar: profile.photos[0]?.value }).catch(() => {});
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/auth/github/callback`,
      scope: ['user:email'],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error('No email found from GitHub'), null);
        let user = await User.findOne({ email });
        if (user) {
          if (!user.githubId) { user.githubId = profile.id; user.avatar = profile.photos[0]?.value; await user.save(); }
          await UserProfile.findOneAndUpdate(
            { userId: user._id, avatar: { $in: [null, '', undefined] } },
            { avatar: profile.photos[0]?.value },
            { upsert: false }
          ).catch(() => {});
          return done(null, user);
        }
        user = await User.create({
          githubId: profile.id,
          name: profile.displayName || profile.username,
          email,
          avatar: profile.photos[0]?.value,
          provider: 'github',
        });
        await UserProfile.create({ userId: user._id, avatar: profile.photos[0]?.value }).catch(() => {});
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;