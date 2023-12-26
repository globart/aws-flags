// ==UserScript==
// @name         AWS Console Emoji Injector
// @version      1.0
// @description  Injects an emoji based on the country associated with the city into the AWS Console navigation menu button
// @match        *://*.console.aws.amazon.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  // Function to determine the emoji based on the country
  function getEmoji(city) {
    const cityToCountry = {
      'Global': '🌎',
      'N. Virginia': '🇺🇸',
      'Ohio': '🇺🇸',
      'N. California': '🇺🇸',
      'Oregon': '🇺🇸',
      'Mumbai': '🇮🇳',
      'Osaka': '🇯🇵',
      'Seoul': '🇰🇷',
      'Singapore': '🇸🇬',
      'Sydney': '🇦🇺',
      'Tokyo': '🇯🇵',
      'Central': '🇨🇦',
      'Calgary': '🇨🇦',
      'Frankfurt': '🇩🇪',
      'Ireland': '🇮🇪',
      'London': '🇬🇧',
      'Paris': '🇫🇷',
      'Stockholm': '🇸🇪',
      'São Paulo': '🇧🇷',
      'Cape Town': '🇿🇦',
      'Hong Kong': '🇭🇰',
      'Hyberabad': '🇮🇳',
      'Jakarta': '🇮🇩',
      'Melbourne': '🇦🇺',
      'Milan': '🇮🇹',
      'Spain': '🇪🇸',
      'Zurich': '🇨🇭',
      'Bahrain': '🇧🇭',
      'UAE': '🇦🇪',
      'Tel Aviv': '🇮🇱'
    };

    return cityToCountry[city] || '';
  }

  // Function to add the emoji to the navigation menu button
  function addEmoji() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        const menuButton = mutation.target.querySelector(
          'span[data-testid="awsc-nav-regions-menu-button"]'
        );
        const city = menuButton.innerText.trim();
        const emoji = getEmoji(city);
        menuButton.innerHTML += `<span class="aws-region-flag-emoji">${emoji}</span>`;
      });
    });

    const observerConfig = {
      childList: true,
      subtree: true
    };

    const targetNode = document.documentElement || document.body;
    observer.observe(targetNode, observerConfig);
  }

  // Wait for the document to load before modifying the DOM
  window.addEventListener('load', () => {
    GM_addStyle(`
      span.aws-region-flag-emoji {
        font-size: 22px;
        vertical-align: middle;
      }
    `);
    addEmoji();
  });
})();
