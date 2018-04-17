var nId = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      notes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.newNote = this.newNote.bind(this);
  }

  handleChange(event) {
    this.setState({note: event.target.value});
  }

 
  newNote() {
   
    var Mask = 'li_';
   
    const notes = this.state.notes;
    notes.push(this.state.note);
    localStorage.setItem(Mask+nId, this.state.note);
    this.setState({notes: notes});
    this.setState({note: ''});
    nId++;
    console.log(nId);
  }

  render() {
    return (
      <div className="app">
        <div className="sidebar">
          <div className="header">
            <input type="search" placeholder="Найти" />
            <input type="button" onClick={this.newNote} value="Создать+" />
          </div>
          <ul className="note_list">

            {this.state.notes.map((note) =>
              <li className="note" value="">{note}</li>
            )}

          </ul>
        </div>

        <div className="editor">
          <textarea onChange={this.handleChange} value={this.state.note}></textarea>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);