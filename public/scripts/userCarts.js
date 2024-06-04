document.getElementById('btn_cart').addEventListener('click', async(e) => {

    const fetchOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    }

    const url = '/api/carts/:id'

    let response = await fetch(url, fetchOptions)
    response = await response.json()

    if(response.statusCode == 200) {
        
        setTimeout(()=>{
            location.replace('/')
        }, 2500)

        Swal.fire({
            title: response.message,
            icon: "info",
            toast: true,
            position: "top-end",
            timer: 2500,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        });
    }
})