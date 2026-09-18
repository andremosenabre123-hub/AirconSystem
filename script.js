const nameInput = document.getElementById("nameInput");
const sendButton = document.getElementById("sendButton");
const message = document.getElementById("message");

const API_URL = "https://aircon-system-api.vercel.app";

sendButton.addEventListener("click", sendName);


// ==============================
// CHECK SERVER WHEN PAGE LOADS
// ==============================

checkServer();


async function checkServer() {

    try {

        const response = await fetch(`${API_URL}/health`, {
            method: "GET"
        });

        if (!response.ok) {
            showMaintenancePage();
            return;
        }

        const data = await response.json();

        // API is working
        // Database must also be working
        if (data.database !== "connected") {
            showMaintenancePage();
            return;
        }

    } catch (error) {

        console.error("Server check failed:", error);

        showMaintenancePage();
    }
}


// ==============================
// SEND NAME
// ==============================

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

        showMaintenancePage();
    }
}


// ==============================
// MAINTENANCE PAGE
// ==============================

function showMaintenancePage() {

    document.body.innerHTML = `
        <div style="
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-family: Arial, sans-serif;
            padding: 20px;
        ">

            <div>

                <h1>
                    Sorry!
                </h1>

                <h2>
                    The server is currently unavailable.
                </h2>

                <p>
                    Our system is currently under maintenance.
                </p>

                <p>
                    Please try again later.
                </p>

            </div>

        </div>
    `;

}
