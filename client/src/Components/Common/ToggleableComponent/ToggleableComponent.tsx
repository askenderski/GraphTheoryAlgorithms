import style from "./ToggleableComponent.module.css";

export default function ToggleableComponent(
    {isOn, toggleIsOn, values}: {isOn: boolean, toggleIsOn(): void, values: {off: string, on: string}}
    ) {
        return (
            <div>
                <span>{values.off}</span>
                <label className={style.switch}>
                    <input type="checkbox" checked={isOn} onChange={toggleIsOn} />
                    <span className={style.slider} />
                </label>
                <span>{values.on}</span>
            </div>
        );
    };