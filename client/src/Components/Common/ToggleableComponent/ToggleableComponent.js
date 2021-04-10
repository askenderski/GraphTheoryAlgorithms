import style from "./ToggleableComponent.module.css";

export default function ToggleableComponent({isOn, toggleIsOn, values}) {
    return (
        <div>
            <span>{values.off}</span>
            <label className={style.switch}>
                <input type="checkbox" checked={isOn} onClick={toggleIsOn} />
                <span className={style.slider} />
            </label>
            <span>{values.on}</span>
        </div>
    );
};