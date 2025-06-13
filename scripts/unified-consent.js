document.addEventListener("DOMContentLoaded", () => {
  // ✅ Get references to HTML elements
  const agreeButton = document.getElementById("agree-btn");
  const banner = document.getElementById("consent-banner");
  const statusBox = document.getElementById("consent-status");

  // ✅ Only add event listener if button exists
  if (!agreeButton) {
    console.error("Could not find #agree-btn in the DOM.");
    return;
  }

  // ✅ Handle click
  agreeButton.addEventListener("click", async () => {
    const sdk = window.unifiedConsentJsSdk?.UnifiedConsentByOsanoSDK;
    if (!sdk) {
      console.error("Unified Consent SDK is not loaded.");
      return;
    }

    try {
      const token = await sdk.getToken({
        issuer: "https://uc.api.osano.com/v2/token/create",
        configId: "8834de69-269c-45ae-a275-0e0b54cfd817",
        customerId: "AzZcpvRm9bbsqngN"
      });

      const client = sdk.createClient({
        token,
        apiUrl: "https://uc.api.osano.com/v2"
      });

      const payload = {
        tags: ["terms-of-use"],
        actions: [
          {
            target: "terms-of-use",
            vendor: "internal",
            action: window.unifiedConsentJsSdk.ActionType.Accept
          }
        ],
        subject: window.unifiedConsentJsSdk.Subject.anonymous()
      };

      console.log("Submitting consent:", payload);
      await client.createConsent(payload);

      banner.style.display = "none";
      statusBox.style.display = "block";
      statusBox.textContent = "✅ Record of consent saved!";
      statusBox.style.border = "2px solid var(--emerald)";
      statusBox.style.backgroundColor = "#e6fff3";
      statusBox.style.color = "var(--dark-gray)";
      statusBox.style.padding = "1rem";
      statusBox.style.borderRadius = "8px";
    } catch (error) {
      banner.style.display = "none";
      statusBox.style.display = "block";
      statusBox.textContent = "❌ Consent was not saved... let the troubleshooting commence.";
      statusBox.style.border = "2px solid red";
      statusBox.style.backgroundColor = "#ffe6e6";
      statusBox.style.color = "var(--dark-gray)";
      statusBox.style.padding = "1rem";
      statusBox.style.borderRadius = "8px";

      console.error("Consent submission failed:", error);
    }
  });
});
