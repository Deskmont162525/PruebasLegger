import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../../styles/stylesNInter.css';
import '../../styles/stylesExport.css';
import Image1 from '../../assets/images/KV.png';
import Image2 from '../../assets/images/person-blue-shirt.png';
import { postCrearLead } from '../../stateManagement/actions/postLead';
import { validateCapitan, validatechecked, validateNit, validateNombre_del_cliente, validateNombre_del_equipo, validateNombre_del_punto, validatePromotor, validateRTC } from '../../stateManagement/actions/funciones';
import { TOKEN_SECRET } from '../../consts/actionConsts';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function InicioViews() {

    const dispatch = useDispatch();
    const { leads } = useSelector((e) => e.userReducer);
    const [errors, setErrors] = useState({});
    const [dataForm, setDataForm] = useState({
        Nombre_del_cliente: "",
        Nit: "",
        Nombre_del_punto: "",
        Nombre_del_equipo: "",
        Ciudad: "",
        Promotor: "",
        RTC: 0,
        Capitan: "",

    });
    const [checked, setChecked] = useState(false);
    const [verForm, setVerForm] = useState(true);
    const [verExpor, setVerExpor] = useState(false);
    const [verExport, setVerExport] = useState(false);
    const [token, setToken] = useState("");
    const [fechaFilt, setFechaFilt] = useState("");
    const dataFiltradaFecha = leads?.filter((e) => e?.Fecha >= fechaFilt)

    const handleChangeFecha = (e) => {
        setFechaFilt(e.target.value)
    }

    const handleChangeToken = (e) => {
        setToken(e.target.value)
    }

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === "Nit") {
            setErrors({
                Nit: validateNit({
                    ...dataForm,
                    [e.target.name]: e.target.value,
                }),
            });
        }

        if (e.target.name === "Nombre_del_cliente") {
            setErrors({
                Nombre_del_cliente: validateNombre_del_cliente({
                    ...dataForm,
                    [e.target.name]: e.target.value,
                }),
            });
        }

        if (e.target.name === "Nombre_del_punto") {
            setErrors({
                Nombre_del_punto: validateNombre_del_punto({
                    ...dataForm,
                    [e.target.name]: e.target.value,
                }),
            });
        }

        if (e.target.name === "Nombre_del_equipo") {
            setErrors({
                Nombre_del_equipo: validateNombre_del_equipo({
                    ...dataForm,
                    [e.target.name]: e.target.value,
                }),
            });
        }

        if (e.target.name === "Promotor") {
            setErrors({
                Promotor: validatePromotor({
                    ...dataForm,
                    [e.target.name]: e.target.value,
                }),
            });
        }

        if (e.target.name === "RTC") {
            setErrors({
                RTC: validateRTC({
                    ...dataForm,
                    [e.target.name]: e.target.value,
                }),
            });
        }


        if (e.target.name === "Capitan") {
            setErrors({
                Capitan: validateCapitan({
                    ...dataForm,
                    [e.target.name]: e.target.value,
                }),
            });
        }

    };

    const sendToken = () => {
        if (token === TOKEN_SECRET) {
            setErrors({
                Token: ""
            });
            setVerExport(true);
            setVerExpor(false);
        } else {
            setErrors({
                Token: "El token es incorrecto"
            });
        }
    }

    const sendExport = () => {
        setVerExport(false);
        setVerExpor(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            (errors.Capitan !== undefined && errors.Capitan !== "") ||
            (errors.RTC !== undefined && errors.RTC !== "") ||
            (errors.Promotor !== undefined && errors.Promotor !== "") ||
            (errors.Nombre_del_equipo !== undefined && errors.Nombre_del_equipo !== "") ||
            (errors.Nombre_del_punto !== undefined && errors.Nombre_del_punto !== "") ||
            (errors.Nombre_del_cliente !== undefined && errors.Nombre_del_cliente !== "") ||
            dataForm.Nit === "" || (errors.Nit === "" && errors.Nit === undefined) ||
            checked === false

        ) {

            if (errors.Capitan !== "") {
                setErrors({
                    Capitan: validateCapitan({
                        ...dataForm,
                        [e.target.name]: e.target.value,
                    }),
                });
            }

            if (errors.RTC !== "") {
                setErrors({
                    RTC: validateRTC({
                        ...dataForm,
                        [e.target.name]: e.target.value,
                    }),
                });
            }

            if (errors.Promotor !== "") {
                setErrors({
                    Promotor: validatePromotor({
                        ...dataForm,
                        [e.target.name]: e.target.value,
                    }),
                });
            }

            if (errors.Nombre_del_equipo !== "") {
                setErrors({
                    Nombre_del_equipo: validateNombre_del_equipo({
                        ...dataForm,
                        [e.target.name]: e.target.value,
                    }),
                });
            }

            if (errors.Nombre_del_punto !== "") {
                setErrors({
                    Nombre_del_punto: validateNombre_del_punto({
                        ...dataForm,
                        [e.target.name]: e.target.value,
                    }),
                });
            }

            if (errors.Nombre_del_cliente !== "") {
                setErrors({
                    Nombre_del_cliente: validateNombre_del_cliente({
                        ...dataForm,
                        [e.target.name]: e.target.value,
                    }),
                });
            }

            if (checked === false) {
                setErrors({
                    checked: validatechecked(checked),
                });
            }

            if (dataForm.Nit === "") {
                setErrors({
                    Nit: validateNit({
                        ...dataForm,
                        [e.target.name]: e.target.value,
                    }),
                });
            }


        } else {

            dispatch(postCrearLead(dataForm));
            setDataForm({
                Nombre_del_cliente: "",
                Nit: "",
                Nombre_del_punto: "",
                Nombre_del_equipo: "",
                Ciudad: "",
                Promotor: "",
                RTC: 0,
                Capitan: ""
            });
            setVerForm(false);
            setVerExpor(true);
        }
    };

    const showForm = () => {
        if (verForm)
            return (
                <div >
                    <div className="card">
                        <form className="formIni" onSubmit={(e) => handleSubmit(e)}>
                            <div className="titleIni">
                                <div className="numberCircle">1.</div>
                                <h1 className="form-top">Inscripción punto de venta</h1>
                            </div>
                            <div className="container">
                                <div className="form-group">
                                    <div className="col-sm-9">
                                        <input onChange={handleChange} type="text"
                                            className={
                                                errors.Nombre_del_cliente === ""
                                                    ? "okInput"
                                                    : errors.Nombre_del_cliente !== undefined
                                                        ? "errorInput"
                                                        : "form-control"
                                            }
                                            name="Nombre_del_cliente" placeholder="Nombre del cliente" />
                                    </div>
                                    {errors.Nombre_del_cliente === undefined ||
                                        errors.Nombre_del_cliente === "" ? "" : (
                                        <p className="infoError">{errors.Nombre_del_cliente}</p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-9">
                                        <input onChange={handleChange} type="text"
                                            className={
                                                dataForm.Nit !== ""
                                                    ? "okInput"
                                                    : errors.Nit !== undefined
                                                        ? "errorInput"
                                                        : "form-control"
                                            }
                                            name="Nit" placeholder="Nit" />
                                    </div>
                                    {errors.Nit === undefined ||
                                        errors.Nit === "" ? "" : (
                                        <p className="infoError">{errors.Nit}</p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-9">
                                        <input onChange={handleChange} type="text"
                                            className={
                                                errors.Nombre_del_punto === ""
                                                    ? "okInput"
                                                    : errors.Nombre_del_punto !== undefined
                                                        ? "errorInput"
                                                        : "form-control"
                                            }
                                            name="Nombre_del_punto" placeholder="Nombre del punto" />
                                    </div>
                                    {errors.Nombre_del_punto === undefined ||
                                        errors.Nombre_del_punto === "" ? "" : (
                                        <p className="infoError">{errors.Nombre_del_punto}</p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-9">
                                        <input type="text"
                                            onChange={handleChange}
                                            className={
                                                errors.Nombre_del_equipo === ""
                                                    ? "okInput"
                                                    : errors.Nombre_del_equipo !== undefined
                                                        ? "errorInput"
                                                        : "form-control"
                                            }
                                            name="Nombre_del_equipo" placeholder="Nombre del equipo" />
                                    </div>
                                    {errors.Nombre_del_equipo === undefined ||
                                        errors.Nombre_del_equipo === "" ? "" : (
                                        <p className="infoError">{errors.Nombre_del_equipo}</p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <select onChange={handleChange}
                                                    className="form-control col-sm-12"
                                                    name="Ciudad">
                                                    <option value="" hidden>Cuidad</option>
                                                    <option value="Cali">Cali</option>
                                                    <option value="Medellin">Medellin</option>
                                                    <option value="Popayan">Popayan</option>
                                                    <option value="Manizales">Manizales</option>
                                                    <option value="Pereira">Pereira</option>
                                                    <option value="Bogota">Bogota</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-9">
                                        <input onChange={handleChange} type="text"
                                            className={
                                                errors.Promotor === ""
                                                    ? "okInput"
                                                    : errors.Promotor !== undefined
                                                        ? "errorInput"
                                                        : "form-control"
                                            }
                                            name="Promotor" placeholder="Promotor" />
                                    </div>
                                    {errors.Promotor === undefined ||
                                        errors.Promotor === "" ? "" : (
                                        <p className="infoError">{errors.Promotor}</p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-9">
                                        <input onChange={handleChange} type="text"
                                            className={
                                                errors.RTC === ""
                                                    ? "okInput"
                                                    : errors.RTC !== undefined
                                                        ? "errorInput"
                                                        : "form-control"
                                            }
                                            name="RTC" placeholder="RTC" />
                                    </div>
                                    {errors.RTC === undefined ||
                                        errors.RTC === "" ? "" : (
                                        <p className="infoError">{errors.RTC}</p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <div className="col-sm-6">
                                        <input onChange={handleChange} type="text"
                                            className={
                                                errors.Capitan === ""
                                                    ? "okInput"
                                                    : errors.Capitan !== undefined
                                                        ? "errorInput"
                                                        : "form-control"
                                            }
                                            name="Capitan" placeholder="Capitan y/o Usuario (Solo minúsculas)" id="cvv" />
                                    </div>
                                    {errors.Capitan === undefined ||
                                        errors.Capitan === "" ? "" : (
                                        <p className="infoError">{errors.Capitan}</p>
                                    )}
                                </div>
                                <div className="form-group2">

                                    <input
                                        className="form-check-input"
                                        onChange={() => setChecked(!checked)} type="checkbox" id="check2" name="Terminos" />
                                    <div className="label">
                                        <label>Acepto los términos y condiciones, y confirmo que he leído las políticas de privacidad.</label>
                                        {errors.checked === undefined ||
                                            errors.checked === "" ? "" : (
                                            <p className="infoError">{errors.checked}</p>
                                        )}
                                    </div>

                                </div>
                                <br />
                                <div className="payIni">

                                    <button type="submit" className="btn " id="pay-now">Sigiente</button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
    }

    const showConfirmacion = () => {
        if (verExpor)
            return (
                <div className="card">
                    <div className="cardExport">
                        <img className="imgExport" src={Image2} alt="hero" />
                        <br />
                        <h2>LEGGER</h2>
                        <p>Gracias por utilizar nuestro servicio</p>
                        <hr />
                        <p>Si deseas descargar la informacion ingresa tu token</p>
                        <div className="form-group">
                            <div className="col-sm-9">
                                <input onChange={handleChangeToken} type="text"
                                    className={
                                        errors.Token === ""
                                            ? "okInput"
                                            : errors.Token !== undefined
                                                ? "errorInput"
                                                : "form-control"
                                    }
                                    name="Token" placeholder="Token" />
                            </div>
                            {errors.Token === undefined ||
                                errors.Token === "" ? "" : (
                                <p className="infoError">{errors.Token}</p>
                            )}
                            <div className="payIni">
                                <button
                                    onClick={sendToken}
                                    type="submit" className="btn " id="pay-now">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }

    const showVerExport = () => {
        if (verExport)
            return (
                <div className="card">
                    <div className="cardExport">
                        <img className="imgExport" src={Image2} alt="hero" />
                        <br />
                        <h2>LEGGER</h2>
                        <p>Tu informacion se descargara en formato excel</p>
                        <hr />
                        <p>Si no seleccionas una fecha se descargara toda la informacion</p>
                        <div className="form-group">
                            <div className="col-sm-9">
                                <input onChange={handleChangeFecha} type="date"
                                    className="form-control"
                                    name="Fecha" placeholder="Token" />
                            </div>
                        </div>
                        <ExcelFile element={
                            <div className="payIni">
                                <button
                                    onClick={sendExport}
                                    type="submit" className="btn " id="pay-now">Exportar</button>
                            </div>
                        } filename="Excel Legger">
                            <ExcelSheet data={dataFiltradaFecha} name="Leads">
                                <ExcelColumn label="Nombre_del_cliente" value="Nombre_del_cliente" />
                                <ExcelColumn label="Nit" value="Nit" />
                                <ExcelColumn label="Nombre_del_punto" value="Nombre_del_punto" />
                                <ExcelColumn label="Nombre_del_equipo" value="Nombre_del_equipo" />
                                <ExcelColumn label="Ciudad" value="Ciudad" />
                                <ExcelColumn label="Promotor" value="Promotor" />
                                <ExcelColumn label="RTC" value="RTC" />
                                <ExcelColumn label="Capitan" value="Capitan" />
                                <ExcelColumn label="Fecha" value="Fecha" />
                            </ExcelSheet>
                        </ExcelFile>
                    </div>
                </div>
            )

    }

    return (

        <div className="divBodyIni">
            <img className="imagen1" src={Image1} alt="not fount" />
            {showForm()}
            {showConfirmacion()}
            {showVerExport()}
        </div>

    )
}