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

    const { UnifiedConsentByOsanoSDK, Subject, ActionType } = window.unifiedConsentJsSdk || {};
    if (!UnifiedConsentByOsanoSDK) {
      console.error("[Consent] ❌ Osano SDK not loaded");
      return;
    }

    // build payload outside try so we can log it on error
    const payload = {
        tags: ["terms-of-use"],
          compliance: {
          privacyPolicy: {
            version: "1.2",
            url: "010203"
            },
           gpc: 0
        },
      actions: [{
        target: "971be3f6-30dc-4f0e-b555-74473528d3c0",
        vendor: "b9e8f271-1011-4f74-ac59-c5a2a22ffcd7",
        action: ActionType.Accept
      }],
      attributes: [
        { platform: navigator.platform }
      ],
      subject: Subject.anonymous()
    };

    try {
      // — get a token
      const accessToken = await UnifiedConsentByOsanoSDK.getToken({
        issuer:     "https://uc.api.osano.com/v2/token/create",
        configId:   "b9e8f271-1011-4f74-ac59-c5a2a22ffcd7",
        customerId: "AzZcpvRm9bbsqngN"
      });
      console.log("[Consent] ✅ Token:", accessToken);

      // — create the client pointed at /v2
      const client = UnifiedConsentByOsanoSDK.createClient({
        apiUrl: "https://uc.api.osano.com/v2",
        token:  accessToken
      });
      console.log("[Consent] ✅ Client ready");

      // — log the JSON we’re about to send
      console.log("[Consent] 📦 Sending payload:", JSON.stringify(payload, null, 2));

      // — fire the request
      const result = await client.createConsent(payload);
      console.log("[Consent] 🎉 createConsent result:", result);

      // success UI
      banner.style.display    = "none";
      statusBox.style.display = "block";
      statusBox.textContent   = "✅ Record of consent saved!";
      // (apply your success styling…)

    } catch (error) {
      // log the raw SDK error
      console.error("[Consent] ❌ Error creating consent:", error);

      // if it's an HTTP error from the SDK, log the details
      if (error.response) {
        console.error("[Consent] ➡️ Response status:", error.response.status);
        console.error("[Consent] ➡️ Response body:", JSON.stringify(error.response.data, null, 2));
      }
      if (error.request) {
        console.error("[Consent] ➡️ Request made:", error.request);
      }

      // always log the payload we sent
      console.error("[Consent] 📦 Payload was:", JSON.stringify(payload, null, 2));

      // failure UI
      banner.style.display    = "none";
      statusBox.style.display = "block";
      statusBox.textContent   = "❌ Consent was not saved—see console for details.";
      // (apply your error styling…)
    }
  });
});
