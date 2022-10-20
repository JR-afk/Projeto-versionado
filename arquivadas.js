import {
    onSnapshot,
    collection,
    db,
    deletenTask,
    getnTask,
    nowsaveTask,
} from "../base.js";


const btnname = document.getElementById('shnome');
btnname.addEventListener('input', (event) => {
    const input = (event.target.value).toLowerCase()
    const posts = document.querySelectorAll('#lista')
    posts.forEach(post => {
        const dess = post.querySelector('#name').textContent.toLowerCase()
        if (dess.includes(input)) {
            post.style.display = "block"
            return
        }
        post.style.display = "none"
    })
})
const formulario = document.getElementById("formula");
const container = document.getElementById("container");
let editStatus = false;
let id = '';
window.addEventListener("DOMContentLoaded", async() => {
    onSnapshot(collection(db, "arquivadas"), (querySnapshot) => {
        let html = "";
        querySnapshot.forEach((doc) => {
            const task = doc.data();
            html += `  
                <div id="lista" class="box mb-4">
                    <ion-icon style="display: flex;float: right; background: var(--corpadrao); height: 24px; width: 24px; color:  #dc3545;" id="btn-delete" data-id="${doc.id}" name="close-circle"></ion-icon>
                    <ion-icon style="display: flex;float: right; background: var(--corpadrao); height: 24px; width: 24px; color:  #dc3545;" id="btn-arquive" data-nome="${task.nome}" data-telefone="${task.telefone}" data-latitude="${task.latitude}" data-longitude="${task.longitude}" data-id="${doc.id}" name="compass"></ion-icon>
                    <small class="form-text" >Nome: </small><small class="form-text" id="name">${task.nome}</small><br>
                    <small class="form-text" >Telefone: </small><small class="form-text">${task.telefone}</small><br>
                    <small class="form-text" >Latitude: </small><small class="form-text">${task.latitude}</small><br>
                    <small class="form-text" >Longitude: </small><small class="form-text">${task.longitude}</small><br>
                </div>
                `;
        });
        container.innerHTML = html;







        const btneditdelete = container.querySelectorAll("#btn-arquive");

        btneditdelete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {

                const nome = (dataset.nome)
                const telefone = (dataset.telefone)
                const latitude = (dataset.latitude)
                const longitude = (dataset.longitude)

                nowsaveTask(nome, telefone, latitude, longitude);
            });
            return

        })

        btneditdelete.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deletenTask(dataset.id);
            });
        });

        const btndelete = container.querySelectorAll("#btn-delete");
        btndelete.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deletenTask(dataset.id);
            });
        });
    });
})