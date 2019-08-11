import { UserModel } from "../models/User"

export const DEFAULT_USERNAME = 'bykof'
const DEFAULT_PASSWORD = 'f1910feebe29a55cab5f5b83a204c1c5b0cf0e9adb9218598608aee813a55663'

export default class UserSetup {
  static async setup() {
    const foundUser = await UserModel.findOne({ username: DEFAULT_USERNAME })
    if (foundUser) {
      return
    }

    const defaultUser = new UserModel()
    defaultUser.username = DEFAULT_USERNAME
    defaultUser.password = DEFAULT_PASSWORD
    await defaultUser.save()
  }
}
