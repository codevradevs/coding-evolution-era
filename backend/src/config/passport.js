const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            user.avatar = profile.photos[0]?.value;
            await user.save();
          }
          // Seed avatar into UserProfile if not set
          const { UserProfile } = require('../models');
          await UserProfile.findOneAndUpdate(
            { userId: user._id, avatar: { $in: [null, '', undefined] } },
            { avatar: profile.photos[0]?.value },
            { upsert: false }
          );
          return done(null, user);
        }

        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0]?.value,
          provider: 'google',
        });
        // Create UserProfile with avatar
        const { UserProfile: UP } = require('../models');
        await UP.create({ userId: user._id, avatar: profile.photos[0]?.value }).catch(() => {});
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
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error('No email found from GitHub'), null);
        }

        let user = await User.findOne({ email });

        if (user) {
          if (!user.githubId) {
            user.githubId = profile.id;
            user.avatar = profile.photos[0]?.value;
            await user.save();
          }
          // Seed avatar into UserProfile if not set
          const { UserProfile } = require('../models');
          await UserProfile.findOneAndUpdate(
            { userId: user._id, avatar: { $in: [null, '', undefined] } },
            { avatar: profile.photos[0]?.value },
            { upsert: false }
          );
          return done(null, user);
        }

        user = await User.create({
          githubId: profile.id,
          name: profile.displayName || profile.username,
          email,
          avatar: profile.photos[0]?.value,
          provider: 'github',
        });
        // Create UserProfile with avatar
        const { UserProfile: UP } = require('../models');
        await UP.create({ userId: user._id, avatar: profile.photos[0]?.value }).catch(() => {});
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
