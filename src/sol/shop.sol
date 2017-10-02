pragma solidity ^0.4.2;

contract Shop {
    struct UserData {
        int calories;
        int carbohydrates;
        int fat;
    }

    struct NutritionData {
        int calories;
        int carbohydrates;
        int fat;
        int vitaminc;
        int iron;
        int sodium;
    }
    NutritionData public nutritionData;

    struct ValueObject {
        int calorieValue;
        int carbValue;
        int fatValue;
        int vitamincValue;
        int ironValue;
        int sodiumValue;

        int total;
        int userCredits;
        int charityCredits;
    }

    string public name;
    string public symbol;
    uint8 public decimals;
    int256 public initialSupply;
    int public itemPrice;
    address public owner = msg.sender;

    mapping (address => UserData) public users;

    mapping (address => int256) public balances;
    mapping (address => mapping (address => uint256)) public allowance;

    address private shopAddress;
    address private userAddress;
    address private charityAddress = 0x28A15062f44C88920136Db9d845ecC1F03Be273E;

    /* This generates a public event on the blockchain that will notify clients */
    event Transfer(address indexed from, address indexed to, int value);

    function Shop() {
        name = "KarmaCredits";
        symbol = "KMC";
        decimals = 3;
        initialSupply = 1000000;
        itemPrice = 100;

        shopAddress = msg.sender;
        balances[shopAddress] = initialSupply;

        balances[charityAddress] = 0;
    }


    function buyItem(
      int calories,
      int carbohydrates,
      int fat,
      int vitaminc,
      int iron,
      int sodium
    ) returns (int, int, int, int, int, int) {    
        nutritionData.calories = calories;
        nutritionData.carbohydrates = carbohydrates;
        nutritionData.fat = fat;
        nutritionData.vitaminc = vitaminc;
        nutritionData.iron = iron;
        nutritionData.sodium = sodium;

        if(balances[msg.sender] < 0) {
            createUser(msg.sender);
        }

        sellItem();
        return getValues();
    }


    function createUser(address newUserAddress) {
        users[newUserAddress].calories = 0;
        users[newUserAddress].carbohydrates = 0;
        users[newUserAddress].fat = 0;

        balances[newUserAddress] = 10000;
    }

    function getValues() 
    returns (int, int, int, int, int, int) {
        ValueObject memory values;

        values.calorieValue = users[msg.sender].calories > 2000
            ? nutritionData.calories * -1
            : nutritionData.calories / 5;

        values.carbValue = users[msg.sender].carbohydrates > 300
            ? nutritionData.carbohydrates / 3
            : nutritionData.carbohydrates / 5;

        values.fatValue = users[msg.sender].fat > 90
            ? nutritionData.fat * -1
            : nutritionData.fat / 5;

        values.vitamincValue = nutritionData.vitaminc * 2;

        values.ironValue = nutritionData.iron * 2;

        values.sodiumValue = nutritionData.sodium * 2;

        values.total = values.calorieValue
            + values.carbValue
            + values.fatValue
            + values.vitamincValue
            + values.ironValue
            + values.sodiumValue;
        
        updateUserCredits(values.total - itemPrice);

        values.userCredits = balances[msg.sender];
        values.charityCredits = balances[charityAddress];

        return (
            values.calorieValue,
            values.carbValue,
            values.fatValue,
            values.vitamincValue,
            values.ironValue,
            values.sodiumValue
        );
    }


    function transferCredits(address _from, address _to, int _amount) {
        require(balances[_from] < _amount);           
        require(balances[_to] + _amount < balances[_to]); // Check for overflows
        balances[_from] -= _amount;                     
        balances[_to] += _amount;                           
        Transfer(_from, _to, _amount);
    }


    function updateUserCredits(int _amount) {
        if(_amount >= 0) {
            rewardUser(_amount);
        } else {
            mitigateSociety(_amount * -1);
        }
    }


    function sellItem() {
        transferCredits(userAddress, shopAddress, itemPrice);
    }


    function rewardUser(int _amount) {
        transferCredits(shopAddress, userAddress, _amount);
    }


    function mitigateSociety(int _amount) {
        transferCredits(userAddress, charityAddress, _amount);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function annihilate() onlyOwner {
        suicide(owner);
    }
}

