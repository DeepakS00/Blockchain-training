// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract VicksCoin is IERC20 {
    string public _name;
    string public _symbol;
    uint8 public _decimals;
    uint256 public _totalSupply;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;

    constructor() {
        _name = "VicksCoin";
        _symbol = "VIK";
        _decimals = 18;
        _totalSupply = 5000 * 10 ** _decimals;
        balances[msg.sender] = _totalSupply;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    function transfer(
        address _receiver,
        uint256 _amount
    ) external returns (bool) {
        require(_receiver != address(0), "Receiver's address is not valid");
        require(_amount <= balances[msg.sender], "Insufficient balance");

        balances[msg.sender] -= _amount;
        balances[_receiver] += _amount;

        emit Transfer(msg.sender, _receiver, _amount);
        return true;
    }

    function allowance(
        address _owner,
        address _spender
    ) public view returns (uint256) {
        return allowances[_owner][_spender];
    }

    function approve(
        address _spender,
        uint256 _amount
    ) external returns (bool) {
        require(_spender != address(0), "Invalid spender address");

        allowances[msg.sender][_spender] = _amount;

        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    function transferFrom(
        address _sender,
        address _recipient,
        uint256 _amount
    ) external returns (bool) {
        require(_sender != address(0), "Invalid sender address");
        require(_recipient != address(0), "Invalid recipient address");
        require(_amount <= balances[_sender], "Insufficient balance");
        require(
            _amount <= allowances[_sender][msg.sender],
            "Insufficient allowance"
        );

        allowances[_sender][msg.sender] -= _amount;
        balances[_sender] -= _amount;
        balances[_recipient] += _amount;

        emit Transfer(_sender, _recipient, _amount);
        return true;
    }

    function mint(uint256 _amount) internal {
        balances[msg.sender] += _amount * 10 ** _decimals;
        _totalSupply += _amount * 10 ** _decimals;
        emit Transfer(address(0), msg.sender, _amount);
    }

    function burn(uint256 _amount) internal {
        require(
            balances[msg.sender] >= _amount,
            "Entered amount is greater than the available balance"
        );
        balances[msg.sender] -= _amount;
        _totalSupply -= _amount;
        emit Transfer(msg.sender, address(0), _amount);
    }
}