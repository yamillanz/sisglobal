import { InvoiceDetail } from "./invoice-detail";

export interface Invoice {
    numero?,
    num_factura?,
    num_control?,
    pago?,
    fecha_ope?,
    fecha_emision?,
    dias_credito?,
    num_orden_compra?,
    num_nota_entrega?,
    fecha_nota_entrega?,
    cli_codigo?,
    cli_nombre?,
    cli_rif_cedula?,
    cli_nit?,
    cli_direccion?,
    ven_codigo?,
    observacion?,
    tot_bruto?,
    tot_neto?,
    desctop?,
    descto?,
    porce_int_finanza?,
    porce_flete?,
    monto_flete?,
    tot_gravado?,
    tot_exento?,
    ivap?,
    iva?,
    retencion_ivap?,
    monto_retencion_iva?,
    costo_reposicion?,
    costo_promedio?,
    costo_ueps?,
    costo_peps?,
    cod_caja?,
    contabilizado?,
    factura_presentada?,
    comicion_vendedor?,
    factura_dolar?,
    tasa?,
    devuelta?,
    valor_dolar?,
    efectivo?,
    cheque?,
    detalle_cheque?,
    tarjeta_credito?,
    tarjeta_debito?,
    cod_deposito?,
    cli_telefono?,
    fecha_venc?,
    con_flete?,
    flete_aparte?,
    porc_tone?,
    emite_ne?,
    tot_peso?,
    monto_interes_financ?,
    cod_zona?,
    num_oc_cliente?,
    lugarentrega?,
    anulada?,
    porc_comi?,
    numero_remesa?,
    chek?,
    tiene_remesa?,
    distribuye_comision?,
    num_cp?,
    forma_pago?,
    sincontrol?,
    id_lote?,
    base_descuento?,
    base_desc_exenta?,
    numero_alterno?,
    procesado_siadcli?,
    numero_z?,
    presupuesto?,
    hora?,
    numero_lote?,
    nota_credito?,
    iva_reducido?,
    ind_bss?,
    vendedor?,
    detalle?:InvoiceDetail[]
}
