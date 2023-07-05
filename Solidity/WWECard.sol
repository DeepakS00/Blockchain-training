// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface ERC721 {
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

    function balanceOf(address _owner) external view returns (uint256);

    function ownerOf(uint256 _tokenId) external view returns (address);

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes calldata _data
    ) external payable;

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable;

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable;

    function approve(address _approved, uint256 _tokenId) external payable;

    function setApprovalForAll(address _operator, bool _approved) external;

    function getApproved(uint256 _tokenId) external view returns (address);

    function isApprovedForAll(
        address _owner,
        address _operator
    ) external view returns (bool);
}

contract MyWWECardToken {
    string public _name;
    string public _symbol;

    mapping(uint256 => address) private tokenOwners;
    mapping(address => uint256) private tokenBalances;
    mapping(uint256 => address) private tokenApprovals;
    mapping(address => mapping(address => bool)) private operatorApprovals;

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

    constructor() {
        _name = "MyWWECards";
        _symbol = "WWE";
    }

    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0), "Invalid address");
        return tokenBalances[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        address owner = tokenOwners[_tokenId];
        require(owner != address(0), "Token not found");
        return owner;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable {
        address owner = tokenOwners[_tokenId];
        require(
            owner == msg.sender ||
                tokenApprovals[_tokenId] == msg.sender ||
                operatorApprovals[owner][msg.sender],
            "Transfer not authorized"
        );
        require(owner == _from, "Invalid sender address");
        require(_to != address(0), "Invalid recipient address");

        tokenOwners[_tokenId] = _to;
        tokenBalances[_from] -= 1;
        tokenBalances[_to] += 1;

        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external payable {
        address owner = tokenOwners[_tokenId];
        require(
            owner == msg.sender || operatorApprovals[owner][msg.sender],
            "Approval not authorized"
        );
        tokenApprovals[_tokenId] = _approved;
        emit Approval(owner, _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) external view returns (address) {
        return tokenApprovals[_tokenId];
    }

    function isApprovedForAll(
        address _owner,
        address _operator
    ) external view returns (bool) {
        return operatorApprovals[_owner][_operator];
    }

    function _mint(address to, uint256 id) internal {
        require(to != address(0), "mint to zero address");
        require(tokenOwners[id] == address(0), "already minted");

        tokenBalances[to]++;
        tokenOwners[id] = to;

        emit Transfer(address(0), to, id);
    }

    function _burn(uint256 id) internal {
        address owner = tokenOwners[id];
        require(owner != address(0), "not minted");

        tokenBalances[owner] -= 1;

        delete tokenOwners[id];
        delete tokenApprovals[id];

        emit Transfer(owner, address(0), id);
    }
}
