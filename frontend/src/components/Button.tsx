import { ButtonProps } from "../interfaces/button.interface";


const Button = (props: ButtonProps) => {
    return(
        <button type="button" className={props.classname} {...props}>{props.title}</button>
    );
};

export default Button;
