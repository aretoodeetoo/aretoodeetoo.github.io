// Function to call the Osano JavaScript API & allow banner suppression
fetch('https://ipinfo.io/json?token=09a57283894e52')
  .then(response => response.json())
  .then(data => {
    const stateName = data.region || '';
    const country = data.country || '';
    const normalizedState = `${country}-${stateName.toUpperCase().replace(/\s/g, '_')}`; // e.g., US-CALIFORNIA
    console.log('Detected region:', normalizedState);

    // ✅ Update debug UI in HTML
    const regionSpan = document.getElementById('region');
    const bannerStatusSpan = document.getElementById('banner-status');
    if (regionSpan) regionSpan.textContent = normalizedState || 'unknown';

    const allowedRegions = [
      'US-CALIFORNIA', 'US-COLORADO', 'US-CONNECTICUT', 'US-VIRGINIA', 'US-UTAH',
      'US-TEXAS', 'US-OREGON', 'US-MONTANA', 'US-IOWA', 'US-NEW_HAMPSHIRE',
      'US-DELAWARE', 'US-NEW_JERSEY', 'US-NEBRASKA'
    ];

    if (allowedRegions.includes(normalizedState)) {
      if (bannerStatusSpan) bannerStatusSpan.textContent = 'Visible (Osano script loaded)';

      // Preload Osano
      (function (w, o, d) {
        w[o] = w[o] || function () { w[o][d].push(arguments); };
        w[o][d] = w[o][d] || [];
      })(window, 'Osano', 'data');

      // Load Osano
      const osanoScript = document.createElement('script');
      osanoScript.src = 'https://cmp.osano.com/AzZcpvRm9bbsqngN/5cd0582e-bdad-4a5c-8484-356e17bbbe1e/osano.js';
      osanoScript.async = true;
      document.head.appendChild(osanoScript);
    } else {
      console.log('Osano not loaded for this region.');
      if (bannerStatusSpan) bannerStatusSpan.textContent = 'Suppressed (Osano script not loaded)';
    }
  })
  .catch(err => {
    console.warn('Could not determine location. Not loading Osano.', err);
    const regionSpan = document.getElementById('region');
    const bannerStatusSpan = document.getElementById('banner-status');
    if (regionSpan) regionSpan.textContent = 'unknown';
    if (bannerStatusSpan) bannerStatusSpan.textContent = 'Unknown (could not determine region)';
  });
