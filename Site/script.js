document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetPage = item.getAttribute('data-page');

            // Update Sidebar UI
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Switch Pages
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                }
            });

            const badge = document.getElementById(`badge-${targetPage}`);
            if (badge && badge.style.display !== 'none') {
                badge.style.display = 'none';
                
                // Hide all guide sections first
                ['directory', 'records', 'messages'].forEach(g => {
                    const el = document.getElementById(`modal-guide-${g}`);
                    if (el) el.style.display = 'none';
                });
                
                // Show the specific feature guide
                const specificGuide = document.getElementById(`modal-guide-${targetPage}`);
                if (specificGuide) {
                    specificGuide.style.display = 'block';
                    
                    // Reset checkbox and button
                    document.getElementById('quick-guide-checkbox').checked = false;
                    document.getElementById('quick-guide-close-btn').disabled = true;
                    
                    document.getElementById('quick-guide-modal').style.display = 'flex';
                }
            }

            console.log(`Navigated to: ${targetPage}`);
        });
    });
});

const newMsgBtn = document.getElementById('new-msg-btn');
const modal = document.getElementById('compose-modal');
const cancelBtn = document.getElementById('cancel-btn');
const sendBtn = document.getElementById('send-btn');
const messageList = document.getElementById('message-list');
const emptyNote = document.getElementById('empty-note');

// Open modal
newMsgBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Close modal
cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    clearForm();
});

// Send message
sendBtn.addEventListener('click', () => {
    const to = document.getElementById('msg-to').value.trim();
    const subject = document.getElementById('msg-subject').value.trim();
    const body = document.getElementById('msg-body').value.trim();

    if (!to || !subject || !body) {
        alert('Please fill in all fields.');
        return;
    }

    // Build message card
    const now = new Date().toLocaleString();
    const card = document.createElement('div');
    card.className = 'message-card';
    card.innerHTML = `
        <div class="meta">To: ${to} &nbsp;·&nbsp; ${now}</div>
        <div class="subject">${subject}</div>
        <div class="preview">${body}</div>
    `;

    messageList.prepend(card);
    emptyNote.style.display = 'none'; // Hide empty state
    modal.style.display = 'none';
    clearForm();
});

function clearForm() {
    document.getElementById('msg-to').value = '';
    document.getElementById('msg-subject').value = '';
    document.getElementById('msg-body').value = '';
}


const addRecordBtn = document.getElementById('add-record-btn');
const recordModal = document.getElementById('record-modal');
const recCancel = document.getElementById('rec-cancel');
const recSave = document.getElementById('rec-save');
const recordsTbody = document.querySelector('#records .data-table tbody');

// Open modal
addRecordBtn.addEventListener('click', () => {
    recordModal.style.display = 'flex';
});

// Close modal
recCancel.addEventListener('click', () => {
    recordModal.style.display = 'none';
    clearRecordForm();
});

// Save record
recSave.addEventListener('click', () => {
    const patientId = document.getElementById('rec-patient-id').value.trim();
    const date     = document.getElementById('rec-date').value;
    const hour = document.getElementById('rec-hour').value;
    const type     = document.getElementById('rec-type').value;
    const notes     = document.getElementById('rec-notes').value.trim();

    if (!patientId || !date || !type || !hour) {
        alert('Please fill in all fields.');
        return;
    }

    const [y, m, d] = date.split('-');
    const formatted = `${d}/${m}/${y}`;
    const [h, min, s] = hour.split(':')
    const hourFormatted = `${h}:${min}`;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${formatted}</td>
        <td>${hourFormatted}</td>
        <td>${patientId}</td>
        <td>${type}</td>
        <td>You</td>
        <td><button class="btn-sm">View</button></td>
    `;

   const recordsTbody = document.getElementById('records-tbody');

    if (!recordsTbody) {
        console.error('Table body not found — make sure #records section is visible in the DOM.');
        return;
    }

    recordsTbody.prepend(row);

    recordModal.style.display = 'none';
    clearRecordForm();
});

function clearRecordForm() {
    document.getElementById('rec-patient-id').value = '';
    document.getElementById('rec-date').value = '';
    document.getElementById('rec-type').value = '';
    document.getElementById('rec-notes').value = '';
}

function toggleChat() {
        const chatWindow = document.getElementById("chatbot");
        if (chatWindow.style.display !== "flex") {
            chatWindow.style.display = "flex";
        } else {
            chatWindow.style.display = "none";
        }
    }

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Close sidebar if user clicks outside of it on mobile
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.menu-toggle');
    toggleBtn.style.display = "none";
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
            sidebar.classList.remove('open');
            toggleBtn.style.display = "block";
        }
    }
});

// --- Login & What's New Carousel ---
function handleLogin() {
    // Hide login screen
    document.getElementById('login-screen').style.display = 'none';
    
    // Reset popup constraints
    document.getElementById('read-checkbox').checked = false;
    document.getElementById('continue-btn').disabled = true;
    document.getElementById('read-acknowledgement').style.display = 'none';

    // Show What's New modal
    document.getElementById('whats-new-modal').style.display = 'flex';
    showSlides(0); // Initialize carousel on first slide
}

function closeWhatsNew() {
    document.getElementById('whats-new-modal').style.display = 'none';
}

let slideIndex = 0;

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function setSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n >= slides.length) { slideIndex = 0 }    
    if (n < 0) { slideIndex = slides.length - 1 }
    
    for (let i = 0; i < slides.length; i++) { slides[i].classList.remove("active"); }
    for (let i = 0; i < dots.length; i++) { dots[i].classList.remove("active"); }
    
    if (slides[slideIndex]) slides[slideIndex].classList.add("active");  
    if (dots[slideIndex]) dots[slideIndex].classList.add("active");
    
    // Require user to reach the last slide before showing the checkbox
    if (slideIndex === slides.length - 1) {
        document.getElementById('read-acknowledgement').style.display = 'block';
    }
}

function toggleContinueBtn() {
    const checkbox = document.getElementById('read-checkbox');
    const btn = document.getElementById('continue-btn');
    btn.disabled = !checkbox.checked;
}

function toggleQuickGuideBtn() {
    const checkbox = document.getElementById('quick-guide-checkbox');
    const btn = document.getElementById('quick-guide-close-btn');
    btn.disabled = !checkbox.checked;
}

function toggleGuideSteps(guideId) {
    const card = document.getElementById(guideId);
    if (!card) return;
    
    const stepsDiv = card.querySelector('.guide-steps');
    const btn = card.querySelector('.btn.secondary');
    if (!stepsDiv) return;
    
    if (stepsDiv.style.display !== 'block') {
        stepsDiv.style.display = 'block';
        if (btn) btn.innerText = 'Hide Steps';
    } else {
        stepsDiv.style.display = 'none';
        if (btn) btn.innerText = 'Show Steps';
    }
}

function openGuide(guideId) {
    closeWhatsNew();
    
    // Hide the specific feature badge if the user viewed its guide
    const targetPage = guideId.replace('guide-', '');
    const badge = document.getElementById(`badge-${targetPage}`);
    if (badge) badge.style.display = 'none';
    
    // Switch to the guides page by simulating a click on the navigation item
    const guidesNav = document.querySelector('[data-page="guides"]');
    if (guidesNav) guidesNav.click();
    
    // Scroll to and highlight the specific guide temporarily
    setTimeout(() => {
        const card = document.getElementById(guideId);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('highlight');
            setTimeout(() => card.classList.remove('highlight'), 3000); // Remove highlight after 3 seconds
            
            // Auto-expand the steps if they are hidden
            const stepsDiv = card.querySelector('.guide-steps');
            const btn = card.querySelector('.btn.secondary');
            if (stepsDiv && stepsDiv.style.display !== 'block') {
                stepsDiv.style.display = 'block';
                if (btn) btn.innerText = 'Hide Steps';
            }
        }
    }, 100);
}