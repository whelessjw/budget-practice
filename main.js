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
  // ways to change the budget
  addExpense(category, amount) {
    this.expenses.push({category, amount});
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
	},
  // questions we can ask about the budget
  amIOverBudgetOverall() {

  },
  amIOverBudgetInCategory(category) {

  },
  whenDidIGoOverBudget() {

  },
  whatCategoryDoISpendTheMostOn() {

  },
  whatCategoriesCanISpendMoreOn() {

  },
	
};

budget.addExpense('groceries', 50);
console.log(budget.printBudgetOverview());