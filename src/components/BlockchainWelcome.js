import React, { Component } from "react";
import BlockchainTree from "./BlockchainTree";
import IdentityListItem from "./IdentityListItem";
import { Tab2, Tabs2, Tooltip } from "@blueprintjs/core";
import WelcomeUTXOPoolTable from "./WelcomeUTXOPoolTable";
import "../App.css";
import AddIdentity from "./AddIdentity";
import { Tooltip as WalkthroughTooltip } from "./walkthrough";
import { Button, Dialog } from "@blueprintjs/core";


class BlockchainWelcome extends Component {

  state = {
    open: null
  };
  open = () => {
    this.setState({ open:true });
  };
  close = () => {
    this.setState({ open: null });
  };

  render() {
    return (
      <div>
        <div style={{ width: "100%", display: "inline-block" }}>
          <h3>知识币</h3>

          <Dialog
            isOpen={this.state.open !== null}
            onClose={this.close}
            transitionDuration={50}
            title="UTXO Pool"
            style={{ width: "100%" }}
          >
            
            <div
                style={{
                  width: "100%",
                  display: "inline-block",
                  verticalAlign: "top",
                  paddingLeft:"20px"
                }}
              >
                <Tabs2>
                  <Tab2
                    id="utxo"
                    title="UTXO Pool"
                    panel={
                      <div>
                        <p>
                          This is the{" "}
                          <Tooltip
                            className="pt-tooltip-indicator"
                            inline={true}
                            content={
                              "A UTXO pool is a list of UTXOs, which are 'owned' by the public key, and can be 'spent' with the corresponding private key."
                            }
                          >
                            UTXO pool
                          </Tooltip>{" "}
                          for the longest chain. You can click on UTXOs to broadcast a
                          transaction.
                        </p>
                        {this.props.blockchain.maxHeightBlock().isRoot() ? (
                          <p>The root block has no unspent transaction outputs</p>
                        ) : (
                          <WelcomeUTXOPoolTable blockchain={this.props.blockchain} />
                        )}
                      </div>
                    }
                  />
                </Tabs2>
                <hr />
                <Tabs2>
                  <Tab2
                    id="nodes"
                    title="用户列表"
                    panel={
                      <WalkthroughTooltip
                        content={
                          <p style={{ maxWidth: "250px" }}>
                            Ownership of coins is established via control over public
                            keys with their corresponding private keys. Here you find
                            the pairs that you generated and thus control exclusively.
                            You can change their names for your convenience
                          </p>
                        }
                        nextLabel="Next"
                        step={5}
                        quitWalkthroughVisible={true}
                      >
                        <div>
                          {Object.values(this.props.identities).map(identity => (
                            <IdentityListItem
                              key={identity.publicKey}
                              identity={identity}
                            />
                          ))}
                          {/* <AddIdentity /> */}
                        </div>
                      </WalkthroughTooltip>
                    }
                  />
                </Tabs2>
              </div>
          </Dialog>
          
          <Button
              text="UTXO Pool"
              className="pt-intent-primary pt-input-action"
              onClick={this.open}
          />
              
          <BlockchainTree
            blockchain={this.props.blockchain}
            identities={this.props.identities}
            node={this.props.node}
          />
        </div>
        
      </div>
    );
  }
}

export default BlockchainWelcome;
