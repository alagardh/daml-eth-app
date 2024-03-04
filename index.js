const express = require('express');
const { Ledger } = require('@daml/ledger');

//const ledger = new Ledger({ httpBaseUrl: 'http://localhost:7575/' });
const ledger = new Ledger({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZWRnZXJJZCI6InNhbmRib3giLCJhcHBsaWNhdGlvbklkIjoibGVuZGluZy1hZ3JlZW1lbnQiLCJwYXJ0eSI6IkFsaWNlIn0.ji9hPqaPwlJjXnfXf188OraN2mUl7psguLGfG32UiQs', httpBaseUrl: 'http://localhost:7575/' });

const app = express();
const port = 3000;

// Function to check for new LoanAgreements
async function checkForLoanAgreements() {
    try {
        const contracts = await ledger.query({templateId: 'Main:LoanAgreement'});
        contracts.forEach(contract => {
            console.log('Loan agreement accepted:', contract.payload);
            // Here you can add logic to notify or trigger Ethereum transaction
        });
    } catch (error) {
        console.error('Error fetching contracts:', error);
    }
}

// Set an interval to check for LoanAgreements
setInterval(checkForLoanAgreements, 5000); // checks every 5 seconds

app.listen(port, () => {
    console.log(`Node.js app listening at http://localhost:${port}`);
});