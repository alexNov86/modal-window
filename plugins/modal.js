function _createModalWindow() {
  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal");
  modalWindow.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal__rearward">
        <div class="modal__window">
          <div class="modal__header">
            <span class="modal__title">Modal title</span>
            <span class="modal__close">&times;</span>
          </div>
          <div class="modal__body">
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div class="modal__footer">
            <button>Ok</button>
            <button>Cansel</button>
          </div>
        </div>
      </div>`
  );
  document.body.appendChild(modalWindow);
  return modalWindow;
}
$.modal = function (options) {
  const ANIMATION_SPEED = 200;
  const $modalWindow = _createModalWindow();
  let closing = false;
  return {
    open() {
      $modalWindow.classList.add("open");
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
