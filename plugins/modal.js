function _createModalWindow(
  title = "Modal title",
  closable = true,
  content = "Lorem ipsum dolor sit amet."
) {
  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal");
  modalWindow.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal__rearward">
        <div class="modal__window">
          <div class="modal__header">
            <span class="modal__title">${title}</span>
            <span class="modal__close">&times;</span>
          </div>
          <div class="modal__body">
            <p>${content}</p>
            <p>${content}</p>
          </div>
          <div class="modal__footer">
            <button>Ok</button>
            <button>Cansel</button>
          </div>
        </div>
      </div>`
  );
  document.body.appendChild(modalWindow);
  if (!closable) {
    const modalClose = document.querySelector(".modal__close");
    modalClose.hidden = true;
  }
  return modalWindow;
}
$.modal = function (options) {
  const ANIMATION_SPEED = 200;
  console.log(options["title"]);
  const $modalWindow = _createModalWindow(
    options["title"],
    options["closable"],
    options["content"]
  );
  let closing = false;
  return {
    open() {
      !closing && $modalWindow.classList.add("open");
    },
    close() {
      closing = true;
      $modalWindow.classList.remove("open");
      $modalWindow.classList.add("hide");
      setTimeout(() => {
        $modalWindow.classList.remove("hide");
        closing = false;
      }, ANIMATION_SPEED);
    },
    destroy() {},
  };
};
