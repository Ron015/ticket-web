socket.emit("name", name);

function sendMessage(){
  socket.emit('chat message', {name:name, message:$textarea.value});
  $textarea.value = '';
  $textarea.focus();
}

socket.on('chat message', function(msg) {
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

socket.on("newuser", function(name){
  var p = document.createElement('p');
  p.textContent = name + " joined";
  var br = document.createElement("br");
  $people.appendChild(p);
  $people.appendChild(br);
  $people.scrollTo(0, $people.scrollHeight);
});

socket.on("left", function(message){
  var p = document.createElement('p');
  p.textContent = message;
  var br = document.createElement("br");
  $people.appendChild(p);
  $people.appendChild(br);
  $people.scrollTo(0, $people.scrollHeight);
});
