const setInfoModal = (nombre, balance, id) => {
  $("#nombreEdit").val(nombre);
  $("#balanceEdit").val(balance);
  // "data-id", id
  $("#editButton").attr("onclick", `editUsuario('${id}')`);
};

const editUsuario = async (id) => {
  //name
  const nombre = $("#nombreEdit").val();
  const balance = $("#balanceEdit").val();
  try {
    //`http://localhost:3000/usuario?id=${id}`
    const { data } = await axios.put(`http://localhost:3000/usuario/${id}`, {
      nombre,
      balance,
    });
    $("#exampleModal").modal("hide");
    location.reload();
  } catch (e) {
    alert("Algo salió mal..." + e);
  }
};

$("form:first").submit(async (e) => {
  e.preventDefault();
  let nombre = $("form:first input:first").val();
  let balance = Number($("form:first input:nth-child(2)").val());
  try {
    const response = await fetch("http://localhost:3000/usuario", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        balance,
      }),
    });
    $("form:first input:first").val("");
    $("form:first input:nth-child(2)").val("");
    location.reload();
  } catch (e) {
    alert("Algo salió mal ..." + e);
  }
});
//aqui revisar
$("form:last").submit(async (e) => {
  e.preventDefault();
  let emisor = $("form:last select:first").val();
  let receptor = $("form:last select:last").val();
  let monto = $("#monto").val();
  console.log("Emisor:", emisor);
  console.log("Receptor:", receptor);
  console.log("Monto:", monto);
  if (!monto || !emisor || !receptor) {
    alert("Debe seleccionar un emisor, receptor y monto a transferir");
    return false;
  }
  try {
    const response = await fetch("http://localhost:3000/transferencia", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emisor,
        receptor,
        monto,
      }),
    });
    const data = await response.json();
    location.reload();
  } catch (error) {
    console.log(error);
    alert("Algo salió mal..." + error);
  }
});

const getUsuarios = async () => {
  const response = await fetch("http://localhost:3000/usuarios");
  let data = await response.json();
  $(".usuarios").html("");

  $.each(data, (i, c) => {
    $(".usuarios").append(`
              <tr>
                <td>${c.nombre}</td>
                <td>${c.balance}</td>
                <td>
                  <button
                    class="btn btn-warning mr-2"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onclick="setInfoModal('${c.nombre}', '${c.balance}', '${c.id}')"
                  ><i class="fa-solid fa-file-pen"></i>
                    Editar</button
                  ><button class="btn btn-danger" onclick="eliminarUsuario('${c.id}')"><i class="fa-solid fa-trash-can"></i> Eliminar</button>
                </td>
              </tr>
         `);

    $("#emisor").append(`<option value="${c.id}">${c.nombre}</option>`);
    $("#receptor").append(`<option value="${c.id}">${c.nombre}</option>`);
  });
};

const eliminarUsuario = async (id) => {
  //`http://localhost:3000/usuario?id=${id}`
  const response = await fetch(`http://localhost:3000/usuario/${id}`, {
    method: "DELETE",
  });
  getUsuarios();
};

const getTransferencias = async () => {
  const { data } = await axios.get("http://localhost:3000/transferencias");
  $(".transferencias").html("");

  //aqui se recibia un array y se paso un objeto de la baseDatos
  data.forEach((t) => {
    $(".transferencias").append(`
       <tr>       
         <td> ${formatDate(t.fecha)} </td>
         <td> ${t["emisor_nombre"]} </td>
         <td> ${t.receptor_nombre} </td>
         <td> ${t.monto} </td>
       </tr>
     `);
  });
};

getUsuarios();
getTransferencias();

const formatDate = (date) => {
  const dateFormat = moment(date).format("L");
  const timeFormat = moment(date).format("LTS");
  return `${dateFormat} ${timeFormat}`;
};
formatDate();
