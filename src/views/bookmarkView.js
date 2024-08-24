class BookmarkView {
  addBookmarkListeners(callBackFunction) {
    const bookmarkBtns = document.querySelectorAll(".bookmark-icon");
    bookmarkBtns.forEach((bookmarkBtn) => {
      bookmarkBtn.addEventListener("click", (e) => {
        const clickedBtn = e.target.closest(".bookmark-icon");
        const id = clickedBtn.getAttribute("data-id");

        // Toggle classes based on the current class
        if (clickedBtn.classList.contains("fa-regular")) {
          clickedBtn.classList.remove("fa-regular");
          clickedBtn.classList.add("fa-solid");
          callBackFunction(id, "add");
        } else if (clickedBtn.classList.contains("fa-solid")) {
          clickedBtn.classList.remove("fa-solid");
          clickedBtn.classList.add("fa-regular");
          callBackFunction(id, "remove");
        }
      });
    });
  }

  addBookmarkPaginationListeners(callBackFunction) {
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");
    btnPrev.addEventListener("click", () => {
      callBackFunction("prev");
    });
    btnNext.addEventListener("click", () => {
      callBackFunction("next");
    });
  }

  addBookmarkPageHandler(handler) {
    const url = window.location.href;
    if (url.includes("bookmarks.htmll") || url.includes("bookmarks")) {
      handler();
    }
  }
}

export default new BookmarkView();
