function sendPrompt() {
    const inputField = document.getElementById("userInput");
    const message = inputField.value.trim();
    if (message) {
        addMessageToChat("user", message);
        inputField.value = "";

        // Simulate Fusion's response with loader
        addLoader();
        setTimeout(() => {
            removeLoader();
            addMessageToChat("fusion", "Here's the response from Fusion with the generated image.");
        }, 2000); // 2 seconds delay to simulate processing
    }
}

function addMessageToChat(sender, text) {
    const chatbox = document.getElementById("chatbox");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = text;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function addLoader() {
    const chatbox = document.getElementById("chatbox");
    const loader = document.createElement("div");
    loader.classList.add("message", "fusion", "loader");
    loader.innerHTML = "<div class='loading-spinner'></div>";
    chatbox.appendChild(loader);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function removeLoader() {
    const loader = document.querySelector(".loader");
    if (loader) loader.remove();
}
