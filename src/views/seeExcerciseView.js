class SeeExcerciseView {
  setBtnListeners(callBackFunction) {
    const buttons = document.querySelectorAll(".see-more-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const clickedBtn = e.target.closest(".see-more-btn");
        const id = clickedBtn.getAttribute("data-id");
        callBackFunction(id);
      });
    });
  }
  openPopup(excercise) {
    const popupEl = document.querySelector(".popup");
    popupEl.style.display = "grid";
    popupEl.innerHTML = "";
    popupEl.insertAdjacentHTML(
      "beforeend",
      this._generatePopupMarkup(excercise)
    );
    this._closePopup();
  }

  _closePopup() {
    const popupEl = document.querySelector(".popup");
    const closeBtn = document.querySelector(".close-icon");
    closeBtn.addEventListener("click", () => {
      popupEl.style.display = "none";
    });
  }
  _generatePopupMarkup(excercise) {
    return `
    <div class="text-div">
    <ul class="popup-info">
      <h3 class="info-heading">Info</h3>
      <li class="info">Name : <span>${excercise.name}</span></li>
      <li class="info">Target : <span>${excercise.target}</span></li>
      <li class="info">Equipment : <span>${excercise.equipment}</span></li>
      <li class="info">Id : <span>${excercise.id}</span></li>
    </ul>
    <ul class="instructions">
      <h3 class="info-heading">Instructions</h3>
      ${excercise.instructions.map(
        (instruction) => `<li class="Instruction">${instruction}</li>`
      )}
    </ul>
  </div>
  <div class="img-div">
    <h2 class="popup-heading">${excercise.name}</h2>
    <img class="popup-img" src="${excercise.gifUrl}" alt="" />
  </div>
  <i class="fa-regular fa-circle-xmark close-icon"></i>
    `;
  }
}
export default new SeeExcerciseView();
