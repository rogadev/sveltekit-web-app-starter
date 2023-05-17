<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card px-8 py-4">
		<h1 class="mb-4 text-3xl text-center">Sign in</h1>
		<form method="POST" use:enhance>
			<label class="label">
				<span>Username</span>
				<input class="input" name="username" type="text" placeholder="Input" />
			</label>
			<label class="label">
				<span>Password</span>
				<input class="input" name="password" type="password" placeholder="Input" />
			</label>
			<div class="flex flex-col">
				<button class="btn variant-filled-primary my-4" type="submit"> Sign in </button>
			</div>
		</form>
	</div>
</div>
