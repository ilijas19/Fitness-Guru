import headerFooterView from "./views/headerFooterView.js";
import searchExcerciseView from "./views/searchExcerciseView.js";
import bookmarkView from "./views/bookmarkView.js";
import seeExcerciseView from "./views/seeExcerciseView.js";
import calculatorView from "./views/calculatorView.js";
import * as model from "./model.js";

const headerFooterControl = async function () {
  await headerFooterView.loadHeaderFooter();
  headerFooterView.addHeaderFooterListeners();
};

const searchExcerciseControl = async function () {
  //DEFAULT LOADING ALL EXCERCISES
  await model.defaultFetchExcercise();
  searchExcerciseView.render(model.state.results.slice(0, 8));
  bookmarkView.addBookmarkListeners(model.bookmarkExcercise);
  //setting listenrs on see more btn on each excercise
  seeExcerciseView.setBtnListeners((id) => {
    const excercise = model.findExcercise(id);
    seeExcerciseView.openPopup(excercise);
  });

  //DEFAULT LOADING WHEN BODYPART IS CLICKED
  searchExcerciseView.addSearchElListeners(async function (query) {
    await model.fetchExercises(query);
    searchExcerciseView.render(model.state.results.slice(0, 8));
    bookmarkView.addBookmarkListeners(model.bookmarkExcercise);
    //setting listenrs on see more btn on each excercise
    seeExcerciseView.setBtnListeners((id) => {
      const excercise = model.findExcercise(id);
      seeExcerciseView.openPopup(excercise);
    });
  });

  //PAGINATION FUNCTIONALITY
  searchExcerciseView.addPaginationElListeners((query) => {
    model.changePage(query);
    searchExcerciseView.render(model.state.nextPage);
    bookmarkView.addBookmarkListeners(model.bookmarkExcercise);
    //setting listenrs on see more btn on each excercise
    seeExcerciseView.setBtnListeners((id) => {
      const excercise = model.findExcercise(id);
      seeExcerciseView.openPopup(excercise);
    });
  });
};

const savedExcerciseControl = function () {
  //LOADING AND RENDERING BOOKMARKS
  model.loadBookmarks();
  searchExcerciseView.render(model.state.bookmarks.slice(0, 8));
  bookmarkView.addBookmarkListeners(model.bookmarkExcercise);
  //setting listenrs on see more btn on each excercise
  seeExcerciseView.setBtnListeners((id) => {
    const excercise = model.findExcercise(id);
    seeExcerciseView.openPopup(excercise);
  });

  //PAGINATION FUNCIONALITY FOR BOOKMARKS
  bookmarkView.addBookmarkPaginationListeners((query) => {
    model.changeSavedPage(query);
    searchExcerciseView.render(model.state.nextPage);
    bookmarkView.addBookmarkListeners(model.bookmarkExcercise);
    //setting listenrs on see more btn on each excercise
    seeExcerciseView.setBtnListeners((id) => {
      const excercise = model.findExcercise(id);
      seeExcerciseView.openPopup(excercise);
    });
  });
};

const calculatorControl = function () {
  const view = calculatorView;

  view.bindCalculate((age, gender, height, weight, activityLevel) => {
    // Call the calculateCalories function from the model
    return model.calculateCalories(age, gender, height, weight, activityLevel);
  });
};

const init = function () {
  headerFooterView.addHeaderFooterHandler(headerFooterControl);
  searchExcerciseView.addExcercisePageHandler(searchExcerciseControl);
  bookmarkView.addBookmarkPageHandler(savedExcerciseControl);
  calculatorView.addCalculatorPageHandler(calculatorControl);
};

init();
