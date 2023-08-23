// using json format

let sendbtn = document.querySelector(".chat-input span");
let inputmsg = document.querySelector(".chat-input textarea");
let chatbox = document.querySelector(".chatbox");
let chatboximg = document.querySelector(".chatbox img");

let userMessage = null;

const inputHeight = inputmsg.scrollHeight;

let createchatLi = (message, className) => {
  let chatli = document.createElement("li");
  chatli.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;

  chatli.innerHTML = chatContent;
  return chatli;
};

let generateResponse = (chatElement) => {
  let messageElement = chatElement.querySelector("p");
  let responses = {};
  fetch("response.json")
    .then((res) => res.json())
    .then((data) => {
      responses = data;
      let key = Object.keys(responses);
      let matchingkey = key.filter((reskey) => reskey === userMessage);
      console.log(matchingkey);
      matchingkey.forEach((msg) => {
        let response = responses[msg];
        messageElement.textContent = response;
        // chatbox.scrollTo(0, chatbox.scrollHeight);
      });
    })
    .catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent =
        "Oops! Something went wrong. Please try again ";
    })
    .finally(() => {
      chatbox.scrollTo(0, chatbox.scrollHeight);
    });
};

sendbtn.addEventListener("click", (e) => {
  userMessage = inputmsg.value.trim();
  userMessage = userMessage.toLowerCase();
  chatboximg.style.display = "none";
  if (!userMessage) return;

  inputmsg.value = "";
  inputmsg.style.height = `${inputHeight}px`;

  chatbox.appendChild(createchatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    let incomingchatLi = createchatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingchatLi);

    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingchatLi);
  }, 600);
  e.preventDefault();
});

inputmsg.addEventListener("input", () => {
  inputmsg.style.height = `${inputHeight}px`;
  inputmsg.style.height = `${inputmsg.scrollHeight}px`;
});
