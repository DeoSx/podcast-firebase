export function getAuthForm() {
	return `
		<form class="mui-form" id="auth-form">
	        <div class="mui-textfield mui-textfield--float-label">
	          <input id="email" type="email" required>
	          <label for="question-input">Email</label>
	        </div>
	        <div class="mui-textfield mui-textfield--float-label">
	          <input id="password" type="password" required>
	          <label for="question-input">Пароль</label>
	        </div>
	        <button 
	          id="auth-submit" 
	          type="submit" 
	          class="mui-btn mui-btn--raised mui-btn--primary" 
	        >Войти</button>
      	</form>`
}

export function authWithEmailAndPassword(email, password) {
	const apiKey = 'AIzaSyAD5NWgYsDC3IKAHB1YyOD63LPpPV9Ik2o'
	return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
		method: 'POST',
		body: JSON.stringify({
			email, password,
			returnSecureToken: true
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => data.idToken)
}