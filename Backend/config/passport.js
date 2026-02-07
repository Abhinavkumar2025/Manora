import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/users.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/manora/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const googleId = profile.id;
                const name = profile.displayName;
                const avatar = profile.photos?.[0]?.value;

                // Check if user already exists with this email
                let user = await User.findOne({ email });

                if (user) {
                    //  If user exists but google not linked → link it
                    if (!user.provider_id) {
                        user.provider = "google";
                        user.provider_id = googleId;
                        user.avatar = avatar;
                        await user.save();
                    }
                } else {
                    // Create new user
                    user = await User.create({
                        name,
                        email,
                        provider: "google",
                        provider_id: googleId,
                        avatar,
                    });
                }

                // passport attaches this user to req.user
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);



if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: "http://localhost:5000/manora/auth/github/callback",
                scope: ["user:email"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails?.[0]?.value;
                    const githubId = profile.id;
                    const name = profile.displayName || profile.username;
                    const avatar = profile.photos?.[0]?.value;

                    if (!email) {
                        return done(new Error("No email found in GitHub profile"), null);
                    }

                    let user = await User.findOne({ email });

                    if (user) {
                        if (!user.provider_id) {
                            user.provider = "github";
                            user.provider_id = githubId;
                            user.avatar = avatar;
                            await user.save();
                        }
                    } else {
                        user = await User.create({
                            name,
                            email,
                            provider: "github",
                            provider_id: githubId,
                            avatar,
                        });
                    }

                    done(null, user);
                } catch (error) {
                    done(error, null);
                }
            }
        )
    );
} else {
    console.warn("GitHub Strategy not initialized: Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in .env");
}

// We are NOT using sessions
export default passport;
