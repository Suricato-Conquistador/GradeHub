import Select from "../components/Select";
import Grade from "../server/routes/grade";


const grade = new Grade();

const Teacher = () => {
    const postGrade = async () => {

    }

    return(
        <>
            {/* cadastrar notas */}
            <div>
                <Select options={[]} optionsName={[]} />
            </div>
        </>
    );
};

export default Teacher;
