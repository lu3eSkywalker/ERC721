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
        require(msg.sender == contractOwner, "Only Contract Owner can call this function");
        require(_to != address(0), "!ToAdd0");
        _owners[nextTokenIdToMint] = _to;
        _balances[_to] += 1;
        _tokenUris[nextTokenIdToMint] = _uri;
        emit Transfer(address(0), _to, nextTokenIdToMint);
        nextTokenIdToMint += 1;
    }

    function transferFunction(address _from, address _to, uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "Caller is not NFT Owner");
        _transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        address owner = ownerOf(_tokenId);
        // Checking that the caller is the owner, the approved address for the token, or an operator for the owner
        require(
            msg.sender == owner ||
                _tokenApprovals[_tokenId] == msg.sender ||
                _operatorApprovals[owner][msg.sender],
            "!Auth"
        );
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
}