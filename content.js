// content.js

let button = document.getElementById("button");
const body = document.body;
var isHidden = false;


function activate() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: `
            var mdnlogo = document.getElementById("mdn-docs-logo");
    
            if (mdnlogo) {
              mdnlogo.style.opacity = 0;
            }
            document.body.style.setProperty('--pride-0', '#fff');
            document.body.style.setProperty('--pride-1', '#fff');
            document.body.style.setProperty('--pride-2', '#fff');
            document.body.style.setProperty('--pride-3', '#fff');
            document.body.style.setProperty('--pride-4', '#fff');
            document.body.style.setProperty('--pride-5', '#fff');
            isHidden = true;
          `
        });
    });
    isHidden = true;
}
// activate();
function deactivate() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: `
            var mdnlogo = document.getElementById("mdn-docs-logo");
    
            if (mdnlogo) {
              mdnlogo.style.opacity = 1;
            }
            document.body.style.setProperty('--pride-0', '#e50000');
            document.body.style.setProperty('--pride-1', '#e68d00');
            document.body.style.setProperty('--pride-2', '#e6d600');
            document.body.style.setProperty('--pride-3', '#008100');
            document.body.style.setProperty('--pride-4', '#004cff');
            document.body.style.setProperty('--pride-5', '#760188');
            isHidden = false;
          `
        });
    });
    isHidden = false;
}

function toggle() {
    if (isHidden) {
        deactivate();
        button.textContent = "Activate";
    } else {
        activate();
        button.textContent = "Deactivate";
    }
}

button.addEventListener('click', toggle);