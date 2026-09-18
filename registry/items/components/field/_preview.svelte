<script lang="ts">
	import { Input } from '../input/index.js';
	import * as Field from './index.js';
</script>

<div class="w-full max-w-md">
	<Field.Group>
		<Field.Field>
			<Field.Label for="username-preview">Username</Field.Label>
			<Input id="username-preview" placeholder="shadcn" />
			<Field.Description>This is your public display name.</Field.Description>
		</Field.Field>
	</Field.Group>
</div>
