import Wallet from "../core/Wallet";

export default class WalletController {
  static async balance(request, response) {
    const wallet = new Wallet(request.user);
    const balance = await wallet.getBalance();
    response.send({ amount: balance });
  }
}
