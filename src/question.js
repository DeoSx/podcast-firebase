export class Question {
	static create(question) {
		return fetch('https://podcast-nativejs.firebaseio.com/questions.json', {
			method: 'POST',
			body: JSON.stringify(question),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				question.id = response.name
				return question
			})
			.then(addToLocalStorage)
			.then(Question.renderList)
	}

	static renderList() {
		const questions = getFromLocalStorage()
		const html = questions.length
			? questions.map(toList).join('')
			: `<div class="mui--text-black-54">Вы пока не задали вопросы</div>`

		const list = document.getElementById('list')

		list.innerHTML = html
	}
	static listToHTML(questions) {
		return questions.length
			? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
			: '<p>Вопросов пока нет</p>'
	}

	static fetch(token) {
		if (!token) {
			return Promise.resolve(`<p class="error">У вас нет токены</p>`)
		}
		return fetch(`https://podcast-nativejs.firebaseio.com/questions.json?auth=${token}`)
			.then(response => response.json())
			.then(response => {
				if (response && response.error) {
					return `<p class="error">${response.error}</p>`
				}

				return response ? Object.keys(response).map(key => ({
					...response[key],
					id: key
				})) : []
			})
	}
}

function addToLocalStorage(question) {
	const all = getFromLocalStorage()
	all.push(question)
	localStorage.setItem('questions', JSON.stringify(all))
}

function getFromLocalStorage() {
	return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toList(question) {
	return `
		<div class="mui--text-black-54">
			${new Date(question.date).toLocaleDateString()}
			${new Date(question.date).toLocaleTimeString()}
		</div>
      	<div>${question.text}</div>
	`
}