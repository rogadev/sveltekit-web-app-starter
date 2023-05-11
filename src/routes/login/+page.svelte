<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="m-8">
	<h1>Sign in</h1>
	<form method="POST" use:enhance>
		<label for="username">Username</label><br />
		<input class="form-input" id="username" name="username" /><br />
		<label for="password">Password</label><br />
		<input class="form-input" type="password" id="password" name="password" /><br />
		<input class="btn" type="submit" value="Continue" />
	</form>
</div>
