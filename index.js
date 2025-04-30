// // Function to call the Osano JavaScript API & allow banner suppression

fetch('https://ipinfo.io/json?token=09a57283894e52')
  .then(response => response.json())
  .then(data => {
    const stateName = data.region || '';
    const country = data.country || '';
    const normalizedState = `${country}-${stateName.toUpperCase().replace(/\s/g, '_')}`; // e.g., US-CALIFORNIA
    console.log('Detected region:', normalizedState);

    const allowedRegions = [
      'US-CALIFORNIA', 'US-COLORADO', 'US-CONNECTICUT', 'US-VIRGINIA', 'US-UTAH',
      'US-TEXAS', 'US-OREGON', 'US-MONTANA', 'US-IOWA', 'US-NEW_HAMPSHIRE',
      'US-DELAWARE', 'US-NEW_JERSEY', 'US-NEBRASKA'
    ];

    if (allowedRegions.includes(normalizedState)) {
      // Preload Osano
      (function (w, o, d) {
        w[o] = w[o] || function () { w[o][d].push(arguments); };
        w[o][d] = w[o][d] || [];
      })(window, 'Osano', 'data');

      // Load Osano
      const osanoScript = document.createElement('script');
      osanoScript.src = 'https://cmp.osano.com/AzZcpvRm9bbsqngN/5cd0582e-bdad-4a5c-8484-356e17bbbe1e/osano.js?variant=two';
      osanoScript.async = true;
      document.head.appendChild(osanoScript);
    } else {
      console.log('Osano not loaded for this region.');
    }
  })
  .catch(err => {
    console.warn('Could not determine location. Not loading Osano.', err);
  });


// // index.js
// const allowedJurisdictions = [
//   'US-CA', 'US-CO', 'US-CT', 'US-VA', 'US-UT',
//   'US-TX', 'US-OR', 'US-MT', 'US-IA', 'US-NH',
//   'US-DE', 'US-NJ', 'US-NE'
// ];

// // Use a third-party IP geolocation API
// fetch('https://ipinfo.io/json?token=09a57283894e52')
//   .then(response => response.json())
//   .then(data => {
//     const regionCode = `${data.country}-${data.region_code}`.toUpperCase(); // e.g., "US-CA"
//     console.log('Detected region:', regionCode);

//     if (allowedJurisdictions.includes(regionCode)) {
//       // Insert Osano script dynamically
//       const osanoScript = document.createElement('script');
//       osanoScript.src = 'https://cmp.osano.com/AzZcpvRm9bbsqngN/5cd0582e-bdad-4a5c-8484-356e17bbbe1e/osano.js?variant=two';
//       osanoScript.async = true;
//       document.head.appendChild(osanoScript);

//       // Set up Osano pre-load
//       (function (w, o, d) {
//         w[o] =
//           w[o] ||
//           function () {
//             w[o][d].push(arguments);
//           };
//         w[o][d] = w[o][d] || [];
//       })(window, 'Osano', 'data');
//     } else {
//       console.log('Osano not loaded for this region.');
//     }
//   })
//   .catch(err => {
//     console.warn('Could not determine location. Not loading Osano.', err);
//   });
