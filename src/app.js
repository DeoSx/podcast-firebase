import { isValid, createModal } from './utils.js'
import { Question } from './question.js'
import { getAuthForm, authWithEmailAndPassword } from './authForm.js'
import './style.css'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const modalBtn = document.getElementById('modal-btn')

window.addEventListener('onload', Question.renderList())
modalBtn.addEventListener('click', openModal)
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
	submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
	event.preventDefault()

	if (isValid(input.value)) {
		const question = {
			text: input.value.trim(),
			date: new Date().toJSON()
		}
		submitBtn.disabled = true
		// Async function
		Question.create(question).then(() => {
			input.value = ''
			input.className = ''
			submitBtn.disabled = false
		})
	}
}

function openModal() {
	createModal('Авторизация', getAuthForm())
	document.querySelector('#auth-form').addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(event) {
	event.preventDefault()

	const btn = event.target.querySelector('button')
	const email = event.target.querySelector('#email').value
	const password = event.target.querySelector('#password').value

	btn.disabled = true
	authWithEmailAndPassword(email, password)
		.then(Question.fetch)
		.then(renderModalAfterAuth)
		.then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
	if (typeof content === 'string') {
		createModal('Ошибка', content)
	} else {
		createModal('Список вопросов', Question.listToHTML(content))
	}
}