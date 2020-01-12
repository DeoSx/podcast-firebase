import { isValid, createModal } from './utils.js'
import { Question } from './question.js'
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
	createModal('Авторизация', 'Текст для теста')
}