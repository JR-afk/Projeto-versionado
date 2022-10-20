import {
    onSnapshot,
    collection,
    db,
    nowdeleteTask,
    getnTask,
    savenTask,
} from "../base.js";

const formulario = document.getElementById("formula");
const container = document.getElementById("descontainer");
let editStatus = false;
let id = '';
window.addEventListener("DOMContentLoaded", async() => {
    onSnapshot(collection(db, "desarquivadas"), (querySnapshot) => {
        let html = "";
        querySnapshot.forEach((doc) => {
            const task = doc.data();
            html += `  
                <div id="lista" class="box mb-4">
                    <ion-icon style="display: flex;float: right; background: var(--corpadrao); height: 24px; width: 24px; color: #dc3545;" id="btn-delete" data-id="${doc.id}" name="close-circle"></ion-icon>
                    <ion-icon style="display: flex;float: right; background: var(--corpadrao); height: 24px; width: 24px; color: #dc3545;" id="btn-arquive" data-nome="${task.nome}" data-telefone="${task.telefone}" data-latitude="${task.latitude}" data-longitude="${task.longitude}" data-id="${doc.id}" name="checkmark-circle"></ion-icon>
                    <small class="form-text" >Nome: </small><small class="form-text" id="name">${task.nome}</small><br>
                    <small class="form-text" >Telefone: </small><small class="form-text">${task.telefone}</small><br>
                    <small class="form-text" >Latitude: </small><small class="form-text">${task.latitude}</small><br>
                    <small class="form-text" >Longitude: </small><small class="form-text">${task.longitude}</small>
                    <button class="btn btn-danger" style="float: right;" id="btn-local" data-latitude="${task.latitude}" data-longitude="${task.longitude}">Localizar</button><br>
                </div>
                `;
        });
        container.innerHTML = html;

        const btnlocal = container.querySelectorAll('#btn-local');


        btnlocal.forEach(bt => {
            bt.addEventListener('click', ({
                target: {
                    dataset
                }
            }) => {
                renderizarMapa(dataset.latitude, dataset.longitude);

                function renderizarMapa(Longitude, Latitude) {
                    var featureOverlay = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: [new ol.Feature({

                                geometry: new ol.geom.Point(ol.proj.fromLonLat([Latitude, Longitude]))
                            })]
                        }),
                        style: new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 3,
                                fill: new ol.style.Fill({
                                    color: '#D9307F'
                                })
                            })
                        }),

                    });
                    featureOverlay.setMap(map);
                    map.getView().setCenter(ol.proj.fromLonLat([Latitude, Longitude]));
                    map.getView().setZoom(17);
                }
            })
        })

        const btneditdelete = container.querySelectorAll("#btn-arquive");

        btneditdelete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {

                const nome = (dataset.nome)
                const telefone = (dataset.telefone)
                const latitude = (dataset.latitude)
                const longitude = (dataset.longitude)

                savenTask(nome, telefone, latitude, longitude);
            });
            return

        })

        btneditdelete.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                nowdeleteTask(dataset.id);
            });
        });

        const btndelete = container.querySelectorAll("#btn-delete");
        btndelete.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                nowdeleteTask(dataset.id);
            });
        });
    });
});