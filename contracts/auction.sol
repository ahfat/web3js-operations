// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
  
contract Auction {
    address internal auction_owner;
    uint256 public auction_start;
    uint256 public auction_end;
    uint256 public highestBid;
    address public highestBidder;
    
    enum auction_state {
        CANCELLED, STARTED
    } 

    struct car {
        string Brand;
        string Rnumber;
    } 

    car public Mycar;
    address[] bidders;

    mapping(address => uint) public bids;
    auction_state public STATE;

    modifier an_ongoing_auction() {
        require(block.timestamp <= auction_end);
        _;
    } 
    
    modifier only_owner() {
        require(msg.sender == auction_owner);
        _;
    }

    function bid() public payable virtual returns (bool){}
    function withdraw() public virtual returns (bool){}
    function cancel_auction() external virtual returns (bool){}
    
    event BidEvent(address indexed highestBidder, uint256 highestBid);
    event WithdrawalEvent(address withdrawer, uint256 amount);
    event CanceledEvent(string message, uint256 time);
}