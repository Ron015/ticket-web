socket.emit("name", {name:name, room:room});

function sendMessage(){
  socket.emit('room chat message', {name:name, message:$textarea.value, room:room});
  $textarea.value = '';
  $textarea.focus();
}

socket.on('room chat message', function(msg) {
  if(msg.room != room) return;
  var d = getTime();
  const div = document.createElement('div');
  div.className = (msg.name == name) ? "me":"you";
  const pre = document.createElement("pre");
  pre.setAttribute("style", "overflow:auto")
  const p = document.createElement("p");
  p.innerText = msg.message;
  div.innerHTML = `<b>${msg.name} </b><span style="color:gray; font-size:14px;">${d}</span>`;
  pre.appendChild(p);
  div.appendChild(pre);
  const br = document.createElement('br');
  $main.appendChild(div);
  $main.appendChild(br);
  $main.scrollTo(0, $main.scrollHeight);
});

socket.on("newroomuser", function(name){
  if(name.room != room) return;
  var p = document.createElement('p');
  p.textContent = name.name + " joined";
  var br = document.createElement("br");
  $people.appendChild(p);
  $people.appendChild(br);
  $people.scrollTo(0, $people.scrollHeight);
});

socket.on("roomuserleft", function(message){
  if(message.room != room) return;
  var p = document.createElement('p');
  p.textContent = message.message;
  var br = document.createElement("br");
  $people.appendChild(p);
  $people.appendChild(br);
  $people.scrollTo(0, $people.scrollHeight);
});