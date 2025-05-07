import Input from "../components/Input";
import Button from "../components/Button";


const Login = () => {
    return(
        <div className="content">
            <div className="p-lf"></div>

            <div className="p-rt">
                <div className="box">
                    <h1>LOGIN</h1>

                    <div>
                        <Input labelId={"email"} labelName={"Email"} type={"text"} />
                        <Input labelId={"password"} labelName={"Senha"} type={"password"} />
                        <Button title={"Logar"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
