// Dictionary of guidance based on page content
const guidanceMap = {
    "Cardiology": "Protocol: Ensure the patient has completed the 24h Holter monitor before prescribing Lisinopril.",
    "Dermatology": "Protocol: Upload at least 3 high-res photos of the lesion before submitting for biopsy.",
    "Blood Analysis": "Alert: Potassium levels > 5.5 mmol/L require immediate specialist notification."
};

function injectGuidance() {
    // 1. Find the main content card
    const mainCard = document.querySelector('.content-card');
    
    if (mainCard && !document.getElementById('zas-guide-box')) {
        // 2. Create the guidance UI
        const guideBox = document.createElement('div');
        guideBox.id = 'zas-guide-box';
        
        // Check page context (searching for keywords in the HTML)
        let contextText = "General Guidance";
        for (let key in guidanceMap) {
            if (document.body.innerText.includes(key)) {
                contextText = guidanceMap[key];
                break;
            }
        }

        guideBox.innerHTML = `
            <div class="guide-header">👨‍⚕️ Doctor Guidance</div>
            <div class="guide-body">${contextText}</div>
            <div class="guide-footer">
                <button id="guide-dismiss">Got it</button>
                <a href="#">View Full Protocol</a>
            </div>
        `;
        
        document.body.appendChild(guideBox);

        document.getElementById('guide-dismiss').onclick = () => {
            guideBox.style.display = 'none';
        };
    }
}

// Run the injection logic after a short delay to ensure page loads
setTimeout(injectGuidance, 1000);