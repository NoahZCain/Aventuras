import dannaClient from '../api/dannaClient';
import BindingClass from "../util/bindingClass";
import Header from '../components/dannaHeader';
import DataStore from "../util/DataStore";

class ViewProfile extends BindingClass {
    constructor() {
        super();
        this.bindClassMethods(['clientLoaded', 'mount','thisPageRemoveFrom','redirectEditProfile','redirectAllEvents','delay',
        'redirectCreateEvents','redirectAllFollowing','logout','addEvents','addPersonalEvents','addName','addFollowing','getEventWithRetry'], this);
        this.dataStore = new DataStore();
        this.header = new Header(this.dataStore);

    }

    async clientLoaded() {
        const identity = await this.client.getIdentity();
        const profile = await this.client.getProfile(identity.email);
        this.dataStore.set("email", identity.email);
        this.dataStore.set("myPersonalEventIds", profile.profileModel.events);
        this.dataStore.set('profile', profile);
        const events = await this.client.getAllEvents();
        this.dataStore.set('events', events.allEventList);
        this.dataStore.set('firstName', profile.profileModel.firstName);
        this.dataStore.set('lastName', profile.profileModel.lastName);
        this.dataStore.set('following', profile.profileModel.following);
        console.log(JSON.stringify(this.dataStore));
        this.addEvents();
        this.addPersonalEvents();
        this.addName();
        this.addFollowing();


    }
    /**
     * Add the header to the page and load the dannaClient.
     */
    mount() {
        document.getElementById('profilePic').addEventListener('click', this.redirectEditProfile);
        document.getElementById('allEvents').addEventListener('click', this.redirectAllEvents);
        document.getElementById('createEvents').addEventListener('click', this.redirectCreateEvents);
        document.getElementById('allFollowing').addEventListener('click', this.redirectAllFollowing);
        document.getElementById('logout').addEventListener('click', this.logout);
        document.getElementById('door').addEventListener('click', this.logout);
        document.getElementById('names').innerText = "Loading ...";

        this.client = new dannaClient();
        this.clientLoaded();
    }
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async getEventWithRetry(result, maxRetries = 3, delayMs = 1000) {
        let retries = 0;
        let getEvent;

        while (retries < maxRetries) {
            try {
                getEvent = await this.client.getEventDetails(result);
                if (getEvent && getEvent.eventModel) {
                    return getEvent;
                }
            } catch (error) {
                console.error(`Error while fetching profile for ID ${result}:`, error);
            }

            retries++;
            await this.delay(delayMs);
        }

        throw new Error(`Failed to get profile for ID ${result} after ${maxRetries} retries.`);
    }


    async addEvents(){
        const events = this.dataStore.get("events");
        console.log("AddEvents", events);
        if (events == null) {
            document.getElementById("event-list").innerText = "There are no events yet under your profile.";
        } else {
            let eventResult;
            let counter = 0;
    let html = "";
    for (let event of events) {
                              html += `
                              <tr>
                                  <td>
                                      ${event.eventId}
                                  </td>
                                   <td>
                                  ${event.name}
                                  </td>
                                  <td>
                               ${event.dateTime}
                              </td> <td>
                              ${event.address}
                               </td> <td>
                              ${event.eventCreator}
                              </td>
                              </tr>`;

                            }

                document.getElementById('event-list').innerHTML=html;
     }

    }

    async thisPageRemoveFrom(result){
        await this.client.removeEventFromProfile(result);
        window.location.href = "/profile.html";
    }

    async addPersonalEvents(){
          const events = this.dataStore.get("events");
          const myPersonalEventIds = this.dataStore.get("myPersonalEventIds");
               console.log("AddEvents", events);
               if (events == null) {
                   document.getElementById("event-list").innerText = "There are no events yet under your profile.";
               } else {
                   let eventResult;
                   let counter = 0;
           let html = "";
           for (let event of events.filter(e => myPersonalEventIds.some(o => o === e.eventId))) {
                                     html += `
                                     <tr>
                                         <tr>
                                      <td>
                                       ${event.eventId}
                                                                           </td>
                                                                            <td>
                                                                           ${event.name}
                                                                           </td>
                                                                           <td>
                                                                        ${event.dateTime}
                                                                       </td> <td>
                                                                       ${event.address}
                                                                        </td> <td>
                                                                       ${event.eventCreator}
                                                                       </td>
                                                                       </tr>`;

                                   }

                       document.getElementById('created-event-list').innerHTML=html;
            }
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
            anchor.setAttribute('href', 'foriegnView.html?id=${encodeURIComponent('+getName.profileModel.profileId+')}');
            anchor.className = 'nav-link px-4 d-flex flex-column align-items-center smprofile';
            anchor.id = 'foreignPic' + getName.profileModel.profileId;

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
    const viewProfile = new ViewProfile();
    viewProfile.mount();
};

window.addEventListener('DOMContentLoaded', main)
