/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Menu hidden */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-menu').classList.remove('show-menu');
  });
});




//Activar o desactivar modo oscuro
// Función para activar el modo oscuro
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
}

// Función para activar el modo claro
function enableLightMode() {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
}
// Guardar la preferencia del usuario en el almacenamiento local
function saveUserPreference(isDarkMode) {
    localStorage.setItem('isDarkMode', isDarkMode);
}

// Cargar la preferencia del usuario desde el almacenamiento local
function loadUserPreference() {
    return localStorage.getItem('isDarkMode') === 'true';
}

// Aplicar el modo basado en la preferencia del sistema
function applySystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

// Escuchar cambios en la preferencia del sistema
window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
    if (loadUserPreference() === null) { // Solo aplicar el cambio si el usuario no ha guardado una preferencia
        if (e.matches) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    }
});


document.getElementById("themeSwitch").addEventListener("change", function () {
    const isChecked = this.checked;

    if (isChecked) {
        enableDarkMode();
    } else {
        enableLightMode();
    }

    saveUserPreference(isChecked);
    updatePDFThumbnails();
});

// Inicializar el modo según la preferencia guardada
function initializeMode() {
    const userPreference = loadUserPreference();
    const themeSwitch = document.getElementById("themeSwitch");

    if (userPreference !== null) {
        themeSwitch.checked = userPreference;
        if (userPreference) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    } else {
        applySystemPreference();
        themeSwitch.checked = document.body.classList.contains('dark-mode');
    }
}

// Llama a initializeMode al cargar la página
initializeMode();

//Idioma
const langSwitch = document.getElementById('langSwitch')
const langElements = document.querySelectorAll('.lang')

function cambiarIdioma(idioma) {
    langElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${idioma}`)
    })
}

// Cargar preferencia desde localStorage
const idiomaGuardado = localStorage.getItem('idioma') || 'es'
cambiarIdioma(idiomaGuardado)
langSwitch.checked = idiomaGuardado === 'en'

// Cambiar idioma al hacer toggle
langSwitch.addEventListener('change', () => {
    const nuevoIdioma = langSwitch.checked ? 'en' : 'es'
    cambiarIdioma(nuevoIdioma)
    localStorage.setItem('idioma', nuevoIdioma)
})