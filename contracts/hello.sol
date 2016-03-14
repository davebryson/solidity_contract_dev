
// Sample
contract Hello {
  address owner;

  function Hello() {
    owner = msg.sender;
  }

  function say() constant returns(string n) {
    return "hello";
  }
}
