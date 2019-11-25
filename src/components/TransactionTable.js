import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
import Key from "./Key";
import Signature from "./Signature";

export default class TransactionTable extends Component {
  static defaultProps = {
    noTransactionsText: "",
    transactionAction: () => {}
  };
  render() {
    if (Object.keys(this.props.transactions).length === 0)
      return <p>{this.props.noTransactionsText}</p>;

    return (
      <table>
        <thead>
          <tr>
            <th>Transaction Hash</th>
            <th>Amount</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(this.props.transactions).map(tx => {
            return (
              <tr key={tx.hash}>
                <td>
                  <textarea
                    className="pt-input"
                    spellCheck={false}
                    style={{ width: "150px", height: "75px" }}
                    value={tx.hash}
                    readOnly
                  />
                </td>
                
                <td
                  style={{
                    height: "100px",
                    width: "100px",
                    fontSize: "34px",
                    textAlign: "center"
                  }}
                >
                  {tx.amount}
                </td>
                <td>
                  Fee ...<br/>
                  From ...<br/>
                  To ...<br/>
                  Signature ...
                </td>

                <td>{this.props.transactionAction(tx)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
