function fetchData(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log("Problem: ", error))
};

fetchData("https://randomuser.me/api/?results=12")
    .then(data => generateProfiles(data));

//

function generateProfiles(employeeList) {
    employeeList.results
        .forEach(data => generateProfile(data));
};

function generateProfile(employee) {

    const card = document.createElement('div');
    card.className = 'card';

    const cardImgContainer = document.createElement('div');
    cardImgContainer.className = 'card-img-container';
    const img = document.createElement('img');
    img.class = 'card-img';
    img.src = employee.picture.medium;
    cardImgContainer.appendChild(img);
    card.appendChild(cardImgContainer);

    const cardInfoContainer = document.createElement('div');
    cardInfoContainer.className = 'card-info-container';
    const h3 = document.createElement('h3');
    h3.id =

    const gallery = document.getElementById('gallery');
    gallery.appendChild(card);
}

/* <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">first last</h3>
                        <p class="card-text">email</p>
                        <p class="card-text cap">city, state</p>
                    </div>
                </div>
*/