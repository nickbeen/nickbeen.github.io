window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (localStorage.getItem('theme') === 'system') {
    if (e.matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
})

function toDarkTheme() {
  localStorage.setItem('theme', 'dark')
  updateTheme()
}

function toLightTheme() {
  localStorage.setItem('theme', 'light')
  updateTheme()
}

function toSystemTheme() {
  localStorage.setItem('theme', 'system')
  updateTheme()
}