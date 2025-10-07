
                  // Obtener los parámetros de la URL
                  const params = new URLSearchParams(window.location.search);

                  // Obtener los valores de los parámetros
                  var nro_boleta = params.has('boleta') ? params.get('boleta') : "---";
                  var nombre_cliente = params.has('cliente') ? params.get('cliente') : "==Cliente==";
                  var telefono = params.has('telefono') ? params.get('telefono') : "==Cliente==";
                  var codigo_pais = params.has('codigo_pais') ? params.get('codigo_pais') : "+";
                  var fecha = params.has('fecha') ? params.get('fecha') : "dd/mm/aaaa hh:mm:ss";
                  var fecha_entrega = params.has('fecha_entrega') ? params.get('fecha_entrega') : "hh:mm:ss";
                  var fecha_entregado = params.has('fecha_entregado') ? params.get('fecha_entregado') : " ";
                  var total = params.has('total') ? params.get('total') : "";
                  var total_a_pagar = params.has('total_a_pagar') ? params.get('total_a_pagar') : " ";
                  var descuento = params.has('descuento') ? params.get('descuento') :  '0.00';
                  var a_cuenta = params.has('a_cuenta') ? params.get('a_cuenta') : " ";
                  var desc_por_prenda = params.has('desc_por_prenda') ? params.get('desc_por_prenda') : " ";
                  var pagado_con = params.has('pagado_con') ? params.get('pagado_con') : "--";
                  var a_cuenta_dos = params.has('a_cuenta_dos') ? params.get('a_cuenta_dos') : " ";
                  var pagado_con_dos = params.has('pagado_con_dos') ? params.get('pagado_con_dos') : "--";
                  var porcent_desc = params.has('porcent_desc') ? params.get('porcent_desc') : " ";
                  var porcent_desc_plata = params.has('porcent_desc_plata') ? params.get('porcent_desc_plata') : " ";
                  var total_por_pagar = params.has('total_por_pagar') ? params.get('total_por_pagar') : " ";
                  var estado = params.has('estado') ? params.get('estado') : "--";
                  var total_prendas = params.has('total_prendas') ? params.get('total_prendas') : "--";

                        
                  var cantidades = params.has('cantidades') ? params.get('cantidades') : "";
                  var descripciones = params.has('servicios') ? params.get('servicios') : "";
                  var detalle = params.has('detalles') ? params.get('detalles') : "";
                  var p_units = params.has('p_unit') ? params.get('p_unit') : "";
                  var subtotal = params.has('subtotal') ? params.get('subtotal') : "";
                  
                  //Formato de 2 decimales
                  //total = parseFloat(total).toLocaleString('es-ES', { minimumFractionDigits: 2 });
                  //descuento = parseFloat(descuento).toLocaleString('es-ES', { minimumFractionDigits: 2 });
                  //subtotal_desc = parseFloat(subtotal_desc).toLocaleString('es-ES', { minimumFractionDigits: 2 });
                  
                  //crea una lista de cada columna a partir de las comas.
                  cantidades = cantidades.split(",");
                  descripciones = descripciones.split(",");
                  detalle = detalle.split(",");
                  p_units = p_units.split(",");

                  //Crea una lista para mostrar en cada fila de la tabla
                  var result = [];
                  
                  cantidades.forEach(function(value, id) {
                      result[id] = {
                          cantidad: cantidades[id],
                          descripcion: descripciones[id], // + " " + detalles[id], // Descomenta si deseas concatenar la descripción con el detalle
                          detalle: detalle[id],
                          subtotal: subtotal[id],
                          precio_unit: parseFloat(p_units[id]).toFixed(2),
                        
                      };
                  });


                          function abrirPopup(event, url) {
                            event.preventDefault();
                            window.open(url,'Ticket','width=400,height=600,scrollbars=no,resizable=no,top=100,left=100');
                            }

                          var tablaBody = document.getElementById("tablaBody");
                              result.forEach(function(row) {
                          var newRow = document.createElement("tr");
                              newRow.className = "table-item";
                                      // Calcula el subtotal para el servicio actual
                          var subtotal = row.cantidad * parseFloat(row.precio_unit);
                              newRow.innerHTML = `
                                <td class="item" style="text-align: right;">${row.cantidad}</td>
                                <td class="item" style="text-align: right;">${row.descripcion}</td>
                                <td class="item" style="text-align: right;">${row.precio_unit}</td> <!-- Alinea a la derecha -->
                                <td class="item" style="text-align: right;">${subtotal.toFixed(2)}</td> <!-- Alinea a la derecha -->
                            `;

                            tablaBody.appendChild(newRow);
                              });

                                        document.querySelectorAll('.printbutton').forEach(function(element) {
                                    element.addEventListener('click', function() {
                                        /*print();*/
                                    });
                                });

 
                        // Función para acortar la URL
                        async function shortURL(url) {
                            const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
                            if (response.ok) {
                                return await response.text();
                            } else {
                                throw new Error("Error al acortar la URL");
                            }
                        }

                        // Modificamos la función para enviar el mensaje de WhatsApp
                        async function sendWhatsAppMessage() {
                            var currentURL = window.location.href;
                            
                            try {
                                // Acortamos la URL actual
                                var shortedURL = await shortURL(currentURL);
                                
                                var message = 'Hola!! somos de la lavandería ,  adjuntamos su ticket de atención virtual. Click en el link para ver el ticket 👇 ' +     
                                shortedURL;
                                
                                var whatsappLink = 'https://api.whatsapp.com/send?phone=' + codigo_pais + telefono + '&text=' + encodeURIComponent(message)+'?sharelink=1';
                                
                                window.open(whatsappLink, '_blank');
                            } catch (error) {
                                console.error("Error al acortar la URL:", error);
                                alert("Hubo un error al acortar la URL. Por favor, intente nuevamente.");
                            }
                        }

                        // Asignamos la nueva función al evento click del botón
                        //document.getElementById('whatsappButton').addEventListener('click', sendWhatsAppMessage);

                        // (FINALIZA EL CODIGO DE ACORTAR URL) ... -->

                            
                            // Función para imprimir el ticket
                        function printTicket() {
                          window.print();
                        }

                        // Asignar la función al evento click del botón de impresión
                        document.getElementById('impresoraButton').addEventListener('click', printTicket);
  
                            
                      

                          var nroBoletaElement = document.getElementById("nro_boleta_id").textContent = nro_boleta;
                          var fechaElement = document.getElementById("fecha").textContent = fecha;
                          var nombre_clientElement = document.getElementById("nombre_client").textContent = nombre_cliente;
                          var fecha_entregaElement = document.getElementById("fecha_entrega").textContent = fecha_entrega;
                          var totalElement = document.getElementById("total");totalElement.textContent = parseFloat(total).toFixed(2);
                          var descuentoElement = document.getElementById("descuento");descuentoElement.textContent = parseFloat(descuento).toFixed(2);
                          var a_cuentaElement = document.getElementById("a_cuenta");a_cuentaElement.textContent = parseFloat(a_cuenta).toFixed(2);
                          var a_cuenta_dosElement = document.getElementById("a_cuenta_dos"); a_cuenta_dosElement.textContent = parseFloat(a_cuenta_dos).toFixed(2);
                          var total_por_pagarElement = document.getElementById("total_por_pagar");total_por_pagarElement.textContent = parseFloat(total_por_pagar).toFixed(2);
                          //var porcent_descElement = document.getElementById("porcent_desc").textContent = porcent_desc;
                          //var porcent_desc_plataElement = document.getElementById("porcent_desc_plata").textContent = porcent_desc_plata;
                          var estadoElement = document.getElementById("estado").textContent = estado;
                          var total_prendasElement = document.getElementById("total_prendas").textContent = total_prendas;
                          var fecha_entregadoElement = document.getElementById("fecha_entregado").textContent = fecha_entregado;

                      // Obtén el botón de WhatsApp por su ID
                      var whatsappButton = document.getElementById('whatsappButton');
                      var impresoraButton = document.getElementById('impresoraButton');

                      // Obtén la URL actual
                      var currentURL = window.location.href;

                      // Verifica si la URL contiene "sharelink=1" y oculta el botón si es así
                      if (currentURL.indexOf('sharelink=1') !== -1) {
                          sendMessageButton.style.display = 'none';
                          impresoraButton.style.display = 'none';
                      }

    // Función para acortar la URL
    async function shortURL(url) {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        if (response.ok) {
            return await response.text();
        } else {
            throw new Error("Error al acortar la URL");
        }
    }

    // Lista de mensajes predefinidos
   const mensajes = [
        "Hola! Enviamos su ticket de atención: {link}",
        "Saludos! adjuntamos su ticket de atención: {link}",
        "Estimado usuario!! , adjuntamos su ticket: {link}",
        "Buen día! enviamos su nota de atenciión: {link}",
        "Estimado cliente, su ticket está disponible en el siguiente link: {link}",
        "Hola! en el siguiente linK podra visualizar su ticket de venta: {link}",
        "Saludos! para verificar su ticket, clik en el siguiente link: {link}",
        "Hola, adjuntamos el ticket de atención por el sevicio: {link}",
        "Estimado usuario , en el siguiente link podra encontrar su ticket: {link}",
        "Hola! para revisar el detalle de su ticket , clik en el siguiente link: {link}"
    ];

    document.getElementById('sendMessageButton').addEventListener('click', async function () {
        const statusMessage = document.getElementById('statusMessage');
        const sendMessageButton = document.getElementById('sendMessageButton');
        const whatsappButton = document.getElementById('whatsappButton');

        // Mostrar mensaje de carga
        statusMessage.style.display = 'block';
        statusMessage.textContent = 'Enviando mensaje...';
        statusMessage.className = 'loading';

        sendMessageButton.disabled = true; // Deshabilitar botón mientras se envía

        const url = "https://mensajero-evolution-api.ykf6ye.easypanel.host/message/sendMedia/maruminstancia"; // Cambia NOMBRE_INSTANCIA
        const apikey = "C4B877DFC488-4C58-B357-D6CF2E1E4813"; // Coloca aquí tu API key
        const numeroTelefono = `+51${telefono}`; // Coloca el número de teléfono del destinatario
        const longURL = window.location.href; // Obtiene la URL actual

        try {
            // Acortar la URL
            const shortedURL = await shortURL(longURL);

            // Obtener la hora, minuto y segundo actuales
            const ahora = new Date();
            const hora = ahora.getHours();
            const minuto = ahora.getMinutes();
            const segundo = ahora.getSeconds();

            // Calcular índice del mensaje usando hora, minuto y segundo
            const index = (hora + minuto + segundo) % mensajes.length;

            // Generar el mensaje final
            const captionMessage = `*MARUM CLEAN*\n\n${mensajes[index].replace("{link}", shortedURL)}`;

                     const body = {
                      "number": numeroTelefono,
                      "mediatype": "image",
                      "mimetype": "image/png",
                      "caption":captionMessage,
                      "media": "https://iili.io/F9H1qNa.png",
                      "fileName": "Imagem.png",
                      "delay": 1200,
                      "quoted": {
                          "key": { "id": "MESSAGE_ID" },
                          "message": { "conversation": "CONTENT_MESSAGE" }
                      },
                      "mentionsEveryOne": false,
                      "mentioned": ["51931200418"] // Número de ejemplo
                  };


                    const response = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'apikey': apikey
                                },
                                body: JSON.stringify(body)
                            });

                     const responseData = await response.json();

            if (response.ok) {
                // Mostrar mensaje de éxito después de 3 segundos
                setTimeout(() => {
                    statusMessage.textContent = '¡MENSAJE ENVIADO!';
                    statusMessage.className = 'success';

                    // Deshabilitar permanentemente el botón de WhatsApp después del envío
                    whatsappButton.disabled = true;
                    whatsappButton.style.opacity = "0.5"; // Dar un efecto visual de deshabilitado
                    whatsappButton.style.cursor = "not-allowed";
                }, 3000);
            } else {
                console.error('Error en la respuesta:', responseData);
                statusMessage.textContent = `Error: ${responseData.message || 'AL PARECER EL NUMERO NO TIENE WHATSAPP, VERIFIQUE POR FAVOR'}`;
                statusMessage.className = 'error';
                sendMessageButton.disabled = false;
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            statusMessage.textContent = `Error en la solicitud: ${error.message}`;
            statusMessage.className = 'error';
            sendMessageButton.disabled = false;
        }
    });

    // Ocultar botones si la URL contiene "sharelink=1"
    var whatsappButton = document.getElementById('whatsappButton');
    var impresoraButton = document.getElementById('impresoraButton');
    var currentURL = window.location.href;

    if (currentURL.indexOf('sharelink=1') !== -1) {
        whatsappButton.style.display = 'none';
        impresoraButton.style.display = 'none';
    }

    console.log(`Teléfono obtenido: ${telefono}`);
        
