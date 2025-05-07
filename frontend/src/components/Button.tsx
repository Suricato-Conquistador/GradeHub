type Props = {
    classname?: string
    title: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: Props) => {
    return(
        <>
            <button type="button" className={props.classname} {...props}>{props.title}</button>
        </>
    )
}

export default Button;
