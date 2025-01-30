interface WarehouseItem {
  boxDeliveryAndStorageExpr: string;
  boxDeliveryBase: string;
  boxDeliveryLiter: string;
  boxStorageBase: string;
  boxStorageLiter: string;
  warehouseName: string;
}

interface TariffsData {
  dtNextBox: string;
  dtTillMax: string;
  warehouseList: WarehouseItem[];
}

interface TariffsDataDB {
  dt_next_box: string;
  dt_till_max: string;
  box_delivery_and_storage_expr: string;
  box_delivery_base: string;
  box_delivery_liter: string;
  box_storage_base: string;
  box_storage_liter: string;
  warehouse_name: string;
}

interface TariffsBoxResponse {
  response: {
    data: TariffsData;
  };
}

export { WarehouseItem, TariffsData, TariffsBoxResponse, TariffsDataDB };
