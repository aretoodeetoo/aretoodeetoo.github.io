document.addEventListener("DOMContentLoaded", () => {
  // Only run this logic if the page is /terms-and-conditions.html
  if (!window.location.pathname.includes("terms-and-conditions.html")) return;

  const agreeButton = document.getElementById("agree-btn");
  const banner = document.getElementById("consent-banner");
  const statusBox = document.getElementById("consent-status");

  agreeButton.addEventListener("click", async () => {
    try {
      const token = await window.unifiedConsentJsSdk.UnifiedConsentByOsanoSDK.getToken({
        issuer: "https://uc.api.osano.com/v2/token/create",
        configId: "8834de69-269c-45ae-a275-0e0b54cfd817",
        customerId: "AzZcpvRm9bbsqngN"
      });

      const client = window.unifiedConsentJsSdk.UnifiedConsentByOsanoSDK.createClient({
        token,
        apiUrl: "https://uc.api.osano.com"
      });

      await client.createConsent({
        tags: ["terms-of-use"],
        actions: [
          {
            target: "terms-of-use-policy",
            vendor: "internal",
            action: window.unifiedConsentJsSdk.ActionType.Accept
          }
        ],
        subject: window.unifiedConsentJsSdk.Subject.anonymous()
      });

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

