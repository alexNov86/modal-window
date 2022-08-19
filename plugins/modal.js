Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement("div");
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("modal__footer");
  return wrapper;
}

function _createModalWindow(options) {
  const DEFAULT_WIDTH = "300px";
  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal");
  modalWindow.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal__rearward" data-close="true">
        <div class="modal__window style="width: ${
          options.width || DEFAULT_WIDTH
        }">
          <div class="modal__header">
            <span class="modal__title">${options.title || "Modal title"}</span>
            ${
              options.closable
                ? `<span class="modal__close" data-close="true">&times;</span>`
                : ""
            }
          </div>
          <div class="modal__body" data-content>
            ${options.content || ""}
          </div>
        </div>
      </div>`
  );
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modalWindow.querySelector("[data-content]"));
  document.body.appendChild(modalWindow);
  return modalWindow;
}
$.modal = function (options) {
  const ANIMATION_SPEED = 200;
  const $modalWindow = _createModalWindow(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log("Modal is destroed");
      }
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
  };

  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };
  $modalWindow.addEventListener("click", listener);

  return Object.assign(modal, {
    destroy() {
      $modalWindow.parentNode.removeChild($modalWindow);
      $modalWindow.removeEventListener("click", listener);
      destroyed = true;
    },
    setContent(html) {
      $modalWindow.querySelector("[data-content]").innerHTML = html;
    },
  });
};
