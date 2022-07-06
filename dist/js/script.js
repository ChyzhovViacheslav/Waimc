// const { create } = require("browser-sync");
// const imagemin = require("gulp-imagemin");

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}    
testWebP(function (support) {
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }
    else{
    document.querySelector('body').classList.add('no-webp');
    }
});

const tabs = document.querySelectorAll('.infstruct__list li'),
      parentTabs = document.querySelector('.infstruct__list'),
      tabContentParrent = document.querySelector('.infstruct__img')

//Заглушка 

function addImg(){
    for(let i = document.querySelectorAll('.js').length; i < 13; i++){
        const img = document.createElement('img'),
              picture = document.createElement('picture'),
              source = document.createElement('source'),
              srcImg = '../img/Place-one' //alt любое фото

        img.src = `${srcImg}.jpg`
        img.classList.add('js')
        picture.append(img)

        source.srcset = `${srcImg}.webp`
        source.type = 'image/webp'
        picture.prepend(source)

        tabContentParrent.append(picture)
    }
}

// addImg()

// Tabs

const tabContent = document.querySelectorAll('.img'),
      tabNext = document.querySelector('#tab-next'),
      tabPrev = document.querySelector('#tab-prev'),
      tabBtnParrent = document.querySelector('.infstruct__btns');

let slideIndex = 1;

function hideTabs(){
    tabContent.forEach(el => {
        el.classList.remove('active');
    })

    tabs.forEach(el => {
        el.style.fontWeight = '300'
    })
}

function showTabs(i = 0){
    tabContent[i].classList.add('active');
    tabs[i].style.fontWeight = '500';
}

hideTabs();
showTabs();

parentTabs.addEventListener('click', (e) => {
    e.preventDefault()
    
    tabs.forEach((element, slideIndex) => {
        if(e.target == element){
            hideTabs()
            showTabs(slideIndex)
        }
    })
})

tabNext.addEventListener('click', () => {
    if(slideIndex > tabContent.length - 1){
        hideTabs()
        showTabs(slideIndex = 0)
        showTabs(slideIndex++)
    }else{
        hideTabs()
        console.log(slideIndex);
        showTabs(slideIndex++)
        console.log(slideIndex);
    }
})

tabPrev.addEventListener('click', () => {
    if((slideIndex + 1) == 0){
        hideTabs()
        showTabs(slideIndex = (tabContent.length - 1))
        showTabs(slideIndex--)
    }else{
        hideTabs()
        showTabs(slideIndex--)
    }
})

//stickyHeader

const navSecondHeader = document.querySelector('.second-header'),
      wrapper = document.querySelector('.wrapper'),
      navSecondHeaderBody = document.querySelector('.second-header__body'),
      header = document.querySelector('.header'),
      headerContainer = document.querySelector('.second-header__container')

const firstLine = document.createElement('div'),
      secondLine = document.createElement('div');
      firstLine.className = 'line'
      secondLine.className = 'line'

function addSlow(el){
    let stickyBlock = document.querySelector('.sticky')
    stickyBlock.style.top = `-${el.clientHeight}px`
    setTimeout(() => {el.classList.add('slow')}, 50)
}

function addLine(){
    navSecondHeaderBody.prepend(firstLine)
    navSecondHeaderBody.append(secondLine)
}

addLine()

function changeLine(){
    if(navSecondHeaderBody.contains(firstLine) || navSecondHeaderBody.contains(secondLine)){
        navSecondHeaderBody.removeChild(firstLine)
        navSecondHeaderBody.removeChild(secondLine)
    } else {
        navSecondHeader.append(firstLine)
        navSecondHeader.prepend(secondLine)
    }
}

function stickyNav(){
    if(wrapper.scrollTop >= navSecondHeader.clientHeight){
        navSecondHeader.classList.add('sticky')
        changeLine()
    } else if(wrapper.scrollTop <= (navSecondHeader.clientHeight-1)){
        navSecondHeader.classList.remove('sticky')
        addLine()
    }
}

function stickyHeader(){
    if(wrapper.clientWidth <= 768){
        header.classList.add('sticky')
    } else if(wrapper.clientWidth >= 769){
        header.classList.remove('sticky')
    }
}

wrapper.addEventListener('scroll', () => {
    stickyNav();
    stickyHeader();
})

//Burger

const burgerPlots = document.querySelector('.burger__plots'),
      burgerTitle = document.querySelector('.burger__title'),
      burger = document.querySelector('.burger'),
      burgerParent = document.querySelector('.header__side'),
      burgerBtn = document.querySelector('.header__burger-icon'),
      dropDownParent = document.querySelector('.burger__body'),
      phone = document.querySelector('.header .icon-Phone')

function show(el){
    el.classList.add('show')
    el.classList.remove('hide')
}

function hide(el){
    el.classList.add('hide')
    el.classList.remove('show')
}

function showBurg(){
    burger.classList.add('show-burg')
    burger.classList.remove('hide-burg')
    burgerBtn.classList.toggle('dis')
    wrapper.style.overflowY = 'hidden'
    phone.classList.toggle('scale')
}

function hideBurg(){
    burger.classList.add('hide-burg')
    burger.classList.remove('show-burg')
    burgerBtn.classList.toggle('dis')
    wrapper.style.overflowY = 'scroll'
    phone.classList.toggle('scale')
}

burgerParent.addEventListener('touchstart', (event) => {
    event.preventDefault()
    if(event.target === burgerBtn && burgerParent.contains(burgerBtn)){
        if(burger.classList.contains('hide-burg')){
            showBurg()
        } else if(burger.classList.contains('show-burg')){
            hideBurg()
        }
    }
})

window.addEventListener('resize', (event) => {
    event.preventDefault()
    if(wrapper.clientWidth >= 769){
        hide(burger)
    } else{
        show(burger)
    }
})

dropDownParent.addEventListener('touchstart', (event) => {
    event.preventDefault()
    if(event.target === burgerTitle && dropDownParent.contains(burgerTitle)){
        if(burgerPlots.classList.contains('hide')){
            show(burgerPlots)
        } else if(burgerPlots.classList.contains('show')){
            hide(burgerPlots)
        }
    }
})