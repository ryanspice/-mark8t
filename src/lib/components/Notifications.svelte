<script>
  import { Snackbar, SnackbarQueue } from '@smui/snackbar';
  import { onDestroy } from 'svelte';

  export let notifications = [
  {
    "id": 1,
    "text": "Successfully saved your settings.",
    "error": null,
    "duration": 3000
  },
  {
    "id": 2,
    "text": "Error: failed to load data.",
    "error": {
      "code": 404,
      "text": "Not Found"
    },
    "duration": null
  },
  {
    "id": 3,
    "text": "Warning: your session is about to expire.",
    "error": {
      "code": 401,
      "text": "Unauthorized"
    },
    "duration": 5000
  }
];

  const queue = new SnackbarQueue();

  const getDuration = (duration) => {
    return duration || 3000;
  };

  const getColor = (error) => {
    switch (error.code) {
      case 400:
        return 'red';
      case 401:
        return 'orange';
      case 404:
        return 'yellow';
      default:
        return 'blue';
    }
  };

  notifications.forEach((notification) => {
    const { id, text, error, duration } = notification;

    const options = {
      message: text,
      duration: getDuration(duration),
      actionText: duration ? '' : 'Dismiss',
      onClose: () => {
        queue.dismiss();
      },
      color: getColor(error),
      actionOnBottom: true,
    };

    queue.notify(options);
  });

  onDestroy(() => {
    queue.dismiss();
  });
</script>

<SnackbarQueue bind:queue />

{#if notifications.length === 0}
  <p>No notifications</p>
{/if}
