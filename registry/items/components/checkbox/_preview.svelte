<script lang="ts">
	import { Checkbox } from './index.js';
</script>

<div class="flex flex-col gap-6">
	<div class="flex items-center gap-3">
		<Checkbox id="terms-preview" />
		<label for="terms-preview" class="text-sm leading-none font-medium">
			Accept terms and conditions
		</label>
	</div>
	<div class="flex items-start gap-3">
		<Checkbox id="terms-checked-preview" checked />
		<div class="grid gap-2">
			<label for="terms-checked-preview" class="text-sm leading-none font-medium">
				Accept terms and conditions
			</label>
			<p class="text-sm text-muted-foreground">
				By clicking this checkbox, you agree to the terms and conditions.
			</p>
		</div>
	</div>
</div>
