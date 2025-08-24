const galleryRoot = document.querySelector(".gallery");
import { images } from "./data.js";

if (galleryRoot) {
  //   console.log(data);
}

const data = images
  .map((image) => {
    const { description, original, preview } = image;
    return `<li class="gallery-item">
  <a class="gallery-link" href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join("");

galleryRoot.insertAdjacentHTML("afterbegin", data);
// galleryRoot.addEventListener("keydown", (event) => console.log(event.key));
// // keydown events only fire on elements that currently have keyboard focus (or on document/window, which always listen).
// // Clicking on an <img> inside your gallery doesn’t give the parent .gallery focus.
// // Unless you explicitly make .gallery focusable (e.g., with tabindex), it will never receive keydown events.

galleryRoot.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("gallery-image")) {
    const instance = basicLightbox.create(`
        <img src="${event.target.dataset.source}" class="slideshowImage">
`);
    document.addEventListener("keydown", closeModal);
    instance.show();
    function closeModal(event) {
      if (event.code === "Escape") {
        instance.close();
        document.removeEventListener("keydown", closeModal);
        return;
      }
    }
  }
});

// galleryRoot.addEventListener("keydown", (event) => console.log(event.key));
// will work when instance is opened because gallery will get focus but it can be unreliable
document.addEventListener("keydown", (event) => {
  console.log(event.code);
  const currentImage = document.querySelector(".slideshowImage");

  if (currentImage) {
    const dataArr = images.map((item) => item.original);
    let index = dataArr.indexOf(currentImage.src);
    // ArrowRight
    // ArrowLeft
    index = event.code === "ArrowRight" ? index + 1 : index;
    index = event.code === "ArrowLeft" ? index - 1 : index;
    index = index > dataArr.length - 1 ? 0 : index;
    index = index < 0 ? dataArr.length - 1 : index;
    currentImage.src = dataArr[index];
  }
});
