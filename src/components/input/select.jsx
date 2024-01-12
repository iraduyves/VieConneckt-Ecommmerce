/* eslint-disable react/prop-types */
import { useId } from "react"
import css from "./style.module.css"

export default function Select({
    type = "text",
    name = "",
    id = "",
    classname = "",
    // placeholder,
    options = [],
    children,
    icon,
    icons,
    register,
    onChange = () => { },
    ...other
}) {
    const inputId = useId()
    return (
        <label htmlFor={id ?? inputId} className={css.input}>
            {icon && <span className={css.icon}>{icon}</span>}
            <select
                type={type}
                name={name}
                id={id ?? inputId}
                className={`${classname}`}
                onChange={onChange}
                {...register}
                {...other}
            >
                {options.length ? options.map(option => (
                    <option key={option} value={option}>{option}</option>
                )) : children
                }
            </select>
            {<span className={css.icon}>{icon}</span> && icons}
        </label>
    )
}