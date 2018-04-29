class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Регистрация</h1>
        <label>
          Email:
          <input type="email" value={this.state.email} onChange={this.handleInputChange} name="email" />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" />
        </label>
        <br/>
          <input type="submit" value="Регистрация" />
      </form>
    )
  }
}