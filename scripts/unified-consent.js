document.addEventListener("DOMContentLoaded", () => {
  const agreeButton = document.getElementById("agree-btn");
  const banner      = document.getElementById("consent-banner");
  const statusBox   = document.getElementById("consent-status");

  if (!agreeButton) {
    console.error("[Consent] ❌ #agree-btn not found in DOM");
    return;
  }

  agreeButton.addEventListener("click", async () => {
    console.log("[Consent] ▶️ I Agree clicked");

    // Destructure the SDK exports
    const { UnifiedConsentByOsanoSDK, Subject, ActionType } = window.unifiedConsentJsSdk || {};

    if (!UnifiedConsentByOsanoSDK) {
      console.error("[Consent] ❌ Osano SDK not loaded");
      return;
    }

    try {
      // 1) Get an access token :contentReference[oaicite:1]{index=1}
      const accessToken = await UnifiedConsentByOsanoSDK.getToken({
        issuer:     "https://uc.api.osano.com/v2/token/create",
        configId:   "8834de69-269c-45ae-a275-0e0b54cfd817",
        customerId: "AzZcpvRm9bbsqngN"
      });
      console.log("[Consent] ✅ Access token:", accessToken);

      // 2) Instantiate the client against the v2 API :contentReference[oaicite:2]{index=2}
      const client = UnifiedConsentByOsanoSDK.createClient({
        apiUrl: "https://uc.api.osano.com/v2",
        token:  accessToken
      });
      console.log("[Consent] ✅ Client instantiated");

      // 3) Build the consent payload
      const payload = {
        tags: ["terms-of-use"],
        actions: [
          {
            target: "navigation-system",
            vendor: "general-vendor",
            action: ActionType.Accept
          }
        ],
        attributes: [
          // optional metadata—browser platform
          { platform: navigator.platform }
        ],
        subject: Subject.anonymous()
      };
      console.log("[Consent] 📦 Payload:", payload);

      // 4) Send createConsent to /v2/consents
      const result = await client.createConsent(payload);
      console.log("[Consent] 🎉 createConsent result:", result);

      // 5) Success UI update
      banner.style.display    = "none";
      statusBox.style.display = "block";
      statusBox.textContent   = "✅ Record of consent saved!";
      statusBox.style.border  = "2px solid var(--emerald)";
      statusBox.style.backgroundColor = "#e6fff3";
      statusBox.style.color   = "var(--dark-gray)";
      statusBox.style.padding = "1rem";
      statusBox.style.borderRadius = "8px";

    } catch (error) {
      console.error("[Consent] ❌ Error creating consent:", error);

      // Error UI update
      banner.style.display    = "none";
      statusBox.style.display = "block";
      statusBox.textContent   = "❌ Consent was not saved—check console for details.";
      statusBox.style.border  = "2px solid red";
      statusBox.style.backgroundColor = "#ffe6e6";
      statusBox.style.color   = "var(--dark-gray)";
      statusBox.style.padding = "1rem";
      statusBox.style.borderRadius = "8px";
    }
  });
});
