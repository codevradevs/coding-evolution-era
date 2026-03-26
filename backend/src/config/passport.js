const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User, UserProfile } = require('../models');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try { done(null, await User.findById(id)); } catch (e) { done(e, null); }
});

const upsertOAuthUser = async ({ provider, providerId, email, name, avatar }) => {
  let user = await User.findOne({ email });
  if (user) {
    // Link provider ID if not already set
    if (!user[`${provider}Id`]) {
      user[`${provider}Id`] = providerId;
      if (!user.avatar && avatar) user.avatar = avatar;
      await user.save();
    }
    await UserProfile.findOneAndUpdate(
      { userId: user._id, avatar: { $in: [null, '', undefined] } },
      { avatar },
      { upsert: false }
    ).catch(() => {});
    return user;
  }

  user = await User.create({
    [`${provider}Id`]: providerId,
    name,
    email,
    avatar,
    provider,
  });
  await UserProfile.create({ userId: user._id, avatar }).catch(() => {});
  return user;
};

// ─── Google ───────────────────────────────────────────────────────────────────
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/auth/google/callback`,
    },
    // eslint-disable-next-line no-unused-vars
    async (accessToken, refreshToken, profile, done) => {
      const callbackURL = `${process.env.API_URL}/api/auth/google/callback`;
      console.log('[google:oauth] redirect_uri sent to Google:', callbackURL);
      console.log('[google:oauth] GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
      console.log('[google:oauth] API_URL:', process.env.API_URL);
      try {
        const user = await upsertOAuthUser({
          provider: 'google',
          providerId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0]?.value,
        });
        done(null, user);
      } catch (err) {
        console.error('[passport:google]', err.message);
        done(err, null);
      }
    }
  )
);

// ─── GitHub ───────────────────────────────────────────────────────────────────
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/auth/github/callback`,
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const callbackURL = `${process.env.API_URL}/api/auth/github/callback`;
      console.log('[github:oauth] redirect_uri sent to GitHub:', callbackURL);
      console.log('[github:oauth] GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
      console.log('[github:oauth] API_URL:', process.env.API_URL);
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error('No email found from GitHub'), null);
        const user = await upsertOAuthUser({
          provider: 'github',
          providerId: profile.id,
          email,
          name: profile.displayName || profile.username,
          avatar: profile.photos[0]?.value,
        });
        done(null, user);
      } catch (err) {
        console.error('[passport:github]', err.message);
        done(err, null);
      }
    }
  )
);

module.exports = passport;
