<div class="wrapper">
  <slot />
</div>

<style>
  .wrapper {
    @apply flex flex-col h-full w-full min-h-screen overflow-x-hidden overflow-y-auto fixed left-0 right-0 top-0 bottom-0;
  }
</style>
