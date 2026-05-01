let currentDate = new Date();
let currentJournal = "";
const stickerBox = ["🌸", "🎀", "🦢", "🦄", "🍓", "🧁", "🧸", "✨", "🦋", "🍭"];

window.onload = function() {
    setupSidebar();
};

function openJournal(title, themeColor, bgColor) {
    currentJournal = title;
    
    // Set the theme colors dynamically
    document.documentElement.style.setProperty('--main-theme', themeColor);
    document.documentElement.style.setProperty('--bg-theme', bgColor);
    
    document.getElementById('library-view').classList.add('hidden');
    document.getElementById('writing-view').classList.remove('hidden');
    displayPage();
}

function showLibrary() {
    // Reset to library pink
    document.documentElement.style.setProperty('--bg-theme', '#fff0f5');
    document.getElementById('library-view').classList.remove('hidden');
    document.getElementById('writing-view').classList.add('hidden');
}

function setupSidebar() {
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');
    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
    
    monthSelect.innerHTML = ""; daySelect.innerHTML = "";
    months.forEach((m, i) => {
        let opt = document.createElement('option'); opt.value = i; opt.innerHTML = m;
        monthSelect.appendChild(opt);
    });
    for (let i = 1; i <= 31; i++) {
        let opt = document.createElement('option'); opt.value = i; opt.innerHTML = i;
        daySelect.appendChild(opt);
    }
    monthSelect.value = currentDate.getMonth();
    daySelect.value = currentDate.getDate();
}

function displayPage() {
    const pageElement = document.querySelector('.journal-page');
    pageElement.classList.add('page-flip-animation');

    setTimeout(() => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = currentDate.toLocaleDateString('en-US', options);
        document.getElementById('current-date').innerText = dateString;

        const savedText = localStorage.getItem(currentJournal + '_' + dateString);
        document.getElementById('journal-input').value = savedText ? savedText : "";
        
        document.getElementById('month-select').value = currentDate.getMonth();
        document.getElementById('day-select').value = currentDate.getDate();

        const sticker = stickerBox[Math.floor(Math.random() * stickerBox.length)];
        document.getElementById('sticker-container').innerText = sticker;

        pageElement.classList.remove('page-flip-animation');
    }, 300);
}

function jumpToDate() {
    currentDate = new Date(2026, document.getElementById('month-select').value, document.getElementById('day-select').value);
    displayPage();
}

function changePage(days) {
    currentDate.setDate(currentDate.getDate() + days);
    displayPage();
}

function saveEntry() {
    const dateString = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    localStorage.setItem(currentJournal + '_' + dateString, document.getElementById('journal-input').value);
    alert(`Saved to ${currentJournal}! ✨💖`);
}