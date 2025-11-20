import { email } from 'zod'
import { db } from './database.js'
import { categoriesTable, questionsTable, usersTable } from './schema.js'
import bcrypt from 'bcrypt'

async function seed() {
    try {
        console.log('Database seeding starting ... 😎😎😎😎😎')

		await db.delete(usersTable)
		await db.delete(categoriesTable)
        await db.delete(questionsTable)

        const seedUsers = [
			{
				email: "super.mail@mail.fr",
				username: "SuperMail",
				password: bcrypt.hashSync("mot2pass", 10),
				role: "USER"
			},
			{
				email: "fandutdf@fanmail.com",
				username: "EricPorcq",
				password: bcrypt.hashSync("Caen2025Forever", 10),
				role: "ADMIN"
			}
		]

		const usersIds = await db.insert(usersTable).values(seedUsers).returning({ id: usersTable.id})

		const seedCategories = [
			{
				title: 'Géographie',
				description: 'Connaissances autour de la géographie : ville, pays, continent, océan, fleuve, rivière, étang, lac, piscine municipale, marais, monument'
			},
			{
				title: 'Littérature',
				description: 'Connaissances autour des œuvres littéraires et de leurs auteurs'
			},
			{
				title: 'Tour de France',
				description: 'Catégorie fan crée par M. Porcq'
			}
		]
		
		const questionsId = await db.insert(categoriesTable).values(seedCategories).returning({ id: categoriesTable.id})

		const seedQuestions = [
			{
				question: 'Quelle est la capitale de la France?',
				answer: 'Paris',
				difficulty: 'easy',
				category: questionsId[0].id,
				createdBy: usersIds[0].id
			},
			{
				question: 'Quel est le plus grand océan du monde?',
				answer: "L'océan Pacifique",
				difficulty: 'medium',
				category: questionsId[0].id,
				createdBy: usersIds[0].id
			},
			{
				question: 'Qui a écrit "Les Misérables"?',
				answer: 'Victor Hugo',
				difficulty: 'hard',
				category: questionsId[1].id,
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