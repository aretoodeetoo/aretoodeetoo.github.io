document.addEventListener("DOMContentLoaded", function () {
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

      const dialog = document.querySelector(".osano-cm-dialog");
      const widget = document.querySelector(".osano-cm-widget");

      if (dialog && getComputedStyle(dialog).display === "none") {
        dialog.style.display = "block";
      }

      if (widget && getComputedStyle(widget).display === "none") {
        widget.style.display = "block";
      }

      if (typeof window.Osano?.cm?.showDialog === "function") {
        window.Osano.cm.showDialog();
      }
    } else {
      console.log("Jurisdiction is suppressed — CMP remains hidden.");

      // 🔽 NEW: Update banner status
      if (bannerStatusSpan) {
        bannerStatusSpan.textContent = "Suppressed (banner hidden)";
      }
    }
  }

  window.Osano?.("onInitialized", () => {
    setTimeout(evaluateJurisdiction, 100);
  });
});
