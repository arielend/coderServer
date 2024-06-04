const deleteCartItem = async (id) => {

    const data = JSON.stringify({
        _id: id
    })

    const fetchOptions = {
        method: 'DELETE',
        body: data,
        headers: { "Content-Type": "application/json" }
    }

    const url = '/api/carts/:id'

    let response = await fetch(url, fetchOptions)
    response = await response.json()

    if(response.statusCode === 200 ) {

        setTimeout(()=>{
            location.replace('/carts')
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

const clearCart = async () => {

    const fetchOptions = {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    }

    const url = '/api/carts'

    let response = await fetch(url, fetchOptions)
    response = await response.json()

    if(response.statusCode === 204 ) {

        setTimeout(()=>{
            location.replace('/carts')
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

const proceedPay = async () => {

    const fetchOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    }

    const url = '/api/tickets'

    let response = await fetch(url, fetchOptions)
    response = await response.json()

    if(response.statusCode === 201 ) {

        setTimeout(()=>{
            location.replace('/carts')
        }, 1500)

        Swal.fire({
            title: response.message,
            icon: "success",
            timer: 2500,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        })        
    }
    else{
        Swal.fire({
            title: response.message,
            icon: "error",
            timer: 2500,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        })
    }
}