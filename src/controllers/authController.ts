import { Request, Response } from "express";
import validator from "validator";

class AuthController {
   
     /**
     * Método para valida Inicio de sesión
     * @param req Petición
     * @param res respuesta
     * @returns
     */
     public async iniciarSesion(req: Request, res: Response) {
       
        try {
            const {email, password }= req.body;
     
            // verificar que los datos no esten vacios
            if (validator.isEmpty(email.trim()) ||
                validator.isEmpty(password.trim())) {
            return res
                .status(400)
                .json({ message: "Los campos son requeridos", code: 1 });
            }
     
            return res.json({ message : "Autenticación correcta", code: 0 });
     
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

 
}
export const authController = new AuthController();
