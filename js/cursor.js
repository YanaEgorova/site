const allCursor = document.querySelectorAll('.cursor');
const blackWrappers = document.querySelectorAll('.black-wrapper');
const whiteWrappers = document.querySelectorAll('.white-wrapper');
const mainCursor = document.querySelector('.cursorMain');
const menuCursor = document.querySelector('.cursorMenu');
mainCursor.classList.add('cursor-active')

document.addEventListener('mousemove', e => {
  allCursor.forEach(cursor => {
    if (document.body.classList.contains('menu-active') && cursor.classList.contains('cursorMenu')) {
      mainCursor.classList.remove('cursor-active')
      cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px; opacity: 1`)
      cursor.classList.add('cursor-active')
    } else if (!document.body.classList.contains('menu-active') && cursor.classList.contains('cursorMain')) {
      menuCursor.classList.remove('cursor-active')
      mainCursor.classList.add('cursor-active')
      cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px; opacity: 1`)
    }

  })
})
blackWrappers.forEach(wrapper => {
  wrapper.addEventListener('mouseover', (e) => {
    if (e.currentTarget.classList.contains('black-wrapper')) {
      allCursor.forEach(cursor => {
        cursor.classList.add('cursor-white');
      })
    }
    if (e.target.nodeName !== "BUTTON" && e.target.nodeName !== "A" && !e.target.classList.contains('js-btn-icon')) {
      allCursor.forEach(cursor => {
        cursor.classList.remove('cursor-hover');
        cursor.classList.add('cursor-white');
        cursor.classList.remove('cursor-white-hover');
      })
      return
    }
    allCursor.forEach(cursor => {
      cursor.classList.add('cursor-white-hover');
    })

  })
})

whiteWrappers.forEach(wrapper => {
  wrapper.addEventListener('mouseover', (e) => {
    if (e.currentTarget.classList.contains('white-wrapper')) {
      allCursor.forEach(cursor => {
        cursor.classList.remove('cursor-white');
      })
    }
    if (e.target.nodeName !== "BUTTON" && e.target.nodeName !== "A" && !e.target.classList.contains('js-btn-icon')) {
      allCursor.forEach(cursor => {
        cursor.classList.remove('cursor-hover');
      })
      return
    }
    allCursor.forEach(cursor => {
      cursor.classList.add('cursor-hover');
    })
  })
})