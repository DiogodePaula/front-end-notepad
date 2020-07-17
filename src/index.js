const axios = require('axios').default;

class Notepad {
    constructor(){
        this.title = document.getElementById('txtTitle');
        this.content = document.getElementById('txtContent');
        this.date = document.getElementById('txtDate');
        this.hour = document.getElementById('txtHour');
        // this.titleModal = document.getElementById('titleModal');
        this.contentModal = document.getElementById('contentModal');
        this.dateModal = document.getElementById('dateModal');
        this.hourModal = document.getElementById('hourModal');
        this.id = 0;
        this.btnRegisterNote = document.getElementById('btnRegister');
        this.btnUpdateNote = document.getElementById('btn-update');
        this.getNotes();
        this.events();
        // this.updateNote();
    }

    events(){
        
        this.btnRegisterNote.onclick = (event) => this.noteValidate(event);
        this.btnUpdateNote.onclick = (event) => this.updateNote(this.id);
    }

    getNotes(){
        axios.get(`http://localhost:3000/notepad`)
        .then((response) => {
            this.recoveryNote(response.data.notepad);
            console.log(response.data.notepad);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    recoveryNote(data){
        for (note of data) {

            const html = this.layoutNote(note.title, note.content, note.date, note.hour, note.id);

            this.insertHtml(html);
        }
        
        document.querySelectorAll('.delete-note').forEach(button => {
            button.onclick = event => this.deleteNote(button.id);
        })

        document.querySelectorAll('.get-note').forEach(button => {
            button.onclick = event => this.getNote(button.id);
        })
    }

    deleteNote(id) {
        axios.delete(`http://localhost:3000/notepad/${id}`)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }

    getNote(id) {
        axios.get(`http://localhost:3000/notepad/${id}`)
        .then((response) => {
            console.log(response.data.note);

            this.id = id;
            document.getElementById('titleModal').value = response.data.note[0].title;
            document.getElementById('contentModal').value = response.date.note[0].content;
            document.getElementById('dateModal').value = response.date.note[0].date;
            document.getElementById('hourModal').value = response.date.note[0].hour;
        })
        .catch((err) => {
            console.log(err);
        })
    }

    updateNote(id) {

        let note = {
            title: this.titleModal.value,
            content: this.contentModal.value,
            date: this.dateModal.value,
            hour: this.hourModal.value
        }

        axios.put(`http://localhost:3000/notepad/${id}`, note)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    layoutNote(title, content, date, hour, id) {   
        return `
            <div class='col mt-5'>
                <div class='note'>
                    <div class='note-body'>
                        <h3 class='note-title'>${title}</h3>
                        <p class='note-content'>${content}</p>
                        <p class='note-date'>${date}</p>
                        <p class='note-hour'>${hour}</p>  
                        <button type="button" class="btn btn-danger delete-note" id="${id}">Deletar</button>

                        <button type="button" class="btn btn-warning get-note" id="${id}" data-toggle="modal" 
                        data-target="#exampleModal" data-whatever="@mdo">Editar</button>
                    </div>
                </div>
            </div>`;
    }

    noteValidate(event){
        event.preventDefault();
        if (this.title.value && this.content.value && this.date.value && this.hour.value){
            const note = {
                title: this.title.value,
                content: this.content.value,
                date: this.date.value,
                hour: this.hour.value
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
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

new Notepad();