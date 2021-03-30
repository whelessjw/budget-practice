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
    {name: 'groceries', limit: 600},
    {name: 'gas', limit: 200},
    {name: 'restaurants', limit: 100},
    {name: 'entertainment', limit: 100}

];

const budget = {
    categories: categories,
    expenses: [],
    // ways to change the budget
    addExpense() {
        
    },
	printBudgetOverview() {
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
	
}