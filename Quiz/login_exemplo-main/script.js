
// seleção dos elementos
let email = document.querySelector('#exampleFormControlInput1')
let password = document.querySelector('#inputPassword')
let btn = document.querySelector('.btn')

btn.addEventListener('click', login )



function login(){
     let emailValue = email.value
     let passwordValue = password.value

    // criar um json
     let user = {
        email: emailValue,
        password: passwordValue
    }

    sessionStorage.setItem('user', JSON.stringify(user))
    window.location.href = './page2.html'
}