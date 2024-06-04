const user_id = document.getElementById('hidden_user_id').value
const product_id = document.getElementById('hidden_product_id').value
const product_price = document.getElementById('hidden_product_price').value
let product_quantity = document.getElementById('hidden_countValue').value

let btn_minus = document.getElementById('btn_minus')
let btn_plus = document.getElementById('btn_plus')
let counter = document.getElementById('counter')
let count = parseInt(counter.value)
let countValue = document.getElementById('hidden_countValue')

btn_minus.addEventListener('click', (e)=>{
    e.preventDefault()

    if(count > 0) {
        count--
        countValue.value = count
        counter.innerHTML = count        
    }
})

btn_plus.addEventListener('click', (e)=>{
    e.preventDefault()    
    count++
    countValue.value = count
    counter.innerHTML = count    
})

document.getElementById('btn_addToCart').addEventListener('click', async (e) => {
    e.preventDefault()

    if(count == 0) {

        Swal.fire({
            title: 'You need to add 1 item at least!',
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        })

        return false
    }

    const data = JSON.stringify({
        user_id,
        product_id,
        product_quantity: count
    })

    const fetchOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: data
    }

    const url = '/api/carts'

    let response = await fetch(url, fetchOptions)
    response = await response.json()

    if(response.statusCode === 201 ) {

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
            timer: 1500,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        })
    }
})
