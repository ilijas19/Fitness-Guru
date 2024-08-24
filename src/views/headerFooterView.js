class HeaderFooterView {
  _headerEl = document.getElementById("header");
  _footerEl = document.getElementById("footer");

  async loadHeaderFooter() {
    const header = await fetch("../../header.html");
    const headerText = await header.text();

    const footer = await fetch("../../footer.html");
    const footerText = await footer.text();

    this._headerEl.innerHTML = headerText;
    this._footerEl.innerHTML = footerText;
  }

  addHeaderFooterHandler(handler) {
    window.addEventListener("DOMContentLoaded", handler);
  }

  addHeaderFooterListeners() {
    const menuOpen = document.querySelector(".menu-icon");
    const menuEl = document.querySelector(".phone-menu-div");
    const menuClose = document.querySelector(".phone-menu-close");
    menuOpen.addEventListener("click", function () {
      menuEl.style.right = "0";
      menuEl.style.width = "100%";
    });
    menuClose.addEventListener("click", function () {
      menuEl.style.width = "0%";
      menuEl.style.right = "-70rem";
    });
  }
}

export default new HeaderFooterView();
