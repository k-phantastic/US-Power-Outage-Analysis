document.addEventListener('DOMContentLoaded', () => {
    // Define the navigation bar structure
    const navHTML = `
        <nav class="navbar">
            <div class="nav-brand">Power Outage Analysis</div>
            <ul class="nav-links">
                <li><a href="main.html" id="nav-home">Home</a></li>
                <li><a href="analysis.html" id="nav-analysis">Analysis</a></li>
                <li><a href="#" id="nav-github" target="_blank">GitHub</a></li>
            </ul>
        </nav>
    `;

    // Insert the navbar at the beginning of the body on every page
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Highlight the active page based on the current URL
    const pathname = window.location.pathname;
    const currentPage = pathname.split('/').pop() || 'main.html';

    if (currentPage.includes('main.html')) {
        const homeLink = document.getElementById('nav-home');
        if (homeLink) homeLink.classList.add('active');
    } else if (currentPage.includes('analysis.html')) {
        const analysisLink = document.getElementById('nav-analysis');
        if (analysisLink) analysisLink.classList.add('active');
    }
});
