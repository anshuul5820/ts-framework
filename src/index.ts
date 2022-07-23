import { User } from "./models/User";

const user = new User({ name: 'name5', age: 5 })

user.on('save', () => console.log(user))

user.save()