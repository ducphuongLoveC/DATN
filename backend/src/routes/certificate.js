import { Router } from "express";
import CertificateController from "../controllers/CertificateController.js";

const routerCertificate = Router();

routerCertificate.get("/", CertificateController.getAllCertificates);

routerCertificate.get("/:certificate_code", CertificateController.getCertificateById);

routerCertificate.post("/", CertificateController.createCertificate);

export default routerCertificate;
