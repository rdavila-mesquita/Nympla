var allEvents = [];
var cardEvents = document.querySelector("#cardEvents");

document.querySelector("#btnLogout").addEventListener("click", logout);

async function onLoadPage() {
  /* Acessando o conteudo da rota admin */
  //TODO: refatorar para deixar uma unica funcao de fetch
  const reply = await fetch("http://localhost:3000/auth/admin", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  });

  const text = await reply.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error("Erro ao converter resposta para JSON:", e);
    return;
  }

  if (reply.status != 200) {
    alert("Access Denied!");
    return;
  }

  events()
}

async function events() {
  const reply = await fetch("http://localhost:3000/event/all", {
    method: "GET"
  });

  const data = await reply.json();

  allEvents = data.events;
  showAllEvents(allEvents);
}

function showAllEvents(events) {
  cardEvents.innerHTML = "";
  for (const event of events) {

    let eventDate = new Date(event.date);
    let options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    let formattedDate = eventDate.toLocaleDateString('pt-BR', options);

    var colDiv = document.createElement("div");
    colDiv.classList.add("col-md-3", "mb-4");

    colDiv.innerHTML = `
      <div class="card h-100">
        <img src="${event.image_url}" style="height: 200px" class="card-img-top" alt="${event.event_name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${event.event_name}</h5>
          <p class="card-text">${formattedDate}</p>
          <div class="mt-auto">
            <button type="button" class="btn btn-primary btn-subscriptions" data-event-id="${event.id}">Inscritos</button>
          </div>
        </div>
      </div>
    `;

    cardEvents.appendChild(colDiv);
    
  }

  const subscriptionButtons = document.querySelectorAll(".btn-subscriptions");
  subscriptionButtons.forEach(button => {
    button.addEventListener("click", async function() {
      const eventId = this.getAttribute("data-event-id");
      await showSubscriptionsByEvent(eventId);
    });
  });

}

async function showSubscriptionsByEvent(eventId) {
  const subscriptions = document.getElementById("subscriptions");

  try {
    const response = await fetch(`http://localhost:3000/subscription/event/${eventId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar inscrições do evento");
    }

    const data = await response.json();

    if (!data.subscriptions || data.subscriptions.length === 0) {
      subscriptions.innerHTML = "<p>Nenhuma inscrição encontrada para este evento.</p>";
    } else {
      let html = `
        <div class="table-responsive">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th>Inscrição</th>
                <th>Nome</th>
                <th>Check in</th>
              </tr>
            </thead>
            <tbody>
      `;

      for (const sub of data.subscriptions) {
        html += `
          <tr>
            <td>${sub.id}</td>
            <td class="text-warning fw-bold">${sub.name}</td>
            <td class="text-warning">${sub.check_in.charAt(0).toUpperCase() + sub.check_in.slice(1)}</td>
          </tr>
        `;
      }

      html += `
            </tbody>
          </table>
        </div>
      `;

      subscriptions.innerHTML = html;
    }

    const modal = new bootstrap.Modal(document.getElementById('modal'));
    modal.show();
  } catch (error) {
    subscriptions.innerHTML = `<p style="color:red;">Erro ao carregar inscrições: ${error.message}</p>`;
    const modal = new bootstrap.Modal(document.getElementById('modal'));
    modal.show();
  }
}


async function logout() {
const reply = await fetch("http://localhost:3000/user/logout", 
  {
    method: "POST",
  }
);

  if (reply.status != 200) {
    alert("Algo errado nao esta certo: " + reply.status);
    return;
  }

  const data = await reply.json();

  /* 1) Remover o token */
  window.localStorage.removeItem("token");

  /* 2) Redirecionar para login */
  window.location.href = data.redirect;
}