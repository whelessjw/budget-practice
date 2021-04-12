const categories = [
  {name: 'savings', balance: 0},
  {name: 'housing', balance: 0},
  {name: 'utilities', balance: 0},
  {name: 'groceries', balance: 0},
  {name: 'restaurants', balance: 0},
  {name: 'car payment', balance: 0},
  {name: 'gas', balance: 0},
  {name: 'personal', balance: 0}
  
];

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let totalAccountBalance = 0;
let availableToBudget = 0;
let totalIncomeForMonth = 0;

const date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
let currentMonth = months[month];

const budget = {
  categories: categories,
  incomeThisMonth: [],
  expensesThisMonth: {},
  budgetAllocations: {},
  startBudgetForNewMonth() {
    if (month === 11) {
      month = 0;
      year += 1;
    } else {
      month += 1;
    };
    currentMonth = months[month];
    totalIncomeForMonth = 0;
    this.incomeThisMonth = [];
    this.expensesThisMonth = [];
    this.budgetAllocations = [];
    },
  totalBudgetAmount() {return this.categories.reduce((totalBudgetAmount, category) => {
    return totalBudgetAmount += category.balance;
  }, 0)},

  totalExpensesAmount(){
    let totalExpenses = 0;

    for (let key in this.expensesThisMonth) {
      totalExpenses += this.expensesThisMonth[key];
    }

    return totalExpenses;
  },

  // ways to change the budget
  increaseCategoryBalance(name, amount) {
    const categoryToIncrease = categories.find(category => {
      return category.name === name;
    })
    categoryToIncrease.balance += parseInt(amount);
  },
  decreaseCategoryBalance(name, amount) {
    const categoryToDecrease = categories.find(category => {
      return category.name === name;
    })
    categoryToDecrease.balance += parseInt(amount);
  },
  decreaseBudgetAllocation(name, amount) {
    this.budgetAllocations[name] += amount;
  },
  increaseBudgetAllocation(name, amount) {
    this.budgetAllocations[name] += amount;
  },
  totalBalanceInCategories() {return this.categories.reduce((totalBalance, category) => {
    return totalBalance += category.balance;
  }, 0)},

  totalAccountBalance() {
    const categoriesTotal = this.totalBalanceInCategories();
    return categoriesTotal + availableToBudget;
  },

  addCategory(categoryName, balance) {
    balance = parseInt(balance);
    this.categories.push({name: categoryName, balance: balance});
    this.expensesThisMonth[categoryName] = 0;
  },

  addIncome(dollarAmount) {
    incomeThisMonth.push(dollarAmount);
    availableToBudget += dollarAmount;
  },

  addExpense(categoryName, amount) {
    categoryName = categoryName.toLowerCase();

    if (this.categories.some(category => {
      return category.name === categoryName;
    } )) {
      this.expensesThisMonth.push({categoryName, amount});
    } else {
      console.warn(`Category didn't exist, adding it automatically.`);
      this.addCategory(categoryName, 0);
      this.addExpense(categoryName, amount);
      console.log(categories);
    }
  },

	printBudgetOverview() {
    const rows = categories.map(category => `${category.name}: ${category.balance}`);

    const overview = rows.reduce((overview, row) => {
      return overview + row + '\n'
    }, '')

    const totalBudgetAmount = this.categories.reduce((totalBudgetAmount, category) => {
      return totalBudgetAmount += category.balance;
    }, 0);

    return overview + `\nTotal Budget Amount: ${totalBudgetAmount}`
	},

	printExpenseHistory() {
    const listedExpenses = this.expensesThisMonth.reduce((listedExpenses, expense) => {
      return listedExpenses += `${expense.categoryName}: ${expense.amount}\n`
    },`Expense History:\n`)

    return listedExpenses;
	},

  // questions we can ask about the budget
  amIOverBudgetOverall() {
    const overBudget = 
    (this.totalBudgetAmount() - this.totalExpensesAmount()) < 0;

    if (overBudget) {
      return true;
    }

    return false;
  },

  printBudgetRunoverStatement() {
    if (this.amIOverBudgetOverall()) {
      console.log('YOU ARE OVER BUDGET!')
    } else {
      console.log(`You are not over budget. ${this.whatCategoriesCanISpendMoreOn()}`);
    }
  },

  amIOverBudgetInCategory(category) {
    const categoryObject = this.categories.find(categoryObj => {
            return categoryObj.name === category.toLowerCase();
    });
    const categoryBudget = categoryObject.balance;
    const categoryExpenses = this.expensesThisMonth.filter(categoryObj => {
     return categoryObj.categoryName === category.toLowerCase();
    });

    const totalExpenses = categoryExpenses.reduce((totalExpenses, expense) => {
      return totalExpenses += expense.amount;
    }, 0);

    const overBudget = (categoryBudget - totalExpenses) < 0;

    if (overBudget) {
      return true;
    }

    return false;
  },

  findFirstExpenseOverBudget() {
    let expenditure = 0;
    const totalBudgetAmount = this.totalBudgetAmount();

    return this.expensesThisMonth.find(expense => {
      expenditure += expense.amount;
      if (expenditure > totalBudgetAmount) {
        return true;
      } else {
        return false;
      }
    })
  },

  whenDidIGoOverBudget() {
    const firstExpenseOverBudget = this.findFirstExpenseOverBudget();
    if (firstExpenseOverBudget === undefined) {
      console.log('You are not over budget.')
    } else {
      console.log(`You went over when you spent ${firstExpenseOverBudget.amount} on ${firstExpenseOverBudget.categoryName}`)
    }
  },

  getSpendingByCategory() {
    const spendingByCategory = {};

    this.expensesThisMonth.forEach(expense => {
      if (!spendingByCategory[expense.categoryName]) {
        spendingByCategory[expense.categoryName] = expense.amount;
      } else {
        spendingByCategory[expense.categoryName] += expense.amount;
      }
    });

    return spendingByCategory;
  },

  whatCategoryDoISpendTheMostOn() {
    const categoryExpenses = this.getSpendingByCategory();

    let mostExpensiveAmount = 0;
    let mostExpensiveCategory;

    for (let key in categoryExpenses) {
      if (categoryExpenses[key] > mostExpensiveAmount) {
        mostExpensiveAmount = categoryExpenses[key];
        mostExpensiveCategory = key;
      }
    }

    return `You spend the most on the ${mostExpensiveCategory} category, spending $${mostExpensiveAmount}`;
  },

  whatCategoriesCanISpendMoreOn() {
    const categoryExpenses = this.getSpendingByCategory();

    const canSpendMore = categories.filter(category => {
      return category.balance > categoryExpenses[category.name];
    });

    return canSpendMore.reduce((message, category) => {
      return message + category.name + ' ';
    }, `You can spend more in the following categories: `)
  },
	
};

// budget.addExpense('groceries',550);
// budget.addExpense('groceries', 50);
// budget.addExpense('gas', 50);
// budget.addExpense('Restaurants', 250);
// budget.addExpense('Entertainment', 200);
// console.log(budget.printBudgetOverview());
// console.log(budget.printExpenseHistory());
// console.log(budget.totalBudgetAmount());
// console.log(budget.totalExpensesAmount());
// console.log(budget.amIOverBudgetOverall());
// budget.printBudgetRunoverStatement();
// console.log(budget.amIOverBudgetInCategory('groceries'));
// budget.whenDidIGoOverBudget();
// console.log(budget.whatCategoryDoISpendTheMostOn());
// console.log(budget.whatCategoriesCanISpendMoreOn());
// budget.addExpense('tithe', 100);