import React, { Component } from "react";
import "./App.css";
import BlockchainWelcome from "./components/BlockchainWelcome";
import { Button } from "@blueprintjs/core";
import { action } from "./store";
import { Tooltip, Dialog } from "./components/walkthrough";

class App extends Component {
  state = {
    ownBlockchainName: ""
  };
  pickBlockchain = name => {
    action({ type: "PICK_BLOCKCHAIN", name });
  };
  render() {
    return (
      <div className="">
        <nav className="pt-navbar">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Build your own Blockchain</div>
            Made by&nbsp;<a
              href="https://twitter.com/nambrot"
              target="_blank"
              rel="noopener noreferrer"
            >
              @nambrot
            </a>
          </div>

          
        </nav>
        <Dialog step={0} title="Welcome!" quitWalkthroughVisible={true}>
          <div>
            <p>
              This is an interactive blockchain demo. Please see the{" "}
              <a
                href="https://github.com/nambrot/blockchain-in-js"
                target="_blank"
                rel="noopener noreferrer"
              >
                repo at github.com/nambrot/blockchain-in-js
              </a>{" "}
              to learn how to build this or just start playing around with this
              demo. Note that this is a distributed demo, so you can open up{" "}
              <a href="/" target="_blank" rel="noopener noreferrer">
                multiple tabs
              </a>{" "}
              of this app to simulate multiple participants. I have prepared a
              walkthrough for you that you can follow along, or if you are the
              more freedom-loving kind, you can quit and figure it out yourself.
            </p>
          </div>
        </Dialog>
        <div className="container" style={{ padding: 24 }}>
          {this.props.appState.selectedBlockchain === undefined && (
            <p>
              Learn more about blockchains. Start by picking or create a new
              blockchain in the top-right corner.
            </p>
          )}
          {this.props.appState.selectedBlockchain !== undefined && (
            <BlockchainWelcome
              blockchain={this.props.appState.selectedBlockchain}
              node={this.props.appState.node}
              identities={this.props.appState.identities}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
