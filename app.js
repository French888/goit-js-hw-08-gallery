const galleryItems = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];
  const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightBox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image')
  }
  
  let activeIndex = null;
  
  function createGalleryCards(items){
  return items.map(({description, original, preview})=>{
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
  </li>`
  })
  }
  refs.galleryList.innerHTML = createGalleryCards(galleryItems).join('');
  refs.galleryList.addEventListener('click', modalOpen);
  
  function modalOpen(e){
      e.preventDefault()
      if(!e.target.classList.contains('gallery__image')){
          return;
      }
      refs.lightBox.classList.add('is-open');
      refs.lightboxImage.src = e.target.dataset.source;
  
  createGalleryCards(galleryItems).forEach((element, ind) => {
      if(element.includes(e.target.src)){
        activeIndex = ind  
      }
  });
  
      window.addEventListener('keydown', closeByEscape);
      window.addEventListener('keydown', changeByArrows);
  
  }
  refs.lightBox.addEventListener('click', closeModal);
  
  function closeModal(e){
    if(e?.target.nodeName === 'IMG'){
         return;
     } 
     refs.lightBox.classList.remove('is-open');
     refs.lightboxImage.src = '';
     window.removeEventListener('keydown', closeByEscape);
     window.removeEventListener('keydown', changeByArrows);
  
  }
  
  function closeByEscape(e){
      if(e.key !== "Escape"){
          return;
      }
      closeModal()
  }
  
  function changeByArrows(e){
  if(e.key === 'ArrowRight'&& activeIndex < galleryItems.length-1){
    activeIndex +=1; 
    refs.lightboxImage.src = galleryItems[activeIndex].original
    return;
  }
  if(e.key === 'ArrowLeft' && activeIndex > 0){
      activeIndex -=1; 
      refs.lightboxImage.src = galleryItems[activeIndex].original
      return;
  }if(e.key === 'ArrowRight' && activeIndex === galleryItems.length-1){
      activeIndex =0; 
      refs.lightboxImage.src = galleryItems[activeIndex].original
      return;
  }
  if(e.key === 'ArrowLeft' && activeIndex === 0){
      activeIndex = galleryItems.length-1; 
      refs.lightboxImage.src = galleryItems[activeIndex].original
      return;
  }}
  