const isUserLogin = false;

function init() {
  const path = window.location.href.split('#')[1];
  let page = null;

  switch (path) {
  case '/signup':
    page = <Signup />;
    break;

  case '/login':
    page = <Login />;
    break;

  default:
    page = <Welcome />;
    break;
  }

  ReactDOM.render(
    page,
    document.getElementById('root')
  );

  window.onhashchange = function() {
    init();
  }
};

// Default: Почему-то выполняется сразу вход, *ниже помогает предотвращать это
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });

 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    init();
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  } else {
    console.log("Ошибка");
  }
  });

 
(function() {
  init();
})();