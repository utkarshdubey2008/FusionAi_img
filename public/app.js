const chatDisplay = document.getElementById("chat-display");
const typingIndicator = document.getElementById("typing-indicator");
const userInput = document.getElementById("user-input");

function sendMessage() {
  const messageText = userInput.value;
  if (!messageText) return;
  addMessage(messageText, "user");

  userInput.value = "";

  showTypingIndicator();

  setTimeout(() => {
    generateAIResponse(messageText);
    hideTypingIndicator();
  }, 1000); // Delay for AI response
}

function addMessage(text, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender === "user" ? "user-message" : "ai-message");

  if (sender === "ai") {
    const avatar = document.createElement("img");
    avatar.src = "ai_avatar.png"; // Add a suitable AI avatar image in your project folder
    avatar.classList.add("message-avatar");
    messageElement.appendChild(avatar);
  }

  const messageText = document.createElement("span");
  messageText.innerText = text;
  messageElement.appendChild(messageText);

  chatDisplay.appendChild(messageElement);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function generateAIResponse(userMessage) {
  const aiResponse = "Generating image for: " + userMessage; // Replace with your AI logic
  addMessage(aiResponse, "ai");

  setTimeout(() => {
    const imgElement = document.createElement("img");
    imgElement.src = "https://via.placeholder.com/150"; // Placeholder for generated image
    imgElement.alt = userMessage;
    imgElement.classList.add("generated-image");

    const imageMessage = document.createElement("div");
    imageMessage.classList.add("message", "ai-message");
    imageMessage.appendChild(imgElement);

    chatDisplay.appendChild(imageMessage);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }, 2000); // Delay for image generation
}

function showTypingIndicator() {
  typingIndicator.style.display = "flex";
}

function hideTypingIndicator() {
  typingIndicator.style.display = "none";
}
