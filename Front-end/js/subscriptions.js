var allEvents = [];
var cardEvents = document.querySelector("#cardEvents");
var currentUserId = null;
document.querySelector("#btnLogout").addEventListener("click", logout);

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
      window.localStorage.setItem("userId", data.userId);

    } catch (e) {
      console.error("Erro ao converter resposta para JSON:", e);
      return;
    }

    if (reply.status != 200) {
      alert("Access Denied!");
      return;
    }

    currentUserId = data.userId;
    userEvents();
  } catch (error) {
    console.error("Erro no onLoadPage:", error);
  }
}

async function userEvents() {
  const userId = window.localStorage.getItem("userId");
  const reply = await fetch(`http://localhost:3000/subscription/user/${userId}`, { 
    method: "GET" 
  });

  if (!reply.ok) {
    console.warn("Nenhum evento encontrado para o usuário.");
    cardEvents.innerHTML = "<p class='text-center'>Você não está inscrito em nenhum evento ainda!</p>";
    return;
  }

  const data = await reply.json();

  allEvents = data.userEvents || [];
  showAllUserEvents(allEvents);
  console.log("allEvents:", allEvents);

}

function showAllUserEvents(events) {
  cardEvents.innerHTML = "";
  for (const event of events) {
    let eventDate = new Date(event.date);
    let options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    let formattedDate = eventDate.toLocaleDateString('pt-BR', options);

    var colDiv = document.createElement("div");
    colDiv.classList.add("mb-4");

    colDiv.innerHTML = `
      <div class="card mb-3 shadow-sm">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${event.image_url}" class="img-fluid rounded-start h-100 object-fit-cover" alt="${event.event_name}">
          </div>
          <div class="col-md-10 d-flex flex-column justify-content-between">
            <div class="card-body pb-0">
              <h5 class="card-title fw-bold">${event.event_name}</h5>
              <p class="card-text text-success fw-semibold">${formattedDate}</p>
              <div class="d-flex justify-content-end">
                <button class="btn btn-danger " onclick="cancelSubscription('${event.id}')">Cancelar Inscrição</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    cardEvents.appendChild(colDiv);
  }
}


async function cancelSubscription(subscriptionId) {
  if (!confirm("Tem certeza que deseja cancelar a inscrição?")) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/subscription/${subscriptionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      alert('Inscrição cancelada com sucesso!');
      onLoadPage();
    } else {
      const data = await response.json();
      alert('Erro ao cancelar inscrição: ' + (data.error || 'Erro desconhecido'));
    }
  } catch (error) {
    console.error('Erro ao cancelar inscrição:', error);
    alert('Erro de conexão.');
  }
}


async function logout() {
  const reply = await fetch("http://localhost:3000/user/logout", {
    method: "POST",
  });

  if (reply.status != 200) {
    alert("Algo errado nao esta certo: ", reply.status);
    return;
  }

  const data = await reply.json();
  console.log(data);

  /* 1) Remove o token */
  window.localStorage.removeItem("token");

  /* 2) Remove o id */
  window.localStorage.removeItem("userId");

  /* 3) Redirecionar para a pagina de login */
  window.location.href = data.redirect;
}