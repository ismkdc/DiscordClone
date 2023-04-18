var getMessagesTimeOut;

const getMessages = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://read-api-discord.ismkdc.com/read-api/messages/list', false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  const token = window.localStorage.getItem('token');
  if (!token) {
    // If token is null, wait 1 second and try again
    getMessagesTimeOut = setTimeout(window.location.reload(), 1000);
    return;
  }

  clearTimeout(getMessagesTimeOut);
  
  xhr.setRequestHeader('Authentication', token.replace(/['"]+/g, ''));
  xhr.send(null);

  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const messages = data.map(({ id, user, content, createdAt }) => ({
      id,
      userId: user.id,
      content,
      time: new Date(createdAt).toLocaleString()
    }));
    return messages;
  } else {
    console.error('Error retrieving messages:', xhr.statusText);
    return [];
  }
};

const usersObj = {};

var getUsersTimeOut;
const getUsers = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://read-api-discord.ismkdc.com/read-api/sessions/list', false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  const token = window.localStorage.getItem('token');
  if (!token) {
    console.log("token null")
    // If token is null, wait 1 second and try again
    getUsersTimeOut = setTimeout(window.location.reload(), 1000);
    return;
  }

  clearTimeout(getUsersTimeOut);
  
  xhr.setRequestHeader('Authentication', token.replace(/['"]+/g, ''));
  xhr.send(null);

  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);

    data.forEach(({ id, name, profileImageUrl, isOnline }) => {
      usersObj[id] = {
        id,
        username: name,
        avatar: profileImageUrl,
        activity: {},
        tag: 7126,
        hide: isOnline
      };
    });
    console.log(Object.keys(usersObj).length);
  } else {
    console.error('Error retrieving messages:', xhr.statusText);
    return [];
  }
};

// Call the function once to start the recursive loop
getUsers();


export default {
  userId: "",
  friendsOnlineCount: 2,
  directMessages: [
  ],
  guilds: [
    {
      id: 1111,
      name: 'ismkdc Server',
      initials: 'R',
      icon: 'https://i.imgur.com/EOASYoR.png',
      welcomeChannelId: 1,
      categories: [
        {
          id: 1,
          name: 'general',
          channels: [
            {
              id: 1,
              name: 'general',
              messages: getMessages(),
            }
          ]
        },
      ],
      roles: {
      },
      members: Object.keys(usersObj).map((key, index) => ({
        userId: key,
        roles: []
      }))
    }
  ],
  users: usersObj
};
