import { Request, Response } from "express";
import validator from "validator";
import model from "../models/authModels";
import { utils } from "../utils/utils";

class AuthController {
  /**
   * Método para valida Inicio de sesión
   * @param req Petición
   * @param res respuesta
   * @returns
   */
  public async iniciarSesion(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // verificar que los datos no esten vacios
      if (
        validator.isEmpty(email.trim()) ||
        validator.isEmpty(password.trim())
      ) {
        return res
          .status(400)
          .json({ message: "Los campos son requeridos", code: 1 });
      }

      const lstUsers = await model.getuserByEmail(email);
      let result= utils.checkPassword(password,lstUsers[0].password)
      
      result.then((value)=>{
        if(value){
          return res.json({message: "Autenticacion correcta",})
        }else{
          return res.json({message:"Passwor Incorrecto", code:1})
        }
      })

      
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}
export const authController = new AuthController();
