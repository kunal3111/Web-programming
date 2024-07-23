using System;

public class Account
{
    private static Random random = new Random();

    public int Account_Number { get; private set; }
    public string Owner_Name { get; private set; }
    public double Balance { get; private set; }

    public const double Minimum_initial_balance = 1000;

    public Account(string ownerName, double initialBalance)
    {
        if (string.IsNullOrEmpty(ownerName))
        {
            throw new ArgumentException("\nOwner name cannot be null or empty");
        }

        if (initialBalance < Minimum_initial_balance)
        {
            throw new ArgumentException($"\nInitial balance must be at least ${Minimum_initial_balance}");
        }

        Account_Number = random.Next(1, int.MaxValue);
        Owner_Name = ownerName;
        Balance = initialBalance;
    }

    public void Deposit(double amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentException("\nDeposit amount must be positive");
        }

        Balance += amount;
    }

    public void Withdraw(double amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentException("\nWithdraw amount must be positive");
        }

        if (amount > Balance)
        {
            throw new InvalidOperationException("\nInsufficient funds");
        }

        Balance -= amount;
    }
}

//Some of the help is taken by Copilot.
