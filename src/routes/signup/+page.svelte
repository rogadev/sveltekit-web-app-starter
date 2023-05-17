<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card px-8 py-4">
		<h1 class="mb-4 text-3xl text-center">Register</h1>
		<form method="POST" use:enhance>
			<label class="label">
				<span>Username</span>
				<input class="input" name="username" type="text" placeholder="john@email.com" />
			</label>
			<label class="label">
				<span>Password</span>
				<input class="input" name="password" type="password" placeholder="Password" />
			</label>
			<label class="label">
				<span>Confirm Password</span>
				<input
					class="input"
					name="passwordConfirm"
					type="password"
					placeholder="Confirm Password"
				/>
			</label>
			<div class="flex flex-col">
				<button class="btn variant-filled-primary my-4" type="submit"> Sign up </button>
				<a href="/login" class="text-center">Login instead</a>
			</div>
		</form>
	</div>
</div>

<style>
	label {
		margin-bottom: 1rem;
	}
</style>
