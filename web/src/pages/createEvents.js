import dannaClient from '../api/dannaClient.js';
import BindingClass from "../util/bindingClass";
import Header from '../components/dannaHeader';
import DataStore from "../util/DataStore";
/**
 * Logic needed for the create playlist page of the website.
 */
class CreateEventSimple extends BindingClass {
    constructor() {
        super();
        this.bindClassMethods(['mount', 'submit', 'redirectToViewEvent', 'confirmRedirect','submit', 'redirectEditProfile',
        'redirectAllEvents','redirectCreateEvents','redirectAllFollowing','logout'], this);
        this.dataStore = new DataStore();
        this.dataStore.addChangeListener(this.redirectToViewPlaylist);
        this.header = new Header(this.dataStore);
        console.log("createvent constructor");
    }
    /**
     * Add the header to the page and load the MusicPlaylistClient.
     */
    mount() {
        document.getElementById('createEvent').addEventListener('click', this.submit);
        document.getElementById('profilePic').addEventListener('click', this.redirectEditProfile);
        document.getElementById('allEvents').addEventListener('click', this.redirectAllEvents);
        document.getElementById('createEvents').addEventListener('click', this.redirectCreateEvents);
        document.getElementById('allFollowing').addEventListener('click', this.redirectAllFollowing);
        document.getElementById('logout').addEventListener('click', this.logout);
        document.getElementById('door').addEventListener('click', this.logout);
        document.getElementById('createEvent').addEventListener('click', this.submit);
        this.header.addHeaderToPage();
        this.client = new dannaClient();
    }
    async submit(evt) {
        evt.preventDefault();
        const createButton = document.getElementById('createEvent');
        const origButtonText = createButton.innerText;
        createButton.innerText = 'Loading...';
        const errorMessageDisplay = document.getElementById('errorMessageDisplay');
        const eventName = document.getElementById('eventNameC').value;
        const eventDate = document.getElementById('eventDateC').value ;
        const eventAddress = document.getElementById('eventAddressC').value ;
        const eventDescription = document.getElementById('eventDescriptionC').value;
        const categories = document.getElementById('eventCategoryC').value;
        const eventCategory = categories.split(",");
        try {
            // Check if the user is authenticated
            const user = await this.client.getIdentity();
            if (!user) {
                // If not authenticated, show error message
                throw new Error('Only authenticated users can create an event.');
            }
            const eventCreator = user.email;
            const event = await this.client.createEvent(eventName, eventCreator, eventAddress, eventDescription, eventDate, eventCategory,
                (error) => {
                    createButton.innerText = origButtonText;
                    errorMessageDisplay.innerText = `Error: ${error.message}`;
                    errorMessageDisplay.classList.remove('hidden');
                });
                console.log(eventName,eventCreator, eventDate, eventAddress, eventDescription, eventCategory);
         window.location.href ='/landingPage.html';
        } catch (error) {
            createButton.innerText = origButtonText;
            errorMessageDisplay.innerText = `Error: ${error.message}`;
            errorMessageDisplay.classList.remove('hidden');
        }
    }
    /**
     * When the playlist is updated in the datastore, redirect to the view playlist page.
     */
    redirectToViewEvent() {
        console.log("redirectToViewEvent");
            window.location.href = `/viewAllEvents.html`;
    }
confirmRedirect() {
    window.location.href = '/profile.html';
    console.log("createEvent button clicked");
}
redirectEditProfile(){
    window.location.href = '/createProfile.html';
}
redirectAllEvents(){
    window.location.href = '/viewAllEvents.html';
}
redirectCreateEvents(){
    window.location.href = '/createEvents.html';
}
redirectAllFollowing(){
    window.location.href = '/allFollowing.html';
}
async logout(){
    await this.client.logout();
    if(!this.client.isLoggedIn()){
        window.location.href ='/landingPage.html';
    }
}
}
/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const createEventSimple = new CreateEventSimple();
    createEventSimple.mount();
};
window.addEventListener('DOMContentLoaded', main);