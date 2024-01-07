// ==UserScript==
// @name         AWS Console Emoji Injector
// @version      2.0
// @description  Injects an emoji based on the region identifier from the URL into the AWS Console navigation menu button
// @match        *://*.console.aws.amazon.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  // Function to determine the emoji based on the region identifier from the URL
  function getEmojiFromRegionParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const region = urlParams.get('region');
    const regionToEmoji = {
      'af-south-1': '🇿🇦',
      'ap-east-1': '🇭🇰',
      'ap-northeast-1': '🇯🇵',
      'ap-northeast-2': '🇰🇷',
      'ap-northeast-3': '🇯🇵',
      'ap-south-1': '🇮🇳',
      'ap-southeast-1': '🇸🇬',
      'ap-southeast-2': '🇦🇺',
      'ap-southeast-3': '🇮🇩',
      'ap-southeast-4': '🇦🇺',
      'ap-south-2': '🇮🇳',
      'ca-central-1': '🇨🇦',
      'ca-west-1': '🇨🇦',
      'eu-central-1': '🇩🇪',
      'eu-central-2': '🇩🇪',
      'eu-north-1': '🇸🇪',
      'eu-south-1': '🇮🇹',
      'eu-west-1': '🇮🇪',
      'eu-west-2': '🇬🇧',
      'eu-west-3': '🇫🇷',
      'il-central-1': '🇮🇱',
      'me-central-1': '🇦🇪',
      'me-south-1': '🇧🇭',
      'sa-east-1': '🇧🇷',
      'us-east-1': '🇺🇸',
      'us-east-2': '🇺🇸',
      'us-west-1': '🇺🇸',
      'us-west-2': '🇺🇸',
      'us-gov-east-1': '🇺🇸',
      'us-gov-west-1': '🇺🇸',
    };
    return regionToEmoji[region] || '';
  }

  // Function to periodically check for the menu button and add the emoji
  function addEmojiPeriodically() {
    const interval = setInterval(() => {
      const menuButton = document.querySelector(
        'span[data-testid="awsc-nav-regions-menu-button"]'
      );
      if (menuButton && !menuButton.classList.contains('emoji-added')) {
        const emoji = menuButton.querySelector('span')?.textContent.includes('Global') ? '🌍' : getEmojiFromRegionParam();
        menuButton.innerHTML += `<span class="aws-region-flag-emoji">${emoji}</span>`;
        menuButton.classList.add('emoji-added');
        clearInterval(interval); // Stop checking once the emoji is added
      }
    }, 1000); // Check every 1 second
  }

  // Wait for the document to load before starting the periodic check
  window.addEventListener('load', () => {
    GM_addStyle(`
      span.aws-region-flag-emoji {
        font-size: 22px;
        vertical-align: middle;
      }
    `);
    addEmojiPeriodically();
  });
})();
