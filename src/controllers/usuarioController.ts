import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModel";
import { utils } from "../utils/utils";


class UsuarioController {


  public async list(req: Request, res: Response) {
    try {
        const users= await model.list()
        return res.json({ message: "Listado de Usuario", code: 0 ,users});
    } catch (error: any) {
        return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async add(req: Request, res: Response) {
    
    try {

      var { email, password, role }=req.body;

      if (validator.isEmpty(password)) {
        return res.status(400).json({ message: "Falta Contraseña", code: 400 });
      }

      var encryptedText= await utils.hashPassword(password);
      password=encryptedText
      console.log(password)
      const user={ email, password, role };

      if (validator.isEmpty(user.role)) {
        return res.status(400).json({ message: "Falta rol", code: 400 });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email inválido", code: 400 });
      }

      const existingUser = await model.listByEmail(email);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Ya existe un usuario con ese email", code: 400 });
      }

      await model.add(user);
      return res.json({ message: "Usuario Agregado", code: 0 });

    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async update(req: Request, res: Response) {
    try {
      var { email, password, role }=req.body;

      if (validator.isEmpty(password)) {
        return res.status(400).json({ message: "Falta Contraseña", code: 400 });
      }

      var encryptedText= await utils.hashPassword(password);
      password=encryptedText
      console.log(password)
      const user={ email, password, role };

      if (validator.isEmpty(user.role)) {
        return res.status(400).json({ message: "Falta rol", code: 400 });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email inválido", code: 400 });
      }
      
      // Verificar si el usuario existe
      const existingUser = await model.listByEmail(email);
      if (existingUser.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado", code: 404 });
      }

      // Actualizar la contraseña del usuario
      await model.update(user);

      return res.json({ message: "Acualizacion exitosa", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async delete(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Verificar si el usuario existe
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email inválido", code: 400 });
      }

      const existingUser = await model.listByEmail(email);
      if (existingUser.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado", code: 404 });
      }
      // Eliminar el usuario
      await model.delete(email);

      return res.json({ message: "Usuario Eliminado", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}
export const usuarioController = new UsuarioController();
