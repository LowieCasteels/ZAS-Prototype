document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const steps = e.target.nextElementSibling;
            if (steps.style.display === 'block') {
                steps.style.display = 'none';
                e.target.innerText = 'Show Steps';
            } else {
                steps.style.display = 'block';
                e.target.innerText = 'Hide Steps';
            }
        });
    });
});