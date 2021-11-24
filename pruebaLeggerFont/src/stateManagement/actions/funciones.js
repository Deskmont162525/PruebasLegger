// validar
const noPermitidos = ["#", "'", '"', "?", "¡", "¿", "+", "*", ","];

export const validateNombre_del_cliente = (dataForm) => {
    let errors, patt, res;
    patt = new RegExp("^[a-zA-ZñÑáéíóú]+$");
    res = patt.test(dataForm.Nombre_del_cliente);
    return !res
        ? (errors = "Solo se permiten letras")
        : "";
};

export const validateNit = (dataForm) => {
    let errors, filtrar, lastChar;
    lastChar = dataForm.Nit[dataForm.Nit.length - 1];
    filtrar = noPermitidos.includes(lastChar)

    if (dataForm.Nit === "" || dataForm.Nit !== "") {
        if (filtrar) {
            errors =
                "Este valor no esta permitido " + lastChar;
        }
        if (dataForm.Nit === "") {
            errors = "Este campo no puede estar vacio";
        }
    }
    return errors;
};

export const validateNombre_del_punto = (dataForm) => {
    let errors, filtrar, lastChar;
    lastChar = dataForm.Nombre_del_punto[dataForm.Nombre_del_punto.length - 1];
    filtrar = noPermitidos.includes(lastChar)
    return filtrar
        ? (errors = "Este valor no esta permitido " + lastChar)
        : "";
};

export const validateNombre_del_equipo = (dataForm) => {
    let errors, filtrar, lastChar;
    lastChar = dataForm.Nombre_del_equipo[dataForm.Nombre_del_equipo.length - 1];
    filtrar = noPermitidos.includes(lastChar)
    return filtrar
        ? (errors = "Este valor no esta permitido " + lastChar)
        : "";
};


export const validatePromotor = (dataForm) => {
    let errors, filtrar, lastChar;
    lastChar = dataForm.Promotor[dataForm.Promotor.length - 1];
    filtrar = noPermitidos.includes(lastChar)
    return filtrar
        ? (errors = "Este valor no esta permitido " + lastChar)
        : "";
};

export const validateRTC = (dataForm) => {
    let errors, patt, res;
    patt = new RegExp("^[0-9]+$");
    res = patt.test(dataForm.RTC);
    return !res
        ? (errors = "Solo se permiten numeros")
        : "";
};

export const validateCapitan = (dataForm) => {
    let errors, patt, res;
    patt = new RegExp("^[a-z]+$");
    res = patt.test(dataForm.Capitan);
    return !res
        ? (errors = "Solo se permiten minusculas")
        : "";
};


export const validatechecked = (checked) => {
    let errors;
    return checked === false
        ? (errors = "Debes aceptar los terminos para continuar")
        : "";
};

// shows
