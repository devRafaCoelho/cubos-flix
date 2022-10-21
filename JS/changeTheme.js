let initialTheme = localStorage.getItem('theme') ?? 'light';
verifyTheme();

function verifyTheme() {
    if (initialTheme === 'light') {
        lightMode();
    } else if (initialTheme === 'dark') {
        darkMode();
    }
}

headerButton.addEventListener('click', event => {
    event.preventDefault();
    if (initialTheme === 'light') {
        darkMode();
        initialTheme = 'dark';
        localStorage.setItem('theme', 'dark');
    } else if (initialTheme === 'dark') {
        lightMode();
        initialTheme = 'light';
        localStorage.setItem('theme', 'light');
    }
});

function lightMode() {
    headerButton.src = './assets/light-mode.svg';
    prev.src = './assets/seta-esquerda-preta.svg';
    next.src = './assets/seta-direita-preta.svg';
    body.style.setProperty('--background-color', '#fff');
    body.style.setProperty('--input-border-color', '#979797');
    body.style.setProperty('--color', '#000');
    body.style.setProperty('--shadow-color', '0px 4px 8px rgba(0, 0, 0, 0.15)');
    body.style.setProperty('--highlight-background', '#fff');
    body.style.setProperty('--highlight-color', 'rgba(0, 0, 0, 0.7)');
    body.style.setProperty('--highlight-description', '#000');
}

function darkMode() {
    headerButton.src = './assets/dark-mode.svg';
    prev.src = './assets/seta-esquerda-branca.svg';
    next.src = './assets/seta-direita-branca.svg';
    body.style.setProperty('--background-color', '#242424');
    body.style.setProperty('--input-border-color', '#fff');
    body.style.setProperty('--color', '#fff');
    body.style.setProperty('--shadow-color', '0px 4px 8px rgba(255, 255, 255, 0.15)');
    body.style.setProperty('--highlight-background', '#454545');
    body.style.setProperty('--highlight-color', 'rgba(255, 255, 255, 0.7)');
    body.style.setProperty('--highlight-description', 'rgba(255, 255, 255, 0.8)');
}