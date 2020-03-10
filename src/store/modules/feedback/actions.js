export function showFeedback(data) {
  return {
    type: '@feedback/SHOW_FEEDBACK',
    payload: { data },
  };
}

export function hideFeedback() {
  return {
    type: '@feedback/HIDE_FEEDBACK',
  };
}
