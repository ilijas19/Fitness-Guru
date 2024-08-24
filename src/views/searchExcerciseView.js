// Available values : back, cardio, chest, lower arms, lower legs, neck, shoulders, upper arms, upper legs, waist

class SearchExcerciseView {
  _parentEl = document.querySelector(".listed-excercises");

  _excerciseHeading = document.querySelector(".listed-excercise-heading");

  addPaginationElListeners(callBackFunction) {
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");
    btnPrev.addEventListener("click", () => {
      callBackFunction("prev");
    });
    btnNext.addEventListener("click", () => {
      callBackFunction("next");
    });
  }

  addSearchElListeners(callBackFunction) {
    const searchElements = document.querySelectorAll(".bodypart");
    searchElements.forEach((el) => {
      el.addEventListener("click", async (e) => {
        const clickedEl = e.target.closest(".bodypart");
        const query = clickedEl.getAttribute("data-id");
        this._renderSpinner();
        callBackFunction(query);
        this._excerciseHeading.textContent = query.replace(
          query[0],
          query[0].toUpperCase()
        );
      });
    });
  }

  addExcercisePageHandler(handler) {
    const url = window.location.href;

    if (url.includes("excercise.html") || url.includes("excercise")) {
      handler();
    }
  }

  // addSavedExcercisesPageHandler(handler) {
  //   const url = window.location.href;
  //   if (url.includes("saved")) {
  //     handler();
  //     this._excerciseHeading.textContent;
  //   }
  // }

  render(data) {
    this._clear();
    data.forEach((excercise) => {
      this._parentEl.insertAdjacentHTML(
        "beforeend",
        this._generateExcerciseMarkup(excercise)
      );
    });
  }

  _generateExcerciseMarkup(excercise) {
    return `
    <figure class="listed-excercise">
            <img
              class="listed-excercise-img"
              src="${excercise.gifUrl}"
              alt=""
            />
            <div class="listed-excercise-text-div">
              <p class="listed-excercise-name">
                ${excercise.name}
              </p>
              <p class="listed-excercise-target">Target : ${
                excercise.target
              }</p>
              <p class="listed-excercise-id">Id : ${excercise.id}</p>
              <button data-id='${
                excercise.id
              }' class="see-more-btn">See more</button>
            </div>
            <i data-id='${excercise.id}' class="${
      excercise.isBookmarked === true ? "fa-solid" : "fa-regular"
    } fa-bookmark bookmark-icon"></i>
          </figure>
    `;
  }
  _clear() {
    this._parentEl.innerHTML = "";
  }
  _renderSpinner() {
    this._clear();
    this._parentEl.insertAdjacentHTML(
      "beforeend",
      '<div class="spinner-div"><i class="spinner fa-solid fa-rotate-right"></i></div>'
    );
  }
}
export default new SearchExcerciseView();
