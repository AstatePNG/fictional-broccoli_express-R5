import { db } from './database.js'
import { questionsTable } from './schema.js'

async function seed() {
    try {
        console.log('Database seeding starting ... 😎😎😎😎😎')

        await db.delete(questionsTable)

        const seedQuestions = [
			{
				question: 'Quelle est la capitale de la France?',
				answer: 'Paris',
				difficulty: 'easy'
			},
			{
				question: 'Quel est le plus grand océan du monde?',
				answer: "L'océan Pacifique",
				difficulty: 'medium'
			},
			{
				question: 'Qui a écrit "Les Misérables"?',
				answer: 'Victor Hugo',
				difficulty: 'difficult'
			},
            {
                question: 'Qui a du caca kaki collé au cucu ?',
                answer: 'XXX. Il revient il va aux toilettes',
                difficulty: 'medium'
            }
		]

        await db.insert(questionsTable).values(seedQuestions)

        console.log('🥶🥵🥶🥵🥶 Database seeded successfully 🥵🥶🥵🥶🥵')
    } catch (error) {
        console.log('Error happened during the database seeding 😱😱😱😱😱😱', error)
    }
}

seed()