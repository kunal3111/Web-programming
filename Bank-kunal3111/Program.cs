using System;
using System.Collections.Generic;

class Program
{
    private static List<Account> accounts = new List<Account>();

    static void Main(string[] args)
    {
        while (true)
        {
            Console.WriteLine("\nSelect an option:");
            Console.WriteLine("1 - View accounts");
            Console.WriteLine("2 - Create an account");
            Console.WriteLine("3 - Deposit");
            Console.WriteLine("4 - Withdraw");
            Console.WriteLine("5 - Exit");
            Console.Write("\nEnter your choice here: ");
            string? choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    ViewAccounts();
                    break;
                case "2":
                    CreateAccount();
                    break;
                case "3":
                    Deposit();
                    break;
                case "4":
                    Withdraw();
                    break;
                case "5":
                    return;
                default:
                    Console.WriteLine("\nInvalid choice. Try Again!!.");
                    break;
            }
        }
    }

    private static void ViewAccounts()
    {
        if (accounts.Count == 0)
        {
            Console.WriteLine("\nNo accounts found.");
        }
        else
        {
            foreach (var account in accounts)
            {
                Console.WriteLine($"\nAccountNumber: {account.Account_Number}, OwnerName: {account.Owner_Name}, Balance: {account.Balance}");
            }
        }
    }

    private static void CreateAccount()
    {
        Console.Write("\nEnter the account owner's name: ");
        string? Owner_Name = Console.ReadLine();

        if (string.IsNullOrEmpty(Owner_Name))
        {
            Console.WriteLine("\nOwner name cannot be empty.");
            return;
        }

        double Initial_Balance;
        while (true)
        {
            Console.Write("\nEnter the initial account balance $");
            if (double.TryParse(Console.ReadLine(), out Initial_Balance))
            {
                if (Initial_Balance >= Account.Minimum_initial_balance)
                {
                    break;
                }
                else
                {
                    Console.WriteLine($"\nInitial balance must be at least ${Account.Minimum_initial_balance}");
                }
            }
            else
            {
                Console.WriteLine("\nPlease enter a valid number.");
            }
        }

        Account newAccount = new Account(Owner_Name, Initial_Balance);
        accounts.Add(newAccount);
        Console.WriteLine($"\nAccount created successfully!! AccountNumber: {newAccount.Account_Number}, OwnerName: {newAccount.Owner_Name}, Balance: {newAccount.Balance}");
    }

    private static void Deposit()
    {
        Console.Write("\nEnter the account number: ");
        string? accountNumberInput = Console.ReadLine();
        if (int.TryParse(accountNumberInput, out int account_number))
        {
            Account? account = accounts.Find(a => a.Account_Number == account_number);
            if (account != null)
            {
                Console.Write("\nEnter the deposit amount: ");
                if (double.TryParse(Console.ReadLine(), out double amount) && amount > 0)
                {
                    account.Deposit(amount);
                    Console.WriteLine($"\nDeposit successful! New Balance: {account.Balance}");
                }
                else
                {
                    Console.WriteLine("\nDeposit amount must be a positive number.");
                }
            }
            else
            {
                Console.WriteLine("\nAccount not found.");
            }
        }
        else
        {
            Console.WriteLine("\nInvalid account number.");
        }
    }

    private static void Withdraw()
    {
        Console.Write("\nEnter the account number: ");
        string? accountNumberInput = Console.ReadLine();
        if (int.TryParse(accountNumberInput, out int account_number))
        {
            Account? account = accounts.Find(a => a.Account_Number == account_number);
            if (account != null)
            {
                Console.Write("\nEnter the withdrawal amount $");
                if (double.TryParse(Console.ReadLine(), out double amount) && amount > 0)
                {
                    try
                    {
                        account.Withdraw(amount);
                        Console.WriteLine($"\nWithdrawal successful! New Balance: {account.Balance}");
                    }
                    catch (InvalidOperationException e)
                    {
                        Console.WriteLine(e.Message);
                    }
                }
                else
                {
                    Console.WriteLine("\nWithdrawal amount must be a positive number.");
                }
            }
            else
            {
                Console.WriteLine("\nAccount not found Check the details.");
            }
        }
        else
        {
            Console.WriteLine("\nInvalid account number.");
        }
    }
}

// some of the help is taken by copilot.
