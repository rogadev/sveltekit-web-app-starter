import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth/lucia";
import type { PageServerLoad, Actions } from "./$types";

// Redirect Authenticated Users
export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, "/");
  return {};
};

// Handle Form Submission & Create User
export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");
    const passwordConfirm = form.get("passwordConfirm");

    // check for empty values
    if (!username || !password || !passwordConfirm) {
      return fail(400, "Please fill out all fields.");
    }

    // check if username is already in use
    const userExists = await auth.getUser({
      providerId: "username",
      providerUserId: username
    });
    if (userExists) return fail(400, "Username is already in use.");

    // check if passwords match
    if (password !== passwordConfirm) {
      return fail(400, "Passwords do not match.");
    }

    // check password length (min 12 characters)
    if (password.length < 12) return fail(400, "Password is too short. Must be at least 12 characters.");

    // check password strength (min 1 lowercase, 1 uppercase, 1 number, 1 symbol)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/;
    if (!passwordRegex.test(password)) return fail(400, "Password is too weak. Must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.");

    try {
      /**
       * Set user passwords
       * We don’t store the password in the user, but in the key (primaryKey). Keys represent the relationship between a user and a auth method, in this case username/password. We’ll set "username" as the provider id (authentication method) and the username as the provider user id (something unique to the user).
       */
      const user = await auth.createUser({
        primaryKey: {
          providerId: "username",
          providerUserId: username,
          password
        },
        attributes: {
          username
        }
      });
      const session = await auth.createSession(user.userId);
      locals.auth.setSession(session);
    } catch (e) {
      // Something went wrong.
      console.error(e);
      return fail(400, e.message);
    }
  }
};