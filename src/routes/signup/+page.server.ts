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

    // check for empty values
    if (typeof username !== "string" || typeof password !== "string") {
      return fail(400);
    }

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
    } catch {
      // Fail if username is already in use
      return fail(400);
    }
  }
};