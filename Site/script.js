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