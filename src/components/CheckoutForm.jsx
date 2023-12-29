import { useId, useState } from "react";
import { FormInput } from "../components/FormInput.jsx";
import { FormSelect } from "../components/FormSelect.jsx";
import { COSTA_RICA_ADDRESS } from "../utils/costaRica.js";

export function CheckoutForm() {
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        cedula: "",
        telefono: "",
        pais: "Costa Rica",
        address: "",
        provincia: "Heredia",
        canton: "Barva",
        distrito: "Barva",
    });

    const COSTA_RICA_DATA = {
        PROVINCIAS: [],
        CANTONES: [],
        DISTRITOS: [],
    };

    const KEYS = Object.keys(COSTA_RICA_ADDRESS);

    KEYS.forEach((key) => {
        const data = COSTA_RICA_ADDRESS[key];
        COSTA_RICA_DATA.PROVINCIAS.push(data.NAME);

        if (data.NAME === form.provincia) {
            const provinciaData = COSTA_RICA_ADDRESS[key].DATA;

            let cantones = [];
            let distritos = [];

            provinciaData.forEach((datos) => {
                if (!cantones.includes(datos.NOM_CANT)) {
                    cantones.push(datos.NOM_CANT);
                }
                if (form.canton === datos.NOM_CANT && !distritos.includes(datos.NOM_DIST)) {
                    distritos.push(datos.NOM_DIST);
                }
            });

            if (cantones.length > 0) {
                COSTA_RICA_DATA.CANTONES = cantones;
            }

            if (distritos.length > 0) {
                COSTA_RICA_DATA.DISTRITOS = distritos;
            }
        }
    });

    const inputs = {
        email: {
            id: "email",
            name: "email",
            type: "email",
            placeholder: "",
            errorMessage: "El formato del correo electrónico no es válido.",
            label: "Correo electrónico (para enviarte el comprobante)",
            required: true,
        },
        firstName: {
            id: "firstName",
            name: "firstName",
            type: "text",
            placeholder: "",
            errorMessage: "El nombre debe tener entre 2 y 40 caracteres alfabéticos.",
            label: "Nombre",
            required: true,
            autoComplete: "given-name",
            minLength: "2",
            maxLength: "30",
            pattern: "^[a-zA-Z]*",
        },
        lastName: {
            id: "lastName",
            name: "lastName",
            type: "text",
            placeholder: "",
            errorMessage: "Los apellidos deben tener entre 2 y 40 caracteres alfabéticos.",
            label: "Apellidos",
            required: true,
            autoComplete: "family-name",
            minLength: "2",
            maxLength: "40",
            pattern: "([A-Za-z]*)([ ]{0,1})([A-Za-z]*)",
        },
        cedula: {
            id: "cedula",
            name: "cedula",
            type: "text",
            placeholder: "",
            errorMessage: `La cédula ingresada no es válida. El formato correcto es #-####-#### o sin guiones.`,
            label: "Número de cédula o ID",
            autoComplete: "off",
            minLength: "9",
            maxLength: "11",
            pattern: `[1-9]\-?([0-9]{4})\-?[0-9]{4}`,
            required: true,
        },
        telefono: {
            id: "telefono",
            name: "telefono",
            type: "tel",
            placeholder: "",
            errorMessage: "El número de teléfono debe tener 8 digitos.",
            label: "Teléfono (opcional)",
            minLength: "8",
            maxLength: "8",
            pattern: `[0-9]{8}`,
            required: false,
            autoComplete: "tel",
        },
        address: {
            id: "address",
            name: "address",
            type: "text",
            placeholder: "",
            errorMessage: "La dirección debe de ser de más de 10 caracteres.",
            label: "Dirección exacta",
            minLength: "10",
            maxLength: "150",
            required: true,
            autoComplete: "shipping address-line1",
        },
    };

    const selects = {
        pais: {
            id: "pais",
            name: "pais",
            autoComplete: "shipping country-name",
            required: true,
            errorMessage: "Este campo es obligatorio",
        },
        provincia: {
            id: "provincia",
            name: "provincia",
            autoComplete: "address-level1",
            required: true,
            errorMessage: "Este campo es obligatorio",
        },
        canton: {
            id: "canton",
            name: "canton",
            autoComplete: "address-level2",
            required: true,
            errorMessage: "Este campo es obligatorio",
        },
        distrito: {
            id: "distrito",
            name: "distrito",
            autoComplete: "address-level3",
            required: true,
            errorMessage: "Este campo es obligatorio",
        },
    };

    const handleChange = (e) => {
        const keyName = e.target.name;
        setForm({ ...form, [keyName]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get("email");
        const nombre = formData.get("firstName");
        const apellidos = formData.get("lastName");
        const cedula = formData.get("cedula");
        const telefono = formData.get("telefono");
        const pais = formData.get("pais");
        const address = formData.get("address");
        const provincia = formData.get("provincia");
        const canton = formData.get("canton");
        const distrito = formData.get("distrito");

        const message = `Hola soy ${nombre} ${apellidos} \n, número de cédula: ${cedula} `;

        alert(message);
    };

    return (
        <>
            <form onSubmit={handleSubmit} id="address-form">
                <fieldset>
                    <legend>Información de contacto</legend>
                    <FormInput {...inputs.email} onChange={handleChange}></FormInput>
                </fieldset>
                <fieldset>
                    <legend>Dirección de envío</legend>
                    <div className="full-name-form-group">
                        <FormInput {...inputs.firstName} onChange={handleChange}></FormInput>
                        <FormInput {...inputs.lastName} onChange={handleChange}></FormInput>
                    </div>
                    <FormInput {...inputs.cedula} onChange={handleChange}></FormInput>
                    <FormInput {...inputs.telefono} onChange={handleChange}></FormInput>
                    <FormSelect {...selects.pais} onChange={handleChange}>
                        <option value="Costa Rica">Costa Rica</option>
                    </FormSelect>
                    <FormInput {...inputs.address} onChange={handleChange}></FormInput>

                    <div className="address-fields">
                        <FormSelect {...selects.provincia} onChange={handleChange}>
                            <option value="">Elegir provincia</option>
                            {COSTA_RICA_DATA.PROVINCIAS.map((provincia) => (
                                <option key={provincia} value={provincia}>
                                    {provincia}
                                </option>
                            ))}
                        </FormSelect>

                        <FormSelect {...selects.canton} onChange={handleChange}>
                            <option value="">Elegir cantón</option>
                            {COSTA_RICA_DATA.CANTONES.map((canton) => (
                                <option key={canton} value={canton}>
                                    {canton}
                                </option>
                            ))}
                        </FormSelect>

                        <FormSelect {...selects.distrito} onChange={handleChange}>
                            <option value="">Elegir distrito</option>
                            {COSTA_RICA_DATA.DISTRITOS.map((distrito) => (
                                <option key={distrito} value={distrito}>
                                    {distrito}
                                </option>
                            ))}
                        </FormSelect>
                    </div>
                </fieldset>

                <button className="submit-button" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
}