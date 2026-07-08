function cambiarPais(){
  pais = document.getElementById('selectorPais').value;
  let simbolo = 'S/';
  let precioFinal = precioBase;
  
  if(pais === 'MXN'){ simbolo = '$'; precioFinal = precioBase * 5.5; }
  if(pais === 'CLP'){ simbolo = '$'; precioFinal = precioBase * 1000; }
  if(pais === 'COP'){ simbolo = '$'; precioFinal = precioBase * 1300; }
  
  document.getElementById('btnPais').innerText = '⚡ País: ' + pais;
  document.getElementById('precioConvertido').innerText = simbolo + Math.round(precioFinal);
}