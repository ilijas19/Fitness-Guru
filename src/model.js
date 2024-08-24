export const state = {
  results: [],
  nextPage: [],
  bookmarks: [],
  currentPage: 1,
  currentSavedPage: 1,
  resultsPerPage: 8,
};

// Fetch exercises based on body part
export async function fetchExercises(query) {
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${query}?limit=24&offset=0`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9b841ad222msh494599bb4eb666bp12c045jsnd7c4c3281722",
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    state.results = result;
    state.currentPage = 1;
    state.results.forEach((result) => (result.isBookmarked = false));
    // Check and update bookmarks
    _updateResultsWithBookmarks();
  } catch (error) {
    console.error(error);
  }
}

// Fetch all exercises
export async function defaultFetchExcercise() {
  const url = "https://exercisedb.p.rapidapi.com/exercises?limit=64&offset=0";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9b841ad222msh494599bb4eb666bp12c045jsnd7c4c3281722",
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    state.results = result;
    state.currentPage = 1;
    // Setting bookmarked to false by default
    state.results.forEach((result) => (result.isBookmarked = false));
    // Check and update bookmarks
    _updateResultsWithBookmarks();
  } catch (error) {
    console.error(error);
  }
}

// Changing page
export const changePage = function (query) {
  if (
    query === "next" &&
    state.currentPage < state.results.length / state.resultsPerPage
  ) {
    state.currentPage++;
  }
  if (query === "prev" && state.currentPage > 1) {
    state.currentPage--;
    console.log(state.currentPage);
  }
  const start = (state.currentPage - 1) * state.resultsPerPage;
  const end = state.currentPage * state.resultsPerPage;
  state.nextPage = state.results.slice(start, end);
};

export const changeSavedPage = function (query) {
  if (
    query === "next" &&
    state.currentSavedPage < state.bookmarks.length / state.resultsPerPage
  ) {
    state.currentSavedPage++;
  }
  if (query === "prev" && state.currentSavedPage > 1) {
    state.currentSavedPage--;
  }
  const start = (state.currentSavedPage - 1) * state.resultsPerPage;
  const end = state.currentSavedPage * state.resultsPerPage;
  state.nextPage = state.bookmarks.slice(start, end);
};

// Bookmarking exercises
export const bookmarkExcercise = function (id, query) {
  const excercise = findExcercise(id);
  if (query === "add") {
    console.log(id, "added to bookmarks");
    excercise.isBookmarked = true;
    state.bookmarks.push(excercise);
  }
  if (query === "remove") {
    console.log(id, "removed from bookmarks");
    excercise.isBookmarked = false;
    state.bookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== id);
  }
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

// Helper function to find exercise by ID
export const findExcercise = function (id) {
  // Try to find the exercise in state.results
  let excercise = state.results.find((excercise) => excercise.id === id);

  // If not found in state.results, try to find it in state.bookmarks
  if (!excercise) {
    excercise = state.bookmarks.find((bookmark) => bookmark.id === id);
  }

  return excercise;
};

// Function to update results with bookmarks
const _updateResultsWithBookmarks = function () {
  // Load bookmarks if not already loaded
  if (!state.bookmarks.length) loadBookmarks();

  state.results.forEach((exercise) => {
    const bookmarked = state.bookmarks.find(
      (bookmark) => bookmark.id === exercise.id
    );
    if (bookmarked) {
      exercise.isBookmarked = true;
    }
  });
};

// Load bookmarks from localStorage
export const loadBookmarks = function () {
  const bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks) {
    state.bookmarks = JSON.parse(bookmarks);
  } else {
    state.bookmarks = [];
  }
  // console.log(state.bookmarks);
};

export const test = async function () {
  const url =
    "https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises/muscle/chest";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9b841ad222msh494599bb4eb666bp12c045jsnd7c4c3281722",
      "x-rapidapi-host": "exercise-db-fitness-workout-gym.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

// model.js
export const calculateCalories = function (
  age,
  gender,
  height,
  weight,
  activityLevel
) {
  let bmr;
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  let calorieNeeds;
  switch (activityLevel) {
    case "sedentary":
      calorieNeeds = bmr * 1.2;
      break;
    case "lightly active":
      calorieNeeds = bmr * 1.375;
      break;
    case "moderately active":
      calorieNeeds = bmr * 1.55;
      break;
    case "very active":
      calorieNeeds = bmr * 1.725;
      break;
    case "extra active":
      calorieNeeds = bmr * 1.9;
      break;
    default:
      calorieNeeds = bmr;
      break;
  }

  return calorieNeeds;
};
