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