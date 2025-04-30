// Function to call the Osano JavaScript API & allow banner suppression

(function (w, o, d) {
  w[o] =
    w[o] ||
    function () {
      w[o][d].push(arguments);
    };
  w[o][d] = w[o][d] || [];
})(window, 'Osano', 'data');

const allowedJurisdictions = [
  'us-ca', 'us-co', 'us-ct', 'us-va', 'us-ut',
  'us-tx', 'us-or', 'us-mt', 'us-ia', 'us-nh',
  'us-de', 'us-nj', 'us-ne'
];

window.Osano('onInitialized', function () {
  setTimeout(function () {
    const jurisdiction = (window.Osano.cm.jurisdiction || '').toLowerCase();
    console.log('Jurisdiction:', jurisdiction);
    if (!allowedJurisdictions.includes(jurisdiction)) {
      window.Osano.cm.hideDialog();
    }
  }, 250);
});
