const nameInput = document.getElementById("nameInput");
const sendButton = document.getElementById("sendButton");
const message = document.getElementById("message");


const API_URL = "https://aircon-system-api.vercel.app/";


sendButton.addEventListener("click", sendName);


async function sendName() {

    const name = nameInput.value.trim();


    if (name === "") {

        message.textContent = "Please enter your name.";

        return;
    }


    try {

        const response = await fetch(`${API_URL}/names`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name
            })

        });


        const data = await response.json();


        if (!response.ok) {

            message.textContent = "Failed to save name.";

            return;
        }


        message.textContent = data.message;

        nameInput.value = "";


    } catch (error) {

        console.error(error);

        message.textContent = "Could not connect to API.";

    }
}
