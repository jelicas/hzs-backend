import { hash } from "../utils/util-functions.js";
import { userModel } from "../database/models/user.model.js";
import { createAccessToken } from "../utils/jwt.js";

export const userController = {

    async register(request, response) {
        try {
            const body = request.body;
            let username = body.username;
            let password = body.password;
            let firstName = body.firstName;
            let lastName = body.lastName;
            let email = body.email;
            let description = body.description;

            if (!username || !password || !firstName || !lastName || !email) {
                return response.status(400).json({ message: "Required properties missing for register!" });
            }

            const existingUser = await userModel.findOne({ username });

            if (existingUser) {
                console.log(existingUser)
                console.log("User already exists");
                response.status(400).send();
                return;
            }

            password = hash(password);

            const user = await userModel.create({ username, password, firstName, lastName, email, phoneNumber, description });

            console.log(`User ${username} successfully registered`);

            const token = createAccessToken({ username: user.username, id: user.id, firstName, lastName });

            response.cookie("token", token);

            response.status(200).json({ token });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: "Error registering" });
        }
    },

    async login(request, response) {
        try {
            const body = request.body;

            let username = body.username;
            let password = body.password;

            if (!username || !password) return response.status(400).json({ message: "Required properties missing for login (username, password)" })

            const user = await userModel.findOne({ username });

            if (!user) return response.status(404).json({ message: `User with username ${username} does not exists!` })

            const hashedPassword = hash(password);

            if (user.password != hashedPassword) return response.status(400).json({ message: `Invalid password for user: ${username}` })

            console.log(`User ${username} successfully logged in`);

            const token = createAccessToken({
                username: user.username,
                id: user.id,
            });

            response.cookie("token", token);

            response.status(200).json({ token });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: "Error logging in" })
        }
    }
};