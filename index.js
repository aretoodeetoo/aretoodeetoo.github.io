// Function to call the Osano JavaScript API & allow banner suppression

// index.js
const allowedJurisdictions = [
  'US-CA', 'US-CO', 'US-CT', 'US-VA', 'US-UT',
  'US-TX', 'US-OR', 'US-MT', 'US-IA', 'US-NH',
  'US-DE', 'US-NJ', 'US-NE'
];

// Use a third-party IP geolocation API
fetch('https://ipinfo.io/json?token=09a57283894e52')
  .then(response => response.json())
  .then(data => {
    const regionCode = `${data.country}-${data.region_code}`.toUpperCase(); // e.g., "US-CA"
    console.log('Detected region:', regionCode);

    if (allowedJurisdictions.includes(regionCode)) {
      // Insert Osano script dynamically
      const osanoScript = document.createElement('script');
      osanoScript.src = 'https://cmp.osano.com/AzZcpvRm9bbsqngN/5cd0582e-bdad-4a5c-8484-356e17bbbe1e/osano.js?variant=two';
      osanoScript.async = true;
      document.head.appendChild(osanoScript);

      // Set up Osano pre-load
      (function (w, o, d) {
        w[o] =
          w[o] ||
          function () {
            w[o][d].push(arguments);
          };
        w[o][d] = w[o][d] || [];
      })(window, 'Osano', 'data');
    } else {
      console.log('Osano not loaded for this region.');
    }
  })
  .catch(err => {
    console.warn('Could not determine location. Not loading Osano.', err);
  });
