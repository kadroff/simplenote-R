const isUserLogin = false;

(function init() {
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
})();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    isUserLogin = true;
    init();
  } else {
    // No user is signed in.
  }
});
