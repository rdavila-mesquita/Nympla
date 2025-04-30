var allEvents = [];
var cardEvents = document.querySelector("#cardEvents");
var searchInput = document.querySelector("#searchInput");
var btnBuscar = document.querySelector("#btnBuscar");
var btnLimpar = document.querySelector("#btnLimpar");

document.querySelector("#btnLogout").addEventListener("click", logout);
btnBuscar.addEventListener("click", buscarEventos);
btnLimpar.addEventListener("click", limparBusca);

function buscarEventos() {
  const termo = searchInput.value.trim().toLowerCase();
  
  if (termo === "") {
    showAllEvents(allEvents);
    return;
  }

  const eventosFiltrados = allEvents.filter(evento =>
    evento.event_name.toLowerCase().includes(termo)
  );

  showAllEvents(eventosFiltrados);
}

function limparBusca() {
  searchInput.value = "";
  showAllEvents(allEvents);
}

async function onLoadPage() {
  try {
    const reply = await fetch("http://localhost:3000/auth/profile", {
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

    events();
  } catch (error) {
    console.error("Erro no onLoadPage:", error);
  }
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
            <button type="button" class="btn btn-primary btn-signup" data-event-id="${event.id}">Fazer inscrição</button>
            <button type="button" class="btn btn-link link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover detalhes-btn ms-5" data-event-id="${event.id}">Detalhes</button>
          </div>
        </div>
      </div>
    `;

    cardEvents.appendChild(colDiv);
    
  }

  const signUpButtons = document.querySelectorAll(".btn-signup");
  signUpButtons.forEach(button => {
    button.addEventListener("click", async function() {
      const eventId = this.getAttribute("data-event-id");
      await signUp(eventId);
    });
  });

  const detalhesButtons = document.querySelectorAll(".detalhes-btn");
  detalhesButtons.forEach(button => {
    button.addEventListener("click", async function() {
      const eventId = this.getAttribute("data-event-id");
      await showEventDetails(eventId);
    });
  });

}


async function signUp(eventId) {
  try {
    const reply = await fetch("http://localhost:3000/subscription/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        eventId: eventId
      })
    });

    if (reply.status !== 201) {
      alert("Usuário já está inscrito no evento!");
      return;
    }

    const data = await reply.json();
    console.log("Inscrição feita com sucesso:", data);
    alert("Inscrição feita com sucesso!");
  } catch (error) {
    console.error("Erro na função signUp:", error);
    alert("Erro ao fazer inscrição.");
  }
}

async function showEventDetails(eventId) {
  const detalhes = document.getElementById("detalhes");

  try {
    const response = await fetch(`http://localhost:3000/event/${eventId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar detalhes do evento");
    }

    const data = await response.json();

    detalhes.innerHTML = `
    <p><strong>Nome:</strong> ${data.events.event_name}</p>
    <p><strong>Data:</strong> ${new Date(data.events.date).toLocaleDateString('pt-BR')}</p>
    <p><strong>Descrição:</strong> ${data.events.description}</p>
  `;  

    const modal = new bootstrap.Modal(document.getElementById('modal'));
    modal.show();
  } catch (error) {
    detalhes.innerHTML = `<p style="color:red;">Erro ao carregar detalhes: ${error.message}</p>`;
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