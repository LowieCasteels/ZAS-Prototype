// Data Simulation Engine
const ZAS_STORE = {
    patient: {
        id: "99281",
        name: "Alex Janssens",
        notifications: 2
    },
    async fetchRecords() {
        // Mocking an API call to a FHIR server
        return [
            { id: 1, date: "2026-05-01", type: "MRI Scan", lab: "Radiology", file: "mri_01.dicom" },
            { id: 2, date: "2026-04-15", type: "Blood Test", lab: "Hematology", file: "blood_04.pdf" }
        ];
    },
    init() {
        console.log("ZAS Advanced Core Initialized");
        this.renderUserSession();
    },
    renderUserSession() {
        const badge = document.querySelector('.user-badge');
        if(badge) badge.innerText = `${this.patient.name} (ID: ${this.patient.id})`;
    }
};

document.addEventListener('DOMContentLoaded', () => ZAS_STORE.init());