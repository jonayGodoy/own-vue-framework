const scope = () => {

let appElement = document.querySelector("#app");
appElement.innerHTML = 
`<div>
    Samuel Rules 
    <input type="text" id="${"uno"}" data-id="message"">
    <p data-id="message"></p>
    <p data-id="message"></p>
    <p data-id="message"></p>
    <p data-id="message"></p>
    <p data-id="message"></p>
    <p data-id="message"></p>
    <button id="${"dos"}">actualiza el mensaje</button>
</div>`

let eventBusMessage = EventBus();
eventBusMessage.addSubscriptionTo("message");

const app2 = {
    el: '#app-2',
    data: {
        rawMessage : "Samuel Rules",
        get message(){ return this.rawMessage; },
        set message(value){ this.rawMessage = value; eventBusMessage.update(this.rawMessage); }
    }
  };

let updateValueElement = (element, value) => {
    if(element.nodeName = "INPUT"){
        element.value = value
    }
    if(element.nodeName = "P"){
        element.innerText = value
    }
};

 eventBusMessage.update(app2.data.message);

function EventBus(){
    const subscriptions = [];

    return {
        addSubscriptionTo: addSubscriptionTo,
        update: update
    };

    function addSubscriptionTo(id){
        const handler = (value) => {
            document.querySelectorAll(`[data-id=${id}`)
                .forEach((x) => updateValueElement(x, value));
        };
        subscriptions.push(handler);
         
    }

    function update(value){
        subscriptions.forEach(x => x(value));
    }
}

  document.querySelector("#dos")
  .addEventListener("click", (e) => { app2.data.message = "casa"; console.log("casa"); });

  document.querySelector("#uno")
  .addEventListener("keyup", (e) => { app2.data.message = e.target.value; });

}
scope();

