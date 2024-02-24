window.onload = () => {
  const nextBtns = document.querySelectorAll("button.next-step");
  const prevBtns = document.querySelectorAll("button.previous-step");

  let selectedPlan = {};
  let selectedAddons = [];

  function infoPageValidator() {
    const name = document.querySelector("input#name").value;
    const email = document.querySelector("input#email").value;
    const phone = document.querySelector("input#phone").value;

    validatorArr = [name, email, phone];

    validationCheck = validatorArr.every((input) => input.length !== 0);

    if (validationCheck) {
      return true;
    } else {
      return false;
    }
  }

  function addInfoPageErrors() {
    let inputWrappers = document.querySelectorAll(".info-input-wrapper .input-group");

    return inputWrappers.forEach((input) => {
      let inputValue = input.querySelector("input").value;
      if (inputValue.length === 0) {
        input.classList.add("error");
      }
    });
  }

  function removeInfoPageErrors() {
    let inputWrappers = document.querySelectorAll(".info-input-wrapper .input-group");
    return inputWrappers.forEach((input) => input.classList.remove("error"));
  }

  function monthYearToggle() {
    let allMonthDisplays = document.querySelectorAll(".monthly");
    let allYearDisplays = document.querySelectorAll(".yearly");
    let toggleBtn = document.querySelector(".pay-option input");

    return (toggleBtn.onchange = (e) => {
      let checked = e.target.checked;
      if (checked) {
        allMonthDisplays.forEach((month) => month.classList.remove("show"));
        allYearDisplays.forEach((year) => year.classList.add("show"));
      } else {
        allMonthDisplays.forEach((month) => month.classList.add("show"));
        allYearDisplays.forEach((year) => year.classList.remove("show"));
      }
    });
  }

  function selectPlan() {}

  function nextPage(e) {
    let pageID = e.target.closest(".progress-buttons").dataset.next;
    let currentPage = e.target.closest(".form-step-content");
    let stepNumbers = document.querySelectorAll(".step-button");
    const validateInfoPage = infoPageValidator();
    if (!validateInfoPage) {
      addInfoPageErrors();
      return;
    }

    removeInfoPageErrors();
    currentPage.classList.remove("active");
    document.querySelector(`#${pageID}`).classList.add("active");
    if (pageID === "complete") {
      stepNumbers.forEach((number) => number.classList.remove("active"));
      document.querySelector(`#step-summary`).classList.add("active");
    } else {
      stepNumbers.forEach((number) => number.classList.remove("active"));
      document.querySelector(`#step-${pageID}`).classList.add("active");
    }
  }

  function prevPage(e, direct) {
    if (direct) {
      console.log(direct);
    }
    let pageID = e.target.closest(".progress-buttons").dataset.previous;
    let currentPage = e.target.closest(".form-step-content");
    let stepNumbers = document.querySelectorAll(".step-button");

    currentPage.classList.remove("active");
    document.querySelector(`#${pageID}`).classList.add("active");
    stepNumbers.forEach((number) => number.classList.remove("active"));
    document.querySelector(`#step-${pageID}`).classList.add("active");
  }

  nextBtns.forEach((btn) => (btn.onclick = (e) => nextPage(e)));
  prevBtns.forEach((btn) => (btn.onclick = (e) => prevPage(e)));

  monthYearToggle();
};
