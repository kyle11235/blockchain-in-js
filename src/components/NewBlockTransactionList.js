import React, { Component } from "react";
import { Collapse, Button, Callout } from "@blueprintjs/core";
import TransactionTable from "./TransactionTable";
import NewTransaction from "./NewTransaction";
import Transaction from "../models/Transaction";

export default class NewBlockTransactionList extends Component {
  state = {
    isAddingNewTransaction: false,
    inputPublicKey: "",
    outputPublicKey: "",
    transactionAmount: 0,
    fee: 0
  };
  onChangeInputPublicKey = inputPublicKey => {
    this.setState({ inputPublicKey });
  };
  onChangeOutputPublicKey = outputPublicKey => {
    this.setState({ outputPublicKey });
  };
  onChangeTransactionAmount = evt => {
    this.setState({ transactionAmount: parseFloat(evt.target.value) || 0 });
  };
  onChangeFee = evt => {
    this.setState({ fee: parseFloat(evt.target.value) || 0 });
  };

  authoringTransaction() {
    return new Transaction(
      this.state.inputPublicKey,
      this.state.outputPublicKey,
      this.state.transactionAmount,
      this.state.fee
    );
  }
  addTransaction = () => {
    if (this.state.isAddingNewTransaction) {
      this.props.block.addTransaction(this.authoringTransaction());
      this.setState({
        isAddingNewTransaction: false,
        inputPublicKey: "",
        outputPublicKey: "",
        transactionAmount: 0,
        fee: 0
      });
      this.props.rerender();
    } else {
      this.setState({ isAddingNewTransaction: true });
    }
  };

  shouldValidateTransaction() {
    return (
      this.state.inputPublicKey !== "" && this.state.transactionAmount !== 0
    );
  }

  isValidTransaction() {
    return this.props.block.isValidTransaction(this.authoringTransaction());
  }

  addingTransactionErrorMessage() {
    return this.props.block.addingTransactionErrorMessage(
      this.authoringTransaction()
    );
  }

  applicableExternalTransactions() {
    return Object.values(
      this.props.block.blockchain.pendingTransactions
    ).filter(
      transaction =>
        this.props.block.transactions[transaction.hash] === undefined &&
        this.props.block.isValidTransaction(transaction)
    );
  }

  renderExternalTransactions() {
    if (this.applicableExternalTransactions().length === 0) return null;

    return (
      <div>
        <h5>Broadcasted Transactions</h5>
        <p>
          Below listed you find transactions that have been broadcasted. You can
          add them to the block.
        </p>
        <TransactionTable
          transactions={this.applicableExternalTransactions()}
          noTransactionsText="This block contains no transactions."
          transactionAction={transaction => (
            <Button
              text="Add Transaction"
              onClick={() => {
                this.props.block.addTransaction(transaction);
                this.props.rerender();
              }}
            />
          )}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          <p>
            This is where you can add transactions to this block. The UTXO pool
            will contain the mining reward of the coinbase that you can spend
            immediately
          </p>
          <TransactionTable
            transactions={this.props.block.transactions}
            noTransactionsText="This block contains no transactions."
          />
          <Collapse isOpen={this.state.isAddingNewTransaction}>
            <NewTransaction
              transaction={this.authoringTransaction()}
              onChangeInputPublicKey={this.onChangeInputPublicKey}
              onChangeOutputPublicKey={this.onChangeOutputPublicKey}
              onChangeTransactionAmount={this.onChangeTransactionAmount}
              onChangeFee={this.onChangeFee}
              block={this.props.block}
            />
            {this.shouldValidateTransaction() &&
              !this.isValidTransaction() && (
                <Callout className="pt-intent-danger">
                  <p>{this.addingTransactionErrorMessage()}</p>
                </Callout>
              )}
          </Collapse>

          <Button
            iconName="pt-icon-add"
            className="pt-intent-primary pt-input-action"
            onClick={this.addTransaction}
            disabled={
              this.state.isAddingNewTransaction && !this.isValidTransaction()
            }
            text={
              this.state.isAddingNewTransaction
                ? "Add Transaction to Block"
                : "Create Transaction"
            }
          />

          {this.renderExternalTransactions()}
        </div>
      </div>
    );
  }
}
