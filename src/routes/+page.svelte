<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Let's get cracking bones!</h1>
		<h1>Profile</h1>
		<div>
			<p>User id: {data.user.userId}</p>
			<p>Username: {data.user.username}</p>
		</div>
		<form use:enhance method="post">
			<input type="submit" class="button" value="Sign out" />
		</form>
	</div>
</div>
