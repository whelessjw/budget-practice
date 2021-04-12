const $addIncomeButton = $('#add-income');
const $addToCategoryButton = $('#add-to-category');
const $categoryBudgetTable = $('#category-table');
const $addExpenseButton = $('#add-expense-button');
const $createBudgetButton = $('#create-budget');
const $createNextMonthsBudgetButton = $('#next-months-budget');

$createBudgetButton.on('click', function () {
  if($('#initial-account-balance').val()) {
    totalAccountBalance = parseInt($('#initial-account-balance').val());
    availableToBudget = totalAccountBalance;
    $('.first-form').hide();
    $('.first-title').hide();
    $('.main-content').show();
    $('header').show();

    $('#total-balance').replaceWith(`<span id="total-balance" class="text-success">$${totalAccountBalance}</span>`);

    $('#budget-title').append(`<h1>${currentMonth} ${year}</h1>`);
    updateAvailableBudgetDOM();
  }
});

$createNextMonthsBudgetButton.on('click', function () {
  budget.startBudgetForNewMonth();
  allocationsToZero();
  loadCategoriesAndBalances();
  $('#income-sources').children().remove();
  $('#expenses-table').children().remove();

  $('#expenses-this-month').replaceWith(`<th colspan="1" id="expenses-this-month" class="text-danger">$${budget.totalExpensesAmount()}</th>`);

  $('#total-income').replaceWith(`<th colspan="1" id="total-income" class="text-success">$${totalIncomeForMonth}</th>`);

  $('#budget-title').replaceWith(`<div id="budget-title" class="col-lg-3">
  <h1>${currentMonth} ${year}</h1></div>`);
});

//Load budget allocations object with all categories and intial allocation of zero
function allocationsToZero() {categories.forEach(category => {
  budget.budgetAllocations[category.name] = 0;
  budget.expensesThisMonth[category.name] = 0;
});};

allocationsToZero();

//Load the categories and balances
function loadCategoriesAndBalances() {
  $categoryBudgetTable.children().remove();

  categories.forEach(category => {
    let classColor = "text-success";
    if (category.balance < 0) {
      classColor = "text-danger";
    };

    $categoryBudgetTable.append(`<tr>
    <td>${category.name.toUpperCase()}</td>
    <td>$${budget.budgetAllocations[category.name]}</td>
    <td>$${budget.expensesThisMonth[category.name]}</td>
    <td class="${classColor}">$${category.balance}</td>
  </tr>`)
  })
};

loadCategoriesAndBalances();

function updateAvailableBudgetDOM() {
  if (availableToBudget < 0) {
    $('#income-to-budget').replaceWith(`<th colspan="1" id="income-to-budget" class="text-danger">$${availableToBudget}</th>`);
  } else {
    $('#income-to-budget').replaceWith(`<th colspan="1" id="income-to-budget" class="text-success">$${availableToBudget}</th>`);
  }
};

//if 'income source' 'amount' and 'date' are filled in on the form, add income source, amount and date to the income table.
//Update Total Account Balance and Total Income
$addIncomeButton.on('click', function () {
  const source = $('#income-source').val();
  const amount = parseInt($('#income-amount').val());
  const date = $('#income-date').val();

  if (source, amount, date) {
    $('#income-sources').append(`<tr>
    <td>${source.toUpperCase()}</td>
    <td>$${amount}</td>
    <td>${date}</td>
  </tr>`);
    
    totalIncomeForMonth += amount;
    $('#total-income').replaceWith(`<th colspan="1" id="total-income" class="text-success">$${totalIncomeForMonth}</th>`);

    totalAccountBalance += amount;
    $('#total-balance').replaceWith(`<span id="total-balance" class="text-success">$${totalAccountBalance}</span>`);

    availableToBudget += amount;
    updateAvailableBudgetDOM();

    $('#income-source').val('');
    $('#income-amount').val('');
    $('#income-date').val('');
  }
});

//Add money to a category if 'category' and 'amount' are filled in on the form.  Subtract from availableToBudget variable.
//Update categories array in main.js
$addToCategoryButton.on('click', function () {
  const category = $('#category-name-form').val().toLowerCase();
  const amount = parseInt($('#budget-amount-form').val());
  
  if (category, amount) {
    if (!budget.budgetAllocations[category]) {
      budget.budgetAllocations[category] = 0;;
    }
    
    if (!categories.find(categoryObj => {
      return categoryObj.name === category;
    })){
      budget.addCategory(category, 0);
    };

    if (amount < 0) {
      budget.decreaseCategoryBalance(category, amount);
      budget.decreaseBudgetAllocation(category, amount);
    } else {
      budget.increaseCategoryBalance(category, amount);
      budget.increaseBudgetAllocation(category, amount);
    };

    loadCategoriesAndBalances();

    availableToBudget -= amount;
    updateAvailableBudgetDOM();

    $('#category-name-form').val('');
    $('#budget-amount-form').val('');
  }
});

//Add Expense to the Expense Table when 'Add Expense' button is clicked.
//Subtract expense from Total Account Balance
//Subtract expense from the Category Balance
$addExpenseButton.on('click', function () {
  const category = $('#expense-category').val().toLowerCase();
  const amount = parseInt($('#expense-amount').val());
  const date = $('#expense-date').val();

  if (category, amount, date) {

    if (!categories.find(categoryObj => categoryObj.name === category)) {
      alert('Please enter a valid category.');
      $('#expense-category').val('')
      return;
    }

    $('#expenses-table').append(`<tr>
    <td>${category.toUpperCase()}</td>
    <td>$${amount}</td>
    <td>${date}</td>
  </tr>`);
  
  $('#expense-category').val('')
  $('#expense-amount').val('');
  $('#expense-date').val('');
  
  
  budget.expensesThisMonth[category] += amount;
  
  if (!budget.budgetAllocations[category]) {
    budget.budgetAllocations[category] = 0;;
  }
  
  if (!categories.find(categoryObj => {
    return categoryObj.name === category;
  })){
    budget.addCategory(category, 0);
  };
  
    totalAccountBalance -= amount;
    let classColor = "text-success";
    if (totalAccountBalance < 0) {
      classColor = "text-danger";
    };
    $('#total-balance').replaceWith(`<span id="total-balance" class="${classColor}">$${totalAccountBalance}</span>`);

    budget.decreaseCategoryBalance(category, -amount);
    loadCategoriesAndBalances();

    $('#expenses-this-month').replaceWith(`<th colspan="1" id="expenses-this-month" class="text-danger">$${budget.totalExpensesAmount()}</th>`)
  }
});