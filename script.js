window.onload = () => {
  function updateToMonthly() {
    let monthly = document.querySelectorAll(".monthly");
    let yearly = document.querySelectorAll(".yearly");

    monthly.forEach((month) => month.classList.add("show"));
    yearly.forEach((year) => year.classList.remove("show"));
  }
  function updateToYearly() {
    let monthly = document.querySelectorAll(".monthly");
    let yearly = document.querySelectorAll(".yearly");

    monthly.forEach((month) => month.classList.remove("show"));
    yearly.forEach((year) => year.classList.add("show"));
  }

  function monthlyYearlyToggle() {
    let toggle = document.querySelector(".switch input");
    toggle.onchange = () => (toggle.checked ? updateToYearly() : updateToMonthly());
  }

  function planSelectionSet() {
    let planSelection = document.querySelectorAll(".plan-single");
    planSelection.forEach(
      (plan) =>
        (plan.onclick = () => {
          planSelection.forEach((plan) => plan.classList.remove("selected"));
          plan.classList.add("selected");
        })
    );
  }

  function addonSelection() {
    let addons = document.querySelectorAll(".addon-single");
    addons.forEach((addon) => (addon.onclick = () => addon.classList.toggle("selected")));
  }

  function getTotal() {
    const planPrice = parseInt(document.querySelector(".plan-price").innerHTML);
    let addonElements = Array.from(document.querySelectorAll("span.addon-price"));
    let addonPrices = addonElements.reduce((total, addon) => total + parseInt(addon.innerHTML), 0);
    let totalSpan = document.querySelector(".calculate-price");
    const total = planPrice + addonPrices;
    console.log(planPrice);
    console.log(addonPrices);
    totalSpan.innerHTML = total;
  }

  function updateSummary() {
    const selectedPlan = document.querySelector(".plan-single.selected");
    const selectedAddons = document.querySelectorAll(".addon-single.selected");
    const isMonthly = document.querySelector(".monthly.show");

    let addonSelectDisplay = document.querySelector(".addon-selections-display");
    let planName = document.querySelector(".plan-name");
    planName.innerHTML = selectedPlan.dataset.plan;

    let planMonthlyPrice = document.querySelector(".plan-select-price .plan-price");

    if (isMonthly) {
      planMonthlyPrice.innerHTML = selectedPlan.dataset.monthly;
    } else {
      planMonthlyPrice.innerHTML = selectedPlan.dataset.yearly;
    }

    if (selectedAddons.length !== 0) {
      addonSelectDisplay.innerHTML = "";
      selectedAddons.forEach((addon) => {
        let price = isMonthly ? addon.dataset.monthly : addon.dataset.yearly;
        let addonDiv = `
            <div class="addon-select">
            <div class="addon-select-content">
            <p class="addon-name">${addon.dataset.name}</p>
          </div>
          <div class="addon-price">
            <p>+$<span class="addon-price">${price}</span>/<span class="monthly show">mo</span><span class="yearly">yr</span></p>
          </div>
        </div>
            `;
        addonSelectDisplay.innerHTML += addonDiv;
      });
    }

    return getTotal();
  }

  function changePlan() {
    let changePlanBtn = document.querySelector(".plan-select-content a");
    changePlanBtn.onclick = () => {
      document.querySelector("#summary").classList.remove("active");
      document.querySelector("#plan").classList.add("active");
    };
  }

  function personalInfoValidation() {
    let allInputs = document.querySelectorAll(".info-input-wrapper input");
    let inputVals = [];
    allInputs.forEach((input) => inputVals.push(input.value));

    return inputVals.every((val) => val.length !== 0);
  }

  function personalInfoAddError() {
    let allInputs = document.querySelectorAll(".info-input-wrapper input");
    allInputs.forEach((input) => {
      if (input.value.length === 0) {
        let inputGroup = input.closest(".input-group");
        inputGroup.classList.add("error");
      }
    });
  }

  function personalInfoRemoveErrors() {
    let inputGroup = document.querySelectorAll(".info-input-wrapper .input-group");
    inputGroup.forEach((group) => group.classList.remove("error"));
  }

  function nextStep() {
    allNextBtns = document.querySelectorAll("button.next-step");

    allNextBtns.forEach((nextBtn) => {
      nextBtn.onclick = (e) => {
        let nextStepName = e.target.closest(".progress-buttons").dataset.next;
        let currentStep = e.target.closest(".form-step-content");
        let allNumberSteps = document.querySelectorAll(".step-button");
        let infoCheck = personalInfoValidation();

        if (infoCheck) {
          personalInfoRemoveErrors();
        } else {
          personalInfoAddError();
          return;
        }

        if (nextStepName === "summary") {
          updateSummary();
        }

        currentStep.classList.remove("active");
        document.querySelector(`#${nextStepName}`).classList.add("active");

        allNumberSteps.forEach((step) => {
          if (step.id === `step-${nextStepName}`) {
            allNumberSteps.forEach((step) => step.classList.remove("active"));
            step.classList.add("active");
          }
        });
      };
    });
  }
  function prevStep() {
    allNextBtns = document.querySelectorAll("button.previous-step");

    allNextBtns.forEach((nextBtn) => {
      nextBtn.onclick = (e) => {
        let nextStepName = e.target.closest(".progress-buttons").dataset.previous;
        let currentStep = e.target.closest(".form-step-content");
        let allNumberSteps = document.querySelectorAll(".step-button");

        currentStep.classList.remove("active");
        document.querySelector(`#${nextStepName}`).classList.add("active");

        allNumberSteps.forEach((step) => {
          if (step.id === `step-${nextStepName}`) {
            allNumberSteps.forEach((step) => step.classList.remove("active"));
            step.classList.add("active");
          }
        });
      };
    });
  }

  nextStep();
  prevStep();
  planSelectionSet();
  monthlyYearlyToggle();
  addonSelection();
  changePlan();
};
