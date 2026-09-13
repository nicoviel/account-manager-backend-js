
import { accountRepository } from '../repositories/accountRepository.js';
import { userRepository } from '../repositories/userRepository.js';
import prisma from '../config/db.js'; 
import { User } from '../models/user.model.js';

export const userService = {

    login: async (login: string, password: string): Promise<User | null> => {
        const user: User | null = await userRepository.findByUser(login);
        if (!user) {
            console.error("User not found");
            return null;
        }
        // Vérification du mot de passe
        const isPasswordValid = password === user.password;
        if (!isPasswordValid) {
            console.error("Invalid password");
            return null;
        }
        return user;
    },

    createUser: async (userData: { login: string; email: string; password: string; firstName: string; lastName: string }, amount: number): Promise<User> => {
        const user: User | null = await userRepository.findByUser(userData.login);
        if (!user) {
             return await prisma.$transaction(async (tx: any) => {
                
                // Première écriture : Création de l'utilisateur (on passe 'tx')
                const savedUser = await userRepository.create(userData, tx);
                console.log("User created in transaction:", savedUser);

                // Préparation de l'objet de compte
                const accountToSave = {
                    currentAmount: amount,
                    futureAmountWithCredit: amount,
                    futureAmountWithoutCredit: amount,
                    user: {
                        connect: { id: savedUser.id }
                    }
                };

                // Deuxième écriture : Création du compte (on ajoute impérativement 'await' et 'tx')
                const accountSaved = await accountRepository.create(accountToSave, tx);
                console.log("Account created in transaction:", accountSaved);   

                // Si tout s'est bien passé, la transaction est validée (COMMIT)
                return savedUser;
            });
        }
        return {} as User;

    }
}