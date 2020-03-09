function checkIfIntersectionObserverExists(){
    // setting up observer
    if (!window.IntersectionObserver)
        window.IntersectionObserver = IntersectionObserverSubstitute;
}

var timeNowRaf = new Date();

export class IntersectionObserverSubstitute {
    /*
    callback: same as IntersectionObserver
    options: same as IntersectionObserver
    */
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        this.entries = new Map();

        if (this.options.root === null){
            window.addEventListener('scroll', (e) => {
                // calling the run check method every 600ms
                // this is so runCheckOnElements does not get called too many times
                let timePassed = new Date() - timeNowRaf;
                if (timePassed < 600)
                    return;
                timeNowRaf = new Date();
                this.runCheckOnElements();
            });
        }
    }

    observe(e){
        // assigning an id to an element
        // id is used as a key in the entries Map object
        e.myId = Math.random() * 10;
        // creates an entry object of type IntersectionObserverEntry
        let entry = {
            target: e,
            isIntersecting: false,
            // gets the position of the element in the viewport
            boundingClientRect: e.getBoundingClientRect(),
            id: e.myId
        };
        // adds it to the list of entries
        this.entries.set(e.myId, entry);
        // check if element added is in the viewport
        this.runCheckOnElement(e);
    }

    disconnect(){

    }

    unobserve(e){
        // deletes an element from entries using the elements myId prop
        this.entries.delete(e.myId);
    }

    // checks entries in this.entries to see if any entry is visible in viewport
    runCheckOnElements(){
        // gets the height of the viewport
        let clientHeight = window.innerHeight;
        // gets the y value of the viewport
        let scrollTop = document.body.scrollTop;
        // adds both values to compute range of min y and max y
        // of the viewport
        let cView = clientHeight + scrollTop;
        // boolean that is used to decide whether callback is required
        let isCallBackRequired = false;

        // go through all entries and check if there is an entry that
        // is intersecting, if yes, call callback provided in constructor
        if (this.entries.size > 0){
            for (let entry of this.entries.values()){
                if (entry && (entry.boundingClientRect.y + Math.floor(this.options.threshold * entry.boundingClientRect.height) < cView)){
                    entry.isIntersecting = true;
                    isCallBackRequired = true;
                }
            }
            if (isCallBackRequired)
                this.callback(Array.from(this.entries.values()), this);
        }
    }

    // checks element to see if it is visible in the viewport
    // params: element
    runCheckOnElement(e){

        // gets the height of the viewport
        let clientHeight = window.innerHeight;
        // gets the y value of the viewport
        let scrollTop = document.body.scrollTop;
        // adds both values to compute range of min y and max y
        // of the viewport
        let cView = clientHeight + scrollTop;
        // boolean that is used to decide whether callback is required
        let isCallBackRequired = false;

        let entry = this.entries.get(e.myId);

        if (entry && (entry.boundingClientRect.y + Math.floor(this.options.threshold * entry.boundingClientRect.height) < cView)){
            console.log('scrollTop',scrollTop);
            console.log('cView',cView);
            console.log(entry.boundingClientRect.y + (Math.floor(this.options.threshold * entry.boundingClientRect.height)));
            entry.isIntersecting = true;
            isCallBackRequired = true;
        }

        if (isCallBackRequired)
            this.callback(Array.from(this.entries.values()), this);

    }
}

checkIfIntersectionObserverExists();