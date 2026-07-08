function pedir(producto, precio){
  let msg=`Hola! Quiero pedir: ${producto} - S/${precio}. ¿Hacen delivery?`;
  window.open(`https://wa.me/51936994155?text=${encodeURIComponent(msg)}`,'_blank');
}