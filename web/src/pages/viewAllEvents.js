import dannaClient from '../api/dannaClient';
import BindingClass from "../util/bindingClass";
import Header from '../components/dannaHeader';
import DataStore from "../util/DataStore";

class ViewAllEvents extends BindingClass {
    constructor() {
        super();
        this.bindClassMethods(['clientLoaded', 'mount','thisPageRemoveFrom','redirectEditProfile','redirectAllEvents',
                'redirectCreateEvents','redirectAllFollowing','logout','displayEvents','getHTMLForSearchResults','addPersonalEvents','addName','addFollowing'], this);
        this.dataStore = new DataStore();
        this.dataStore.addChangeListener(this.displayEvents);
        this.header = new Header(this.dataStore);

    }

    /**
     * Once the client is loaded, get the profile metadata.
     */
    async clientLoaded() {
        const identity = await this.client.getIdentity();
        const profile = await this.client.getProfile(identity.email);
        const events = await this.client.getAllEvents();
        this.dataStore.set("email", identity.email);
        this.dataStore.set('profile', profile);
        this.dataStore.set('events', events);
        this.dataStore.set('firstName', profile.profileModel.firstName);
        this.dataStore.set('lastName', profile.profileModel.lastName);
//        this.dataStore.set('following', profile.profileModel.following);
        this.addName();
        this.displayEvents();
        console.log(events);

    }



    /**
     * Add the header to the page and load the dannaClient.
     */
    mount() {
//        document.getElementById('profilePic').addEventListener('click', this.redirectEditProfile);
        document.getElementById('allEvents').addEventListener('click', this.redirectAllEvents);
        document.getElementById('createEvents').addEventListener('click', this.redirectCreateEvents);
        document.getElementById('allFollowing').addEventListener('click', this.redirectAllFollowing);
        document.getElementById('logout').addEventListener('click', this.logout);
        document.getElementById('door').addEventListener('click', this.logout);
        document.getElementById('names').innerText = "Loading ...";
        this.client = new dannaClient();
        this.clientLoaded();
    }

    async thisPageRemoveFrom(result){
        this.client.removeEventFromProfile(result);
    }

    displayEvents(){
            const events = this.dataStore.get("events");
            console.log(events , "from displayEvents");
            if (events == null) {
                document.getElementById("event-list").innerText = "No Events found";
            }
            document.getElementById("event-list").innerHTML = this.getHTMLForSearchResults(events);
    }

    getHTMLForSearchResults(searchResults) {
     console.log(searchResults , "from getHTMLForSearchResults");
            if (!searchResults || !searchResults.allEventList || searchResults.allEventList.length === 0) {
                return '<h4>No results found</h4>';
            }
            let html = "";
            for (const res of searchResults.allEventList) {
                html += `
                <tr>
                <td>
                  ${res.eventId}
                 </td>
                 <td>
                 ${res.name}
                  </td>
                  <td>
                  ${res.dateTime}
                   </td>
                    <td>
                  ${res.address}
                  </td>
                  <td>
                 ${res.eventCreator}
                 </td>
                  <td>
                 ${res.category}
                 </td>
                </tr>`;
            }
            return html;
        }

    async addPersonalEvents(){
        const events = this.dataStore.get("events");
        if (events == null) {
            document.getElementById("created-event-list").innerText = "No Events created by you in your Profile";
        }
        document.getElementById("created-event-list").innerText = events;
    }

    async addName(){
        const fname = this.dataStore.get("firstName");
        const lname = this.dataStore.get("lastName");
        if (fname == null) {
            document.getElementById("names").innerText = "John Doh";
        }
        document.getElementById("names").innerText = fname + " " + lname;
    }

    async addFollowing(){
        const following = this.dataStore.get("following");
        if (following == null) {
            document.getElementById("allFollowingListText").remove()
            document.getElementById("allFollowingList").innerText = "You are not following anyone";
        } else {
            let profileFollowing;
        for (profileFollowing of following) {
            const getName = await this.client.getProfile(profileFollowing);
            // Create an anchor element
            const anchor = document.createElement('a');
            anchor.setAttribute('href', '#');
            anchor.className = 'nav-link px-4 d-flex flex-column align-items-center';
            anchor.id = 'foreignPic' + getName.profileModel.getName;

            // Create an icon element
            const icon = document.createElement('i');
            icon.className = 'bi bi-person-circle nav-profile-icon-sm';

            // Create an H3 element
            const name = document.createElement('H3');
            name.className = 'names text-following';
            name.id = 'names';
            name.textContent = getName.profileModel.firstName + " " + getName.profileModel.lastName;

            //Center the profilepic
            anchor.style.position = 'relative';
            anchor.style.textAlign = 'center';
            icon.style.position = 'absolute';
            icon.style.top = '-40px';

            // Append elements
            anchor.appendChild(name);
            anchor.appendChild(icon);
            document.getElementById("allFollowingList").appendChild(anchor);
        }
        document.getElementById("allFollowingListText").remove();

        }


    }

    redirectEditProfile(){
        window.location.href = '/createProfile.html';
        console.log("createEvent button clicked");
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
    const viewAllEvents = new ViewAllEvents();
    viewAllEvents.mount();
};

window.addEventListener('DOMContentLoaded', main);
