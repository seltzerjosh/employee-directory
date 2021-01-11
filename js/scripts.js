/**
 * Creates token objects for player
 * @param   {integer}   num - Number of token objects to be created
 * @return  {array}     tokens - an arary of new token objects
 */
function fetchData(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log("Problem: ", error));
}
/**
 * Fetches data from api and logs issues to console
 * @param   {url}   link to api
 */
fetchData("https://randomuser.me/api/?results=12")
    .then(data => generateProfiles(data))
    .catch(error => console.log("Problem: ", error));

//empty array for results to fill into
const results = [];

/**
 * Generates profiles from api fetch utilizing generateProfile function
 * @param   {object}   rseults from fetch
 */
function generateProfiles(employeeList) {
    console.log(employeeList);
    employeeList.results
        .forEach(data => generateProfile(data));
    employeeList.results
        .forEach(data => results.push(data));

}

/**
 * Quick function to format the telephones using prescribed (xxx) xxx-xxxx formatting
 * @param   {text}  Raw phone number
 * @return  {text} Formatted phone number
 */
function formatTelephone(text) {
    const expression = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
    return text.replace(expression, "($1) $2-$3");
}

/**
 * Generates DOM for profile and adds to DOM tree
 * @param   {emplyoee}  Employee information contained in an object to inject into DOM
 */
function generateProfile(employee) {

    const card = document.createElement('div');
    card.className = 'card';

    const cardImgContainer = document.createElement('div');
    cardImgContainer.className = 'card-img-container';
    const img = document.createElement('img');
    img.className = 'card-img';
    img.src = employee.picture.medium;
    img.alt = 'profile pic';
    cardImgContainer.appendChild(img);
    card.appendChild(cardImgContainer);

    const cardInfoContainer = document.createElement('div');
    cardInfoContainer.className = 'card-info-container';
    card.appendChild(cardInfoContainer);

    const h3 = document.createElement('h3');
    h3.id = "name";
    h3.className = 'card-name';
    h3.classList.add('cap');
    h3.insertAdjacentHTML('beforeend', `${employee.name.first} ${employee.name.last}`);
    cardInfoContainer.appendChild(h3);

    const p1 = document.createElement('p');
    p1.className = 'card-text';
    p1.insertAdjacentHTML('beforeend', `${employee.email}`);
    cardInfoContainer.appendChild(p1);

    const p2 = document.createElement('p');
    p2.className = 'card-text';
    p2.classList.add('cap');
    p2.insertAdjacentHTML('beforeend', `${employee.location.city}, ${employee.location.state}`)
    cardInfoContainer.appendChild(p2);

    const gallery = document.getElementById('gallery');
    gallery.appendChild(card);
}

function generateModal(employee) {
    const modal = document.createElement('div');
    modal.classList.add('modal-container');

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal');
    modal.appendChild(modalContainer);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.id = 'modal-close-btn';
    closeButton.classList.add('modal-close-btn');
    closeButton.innerHTML = '<strong>X</strong>';
    modalContainer.appendChild(closeButton);

    const modalInfoContainer = document.createElement('div');
    modalInfoContainer.classList.add('modal-info-container');
    modalContainer.appendChild(modalInfoContainer);

    const modalImg = document.createElement('img');
    modalImg.classList.add('modal-img');
    modalImg.src = employee.picture.medium;
    modalImg.alt = 'profile picture';
    modalInfoContainer.appendChild(modalImg);

    const modalName = document.createElement('h3');
    modalName.id = 'namePlaceHolder';
    modalName.classList.add("modal-name");
    modalName.classList.add("cap");
    modalName.textContent = employee.name.first + ' ' + employee.name.last;
    modalInfoContainer.appendChild(modalName);

    const modalEmail = document.createElement('p');
    modalEmail.classList.add('modal-text');
    modalEmail.textContent = employee.email;
    modalInfoContainer.appendChild(modalEmail);

    const modalCity = document.createElement('p');
    modalCity.classList.add('modal-text');
    modalCity.classList.add('cap');
    modalCity.textContent = employee.location.city;
    modalInfoContainer.appendChild(modalCity);

    const hrModal = document.createElement('hr');
    modalInfoContainer.appendChild(hrModal);

    const modalPhone = document.createElement('p');
    modalPhone.classList.add('modal-text');
    modalPhone.textContent = formatTelephone(employee.phone);
    modalInfoContainer.appendChild(modalPhone);

    const modalAddress = document.createElement('p');
    modalAddress.classList.add('modal-text');
    let address =
        `${employee.location.street.number} ${employee.location.street.name} ${employee.location.city} ${employee.location.state} ${employee.location.postcode}`
    modalAddress.textContent = address;
    modalInfoContainer.appendChild(modalAddress);

    const modalBirthday = document.createElement('p');
    modalBirthday.classList.add('modal-text');
    modalBirthday.textContent = `Birthday: ${employee.dob.date.slice(5,7)}/${employee.dob.date.slice(8,10)}/${employee.dob.date.slice(0,4)}`;
    modalInfoContainer.appendChild(modalBirthday);

    document.body.appendChild(modal);
};

/**
 * Creates event listener to create modals
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const gallery = document.getElementById('gallery');
    const buttons = document.getElementsByClassName('card');
    gallery.addEventListener('click', (event) => {
        let ultimateTarget = event.target;
        if (event.target.className !== 'gallery') {
            while (ultimateTarget.className !== 'card') {
                ultimateTarget = ultimateTarget.parentElement;
            }
            for (let i = 0; i < buttons.length; i++) {
                if (ultimateTarget === buttons[i]) {
                    generateModal(results[i]);
                }
            }
        }
    })
});
/**
 * Creates event listener that closes modals
 */
document.addEventListener('click', (event) => {
    if (document.getElementById('modal-close-btn') === event.target) {
        const modal = document.getElementsByClassName('modal-container');
        modal[0].remove();
    }
    if (document.getElementById('modal-close-btn') === event.target.parentElement) {
        const modal = document.getElementsByClassName('modal-container');
        modal[0].remove();
    }
});