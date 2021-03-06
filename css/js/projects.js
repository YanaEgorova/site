const animationUpBtn = document.querySelector('.js-page-transition-up');
const animationDownBtn = document.querySelector('.js-page-transition-down');
const allNavItems = document.querySelectorAll('.js-menu-link');
const sectionsWrap = document.querySelector('.main');
const downloadBtns = document.querySelectorAll('.js-download-btn');
const body = document.body;
sectionsWrap.children[0].classList.add('top-section');
const allProjects = document.querySelectorAll('.js-project');
const closeBtns = document.querySelectorAll('.js-project-close-btn');
const allProjectsOverlay = document.querySelectorAll('.project');
const bgSvg = document.getElementById('project-overlay-svg');
const projectOverlay = document.querySelector('.project-overlay')
const paths = document.querySelectorAll('#project-overlay-svg path');

allProjects.forEach(project => {
  project.addEventListener('click', goToTheProject);
})
closeBtns.forEach(btn => {
  btn.addEventListener('click', closeProject);
})

function goToTheProject(e) {
  allNavItems.forEach(item => {
    item.classList.remove('menu__link-current')
  })
  let element = e.currentTarget;
  const projectId = element.getAttribute('id')
  document.body.classList.add('project-active')
  const indexes = [1, 0, 17, 5, 4, 22, 19, 2, 25, 14, 12, 21, 3, 27, 13, 7, 16, 24, 6, 15, 26, 20, 8, 18, 11, 9, 23, 10];
  let index = 0;
  const intervalId = setInterval(() => {
    const needIdx = indexes[index];
    paths[needIdx].style.display = 'block';
    index += 1;
    if (indexes.length === index) {
      clearInterval(intervalId)
    }
  }, 50)
  allProjectsOverlay.forEach(project => {
    if (project.dataset.projectid === projectId) {
      const projectTm = setTimeout(() => {
        project.classList.add('project-visible')
        clearTimeout(projectTm)
      }, 2000)
    } else {
      project.classList.add('project-none')
    }
  })
}

function closeProject(e) {
  let element = e.currentTarget;
  const projectId = element.getAttribute('id')
  allProjectsOverlay.forEach(project => {
    if (project.classList.contains('project-visible')) {
      project.classList.remove('project-visible')
    }
  })
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
  }, 3000)
  const howLink = document.querySelector('[data-linkid="how"]');
  howLink.classList.add('menu__link-current')
}


function setSectionWrapHeight() {
  const body = document.body;
  const wrapper = document.querySelector('.transotion-wrap');
  const currentPage = document.querySelector('.current-page');
  const height = window
    .getComputedStyle(currentPage)
    .getPropertyValue('height');
  wrapper.style.height = height;
  body.style.height = height;
}
setSectionWrapHeight();
window.addEventListener('resize', setSectionWrapHeight);
const allNextBtns = document.querySelectorAll('.next');
const allPrevBtns = document.querySelectorAll('.prev');
allNextBtns.forEach(btn => {
  btn.addEventListener('click', nextPageAnimation);
});
allPrevBtns.forEach(btn => {
  btn.addEventListener('click', prevPageAnimation);
});

function nextPageAnimation(e) {
  let element = e.currentTarget;
  const subParent = element.parentNode;
  const parent = subParent.parentNode;
  hasClass = parent.classList.contains('current-page');
  parent.classList.add('pt-page-moveToLeftEasing');
  parent.classList.add('pt-page-ontop');
  const nextSection = parent.nextElementSibling;
  nextSection.classList.add('pt-page-moveFromRight');
  nextSection.classList.add('current-page');
  const timeout = setTimeout(() => {
    parent.classList.remove('pt-page-moveToLeftEasing');
    parent.classList.remove('pt-page-ontop');
    nextSection.classList.remove('pt-page-moveFromRight');
    parent.classList.remove('current-page');
    setSectionWrapHeight();
  }, 1000);
}

function prevPageAnimation(e) {
  let element = e.currentTarget;
  const subParent = element.parentNode;
  const parent = subParent.parentNode;
  hasClass = parent.classList.contains('current-page');
  parent.classList.add('pt-page-moveToRightEasing');
  parent.classList.add('pt-page-ontop');
  const prevSection = parent.previousElementSibling;
  prevSection.classList.add('pt-page-moveFromLeft');
  prevSection.classList.add('current-page');
  const timeout = setTimeout(() => {
    parent.classList.remove('pt-page-moveToRightEasing');
    parent.classList.remove('pt-page-ontop');
    prevSection.classList.remove('pt-page-moveFromLeft');
    parent.classList.remove('current-page');
    setSectionWrapHeight();
  }, 1000);
}


function toggleMenuOff(e) {
  allNavItems.forEach(link => {
    link.classList.remove('menu__link-unhover')
  })
  menuTitle.textContent = titleContentByDefault;
  menuText.textContent = textContentByDefault;
  menuBox.innerHTML = ''
}

downloadBtns.forEach(btn => {
  btn.addEventListener('click', downloadBtnAnimation)
})
if (animationUpBtn) {
  animationUpBtn.addEventListener('click', animateUp)
}
if (animationDownBtn) {
  animationDownBtn.addEventListener('click', animateDown)
}

window.addEventListener('resize', onResize)


export function setHeight() {
  sectionsWrap.style.height = `${document.querySelector('.top-section .section-content').offsetHeight}px`;
}


function downloadBtnAnimation(e) {
  const btn = e.currentTarget;
  e.preventDefault();

  const btnWrap = btn.parentNode;
  let youtubeAnimationBlock;
  let counterAnimationBlock;
  [...btnWrap.children].forEach(el => {
    if (el.classList.contains('counter-animation')) {
      counterAnimationBlock = el;
    }
    if (el.classList.contains('youtube-animation')) {
      youtubeAnimationBlock = el;
    }
  })
  const div = document.createElement('div');
  let firstTm;
  let secondTm;

  div.classList.add('pulse');
  this.appendChild(div);
  const maxValue = Math.max(this.clientWidth, this.clientHeight);
  const position = this.getBoundingClientRect();
  const left = `${e.clientX - position.left - (maxValue / 2)}px`;
  const top = `${e.clientY - position.top - (maxValue / 2)}px`;
  div.style.width = `${maxValue}px`;
  div.style.height = `${maxValue}px`;
  div.style.left = left;
  div.style.top = top;

  const mainTm = setTimeout(() => {
    btn.classList.add('download-btn-hidden');
    firstTm = setTimeout(() => {
      youtubeAnimationBlock.classList.add('youtube-animation-animate');

      counterAnimationBlock.classList.add('counter-animation-animate');
      secondTm = setTimeout(() => {
        counterAnimationBlock.classList.remove('counter-animation-animate');
        youtubeAnimationBlock.classList.remove('youtube-animation-animate');
        btn.classList.remove('download-btn-hidden');
        clearTimeout(secondTm);
        const a = document.createElement('a');
        a.download = 'CV.txt';
        a.href = '#';
        a.click();
      }, 6000)
      clearTimeout(firstTm)
    }, 500);
    clearTimeout(mainTm)
  }, 500)

}

export function findCurrentPage() {
  const currentPage = document.querySelector('.top-section');
  return currentPage;
}

export function setActiveNavLink() {
  if (!findCurrentPage().getAttribute('data-id')) {
    allNavItems.forEach(item => {
      item.classList.remove('menu__link-current')
    })
  }
  if (findCurrentPage().getAttribute('data-id')) {
    const nav = document.querySelector('.menu__list');
    const id = findCurrentPage().getAttribute('data-id')
    const currentActiveLink = nav.querySelector('.menu__link-current');
    if (currentActiveLink) {
      currentActiveLink.classList.remove('menu__link-current');
    }
    const nextActiveLink = document.querySelector(`.menu__list button[data-linkid="${id}"]`);
    nextActiveLink.classList.add('menu__link-current');
  }
}
setHeight();
setActiveNavLink()


function animateUp() {
  let currentSection = findCurrentPage();
  anime({
    targets: currentSection,
    translateY: {
      value: `-${findCurrentPage().offsetHeight * 2}px`,
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
  setTimeout(() => {
    currentSection.classList.remove('top-section');
    if (!currentSection.nextElementSibling) {
      document.querySelector('.main-wrap').children[0].classList.add('top-section');
      findCurrentPage()
      setHeight()
      setActiveNavLink();

      return
    }
    currentSection.nextElementSibling.classList.add('top-section');
    findCurrentPage()
    setHeight()
    setActiveNavLink();
  }, 1000)
  currentSection = findCurrentPage();
  Object.values(currentSection.children).forEach(child => {
    if (child.classList.contains('section-content')) {
      if (child.classList.contains('black-wrapper')) {
        document.body.classList.remove('black')
        document.body.classList.add('white')

      } else if (child.classList.contains('white-wrapper')) {
        document.body.classList.remove('white')
        document.body.classList.add('black')
      }
    }
  });
}


function animateDown() {
  let currentSection = findCurrentPage();
  let height;
  if (document.querySelector('.top-section').previousElementSibling) {
    [...document.querySelector('.top-section').previousElementSibling.children].forEach(child => {
      if (child.classList.contains('shape')) {
        height = window.getComputedStyle(child).getPropertyValue("height");
      }
    })
  }
  anime({
    targets: document.querySelector('.top-section').previousElementSibling,
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
  setTimeout(() => {
    currentSection.classList.remove('top-section');
    if (!currentSection.previousElementSibling) {
      document.querySelector('.main').children[0].classList.add('top-section');
      findCurrentPage()
      setHeight()
      setActiveNavLink();
      return
    }
    currentSection.previousElementSibling.classList.add('top-section');
    findCurrentPage()
    setHeight()
    setActiveNavLink();
  }, 1000)
  currentSection = findCurrentPage();
  Object.values(currentSection.children).forEach(child => {
    if (child.classList.contains('section-content')) {
      if (child.classList.contains('black-wrapper')) {
        document.body.classList.remove('black')
        document.body.classList.add('white')

      } else if (child.classList.contains('white-wrapper')) {
        document.body.classList.remove('white')
        document.body.classList.add('black')
      }
    }
  });
}


function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }

    }, ms);

  }

  return wrapper;

}

function onResize() {
  setHeight()
}
onResize = throttle(onResize, 150);



// ========================================================

function hello(e, IsIntersecting) {
  if (e.direction === 'up' && IsIntersecting && !body.classList.contains('menu-active') && body.classList.contains('preloader-inactive') && !body.classList.contains('form-modal-active') && !body.classList.contains('project-active')) {

    animateDown()
  }
}

let IsIntersecting;
var indicator = new WheelIndicator({
  elem: document.body,
  callback: function (e) {
    const onEntry = (entry) => {
      if (entry[0].isIntersecting) {
        IsIntersecting = true;
        hello(e, IsIntersecting)
      }
    }
    const animationObserver = new IntersectionObserver(onEntry, {});
    const currentTopBlock = document.querySelector('.top-section .top-block');
    if (currentTopBlock) {
      animationObserver.observe(currentTopBlock);
    }

  }
});
indicator.getOption('preventMouse');

function hello2(e, IsIntersecting2) {
  if (e && e.direction === 'down' && IsIntersecting2 && !body.classList.contains('menu-active') && body.classList.contains('preloader-inactive') && !body.classList.contains('form-modal-active') && !body.classList.contains('project-active')) {

    animateUp()
  }
}
let IsIntersecting2;
var indicator2 = new WheelIndicator({
  elem: document.body,
  callback: function (e) {
    let event = e;
    const onEntry2 = (entry) => {

      if (entry[0].isIntersecting) {
        IsIntersecting2 = true;
        hello2(event, IsIntersecting2)
        event = null;
      }
    }
    const animationObserverBottom = new IntersectionObserver(onEntry2, {});

    const currentBottomBlock = document.querySelector('.top-section .bottom-block');
    if (currentBottomBlock) {
      animationObserverBottom.observe(currentBottomBlock);
    }

  }
});
indicator2.getOption('preventMouse');