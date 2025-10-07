// ==================== CAPTURA DE PARÁMETROS ====================
const params = new URLSearchParams(window.location.search);
const get = (key, def = "") => params.has(key) ? params.get(key) : def;

let nro_boleta = get('boleta', "---");
let nombre_cliente = get('cliente', "==Cliente==");
let telefono = get('telefono', "000000000");
let codigo_pais = get('codigo_pais', "+51");
let fecha = get('fecha', "dd/mm/aaaa hh:mm:ss");
let fecha_entrega = get('fecha_entrega', "--");
let total = get('total', "0.00");
let descuento = get('descuento', "0.00");
let a_cuenta = get('a_cuenta', "0.00");
let a_cuenta_dos = get('a_cuenta_dos', "0.00");
let total_por_pagar = get('total_por_pagar', "0.00");
let estado = get('estado', "--");
let total_prendas = get('total_prendas', "0");

// ==================== DETALLES DE TABLA ====================
let cantidades = get('cantidades', "").split(",");
let descripciones = get('servicios', "").split(",");
let detalle = get('detalles', "").split(",");
let p_units = get('p_unit', "").split(",");

let result = [];
cantidades.forEach((v, i) => {
  result.push({
    cantidad: v,
    descripcion: descripciones[i],
    detalle: detalle[i],
    precio_unit: parseFloat(p_units[i] || 0).toFixed(2)
  });
});

let tablaBody = document.getElementById("tablaBody");
result.forEach(row => {
  let tr = document.createElement("tr");
  tr.className = "table-item";
  let subtotal = row.cantidad * parseFloat(row.precio_unit);
  tr.innerHTML = `
    <td class="item" style="text-align:right;">${row.cantidad}</td>
    <td class="item" style="text-align:right;">${row.descripcion}</td>
    <td class="item" style="text-align:right;">${row.precio_unit}</td>
    <td class="item" style="text-align:right;">${subtotal.toFixed(2)}</td>
  `;
  tablaBody.appendChild(tr);
});

// ==================== LLENAR CAMPOS ====================
document.getElementById("nro_boleta_id").textContent = nro_boleta;
document.getElementById("fecha").textContent = fecha;
document.getElementById("nombre_client").textContent = nombre_cliente;
document.getElementById("fecha_entrega").textContent = fecha_entrega;
document.getElementById("total").textContent = parseFloat(total).toFixed(2);
document.getElementById("descuento").textContent = parseFloat(descuento).toFixed(2);
document.getElementById("a_cuenta").textContent = parseFloat(a_cuenta).toFixed(2);
document.getElementById("a_cuenta_dos").textContent = parseFloat(a_cuenta_dos).toFixed(2);
document.getElementById("total_por_pagar").textContent = parseFloat(total_por_pagar).toFixed(2);
document.getElementById("estado").textContent = estado;
document.getElementById("total_prendas").textContent = total_prendas;

// ==================== FUNCIONES ====================
function printTicket() { window.print(); }
document.getElementById('impresoraButton').addEventListener('click', printTicket);

// ==================== WHATSAPP ====================
async function shortURL(url) {
  const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
  if (res.ok) return res.text();
  throw new Error("Error al acortar URL");
}

const mensajes = [
  "Hola! Enviamos su ticket de atención: {link}",
  "Saludos! adjuntamos su ticket: {link}",
  "Estimado usuario!! , adjuntamos su ticket: {link}",
  "Buen día! enviamos su nota de atención: {link}",
  "Estimado cliente, su ticket está disponible: {link}"
];

document.getElementById('sendMessageButton').addEventListener('click', async () => {
  const status = document.getElementById('statusMessage');
  status.textContent = "Enviando mensaje...";
  const apiURL = "https://mensajero-evolution-api.ykf6ye.easypanel.host/message/sendMedia/maruminstancia";
  const apikey = "C4B877DFC488-4C58-B357-D6CF2E1E4813";
  const numero = `+51${telefono}`;
  try {
    const shorted = await shortURL(window.location.href);
    const index = new Date().getSeconds() % mensajes.length;
    const caption = `*MARUM CLEAN*\n\n${mensajes[index].replace("{link}", shorted)}`;
    const body = {
      number: numero,
      mediatype: "image",
      mimetype: "image/png",
      caption: caption,
      media: "https://iili.io/F9H1qNa.png",
      fileName: "ticket.png"
    };
    const res = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": apikey },
      body: JSON.stringify(body)
    });
    status.textContent = res.ok ? "¡MENSAJE ENVIADO!" : "Error al enviar mensaje";
  } catch (err) {
    status.textContent = "Error: " + err.message;
  }
});

// ==================== OCULTAR BOTONES SHARELINK ====================
if (window.location.href.includes("sharelink=1")) {
  document.getElementById("sendMessageButton").style.display = "none";
  document.getElementById("impresoraButton").style.display = "none";
}
