import { Router } from "express";
import CertificateContronller from "../controllers/CertificateContronller.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { certificateSchema } from "../validSchema/certificateSchema.js";

const routerCertificate = Router()
routerCertificate.get('/', CertificateContronller.get)
routerCertificate.get('/:id', CertificateContronller.getDetail)
routerCertificate.post('/',validBodyRequets(certificateSchema), CertificateContronller.create)
routerCertificate.patch('/:id',validBodyRequets(certificateSchema), CertificateContronller.update)
routerCertificate.delete('/:id', CertificateContronller.delete)

export default routerCertificate