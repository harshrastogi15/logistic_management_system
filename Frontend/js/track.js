let url = `http://localhost:3000`
queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

// console.log(urlParams.get('search'))

let trackid = urlParams.get('search');

function track() {
    fetch(`${url}/api/consignment/trackconsignment`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: trackid
        })
    })
        .then((res) => res.json())
        .then((res) => {
            // console.log(res);
            if (res.status == 0) {
                showconsignment(res.data)
            } else {
                alert('Unable to fetch Consignment or This Track id is not valid')
                window.location.href = `./index.html`
            }
        })
        .catch((err) => {
            alert('Unable to fetch Consignment or This Track id is not valid')
            window.location.href = `./index.html`
        })
}

track();


function showconsignment(data) {
    document.getElementById('consignmentID').innerHTML = trackid
    document.getElementById('showphone').innerHTML = data.phone
    document.getElementById('showweight').innerHTML = data.weight
    document.getElementById('showaddressFrom').innerHTML = data.addressFrom
    document.getElementById('showaddressTo').innerHTML = data.addressTo
    document.getElementById('showpincodeTo').innerHTML = data.pincodeTo
    document.getElementById('showpincodeFrom').innerHTML = data.pincodeFrom
}