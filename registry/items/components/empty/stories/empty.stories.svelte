<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
	import CloudIcon from '@lucide/svelte/icons/cloud';
	import BellIcon from '@lucide/svelte/icons/bell';
	import FolderIcon from '@lucide/svelte/icons/folder';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import RefreshCcwIcon from '@lucide/svelte/icons/refresh-ccw';
	import SearchIcon from '@lucide/svelte/icons/search';
	import Button from '../../button/button.svelte';
	import * as Avatar from '../../avatar/index.js';
	import * as InputGroup from '../../input-group/index.js';
	import * as Empty from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Empty',
		decorators: [() => StoryWrapper]
	});
</script>

<Story name="Default">
	<div class="w-full max-w-md">
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<FolderIcon />
				</Empty.Media>
				<Empty.Title>No Projects Yet</Empty.Title>
				<Empty.Description>
					You haven't created any projects yet. Get started by creating your first project.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<div class="flex gap-2">
					<Button>Create Project</Button>
					<Button variant="outline">Import Project</Button>
				</div>
			</Empty.Content>
			<Button variant="link" class="text-muted-foreground" size="sm" href="#/">
				Learn More <ArrowUpRightIcon class="inline" />
			</Button>
		</Empty.Root>
	</div>
</Story>

<Story name="Outline">
	<div class="w-full max-w-md">
		<Empty.Root class="border border-dashed">
			<Empty.Header>
				<Empty.Media variant="icon">
					<CloudIcon />
				</Empty.Media>
				<Empty.Title>Cloud Storage Empty</Empty.Title>
				<Empty.Description>
					Upload files to your cloud storage to access them anywhere.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button variant="outline" size="sm">Upload Files</Button>
			</Empty.Content>
		</Empty.Root>
	</div>
</Story>

<Story name="Background">
	<div class="h-80 w-full max-w-md">
		<Empty.Root class="h-full bg-gradient-to-b from-muted/50 from-30% to-background">
			<Empty.Header>
				<Empty.Media variant="icon">
					<BellIcon />
				</Empty.Media>
				<Empty.Title>No Notifications</Empty.Title>
				<Empty.Description>
					You're all caught up. New notifications will appear here.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button variant="outline" size="sm">
					<RefreshCcwIcon />
					Refresh
				</Button>
			</Empty.Content>
		</Empty.Root>
	</div>
</Story>

<Story name="Avatar">
	<div class="w-full max-w-md">
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="default">
					<Avatar.Root class="size-12">
						<Avatar.Image src="https://github.com/shadcn.png" class="grayscale" />
						<Avatar.Fallback>LR</Avatar.Fallback>
					</Avatar.Root>
				</Empty.Media>
				<Empty.Title>User Offline</Empty.Title>
				<Empty.Description>
					This user is currently offline. You can leave a message to notify them or try again later.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button size="sm">Leave Message</Button>
			</Empty.Content>
		</Empty.Root>
	</div>
</Story>

<Story name="Avatar Group">
	<div class="w-full max-w-md">
		<Empty.Root class="flex-none border">
			<Empty.Header>
				<Empty.Media>
					<Avatar.Group class="grayscale">
						<Avatar.Root>
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
						<Avatar.Root>
							<Avatar.Image src="https://github.com/maxleiter.png" alt="@maxleiter" />
							<Avatar.Fallback>LR</Avatar.Fallback>
						</Avatar.Root>
						<Avatar.Root>
							<Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
							<Avatar.Fallback>ER</Avatar.Fallback>
						</Avatar.Root>
					</Avatar.Group>
				</Empty.Media>
				<Empty.Title>No Team Members</Empty.Title>
				<Empty.Description>Invite your team to collaborate on this project.</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button size="sm">
					<PlusIcon />
					Invite Members
				</Button>
			</Empty.Content>
		</Empty.Root>
	</div>
</Story>

<Story name="Input Group">
	<div class="w-full max-w-md">
		<Empty.Root>
			<Empty.Header>
				<Empty.Title>404 - Not Found</Empty.Title>
				<Empty.Description>
					The page you're looking for doesn't exist. Try searching for what you need below.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<InputGroup.Root class="sm:w-3/4">
					<InputGroup.Input placeholder="Try searching for pages..." />
					<InputGroup.Addon>
						<SearchIcon />
					</InputGroup.Addon>
				</InputGroup.Root>
				<Empty.Description>
					Need help? <a href="#/">Contact support</a>
				</Empty.Description>
			</Empty.Content>
		</Empty.Root>
	</div>
</Story>
