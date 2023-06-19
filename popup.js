// popup.js
document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggleButton");
  
    // Set the initial state of the extension
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTabId = tabs[0].id;
      chrome.tabs.sendMessage(activeTabId, { action: "getState" }, function (response) {
        updateToggleButton(response.state);
      });
    });
  
    // Update the state of the extension and the toggle button
    function updateToggleButton(state) {
      toggleButton.innerHTML = "";
      var button = document.createElement("button");
      button.classList.add("button");
      button.innerText = state ? "Disable" : "Enable";
      toggleButton.appendChild(button);
  
      // Add event listener to toggle the state of the extension
      button.addEventListener("click", function () {
        var newState = !state;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          var activeTabId = tabs[0].id;
          chrome.tabs.sendMessage(activeTabId, { action: "setState", state: newState }, function (response) {
            updateToggleButton(response.state);
          });
        });
      });
    }
});
  
