const GreeterContract = artifacts.require("Greeter");

contract("Greeter", (accounts) => {
  it("has been deployed successfully", async () => {
    const greeter = await GreeterContract.deployed();
    assert(greeter, "contract was not deployed");
  });

  describe("greet()", () => {
    it("returns 'Hello World!'", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = "Hello World!";
      const actual = await greeter.greet();
      assert.equal(actual, expected, "greeted with 'Hello Wolrd!'");
    });
  });

  describe("owner()", () => {
    it("returns the address of the owner", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();
      assert(owner, "the current owner");
    });

    it("matches the address that originally deployed the contract", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();
      const expected = accounts[0];
      assert.equal(owner, expected, "mutches address used to deploy contract");
    });
  });
});

contract("Greeter: Update greeting", (accounts) => {
  describe("setGreeting(string)", () => {
    describe("when message is sent by the owner", () => {
      it("sets greeting to passed in string", async () => {
        const greeter = await GreeterContract.deployed();
        const expected = "The owner changed the message";
        await greeter.setGreeting(expected);
        const actual = await greeter.greet();
        assert.equal(actual, expected, "greeting updated");
      });
    });
    describe("when message is sent by another account", () => {
      it("does not set the greeting", async () => {
        const greeter = await GreeterContract.deployed();
        try {
          await greeter.setGreeting("Not the owner", { from: accounts[1] });
        } catch (err) {
          const errMsg = "Ownable: caller is not the owner";
          assert.equal(err.reason, errMsg, "greeting should not update");
          return;
        }
        assert(false, "greeting should not update");
      });
    });
  });
});
