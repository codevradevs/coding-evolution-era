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
        console.log('[google] profile received:', JSON.stringify({ id: profile.id, email: profile.emails?.[0]?.value, name: profile.displayName }));
        let user = await User.findOne({ email: profile.emails[0].value });
        console.log('[google] existing user:', user ? user._id : 'none');
        if (user) {
          if (!user.googleId) { user.googleId = profile.id; user.avatar = profile.photos[0]?.value; await user.save(); }
          await UserProfile.findOneAndUpdate(
            { userId: user._id, avatar: { $in: [null, '', undefined] } },
            { avatar: profile.photos[0]?.value },
            { upsert: false }
          ).catch(() => {});
          console.log('[google] returning existing user');
          return done(null, user);
        }
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0]?.value,
          provider: 'google',
        });
        console.log('[google] created new user:', user._id);
        await UserProfile.create({ userId: user._id, avatar: profile.photos[0]?.value }).catch(() => {});
        done(null, user);
      } catch (error) {
        console.error('[google] strategy error:', error.message, error.stack);
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
        console.log('[github] profile received:', JSON.stringify({ id: profile.id, email: profile.emails?.[0]?.value, name: profile.displayName }));
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error('No email found from GitHub'), null);
        let user = await User.findOne({ email });
        console.log('[github] existing user:', user ? user._id : 'none');
        if (user) {
          if (!user.githubId) { user.githubId = profile.id; user.avatar = profile.photos[0]?.value; await user.save(); }
          await UserProfile.findOneAndUpdate(
            { userId: user._id, avatar: { $in: [null, '', undefined] } },
            { avatar: profile.photos[0]?.value },
            { upsert: false }
          ).catch(() => {});
          console.log('[github] returning existing user');
          return done(null, user);
        }
        user = await User.create({
          githubId: profile.id,
          name: profile.displayName || profile.username,
          email,
          avatar: profile.photos[0]?.value,
          provider: 'github',
        });
        console.log('[github] created new user:', user._id);
        await UserProfile.create({ userId: user._id, avatar: profile.photos[0]?.value }).catch(() => {});
        done(null, user);
      } catch (error) {
        console.error('[github] strategy error:', error.message, error.stack);
        done(error, null);
      }
    }
  )
);

module.exports = passport;