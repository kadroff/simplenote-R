var i = 0;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          _id: ID(),
          content: '',
          date: dateNow()
        }
      ],
      currentIndex: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.newNote = this.newNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.findNote = this.findNote.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('notes'))
    this.setState({notes: JSON.parse(localStorage.getItem('notes'))});
  }

  newNote() {
    const notes = this.state.notes;
    notes.unshift({
      _id: ID(),
      content: '',
      date: dateNow()
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
    this.setState({notes: notes});
  }

  selectNote(event) {
    const id = event.target.id;
    const noteIndex = this.state.notes.findIndex(note => note._id === id);
    this.setState({currentIndex: noteIndex});
  }

  deleteNote() {
    const notes = this.state.notes;
    const index = this.state.currentIndex;
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    this.setState({currentIndex: 0});
    this.setState({notes: notes});
  }

  handleChange(event) {
    const notes = this.state.notes;
    notes[this.state.currentIndex].content = event.target.value;
    this.setState({notes: notes});
  }

  findNote() {
    const notes = this.state.notes;
    const val = document.getElementById("search").value;
    const result = notes.filter(note => note.content === val);
    this.setState({notes: result});
  }

  
  render() {
    return (
      <div className="app">
        <div className="sidebar">
          <div className="header">
            <input type="search" id="search" placeholder="Найти" />
            <input type="button" onClick={this.findNote} value="Найти" />
            <input type="button" onClick={this.newNote} value="Создать+" />
            <input type="button" onClick={this.deleteNote} value="Удалить" />
          </div>
          <ul className="note_list">

            {this.state.notes.map((note) =>
              <li className="note" onClick={this.selectNote} id={note._id}>{note.content + " " + note.date}</li>
            )}

          </ul>
        </div>

        <div className="editor">
          <textarea onChange={this.handleChange} value={this.state.notes[this.state.currentIndex].content}></textarea>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

function dateNow() {
  const d = new Date();
  return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
