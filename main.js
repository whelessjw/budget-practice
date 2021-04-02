/*
 * Use the Array functions to answer some questions about a budget representation
 * - do something for each item in a list with Array.forEach
 * - transform each item in a list with Array.map
 * - combine each item in a list with Array.reduce
 * - check if every item in a list matches a condition with Array.every
 * - check if some item in a list matches a condition with Array.some
 * - find the first matching item with Array.find and the position in the list with Array.findIndex
 * - get only matching items with Array.filter
 * - change the order of the items in a list with Array.sort
 */

const categories = [
    {name: 'Groceries', limit: 600},
    {name: 'Gas', limit: 200},
    {name: 'Restaurants', limit: 100},
    {name: 'Entertainment', limit: 100}

];

const budget = {
  categories: categories,
  expenses: [],

  totalBudgetAmount() {return this.categories.reduce((totalBudgetAmount, category) => {
    return totalBudgetAmount += category.limit;
  }, 0)},

  totalExpensesAmount(){
    return this.expenses.reduce((totalExpenses, expense) => {
      return totalExpenses += expense.amount;
    },0)},

  // ways to change the budget
  addExpense(categoryName, amount) {
    if (this.categories.some(category => {
      return category.name.toLowerCase() === categoryName.toLowerCase();
    } )) {
      this.expenses.push({categoryName, amount});
    } else {
      console.log(`Category doesn't exist`) 
    }
  },

	printBudgetOverview() {
    const categoryLimits = this.categories.reduce((categoryLimits, category) => {
      return categoryLimits += `${category.name}: ${category.limit}\n`
    },'');

    const totalBudgetAmount = this.categories.reduce((totalBudgetAmount, category) => {
      return totalBudgetAmount += category.limit;
    }, 0);

    return categoryLimits + `\nTotal Budget Amount: ${totalBudgetAmount}`
	},

	printExpenseHistory() {
    const listedExpenses = this.expenses.reduce((listedExpenses, expense) => {
      return listedExpenses += `${expense.categoryName}: ${expense.amount}\n`
    },`Expense History:\n`)

    return listedExpenses;
	},

  // questions we can ask about the budget
  amIOverBudgetOverall() {
    const overBudget = 
    (this.totalBudgetAmount() - this.totalExpensesAmount()) < 0;

    if (overBudget) {
      return `YOU ARE OVER BUDGET!`
    }

    return `You are not over budget.`
  },

  amIOverBudgetInCategory(category) {
    const categoryObject = this.categories.find(categoryObj => {
            return categoryObj.name.toLowerCase() === category.toLowerCase();
    });
    const categoryBudget = categoryObject.limit;
    const categoryExpenses = this.expenses.filter(categoryObj => {
     return categoryObj.categoryName.toLowerCase() === category.toLowerCase();
    });

    const totalExpenses = categoryExpenses.reduce((totalExpenses, expense) => {
      return totalExpenses += expense.amount;
    }, 0);

    const overBudget = (categoryBudget - totalExpenses) < 0;

    if (overBudget) {
      return `YOU ARE OVER BUDGET IN THE ${category} CATEGORY!`
    }

    return `You are not over budget in the ${category} category`
  },

  whenDidIGoOverBudget() {
    return this.expenses.reduce((accumulator, expense) => {
      if ((typeof accumulator) !== 'number') {
        return accumulator;
      }

      accumulator -= expense.amount;

      if (accumulator < 0) {
        return `You went over when you spent ${expense.amount} on ${expense.categoryName}`
      } else {
        return accumulator;
      }

    }, this.totalBudgetAmount())
  },

  whatCategoryDoISpendTheMostOn() {
    const categoryExpenses = {};

    this.expenses.forEach(expense => {
      if (!categoryExpenses[expense.categoryName]) {
        categoryExpenses[expense.categoryName] = expense.amount;
      } else {
        categoryExpenses[expense.categoryName] += expense.amount;
      }
    });

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
    const categoryExpenses = {};

    this.expenses.forEach(expense => {
      if (!categoryExpenses[expense.categoryName.toLowerCase()]) {
        categoryExpenses[expense.categoryName.toLowerCase()] = expense.amount;
      } else {
        categoryExpenses[expense.categoryName.toLowerCase()] += expense.amount;
      }
    });

    const canSpendMore = categories.filter(category => {
      return category.limit > categoryExpenses[category.name.toLowerCase()];
    });

    return canSpendMore.reduce((message, category) => {
      return message + category.name + ' ';
    }, `You can spend more in the following categories: `)
  },
	
};

budget.addExpense('groceries', 550);
budget.addExpense('groceries', 50);
budget.addExpense('gas', 50);
budget.addExpense('Restaurants', 250);
budget.addExpense('Entertainment', 200);
budget.addExpense('doesntexist', 25);
console.log(budget.printBudgetOverview());
console.log(budget.printExpenseHistory());
console.log(budget.totalBudgetAmount());
console.log(budget.totalExpensesAmount());
console.log(budget.amIOverBudgetOverall());
console.log(budget.amIOverBudgetInCategory('groceries'));
console.log(budget.whenDidIGoOverBudget());
console.log(budget.whatCategoryDoISpendTheMostOn());
console.log(budget.whatCategoriesCanISpendMoreOn());