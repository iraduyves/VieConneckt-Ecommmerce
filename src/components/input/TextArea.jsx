/* eslint-disable react/prop-types */
import { useId } from "react"
import css from "./style.module.css"

export default function TextArea({
    type = "text",
    name = "",
    id = "",
    classname = "",
    placeholder,
    icon,
    icons,
    register,
    onChange = () => { },
    ...other
}) {
    const inputId = useId()
    return (
        <label htmlFor={id ?? inputId} className={css.input}>
            {icon && <span className={css.icon}>{icon}</span>  }
            <textarea
                type={type}
                name={name}
                id={id ?? inputId}
                className={`${classname}`}
                placeholder={placeholder}
                onChange={onChange}
                {...register}
                {...other}
            />
            {<span className={css.icon}>{icon}</span> &&icons  }
        </label>
    )
}