// OSANO JS API function to hide banner in unwanted locales
(function (w, o, d) {
  w[o] = w[o] || function () { w[o][d].push(arguments); };
  w[o][d] = w[o][d] || [];
})(window, 'Osano', 'data');

const suppressedJurisdictions = [
  'us-fl', 'us-ga', 'us-al', 'us-az', 'us-ar', 'us-ks',
  'us-ky', 'us-la', 'us-ms', 'us-mo', 'us-nm', 'us-nc',
  'us-ok', 'us-pa', 'us-sc', 'us-sd', 'us-tn', 'us-wi',
  'us-wv', 'us-wy', 'us-id', 'us-in', 'us-me', 'us-mi',
  'us-mn', 'us-nv', 'us-nd', 'us-oh', 'us-ri', 'us-tx',
];

window.Osano('onInitialized', function () {
  const jurisdiction = (window.Osano.cm.jurisdiction || '').toLowerCase();
  console.log('Jurisdiction:', jurisdiction);

  const hideStyle = document.getElementById('osano-hide-style');

  if (suppressedJurisdictions.includes(jurisdiction)) {
    console.log('Osano banner suppressed for:', jurisdiction);
    // Leave the hide style in place — no dialog shown
  } else {
    console.log('Showing Osano banner for:', jurisdiction);
    if (hideStyle) hideStyle.remove();  // Let Osano render normally
    window.Osano.cm.showDialog();       // Force the banner open
  }
});



// <!-- Step 2: Load Osano CMP -->
// <script src="https://cmp.osano.com/AzZcpvRm9bbsqngN/5cd0582e-bdad-4a5c-8484-356e17bbbe1e/osano.js?variant=two"></script>




// Works but causes the blip as banner initially loads
// (function (w, o, d) {
//   w[o] =
//     w[o] ||
//     function () {
//       w[o][d].push(arguments);
//     };
//   w[o][d] = w[o][d] || [];
// })(window, 'Osano', 'data');

// const allowedJurisdictions = [
//   'us-ca', 'us-co', 'us-ct', 'us-va', 'us-ut',
//   'us-tx', 'us-or', 'us-mt', 'us-ia', 'us-nh',
//   'us-de', 'us-nj', 'us-ne'
// ];

// window.Osano('onInitialized', function () {
//   setTimeout(function () {
//     const jurisdiction = (window.Osano.cm.jurisdiction || '').toLowerCase();
//     console.log('Osano jurisdiction detected:', jurisdiction);
//     if (!allowedJurisdictions.includes(jurisdiction)) {
//       window.Osano.cm.hideDialog();
//     }
//   }, 300); // Allow time for jurisdiction to populate
// });


// // Function to call the Osano JavaScript API & allow banner suppression THIRD PARTY API

// fetch('https://ipinfo.io/json?token=09a57283894e52')
//   .then(response => response.json())
//   .then(data => {
//     const stateName = data.region || '';
//     const country = data.country || '';
//     const normalizedState = `${country}-${stateName.toUpperCase().replace(/\s/g, '_')}`; // e.g., US-CALIFORNIA
//     console.log('Detected region:', normalizedState);

//     const allowedRegions = [
//       'US-CALIFORNIA', 'US-COLORADO', 'US-CONNECTICUT', 'US-VIRGINIA', 'US-UTAH',
//       'US-TEXAS', 'US-OREGON', 'US-MONTANA', 'US-IOWA', 'US-NEW_HAMPSHIRE',
//       'US-DELAWARE', 'US-NEW_JERSEY', 'US-NEBRASKA'
//     ];

//     if (allowedRegions.includes(normalizedState)) {
//       // Preload Osano
//       (function (w, o, d) {
//         w[o] = w[o] || function () { w[o][d].push(arguments); };
//         w[o][d] = w[o][d] || [];
//       })(window, 'Osano', 'data');

//       // Load Osano
//       const osanoScript = document.createElement('script');
//       osanoScript.src = 'https://cmp.osano.com/AzZcpvRm9bbsqngN/5cd0582e-bdad-4a5c-8484-356e17bbbe1e/osano.js?variant=two';
//       osanoScript.async = true;
//       document.head.appendChild(osanoScript);
//     } else {
//       console.log('Osano not loaded for this region.');
//     }
//   })
//   .catch(err => {
//     console.warn('Could not determine location. Not loading Osano.', err);
//   });
