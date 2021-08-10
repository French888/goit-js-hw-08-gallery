import {galleryItems} from "./galleryItem"
import {refs} from "./refs"

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
