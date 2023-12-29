import { useId, useState } from "react";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const isEmail = (email) => EMAIL_REGEX.test(email);

export function CheckoutForm() {
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        cedula: "",
        telefono: "",
        pais: "Costa Rica",
        address: "",
        provincia: "",
        canton: "",
        distrito: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const keyName = e.target.name;
        setForm({ ...form, [keyName]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(form.email);

        if (!isEmail(form.email)) {
            setErrors(["Wrong email"]);
        }

        console.log(!isEmail(form.email));

        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitting(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} id="address-form">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((error) => (
                            <li key={error} className="">
                                {error}
                            </li>
                        ))}
                    </ul>
                )}
                <fieldset>
                    <legend>Información de contacto</legend>
                    <div className="form-group">
                        <input
                            type="email"
                            onChange={handleChange}
                            name="email"
                            placeholder=""
                            id="email"
                            autoComplete="email"
                            required
                        />
                        <label htmlFor="email">Correo electrónico (para enviarte el comprobante)</label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Dirección de envío</legend>
                    <div className="full-name-form-group">
                        <div className="form-group">
                            <input
                                type="text"
                                onChange={handleChange}
                                name="firstName"
                                placeholder=" "
                                id="name"
                                aria-required="true"
                                autoComplete="given-name"
                                maxLength="40"
                                inputMode="text"
                                required
                            />
                            <label htmlFor="name">Nombre</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                onChange={handleChange}
                                name="lastName"
                                placeholder=" "
                                id="lastname"
                                aria-required="true"
                                autoComplete="family-name"
                                maxLength="40"
                                inputMode="text"
                                required
                            />
                            <label htmlFor="lastname">Apellidos</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={handleChange}
                            name="cedula"
                            placeholder=" "
                            id="cedula"
                            autoComplete="on"
                            pattern="[0-9]{9}"
                            minLength="9"
                            maxLength="9"
                            inputMode="text"
                            required
                        />
                        <label htmlFor="cedula">Número de cédula o ID</label>
                    </div>
                    <div className="form-group">
                        <input type="tel" onChange={handleChange} name="telefono" placeholder=" " id="phone" autoComplete="tel" />
                        <label htmlFor="phone">Teléfono</label>
                    </div>
                    <div className="form-group">
                        <select
                            id="country"
                            onChange={handleChange}
                            name="pais"
                            value={form.pais}
                            className="form-control"
                            autoComplete="shipping country-name"
                        >
                            <option value="Costa Rica">Costa Rica</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={handleChange}
                            name="address"
                            placeholder=" "
                            id="address"
                            autoComplete="shipping address-line1"
                        />
                        <label htmlFor="address">Dirección exacta</label>
                    </div>
                    <div className="address-fields">
                        <div className="form-group">
                            <select
                                aria-label="Provincia"
                                id="provincia"
                                name="provincia"
                                className="form-control"
                                autoComplete="address-level1"
                            >
                                <option value="">Elegir provincia</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select
                                aria-label="Cantón"
                                id="canton"
                                name="canton"
                                className="form-control"
                                autoComplete="address-level2"
                            >
                                <option value="">Elegir cantón</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select
                                aria-label="Distrito"
                                id="distrito"
                                name="distrito"
                                className="form-control"
                                autoComplete="address-level3"
                            >
                                <option value="">Elegir distrito</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <button className="submit-button" type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </form>
        </>
    );
}
