(function (w, o, d) {
  w[o] = w[o] || function () { w[o][d].push(arguments); };
  w[o][d] = w[o][d] || [];
})(window, 'Osano', 'data');

document.addEventListener("DOMContentLoaded", function () {
  // List of jurisdictions where we DO NOT want to show the CMP
  const suppressedJurisdictions = ["us-ca", "us-ct", "ca"];

  // 🔽 NEW: Grab HTML elements for debug info
  const jurisdictionSpan = document.getElementById("jurisdiction");
  const bannerStatusSpan = document.getElementById("banner-status");

  function evaluateJurisdiction() {
    const jurisdiction = window.Osano?.cm?.jurisdiction;
    console.log("Detected jurisdiction:", jurisdiction);

    // 🔽 NEW: Update jurisdiction span (even if undefined)
    if (jurisdictionSpan) {
      jurisdictionSpan.textContent = jurisdiction || "unknown";
    }

    if (!jurisdiction) return;

    if (!suppressedJurisdictions.includes(jurisdiction)) {
      console.log("Jurisdiction not suppressed — showing CMP banner.");

      // 🔽 NEW: Update banner status
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
