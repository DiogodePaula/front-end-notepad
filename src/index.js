const axios = require('axios').default;

class Notepad {
    constructor(){
        this.title = document.getElementById('txtTitle');
        this.content = document.getElementById('txtContent');
        this.date = document.getElementById('txtDate');
        this.hour = document.getElementById('txtHour');
        this.btnRegisterNote = document.getElementById('btnRegister');
        this.events();
        this.getNotes();
    }

    events(){
        
        this.btnRegisterNote.onclick = (event) => this.createUser(event);
    }

    getNotes(){
        axios.get(`http://localhost:3000/notepad`)
        .then((response) => {
            this.recoveryNote(response.data.notepad);
            console.log(note);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    recoveryNote(data){
        console.log(data);
        for (note of data) {

            const html = this.layoutNote(note.title, note.content, note.date, note.hour, note.id);

            this.insertHtml(html);
        }
        
        document.querySelectorAll('.delete-note').forEach(button => {
            button.onclick = event => this.deleteNote(button.id);
        })
    }

    deleteNote(id){
        axios.delete(`http://localhost:3000/notepad/${id}`)
        .then(response => {
            alert(response.data.result);
        })
        .catch(error => {
            console.log(err)
        })
    }

    layoutNote(title, content, date, hour, id){   
        return `
            <div class='col mt-5'>
                <div class='note'>
                    <div class='note-body'>
                        <h3 class='note-title'>${title}</h3>
                        <p class='note-content'>${content}</p>
                        <p class='note-date'>${date}</p>
                        <p class='note-hour'>${hour}</p>  
                        <button type="button" class="btn btn-danger delete-note" id="${id}">Delete</button>
                        <button type="button" class="btn btn-warning warning-note" id="${id}">Atualizar</button>
                    </div>
                </div>
            </div>`;
    }

    noteValidate(event){
        event.preventDefault();
        if (this.title.value && this.content.value && this.date.value && this.hour.value){

            const note = {
                name: this.title.value,
                email: this.content.value,
                age: this.date.value,
                phone: this.hour.value
            }

        this.createNote(note);

        } else {
            alert('favor, preencha todos os campos');
        }
    }

    insertHtml(html){
        document.getElementById('newNotes').innerHTML += html;
    }

    createNote(note){
        axios.post(`http://localhost:3000/notepad`, note)
        .then((response) => {
            const html = this.layoutNote(note.title, note.content, note.date, note.hour);

            this.insertHtml(html);
            
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

new Notepad();