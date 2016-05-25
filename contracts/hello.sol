
// Sample
contract Hello {
  address owner;
  string public name = 'hey there';
  uint8[3] public array = [1,2,3];

  function Hello() {
    owner = msg.sender;
  }

  function fromArray(uint8 index) constant returns (uint8) {
    return array[index];
  }

  function say() constant returns(string n) {
    return "hello";
  }
}
