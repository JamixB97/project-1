let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');
//redirection function
let redirectURL = '';

const redirectPage = function (url) {
  redirectURL = url;
  location.assign(url);
};

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
  
}

const diableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}

if (darkmode === 'active') enableDarkmode();

themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    if (darkmode !== 'active') {
        enableDarkmode();
    } else {
        diableDarkmode();
    }
});
    


