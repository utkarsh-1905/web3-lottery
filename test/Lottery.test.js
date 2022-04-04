const Lottery = artifacts.require("Lottery");

contract("Lottery", (accounts) => {
  it("Should be deployed", async () => {
    const smartContract = await Lottery.deployed();
    console.log(smartContract.address);
    assert(smartContract.address !== undefined);
  });

  it("Should be able to enter the lottery", async () => {
    const lotteryContract = await Lottery.deployed();
    await lotteryContract.enter({
      from: accounts[1],
      value: web3.utils.toWei("0.002", "ether"),
    });
    const players = await lotteryContract.getPlayers();
    assert.equal(players[0], accounts[1], "Player should be entered");
  });

  it("Should allow multtple entries", async () => {
    const lotteryContract = await Lottery.deployed();
    await lotteryContract.enter({
      from: accounts[2],
      value: web3.utils.toWei("0.002", "ether"),
    });
    await lotteryContract.enter({
      from: accounts[3],
      value: web3.utils.toWei("0.002", "ether"),
    });
    await lotteryContract.enter({
      from: accounts[4],
      value: web3.utils.toWei("0.002", "ether"),
    });
    await lotteryContract.enter({
      from: accounts[5],
      value: web3.utils.toWei("0.002", "ether"),
    });
    await lotteryContract.enter({
      from: accounts[6],
      value: web3.utils.toWei("0.002", "ether"),
    });
    const players = await lotteryContract.getPlayers();
    assert.equal(players[1], accounts[2]);
    assert.equal(players[2], accounts[3]);
    assert.equal(players[3], accounts[4]);
    assert.equal(players[4], accounts[5]);
    assert.equal(players[5], accounts[6]);
    assert.equal(6, players.length, "6 Players should have been entered");
  });

  it("Shall require minimum of 0.002 ether to enter into the lottery", async () => {
    const lottery = await Lottery.deployed();
    try {
      await lottery.enter({
        from: accounts[1],
        value: 0,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
