#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


console.log(chalk.bold.bgYellowBright(`\t\t Account Number 1 : 1001 \n\t\t Account Number 2 : 1002 \n\t\t Account Number 3 : 1003 `));

// Bank Account Interface
interface BankAccount{
    accountNumber : number;
    balance : number;
    withdraw(amount : number): void;
    deposit(amount : number): void;
    checkBalance():void;
};

// Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber : number, balance : number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // Debit Money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount
            console.log(chalk.bold.greenBright(`Withdrawal of $${amount} Successful. Remaining Balance $${this.balance}`));
        }else{
            console.log(chalk.bold.bgRed(`Insufficient Balance.`));
        }
    }

// Credit Money

deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // $1 fee charged if more then  $100 deposited
    } this.balance += amount;
    console.log(chalk.bold.greenBright(`Deposit of $${amount} Successful . Remaining Balance : $${this.balance}`));
}

// Check Balance 
checkBalance(): void {
    console.log(chalk.greenBright(`Current Balance : $${this.balance}`));
}
}

// Create Class
class Customer{
    firstName : string;
    lastName : string;
    gender : string;
    age : number;
    mobileNumber : number;
    account : BankAccount;

    constructor(firstName : string, lastName : string, gender : string, age : number, mobileNumber : number, account : BankAccount)
    {
        this.firstName =  firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

// Create BankAccounts

const account : BankAccount[] = [
    new BankAccount (1001, 1000,),
    new BankAccount (1002, 2000,),
    new BankAccount (1003, 3000,),
];


// Create Customers

const customers : Customer[] = [
    new Customer ("Muhammad", "Sami", "Male", 20, 3162790532, account[0]),
    new Customer ("Hamzah", "Khan", "Male", 26, 3198200532, account[1]),
    new Customer ("Naseem", "Shah", "Male", 23, 3117820032, account[2])
]

// Function To Interact with BankAccount


async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name : "accountNumber",
            type : "number",
            message : chalk.bold.magenta("Enter Your Account Number : "),
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(chalk.bold.greenBright(`\t\t\t Welcome, ${customer.firstName} ${customer.lastName}!\n`));
            const ans = await inquirer.prompt([{
                name : "select",
                type : "list",
                message : chalk.bold.magenta("Select An Operation :"),
                choices : ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);


            switch(ans.select){
                case "Deposit" :
                    const depositAmount = await inquirer.prompt({
                        name : "amount",
                        type : "number",
                        message : chalk.bold.magenta("Enter The Amount To Deposit : ")
                    });

                    customer.account.deposit(depositAmount.amount);
                    break;
                case  "Withdraw" :
                    const withdrawAmount = await inquirer.prompt({
                        name : "amount",
                        type : "number",
                        message : chalk.bold.magenta("Enter The Amount To Withdraw : ")
                    });

                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance" : 
                    customer.account.checkBalance();
                    break;
                case "Exit" :
                    console.log(chalk.bold.bgRedBright(`\t\t\t        Exiting Bank Program !!!`));
                    console.log(chalk.bold.bgYellowBright(`\t\t Thank You For Using Our Bank Services. Have A Great Day`));
                    return;
            }
        } else{
            console.log(chalk.bold.bgRedBright(`Invalid Account Number. Please Try Again.`))
        }
    } while(true)
}

service();





