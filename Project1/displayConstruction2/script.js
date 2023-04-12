const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function()
            {
                if(this.readyState == 4 && this.status == 200)
                {
                    displayData(this.responseXML);
                }
            };
            xhr.open("GET", "construction.xml", true);
            xhr.send();

            function stringToNone (html)
            {
                const template = document.createElement("template");
                html = html.trim();
                template.innerHTML = html;
                return template.content.firstChild;
            }

            function createBuilding(b)
            {
                const workers = b.workers;
                let workersContent = "";
                for (let w = 0; w < workers.length; w++){
                    workersContent += `<tr>
                                            <td>${workers[w].firstName} ${workers[w].lastName} </td>
                                            <td>${workers[w].role}</td>
                                        </tr>`;
                }

                const equipments = b.equipments;
                let equipmentContent = "";
                for (let e = 0; e <equipments.length; e++){
                    equipmentContent += `<tr>
                                            <td>${equipments[e].type}</td>
                                            <td>${equipments[e].qty}</td>
                                        </tr>`;
                }

                const supplies = b.supplies;
                let supplyContent = "";
                for (let s = 0; s < supplies.length; s++){
                    supplyContent += `<tr>
                                            <td>${supplies[s].material}</td>
                                            <td>${supplies[s].qty}</td>
                                      </tr>`;
                }

                const content = 
                `<article class="building">
                    <img class="building-icon start-date-icon" src="/displayConstruction2/icons/calendarStart.png" alt="Calendar icon"/>
                    <div class="building-info start-date"> Start Date: ${b.startDate} </div>
                    <img class="building-icon end-date-icon" src="/displayConstruction2/icons/calendarEnd.png" alt="Calendar icon"/>
                    <div class="building-info end-date"> End Date: ${b.endDate}</div>
                    <img class="building-icon address-icon" src="/displayConstruction2/icons/address.png" alt="Address icon"/>
                    <div class="building-info address">Address: ${b.street}, ${b.city}, ${b.region}, ${b.country}</div>
                    <img class="building-icon contractor-icon" src="/displayConstruction2/icons/contractor.png" alt="Contractor icon"/>
                    <div class="building-info contractor">Contractor: ${b.contractorName} </div>
                    <div class="workers-div">
                        <h3> Workers </h3>
                        <table class = "table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${workersContent}
                            </tbody>
                        </table>
                    </div>
                    <div class="equipment-div">
                        <h3> Equipments </h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${equipmentContent}
                            </tbody>
                        </table>
                    </div>
                    <div class="material-div">
                        <h3>Materials</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Material</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${supplyContent}
                            </tbody>
                        </table>
                    </div>
                </article>`;

                return stringToNone(content);
            }

            function parseInfo(xml)
            {
                const startDate = xml.getElementsByTagName("startDate")[0].textContent;
                const endDate = xml.getElementsByTagName("endDate")[0].textContent;
                const street = xml.getElementsByTagName("street")[0].textContent;
                const city = xml.getElementsByTagName("city")[0].textContent;
                const region = xml.getElementsByTagName("region")[0].textContent;
                const country = xml.getElementsByTagName("country")[0].textContent;
                let contractorName = "";
                const contractors = xml.getElementsByTagName("contractors");
                if(contractors.length > 0){
                    contractorName = xml.getElementsByTagName("contractors")[0].textContent;
                } else {
                    contractorName = "N/A"
                }

                const workers = [];
                const workerNodes = xml.getElementsByTagName("worker");
                for (let i = 0; i < workerNodes.length; i++) {
                    const worker = workerNodes[i];
                    const firstName = worker.getElementsByTagName("firstName")[0].textContent;
                    const lastName = worker.getElementsByTagName("lastName")[0].textContent;
                    const role = worker.getElementsByTagName("role")[0].textContent;
                    workers.push({ firstName, lastName, role });
                }

                const equipments = [];
                const equipmentNodes = xml.getElementsByTagName("equipment");
                for (let j = 0; j < equipmentNodes.length; j++){
                    const equipment = equipmentNodes[j];
                    const type = equipment.getElementsByTagName("type")[0].textContent;
                    const qty = equipment.getElementsByTagName("qty")[0].textContent;
                    equipments.push({type, qty});
                }

                const supplies = [];
                const supplyNodes = xml.getElementsByTagName("supply");
                for (let k = 0; k < supplyNodes.length; k++){
                    const supply = supplyNodes[k];
                    const material = supply.getElementsByTagName("material")[0].textContent;
                    const qty = supply.getElementsByTagName("qty")[0].textContent;
                    supplies.push({material, qty});
                }


                return {startDate, endDate, street, city, region, country, contractorName, workers, equipments, supplies };
            }

            function displayData(xml)
            {
                const buildingsListing = document.getElementById("buildingsListing");
                const buildings = xml.getElementsByTagName("building");

                for(let i = 0; i < buildings.length; i++)
                {
                    const building = buildings[i];
                    const info = parseInfo(building);
                    const buildingElement = createBuilding(info);
                    buildingsListing.appendChild(buildingElement)
                }
            }