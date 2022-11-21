let url = `http://localhost:3000`
document.getElementById('bookconsignment').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!localStorage.getItem('user_token')) {
        window.location.href = './login.html'
        return
    }
    fetch(`${url}/api/consignment/bookconsignment`, {
        method: 'POST',
        headers: {
            'auth_token': `${localStorage.getItem('user_token')}`
        },
        body: new URLSearchParams(new FormData(e.target))
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.status == 0) {
                alert('Consignment Booked')
                window.location.href =`./track.html?search=${res.id}`
            } else
                alert('Unable to book Consignment')
        })
        .catch((err) => {
            alert('Unable to book Consignment')
        })
})

if (!localStorage.getItem('user_token')) {
    window.location.href = './login.html'
}