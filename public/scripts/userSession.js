document.getElementById('btn_profile').addEventListener('click', async (e) => {

    e.preventDefault()

    let response = await fetch('/api/users/:id')
    response = await response.json()

    if(response.statusCode == 200) {        
        await fetch('/users/id:')
    }
})