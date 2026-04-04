export const troubleshootingFaqItems = [
  {
    question: "I didn't receive the magic link email. What should I check?",
    answer:
      'Check spam and promotions folders, confirm you typed the correct email, wait a few minutes, and try again after a short break if you recently requested a link. See the magic link troubleshooting page in Nomu Docs for step-by-step help.',
  },
  {
    question: 'The map is not loading in Nomu. What can I try?',
    answer:
      'Check your network connection, disable strict VPN or DNS blockers for a moment, refresh the page, and try another browser or device. If it persists, see the map troubleshooting page in Nomu Docs.',
  },
  {
    question: 'Why can I not add more trips or places?',
    answer:
      'Free plans include limits on trips, places, and wishlist pins. Open Nomu pricing or account settings to see your current plan and upgrade options if you need more room.',
  },
  {
    question: 'How does Nomu work offline?',
    answer:
      'After you have opened Nomu while online, much of your recent data can load from your device when you are offline. Some actions still need a connection. See the offline troubleshooting page in Nomu Docs for details.',
  },
  {
    question: 'How do I report a bug?',
    answer:
      'Use the in-app feedback or contact options on app.nomu.land, and include what you expected, what happened, and your device or browser. See Reporting a bug in Nomu Docs for a short checklist.',
  },
] as const;
