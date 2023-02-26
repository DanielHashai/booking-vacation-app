import Joi from "joi";
import { AuthenticationError, ValidationError } from "./client-errors";

class CredentialsModel {

    public email: string;
    public password: string

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }


    private static ValidationSchema = Joi.object({

        email: Joi.string().required().min(7).max(50),
        password: Joi.string().required().min(2).max(256),

    });

    public validateLogin(): void {

        const result = CredentialsModel.ValidationSchema.validate(this);

        if (result.error) throw new AuthenticationError("Invalid email or password");
    }

}
export default CredentialsModel;