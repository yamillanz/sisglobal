import { ComplementariaProducto, AplicabilidadProducto } from "../models";

export interface Producto {
    idAdmProducto?,
    codigo?,
    idAdmGrupoProducto?,
    idAdmTipoMedida?,
    grupo?,
    subgrupo?,
    nombre?,
    uso?,
    descripcionCompleta?,
    imagenPath?,
    idAdmSubGrupoProducto?,
    idAdmUnidadMedida?,
    idAdmMaterialProducto?,
    idAdmColorProducto?,
    poseeAccesorios?,
    responsableFuncionalidad?,
    responsableValidacion?,
    existenciaMaxima?,
    existenciaMinima?,
    puntoPedido?,
    caducidad?,
    reciclable?,
    activo?,
    idAdmTipoDesagregacionProducto?,
    peligroso?,
    idUsuarioRegistro?,  
    idUsuarioCreacion?,
    idUsuarioValidacion?,
    idUsuarioModificacion?,
    fechaAprobacion?,
    fechaModificacion?,
    fechaAlta?
    usuarioCreacion?,
    usuarioModificacion?,
    usuarioAprobacion?,
    usuarioValidacion?,
    aprobado?,
    esservicio?,
    validado?,
    idUsuarioValInfo?,
    fechaValInfo?,
    idGerenciaCreacion?,
    idGerenciaValidacion?,
    idGerenciaModificacion?,
    idGerenciaAprobacion?
    adicionales?: ComplementariaProducto[],
    complementarias?: ComplementariaProducto[],
    aplicabilidad?: AplicabilidadProducto[],
    idPuestoAlmacen?
}