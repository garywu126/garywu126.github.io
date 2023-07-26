function appendMessage(message, sender) {
  const chatBox = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.classList.add('chat-message', sender);
  div.innerHTML = `<p>${message}</p>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const userInput = document.getElementById('userInput').value;
  if (userInput.trim() !== '') {
    appendMessage(userInput, 'user');

    // 使用 AJAX 請求來呼叫你的 API
    const apiUrl = "https://garywu.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview";
    const apiKey = "c98b57e521ba40738afd550fc2e71504";

    const headers = {
      "Ocp-Apim-Subscription-Key": apiKey,
      "Apim-Request-Id": "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a",
      "Content-Type": "application/json"
    };

    const payload = {
      "kind": "Conversation",
      "analysisInput": {
        "conversationItem": {
          "id": "1",
          "text": userInput,
          "modality": "text",
          "participantId": "user1"
        }
      },
      "parameters": {
        "projectName": "Garywu",
        "verbose": true,
        "deploymentName": "01",
        "stringIndexType": "TextElement_V8"
      }
    };

    // 使用 AJAX 呼叫你的 API
    fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      // 在這裡取得 bot 的回覆，並用範例概略回覆
      const botReply = data.result.prediction.topIntent;
      let botResponse;

      switch (botReply) {
        case '活動辦法':
          botResponse = '這個活動的參加辦法如下：...';
          break;
        case '活動獎勵':
          botResponse = '參加這個活動可以獲得以下獎勵：...';
          break;
        case '活動期間':
          botResponse = '這個活動從開始日期到結束日期為止：...';
          break;
        case '活動規範':
          botResponse = '參加活動需要遵守以下規範：...';
          break;
        case '活動驗收':
          botResponse = '活動完成後將進行驗收程序：...';
          break;
        case '合作對象':
          botResponse = '我們的合作對象有：...';
          break;
        case '注意事項':
          botResponse = '在參加活動前，請留意以下事項：...';
          break;
        case '活動評估':
          botResponse = '活動結束後，我們會進行評估：...';
          break;
        case '活動經費':
          botResponse = '這個活動的經費來源如下：...';
          break;
        case '活動宣傳':
          botResponse = '我們將透過以下方式宣傳活動：...';
          break;
        default:
          botResponse = '抱歉，我不確定如何回答這個問題。';
          break;
      }

      appendMessage(botResponse, 'bot');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  document.getElementById('userInput').value = '';
}

document.getElementById('userInput').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
