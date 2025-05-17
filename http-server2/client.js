// This is a client app to add Friend into index3-routing.js API

const addFriends = (id, name) => {
  fetch('http://localhost:5600/friends', {
    method: 'POST',
    body: JSON.stringify(
      { id: id, name: name }
    )
  })    
  .then((response) => response.json())
  .then((friend) => console.log(friend))
};

addFriends(3, "Marie Curie");
addFriends(4, "Grace Hopper");
