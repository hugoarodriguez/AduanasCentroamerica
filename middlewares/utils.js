const validaFecha = async ( fecha ) => {

    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
      if ((fecha.match(RegExPattern)) && (fecha!='')) {
            return true;
      } else {
            return false;
      }
}



module.exports = {
    validaFecha
}