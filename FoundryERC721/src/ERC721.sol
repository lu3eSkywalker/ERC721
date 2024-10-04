// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ERC721 {
    string public name;
    string public symbol;

    uint256 public nextTokenIdToMint;
    address public contractOwner;

    // token id => owner
    mapping(uint256 => address) internal _owners;

    // owner => token count
    mapping(address => uint256) internal _balances;

    // token id => approved address
    mapping(uint256 => address) internal _tokenApprovals;

    // owner => (operator => yes/no)
    mapping(address => mapping(address => bool)) internal _operatorApprovals;

    // token id => token uri
    mapping(uint256 => string) _tokenUris;

    struct Escrow {
        address escrower; // The token owner who places the token in escrow
        address recipient; // The recipient who will receive the token conditions are met
        uint256 price; // The price at which the token will be sold
        bool isActive; // Status of the escrow (active or not)
    }

    // token id => escrow struct
    mapping(uint256 => Escrow) public escrows;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );
    event Approval(
        address indexed _owner,
        address indexed _approved,
        uint256 indexed _tokenId
    );
    event ApprovalForAll(
        address indexed _owner,
        address indexed _operator,
        bool _approved
    );

    event EscrowCreated(
        address indexed _escrower,
        address indexed _recipient,
        uint256 indexed _tokenId,
        uint256 price
    );
    event EscrowCancelled(address indexed _escrower, uint256 indexed _tokenId);
    event EscrowCompleted(address indexed _recipient, uint256 indexed _tokenId);

    constructor(string memory _name, string memory _symbol, address _owner) {
        name = _name;
        symbol = _symbol;
        nextTokenIdToMint = 0;
        contractOwner = _owner;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0), "!Add0");
        return _balances[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address) {
        return _owners[_tokenId];
    }

    function mintTo(address _to, string memory _uri) public {
        require(_to != address(0), "!ToAdd0");
        _owners[nextTokenIdToMint] = _to;
        _balances[_to] += 1;
        _tokenUris[nextTokenIdToMint] = _uri;
        emit Transfer(address(0), _to, nextTokenIdToMint);
        nextTokenIdToMint += 1;
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "!Auth");
        _transfer(_from, _to, _tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        require(ownerOf(_tokenId) == _from, "!Owner");
        require(_to != address(0), "!ToAdd0");

        _balances[_from] -= 1;
        _balances[_to] += 1;
        _owners[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) public {
        address owner = ownerOf(_tokenId);
        require(msg.sender == owner, "!Auth");

        _tokenApprovals[_tokenId] = _approved;
        emit Approval(owner, _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) public {
        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function tokenURI(uint256 _tokenId) public view returns (string memory) {
        return _tokenUris[_tokenId];
    }

    function totalSupply() public view returns (uint256) {
        return nextTokenIdToMint;
    }

    //Escrow for trade between known parties

    // Create an escrow agreement
    function createEscrow(
        uint256 _tokenId,
        address _recipient,
        uint256 _price
    ) public {
        require(ownerOf(_tokenId) == msg.sender, "!Auth");
        require(_recipient != address(0), "!RecipAdd0");
        require(_price > 0, "!Price");

        // Transfer token to contract for escrow
        _transfer(msg.sender, address(this), _tokenId);

        // Set up escrow
        escrows[_tokenId] = Escrow({
            escrower: msg.sender,
            recipient: _recipient,
            price: _price,
            isActive: true
        });

        emit EscrowCreated(msg.sender, _recipient, _tokenId, _price);
    }

    // Cancel Escrow
    function cancelEscrow(uint256 _tokenId) public {
        Escrow memory escrow = escrows[_tokenId];
        require(escrow.escrower == msg.sender, "!Escrower");
        require(escrow.isActive, "!Active");

        // Return token to escrower
        _transfer(address(this), escrow.escrower, _tokenId);

        // Mark escrow as inactive
        escrows[_tokenId].isActive = false;

        emit EscrowCancelled(msg.sender, _tokenId);
    }

    // Complete escrow: recipient claims teh token by sending the agreed price
    function completeEscrow(uint256 _tokenId) public payable {
        Escrow memory escrow = escrows[_tokenId]; // This gets a particular escrow that holds the escrow information
        require(escrow.recipient == msg.sender, "!Recip");
        require(escrow.isActive, "!Active");
        require(msg.value == escrow.price, "!Price");

        // Transfer payment to escrower
        payable(escrow.escrower).transfer(msg.value);

        // Transfer token to recipient
        _transfer(address(this), msg.sender, _tokenId);

        // Mark escrow as inactive
        escrows[_tokenId].isActive = false;

        emit EscrowCompleted(msg.sender, _tokenId);
    }
}
