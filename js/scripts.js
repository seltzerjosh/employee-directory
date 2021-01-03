function fetchData(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log("Problem: ", error));
}

fetchData("https://randomuser.me/api/?results=12")
    .then(data => generateProfiles(data))
    .catch(error => console.log("Problem: ", error));

//

function generateProfiles(employeeList) {
    console.log(employeeList);
    employeeList.results
        .forEach(data => generateProfile(data))
        .forEach(data => generateModal(data));
}

function generateProfile(employee) {

    const card = document.createElement('div');
    card.className = 'card';

    const cardImgContainer = document.createElement('div');
    cardImgContainer.className = 'card-img-container';
    const img = document.createElement('img');
    img.class = 'card-img';
    img.src = employee.picture.medium;
    img.alt = 'profile pic';
    cardImgContainer.appendChild(img);
    card.appendChild(cardImgContainer);

    const cardInfoContainer = document.createElement('div');
    cardInfoContainer.className = 'card-info-container';
    card.appendChild(cardInfoContainer);

    const h3 = document.createElement('h3');
    h3.id = employee.name.first + employee.name.last;
    h3.class = 'card-name';
    h3.insertAdjacentHTML('beforeend', `${employee.name.first} ${employee.name.last}`);
    cardInfoContainer.appendChild(h3);

    const p1 = document.createElement('p');
    p1.class = 'card-text';
    p1.insertAdjacentHTML('beforeend', `${employee.email}`);
    cardInfoContainer.appendChild(p1);

    const p2 = document.createElement('p');
    p2.class = 'card-text cap';
    p2.insertAdjacentHTML('beforeend', `${employee.location.city}, ${employee.location.state}`)
    cardInfoContainer.appendChild(p2);

    const gallery = document.getElementById('gallery');
    gallery.appendChild(card);
}

function generateModal() {
    const modal = document.createElement('div');
    modal.class = 'modal';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.id = 'modal-close-btn';
    closeButton.class = 'modal-close-btn';
    closeButton.innerHTML = '<strong>X</strong>';
    modal.appendChild(closeButton);

    const modalInfoContainer = document.createElement('div');
    modal.appendChild(modalInfoContainer);

    const modalImg = document.createElement('div');
    modalImg.class = 'modal-img';
    modalImg.src = 'https://placehold.it/125x125';
    modalImg.alt = 'profile picture';
    modalInfoContainer.appendChild(modalImg);

    const modalName = document.createElement(0'h3');
    modalName.id = 'namePlaceHolder';
    modalName.class = "modal-name cap"
    modalName.textContent = 'namePlaceholder';
    modalInfoContainer.appendChild(modalName);


    const modalEmail = document.createElement('p');
    modalEmail.class = 'modal-text';
    modalEmail.textContent = 'emailPlaceholder';
    modalInfoContainer.appendChild(modalEmail);

    const modalCity = document.createElement('p');
    modalEmail.class = 'modal-text cap';
    modalEmail.textContent = 'cityPlaceholder';
    modalInfoContainer.appendChild(modalCity);

    const hrModal = document.createElement('hr');
    modalInfoContainer.appendChild(hrModal);

    const modalPhone = document.createElement('p');
    modalEmail.class = 'modal-text';
    modalEmail.textContent = 'phonePlaceholder';
    modalInfoContainer.appendChild(modalPhone);

    const modalAddress = document.createElement('p');
    modalEmail.class = 'modal-text';
    modalEmail.textContent = 'addressPlaceholder';
    modalInfoContainer.appendChild(modalAddress);

    const modalBirthday = document.createElement('p');
    modalEmail.class = 'modal-text';
    modalEmail.textContent = 'birthdayPlaceholder';
    modalInfoContainer.appendChild(modalBirthday);
}

/* <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>
                */