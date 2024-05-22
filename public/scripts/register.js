document.getElementById('btn_register').addEventListener('click', async (e) => {

    e.preventDefault()

    const data = JSON.stringify({
        email: document.getElementById('email').value === "" ? undefined : document.getElementById('email').value,
        username: document.getElementById('username').value === "" ? undefined : document.getElementById('username').value,
        password: document.getElementById('password').value === "" ? undefined : document.getElementById('password').value,
        photo: document.getElementById('photo_url').value === "" ? undefined : document.getElementById('photo_url').value
    })

    const fetchOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: data
    }

    let response = await fetch('/api/sessions/register', fetchOptions)
    response = await response.json()

    if(response.statusCode === 201){

        setTimeout(()=>{
            location.replace('/')
        }, 1500)

        Swal.fire({
            title: response.message,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        })
    }
    else 
    {
        Swal.fire({
            title: response.message,
            icon: "error",
            timer: 2500,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        })
    }
})