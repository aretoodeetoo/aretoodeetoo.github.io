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

    try {
      // 1) Obtain a token
      const token = await UnifiedConsentByOsanoSDK.getToken({
        issuer:     "https://uc.api.osano.com/v2/token/create",
        configId:   "8834de69-269c-45ae-a275-0e0b54cfd817",
        customerId: "AzZcpvRm9bbsqngN"
      });
      console.log("[Consent] ✅ Token acquired:", token);

      // 2) Instantiate the client
      const client = UnifiedConsentByOsanoSDK.createClient({
        apiUrl: "https://uc.api.osano.com/v2",
        token
      });
      console.log("[Consent] ✅ Client instantiated");

      // 3) Build and send the consent payload
      const payload = {
        tags: ["terms-of-use"],
        actions: [{
          target: "navigation-system",
          vendor: "general-vendor",
          action: window.unifiedConsentJsSdk.ActionType.Accept
        }],
        subject:    window.unifiedConsentJsSdk.Subject.anonymous(),
        attributes: []
      };
      console.log("[Consent] 📦 Payload:", payload);

      const response = await client.createConsent(payload);
      console.log("[Consent] 🎉 createConsent response:", response);

      // 4) Show success in the UI
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

      // Show failure in the UI
      banner.style.display    = "none";
      statusBox.style.display = "block";
      statusBox.textContent   = "❌ Consent was not saved—see console for details.";
      statusBox.style.border  = "2px solid red";
      statusBox.style.backgroundColor = "#ffe6e6";
      statusBox.style.color   = "var(--dark-gray)";
      statusBox.style.padding = "1rem";
      statusBox.style.borderRadius = "8px";
    }
  });
});
