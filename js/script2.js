const galleryRoot = document.querySelector(".gallery");
import { images } from "./data.js";

if (galleryRoot) {
  const data = images
    .map((image) => {
      const { description, original, preview } = image;
      return `<li class="gallery-item">
  <a class="gallery-link" href="${original}">
    <img
      class="gallery-image lazyload"
      data-src="${preview}"
      data-original="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
  galleryRoot.insertAdjacentHTML("beforeend", data);
  // galleryRoot.addEventListener("keydown", (event) => console.log(event.key));
  // // keydown events only fire on elements that currently have keyboard focus (or on document/window, which always listen).
  // // Clicking on an <img> inside your gallery doesn’t give the parent .gallery focus.
  // // Unless you explicitly make .gallery focusable (e.g., with tabindex), it will never receive keydown events.

  galleryRoot.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event.target);
    if (event.target.classList.contains("gallery-image")) {
      const instance = basicLightbox.create(
        `
        <img src="${event.target.dataset.original}" data-original="${event.target.dataset.original}" alt="${event.target.alt}  class="slideshowImage">
`,
        {
          onShow: () => {
            document.addEventListener("keydown", onNavigate);
          },
          onClose: () => {
            document.removeEventListener("keydown", onNavigate);
          },
        }
      );
      instance.show();

      function onNavigate(event) {
        if (event.code === "Escape" || !instance.visible()) {
          instance.close();
          return;
        }
        const currentImage = document.querySelector(".slideshowImage");
        const dataArr = images.map((item) => item.original);
        if (instance.visible()) {
          let index = dataArr.indexOf(currentImage.dataset.original);
          index = event.code === "ArrowRight" ? index + 1 : index;
          index = event.code === "ArrowLeft" ? index - 1 : index;
          index = index > dataArr.length - 1 ? 0 : index;
          index = index < 0 ? dataArr.length - 1 : index;
          currentImage.src = dataArr[index];
          currentImage.dataset.original = dataArr[index];
        }
      }
    }
  });

  // galleryRoot.addEventListener("keydown", (event) => console.log(event.key));

  // will work when instance is opened because gallery will get focus but it can be unreliable
  // document.addEventListener("keydown", _.throttle(onNavigate, 400));
}
