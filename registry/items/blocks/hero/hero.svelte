<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";

  let {
    announcement,
    title,
    description,
    primaryCta,
    secondaryCta,
    imageSrc,
    imageAlt = "",
    class: className,
  }: {
    announcement?: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    imageSrc?: string;
    imageAlt?: string;
    class?: string;
  } = $props();
</script>

<section class={cn("flex flex-col items-center gap-6 px-6 py-16 text-center", className)}>
  {#if announcement}
    <Badge variant="secondary">{announcement}</Badge>
  {/if}
  <h1 class="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
  <p class="max-w-xl text-lg text-muted-foreground">{description}</p>
  <div class="flex gap-3">
    <Button href={primaryCta.href}>{primaryCta.label}</Button>
    {#if secondaryCta}
      <Button href={secondaryCta.href} variant="outline">{secondaryCta.label}</Button>
    {/if}
  </div>
  {#if imageSrc}
    <img src={imageSrc} alt={imageAlt} class="mt-8 w-full max-w-3xl rounded-lg border shadow-sm" />
  {/if}
</section>
