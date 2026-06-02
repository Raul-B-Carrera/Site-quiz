
let user = JSON.parse(sessionStorage.getItem('user'))

// validação de acesso direto
if(user === null){
    window.location.href = './erro.html'
}

if(user.email !== 'eve@gmail.com' || user.password !== '123456'){
    window.location.href = './erro.html'
}

let ps = document.querySelectorAll('p')
ps[0].textContent = `EMAIL: ${user.email}`
ps[1].textContent = `SENHA: ${user.password}`