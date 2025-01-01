document.addEventListener("DOMContentLoaded", function() {
    const domainForm = document.getElementById("domain-form");
    const domainInput = document.getElementById("domain-input");
    const submitDomainButton = document.getElementById("submit-domain");
    const errorMessage = document.getElementById("error-message");
    const whoisResult = document.getElementById("whois-result");
    const domainNameElement = document.getElementById("domain-name");
    const whoisDetailsElement = document.getElementById("whois-details");
  
    const additionalInfoForm = document.getElementById("additional-info-form");
    const infoForm = document.getElementById("info-form");
  
    // Handle domain search submission
    domainForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const domain = domainInput.value.trim();
      if (!domain) {
        showError("Domain name is required");
        return;
      }
  
      fetchWhoisData(domain);
    });
  
    // Fetch WHOIS data
    function fetchWhoisData(domain) {
      submitDomainButton.disabled = true;
      showError(null);
      resetWhoisResult();
  
      fetch("http://cft.test/whois_api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            showError(data.error);
          } else {
            displayWhoisData(data);
          }
        })
        .catch(err => showError("An error occurred: " + err.message))
        .finally(() => (submitDomainButton.disabled = false));
    }
  
    // Display WHOIS data
    function displayWhoisData(data) {
      const rawData = data.raw_data;
      domainNameElement.textContent = `WHOIS Information for ${rawData.domain}`;
      
      // Split WHOIS data by lines for easier parsing
      const whoisLines = rawData.text.split("\n").filter(line => line.trim() !== "");
  
      whoisDetailsElement.innerHTML = whoisLines.map(line => `<li>${line}</li>`).join("");
      whoisResult.classList.remove("hidden");
  
      // Show additional info form
      additionalInfoForm.classList.remove("hidden");
    }
  
    // Show error message
    function showError(message) {
      if (message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove("hidden");
      } else {
        errorMessage.classList.add("hidden");
      }
    }
  
    // Reset WHOIS result
    function resetWhoisResult() {
      whoisResult.classList.add("hidden");
      whoisDetailsElement.innerHTML = "";
      additionalInfoForm.classList.add("hidden");
    }
  
    // Handle additional info form submission
    infoForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const company = document.getElementById("company").value;
      const designation = document.getElementById("designation").value;
      const address = document.getElementById("address").value;
  
      console.log("User Info:", { name, email, phone, company, designation, address });
      alert("Your information has been submitted!");
    });
  });
  