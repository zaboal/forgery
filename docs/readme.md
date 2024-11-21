# ERC-20 Forgery Protocol

Zero-knowldge app for forgers and passers based on Railgun

sd

## Overview

```mermaid
---
title: Overview of ERC-20 Forgery Protocol
---

sequenceDiagram

%% ======== PARTICIPANTS ========
participant d as DEX

box rgba(255, 255, 0, 0.25) Interested parties
actor f as Passer
actor t as Forger
end

participant fy as Forgery
actor r as Mark
%% ===== END OF PARTICIPANTS ====

t ->>+ fy: Reassignes ownership <br /> over the fourrée
f <<->> d: Swap DAI for FC;
Note over f, d: Increases price of the FC 
f <<->> d: Swap the FC for a wrapped fourrée
f ->>+ fy: Transfer the fourrée to Receiver
fy ->> fy: Unwrap the fourrée
fy -->>- r: Transfer the fourrée to Receiver
opt The FC is overpriced
fy <<-->> d: Rebalance the pool
Note over fy, d: Decreases price of the FC
fy -->>- t: Transfer the received DAIs
end 

```

* Forger reassigness the owneship of its fourrée over to Forgery
  and receives regular rewards based on its usage.
* Flasher

### Tokenomics

```mermaid
flowchart RL

  subgraph DEX
    ft["Forgery Coin"]
    -->fwf["Forgery Wrapped Fourrée"]
    -->ft
  end

  fwf -..-> f["Fourrée"]
```

#### Fourrée

Fr is an ownable token that mimics another popular one --- the referent.
The best Fr is the closest to its referent overview at [Blockscan](https://blockscan.com).

> Do not confuse with ["Flash"](https://bitcointalk.org/index.php?topic=5339511.0) which is actually an attempt to scam scammers. The idea of fake transactions that live for up to a half of a year is impossible.

#### Forgery Wrapped Fourrée

FWCs are deployed along with fourrée ownership reassignment over to the Forgery.

Passers use `withdrawTo(address account, uint256 value)` as in [`ERC20Wrapper.sol`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Wrapper.sol) to unleash the token onto the mark.

#### Forgery Coin

Passers buy the FCs to pay for prefixed with "fw" versions of the tokens owned by the Forgery on a DEX and unwrap them afterwards.

FCs can be bought on the same DEX for [DAI](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f)
or earned when a fourrée is bought and unwrapped by the forger.

### Fourrée Owneship

### Security Issues

#### Anonymity of Forgers and Passers

#### Marking of Fourrée as "Scam"

### Revenue model

The protocol does't have any own fees and treasures.
The mission is to create a protocol for forgers and passers, not a business.

Contracts development is paid by using its frontend, where is a built-in host tipping.

[^1]: https://eips.ethereum.org/EIPS/eip-173
