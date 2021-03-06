import {
  findCurrentPage
} from "./main-transition.js";
import {
  handleKeyPressAnimation
} from "./main-transition.js";
import {
  setActiveNavLink
} from "./main-transition.js";
const allProjectsOverlay = document.querySelectorAll('.project');
const allNavItems = document.querySelectorAll('.js-menu-link');
const allMenuItems = document.querySelectorAll('.js-menu__link')
const openMenuBtn = document.querySelector('.wrapper-menu');
const menu = document.querySelector('.menu-wrapper');
const menuContent = document.querySelectorAll('.menu__content');
const allSections = document.querySelectorAll('.main-section');
const menuTitle = document.querySelector('p[data-menutitle="menu-title"]')
const menuText = document.querySelector('p[data-menutext="menu-text"]')
const menuBox = document.querySelector('div[data-preview="menu__content-box"]')
const paths = document.querySelectorAll('#project-overlay-svg path');
const titleContentByDefault = menuTitle.textContent;
const textContentByDefault = menuText.textContent;

document.querySelector('.main').children[0].classList.add('top-section');
let tm;
let tm2;
const titles = [{
    section: 'whois',
    title: 'About Me'
  },
  {
    section: 'www',
    title: 'Recent Experiences'
  },
  {
    section: 'why',
    title: 'Some Reasons'
  },
  {
    section: 'how',
    title: 'Recent Works'
  },
  {
    section: 'hello',
    title: 'Contact Me'
  }
]
openMenuBtn.addEventListener('click', openMenu);
allNavItems.forEach(link => {
  link.addEventListener('mouseover', toggleMenu);
  link.addEventListener('mouseleave', toggleMenuOff);
})
allMenuItems.forEach(link => {
  link.addEventListener('click', goToThePage)
})
let toggleMenuSwitch = false;

function toggleMenu(e) {
  allNavItems.forEach(link => {
    if (e.target.textContent !== link.textContent) {
      link.classList.add('menu__link-unhover');
    }
  })
  const path = e.target.dataset.linkid;
  allSections.forEach(section => {
    if (section.getAttribute('id') === path || `${section.getAttribute('id')}.` === path) {
      section.querySelectorAll('*').forEach(el => {
        if (el.classList.contains('js-text')) {
          menuText.textContent = el.textContent;
        }
      });
      titles.forEach(title => {
        if (section.getAttribute('id') === title.section) {
          menuTitle.textContent = title.title;
        }
      })
    }
    if (section.dataset.id === path) {
      const sectionCode = section.cloneNode(true);
      sectionCode.style.transform = 'translateY(0)';
      sectionCode.querySelectorAll('*').forEach(child => {
        if (child.classList.contains('shape')) {
          child.remove()
        }
        if (child.classList.contains('menu-wrapper')) {
          child.remove()
        }
        if (child.classList.contains('counter-animation')) {
          child.remove()
        }
        if (child.classList.contains('youtube-animation')) {
          child.remove()
        }
      })
      menuBox.insertAdjacentElement('beforeend', sectionCode)
    }
  })
}

function toggleMenuOff(e) {
  allNavItems.forEach(link => {
    link.classList.remove('menu__link-unhover')
  })
  menuTitle.textContent = titleContentByDefault;
  menuText.textContent = textContentByDefault;
  menuBox.innerHTML = ''
}

function openMenu(e) {
  if (toggleMenuSwitch) {
    window.addEventListener('keydown', handleKeyPressAnimation)
    document.querySelector('.wrapper-menu').classList.remove('open');
    toggleMenuSwitch = false;
    menuContent.forEach(menu => {
      menu.classList.remove('menu__content--visible');
    })
    tm2 = setTimeout(() => {
      document.body.classList.remove('menu-active');
    }, 100)
    return;
  }
  document.querySelector('.wrapper-menu').classList.add('open');
  window.removeEventListener('keydown', handleKeyPressAnimation)
  document.body.classList.add('menu-active');
  tm = setTimeout(() => {
    menuContent.forEach(menu => {
      menu.classList.add('menu__content--visible');
    })
  }, 1000)
  toggleMenuSwitch = true;
}

function goToThePage(e) {
  if (document.body.classList.contains('project-active')) {
    window.addEventListener('keydown', handleKeyPressAnimation)
    allProjectsOverlay.forEach(project => {
      if (project.classList.contains('current-project')) {
        [...project.querySelectorAll('.transotion-section')].forEach(section => {
          section.classList.remove('current-page')
        })
      }
    })
    const howLink = document.querySelector('[data-linkid="how"]');
    howLink.classList.add('menu__link-current')
    toggleMenuSwitch = true;
    openMenu();
    if (document.querySelector('.project-appear').classList.contains('project-visible')) {
      document.querySelector('.project-appear').classList.remove('project-visible')
    }
    const indexes = [1, 0, 17, 5, 4, 22, 19, 2, 25, 14, 12, 21, 3, 27, 13, 7, 16, 24, 6, 15, 26, 20, 8, 18, 11, 9, 23, 10];
    let index = 0;
    const intervalId = setInterval(() => {
      const needIdx = indexes[index];
      paths[needIdx].style.display = 'none';
      index += 1;
      if (indexes.length === index) {
        clearInterval(intervalId)
      }
    }, 100)
    const tm = setTimeout(() => {
      document.body.classList.remove('project-active')
      clearTimeout(tm)
    }, 3000)
    const tmMain = setTimeout(() => {
      const clickedLink = e.target.dataset.linkid;
      let currentSection = document.querySelector('.top-section')
      if (clickedLink === currentSection.getAttribute('id')) {
        toggleMenuSwitch = true;
        openMenu(e);
        return
      }
      let zIndexCurrent = window.getComputedStyle(currentSection).getPropertyValue('z-index');
      allSections.forEach(section => {
        section.classList.remove('top-section');
        if (section.getAttribute('id') === clickedLink) {
          const zIndex = window.getComputedStyle(section).getPropertyValue('z-index');
          if (zIndexCurrent > zIndex) {
            let count = 0;
            const animationInt = setInterval(() => {
              animateUpByLinks(currentSection)
              count += 1
              currentSection = document.querySelector('.top-section');
              if (count === (Number(zIndexCurrent) - Number(zIndex))) {
                clearInterval(animationInt);
              }

            }, 500);
          } else if (zIndexCurrent < zIndex) {
            let count = 0;
            const animationInt = setInterval(() => {
              animateDownByLinks(currentSection)
              count += 1
              currentSection = document.querySelector('.top-section');
              if (count === (Number(zIndex) - Number(zIndexCurrent))) {
                clearInterval(animationInt);
              }

            }, 500);
          }
        }
      })
      toggleMenuSwitch = true;
      openMenu(e)
      clearTimeout(tmMain)
    }, 3000)
  } else {
    const clickedLink = e.currentTarget.dataset.linkid;
    let currentSection = document.querySelector('.top-section')
    if (e.currentTarget.dataset.linkid === currentSection.getAttribute('id')) {
      toggleMenuSwitch = true;
      openMenu(e);
      return
    }
    let zIndexCurrent = window.getComputedStyle(currentSection).getPropertyValue('z-index');
    allSections.forEach(section => {
      section.classList.remove('top-section');
      if (section.getAttribute('id') === clickedLink) {
        const zIndex = window.getComputedStyle(section).getPropertyValue('z-index');
        if (zIndexCurrent > zIndex) {
          let count = 0;
          const animationInt = setInterval(() => {
            animateUpByLinks(currentSection)
            count += 1
            currentSection = document.querySelector('.top-section');
            if (count === (Number(zIndexCurrent) - Number(zIndex))) {
              clearInterval(animationInt);
            }

          }, 500);
        } else if (zIndexCurrent < zIndex) {
          let count = 0;
          const animationInt = setInterval(() => {
            animateDownByLinks(currentSection)
            count += 1
            currentSection = document.querySelector('.top-section');
            if (count === (Number(zIndex) - Number(zIndexCurrent))) {
              clearInterval(animationInt);
            }

          }, 500);
        }
      }
    })
    toggleMenuSwitch = true;
    openMenu(e)
  }

}

function animateUpByLinks(currentSection) {
  anime({
    targets: currentSection,
    translateY: {
      value: `-${currentSection.offsetHeight * 2}px`,
      delay: 100,
      duration: 2000,
      easing: 'easeInOutQuad'
    }
  });
  anime({
    targets: document.querySelector('.shape path'),
    duration: 1200,
    easing: 'linear',
    d: 'M -30.45,-57.86 -30.45,442.6 53.8,443.8 53.8,396.3 179.5,396.3 179.5,654.7 193.3,654.7 193.3,589.1 253.1,589.1 253.1,561.6 276.1,561.6 276.1,531.2 320.6,531.2 320.6,238.6 406.5,238.6 406.5,213.9 435.6,213.9 435.6,246.2 477,246.2 477,289.9 527.6,289.9 527.6,263.3 553.7,263.3 553.7,280.4 592,280.4 592,189.2 742.3,189.2 742.3,259.5 762.2,259.5 762.2,103.7 776,103.7 776,77.11 791.3,77.11 791.3,18.21 852.7,18.21 852.7,86.61 871.1,86.61 871.1,231 878.7,240.5 878.7,320.3 891,320.3 891,434.3 923.2,434.3 923.2,145.5 940.1,145.5 940.1,117 976.9,117 976.9,139.8 1031,139.8 1031,284.2 1041,284.2 1041,242.4 1176,242.4 1176,282.3 1192,282.3 1192,641.4 1210,641.4 1210,692.7 1225,692.7 1225,599.6 1236,599.6 1236,527.4 1248,527.4 1248,500.8 1273,500.8 1273,523.6 1291,523.6 1291,652.8 1316,652.8 1316,533.1 1337,533.1 1337,502.7 1356,502.7 1356,523.6 1414,523.6 1414,491.3 1432,491.3 1432,523.6 1486,523.6 1486,-57.86 Z'
  });
  allSections.forEach(section => {
    if (section.classList.contains('top-section')) {
      section.classList.remove('top-section')
    }
  })
  if (!currentSection.nextElementSibling) {
    return
  }
  currentSection.nextElementSibling.classList.add('top-section')
  const section = currentSection.nextElementSibling;
  Object.values(section.children).forEach(child => {
    if (child.classList.contains('section-content')) {
      if (child.classList.contains('black-wrapper')) {
        document.body.classList.remove('white')
        document.body.classList.add('black')
      } else if (child.classList.contains('white-wrapper')) {
        document.body.classList.remove('black')
        document.body.classList.add('white')
      }
    }
  });
  findCurrentPage()
  setActiveNavLink();
}

function animateDownByLinks(currentSection) {
  let height;
  if (!currentSection.previousElementSibling) {
    return
  }
  if (currentSection.previousElementSibling) {
    [...currentSection.previousElementSibling.children].forEach(child => {
      if (child.classList.contains('shape')) {
        height = window.getComputedStyle(child).getPropertyValue("height");
      }
    })
  }

  anime({
    targets: currentSection.previousElementSibling,
    translateY: {
      value: '0px',
      duration: 1200,
      easing: 'easeInOutQuad'
    }
  });
  anime({
    targets: document.querySelector('.shape path'),
    duration: 500,
    easing: 'linear',
    d: 'M -30.45,-57.86 -30.45,442.6 53.8,443.8 53.8,396.3 179.5,396.3 179.5,654.7 193.3,654.7 193.3,589.1 253.1,589.1 253.1,561.6 276.1,561.6 276.1,531.2 320.6,531.2 320.6,238.6 406.5,238.6 406.5,213.9 435.6,213.9 435.6,246.2 477,246.2 477,289.9 527.6,289.9 527.6,263.3 553.7,263.3 553.7,280.4 592,280.4 592,189.2 742.3,189.2 742.3,259.5 762.2,259.5 762.2,103.7 776,103.7 776,77.11 791.3,77.11 791.3,18.21 852.7,18.21 852.7,86.61 871.1,86.61 871.1,231 878.7,240.5 878.7,320.3 891,320.3 891,434.3 923.2,434.3 923.2,145.5 940.1,145.5 940.1,117 976.9,117 976.9,139.8 1031,139.8 1031,284.2 1041,284.2 1041,242.4 1176,242.4 1176,282.3 1192,282.3 1192,641.4 1210,641.4 1210,692.7 1225,692.7 1225,599.6 1236,599.6 1236,527.4 1248,527.4 1248,500.8 1273,500.8 1273,523.6 1291,523.6 1291,652.8 1316,652.8 1316,533.1 1337,533.1 1337,502.7 1356,502.7 1356,523.6 1414,523.6 1414,491.3 1432,491.3 1432,523.6 1486,523.6 1486,-57.86 Z'
  });
  allSections.forEach(section => {
    if (section.classList.contains('top-section')) {
      section.classList.remove('top-section')
    }
  })
  currentSection.previousElementSibling.classList.add('top-section')
  const section = currentSection.previousElementSibling;
  Object.values(section.children).forEach(child => {
    if (child.classList.contains('section-content')) {
      if (child.classList.contains('black-wrapper')) {
        document.body.classList.remove('white')
        document.body.classList.add('black')
      } else if (child.classList.contains('white-wrapper')) {
        document.body.classList.remove('black')
        document.body.classList.add('white')
      }
    }
  });
  findCurrentPage()
  setActiveNavLink();
}

clearTimeout(tm);
clearTimeout(tm2);