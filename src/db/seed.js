import { email } from 'zod'
import { db } from './database.js'
import { questionsTable, usersTable } from './schema.js'
import bcrypt from 'bcrypt'

async function seed() {
    try {
        console.log('Database seeding starting ... 😎😎😎😎😎')

        await db.delete(questionsTable)
		await db.delete(usersTable)

        const seedUsers = [
			{
				email: "super.mail@mail.fr",
				username: "SuperMail",
				password: bcrypt.hashSync("mot2pass", 10)
			},
			{
				email: "fandutdf@fanmail.com",
				username: "EricPorcq",
				password: bcrypt.hashSync("Caen2025Forever", 10)
			}
		]

		const usersIds = await db.insert(usersTable).values(seedUsers).returning({ id: usersTable.id})

		const seedQuestions = [
			{
				question: 'Quelle est la capitale de la France?',
				answer: 'Paris',
				difficulty: 'easy',
				createdBy: usersIds[0].id
			},
			{
				question: 'Quel est le plus grand océan du monde?',
				answer: "L'océan Pacifique",
				difficulty: 'medium',
				createdBy: usersIds[0].id
			},
			{
				question: 'Qui a écrit "Les Misérables"?',
				answer: 'Victor Hugo',
				difficulty: 'difficult',
				createdBy: usersIds[1].id
			}
		]

        await db.insert(questionsTable).values(seedQuestions)

        console.log('🥶🥵🥶🥵🥶 Database seeded successfully 🥵🥶🥵🥶🥵')
    } catch (error) {
        console.log('Error happened during the database seeding 😱😱😱😱😱😱', error)
    }
}

seed()