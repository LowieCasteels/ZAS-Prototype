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
    const date     = document.getElementById('rec-date').value;
    const hour = document.getElementById('rec-hour').value;
    const type     = document.getElementById('rec-type').value;
    const provider = document.getElementById('rec-provider').value.trim();
    const format   = document.getElementById('rec-format').value;

    if (!date || !type || !provider || !hour) {
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
        <td>${type}</td>
        <td>${provider}</td>
        <td><button class="btn-sm">${format}</button></td>
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
    document.getElementById('rec-date').value = '';
    document.getElementById('rec-type').value = '';
    document.getElementById('rec-provider').value = '';
    document.getElementById('rec-format').value = 'PDF';
}

function toggleChat() {
        const chatWindow = document.getElementById("chatbot");
        if (chatWindow.style.display === "none") {
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