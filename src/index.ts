import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";


// const user = User.buildUser({ name: 'Name', age: 20 })

// const root = document.getElementById('root')

// if (root !== null) {
//     const userEdit = new UserEdit(root, user)
//     userEdit.render()
// }
// else throw new Error('No root element found')

const users = new Collection('http://localhost:3000/users',
    (json: UserProps) => {
        return User.buildUser(json)
    })

users.on('change', () => {
    const root = document.getElementById('root')

    if (root)
        new UserList(root, users).render()
})

users.fetch()

