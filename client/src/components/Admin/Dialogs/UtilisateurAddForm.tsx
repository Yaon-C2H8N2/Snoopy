import { Input, Select, SelectItem } from "@nextui-org/react";
import { FormEvent, useState } from "react";

type UtilisateurAddFormProps = {
    submitRef: React.MutableRefObject<HTMLButtonElement | null>;
    onSubmit: (formValues: object) => void;
};

function UtilisateurAddForm(props: UtilisateurAddFormProps) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        let error = false;
        if (formData.get("password") !== formData.get("passwordConfirmation")) {
            error = true;
            setErrorMessage("Les mots de passe ne correspondent pas");
        }
        if (!error) {
            props.onSubmit({
                username: formData.get("username"),
                password: formData.get("password"),
                passwordConfirmation: formData.get("passwordConfirmation"),
                role: formData.get("role"),
            });
        }
    }

    return (
        <form className={"flex flex-col gap-5"} onSubmit={handleSubmit}>
            <div className={"flex flex-row gap-5 items-center"}>
                <div className={"w-[30%]"}>Nom d'utilisateur</div>
                <Input isRequired={true} type={"text"} name={"username"} />
            </div>
            <div className={"flex flex-row gap-5 items-center"}>
                <div className={"w-[30%]"}>Mot de passe</div>
                <Input isRequired={true} type={"password"} name={"password"} />
            </div>
            <div className={"flex flex-row gap-5 items-center"}>
                <div className={"w-[30%]"}>Confirmation du mot de passe</div>
                <Input
                    isRequired={true}
                    type={"password"}
                    name={"passwordConfirmation"}
                />
            </div>
            <div className={"flex flex-row gap-5 items-center"}>
                <div className={"w-[30%]"}>Rôle</div>
                <Select
                    defaultSelectedKeys={["USER"]}
                    name={"role"}
                    aria-label={"role-select"}
                >
                    <SelectItem key={"ADMIN"}>ADMIN</SelectItem>
                    <SelectItem key={"USER"}>USER</SelectItem>
                </Select>
            </div>
            <div className={"text-red-500 w-full text-center"}>
                {errorMessage}
            </div>
            <button ref={props.submitRef} type="submit" className={"hidden"} />
        </form>
    );
}

export default UtilisateurAddForm;
