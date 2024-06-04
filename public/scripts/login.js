const btn_login = document.getElementById('btn_login')
const passInput = document.getElementById('password')

btn_login.addEventListener("click", login)
passInput.addEventListener('keyup', enterToLogin)

function enterToLogin (e) {
    if(e.key == 'Enter'){
        login()
    }
}

async function login () {

    const data = JSON.stringify({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    })

    const fetchOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: data
    }

    let response = await fetch('/api/sessions/login', fetchOptions)
    response = await response.json()

    if(response.statusCode === 200 ) {

        setTimeout(()=>{            
            return location.replace('/')            
        }, 1500)

        Swal.fire({
            title: response.message,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        })        
    }
    else{
        Swal.fire({
            title: response.message,
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        })
    }
}