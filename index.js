(function (w, o, d) {
  w[o] = w[o] || function () { w[o][d].push(arguments); };
  w[o][d] = w[o][d] || [];
})(window, 'Osano', 'data');

document.addEventListener("DOMContentLoaded", function () {
  // List of jurisdictions where we DO NOT want to show the CMP
  const suppressedJurisdictions = ["us-ca", "us-ct", "ca"];

  // Grab HTML elements for debug info
  const jurisdictionSpan = document.getElementById("jurisdiction");
  const bannerStatusSpan = document.getElementById("banner-status");

  function evaluateJurisdiction() {
    const jurisdiction = window.Osano?.cm?.jurisdiction;
    console.log("Detected jurisdiction:", jurisdiction);

    // Update jurisdiction span (even if undefined)
    if (jurisdictionSpan) {
      jurisdictionSpan.textContent = jurisdiction || "unknown";
    }

    if (!jurisdiction) return;

    if (!suppressedJurisdictions.includes(jurisdiction)) {
      console.log("Jurisdiction not suppressed — showing CMP banner.");

      // Update banner status
      if (bannerStatusSpan) {
        bannerStatusSpan.textContent = "Visible (banner shown)";
      }

  // This function compares location and takes action only if not suppressed
  function evaluateJurisdiction() {
    const jurisdiction = window.Osano?.cm?.jurisdiction;
    console.log("Detected jurisdiction:", jurisdiction);

    // If jurisdiction is undefined, fail silently
    if (!jurisdiction) return;

    // If the user's jurisdiction is NOT suppressed, show CMP
    if (!suppressedJurisdictions.includes(jurisdiction)) {
      console.log("Jurisdiction not suppressed — showing CMP banner.");

      const dialog = document.querySelector(".osano-cm-dialog");
      const widget = document.querySelector(".osano-cm-widget");

      // Only update display if it's currently hidden
      if (dialog && getComputedStyle(dialog).display === "none") {
        dialog.style.display = "block";
      }

      if (widget && getComputedStyle(widget).display === "none") {
        widget.style.display = "block";
      }

      // Trigger the dialog for implicit-consent regions
      if (typeof window.Osano?.cm?.showDialog === "function") {
        window.Osano.cm.showDialog();
      }
    } else {
      // Do absolutely nothing if jurisdiction is suppressed
      console.log("Jurisdiction is suppressed — CMP remains hidden.");
    }
  }

  // Wait for Osano to initialize before evaluating
  window.Osano?.("onInitialized", () => {
    setTimeout(evaluateJurisdiction, 100); // small delay for DOM readiness
  });
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
