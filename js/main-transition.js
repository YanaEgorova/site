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
const paths = document.querySelectorAll('#project-overlay-svg path');

allProjects.forEach(project => {
  project.addEventListener('click', goToTheProject);
})
closeBtns.forEach(btn => {
  btn.addEventListener('click', closeProject);
})


export function handleKeyPressAnimation(e) {
  if (e.code === 'ArrowDown') {
    animateUp();
  } else if (e.code === 'ArrowUp') {
    animateDown();
  }
}


function goToTheProject(e) {
  window.removeEventListener('keydown', handleKeyPressAnimation)
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
  }, 30)

  const projectTm = setTimeout(() => {
    document.querySelector('.project-appear').classList.add('project-visible')
    allProjectsOverlay.forEach(project => {
      if (project.classList.contains('current-project')) {
        project.classList.remove('current-project')
      }
      if (project.dataset.projectid === projectId) {
        window.addEventListener('resize', setSectionWrapHeight(projectId));
        project.querySelector('.transotion-section').classList.add('current-page')
        project.querySelector('.transotion-section').classList.add('current-page')
        project.classList.add('current-project')
      }
    })
    clearTimeout(projectTm)
    setSectionWrapHeight(projectId);
  }, 1000)
}

function closeProject(e) {
  window.addEventListener('keydown', handleKeyPressAnimation)
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
  }, 50)
  document.body.style.height = '100%';
  const tm = setTimeout(() => {
    document.body.classList.remove('project-active')

  }, 3000)
  const howLink = document.querySelector('[data-linkid="how"]');
  howLink.classList.add('menu__link-current')
  if (e && e.target.classList.contains('js-project-close') || !e) {
    const tm = setTimeout(() => {
      document.querySelectorAll('.transotion-wrap').forEach(parent => {
        Object.values(parent.children).forEach(child => {
          child.classList.remove('current-page')
        })
        Object.values(parent.children)[0].classList.add('current-page')
      })
      animateUp()
      clearTimeout(tm)
    }, 1500)
  }
}


function setSectionWrapHeight(projectId) {
  const body = document.body;
  allProjectsOverlay.forEach(project => {
    if (project.dataset.projectid === projectId) {
      console.log('project: ', project);
      let biggerValue = 0;
      const wrapper = project.querySelector('.transotion-wrap');
      Object.values(wrapper.children).forEach(child => {
        console.log('start', child);
        console.log('HERE: ', child.getBoundingClientRect());
        console.log(child.clientHeight);
        console.log(biggerValue);
        if (child.clientHeight > biggerValue) {
          biggerValue = child.clientHeight;

          console.log('bigger', biggerValue);
        }
      })
      const height = biggerValue;
      wrapper.style.height = `${height}px`;
      body.style.height = `${height}px`;
      body.style.minHeight = `calc(var(--vh, 1vh) * 100)`;
    }
  })
}

const allNextBtns = document.querySelectorAll('.next');
const allPrevBtns = document.querySelectorAll('.prev');
const allProjectsNextBtns = document.querySelectorAll('.js-next-project');
const allProjectsPrevBtns = document.querySelectorAll('.js-prev-project');
allNextBtns.forEach(btn => {
  btn.addEventListener('click', nextSubPageAnimation);
});
allPrevBtns.forEach(btn => {
  btn.addEventListener('click', prevSubPageAnimation);
});
allProjectsNextBtns.forEach(btn => {
  btn.addEventListener('click', nextPageAnimation);
});
allProjectsPrevBtns.forEach(btn => {
  btn.addEventListener('click', prevPageAnimation);
});

let hasClass;

function nextPageAnimation(e) {
  const nextProjectId = e.currentTarget.closest('.project').nextElementSibling.getAttribute('data-projectId');

  const element = e.currentTarget;
  const parent = element.closest('.project');
  const allParentChildren = parent.querySelectorAll('*');
  [...allParentChildren].forEach(child => {
    if (child.classList.contains('transotion-section')) {
      child.classList.remove('current-page');
    }
  })
  parent.classList.remove('current-project')
  parent.nextElementSibling.classList.add('current-project')
  setSectionWrapHeight(nextProjectId);
}

function prevPageAnimation(e) {
  const prevProjectId = e.currentTarget.closest('.project').previousElementSibling.getAttribute('data-projectId');

  const element = e.currentTarget;
  const parent = element.closest('.project');
  parent.classList.remove('current-project')
  parent.previousElementSibling.classList.add('current-project')
  const allChildren = parent.previousElementSibling.querySelectorAll('*');
  const result = [];
  [...allChildren].forEach(child => {
    if (child.classList.contains('transotion-section')) {
      result.push(child);
    }
  })
  result[result.length - 1].classList.add('current-page')
  setSectionWrapHeight(prevProjectId);
}

function nextSubPageAnimation(e) {
  const element = e.currentTarget;
  const parent = element.closest('.transotion-section');
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
    clearTimeout(timeout)
  }, 1000);
}

function prevSubPageAnimation(e) {
  const element = e.currentTarget;
  const parent = element.closest('.transotion-section');
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
    clearTimeout(timeout)
  }, 1000);
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
setActiveNavLink()


function animateUp() {
  let currentSection = findCurrentPage();
  if (!currentSection.nextElementSibling) {
    return
  }
  document.body.classList.add('anime')
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
    document.body.classList.remove('anime')
  }, 1500)
  currentSection.classList.remove('top-section');
  currentSection.nextElementSibling.classList.add('top-section');
  findCurrentPage()
  setActiveNavLink();
  currentSection = findCurrentPage();
  Object.values(currentSection.children).forEach(child => {
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
}


function animateDown() {
  let currentSection = findCurrentPage();
  if (!currentSection.previousElementSibling) {
    return
  }
  document.body.classList.add('anime')
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
    document.body.classList.remove('anime')
  }, 1500)
  currentSection.classList.remove('top-section');
  currentSection.previousElementSibling.classList.add('top-section');
  findCurrentPage()
  setActiveNavLink();
  currentSection = findCurrentPage();
  Object.values(currentSection.children).forEach(child => {
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
}


export function throttle(func, ms) {
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
  if (document.querySelector('.top-section').previousElementSibling && document.querySelector('.top-section').previousElementSibling.hasAttribute('style')) {
    const section = document.querySelector('.top-section').previousElementSibling;
    const sectionHeight = window.getComputedStyle(section).getPropertyValue("height");
    section.style.transform = `translateY(-${sectionHeight})`;
  }
}
onResize = throttle(onResize, 1000);



// ========================================================

function hello(e, IsIntersecting) {
  if (e.direction === 'up' && IsIntersecting && !body.classList.contains('menu-active') && body.classList.contains('preloader-inactive') && !body.classList.contains('form-modal-active') && !body.classList.contains('project-active') && !body.classList.contains('anime')) {
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
  if (e && e.direction === 'down' && IsIntersecting2 && !body.classList.contains('menu-active') && body.classList.contains('preloader-inactive') && !body.classList.contains('form-modal-active') && !body.classList.contains('project-active') && !body.classList.contains('anime')) {
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

// ===============================================
let bottomBlock;

let IsIntersecting3;
var indicator3 = new WheelIndicator({
  elem: document.body,
  callback: function (e) {
    let event = e;
    const onEntry3 = (entry) => {

      if (entry[0].isIntersecting) {
        IsIntersecting3 = true;
        hello3(event, IsIntersecting3)
        event = null;
      }
    }
    const animationObserverBm = new IntersectionObserver(onEntry3, {});
    bottomBlock = document.querySelector('.current-page .project_bottom-close');
    if (bottomBlock) {
      animationObserverBm.observe(bottomBlock);
    }

  }
});

function hello3(e, IsIntersecting3) {
  if (e && e.direction === 'down' && IsIntersecting3 && !body.classList.contains('menu-active') && body.classList.contains('preloader-inactive') && !body.classList.contains('form-modal-active') && body.classList.contains('project-active')) {
    closeProject()
  }
}
indicator3.getOption('preventMouse');

// ==============================================================================


document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchMove, false);
let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.changedTouches[0].clientY;
}
let animationObserver
let animationObserverBottom

function handleTouchMove(evt) {
  let yUp = evt.changedTouches[0].clientY;
  if (yDown > yUp) {
    const onEntry = (entry, observe) => {
      if (entry[0].isIntersecting) {
        if (!body.classList.contains('menu-active') && body.classList.contains('preloader-inactive') && !body.classList.contains('form-modal-active') && !body.classList.contains('project-active') && !body.classList.contains('anime')) {
          animateUp()
        }
        observe.disconnect(animationObserver);
      }
    }
    animationObserver = new IntersectionObserver(onEntry, {});
    const currentTopBlock = document.querySelector('.top-section .bottom-block');
    if (currentTopBlock) {
      animationObserver.observe(currentTopBlock);
    }
  } else {
    const onEntry2 = (entry, observe) => {
      if (entry[0].isIntersecting) {
        if (!body.classList.contains('menu-active') && body.classList.contains('preloader-inactive') && !body.classList.contains('form-modal-active') && !body.classList.contains('project-active') && !body.classList.contains('anime')) {
          animateDown()
        }
      }
    }
    animationObserverBottom = new IntersectionObserver(onEntry2, {});
    const currentBottomBlock = document.querySelector('.top-section .top-block');
    if (currentBottomBlock) {
      animationObserverBottom.observe(currentBottomBlock);
    }
  }
}